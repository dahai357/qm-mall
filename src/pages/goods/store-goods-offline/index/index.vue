<style scoped>
  .ncsc-table td {
    border-bottom: 1px solid #eee;
    padding: 20px 10px;
  }
  .ncsc-table .qrcode-box {
    display: inline-block;
    line-height: 1;
    position: relative;
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
  .info-box {
    display: table;
  }
  .info-box .pic {
    padding-right: 15px;
    position: relative;
    display: table-cell;
    vertical-align: top;
  }
  .info-box .detail {
    display: table-cell;
    vertical-align: top;
    word-break: break-all;
  }
  .ncsc-form-tit{
    margin-left: 0;
  }
  .sort {
    display: inline-block;
    position: relative;
    padding-right: 15px;
  }
  .sort .ico-top {
    margin-top: -6px;
  }
  .sort.sort-up, .sort.sort-down {
    color: #ff8519;
  }
  .sort .ico-top, .sort .ico-bottom {
    width: 10px;
    height: 5px;
    position: absolute;
    right: 0;
    top: 50%;
    background: url(../../../../../static/seller/images/seller/ncsc_bg_img.png) -165px -490px no-repeat;
  }
  .sort .ico-bottom {
    margin-top: 1px;
    background-position: -165px -500px;
  }
  .sort.sort-up .ico-top {
    background-position: -180px -490px;
  }
  .sort.sort-down .ico-bottom {
    background-position: -180px -500px;
  }
  .ncsc-table td{
    word-break:break-all;
    word-wrap:break-word;
    white-space:pre-wrap;
  }

  .eject_con.explain_form{
    padding: 30px 30px 30px 30px;
  }
  .list-category2 li{ font-size: 12px;position: relative; box-sizing: border-box;padding: 0 10px; }
  .list-category2 li:first-child{ border:none;}
  .list-category2 li:hover{ cursor: pointer; background:#f5f5f5;}
  .list-category2 .btn-del{ display: block; height: 20px; line-height: 20px; width: 20px; text-align: center; font-family: SimSun; color:#333; position: absolute; top: 50%; margin-top: -10px; right: 10px;}
  .list-category2 .btn-del:hover{text-decoration: none; color: #ff8519;}
  .list-category-used{max-height: 150px}
  .list-category-used li{ line-height: 29px; border-top:1px dotted #ddd;}

  .category-used{ display: inline-block; vertical-align: middle; position: relative; font-size:12px; width: 250px;}
  .category-used .category-tit{ border:1px solid #ddd; color:#757575; line-height: 30px;height:30px; box-sizing: border-box;border-radius:5px;     padding: 0 10px; }
  .category-used .category-tit i{ color:#757575; position: absolute; right: 10px; top: 7px;}
  .pop-category-used{ position: absolute; left: 0; width: 100%; box-sizing: border-box; top: 30px; border:1px solid #ddd; z-index:
    500; background: #fff;  max-height: 302px; overflow-y: auto;}
  .category-used:hover{ cursor: pointer;}
  .category-used.active .category-tit{ color:#333;border-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius: 0;}
  .category-used.active .category-tit i{ color:#333}
  .modify_category{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
    line-height: 30px;
    height: 30px;
  }
  .modify_category:hover{
    color: white;
  }
</style>
<template>
  <div class="qm-store-class-base">
    <div class="search-form mb20">
      <p class="c-gray mb10 mt20">条形码可手动输入，也可以使用巴枪扫码输入</p>
      <p class="c-gray mb10">分类被平台下架，该分类的商品无法再上架</p>
      <qm-class :gcId1.sync="tempParams.gcId1" :gcId2.sync="tempParams.gcId2" :gcId3.sync="tempParams.gcId3" ref="goodsClass"></qm-class>
      <qm-goods-search-input v-model="tempParams.keyword" :searchType.sync="tempParams.searchType"></qm-goods-search-input>
      <input  type="submit" class="ncsc-btn" value="搜索" @click="search">
    </div>
    <div class="operate-bar mt20" v-if="!!pageParams.total">
      <label for="all1" class="mr10"><input id="all1"  v-model="checkAllState" type="checkbox" class="checkall" @click="checkall">本页全选</label>
      <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openDelDialog(1)">删除</a>
      <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openShowDialog(1)">上架</a>
      <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openPriceDialog">修改价格</a>
      <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openStorageDialog">修改库存</a>
      <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openClassDialog">修改商品分类</a>
    </div>
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="ncsc-table mt20">
          <thead>
          <tr>
            <th class="w15"></th>
            <th>
              <a href="javascript:;" :class="[pageParams.sortType == 'goodsName'&& pageParams.sort==0? 'sort-up' : '',pageParams.sortType == 'goodsName'&& pageParams.sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsName')">
                商品名称
                <i class="ico-top"></i><i class="ico-bottom"></i></a>
            </th>
            <th class="w90">
              <a href="javascript:;" :class="[pageParams.sortType == 'goodsMarketprice'&& pageParams.sort==0? 'sort-up' : '',pageParams.sortType == 'goodsMarketprice'&& pageParams.sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsMarketprice')">
                原价
                <i class="ico-top"></i><i class="ico-bottom"></i></a>
            </th>
            <th class="w90">
              <a href="javascript:;" :class="[pageParams.sortType == 'goodsPrice'&& pageParams.sort==0? 'sort-up' : '',pageParams.sortType == 'goodsPrice'&& pageParams.sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsPrice')">
                售价
                <i class="ico-top"></i><i class="ico-bottom"></i></a>
            </th>
            <th class="w80">
              <a href="javascript:;" :class="[pageParams.sortType == 'goodsDiscount'&& pageParams.sort==0? 'sort-up' : '',pageParams.sortType == 'goodsDiscount'&& pageParams.sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsDiscount')">
                折扣
                <i class="ico-top"></i><i class="ico-bottom"></i></a>
            </th>
            <th class="w70">
              <a href="javascript:;" :class="[pageParams.sortType == 'goodsStorage'&& pageParams.sort==0? 'sort-up' : '',pageParams.sortType == 'goodsStorage'&& pageParams.sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsStorage')">
                库存
                <i class="ico-top"></i><i class="ico-bottom"></i></a>
            </th>
            <th class="w70">
              <!--th class="w70" v-for="item in sortArr"-->
              <a href="javascript:;" :class="[pageParams.sortType == 'goodsSalenum'&& pageParams.sort==0? 'sort-up' : '',pageParams.sortType == 'goodsSalenum'&& pageParams.sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsSalenum')">
                销量
                <i class="ico-top"></i><i class="ico-bottom"></i></a>
              <!--a href="javascript:;" :class="[pageParams.sort == (item.value-1)*2+1 ? 'sort-up' : '',pageParams.sort == (item.value-1)*2+2 ? 'sort-down' : '','sort js-sort']" @click="changeSort(item.value)">{{item.text}}<i class="ico-top"></i><i class="ico-bottom"></i></a-->
            </th>
            <th class="w130">
              <a href="javascript:;" :class="[pageParams.sortType == 'gcName'&& pageParams.sort==0? 'sort-up' : '',pageParams.sortType == 'gcName'&& pageParams.sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('gcName')">
                分类
                <i class="ico-top"></i><i class="ico-bottom"></i></a>
            </th>
            <th class="w100">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in warn_list" :key="item.goods_commonid">
            <td><input type="checkbox" class="checkitem" :value="item.goods_commonid"  v-model="checkState"  /></td>
            <td>
              <div class="info-box">
                <div class="pic">
                  <img :src="item.goods_image" width="90" height="90" />
                </div>
                <div class="detail">
                  <p><a href="javascript:;" @click="$router.push({name:'store_goods_add_step_two',params:{commonId:item.goods_commonid}})">{{item.goods_name}}</a></p>
                  <!--<p class="fs12 c-gray mt5" v-if="item.goods_jingle">{{item.goods_jingle}}</p>-->
                  <div class="">
                   <div class="icons mb5" v-if="item.goods_commend || item.goods_new">
                     <p v-if="item.goods_commend" class="tag orange" title="店铺推荐商品">推荐</p>
                     <p v-if="item.goods_new" class="tag blue" title="新品">新品</p>
                   </div>
                    <div class="qrcode-box mr5"  ><i class="fa fa-qrcode fs18"></i><div class="qrcode-in">打开 我的身边店APP 扫一扫<p :id="'qr_'+item.goods_commonid"></p></div></div>
                    <i class="icon-import" v-if="item.source == 10"></i>
                  </div>
                </div>
              </div>
            </td>
            <td class="ws-nw" :class="(item.today_putaway_date == null && item.source == 10) ? 'c-red':''">
              <p>{{item.market_price_range}}</p>
            </td>
            <td class="ws-nw":class="(item.today_putaway_date == null && item.source == 10) ? 'c-red':''">
              <p>{{item.goods_price_range}}</p>
            </td>
            <td :class="(item.today_putaway_date == null && item.source == 10) ? 'c-red':''">{{item.discount_range}}</td>
            <td :class="(item.today_putaway_date == null && item.source == 10) ? 'c-red':''">{{item.goods_storage}}件</td>
            <td>{{item.sale_num}}件</td>
            <td class="c-gray">{{item.gc_name}}</td>
            <td class="handle">
              <p><a  href="javascript:;" class="ncsc-btn" @click="$router.push({name:'store_goods_add_step_two',params:{commonId:item.goods_commonid}})">编辑</a></p>
              <p><a href="javascript:;" class="ncsc-btn" @click="openShowDialog(0,item)">上架</a></p>
              <p><a   href="javascript:;" class="ncsc-btn" @click="openDelDialog(0,item)">删除</a></p>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </qm-table>
    <div class="operate-bar mt20" v-if="!!pageParams.total">
      <label for="all2" class="mr10"><input id="all2"  v-model="checkAllState" type="checkbox" class="checkall" @click="checkall">本页全选</label>
      <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openDelDialog(1)">删除</a>
      <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openShowDialog(1)">上架</a>
    </div>
    <qm-tips :tipsVisible.sync="delDialog" :width="'420px'"  @close="delDialog = false" @confirm="confirmDel()">
      <template slot="title">提示信息</template>
      <template slot="content">您确定要删除吗?</template>
    </qm-tips>
    <qm-dialog :dialogVisible="storageDialog" :width="'450px'" @close="storageDialog = false;storage_num='';" :customClass="'phone-bind'">
      <template slot="title">批量修改库存</template>
      <template slot="content" >
        <div class="dialog_content">
          <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
            <div class="ncsc-form-s" >
              <dl>
                <dt>修改类型：</dt>
                <dd>
                  <div class="ncsc-form-custom-radio-group">
                    <div :class="[storage_type == 2 ? 'checked':'','ncsc-form-custom-radio']">
                      <div class="ncsc-custom-radio-frame">
                        <input type="radio" name="type" value="2" id="goods_new_1" class="ncsc-custom-radio" v-model="storage_type">
                      </div>
                      <label for="goods_new_1" class="ncsc-custom-txt">
                        <span class="name">修改到统一库存</span>
                      </label>
                    </div>
                    <div :class="[storage_type == 1 ? 'checked':'','ncsc-form-custom-radio']">
                      <div class="ncsc-custom-radio-frame">
                        <input type="radio" name="type" value="1" id="goods_new_2" class="ncsc-custom-radio" v-model="storage_type">
                      </div>
                      <label for="goods_new_2" class="ncsc-custom-txt">
                        <span class="name">增补库存</span>
                      </label>
                    </div>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt>{{storage_type == 2 ? '修改数量' : '增补库存'}}：</dt>
                <dd><input  type="text" class="ncsc-form-control" v-model="storage_num" @keyup="onlyInteage($event,'storage_num')" ></dd>
              </dl>
              <p class="c-gray mt10">提示：多规格商品为修改每个规格的库存数量</p>
            </div>
            <div class="bottom">
              <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="confirmStorageDialog">
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </template>
    </qm-dialog>
    <qm-dialog :dialogVisible="priceDialog" :width="'450px'" @close="priceDialog = false;discount=''" :customClass="'phone-bind'">
      <template slot="title">批量修改价格</template>
      <template slot="content" >
        <div class="dialog_content">
          <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
            <div class="ncsc-form-s" >
              <dl>
                <dt style="width: 8em">批量设置折扣：</dt>
                <dd><input type="number" :min='0' class="ncsc-form-control" v-model="discount" @keyup="onlyDiscount($event,'discount')" >%</dd>
              </dl>
            </div>
            <div class="bottom">
              <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="confirmPriceDialog">
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </template>
    </qm-dialog>
    <qm-dialog :dialogVisible="classDialog" :width="'450px'" @close="closeClassDialog" :customClass="'transparent'">
      <template slot="title">批量修改分类</template>
      <template slot="content" >
        <div class="dialog_content">
          <div class="eject_con explain_form">
            <div class="ncsc-form-s" >
              <dl>
                <dt>所属分类：</dt>
                <dd>
                  <div :class="[showMoreClass?'active':'','category-used']" class="fl"  id="category_used" >
                    <input :readonly="modifyClassReadOnly" class="category-tit w250" maxlength="10" v-model.trim="searchClassName" placeholder="请输入分类名称进行搜索，例如：图书" type="text" @input="searchClass($event)"/>
                    <i @click="clearClassSearch" v-show="searchClassName != ''" class="fa fa-times-circle" style="position: absolute;right: 7px;top: 12px;"></i>
                    <div class="pop-category-used" id="pop_category_used" v-show="showMoreClass">
                      <ul class="list-category2 list-category-used">
                        <li v-for="(item,i) in searchClassList" @click="selectClass(item)"><p class="text">{{item.f_gc_name + (item.goods_class_t_id ? '(自定义分类)' : '')}}</p></li>
                      </ul>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
            <div class="bottom">
              <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="confirmChangeClass">
              <div class="clear"></div>
            </div>
          </div>
          <div class="virtual"></div>
        </div>
      </template>
    </qm-dialog>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
    <qm-tips :tipsVisible.sync="showDialog" :width="'420px'"  @close="showDialog = false" @confirm="goodsShow()">
      <template slot="title">提示信息</template>
      <template slot="content">
        您确定要上架商品吗?
        <p class="c-gray">上架后商品将对外销售</p>
      </template>
    </qm-tips>
  </div>
</template>

<script>
  import util from 'lib/utils/util';
  import 'viewerjs/dist/viewer.css';
  import {mapActions} from 'vuex';
  import QmClass from 'component/qm-class';
  import QmGoodsSearchInput from 'component/qm-goods-search-input';
  import QmPagination from 'component/qm-pagination/index';
  import QmDialog from 'component/qm-dialog/index';
  import QmTable from 'component/qm-table/index';
  import QRCode from 'qrcodejs2';
  import {storeGoodsOnline,storeGoodsOffline} from 'api';
  import consts from 'config/consts';
  import QmTips from 'component/qm-tips/index';
  import mixin from 'component/main/mixin';
  export default {
    name: "store-goods-offline-index",
    mixins:[mixin],
    data() {
      return {
        showDialog:false,
        showDialogType:0,
        sortArr:[
          {
            value:2,
            text:'库存'
          },
          {
            value:1,
            text:'销量'
          }
        ],
        delDialog:false,
        delDialogType:0,
        priceDialog:false,
        storageDialog:false,
        storage_type:2,
        default_storage_alarm: 0,
        storage_num:'',
        discount:'',
        pageParams:{
          pageIndex:0,
          pageSize:20,
          total:0,
          gcId1: 0,
          gcId2: 0,
          gcId3: '0',
          keyword:'',
          searchType:0,
          sort:0,
          sortType:''
        },
        tempParams:{//临时参数，点击搜索后赋给pageParams
          gcId1: 0,
          gcId2: 0,
          gcId3: '0',
          keyword:'',
          searchType:0
        },
        warn_list: [],
        checkState: [],
        checkAllState : false,
        dialogVisible: false,
        dialogType: 1,
        storage: '',
        goods: {
          goodsCommonId: 0
        },
        classDialog:false,
        showMoreClass:false,
        searchClassName:'',
        searchClassList:[],
        selectClassInfo:{
          gc_id:0,
          is_system:0,
          gc_name:""
        },
        modifyClassReadOnly:false
      }
    },

    computed:{

    },

    components:{
      QmPagination,
      QmDialog,
      QmTable,
      QmGoodsSearchInput,
      QmClass,
      QmTips
    },

    methods: {
      ...mapActions('inventoryWarning',{
          isInventoryWarning:'isInventoryWarning'
      }),
      openShowDialog(type,item) {
        let commonId;
        if(type === 1) {
          if(this.checkState.length === 0) {
            util.msg('请选择需要上架的商品');
            return;
          }
          commonId = this.checkState.join(',');
        }else{
          this.goods.goodsCommonId = item.goods_commonid;
          commonId = this.goods.goodsCommonId;
        }
        this.showDialogType = type;
        this.showDialog = true;
      },
      async goodsShow() {
        let res;
        if(this.showDialogType === 1) {//批量上架
          res = await storeGoodsOffline.goodsShow({commonIds:this.checkState.join(',')})
        }else{
          res = await storeGoodsOffline.goodsShow({commonIds:this.goods.goodsCommonId})
        }
        if(res.resultCode === 1) {
          util.msg('商品上架成功');
          this.showDialog = false;
          var newPageParams = _.clone(this.pageParams);
          if(this.showDialogType === 1) {
            newPageParams.total = newPageParams.total - this.checkState.length;
          }else{
            newPageParams.total = newPageParams.total - 1;
          }
          this.pageParams = newPageParams;
          this.getPageData(this.pageParams);
        }else{
          util.msg(res.longMessage);
          if(res.resultCode === 2013) {//刷新页面
            this.getPageData(this.pageParams);
          }
        }
      },
      clearClassSearch(){
        this.searchClassName = ''
        this.selectClassInfo.gc_id = 0
        this.showMoreClass = false
        this.modifyClassReadOnly = false
      },
      confirmChangeClass(){
        if(this.selectClassInfo.gc_id == 0){
          layer.msg('请选择商品所属分类')
          return
        }
        let data = {commonIds:this.checkState.join(','),...this.selectClassInfo}
        storeGoodsOnline.modifyGoodsClass(data).then(res=> {
          this.searchClassName = ''
          this.showMoreClass = false
          this.classDialog = false
          util.msg(res.shortMessage);
          if(res.resultCode == 1){
            this.getPageData(this.pageParams)
          }
        })
      },
      selectClass(item){
        this.selectClassInfo.gc_id = item.gc_id
        this.selectClassInfo.is_system = item.is_system
        this.selectClassInfo.gc_name = item.f_gc_name
        this.searchClassName = item.f_gc_name + (item.goods_class_t_id ? '(自定义分类)' : '')
        this.showMoreClass = false
        this.modifyClassReadOnly = true
      },
      searchClass(e){
        this.showMoreClass = false
        if(this.searchClassName != ''){
          let data ={
            'keyword' : this.searchClassName
          }
          storeGoodsOnline.getThirdClassList(data).then(res=> {
            if(res.list && res.list.length > 0){
              this.searchClassList = res.list
              this.showMoreClass = true
            }
          })
        }
      },
      openClassDialog() {
        this.showMoreClass = false
        if(this.checkState.length === 0) {
          util.msg('请选择需要修改分类的商品');
          return;
        }
        this.clearClassSearch();
        this.classDialog = true;
      },
      closeClassDialog(){
        this.searchClassName = ''
        this.classDialog = false
      },
      openPriceDialog() {
        if(this.checkState.length === 0) {
          util.msg('请选择需要修改价格的商品');
          return;
        }
        this.priceDialog = true;
      },
      openStorageDialog() {
        if(this.checkState.length === 0) {
          util.msg('请选择需要修改价库存商品');
          return;
        }
        this.storageDialog = true;
      },
      confirmPriceDialog() {
        if(this.discount === '') {
          util.msg('请输入设置的折扣百分比');
          return;
        }
        var r = /^([1-9]([0-9])?|100|0)$/;
        if(!r.test(this.discount)) {
          util.msg('折扣值需为0-100的整数');
          return;
        }
        storeGoodsOnline.modifyPrice({commonIds:this.checkState.join(','),discount:this.discount}).then(res=> {
          util.msg(res.shortMessage);
          if(res.resultCode === 1  || res.resultCode === 2023) {
            this.discount = '';
            this.priceDialog = false;
            this.getPageData(this.pageParams);
          }
        })
      },
      confirmStorageDialog() {
        if(this.storage_num === '') {
          util.msg('请输入修改数量')
          return;
        }
        storeGoodsOnline.modifyStorage({commonIds:this.checkState.join(','),storage:this.storage_num,type:this.storage_type}).then(res=> {
          util.msg(res.shortMessage);
          if(res.resultCode === 1) {
            this.storageDialog = false;
            this.storage_num = '';
            this.storage_type = 2;
            this.getPageData(this.pageParams);
          }
        })
      },
      changeSort(sortType) {
        if(this.pageParams.sortType==sortType){
          if(this.pageParams.sort==0){
            this.pageParams.sort=1;
          }else{
            this.pageParams.sort=0;
          }
        }else{
          this.pageParams.sort=0;
        }
        this.pageParams.sortType=sortType;
       /* if(this.pageParams.sort ==  (sortType-1)*2+1) {
          this.pageParams.sort += 1;
        }else if(this.pageParams.sort ==  (sortType-1)*2+2){
          this.pageParams.sort = 0;
        }else{
          this.pageParams.sort = (sortType-1)*2+1;
        }*/
        this.pageParams.pageIndex = 0;
        this.getPageData(this.pageParams);
      },
      // async goodsShow(type,item) {
      //   let res;
      //   if(type === 1) {//批量上架
      //     if(this.checkState.length === 0) {
      //       util.msg('请选择需要上架的商品');
      //       return;
      //     }
      //     res = await storeGoodsOffline.goodsShow({commonIds:this.checkState.join(',')})
      //   }else{
      //     res = await storeGoodsOffline.goodsShow({commonIds:item.goods_commonid})
      //   }
      //   if(res.resultCode === 1) {
      //     util.msg('商品上架成功');
      //     this.delDialog = false;
      //     var newPageParams = _.clone(this.pageParams);
      //     if(type === 1) {
      //       newPageParams.total = newPageParams.total - this.checkState.length;
      //     }else{
      //       newPageParams.total = newPageParams.total - 1;
      //     }
      //     this.pageParams = newPageParams;
      //     this.getPageData(this.pageParams);
      //   }else{
      //     util.msg(res.longMessage);
      //     if(res.resultCode === 2013) {//刷新页面
      //       this.getPageData(this.pageParams);
      //     }
      //   }
      // },
      openDelDialog(type,item) {
        if(type === 1) {
          if(this.checkState.length === 0) {
            util.msg('请选择需要删除的商品');
            return;
          }
        }else{
          this.goods.goodsCommonId = item.goods_commonid;
        }
        this.delDialog = true;
        this.delDialogType = type;
      },
      async confirmDel() {
        let res;
        if(this.delDialogType === 1) {//批量删除
          res = await storeGoodsOnline.dropGoods({commonId:this.checkState.join(',')})
        }else{
          res = await storeGoodsOnline.dropGoods({commonId:this.goods.goodsCommonId})
        }
        if(res.resultCode === 1) {
          util.msg('商品删除成功');
          this.delDialog = false;
          var newPageParams = _.clone(this.pageParams);
          if(this.delDialogType === 1) {
            newPageParams.total = newPageParams.total - this.checkState.length;
          }else{
            newPageParams.total = newPageParams.total - 1;
          }
          this.pageParams = newPageParams;
          this.getPageData(this.pageParams);
        }else{
          util.msg(res.longMessage);
        }
      },
      search() {
        this.pageParams = {
          ...this.pageParams,
          ...this.tempParams
        };
        this.pageParams.pageIndex = 0;//页码置0
        this.getPageData(this.pageParams);
      },
      checkall(e) {
        this.checkState = [];
        if(e.target.checked === true) {//批量全选
          for(let item of this.warn_list) {
            this.checkState.push(item.goods_commonid);
          }
        }
      },
      closeDialog(){
        this.$store.commit('setAlarmDialog',false)
      },
      beforeGetPage() {
        let maxPage = Math.ceil(this.pageParams.total/this.pageParams.pageSize);
        let maxIndex = maxPage >= 1 ? maxPage - 1 : maxPage;
        if(this.pageParams.pageIndex > maxIndex) {
          var newPageParams = _.clone(this.pageParams);
          newPageParams.pageIndex = maxIndex;
          this.pageParams = newPageParams;
        }
      },
      getPageData(data){
        this.beforeGetPage();
        storeGoodsOffline.getOfflineGoodsList(this.pageParams).then((res)=>{
          this.warn_list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
          //取消复选框的选中
          this.checkState = [];
          this.checkAllState = false;
          $('.qrcode-in p').text('');
          setTimeout(()=>{
            this.updQrcode();
          },1000)
          this.isInventoryWarning();
        })
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      qrcode (key,text) {
        if($('#qr_'+key).length >0) {
          return new QRCode('qr_'+key,{
            width: 160, // 设置宽度，单位像素
            height: 160, // 设置高度，单位像素
            text: text // 设置二维码内容或跳转地址
          })
        }
      },
      updQrcode() {
        var temp_warn_list = _.clone(this.warn_list);
        for(const key in temp_warn_list){
          this.qrcode(temp_warn_list[key].goods_commonid,consts.SHARE_URL+'?type=goods&cid='+temp_warn_list[key].goods_commonid+'&gid=0&sid='+temp_warn_list[key].store_id)
        }
      }
    },
    watch:{
      checkState:function (val) {
        if(val.length === this.warn_list.length) {
          this.checkAllState = true;
        }else{
          this.checkAllState = false;
        }
      }
    },
    mounted () {
      //this.getPageData(this.pageParams);
      // layui.use('layer', function(){
      //   this.layer = layui.layer;
      // });
      var _self = this;
      this.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.priceDialog){
            //批量修改价格弹窗
            _self. confirmPriceDialog();
          }else if(_self.storageDialog){
            //批量修改库存
            _self.confirmStorageDialog();
          //}else if(_self.unShowDialog){
            //下架商品
            //_self. goodsUnShow();
          //}else if(_self.delDialog){
            //删除商品
            //_self.confirmDel();
          }else if(_self.classDialog) {
            _self.confirmChangeClass()
          }else{
            _self.search();
          }
          //this.search();
        }
      }
      document.body.addEventListener('keyup', this.bodyListener, false);
    },
    beforeDestroy(){
      document.body.removeEventListener('keyup', this.bodyListener);
    },
    updated(){
      // var temp_warn_list = _.clone(this.warn_list);
      // for(const key in temp_warn_list){
      //   this.qrcode(key,consts.SHARE_URL+'?type=goods&cid='+temp_warn_list[key].goods_commonid+'&gid=0&sid='+temp_warn_list[key].store_id)
      // }
    },
    activated: function () {
      this.getPageData(this.pageParams);
    },
  }
</script>
