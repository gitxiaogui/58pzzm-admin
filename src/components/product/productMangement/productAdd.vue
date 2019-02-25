<template>
  <el-card class="product-add" v-show="currentAddProductState">
    <h3>新增产品</h3>
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
          <el-button icon="close" type="info" @click="cancelAdd()">取消</el-button>
          <el-button icon="check" type="success" @click="submitForm()">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  import { productParamsRule, periodSpanOptions } from '@/common/formRules'
  import { productAdd } from '@/api/api'
  import Bus from '@/eventBus'
  export default {
    data() {
      return {
        ruleForm: {
          prodName: '',
          prodCode: '',
          prodType: '',
          basicAmount: '',
          period: '',
          periodSpan: '1',
          maxRenewalCount: '',
          maxOverdueCount: ''
        },
        periodSpanOptions,
        formRules: productParamsRule
      }
    },
    mounted() {
    },
    activated() {
      this.$store.commit("cancelCurrentAddProduct");
    },
    methods: {
      //取消添加
      cancelAdd() {
        this.$store.commit("cancelCurrentAddProduct");
        this.$refs.ruleForm.resetFields();
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if(this.ruleForm.basicAmount < 0 && this.ruleForm.period < 0 && this.ruleForm.maxRenewalCount < 0 && this.ruleForm.maxOverdueCount < 0) {
              this.$message.error('数值不能为负');
              return;
            }
            this.$confirm('确认保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              productAdd(
                this.ruleForm
              ).then((res) => {
                if(res.code === '00000000') {
                  this.$message({
                    type: 'success',
                    message: '添加产品成功！'
                  });
                  Bus.$emit('productListReload');
                  this.$refs.ruleForm.resetFields();
                  this.$store.commit("cancelCurrentAddProduct");
                  Bus.$emit('planLeftNav');
                }
              });
            }).catch(() => {
              this.$message.info('已取消')
            })
            
          } else {
            this.$message.error('请填写正确的产品参数！');
            return false;
          }
        });
      }
    },
    computed: {
      currentAddProductState() {
        return this.$store.state.currentAddProductState;
      }
    },
    created() {
      Bus.$on('productAddReload', ()=>{
        this.$refs.ruleForm.resetFields();
      })
    }
  }
</script>

<style lang="scss" scoped>
  .product-add{
    .el-form{
    }
  }
</style>
