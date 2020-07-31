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
  .sort{display: inline-block; position: relative; padding-right: 15px;}
  .sort:hover{text-decoration: none;}
  .sort .ico-top, .sort .ico-bottom{width: 10px; height: 5px; position: absolute; right: 0; top: 50%; background: url(~@/assets/seller/images/seller/ncsc_bg_img.png) -165px -490px no-repeat;}
  .sort .ico-top{margin-top: -6px;}
  .sort .ico-bottom{margin-top: 1px; background-position: -165px -500px;}
  .sort.sort-up, .sort.sort-down{color:#ff8519;}
  .sort.sort-up .ico-top{background-position: -180px -490px;}
  .sort.sort-down .ico-bottom{background-position: -180px -500px;}
</style>
<template>
  <div class="qm-store-class-base">
    <div class="search-form mb20">
      <qm-class tit="商品分类" :gcId1.sync="tempParams.gcId1" :gcId2.sync="tempParams.gcId2" :gcId3.sync="tempParams.gcId3" ref="goodsClass"></qm-class>
      <qm-goods-search-input v-model="tempParams.keyword" :searchType.sync="tempParams.searchType"></qm-goods-search-input>
      <input  type="submit" class="ncsc-btn" value="搜索" @click="search">
    </div>
    <div class="operate-bar mt20" v-if="!!pageParams.total">
      <label for="all" class="mr10"><input id="all"  v-model="checkAllState" type="checkbox" class="checkall" @click="checkall">本页全选</label>
      <a href="javascript:;" class="ncsc-btn-mini mr5" @click="supInventory(1)">批量修改库存</a>
      <a href="javascript:;" class="ncsc-btn-mini mr5" @click="modifyWarning(1)">批量修改预警值</a>
    </div>
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="ncsc-table mt20">
          <thead>
          <tr>
            <th class="w15"></th>
            <th>
              <a @click="sort($event,'goodsName')" class="sort js-sort" data-sort="performance_sort">商品名称<i class="ico-top"></i><i class="ico-bottom"></i></a>
            </th>
            <th class="w150">规格</th>
            <th class="w100"><a @click="sort($event,'goodsStorage')" class="sort js-sort" data-sort="performance_sort">库存<i class="ico-top"></i><i class="ico-bottom"></i></a></th>
            <th class="w120">
              <a @click="sort($event,'goodsStorageAlarm')" class="sort js-sort" data-sort="performance_sort">库存预警值<i class="ico-top"></i><i class="ico-bottom"></i></a>
            </th>
            <th class="w150">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in warn_list" :key="item.goods_id">
            <td><input type="checkbox" class="checkitem" :value="item.goods_id"  v-model="checkState"  /></td>
            <td>
              <div class="info-box">
                <div class="pic">
                  <img :src="item.goods_image" width="90" height="90" />
                </div>
                <div class="detail">
                  <p><a @click="openGoods(item.goods_commonid)">{{item.goods_name}}</a></p>
                  <div class="mt5">
                    <p v-if="item.goods_commend" class="tag orange" title="店铺推荐新品">推荐</p>
                    <div class="qrcode-box mr5"  ><i class="fa fa-qrcode"></i><div class="qrcode-in">打开 我的身边店APP 扫一扫<p :id="'qr_'+item.goods_id"></p></div></div>
                  </div>
                </div>
              </div>
            </td>
            <td>{{item.goods_spec}}</td>
            <td class="c-blue"><p class="fs20">{{item.goods_storage}}</p></td>
            <td>{{item.goods_storage_alarm}}</td>
            <td class="handle">
              <p><a href="javascript:;" class="c-orange" @click="ignore(item.goods_id)">忽略</a></p>
              <p><a nctype="btn_show_explain_dialog"  href="javascript:;" class="ncsc-btn" @click="supInventory(0,item)">修改库存</a></p>
              <p><a nctype="btn_show_explain_dialog"  href="javascript:;" class="ncsc-btn" @click="modifyWarning(0,item)">修改预警值</a></p>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </qm-table>
    <qm-dialog :dialogVisible="alarmDialog" :width="'450px'" @close="closeDialog(true)">
      <template slot="title">设置默认库存预警值</template>
      <template slot="content" >
        <div class="dialog_content">
          <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
            <div>
              <dl>
                <dt>默认预警值：</dt>
                <dd><input type="text" class="text valid" maxlength="3" v-model="default_storage_alarm" @input="onlyInteage($event,'default_storage_alarm')"></dd>
              </dl>
            </div>
            <div class="bottom">
              <input type="button"  value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="storageSave">
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </template>
    </qm-dialog>
    <qm-dialog :dialogVisible="dialogVisible" :width="'450px'" @close="dialogVisible = false">
      <template slot="title">增补库存</template>
      <template slot="content" >
        <div class="dialog_content">
          <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
            <div class="info-box" v-if="dialogType === 0">
              <div class="pic">
                <img :src="goods.goodsImage" width="80" height="80">
              </div>
              <div class="detail">
                <p>{{goods.goodsName}}</p>
                <p class="fs12 c-gray mt5 test">{{goods.goodsSpec}}</p>
              </div>
            </div>
            <div class="ncsc-form-s mt20" >
              <dl>
                <dt>增补库存：</dt>
                <dd><input type="text" class="ncsc-form-control w250"  v-model="storage" maxlength="7" @input="onlyInteage($event,'storage')"  ></dd>
              </dl>
            </div>
            <div class="bottom">
              <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="supInventorySave">
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </template>
    </qm-dialog>
    <qm-dialog :dialogVisible="dialogWarnVisible" :width="'450px'" @close="dialogWarnVisible = false">
      <template slot="title"><template v-if="dialogWarnType === 0">库存预警值</template><template v-else>批量修改库存预警值</template></template>
      <template slot="content" >
        <div class="dialog_content">
          <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">

            <div class="ncsc-form-s mt20" >
              <dl>
                <dt>库存预警值：</dt>
                <dd>
                  <input type="text" class="ncsc-form-control w250"  v-model="warn" maxlength="7" @input="onlyInteage($event,'warn','0,255')"  >
                  <p class="hint"><span>请填写0~255的数字，0为不预警</span></p>
                </dd>
              </dl>
            </div>
            <div class="bottom">
              <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="modifyWarningSave">
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </template>
    </qm-dialog>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
  </div>
</template>

<script>//
  import util from 'lib/utils/util';
  import 'viewerjs/dist/viewer.css'
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmDialog from 'component/qm-dialog/index';
  import QmTable from 'component/qm-table/index';
  import QRCode from 'qrcodejs2'
  import storage from 'lib/utils/storage'
  import {inventoryWarning} from 'api'
  import consts from 'config/consts'
  import mixin from 'component/main/mixin';
  import QmClass from 'component/qm-class';
  import QmGoodsSearchInput from 'component/qm-goods-search-input';
  export default {
    name: "inventory-warning-list",
    mixins:[mixin],
    data() {
      return {
        bodyListener:'',
        default_storage_alarm: 0,
        origin_storage_alarm:0,
        pageParams:{
          pageIndex:0,
          pageSize:10,
          total:0,
          sort:'',//	1:库存升序，2：库存降序
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
        dialogWarnVisible: false,
        dialogWarnType: 1,
        warn: '',
        goods: {
          goodsId: 0,
          goodsCommonId: 0,
          goodsImage: '',
          goodsName: '',
          goodsSpec:''//zsw33
        },
        checkedGoodsIds:'',
      }
    },
      ...mapGetters({
          metaData:'getMetaData',
          ImageIp:'getImageIp',
          basicStore:'getBasicStore',
          imagePathConfig:'getImagePathConfig',
      }),

    computed:{
      ...mapGetters('inventoryWarning',{
          alarmDialog:'getAlarmDialog'
      })
    },

    components:{
      QmPagination,
      QmDialog,
      QmTable,
      QmGoodsSearchInput,
      QmClass,
    },

    methods: {
      ...mapMutations('inventoryWarning',{
          setAlarmDialog:'setAlarmDialog'
      }),
      ...mapActions('inventoryWarning',{
          isInventoryWarning:'isInventoryWarning'
      }),
      openGoods(goodsCommonId){
        let routeData = this.$router.resolve({
          name:"store_goods_add_step_two",
          params:{commonId:goodsCommonId}
        });
        window.open(routeData.href, '_blank');
      },
      changeStorageNum(){
        this.storage=this.storage.replace(/\D/g,'')
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
            this.checkState.push(item.goods_id);
          }
        }
      },
      closeDialog(reset){
        this.setAlarmDialog(false);
        if(reset) {
          this.default_storage_alarm = this.origin_storage_alarm;
        }else{
          this.origin_storage_alarm = this.default_storage_alarm;
        }
      },
      getPageData(data){
        inventoryWarning.warnGoodsList(data).then((res)=>{
          this.warn_list = res.list;
          if(this.warn_list.length <= 0&&this.pageParams.pageIndex >  0){
            //如果不是第一页，且该页内容为零，需要前进一页
            this.pageParams.pageIndex -= 1;
            this.getPageData(this.pageParams);
            return;
          }
          this.origin_storage_alarm = this.default_storage_alarm = res.default_storage_alarm;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          if(this.warn_list.length == 0&&this.pageParams.pageIndex == 0){
              newPageParams.total = 0;
          }
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
      modifyWarning(type,item){
        if(type === 1) {//批量修改预警值
          if(this.checkState.length === 0) {
            util.msg('请勾选需要修改预警值的商品');
            return;
          }
          this.checkedGoodsIds = this.checkState.join(',');
          this.warn = '';
        }else if(type === 0) {//单个商品修改预警值
          this.checkedGoodsIds = item.goods_id;
          this.goods.goodsId = item.goods_id;
          this.goods.goodsCommonId = item.goods_commonid;
          this.goods.goodsImage = item.goods_image;
          this.goods.goodsName = item.goods_name;
          this.warn = item.goods_storage_alarm;
        }
        this.dialogWarnType = type;
        this.dialogWarnVisible = true;
      },
      supInventory(type,item) {
        if(type === 1) {//批量商品增补库存
            if(this.checkState.length === 0) {
              util.msg('请选择需要修改库存的商品');
              return;
            }
            this.checkedGoodsIds = this.checkState.join(',');
        }else if(type === 0) {//单个商品增补库存
          this.checkedGoodsIds = item.goods_id;
          this.goods.goodsId = item.goods_id;
          this.goods.goodsCommonId = item.goods_commonid;
          this.goods.goodsImage = item.goods_image;
          this.goods.goodsName = item.goods_name;
          this.goods.goodsSpec = item.goods_spec;//
        }
        this.dialogType = type;
        this.dialogVisible = true;
        this.storage = '';
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
      ignore(goodsId) {
        let data = {
          goodsId: goodsId
        };
        inventoryWarning.ignoreGoods(data).then(res=> {
          util.msg(res.shortMessage);
          setTimeout(()=>{
              this.getPageData(this.pageParams);
          },500)
        })
      },
      storageSave(){
        if(this.default_storage_alarm === '') {
          util.msg('请输入默认预警值');
          return;
        }
        if(this.default_storage_alarm > 255) {
          util.msg('默认预警值不能超过255');
          return;
        }
        let data = {
          defaultStorageAlarm: this.default_storage_alarm
        };
        //保存库存预警值
        inventoryWarning.setDefaultWarning(data).then(res=> {
          util.msg(res.shortMessage);
          if(res.resultCode === 1) {
            this.closeDialog();
            $('.qrcode-in p').text('');
            setTimeout(()=>{
                this.getPageData(this.pageParams);
            },500)
          }
        });
      },
      async supInventorySave() {
        let res,data;
        if(this.storage === '') {
          util.msg('请输入库存');
          return;
        }
        if(this.dialogType === 0) {//单个商品增补库存
          data = {
            goodsId: this.goods.goodsId,
            commonId: this.goods.goodsCommonId,
            storage: this.storage
          };
          res = await inventoryWarning.changeStorage(data);
        }else{
          data = {
            goodsIds: this.checkState.join(','),
            storage: this.storage
          };
          res = await inventoryWarning.inventoryAddBatch(data);
        }
        util.msg(res.shortMessage);
        if(res.resultCode === 1) {
          this.dialogVisible = false;
          if(this.dialogType === 1) {
            this.checkState = [];
            this.checkAllState = false;
          }else{
            this.checkedGoodsIds += ','
          }
          let tmp_ids = this.checkedGoodsIds.split(',');
          let tmp_list = _.clone(this.warn_list)
          tmp_list.forEach((item,k) =>{
            if(tmp_ids.includes(item.goods_id + '')){
              tmp_list[k].goods_storage = parseInt(tmp_list[k].goods_storage) + parseInt(this.storage)
            }
          })
          this.warn_list = tmp_list
        }
        this.storage = '';
      },
      async modifyWarningSave() {
        let res,data;
        if(this.warn === '') {
          util.msg('请填写库存预警值');
          return;
        }
        if(this.dialogWarnType === 0) {//单个商品修改预警值
          data = {
            goodsIds: this.goods.goodsId,
            warn: this.warn
          };
        }else{
          data = {
            goodsIds: this.checkState.join(','),
            warn: this.warn
          };
        }
        res = await inventoryWarning.modifyWarning(data);
        util.msg(res.shortMessage);
        if(res.resultCode === 1) {
          this.dialogWarnVisible = false;
          if(this.dialogWarnType === 1) {
            this.checkState = [];
            this.checkAllState = false;
          }else{
            this.checkedGoodsIds += ','
          }
          let tmp_ids = this.checkedGoodsIds.split(',');
          let tmp_list = _.clone(this.warn_list)
          tmp_list.forEach((item,k) =>{
            if(tmp_ids.includes(item.goods_id + '')){
              tmp_list[k].goods_storage_alarm =  parseInt(this.warn)
            }
          })
          this.warn_list = tmp_list
        }
        this.warn = '';
      },
      updQrcode() {
        var temp_warn_list = _.clone(this.warn_list);
        for(const key in temp_warn_list){
          this.qrcode(temp_warn_list[key].goods_id,consts.SHARE_URL+'?type=goods&cid='+temp_warn_list[key].goods_commonid+'&gid=0&sid='+temp_warn_list[key].store_id)
        }
      },
      sort(e,sortType){
        //排序的方法
        var el = e.currentTarget;
        var _self = this;
        $('.sort').removeClass('sort-up');
        $('.sort').removeClass('sort-down');
        if(_self.pageParams.sortType==sortType){
          if(_self.pageParams.sort==2){
            _self.pageParams.sort=1;
            $(el).addClass('sort-up');
          }else{
            _self.pageParams.sort=2;
            $(el).addClass('sort-down') ;
          }
        }else{
          _self.pageParams.sort=1;
          $(el).addClass('sort-up');
        }
        _self.pageParams.sortType=sortType;
          //购买业绩排序
         /* if(_self.pageParams.sort == 1){
            _self.pageParams.sort = 2;
            $(el).addClass('sort-down') ;
          }else if( _self.pageParams.sort == 2){
            _self.pageParams.sort = '';
          }else{
            _self.pageParams.sort = 1;
            $(el).addClass('sort-up');
          }*/
        this.pageParams.pageIndex = 0;
        this.getPageData(this.pageParams);
      },
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
      var _self = this;
      _self.getPageData(_self.pageParams);
      layui.use('layer', function(){
        _self.layer = layui.layer;
      });
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) =>{
        if (e.keyCode === 13){
          if(_self.dialogVisible){
            //增补库存弹窗
            _self.supInventorySave();
          }else if(_self.dialogWarnVisible){
            _self.modifyWarningSave();
          }else if(_self.alarmDialog){
            //设置默认库存预警值
            _self.storageSave();
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
      // var temp_warn_list = _.clone(this.warn_list);
      // for(const key in temp_warn_list){
      //   this.qrcode(key,consts.SHARE_URL+'?type=goods&cid='+temp_warn_list[key].goods_commonid+'&gid=0&sid='+temp_warn_list[key].store_id)
      // }
    }
  }
</script>
