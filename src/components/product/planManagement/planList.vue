<template>
  <el-row class="plan-list">
    <h3>套餐列表</h3>
    <el-row :gutter="20">
      <el-col :span="3">
        <leftNav></leftNav>
      </el-col>
      <el-col :span="21">
        <el-table
          class="list-table"
          :data="currentList"
          highlight-current-row
          @row-click="planDetail"
          border
          style="width: 100%">
          <el-table-column
            label="套餐名称"
            header-align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.setName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="产品名称"
            header-align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.prodName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="优先级"
            header-align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.priority }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            header-align="center"
            label-class-name="table-header-bold">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.memo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200"
            label-class-name="table-header-bold">
            <template scope="scope">
              <el-col>
                <el-button

                  size="mini"
                  type="warning"
                  @click="changePlan(scope.$index, scope.row)">修改</el-button>
                <el-button

                  size="mini"
                  type="info"
                  @click="costManage(scope.$index, scope.row)">费用</el-button>
                <el-button

                  size="mini"
                  type="danger"
                  @click="deletePlan(scope.$index, scope.row)">删除</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="handlePageChange"
            :current-page.sync="pageNum"
            layout="prev, pager, next"
            :total="listTotalNumber">
          </el-pagination>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog size="small" :close-on-click-modal="true" :modal-append-to-body="false" title="套餐详情" :visible.sync="planDetailVisible">
      <el-row class="planDetail" v-if="currentDetail">
        <el-col :md="24" :lg="12"><p>套餐id：{{ currentDetail.id }}</p></el-col>
        <el-col :md="24" :lg="12"><p>产品id：{{ currentDetail.prodId }}</p></el-col>
        <el-col :md="24" :lg="12"><p>套餐名称：{{ currentDetail.setName }}</p></el-col>
        <el-col :md="24" :lg="12"><p>起始有效时间：{{ currentDetail.beginTimeStr }}</p></el-col>
        <el-col :md="24" :lg="12"><p>结束有效时间：{{ currentDetail.endTimeStr }}</p></el-col>
        <el-col :md="24" :lg="12"><p>优先级：{{ currentDetail.priority }}</p></el-col>
        <el-col :md="24" :lg="12"><p>备注: {{ currentDetail.memo }}</p></el-col>
        <el-col :md="24" :lg="12"><p>产品是否有效: {{ currentDetail.valid ? '有效' : '无效' }}</p></el-col>
        <el-col :md="24" :lg="12"><p>创建时间: {{ currentDetail.createTimeStr }}</p></el-col>
        <el-col :md="24" :lg="12"><p>更新时间: {{ currentDetail.updateTimeStr }}</p></el-col>
        <el-col :md="24" :lg="12"><p>操作人ID: {{ currentDetail.optId }}</p></el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
  import leftNav from './leftNav.vue'
  import { planInfoList, planDelete, costInfoList } from '@/api/api'
  import Bus from '@/eventBus'

  export default {
    components: {
      leftNav
    },
    data() {
      return {
        listTotalNumber: 0,
        pageNum: 1,
        currentList: null,
        planDetailVisible: false,
        currentDetail: null,
        timeRange: ''
      }
    },
    watch: {
      '$route': function () {
        this.pageNum = 1;
        this.getList()
      }
    },
    mounted() {
      this.pageNum = 1;
      this.getList();
    },
    methods: {
      //费用管理
      costManage(index, row) {
        this.$router.push({path: 'cost',query:{prodId: row.prodId, setId: row.id}})
      },
      deletePlan(index, row) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          planDelete({
            setId: row.id
          }).then((res)=>{
            console.log(res)
            if(res.code === '0000') {
              this.$message({
                type: 'success',
                message: '套餐删除成功！'
              });
              Bus.$emit('planListReload');
            } else {
              this.$message.error(res.message);
              return false;
            }
          })
        }).catch(() => {
          this.$message.info('已取消')
        })
        
      },
      //修改套餐信息
      changePlan(index, row) {
        this.$store.commit("changeCurrentEditPlan", row)
        Bus.$emit('getEditPlan', row)
      },
      //分页
      handlePageChange(pageNum){
        this.getList(pageNum);
      },
      //获取列表
      getList(index = this.pageNum){
        console.log(this.timeRange)
        if(!this.$route.query.prodId){
          this.currentList = [];
        }
        let beginTime, endTime;
        if(!!this.timeRange) {
          beginTime = new Date(this.timeRange[0]).getTime();
          endTime = new Date(this.timeRange[1]).getTime();
        } else {
          beginTime = 0;
          endTime = 0;
        }
        planInfoList({
          page: index,
          rows: 10,
          beginTime,
          endTime,
          prodId: this.$route.query.prodId
        }).then((res)=>{
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
        this.planDetailVisible = true;
        this.currentDetail = row;
      },
      //重新获取数据
      restartComponent() {
        this.getList(1);
      }
    },
    created() {
      Bus.$on('planListReload', ()=>{
        this.pageNum = 1
        this.getList(1)
      })
      Bus.$on('planMain-planList-timeChange', (timeRange)=> {
        this.pageNum = 1
        this.timeRange = timeRange;
        this.getList(1)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .plan-list{
    .el-row{
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
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
