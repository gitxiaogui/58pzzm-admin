<template>
  <el-card class="plan-edit" v-show="currentEditCostState">
    <h3>修改费用</h3>
    <el-form
      :model="ruleForm"
      :rules="formRules"
      ref="ruleForm"
    >
      <el-row :gutter="40">
        <!--<el-col :span="8">
          <el-form-item prop="prodId" label="产品id:">
            <el-input v-model="ruleForm.prodId" disabled></el-input>
          </el-form-item>
          <el-form-item prop="setId" label="套餐id:">
            <el-input v-model="ruleForm.setId" disabled></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="7">
          <!--<el-form-item prop="costId" label="费用id:">
            <el-input v-model="ruleForm.costId" disabled></el-input>
          </el-form-item>-->
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
          <el-form-item prop="timeSpan" label="计费粒度:">
            <el-select v-model="ruleForm.timeSpan" placeholder="请选择">
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
        <el-col :span="4">
          <el-form-item prop="finaceItemCode" label="财务所属科目编号:">
            <el-cascader
                    v-model="ruleForm.finaceItemCode"
                    :options="options"
                    :show-all-levels="false"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button icon="close" type="info" @click="cancelEdit()">取消</el-button>
          <el-button icon="check" type="success" @click="submitForm()">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  import { costParamsRule, periodSpanOptions, ciTypeOptions} from '@/common/formRules.js'
  import { costInfoDetail, costGetFinanceItem, costEditItem } from '@/api/api'
  import { deleteNullAttr } from '@/common/util.js'
  import Bus from '@/eventBus'
  export default {
    data() {
      return {
        ruleForm: {
          costId: '',
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
    created() {
      //vuex存储的状态对应到编辑表单会出问题，因此采用事件传递数据
      Bus.$on('getEditCost', (cost)=>{
        console.log(cost.id)
        costInfoDetail({
          costId: cost.id
        }).then((res) => {
//          this.ruleForm.finaceItemCode =
          console.log(res)
          console.log(cost)
          this.ruleForm.finaceItemCode = res.financeItemInfos.financeItemPerious.reverse();
          console.log('看看',res.financeItemInfos.financeItemPerious)
          for (let item in cost) {
            if (item === 'finaceItemCode') {
              continue;
            } else {
              if (item === 'id') {
                this.ruleForm.costId = cost[item]
              } else {
                this.ruleForm[item] = cost[item]
              }
            }
          }
        });
      });
    },
    mounted() {
      costGetFinanceItem({}).then((res) => {
        console.log(res)
        this.options = deleteNullAttr(res.financeItems);
      })
    },
    watch: {
    },
    methods: {
      cancelEdit() {
        this.$store.commit("cancelCurrentEditCost");
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$confirm('是否确认保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              costEditItem({
                costId: this.ruleForm.costId,
                prodId: this.ruleForm.prodId,
                setId: this.ruleForm.setId,
                finaceItemCode: this.ruleForm.finaceItemCode[this.ruleForm.finaceItemCode.length - 1],
                costItem: this.ruleForm.costItem,
                timeSpan: this.ruleForm.timeSpan,
                cost: this.ruleForm.cost,
                ciType: this.ruleForm.ciType
              }).then((res)=>{
                console.log(res)
                if(res.code === '00000000') {
                  this.$message({
                    type: 'success',
                    message: '修改费用成功！'
                  });
                  Bus.$emit('costListReload');
                  this.$store.commit("cancelCurrentEditCost");
                } /*else {
                  this.$message.error(res.message);
                  return false;
                }*/
              })
            }).catch(() => {
              this.$message.info('已取消');
            })
            
          } else {
            this.$message.error('请填写正确的费用参数！');
            return false;
          }
        });
      }
    },
    updated() {

    },
    computed: {
      currentEditCostState() {
        return this.$store.state.currentEditCostState
      },
      currentEditCost() {
        return this.$store.state.currentEditCost;
      }
    }
  }
</script>

<style lang="scss">
  .plan-edit{

  }
</style>
