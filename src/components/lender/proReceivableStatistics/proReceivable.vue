<template>
  <el-row class="pro-receivable-chart">
    <el-select v-model="productType" placeholder="选择产品">
      <el-option v-for="item in productListType" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <chartDateSelect parentVUE="proReceivableChart"></chartDateSelect>
    <div class="line"></div>
    <proReceiveList :dataToChild="dataToChild" :todayData="todayData"></proReceiveList>
  </el-row>
</template>

<script>
  import { productReceivableAmount, getSelectPro } from '@/api/api'
  import chartDateSelect from '@/components/common/finance/chartDateSelect.vue'
  import proReceiveList from './proReceiveList.vue'
  import Bus from '@/eventBus'
  export default {
    components: {
      chartDateSelect,
      proReceiveList
    },
    created() {
      Bus.$on("chartDateSelect-proReceivableChart", (select)=>{
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
          dataTitle: '',
          dataToChild: []
        },
        todayData: {},
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
      this.getToday()
    },
    watch: {
      radio: function () {
        this.getData()
        this.getToday()
      }
    },
    methods: {
      getToday() {
        productReceivableAmount(
          {
            beginDate: new Date().getTime(),
            endDate: new Date().getTime(),
            prodId: this.productType
          },
          this.type
        ).then((res)=>{
          console.log(res)
          this.todayData = res.totAmountJson[0]
        })
      },
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
        productReceivableAmount(
          {
            beginDate: this.beginDate,
            endDate: this.endDate,
            prodId: this.productType
          },
          this.type
        ).then((res)=>{
          console.log(res)
          this.dataToChild = res.totAmountJson
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pro-receivable-chart {
    .line {
      margin-bottom: 10px;
      border-bottom: 1px solid #dbdedf;
    }
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
