<style scoped>
  .storage-choose {
    position: relative;
  }
  .storage-choose .storage-hint {
    position: absolute;
    color: #ff8519;
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
    left: 340px;
    top: 30px;
    padding: 85px 0 0 136px;
  }
  .storage-choose .storage-hint:before {
    content: '';
    width: 28px;
    height: 44px;
    background: url(../../../../../static/seller/images/seller/ncsc_bg_img.png) -350px -420px no-repeat;
    position: absolute;
    left: 0;
    top: 0;
    animation: toup .8s alternate infinite;
  }
  .storage-choose .storage-hint:after {
    content: '';
    width: 112px;
    height: 64px;
    background: url(../../../../../static/seller/images/seller/ncsc_bg_img.png) -400px -360px no-repeat;
    position: absolute;
    left: 18px;
    top: 40px;
  }
  @-webkit-keyframes toup {
     0% {
       opacity: 1;
       -webkit-transform: translateY(0);
       transform: translateY(0);
     }
     100% {
       opacity: 0.8;
       -webkit-transform: translateY(-10px);
       transform: translateY(-10px);
     }
   }
  @keyframes toup {
    0% {
      opacity: 1;
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      opacity: 0.8;
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
    }
  }
  .storage-message {
    background: #fff3e7;
    margin-bottom: 20px;
    padding: 15px;
  }
  .info-box {
    display: table;
  }
  .info-box .pic {
    padding-right: 15px;
    position: relative;
  }
  .info-box .pic, .info-box .detail {
    display: table-cell;
    vertical-align: top;
  }
  .info-box .detail {
    word-break: break-all;
  }
  .info-box .info-item {
    overflow: hidden;
    margin-top: 5px;
    line-height: 1.8;
  }
  .info-box .info-tit {
    float: left;
    font-weight: bold;
    margin-right: 20px;
  }
  .info-box .info-con {
    overflow: hidden;
  }
  .info-box .info-group {
    margin: 0 -10px -10px;
  }
  .info-box .info-group p {
    display: inline-block;
    margin: 0 10px 10px;
    white-space: nowrap;
  }
  .info-box .info-group p a:hover{
    color: #ff8519;
  }
  .info-box .btn-info-collapse {
    font-size: 12px;
    margin-left: 10px;
    color: #ff8519;
    white-space: nowrap;
  }
  .info-box .btn-info-collapse:hover{
    text-decoration: none;
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
</style>
<template>
  <div class="qm-store-class-base">
    <p class="c-orange mt20 mb10">找不到与您匹配的供应商？请让供应商联系平台客服，热线：{{service_tel}}</p>
    <div class="storage-choose mb20">
      供应商：
      <select @change="unBlur($event)" class="w300" v-model="selectValue">
        <option value="0">请选择供应商</option>
        <option v-for="(item,key) in supplierList" :value="item.store_id">{{item.store_name}}</option>
      </select>
      <div class="storage-hint" v-show="selectValue == 0">请选择供应商</div>
    </div>
    <div class="storage-result" v-show="selectValue != 0">
      <div class="storage-message">
        <div class="info-box">
          <div class="pic">
            <img :src="supplier.storeLabel" width="90" height="90">
          </div>
          <div class="detail">
            <p class="fs22">{{supplier.storeName}}<span class="c-gray ml10 fs14">{{supplier.storePhone}}</span></p>
            <div class="info-item" v-if="supplier.express">
              <p class="info-tit">相关资质</p>
              <div class="info-con" >
                <div class="info-group">
                  <p class="js-tips-img" v-for="item in supplier.express">
                    <a :href="item.filename" target="_blank" v-if="item.type == 1">{{item.name}}</a>
                    <a :href="item.filename" :download="item.filename" v-else>{{item.name}}</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="info-item" v-if="supplier.storeIntro">
              <p class="info-tit">简介信息</p>
              <div class="info-con" v-if="supplier.storeIntro.length <= 200">
                <div class="collapse-con">
                  {{supplier.storeIntro}}
                </div>
              </div>
              <div class="info-con" v-else>
                <div class="collapse-con" v-show="!storeIntroShow">{{supplier.storeIntro.substr(0,200)}}...<a @click="storeIntroShow = true" href="javascript:;" class="btn-info-collapse js-info-collapse">更多 <i class="fa fa-angle-down"></i></a>
                </div>
                <div class="collapse-con" v-show="storeIntroShow">
                  {{supplier.storeIntro}}
                  <a href="javascript:;" @click="storeIntroShow = false" class="btn-info-collapse js-info-collapse">收起 <i class="icon-angle-up"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="comm-tab mb20">
        <li v-for="(item,key) in switchTypes" :class="addType == key ? 'active':''" @click="switchType(key)">{{item}}</li>
      </ul>

      <div class="search-form mb20">
        <qm-class :storeId="pageParams.SupplierStoreId" :gcId1.sync="tempParams.gcId1" :gcId2.sync="tempParams.gcId2" :gcId3.sync="tempParams.gcId3" ref="goodsClass"></qm-class>
        <qm-goods-search-input v-model="tempParams.keyword" :searchType.sync="tempParams.search_type"></qm-goods-search-input>
        <input  type="submit" class="ncsc-btn" value="搜索" @click="search">
      </div>
      <p class="c-gray fs12 mb5">条形码可手动输入，也可以使用巴枪扫码输入</p>
      <p class="c-gray fs12 mb20">搜索框支持模糊搜索，例如：输入“A+空格键+B+空格键+C” 代表显示的商品名称中含有“ABC”</p>
      <div class="operate-bar mt20" v-if="!!pageParams.total  && addType != 2">
        <label for="all1" class="mr10"><input id="all1"  v-model="checkAllState" type="checkbox" class="checkall" @click="checkall">本页全选</label>
        <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openBatchAddDialog">批量加入</a>
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
              <th class="w150">
                <a href="javascript:;" :class="[pageParams.sortType == 'goodsMarketprice'&& pageParams.sort==0? 'sort-up' : '',pageParams.sortType == 'goodsMarketprice'&& pageParams.sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsMarketprice')">
                  价格
                  <i class="ico-top"></i><i class="ico-bottom"></i></a>
              </th>
              <th class="w120">发布时间</th>
              <th class="w100">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in storage_goods_list" :key="item.goods_commonid">
              <td><input v-if="addType != 2" :disabled="item.is_copy == 1" type="checkbox" class="checkitem" :value="item.goods_commonid"  v-model="checkState"  /></td>
              <td>
                <div class="info-box">
                  <div class="pic">
                    <img v-if="item.goods_image" @click="view(item)" :src="item.goods_image" width="90" height="90" />
                    <img v-else src="../../../../assets/images/noimage.gif" width="90" height="90" />
                  </div>
                  <div class="detail">
                    <p><a href="javascript:void(0)" @click="view(item)">{{item.goods_name}}</a></p>
                    <p class="fs12 c-gray mt5" v-if="item.goods_jingle">{{item.goods_jingle}}</p>
                  </div>
                </div>
              </td>
              <td class="ws-nw">¥{{item.goods_marketprice}}</td>
              <td class="c-gray">{{item.goods_addtime}}</td>
              <td class="handle">
                <p v-if="item.is_copy == 0"><a nctype="btn_show_explain_dialog"  href="javascript:;" class="ncsc-btn" @click="openAddDialog(item)">加入</a></p>
                <p><a nctype="btn_show_explain_dialog"  href="javascript:;" class="ncsc-btn" @click="view(item)">查看</a></p>
                <p class="c-gray" v-if="item.is_copy == 1">已加入</p>
              </td>
            </tr>
            </tbody>
          </table>
        </template>
      </qm-table>
      <div class="operate-bar mt20" v-if="!!pageParams.total && addType != 2">
        <label for="all2" class="mr10"><input id="all2"  v-model="checkAllState" type="checkbox" class="checkall" @click="checkall">本页全选</label>
        <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openBatchAddDialog">批量加入</a>
      </div>
    </div>

    <qm-add-storage-goods-dialog :checkState="checkState" :saveBatchAdd.sync="saveBatchAdd" :selectedGcTag="selectedGcTag" :batchAddDialog.sync="batchAddDialog" :stapleList="stapleList" :addDialog.sync="addDialog" :multiSpecAddDialog.sync="multiSpecAddDialog" :goods="goods" :goodsAttr="goodsAttr" :sku="addParams.sku" @saveSuccess="saveSuccess"></qm-add-storage-goods-dialog>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
  </div>
</template>

<script>
  import util from 'lib/utils/util';
  import { mapMutations } from 'vuex';
  import QmClass from 'component/qm-class';
  import QmPagination from 'component/qm-pagination/index';
  import QmDialog from 'component/qm-dialog/index';
  import QmTable from 'component/qm-table/index';
  import QmAddStorageGoodsDialog from 'component/qm-add-storage-goods-dialog';
  import QmGoodsSearchInput from 'component/qm-goods-search-input';
  import {storeGoodsStorage,storeGoodsAdd} from 'api';
  import consts from 'config/consts';
  import mixin from 'component/main/mixin';
  export default {
    name: "store-goods-storage-index",
    mixins:[mixin],
    data() {
      return {
        bodyListener:'',
        switchTypes:{
          0:'全部',
          1:'未加入',
          2:'已加入'
        },
        selectValue: 0,
        supplierList: [],
        supplier:{
          storeName: '',
          storePhone: '',
          storeIntro: '',
          storeLabel: '',
          express: ''
        },
        tempParams:{//临时参数，点击搜索后赋给pageParams
          gcId1: 0,
          gcId2: 0,
          gcId3: '0',
          keyword:'',
          search_type:0
        },
        addType: 1,//0:全部 1：未加入 2:已加入
        pageParams:{//商品列表参数
          search_type:0,
          SupplierStoreId: 0,
          type: 0,
          pageIndex:0,
          pageSize:20,
          total:0,
          keyword: '',
          gcId1: 0,
          gcId2: 0,
          gcId3: '0',
          sort:0,
          sortType:''
        },
        service_tel: consts.SERVICE_TEL,//客服电话
        storeIntroShow:false,
        batchAddDialog: false,
        addParams: {//添加商品参数
          discount: '',
          storage: '',
          price: '',
          sku:''
        },
        storage_goods_list: [],
        checkState: [],
        checkAllState : false,
        addDialog: false,//单规格商品添加弹窗
        multiSpecAddDialog:false,//多规格商品添加弹窗
        goods: {
          goodsMarketPrice: '',
          goodsName: '',
          commonId:''
        },
        goodsAttr:{
          goodsAttr:'',
          goodsAttrName:'',
          spValue:'',
          gcName:''
        },
        stapleList:[],
        selectedGcTag:[

        ],
        saveBatchAdd:false,
        defaultAlarm:0,
      }
    },

    computed:{

    },

    components:{
      QmPagination,
      QmDialog,
      QmTable,
      QmClass,
      QmAddStorageGoodsDialog,
      QmGoodsSearchInput
    },

    methods: {
      ...mapMutations('storeGoodsStorage',{
        setGoodsStorageTabs:'setGoodsStorageTabs'
      }),
      getStapleList(){
        storeGoodsAdd.getStapleList().then((res)=>{
          var list = _.clone(res.list)
          list.forEach((item,i) => {
            item.selected = false
          })
          this.stapleList = list
        })
      },
      view(item){
        this.$router.push({ name: 'store_goods_storage_view', params: { commonId: item.goods_commonid }})
      },
      resetAddDialog() {
        this.addParams =  {
          discount: '',
          storage: '',
          price: '',
          sku:''
        };
        this.goodsAttr = {
          goodsAttr:'',
          goodsAttrName:'',
          spValue:'',
          gcName:''
        };
      },
      resetPageParams(){
        this.addType  = 1;
        this.$refs.goodsClass.subgcId1 = 0;
        this.tempParams = {
          gcId1: 0,
          gcId2: 0,
          gcId3: '0',
          keyword:'',
          search_type:0
        };
        let pageParams = {
          search_type:0,
          type: 0,
          pageIndex:0,
          keyword: '',
          gcId1: 0,
          gcId2: 0,
          gcId3: '0'
        };
        this.pageParams = {
          ...this.pageParams,
          ...pageParams
        }
      },
      async openAddDialog(item) {
        if(this.goods.commonId != item.goods_commonid) {
          this.resetAddDialog();
        }
        this.goods.goodsName = item.goods_name;
        this.goods.goodsMarketPrice = item.goods_marketprice;
        this.goods.commonId = item.goods_commonid;
        let res = await storeGoodsStorage.copyOneViewData({commonId:this.goods.commonId});
        this.addParams.sku = res.default_storage_alarm;
        this.goodsAttr.goodsAttr = res.goodsAttr;
        this.goodsAttr.goodsAttrName = res.goodsAttrName;
        this.selectedGcTag = res.goodsClass
        if(res.spValue.length > 0) {
          for (let val of res.spValue) {
            val.sku = this.addParams.sku;
            val.stock = '';
          }
        }
        this.goodsAttr.spValue = res.spValue;
        this.goodsAttr.spValue.forEach((item,k) => {
          this.goodsAttr.spValue[k]['is_show'] = true;
        })
        if(item.is_multi_spec == 0) {
          this.addDialog = true;
        }else{
          this.multiSpecAddDialog = true;
        }
      },
      openBatchAddDialog() {
        if(this.checkState.length === 0) {
          util.msg('请选择需要批量加入的商品');
          return;
        }
        this.selectedGcTag = {
          'gc_id_1':0,
          'gc_id_2':0,
          'gc_id_3':0,
          'goods_class_t_id':0,
          'gc_tag_name':'',
          'default_alarm':this.defaultAlarm
        }
        this.batchAddDialog = true;
      },
      search() {
        this.pageParams = {
          ...this.pageParams,
          ...this.tempParams
        };
        this.pageParams.pageIndex = 0;//页码置0
        this.getPageData(this.pageParams);
      },
      unBlur(e){
        var el = e.currentTarget;
        $(el).blur();
      },
      switchType(key) {
        this.addType = key;
        this.pageParams.pageIndex = 0;//页码置0
        this.getPageData(this.pageParams);
      },
      changeType(type,txt){
        this.pageParams.search_type = type;
        this.curSearchTypeTxt = txt;

      },
      checkall(e) {
        this.checkState = [];
        if(e.target.checked === true) {//批量全选
          for(let item of this.storage_goods_list) {
            if(item.is_copy == 0){
              this.checkState.push(item.goods_commonid);
            }
          }
        }
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
      getPageData(data){
        this.beforeGetPage();
        storeGoodsStorage.getSupplierGoodsList(this.pageParams).then((res)=>{
          this.defaultAlarm = res.default_storage_alarm
          this.storage_goods_list = res.list;
          var newPageParams = _.clone(this.pageParams);
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
          //取消复选框的选中
          this.checkState = [];
          this.checkAllState = false;
        })
      },
      getSupplier(data) {
        storeGoodsStorage.getSupplierList(data).then(res=>{
          this.supplierList = res.list;
        })
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      saveSuccess() {
        this.addDialog = false;
        this.multiSpecAddDialog = false;
        var newPageParams = _.clone(this.pageParams);
        newPageParams.total = newPageParams.total - 1;
        this.pageParams = newPageParams;
        setTimeout(res=>{
          this.getPageData(this.pageParams);
        },1200);
      },
      beforeGetPage() {
        let maxPage = Math.ceil(this.pageParams.total/this.pageParams.pageSize);
        let maxIndex = maxPage >= 1 ? maxPage - 1 : maxPage;
        if(this.pageParams.pageIndex > maxIndex) {
          var newPageParams = _.clone(this.pageParams);
          newPageParams.pageIndex = maxIndex;
          this.pageParams = newPageParams;
        }
      }
    },
    watch:{
      saveBatchAdd:function(val){
        if(true == val){
          var newPageParams = _.clone(this.pageParams);
          newPageParams.total = newPageParams.total - this.checkState.length;
          this.pageParams = newPageParams;
          //取消复选框选中
          this.checkState = [];
          this.checkAllState = false;
          setTimeout(res=>{
            this.getPageData(this.pageParams);
          },1200);
        }
      },
      batchAddDialog:function(val){
      },
      selectValue: function (val) {
        this.pageParams.SupplierStoreId = val;
        for (let item of this.supplierList) {
          if(item.store_id == val) {
            this.supplier.storeName = item.store_name;
            this.supplier.storeLabel = item.store_label;
            this.supplier.storePhone = item.store_phone;
            this.supplier.storeIntro = item.store_intro;
            this.supplier.express = item.express;
            break;
          }
        }
        this.resetPageParams();
        this.getPageData(this.pageParams);
      },
      addType:function (val) {
        this.pageParams.type = val == 0 ? 1 : (val == 1 ? 0 : 2);
      },
      checkState:function (val) {
        if(val.length === this.storage_goods_list.length) {
          this.checkAllState = true;
        }else{
          this.checkAllState = false;
        }
      }
    },
    mounted () {
      var _self = this;
      _self.getSupplier(_self.pageParams);
      this.getStapleList()
      layui.use('layer', function(){
        _self.layer = layui.layer;
      });
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.addDialog){
            //加入商品
          //  _self.$refs.amDialog.addSave();
            return;
          }else if(_self.batchAddDialog){
            //批量加入商品
         //   _self.batchAddSave();
            return;
          }else if(_self.multiSpecAddDialog){
            return;
          } else{
            _self.search();
          }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      document.body.removeEventListener('keyup', this.bodyListener);
    },
    updated(){

    },
    activated: function () {
      this.getPageData(this.pageParams);
    },
  }
</script>
