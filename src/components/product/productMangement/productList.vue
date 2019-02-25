<template>
  <el-row class="product-list">
    <h3>产品列表</h3>
    <el-table
      class="list-table"
      :data="currentList"
      highlight-current-row
      @row-click="productDetail"
      border
      style="width: 100%">
      <el-table-column
        label="产品名称"
        header-align="center"
        label-class-name="table-header-bold">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.prodName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="基本金额"
        header-align="center"
        label-class-name="table-header-bold">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.basicAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最大续期次数"
        header-align="center"
        label-class-name="table-header-bold">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.maxRenewalCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否已发布"
        header-align="center"
        label-class-name="table-header-bold">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.isPublish === 1 ? '已发布' : '未发布' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
        header-align="center"
        label-class-name="table-header-bold"
        >
        <template scope="scope">
          <el-col>
            <el-button

              size="mini"
              type="warning"
              v-show="scope.row.isPublish === 0"
              @click="changeProductItem(scope.$index, scope.row)">修改
            </el-button>
            <el-button

              size="mini"
              :type="scope.row.isPublish === 0 ? 'success': 'danger'"
              @click="handleShelf(scope.$index, scope.row)">{{ scope.row.isPublish === 1 ? '下' : '上' }}架
            </el-button>
            <el-button

              size="mini"
              type="info"
              @click="goPlan(scope.$index, scope.row)">套餐
            </el-button>
            <el-button

              size="mini"
              type="danger"
              v-show="scope.row.isPublish === 0"
              @click="deleteProduct(scope.$index, scope.row)">删除
            </el-button>
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
    <el-dialog size="small" :close-on-click-modal="true" :modal-append-to-body="false" title="产品详情"
               :visible.sync="productDetailVisible">
      <el-row class="productDetail" v-if="currentDetail">
        <el-col :md="24" :lg="12"><p>产品id：{{ currentDetail.id }}</p></el-col>
        <el-col :md="24" :lg="12"><p>产品编号：{{ currentDetail.prodCode }}</p></el-col>
        <el-col :md="24" :lg="12"><p>产品名称：{{ currentDetail.prodName }}</p></el-col>
        <el-col :md="24" :lg="12"><p>产品类型：{{ currentDetail.prodType }}</p></el-col>
        <el-col :md="24" :lg="12"><p>基本金额：{{ currentDetail.basicAmount }}</p></el-col>
        <el-col :md="24" :lg="12"><p>产品周期数：{{ currentDetail.period }}{{ periodSpanOptions[currentDetail.periodSpan] }}</p></el-col>
        <el-col :md="24" :lg="12"><p>产品周期粒度: {{ currentDetail.periodSpan }}</p></el-col>
        <el-col :md="24" :lg="12"><p>最大续期次数: {{ currentDetail.maxRenewalCount }}</p></el-col>
        <el-col :md="24" :lg="12"><p>最大逾期次数: {{ currentDetail.maxOverdueCount }}</p></el-col>
        <el-col :md="24" :lg="12"><p>是否发布: {{ currentDetail.isPublish === 1 ? '已发布' : '未发布' }}</p></el-col>
        <el-col :md="24" :lg="12"><p>产品是否有效: {{ currentDetail.prodCode ? '有效' : '无效'}}</p></el-col>
        <el-col :md="24" :lg="12"><p>创建时间: {{ new Date(currentDetail.createTime).toLocaleString() }}</p></el-col>
        <el-col :md="24" :lg="12"><p>更新时间: {{ new Date(currentDetail.updateTime).toLocaleString() }}</p></el-col>
        <el-col :md="24" :lg="12"><p>操作人ID: {{ currentDetail.optId }}</p></el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
  import {productinfoList, productOnshelf, productOffshelf, productDelete} from '@/api/api'
  import Bus from '@/eventBus'

  export default {

    data() {
      return {
        listTotalNumber: 0,
        pageNum: 1,
        currentList: null,
        productDetailVisible: false,
        currentDetail: null,
        periodSpanOptions:{ '0': '无','1':'日','2':'周','3':'月','4':'年'},
      }
    },
    props: ['proName'],
    watch: {
      proName: function() {
        this.getList(1)
      }
    },
    methods: {
      goPlan(index, row) {
        this.$router.push({path: 'plan', query: {prodId: row.id}});
      },
      handleShelf(index, row) {
        console.log(row)
        let toDo = "下"
        if (row.isPublish === 0) {
          toDo = "上"
        }
        this.$confirm('是否确认' + toDo + '架?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (row.isPublish === 0) {
            productOnshelf(
              {
                prodId: row.id
              }
            ).then((res) => {
              if (res.code === '00000000') {
                this.$message({
                  type: 'success',
                  message: '产品上架成功！'
                });
                console.log(res)
                Bus.$emit('productListReload');
              }
            }).catch((res) => {
              console.log(res)
            })
          } else if (row.isPublish === 1) {
            productOffshelf(
              {
                prodId: row.id
              }
            ).then((res) => {
              if (res.code === '00000000') {
                this.$message({
                  type: 'success',
                  message: '产品下架成功！'
                });
                Bus.$emit('productListReload');
              }
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      deleteProduct(index, row) {
        // console.log(row.id)
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          productDelete({
            prodId: row.id
          }).then((res) => {
            if (res.code === '00000000') {
              this.$message({
                type: 'success',
                message: '删除产品成功！'
              });
              Bus.$emit('planLeftNav');
              Bus.$emit('productListReload');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      //修改产品信息
      changeProductItem(index, row) {
        this.$store.commit('changeCurrentEditProduct', row);
        Bus.$emit('getEditProduct', row)
      },
      //分页
      handlePageChange(pageNum) {
//        this.pageNum++;
        this.getList(pageNum);
      },
      //获取列表
      getList(index = this.pageNum) {
        console.log(this.proName)
        productinfoList(
          {
            prodName: this.proName,
            page: index,
            rows: 10
          }
        ).then((res) => {
          console.log('产品管理主界面获取列表',res)
          this.listTotalNumber = res.products.total;
          this.currentList = res.products.list;
          console.log(res)
        });
      },
      //展示弹出框
      productDetail(row, event, column) {
          console.log(row,event,column)
        if (column.label === '操作') {
          event.stopPropagation();
          return false;
        }
        this.productDetailVisible = true;
        this.currentDetail = row;
      },
      //重新获取数据
      restartComponent() {
        this.pageNum = 1;
        this.getList(1);
      }
    },
    created() {
      Bus.$on('productListReload', () => {
        this.restartComponent()
      })
      this.getList(1)
    },
    activated() {
      this.pageNum = 1;
    }
  }
</script>

<style lang="scss" scoped>
  .product-list {
    .el-button {
      margin-left: 10px;
    }
    .list-table {
      margin-bottom: 10px;
      cursor: pointer;
    }
    .el-dialog {
      p {
        font-size: 14px;
        margin-bottom: 15px;
      }
    }
  }
</style>
