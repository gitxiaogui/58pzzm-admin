<template>
  <el-row clas="product-main">
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="产品名称"
          icon="search"
          v-model="proName"
          :on-icon-click="productSearchClick">
        </el-input>
      </el-col>
      <!--<el-col :span="6" style="margin-left:10px;">
        <el-button type="info" @click="seach">搜索</el-button>
        <el-button type="warning">重置</el-button>
       </el-col>-->
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button icon="plus" type="info" @click="addProduct()">新增产品</el-button>
      </el-col>
    </el-row>
    <el-row>
      <productParams></productParams>
      <productAdd></productAdd>
      <productList :proName="searchProName"></productList>
    </el-row>
  </el-row>
</template>

<script>
  import productList from './productList.vue'
  import productParams from './productEdit.vue'
  import productAdd from './productAdd.vue'
  import Bus from '@/eventBus'
  export default {
    components:{
      productList,
      productParams,
      productAdd
    },
    data() {
      return {
        proName: '',
        searchProName: ''
      }
    },
    methods: {
      productSearchClick() {
        // console.log(this.proName)
        this.searchProName = this.proName;
      },


      addProduct() {
        Bus.$emit('productAddReload');
        this.$store.commit('changeCurrentAddProduct');
      }
    },
    mounted() {

    },
    activated() {
      this.proName = '';
      this.searchProName= ''
    }
  }
</script>

<style lang="scss" scoped>
  .el-row{
    margin-bottom: 5px;
    &:last-child{
      margin-bottom: 0px;
    }
  }
</style>
