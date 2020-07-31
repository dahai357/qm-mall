<style scoped>
  .tip-doubt-word .tip-doubt-con .tip-txt {
    padding: 5px 10px;
    display: inline-block;
    position: relative;
    border-radius: 5px;
    background: #fff;
    border: 1px solid #0093fa;
  }
  .td-lt {
    text-decoration: line-through;
  }
  .info-box .pic {
    padding-right: 15px;
    position: relative;
  }
  .info-box .detail {
    word-break: break-all;
  }
  .info-box .pic, .info-box .detail {
    display: table-cell;
    vertical-align: top;
  }
  .handle p{
    display: inline-block;
  }
  th,td{
    vertical-align: middle;
  }
  td .show-color{
    width:60px;
    height: 35px;
    border-radius:5px;
    display: inline-block;
  }
  .level-info{
    width:100%;
    height: 70px;
    text-align: center;
    line-height: 70px;
  }
  .level-info p{
    display: inline-block;
  }
  .level-info span{
    margin-left: 10px;
  }
  .view-title{
    margin:20px 0px 30px 0px;
  }
  .view-title table{
    display:inline-block;
    margin-left: 150px;
  }
  .view-title table th{
    font-weight: normal;
    padding:15px;
  }
  .view-title table td{
  }
  .ncsc-table th,.ncsc-table td{
    text-align: center;
  }
</style>
<template>
  <div class="qm-store-class-base">
    <div class="view-title">
      <table class="fs14">
        <tr>
          <th>会员标签：</th>
          <td>
            <select class="w180" v-model="importData.tagId">
              <option value="-1">请选择会员标签</option>
              <option value="">无标签</option>
            <option v-for="(titem) in favoritesTagList" :value="titem.tag_id">{{titem.tag_name}}</option>
          </select>
          </td>
        </tr>
        <tr>
          <th>会员等级：</th>
          <td>
            <select class="w180 mr5" v-model="importData.levelNum">
              <option value="-1">请选择会员等级</option>
              <option value="">无等级</option>
              <option v-for="(litem) in userLevel" :value="litem.level_num">VIP{{litem.level_num}}-{{litem.level_name}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>上传数据：</th>
          <td>
            <input ref="clearFile" @change="changeFile($event)" name="import_file" id="import_file" accept=".xls,.xlsx,.xlt" type="file" size="30" hidefocus="true">
            <a class="c-blue ml10" @click="downDemo">下载Excel模板</a>
          </td>
        </tr>
        <tr>
          <th></th>
          <td> <p class="c-gray">当前仅支持excel格式文件，必须严格按照模板内容填入客户数据，否则可能会出现导入异常</p></td>
        </tr>
        <tr>
          <th></th>
          <td>
            <a class="ncsc-btn ncsc-btn-orange" @click="importFile()">导入</a>
          </td>
        </tr>
      </table>
    </div>
    <p class="fs14">导入记录：<a :href="ImageIp+yuanErrorFile" class="c-blue" v-show="yuanErrorFile">下载错误日志，修改后重新导入</a></p>
    <!--统计数据展示-结束-->
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="ncsc-table table-transaction-online">
          <thead>
          <tr nc_type="table_header">
            <th style="width:20%">导入时间</th>
            <th style="width:20%">操作人</th>
            <th style="width:20%">会员标签</th>
            <th style="width:20%">会员等级</th>
            <th style="width:20%">导入会员数</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item) in list">
            <td>{{item.import_time}}</td>
            <td>
              <p v-if="item.is_admin == 1">店主</p>
              <p v-else><span v-if="item.import_seller_mark">{{item.import_seller_mark}}</span></p>
              <p v-if="item.seller_name">{{item.seller_name}}</p>
            </td>
            <td>
              <span v-if="item.tag_name">{{item.tag_name}}</span>
              <span v-else>无标签</span>
            </td>
            <td>
              <span v-if="item.level_num > 0">VIP{{item.level_num}}-{{item.level_name}}</span>
              <span v-else>无等级</span>
            </td>
            <td>
              <a class="c-blue" v-if="item.sus_num > 0" @click="goDetial(item.import_id)">{{item.sus_num}}</a>
              <span v-else>{{item.sus_num}}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </qm-table>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
    <qm-tips :tipsVisible="maxCountDialog" :width="'400px'" :showCancel="false" @confirm="maxCountDialog=false" :showButton='true' @close="maxCountDialog=false">
      <template slot="title">提示</template>
      <template slot="content">
        <div class="eject_con tl_con">
          <form>
            <dl>每次导入数据最多不超过1000条</dl>
            <dl>当前导入数据已超过1000条，请调整后重新导入</dl>
          </form>
        </div>
      </template>
    </qm-tips>
    <qm-tips :tipsVisible="importResultDialog" :width="'400px'" :showCancel="false" @confirm="closeDialog()" :showButton='true' @close="closeDialog()">
      <template slot="title">导入结果</template>
      <template slot="content">
        <div class="eject_con tl_con">
          <form>
            <dl>
              <span v-if="susNum > 0">本次成功导入<span class="green fb fs16 ml5 mr5">{{susNum}}</span>条数据</span>
              <span v-if="susNum > 0 && errorNum > 0">，</span>
              <span v-if="errorNum > 0">导入失败数据<span class="c-red fb fs16 ml5 mr5">{{errorNum}}</span>条</span>
            </dl>
            <div v-if="errorFilePath && errorNum > 0" class="mt20"><a download :href="ImageIp+errorFilePath" class="ncsc-btn ncsc-btn-orange">下载错误日志，修改后重新导入</a></div>
          </form>
        </div>
      </template>
    </qm-tips>
    <el-dialog
      :visible.sync="importMemberDialog"
      width="700px"
      hieght="600px"
      :show-close="showClose"
      :lock-scroll="modalAppendToBody"
      :close-on-click-modal = "closeOnClickModal"
      customClass="new-guide new-tip"
      v-dialogDrag>
      <qm-import-member :redisKey="redisKey" @hideImportDialog="hideImportDialog($event)" v-if="importMemberDialog"></qm-import-member>
    </el-dialog>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
  import {mapGetters,mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmTable from 'component/qm-table/index';
  import QmTips from 'component/qm-tips/index';
  import fileUpload from 'lib/utils/fileUpload.js';
  import util from 'lib/utils/util';
  import QmImportMember from 'component/qm-import-member/index';
  import env from "../../../../config/url";
  export default {
    name: "user_import",

    data() {
      return {
        bodyListener:'',
        pageParams:{
          total:0,
          pageIndex:0,
          pageSize:10,
        },
        importData:{
          tagId:-1,
          levelNum:-1,
        },
        list:[],
        userLevel:[],
        favoritesTagList:[],
        maxCountDialog:false,
        importMemberDialog:false,
        redisKey:'',
        susNum:0,//导入成功数据
        errorNum:0,//导入失败数据
        importResultDialog:false,//导入文件结果弹窗
        errorFilePath:'',
        yuanErrorFile:'',
      }
    },

    computed:{
    },

    components:{
      QmPagination,
      QmTips,
      QmTable,
      QmImportMember
    },
    watch:{
      importMemberDialog(){
        var dragDom = document.querySelectorAll(".el-dialog");
        dragDom.forEach((el)=>{
          console.log(el)
          el.style.left = 0;
          el.style.top =0

        })
      }
    },
    computed:{
      ...mapGetters({
        ImageIp:'getImageIp',
        imagePathConfig:'getImagePathConfig',
      }),
    },

    methods: {
      ...mapActions({
        getImportList: 'getImportList',
        getUserLevel:'getUserLevel',
      }),
      getPageData(){
        this.getImportList(this.pageParams).then((res) => {
          this.list = res.responseContent.list;
          this.yuanErrorFile = res.responseContent.error_import_path;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.responseContent.total;
          this.pageParams = newPageParams;
        })
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      search(){
        this.pageParams.pageIndex = 0;
        this.getPageData();
      },
      changeFile(event){
        this.currentEvent = event;
      },
      getLevel(){
        this.getUserLevel().then((res)=>{
          this.userLevel = res.responseContent.list;
          this.favoritesTagList = res.responseContent.favoritesTagList;
          if(!this.favoritesTagList){
            this.importData.tagId = '';
          }else{
            this.importData.tagId = -1;
          }
          if(!this.userLevel){
            this.importData.levelNum = '';
          }else{
            this.importData.levelNum = -1;
          }
        })
      },
      goDetial(num){
        this.$router.push('/user/favorites_store/import_detail/'+num);
      },
      importFile(){
        if(this.importData.tagId == -1){
          util.msg('请选择导入会员的标签');
          return;
        }
        if(this.importData.levelNum == -1){
          util.msg('请选择导入会员的等级');
          return;
        }
        if(!this.currentEvent || !this.$refs.clearFile.value){
          util.msg('请选择需要导入的Excel文件');
          return;
        }
        layer.load();
        fileUpload.importExcelFile(this.currentEvent,this.importData).then(res => {
          layer.closeAll('loading');
          if(res.resultCode  == 1){
            if(res.responseContent.repeatNum && res.responseContent.repeatNum > 0){
              //有重复数据，弹窗让用户进行过滤
              this.redisKey = res.responseContent.redisKey;
              this.importMemberDialog = true;
            }else{
              //无重复数据，直接进行导入
              this.susNum = res.responseContent.susCount;
              this.errorNum = res.responseContent.errorCount;
              this.errorFilePath = res.responseContent.filePath;
              this.importResultDialog = true;
              this.search();
            }
          }else if(res.resultCode == 220003){
            this.maxCountDialog = true;
          }else{
            util.msg(res.shortMessage);
          }
        });
      },
      hideImportDialog(res){
        this.susNum = res.susNum;
        this.errorNum = res.errorNum;
        this.errorFilePath = res.errorFilePath;
        this.importMemberDialog = false;
        this.importResultDialog = true;
        this.search();
      },
      initViewData(){
        this.importData.tagId = -1;
        this.importData.levelNum = -1;
        this.currentEvent = '';
        this.redisKey = '';
        this.susNum = 0;
        this.errorNum = 0;
        this.errorFilePath = '';
        this.$refs.clearFile.value = '';
      },
      closeDialog(){
        this.importResultDialog=false;
        this.initViewData();
      },
      doRouter(url){
        this.$router.push(url);
      },
      downDemo(){
        window.open(env.jsonUrl + '/static/seller/template/inport_user_template.xls', '_self');
      },
    },
    watch:{
    },
    mounted () {
      this.search();
      this.getLevel();
    },
  }
</script>
