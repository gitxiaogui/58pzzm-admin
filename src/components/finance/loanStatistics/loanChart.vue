<template>
  <el-row class="loan-chart">
    <!--<el-row>-->
      <!--<el-col>-->
        <!--选择类型:-->
        <!--<el-radio class="radio" v-model="radio" label="1">基本金额</el-radio>-->
        <!--<el-radio class="radio" v-model="radio" label="2">减免金额</el-radio>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <chartDateSelect parentVUE="loanChart"></chartDateSelect>
    <chartsAndTable :dataToChild="dataToChild"></chartsAndTable>
  </el-row>
</template>

<script>
  import { prodOutFinaceRecord } from '@/api/api'
  import chartDateSelect from '@/components/common/finance/chartDateSelect.vue'
  import chartsAndTable from '@/components/common/finance/chartsAndTable.vue'
  import { dateFormat } from '@/common/util.js'
  import Bus from '@/eventBus'
  export default {
    components: {
      chartDateSelect,
      chartsAndTable
    },
    created() {
      Bus.$on("chartDateSelect-loanChart", (select)=>{
        console.log(select)
        this.beginDate = select.dateRange[0]
        this.endDate = select.dateRange[1]
        this.type = select.typeSelect
        this.getData()
      })
    },
    data() {
      return {
        dataToChild: {
          dataStatistics: [],
          dataTitle: ''
        },
        radio: '1',
        beginDate: new Date().getTime() - 1000 * 3600 * 24 * 10,
        endDate: new Date().getTime(),
        type: 'day'
      }
    },
    mounted() {
      this.getData()
    },
    watch: {
      radio: function () {
        this.getData()
      }
    },
    methods: {
      getData() {
        prodOutFinaceRecord(
          {
            beginDate: this.beginDate,
            endDate: this.endDate
          },
          this.type
        ).then((res)=>{
          console.log(res)
          if (res.code === '00000000') {
            this.dataToChild = {
              statistics: res.totAmountJson,
              dataTitle: '出账',
              itemKey: ['basicAmount', 'mitigateAmount', 'nowAmount'],
              itemTitle: ['基本金额', '减免金额', '总额']
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loan-chart {
    .el-row{
      margin-bottom: 10px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .el-card {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
