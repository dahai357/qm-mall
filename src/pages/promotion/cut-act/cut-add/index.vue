<style scoped>
  .qm-store-class-base{
    padding: 10px 0 10px 0;
  }
  .ncsc-btn {
    font-size: 12px;
  }
  .btn-remove{
    font-size: 12px;
  }
.wrap{
  font-size: 14px;
  margin-top: 20px;
}
  caption, th {
    text-align: left;
    font: 14px/1.5 "Microsoft Yahei", "PingFang SC", "ST Heiti", SimHei, sans-serif, "Helvetica Neue", Tahoma;
  }
  .no-promotion {
    color: #757575;
    padding: 50px 0;
    line-height: 20px;
    text-align: center;
  }
  .ui-sortable .ui-state-disabled {
    opacity: 1;
    filter: Alpha(Opacity=100);
  }
  .ui-state-disabled {
    cursor: default !important;
  }

  .bottom .submit:hover {
    text-decoration: none;
    background: #ef7101;
    cursor: pointer;
  }
  label {
    display: inline-block;
    vertical-align: middle;
  }
  .bd-line td {
    border-bottom: solid 1px #eee;
  }
  form label.error i {
    margin: 0 5px 3px;
  }

  .ncsc-btn.disabled, .ncsc-btn-orange.disabled {
    color: #adadad;
    border-color: #eee;
    background: none;
  }
  .disabled.btn-multiple-upload-img .multiple-upload-img{
    z-index: -2;
  }
  .ncsc-btn-orange-rim {
    border-color: #ff8519;
    color: #ff8519;
  }
  .ncsc-btn-orange-rim:hover {
    background: #ff8519;
    color: #fff;
  }

  .ncsc-form-default dl {
    line-height: 20px;
    display: table;
    width: 100%;
  }


  .ncsc-form-default dt {
    font-size: 14px;
    line-height: 30px;
    vertical-align: top;
    letter-spacing: normal;
    word-spacing: normal;
    text-align: right;
    display: table-cell;
    width: 19%;
    padding: 15px 1% 15px 0;
    margin: 0;
  }

  .ncsc-form-goods dl dt {
    width: 15.5%;
  }

  .ncsc-form-default dd {
    font-size: 14px;
    line-height: 30px;
    vertical-align: top;
    letter-spacing: normal;
    word-spacing: normal;
    display: table-cell;
    width: 79%;
    padding: 15px 0;
  }

  .ncsc-form-goods dl dd {
    width: 82.5%;
    padding: 15px 0 15px 1%;
  }

  .ncsc-default-table {
    width: 100%;
    border-collapse: collapse;
    line-height: 1.5;
  }


  .ncsc-default-table th, .ncsc-default-table td ,td{
    vertical-align: top;
    font-size: 14px;
  }
  .ncsc-default-table td a {
    width: 50px;
    font-size: 12px;
  }
  .ncsc-default-table th {
    background: #f9f9f9;
    padding: 10px;
    text-align: left;
  }

  .ncsc-btn {
    line-height: 30px;
    vertical-align: middle;
    display: inline-block;
    height: 30px;
    padding: 0 10px;
    border: solid 1px #ddd;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: none;
    border-radius: 5px;
    font-size: 12px;
    text-align: center;
  }

  .ncsc-default-table td,td {
    border-bottom: 1px solid #eee;
    padding: 20px 10px;
  }

  .bd-line td {
    border-bottom: solid 1px #eee;
  }
  .ghost{
    border: dotted 1px #ff8519;
    box-shadow: 2px 2px 2px rgba(153, 153, 153, 0.25);
    filter: alpha(opacity=75);
    -moz-opacity: 0.75;
    opacity: .75;
    cursor: ns-resize;
    background-color: #ffeddd;
  }
  .gray td{
    background: #f5f5f5;
    color: #757575;
  }
   tr a:hover {
    color: #ff8519;
  }
  .ncsc-btn:hover {
    text-decoration: none;
    border-color: #ff8519;
  }
  .tips{
    color:#a3a3a3;
  }
</style>
<template>
  <div class="qm-store-class-base">
    <div class="wrap">
      <div class="ncsc-form-default">
        <form id="add_form" >
          <dl>
            <dt><i class="required">*</i>活动名称：</dt>
            <dd>
              <p>
                <input id="activity_name" name="activity_name" type="text" maxlength="25" class="w400 text" v-model.trim="subData.activity_name" />
                <span><label class="error" v-show="validData.nameErr"><i class="fa fa-exclamation-circle"></i>请填写活动名称</label></span>
              </p>
            </dd>
          </dl>

          <dl>
            <dt><i class="required">*</i>开始时间：</dt>
            <dd>
              <input id="start_time" v-model="subData.start_time" type="text" class="input-add-on w150"  readonly="readonly">
              <label class="add-on mr5"><i class="fa fa-calendar icon-calendar"></i></label>
              <span><label class="error" v-show="validData.startTimeErr"><i class="fa fa-exclamation-circle"></i>开始时间不能为空</label></span>
              <span><label class="error" v-show="validData.startTimeLessThenNow"><i class="fa fa-exclamation-circle"></i>开始时间不能早于当前时间</label></span>
            </dd>
          </dl>
          <dl>
            <dt><i class="required">*</i>结束时间：</dt>
            <dd>
              <input id="end_time" v-model="subData.end_time" type="text" class="input-add-on w150"  readonly="readonly">
              <label class="add-on mr5"><i class="fa fa-calendar icon-calendar"></i></label>
              <span><label class="error" v-show="validData.endtimeErr"><i class="fa fa-exclamation-circle"></i>结束时间不能为空</label></span>
              <span><label class="error" v-show="validData.endtimeLittleErr"><i class="fa fa-exclamation-circle"></i>开始时间不能早于结束时间</label></span>
              <span><label class="error" v-show="validData.endTimeLessThenNow"><i class="fa fa-exclamation-circle"></i>结束时间不能早于当前时间</label></span>
            </dd>
          </dl>
          <dl>
            <dt><i class="required">*</i>砍价模式：</dt>
            <dd>
              <ul class="ncsc-form-radio-list">
                <li><label  for="goods_free_1"><input type="radio" id="goods_free_1" name="goods_free" value="1" v-model="subData.activity_mode" />砍到底价才能买</label></li>
                <li><label for="goods_free_0"><input type="radio" id="goods_free_0" name="goods_free" value="0" v-model="subData.activity_mode" />无需砍到底价即可购买</label></li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt><i class="required">*</i>需砍次数：</dt>
            <dd>
              需要 <input id="max_join" name="max_join" type="text" class="text w60 mr5" v-model="subData.max_join" /> 个用户帮砍后才能砍到底价
              <span><label class="error" v-show="validData.storageErr"><i class="fa fa-exclamation-circle"></i>最低需砍次数不能少于2</label></span>
              <p class="hint mt10"></p>
            </dd>
          </dl>

    <dl>
      <dt><i class="required">*</i>商品：</dt>
      <dd>
        <p>
          <span class="tips">注：商品底价不得大于对外售价；砍价数量选择不限制，则该砍价活动为不限量砍价活动</span>
          <span><label class="error" v-show="validData.goodsErr"><i class="fa fa-exclamation-circle"></i>商品不能为空</label></span>
          <span><label class="error" v-show="validData.goodsPriceErr"><i class="fa fa-exclamation-circle"></i>{{goodsPriceErrTips}}</label></span>
          <span><label class="error" v-show="validData.goodsNumErr"><i class="fa fa-exclamation-circle"></i>{{goodsNumErrTips}}</label></span>
        </p>
        <div class="operate-bar">
          <label for="check_all_one_page2" class="mr10"><input type="checkbox" name="check_all_one_page2" @change="selectGoods($event,1)" v-model="selectPage" id="check_all_one_page2" data-id="check_all_one_page" >本页全选</label>
          <label for="check_all2" class="mr10"><input type="checkbox" name="check_all2" @change="selectGoods($event,2)" v-model="selectAll" id="check_all2" data-id="check_all">全部全选</label>
          <a href="javascript:void(0);" class="ncsc-btn-mini mr10" @click="remove()" id="batch_remove2" >移除</a>
          <a href="javascript:void(0);" class="ncsc-btn-mini" @click="setPrice()" id="batch_update2">批量设置商品底价</a>
          <a href="javascript:void(0);" class="ncsc-btn-mini" @click="setNum()" id="batch_update3">批量设置活动数量</a>
        </div>
        <div id="origin_goods">
          <table class="ncsc-default-table" >
            <thead>
            <tr>
              <th class="w20"></th>
              <th class="">商品名称</th>
              <th class="">原价(元)</th>
              <th class="">当前最低售价(元)</th>
              <th class="">商品底价(元)</th>
              <th class="w170">活动数量</th>
              <th class="">操作</th>
            </tr>
            </thead>
            <tbody nctype="bundling_data"  class="bd-line tip" >
            <tr  class="ui-state-disabled" v-show="goodsList.length === 0">
              <td colspan="20" class="norecord"><div class="no-promotion"><span>请添加商品</span></div></td>
            </tr>
            <tr v-for="(og,oi) in pageGoodsList" :class="[og.desc?'gray':'','item']">
              <td class="w20 handler"><input type="checkbox" @change="selectOne($event,oi)" v-model="og.selected"></td>
              <td class=" handler">
                <div class="info-box">
                  <div class="pic">
                    <a target="_blank"  @click="goodsDetail(og)"><img nctype="bundling_data_img"  :src="og.src" width="60" height="60"></a>
                  </div>
                  <div class="detail">
                    <p><a target="_blank"  @click="goodsDetail(og)">{{og.goods_name}}</a></p>
                    <p v-if="og.desc" class="c-orange mt5">{{og.desc}}</p>
                  </div>
                </div>
              </td>
              <td class=" handler" nctype="bundling_data_price">
                {{og.goods_marketprice}}
              </td>
              <td class=" handler">
                {{og.goods_price}}
              </td>
              <td class="">
                <input type="text" nctype="price" v-model="og.goods_floor_price" class="text w60">
              </td>
              <td class="">
                <select v-model="og.is_limit">
                  <option  value="0">不限制</option>
                  <option  value="1">限制</option>
                </select>
                <input type="text" nctype="price" v-model="og.goods_stock" class="text w50">
              </td>
              <td class="handle "><p><a href="javascript:void(0);" @click="removeOne(og)" class="ncsc-btn btn-remove">移除</a></p></td>
            </tr>
            </tbody>
          </table>

        </div>
        <ajax-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></ajax-pagination>
        <a v-show="!addGood" class="ncsc-btn ncsc-btn-orange-rim" @click="openAddGoodsDialog()">添加商品</a>
      </dd>
    </dl>
          <qm-dialog :dialogVisible="addGood" :width="'800px'" @close="addGood=false" :customClass="'phone-bind'">
            <template slot="title">添加商品</template>
            <template slot="content" >
              <qm-add-goods v-if="addGood"
                            :pageSize="8"
                            :showMorePrice="true"
                            :addTxt="'加入到活动商品中'"
                            :removeTxt="'从活动商品中移除'"
                            :goodsList="existGoods"
                            :showAddAllPage="true"
                            :source="'store_promotion_bundling'"
                            :borderNone = "true"
                            :excludeGoods = "excludeGoods"
                            @addOneGoods="addOneGoods($event)"
                            @addPageGoods="addPageGoods($event)"
                            @close="addGood = !addGood"
                            @removeOneGoods="removeOneGoods($event)"
              ></qm-add-goods>
            </template>
          </qm-dialog>
    <div class="bottom">
      <label class="submit-border"><input id="submit_button" @click="submit()" type="button"  value="提交" class="submit"></label>
    </div>
    </form>
  </div>
  </div>
    <qm-tips :tipsVisible="confirmPriceDialog" :width="'420px'" @update:tipsVisible="confirmPriceDialog = $event" :showCancel="false" @close="confirmPriceDialog = false"  @confirm="confirmPrice()">
      <template slot="title">修改设置商品底价</template>
      <template slot="content">
        <div id="set_act_price" >
          <div class="eject_con">
            <dl>
              <dt>商品底价</dt>
              <dd>
                <input placeholder="请输入需要设置的商品底价" id="set_act_price_input" v-model.number="setNewPrice" type="text" class="w230">
              </dd>
            </dl>
            <div style="display: block;text-align:left;margin-bottom: 10px;color: red;font-size: 12px;" class="error-txt mt20" >{{oldErr}}</div>
          </div>
        </div>
      </template>
    </qm-tips>
    <qm-tips :tipsVisible="confirmNumDialog" :width="'420px'" @update:tipsVisible="confirmNumDialog = $event" :showCancel="false" @close="confirmNumDialog = false"  @confirm="confirmNum()">
      <template slot="title">批量设置活动数量</template>
      <template slot="content">
        <div >
          <div class="eject_con">
            <dl>
              <dt style="width: 10em;">是否限制活动数量:</dt>
              <dd style="text-align: left">
                <input type="radio"  name="set_act_price" id="multi_set_act_price" v-model="setPriceMode" value="0" checked="checked"><label for="multi_set_act_price" class="mr10">不限制</label>
                <input type="radio" name="set_act_price" id="multi_set_act_discount" v-model="setPriceMode" value="1" ><label for="multi_set_act_discount">限制</label>
              </dd>
            </dl>
            <dl v-show="setPriceMode == 1">
              <dt style="width: 10em;">限制数量:</dt>
              <dd>
                <input v-model.number="setNewNum" type="text" class="w230">
              </dd>
            </dl>
            <div style="display: block;text-align:left;margin-bottom: 10px;color: red;font-size: 12px;" id="set_act_price_error" class="error-txt mt20" >{{oldErr}}</div>
          </div>
        </div>
      </template>
    </qm-tips>
  </div>
</template>

<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex';
  import {storePromotionBundling,storeSetting} from 'api'
  import storage from 'lib/utils/storage'
  import draggable from 'vuedraggable';
  import QmAddGoods from 'component/qm-add-goods/index';
  import QmDialogImg from "component/qm-dialog-img/index";
  import util from 'lib/utils/util';
  import QmDialog from 'component/qm-dialog/index';
  import QmTips from 'component/qm-tips/index';
  import AjaxPagination from 'component/ajax-pagination/index'
  import {cutAct} from "../../../../api";
  export default {
    name: "store-promotion-bundling-add",
    data() {
      return {
        errTips:'',
        files:[''],
        fileMax:false,
        goodsList:[],
        pageGoodsList:[],
        templates:[],
        goodsPriceErrTips:'',
        goodsNumErrTips:'',
        validData:{
          nameErr:false,
          startTimeErr:false,
          startTimeLessThenNow:false,
          endTimeLessThenNow:false,
          endtimeErr:false,
          endtimeLittleErr:false,
          goodsErr:false,
          goodsPriceErr:false,
          goodsNumErr:false,
        },
        subData:{
          activity_id:0,
          activity_name:'',
          start_time:'',
          end_time:'',
          activity_mode:0,
          max_join:2
        },
        pageParams:{
          pageIndex:0,
          pageSize:10,
          total:0
        },
        addGood:false, //是否显示添加商品
        selectPage:false,
        selectAll:false,
        excludeGoods:[],
        existGoods:[],
        confirmPriceDialog:false,
        confirmNumDialog:false,
        setPriceMode:0,
        setNewPrice:0,
        setNewNum:0,
      }
    },

    computed:{
      ...mapGetters({
        metaData:'getMetaData',
        imagePathConfig:'getImagePathConfig',
        ImageIp:'getImageIp',
      }),
      dragOptions() {
        return {
          animation: 200,
          disabled: false,
        };
      }
    },

    components:{
      QmAddGoods,
      QmDialogImg,
      QmDialog,
      AjaxPagination,
      QmTips
    },

    methods: {
      ...mapMutations('cutAct',{
        setUpdate: 'setUpdate',
        setPageIndex:'setPageIndex',
      }),
      openAddGoodsDialog() {
        // this.excludeGoods = _.clone(this.allGoodsList);
        this.excludeGoods = this.goodsList;
        this.existGoods = [];
        this.addGood = true;
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        //this.oldSelectPage = false;
        this.getPageGoods(this.pageParams);
        this.updateSelect()
      },
      resetGoods(type){
        if(type == 1) {
          let pageGoods = _.clone(this.pageGoodsList);
          pageGoods.forEach((item,i)=>{
            item.selected = false
          })
          this.pageGoodsList = pageGoods;
        }else{
          let goodsList = _.clone(this.goodsList);
          goodsList.forEach((item,i)=>{
            item.selected = false
          })
          this.goodsList = goodsList;
        }

      },
      selectGoods(event,type){
        this.resetGoods()
        this.selectPage = false;
        this.selectAll = false;
        if(event.target.checked) {
          if (type == 1) {
            this.selectPage = true;
            let pageGoods = _.clone(this.pageGoodsList);
            pageGoods.forEach((item, i) => {
              item.selected = true
            })
            this.pageGoodsList = pageGoods;
          } else {
            this.selectAll = true;
            this.setAllGoods()
          }
        }
      },
      remove(){
        var goods = []
        var has = false
        this.goodsList.forEach((item,i)=>{
          if(!item.selected){
            goods.push(item)
          }else{
            has = true
          }
        })
        this.goodsList = goods
      },
      setPrice(){
        if(!this.checkSelect()){
          layer.msg('请选择需要操作的商品')
          return
        }
        this.confirmPriceDialog = true
      },
      setNum(){
        if(!this.checkSelect()){
          layer.msg('请选择需要操作的商品')
          return
        }
        this.confirmNumDialog = true
      },
      confirmPrice(){
        let newPrice = util.number_format(this.setNewPrice,2)
        if(newPrice <= 0){
          layer.msg('底价必须大于0')
          return
        }
        let chk = true;
        for(var i = 0;i < this.goodsList.length;i++){
          let item = this.goodsList[i];
          if(item.selected){
            if(parseFloat(item.goods_price) < newPrice){
              layer.msg('第' +(i+1)+'个商品底价不能低于其销售价:'+item.goods_price+'元')
              chk = false;
              break;
            }
          }
        }

        if(chk){
          this.goodsList.forEach((item,i)=>{
            if(item.selected){
              item.goods_floor_price = newPrice
            }
          })
        }
        this.confirmPriceDialog = false;
      },
      confirmNum(){
        let newNum = parseInt(this.setNewNum)
        if(this.setPriceMode == 1 && newNum <= 0){
          layer.msg(' 限制活动数量的请输入大于0的整数')
          return;
        }
        this.goodsList.forEach((item,i)=>{
          if(item.selected){
            item.is_limit = this.setPriceMode;
            if(this.setPriceMode == 0){
              item.goods_stock = 0;
            }else{
              item.goods_stock = newNum;
            }
          }
        })
        this.confirmNumDialog = false;
      },
      checkFloorPrice(){
        for(var i = 0;i < this.goodsList.length;i++){
          let item = this.goodsList[i];
          if(parseFloat(item.goods_price) < parseFloat(item.goods_floor_price)){
            item.goods_floor_price = item.goods_price
          }
        }
      },
      checkSelect(){
        var has = false
        this.goodsList.forEach((item,i)=>{
          if(item.selected){
            has = true
          }
        })
        return has;
      },
      selectOne(event,i){
        var gs = _.clone(this.pageGoodsList)
        if(event.target.checked){
          gs[i].selected = true
        }else{
          gs[i].selected = false
          this.selectPage = false;
          this.selectAll = false;
        }
        this.pageGoodsList = gs
        this.updateSelect()
        //引用赋值 修改元素的值原来的goodsList也会被修改 所以不用再去同步
        //this.updateGoods()
      },
      setAllGoods(){
        let goodsList = _.clone(this.goodsList);
        goodsList.forEach((item,i)=>{
          goodsList[i].selected = true
        })
        this.goodsList = goodsList;
      },
      resetGoods(type){
        if(type == 1) {
          let pageGoodsList = _.clone(this.pageGoodsList);
          pageGoodsList.forEach((item,i)=>{
            item.selected = false
          })
          this.pageGoodsList = pageGoodsList;
        }else{
          let goodsList = _.clone(this.goodsList);
          goodsList.forEach((item,i)=>{
            item.selected = false
          })
          this.goodsList = goodsList;
        }

      },
      existRemoveOne(g){
        this.existGoods.forEach((item,i)=>{
          if(item.goods_id == g.goods_id){
            this.existGoods.splice(i,1)
          }
        })
      },
      goodsDetail(item) {
        if(item.desc === '已删除') {
          util.msg('商品不存在');
          return;
        }
        storage.set('goods_route_name',this.$route.name);
        let routeData = this.$router.resolve({
          name:"store_goods_add_step_two",
          params:{commonId:item.goods_commonid}
        });
        window.open(routeData.href, '_blank');
      },
      addOneGoods(event){
        var tmp_goods = _.clone(event)
        tmp_goods.goods_floor_price = 0
        tmp_goods.goods_stock = 0
        tmp_goods.is_limit = 0
        this.existGoods.push(event);
        this.goodsList.push(tmp_goods)
      },
      addPageGoods(event){
        event.forEach((item,i)=>{
          if(!item.isExist){
            this.addOneGoods(item)
          }
        })
      },
      removeOne(good){
        this.existRemoveOne(good)
        this.updateGoods(good.goods_id)
      },
      removeOneGoods(event){
        this.removeOne(event.good)
        this.existRemoveOne(event.good)
      },
      updateGoods(goods_id){
        var newList = _.clone(this.goodsList);
        newList.forEach((goods,gs)=>{
          if(goods.goods_id == goods_id){
            newList.splice(gs,1);
          }
        })
        this.goodsList = newList;
      },
      updateSelect(){
        if(this.pageGoodsList.length == 0){
          this.selectPage = false;
          this.selectAll = false;
          return;
        }
        let pageSelect = true
        let allSelect = true
        this.pageGoodsList.forEach((goods,gs)=>{
          if(!goods.selected){
            pageSelect = false;
          }
        })
        this.selectPage = pageSelect;
        this.goodsList.forEach((goods,gs)=>{
          if(!goods.selected){
            allSelect = false;
          }
        })
        this.selectAll = allSelect;
        if(this.selectAll){
        //  this.selectPage = false;
        }
      },
      getPageGoods()
      {
        var origins = _.clone(this.goodsList)
        var olds = []
        var count = 0
        var start = this.pageParams.pageIndex * 10;
        var index = 0;
        origins.forEach((item,i)=>{
          if(index >= start && count < 10){
            olds[count] = item
            count++
          }
          index++;
        })
        if(olds.length == 0 && this.pageParams.pageIndex > 0){
          this.pageParams.pageIndex -= 1
          this.getPageGoods()
          return;
        }
        this.pageGoodsList = _.clone(olds)
        var newPageParams = _.clone(this.pageParams)
        //newPageParams.total = origins.length;
        newPageParams.total = index;
        this.pageParams = newPageParams;
      },
      getData(){
        var data ={
          activity_id:this.subData.activity_id
        }
        cutAct.getDetail(data).then((res)=>{
          if(res.goods.length > 0){
            res.goods.forEach((item,i)=>{
              this.existGoods.push(item);
            })
            this.goodsList = res.goods
          }
          this.subData.activity_name = res.info.activity_name;
          this.subData.start_time = res.info.start_time;
          this.subData.end_time = res.info.end_time;
          this.subData.activity_mode = res.info.activity_mode;
          this.subData.max_join = res.info.max_join;
        })
      },
      submit(){
        var validRes = true
        if(this.subData.activity_name == ''){
          this.validData.nameErr = true
          $("#activity_name").focus();
          return false;
        }
        if(this.subData.activity_id == 0){
            let currentTime  = Date.now()
            currentTime -= currentTime % (60 * 1000)
            console.log(currentTime);
            if(new Date(this.subData.start_time.replace(/-/g, '/')).getTime() < currentTime) {
                this.validData.startTimeLessThenNow = true;
                $("#start_time").focus();
                return false;
            }
            if(new Date(this.subData.end_time.replace(/-/g, '/')).getTime() < currentTime) {
                this.validData.endTimeLessThenNow = true;
                $("#end_time").focus();
                return false;
            }
        }
        if(this.subData.start_time >= this.subData.end_time){
          this.validData.endtimeLittleErr = true;
          $("#end_time").focus();
          return false;
        }
        if(this.goodsList.length <= 0){
          this.validData.goodsErr = true
          return false;
        }else{
          this.validData.goodsErr = false
        }
        if(!(/^[1-9]\d*$/.test(this.subData.max_join)) || this.subData.max_join==null || this.subData.max_join=='' || this.subData.max_join<2){
            this.validData.storageErr = true
            $('#max_join').focus();
            return false;
        }
        this.validData.goodsPriceErr = false;
        this.validData.goodsNumErr = false;
        this.goodsList.forEach((item,i) => {
          if(parseFloat(item.goods_floor_price) <= 0){
            this.goodsPriceErrTips ='商品底价必须大于0'
            this.validData.goodsPriceErr = true;
            return false;
          }
          if(parseFloat(item.goods_price) < parseFloat(item.goods_floor_price)){
            this.goodsPriceErrTips ='商品底价不能大于最低售价'
            this.validData.goodsPriceErr = true;
            return false;
          }
          if(item.is_limit == 1 && item.goods_stock <= 0){
            this.goodsNumErrTips ='限制数量的商品必须设置活动数量'
            this.validData.goodsNumErr = true;
            return false;
          }
        });
        Object.values(this.validData).forEach((item,i) => {
          if(item){
            validRes = false
          }
        })
        if(validRes) {

          var subGoods = []
          this.goodsList.forEach(function(g,k){
            subGoods.push({goods_id:g.goods_id,goods_floor_price:g.goods_floor_price,goods_stock:g.goods_stock})
          })
          var data = {
            ...this.subData,
            goods:subGoods
          }
          cutAct.activityEdit(data).then((res)=>{
            util.msg(res.shortMessage);
            if(res.resultCode === 1){
              this.$router.push('/promotion/cut_act/index')
              if(this.subData.activity_id == 0 ){
                this.setPageIndex(0);
              }
              this.setUpdate(true);
            }
          });
        }
      },

    },
    watch:{
        subData:{
          handler: function () {
            if(this.subData.activity_name !== ''){
              this.validData.nameErr = false
            }
            let currentTime  = Date.now()
            currentTime -= currentTime % (60 * 1000)
            if(this.subData.start_time != '' && this.subData.activity_id == 0) {
                if(new Date(this.subData.start_time.replace(/-/g, '/')).getTime() < currentTime) {
                    this.validData.startTimeLessThenNow = true;
                }else{
                    this.validData.startTimeLessThenNow = false;
                }
            }
            if(this.subData.end_time != ''){
                if(new Date(this.subData.end_time.replace(/-/g, '/')).getTime() < currentTime) {
                    if(this.subData.activity_id == 0){
                        this.validData.endTimeLessThenNow = true;
                    }
                }else{
                    this.validData.endTimeLessThenNow = false;
                    if(this.subData.start_time >= this.subData.end_time){
                        this.validData.endtimeLittleErr = true
                    }else{
                        this.validData.endtimeLittleErr = false
                    }
                }
            }

            if(this.goodsList.length > 0){
              this.validData.goodsErr = false
            }
            if(!(/^[1-9]\d*$/.test(this.subData.max_join)) && this.subData.max_join>=2){
              this.validData.storageErr = false
            }
          },
          deep: true
        },
      goodsList:{
        handler: function () {
          this.getPageGoods()
          this.updateSelect()
          this.checkFloorPrice()
        },
        deep:true
      }
    },
    mounted () {
      if(this.$route.params.hasOwnProperty('id') && this.$route.params.id > 0 ) {
        this.subData.activity_id = this.$route.params.id
      }

      var _self = this;
      layui.use('layer', function(){
        this.layer = layui.layer;
      });
      layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
          elem: '#start_time',
          theme: "grid",
          type:'datetime',
          format:'yyyy-MM-dd HH:mm:ss',
          trigger:'click',
          done:function(data){
            _self.validData.startTimeErr = false
            _self.subData.start_time = data
          }
        });
        laydate.render({
          elem: '#end_time',
          theme: "grid",
          type:'datetime',
          format:'yyyy-MM-dd HH:mm:ss',
          trigger:'click',
          done:function(data){
            _self.validData.endtimeErr = false
            _self.subData.end_time = data
          }
        });

      })
      if(this.subData.activity_id > 0){
        this.getData()
      }
    },
    updated(){
    }
  }
</script>
