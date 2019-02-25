<template>
  <el-row class="pro-out-chart">
    <el-select v-model="productType" placeholder="选择产品">
      <el-option v-for="item in productListType" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <chartDateSelect parentVUE="proOutChart"></chartDateSelect>
    <chartsAndTable :dataToChild="dataToChild"></chartsAndTable>
  </el-row>
</template>

<script>
  import { productLoanAmount, getSelectPro } from '@/api/api'
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
      Bus.$on("chartDateSelect-proOutChart", (select)=>{
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
        productType: '',
        productListType: [],
        radio: '1',
        beginDate: new Date().getTime() - 1000 * 3600 * 24 * 30,
        endDate: new Date().getTime(),
        type: 'day'
      }
    },
    activated() {
      this.getData()
    },
    watch: {
      radio: function () {
        this.getData()
      }
    },
    methods: {
      getData() {
        getSelectPro({}).then((res)=>{
          this.productListType = []
          if(res.code === '00000000') {
            console.log(res.prodLists)
            this.productListType.push({
              value: '',
              label: '选择产品'
            })
            for(let i = 0; i < res.prodLists.length; i++) {
              this.productListType.push({
                value: res.prodLists[i].prodId,
                label: res.prodLists[i].prodName
              })
            }
          }
        })
        productLoanAmount(
          {
            beginTime: this.beginDate,
            endTime: this.endDate,
            prodId: this.productType
          },
          this.type
        ).then((res)=>{
          console.log(res)
          if (res.code === '00000000') {
            this.dataToChild = {
              statistics: res.totAmountJson,
              dataTitle: '产品放款',
              itemKey: ['basicAmount'],
              itemTitle: ['基本金额']
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pro-out-chart {
    .el-select {
      margin-bottom: 10px;
    }
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
