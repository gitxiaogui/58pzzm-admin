<template>
  <el-row class="loan-chart">
    <chartDateSelect parentVUE="receivedChart"></chartDateSelect>
    <chartsAndTable :dataToChild="dataToChild"></chartsAndTable>
  </el-row>
</template>

<script>
  import { prodOutFinaceRecord, prodinFinaceRecord } from '@/api/api'
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
      Bus.$on("chartDateSelect-receivedChart", (select)=>{
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
        prodinFinaceRecord(
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
              dataTitle: '入账',
              itemKey: ['basicAmount', 'interstAmount', 'overdueAmount', 'renewalAmount', 'totalAmount'],
              itemTitle: ['基本金额', '利息', '逾期费用', '续期费用', '总额']
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
