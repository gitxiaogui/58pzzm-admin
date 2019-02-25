<template>
	<!--用户积分管理-->
	<div>
		<el-form>
			<el-row :gutter="10">
				<el-col :span="6">
					<el-date-picker format='yyyy-MM-dd HH:mm:ss' v-model="returnTime" type="datetimerange"
						:picker-options="pickerOptions2" placeholder="请选择时间范围">
					</el-date-picker>
				</el-col>
				<el-col :span="4" style="margin-left:10px;">
					<el-input v-model="phone" placeholder="请输入手机号" type="tel"></el-input>
				</el-col>
			</el-row>
			<el-row :gutter="16">
				<el-col :span="16">
					<el-button @click="search()" type="info" icon="search">搜索</el-button>
					<el-button @click="replacement()" type="warning">重置</el-button>
				</el-col>
			</el-row>
		</el-form>
		<el-row class="product-list">
			<el-table class="list-table" :data="userList" highlight-current-row border style="width: 100%" sum-text>
				<el-table-column prop="type" label="手机号" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.phone }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="可翻牌次数" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.flopNum }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="操作时间" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ Transformdate(new Date(Number(scope.row.optTime)), 'yyyy-MM-dd hh:mm:ss') }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="type" label="分数" header-align="center">
					<template scope="scope">
						<span style="margin-left: 10px">{{ scope.row.totalScore }}</span>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row type="flex" justify="center">
		  <el-pagination @current-change="changePaging" :page-size="10" :current-page.sync="pageNum" layout="total, prev, pager, next" :total="listTotalNumber">
		  </el-pagination>
		</el-row>
	</div>
</template>

<script>
	import {interInfoList} from '@/api/api'
	import { dateFormat } from '@/common/util.js'
	export default {
		data(){
			return {
				phone: '',
				returnTime: '',
				userList:[],
				pageNum: 1,
        		listTotalNumber: 0,
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker){
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker){
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker){
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
			}
		},
		methods: {
			// 搜索
			search(){
				this.getUserIntegralList()
			},
			// 重置
			replacement(){
				this.returnTime = ''
				this.phone = ''
				this.getUserIntegralList()
			},
			// 时间转换
			Transformdate(obj, fmt) {
				return dateFormat(obj, fmt);
			},
			// 分页
			changePaging(pageNum){
				this.getUserIntegralList(pageNum);
			},
			// 初始化数据
			getUserIntegralList(index=0){
				interInfoList({
					page: index,
					rows: 10,
					phone: this.phone,
					begintime: this.returnTime[0] ? this.returnTime[0].getTime() : '',
          			endtime: this.returnTime[1] ? this.returnTime[1].getTime() : '',
				}).then((res) =>{
					console.log('积分查询列表', res)
					if(res.code == '00000000'){
						this.userList = res.data
						this.listTotalNumber = res.data.length
					}
				})
			}
		},
		activated(){
			this.getUserIntegralList()
		}
	}
</script>

<style scoped>

</style>