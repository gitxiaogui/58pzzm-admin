<template>
  <el-card class="product-params" v-show="currentEditProductState">
    <h3>产品参数修改</h3>
    <el-form
      :model="ruleForm"
      :rules="formRules"
      ref="ruleForm"
    >
      <el-row :gutter="50">
        <el-col :span="7">
          <el-form-item prop="prodName" label="产品名称:">
            <el-input v-model="ruleForm.prodName"></el-input>
          </el-form-item>
          <el-form-item prop="prodType" label="产品类型:">
            <el-input v-model="ruleForm.prodType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="basicAmount" label="基本金额:">
            <el-input type="number" v-model.number="ruleForm.basicAmount"></el-input>
          </el-form-item>
          <el-form-item prop="period" label="产品周期数:">
            <el-input type="number" v-model.number="ruleForm.period"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="maxRenewalCount" label="最大续期次数:">
            <el-input type="number" v-model.number="ruleForm.maxRenewalCount"></el-input>
          </el-form-item>
          <el-form-item prop="maxOverdueCount" label="最大逾期次数:">
            <el-input type="number" v-model.number="ruleForm.maxOverdueCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="prodCode" label="产品编号:">
            <el-input v-model="ruleForm.prodCode"></el-input>
          </el-form-item>
          <el-form-item prop="periodSpan" label="产品周期粒度:">
            <el-select v-model="ruleForm.periodSpan" placeholder="请选择">
              <el-option v-for="item in periodSpanOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button icon="close" type="info" @click="cancelEdit()">取消修改</el-button>
          <el-button icon="check" type="success" @click="submitForm()">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  import { productParamsRule, periodSpanOptions } from '@/common/formRules'
  import { productEdit } from '@/api/api'
  import Bus from '@/eventBus'
  export default {
    data(){
      return {
        formRules: productParamsRule,
        ruleForm: {
          prodName: '',
          prodCode: '',
          prodType: '',
          basicAmount: '',
          period: '',
          periodSpan: '',
          maxRenewalCount: '',
          maxOverdueCount: ''
        },
        periodSpanOptions
      }
    },
    updated(){
    },
    mounted() {

    },
    created() {
      //vuex存储的状态对应到编辑表单会出问题，因此采用事件传递数据
      Bus.$on('getEditProduct', (product)=>{
        for (let item in product) {
           this.ruleForm[item] = product[item]
        }
      })
    },
    methods: {
      cancelEdit() {
        this.$store.commit("cancelCurrentEditProduct");
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认保存修改?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let _this = this;
              productEdit(
                Object.assign(
                  {
                    prodId: _this.currentEditProduct.id
                  },
                  _this.ruleForm
                )
              ).then((res)=>{
                if(res.code === '00000000') {
                  this.$message({
                    type: 'success',
                    message: '修改产品成功！'
                  });
                  this.$store.commit("cancelCurrentEditProduct");
                  Bus.$emit('productListReload');
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
            
          } else {
            this.$message.error('请填写正确的产品参数！');
            return false;
          }
        });
      }
    },
    computed: {
      currentEditProduct() {
        return this.$store.state.currentEditProduct;
      },
      currentEditProductState() {
        return this.$store.state.currentEditProductState;
      }
    },
    activated() {
      this.$store.commit("cancelCurrentEditProduct");
    }
  }
</script>

<style lang="scss" scoped>
  .product-params{
    .el-form{
    }
  }
</style>
