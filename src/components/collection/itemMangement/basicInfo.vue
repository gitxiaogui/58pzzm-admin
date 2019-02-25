<template>
  <el-card class="basic-info">
    <h3>基本信息</h3>
    <el-button class="button-more-tag" size="mini" v-show="!tagsShow" @click="tagsShowMore()">展开<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
    <el-button class="button-more-tag" size="mini" v-show="tagsShow" @click="tagsHideMore()">收起<i class="el-icon-caret-top el-icon--right"></i></el-button>
    <div :class="[ tagsShow ? 'tags-show' : 'tags-hide','tags-box']">
      <div class="tags-area" ref="tagEl"> 
        <el-tag @close="closeTag(item)" v-for="(item, index) in tagArray" :type="['warning', 'danger', 'primary', 'success'][index%4]" :closable="true" :key="index">{{ item }}</el-tag>
        <el-input
          ref="tagAddEle"
          class="input-new-tag"
          v-if="inputVisible"
          v-model="tagValue"
          size="mini"
          @blur="handleAddTag"
        >
        </el-input>
        <el-button v-else :class="'button-new-tag'" size="small" @click="showInput" @blur="handleAddTag">+添加标签</el-button>
      </div>
    </div>
    <el-row>
      <el-col :span="12">
        <p>姓名：{{ this.collectionCaseInfo.debtorName }}</p>
        <p>身份证号：{{ this.collectionCaseInfo.debtorCid }}</p>
        <p>逾期天数：{{ this.collectionCaseInfo.overdueDays }}</p>
        <p>已还本金：{{ this.collectionCaseInfo.repaymentPrincipal }}</p>
        <p>已还金额：{{ this.collectionCaseInfo.repayment }}</p>
        <p>分案时间：{{ this.collectionCaseInfo.assignTime ? dateFormat(new Date(parseInt(this.collectionCaseInfo.assignTime)), 'yyyy-MM-dd hh:mm:ss') : '' }}</p>
      </el-col>
      <el-col :span="12">
        <p>电话：{{ this.collectionCaseInfo.debtorPhone }}</p>
        <p>借款本金：{{ this.collectionCaseInfo.debtPrincipal }}</p>
        <p>未还金额：{{ this.collectionCaseInfo.unpaid }}</p>
        <p>状态：{{ this.collectionCaseInfo.status }}</p>
        <p>借款时间：{{ dateFormat(new Date(parseInt(this.collectionCaseInfo.debtTIme)), 'yyyy-MM-dd hh:mm:ss') }}</p>
        <p>催收员：{{ this.collectionCaseInfo.collectorName }}</p>
      </el-col>
    </el-row>
    <el-button v-if=" this.collectionCaseInfo.waiveStatus !== 1" class="addFilelist" type="danger" @click="abandonFile()">弃案申请</el-button>
    <el-button class="addFilelist" type="warning" @click="withdrawAcase()">撤案申请</el-button>
    <el-dialog size="small" :visible.sync="addFilelist" :close-on-click-modal="true" :modal-append-to-body="false" title="弃案内容">
    	<el-row>
        <el-col :span="18">
         <el-input
            v-model="abandonModel"
            placeholder="弃案内容"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button
            type="success"
            @click="saveAbandon()"
          >保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </el-card>
</template>
<script>
  import { dateFormat } from '@/common/util.js'
  import { collectionOptionMixin } from '@/common/mixin'
  import { abandonFiles, collectEventFlag ,withdrawacaseBeg} from '@/api/api'
  import Bus from '@/eventBus'
  export default {
    mixins: [collectionOptionMixin],
    data(){
    	return {
    		addFilelist:false,
        inputVisible: false,
        tagArray: [],
    		abandonModel:'',
        tagValue: '',
        tagsHasMore: false,
        tagsShow: false,
        abandonShow:true,
    	}
    },
    methods: {
      closeTag(tag) {
        collectEventFlag(
          {
            caseId: this.collectionCaseInfo.id,
            flag: tag
          },
          'DELETE'
        ).then((res) => {
          this.$message.success('标签删除成功');
          this.tagArray.splice(this.tagArray.indexOf(tag), 1);
        })
      },
      handleAddTag() {
        this.inputVisible = false;
        if(!this.tagValue) {
          this.inputVisible = false;
        } else {
          collectEventFlag(
            {
              caseId: this.collectionCaseInfo.id,
              flag: this.tagValue,
              remove: true
            },
            'POST'
          ).then((res) => {
            this.$message.success('标签添加成功');
            this.tagArray.push(this.tagValue);
            this.tagValue = '';
            this.countHeight()
          })
        }
      },
      withdrawAcase(){
		    	this.$confirm('此操作将发起撤案, 是否继续?', '提示', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		      }).then(() => {
		      withdrawacaseBeg({
			      caseId: this.collectionCaseInfo.id,
			    }).then((res)=>{
		        console.log('撤案申请=======================',res)
		        this.$message.success('操作成功')
		        })
		      }).catch(() => {
		        this.$message({
		        type: 'info',
		        message: '已取消'
		        });          
		      });
		  },
      showInput() {
        this.inputVisible = true;
      },
    	abandonFile(){
    			this.abandonModel = '';
    		  this.addFilelist = true;
    	},
    	saveAbandon(){
        if(!this.abandonModel) {
          this.$message.error('请填写完整信息');
          return false;
        }
    		abandonFiles(
          {
           caseId: this.collectionCaseInfo.id,
           content: this.abandonModel
          }
        ).then((res) => {
          this.$message.success('弃案申请成功');
          this.addFilelist = false;
          Bus.$emit('changeCurrentCollectionCase');
        })
    	},
      countHeight() {
        return;
        let tagEl = this.$refs.tagEl;
        let tagsHeight = parseInt(getComputedStyle(tagEl, false)['height']);
        console.log(tagsHeight)
        if(tagsHeight > 32) {
          this.tagsHasMore = true
        } else {
          this.tagsHasMore = false
        }
      },
      initTagArray() {
    	  let tagData = this.collectionCaseInfo.flag;
    	  if(!!tagData) {
    	    this.tagArray = tagData.split(',');
        } else {
    	    this.tagArray = []
        }
      },
      dateFormat,
      tagsShowMore() {
        this.tagsShow = true
      },
      tagsHideMore() {
        this.tagsShow = false
      }
    },
    watch: {
      collectionCaseInfo: function () {
//      this.getList()
        this.initTagArray()
        // this.$nextTick(()=>{this.countHeight()})
        
      }
    },
    activated() {
      let _this = this;
      window.onresize = () => {
        _this.countHeight()
      }
      this.countHeight()
    },
    mounted() {
      let _this = this;
      this.initTagArray()
    }
  }
</script>

<style lang="scss" scoped>
  .basic-info{
    height: 250px;
    position: relative;
    h3{
      line-height: 30px;
      padding-left: 0;
      margin-left: 0
    }
    .button-more-tag{
      position: absolute;
      right: 20px;top: 15px;
      z-index: 3
    }
    .tags-box {
      position: absolute;
      top: 12px;
      left: 86px;
      width: 80%;
      z-index: 2;
    }
    .tags-area {
      background: #fff;
    }
    .tags-hide {
      height: 30px;
      overflow: hidden;
    }
    .tags-show {
      height: auto;
      box-shadow: 2px 2px 10px #ccc;
      .tags-area {
        padding: 10px;
      }
    }
    .button-hide-tag {
      display: block;
      margin: 20px auto 0 auto;
    }
    p{
      margin-bottom: 8px;
      margin-right: 15px;
      &:last-child{
        margin-right: 0px;
        margin-bottom: 0;
      }
    }
    .input-new-tag {
      width: 80px;
    }
    .el-tag {
      margin: 0px 4px 6px 0px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
  .addFilelist{
  	width: 100px;
    margin-top: 20px
  }
</style>
