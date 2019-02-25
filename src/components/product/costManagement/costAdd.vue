<template>
  <el-card class="cost-add" v-show="currentAddCostState">
    <el-row>
      <h3>新增费用</h3>
    </el-row>
    <el-form
      :model="ruleForm"
      :rules="formRules"
      ref="ruleForm"
    >
      <el-row :gutter="40">
        <!--<el-col :span="7">
          <el-form-item prop="prodId" label="产品id:">
            <el-input v-model="ruleForm.prodId" disabled></el-input>
          </el-form-item>
          <el-form-item prop="setId" label="套餐id:">
            <el-input v-model="ruleForm.setId" disabled></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="6">
          <el-form-item prop="costItem" label="费用名称:">
            <el-input v-model="ruleForm.costItem"></el-input>
          </el-form-item>
          </el-col>
        <el-col :span="4">
          <el-form-item prop="cost" label="费用:">
            <el-input type="number" v-model.number="ruleForm.cost"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="finaceItemCode" label="财务所属科目编号:">
            <el-cascader
                    v-model="ruleForm.finaceItemCode"
                    :options="options"
                    :show-all-levels="false"
            ></el-cascader>
          </el-form-item>
          </el-col>
        <el-col :span="4">
          <el-form-item prop="timeSpan" label="计费粒度:">
            <el-select v-model="ruleForm.timeSpan" placeholder="请选择计费粒度">
              <el-option v-for="item in periodSpanOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="ciType" label="财务所属科目类型:">
            <el-select v-model="ruleForm.ciType" placeholder="请选择类型">
              <el-option v-for="item in ciTypeOptions" :key="item.value" :label="item.label" :value="item.value">
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
  import { costParamsRule, periodSpanOptions, ciTypeOptions } from '@/common/formRules'
  import { costGetFinanceItem, costAddItem } from '@/api/api'
  import { deleteNullAttr } from '@/common/util.js'
  import Bus from '@/eventBus'
  export default {
    data() {
      return {
        ruleForm: {
          prodId: '',
          setId: '',
          finaceItemCode: [],
          costItem: '',
          cost: '',
          timeSpan: '',
          ciType: ''
        },
        periodSpanOptions,
        ciTypeOptions,
        options: [],
        formRules: costParamsRule
      }
    },
    mounted() {
      //获取财务科目编号
      costGetFinanceItem({}).then((res) => {
        console.log(res)
        this.options = deleteNullAttr(res.financeItems);
       // alert(JSON.stringify(this.options))
      })
      this.getBasicInfo();
    },
    watch: {
      '$route': function () {
        this.getBasicInfo()
      }
    },
    activated() {
      this.$refs.ruleForm.resetFields();
      this.getBasicInfo();
      this.$store.commit("cancelCurrentAddCost");
    },
    methods: {
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$confirm('是否确认保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              costAddItem({
                prodId: this.ruleForm.prodId,
                setId: this.ruleForm.setId,
                finaceItemCode: this.ruleForm.finaceItemCode[this.ruleForm.finaceItemCode.length - 1],
                costItem: this.ruleForm.costItem,
                timeSpan: this.ruleForm.timeSpan,
                cost: this.ruleForm.cost,
                ciType: this.ruleForm.ciType
              }).then((res) => {
                if(res.code === '00000000') {
                  this.$message({
                    type: 'success',
                    message: '添加费用成功！'
                  });
                  this.$refs.ruleForm.resetFields();
                  this.getBasicInfo()
                  this.$store.commit("cancelCurrentAddCost");
                  Bus.$emit('costListReload');
                } /*else {
                  this.$message.error(res.message);
                }*/
              });
            }).catch(() => {
              this.$message.info('已取消')
            })
            
          } else {
            this.$message.error('请填写正确的费用参数！');
            return false;
          }
        });
      },
      cancelAdd() {
        this.$store.commit("cancelCurrentAddCost");
        this.$refs.ruleForm.resetFields()
        this.getBasicInfo()
      },
      getBasicInfo() {
        this.ruleForm.prodId = this.$route.query.prodId;
        this.ruleForm.setId = this.$route.query.setId;
      }
    },
    computed: {
      currentAddCostState() {
        return this.$store.state.currentAddCostState;
      }
    },
    created() {
      Bus.$on('costAddReload', ()=>{
        this.$refs.ruleForm.resetFields();
        this.getBasicInfo()
      })
    }
  }
</script>

<style lang="scss" scoped>
  .cost-add{
    .el-form{
    }
  }
</style>
