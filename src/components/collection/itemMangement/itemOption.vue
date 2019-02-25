<template>
    <div class="item-option clearfix">
      <el-row>
        <el-col>
          <leftNav></leftNav>
        </el-col>
        <el-col>
          <el-row :gutter="10">
            <el-col :lg="12" :md="24">
              <basicInfo></basicInfo>
            </el-col>
            <el-col :lg="12" :md="24">
              <noteList></noteList>
            </el-col>
          </el-row>
          <el-tabs type="border-card">
            <el-tab-pane  label="联系人">
              <contacts></contacts>
            </el-tab-pane>
            <el-tab-pane label="还款记录">
              <repayMent></repayMent>
            </el-tab-pane>
            <el-tab-pane label="减免管理">
              <abateMent></abateMent>
            </el-tab-pane>
            <el-tab-pane label="历史操作">
              <history></history>
            </el-tab-pane>
            <el-tab-pane  label="附加信息">
              <additionalMessage></additionalMessage>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import leftNav from './leftNav.vue'
  import basicInfo from './basicInfo.vue'
  import contacts from './contacts.vue'
  import noName from './noName.vue'
  import optionArea from './optionArea.vue'
  import contactWith from './contactWith.vue'
  import history from './history.vue'
  import noteList from './noteList.vue'
  import repayMent from './repayMent.vue'
  import additionalMessage from './additionalMessage.vue'
  import abateMent from './abateMent.vue'
  export default {
    components: {
      leftNav,
      basicInfo,
      contacts,
      optionArea,
      noName,
      contactWith,
      history,
      noteList,
      repayMent,
      additionalMessage,
      abateMent
    }
  }
</script>

<style lang="scss">
  .item-option {
    .el-tabs__content {
      padding-top: 0;
    }
    .el-card__body {
      padding: 0px 10px 10px;
    }
    .el-card {
      margin-bottom: 10px;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
  }
</style>
