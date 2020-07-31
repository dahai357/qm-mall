<style scoped>
  .tip-doubt-word .tip-doubt-con .tip-txt {
    padding: 5px 10px;
    display: inline-block;
    position: relative;
    border-radius: 5px;
    background: #fff;
    border: 1px solid #0093fa;
  }
  .memoSpan {
    margin-left: 50px;
    line-height: 20px;
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
  .head-tips{
    font-size: 14px;
  }
  .set{
    color:#ff9a30;
  }
  .head-txt{
    margin: 0 5px;
  }
  .tit{
    font-size: 14px;
  }
  ul.sys-banner-list{
    display: flex;
    justify-content: center;
  }
  ul.sys-banner-list li{
    cursor: default;
    width: 100%;
    height: 70px;
    float: left;
    margin: 5px;
    position: relative;
  }
  ul.sys-banner-list li img{
    width: 100%;
    height: 100%;
  }
  .ncsc-upload-btn{
    display: block;
    width: 170px;
    height: 70px;
    position: relative;
    border: 1px dashed #ddd;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .ncsc-upload-img-item .ncsc-upload-img-box{
    width: 170px;
    height: 70px;
  }
  .ncsc-upload-btn p{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 14px;
    line-height: 50px;
    height: 60px;
    color: #757575;
    text-align: center;
    z-index: 1;
    margin: 0;
    font-size: 25px;
    font-weight: bold;
  }
  .mask{
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background: #0C0C0C;
    position: absolute;
    top:0;
  }
  .ncsc-upload-avatar{
    position: relative;
  }
</style>
<template>
  <div class="qm-store-class-base">
    <div class="banner" >
      <p v-if="cutBannerCurId === -1" class="head-tips head-txt">当前未设置banner，将显示系统默认banner图 <a class="set" @click="openBannerDialog()">前往设置>></a></p>
      <p v-else class="head-tips head-txt">已设置砍价banner图 <a class="set" @click="openBannerDialog()">前往修改>></a></p>
      <el-tooltip placement="bottom-start" effect="light" popper-class="atooltip">
        <div slot="content" class="toolTipCont">
          <div class="tip-doubt-con"><img :src="cutBannerCurSrc" alt="" width="600px"></div>
        </div>
        <p class="lightBlue head-tips" style="cursor: default">鼠标悬停查看<template v-if="cutBannerCurId === -1">系统默认</template><template v-else>当前</template>banner图</p>
      </el-tooltip>
    </div>
    <ul class="comm-tab mb10" id="storage_c_type">
      <li v-for="(item,key) in switchTypes" :class="pageParams.status == key ? 'active':''" @click="switchType(key)">{{item}}</li>
    </ul>

    <qm-table :pageParams="pageParams">
      <template slot="table">
        <div class="operate-bar">
          <label class="mr10"><input type="checkbox" ref="selectAll" @change="selectAll($event)">全选</label>
          <a @click="batchDel" class="ncsc-btn-orange-unfilled">删除</a>
        </div>
        <table class="ncsc-table">
          <thead>
          <tr>
            <th class="w15"></th>
            <th class="w180">砍价活动名称</th>
            <th class="w90">参与商品数量</th>
            <th class="w100">开始时间</th>
            <th class="w110">结束时间</th>
            <th class="w80">活动状态</th>
            <th class="w100">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in list">
            <td><input type="checkbox"  :checked="item.checked" @change="selectChange($event,i)"/>
            </td>
            <td>
              {{item.activity_name}}
            </td>
            <td>
              <p style="text-align: center">{{item.goods_count}}</p>
            </td>
            <td class="c-gray">{{item.start_time}}</td>
            <td class="c-gray">{{item.end_time}}</td>
            <td>
              <p>{{item.status_desc}}</p>
              <p class="fs12" style="color: red;" v-if="item.goods_desc">{{item.goods_desc}}</p>
            </td>
            <td class="handle">
              <p><a @click="edit(item)" class="ncsc-btn">管理</a></p>
              <p><a @click="delOne(item)" class="ncsc-btn">删除</a></p>
              <p v-if="item.status != 0"><a @click="showDetail(item)" class="ncsc-btn">查看活动情况</a></p>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="operate-bar">
          <label class="mr10"><input type="checkbox" ref="selectAll2"  @change="selectAll($event)">全选</label>
          <a @click="batchDel" class="ncsc-btn-orange-unfilled">删除</a>
        </div>
      </template>
    </qm-table>
    <qm-tips :tipsVisible="delDialog" :width="'420px'" @update:tipsVisible="delDialog = $event" @close="delDialog = false" @confirm="confirmDel()">
      <template slot="title">提示信息</template>
      <template slot="content">您确定要删除吗?</template>
    </qm-tips>
    <qm-tips :tipsVisible="noSelectDialog" :showCancel="false" :width="'420px'" @close="noSelectDialog = false" @confirm="noSelectDialog = false">
      <template slot="title">提示信息</template>
      <template slot="content">请选择需要操作的记录</template>
    </qm-tips>
    <qm-dialog :dialogVisible="bannerDialog" :width="'600px'" @close="closeBannerDialog">
      <template slot="title">设置banner图片</template>
      <template slot="content" >
        <div class="eject_con">
          <form method="post" target="_parent" enctype="multipart/form-data" id="add_form">
            <p class="tit">方式一：选择平台提供的banner图</p>
            <ul class="sys-banner-list">
              <li class="sys-banner-item"  v-for="(item,i) in sysBanners" @click="selectBanner(item)">
                <img :src="item.src"><div class="mask" v-if="!(tempCurId != 0 && tempCurId == item.id)"></div>
              </li>
            </ul>
            <p class="tit">方式二：自定义活动图片</p>
            <div class="ncsc-form-shop-c1" id="ncsc-upload-thumb">
              <div class="ncsc-upload-img-item">
                <div class="ncsc-upload-img-box" v-if="(userBanner.src && !isDelete)">
                  <div class="ncsc-upload-avatar" id="imagesname" @click="selectBanner(userBanner)">
                    <img :src="userBanner.src"><div class="mask" v-if="!(tempCurId == 0)"></div>
                  </div>
                  <input type="hidden" id="store_label" name="store_label" value="">
                  <div class="image-delete" @click="deleteLogo">×</div>
                </div>
                <div class="ncsc-upload-btn" v-if="!(userBanner.src && !isDelete)">
                  <a href="javascript:void(0);">
                    <input type="file" class="input-file" data-id="imagesname" id="filename" name="store_label1" @change="logoLoad($event)">
                    <p>+</p>
                  </a>
                </div>
              </div>
              <p class="hint">建议上传100*200尺寸图</p>
              <p class="ncsc-form-error block"></p>
            </div>
            <div class="bottom">
              <label @click="confirmBanner()" class="submit-border"><input type="button" class="ncsc-btn ncsc-btn-orange" value="确定" ></label>
              <label @click="closeBannerDialog()" class="submit-border"><input type="button" class="ncsc-btn cancle" value="取消"></label>
            </div>
          </form>
        </div>
      </template>
    </qm-dialog>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
  import {mapGetters,mapActions,mapMutations} from 'vuex';
  import QmPagination from 'component/qm-pagination/index'
  import QmTable from 'component/qm-table/index';
  import QmDialog from 'component/qm-dialog/index';
  import QmTips from 'component/qm-tips/index';
  import {cutAct} from 'api'
  import storage from 'lib/utils/storage'
  import fileUpload from 'lib/utils/fileUpload.js';
  export default {
    name: "store-promotion-bundling-list",

    data() {
      return {
        bodyListener:'',
        switchTypes:{
          0:'全部',
          1:'未开始',
          2:'进行中',
          3:'已结束'
        },
        pageParams:{
          status:0,
          activity_ids:'',
          pageIndex:0,
          pageSize:10,
          total:0
        },
        list:[],
        sysBanners:[],
        userBanner:{
          id:0,
          src:''
        },
        hasSelect:false,
        isDelete:false,
        bannerDialog:false,
        delDialog:false,
        noSelectDialog:false,
        cutBannerCurId:-1,
        tempCurId:-1,
        cutBannerCurSrc:'',
        selectBannerId:'',
        selectBannerSrc:'',
      }
    },

    computed:{
      ...mapGetters({
        metaData:'getMetaData',
        ImageIp:'getImageIp',
        imagePathConfig:'getImagePathConfig',
      }),
      ...mapGetters('cutAct',{
        update:'getUpdate',
        getPageIndex:'getPageIndex'
      }),
    },

    components:{
      QmPagination,
      QmTips,
      QmTable,
      QmDialog
    },

    methods: {
      ...mapMutations('cutAct',{
        setPageIndex:'setPageIndex',
      }),
      getPageData(data){
        cutAct.getList(data).then((res)=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
        })
      },
      getBanners(){
        cutAct.getBanners().then((res)=>{
          this.sysBanners = res.list;
          this.userBanner.src = res.user_src
          /*this.setBannerCache(res.cur_id,res.cur_src);*/
          this.cutBannerCurId = res.cur_id;
          this.cutBannerCurSrc = res.cur_src;
        })
      },
      setBannerCache(id,src){
        //获取列表、设置都要保存一份在本地
        storage.set('cutBannerCurId',id);
        storage.set('cutBannerCurSrc',src);
      },
      openBannerDialog(){
        this.bannerDialog = true;
        this.tempCurId = this.cutBannerCurId;
        this.selectBannerId = this.cutBannerCurId;
        this.selectBannerSrc = this.cutBannerCurSrc;
      },
      closeBannerDialog(){
        this.bannerDialog = false;
        this.isDelete = false;
      },
      selectBanner(item){
        this.tempCurId = item.id
        this.selectBannerId = item.id;
        this.selectBannerSrc = item.src;
      },
      confirmBanner(){
        let data = {
          id:this.selectBannerId,
          src:this.selectBannerSrc.replace(this.ImageIp + this.imagePathConfig.storeLabel,'')
        }
        cutAct.setBanner(data).then((res)=>{
          layer.msg(res.shortMessage)
          this.cutBannerCurId = this.selectBannerId;
          this.cutBannerCurSrc = this.selectBannerSrc;
          this.isDelete = false;
          this.bannerDialog = false;
        })
      },
      deleteLogo(){
        this.isDelete = true;
      },
      logoLoad(event) {
        var key = this.metaData.key;
        var type = 2;
        fileUpload.logoLoad(event,key,type,this.uploadFile).then(res => {
          var imagePath = res.imgPath.replace(this.imagePathConfig.storeLabel,'');
          this.userBanner.src = this.ImageIp + this.imagePathConfig.storeLabel+ imagePath;
          this.isDelete = false;
          //this.selectBanner(this.userBanner)
        })
      },
      switchType(key){
        if(this.$refs.selectAll) {
          this.$refs.selectAll.checked = false
          this.$refs.selectAll2.checked = false
        }

        this.pageParams.status = key
        this.pageParams.pageIndex = 0;
        this.getPageData(this.pageParams);
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      search(){
        this.pageParams.pageIndex = 0;
        this.getPageData(this.pageParams);
      },
      selectAll(event){
        var tempList = _.clone(this.list)
        tempList.forEach((item,i) => {
          if(event.target.checked){
            item.checked = true;
          }else{
            item.checked = false;
          }
        })
        this.updateList(tempList)
      },
      batchDel(){
        if(!this.hasSelect){
          this.noSelectDialog = true
          return;
        }
        this.delDialog = true
      },
      delOne(item){
        this.pageParams.activity_ids = item.id
        this.delDialog = true
      },
      showDetail(item){
        storage.set('cut_act_id',item.id);
        this.$router.push("/promotion/cut_act/cut_view")
      },
      edit(item){
        this.$router.push("/promotion/cut_act/cut_edit/"+item.id)
      },
      confirmDel(){
        var data = {
          activity_ids:this.pageParams.activity_ids
        }
        cutAct.activeDel(data).then((res)=>{
          this.delDialog = false
          this.pageParams.pageIndex = 0;
          this.getPageData(this.pageParams);
        })
      },
      selectChange(event,i){
        var tempList = _.clone(this.list)
        if(event.target.checked){
          tempList[i].checked = true
        }else{
          tempList[i].checked = false
        }
        this.updateList(tempList)
      },
      updateList(data){
        this.list = data
        var remains = this.list.map((item)=>{return item.checked?item.id:''}).filter(function(item){return item !==''})
        this.pageParams.activity_ids = remains.join(',')
        if(remains.length !== this.list.length){
          this.$refs.selectAll.checked = false
          this.$refs.selectAll2.checked = false
        }else{
          this.$refs.selectAll.checked = true
          this.$refs.selectAll2.checked = true
        }
        if(this.pageParams.activity_ids !== ''){
          this.hasSelect = true
        }else{
          this.hasSelect = false
        }
      },
    },
    watch:{
      list(){
        if(this.list.length == 0 && this.pageParams.pageIndex > 0){
          this.pageParams.pageIndex -= 1;
          this.getPageData(this.pageParams);
        }
      }
    },
    mounted () {
      var _self = this;
      this.getBanners();
      this.getPageData(this.pageParams);
      layui.use('layer', function(){
        this.layer = layui.layer;
      });
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.delDialog){
            _self.confirmDel();
          }else{
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
    updated(){
    },
  activated: function () {
    if(this.getPageIndex == 0){
      this.pageParams.pageIndex = 0;
      this.setPageIndex(1);
    }
    this.getPageData(this.pageParams);
  }
  }
</script>
