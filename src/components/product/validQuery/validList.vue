<template>
  <el-row class="valid-list">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input
                v-model="prodName"
                placeholder="产品名称"
        ></el-input>
      </el-col>
      <!--<el-col :span="6">
        <el-input
                v-model="id"
                placeholder="产品id"
        ></el-input>
      </el-col>-->
      <el-col :span="6">
        <el-input
                v-model="financeItemCode"
                placeholder="财务科目编号"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-input
                v-model="costItem"
                placeholder="费用名称"
        ></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input
                v-model="setName"
                placeholder="套餐名称"
        ></el-input>
      </el-col>
      <!--<el-col :span="6">
        <el-input
                v-model="setId"
                placeholder="套餐id"
        ></el-input>
      </el-col>-->
    </el-row>
    <el-row>
      <el-button icon="search" @click="getList()" type="info">搜索</el-button>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="4">
        <el-table
          class="list-table"
          :data="productsList"
          highlight-current-row
          @row-click="selectProduct"
          border
          style="width: 100%">
          <el-table-column
            prop="prodName"
            label="所属产品"
            label-class-name="table-header-bold"
            header-align="center">
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handlePageChange1"
          :current-page.sync="pageNum1"
          layout="prev, pager, next"
          :total="listTotalNumber1">
        </el-pagination>
      </el-col>
      <el-col :span="20">
        <el-table
          class="list-table"
          :data="currentList"
          highlight-current-row
          @row-click="itemDetail"
          border
          style="width: 100%">
          <el-table-column
            prop="prodName"
            label="所属产品"
            label-class-name="table-header-bold"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="setName"
            label="所属套餐"
            label-class-name="table-header-bold"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="costItem"
            label="费用名称"
            label-class-name="table-header-bold"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="cost"
            label="费用金额"
            label-class-name="table-header-bold"
            header-align="center">
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
    <el-dialog size="small" :close-on-click-modal="true" :modal-append-to-body="false" title="详情" :visible.sync="itemDetailVisible">
      <el-row v-if="itemDetailVisible">
        <el-col :md="24" :lg="12" ><p>产品id：{{ currentDetail.prodId }}</p></el-col>
        <el-col :md="24" :lg="12" ><p>产品名称：{{ currentDetail.prodName }}</p></el-col>
        <el-col :md="24" :lg="12" ><p>套餐名称：{{ currentDetail.setName }}</p></el-col>
        <el-col :md="24" :lg="12" ><p>套餐id：{{ currentDetail.setId }}</p></el-col>
        <el-col :md="24" :lg="12" ><p>费用名称：{{ currentDetail.costItem }}</p></el-col>
        <el-col :md="24" :lg="12" ><p>财务科目编号：{{ currentDetail.finaceItemCode }}</p></el-col>
        <!--<el-col :md="24" :lg="12" ><p>备注：{{ currentDetail.memo }}</p></el-col>-->
        <!--<el-col :md="24" :lg="12" ><p>起始有效时间：{{ currentDetail.beginTime }}</p></el-col>
        <el-col :md="24" :lg="12" ><p>结束有效时间：{{ currentDetail.endTime }}</p></el-col>
        <el-col :md="24" :lg="12" ><p>优先级：{{ currentDetail.priority }}</p></el-col>
        <el-col :md="24" :lg="12" ><p>备注: {{ currentDetail.memo }}</p></el-col>
        <el-col :md="24" :lg="12" ><p>创建时间: {{ currentDetail.createTimeStr }}</p></el-col>
        <el-col :md="24" :lg="12" ><p>更新时间: {{ currentDetail.updateTimeStr }}</p></el-col>-->
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
  import { costSetInfoList, productinfoList } from '@/api/api'
  export default {
    data() {
      return {
        itemDetailVisible: false,
        currentDetail: {},
        currentList: [],
        productsList:[],
        pageNum: 1,
        pageNum1:1,
        listTotalNumber: 0,
        listTotalNumber1: 0,
        prodName: '',
        id: '',
        financeItemCode: '',
        costItem: '',
        setName: '',
        setId: '',
      }
    },
    methods: {
      //点击产品筛选
      selectProduct(row, event, column){
        console.log(row)
        this.id = row.id
        this.getList()
      },
      itemDetail(row) {
        this.currentDetail = row;
        this.itemDetailVisible = true;
      },
      handlePageChange(pageNum) {
        this.getList(pageNum)
      },
      getList(index = 1) {
        costSetInfoList(
          {
            page: index,
            rows: 10,
            prodName: this.prodName,
            prodId: this.id ? this.id : this.productsList[0].id,
            finaceItemCode: this.financeItemCode,
            costItem: this.costItem,
            setName: this.setName,
            setId: this.setId
          }
        ).then((res) => {
          console.log(res)
          this.currentList = res.costSetInfos.list;
          this.listTotalNumber = res.costSetInfos.total;
        })
      },
      getProductinfoList(index = this.pageNum1) {
        productinfoList({page: index, rows: 100}).then((res)=>{
          this.productsList = res.products.list;
          this.listTotalNumber1 = res.products.total;
          console.log(1,this.productsList)
          //dsads
          this.getList()
        });
      },
      handlePageChange1(pageNum1) {
        this.getList(pageNum1)
      },
    },
    mounted() {

      this.getProductinfoList()

    },
    activated() {
      this.pageNum = 1;
      this.prodName = '';
      this.id = '';
      this.financeItemCode = '';
      this.costItem = '';
      this.setName = '';
      this.setId = '';
    }
  }
</script>

<style lang="scss">
  .valid-list {
    .list-table{
      margin-bottom: 10px;
      cursor: pointer;
    }
    .el-row {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-card {
      margin-bottom: 10px;
    }
    .el-dialog{
      p{
        font-size: 14px;
        margin-bottom: 15px;
      }
    }
  }
</style>
