<template>
  <el-row class="cost-main">
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="费用搜索"
          icon="search"
          v-model="costSearchName"
          :on-icon-click="costSearchClick">
        </el-input>
      </el-col>
    </el-row><!--v-if="checkPermission('100004002')"-->
    <el-row >
      <el-col :span="24">
        <el-button icon="plus" type="info" @click="addCost()">新增费用</el-button>
      </el-col>
    </el-row>
    <el-row>
      <costAdd></costAdd>
      <costEdit></costEdit>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <h3>费用列表</h3>
        <el-tree
          :default-expand-all="!treeOpen"
          @node-click="handleTreeClick"
          :props="defaultProps"
          node-key="id"
          :data="treeData"
          :load="loadNode"
          :highlight-current="true"
          lazy>
        </el-tree>
      </el-col>
      <!--<el-col :span="3">-->
      <!--<productNav></productNav>-->
      <!--</el-col>-->
      <!--<el-col :span="3">-->
      <!--<planNav></planNav>-->
      <!--</el-col>-->
      <el-col :span="18">
        <costNavigator></costNavigator>
        <costList :searchName="costSearchName" ref="get"></costList>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
  import productNav from './productNav.vue'
  import planNav from './planNav.vue'
  import costList from './costList.vue'
  import costAdd from './costAdd.vue'
  import costEdit from './costEdit.vue'
  import costNavigator from './costNavigator.vue'
  import {productinfoList, planInfoList} from '@/api/api'
  import {productCostMain} from '@/modal'
  import Bus from '@/eventBus'

  export default {
    components: {
      productNav,
      planNav,
      costList,
      costAdd,
      costEdit,
      costNavigator
    },
    data() {
      return productCostMain()
    },
    mounted() {
    },
    activated() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.getList()
      this.treeVisible = false;
      this.treeVisible = true;
    },
    methods: {
      handleTreeClick(item, node) {
        console.log(node)
        if (node.level === 1) {
          Bus.$emit('planNavContent');
          this.$router.push({path: 'cost', query: {prodId: node.data.prodId}})
        } else if (node.level === 2) {
          this.$router.push({path: 'cost', query: {prodId: node.data.prodId, setId: node.data.planId}})
        }
      },
      getList() {
        productinfoList({page: 1, rows: 999}).then((res) => {
          console.log('产品管理主界面',res)
          this.treeData = []
          let data = [];
          //产品列表res.products.list;
          res.products.list.forEach((item) => {
            data.push({
              label: `产品: ${item.prodName}`,
              id: item.id,
              prodId: item.id
            })
          })
          this.treeData = data
        });
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return
        } else if (node.level === 1) {
//                    let result = this.getPlanList(node.data.prodId);
          planInfoList(
            {
              page: 1,
              rows: 999,
              prodId: node.data.prodId
            }
          ).then((res) => {
            console.log(res)
            //套餐列表res.costInfoList.list;
            let data = [];
            if (!!res.costInfoList.list.length) {
              res.costInfoList.list.forEach((item) => {
                data.push({
                  label: `套餐: ${item.setName}`,
                  planId: `${item.id}`,
                  prodId: `${node.data.prodId}`
                })
              })
            }
            resolve(data)
          });
        } else if (node.level === 2) {
          resolve([])
        }
      },
      costSearchClick() {
        this.$refs.get.getList(1, true);
      },
      addCost() {
        if (this.$route.query.setId) {
          this.$store.commit('changeCurrentAddCost')
          Bus.$emit('costAddReload')
        } else {
          this.$message.error('请选择套餐')
        }
      }
    }
  }
</script>

<style lang="scss">
  .cost-main {
    .el-tree {
      .el-tree-node__children {
        .el-tree-node__content {
          padding-left: 40px !important;
          .el-tree-node__expand-icon {
            display: none;
          }
        }
      }
    }
    .el-row {
      margin-bottom: 5px;
    }
  }
</style>
