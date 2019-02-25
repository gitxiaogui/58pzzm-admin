const orderUserManage = {
  bankName: [
	{required: true, message: '请输入银行名称'},
  ],
  bankAccount: [
	{required: true, message: '请输入银行卡号'},
  ],
  picType: [
	{required: true, message: '请选择替换照片类型'},
  ],
  picUrl: [
	{required: true, message: '请上传替换照片'},
  ],
  mark: [
	{required: true, message: '请输入备注信息'},
  ],
}
const capitalRule = {
  name: [
	{required: true, message: '请输入资方名称'},
  ],
  code: {
	validator: (rule, value, callback) =>{
	  if (!value) {
		return callback(new Error('资方不能为空'));
	  } else if (!(/^[0-9a-zA-Z]{1,}$/.test(value))) {
		callback(new Error('资方标识格式为数字、字母'));
	  } else {
		callback()
	  }
	},
	required: true, message: '',
	trigger: 'change'
  },
  linkMan: [
	{required: true, message: '请输入联系人'},
  ],
  linkPhone: {
	  validator: (rule, value, callback) =>{
		if (!value) {
		  return callback(new Error('手机号码不能为空'));
		} else if (!(/^1[345678]\d{9}$/.test(value))) {
		  callback(new Error('请输入正确的手机号码'));
		} else {
		  callback()
		}
	  },
	  required: true, message: '',
	  trigger: 'change'
	},
  address:[
  	{required: true, message: '请输入地址'},
  ],
  certifyType: [
	{required: true, message: '请选择证件类型'},
  ],
  certifyNumber: [
	{required: true, message: '请输入证件号码'},
  ],
}
const deductMoneyRule = {
  month: [
	{required: true, message: '请输入扣款月份'},
  ],
  day: [
	{required: true, message: '请输入扣款日期'},
  ],
  hour: [
	{required: true, message: '请输入扣款小时'},
  ],
  amount: [
	{required: true, message: '请输入扣款金额'},
  ],
}
const machineRules = {
  contain_area: [
	{required: true, message: '请输入包含区域'},
  ],
  data_source_col: [
	{required: true, message: '请输入阈值字段'},
  ],
  data_source_id: [
	{required: true, message: '请选择数据源'},
  ],
  pro_id: [
	{required: true, message: '请选择机构'},
  ],
  org_id: [
	{required: true, message: '请选择产品'},
  ],
  validity_num: [
	{required: true, message: '请输入有效期值'},
  ],
  validity_type: [
	{required: true, message: '请选择有效期类型'},
  ],
  rule_num: [
	{required: true, message: '请输入规则阈值'},
  ],
  rule_type: [
	{required: true, message: '请选择规则类型'},
  ],
  rule_name: [
	{required: true, message: '请输入规则名称'},
  ],
  datasource_code:[
  	{required: true, message: '请选择数据源'},
  ],
  rule_detail: [
	{required: true, message: '请输入规则代码'},
  ],
  sort: [
	{required: true, message: '请输入排序'},
  ],
}
const orgManageRule = {
  orgName: [
	{required: true, message: '请输入机构名称', trigger: 'blur'},
  ],
  linkman: [
	{required: true, message: '请输入机构联系人', trigger: 'blur'},
  ],
  phone: [
	{
	  validator: (rule, value, callback) =>{
		if (!value) {
		  return callback(new Error('手机号码不能为空'));
		} else if (!(/^1[345678]\d{9}$/.test(value))) {
		  callback(new Error('请输入正确的手机号码'));
		} else {
		  callback()
		}
	  },
	  required: true, message: '',
	  trigger: 'change'
	}
  ],
  address: [
	{required: true, message: '请输入地址', trigger: 'blur'},
  ],
  publicNumberFlag: {
	validator: (rule, value, callback) =>{
	  if (!value) {
		return callback(new Error('机构标识不能为空'));
	  } else if (!(/^[0-9a-zA-Z]{1,}$/.test(value))) {
		callback(new Error('机构标识格式为数字、字母'));
	  } else {
		callback()
	  }
	},
	required: true, message: '',
	trigger: 'change'
  },
  authorization: {
	// {required: true, message: '请输入授权码', trigger: 'blur'},
	validator: (rule, value, callback) =>{
	  if (!value) {
		return callback(new Error('授权码不能为空'));
	  } else if (!(/^[0-9a-zA-Z]{1,}$/.test(value))) {
		callback(new Error('授权码格式为数字、字母'));
	  } else {
		callback()
	  }
	},
	required: true, message: '',
	trigger: 'change'
  },
  certifyType: [
	{required: true, message: '请选择证件类型', trigger: 'blur'},
  ],
  certifyNumber: [
	{required: true, message: '请输入证件号码', trigger: 'blur'},
  ],
}
const channelMessage = {
  channelFlag: {
	validator: (rule, value, callback) =>{
	  if (!value) {
		return callback(new Error('渠道编码不能为空'));
	  } else if (!(/^[0-9a-zA-Z_]{1,}$/.test(value))) {
		callback(new Error('渠道编码格式为数字、字母、下划线'));
	  } else {
		callback()
	  }
	},
	required: true, message: '',
	trigger: 'change'
  },
  channelName: [
	{required: true, message: '请输入渠道名称', trigger: 'blur'},
  ],
  channelId: [
	{required: true, message: '请选择渠道'},
  ],
  proName: [
	{required: true, message: '请选择产品'},
  ]
}
const integralMeaaage = {
  flopName: [
	{required: true, message: '请输入规则名称', trigger: 'blur'},
  ],
  flopRate: [
	{required: true, message: '请输入概率'},
  ],
  flopStatus: [
	{required: true, message: '请选择状态', trigger: 'blur'},
  ],
  flopNumber: [
	{required: true, message: '请输入积分数值'},
  ],
  orgId: [
	{required: true, message: '请选择机构'},
  ],
  proId: [
	{required: true, message: '请选择产品'},
  ],
  goodsName: [
	{required: true, message: '请输入商品名称'},
  ],
  goodsPrice: [
	{required: true, message: '请输入推荐价格'},
  ],
  goodsSpec: [
	{required: true, message: '请输入商品规格'},
  ],
  data_source_data: [
	{required: true, message: '请输入数据源'},
  ],
  data_source_code: [
	{required: true, message: '请选择数据源编码'},
  ],
  data_source_status: [
	{required: true, message: '请选择数据源状态'},
  ],
  data_source_type: [
	{required: true, message: '请选择数据源类型'},
  ],
  orderType: [
	{required: true, message: '请选择审核类型'},
  ],
  remark: [
	{required: true, message: '请输入备注信息', trigger: 'blur'},
	{min: 1, max: 30, message: '长度在 1 到 200 个字符', trigger: 'blur'}
  ],
}
const productParamsRule = {
  prodName: [
	{required: true, message: '请输入产品名称', trigger: 'blur'},
	{min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
  ],
  prodCode: [
	{required: true, message: '请输入产品编号', trigger: 'blur'},
	{min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
  ],
  prodType: [
	{required: true, message: '请输入产品类型', trigger: 'blur'},
	{min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
  ],
  basicAmount: [
	{
	  validator: (rule, value, callback) =>{
		if (value === '') {
		  return callback(new Error('请输入基本金额'));
		}
		if (isNaN(value)) {
		  return callback(new Error('基本金额必须为数字'));
		} else {
		  if (value < 0) {
			return callback(new Error('基本金额不能为负'));
		  } else if (value > 9999) {
			return callback(new Error('基本金额不能大于4位数'))
		  } else {
			callback()
		  }
		}
	  },
	  required: true, message: '',
	  trigger: 'blur'
	}
  ],
  period: [
	{
	  validator: (rule, value, callback) =>{
		if (value === '') {
		  return callback(new Error('请输入产品周期数'))
		}
		if (!Number.isInteger(value)) {
		  return callback(new Error('产品周期数必须为数字'))
		} else {
		  if (value < 0) {
			return callback(new Error('产品周期数不能为负'));
		  } else if (value > 99999999999) {
			return callback(new Error('产品周期数不能大于11位'))
		  } else {
			return callback()
		  }
		}
	  },
	  required: true, message: '',
	  trigger: 'blur'
	}
  ],
  periodSpan: [
	{required: true, message: '请输入产品周期粒度', trigger: 'blur'}
  ],
  maxRenewalCount: [
	{
	  validator: (rule, value, callback) =>{
		if (value === '') {
		  return callback(new Error('请输入最大续期次数'))
		}
		if (!Number.isInteger(value)) {
		  return callback(new Error('最大续期次数必须为数字'))
		} else {
		  if (value < 0) {
			return callback(new Error('最大续期次数不能为负'));
		  } else if (value > 99999999999) {
			return callback(new Error('最大续期次数不能大于11位'))
		  } else {
			return callback()
		  }
		}
	  },
	  required: true, message: '',
	  trigger: 'blur'
	}
  ],
  maxOverdueCount: [
	{
	  validator: (rule, value, callback) =>{
		if (value === '') {
		  return callback(new Error('请输入最大逾期次数'))
		}
		if (!Number.isInteger(value)) {
		  return callback(new Error('最大逾期次数必须为数字'))
		} else {
		  if (value < 0) {
			return callback(new Error('最大逾期次数不能为负'));
		  } else if (value > 99999999999) {
			return callback(new Error('最大逾期次数不能大于11位'))
		  } else {
			return callback()
		  }
		}
	  },
	  required: true, message: '',
	  trigger: 'blur'
	}
  ]
}
const diversionRules = {
  diversionName: [
	{required: true, message: '请输入导流名称', trigger: 'blur'}
  ],
  diversionCode: [
	{required: true, message: '请输入导流编码', trigger: 'blur'}
  ],
  diversionUrl: [
	{required: true, message: '请输入导流地址', trigger: 'blur'}
  ],
  platName: [
	{required: true, message: '请输入平台名称', trigger: 'blur'}
  ],
  platCode: [
	{required: true, message: '请输入平台编码', trigger: 'blur'}
  ],
  orgId:[
  	{required: true, message: '请选择机构', trigger: 'blur'}
  ],
  ratio:[
  	{required: true, message: '请输入卡量值',}
  ],
  isValid:[
  	{required: true, message: '请选择卡量开关',}
  ],
}
const periodSpanOptions = [
  {
	value: '0',
	label: '无'
  }, {
	value: '1',
	label: '日'
  }, {
	value: '2',
	label: '周'
  }, {
	value: '3',
	label: '月'
  }, {
	value: '4',
	label: '年'
  }
]

const planParamsRule = {
  prodId: [
	{required: true, message: '请输入产品id', trigger: 'blur'}
  ],
  prodName: [
	{required: true, message: '请输入产品名称', trigger: 'blur'}
  ],
  setName: [
	{required: true, message: '请输入套餐名称', trigger: 'blur'},
	{min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
  ],
  beginTime: [
	{type: 'date', required: true, message: '请选择起始有效时间', trigger: 'blur'}
  ],
  endTime: [
	{type: 'date', required: true, message: '请选择结束有效时间', trigger: 'blur'}
  ],
  priority: [
	{
	  validator: (rule, value, callback) =>{
		if (!value) {
		  return callback(new Error('优先级不能为空'));
		}
		if (!Number.isInteger(value)) {
		  callback(new Error('请输入数字值'));
		} else {
		  if (value > 10 || value < 1) {
			callback(new Error('优先级为1-10'));
		  } else {
			callback();
		  }
		}
	  },
	  required: true, message: '',
	  trigger: 'blur'
	}
  ],
  memo: [
	{required: true, message: '请输入备注', trigger: 'blur'},
	{min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
  ]
}

const costParamsRule = {
  prodId: [
	{required: true, message: '请输入产品id', trigger: 'blur'}
  ],
  setId: [
	{required: true, message: '请输入套餐id', trigger: 'blur'}
  ],
  costId: [
	{required: true, message: '请输入费用id', trigger: 'blur'}
  ],
  finaceItemCode: [
	{required: true, message: '请选择财务科目编号'}
  ],
  costItem: [
	{required: true, message: '请输入费用名称', trigger: 'blur'},
	{min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
  ],
  cost: [
	{
	  validator: (rule, value, callback) =>{
		if (value === '') {
		  return callback(new Error('请输入费用'));
		}
		if (isNaN(value)) {
		  return callback(new Error('费用必须为数字'));
		} else {
		  if (value < 0) {
			return callback(new Error('费用不能为负'));
		  } else if (value > 9999) {
			return callback(new Error('费用不能大于4位数'))
		  } else {
			callback()
		  }
		}
	  },
	  required: true, message: '',
	  trigger: 'blur'
	}
  ],
  timeSpan: [
	{required: true, message: '请选择计费粒度', trigger: 'blur'}
  ],
  ciType: [
	{required: true, message: '请选择类型', trigger: 'blur'}
  ]
}

const authParamsRule = {
  authName: [
	{required: true, message: '请输入权限名称', trigger: 'blur'}
  ],
  authCode: [
	{required: true, message: '请输入权限编码', trigger: 'blur'}
  ]
}

const departParamsRule = {
  departName: [
	{required: true, message: '请输入部门名称', trigger: 'blur'}
  ],
  departType: [
	{required: false, message: '请选择部门名称'}
  ]
}

const authRoleParamsRule = {
  roleName: [
	{required: true, message: '请输入角色名称', trigger: 'blur'}
  ]
}


const collectionParamsRule = {
  amount: [
	{required: true, message: '请输入金额', trigger: 'blur'}
  ],
  content: [
	{required: true, message: '请输入备注信息', trigger: 'blur'}
  ],
  repaymentName: [
	{required: true, message: '请输入还款人姓名', trigger: 'blur'},
	{min: 1, max: 45, message: '长度在 1 到 45 个字符'}
  ],
  repaymentRelation: [
	{required: true, message: '请输入关系', trigger: 'blur'},
	{min: 1, max: 45, message: '长度在 1 到 45 个字符'}
  ]
}

const collectionContactsRule = {
  name: [
	{required: true, message: '请输入姓名', trigger: 'blur'}
  ],
  relation: [
	{required: true, message: '请输入与还款人关系', trigger: 'blur'}
  ],
  phone: [
	{
	  validator: (rule, value, callback) =>{
		if (!value) {
		  return callback(new Error('电话号码不能为空'));
		} else if (!(/^1[34578]\d{9}$/.test(value)) && !(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value))) {
		  callback(new Error('请输入正确的电话号码'));
		} else {
		  callback()
		}
	  },
	  required: true, message: '',
	  trigger: 'blur'
	}
  ]
}

const ciTypeOptions = [
  {
	value: '1',
	label: '正常'
  },
  {
	value: '2',
	label: '逾期'
  },
  {
	value: '3',
	label: '续期'
  }
]

const caseChannelType = [
  '连连支付',
  '支付宝',
  '宝付',
  '微信支付',
  '对公账户',
  '扫码',
  '中国工商银行',
  '中国银行',
  '中国光大银行'
]

const caseStatusType = [
  '待入财务表',
  '已入财务表',
  '财务确认失败'
]

const overdueCountType = [
  {
	value: '',
	label: '选择续期次数'
  }, {
	value: 1,
	label: '三次以下'
  }, {
	value: 2,
	label: '三次以上'
  }, {
	value: 3,
	label: '五次以下'
  }, {
	value: 4,
	label: '五次以上'
  },
]

const overdueDaysType = [
  {
	value: '',
	label: '选择逾期天数'
  }, {
	value: 1,
	label: '三天以下'
  }, {
	value: 2,
	label: '三天以上'
  }, {
	value: 3,
	label: '五天以下'
  }, {
	value: 4,
	label: '五天以上'
  },
]

const financeCodeConfigType = [
  {
	value: '1',
	label: '本金'
  },
  {
	value: '2',
	label: '利息'
  },
  {
	value: '3',
	label: '逾期'
  },
  {
	value: '4',
	label: '续期'
  },
  {
	value: '6',
	label: '减免'
  },
  {
	value: '5',
	label: '其他'
  }
]

const loanDataType = [
  {
	value: '1',
	label: '以上'
  },
  {
	value: '0',
	label: '以下'
  }
]

const collectionEventType = {
  addtional: '附加信息',
  flag: '标签',
  sms: '短信',
  contact: '联系人',
  email: '邮件',
  mass: '邮件群发/短信群发',
  tele: '电催',
  waive: '申请弃案'
}

export {
  capitalRule,
  deductMoneyRule,
  orderUserManage,
  diversionRules,
  machineRules,
  orgManageRule,
  channelMessage,
  integralMeaaage,
  productParamsRule,
  periodSpanOptions,
  planParamsRule,
  costParamsRule,
  authParamsRule,
  authRoleParamsRule,
  departParamsRule,
  collectionParamsRule,
  ciTypeOptions,
  caseChannelType,
  caseStatusType,
  overdueCountType,
  overdueDaysType,
  financeCodeConfigType,
  loanDataType,
  collectionEventType,
  collectionContactsRule
}
