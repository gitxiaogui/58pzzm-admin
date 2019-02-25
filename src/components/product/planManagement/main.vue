<template>
  <el-row class="plan-main">
    <el-row class="time-search">
      <el-date-picker
        v-model="timeRange"
        @change="timeChangeReload"
        type="datetimerange"
        placeholder="选择时间范围">
      </el-date-picker>
    </el-row>
    <el-row class="add-wrapper">
      <el-col :span="24">
        <el-button  icon="plus" type="info" @click="addPlan()">新增套餐</el-button>
      </el-col>
    </el-row>
    <el-row>
      <planAdd></planAdd>
      <planEdit></planEdit>
      <planList></planList>
    </el-row>
  </el-row>
</template>

<script>
  import planList from './planList.vue'
  import planAdd from './planAdd.vue'
  import planEdit from './planEdit.vue'
  import Bus from '@/eventBus'

  export default {
    components: {
      planList,
      planAdd,
      planEdit
    },
    activated() {
      this.timeRange = ''
    },
    data() {
      return {
        timeRange: ''
      }
    },
    methods: {
      timeChangeReload() {
        Bus.$emit('planMain-planList-timeChange', this.timeRange)
      },
      addPlan() {
        if( this.$route.query.prodId ) {
          this.$store.commit('changeCurrentAddPlan')
          Bus.$emit('planAddReload')
        } else {
          this.$message.error('请选择产品')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .plan-main {
    .add-wrapper{
      margin-bottom: 5px;
    }
  }
</style>
