<template>
  <el-row class="pro-receive-list">
    <el-row class="list-item">
      <el-card header="今日数据">
        <el-row class="top">
          <el-col :span="12">
            日期：{{ this.todayData.date }}
          </el-col>
          <el-col :span="12">
            应收总金额：{{ this.todayData.reciveTotalAmount }}
          </el-col>
        </el-row>
        <el-row>
          <el-col class="receive" :span="12">
            <el-col class="title" :span="8">
              <p>
                到期：
              </p>
            </el-col>
            <el-col class="data" :span="16">
              <p>
                到期数：
                <a v-if="this.todayData.normalCount!==0" type="normal" @click="goLenderList($event, todayData)">{{ this.todayData.normalCount }}</a>
                <span v-else>{{ this.todayData.normalCount }}</span>
              </p>
              <p>
                本金：
                <span>{{ this.todayData.normalPrincipleAmount }}</span>
              </p>
              <p>
                利息：
                <span>{{ this.todayData.normalInterestAmount }}</span>
              </p>
              <p>
                其他：
                <span>{{ this.todayData.normalOtherAmount }}</span>
              </p>
              <p>
                总金额：
                <span>{{ this.todayData.normalTotalAmount }}</span>
              </p>
            </el-col>
          </el-col>
          <el-col class="overdue" :span="12">
            <el-col class="title" :span="8">
              <p>
                逾期：
              </p>
            </el-col>
            <el-col class="data2" :span="16">
              <p>
                逾期数：
                <a v-if="this.todayData.overdueCount!==0" type="overdue" @click="goLenderList($event, todayData)">{{ this.todayData.overdueCount }}</a>
                <span v-else>{{ this.todayData.overdueCount }}</span>
              </p>
              <p>
                本金：
                <span>{{ this.todayData.overduePrincipleAmount }}</span>
              </p>
              <p>
                利息：
                <span>{{ this.todayData.overdueInterestAmount }}</span>
              </p>
              <p>
                罚息：
                <span>{{ this.todayData.overduePenaltyAmount }}</span>
              </p>
              <p>
                总金额：
                <span>{{ this.todayData.overdueTotalAmount }}</span>
              </p>
            </el-col>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <div class="line"></div>
    <el-row :gutter="10">
      <el-col v-for="(item, index) in pageArray[nowPage - 1]" :key="index" class="list-item" :span="12">
        <el-card>
          <el-row class="top">
            <el-col :span="12">
              日期：{{ item.date }}
            </el-col>
            <el-col :span="12">
              应收总金额：{{ item.reciveTotalAmount }}
            </el-col>
          </el-row>
          <el-row>
            <el-col class="receive" :span="12">
              <el-col class="title" :span="8">
                <p>
                  到期：
                </p>
              </el-col>
              <el-col class="data" :span="16">
                <p>
                  到期数：
                  <a v-if="item.normalCount!==0" type="normal" @click="goLenderList($event, item)">{{ item.normalCount }}</a>
                  <span v-else>{{ item.normalCount }}</span>
                </p>
                <p>
                  本金：
                  <span>{{ item.normalPrincipleAmount }}</span>
                </p>
                <p>
                  利息：
                  <span>{{ item.normalInterestAmount }}</span>
                </p>
                <p>
                  其他：
                  <span>{{ item.normalOtherAmount }}</span>
                </p>
                <p>
                  总金额：
                  <span>{{ item.normalTotalAmount }}</span>
                </p>
              </el-col>
            </el-col>
            <el-col class="overdue" :span="12">
              <el-col class="title" :span="8">
                <p>
                  逾期：
                </p>
              </el-col>
              <el-col class="data2" :span="16">
                <p>
                  逾期数：
                  <a v-if="item.overdueCount!==0" type="overdue" @click="goLenderList($event, item)">{{ item.overdueCount }}</a>
                  <span v-else>{{ item.overdueCount }}</span>
                </p>
                <p>
                  本金：
                  <span>{{ item.overduePrincipleAmount }}</span>
                </p>
                <p>
                  利息：
                  <span>{{ item.overdueInterestAmount }}</span>
                </p>
                <p>
                  罚息：
                  <span>{{ item.overduePenaltyAmount }}</span>
                </p>
                <p>
                  总金额：
                  <span>{{ item.overdueTotalAmount }}</span>
                </p>
              </el-col>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :page-size="6"
        :current-page.sync="nowPage"
        layout="prev, pager, next"
        :total="totalNum">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
  import { splitArray } from '@/common/util.js'
  import Bus from '@/eventBus'
  export default {
    props: ['dataToChild', 'todayData'],
    data() {
      return {
        pageArray: [],
        nowPage: 1,
        totalNum: 0
      }
    },
    methods: {
      goLenderList(event, item) {
        let type = event.target.getAttribute('type');
        console.log(item)
        this.$router.push('/loan')
        this.$store.commit('saveProductIdList', item[`${type}Ids`])
        Bus.$emit('proReceiveList-loanList')
      },
      handlePageChange(pageNum) {
        this.nowPage = pageNum
      }
    },
    watch: {
      dataToChild: function () {
        this.totalNum = this.dataToChild.length;
        this.pageArray = splitArray(this.dataToChild, 6);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pro-receive-list {
    .line {
      margin-bottom: 10px;
      border-bottom: 1px solid #dbdedf;
    }
    .list-item {
      font-size: 15px;
      margin-bottom: 10px;
      .el-card{
        /*height: 190px;*/
        .el-row{
          margin-bottom: 5px;
        }
        a{
          color: rgba(0, 0, 0, 0.58);
          text-decoration: underline;
          cursor: pointer;
        }
        .el-col{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .receive{
          background: rgba(92, 184, 92, 0.76);
          border-radius: 3px;
          color: #fff;
          border-right: 2px solid #fff;
        }
        .overdue{
          background: rgba(255, 0, 0, 0.49);
          color: #ffffff;
          border-radius: 3px;
          border-left: 2px solid #fff;
        }
        .title{
          text-align: center;
          height: 80px;
          line-height: 100px;
        }
        .top{
          height: 50px;
          text-align: center;
          line-height: 50px;
          font-weight: bold;
          color: #ffffff;
          background: rgba(51, 122, 183, 0.78);
          border-radius: 3px;
        }
        .data{
          line-height: (80/4) + px;
        }
        .data2{
          line-height: 20px;
        }
      }
      .el-row{
        margin-bottom: 15px;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
</style>
