<template>
  <el-row class="charts-and-table">
    <el-row>
      <el-col :span="12">
        <div id="lineChart" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="pieChart" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :summary-method="getSummaries"
        show-summary
        class="list-table"
        highlight-current-row
        :data="statisticsData.pageArray[nowPage - 1]"
        @row-click="pieDataUpdate"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="时间">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in statisticsData.itemKey"
          :key="index"
          :prop="`${dataToChild.itemKey[index]}`"
          :label="`${dataToChild.itemTitle[index]}`">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="nowPage"
        layout="prev, pager, next"
        :total="totalNum">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  import { splitArray } from '@/common/util.js'
  export default {
    props: {
      dataToChild: Object
    },
    data() {
      return {
        totalNum: 0,
        nowPage: 1,
        lineChart: null,
        pieChart: null,
        statisticsData: {
          receivedDateArray: [],
          receivedValueArray: [],
          dataTitle: '',
          arrayData: [],
          lineData: [],
          pieData: {
            subText: '',
            legendData: [],
            seriesData: []
          },
          pageArray: [],
          itemKey: [],
          itemTitle: [],
          itemNum: [],
          totalNum: 0
        }
      }
    },
    watch: {
      dataToChild: {
        handler: function () {
          console.log(this.dataToChild)
          this.totalNum = 0;
          this.nowPage = 1;
          let totalNum = 0;
          this.statisticsData = {
            receivedDateArray: [],
            receivedValueArray: [],
            dataTitle: this.dataToChild.dataTitle,
            arrayData: [],
            lineData: {},
            pieData: {
              subText: '',
              legendData: [],
              seriesData: []
            },
            pageArray: [],
            itemKey: this.dataToChild.itemKey,
            itemTitle: this.dataToChild.itemTitle,
            itemNum: [],
            totalNum: this.dataToChild.statistics.length
          }
          //数据处理与加入本页数据
          let receivedStatistics = this.dataToChild.statistics;
          let itemKeyArray = this.dataToChild.itemKey;
          let receivedDateArray = this.statisticsData.receivedDateArray;
          let receivedValueArray = this.statisticsData.receivedValueArray;

          for(let i = 0; i < receivedStatistics.length; i++) {
            receivedDateArray.push(receivedStatistics[i].date)
          }

          for(let i = 0; i < itemKeyArray.length; i++) {
            receivedValueArray.push(
              {
                type: itemKeyArray[i],
                valueArray: []
              }
            );
            for(let j = 0; j < receivedStatistics.length; j++) {
              receivedValueArray[i].valueArray.push(receivedStatistics[j][itemKeyArray[i]])
            }
          }
          console.log(receivedValueArray, receivedDateArray)
          this.totalNum = this.statisticsData.totalNum;

          this.statisticsData.pageArray = splitArray(receivedStatistics, 10)
          this.initPieData()
          console.log(this.statisticsData.pieData)
          this.$nextTick(()=>{
            this.showData()
          })
        },
        deep: true
      }
    },
    methods: {
      initPieData() {
        //饼图初始数据处理
        this.statisticsData.pieData = {
          subText: '',
          legendData: [],
          seriesData: []
        };
        let loopFlag = 0;
        let dataValue = this.getSummaries();
        for(let i = 0; i < this.statisticsData.itemTitle.length; i++) {
          if(this.statisticsData.itemTitle[i] === '总额') {
            continue;
          }
          this.statisticsData.pieData.legendData.push(this.statisticsData.itemTitle[i])
        }
        console.log(dataValue)
        if(this.statisticsData.itemKey.includes('totalAmount') || this.statisticsData.itemKey.includes('nowAmount')) {
          loopFlag = dataValue.length - 1;
        } else {
          loopFlag = dataValue.length;
        }
        for(let i = 1; i < loopFlag; i++) {
          if(dataValue[i] === '合计') {
            continue;
          }
          this.statisticsData.pieData.seriesData.push({
            value: dataValue[i],
            name: this.statisticsData.itemTitle[i - 1]
          })
        }
        this.statisticsData.pieData.subText = '合计统计'
      },
      pieDataUpdate(row, event, column) {
        let pieData = this.statisticsData.pieData;
        for(let i = 0; i < this.statisticsData.itemKey.length; i++) {
          if(this.statisticsData.itemKey[i] !== 'totalAmount' && this.statisticsData.itemKey[i] !== 'nowAmount') {
            this.statisticsData.pieData.seriesData[i].value = row[this.statisticsData.itemKey[i]]
          }
        }
        this.statisticsData.pieData.subText = row.date
        this.drawPieChart()
      },
      getSummaries() {
        const sums = [];
        sums[0] = '合计';
        for(let i = 0; i < this.statisticsData.itemKey.length; i++) {
          let sum = 0;
          for(let j = 0; j < this.dataToChild.statistics.length; j++) {
            sum += this.dataToChild.statistics[j][this.statisticsData.itemKey[i]]
          }
          sums[i+1] = sum;
        }
        return sums;
      },
      handlePageChange(pageNum) {
        this.nowPage = pageNum
      },
      drawLineChart() {
        let seriesData = [];
        let seriesName = this.dataToChild.itemTitle;
        let valueData = this.statisticsData.receivedValueArray;
        for(let i = 0; i < seriesName.length; i++) {
          seriesData.push({
            name: seriesName[i],
            type: 'line',
            stack: '',
            data: []
          })
        }
        for(let i = 0; i < valueData.length; i++) {
          for(let j = 0; j < valueData[i].valueArray.length; j++) {
            seriesData[i].data.push(valueData[i].valueArray[j])
          }
        }
        console.log(seriesData)
        this.lineChart = echarts.init(document.getElementById('lineChart'))
        this.lineChart.setOption(
          {
            title: {
              text: this.dataToChild.dataTitle + '统计'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: this.dataToChild.itemTitle
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.statisticsData.receivedDateArray
            },
            yAxis: {
              type: 'value'
            },
            series: seriesData
          }
        )
      },
      drawPieChart() {
        console.log(this.statisticsData.pieData)
        this.pieChart = echarts.init(document.getElementById('pieChart'))
        this.pieChart.setOption(
          {
            title: {
              text: this.dataToChild.dataTitle + '统计',
              subtext: this.statisticsData.pieData.subText,
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              top: 30,
              data: this.statisticsData.pieData.legendData
            },
            series: [
              {
                name: this.dataToChild.dataTitle + '统计',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: this.statisticsData.pieData.seriesData,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        )
      },
      tableInit() {

      },
      showData() {
        this.drawLineChart()
        this.drawPieChart()
        this.tableInit()
      }
    },
    mounted() {
      let _this = this;
      document.getElementsByClassName('el-table__footer-wrapper')[0].onclick = function () {
        _this.initPieData()
        _this.drawPieChart()
      }
    }
  }
</script>

<style lang="sass" scoped>
  .charts-and-table
    .list-table
      cursor: pointer
    .el-row
      margin-bottom: 10px
      &:last-child
        margin-bottom: 0
</style>
