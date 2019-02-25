<template>
  <el-row class="config-code">
    <el-row v-if="currentData.length">
      <el-select v-model="type" placeholder="选择类型">
        <el-option v-for="item in financeCodeConfigType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <el-table
      class="list-table"
      :data="currentData"
      highlight-current-row
      border
      style="width: 100%">
      <el-table-column
        width="80"
        label="选择">
        <template scope="scope">
          <el-checkbox v-model="scope.row.selected"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        label="名称">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.itemName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="财务科目编号">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.finaceItemCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="级别">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.lvl }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="6">
        <el-button v-if="currentData.length" @click="saveConfig()" type="success">保存</el-button>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import { financeCodeConfigType } from '@/common/formRules.js'
  import { financeCodeGetConfig, financeCodeModifyConfig } from '@/api/api'
  import Bus from '@/eventBus'
  export default {
    props: ['dataToChild'],
    data() {
      return {
        currentData: [],
        type: '1',
        financeCodeConfigType
      }
    },
    methods: {
      saveConfig() {
        let financeItemCodeList = [];
        for(let i = 0; i < this.currentData.length; i++) {
          if(this.currentData[i].selected) {
            financeItemCodeList.push(this.currentData[i].finaceItemCode)
          }
        }
        financeCodeModifyConfig(
          {
            pCode: this.dataToChild.finaceItemCode,
            type: this.type,
            financeItemCodeList
          }
        ).then((res) => {
          if(res.code === '00000000') {
            this.$message({
              type: 'success',
              message: '修改成功！'
            });
            Bus.$emit('topList-dialog-close')
          } /*else {
            this.$message.error(res.message);
          }*/
        })
      }
    },
    mounted() {
      financeCodeGetConfig(
        {
          pCode: this.dataToChild.finaceItemCode
        }
      ).then((res)=>{
        console.log(res)
        if(res.type === '') {
          this.type = '1'
        } else {
          this.type = res.type
        }
        this.currentData = res.financeItemTreeLeafNodes
      })
    }
  }
</script>

<style lang="scss" scoped>
  .config-code {
    .el-row{
      margin-bottom: 10px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .list-table {
      margin-bottom: 10px;
    }
  }
</style>
