<style scoped>
    .ncsc-form-default dt:first-child {
        padding-bottom: 0;
    }
    .push-act-container div{
        display: inline-block;
    }
    .push-act-del {
        vertical-align: top;
    }
    .push-act-del:hover,.push-act-preview:hover {
        cursor: pointer;
    }
    .goods-search{position: relative;}
    .goods-search .search-tip{ position: absolute;left: 0;top: 45px;border: 1px solid #ddd;box-sizing: border-box;background: #fff;z-index: 600;max-height: 200px;overflow-y: auto;}
    .goods-search .list-result{padding: 10px 0;}
    .goods-search .list-result li{line-height: 1.3;padding: 6px 10px;word-break: break-all; font-size: 12px;}
    .goods-search .list-result li:hover{background: #f5f5f5}
    .act-push-photo {
        width: 74px;
        height: 74px;
        float: left;
        border-radius: 50%;
        border: 3px solid #eee;
        overflow: hidden;
    }
    .tip-doubt{display: inline-block;  margin:0 5px;float: left;position: relative}
    .tip-doubt .tip-doubt-con{ display: block;width: 280px;}
    .tip-doubt-img .tip-doubt-con{top:-7px;background: #fff;border:1px solid #ccc;border-radius:5px;}
    .tip-doubt-img .tip-doubt-con:before, .tip-doubt-img .tip-doubt-con:after{content:''; display:block;overflow:hidden;position:absolute;width:0;height:0;font-size:0;border-bottom:6px dashed transparent;border-left:6px dashed transparent;border-top:6px dashed transparent;border-right-style:solid;border-right-width:6px; top: 9px;}
    .tip-doubt-img .tip-doubt-con:before{left:-12px;color:#ccc}
    .tip-doubt-img .tip-doubt-con:after{z-index:2;left:-11px;color:#fff}
    .tip-doubt .tip-doubt-con .act-push-img img{width: 100%;max-height: 80px}
    .act-push-title{font-size: 14px;padding: 5px;font-weight: bold}
    .act-push-cont{font-size: 12px;padding: 5px}
</style>
<template>
    <div @click="search.show=false" class="qm-store-class-base">
        <div class="ncsc-form-default">
            <dl>
                <dt>
                    链接样式:
                    <div>
                        <!--<p  class="el-tooltip lightBlue" aria-describedby="el-tooltip-6481" tabindex="0"><i data-v-c51847de="" aria-hidden="true" class="fa fa-question-circle"></i>示例</p>-->
                        <el-tooltip placement="right-start" effect="light" popper-class="atooltip" >
                            <div slot="content" class="toolTipCont">
                                <img src="@/assets/seller/images/seller/example/banner-hdts.png" alt="">
                            </div>

                            <p class="lightBlue">
                                <i class="fa fa-question-circle" aria-hidden="true"></i>示例
                            </p>
                        </el-tooltip>
                    </div>
                </dt>
                <dd>
                    <ul class="ncsc-form-radio-list">
                        <li>
                            <input type="radio" name="is_show" value="1" id="link_style_1" v-model="subData.link_style">
                            <label for="link_style_1">图文样式</label>
                        </li>
                        <li>
                            <input type="radio" name="is_show" value="2" id="link_style_2" v-model="subData.link_style">
                            <label for="link_style_2">纯文本样式</label>
                        </li>
                        <span><label class="error" v-show="validData.link_style"><i
                                class="fa fa-exclamation-circle"></i>{{validData.link_style}}</label></span>
                    </ul>

                </dd>

            </dl>
            <dl >
                <dt>活动标题:</dt>
                <dd>
                    <input name="name" type="text" class="w300" maxlength="20" v-model="subData.act_title" />
                    <span><label class="error" v-show="validData.act_title"><i class="fa fa-exclamation-circle"></i>{{validData.act_title}}</label></span>
                    <p class="hint">活动标题最多支持输入20字</p>
                </dd>
            </dl>
            <dl v-show="subData.link_style == 2">
                <dt>活动详情:</dt>
                <dd>
                    <textarea style="height: 95px" cols="38" rows="10" maxlength="100" v-model="subData.act_details"></textarea>
                    <span><label class="error" v-show="validData.act_details"><i class="fa fa-exclamation-circle"></i>{{validData.act_details}}</label></span>
                    <p  class="hint">活动详情最多支持输入100个字</p>
                </dd>
            </dl>
            <dl v-show="subData.link_style == 1">
                <dt>活动图片:</dt>
                <dd>
                    <div class="ncsc-form-shop-c1" id="ncsc-upload-thumb">
                        <div class="ncsc-upload-img-item">
                            <div class="ncsc-upload-img-box" v-if="subData.act_pic">
                                <div class="ncsc-upload-avatar" id="imagesname">
                                    <img :src="ImageIp + imagePathConfig.actPush+subData.act_pic">
                                </div>
                                <div class="image-delete" @click="deleteLogo">×</div>
                            </div>
                            <div class="ncsc-upload-btn" v-if="!subData.act_pic">
                                <a href="javascript:void(0);">
                                    <input type="file" class="input-file" data-id="imagesname" id="filename" name="store_label1" @change="logoLoad($event)">
                                    <p><i class="ico-upload"></i>图片上传</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <span><label class="error" v-show="validData.act_pic"><i class="fa fa-exclamation-circle"></i>{{validData.act_pic}}</label></span>
                </dd>
            </dl>
            <dl>
                <dt>跳转链接:</dt>
                <dd>
                    <ul class="ncsc-form-radio-list">
                        <li>
                            <input type="radio"  value="1" id="skip_link_1" v-model="subData.skip_link">
                            <label for="skip_link_1">跳转店铺</label>
                        </li>
                        <li>
                            <input type="radio" value="2" id="skip_link_2" v-model="subData.skip_link">
                            <label for="skip_link_2">跳转到店内商品详情页</label>
                        </li>
                        <li>
                            <input type="radio" value="3" id="skip_link_3" v-model="subData.skip_link">
                            <label for="skip_link_3">跳转到店内组合活动详情页</label>
                        </li>
                        <span><label class="error" v-show="validData.skip_link"><i
                                class="fa fa-exclamation-circle"></i>{{validData.skip_link}}</label></span>
                    </ul>
                    <div v-show="subData.skip_link == 1" class="mt10 c-orange push-act-preview" @click="createView" >点击可生成预览</div>
                </dd>
            </dl>
            <dl v-show="subData.skip_link == 2 || subData.skip_link == 3">
                <dt></dt>
                <dd class="goods-search">
                    <input name="name" type="text" class="w300"  :placeholder="subData.placeholder" @keyup="search.searchParams.pageIndex=0;searchFun();" v-model="subData.goods_name" />
                    <div class="search-tip w300" id="search-tip" v-show="search.show">
                        <ul class="list-result">
                            <li v-for="item in search.searchList" @click="selectName(item)">{{item.goods_name}}</li>
                        </ul>
                    </div>
                    <span><label class="error" v-show="validData.select_name"><i
                            class="fa fa-exclamation-circle"></i>{{validData.select_name}}</label></span>
                    <div class="push-act-container w300 mt10" v-show="subData.select_name">
                        <div class="push-act-name w250 "><p class="c-orange">{{subData.select_name}}</p></div>
                        <div class="push-act-del" @click="delSelectName">×</div>
                    </div>
                    <div class="mt10 c-orange push-act-preview" @click="createView">点击可生成预览</div>
                </dd>
            </dl>
            <div class="bottom">
                <label class="submit-border"><input id="submit_button" @click="submit()" type="button"  value="提交" class="submit"></label>
            </div>
        </div>
        <qm-dialog :dialogVisible="dialogVisible" :width="'450px'" @close="dialogVisible = false">
            <template slot="title">效果预览</template>
            <template slot="content" >
                <div class="dialog_content">
                    <div class="act-push-photo">
                        <img :src="ImageIp + imagePathConfig.storeLabel+basicStore.storeLabel" alt="" width="80" height="80">
                    </div>
                    <div class="tip-doubt tip-doubt-img">
                        <div class="tip-doubt-con" >
                            <div class="act-push-img" v-if="subData.link_style == 1"><img :src="ImageIp + imagePathConfig.actPush+subData.act_pic" alt="活动图" ></div>
                            <div class="act-push-title">{{subData.act_title}}</div>
                            <div class="act-push-cont" v-if="subData.link_style == 2">{{subData.act_details}}</div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </template>
        </qm-dialog>
    </div>

</template>
<script>
  import 'viewerjs/dist/viewer.css'
  import storage from 'lib/utils/storage'
  import {storeGoodsAdd,actPush} from 'api'
  import {mapGetters,mapActions} from 'vuex';
  import fileUpload from 'lib/utils/fileUpload.js';
  import util from 'lib/utils/util';
  import QmDialog from 'component/qm-dialog/index';

  export default {
    name: "act-push-add",
    data() {
      return {
        dialogVisible:false,
        validData: {
          link_style:'',
          act_title:'',
          act_details:'',
          act_pic:'',
          skip_link:'',
          select_name:'',
        },
        search:{
          searchParams:{
            goodsName:'',
            pageIndex:0,
            pageSize:10,
            searchType:1
          },
          searchList:[],
          show:false
        },
        subData: {
          link_style:1,
          act_title:'',
          act_details:'',
          act_pic:'',
          skip_link:1,
          link_id:0,
          goods_name:'',
          placeholder:'请输入组合活动名称',
          select_name:'',
          select_id:0,
          id:0
        },
        select:{
          goods:{
            select_name:'',
            select_id:0
          },
          group:{
            select_name:'',
            select_id:0
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        metaData:'getMetaData',
        ImageIp:'getImageIp',
        imagePathConfig:'getImagePathConfig',
        basicStore:'getBasicStore',
      }),
    },
    components: {
      QmDialog
    },
    methods: {
      createView() {
        if(!this.subData.act_title) {
          util.msg('请先完善活动标题');
          return;
        }
        if(this.subData.link_style == 1) {
          if(!this.subData.act_pic) {
            util.msg('请先上传活动图片');
            return;
          }
        }else{
          if(!this.subData.act_details) {
            util.msg('请先编辑活动详情');
            return;
          }
        }
        this.dialogVisible = true;
      },
      searchFun() {
        let val = this.subData.goods_name.trim();
        if(val) {
          this.search.searchParams.goodsName = val;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(()=> {
            this.searchData();
          },500);
        }else{
          this.search.searchList = [];
          this.search.show = false;
        }
      },
      searchData() {
        storeGoodsAdd.getGoodsList(this.search.searchParams).then(res=>{
          if(this.search.searchParams.pageIndex > 0) {
            this.search.searchList = this.search.searchList.concat(res.list);
          }else{
            this.search.searchList = res.list;
          }
          if(this.search.searchList.length === 0) {
            this.search.show = false;
          }else{
            this.search.show = true;
          }
        })
      },
      logoLoad(event) {
        var key = this.metaData.key;
        var type = 8;
        fileUpload.logoLoad(event,key,type,this.uploadFile).then(res => {
          var imagePath = res.imgPath.replace(this.imagePathConfig.actPush,'');
          this.subData.act_pic = imagePath
        })
      },
      deleteLogo(){
        this.subData.act_pic = "";
      },
      selectName(item) {
        if(this.subData.skip_link == 2) {
          this.select.goods = {
            select_name:item.goods_name,
            select_id:item.goods_commonid
          };
          this.subData.select_name = item.goods_name;
          this.subData.select_id = item.goods_commonid;
        }else if(this.subData.skip_link == 3){
          this.select.group = {
            select_name:item.goods_name,
            select_id:item.goods_commonid
          };
          this.subData.select_name = item.goods_name;
          this.subData.select_id = item.goods_commonid;
        }
        this.subData.goods_name = '';
      },
      delSelectName() {
        if(this.subData.skip_link == 2) {
          this.select.goods = {
            select_name:'',
            select_id:0
          }
        }else if(this.subData.skip_link == 3) {
          this.select.group = {
            select_name:'',
            select_id:0
          }
        }
        this.subData.select_id = 0;
        this.subData.select_name ='';
      },
      submit() {
        let validRes = true;
        this.validData = {
          link_style:'',
            act_title:'',
            act_details:'',
            act_pic:'',
            skip_link:'',
            select_name:'',
        };
        if(!this.subData.act_title) {
            this.validData.act_title = '请填写活动标题';
        }
        if(this.subData.link_style == 1 && !this.subData.act_pic) {
          this.validData.act_pic = '请上传活动图片';
        }
        if(this.subData.link_style == 2 && !this.subData.act_details) {
          this.validData.act_details = '请填写活动详情';
        }
        if(!this.subData.skip_link) {
          this.validData.skip_link = '请选择跳转链接类型';
        }
        if(!this.subData.select_name) {
          if(this.subData.skip_link == 2) {
            this.validData.select_name = '请选择跳转的商品';
          }else if(this.subData.skip_link == 3){
            this.validData.select_name = '请选择跳转的组合活动';
          }
        }
        Object.values(this.validData).forEach((item,i) => {
          if(item != ''){
            validRes = false
          }
        })
        if(validRes) {
          actPush.actPushEdit(this.subData).then(res=>{
            util.msg(res.shortMessage);
            if(res.resultCode === 1) {
              this.$router.push('/promotion/act_push/index')
            }
          });
        }
      }
    },
    watch: {
      'subData.skip_link':{
        handler(val) {
          this.validData.select_name = '';
          this.subData.select_name = '';
          this.subData.select_id = 0;
          if(val == 2) {
            this.subData.placeholder = '请输入商品名称或条形码';
            if(this.select.goods.select_name && this.select.goods.select_id) {
              this.subData.select_name = this.select.goods.select_name;
              this.subData.select_id = this.select.goods.select_id;
            }
            this.search.searchParams.searchType = 1;
          }else if(val == 3) {
            this.subData.placeholder = '请输入组合活动名称';
            if(this.select.group.select_name && this.select.group.select_id) {
              this.subData.select_name = this.select.group.select_name;
              this.subData.select_id = this.select.group.select_id;
            }
            this.search.searchParams.searchType = 2;
          }
          this.subData.goods_name = '';
        },
        deep:true
      },
    },
    mounted() {
      this.subData.id = storage.get('id')
      if(this.subData.id > 0) {
        actPush.getActPush({id:this.subData.id}).then(res=>{
          this.subData = {
            ...this.subData,
            ...res
          }
          if(res.skip_link == 2) {
            this.select.goods = {
              select_id:this.subData.select_id,
              select_name:this.subData.select_name,
            }
          }else if(res.skip_link == 3) {
            this.select.group = {
              select_id:this.subData.select_id,
              select_name:this.subData.select_name,
            }
          }
        })
      }
      var _self = this;
      layui.use('layer', function () {
        this.layer = layui.layer;
      });
      layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
          elem: '#start_time',
          type: 'datetime',
          format: 'yyyy-MM-dd HH:mm',
          theme: "#ff8519",
          done: function (value) {
            _self.validData.startTimeErrContent = ''
            _self.subData.start_time = value
          }
        });
        laydate.render({
          elem: '#end_time',
          theme: "#ff8519",
          type: 'datetime',
          format: 'yyyy-MM-dd HH:mm',
          done: function (data) {
            _self.validData.endTimeErrContent = ''
            _self.subData.end_time = data
          }
        });

      })
      if (this.subData.id == 0 && this.subData.type == 0) {
        this.type = 1;
      }
    },
    updated() {
    }
  }
</script>
