<template>
  <el-row class="left-nav">
    <el-row>
      <el-col :span="24">
        <el-table
          class="list-table"
          :data="currentList"
          highlight-current-row
          :row-class-name="setCurrentClass"
          @row-click="selectProduct"
          border>
          <el-table-column
            align="center"
            label="选择产品">
            <template scope="scope">
              <span>{{ scope.row.prodName }}</span>
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
  import { productinfoList } from '@/api/api'
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
      this.pageNum = 1;
      this.getList()
    },
    created() {
    },
    mounted() {
      this.getList(0)
    },
    watch: {
    },
    methods: {
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
      getList(index = this.pageNum) {
        productinfoList({page: index, rows: 10}).then((res)=>{
          this.listTotalNumber = res.products.total;
          this.currentList = res.products.list;
        });
      },
      selectProduct(row, event, column) {
        Bus.$emit('planNavContent');
        this.$router.push({path: 'cost', query: {prodId: row.id}})
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
