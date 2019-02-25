<template>
  <el-row class="left-nav">
    <el-row>
      <el-col :span="24">
        <el-table
          class="list-table"
          :data="currentList"
          :row-class-name="setCurrentClass"
          highlight-current-row
          @row-click="selectPlan"
          border>
          <el-table-column
            align="center"
            label="选择套餐">
            <template scope="scope">
              <span>{{ scope.row.setName }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="pageNum"
        layout="prev, pager, next"
        :total="listTotalNumber">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
  import { planInfoList } from '@/api/api'
  import Bus from '@/eventBus'
  export default {
    data() {
      return {
        pageNum: 1,
        listTotalNumber: 0,
        currentList: null
      }
    },
    activated() {
      this.pageNum = 1
      this.getList()
    },
    created() {
      Bus.$on('planNavContent', ()=>{

      })
    },
    mounted() {
      this.getList(0)
    },
    watch: {
      '$route.query' : {
        handler: function (val, oldVal) {
          console.log(val)
          if(val.prodId !== oldVal.prodId) {
            this.getList(1)
          }
        }
      }
    },
    computed: {

    },
    methods: {
      setCurrentClass(row, index) {
        if (row.id === this.$route.query.setId) {
          return 'current-row';
        } else {
          return '';
        }
      },
      handlePageChange(pageNum){
        this.getList(pageNum);
      },
      getList(index = this.pageNum) {
        planInfoList(
          {
            page: index,
            rows: 10,
            prodId: this.$route.query.prodId
          }
        ).then((res)=>{
          console.log(res)
          this.listTotalNumber = res.costInfoList.total;
          this.currentList = res.costInfoList.list;
          console.log(this.currentList)
        });
      },
      selectPlan(row, event, column) {
        let route  = `/cost?prodId=${this.$route.query.prodId}&setId=${row.id}`;
        this.$router.push(route)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .left-nav{
    .el-card{
      .el-card__body{
        padding: 5px;
      }
    }
    .list-table{
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
</style>
