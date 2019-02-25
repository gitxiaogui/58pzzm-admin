<template>
    <div>

        <div class="eleMeDetail" style="padding:0 10px;">
            <div v-if="this.creditShopStatus">
                <!--基本信息-->
                <div class="secondLevel"><span class="secondLevelTitle">基本信息</span></div>
                <div class="jibenxinxi-body" style="display: flex;">
                    <p v-if="shopData.basic.nm" style="margin-right:100px">姓名: <span>{{shopData.basic.nm}}</span></p>
                    <p>联系方式: <span>{{shopData.basic.cp}}</span></p>
                </div>
                <!--地址信息-->
                <div class="secondLevel"><span class="secondLevelTitle">地址信息</span></div>
                <el-row>
                    <el-table :data="shopData.addr" highlight-current-row border ref="multipleTable" style="width: 100%">
                        <el-table-column label="姓名" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.nm) }}</span></template>
                        </el-table-column>
                        <el-table-column label="性别" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ scope.row.sex==1?"男":'女' }}</span></template>
                        </el-table-column>
                        <el-table-column label="手机号码" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.cp) }}</span></template>
                        </el-table-column>
                        <el-table-column label="收货地址" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.sa) }}</span></template>
                        </el-table-column>
                        <el-table-column label="设置的标签" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.lab) }}</span></template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <!--订单信息-->
                <div class="secondLevel"><span class="secondLevelTitle">订单信息</span></div>
                <el-row>
                    <el-table :data="shopData.orders" highlight-current-row border ref="multipleTable" style="width: 100%">
                        <el-table-column label="餐厅名" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.ob.merchant) }}</span></template>
                        </el-table-column>
                        <el-table-column label="消费金额" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.ob.cash) }}</span></template>
                        </el-table-column>
                        <el-table-column label="订单状态" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.ob.status) }}</span></template>
                        </el-table-column>
                        <el-table-column label="送货地址" header-align="center" label-class-name="table-header-bold" width="220px">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.di.receiving) }}</span></template>
                        </el-table-column>
                        <el-table-column label="配送方式" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.di.dist_type) }}</span></template>
                        </el-table-column>
                        <el-table-column label="骑手姓名" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.di.rider) }}</span></template>
                        </el-table-column>
                        <el-table-column label="骑手联系方式" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.di.rider_cp) }}</span></template>
                        </el-table-column>
                        <el-table-column label="支付方式" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.oi.pay) }}</span></template>
                        </el-table-column>
                        <el-table-column label="下单时间" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.oi.order_time) }}</span></template>
                        </el-table-column>
                        <el-table-column label="收货人" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.di.receiver) }}</span></template>
                        </el-table-column>
                        <el-table-column label="收货人电话" header-align="center" label-class-name="table-header-bold">
                            <template scope="scope"><span>{{ zhuanhua(scope.row.di.phone) }}</span></template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </div>
            <div v-if="this.creditShopTwo" class="no-data">用户暂无报告信息</div>
        </div>

    </div>
</template>
<script>

    export default {
        props: ['data','hidden'],
        data() {
            return {
                text:'',
                creditShopOne: false,//未授权
                creditShopTwo: false,//用户暂无报告信息
                creditShopStatus:false,//没有数据

                basic: false,//基本信息
                addres: false,//地址信息
                order: false,//订单信息
                shopData: "",//预备用于返回的数据
            }
        },
        methods: {
            basicClick(data) {
                this.$data[data] = !this.$data[data];
            },
			zhuanhua(data){
            	return data ? data : '—'
			}

        },
        mounted() {
        	console.log('饿了么-------',this.data )
            /*this.creditShop = false;
            if(this.data.data.length){
                this.creditShop = true;
                this.shopData = this.data.data[0]['dts']
            }*/
            if(this.data.code == '00000001'){
            	this.creditShopOne = true;
            }else if(this.data.data.data.data.length){
                this.creditShopStatus = true
                this.shopData = this.data.data.data.data[0]['dts']
            }else{
            	this.creditShopTwo = true
            }
        }
    }
</script>
<style lang="scss" scoped>
.eleMeDetail{
    .secondLevel{
        .secondLevelTitle {
            font-size: 16px;
            line-height: 40px;
        }
    }


    .jibenxinxi-body {
        font-size: 14px;
        padding:0 30px;

    }
    .no-data {
        width:100%;
        text-align: center;
        margin: 10px 0;
        font-size: 16px;
    }
}

</style>
