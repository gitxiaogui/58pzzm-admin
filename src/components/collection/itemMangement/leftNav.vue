<template>
  <el-card :body-style="{padding: '10px'}" :class="{'close': !open, 'left-nav': true}">
    <div :class="{'close': !open}">
      <el-row>
        <el-button
          :icon="`arrow-${open ? 'right' : 'left'}`"
          size="small"
          type="info"
          @click="handleMenu()"></el-button>
      </el-row>
      <el-row v-if="open">
        <el-row>
          <el-col>
            <el-input
              placeholder="请输入姓名"
              icon="search"
              @change="getList(1)"
              v-model="searchName">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              ref="tableColumn"
              class="list-table"
              :data="currentList"
              :row-class-name="setCurrentClass"
              highlight-current-row
              @row-click="selectCase"
              border>
              <el-table-column
                align="center"
                label="选择案件">
                <template scope="scope">
                  <span>{{ `${ scope.row.debtorName} 逾期天数:${ scope.row.overdueDays}` }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-pagination
            small
            @current-change="handlePageChange"
            layout="prev, pager, next"
            :total="listTotalNumber">
          </el-pagination>
        </el-row>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  import { collectCaseList } from '@/api/api'
  import Bus from '@/eventBus'

  export default {
    data() {
      return {
        pageNum: 1,
        listTotalNumber: 0,
        searchName: '',
        currentList: null,
        open: false
      }
    },
    mounted() {
      this.getList(1)
    },
    methods: {
      handleMenu() {
        this.open = !this.open;
      },
      setCurrentClass(row, index) {
        if (row.id === this.$route.query.prodId) {
          return 'current-row';
        } else {
          return '';
        }
      },
      handlePageChange(pageNum){
        this.getList(pageNum);
      },
      getList(index = 1) {
        collectCaseList(
          {
            page: index,
            size: 10,
            debtorName: this.searchName,
            sortBy: 'debtTIme',
            sortOrder: 'asc',
          }
        ).then((res)=>{
        	console.log('3333333333333333333333333',res)
          this.listTotalNumber = res.total;
          this.currentList = res.data;
        });
      },
      selectCase(row, event, column) {
        localStorage.removeItem('currentCollectionCase');
        localStorage.setItem('currentCollectionCase', JSON.stringify(row))
        Bus.$emit('changeCurrentCollectionCase');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .left-nav {
    position: fixed;
    width: 260px;
    right: 30px;
    top: 200px;
    z-index: 99;
    cursor: pointer;
    &.close {
      width: 50px;
    }
    .el-row {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
    .el-card__body {
      padding: 10px;
    }
  }
</style>
