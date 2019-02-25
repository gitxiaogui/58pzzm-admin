<template>
  <el-row class="chart-data-select">
    <el-row :gutter="20">
      <el-tabs
        v-model="typeSelect"
        type="border-card">
        <el-tab-pane name="day" label="天">
          <el-date-picker
            v-model="dateRange.day"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </el-tab-pane>
        <el-tab-pane name="week" label="周">
          <el-date-picker
            v-model="dateRange.week[0]"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择起始周">
          </el-date-picker>
          <el-date-picker
            v-model="dateRange.week[1]"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择结束周">
          </el-date-picker>
        </el-tab-pane>
        <el-tab-pane name="month" label="月">
          <el-date-picker
            v-model="dateRange.month[0]"
            type="month"
            placeholder="选择起始月">
          </el-date-picker>
          <el-date-picker
            v-model="dateRange.month[1]"
            type="month"
            placeholder="选择结束月">
          </el-date-picker>
        </el-tab-pane>
        <el-tab-pane name="year" label="年">
          <el-date-picker
            v-model="dateRange.year[0]"
            align="right"
            type="year"
            placeholder="选择起始年">
          </el-date-picker>
          <el-date-picker
            v-model="dateRange.year[1]"
            align="right"
            type="year"
            placeholder="选择结束年">
          </el-date-picker>
        </el-tab-pane>
        <el-row>
          <el-button icon="search" @click="confirm()" type="info">搜索</el-button>
        </el-row>
      </el-tabs>
    </el-row>
  </el-row>
</template>

<script>
  import { dateFormat } from '@/common/util.js'
  import Bus from '@/eventBus'
  export default {
    props: {
      parentVUE: String
    },
    data() {
      return {
        dateRange: {
          day: '',
          week: ['', ''],
          month: ['', ''],
          year: ['', '']
        },
        typeSelect: 'day'
      }
    },
    activated() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.confirm(true);

    },
    methods: {
      confirm(flag) {
        let _this = this;
        let sendObj = {}
        sendObj.dateRange = [];
        sendObj.typeSelect = this.typeSelect;
        let now = new Date()
        console.log(this.dateRange[this.typeSelect])
        switch (this.typeSelect) {
          case 'day':
            if (this.dateRange[this.typeSelect] === '' || !this.dateRange[this.typeSelect][0] || !this.dateRange[this.typeSelect][1]) {
              let start = new Date(now.getTime() - 1000 * 3600 * 24 * 10)
              sendObj.dateRange.push(start.getTime());
              sendObj.dateRange.push(now.getTime());
              flag || this.$message.error('请起始条件或结束条件');
            } else {
              defaultSendObj()
            }
            break;
          default:
            if (!this.dateRange[this.typeSelect][0] || !this.dateRange[this.typeSelect][1]) {
              let now = new Date()
              let start = new Date(now.getTime() - 1000 * 3600 * 24 * 10)
              sendObj.dateRange.push(start.getTime());
              sendObj.dateRange.push(now.getTime());
              sendObj.typeSelect = 'day'
              flag || this.$message.error('请起始条件与结束条件');
            } else {
              defaultSendObj()
            }
            break;
        }
        function defaultSendObj() {
          let start = new Date(_this.dateRange[_this.typeSelect][0]).getTime();
          let end = 0;
          switch (_this.typeSelect) {
            case 'week':
              end = new Date(_this.dateRange[_this.typeSelect][1]).getTime() + 1000 * 3600 * 24 * 7;
              break;
            case 'month':
              end = new Date(_this.dateRange[_this.typeSelect][1]).getTime() + 1000 * 3600 * 24 * 30;
              break;
            case 'year':
              end = new Date(_this.dateRange[_this.typeSelect][1]).getTime() + 1000 * 3600 * 24 * 365;
              break;
            case 'day':
              sendObj.dateRange.push(new Date(_this.dateRange[_this.typeSelect][0]).getTime())
              sendObj.dateRange.push(new Date(_this.dateRange[_this.typeSelect][1]).getTime())
              break;
          }
          if (start > end) {
            sendObj.dateRange.push(end);
            sendObj.dateRange.push(start);
          }else {
            sendObj.dateRange.push(start);
            sendObj.dateRange.push(end);
          }
        }
        Bus.$emit(`chartDateSelect-${this.parentVUE}`, sendObj)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chart-data-select {
    padding: 0 10px;
    width: 100%;
    .el-row {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-tabs {
      .el-tab-pane {
        margin-bottom: 10px;
      }
    }
  }
</style>
