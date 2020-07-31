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
  .update-dialog dt{
    vertical-align: middle;
  }
</style>
<template>
  <div class="qm-store-class-base">
    <div class="set-title fs14">等级信息</div>
    <div class="level-info fs14 c-gray">
      <p>会员等级：<span>VIP{{pageParams.levelNum}}</span></p>
      <p style="margin:0px 180px;">等级名称：<span>{{levelInfo.level_name}}</span></p>
      <p>会员人数：<span class="c-orange f-b fs16">{{levelInfo.total_member}}</span>/人
        <a class="c-blue ml10" @click="addMember()">添加会员</a>
      </p>
    </div>
    <div class="set-title fs14">会员列表</div>
    <div class="qm-store-class-record">
      <select class="w130 mr5" @change="search()" v-model="pageParams.favFrom">
        <option value="">全部用户来源</option>
        <option value="2">购买关注</option>
        <option value="1">主动关注</option>
        <option value="3">扫码关注</option>
        <option value="4">导入</option>
      </select>
      <select  class="w130 mr5" @change="search()" v-model="pageParams.tagId">
        <option value="">所有会员标签</option>
        <option value="-1">未分类标签</option>
        <option v-for="(titem) in favoritesTagList" :value="titem.tag_id">{{titem.tag_name}}</option>
      </select>
      <select @change="search()" class="w130" v-model="pageParams.timeType">
        <option value="1">会员加入时间</option>
        <option value="2">会员升级时间</option>
      </select>
      <input name="start_time" id="start_time" type="text" class="input-add-on w120" :value="pageParams.beginTime" readonly="readonly">
      <label class="add-on"><i class="fa fa-calendar" aria-hidden="true"></i></label>
      <span class="ncsc-sep">-</span>
      <input name="end_time" id="end_time" type="text" class="input-add-on w120" :value="pageParams.endTime" readonly="readonly">
      <label class="add-on mr5"><i class="fa fa-calendar icon-calendar"></i></label>
      <div class="mt10">
        <select @change="search()" class="w130" v-model="pageParams.searchType">
          <option value="1">会员绑定手机号</option>
          <option value="2">会员名称</option>
        </select>
        <input type="text"  class="w150 mr5" autocomplete="off" v-model.trim="pageParams.searchText">
        <input type="submit" class="ncsc-btn" value="搜索" @click="search()">
        <input v-show="resetBtn" type="submit" class="ncsc-btn" value="重置" @click="restSearch()">
      </div>
    </div>
    <div class="operate-bar">
      <label for="all" class="mr10"><input type="checkbox" id="all" class="checkall" v-model="checkAllState" @click="checkall">本页全选</label>
      <a href="javascript:void(0)" class="ncsc-btn-mini mr5" @click="changeLevel()">变更等级</a>
    </div>
    <!--统计数据展示-结束-->
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="ncsc-table table-transaction-online">
          <thead>
          <tr nc_type="table_header">
            <th class="w15"></th>
            <th class="w300">会员名称</th>
            <th class="w110">会员标签</th>
            <th class="w110"><a @click="sort($event)" class="sort js-sort" data-sort="addtime_sort">会员加入时间<i class="ico-top"></i><i class="ico-bottom"></i></a></th>
            <th class="w110"><a @click="sort($event)" class="sort js-sort" data-sort="updatetime_sort">会员升级时间<i class="ico-top"></i><i class="ico-bottom"></i></a></th>
            <th class="w110">用户来源</th>
            <th class="w180">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item) in list">
            <td><input type="checkbox" class="checkitem" :value="item.favid" v-model="checkState"></td>
            <td>
              <div class="info-box">
                <div class="pic">
                  <img  width="60" height="60" class="br100p" :src="item.member_avatar">

                  <i v-if="item.is_backlist == 1" class="ico-black"></i>
                </div>
                <div class="detail">
                  <p>{{item.member_name}}</p>
                  <p class="c-gray fs12">
                    <span v-if="item.member_mobile && item.member_mobile.length == 11">{{item.member_mobile}}</span>
                    <span v-else>{{item.import_mobile}}</span>
                  </p>
                </div>
              </div>
            </td>
            <td>
              <p v-if="item.store_tag_ids !== undefined && item.store_tag_ids.length > 0 && favoritesTag" class="c-gray fs12">
                <span v-for="(titem) in item.store_tag_ids">
                   <span v-if="favoritesTag[titem]">{{favoritesTag[titem]}}&nbsp;</span>
                   <span v-else>-</span>
                </span>
              </p>
              <p v-else>-</p>
            </td>
            <td class="c-gray">
             <p>{{item.add_time1}}</p>
              <p>{{item.add_time2}}</p>
            </td>
            <td class="c-gray">
             <p> {{item.update_level_time1}}</p>
             <p> {{item.update_level_time2}}</p>
            </td>
            <td class="fs12">{{item.fav_from}}</td>
            <td class="handle">
              <p><a class="ncsc-btn" @click="changeLevelOne(item)">变更等级</a></p>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </qm-table>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
    <qm-tips :tipsVisible="setLevelDialog" :width="'480px'" :showCancel="false" @close="setLevelDialog = false"  @confirm="doChangeLevel()">
      <template slot="title">变更等级</template>
      <template slot="content">
        <div class="eject_con update-dialog" style="text-align: left">
          <dl v-show="isOnlyOne==1">
            <dt class="w150">用户名称：</dt>
            <dd>
              <div class="info-box">
                <div class="pic">
                  <img style="vertical-align: middle" width="50" height="50" class="br100p" :src="currentItem.member_avatar">
                  <i v-if="currentItem.is_backlist == 1" class="ico-black"></i>
                </div>
                <div class="detail">
                  <p>{{currentItem.member_name}}</p>
                  <p class="c-gray fs12">
                    <span v-if="currentItem.member_mobile && currentItem.member_mobile.length == 11">{{currentItem.member_mobile}}</span>
                    <span v-else>{{currentItem.import_mobile}}</span>
                  </p>
                </div>
              </div>
            </dd>
          </dl>
          <dl>
            <dt class="w150">当前等级：</dt>
            <dd>VIP{{pageParams.levelNum}}-{{levelInfo.level_name}}</dd>
          </dl>
          <dl>
            <dt class="w150"><i class="required">*</i>变更后的等级：</dt>
            <dd>
              <select class="w200 mr5" v-model="levelArr.levelNum">
                <option value="">请选择会员等级</option>
                <option value="0">未归属等级</option>
                <option v-if="litem.level_num != pageParams.levelNum" v-for="(litem) in userLevel" :value="litem.level_num">&nbsp;&nbsp;&nbsp;VIP{{litem.level_num}}-{{litem.level_name}}</option>
              </select>
            </dd>
          </dl>
        </div>
      </template>
    </qm-tips>
    <el-dialog
      :visible.sync="addMemberDialog"
      width="900px"
      hieght="600px"
      :show-close="showClose"
      :lock-scroll="modalAppendToBody"
      :close-on-click-modal = "closeOnClickModal"
      customClass="new-guide new-tip"
      v-dialogDrag>
      <qm-add-member :currentLevel="pageParams.levelNum" @hideNewAddMember="hideNewAddMember($event)" v-if="addMemberDialog"></qm-add-member>
    </el-dialog>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css';
  import {mapGetters,mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmTable from 'component/qm-table/index';
  import QmTips from 'component/qm-tips/index';
  import util from 'lib/utils/util';
  import QmAddMember from 'component/qm-add-member/index';
  import storage from 'lib/utils/storage';
  export default {
    name: "user_level",

    data() {
      return {
        bodyListener:'',
        pageParams:{
          total:0,
          pageIndex:0,
          pageSize:15,
          levelNum:'',
          tagId:'',//会员标签id
          searchType:1,//1：会员绑定手机号 2：会员名称
          searchText:'',//搜索内容（会员绑定/会员手机号搜索）
          favFrom:'',//1主动关注，2购买关注,3:扫码关注
          timeType:1,//1:会员加入时间 2：会员升级时间
          beginTime:'',//开始时间
          endTime:'',//结束时间
          sort:'',//1:会员加入时间升序，2:会员加入时间降序，3:会员升级时间升序，4:会员升级时间降序
        },
        favoritesTag:[],//会员标签通过key=tag_id value=tag_name来处理数据
        favoritesTagList:[],
        list:[],
        levelInfo:[],
        checkState: [],
        checkAllState : false,
        levelArr:{
          levelNum:'',
          favId:[]
        },
        setLevelDialog:false,//变更等级弹窗
        userLevel:[],
        isOnlyOne:'',//1:单个变更 2：全选变更
        currentItem:[],//当前编辑的用户
        addMemberDialog:false,//添加会员的弹窗
        resetBtn:false,
      }
    },

    computed:{
    },

    components:{
      QmPagination,
      QmTips,
      QmTable,
      QmAddMember,
    },

    methods: {
      ...mapActions({
        getStoreMemberList: 'getStoreMemberList',
        getUserLevel:'getUserLevel',
        updataLevelMethod:'updataLevel',
      }),
      hideNewAddMember(){
        this.getPageData();
        this.addMemberDialog = false;
      },
      getPageData(){
        this.getStoreMemberList(this.pageParams).then((res) => {
          if((!res.responseContent.memberList || res.responseContent.memberList.length == 0) && this.pageParams.pageIndex > 0){
            this.pageParams.pageIndex -= 1;
            this.getPageData(this.pageParams);
          }else{
            this.list = res.responseContent.memberList;
            this.favoritesTag = res.responseContent.favoritesTag;
            this.favoritesTagList = res.responseContent.favoritesTagList;
            this.levelInfo = res.responseContent.levelInfo;
            var newPageParams = _.clone(this.pageParams)
            newPageParams.total = res.responseContent.total;
            this.pageParams = newPageParams;
            //取消复选框的选中
            this.checkState = [];
            this.checkAllState = false;
          }
        })
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      search(){
        if(this.pageParams.beginTime !== '' && this.pageParams.endTime !== '') {
          if(this.pageParams.beginTime > this.pageParams.endTime){
            util.msg('搜索时间范围结束时间不能大于开始时间');
            return;
          }
        }
        this.pageParams.pageIndex = 0;
        this.getPageData();
      },
      checkall(e) {
        this.checkState = [];
        if(e.target.checked === true) {//批量全选
          for(let item of this.list) {
            this.checkState.push(item.favid);
          }
        }
      },
      changeLevel(){
        if(this.checkState.length === 0) {
          util.msg('请选择需要变更等级的会员');
          return;
        }
        this.getLevel();
        this.levelArr.levelNum = '';
        this.isOnlyOne = 2;
        this.setLevelDialog = true;
      },
      changeLevelOne(item){
        this.getLevel();
        this.currentItem = _.clone(item);
        this.levelArr.levelNum = '';
        this.isOnlyOne = 1;
        this.setLevelDialog = true;
      },
      doChangeLevel(){
        if(!this.levelArr.levelNum){
          util.msg('请选择变更后的会员等级');
          return;
        }
        let favIdArr = [];
        if(this.isOnlyOne == 2){
          //批量变更等级
          favIdArr = this.checkState;
        }else{
          //单个变更等级
          favIdArr = [this.currentItem.favid];
        }
        favIdArr =  favIdArr.map(val=>{//数组元素类型如果不是字符串参数会被过滤
          return ''+val;
        });
        this.levelArr.favId = _.clone(favIdArr);
        this.updataLevelMethod(this.levelArr).then((res)=>{
          if(res.resultCode == 1){
            this.getPageData(this.pageParams);
            this.setLevelDialog = false;
            util.msg('操作成功');
          }else{
            util.msg(res.shortMessage);
          }
        })
      },
      getLevel(){
        this.getUserLevel().then((res)=>{
          this.userLevel = res.responseContent.list;
        })
      },
      addMember(){
        this.addMemberDialog = true;
      },
      sort(e){
        //1:会员加入时间升序，2:会员加入时间降序，3:会员升级时间升序，4:会员升级时间降序
        //排序的方法
        var el = e.currentTarget;
        var _self = this;
        $('.sort').removeClass('sort-up');
        $('.sort').removeClass('sort-down');
        var className = $(el).attr('data-sort');
        if(className == 'updatetime_sort'){
          //关注时间排序
          if(_self.pageParams.sort == 3){
            _self.pageParams.sort = 4;
            $(el).addClass('sort-down') ;
          }else if(_self.pageParams.sort == 4){
            _self.pageParams.sort = '';
          }else{
            _self.pageParams.sort = 3;
            $(el).addClass('sort-up');
          }
        }else{
          //购买业绩排序
          if(_self.pageParams.sort == 1){
            _self.pageParams.sort = 2;
            $(el).addClass('sort-down') ;
          }else if( _self.pageParams.sort == 2){
            _self.pageParams.sort = '';
          }else{
            _self.pageParams.sort = 1;
            $(el).addClass('sort-up');
          }
        }
        _self.search();
      },
      restSearch(){
        var newData = _.clone(this.pageParams);
        newData.tagId = '';
        newData.searchType = 1;
        newData.searchText = '';
        newData.favFrom = '';
        newData.timeType = 1;
        newData.beginTime = '';
        newData.endTime = '';
        newData.endTime = '';
        this.pageParams = newData;
        this.search();
      },
    },
    watch:{
      addMemberDialog(){
         var dragDom = document.querySelectorAll(".el-dialog");
          dragDom.forEach((el)=>{
              console.log(el)
              el.style.left = 0;
              el.style.top =0

          })

      },
      checkState:function (val) {
        if(val.length > 0 && val.length === this.list.length) {
          this.checkAllState = true;
        }else{
          this.checkAllState = false;
        }
      },
      pageParams:{
        handler: function () {
          if(this.pageParams.beginTime || this.pageParams.endTime || this.pageParams.tagId || this.pageParams.searchText || this.pageParams.favFrom){
            this.resetBtn = true;
          }else{
            this.resetBtn = false;
          }
        },
        deep: true
      }
    },
    mounted () {
      var _self = this;
      this.pageParams.levelNum = this.$route.params.level_num;
      this.search();
      layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
          elem: '#start_time',
          theme: "#ff8519",
          done: function (value) {
            $('.mr5').removeClass('active');
            var newParams = _.clone(_self.pageParams);
            newParams.beginTime = value;
            _self.pageParams = newParams;
          }
        });
        laydate.render({
          elem: '#end_time',
          theme: "#ff8519",
          done: function (value) {
            $('.mr5').removeClass('active');
            var newParams = _.clone(_self.pageParams);
            newParams.endTime = value;
            _self.pageParams = newParams;
          }
        });
      })
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13 && !_self.addMemberDialog) {
          if (_self.setLevelDialog) {
            _self.doChangeLevel();
          } else {
            _self.search();
          }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      //销毁键盘enter搜索事件
      document.body.removeEventListener('keyup', this.bodyListener);
    },
  }
</script>
