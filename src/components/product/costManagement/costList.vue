<template>
  <el-row class="cost-list">
    <el-row>
      <el-col>
        <el-table
          class="list-table"
          :data="currentList"
          highlight-current-row
          @row-click="planDetail"
          border
          style="width: 100%">
          <el-table-column
            label="费用名称"
            header-align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.costItem }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="费用"
            header-align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.cost }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="计费粒度"
            header-align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
              <span style="margin-left: 10px">{{ ['无', '日', '周', '月', '年'][Number(scope.row.timeSpan)] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否有效"
            header-align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.valid ? '有效' : '无效' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" label-class-name="table-header-bold" width="200">
            <template scope="scope">
              <el-col><!-- v-if="checkPermission('100004004')"-->
                <el-button

                  size="mini"
                  type="warning"
                  @click="changeCost(scope.$index, scope.row)">修改</el-button><!-- v-if="checkPermission('100004003')"-->
                <el-button

                  size="mini"
                  type="danger"
                  @click="deleteCost(scope.$index, scope.row)">删除</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="handlePageChange"
            layout="prev, pager, next"
            :total="listTotalNumber">
          </el-pagination>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog size="small" :close-on-click-modal="true" :modal-append-to-body="false" title="费用详情" :visible.sync="costDetailVisible">
      <el-row class="planDetail" v-if="currentDetail">
        <el-col :md="24" :lg="12"><p>费用id：{{ currentDetail.id }}</p></el-col>
        <el-col :md="24" :lg="12"><p>产品id：{{ currentDetail.prodId }}</p></el-col>
        <el-col :md="24" :lg="12"><p>套餐id：{{ currentDetail.setId }}</p></el-col>
        <el-col :md="24" :lg="12"><p>费用类型：{{ ['正常', '逾期', '续期'][Number(currentDetail.ciType-1)] }}</p></el-col>
        <el-col :md="24" :lg="12"><p>所属财务科目编号：{{ currentDetail.finaceItemCode }}</p></el-col>
        <el-col :md="24" :lg="12"><p>费用名称：{{ currentDetail.costItem }}</p></el-col>
        <el-col :md="24" :lg="12"><p>费用：{{ currentDetail.cost }}</p></el-col>
        <el-col :md="24" :lg="12"><p>计费粒度: {{ ['无', '日','周', '月', '年'][Number(currentDetail.timeSpan)] }}</p></el-col>
        <el-col :md="24" :lg="12"><p>费用是否有效: {{ currentDetail.valid ? '有效' : '无效' }}</p></el-col>
        <el-col :md="24" :lg="12"><p>创建时间: {{ currentDetail.createTimeStr }}</p></el-col>
        <el-col :md="24" :lg="12"><p>更新时间: {{ currentDetail.updateTimeStr }}</p></el-col>
        <el-col :md="24" :lg="12"><p>操作人ID: {{ currentDetail.optId }}</p></el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
  import { costInfoDetail, planDelete, costInfoList, costDeleteItem } from '@/api/api'
  import Bus from '@/eventBus'
  export default {
    components: {
    },
    props: ['searchName'],
    data() {
      return {
        listTotalNumber: 0,
        pageNum: 1,
        currentList: null,
        costDetailVisible: false,
        currentDetail: null
      }
    },
    activated() {
      this.pageNum = 1;
      this.getList()
    },
    watch: {
      '$route': function () {
        console.log(21312)
        this.getList()
      }
    },
    methods: {
      deleteCost(index, row) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          costDeleteItem({
            costId: row.id
          }).then((res)=>{
            console.log(res)
            if(res.code === '00000000') {
              this.$message({
                type: 'success',
                message: '费用删除成功！'
              });
              this.getList(1)
            } /*else {
              this.$message.error(res.message);
              return false;
            }*/
          })
        }).catch(() => {
          this.$message.info('已取消');
        })
      },
      //修改费用信息
      changeCost(index, row) {
        this.$store.commit("changeCurrentEditCost", row)
        console.log(row)
        Bus.$emit('getEditCost', row)
      },
      //分页
      handlePageChange(pageNum){
        this.getList(pageNum);
      },
      //获取列表
      getList(index = this.pageNum, flag = false){
        if(!this.$route.query.setId && !flag){
          this.currentList = [];
          return;
        }
        costInfoList({
          page: index,
          rows: 10,
          costItem: this.searchName,
          setId: this.$route.query.setId
        }).then((res)=>{
//          console.log(res.data.costInfoList.list)
          console.log(res)
          this.listTotalNumber = res.costInfoList.total;
          this.currentList = res.costInfoList.list;
        });
      },
      //展示弹出框
      planDetail(row, event, column) {
        if(column.label === '操作') {
          event.stopPropagation();
          return false;
        }
        this.currentDetail = row;
        this.costDetailVisible = true;
      },
      //重新获取数据
      restartComponent() {
        this.getList(1);
      }
    },
    mounted() {
      this.getList(0)
    },
    created() {
      Bus.$on('costListReload', ()=>{
        this.getList(1)
      })
    },
  }
</script>

<style lang="scss" scoped>
  .cost-list{
    .list-table{
      margin-bottom: 10px;
      cursor: pointer;
    }
    .el-dialog{
      p{
        font-size: 14px;
        margin-bottom: 15px;
      }
    }
  }
</style>
