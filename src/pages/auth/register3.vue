<style scoped>
  .qm-store-class-index{
    /* border: 1px solid #d7dde4; */
    background: #fff;
    padding: 10px 20px 30px;
    width: 980px;
  }

  .menu-more {

    float: right;
    right: 0;
    top: 0;
    display: block;

    z-index: 1;
    bottom: 10px;
    right: -5px;
  }

  .menu-more a {
    margin: 0 5px;
  }
  .enter-guide{

    float: right;
    right: 0;
    top: 0;
    display: block;
    font-size: 14px;
    line-height: 2;
    border: 1px solid #ff8519;
    padding: 0 8px;
    border-radius: 1em;
    color: #ff8519;
  }

  .enter-guide:hover{
    color:white
  }
  .store-tabs{
    padding: 0 20px 0 0;
    float: left;
  }
  .menu-more a:hover{
    text-decoration: none;
  }


  .eject_con dl {
    display: table;
    line-height: 30px;
    width: 100%;
  }
  .eject_con dl dt, .eject_con dl dd {
    display: table-cell;
    vertical-align: top;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .eject_con dl dt {
    text-align: right;
    width: 8em;
    padding-right: 1em;
    color: #757575;
  }

  select {
    font-size: 14px;
    display: inline-block;
    color: #212121;
    background-color: #FFF;
    height: 30px;
    vertical-align: middle;
    padding: 4px;
    border: solid 1px #ddd;
    border-radius: 5px;
  }
  .bottom .submit{
    float: right;
    cursor: pointer;
  }
  .bottom .submit:hover{
    background-color: rgb(239, 133, 1);
    color: #fff;
  }
  .ncsc-btn{
    min-width: 90px;
  }

  .ncsc-btn:hover{
    background-color: rgb(239, 133, 1);
    color: #fff;
  }
  select option {
    line-height: 20px;
    display: block;
    height: 20px;
    padding: 4px;
  }
  .choose-category-short{
    width:335px;
  }
  .choose-category-long{
    width:370px;
  }

  .eject_store_class .ncsc-form-table .item-c1 {
    width: 10em;
  }
</style>
<template>
  <div class="wrap" @click="hideSearch($event)">
    <div class="header">
      <div class="header-in">
        <div class="header-c1">
          <h1 class="logo"><a href=""><img src="~@/assets/seller/images/seller/style2018/logo.png" alt="身边店"></a></h1>
        </div>
        <div class="header-c2">
          已有账号？<a @click="doRouter('/login')"  class="btn-login">请登录</a>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="pn pn-register">
        <div class="pn-in">
          <ul class="list-flow list-flow-reg s3">
            <li class="item1 first">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num">1</p>
              <a @click="doRouter('/register')" class="link">填写店铺登录信息</a>
            </li>
            <li class="item2 second">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num">2</p>
              <a @click="doRouter('/register2')" class="link">填写店铺资料</a>
            </li>
            <li class="item3">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num">3</p>
              <p class="txt">申请店铺分类</p>
            </li>
            <li class="item4 last">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num"><i class="ico-finish"></i></p>
              <p class="txt">注册完成</p>
            </li>
          </ul>
          <div class="msg-check" v-if="registerList.reason_info != '' && registerList.reason_info != null">
            <div class="msg-in">
              <div class="msg-tit"><b>审核意见：</b></div>
              <div class="msg-txt">{{registerList.reason_info}}</div>
            </div>
          </div>
          <form id="form_register">
            <div class="mb20">
              <p class="mt5"><b>经营分类添加个数要求：</b>签约分类<span class="c-orange">不少于一个</span>，普通分类数量不限。 </p>
              <p class="mt5"><b class="c-orange">签约分类： </b> 由商家自主申请的在协议签订区域范围享有独家推荐权的付费（签约技术服务费）销售分类。（部分签约分类需在提交国家规定的相关资质后方可申请）。</p>
              <p class="mt5"><b>普通分类： </b>由您自主申请的除签约分类之外的免费（签约技术服务费）销售分类。（部分普通分类需在提交国家规定的相关资质后方可申请）。</p>
            </div>
            <p class="form-hint mb20">&lowast; 找不到您要的分类？请拨打热线：13705953251。</p>
            <div class="form-category-con js-category">
              <div>
                <div class="form-category-item ncsc-form-table" v-for="(listData,l) in classList" >
                  <div class="ncsc-form-item ncsc-form-s" :ref="'listData'+l" @mouseenter="changeHover(l)" @mouseleave="closeHover(l)">
                    <div class="item-c1">
                      经营分类
                    </div>
                    <div class="item-c2">
                      <div class="choose-category" :class="classList.length>1?'choose-category-long':'choose-category-short'" idx="1" @click="hideSearch($event)">
                          <div class="category-name" @click="showSearch(listData,l)">
                            <p class="category-name-txt">{{listData.choose}}</p>
                            <div class="category-sign"><i class="fa fa-angle-down" aria-hidden="true"></i><p class="btn-clear"></p></div>
                          </div>
                          <a class="btn-add js-add-category" title="添加经营分类" @click="addCategory" v-if="l == classList.length-1"></a>
                          <a v-show="listData.hover && classList.length>1" @click="deleteCategory(listData,l)" class="btn-del js-del-category" title="删除经营分类"></a>
                          <p class="category-error" style="display: none;"></p>
                          <div class="pop-search-category" v-if="listData.showSearch">
                            <div class="search-category-box">
                              <input type="text" class="search-category-key" autocomplete="off" placeholder="请输入分类名称进行搜索，例如：蛋糕" v-model.trim="listData.categoryName"><a class="btn-search-category" @click="searchCategory(listData,l)">搜索</a>
                            </div>
                            <p class="loading-tip loading" v-if="listData.showLoad">加载中</p>
                            <ul class="list-category2" v-if="listData.categoryList.length>0">
                              <li v-for="(item,i) in listData.categoryList" @click="choose(listData,l,item,i)">{{item.gc_name}}</li>
                            </ul>
                          </div>
                          <input type="hidden" name="class[]" data-type="gc-id-2" class="category-id" value="">
                      </div>
                    </div>
                  </div>
                  <div class="ncsc-form-item">
                    <div class="item-c1">
                      签约类型
                    </div>
                    <div class="item-c2">
                      <div class="ncsc-form-custom-radio-group">
                        <div class="ncsc-form-custom-radio" :class="listData.type == 2 ? 'checked':''">
                          <div class="ncsc-custom-radio-frame">
                            <input type="radio" :name="'type'+l" value="2" v-model="listData.type"  class="ncsc-custom-radio js-hint-radio">
                          </div>
                          <label for="sign1" class="ncsc-custom-txt" @click="clickRadioLabel(listData,2)">
                            <span class="name">签约</span>
                          </label>
                        </div>
                        <div class="ncsc-form-custom-radio" :class="listData.type == 1 ? 'checked':''">
                          <div class="ncsc-custom-radio-frame">
                            <input type="radio"  value="1"  :name="'type'+l" v-model="listData.type"  class="ncsc-custom-radio">
                          </div>
                          <label for="sign2" class="ncsc-custom-txt" @click="clickRadioLabel(listData,1)">
                            <span class="name">普通</span>
                          </label>
                        </div>
                      </div>
                      <div class="fs12 js-hint-type" v-if="listData.type == 2">
                        <p class="mt5 c-orange">签约分类享有独家推荐权</p>
                        <p class="mt5 type-info" >签约技术服务费：<b>¥ <span data-type="ts-fee">{{listData.curCategory.service_fee}}</span></b> / 月 （正式入驻后可按月、季度、年缴纳）</p>
                        <p class="mt5 type-info" >保证金：<b>¥ <span data-type="pledge-fee">{{listData.curCategory.deposit}}</span></b> （商户合同签订后五个工作日内一次性缴齐，若有多个销售分类则按最高保证金缴纳）</p>
                      </div>
                    </div>
                  </div>

                  <div class="ncsc-form-item need-file" v-if="listData.curCategory && listData.curCategory.need_file" v-for="(file,f) in listData.curCategory.need_file">
                    <div class="item-c1">
                      {{file.name}}
                    </div>
                    <div class="item-c2">
                      <p class="c-gray mb10">{{file.remark}}</p>
                      <div class="upload-file-item">
                        <div class="btn-upload-file" v-if="!file.intelligence">
                          <input type="file" name="intelligence_1148_0" id="intelligence_1148_0" class="file-upload" @change="logoLoad($event,listData,listData.curCategory,file,f)">
                          <p class="upload-txt">上传文件</p>
                        </div>
                        <div  v-else>
                          <a class="upload-link" data-type="intelligence_1148_0">
                            <a :href="file.intelligence" target="_blank">{{file.intelligence.replace(ImageIp+imagePathConfig.Register,'')}}</a>
                          <p class="btn-del-file" @click="deleteIntelligence($event,listData,listData.curCategory,file,f)">×</p>
                          </a>
                        </div>
                        <input type="hidden" name="intelligence_1148_0">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-item">
              <input @click="submitData()"  value="注册" class="comm-btn" readonly="true">
            </div>
          </form>
        </div>
      </div>
    </div>
    <div id="footer">
      <p>
        <a target="_blank" href="http://www.shenbd.com/service/storeagreement.html">平台服务协议</a>
        |  <a target="_blank" href="http://www.shenbd.com/service/privacy.html">隐私政策</a>
      </p>
      © 2019福州千盟经贸有限公司 版权所有 <a target="_blank" href="http://beian.miit.gov.cn/?spm=5176.12825654.7y9jhqsfz.110.e9392c4aiY4UJy">闽ICP备17018652号-1</a>
    </div>
  </div>
</template>
<style scoped src="../../assets/seller/css/style2018.css"></style>
<style scoped src="../../assets/seller/css/font/css/font-awesome.min.css"></style>
<style scoped src="./auth.css"></style>
<script>
  import util from 'lib/utils/util';
  import env from "../../config/url";
  import fileUpload from 'lib/utils/fileUpload.js';
  import {mapActions,mapGetters} from 'vuex';
  import * as _ from 'lodash'
  export default {
    name: "auth-register",
    data(){
      return {
        list:[],//第三步已注册情况记录的数据
        register:[],
        registerList:[],
        validData:{
          password:false,//密码输入框校验
          mall_agreement1:false,
          mall_agreement2:false,
          telphone:false,//电话输入框
          captcha:false,//图形验证码
        },
        subData:{
          password:'',//密码输入框校验
          mall_agreement1:'',
          mall_agreement2:'',
          telphone:'',//电话输入框
          captcha:'',//图形验证码
          valid_code:''
        },
        classList : [
          {
            choose:'请选择',
            hover:false,
            showSearch:false,
            categoryName:'',
            showLoad:false,
            categoryList:[],
            type:2,
            curCategory:{
              intelligence:'',
              type:2,
            }
          }
        ],
        btnClick:{
          submitDataBtn:false,
        },
      }
    },
    computed:{
      ...mapGetters({
        metaData:'getMetaData',
        basicStore:'getBasicStore',
        imagePathConfig:'getImagePathConfig',
        ImageIp:'getImageIp',
      }),
    },
    methods:{
      ...mapActions({
        getRegisterStepThree:'getRegisterStepThree',
        getSecondGcListByGcName:'getSecondGcListByGcName',
        getGoodsClassInfo:'getGoodsClassInfoNoLogin',
        uploadFile:'nologinUploadBase64Img',
        registerStepThree:'registerStepThree'
      }),
      changeHover(l){
        let tempClassList = _.clone(this.classList);
        let item = _.clone(tempClassList[l]);
        item.hover = true;
        tempClassList[l]= item;
        this.classList = tempClassList;
      },
      closeHover(l){
          let tempClassList = _.clone(this.classList);
          let item = _.clone(tempClassList[l]);
          item.hover = false;
          tempClassList[l]= item;
          this.classList = tempClassList;
      },
      doRouter(url){
        this.$router.push(url);
      },
      showSearch(item,i){
          this.classList.forEach((res)=>{
              res.showSearch = false
          })
          item.showSearch = !item.showSearch
      },
      hideSearch(e){
        e.stopPropagation();
        var el = e.currentTarget;
        var idx = $(el).attr('idx');
        if(idx != 1){
          this.classList.forEach((res)=>{
            if(res.showSearch){
              res.categoryName = '';
              res.showSearch = false;
              res.categoryList = []
            }
          })
        }
      },
      addCategory(){
        this.classList.forEach((res)=>{
          if(res.showSearch){
            res.hover = false;
            res.categoryName = '';
            res.showSearch = false;
            res.categoryList = []
          }
        })
        this.classList.push(
          {
            choose:'请选择',
            hover:false,
            showSearch:false,
            categoryName:'',
            showLoad:false,
            categoryList:[],
            type:2,
            curCategory:{
              intelligence:'',
              type:2,
            },
          }
        );
      },
      deleteCategory(item,i){
        this.classList.forEach((res)=>{
          if(res.showSearch){
            res.categoryName = '';
            res.showSearch = false;
            res.categoryList = []
          }
        })
        this.classList.splice(i,1);
      },
      searchCategory(item,i){
        item.categoryList = [];
        if(item.categoryName == ''){
          util.msg('请输入搜索关键字');
          return;
        }
        item.showLoad = true;
        var data = {
          gc_name:item.categoryName
        }
        this.getSecondGcListByGcName(data).then((res)=>{
          item.showLoad = false;
          if(res.length <= 0){
            util.msg('没有符合条件的数据');
            return;
          }
          item.categoryList = res;
        })
      },
      choose(list,l,item,i){
        list.choose = item.gc_name_show;
        list.categoryName = '';
        list.showSearch = false;
        list.categoryList = [];
        list.type = 2;
        var data = {
          gc_id:item.gc_id_2
        }
        this.getGoodsClassInfo(data).then((res)=>{
          var newList = _.clone(list);
          newList.curCategory = res
          newList.curCategory.type = 2;
          let tempList = _.clone(this.classList);
          tempList.forEach((tempItem,j)=>{
              if(j==l){
                  tempList[j] = newList;
              }
          })
          this.classList = tempList;
          //console.log(this.classList)
        })
      },
      logoLoad(event,list,item,file,f) {

        var key = this.metaData.key;
        var type = 3;
        var vm = this;
        fileUpload.uploadFileNoLogin(event,key,type,this.uploadFile).then(res => {
          var newFile = _.clone(file);
          newFile.intelligence = vm.ImageIp + res.imgPath;
          item.need_file[f] = newFile;

          var newItem = _.clone(item);
          newItem.need_file[f] = newFile;

          list.curCategory = newItem;
          util.msg('上传成功');
        })
      },

      submitData(){

        var classList = [];
        var typeList = [];
        var intelligenceList = [];
        var data= {

        }
        try{
          this.classList.forEach((list,l)=>{

            if(list.choose == '请选择'){
             throw new Error('请选择经营分类');
            }
            classList.push(list.curCategory.gc_id+'');
            typeList.push(list.type+'');
            if(list.curCategory.need_file){
              list.curCategory.need_file.forEach((res,r)=>{
                data['intelligence_'+list.curCategory.gc_id+'_'+r] = res.intelligence?res.intelligence.replace(this.ImageIp+this.imagePathConfig.Register,''):'';
              })
            }
          })
        }catch(e){
          util.msg('请选择经营分类');
          return;
        }
        data.class=classList,
          data.type=typeList,
          this.btnClick.submitDataBtn = true;
        this.registerStepThree(data).then((res)=>{
          if(res.resultCode == 1){
            //注册完成
            this.$router.push('/register4')
          }else{
            util.msg(res.shortMessage);
            if(res.resultCode == 40007){
              //请重新填写表单,缓存过期
              this.$router.push('/register')
            }
          }
        });
      },
      deleteIntelligence(event,list,item,file,f){
        event.stopPropagation();
        var newItem = _.clone(item);
        newItem.need_file[f].intelligence = '';
        list.curCategory = newItem;

      }
    },
    watch:{
      subData:{
        handler: function () {
        },
        deep: true
      }
    },
    mounted() {
      var _self = this;
      _self.getRegisterStepThree().then((res)=>{
        if(res.register_step3 == '' || res.register_step3 ==null){
          this.$router.push('/login')
        }else{
          _self.list = res;
          _self.registerList = res.register;
          if(res.register.reason_info == '' || res.register.reason_info == null || res.register.reason_info == undefined){
            _self.registerList.reason_info = '';
          }
          let tempClassList = res.registerFile;
          if(tempClassList){
              tempClassList.forEach((tempClass)=>{
                  tempClass.choose = tempClass.gc_name;
                  tempClass.type = tempClass.class_style;
                  tempClass.showSearch = false;
                  tempClass.categoryList = []
                  tempClass.hover = false;
                  tempClass.curCategory.need_file.forEach((file)=>{
                      file.intelligence = ''
                      if(file.file_name){
                          file.intelligence = this.ImageIp+this.imagePathConfig.Register+file.file_name
                      }

                  })
              });
              this.classList = _.clone(tempClassList);
          }

        }

      });
    }
  }
</script>
