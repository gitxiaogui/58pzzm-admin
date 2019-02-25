import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/Home.vue'

import ProductMain from '@/components/product/productMangement/main.vue'
import PlanMain from '@/components/product/planManagement/main.vue'
import CostMain from '@/components/product/costManagement/main.vue'
import ValidMain from '@/components/product/validQuery/main.vue'
import ShopList from '@/components/product/shopManage/main'
// import OverdueListMain from '@/components/product/proReceivableStatistics/overdueList.vue'
// import NormalListMain from '@/components/product/proReceivableStatistics/normalList.vue'

import ProOutMain from '@/components/lender/proOutStatistics/main.vue'
import ProInMain from '@/components/lender/proReceivableStatistics/main.vue'
// import CaseMain from '@/components/lender/caseManagement/main.vue'
import LoanMain from '@/components/lender/loanManagement/main.vue'

import CollectionMain from '@/components/collection/collectionManagement/main.vue'
import CollectionItem from '@/components/collection/itemMangement/main.vue'
//import CollectionReview from '@/components/collection/reviewManagement/main.vue'
import CollectionReview from '@/components/collection/reviewManagement/reviewRepayment.vue'
import ReviewManagement from '@/components/collection/reviewManagement/reviewAbatement.vue'
import DivisionManagement from '@/components/collection/reviewManagement/assignManagement.vue'
import WithdrawManagement from '@/components/collection/reviewManagement/reviewRevocation.vue'
import AbandonrecordManagement from '@/components/collection/reviewManagement/reviewWaive.vue'


import LoginMain from '@/components/login/main.vue'

import AuthMain from '@/components/authorization/authManagement/main.vue'
import RoleMain from '@/components/authorization/roleManagement/main.vue'
import AuthUserMain from '@/components/authorization/authUserManagement/main.vue'
import DepartMain from '@/components/authorization/departmentManagement/main.vue'

/*TODO 财务模块*/
import LoanStatisticsMain from '@/components/finance/loanStatistics/main.vue'
import ReceivedStatisticsMain from '@/components/finance/receivedStatistics/main.vue'
import InQueryMain from '@/components/finance/prodInQuery/main.vue'
import OutQueryMain from '@/components/finance/prodOutQuery/main.vue'
import CodeMain from '@/components/finance/financeCode/main.vue'
import FinanceConfigMain from '@/components/finance/statisticsConfig/main.vue'
import FinanceCodeSubMain from '@/components/finance/financeCode/subList.vue'
import loanConfirm from '@/components/finance/loanConfirm/main.vue'
import loanBatchConfirm from '@/components/finance/loanBatchConfirm/main.vue'
import returnMoneyStatis from '@/components/finance/returnMoneyStatis/main'
import deductMoney from '@/components/finance/deductMoney/main'
/*TODO 资方菜单*/
import CapitalManage from '@/components/capitalManage/main'
import DataStatistics from '@/components/capitalManage/dataStatistics'



import UserIntegral from '@/components/integral/userIntegral.vue'
import IntegralManage from '@/components/integral/integralManage.vue'

//TODO 回款确认
import PaymentConfirm from '@/components/finance/remittance/main.vue'
import PaymentConfirmbatch from '@/components/finance/remittancebatch/main.vue'

import { checkPermission } from "../common/util"

//TODO 机构管理
import OrgManage from '@/components/orgManage/main'
import Diversion from '@/components/orgManage/diversionManage/main'
import PlatformProduct from '@/components/orgManage/platformProductManage/main'
import Platform from '@/components/orgManage/platformManage/main'
import PlatformDiversion from '@/components/orgManage/platformDiversionManage/main'

// import ChannelManage from '@/components/orgManage/channelManage/main'
// import OrgProductManage from '@/components/orgManage/orgProductManage/main'

//TODO 数据分析
import DataAnalysis from '@/components/dataAnalysis/refundManage/main'
import FlowManage from '@/components/dataAnalysis/flowManage/main'
import BorrowMoneyManage from '@/components/dataAnalysis/borrowMoneyManage/main'
import RiverDiversion from '@/components/dataAnalysis/riverDiversion/main'
import LendMoneyManage from '@/components/dataAnalysis/lendMoneyManage/main'

import LoanManage from '@/components/dataAnalysis/loanManage/main'
import ExpireManage from '@/components/dataAnalysis/expireManage/main'

//TODO 机审模块
import DataSourceManage from '@/components/machineRules/main'
import MachineRules from '@/components/machineRules/machineRules'
import ProductSourceMagage from '@/components/machineRules/productSourceMagage'
import OrderManage from '@/components/machineRules/orderManage'
import OrderManageDetail from '@/components/machineRules/orderManageDetail'
import DataSourceDetailList from '@/components/machineRules/dataSourceDetail/main'
import OrderAllList from '@/components/machineRules/orderAllList'
import OverdueManage from '@/components/machineRules/overDueManage/main'
import OverduvDetail from '@/components/machineRules/overDueManage/overduvDetail'

//TODO 轮播
import Banner from '@/components/banner/bannerList'

Vue.use(Router)

const loginRoute =  {
  path: '/login',
  component: LoginMain,
  name: '',
  hidden: true,
  beforeEnter(to, from, next) {
    sessionStorage.removeItem('authorization');
    localStorage.removeItem('permission');
    next();
  }
}

function getAfterRoutes(){
  return [
    {
      path: '/',
      name: '产品管理',
      redirect: '/product',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('PRODUCT'),
      component: Home,
      children: [
        {path: '/product', hidden: !checkPermission('PRODUCT_MAIN_PAGE'), component: ProductMain, name: '产品管理主界面'},
        {path: '/shopList', hidden: !checkPermission('PRODUCT_GOODS_PAGE'), component: ShopList, name: '商品管理主界面'},
        {path: '/plan', hidden: !checkPermission('PRODUCT_SETTLE_PAGE'), component: PlanMain, name: '套餐管理主界面'},
        {path: '/cost', hidden: !checkPermission('PRODUCT_COST_PAGE'), component: CostMain, name: '费用管理主界面'},
        {path: '/valid-list', hidden: !checkPermission('PRODUCT_VALID_PRO_SETTLR_PAGE'), component: ValidMain, name: '有效产品套餐费用信息'}
      ]
    },
      {
      path: '/',
      name: '机构管理',
      redirect: '/orgManage',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('ORG'),
      component: Home,
      children: [
        { path: '/orgManage',hidden: !checkPermission('ORG_MANAGER_PAGE'), component: OrgManage, name: '机构管理主界面'},
        { path: '/diversion',hidden: !checkPermission('ORG_DIVERSION_PAGE'), component: Diversion, name: '导流管理主界面'},
        { path: '/platformProduct',hidden: !checkPermission('ORG_PLATFORM_PRODUCT_MAP_PAGE'), component: PlatformProduct, name: '平台产品主界面'},
        { path: '/platform',hidden: !checkPermission('ORG_PLATFORM_PAGE'), component: Platform, name: '平台管理主界面'},
        { path: '/platformDiversion',hidden: !checkPermission('ORG_PLATFORM_DIVER_MAP_PAGE'), component: PlatformDiversion, name: '平台导流主界面'},

        // { path: '/channelManage',hidden: !checkPermission('ORG_CHANNEL'), component: ChannelManage, name: '渠道管理主界面'},
        // { path: '/orgProductManage',hidden: !checkPermission('ORG_CHANNEL'), component: OrgProductManage, name: '机构产品映射主界面'},
        // { path: '/integralManage',hidden: false, component: IntegralManage, name: '积分规则管理'},
      ]
    },
    {
      path: '/',
      name: '借款管理',
      redirect: '/loan',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('LOAN'),
      component: Home,
      children: [
        {path: '/product-out', hidden: !checkPermission('LOAN_COUNT'), component: ProOutMain, name: '放款统计'},
        {path: '/product-in',hidden: !checkPermission('LOAN_RECEVABLE_COUNT'), component: ProInMain, name: '应收统计'},
        {path: '/loan',hidden: !checkPermission('LOAN_RECORD') ,component: LoanMain, name: '借款记录'},
        // {path: '/case', component: CaseMain, name: '流水记录'}
      ]
    },
    /*{
      path: '/',
      name: '催收管理',
      redirect: '/collection',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('COLLECT'),
      component: Home,
      children: [
        {path: '/collection', hidden: !checkPermission('COLLECT_CASE_LIST'),component: CollectionMain, name: '催收案件列表'},
        {path: '/collection-item', hidden: !checkPermission('COLLECT_OPEATE_PANEL'), component: CollectionItem, name: '催收操作面板'},
        {path: '/collection-review', hidden: !checkPermission('COLLECT_RETURN_AUDIT'), component: CollectionReview, name: '还款审核管理'},
        {path: '/collection-management', hidden: !checkPermission('COLLECT_REDUCE_AUDIT'), component: ReviewManagement, name: '减免审核管理'},
        {path: '/collection-division', hidden: !checkPermission('COLLECT_DIVISION_AUDIT'), component: DivisionManagement, name: '分案管理'},
        {path: '/collection-withdraw', hidden: !checkPermission('COLLECT_WITHDRAW_AUDIT'), component: WithdrawManagement, name: '撤案管理'},
        {path: '/collection-abandonrecord', hidden: !checkPermission('COLLECT_DIS_AUDIT'), component: AbandonrecordManagement, name: '弃案管理'},
      ]
    },*/
    {
      path: '/',
      name: '权限管理',
      redirect: '/auth',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('POWER'),
      component: Home,
      children: [
        {path: '/auth',hidden: !checkPermission('POWER_MANAGER_MAIN'), component: AuthMain, name: '权限管理主界面'},
        {path: '/role',hidden: !checkPermission('POWER_ROLE_MANAGER'), component: RoleMain, name: '角色信息管理'},
        {path: '/auth-user',hidden: !checkPermission('POWER_USER_MANAGER'), component: AuthUserMain, name: '人员管理'},
        {path: '/department', hidden: !checkPermission('POWER_DEPT_MANAGER'), component: DepartMain, name: '部门管理'}
      ]
    },
    {
      path: '/',
      name: '财务统计',
      redirect: '/finance-outList',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('FINACE'),
      component: Home,
      children: [
        // { path: '/finance-loan', hidden: !checkPermission('FINACE_OUT_COUNT'), component: LoanStatisticsMain, name: '出账统计' },
        // { path: '/finance-received', hidden: !checkPermission('FINACE_IN_COUNT'), component: ReceivedStatisticsMain, name: '入账统计' },
        { path: '/finance-outList', hidden: !checkPermission('FINACE_OUT_LIST'), component: OutQueryMain, name: '出账列表' },
        { path: '/finance-inList', hidden: !checkPermission('FINACE_IN_LIST'),component: InQueryMain, name: '入账列表' },
        { path: '/finance-code',hidden: !checkPermission('FINACE_ITEM'), component: CodeMain, name: '财务科目编号'},
        { path: '/finance-loanConfirm',hidden: !checkPermission('FINACE_LOAN_LIST'), component: loanConfirm, name: '待放款列表'},
        // { path: '/finance-loanBatchConfirm', hidden: !checkPermission('FINACE_LOAN_MATCH'),component: loanBatchConfirm, name: '批量放款'},
        { path: '/finance-payment',hidden: !checkPermission('FINACE_RETURN_LIST'), component: PaymentConfirm, name: '待回款列表'},
        { path: '/finance-returnMoney',hidden: !checkPermission('FINACE_RETURN_LIST'), component: returnMoneyStatis, name: '回款统计'},
        { path: '/deductMoney',hidden: !checkPermission('FINACE_DEDUCTMONEY'), component: deductMoney, name: '扣款规则管理'},//FINACE_DEDUCTMONEY

        // { path: '/finance-batch',hidden: !checkPermission('FINACE_REURN_MATCH'), component: PaymentConfirmbatch, name: '批量回款'},
        // { path: '/finance-config', component: FinanceConfigMain, name: '统计财务科目配置'}
      ]
    },
      {
      path: '/',
      name: '资方管理',
      redirect:checkPermission('CAPITAL_MANAGE') ? '/capitalManage' : '/dataStatistics',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('CAPITAL'),
      component: Home,
      children: [
        { path: '/capitalManage',hidden: !checkPermission('CAPITAL_MANAGE'), component: CapitalManage, name: '账户管理'},
        { path: '/dataStatistics',hidden: !checkPermission('CAPITAL_DATA_STATISTICS'), component: DataStatistics, name: '资方数据统计'},
      ]
    },
    {
      path: '/',
      name: '积分管理',
      redirect: '/userIntegral',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('INTER'),
      component: Home,
      children: [
        { path: '/userIntegral',hidden: !checkPermission('INTER_MANGER'), component: UserIntegral, name: '用户积分管理'},
        { path: '/integralManage',hidden: !checkPermission('INTER_RULE_MANAGER'), component: IntegralManage, name: '积分规则管理'},
      ]
    },
    {
      path: '/',
      name: '机审管理',
      redirect: checkPermission('TRUST_PRO_CONFIG_MANAGER') ? '/productSourceMagage' : '/orderManage',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('TRUST'),
      component: Home,
      children: [
          { path: '/productSourceMagage',hidden: !checkPermission('TRUST_PRO_CONFIG_MANAGER'), component: ProductSourceMagage, name: '产品数据源管理'},
        { path: '/dataSourceManage',hidden: !checkPermission('TRUST_DATA_SOURCE_MANAGER'), component: DataSourceManage, name: '数据源配置管理'},
        { path: '/machineRules',hidden: !checkPermission('TRUST_RULE_MANAGER'), component: MachineRules, name: '数据源规则管理'},
        { path: '/dataSourceDetailList',hidden: !checkPermission('TRUST_RULE_MANAGER'), component: DataSourceDetailList, name: '数据源规则详细'},
        { path: '/orderManage',hidden: !checkPermission('TRUST_MANAGER_LIST'), component: OrderManage, name: '信审列表管理'},
        { path: '/orderAllList',hidden: !checkPermission('TRUST_MANAGER_ORDER_LIST'), component: OrderAllList, name: '订单列表管理'},
        { path: '/orderManageDetail',hidden: true, component: OrderManageDetail, name: '信审列表报告详情'},
        { path: '/overdueManage',hidden: !checkPermission('TRUST_OVERDUE_LIST'), component: OverdueManage, name: '逾期列表管理'},
        { path: '/overduvDetail',hidden: true, component: OverduvDetail, name: '逾期详情信息'},
      ]
    },
    {
      path: '/',
      name: '数据分析',
      redirect: '/dataAnalysis',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('DATA_COUNT_RETURN'),
      component: Home,
      children: [
        // { path: '/dataAnalysis',hidden: !checkPermission('DATA_COUNT'), component: DataAnalysis, name: '回款统计'},
        // { path: '/flowManage',hidden: !checkPermission('DATA_CLICKCOUNT'), component: FlowManage, name: '流量统计'},
        // { path: '/borrowMoneyManage',hidden: !checkPermission('DATA_CASELIST'), component: BorrowMoneyManage, name: '借款详情'},
        // { path: '/lendMoneyManage',hidden: !checkPermission('DATA_LENDMONEY'), component: LendMoneyManage, name: '借款统计'},
        { path: '/loanManage',hidden: !checkPermission('DATA_LENDMONEY'), component: LoanManage, name: '放款统计'},
        { path: '/expireManage',hidden: !checkPermission('DATA_LENDMONEY'), component: ExpireManage, name: '到期统计'},

      ]
    },
    {
      path: '/',
      name: '平台流量统计',
      redirect: '/riverDiversion',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('PT_TRAFFIC'),
      component: Home,
      children: [
        { path: '/riverDiversion',hidden: !checkPermission('PT_TRAFFIC_ALL'), component: RiverDiversion, name: '导流平台统计'},
      ]
    },
      //TODO 测试服务
    /*{
      path: '/',
      name: '数据统计',
      redirect: '/finance-returnMoney',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('SHUJUTONGJI'),
      component: Home,
      children: [
        { path: '/finance-returnMoney',hidden: !checkPermission('FINACE_RETURN_LIST'), component: returnMoneyStatis, name: '回款统计'},
        { path: '/expireManage',hidden: !checkPermission('DATA_LENDMONEY'), component: ExpireManage, name: '到期统计'},
      ]
    },*/

    {
      path: '/',
      name: '轮播图管理',
      redirect: '/banner',
      iconCls: 'el-icon-message',
      hidden: !checkPermission('PT_TRAFFIC'),
      component: Home,
      children: [
        { path: '/banner',hidden: false, component: Banner, name: '轮播图列表'},
      ]
    }
  ]
}

let router = new Router({
  routes: [
    loginRoute
  ]
})

function setRoutes() {
  router.addRoutes(getAfterRoutes())
  console.log(router);
  router.options.routes = getAfterRoutes();
}

router.beforeEach((to, from, next) => {
  let authorization = sessionStorage.getItem('authorization');

  if(
      !authorization &&
      to.path !== '/product' &&
      to.path !== '/shopList' &&
      to.path !== '/plan' &&
      to.path !== '/cost' &&
      to.path !== '/valid-list' &&
      to.path !== '/orgManage' &&
      to.path !== '/diversion' &&
      to.path !== '/platformProduct' &&
      to.path !== '/platform' &&
      to.path !== '/platformDiversion' &&
      to.path !== '/loan' &&
      to.path !== '/product-out' &&
      to.path !== '/product-in' &&
      to.path !== '/auth' &&
      to.path !== '/role' &&
      to.path !== '/auth-user' &&
      to.path !== '/department' &&
      to.path !== '/finance-outList' &&
      to.path !== '/finance-inList' &&
      to.path !== '/finance-code' &&
      to.path !== '/finance-loanConfirm' &&
      to.path !== '/finance-payment' &&
      to.path !== '/finance-returnMoney' &&
      to.path !== '/userIntegral' &&
      to.path !== '/integralManage' &&
      to.path !== '/productSourceMagage' &&
      to.path !== '/dataSourceManage' &&
      to.path !== '/machineRules' &&
      to.path !== '/dataSourceDetailList' &&
      to.path !== '/orderManage' &&
      to.path !== '/orderAllList' &&
      to.path !== '/orderManageDetail' &&
      to.path !== '/overdueManage' &&
      to.path !== '/overduvDetail' &&
      to.path !== '/dataAnalysis' &&
      to.path !== '/flowManage' &&
      to.path !== '/borrowMoneyManage' &&
      to.path !== '/riverDiversion' &&
      to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})




export {
  router,
  setRoutes
}
