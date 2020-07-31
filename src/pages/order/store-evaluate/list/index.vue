<style scoped>
  .img {
    display: inline-block;
    margin: 10px 10px 10px 0;
  }
  .ncsc-table .explain {
    background: #eee;
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
    position: relative;
    margin-top: 10px;
    word-break: break-all;
    max-width: 300px;
    box-sizing: border-box;
  }
  .ncsc-table td {
    border-bottom: 1px solid #eee;
    padding: 20px 10px;
  }
  .ncsc-table .qrcode-box {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    position: relative;
  }
  .ncsc-table .icon-qrcode {
    color: #757575;
  }
  .ncsc-table .qrcode-in {
    background: #fff;
    display: none;
    width: 190px;
    padding: 10px 5px;
    border: solid 1px #ddd;
    position: absolute;
    z-index: 99;
    top: 50%;
    margin-top: -100px;
    left: 25px;
    text-align: center;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .ncsc-table .qrcode-in p {
    line-height: 0;
    width: 160px;
    height: 160px;
    overflow: hidden;
    margin: 5px auto 0;
  }
  .qrcode-in:before{left:-16px;color:#bbb}
  .qrcode-in:after{z-index:2;left:-15px;color:#fff}
  .qrcode-box.active .qrcode-in{ display: block;}
  .ncsc-table .qrcode-box:hover .qrcode-in {
    display: block;
  }
  textarea, .textarea{
    padding:5px 10px;
  }
  .eject_con .bottom {
    text-align: right;
    margin: 20px -10px 0;
  }

  .bottom .ncsc-btn {
    margin: 0 10px;
    min-width: 90px;
  }
  .bottom .ncsc-btn:hover {
    background: rgb(239, 133, 1);
    color:white;
  }
  .js-tips-img img {
    display: inline-block;
    margin: 10px 10px 10px 0;
  }
  .fa-qrcode{
    color: #757575;
    font-size: 1.2em;
  }
</style>
<template>
  <div class="qm-store-class-base">
    <ul class="comm-tab mb20 mt20" id="storage_c_type">
      <li v-for="(item,key) in switchTypes" :class="pageParams.evaluate_type == key ? 'active':''" @click="switchType(key)">{{item}}</li>
    </ul>
    <div class="search-form">
      <span class="ncsc-form-tit">商品名称：</span>
      <input type="text" class="w200 mr5" name="goods_name" v-model="pageParams.goods_name">
      <span class="ncsc-form-tit">评价人：</span>
      <input type="text" class="w150 mr5" name="member_name" autocomplete="off" v-model="pageParams.member_name">
      <input type="submit" class="ncsc-btn" value="搜索" @click="search()">
    </div>
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="ncsc-table mt20">
          <thead>
          <tr>
            <th class="w100">评价</th>
            <th>评论内容 / 回复</th>
            <th class="w100">评价人</th>
            <th class="w150">商品信息</th>
            <th class="w100">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in goods_evaluate_list">
            <td><star :raty="item.geval_scores"></star></td>
            <td>
              <p>评价内容：{{item.geval_content}}</p>
                  <img v-for="src in item.geval_image" :src="src" :key="src"  width="50" height="50" @click="showDialog(src)" class="img">
              <p class="c-gray fs12">{{item.geval_addtime}}</p>
              <p class="explain" v-if="item.geval_explain">商家：{{item.geval_explain}}</p>
            </td>
            <td>{{item.geval_frommembername}}</td>
            <td><div class="qrcode-box mr5"  ><i class="fa fa-qrcode"></i><div class="qrcode-in">打开 我的身边店APP 扫一扫<p :id="'qr_'+item.geval_id"></p></div></div><a @click="openGoods(item.geval_goods_commonid)">{{item.geval_goodsname}}</a></td>
            <td class="handle">
              <p>
                <a nctype="btn_show_explain_dialog"  @click="showReply(item)" href="javascript:;" class="ncsc-btn">
                  回复
                </a>
              </p>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </qm-table>
    <qm-dialog :dialogVisible="dialogVisible" :width="'550px'" @close="dialogVisible = false">
      <template slot="title">回复评价</template>
      <template slot="content" >
        <div class="dialog_content">
          <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">

            <div>
              <dl>
                <dt>评价内容：</dt>
                <dd>{{gevalContent}}</dd>
              </dl>
              <dl>
                <dt>回复模板：</dt>
                <dd>
                  <select class="selector w300 valid" @change="selectTemp($event)">
                  <option value="" selected>请选择</option>
                  <option @select="showTemplate()" v-for="(temp,i) in templates_list" :value="temp.evaluate_templates_name">{{temp.evaluate_templates_title}}</option>
                </select>
                </dd>
              </dl>
              <dl>
                <dt><i class="required">*</i>回复内容：</dt>
                <dd>
                  <textarea  name="geval_explain" cols="30" rows="3" class="w300" v-model="selectReply"></textarea>
                  <div id="warning" style="display: none;"></div>
                </dd>
              </dl>
            </div>
            <div class="bottom">
              <input type="button" id="submit" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="explainSave">
              <div class="clear"></div>
            </div>
        </div>
        </div>
      </template>
    </qm-dialog>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
    <qm-dialog-img :imageUrl="imgSrc" :imageDialog="showImg" @close="showImg=false">
    </qm-dialog-img>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css';
  import {mapGetters,mapActions} from 'vuex';
  import QmPagination from 'component/qm-pagination/index';
  import QmDialog from 'component/qm-dialog/index';
  import QmTable from 'component/qm-table/index';
  import QmDialogImg from "component/qm-dialog-img/index";
  import star from 'component/star';
  import util from 'lib/utils/util';
  import QRCode from 'qrcodejs2';
  import {storeEvaluate} from 'api';
  import consts from 'config/consts';
  import $ from 'jquery';
  export default {
    name: "store-evaluate-list",

    data() {
      return {
        bodyListener:'',
        switchTypes:{
          0:'全部',
          1:'好评',
          2:'中评',
          3:'差评'
        },
        pageParams:{
          goods_name:'',
          member_name:'',
          evaluate_type:0,
          pageIndex:0,
          pageSize:10,
          total:0
        },
        goods_evaluate_list:[],
        templates_list:[],
        dialogVisible:false,
        gevalId:0,
        gevalContent:'',
        selectReply:'',
        viewerOptions: {
          toolbar: false,
          navbar:false,
          fullscreen:false
        },
        imgSrc:"",
        showImg:false
      }
    },

    computed:{

    },

    components:{
      QmPagination,
      star,
      QmDialog,
      QmTable,
      QmDialogImg
    },

    methods: {
      openGoods(goodsCommonId){
        let routeData = this.$router.resolve({
          name:"store_goods_add_step_two",
          params:{commonId:goodsCommonId}
        });
        window.open(routeData.href, '_blank');
      },
      showDialog(img){
      this.imgSrc=img
      this.showImg=true
      },
      getPageData(data){
        storeEvaluate.evaluateList(data).then((res)=>{
           this.goods_evaluate_list = [];
          this.goods_evaluate_list = res.goods_evaluate_list.list;
          this.templates_list = res.templates_list.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.goods_evaluate_list.total;
          this.pageParams = newPageParams;
          $('.qrcode-in p').text('');
          setTimeout(()=>{
              this.updateQrcde();
          },1000)
        })
      },
      switchType(key){
        this.pageParams.evaluate_type = key
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
      qrcode (key,text) {
        if($('#qr_'+key).length >0) {
          let qrCode =   new QRCode('qr_'+key,{
            width: 160, // 设置宽度，单位像素
            height: 160, // 设置高度，单位像素
            text: text // 设置二维码内容或跳转地址
          })
          qrCode.clear();
          return qrCode.makeCode(text);
        }
      },
      showReply(item){
        this.gevalId = item.geval_id
        this.gevalContent = item.geval_content
        this.dialogVisible = true;
      },
      selectTemp(e){
        var el = e.currentTarget;
        $(el).blur();
        this.selectReply = e.target.value
      },
      explainSave(){
        if(this.selectReply === ''){
          layer.msg('回复内容不能为空');
          return;
        }
        var data = {
          geval_id:this.gevalId,
          geval_explain:this.selectReply
        }
        storeEvaluate.explainSave(data).then((res)=>{
          if('fail' != res.status){
            this.dialogVisible = false
            this.getPageData(this.pageParams);
          }
        })
      },
      updateQrcde(){
          var temp_evaluate_list = _.clone(this.goods_evaluate_list)
          for(const key in temp_evaluate_list){
              this.qrcode(temp_evaluate_list[key].geval_id,consts.SHARE_URL+'?type=goods&cid='+temp_evaluate_list[key].geval_goods_commonid+'&gid=0&sid='+temp_evaluate_list[key].geval_storeid)
          }
      }
    },
    watch:{

    },
    mounted () {
      var _self = this;
      _self.getPageData(_self.pageParams);
      layui.use('layer', function(){
        _self.layer = layui.layer;
      });
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.dialogVisible){
            //回复评价弹窗
            _self.explainSave();
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
    }
  }
</script>
