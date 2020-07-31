<style scoped>
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
</style>
<template>
  <div class="qm-store-class-base">
    <div class="search-form mb20 mt20">
      <qm-class :gcId1.sync="tempParams.gcId1" :gcId2.sync="tempParams.gcId2" :gcId3.sync="tempParams.gcId3" ref="goodsClass"></qm-class>
      <qm-goods-search-input v-model="tempParams.keyword" :searchType.sync="tempParams.searchType"></qm-goods-search-input>
      <input  type="submit" class="ncsc-btn" value="搜索" @click="search">
    </div>
    <div class="operate-bar mt20" v-if="!!pageParams.total">
      <label for="all1" class="mr10"><input id="all1"  v-model="checkAllState" type="checkbox" class="checkall" @click="checkall">本页全选</label>
      <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openDelDialog(1)">删除</a>
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
              <a href="javascript:;" :class="[pageParams.sortType == 'goodsPrice'&& pageParams.sort==0? 'sort-up' : '',pageParams.sortType == 'goodsPrice'&& pageParams.sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsPrice')">
                价格
                <i class="ico-top"></i><i class="ico-bottom"></i></a>
            </th>
            <th class="w70">
              <a href="javascript:;" :class="[pageParams.sortType == 'goodsStorage'&& pageParams.sort==0? 'sort-up' : '',pageParams.sortType == 'goodsStorage'&& pageParams.sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsStorage')">
                库存
                <i class="ico-top"></i><i class="ico-bottom"></i></a>
            </th>
            <th class="w150">违规禁售原因</th>
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
                  <div class="mt5">
                    <p v-if="item.goods_commend" class="tag orange" title="店铺推荐商品">推荐</p>
                    <p v-if="item.goods_new" class="tag blue" title="新品">新品</p>
                    <div class="qrcode-box mr5"  ><i class="fa fa-qrcode"></i><div class="qrcode-in">打开 我的身边店APP 扫一扫<p :id="'qr_'+item.goods_commonid"></p></div></div>
                  </div>
                </div>
              </div>
            </td>
            <td class="ws-nw">
              <p>¥{{item.goods_price}}</p>
              <p class="c-gray td-lt" v-if="parseFloat(item.goods_marketprice) > parseFloat(item.goods_price)">¥{{item.goods_marketprice}}</p>
            </td>
            <td>{{item.goods_storage}}件</td>
            <td>
              <template v-if="item.goods_verifyremark && item.goods_verify == 0">
                {{item.goods_verifyremark}}
              </template>
              <template v-else>
                {{item.goods_stateremark}}
              </template>
            </td>
            <td class="c-gray">{{item.gc_name}}</td>
            <td class="handle">
              <p><a  href="javascript:;" class="ncsc-btn" @click="$router.push({name:'store_goods_add_step_two',params:{commonId:item.goods_commonid}})">编辑</a></p>
              <p><a  href="javascript:;" class="ncsc-btn" @click="openDelDialog(0,item)">删除</a></p>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </qm-table>
    <div class="operate-bar mt20" v-if="!!pageParams.total">
      <label for="all2" class="mr10"><input id="all2"  v-model="checkAllState" type="checkbox" class="checkall" @click="checkall">本页全选</label>
      <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openDelDialog(1)">删除</a>
    </div>
    <qm-tips :tipsVisible.sync="delDialog" :width="'420px'"  @close="delDialog = false" @confirm="confirmDel()">
      <template slot="title">提示信息</template>
      <template slot="content">您确定要删除吗?</template>
    </qm-tips>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
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
  export default {
    name: "store-goods-offline-lockup",
    data() {
      return {
        delDialog:false,
        delDialogType:0,
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
          type:'lock_up',
          sortType:''
        },
        tempParams:{//临时参数，点击搜索后赋给pageParams
          gcId1: 0,
          gcId2: 0,
          gcId3: '0',
          keyword:'',
          searchType:0,
          sort:0,
          sortType:''
        },
        warn_list: [],
        checkState: [],
        checkAllState : false,
        dialogVisible: false,
        dialogType: 1,
        goods: {
          goodsCommonId: 0
        },
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
        storeGoodsOffline.getOfflineGoodsList(data).then((res)=>{
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
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          _self.search();
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      //销毁键盘enter搜索事件
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
