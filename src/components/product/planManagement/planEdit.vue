<template>
  <el-card class="plan-edit" v-show="currentEditPlanState">
    <h3>修改套餐</h3>
    <el-form
      :rules="formRules"
      :model="ruleForm"
      ref="ruleForm"
    >
      <el-row :gutter="50">
        <el-col :span="7">
          <el-form-item prop="prodId" label="产品id:">
            <el-input v-model="ruleForm.prodId" disabled></el-input>
          </el-form-item>
          <el-form-item prop="setName" label="套餐名称:">
            <el-input v-model="ruleForm.setName" :disabled="currentEditPlan.onlyEditableEndTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item prop="prodName" label="产品名称:">
            <el-input v-model="ruleForm.prodName" disabled></el-input>
          </el-form-item>
          <el-form-item prop="priority" label="优先级:">
            <el-input type="number" v-model.number="ruleForm.priority" :disabled="currentEditPlan.onlyEditableEndTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="起始有效时间:">
            <el-date-picker
                    ref="beginTime"
                    v-model="ruleForm.beginTime"
                    type="datetime"
                    :disabled="currentEditPlan.onlyEditableEndTime"
                    :picker-options="beginTimeRule"
                    placeholder="选择起始有效时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束有效时间:">
            <el-date-picker
                    ref="endTime"
                    v-model="ruleForm.endTime"
                    type="datetime"
                    :picker-options="endTimeRule"
                    placeholder="选择结束有效时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="memo" label="备注:">
            <el-input v-model="ruleForm.memo" :disabled="currentEditPlan.onlyEditableEndTime"></el-input>
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
  import { planParamsRule } from '@/common/formRules.js'
  import { planEdit } from '@/api/api'
  import Bus from '@/eventBus'
  export default {
    data() {
      return {
        ruleForm: {
          prodId: '',
          prodName: '',
          setName: '',
          beginTime: '',
          endTime: '',
          priority: '',
          memo: ''
        },
        formRules: planParamsRule
      }
    },
    created() {
      //vuex存储的状态对应到编辑表单会出问题，因此采用事件传递数据
      Bus.$on('getEditPlan', (plan)=>{
        for (let item in this.ruleForm) {
          this.ruleForm[item] = plan[item]
        }
      });
    },
    mounted() {
    },
    watch: {
    },
    activated() {
      this.$store.commit("cancelCurrentEditPlan");
    },
    methods: {
      cancelEdit() {
        this.$store.commit("cancelCurrentEditPlan");
      },
      submitForm() {
        console.log(12)
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log(this.ruleForm.beginTime)
            console.log(this.$refs.beginTime.$el.getElementsByTagName('input')[0].value, this.$refs.endTime.$el.getElementsByTagName('input')[0].value)
            this.$confirm('是否确认保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              planEdit({
                setId: this.$store.state.currentEditPlan.id,
                prodId: this.ruleForm.prodId,
                setName: this.ruleForm.setName,
                beginTime: new Date(this.ruleForm.beginTime).getTime(),
                endTime: new Date(this.ruleForm.endTime).getTime(),
                priority: this.ruleForm.priority,
                memo: this.ruleForm.memo
              }).then((res)=>{
                console.log(res)
                if(res.code === '00000000') {
                  this.$message({
                    type: 'success',
                    message: '修改套餐成功！'
                  });
                  Bus.$emit('planListReload');
                  this.$store.commit("cancelCurrentEditPlan");
                } else {
                  this.$message.error(res.message);
                  return false;
                }
              })
            }).catch(() => {
              this.$message.info('已取消')
            })
            
          } else {
            this.$message.error('请填写正确的套餐参数！');
            return false;
          }
        });
      }
    },
    updated() {

    },
    computed: {
      beginTimeRule() {
        return {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        }
      },
      endTimeRule() {
        let _this = this;
        return {
          disabledDate(time) {
            return time.getTime() < _this.ruleForm.beginTime;
          }
        }
      },
      currentEditPlanState() {
        return this.$store.state.currentEditPlanState
      },
      currentEditPlan() {
        return this.$store.state.currentEditPlan;
      }
    }
  }
</script>

<style lang="scss">
  .plan-edit{

  }
</style>
