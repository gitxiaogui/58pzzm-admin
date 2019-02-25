import axios from 'axios'
import VUE from '@/main.js'

axios.interceptors.request.use(function (config){
	// 在发送请求之前做些什么
	config.headers['Access-Control-Allow-Origin'] = '*';
	config.headers['Access-Control-Allow-Headers'] = '*';
	config.headers['Access-Control-Allow-Methods'] = '*';
	config.headers['X-Powered-By'] = '3.2.1';
	if (config.headers['Content-Type'] == 'undefined') {
		// console.log(config.headers.get('Content-Type'));
		config.headers.delete('Content-Type');
	} else {
		config.headers['Content-Type'] = 'application/json;charset=utf-8';
	}
	if (sessionStorage.getItem("authorization")) {
		config.headers.Authorization = sessionStorage.getItem("authorization");
	}
	console.log(config)
	return config;
}, function (error){
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response){
	// 对响应数据做点什么
	console.log('对响应数据做点什么',response)
	if (response.data.code !== '00000000' ) {
		if (response.data.message) {
			VUE.$message.error(response.data.message);
		}
	  }
	return response.data;
}, function (error){
	// 对响应错误做点什么
	console.log(error.response)
	if (error.response.data.message == '未授权') {
		VUE.$message.error('登陆状态超时或者未获得权限,返回登陆。');
		VUE.$router.push('/login');
	}
	/*if (error.response.data.code === '00000401') {
		VUE.$message.error('登陆状态超时或者未获得权限,返回登陆。');
		VUE.$router.push('/login');
	}*/
	//VUE.$message.error(error.response.data.message);   //暂时无用2018.9.3
	return Promise.reject(error);
});

const RESTfulApi = (data, url, method, {urlMethods = true, designId = 'id'} = {}) =>{
	if (method === 'GET') {
		return axios({
			method,
			url: urlMethods ? url : `${url}/${data[designId]}`,
			params: data
		})
	} else if (method === 'PUT' || method === 'POST') {
		return axios({
			method,
			url,
			data
		})
	} else if (method === 'DELETE') {
		return VUE.$confirm('是否确认删除?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() =>{
			return axios({
				method,
				url: `${url}/${data[designId]}`
			})
		}).catch(() =>{
			return VUE.$message.info('已取消')
		})
	}
}


const productinfoList = data =>{
	return axios({
		method: 'POST',
		url: '/product/productinfo/list',
		data
	})
}

const productAdd = data =>{
	return axios({
		method: 'POST',
		url: 'product/productinfo/add',
		data
	})
}

const productEdit = data =>{
	return axios({
		method: 'POST',
		url: 'product/productinfo/modify',
		data
	})
}

const productOnshelf = data =>{
	return axios({
		method: 'POST',
		url: 'product/productinfo/onshelf',
		data
	})
}

const productOffshelf = data =>{
	return axios({
		method: 'POST',
		url: 'product/productinfo/offshelf',
		data
	})
}

const productDelete = data =>{
	return axios({
		method: 'POST',
		url: 'product/productinfo/delete',
		data
	})
}

const planInfoList = data =>{
	return axios({
		method: 'POST',
		url: 'product/setinfo/list',
		data
	})
}

const productInfoGet = data =>{
	return axios({
		method: 'POST',
		url: 'product/productinfo/get',
		data
	})
}

const planAdd = data =>{
	return axios({
		method: 'POST',
		url: 'product/setinfo/add',
		data
	})
}

const planEdit = data =>{
	return axios({
		method: 'POST',
		url: 'product/setinfo/modify',
		data
	})
}

const planDelete = data =>{
	return axios({
		method: 'POST',
		url: 'product/setinfo/delete',
		data
	})
}

const costInfoList = data =>{
	return axios({
		method: 'POST',
		url: 'product/costinfo/list',
		data
	})
}

const costInfoDetail = data =>{
	return axios({
		method: 'POST',
		url: 'product/costinfo/get',
		data
	})
}

const costGetFinanceItem = data =>{
	return axios({
		method: 'POST',
		url: 'product/costinfo/getFinanceItem',
		data
	})
}

const costDeleteItem = data =>{
	return axios({
		method: 'POST',
		url: 'product/costinfo/delete',
		data
	})
}

const costAddItem = data =>{
	return axios({
		method: 'POST',
		url: 'product/costinfo/add',
		data
	})
}

const costEditItem = data =>{
	return axios({
		method: 'POST',
		url: 'product/costinfo/update',
		data
	})
}

const lenderCaseRecordInfo = data =>{
	return axios({
		method: 'POST',
		url: 'product/amountRecord/listAmountRecord',
		data
	})
}

const lenderLoanRecordInfo = data =>{
	return axios({
		method: 'POST',
		url: 'product/lenderCaseBasicInfo/listLenderCaseRecordInfo',
		data
	})
}

const userLogin = (data) =>{
	let instance = axios.create()
	sessionStorage.removeItem('authorization')
	instance.interceptors.response.use(function (response){
		// 对响应数据做点什么
		if (response.headers.authorization) {
			sessionStorage.setItem('authorization', response.headers.authorization)
		}
		return response.data;
	}, function (error){
		// 对响应错误做点什么
		VUE.$alert(error.response.data.message);
		return Promise.reject(error);
	});
	return instance({
		method: 'POST',
		url: 'auth/admin/user/login',
		data
	})
}

const authPermission = (data, method) =>{
	return RESTfulApi(data, 'auth/permission', method)
}

const authRole = (data, method) =>{
	return RESTfulApi(data, 'auth/role', method)
}

const authRolePermission = (data, method) =>{
	if (method === 'GET') {
		return RESTfulApi(data, 'auth/role/permission', method, {urlMethods: false})
	} else {
		return RESTfulApi(data, 'auth/role/permission', method)
	}
}

const authDepartmentType = (data, method) =>{
	return RESTfulApi(data, 'auth/department/type', method)
}

const authDepartment = (data, method) =>{
	return RESTfulApi(data, 'auth/department', method)
}

const authDepartmentPath = (data, method) =>{
	return RESTfulApi(data, 'auth/department/path', method, {urlMethods: false})
}

const authDepartmentIds = (data, method) =>{
	return RESTfulApi(data, 'auth/department/ids', method)
}

const authAdminUser = (data, method) =>{
	return RESTfulApi(data, 'auth/admin/user', method)
}

const authAdminUserReset = (data, method) =>{
	return RESTfulApi(data, 'auth/admin/user/reset', method)
}

const authAdminUserDuty = (data, method) =>{
	return RESTfulApi(data, 'auth/admin/user/duty', method, {urlMethods: false})
}

const authAdminUserIds = (data, method) =>{
	return RESTfulApi(data, 'auth/admin/user/ids', method)
}

const prodOutFinaceRecord = (data, dataType) =>{
	const typeObject = {
		day: 'day',
		week: 'week',
		month: 'month',
		season: 'season',
		year: 'year'
	}
	const type = typeObject[dataType]
	return axios({
		method: 'POST',
		url: `/finance/prodOutFinaceRecord/${type}StatisticsLoan`,
		data
	})
}

const prodinFinaceRecord = (data, dataType) =>{
	const typeObject = {
		day: 'Day',
		week: 'Week',
		month: 'Month',
		season: 'Season',
		year: 'Year'
	}
	const type = typeObject[dataType]
	return axios({
		method: 'POST',
		url: `/finance/prodinFinaceRecord/statistics${type}InAccountAmount`,
		data
	})
}

const productLoanAmount = (data, dataType) =>{
	const typeObject = {
		day: 'Day',
		week: 'Week',
		month: 'Month',
		season: 'Season',
		year: 'Year'
	}
	const type = typeObject[dataType]
	return axios({
		method: 'POST',
		url: `/product/lenderCaseBasicInfo/tot${type}LoanAmount`,
		data
	})
}

const productReceivableAmount = (data, dataType) =>{
	const typeObject = {
		day: 'Day',
		week: 'Week',
		month: 'Month',
		season: 'Season',
		year: 'Year'
	}
	const type = typeObject[dataType]
	return axios({
		method: 'POST',
		url: `/product/costsetinfo/tot${type}ReceivableAmount`,
		data
	})
}

const prodOutQuery = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/prodOutFinaceRecord/queryLenderWasteBook',
		data
	})
}

const prodInQuery = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/prodinFinaceRecord/queryProdinFinaceRecord',
		data
	})
}

const loanRenewalInfo = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/lenderCaseBasicInfo/getLoanRenewalInfo',
		data
	})
}

const getSelectPro = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/productinfo/getSelectPro',
		data
	})
}

const financeCodeTopList = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financeItemInfo/toplist',
		data
	})
}

const financeCodeChangeName = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financeItemInfo/modify',
		data
	})
}

const financeCodeSubList = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financeItemInfo/sublist',
		data
	})
}

const financeCodeGetConfig = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financeItemInfo/getconfig',
		data
	})
}

const financeCodeModifyConfig = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financeItemcCode/modify',
		data
	})
}

const financeCodeAddTop = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financeItemInfo/topadd',
		data
	})
}

const financeCodeOnOrOff = (data, type) =>{
	return axios({
		method: 'POST',
		url: `/finance/financeItemInfo/${type}shelf`,
		data
	})
}

const financeCodeSubAdd = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financeItemInfo/subadd',
		data
	})
}

const financeCodeModify = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financeItemInfo/modify',
		data
	})
}

const financeCodeDelete = (data) =>{
	return VUE.$confirm('是否确认删除?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() =>{
		return axios({
			method: 'POST',
			url: '/finance/financeItemInfo/delete',
			data
		})
	}).catch(() =>{
		return VUE.$message.info('已取消')
	})
}

const costSetInfoList = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/costsetinfo/list',
		data
	})
}

const financeStcsList = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/statistics/list',
		data
	})
}

const financeStcsAdd = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/statistics/add',
		data
	})
}

const financeStcsModify = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/statistics/modify',
		data
	})
}

const financeStcsDelete = (data) =>{
	return VUE.$confirm('是否确认删除?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() =>{
		return axios({
			method: 'POST',
			url: '/finance/statistics/delete',
			data
		})
	}).catch(() =>{
		return VUE.$message.info('已取消')
	})
}

const financeClmList = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/statisticscolum/list',
		data
	})
}

const financeClmAdd = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/statisticscolum/add',
		data
	})
}

const financeClmDelete = (data) =>{
	return VUE.$confirm('是否确认删除?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() =>{
		return axios({
			method: 'POST',
			url: '/finance/statisticscolum/delete',
			data
		})
	}).catch(() =>{
		return VUE.$message.info('已取消')
	})
}

const financeClmModify = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/statisticscolum/modify',
		data
	})
}

const financeDtlList = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/statisticsdetail/list',
		data
	})
}

const financeDtlAdd = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/statisticsdetail/add',
		data
	})
}

const financeDtlModify = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/statisticsdetail/modify',
		data
	})
}

const financeDtlGet = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/statisticsdetail/get',
		data
	})
}

const financeDtlDelete = (data) =>{
	return VUE.$confirm('是否确认删除?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() =>{
		return axios({
			method: 'POST',
			url: '/finance/statisticsdetail/delete',
			data
		})
	}).catch(() =>{
		return VUE.$message.info('已取消')
	})
}

const financeDtlCodeList = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financeItemInfo/listapi',
		data
	})
}

const collectAbatement = (data, method) =>{
	return RESTfulApi(data, '/collect/abatement', method)
}

const collectAbatementAction = (data, method) =>{
	return RESTfulApi(data, '/collect/abatement/action', method)
}

const colletReceivableAmoun = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/costsetinfo/colletReceivableAmount',
		data
	})
}

const collectCaseList = (data) =>{
	return axios({
		method: 'GET',
		url: '/collect/case',
		params: data
	})
}

const collectCaseMy = (data) =>{
	return axios({
		method: 'GET',
		url: '/collect/case/my',
		params: data
	})
}

const collectCaseAdditional = (data, method) =>{
	let url = '/collect/case/additional';
	if (method === 'GET') {
		return axios({
			method,
			url: `${url}/${data.caseId}`
		})
	} else {
		return RESTfulApi(data, '/collect/event/additional', method, {designId: 'additionalId'})
	}
}

const permissionAvailable = (data, method) =>{
	return RESTfulApi(data, '/auth/permission/available', method)
}

const collectGetCaseContact = (data) =>{
	return axios({
		method: 'GET',
		url: `/collect/case/contact/${data.caseId}`
	})
}

const collectCaseNote = (data, method) =>{
	if (method === "POST" || method === "PUT") {
		return axios({
			method: method,
			url: '/collect/case/note',
			data
		})
	} else if (method === "DELETE") {
		return VUE.$confirm('是否确认删除?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() =>{
			return axios({
				method: method,
				url: '/collect/case/note/' + data,
			})
		}).catch(() =>{
			return VUE.$message.info('已取消')
		})
	} else {
		return axios({
			method: method,
			url: '/collect/case/note/' + data,
		})
	}
}

// 案件还款相关接口
const collectRepayment = (data, method, designId) =>{
	return RESTfulApi(data, '/collect/repayment', method, {designId: 'contactId'})
}

const collectRepaymentAction = (data, method) =>{
	return axios({
		method: method,
		url: '/collect/repayment/action',
		data
	})
}

const collectEventContact = (data, method) =>{
	return RESTfulApi(data, '/collect/event/contact', method, {designId: 'contactId'})
}

//弃案
const abandonFiles = data =>{
	return axios({
		method: 'POST',
		url: '/collect/case/waive',
		data
	})
}

const collectGetEvent = (data) =>{
	return axios({
		method: 'GET',
		url: '/collect/event',
		params: data
	})
}
//获取撤案
const gainDiscard = (data) =>{
	return axios({
		method: 'GET',
		url: `/collect/case/waive`,
		params: data
	})
}
//通过弃案
const theapplicationIsapproved = (data, method) =>{
	return axios({
		method: 'PUT',
		url: `/collect/case/waive/confirm/${data.waiveId}`,
	})
}
//未通过
const notpassIsapproved = (data, method) =>{
	return axios({
		method: 'PUT',
		url: `/collect/case/waive/refuse/${data.waiveId}`,
	})

}
//获取撤案列表
const getchatRecorddata = (data) =>{
	return axios({
		method: 'GET',
		url: `/collect/case/revocation`,
		params: data
	})
}
//撤案
const withdrawacaseBeg = (data, method) =>{
	return axios({
		method: 'PUT',
		url: `/collect/case/revocation/${data.caseId}`,
	})

}

const collectEventFlag = (data, method) =>{
	return axios({
		method,
		url: '/collect/event/flag',
		data
	})
}

const collectCaseAssign = (data) =>{
	return axios({
		method: 'GET',
		url: '/collect/case/assign',
		params: data
	})
}

const collectCaseAssignDo = (data) =>{
	return axios({
		method: 'POST',
		url: '/collect/case/assign/do',
		data
	})
}

const collectCaseAssignPre = (data) =>{
	return axios({
		method: 'POST',
		url: '/collect/case/assign/pre',
		data
	})
}

const collectCollectorCollection = (data) =>{
	return axios({
		method: 'GET',
		url: '/collect/collector/collection',
		params: data
	})
}

const collectCaseNoallot = (data) =>{
	return axios({
		method: 'GET',
		url: '/collect/case/noallot',
		params: data
	})
}

const collectCaseGet = (data) =>{
	return axios({
		method: 'GET',
		url: `/collect/case/get/${data.id}`
	})
}

const collectMultipleCancel = (data) =>{
	return axios({
		method: 'PUT',
		url: '/collect/case/revocation',
		data
	})
}

// 放款列表
const financeloanConfirmList = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/lenderCaseBasicInfo/getAwaitFinancingAffirmLoanInfo',
		data
	})
}

//回款记录
const paymentconfirmData = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/amountRecord/queryjournalAccountInfo',
		data
	})
}

//回款确认
//貌似不可用
const referpaymentconfirmData = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/lenderWasteBook/repaymentfinanceNotarize',
		data
	})
}
//回款确认
export const batchLoanNotarize = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/caseBasic/batchLoanNotarize',
		data
	})
}


//回款查询列表
const returnedmoneyRecord = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/lenderCaseBasicInfo/returnedRecordQuery',
		data
	})
}

const financeloanConfirm = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/lenderWasteBook/financeNotarize',
		data
	})
}

//上传文件
const uploadFiles = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/lenderWasteBook/excelReturnedDateMatching',
		data
	})
}

const elcelLoanMatch = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/lenderWasteBook/excelLoanDateMatching',
		data: data
	})
}

//确认放款
const financeLoanfinanceNotarize = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/lenderWasteBook/loanfinanceNotarize',
		data
	})
}
//批量汇款按钮
const batchreferpaymentconfirmData = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/lenderWasteBook/filesUploadDataRepaymentNotarize',
		data
	})
}
//批量回款查询
const batchdemandData = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/lenderWasteBook/queryUserNameandPhoneNumber',
		data
	})
}
//积分信息列表
const interInfoList = (data) =>{
	return axios({
		method: 'POST',
		url: '/customer/intergral/interInfoList',
		data
	})
}
// 翻牌类型查询
export const queryFlopConfigList = (data) =>{
	return axios({
		method: 'POST',
		url: '/customer/intergral/queryFlopConfigList',
		data
	})
}
// 翻牌类型修改
export const updateFlopConfig = (data) =>{
	return axios({
		method: 'POST',
		url: '/customer/intergral/updateFlopConfig',
		data
	})
}
// 翻牌类型新增
export const addFlopConfig = (data) =>{
	return axios({
		method: 'POST',
		url: '/customer/intergral/addFlopConfig',
		data
	})
}
// 上传图片
export const uploadPic = (data) =>{
	return axios({
		method: 'POST',
		url: '/customer/intergral/uploadPic',
		data
	})
}
// 获取商品列表
export const getShopList = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/goodsinfo/list',
		data
	})
}
// 删除商品
export const deleteShop = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/goodsinfo/delete',
		data
	})
}
// 修改商品
export const modifyShop = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/goodsinfo/modify',
		data
	})
}
// 新增商品
export const addShop = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/goodsinfo/add',
		data
	})
}
// 根据机构id获取产品列表
export const getProductList = (data) =>{
	return axios({
		method: 'POST',
		url: 'product/productinfo/list',
		data
	})
}


// 获取机构列表
export const getOrgList = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/basicInfo/list',
		data
	})
}
// 新增机构
export const addOrg = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/basicInfo/add',
		data
	})
}
// 修改机构
export const orgUpdate = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/basicInfo/update',
		data
	})
}
// 删除机构
export const deteleOrg = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/basicInfo/delete',
		data
	})
}
// 获取渠道列表
export const getChannelList = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/OrgChannel/list',
		data
	})
}
// 新增渠道
export const addOrgChannel = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/OrgChannel/add',
		data
	})
}
// 修改渠道
export const updateOrgChannel = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/OrgChannel/update',
		data
	})
}
// 修改渠道
export const deleteOrgChannel = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/OrgChannel/delete',
		data
	})
}
// 新加机构产品关系
export const addChannelProductMap = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/channelProductMap/add',
		data
	})
}
// 获取机构产品关系列表
export const getChannelProductMapList = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/channelProductMap/list',
		data
	})
}
// 修改机构产品关系
export const updateChannelProductMap = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/channelProductMap/update',
		data
	})
}
// 删除机构产品关系
export const deleteChannelProductMap = (data) =>{
	return axios({
		method: 'POST',
		url: '/org/channelProductMap/delete',
		data
	})
}


// 新增数据源
export const addDataSource = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSouce/add',
		data
	})
}
// 获取数据源列表
export const getQueryList = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSouce/queryList',
		data
	})
}
// 修改数据源
export const upDateSource = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSouce/update',
		data
	})
}
// 删除数据源
export const deleteDateSource = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSouce/delete',
		data
	})
}
// 获取数据员规则列表
export const getDataSourceRuleList = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSourceRule/list',
		data
	})
}
/*// 获取数据源阈值
export const queryRules = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSourceRule/queryRules',
		data
	})
}*/
// 新增数据源规则
export const queryRulesData = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSourceRule/queryRules',
		data
	})
}
// 新增数据源规则
export const addDataSourceRule = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSourceRule/add',
		data
	})
}
// 修改数据源规则
export const upDataSourceRule = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSourceRule/update',
		data
	})
}
// 删除数据源规则
export const deleteSourceRule = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSourceRule/delete',
		data
	})
}
// 产品数据源查询list
export const dataSouceProQueryList = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSoucePro/queryList',
		data
	})
}
// 新增产品数据源
export const addDataSoucePro = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSoucePro/add',
		data
	})
}
// 修改产品数据源
export const updateSoucePro = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSoucePro/update',
		data
	})
}
// 删除产品数据源
export const deleteSoucePro = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSoucePro/delete',
		data
	})
}

// 新增财务流水表
export const addFinancialFlow = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financialFlow/add',
		data
	})
}

// excel放款数据匹配
export const excelLoanDataMatch = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financialFlow/excelLoanDataMatch',
		data
	})
}
// excel回款数据匹配
export const excelReturnDataMatch = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financialFlow/excelReturnDataMatch',
		data
	})
}

// 流水表查询
export const queryFinancialFlow = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financialFlow/query',
		data
	})
}
// 财务回款确认接口
export const returnFinanceConfirm = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financialFlow/returnFinanceConfirm',
		data
	})
}
// 回款查询列表
export const returnList = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financialFlow/returnList',
		data
	})
}
// 回款查询二级展开列表
export const amountList = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/amountRecord/amountList',
		data
	})
}

// 流水表更新
export const updateFinanceConfirm = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financialFlow/update',
		data
	})
}
// 放款查询列表
export const loansList = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/caseBasic/loansList',
		data
	})
}

// 放款确认接口
export const loanFinanceConfirm = (data) =>{
	return axios({
		method: 'POST',
		url: '/finance/financialFlow/loanFinanceConfirm',
		data
	})
}
// 商品订单管理
export const peopleAuditlist = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/caseBasic/peopleAuditlist',
		data
	})
}
// 查看证件信息
export const queryRealNameInfo = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/caseBasic/queryRealNameInfo',
		data
	})
}
// 查看数据源列表
export const caseBasic = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/caseBasic/queryThirdDataList',
		data
	})
}
// 订单列表审核
export const peopleAudit = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/caseBasic/peopleAudit',
		data
	})
}

// 数据源规则详细列表
export const dataSourceRuleDetailList = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSourceRuleDetail/list',
		data
	})
}
// 数据源规则详细列表新增
export const dataSourceRuleDetailAdd = (data) =>{
	return axios({
		method: 'POST',
		url: '/product/dataSourceRuleDetail/add',
		data
	})
}
// 修改数据源规则详细
export const dataSourceRuleDetailUpdate = (data)=>{
  return axios({
	method: 'POST',
	url:'/product/dataSourceRuleDetail/update',
	data
  })
}
//获取回款统计列表
export const getListChannel = (data)=>{
  return axios({
	method: 'POST',
	url:'/product/returnMoneyCount/listDiversion',
	data
  })
}
//获取回款统计子集列表
export const getListChannelDetail = (data)=>{
  return axios({
	method: 'POST',
	url:'/product/returnMoneyCount/listDiversionDetail',
	data
  })
}
//获取流量统计列表
export const getChannelCountList = (data)=>{
  return axios({
	method:'POST',
	url:'/product/caseBasic/channelCount',
	data
  })
}
export const getCaseBasicList = (data)=>{
  return axios({
	method:'POST',
	url:'/product/caseBasic/list',
	data
  })
}
//获取导流平台列表
export const getDiversionList = (data)=>{
  return axios({
	method: 'POST',
	url:'/org/diversion/list',
	data
  })
}
//新增导流
export const addDiversion = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/diversion/add',
	data
  })
}
//修改导流
export const updataDiversion = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/diversion/update',
	data
  })
}
//删除导流信息
export const deleteDiversion = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/diversion/delete',
	data
  })
}

//获取平台产品关联列表
export const platformProductRelationList = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/platformProductRelation/list',
	data
  })
}
//修改平台产品关联
export const updatePlatformProductRelation = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/platformProductRelation/update',
	data
  })
}
//新增平台产品关联
export const addPlatformProductRelation = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/platformProductRelation/add',
	data
  })
}
// 删除平台产品关系
export const deletePlatformProductRelation = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/platformProductRelation/delete',
	data
  })
}
//获取平台列表
export const getPlatformList = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/platform/list',
	data
  })
}
//新增平台
export const addPlatform = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/platform/add',
	data
  })
}
//修改平台
export const updatePlatform = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/platform/update',
	data
  })
}
//删除平台
export const deletePlatform = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/platform/delete',
	data
  })
}
//获取导流平台界面列表
export const getPlatformDiversionRelationList = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/platformDiversionRelation/list',
	data
  })
}

//新增导流平台关系
export const addPlatformDiversionRelation = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/platformDiversionRelation/add',
	data
  })
}

//删除导流平台关系
export const deletePlatformDiversionRelation = (data)=>{
  return axios ({
	method:'POST',
	url:'/org/platformDiversionRelation/delete',
	data
  })
}

//查看审核状态
export const listAutoAudit = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/lenderCaseBasicInfo/listAutoAudit',
	data
  })
}
//查看申请人员列表
export const orderlist = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/caseBasic/orderlist',
	data
  })
}
//放款列表
export const auditPassList = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/caseBasic/auditPassList',
	data
  })
}
//订单补全资料
export const compPic =(data)=>{
  return axios({
	method:'POST',
	url:'/customer/user/baseinfo/compPic',
	data
  })
}
//导流平台接口
export const platformCount = (data)=>{
  return axios({
	method:'POST',
	url:'/product/caseBasic/platformCount',
	data
  })
}
//导流平台子列表获取注册接口
export const platformDetail = (data)=>{
  return axios({
	method:'POST',
	url:'/product/caseBasic/platformDetail',
	data
  })
}
//导流平台子列表获取订单接口
export const orderCountDetail = (data)=>{
  return axios({
	method:'POST',
	url:'/product/caseBasic/orderCountDetail',
	data
  })
}
//导流平台子列表获取成功放款接口
export const suCountDetail = (data)=>{
  return axios({
	method:'POST',
	url:'/product/caseBasic/suCountDetail',
	data
  })
}
//导流平台子列表获取成功回款接口
export const retCountDetail = (data)=>{
  return axios({
	method:'POST',
	url:'/product/caseBasic/retCountDetail',
	data
  })
}


//回款确认（新增接口）
export const passive = (data)=>{
  return axios({
	method:'POST',
	url:'/product/lenderCaseBasicInfo/passive',
	data
  })
}
//回款确认（新增接口）
export const overduelist = (data)=>{
  return axios({
	method:'POST',
	url:'/product/caseBasic/overduelist',
	data
  })
}


//逾期下载
export const rechargeMainExcel = (data)=>{
  return axios({
	method:'GET',
	url:'/product/outputexcel/rechargeMainExcel',
	params:data,
	responseType: 'blob'
  })
}
// 待放款===打回审核
export const retrial = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/lenderCaseBasicInfo/retrial',
	data
  })
}
//获取信审列表个人详细信息
export const userDetail = (data)=>{
  return axios({
	method:'GET',
	url:'/product/caseBasic/userDetail',
	params:data
  })
}
// 信审个人增加备注
export const refuseReason = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/lenderCaseBasicInfo/refuseReason',
	data
  })
}

//逾期加入黑名单
export const BlackList = (data)=>{
  return axios({
	method:'GET',
	url:'/product/lenderCaseBasicInfo/addBlackList',
	params:data
  })
}

// 逾期加备注
export const overDueMark = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/lenderCaseBasicInfo/overDueMark',
	data
  })
}

// 借款统计列表
export const vLoanStatistics = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/lenderCaseBasicInfo/vLoanStatistics',
	data
  })
}

// 逾期下载详情
export const queryThirdDataList = (data)=>{
  return axios ({
	method:'GET',
	url:'/product/outputexcel/queryThirdDataList',
	params:data,
	responseType: 'blob'
  })
}

// 获取扣款规则列表
export const withholdRuleList = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/withholdRule/withholdRuleList',
	data
  })
}
// 新增扣款规则
export const withholdRuleAdd = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/withholdRule/withholdRuleAdd',
	data
  })
}
// 修改扣款规则
export const withholdRuleModify = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/withholdRule/withholdRuleModify',
	data
  })
}
// 删除扣款规则
export const withholdRuleDel = (data)=>{
  return axios ({
	method:'GET',
	url:'/product/withholdRule/withholdRuleDel',
	params:data
  })
}
// 保存备注
export const saveReason = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/lenderCaseBasicInfo/saveReason',
	data
  })
}

// 获取资方列表
export const getInvestors = (data)=>{
  return axios ({
	method:'POST',
	url:'/finance/investor/getInvestors',
	data
  })
}
// 新增资方
export const addInvestor = (data)=>{
  return axios ({
	method:'POST',
	url:'/finance/investor/addInvestor',
	data
  })
}
// 修改资方
export const modifyInvestor = (data)=>{
  return axios ({
	method:'POST',
	url:'/finance/investor/modifyInvestor',
	data
  })
}



// 删除资方
export const deleteInvestor = (data)=>{
  return axios ({
	method:'GET',
	url:'/finance/investor/deleteInvestor',
	params:data
  })
}

// 资方注资金额
export const addChargeMoney = (data)=>{
  return axios ({
	method:'POST',
	url:'/finance/investor/addChargeMoney',
	data
  })
}
// 财务回款统计界面
export const rePayment = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/statistics/rePayment',
	data
  })
}
// 数据分析借款统计列表
export const borrowing = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/statistics/borrowing',
	data
  })
}
// 数据分析到期统计列表
export const expire = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/statistics/expire',
	data
  })
}
// 资方获取注资明细
export const getChargeMoneys = (data)=>{
  return axios ({
	method:'POST',
	url:'/finance/investor/getChargeMoneys',
	data
  })
}

// 获取资方数据统计
export const investorStatistics = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/statistics/investorStatistics',
	data
  })
}

// 放款列表获取资方列表
export const getValidInvestors = (data)=>{
  return axios ({
	method:'POST',
	url:'/finance/investor/getValidInvestors',
	data
  })
}

// 待放款下载
export const downAuditPassList = (data)=>{
  return axios ({
	method:'GET',
	url:'/product/outputexcel/auditPassList',
	params:data,
	responseType: 'blob'
  })
}

// 获取轮播图
export const getBanners = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/banner/getBanners',
	data
  })
}

// 轮播上传图片
export const uploadPictures = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/banner/uploadPictures',
	data
  })
}
// 添加轮播
export const addBannerInfo = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/banner/addBannerInfo',
	data
  })
}
// 添加轮播
export const modifyBanner = (data)=>{
  return axios ({
	method:'POST',
	url:'/product/banner/modifyBanner',
	data
  })
}
// 删除轮播
export const delBanner = (data)=>{
  return axios ({
	method:'GET',
	url:'/product/banner/delBanner',
	params: data
  })
}

export {
	batchreferpaymentconfirmData,
	batchdemandData,
	uploadFiles,
	returnedmoneyRecord,
	referpaymentconfirmData,
	paymentconfirmData,
	withdrawacaseBeg,
	getchatRecorddata,
	gainDiscard,
	theapplicationIsapproved,
	notpassIsapproved,
	productinfoList,
	productInfoGet,
	productAdd,
	productEdit,
	productOnshelf,
	productOffshelf,
	productDelete,
	planInfoList,
	planAdd,
	planEdit,
	planDelete,
	costInfoList,
	costInfoDetail,
	costGetFinanceItem,
	costDeleteItem,
	costAddItem,
	costEditItem,
	lenderCaseRecordInfo,
	lenderLoanRecordInfo,
	userLogin,
	authPermission,
	authRole,
	authRolePermission,
	authDepartmentType,
	authDepartment,
	authDepartmentPath,
	authAdminUser,
	authAdminUserReset,
	authAdminUserDuty,
	authDepartmentIds,
	authAdminUserIds,
	prodOutFinaceRecord,
	prodinFinaceRecord,
	productLoanAmount,
	productReceivableAmount,
	prodOutQuery,
	prodInQuery,
	loanRenewalInfo,
	getSelectPro,
	financeCodeTopList,
	financeCodeChangeName,
	financeCodeSubList,
	financeCodeGetConfig,
	financeCodeModifyConfig,
	financeCodeAddTop,
	financeCodeOnOrOff,
	financeCodeSubAdd,
	financeCodeModify,
	financeCodeDelete,
	costSetInfoList,
	financeStcsList,
	financeStcsAdd,
	financeStcsModify,
	financeStcsDelete,
	financeClmList,
	financeClmAdd,
	financeClmDelete,
	financeClmModify,
	financeDtlList,
	financeDtlGet,
	financeDtlCodeList,
	financeDtlAdd,
	financeDtlDelete,
	financeDtlModify,
	collectAbatement,
	collectAbatementAction,
	colletReceivableAmoun,
	collectCaseList,
	collectCaseMy,
	collectCaseAdditional,
	permissionAvailable,
	collectCaseNote,
	collectRepayment,
	collectRepaymentAction,
	collectGetCaseContact,
	collectEventContact,
	abandonFiles,
	collectGetEvent,
	collectEventFlag,
	collectCaseAssign,
	collectCaseAssignDo,
	collectCaseAssignPre,
	collectCollectorCollection,
	collectCaseNoallot,
	collectCaseGet,
	collectMultipleCancel,
	financeloanConfirmList,
	financeloanConfirm,
	elcelLoanMatch,
	financeLoanfinanceNotarize,
	interInfoList
}
