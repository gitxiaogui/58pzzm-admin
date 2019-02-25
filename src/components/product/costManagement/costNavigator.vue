<template>
  <el-row class="cost-navigator">
    <h3>
      当前选择:
    </h3>
    <span v-if="this.selectedProduct.prodName" class="product">
      产品:
      <i>
         {{ this.selectedProduct.prodName}}
      </i>
    </span>
    <span v-if="this.selectedPlan.setName" class="plan">
      套餐:
      <i>
        {{ this.selectedPlan.setName }}
      </i>
    </span>
  </el-row>
</template>

<script>
  import {planInfoList, productinfoList} from '@/api/api'

  export default {
    activated() {
      this.selectedProduct = {}
      this.selectedPlan = {}
      this.checkNavigator()
    },
    watch: {
      '$route': function () {
        this.checkNavigator()
      }
    },
    data() {
      return {
        selectedProduct: {},
        selectedPlan: {}
      }
    },
    methods: {
      checkNavigator() {
        this.selectedPlan = {};
        if(!!this.$route.query.setId) {
          planInfoList(
            {
              page: 1,
              rows: 9999
            }
          ).then((res) => {
            console.log('导航套餐', res)
            res.costInfoList.list.forEach(item => {
              if(item.id === this.$route.query.setId) {
                this.selectedPlan = item
              }
            })
          });
        }

        productinfoList(
          {
            page: 1,
            rows: 9999,
            prodId: this.$route.query.prodId
          }
        ).then((res) => {
          console.log('导航产品', res)
          res.products.list.forEach(item => {
            if(item.id === this.$route.query.prodId) {
              this.selectedProduct = item;
            }
          })
        });
      }
    }
  }
</script>

<style lang="scss">
  .cost-navigator {
    h3 {
      display: inline-block;
      margin-bottom: 0px;
    }
    .product {
      i {
        color: #4a97e8;
        font-weight: bold;
      }
    }
    .plan {
      i {
        color: #2eb721;
        font-weight: bold;
      }
    }
  }
</style>