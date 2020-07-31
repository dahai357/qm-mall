<style scoped>
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"] {
    -moz-appearance: textfield;
}
.qm-store-class-base{
  padding:30px 0 0 0;
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
th {
  text-align: left;
  color: #212121;
  font: 14px/1.5 "Microsoft Yahei", "PingFang SC", "ST Heiti", SimHei, sans-serif, "Helvetica Neue", Tahoma;
}
.ncsc-table-spec2 {
  border: 1px solid #dbdbdb;
  border-collapse: separate;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
}
.ncsc-table-spec2 tr th:first-child {
  border-left: none;
}
.ncsc-table-spec2 td {
  width: 35%;
}
.ncsc-table-spec2 td, .ncsc-table-spec2 th {
  border-top: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  text-align: left;
  padding: 10px;
  font-size: 14px;
  vertical-align: top;
}
table td, table th {
  word-break: break-all;
}
.ncsc-table-spec2 tr:first-child th, .ncsc-table-spec2 tr:first-child td {
  border-top: none;
}
.ncsc-form-default .plist-seller {
  margin-top: -5px;
}
.plist-man {
  overflow: hidden;
  overflow-y: auto;
  max-height: 260px;
}
.plist-man img {
  width: 26px;
  height: 26px;
  border-radius: 100%;
  margin-right: 6px;
  display: inline-block;
  vertical-align: middle;
}
.plist-man .name {
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.plist-seller .name {
  max-width: none;
  width: 120px;
  line-height: 30px;
}
.plist-seller-ex2 .name {
  width: auto;
}
.plist-man .name {
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.plist-man li {
  float: left;
  padding: 5px 0;
}
.plist-seller li {
  width: 25%;
  /*padding: 5px 1% 5px 0;*/
}
.plist-seller-ex2 li {
  width: auto;
  padding-bottom: 0;
}
.plist-seller-dialog {
    max-height: 160px;
    overflow-y: auto;
}
.plist-seller-dialog li {
    width: 25%;
    /*padding: 5px 1% 5px 0;*/
}
.plist-seller-dialog .name {
    max-width: none;
    width: 65px;
    line-height: 30px;
}
.plist-man .disabled input {
    display: none;
}
.cancel-btn-orange{
    border-color: #ff8519;
    color:#ff8519;
}
.cancel-btn-orange:hover {
    background: #ff8519;
}
.select-salesman-txt{
    vertical-align: middle;
    display: inline-block
}
.manage-sale tr td{
    padding: 10px;
}
.manage-sale-btn {
    color:#ff8519;
    padding-left: 5px;
}
.manage-sale-btn:first-child{
    padding-left: 0;
}
.manage-sale tr td input{
    height: 25px;
}
.manage-sale .pagination {
    margin-top: 0;
}
.del-salesman {
    width: 13px;
    height: 13px;
    border-radius: 100%;
    display: inline-block;
    vertical-align: middle;
    background: red;
    position: relative;
    margin: 5px 5px 0 0;
    cursor: pointer;
}
.del-salesman .del-salesman-txt {
    color: white;
    font-weight: bold;
    position: absolute;
    top:-9px;
    left: 4px;
}
.area{margin-bottom: 30px;}
.area .area-hd{overflow: hidden; padding: 0 20px; line-height:2;}
.area .area-hd .area-title{ display: inline-block;vertical-align: middle;color:#ff8519}
.area .area-hd .area-collapse{ display: inline-block; vertical-align: middle; margin: 0 0 3px 5px;}
.area .area-hd .area-collapse i{ color:#ff8519}
.area .area-bd{padding: 20px 0;}
.sale-act-edit .ncsc-mod-section .ncsc-mod-bd{ padding: 20px 0;}

.plist-seller .search-box-s {
  width: 120px;
  display: inline-block;
  vertical-align: middle;
}
.search-box .search-txt {
  height: 36px;
  line-height: 20px;
  padding: 8px 120px 8px 20px;
  width: 100%;
  background: none;
  border: none;
  outline: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.search-box {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #ddd;
  line-height: 20px;
  border-radius: 5px;
}
.search-box .btn-search {
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  width: 100px;
  color: #fff;
  background: #4d4d4d;
  line-height: 40px;
  border: none;
  outline: none;
  padding: 0;
  font-size: 16px;
  border-radius: 0;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
.search-box-s .btn-search {
  line-height: 30px;
  font-size: 14px;
  width: 50px;
}
.search-box-s {
  padding: 1px 0 1px 1px;
}
.search-box-s{ padding:1px 0 1px 1px; }
.search-box-s .search-txt{ height: 28px; padding: 4px 50px 4px 10px;}
.search-box-s .btn-search{ line-height: 30px; font-size: 14px; width: 50px;}

.ncsc-form-default dl {
  position: relative;
  top: 30px;
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
  padding:15px 0;
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

.ncsc-form-default .ncsc-form-tit{
  font-size: 14px!important;
}
.ncsc-default-table th, .ncsc-default-table td ,td{
  vertical-align: top;
  font-size: 14px;
  height: 20px;
  text-align: center
}

.ncsc-default-table th {
  background: #f9f9f9;
  padding: 10px;
  text-align: center;

}
.ncsc-default-table th:nth-child(2){
  text-align: left;

}


.ncsc-default-table td,td {
  border-bottom: 1px solid #eee;
  padding: 20px 2px;
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

tr a:hover {
  color: #ff8519;
}
.ncsc-btn.btn-remove:hover{
  color:#ff8519
}
.ncsc-default-table td .pic-thumb{
  height: unset;
}
.ncsc-default-table td .pic-thumb img{
  height: unset;
}
.pop-category-used{
    position: absolute;
     width: 100%; box-sizing: border-box;  border:1px solid #ddd; z-index:
        500; background: #fff; border-radius:5px; max-height: 302px; overflow-y: auto;}
.list-category2 li{ font-size: 12px; padding:0 10px;  position: relative; box-sizing: border-box; line-height: 2;}
.list-category2 li:first-child{ border:none;}
.list-category2 li:hover{ cursor: pointer; background:#f5f5f5;}
.list-category2 .btn-del{ display: block; height: 20px; line-height: 20px; width: 20px; text-align: center; font-family: SimSun; color:#333; position: absolute; top: 50%; margin-top: -10px; right: 10px;}
.list-category2 .btn-del:hover{text-decoration: none; color: #ff8519;}
.list-category-used li{ line-height: 29px; border-top:1px dashed  #ddd;}
.test-5::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.test-5::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius   : 10px;
    background-color: skyblue;
   /* background-image: -webkit-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
    );*/
}
.test-5::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #ededed;
    border-radius: 10px;
}
.bottom .backup {
    background: #fff;
    color:#ff8519;
    border: 1px solid #ff8519;
}
.no-promotion {
    color: #757575;
    padding: 50px 0;
    line-height: 20px;
    text-align: center;
}
.add-goods-step li:first-child {
    padding: 0 20px 0 0;
}
.sale-act-search-container {
    margin-left: 0;
}
.sale-configure-goods-txt {
    font-size:16px;
    color:#D4D4D4;
}
.wb-ba {
    word-break: break-all
}
 .div-goods-select-box .div-goods-select {
    margin-bottom: 0;
    padding-bottom: 0;
}
.sale-alert-dialog-pagination .pagination {
    margin-top: 0;
}
.sale-alert-dialog-bottom {
    margin-top: 0;
}
  .tips{
    font-size: 14px;
    line-height: 20px;
  }
.w170{
  width: 170px;
}
.w60{
  width: 60px;

}
.w70{
  width: 70px;
}

.w220{
  width: 220px!important;
  text-align: left;
}
.w90{
  width: 90px!important;

}
.info-box .pic{
  padding-right: 2px;
}
#new_add_wrapper dd, #new_add_wrapper dt, #origin_goods_wrapper dd, #origin_goods_wrapper dt{
  padding: 0!important;
}
.mt10{
  margin-top: 10px;
}
</style>
<template>
  <div class="qm-store-class-base">
    <template v-if="editFlag === 0">
      <div class="ncsc-form-default">
        <table class="ncsc-table-spec2 mb30 mt30">
          <tbody>
          <tr>
            <th>活动标题</th>
            <td>{{saleActInfo.sale_title}}</td>
            <th>活动状态</th>
            <td>已结束</td>
          </tr>
          <tr>
            <th>开始时间</th>
            <td>{{saleActInfo.sale_start_date}}</td>
            <th>结束时间</th>
            <td>{{saleActInfo.sale_end_date}}</td>
          </tr>
          <tr v-if="saleActInfo.sale_act_describe">
            <th>活动描述</th>
            <td colspan="3">{{saleActInfo.sale_act_describe}}</td>
          </tr>
          <tr>
            <th>销售员</th>
            <td colspan="3">
              <ul class="plist-man plist-seller plist-seller-ex2">
                <li v-for="(man,i) in salesmanList" v-if="man.checked">
                  <img :src="man.member_avatar" alt="">
                  <span class="name">{{man.member_name}}</span>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>首页</th>
            <td colspan="3">
              {{saleActInfo.is_show_hot?'展示' : '不展示'}}
            </td>
          </tr>
          <tr>
              <th>优惠券</th>
              <td colspan="3">
                  {{saleActInfo.coupon_flag?'允许使用优惠券' : '不允许使用优惠券'}}
              </td>
          </tr>
          </tbody>
        </table>
        <table class="ncsc-default-table">
          <thead>
          <tr>
            <th colspan="2">商品名称</th>
            <th class="w90">原价</th>
            <th class="w90">售价</th>
            <th class="w90">活动折扣</th>
            <th class="w100">活动价</th>
            <th class="w100">单品返利(元)</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="goods in goodsList">
            <td><div class="pic-thumb"><img  :src="goods.src" width="60" height="60"></div></td>
            <td><a @click="goodsDetail(goods)">{{goods.goods_name}}{{goods.desc}}</a></td>
            <td>{{goods.goods_marketprice}}</td>
            <td>{{goods.goods_price}}</td>
            <td>{{goods.discount_price|discount(goods.goods_marketprice)}}</td>
            <td>{{goods.discount_price}}</td>
            <td>{{goods.rebate_amount}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template v-else>

<div class="ncsc-form-default sale-act-edit" style="top:0px">
    <dl v-if="steps.length > 0">
        <dt></dt>
        <dd><qm-step :steps="steps" :stepIndex="stepIndex"></qm-step></dd>
    </dl>

    <form id="post_form"  method="post">
        <template v-if="pageType == 1 || pageType == 2">
            <div class="ncsc-mod-section" v-show="stepIndex == 1">
                <!--<div class="ncsc-mod-hd" onselectstart="return false;">-->
                <!--<div class="ncsc-title">活动基本信息</div>-->
                <!--<div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section"><i @click="collapse_1=!collapse_1" :class="['fa',collapse_1?'fa-angle-down':'fa-angle-up']"></i></div>-->
                <!--</div>-->
                <div class="ncsc-mod-bd" v-show="!collapse_1">
                    <dl id="titleShowArea">
                        <dt><i colspan="2" class="required">*</i>活动标题：</dt>
                        <dd >
                            <!--<input  autocomplete="off" @blur="blurSearchTitle"  id="sale_title" name="sale_title" type="text"  v-model.trim="saleActInfo.sale_title" maxlength="50" class="text w400" @input="searchTitle"/>-->
                            <input  autocomplete="off"  id="sale_title"  type="text"  v-model.trim="saleActInfo.sale_title" maxlength="50" class="text w400" />
                            <!-- v-if="!sale_act_id" -->
                            <a class="c-blue" @click="openSelectActDialog"  v-if="!this.sale_act_id">复制活动</a>
                            <span><label class="error" v-show="validData.saleTitleErr"><i class="fa fa-exclamation-circle"></i>活动名称不能为空</label></span>
                            <br/>
                            <!--<div  maxlength="50" class="text w400 pop-category-used"   id="pop_category_used" v-show="showSelectTile" v-bind:style="{marginTop:useMarginTop}">-->
                                <!--<ul id="select_title_ul" @mouseover="mouseOver" @mouseleave="mouseLeave" class="list-category2 list-category-used" v-bind:style="{overflowY:selectTitleOverflow}"  style="max-height: 295px">-->
                                    <!--<li v-for="(item,i) in list" @click="selectTitle(item.sale_act_id,item.sale_title)">-->
                                        <!--<a class="text">{{item.sale_title}}</a>-->
                                    <!--</li>-->
                                    <!--&lt;!&ndash;li style="text-align: center" id="loading-text">-->
                                        <!--下滑加载更多-->
                                    <!--</li&ndash;&gt;-->
                                <!--</ul>-->
                            <!--</div>-->

                        </dd>
                    </dl>
                    <dl>
                        <dt>活动描述：</dt>
                        <dd>
                            <input id="sale_act_describe"  type="text"  maxlength="30" class="text w400" v-model.trim="saleActInfo.sale_act_describe"/>

                            <p class="hint">活动描述是商家对限时折扣活动的补充说明文字，最多可输入30个字符。</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt><i class="required">*</i>开始时间：</dt>
                        <dd>
                            <input id="start_date" v-model="saleActInfo.sale_start_date" type="text" class="input-add-on w150"  readonly="readonly">
                            <label class="add-on mr5"><i class="fa fa-calendar icon-calendar"></i></label>
                            <span><label class="error" v-show="validData.startDateErr"><i class="fa fa-exclamation-circle"></i>开始时间不能为空</label></span>
                        </dd>
                    </dl>
                    <dl>
                        <dt><i class="required">*</i>结束时间：</dt>
                        <dd>
                            <input id="end_date" v-model="saleActInfo.sale_end_date" type="text" class="input-add-on w150"  readonly="readonly">
                            <label class="add-on mr5"><i class="fa fa-calendar icon-calendar"></i></label>
                            <span><label class="error" v-show="validData.endDateErr"><i class="fa fa-exclamation-circle"></i>结束时间不能为空</label></span>
                            <span><label class="error" v-show="validData.endDateLittleErr"><i class="fa fa-exclamation-circle"></i>开始时间不能晚于结束时间</label></span>
                            <span><label class="error" v-show="validData.endDateLittleNowErr"><i class="fa fa-exclamation-circle"></i>结束时间不得早于当前时间</label></span>
                        </dd>
                    </dl>
                    <dl>
                        <dt><i class="required">*</i>首页：</dt>
                        <dd>
                            <label>
                                <input type="radio"  value="1" v-model="saleActInfo.is_show_hot" />
                                展示
                            </label>
                            <el-tooltip placement="right" effect="light" popper-class="atooltip">
                                <div slot="content" class="toolTipCont">
                                    <div class="tip-doubt-con"><img src="@/assets/images/banner-xsyzsrxzq.jpg" alt=""></div>
                                </div>
                                <p class="lightBlue">
                                    <i class="fa fa-question-circle" aria-hidden="true"></i>示例
                                </p>
                            </el-tooltip>
                            <label>
                                <input type="radio"  value="0" v-model="saleActInfo.is_show_hot" />
                                不展示
                            </label>
                            <span><label class="error" v-show="validData.showHotErr"><i class="fa fa-exclamation-circle"></i>请设置是否在首页展示</label></span>
                            <p class="hint">展示：买家扫描分销活动码进店时，活动商品展示在店铺首页热销专区；否则不展示</p>
                        </dd>
                    </dl>

                    <dl>
                        <dt><i class="required">*</i>优惠券：</dt>
                        <dd>
                            <label>
                                <input type="radio" name="coupon_flag" value="1" v-model="saleActInfo.coupon_flag" />
                                允许使用优惠券
                            </label>
                            <label>
                                <input type="radio" name="coupon_flag" value="0" v-model="saleActInfo.coupon_flag" />
                                不允许使用优惠券
                            </label>
                            <p class="hint" v-if="saleActInfo.coupon_flag">当前设置销售员活动允许使用优惠券，即订单包含销售员价格商品时仍可继续使用优惠券</p>
                        </dd>
                    </dl>
                </div>
                <div class="bottom">
                    <label class="submit-border"><input  @click="submitOne()" type="button"  :value="'下一步，'+ (pageType == 2 ? '编辑':'配置')+'活动商品'" class="submit"></label>
                </div>
            </div>
            <div class="ncsc-mod-section" v-show="stepIndex == 2">
                <!--<div class="ncsc-mod-hd" onselectstart="return false;">-->
                <!--<div class="ncsc-title">活动商品</div>-->
                <!--<div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section"><i @click="collapse_3=!collapse_3" :class="['fa',collapse_3?'fa-angle-down':'fa-angle-up']"></i></div>-->
                <!--</div>-->
                <div class="ncsc-mod-bd" style="padding: 20px 10px" v-show="!(sale_act_id == 0 && newGoodsList.length == 0)">
                    <div class="sale-act-search-container">
                        <div v-if="sale_act_id>0 && newGoodsList.length > 0 && goodsList.length > 0" style="margin-bottom: 10px;">
                            <a  :class="['ncsc-btn',goodsType == 1 ? 'ncsc-btn-orange-rim' : '']" @click="goodsTypeChange(1)">原活动商品</a>
                            <a  :class="['ncsc-btn',goodsType == 2 ? 'ncsc-btn-orange-rim' : '']" @click="goodsTypeChange(2)">新增商品</a>
                        </div>
                        <div>
                            <span class="ncsc-form-tit">商品分类</span>
                            <select @change="changeSecondClass($event)" v-model="temp_gc_id_2">
                                <option value="0">请选择二级分类</option>
                                <option :value="second.gc_id" v-for="(second,sc) in secondShowClass">{{second.gc_name}}</option>
                            </select>
                            <select v-model="temp_gc_id_3" class="mr5" @change="changeThirdClass($event)">
                                <option value="0">请选择三级分类</option>
                                <option :value="third.gc_id" v-for="(third,sc) in thirdShowClass">{{third.gc_name}}</option>
                            </select>
                            <input  type="text" class="ncsc-form-control w240" placeholder="输入商品名称快速搜索已设置的活动商品" v-model="tempGoodsKeyword" @keyup.enter="goodsSearch">
                            <select v-model="rangeType">
                                <option value="1">活动价</option>
                                <option value="2">库存</option>
                                <option value="3">单品返利</option>
                                <option value="4">活动折扣</option>
                                <option value="5">原价</option>
                                <option value="6">售价</option>
                            </select>
                            <input type="number" step="0.01" class="w70" v-model="tempRangeKeyword1"> - <input type="number" step="0.01"  class="w70" v-model="tempRangeKeyword2">
                        </div>
                        <div class="mt10">
                            <span class="ncsc-form-tit">商品状态</span>
                            <select v-model="goodsStateType">
                                <option value="1">全部</option>
                                <option value="2">正常</option>
                                <option value="3">已下架</option>
                                <option value="4">已删除</option>
                                <option value="5">无库存</option>
                            </select>
                            <a  class="ncsc-btn ncsc-btn-orange-rim" @click="goodsSearch">搜索</a>
                            <a  class="ncsc-btn ncsc-btn-orange-rim" v-show="cancelBtnShow" @click="cancelGoodsSearch">撤销检索</a>
                            <!--<a  class="ncsc-btn ncsc-btn-orange fr" @click="openAddGoodsDialog">+&nbsp;继续添加商品</a>-->
                        </div>
                        <!--<div class="mt10"><a  class="ncsc-btn ncsc-btn-orange fr" @click="openAddGoodsDialog">+&nbsp;继续添加商品</a></div>-->
                    </div>
                    <div class="area" id="origin_goods_wrapper" v-if="sale_act_id>0 && (goodsType == 1 || newGoodsList.length == 0)">
                        <!--<div class="area-hd" onselectstart="return false;">-->
                        <!--<div class="area-title"><i class="required">*</i>原活动商品</div>-->
                        <!--<div class="area-collapse js-collapse" data-target=".area-bd" data-wrap=".area"><i  @click="collapse_4=!collapse_4" :class="['fa',collapse_4?'fa-angle-down':'fa-angle-up']"></i></div>-->
                        <!--</div>-->
                        <div  v-show="!collapse_4">
                            <dl>
                                <dt style="width:6%"><i class="required">*</i>商品：</dt>
                                <dd>
                                    <div class="operate-bar" style="padding-top: 0">
                                        <label for="check_all_one_page2" class="mr10"><input type="checkbox"  @change="updateOldGoods($event,1)" v-model="oldSelectPage" id="check_all_one_page2" data-id="check_all_one_page" >本页全选</label>
                                        <label for="check_all2" class="mr10"><input type="checkbox"  @change="updateOldGoods($event,2)" v-model="oldSelectAll" id="check_all2" data-id="check_all">全部全选</label>
                                        <a href="javascript:void(0);" class="ncsc-btn-mini mr10" @click="oldRemove()" id="batch_remove2">移除</a>
                                        <a href="javascript:void(0);" class="ncsc-btn-mini" @click="oldSetPrice()" id="batch_update2">批量修改活动价</a>
                                        <a href="javascript:void(0);" class="ncsc-btn-mini" @click="oldSetRebate()">批量设置返利</a>
                                        <a  class="ncsc-btn ncsc-btn-orange fr" @click="openAddGoodsDialog">+&nbsp;继续添加商品</a>
                                    </div>
                                    <div class="c-red fs12 mb10 ml10">
                                        <div style="line-height: 20px">
                                            <p>注意事项：请注意平衡活动价/售价/会员价三者之间的价格梯度，</p>
                                            <div style="margin-left: 60px">
                                                <p>会员价一旦低于活动价，则会出现参与分销活动的会员选择按照会员价购买；为保证商家的利益，平台默认此单不计入分销员推广收益。</p>
                                                <p>请谨慎设置！</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="origin_goods">
                                        <table class="ncsc-default-table">
                                            <thead>
                                            <tr>
                                                <th class="w40"></th>
                                                <th class="w180">商品名称</th>
                                                <th class="w90"><a href="javascript:;" :class="[sortType == 'goodsMarketPrice1'&& sort==0? 'sort-up' : '',sortType == 'goodsMarketPrice1'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsMarketPrice1')">
                                                    原价(元)
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th class="w90"><a href="javascript:;" :class="[sortType == 'goodsPrice1'&& sort==0? 'sort-up' : '',sortType == 'goodsPrice1'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsPrice1')">
                                                    售价(元)
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th class="w70"><a href="javascript:;" :class="[sortType == 'goodsStorage1'&& sort==0? 'sort-up' : '',sortType == 'goodsStorage1'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsStorage1')">
                                                    库存
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th class="w100"><a href="javascript:;" :class="[sortType == 'goodsDiscount1'&& sort==0? 'sort-up' : '',sortType == 'goodsDiscount1'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsDiscount1')">
                                                    活动折扣
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th class="w110"><a href="javascript:;" :class="[sortType == 'discountPrice1'&& sort==0? 'sort-up' : '',sortType == 'discountPrice1'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('discountPrice1')">
                                                    活动价(元)
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th class="w120"><a href="javascript:;" :class="[sortType == 'rebateAmount1'&& sort==0? 'sort-up' : '',sortType == 'rebateAmount1'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('rebateAmount1')">
                                                    单品返利(元)
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody   class="bd-line tip" >
                                            <tr  class="ui-state-disabled" v-show="oldGoodsList.length === 0">
                                                <td colspan="20" class="norecord"><div class="no-promotion"><span>{{cancelBtnShow ? '暂无符合条件的搜索记录' : '请添加商品'}}</span></div></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <tbody>
                                        <draggable handle=".handler" v-model="oldGoodsList" v-bind="dragOptions" class="mb30" ghost-class="ghost" draggable=".item" @change="itemDraggable($event)" >
                                            <tr v-for="(og,oi) in oldGoodsList" :class="[og.can_not_edit?'gray':'','item']">
                                                <td class="w40 handler"><input type="checkbox" @change="oldSelectOne($event,oi)" v-model="og.selected"></td>
                                                <td class="handler w180" style="text-align: left">
                                                    <div class="info-box">
                                                        <div class="pic">
                                                            <a target="_blank"  @click="goodsDetail(og)"><img   :src="og.src" width="60" height="60"></a>
                                                        </div>
                                                        <div class="detail">
                                                            <p><a target="_blank"  @click="goodsDetail(og)">{{og.goods_name}}</a></p>
                                                            <p v-if="og.desc" class="c-orange mt5">{{og.desc}}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="handler w90 wb-ba">
                                                    {{og.goods_marketprice}}
                                                </td>
                                                <td class="handler w90 wb-ba">
                                                    {{og.goods_price}}
                                                </td>
                                                <td class="w70 wb-ba">{{og.goods_storage}}</td>
                                                <td class="w100 wb-ba">{{og.discount_price|discount(og.goods_marketprice)}}</td>
                                                <td class="w110">
                                                    <p v-if="og.can_not_edit">{{og.discount_price}}</p>
                                                    <input :type="og.can_not_edit?'hidden':'number'" step="0.01" nctype="price" v-model="og.discount_price" class="text w90">
                                                </td>
                                                <td class="w120">
                                                    <p v-if="og.can_not_edit">{{og.rebate_amount}}</p>
                                                    <input :type="og.can_not_edit?'hidden':'number'" step="0.01" nctype="price" v-model="og.rebate_amount" class="text w90">
                                                </td>
                                                <td class="handle"><p><a href="javascript:void(0);" @click="oldRemoveOne(og)"  class="ncsc-btn btn-remove">移除</a></p></td>
                                            </tr>
                                        </draggable>
                                        </tbody>
                                    </div>
                                    <ajax-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></ajax-pagination>
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div class="area" id="new_add_wrapper" v-show="!(sale_act_id>0 && (goodsType == 1 || newGoodsList.length == 0))">
                        <!--<div class="area-hd" onselectstart="return false;" v-show="sale_act_id > 0">-->
                        <!--<div class="area-title"><i class="required">*</i>本次新增商品</div>-->
                        <!--<div class="area-collapse js-collapse" data-target=".area-bd" data-wrap=".area"><i  @click="collapse_5=!collapse_5" :class="['fa',collapse_5?'fa-angle-down':'fa-angle-up']"></i></div>-->
                        <!--</div>-->
                        <div v-show="!collapse_5">
                            <dl>
                                <dt style="width:6%"><template><i class="required">*</i>商品：</template></dt>
                                <dd>
                                    <div class="operate-bar" style="padding-top: 0">
                                        <label for="check_all_one_page" class="mr10"><input type="checkbox" @change="selectNewGoods($event,1)" v-model="newSelectPage" id="check_all_one_page" data-id="check_all_one_page" >本页全选</label>
                                        <label for="check_all" class="mr10"><input type="checkbox" @change="selectNewGoods($event,2)" v-model="newSelectAll" id="check_all" data-id="check_all">全部全选</label>
                                        <a href="javascript:void(0);" class="ncsc-btn-mini mr10" @click="newRemove()" id="batch_remove">移除</a>
                                        <a href="javascript:void(0);" class="ncsc-btn-mini" @click="newSetPrice()" id="batch_update">批量修改活动价</a>
                                        <a href="javascript:void(0);" class="ncsc-btn-mini" @click="newSetRebate()">批量设置返利</a>
                                        <a  class="ncsc-btn ncsc-btn-orange fr" @click="openAddGoodsDialog">+&nbsp;继续添加商品</a>
                                    </div>
                                    <div class="c-red fs12 mb10 ml10">
                                        <div style="line-height: 20px">
                                            <p>注意事项：请注意平衡活动价/售价/会员价三者之间的价格梯度，</p>
                                            <div style="margin-left: 60px">
                                                <p>会员价一旦低于活动价，则会出现参与分销活动的会员选择按照会员价购买；为保证商家的利益，平台默认此单不计入分销员推广收益。</p>
                                                <p>请谨慎设置！</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="new_add">
                                        <table class="ncsc-default-table">
                                            <thead>
                                            <tr>
                                                <th class="w40"></th>
                                                <th class="w180">商品名称</th>
                                                <th class="w90"><a href="javascript:;" :class="[sortType == 'goodsMarketPrice2'&& sort==0? 'sort-up' : '',sortType == 'goodsMarketPrice2'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsMarketPrice2')">
                                                    原价(元)
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th class="w90"><a href="javascript:;" :class="[sortType == 'goodsPrice2'&& sort==0? 'sort-up' : '',sortType == 'goodsPrice2'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsPrice2')">
                                                    售价(元)
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th class="w70"><a href="javascript:;" :class="[sortType == 'goodsStorage2'&& sort==0? 'sort-up' : '',sortType == 'goodsStorage2'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsStorage2')">
                                                    库存
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th class="w100"><a href="javascript:;" :class="[sortType == 'goodsDiscount2'&& sort==0? 'sort-up' : '',sortType == 'goodsDiscount2'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('goodsDiscount2')">
                                                    活动折扣
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th class="w110"><a href="javascript:;" :class="[sortType == 'discountPrice2'&& sort==0? 'sort-up' : '',sortType == 'discountPrice2'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('discountPrice2')">
                                                    活动价(元)
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th class="w120"><a href="javascript:;" :class="[sortType == 'rebateAmount2'&& sort==0? 'sort-up' : '',sortType == 'rebateAmount2'&& sort==1 ? 'sort-down' : '','sort js-sort']" @click="changeSort('rebateAmount2')">
                                                    单品返利(元)
                                                    <i class="ico-top"></i><i class="ico-bottom"></i></a>
                                                </th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody   class="bd-line tip" >
                                            <tr  class="ui-state-disabled" v-show="newGoodsPageList.length === 0">
                                                <td colspan="20" class="norecord"><div class="no-promotion"><span>{{cancelBtnShow ? '暂无符合条件的搜索记录' : '请添加商品'}}</span></div></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <tbody>
                                        <draggable handle=".handler" v-model="newGoodsPageList" v-bind="dragOptions" class="mb30" ghost-class="ghost" draggable=".item" @change="newItemDraggable($event)" >
                                            <tr v-for="(og,oi) in newGoodsPageList" :class="[og.can_not_edit?'gray':'','item']">
                                                <td class="w40 handler"><input type="checkbox" @change="newSelectOne($event,oi)" v-model="og.selected"></td>
                                                <td class="w180 handler" style="text-align: left">
                                                    <div class="info-box">
                                                        <div class="pic">
                                                            <a target="_blank"  @click="goodsDetail(og)"><img   :src="og.src" width="60" height="60"></a>
                                                        </div>
                                                        <div class="detail">
                                                            <p><a target="_blank"  @click="goodsDetail(og)">{{og.goods_name}}</a></p>
                                                            <p v-if="og.desc" class="c-orange mt5">{{og.desc}}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="w90 handler wb-ba" >
                                                    {{og.goods_marketprice}}
                                                </td>
                                                <td class="w90 handler wb-ba">
                                                    {{og.goods_price}}
                                                </td>
                                                <td class="w70 wb-ba">{{og.goods_storage}}</td>
                                                <td class="w100 wb-ba">{{og.discount_price|discount(og.goods_marketprice)}}</td>
                                                <td class="w110">
                                                    <p v-if="og.can_not_edit">{{og.discount_price}}</p>
                                                    <input :type="og.can_not_edit?'hidden':'number'" nctype="price" step="0.01" v-model="og.discount_price" class="text w90">
                                                </td>
                                                <td class="w120">
                                                    <p v-if="og.can_not_edit">{{og.rebate_amount}}</p>
                                                    <input :type="og.can_not_edit?'hidden':'number'" nctype="price" step="0.01" v-model="og.rebate_amount" class="text w90">
                                                </td>
                                                <td class="handle"><p><a href="javascript:void(0);" @click="newRemoveOne(og)"  class="ncsc-btn btn-remove">移除</a></p></td>
                                            </tr>
                                        </draggable>
                                        </tbody>
                                    </div>
                                    <ajax-pagination :pageParams="pageParams2" @changeIndex="changeIndex2($event)"></ajax-pagination>
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <!--<dl>-->
                    <!--<dt></dt>-->
                    <!--<dd>-->
                    <!--<a v-show="!addGood" id="bundling_add_goods"  class="ncsc-btn ncsc-btn-orange-rim" @click="addGood = !addGood">添加商品</a>-->
                    <!--<qm-add-goods v-if="addGood"-->
                    <!--:pageSize="12"-->
                    <!--:showMorePrice="true"-->
                    <!--:addTxt="'加入到推销商品中'"-->
                    <!--:removeTxt="'从推销商品中移除'"-->
                    <!--:goodsList="allGoodsList"-->
                    <!--:showAddAllPage="true"-->
                    <!--:source="'store_promotion_bundling'"-->
                    <!--@addOneGoods="addOneGoods($event)"-->
                    <!--@addPageGoods="addPageGoods($event)"-->
                    <!--@close="addGood = !addGood"-->
                    <!--@removeOneGoods="removeOneGoods($event)"-->
                    <!--&gt;</qm-add-goods>-->
                    <!--</dd>-->
                    <!--</dl>-->
                    <div class="bottom">
                        <label class="submit-border"><input  @click="stepIndex = 1" type="button"  value="返回，配置活动信息" class="submit backup"></label>
                        <!--<label v-if="pageType == 1" class="submit-border"><input  @click="submitTwo()" type="button"  value="下一步，配置销售员" class="submit"></label>-->
                        <!--<label v-else class="submit-border"><input  @click="submit()" type="button"  value="提交" class="submit"></label>-->
                        <label v-if="pageType == 1" class="submit-border"><input  @click="goodsSubmit()" type="button"  value="下一步，配置销售员" class="submit"></label>
                        <label v-else class="submit-border"><input  @click="goodsSubmit()" type="button"  value="提交" class="submit"></label>
                    </div>
                </div>
                <div class="ncsc-mod-bd" style="padding: 20px 10px" v-show="sale_act_id == 0 && newGoodsList.length == 0">
                    <div class="tc">
                        <div><img src="../../../../assets/seller/images/seller/sale_conf_goods.png" alt="配置商品"></div>
                        <div class="mt20 sale-configure-goods-txt">请配置参与该活动的商品</div>
                        <div class="mt10 mb10"><a  class="ncsc-btn ncsc-btn-orange w200" @click="openAddGoodsDialog">+&nbsp;添加商品</a></div>
                        <div><a  class="ncsc-btn ncsc-btn-orange-rim w200" @click="stepIndex = 1">返回，修改活动信息</a></div>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="pageType == 1 || pageType == 3">
            <div class="ncsc-mod-section" v-show="stepIndex == 3 || pageType == 3">
                <!--<div class="ncsc-mod-hd" onselectstart="return false;">-->
                <!--<div class="ncsc-title">销售员配置</div>-->
                <!--<div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section"><i @click="collapse_2=!collapse_2" :class="['fa',collapse_2?'fa-angle-down':'fa-angle-up']"></i></div>-->
                <!--</div>-->
                <div class="ncsc-mod-bd" v-show="sale_act_id > 0 || configureSales">
                    <div class="fs16">请选择需要配置的销售员类型</div>
                    <dl>
                        <dt>
                            <input type="checkbox" checked="checked" disabled style="width: 15px;height:15px">
                            1:已知的销售员
                        </dt>
                        <dd class="c-gray" v-if="pageType == 1 || pageType == 2">(店主默认参与对应活动)</dd>
                        <dd  class="c-orange" v-else><span style="cursor: pointer" @click="openGenerateSalesDialog">指定销售员生成优惠码>></span></dd>
                    </dl>
                    <dl>
                        <dt>设置销售员:</dt>
                        <dd>
                            <div style="color: red" id="selleryman-name-error"></div>
                            <ul class="plist-man plist-seller mb10">
                                <li v-for="(man,k) in salesmanList" v-if="man.checked">
                                    <div :class="['ncsc-form-custom-checkbox ncsc-form-custom-checkbox-s',man.checked?'checked':'']">
                                        <!--<div class="ncsc-custom-checkbox-frame">-->
                                        <!--<input type="checkbox" v-model="man.checked"  class="ncsc-custom-checkbox">-->
                                        <!--</div>-->
                                        <div class="del-salesman" @click="removeSalesMan(k,man)" v-if="man.id != saleActInfo.store_own_sale_id">
                                            <span class="del-salesman-txt">-</span>
                                        </div>
                                        <label class="ncsc-custom-checkbox-txt">
                                            <img :src="man.member_avatar" alt="" >
                                        </label>
                                        <span class="name" :title="man.member_name">{{man.member_name}}</span>
                                        <!--<span @dblclick="showEdit(man.member_id)" class="name" title="双击可修改姓名" v-show="!man.change">{{man.member_name}}</span>-->
                                        <!--<div class="search-box search-box-s" v-show="man.change">-->
                                        <!--<input type="text" class="search-txt" v-model="man.member_name">-->
                                        <!--<input type="button" class="btn-search" @click="saveEdit(k)" value="确定">-->
                                        <!--</div>-->
                                    </div>
                                </li>
                            </ul>
                            <!--<div class="seller-new-box">-->
                            <!--<div :class="['ncsc-form-custom-checkbox ncsc-form-custom-checkbox-s ncsc-add-sellerman',addNew?'checked':'']">-->
                            <!--<div class="ncsc-custom-checkbox-frame">-->
                            <!--<input id="addnew" type="checkbox" value="0" v-model="addNew" class="ncsc-custom-checkbox">-->
                            <!--</div>-->
                            <!--<label for="addnew"  class="ncsc-custom-checkbox-txt">新增并选定销售员</label>-->
                            <!--</div>-->
                            <!--<div class="ncsc-new-selleryman ml25" v-show="addNew">-->
                            <!--<div style="color:#ff8519;">销售员需先注册成为【我的身边店】用户</div>-->
                            <!--<div class="ncsc-form-s mt10">-->
                            <!--<input type="text" class="ncsc-form-control w150" name="sellerman-name" id="sellerman-name" v-model.trim="newName" placeholder="请输入销售员姓名">-->
                            <!--<input type="text" class="ncsc-form-control w250" name="sellerman-tel" id="sellerman-tel" v-model.trim="newTel" placeholder="请输入销售员手机号码">-->
                            <!--<a href="javascript:void(0);" id="btn_show_search_member" @click="addNewConfirm()" class="ncsc-btn ncsc-btn-orange-rim ml5">确定</a>-->
                            <!--</div>-->
                            <!--<div style="color: red" id="selleryman-error">{{addNewTips}}</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <div>
                                <input type="button"  value="选择销售员" class="ncsc-btn ncsc-btn-orange"  @click="selectSale.selectDialog = true">
                                <!--<input type="button"  value="销售员管理" class="ncsc-btn ncsc-btn-orange"  @click="openManageDialog">-->
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <input type="checkbox" v-model="unknownSales" style="width: 15px;height:15px">
                            2:未知的销售员
                        </dt>
                        <dd></dd>
                    </dl>
                    <template v-if="unknownSales">
                        <div style="margin-left: 8%;margin-top: 20px;" class="c-gray">主要用于暂不明确销售人员的情况下，批量生成优惠码，可先将对应分销优惠码给出，后收集到销售人员信息后填补保存</div>
                        <dl>
                            <dt>优惠码类型:</dt>
                            <dd>
                                <input type="radio"  value="1" id="qrcode_type_1" class="ncsc-custom-radio" v-model="generateParams.qr_code_type">
                                <label for="qrcode_type_1" class="ncsc-custom-txt">
                                    <span class="name">二维码</span>
                                </label>
                                <input type="radio"  value="2" id="qrcode_type_2" class="ncsc-custom-radio" v-model="generateParams.qr_code_type">
                                <label for="qrcode_type_2" class="ncsc-custom-txt">
                                    <span class="name">小程序码</span>
                                </label>
                            </dd>
                        </dl>
                        <dl>
                            <dt>销售员备注:</dt>
                            <dd>
                              <input  type="text" class="ncsc-form-control w300" placeholder="可用于基本标注本次分发对象" v-model="generateParams.identification">
                              <el-tooltip placement="right-start" effect="light" popper-class="atooltip" >
                                <div slot="content" class="toolTipCont">
                                  <div class="tips">
                                    <p>若需要添加的未知销售员为XX公司人员</p>
                                    <p>则可填写备注：XX公司</p>
                                    <br/>
                                    <p>这样为您自动生成的优惠码备注中会标识：XX公司，以<br />便后期区分，待信息确认可以进行姓名/电话号码的填补</p>
                                    <p style="color: #ff4c4c;">该标识仅商户可见，销售员不可见</p>
                                  </div>
                                </div>

                                <p class="lightBlue">
                                  <i class="fa fa-question-circle" aria-hidden="true"></i>备注说明
                                </p>
                              </el-tooltip>
                            </dd>
                        </dl>
                        <dl>
                            <dt>生成数量:</dt>
                            <dd><input  type="text" class="ncsc-form-control w300" placeholder="一次最多可批量生成20个" v-model="generateParams.num"></dd>
                        </dl>
                        <dl>
                            <dt>扫码即享</dt>
                            <dd>
                                <div>
                                    <input  type="text" class="ncsc-form-control w300" v-model="generateParams.name">
                                    优惠
                                </div>
                                <el-tooltip placement="right-start" effect="light" popper-class="atooltip" >
                                    <div slot="content" class="toolTipCont">
                                        <!-- <div class="tip-doubt-con"> -->
                                        <img src="@/assets/seller/images/seller/example/xsyewm.png" alt="">
                                        <!-- </div>    -->
                                    </div>

                                    <p class="lightBlue">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>示例
                                    </p>
                                </el-tooltip>
                            </dd>
                        </dl>
                    </template>
                    <dl style="margin-bottom: 30px;">
                        <dt>优惠码历史生成记录:</dt>
                        <dd class="c-gray">请及时保存，此页面仅保持近五次的生成记录，支持直接下载</dd>
                    </dl>
                    <div style="width: 60%;margin-left: 11%;">
                        <table class="ncsc-table-spec ncsc-table" v-if="saleActInfo.qrcode_package.length > 0">
                            <thead>
                            <tr>
                                <th class="col1 w100">优惠码类型</th>
                                <th class="w170">生成时间</th>
                                <th>文件名字</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in saleActInfo.qrcode_package">
                                <td class="col1">{{item.type}}</td>
                                <td>{{item.add_time}}</td>
                                <td><a class="c-blue" :href="ImageIp + imagePathConfig.salesmanQr + item.path" :download="ImageIp + imagePathConfig.salesmanQr + item.path" style="text-decoration: underline;">点击可下载"{{item.name}}"的优惠码文件</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>


                    <div class="bottom">
                        <label class="submit-border" v-if="pageType == 1"><input  @click="stepIndex = 2;configureSales = false;createDialogValidate = true;storageDialogValidate = true" type="button"  value="返回，修改活动商品" class="submit backup"></label>
                        <label class="submit-border"><input  @click="submit()" type="button"  :value="pageType == 1 ? '提交':'确定'" class="submit"></label>
                    </div>
                </div>
                <div class="ncsc-mod-bd" v-show="sale_act_id == 0 && !configureSales">
                    <div class="tc">
                        <div><img src="../../../../assets/seller/images/seller/sale_conf_sales.png" alt="配置销售员"></div>
                        <div class="mt20 mb20">
                            <a  class="ncsc-btn ncsc-btn-orange-rim w150" @click="stepIndex = 2;configureSales = false;configureSales = false;createDialogValidate = true;storageDialogValidate = true">返回，修改活动商品</a>
                            <a  class="ncsc-btn ncsc-btn-orange w150" @click="configureSales = true">立即配置销售员</a>
                        </div>
                        <div><a class="c-orange" @click="submit()">生成活动；暂不配置销售员>></a></div>
                    </div>
                </div>
            </div>
        </template>


        <!--<div class="bottom">-->
          <!--<label class="submit-border"><input id="submit_button" @click="submit()" type="button"  value="提交" class="submit"></label>-->
        <!--</div>-->

    </form>
</div>
      <qm-tips :tipsVisible="noSelectDialog" :showCancel="false" :width="'420px'" @close="noSelectDialog = false" @confirm="noSelectDialog = false">
        <template slot="title">提示信息</template>
        <template slot="content">请选择需要操作的商品</template>
      </qm-tips>
      <qm-tips :tipsVisible="confirmOldDialog" :width="'420px'" @update:tipsVisible="confirmOldDialog = $event" :showCancel="false" @close="confirmOldDialog = false"  @confirm="confirmOld()">
        <template slot="title">批量设置活动价</template>
        <template slot="content">
          <div id="set_act_price" >
            <div class="eject_con">
              <dl>
                <dt>修改类型：</dt>
                <dd>
                  <input type="radio" @click="oldErr='';oldSetNewPrice='';"  id="multi_set_act_price" v-model="oldSetType" value="1" checked="checked"><label for="multi_set_act_price" class="mr10">批量设置统一活动价</label>
                  <input type="radio" @click="oldErr='';oldSetNewPrice='';"  id="multi_set_act_discount" v-model="oldSetType" value="2" ><label for="multi_set_act_discount">批量设置折扣</label>
                </dd>
              </dl>
              <dl v-show="oldSetType == 2">
                <dt>折扣基础：</dt>
                <dd>
                  <input id="disount_by_market_price" type="radio" @click="oldErr='';"   v-model="discountBasics" value="1" checked="checked"><label for="disount_by_market_price" class="mr10">取商品原价计算</label>
                  <input type="radio" id="disount_by_goods_price" @click="oldErr='';"   v-model="discountBasics" value="2" ><label for="disount_by_goods_price">取商品售价计算</label>
                </dd>
              </dl>
              <dl>
                <dt>{{oldSetType == 1?'活动价':'折扣'}}：</dt>
                <dd>
                  <input @keyup.enter="confirmOld()"  v-model.number="oldSetNewPrice" type="number" step="0.01" class="w230"><span id="multi_set_act_discount_sign" v-show="oldSetType == 2" style="margin-left: 5px;">%</span>
                </dd>
              </dl>
              <div style="display: block;text-align:left;margin-bottom: 10px;color: red;font-size: 12px;"  class="error-txt mt20" >{{oldErr}}</div>
            </div>
          </div>
        </template>
      </qm-tips>
        <qm-tips :tipsVisible="rebateDialog" :width="'420px'" @update:tipsVisible="rebateDialog = $event" :showCancel="false" @close="rebateDialog = false"  @confirm="rebateConfirm">
            <template slot="title">批量设置返利</template>
            <template slot="content">
                <div>
                    <div class="eject_con">
                        <dl>
                            <dt>修改类型：</dt>
                            <dd>
                                <input type="radio" @click="rebateErr='';rebatePrice='';"  id="rebate_set_type1" v-model="rebateSetType" value="1" checked="checked"><label for="rebate_set_type1" class="mr10">直接设置返利</label>
                                <input type="radio" @click="rebateErr='';rebatePrice='';" id="rebate_set_type2"  v-model="rebateSetType" value="2" ><label for="rebate_set_type2">根据折扣计算返利</label>
                            </dd>
                        </dl>
                        <dl v-show="rebateSetType == 2">
                            <dt>折扣基础：</dt>
                            <dd>
                                <input id="rebate_disount_by_market_price" type="radio" @click="rebateErr='';"   v-model="rebateDiscountBasics" value="1" checked="checked"><label for="rebate_disount_by_market_price" class="mr10">取商品原价计算</label>
                                <input type="radio" id="rebate_disount_by_goods_price" @click="rebateErr='';"   v-model="rebateDiscountBasics" value="2" ><label for="rebate_disount_by_goods_price">取商品售价计算</label>
                            </dd>
                        </dl>
                        <dl>
                            <dt>{{rebateSetType == 1?'返利':'折扣'}}：</dt>
                            <dd>
                                <input @keyup.enter="rebateConfirm()"  v-model.number="rebatePrice" type="number" step="0.01" class="w230"><span  v-show="rebateSetType == 2" style="margin-left: 5px;">%</span>
                            </dd>
                        </dl>
                        <div style="display: block;text-align:left;margin-bottom: 10px;color: red;font-size: 12px;" class="error-txt mt20" >{{rebateErr}}</div>
                    </div>
                </div>
            </template>
        </qm-tips>
    </template>
      <qm-dialog :dialogVisible="selectSale.selectDialog" :width="'700px'" @close="closeSelectDialog" :customClass="'phone-bind'">
          <template slot="title">选择销售员</template>
          <template slot="content" >
              <div class="dialog_content">
                  <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
                      <div class="ncsc-form-s" >
                          <div class="ml13">
                              <span  class="select-salesman-txt"><i class="required">*</i>选择销售员：</span>
                              <input type="text" class="ncsc-form-control w300" placeholder="请输入销售员ID/销售员姓名/备注/手机号" v-model.trim="selectSale.inputKeyword">
                              <input type="button"  value="搜索" class="ncsc-btn ncsc-btn-orange"  @click="selectSaleSearch">
                              <input type="button" v-show="selectSale.keyword"  value="撤销检索" class="ncsc-btn ncsc-btn-orange-rim"  @click="selectSaleCancelSearch">
                              <ul class="plist-man plist-seller-dialog mt10" style="margin-left: 16%">
                                  <li v-for="item in selectSalesmanList">
                                      <div :class="['ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s',selectSale.selectSaleIds.indexOf(item.id) > -1 ? 'checked' : '']">
                                          <div v-if="item.id == saleActInfo.store_own_sale_id" class="ncsc-custom-checkbox-frame disabled" @click="cancelShopkeeperErr">
                                              <input type="checkbox" :id="'select-sales-'+item.id" disabled :value="item.id"  class="ncsc-custom-checkbox" v-model="selectSale.selectSaleIds">
                                          </div>
                                          <div class="ncsc-custom-checkbox-frame" v-else>
                                              <input type="checkbox" :id="'select-sales-'+item.id" :value="item.id"  class="ncsc-custom-checkbox" v-model="selectSale.selectSaleIds">
                                          </div>
                                          <label class="ncsc-custom-checkbox-txt" :for="'select-sales-'+item.id">
                                              <img :src="item.member_avatar" alt="">
                                              <span class="name" :title="item.true_name">{{item.true_name}}</span>
                                          </label>

                                      </div>
                                  </li>
                              </ul>
                          </div>
                          <div :class="['ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s','ncsc-add-sellerman',addNew ? 'checked' : '']">
                              <span  class="select-salesman-txt"><i class="required">*</i>添加销售员：</span>
                              <div class="ncsc-custom-checkbox-frame" style="margin-left: 4px;">
                                  <input id="addnew" type="checkbox" value="0" v-model="addNew" class="ncsc-custom-checkbox">
                              </div>
                              <label for="addnew"  class="ncsc-custom-checkbox-txt">新增并选定销售员</label>
                          </div>
                          <div class="ncsc-new-selleryman" v-show="addNew" style="margin-left: 18%">
                              <div class="c-orange ml10">销售员需先注册成为【我的身边店】用户</div>
                              <div class="ncsc-form-s mt10 ml10">
                                  <input type="text" class="ncsc-form-control w150"    placeholder="请输入销售员姓名" v-model.trim="newName" >
                                  <input type="text" class="ncsc-form-control w250"    placeholder="请输入销售员手机号码" v-model.trim="newTel" >
                                  <!--<a href="javascript:void(0);"  @click="addNewConfirm()" class="ncsc-btn ncsc-btn-orange-rim ml5">确定</a>-->
                              </div>
                          </div>
                      </div>
                      <div class="bottom">
                          <input type="button" value="确认" class="ncsc-btn ncsc-btn-orange fr" @click="addNewConfirm">
                          <div class="clear"></div>
                      </div>
                  </div>
              </div>
          </template>
      </qm-dialog>
      <qm-dialog :dialogVisible="salesManageDialog" :width="'750px'" @close="closeManageDialog" :customClass="'phone-bind manage-sale'">
          <template slot="title">销售员管理</template>
          <template slot="content" >
              <div class="mb10">
                  <input  type="text" class="ncsc-form-control w100 mt10" placeholder="销售员ID" v-model="manageSale.pageParams.store_sale_id">
                  <input  type="text" class="ncsc-form-control w150 mt10" placeholder="销售员姓名" v-model.trim="manageSale.pageParams.true_name">
                  <input  type="text" class="ncsc-form-control w150 mt10" placeholder="销售员手机号" v-model.trim="manageSale.pageParams.member_mobile">
                  <input type="button"  value="搜索" class="ncsc-btn ncsc-btn-orange mt10"  @click="changeManageSaleIndex(0)">
              </div>
              <qm-table :pageParams="manageSale.pageParams">
                  <template slot="table">
                      <table class="ncsc-default-table">
                          <thead>
                          <tr>
                              <th>ID</th>
                              <th class="w200" style="text-align:center">销售员姓名</th>
                              <th class="w200">销售员电话</th>
                              <th class="w100">操作</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="item in manageSale.saleList">
                              <td>{{item['id']}}</td>
                              <td>
                                  <span v-show="item.edit">{{item.true_name}}</span>
                                  <input v-show="!item.edit" type="text" class="ncsc-form-control w150" v-model.trim="item.true_name">
                              </td>
                              <td>
                                  <span v-show="item.edit || item.member_id">{{item.member_mobile}}</span>
                                  <input v-show="!item.edit && !item.member_id" type="text" class="ncsc-form-control w150" v-model.trim="item.member_mobile">
                              </td>
                              <td class="handle">
                                  <p>
                                      <a class="manage-sale-btn" v-if="item.edit" @click="editSale(item)">编辑</a>
                                      <a class="manage-sale-btn" v-if="!item.edit" @click="editSaleCancel(item)">取消</a>
                                      <a class="manage-sale-btn" v-if="!item.edit" @click="editSaleConfirm(item)">确定</a>
                                  </p>
                              </td>
                          </tr>
                          </tbody>
                      </table>
                  </template>
              </qm-table>
              <qm-pagination :pageParams="manageSale.pageParams" @changeIndex="changeManageSaleIndex($event)" :scrollTop="false"></qm-pagination>
          </template>
      </qm-dialog>
      <qm-dialog :dialogVisible="selectActDialog" :width="'550px'" @close="selectActDialog = false" :customClass="'phone-bind manage-sale'">
          <template slot="title">选择需要复制的活动</template>
          <template slot="content" >
              <div>选择需要复制的活动</div>
              <div class="mb10">
                  <select class="mt10" v-model="selectAct.pageParams.progress_state">
                      <option  v-for="(s,i) in states" :value="i">{{s}}</option>
                  </select>
                  <input  type="text" class="ncsc-form-control w270 mt10" placeholder="支持用活动ID/活动名称进行条件搜索" v-model.trim="selectAct.pageParams.sale_title">
                  <input type="button"  value="搜索" class="ncsc-btn ncsc-btn-orange mt10"  @click="changeSelectActIndex(0)">
                  <a  class="ncsc-btn ncsc-btn-orange-rim mt10" v-show="selectAct.cancelSearchShow" @click="selectAct.pageParams.progress_state = 0;selectAct.pageParams.sale_title = '';changeSelectActIndex(0)">撤销检索</a>
              </div>
              <qm-table :pageParams="selectAct.pageParams">
                  <template slot="table">
                      <table class="ncsc-default-table">
                          <thead>
                          <tr>
                              <th class="w90">ID</th>
                              <th style="text-align: center;">活动名称</th>
                              <th class="w70">状态</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="item in selectAct.list" @click="selectActDialog = false;selectTitle(item.sale_act_id);" style="cursor: pointer">
                              <td>{{item['sale_act_id']}}</td>
                              <td>{{item['sale_title']}}</td>
                              <td>{{item['sale_act_state_des']}}</td>
                          </tr>
                          </tbody>
                      </table>
                  </template>
              </qm-table>
              <qm-pagination :pageParams="selectAct.pageParams" @changeIndex="changeSelectActIndex($event)" :scrollTop="false"></qm-pagination>
          </template>
      </qm-dialog>
      <qm-dialog :dialogVisible="addGoodsDialog" :width="'800px'" @close="addGoodsDialog=false" :customClass="'phone-bind sale-add-goods'">
          <template slot="title">添加商品</template>
          <template slot="content" >
              <qm-add-goods v-if="addGoodsDialog"
                            :pageSize="8"
                            :showMorePrice="true"
                            :addTxt="'加入到推销商品中'"
                            :removeTxt="'从推销商品中移除'"
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
              <div class="bottom" style="margin-top: 0">
                  <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="addGoodsConfirm">
              </div>
          </template>
      </qm-dialog>
      <qm-dialog :dialogVisible="alertDialog" :width="'800px'" @close="alertDialog=false" :customClass="'phone-bind'">
          <template slot="title">警告</template>
          <template slot="content" >
              <div class="c-red">以下商品活动价大于商品售价：</div>
              <div class="operate-bar">
                  <span style="vertical-align: middle;width:6%"><i class="required">*</i>商品：</span>
                  <label for="dialog_check_all_one_page" class="mr10"><input id="dialog_check_all_one_page" type="checkbox" @change="selectAlertGoods($event,1)" v-model="alertSelectPage"  data-id="check_all_one_page" >本页全选</label>
                  <label for="dialog_check_all" class="mr10"><input id="dialog_check_all" type="checkbox" @change="selectAlertGoods($event,2)" v-model="alertSelectAll"  data-id="check_all">全部全选</label>
                  <a href="javascript:void(0);" class="ncsc-btn-mini" @click="alertSetPrice()" >批量修改活动价</a>
                  <a href="javascript:void(0);" class="ncsc-btn-mini" @click="alertSetRebate()">批量设置返利</a>
              </div>
              <div>
                  <table class="ncsc-default-table">
                      <thead>
                      <tr>
                          <th class="w40"></th>
                          <th class="w200">商品名称</th>
                          <th class="w80">原价(元)</th>
                          <th class="w80">售价(元)</th>
                          <th class="w80">库存</th>
                          <th class="w90">活动折扣</th>
                          <th class="w110">活动价(元)</th>
                          <th class="w110">单品返利(元)</th>
                          <th></th>
                      </tr>
                      </thead>
                      <tbody   class="bd-line tip" >
                      <tr  class="ui-state-disabled" v-show="alertGoodsPageList.length === 0">
                          <td colspan="20" class="norecord"><div class="no-promotion"><span>请添加商品</span></div></td>
                      </tr>
                      </tbody>
                  </table>
                  <tbody>
                      <tr v-for="(og,oi) in alertGoodsPageList" :class="[og.can_not_edit?'gray':'','item']">
                          <td class="w40 handler"><input type="checkbox" @change="alertSelectOne($event,oi)" v-model="og.selected"></td>
                          <td class="w200 handler">
                              <div class="info-box">
                                  <div class="pic">
                                      <a target="_blank"  @click="goodsDetail(og)"><img   :src="og.src" width="60" height="60"></a>
                                  </div>
                                  <div class="detail">
                                      <p><a target="_blank"  @click="goodsDetail(og)">{{og.goods_name}}</a></p>
                                      <p v-if="og.desc" class="c-orange mt5">{{og.desc}}</p>
                                  </div>
                              </div>
                          </td>
                          <td class="w80 handler wb-ba">
                              {{og.goods_marketprice}}
                          </td>
                          <td class="w80 handler wb-ba">
                              {{og.goods_price}}
                          </td>
                          <td class="w80 wb-ba">{{og.goods_storage}}</td>
                          <td class="w60 wb-ba">{{og.discount_price|discount(og.goods_marketprice)}}</td>
                          <td class="w110">
                              <p v-if="og.can_not_edit">{{og.discount_price}}</p>
                              <input :type="og.can_not_edit?'hidden':'number'" nctype="price" step="0.01" v-model="og.discount_price" class="text w90">
                          </td>
                          <td class="w110">
                              <p v-if="og.can_not_edit">{{og.rebate_amount}}</p>
                              <input :type="og.can_not_edit?'hidden':'number'" nctype="price" step="0.01" v-model="og.rebate_amount" class="text w90">
                          </td>
                          <td class="handle"></td>
                      </tr>
                  </tbody>
              </div>
              <div class="sale-alert-dialog-pagination">
                  <ajax-pagination :pageParams="pageParams4" @changeIndex="changeIndex4($event)"></ajax-pagination>
              </div>
              <div class="bottom sale-alert-dialog-bottom">
                  <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="alertGoodsConfirm">
                  <div class="clear"></div>
              </div>
          </template>
      </qm-dialog>
      <qm-dialog :dialogVisible="alertStorageDialog" :width="'800px'" @close="closeAlertStorageDialog" :customClass="'phone-bind'">
          <template slot="title">提示</template>
          <template slot="content" >
              <div>以下商品暂无库存，可进行增补或直接提交保存活动；后期再进行增补库存</div>
              <div class="operate-bar">
                  <span style="vertical-align: middle;width:6%"><i class="required">*</i>商品：</span>
                  <label for="storage_dialog_check_all_one_page" class="mr10"><input id="storage_dialog_check_all_one_page" type="checkbox" @change="selectStorageAlertGoods($event,1)" v-model="alertStorageSelectPage"  >本页全选</label>
                  <label for="storage_dialog_check_all" class="mr10"><input id="storage_dialog_check_all" type="checkbox" @change="selectStorageAlertGoods($event,2)" v-model="alertStorageSelectAll"  data-id="check_all">全部全选</label>
                  <a href="javascript:void(0);" class="ncsc-btn-mini" @click="openBatchStorageDialog" >批量增补库存</a>
              </div>
              <div>
                  <table class="ncsc-default-table">
                      <thead>
                      <tr>
                          <th class="w40"></th>
                          <th class="w200">商品名称</th>
                          <th class="w80">原价(元)</th>
                          <th class="w80">售价(元)</th>
                          <th class="w110">活动价(元)</th>
                          <th class="w110">单品返利(元)</th>
                          <th class="w80">库存</th>
                          <th></th>
                      </tr>
                      </thead>
                      <tbody   class="bd-line tip" >
                      <tr  class="ui-state-disabled" v-show="alertStoragePageList.length === 0">
                          <td colspan="20" class="norecord"><div class="no-promotion"><span>请添加商品</span></div></td>
                      </tr>
                      </tbody>
                  </table>
                  <tbody>
                  <tr v-for="(og,oi) in alertStoragePageList" :class="[og.can_not_edit?'gray':'','item']">
                      <td class="w40 handler"><input type="checkbox" @change="alertStorageSelectOne($event,oi)" v-model="og.selected"></td>
                      <td class="w200 handler">
                          <div class="info-box">
                              <div class="pic">
                                  <a target="_blank"  @click="goodsDetail(og)"><img   :src="og.src" width="60" height="60"></a>
                              </div>
                              <div class="detail">
                                  <p><a target="_blank"  @click="goodsDetail(og)">{{og.goods_name}}</a></p>
                              </div>
                          </div>
                      </td>
                      <td class="w80 handler wb-ba" >
                          {{og.goods_marketprice}}
                      </td>
                      <td class="w80 handler wb-ba">
                          {{og.goods_price}}
                      </td>
                      <td class="w110">
                          <p>{{og.discount_price}}</p>
                      </td>
                      <td class="w110">
                          <p>{{og.rebate_amount}}</p>
                      </td>
                      <td class="w80 wb-ba"><input class="w70" type="number" v-model="og.goods_storage"></td>
                      <td class="handle"></td>
                  </tr>
                  </tbody>
              </div>
              <div class="sale-alert-dialog-pagination">
                  <ajax-pagination :pageParams="pageParams5" @changeIndex="changeIndex5($event)"></ajax-pagination>
              </div>
              <div class="bottom sale-alert-dialog-bottom">
                  <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="alertStorageConfirm">
                  <div class="clear"></div>
              </div>
          </template>
      </qm-dialog>
      <qm-dialog :dialogVisible="generateSales.generateSalesDialog" :width="'600px'" @close="closeGenerateSalesDialog" :customClass="'phone-bind'">
          <template slot="title">指定销售员生成分销二维码</template>
          <template slot="content" >
              <div class="dialog_content">
                  <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
                      <div class="ncsc-form-s" >
                          <dl>
                              <dt>优惠码类型：</dt>
                              <dd>
                                  <div class="ncsc-form-custom-radio-group">
                                      <div :class="[generateSales.qr_code_type == 1 ? 'checked':'','ncsc-form-custom-radio']">
                                          <div class="ncsc-custom-radio-frame">
                                              <input type="radio"  value="1" id="sales_qrcode_type_1" class="ncsc-custom-radio" v-model="generateSales.qr_code_type">
                                          </div>
                                          <label for="sales_qrcode_type_1" class="ncsc-custom-txt">
                                              <span class="name">二维码</span>
                                          </label>
                                      </div>
                                      <div :class="[generateSales.qr_code_type == 2 ? 'checked':'','ncsc-form-custom-radio']">
                                          <div class="ncsc-custom-radio-frame">
                                              <input type="radio"  value="2" id="sales_qrcode_type_2" class="ncsc-custom-radio" v-model="generateSales.qr_code_type">
                                          </div>
                                          <label for="sales_qrcode_type_2" class="ncsc-custom-txt">
                                              <span class="name">小程序码</span>
                                          </label>
                                      </div>
                                  </div>
                              </dd>
                          </dl>
                          <div class="ml13">
                              <p>选择需要生成分销二维码的销售员：</p>
                              <input  type="text" class="ncsc-form-control w300 mt10" v-model="generateSaleParams.keyword" placeholder="支持用销售员ID/名称/手机号进行条件搜索">
                              <input type="button"  value="搜索" class="ncsc-btn ncsc-btn-orange mt10"  @click="getGenerateSalesList">
                              <ul class="plist-man plist-seller-dialog  mt10">
                                  <li v-for="item in generateSalesList">
                                      <div :class="['ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s',generateSales.sale_ids.indexOf(item.sale_id) > -1 ? 'checked' : '']">
                                          <div  class="ncsc-custom-checkbox-frame"><input type="checkbox" v-model="generateSales.sale_ids" :value="item.sale_id" class="ncsc-custom-checkbox"></div>
                                          <label class="ncsc-custom-checkbox-txt">
                                              <img :src="item.member_avatar" alt="">
                                          </label>
                                          <span  class="name" :title="item.true_name">{{item.true_name}}</span>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div class="bottom">
                          <input type="button" value="生成" class="ncsc-btn ncsc-btn-orange fr" @click="generate">
                          <div class="clear"></div>
                      </div>
                  </div>
              </div>
          </template>
      </qm-dialog>
      <qm-tips :tipsVisible.sync="leaveDialog" :width="'420px'" @close="dialogCancelLeave()" @cancel="dialogCancelLeave()" @confirm="dialogConfirmLeave()" :confirmTxt="'离开页面'" :cancelTxt="'留在页面'" :cancelFront="true" :confirmClass="'ncsc-btn-orange-rim'" :cancelClass="'ncsc-btn-orange'">
          <template slot="title">警告</template>
          <template slot="content">
              页面配置内容尚未提交保存<br>确定要离开当前页面吗?
          </template>
      </qm-tips>
      <qm-tips :tipsVisible.sync="createDialog" :width="'420px'" @close="createDialog = false" @cancel="createDialog = false" @confirm="dialogConfirmCreate()" :confirmTxt="'继续创建'" :cancelTxt="'前往修改'" :cancelFront="true" :confirmClass="'ncsc-btn-orange-rim'" :cancelClass="'ncsc-btn-orange'">
          <template slot="title">警告</template>
          <template slot="content">
              存在活动价等于售价的商品，是否进行修改配置
          </template>
      </qm-tips>
      <qm-dialog :dialogVisible="batchStorageDialog" :width="'420px'" @close="batchStorageDialog = false" :customClass="'phone-bind'">
          <template slot="title">批量增补库存</template>
          <template slot="content" >
              <div class="dialog_content">
                  <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
                      <div class="ncsc-form-s" >
                          <dl>
                              <dt style="width: 10em">增补库存：</dt>
                              <dd><input type="number"  min="0" class="ncsc-form-control" v-model="batchStorageNum" @keyup="onlyInteage($event,'batchStorageNum')" ></dd>
                          </dl>
                      </div>
                      <div class="bottom">
                          <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="confirmBatchStorageDialog">
                          <div class="clear"></div>
                      </div>
                  </div>
              </div>
          </template>
      </qm-dialog>
  </div>
</template>

<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import AjaxPagination from 'component/ajax-pagination/index'
  import draggable from 'vuedraggable';
  import QmTable from 'component/qm-table/index';
  import QmPagination from 'component/qm-pagination/index';
  import QmTips from 'component/qm-tips/index';
  import {saleAct,inventoryWarning,storeGoodsOnline} from 'api'
  import storage from 'lib/utils/storage'
  import util from 'lib/utils/util'
  import QmAddGoods from 'component/qm-add-goods/index';
  import QmDialog from 'component/qm-dialog/index';
  import QmStep from 'component/qm-step/index';
  import exportData from 'lib/utils/export';
  import mixin from 'component/main/mixin';
  export default {
    name: "sale-act-list",
    mixins:[mixin],
    data() {
      return {
        cancelBtnShow:false,
        batchStorageDialog:false,
        batchStorageNum:'',
        secondClass:[],
        secondShowClass:[],
        thirdClass:[],
        thirdShowClass:[],
        gc_id_2:0,
        gc_id_3:0,
        temp_gc_id_2:0,
        temp_gc_id_3:0,
        sort:0,
        sortType:'',
        states:{
          0:'全部',
          1:'未开始',
          2:'进行中',
          3:'已结束'
        },
        selectAct:{
          pageParams:{
            pageIndex:0,
            pageSize:10,
            total:10,
            progress_state:0,
            sale_title:'',
            sale_act_id:0
          },
          list:[],
          cancelSearchShow:false
        },
        selectActDialog:false,
        alertDialog:false,
        alertStorageDialog:false,
        bodyListener:'',
        isEdit:false,//当前是否有处于编辑状态的数据
        leaveDialog:false,
        createDialog:false,
        createDialogValidate:true,
        storageDialogValidate:true,
        nextFun:'',
        pageType:1,//1:新增 2:第一、二步编辑 3:第三步编辑
        stepIndex:1,
        generateSales:{
          generateSalesDialog:false,
          qr_code_type:1,
          sale_ids:[],
          type:2,
          sale_act_id:0
        },
        generateSalesList:[],
        generateSaleParams:{
          sale_act_id:0,
          keyword:''
        },
        configureSales:false,
        unknownSales:false,
        manageSale:{
          pageParams:{
            pageIndex:0,
            pageSize:10,
            total:0,
            store_sale_id:'',
            true_name:'',
            member_mobile:'',
            sale_act_id:0
          },
          saleList:[],
          manageDialog:false,
          temp_true_name:'',
          temp_member_mobile:''
        },
        generateParams:{
          type:1,
          identification:'',
          num:'',
          name:'',
          sale_ids:[],
          qr_code_type:1,
          sale_act_id:0
        },
        selectSale:{
          selectDialog:false,
          selectSaleIds:[],
          keyword:'',
          inputKeyword:''
        },
        collapse_1:false,
        collapse_2:false,
        collapse_3:false,
        collapse_4:false,
        collapse_5:false,
          showSelectTile:false,
          useMarginTop:'',
          selectTitleOverflow:'hidden',
          //selectTitleOverflowMaxHeight:'',
          selectTitleMouseOver:false,
          isSelectTitleLoading:false,
          isAllowSelectTileLoading:false,
        addNew:false,
        oldSetType:1,
        addNewTips:'',
        newName:'',
        newTel:'',
          list:'',
        validData:{
          saleTitleErr:false,
          startDateErr:false,
          endDateErr:false,
          endDateLittleErr:false,
          showHotErr:false,
          endDateLittleNowErr:false
        },
        pageParams:{
          pageIndex:0,
          pageSize:10,
          total:0
        },
        pageParams2:{
          pageIndex:0,
          pageSize:10,
          total:0
        },
          pageParams3:{
              pageIndex:0,
              pageSize:10,
              total:0
          },
        pageParams4:{
          pageIndex:0,
          pageSize:5,
          total:0
        },
        pageParams5:{
          pageIndex:0,
          pageSize:5,
          total:0
        },
        addGoodsDialog:false,
        goodsType:1,
        oldSelectPage:false,
        oldSelectAll:false,
        newSelectPage:false,
        newSelectAll:false,
        alertSelectPage:false,
        alertStorageSelectPage:false,
        alertSelectAll:false,
        alertStorageSelectAll:false,
        noSelectDialog:false,
        rebateDialog:false,
        rebateErr:'',
        rebatePrice:'',
        rebateSetType:1,
        rebatGoodsType:0,
        rebateDiscountBasics:1,
        confirmOldDialog:false,
        discountBasics:1,
        setPriceType:0,//0旧数据，1新数据
        oldErr:'',
        oldSetNewPrice:'',
        addGood:false,
        sale_act_id:0,
        editFlag:1,//0查看，1新增、编辑
        salesmanList:[],
        selectSalesmanList:[],
        salesmanListChecked:[],//选择销售员弹窗上销售员的选中，因为有搜索，所以不一定等于所有销售员的选中(没有在弹窗上操作时则salesmanListChecked=members)
        members:'',
        tempGoodsKeyword:'',
        rangeKeyword1:'',
        rangeType:1,
        goodsStateType:1,
        tempRangeKeyword1:'',
        rangeKeyword2:'',
        tempRangeKeyword2:'',
        goodsKeyword:'',
        goodsList:[],
        oldGoodsList:[],
        newGoodsList:[],
        newGoodsPageList:[],
        alertGoodsList:[],
        alertStorageList:[],
        alertGoodsPageList:[],
        alertStoragePageList:[],
        allGoodsList:[],
        saleActInfo:{
          sale_title:'',
          sale_act_describe:'',
          sale_start_date:'',
          sale_end_date:'',
          is_show_hot:"",
          member_id:[],
          goods:[],
          sale_act_id:0,
          store_member_id:0,
          store_sale_id:0,
          qrcode_package:[],
          store_name:'',
          edit_sale:0,
          coupon_flag:0
        },
        originResponsecontent:{
          sale_act_info:{
            sale_title:'',
            sale_act_describe:'',
            start_date:'',
            end_date:'',
            is_show_hot:"",
          },
          member_list:[],
          goods_list:[]
        },
        confirmLeave:false,
        excludeGoods:[],
        existGoods:[]
      }
    },
    filters:{
      discount:function (activity_price,original_price) {
        let realVal = ''
        if (!isNaN(activity_price) && activity_price!== '' && parseFloat(original_price) > 0) {
          // 截取当前数据到小数点后两位
          realVal = util.discount(activity_price, original_price, 1) + '折';
          // realVal = parseFloat(activity_price/original_price*10).toFixed(2);
        } else {
          realVal = '-'
        }
        return realVal
      }
    },
    computed:{
      dragOptions() {
        return {
          animation: 200,
          disabled: false,
        };
      },
      ...mapGetters('saleActAdd',{
        salesManageDialog:'getSalesManageDialog'
      }),
      ...mapGetters('saleAct',{
        canEdit:'getCanEdit',
      }),
      ...mapGetters({
        ImageIp:'getImageIp',
        imagePathConfig:'getImagePathConfig',
      }),
      steps:{
        get() {
          if(this.pageType == 1) {
            return [
              {title:'STEP.1',text:'配置活动信息',current:true,icon:''},
              {title:'STEP.2',text:'配置活动商品',current:false,icon:''},
              {title:'STEP.3',text:'配置销售员',current:false,icon:''},
            ];
          }else if(this.pageType == 2) {
            return [
              {title:'STEP.1',text:'活动信息',current:true,icon:''},
              {title:'STEP.2',text:'活动商品',current:false,icon:''}
            ];
          }else{
            return [];
          }
        },
        set(val) {

        }
      },
    },

    components:{
      AjaxPagination,
      draggable,
      QmTips,
      QmAddGoods,
      QmDialog,
      QmPagination,
      QmTable,
      QmStep
    },

    methods: {
      ...mapActions('saleAct',{
        getOnlineSecondClass:'getOnlineSecondClass',
        getOnlineThirdClass:'getOnlineThirdClass',
      }),
      compare(property,sort) {
        return function (a,b) {
          if(sort == 0) {
            return a[property] - b[property]
          }else{
            return b[property] - a[property]
          }
        }
      },
      changeSort(sortType) {
        if(this.sortType==sortType){
          if(this.sort==0){
            this.sort=1;
          }else{
            this.sort=0;
          }
        }else{
          this.sort=0;
        }
        this.sortType=sortType;
        this.pageParams.pageIndex = 0;
        this.pageParams2.pageIndex = 0;
        let sort = this.sort;
        switch (sortType) {
          case 'goodsMarketPrice1':
            this.goodsList.sort(this.compare('goods_marketprice',sort));
            break;
          case 'goodsMarketPrice2':
            this.newGoodsList.sort(this.compare('goods_marketprice',sort));
            break;
          case 'goodsPrice1':
            this.goodsList.sort(this.compare('goods_price',sort));
            break;
          case 'goodsPrice2':
            this.newGoodsList.sort(this.compare('goods_price',sort));
            break;
          case 'goodsStorage1':
            this.goodsList.sort(this.compare('goods_storage',sort));
            break;
          case 'goodsStorage2':
            this.newGoodsList.sort(this.compare('goods_storage',sort));
            break;
          case 'goodsDiscount1':
            for(let item of this.goodsList) {
              if (!isNaN(item.discount_price) && item.discount_price!== '' && parseFloat(item.goods_marketprice) > 0) {
                item.goods_disount = util.discount(item.discount_price, item.goods_marketprice, 1) ;
              }else{
                item.goods_disount = 0;
              }
            }
            this.goodsList.sort(this.compare('goods_disount',sort));
            break;
          case 'goodsDiscount2':
            for(let item of this.newGoodsList) {
              if (!isNaN(item.discount_price) && item.discount_price!== '' && parseFloat(item.goods_marketprice) > 0) {
                item.goods_disount = util.discount(item.discount_price, item.goods_marketprice, 1) ;
              }else{
                item.goods_disount = 0;
              }
            }
            this.newGoodsList.sort(this.compare('goods_disount',sort));
            break;
          case 'discountPrice1':
            this.goodsList.sort(this.compare('discount_price',sort));
            break;
          case 'discountPrice2':
            this.newGoodsList.sort(this.compare('discount_price',sort));
            break;
          case 'rebateAmount1':
            this.goodsList.sort(this.compare('rebate_amount',sort));
            break;
          case 'rebateAmount2':
            this.newGoodsList.sort(this.compare('rebate_amount',sort));
            break;
        }
      },
      getSecondClass(){
        var data = {

        }
        this.getOnlineSecondClass(data).then((res)=>{
          if(res.resultCode == 1){
            this.secondClass = res.responseContent;
          }else{
            util.msg(res.longMessage);
          }
          this.updateSecondClass();
        })
      },
      changeSecondClass(event){
        var value = event.target.value;
        this.temp_gc_id_2 = value;
        this.temp_gc_id_3 = 0;
        if(value == 0){
          this.thirdClass = [];
          this.thirdShowClass = [];
        }else{
          this.getThirdClass(event.target.value);
        }

      },
      getThirdClass(gc_id){
        var data = {
          gc_id_2:gc_id
        }
        this.getOnlineThirdClass(data).then((res)=>{
          if(res.resultCode == 1){
            this.thirdClass = res.responseContent;
          }else{
            this.layer.msg(res.longMessage);
          }
          this.updateThirdClass();
        })
      },
      changeThirdClass(event){
        var value = event.target.value;
        this.temp_gc_id_3 = value;
      },
      updateSecondClass() {
        let secondShowClass = [];
        if(this.goodsType == 2) {//新增商品
          for(let item of this.secondClass) {
            for (let item2 of this.newGoodsList) {
              if(item.gc_id == item2.gc_id_2) {
                secondShowClass.push(item);
                break;
              }
            }
          }
        }else{
          for(let item of this.secondClass) {
            for (let item2 of this.goodsList) {
              if(item.gc_id == item2.gc_id_2) {
                secondShowClass.push(item);
                break;
              }
            }
          }
        }
        if(this.temp_gc_id_2 > 0) {
          let match = false;
          for (let item of secondShowClass) {
            if(item.gc_id == this.temp_gc_id_2) {
              match = true;
              break;
            }
          }
          if(!match) {
            this.temp_gc_id_2 = 0;
            this.temp_gc_id_3 = 0;
            if(this.gc_id_2 > 0) {
              this.gc_id_2 = 0;
              this.gc_id_3 = 0;
              this.goodsSearch();
            }
          }else{
            this.updateThirdClass();
          }
        }
        this.secondShowClass = secondShowClass;
      },
      updateThirdClass() {
        let thirdShowClass = [];
        if(this.goodsType == 2) {//新增商品
          for(let item of this.thirdClass) {
            for (let item2 of this.newGoodsList) {
              if(item.gc_id.toString().indexOf('_') > -1) {
                if(item.gc_id == item2.goods_class_t_id) {
                  thirdShowClass.push(item);
                  break;
                }
              }else{
                if(item.gc_id == item2.gc_id_3) {
                  thirdShowClass.push(item);
                  break;
                }
              }
            }
          }
        }else{
          for(let item of this.thirdClass) {
            for (let item2 of this.goodsList) {
              if(item.gc_id.toString().indexOf('_') > -1) {
                if(item.gc_id == item2.goods_class_t_id) {
                  thirdShowClass.push(item);
                  break;
                }
              }else{
                if(item.gc_id == item2.gc_id_3) {
                  thirdShowClass.push(item);
                  break;
                }
              }
            }
          }
        }
        if(this.temp_gc_id_3 > 0) {
          let match = false;
          for (let item of thirdShowClass) {
            if(item.gc_id == this.temp_gc_id_3) {
              match = true;
              break;
            }
          }
          if(!match) {
            this.temp_gc_id_3 = 0;
            if(this.gc_id_3 > 0) {
              this.gc_id_3 = 0;
              this.goodsSearch();
            }
          }
        }
        this.thirdShowClass = thirdShowClass;
      },
      openBatchStorageDialog() {
        let has;
        for(let item of this.alertStorageList) {
          if(item.selected){
            has = true;
            break;
          }
        }
        if(!has){
          util.msg('请选择需要操作的商品');
          return
        }
        this.batchStorageDialog = true;
      },
      alertStorageConfirm() {
        let alertStorageList =  _.clone(this.alertStorageList);
        let goodsList = _.clone(this.goodsList);
        let newGoodsList = _.clone(this.newGoodsList);
        let find = false;
        let storage = [];
        for (let item of alertStorageList) {
          for (let idx2 in goodsList) {
            if(goodsList[idx2].goods_id == item.goods_id) {
              if(parseInt(item.goods_storage) > 0 && goodsList[idx2].goods_storage != item.goods_storage) {
                storage.push({storage:item.goods_storage,goods_id:item.goods_id,goods_commonid:item.goods_commonid});
                goodsList[idx2].goods_storage = item.goods_storage;
                goodsList[idx2].desc = '';
              }
              find = true;
              break;
            }
          }
          if(!find) {
            for (let idx3 in newGoodsList) {
              if(newGoodsList[idx3].goods_id == item.goods_id) {
                if(parseInt(item.goods_storage) > 0 && newGoodsList[idx3].goods_storage != item.goods_storage) {
                  storage.push({storage:item.goods_storage,goods_id:item.goods_id,goods_commonid:item.goods_commonid});
                  newGoodsList[idx3].goods_storage = item.goods_storage;
                  newGoodsList[idx3].desc = '';
                }
                break;
              }
            }
          }
        }
        if(storage.length > 0) {
          storeGoodsOnline.setStorage({storage:JSON.stringify(storage)}).then(res=>{
            util.msg(res.shortMessage);
            if(res.resultCode === 1) {
              this.newGoodsList = newGoodsList;
              this.goodsList = goodsList;
            }
          })
        }
        this.closeAlertStorageDialog();
      },
      closeAlertStorageDialog() {
        this.alertStorageDialog = false;
        this.storageDialogValidate = false;
        // setTimeout(()=>{
        //   this.storageDialogValidate = true;
        // },1000)
        if(this.pageType == 1) {
          this.submitTwo();
        }else{
          this.submit();
        }
      },
      confirmBatchStorageDialog() {
        if(this.batchStorageNum === '') {
          util.msg('请输入库存');
          return;
        }
        let batchStorageNum = parseInt(this.batchStorageNum)
        if(!(batchStorageNum > 0)) {
          util.msg('库存数量需为大于0的正整数');
          return;
        }
        let goodsIds = [],goods = [];
        for(let item of this.alertStorageList) {
          if(item.selected){
            item.goods_storage = parseInt(item.goods_storage) + batchStorageNum
            goodsIds.push(item.goods_id);
            goods.push(item);
          }
        }
        if(goodsIds.length > 0) {
          inventoryWarning.inventoryAddBatch({storage:batchStorageNum,goodsIds:goodsIds.join(',')}).then(res=>{
            util.msg(res.shortMessage);
            if(res.resultCode === 1) {
              let goodsList = _.clone(this.goodsList);
              let newGoodsList = _.clone(this.newGoodsList);
              let find = false;
              for (let item of goods) {
                for (let idx2 in goodsList) {
                  if(goodsList[idx2].goods_id == item.goods_id) {
                    goodsList[idx2].goods_storage += batchStorageNum;
                    goodsList[idx2].desc = '';
                    find = true;
                    break;
                  }
                }
                if(!find) {
                  for (let idx3 in newGoodsList) {
                    if(newGoodsList[idx3].goods_id == item.goods_id) {
                      newGoodsList[idx3].goods_storage += batchStorageNum;
                      newGoodsList[idx3].desc = '';
                      break;
                    }
                  }
                }
              }
              this.newGoodsList = newGoodsList;
              this.goodsList = goodsList;
              this.batchStorageDialog = false;
            }
          })
        }
      },
      addGoodsConfirm() {
        this.newGoodsList = this.existGoods.concat(this.newGoodsList);
        this.addGoodsDialog = false;
        if(this.goodsType == 2) {
          this.cancelGoodsSearch();
        }else{
          this.goodsType = 2;
        }
        this.updateSecondClass();
      },
      dialogConfirmLeave() {
        this.nextFun();
      },
      dialogConfirmCreate() {
        this.createDialog = false;
        this.createDialogValidate = false;
        // setTimeout(()=>{
        //   this.createDialogValidate = true;
        // },1000);
        if(this.pageType == 1) {
          this.submitTwo();
        }else{
          this.submit();
        }
      },
      openAddGoodsDialog() {
        // this.excludeGoods = _.clone(this.allGoodsList);
        this.excludeGoods = this.allGoodsList;
        this.existGoods = [];
        this.addGoodsDialog = true;
      },
      dialogCancelLeave() {
        this.leaveDialog = false;
        this.changeMenu('promotion','sale_act');
        this.$parent.curUrl = 'sale_act_add';
      },
      ...mapActions('saleAct',{
        setEdit: 'setEdit',
      }),
      ...mapMutations('saleAct',{
        setUpdate: 'setUpdate',
        setPageIndex:'setPageIndex',
      }),
      ...mapMutations('saleActAdd',{
        setSalesManageDialog:'setSalesManageDialog'
      }),
      ...mapMutations('saleAct',{
        setUpdate: 'setUpdate',
        setPageIndex:'setPageIndex',
      }),
      cancelShopkeeperErr() {
        util.msg('本店店主不能被移除');
      },
      getGenerateSalesList() {
        saleAct.getSaleList(this.generateSaleParams).then(res=>{
          this.generateSalesList = res.list;
          if(this.generateSalesList.length === 0) {
            util.msg('没有匹配的销售员');
          }
        })
      },
      openSelectActDialog() {
        this.selectActDialog = true;
        this.getSaleActList();
      },
      getSaleActList() {
        saleAct.getList(this.selectAct.pageParams).then((res)=>{
          if(parseInt(this.selectAct.pageParams.progress_state) > 0 || this.selectAct.pageParams.sale_title !== '') {
            this.selectAct.cancelSearchShow = true;
          }else{
            this.selectAct.cancelSearchShow = false;
          }
          this.selectAct.list = res.list;
          var newPageParams = _.clone(this.selectAct.pageParams)
          newPageParams.total = res.total;
          this.selectAct.pageParams = newPageParams;
        })
      },
      changeSelectActIndex(index) {
        this.selectAct.pageParams.pageIndex = index;
        this.getSaleActList();
      },
      openGenerateSalesDialog() {
        this.generateSaleParams.sale_act_id = this.saleActInfo.sale_act_id;
        this.generateSales.sale_act_id = this.saleActInfo.sale_act_id;
        this.generateSales.generateSalesDialog = true;
        this.getGenerateSalesList();
      },
      closeGenerateSalesDialog() {
        this.generateSales = {
          generateSalesDialog:false,
          qr_code_type:1,
          sale_ids:[],
          type:2,
          sale_act_id:0
        }
        this.generateSaleParams.keyword = '';
      },
      generate() {
        let generateParams = this.generateSales;
        if(this.generateSales.sale_ids.length == 0) {
          util.msg('请选择需要生成二维码的销售员');
          return;
        }
        generateParams.sale_ids = generateParams.sale_ids.map(function (value) {
          return ''+value;
        })
        let index = this.layer.load(1);
        saleAct.generateQrCode(generateParams).then(res=>{
          this.layer.close(index);
          util.msg(res.shortMessage);
          if(res.resultCode === 1) {
            exportData.exportExcel({file:this.ImageIp + this.imagePathConfig.salesmanQr + res.responseContent.filename,filename:this.ImageIp + this.imagePathConfig.salesmanQr + res.responseContent.filename});
            this.closeGenerateSalesDialog();
          }
        })
      },
      removeSalesMan(idx,man) {
        let index;
        this.salesmanList[idx].checked = false;
        index = this.members.indexOf(man.id);
        if(index > -1) {
          this.members.splice(index,1);
        }
        // index = this.salesmanListChecked.indexOf(man.id);
        // if(index > -1) {
        //   this.salesmanListChecked.splice(index,1);
        // }
        this.salesmanListChecked = this.members;
      },
      editSale(item) {
        this.manageSale.temp_member_mobile = item.member_mobile;
        this.manageSale.temp_true_name = item.true_name;
        item.edit = false;
        this.isEdit = true;
      },
      editSaleCancel(item) {
        item.member_mobile = this.manageSale.temp_member_mobile;
        item.true_name = this.manageSale.temp_true_name;
        item.edit = true;
        this.isEdit = false;
      },
      editSaleConfirm(item) {
        if(item.true_name == '') {
          util.msg('请填写姓名');
          return;
        }
        if(item.member_mobile) {
          if(!/1[3456789]{1}\d{9}$/.test(item.member_mobile)){
            util.msg('手机号格式不正确');
            return;
          }
        }
        let data = {
          member_mobile:item.member_mobile,
          store_sale_id:item.id,
          true_name:item.true_name
        };
        saleAct.changeSaleName(data).then((res)=>{
          if(res.resultCode === 1) {
            //this.getSaleList();
            this.getStoreSaleList();
            item.edit = true;
            this.isEdit = false;
          }
        });
      },
      getSaleList() {
        let data = this.manageSale.pageParams;
        //saleAct.getStoreSaleList(data).then(res=>{
        saleAct.getSaleList(data).then(res=>{
            for(let item of res.list) {
              item.edit = true;
              item.id = item.store_sale_id;
            }
            this.isEdit = false;
            this.manageSale.saleList = res.list;
            var newPageParams = _.clone(this.manageSale.pageParams)
            newPageParams.total = res.total;
            this.manageSale.pageParams = newPageParams;
          })
      },
      selectSaleSearch() {
        this.selectSale.keyword = this.selectSale.inputKeyword;
        this.getStoreSaleList();
      },
      selectSaleCancelSearch() {
        this.selectSale.keyword = '';
        this.selectSale.inputKeyword = '';
        this.getStoreSaleList();
      },
      openManageDialog() {
        this.setSalesManageDialog(true);
      },
      closeManageDialog() {
        this.manageSale = {
          pageParams:{
            pageIndex:0,
            pageSize:10,
            total:0,
            sale_id:'',
            true_name:'',
            member_mobile:'',
            sale_act_id:0
          },
          saleList:[],
          manageDialog:false,
          temp_true_name:'',
          temp_member_mobile:''
        };
        this.setSalesManageDialog(false);
        //this.getSaleList();
      },
      closeSelectDialog() {
        this.selectSale.selectDialog = false;//先关闭弹窗 再重置数据 弹窗内容不会闪一下
        setTimeout(()=>{
          this.selectSale = {
            selectDialog:false,
            selectSaleIds:this.members,
            keyword:'',
            inputKeyword:''
          };
          this.newName = '';
          this.newTel = '';
          this.addNew = false;
          this.selectSalesmanList = this.salesmanList;
          this.salesmanListChecked = this.members;
        },500);
      },
      changeManageSaleIndex(index){
        this.manageSale.pageParams.pageIndex = index;
        this.getSaleList();
      },
      goodsDetail(item) {
        storage.set('goods_route_name',this.$route.name);
        let routeData = this.$router.resolve({
          name:"store_goods_add_step_two",
          params:{commonId:item.goods_commonid}
        });
        window.open(routeData.href, '_blank');
      },
      updateSaleInfo(sale_act_info){
        this.saleActInfo.sale_title = sale_act_info.sale_title
        this.saleActInfo.sale_end_date = sale_act_info.end_date
        this.saleActInfo.is_show_hot = sale_act_info.is_show_hot
        this.saleActInfo.sale_act_describe = sale_act_info.sale_act_describe
        this.saleActInfo.sale_act_id = sale_act_info.sale_act_id
        //   this.saleActInfo.sale_act_state = res.sale_act_info.sale_act_state
        this.saleActInfo.sale_start_date = sale_act_info.start_date
        this.saleActInfo.sale_title = sale_act_info.sale_title
        this.saleActInfo.sale_title = sale_act_info.sale_title
        this.saleActInfo.store_member_id = sale_act_info.member_id
        this.saleActInfo.store_own_sale_id = sale_act_info.store_sale_id
        this.saleActInfo.qrcode_package = sale_act_info.qrcode_package
        this.saleActInfo.store_name = this.generateParams.name = sale_act_info.store_name
        this.saleActInfo.coupon_flag = sale_act_info.coupon_flag
      },
        selectTitleUlScroll(){
          //alert(document.querySelector("#select_title_ul").scrollTop);
          if(this.isAllowSelectTileLoading && document.querySelector("#select_title_ul").scrollTop+document.getElementById("select_title_ul").clientHeight==document.getElementById("select_title_ul").scrollHeight){
                //$("#loading-text").text("加载中");
                this.isSelectTitleLoading=true;
                this.searchTitle();
          }
         //   if( document.querySelector("#select_title_ul").scrollTop)
          //  var scrollTop = document.querySelector(".routerContent").scrollTop;
           // this.useMarginTop=-1*scrollTop+"px";
        },
        searchTitle(){
          //this.selectTitleOverflowMaxHeight=this.pageParams3.pageSize*29+"px";
          if(this.saleActInfo.sale_title!=''){
              if(!this.isSelectTitleLoading){
                  this.pageParams3.pageIndex=0;
              }
              var data=this.pageParams3;
              data.sale_title=this.saleActInfo.sale_title;
              //data.sale_title='';
              this.selectTitleMouseOver=true;
              saleAct.getList(data).then((res)=>{
                  if(this.isSelectTitleLoading){
                      this.list = [
                          ...this.list,
                          ...res.list];
                  }else{
                      this.list=res.list;
                  }
                  if(this.list.isEmptyObject||this.list==''){
                      this.showSelectTile=false;
                  }else{
                      this.showSelectTile=true;
                      document.getElementById("select_title_ul").addEventListener('scroll',this.selectTitleUlScroll);
                  }
                  var newPageParams = _.clone(this.pageParams3)
                  newPageParams.total = res.total;
                  newPageParams.pageIndex=newPageParams.pageIndex+1;
                  this.pageParams3 = newPageParams;
                  //$("#loading-text").text("下滑加载更多");
                  if(newPageParams.total>newPageParams.pageSize){
                      this.selectTitleOverflow='scroll';
                      if(!this.isSelectTitleLoading){
                          document.querySelector("#select_title_ul").scrollTop=0;
                      }
                  }else{
                      this.selectTitleOverflow='hidden';
                  }
                  if(this.list.length<newPageParams.total){
                      this.isAllowSelectTileLoading=true;
                      //$("#loading-text").show();
                  }else{
                      this.isAllowSelectTileLoading=false;
                     // $("#loading-text").hide();
                  }
                  this.isSelectTitleLoading=false;
              })

          }else{
              this.showSelectTile=false;
          }
        },
        mouseOver(){
          this.selectTitleMouseOver=true
        },
        mouseLeave(){
            this.selectTitleMouseOver=false
        },
        useSetMarginTop(){
            var scrollTop = document.querySelector(".routerContent").scrollTop;
            this.useMarginTop=-1*scrollTop+"px";
        },
        hideSelectTitle(e){
            if(e.keyCode==9||e.keyCode==13){
                this.showSelectTile=false
            }

        },
        selectTitle(sale_act_id,sale_act_title){
          this.saleActInfo.sale_title=sale_act_title
            this.showSelectTile=false
            //storage.set('sale_act_id',sale_act_id)
            var data = {
                sale_act_id:sale_act_id
            }
            saleAct.activityDetail(data).then((res)=>{
                //this.goodsList = res.goods_list
                //this.resetGoods()
                this.members = res.member_list
                this.saleActInfo.sale_title = res.sale_act_info.sale_title
                this.saleActInfo.sale_end_date = res.sale_act_info.end_date
                this.saleActInfo.is_show_hot = res.sale_act_info.is_show_hot
                this.saleActInfo.sale_act_describe = res.sale_act_info.sale_act_describe
                //this.saleActInfo.sale_act_id = res.sale_act_info.sale_act_id
                this.sale_act_id = res.sale_act_info.sale_act_id;
                //   this.saleActInfo.sale_act_state = res.sale_act_info.sale_act_state
                this.saleActInfo.sale_start_date = res.sale_act_info.start_date
                this.saleActInfo.sale_title = res.sale_act_info.sale_title
                this.saleActInfo.sale_title = res.sale_act_info.sale_title
                this.saleActInfo.store_member_id = res.sale_act_info.member_id
                this.saleActInfo.store_own_sale_id = res.sale_act_info.store_sale_id
                this.saleActInfo.coupon_flag = res.sale_act_info.coupon_flag
                //this.updateSaleInfo(res.sale_act_info)
                this.getStoreSaleList()
            })
            saleAct.activityGoods(data).then((res)=>{
              this.goodsList = res.goods_list
              this.resetGoods()
              this.getSecondClass();
            })
            var _self = this;
            layui.use('layer', function(){
                this.layer = layui.layer;
            });
            layui.use('laydate', function(){
                var laydate = layui.laydate;
                laydate.render({
                    elem: '#start_date',
                    theme: "grid",
                    type:'datetime',
                    format:'yyyy-MM-dd HH:mm',
                    trigger:'click',
                    done:function(data){
                        _self.validData.startTimeErr = false
                        _self.saleActInfo.sale_start_date = data
                    }
                });
                laydate.render({
                    elem: '#end_date',
                    theme: "grid",
                    type:'datetime',
                    format:'yyyy-MM-dd HH:mm',
                    trigger:'click',
                    done:function(data){
                        _self.validData.endtimeErr = false
                        _self.saleActInfo.sale_end_date = data
                    }
                });

            })
         //   $(".pop-category-used").hide();
        },
        blurSearchTitle() {
          if(!this.selectTitleMouseOver){
              this.showSelectTile=false
          }

        },
      getDetail(){
        var data = {
          sale_act_id:this.sale_act_id
        }
        saleAct.activityDetail(data).then((res)=>{
          if(res.can_edit){
            this.setEdit(true)
          }else{
            this.editFlag = 0
              this.setEdit(false)
          }
          this.originResponsecontent.member_list = res.member_list;
          this.originResponsecontent.sale_act_info = res.sale_act_info;
          //this.goodsList = _.clone(res.goods_list)
          //this.newGoodsList = [];
          //this.resetGoods()
          this.members = res.member_list
          this.updateSaleInfo(res.sale_act_info)
          this.getStoreSaleList()
        })
        saleAct.activityGoods(data).then((res)=>{
          this.goodsList =  _.clone(res.goods_list)
          this.newGoodsList = [];
          this.resetGoods()
          this.originResponsecontent.goods_list = JSON.parse(JSON.stringify(this.goodsList));
          this.getSecondClass();
        })
      },
      getStoreSaleList(){
        var data = {
          keyword:this.selectSale.keyword
        };
        this.salesmanListChecked = [];
        // if(data.keyword === '' && this.salesmanList.length > 0) {//没有搜索直接取原来的所有数据
        //   this.selectSalesmanList = this.salesmanList;
        //   this.salesmanListChecked = this.members;
        //   return;
        // }
        saleAct.getStoreSaleList(data).then((res)=>{
          var salesman = res.list
          var ms = this.members.toString().split(',');
          if(this.pageType == 1) {
            var shopkeeper = false;
          }else{
            var shopkeeper = true;
          }
          let kepperIdx = -1;
          salesman.forEach((item,i) =>{
            var find = false;
            if(!shopkeeper && item.member_id == this.saleActInfo.store_member_id) {//店主默认选中
              this.saleActInfo.store_own_sale_id = item.id;
              kepperIdx = i;
              shopkeeper = true;
              find = true
              this.salesmanListChecked.push(item.id);
              if(this.originResponsecontent.member_list.indexOf(item.id) == -1) {
                this.originResponsecontent.member_list.push(item.id)
              }
            }else{
              ms.map((m)=>{
                if(m == item.id){
                  find = true
                  this.salesmanListChecked.push(item.id);
                  if(item.id == this.saleActInfo.store_own_sale_id) {
                    kepperIdx = i;
                  }
                }
              })
            }
            salesman[i].checked = find
            salesman[i].change = false
          })
          if(kepperIdx > -1) {
            //把店主移到第一位
            salesman.unshift(salesman[kepperIdx]);
            salesman.splice(kepperIdx+1,1)
          }
          if(!shopkeeper && !this.selectSale.keyword) {
            //添加店主为销售员
            saleAct.addSale({shopkeeper:1}).then(res=>{
              if(res.resultCode === 1){
                var man = {
                  member_avatar:res.responseContent.member_avatar_url,
                  member_id:res.responseContent.member_id,
                  member_name:res.responseContent.member_name,
                  true_name:res.responseContent.member_name,
                  change:false,
                  checked:true,
                  id:res.responseContent.id
                }
                salesman.push(man);
                this.salesmanListChecked.push(man.id);
                //this.members.push(man.id);
              }
            })
          }
          this.selectSalesmanList = salesman;
          if(!this.selectSale.keyword) {
            this.salesmanList = salesman;
            this.members = this.salesmanListChecked;
          }else{
            if(salesman.length === 0) {
              util.msg('没有匹配的销售员');
            }
          }
        })
        this.selectSale.selectSaleIds = this.salesmanListChecked;
      },
      showEdit(member_id){
        var mans = this.salesmanList
        mans.forEach((item,i)=>{
          if(item.member_id == member_id){
            mans[i].change = true
          }else{
            mans[i].change = false
          }
        })
      },
      saveEdit(idx){
        var mans = this.salesmanList
        var data ={
          member_id:mans[idx].member_id,
          true_name:mans[idx].member_name

        }
        saleAct.changeSaleName(data).then((res)=>{
          mans[idx].change = false
        })
      },
      async addNewConfirm(){
        let close = true;
        if(this.addNew) {
          if(this.newName == ''){
            util.msg('请填写销售员姓名');
            return;
          }
          if(this.newTel === '') {
            util.msg('请输入销售员手机号');
            return;
          }
          if(!/1[3456789]{1}\d{9}$/.test(this.newTel)){
            util.msg('手机号格式不正确');
            return;
          }
          var mans = _.clone(this.salesmanList)
          var data ={
            tel:this.newTel,
            true_name:this.newName
          }
          let res = await saleAct.addSale(data);
          util.msg(res.shortMessage);
          if(res.resultCode === 1){
            if(res.responseContent.hasOwnProperty('store_sale_id')) {
              util.msg('已存在该手机号的销售员，已为您自动选择');
              for (let item of this.salesmanList) {
                if(item.id == res.responseContent.store_sale_id) {
                  item.checked = true;
                  break;
                }
              }
            }else{
              var man = {
                member_avatar:res.responseContent.member_avatar_url,
                member_id:res.responseContent.member_id,
                member_name:data.true_name,
                true_name:data.true_name,
                change:false,
                checked:true,
                id:res.responseContent.id
              }
              this.salesmanList.push(man);
              this.members.push(man.id);
            }
          }else{
            close = false;
          }
        }
        if(this.selectSale.selectSaleIds.length > 0 || this.salesmanListChecked.length > 0) {
          let selectSaleIds = _.clone(this.selectSale.selectSaleIds);
          let salesmanListChecked = _.clone(this.salesmanListChecked);
          let nowSalesmanListChecked = [];
          let index,index2,members = [];
          for(let item of this.salesmanList) {
            index = selectSaleIds.indexOf(item.id);
            index2 = salesmanListChecked.indexOf(item.id);
            if(index > -1) {
              item.checked = true;
              //selectSaleIds.splice(index,1);
              nowSalesmanListChecked.push(item.id);
            }else if(index2 > -1){
              item.checked = false;
              //salesmanListChecked.splice(index2,1);
            }
            item.checked && members.push(item.id);
          }
          this.members = members;
          this.salesmanListChecked = nowSalesmanListChecked
        }
        if(close) {
          this.closeSelectDialog();
        }
      },
      oldSelectOne(event,i){
        var gs = _.clone(this.oldGoodsList)
        if(event.target.checked){
          gs[i].selected = true
        }else{
          gs[i].selected = false
        }
        this.oldGoodsList = gs
        //引用赋值 修改元素的值原来的goodsList也会被修改 所以不用再去同步
        //this.updateGoods()
      },
      newSelectOne(event,i){
        var gs = _.clone(this.newGoodsPageList)
        if(event.target.checked){
          gs[i].selected = true
        }else{
          gs[i].selected = false
        }
        this.newGoodsPageList = gs
        //引用赋值 修改元素的值原来的newGoodsList也会被修改 所以不用再去同步
        //this.updateNewGoods()
      },
      alertSelectOne(event,i){
        var gs = _.clone(this.alertGoodsPageList)
        if(event.target.checked){
          gs[i].selected = true
        }else{
          gs[i].selected = false
        }
        this.alertGoodsPageList = gs
        //引用赋值 修改元素的值原来的newGoodsList也会被修改 所以不用再去同步
        //this.updateNewGoods()
      },
      alertStorageSelectOne(event,i){
        var gs = _.clone(this.alertStoragePageList)
        if(event.target.checked){
          gs[i].selected = true
        }else{
          gs[i].selected = false
        }
        this.alertStoragePageList = gs
        //引用赋值 修改元素的值原来的newGoodsList也会被修改 所以不用再去同步
        //this.updateNewGoods()
      },
      goodsSearch() {
        this.goodsKeyword = this.tempGoodsKeyword;
        this.gc_id_2 = this.temp_gc_id_2;
        this.gc_id_3 = this.temp_gc_id_3;
        this.gc_id_3 = this.temp_gc_id_3;
        this.rangeKeyword1 = this.tempRangeKeyword1;
        this.rangeKeyword2 = this.tempRangeKeyword2;
        this.pageParams.pageIndex = 0;
        this.pageParams2.pageIndex = 0;
        if(this.goodsKeyword === '' && this.gc_id_2 == 0 && this.gc_id_3 == 0 && this.rangeKeyword1 === '' && this.rangeKeyword2 === '' && this.goodsStateType == 1) {
          this.cancelBtnShow = false;
        }else{
          this.cancelBtnShow = true;
        }
        if(this.goodsType == 1 && this.sale_act_id > 0) {
          this.resetGoods();
          //this.getOldGoods();
        }else{
          this.resetNewGoods();
          //this.getNewGoods();
        }
      },
      resetGoodsParams() {
        this.goodsKeyword = this.tempGoodsKeyword = '';
        this.gc_id_2 = this.temp_gc_id_2 = this.gc_id_3 = this.temp_gc_id_3 = 0;
        this.tempRangeKeyword1 = this.tempRangeKeyword2 = this.rangeKeyword1 = this.rangeKeyword2 = '';
        this.pageParams.pageIndex = 0;
        this.pageParams2.pageIndex = 0;
        this.goodsStateType = 1;
        this.rangeType = 1;
      },
      cancelGoodsSearch() {
        this.resetGoodsParams();
        this.goodsSearch()
      },
      goodsTypeChange(goodsType) {
        this.goodsType = goodsType;
        this.resetGoodsParams();
        this.updateSecondClass();
        if(goodsType == 2) {
          //this.getNewGoods();
          this.resetNewGoods();
        }else{
          //this.getOldGoods();
          this.resetGoods();
        }
      },
      getNewGoods(){
        var origins = _.clone(this.newGoodsList)
        var olds = []
        var count = 0
        var start = this.pageParams2.pageIndex * this.pageParams2.pageSize;
        var index = 0;
        var match;
        origins.forEach((item,i)=>{
          if(!this.checkMatch(item)) {
            return false;
          }
          if(index >= start && count < this.pageParams2.pageSize){
            olds[count] = item
            count++
          }
          index++;
        })
        if(olds.length == 0 && this.pageParams2.pageIndex > 0){
          this.pageParams2.pageIndex -= 1
          this.getNewGoods()
          return;
        }
        this.newGoodsPageList = _.clone(olds)
        var newPageParams = _.clone(this.pageParams2)
        //newPageParams.total = origins.length;
        newPageParams.total = index;
        this.pageParams2 = newPageParams;
      },
      getAlertGoods(){
        var origins = _.clone(this.alertGoodsList)
        var olds = []
        var count = 0
        var start = this.pageParams4.pageIndex * this.pageParams4.pageSize;
        var index = 0;
        origins.forEach((item,i)=>{
          if(index >= start && count < this.pageParams4.pageSize){
            olds[count] = item
            count++
          }
          index++;
        })
        if(olds.length == 0 && this.pageParams4.pageIndex > 0){
          this.pageParams4.pageIndex -= 1
          this.getAlertGoods()
          return;
        }
        this.alertGoodsPageList = _.clone(olds)
        var newPageParams = _.clone(this.pageParams4)
        //newPageParams.total = origins.length;
        newPageParams.total = index;
        this.pageParams4 = newPageParams;
      },
      getAlertStorage(){
        var origins = _.clone(this.alertStorageList)
        var olds = []
        var count = 0
        var start = this.pageParams5.pageIndex * this.pageParams5.pageSize;
        var index = 0;
        origins.forEach((item,i)=>{
          if(index >= start && count < this.pageParams5.pageSize){
            olds[count] = item
            count++
          }
          index++;
        })
        if(olds.length == 0 && this.pageParams5.pageIndex > 0){
          this.pageParams5.pageIndex -= 1
          this.getAlertStorage()
          return;
        }
        this.alertStoragePageList = _.clone(olds)
        var newPageParams = _.clone(this.pageParams5)
        //newPageParams.total = origins.length;
        newPageParams.total = index;
        this.pageParams5 = newPageParams;
      },
      checkMatch(item) {
        if(!this.cancelBtnShow) {
          return true;
        }
        if(this.gc_id_2 > 0 && item.gc_id_2 != this.gc_id_2) {
            return false;
        }
        if(this.gc_id_3 != 0) {
          if(this.gc_id_3.toString().indexOf('_') > -1) {
            if(this.gc_id_3 != item.goods_class_t_id) {
              return false;
            }
          }else{
            if(this.gc_id_3 != item.gc_id_3) {
              return false;
            }
          }
        }
        let goodsStateType = parseInt(this.goodsStateType);
        if(goodsStateType > 1) {
          switch (goodsStateType) {
            case 2:
              if(item.desc) return false
              break;
            case 3:
              if(item.desc !== '已下架') return false
              break;
            case 4:
              if(item.desc !== '已删除') return false
              break;
            case 5:
              if(item.desc !== '无库存') return false
              break;
          }
        }
        if(this.rangeKeyword1 !== '' || this.rangeKeyword2 !== ''){
          let rangeType = parseInt(this.rangeType);
          let rangeKeyword;
          switch (rangeType) {
            case 1:
              rangeKeyword = parseFloat(item.discount_price);
              break;
            case 2:
              rangeKeyword = parseFloat(item.goods_storage);
              break;
            case 3:
              rangeKeyword = parseFloat(item.rebate_amount);
              break;
            case 4:
              if (!isNaN(item.discount_price) && item.discount_price!== '' && parseFloat(item.goods_marketprice) > 0) {
                item.goods_disount = util.discount(item.discount_price, item.goods_marketprice, 1) ;
              }else{
                item.goods_disount = 0;
              }
              rangeKeyword = parseFloat(item.goods_disount);
              break;
            case 5:
              rangeKeyword = parseFloat(item.goods_marketprice);
              break;
            case 6:
              rangeKeyword = parseFloat(item.goods_price);
              break;
          }
          rangeKeyword = isNaN(rangeKeyword) ? 0 : rangeKeyword;
          if(this.rangeKeyword1 !== '' &&  !(rangeKeyword >= parseFloat(this.rangeKeyword1))) {
            return false;
          }
          if(this.rangeKeyword2 !== ''  && !(rangeKeyword <= parseFloat(this.rangeKeyword2))) {
            return false;
          }
        }
        if(this.goodsKeyword !== '') {
          let keyword = this.goodsKeyword.split(/\s+/);
          for(let k of keyword) {
            if(item.goods_name_spec.indexOf(k) === -1) {
              return false;
            }
          }
        }
        return true;
      },
      getOldGoods(){
        var origins = _.clone(this.goodsList)
        var olds = []
        var count = 0
        var start = this.pageParams.pageIndex * this.pageParams.pageSize;
        var index = 0;
        var match;
        origins.forEach((item,i)=>{
          if(!this.checkMatch(item)) {
            return false;
          }
          if(index >= start && count < this.pageParams.pageSize){
            olds[count] = item
            count++
          }
          index++;
        })
        if(olds.length == 0 && this.pageParams.pageIndex > 0){
          this.pageParams.pageIndex -= 1
          this.getOldGoods()
          return;
        }
        this.oldGoodsList = _.clone(olds)
        var newPageParams = _.clone(this.pageParams)
        //newPageParams.total = origins.length;
        newPageParams.total = index;
        this.pageParams = newPageParams;
      },
      itemDraggable(event){
        this.updateGoods()
      },
      newItemDraggable(event){
        this.updateNewGoods()
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        //this.oldSelectPage = false;
        this.getOldGoods();
      },
      changeIndex2(index){
        this.pageParams2.pageIndex = index;
        //this.newSelectPage = false;
        this.getNewGoods(this.pageParams2);
      },
      changeIndex4(index){
        this.pageParams4.pageIndex = index;
        //this.alertSelectPage = false;
        this.getAlertGoods(this.pageParams4);
      },
      changeIndex5(index){
        this.pageParams5.pageIndex = index;
        //this.alertSelectPage = false;
        this.getAlertStorage(this.pageParams5);
      },
      resetGoods(type){
        if(type == 1) {
          let oldGoodsList = _.clone(this.oldGoodsList);
          oldGoodsList.forEach((item,i)=>{
            item.selected = false
          })
          this.oldGoodsList = oldGoodsList;
        }else{
          let goodsList = _.clone(this.goodsList);
          goodsList.forEach((item,i)=>{
            item.selected = false
          })
          this.goodsList = goodsList;
        }

      },
      resetNewGoods(type){
        if(type == 1) {
          let newGoodsPageList = _.clone(this.newGoodsPageList);
          newGoodsPageList.forEach((item,i)=>{
            item.selected = false
          })
          this.newGoodsPageList = newGoodsPageList;
        }else{
          let newGoodsList = _.clone(this.newGoodsList);
          newGoodsList.forEach((item,i)=>{
            item.selected = false
          })
          this.newGoodsList = newGoodsList;
        }

      },
      resetAlertGoods(type){
        if(type == 1) {
          let alertGoodsPageList = _.clone(this.alertGoodsPageList);
          alertGoodsPageList.forEach((item,i)=>{
            item.selected = false
          })
          this.alertGoodsPageList = alertGoodsPageList;
        }else{
          let alertGoodsList = _.clone(this.alertGoodsList);
          alertGoodsList.forEach((item,i)=>{
            item.selected = false
          })
          this.alertGoodsList = alertGoodsList;
        }

      },
      resetAlertStorage(type){
        if(type == 1) {
          let alertStoragePageList = _.clone(this.alertStoragePageList);
          alertStoragePageList.forEach((item,i)=>{
            item.selected = false
          })
          this.alertStoragePageList = alertStoragePageList;
        }else{
          let alertStorageList = _.clone(this.alertStorageList);
          alertStorageList.forEach((item,i)=>{
            item.selected = false
          })
          this.alertStorageList = alertStorageList;
        }

      },
      setAllNewGoods(){
        let newGoodsList = _.clone(this.newGoodsList);
        newGoodsList.forEach((item,i)=>{
          if(this.checkMatch(item)) {
            newGoodsList[i].selected = true
          }
        })
        this.newGoodsList = newGoodsList;
      },
      setAllAlertGoods(){
        let alertGoodsList = _.clone(this.alertGoodsList);
        alertGoodsList.forEach((item,i)=>{
          alertGoodsList[i].selected = true
        })
        this.alertGoodsList = alertGoodsList;
      },
      setAllAlertStorage(){
        let alertStorageList = _.clone(this.alertStorageList);
        alertStorageList.forEach((item,i)=>{
          alertStorageList[i].selected = true
        })
        this.alertStorageList = alertStorageList;
      },
      updateNewGoods(){
        var count = 0
        var start = this.pageParams2.pageIndex * 10;
        this.newGoodsPageList.forEach((item,i)=>{
          if( count < 10){
            this.newGoodsList[start] = item
            start++
            count++
          }
        })
      },
      setAllGoods(){
        let goodsList = _.clone(this.goodsList);
        goodsList.forEach((item,i)=>{
          if(this.checkMatch(item)) {
            goodsList[i].selected = true
          }
        })
        this.goodsList = goodsList;
      },
      updateGoods(){
        var count = 0
        var start = this.pageParams.pageIndex * 10;
        this.oldGoodsList.forEach((item,i)=>{
          if( count < 10){
            this.goodsList[start] = item
            start++
            count++
          }
        })
      },
      updateAllGoods(){
        var all = this.goodsList.concat(this.newGoodsList)
        this.allGoodsList = all
      },
      updateOldGoods(event,type){
        this.resetGoods(type)
        if(event.target.checked){
          if(type == 1){
            //this.oldSelectAll = false
            let oldGoodsList = _.clone(this.oldGoodsList);
            oldGoodsList.forEach((item,i)=>{
              item.selected = true
            })
            this.oldGoodsList = oldGoodsList;
          }else{
            //this.oldSelectPage = false
            this.setAllGoods()
          }
        }
      },
      selectNewGoods(event,type){
        this.resetNewGoods(type)
        if(event.target.checked){
          if(type == 1){
            //this.newSelectAll = false
            let newGoodsPageList = _.clone(this.newGoodsPageList);
            newGoodsPageList.forEach((item,i)=>{
              item.selected = true
            })
            this.newGoodsPageList = newGoodsPageList;
          }else{
            //this.newSelectPage = false
            this.setAllNewGoods()
          }
        }
      },
      selectAlertGoods(event,type){
        this.resetAlertGoods(type)
        if(event.target.checked){
          if(type == 1){
            //this.newSelectAll = false
            let alertGoodsPageList = _.clone(this.alertGoodsPageList);
            alertGoodsPageList.forEach((item,i)=>{
              item.selected = true
            })
            this.alertGoodsPageList = alertGoodsPageList;
          }else{
            //this.newSelectPage = false
            this.setAllAlertGoods()
          }
        }
      },
      selectStorageAlertGoods(event,type){
        this.resetAlertStorage(type)
        if(event.target.checked){
          if(type == 1){
            //this.newSelectAll = false
            let alertStoragePageList = _.clone(this.alertStoragePageList);
            alertStoragePageList.forEach((item,i)=>{
              item.selected = true
            })
            this.alertStoragePageList = alertStoragePageList;
          }else{
            //this.newSelectPage = false
            this.setAllAlertStorage()
          }
        }
      },
      oldRemove(){
        var goods = []
        var has = false
        this.goodsList.forEach((item,i)=>{
          if(!item.selected){
            goods.push(item)
          }else{
            has = true
          }
        })
        if(!has){
          //this.noSelectDialog = true
          util.msg('请选择需要操作的商品');
          return
        }
        this.oldSelectPage = false;
        this.oldSelectAll = false;
        this.goodsList = goods;
        this.updateSecondClass();
      },
      newRemove(){
        var goods = []
        var has = false
        this.newGoodsList.forEach((item,i)=>{
          if(!item.selected){
            goods.push(item)
          }else{
            has = true
          }
        })
        if(!has){
          //this.noSelectDialog = true
          util.msg('请选择需要操作的商品');
          return
        }
        this.newSelectPage = false;
        this.newSelectAll = false;
        this.newGoodsList = goods;
        this.updateSecondClass();
      },
      oldRemoveOne(g){
        this.goodsList.forEach((item,i)=>{
          if(item.goods_id == g.goods_id){
            this.goodsList.splice(i,1)
          }
        })
        this.updateSecondClass();
      },
      newRemoveOne(g){
        this.newGoodsList.forEach((item,i)=>{
          if(item.goods_id == g.goods_id){
            this.newGoodsList.splice(i,1)
          }
        })
        this.updateSecondClass();
      },
      existRemoveOne(g){
        this.existGoods.forEach((item,i)=>{
          if(item.goods_id == g.goods_id){
            this.existGoods.splice(i,1)
          }
        })
      },
      newAddOne(g){
        let a = _.clone(g);
        a.discount_price = g.goods_price;
        a.rebate_amount = '';
        if(a.goods_storage == 0) {
            a.desc = '无库存';
        }
        //this.newGoodsList.push(g)
        //this.newGoodsList.unshift(g) 点击确定再添加商品
        this.existGoods.unshift(a);
      },
      oldSetPrice(){
        this.oldErr = "";
        this.setPriceType = 0;
        this.oldSetNewPrice = '';
        this.oldSetType = 1;
        this.discountBasics = 1;
        var has = false
        for(let item of this.goodsList) {
          if(item.selected){
            has = true;
            break;
          }
        }
        if(!has){
          //this.noSelectDialog = true
          util.msg('请选择需要操作的商品');
          return
        }
        this.confirmOldDialog = true
      },
      newSetPrice(){
        this.oldErr = ''
          this.setPriceType = 1;
        this.oldSetNewPrice = '';
        this.oldSetType = 1;
        this.discountBasics = 1;
        var has = false
        for(let item of this.newGoodsList) {
          if(item.selected){
            has = true;
            break;
          }
        }
        if(!has){
          //this.noSelectDialog = true
          util.msg('请选择需要操作的商品');
          return
        }
        this.confirmOldDialog = true
      },
      alertSetPrice(){
        this.oldErr = ''
        this.setPriceType = 2;
        this.oldSetNewPrice = '';
        this.oldSetType = 1;
        this.discountBasics = 1;
        var has = false
        for(let item of this.alertGoodsList) {
          if(item.selected){
            has = true;
            break;
          }
        }
        if(!has){
          //this.noSelectDialog = true
          util.msg('请选择需要操作的商品');
          return
        }
        this.confirmOldDialog = true
      },
      oldSetRebate() {
        this.rebateErr = "";
        this.rebatGoodsType = 0;
        this.rebatePrice = '';
        this.rebateSetType = 1;
        this.rebateDiscountBasics = 1;
        var has = false

        for(let item of this.goodsList) {
          if(item.selected){
            has = true;
            break;
          }
        }
        if(!has){
          //this.noSelectDialog = true
          util.msg('请选择需要操作的商品');
          return
        }
        this.rebateDialog = true
      },
      newSetRebate() {
        this.rebateErr = "";
        this.rebatGoodsType = 1;
        this.rebatePrice = '';
        this.rebateSetType = 1;
        this.rebateDiscountBasics = 1;
        var has = false
        for(let item of this.newGoodsList) {
          if(item.selected){
            has = true;
            break;
          }
        }
        if(!has){
          //this.noSelectDialog = true
          util.msg('请选择需要操作的商品');
          return
        }
        this.rebateDialog = true
      },
      alertSetRebate() {
        this.rebateErr = "";
        this.rebatGoodsType = 2;
        this.rebatePrice = '';
        this.rebateSetType = 1;
        this.rebateDiscountBasics = 1;
        var has = false
        for(let item of this.alertGoodsList) {
          if(item.selected){
            has = true;
            break;
          }
        }
        if(!has){
          //this.noSelectDialog = true
          util.msg('请选择需要操作的商品');
          return
        }
        this.rebateDialog = true
      },
      confirmOld(){
        var price;
        if(this.oldSetType == 1){
          if(this.oldSetNewPrice === '') {
            this.oldErr = "请设置活动价";
            return
          }
          this.oldSetNewPrice = util.number_format(this.oldSetNewPrice,2)
          if(this.oldSetNewPrice < 0){
            this.oldErr = "活动价必须为不小于0的数值";
            return
          }
        }else{
          if(this.discountBasics != 1 && this.discountBasics != 2) {
            this.oldErr = "请选择折扣计算基础";
            return
          }
          if(this.oldSetNewPrice === '') {
            this.oldErr = "请设置折扣值";
            return
          }
          var r = /^([1-9]([0-9])?|100|0)$/;
          if(!r.test(this.oldSetNewPrice)) {
            this.oldErr = "折扣值需为0-100的整数";
            return
          }
        }
        if(this.setPriceType == 1){
          var gs = _.clone(this.newGoodsList)
        }else if(this.setPriceType == 2){
          var gs = _.clone(this.alertGoodsList)
        }else{
          var gs = _.clone(this.goodsList)
        }

        gs.forEach((item,i)=>{
          if(item.selected){
            if(this.oldSetType == 1){
              gs[i].discount_price = this.oldSetNewPrice
            }else{
              if(this.discountBasics == 1) {
                gs[i].discount_price = util.number_format(parseFloat(gs[i].goods_marketprice)*100*this.oldSetNewPrice/10000,2)
              }else if(this.discountBasics == 2) {
                gs[i].discount_price = util.number_format(parseFloat(gs[i].goods_price)*100*this.oldSetNewPrice/10000,2)
              }
            }
          }
        })
        this.confirmOldDialog = false
      },
      alertGoodsConfirm() {
        let find = false;
        let goodsList = _.clone(this.goodsList);
        let newGoodsList = _.clone(this.newGoodsList);
        let alertGoodsList = _.clone(this.alertGoodsList);
        let list = [];
        for(let item of alertGoodsList) {
          if(parseFloat(item.discount_price) > parseFloat(item.goods_price)) {
            list.push(item);
            continue;
          }else{
            item.selected = false;
          }
          find = false;
          for (let idx2 in goodsList) {
            if(goodsList[idx2].goods_id == item.goods_id) {
              goodsList[idx2] = item;
              find = true;
              break;
            }
          }
          if(!find) {
            for (let idx3 in newGoodsList) {
              if(newGoodsList[idx3].goods_id == item.goods_id) {
                newGoodsList[idx3] = item;
                break;
              }
            }
          }
        }
        this.newGoodsList = newGoodsList;
        this.goodsList = goodsList;
        this.alertGoodsList = list;
        if(list.length === 0) {
          this.alertDialog = false;
          if(this.pageType == 1) {
            this.submitTwo();
          }else{
            this.submit();
          }
        }
      },
      rebateConfirm() {
        let rebatePrice;
        if(this.rebateSetType == 1) {
          if(this.rebatePrice === '') {
            this.rebateErr = "请输入返利值";
            return;
          }
          this.rebatePrice = util.number_format(this.rebatePrice,2)
          // if(this.rebatePrice < 0){
          //   this.rebateErr = "返利值必须为大于等于0的数值";
          //   return
          // }
        }else{
          if(this.rebateDiscountBasics != 1 && this.rebateDiscountBasics != 2) {
            this.rebateErr = "请选择折扣计算基础";
            return;
          }
          if(this.rebatePrice === '') {
            this.rebateErr = "请输入折扣";
            return;
          }
          // var r = /^([1-9]([0-9])?|100|0)$/;
          // if(!r.test(this.rebatePrice)) {
          //   this.rebateErr = "折扣值需为0-100的整数";
          //   return
          // }
          rebatePrice = parseFloat(this.rebatePrice);
          if(isNaN(rebatePrice) || rebatePrice > 100 || rebatePrice < 0) {
            this.rebateErr = "折扣仅支持输入0-100的数值";
            return;
          }
        }
        if(this.rebatGoodsType == 1) {
          var gs = _.clone(this.newGoodsList)
        }else if(this.rebatGoodsType == 2){
          var gs = _.clone(this.alertGoodsList)
        }else{
          var gs = _.clone(this.goodsList)
        }
        gs.forEach((item,i)=>{
          if(item.selected){
            if(this.rebateSetType == 1){
              gs[i].rebate_amount = this.rebatePrice
            }else{
              if(this.rebateDiscountBasics == 1) {
                gs[i].rebate_amount = util.number_format(parseFloat(gs[i].goods_marketprice)*100*rebatePrice/10000,2)
              }else if(this.rebateDiscountBasics == 2) {
                gs[i].rebate_amount = util.number_format(parseFloat(gs[i].goods_price)*100*rebatePrice/10000,2)
              }
            }
          }
        })
        this.rebateDialog = false
      },
      removeOneGoods(event){
        this.oldRemoveOne(event.good)
        this.newRemoveOne(event.good)
        this.existRemoveOne(event.good)
      },
      addOneGoods(event){
        // if(this.goodsType == 2) {
        //   this.cancelGoodsSearch();
        // }else{
        //   this.goodsType = 2;
        // }
        this.newAddOne(event)

      },
      addPageGoods(event){
        // if(this.goodsType == 2) {
        //   this.cancelGoodsSearch();
        // }else{
        //   this.goodsType = 2;
        // }
        event.forEach((item,i)=>{
          if(!item.isExist){
            this.newAddOne(item)
          }
        })
      },
      validateOne() {
        let validRes = true;
        if(this.saleActInfo.sale_title == ''){
          this.validData.saleTitleErr = true
          validRes = false
        }
        if(this.saleActInfo.sale_start_date == ''){
          this.validData.startDateErr = true
          validRes = false
        }
        if(this.saleActInfo.sale_end_date == ''){
          this.validData.endDateErr = true
          validRes = false
        }

        if(this.saleActInfo.sale_end_date != ''){
          this.validData.endDateLittleErr = false;
          this.validData.endDateLittleNowErr = false;
          if(this.saleActInfo.sale_start_date >= this.saleActInfo.sale_end_date){
            this.validData.endDateLittleErr = true
            validRes = false
          }else{
            if(new Date(this.saleActInfo.sale_end_date.replace(/-/g, '/')).getTime() < new Date().getTime()) {
              this.validData.endDateLittleNowErr = true
              validRes = false
            }
          }
        }
        if(this.saleActInfo.is_show_hot === ''){
          this.validData.showHotErr = true
          validRes = false
        }
        return validRes;
      },
      validateTwo(createDialogValidate,storageDialogValidate) {
        if(this.newGoodsList.length === 0 && this.goodsList.length === 0) {
          util.msg('请添加商品!')
          return false;
        }
        var goods = [],validate = true,good = [],createDialog = createDialogValidate,storageDialog = storageDialogValidate;
        this.alertGoodsList = [],this.alertStorageList = [];
        if(this.pageType == 1 || this.pageType == 2) {
          for(let item of this.newGoodsList) {
            let discount_price = parseFloat(item.discount_price);
            let rebate_amount = parseFloat(item.rebate_amount);
            let goods_price = parseFloat(item.goods_price);
            if(discount_price != goods_price) {
              createDialog = false;
            }
            if(discount_price > goods_price) {
              good = _.clone(item);
              good.selected = false;
              this.alertGoodsList.push(good);
              continue;
            }else{
              if(storageDialog && item.desc === '无库存') {
                good = _.clone(item);
                good.selected = false;
                this.alertStorageList.push(good);
                continue;
              }
              if(item.discount_price === '') {
                util.msg('请配置商品活动价');
                validate = false;
                break;
              }
              if(item.rebate_amount === '') {
                util.msg('请配置返利值');
                validate = false;
                break;
              }
              if(isNaN(discount_price) ||  discount_price < 0) {
                util.msg('活动价需大于等于0');
                validate = false;
                break;
              }
              if(isNaN(rebate_amount) || rebate_amount < 0) {
                util.msg('返利值需大于等于0');
                validate = false;
                break;
              }
              if(rebate_amount > discount_price) {
                util.msg('返利值不得大于活动价');
                validate = false;
                break;
              }
            }
            goods.push({
              gid:item.goods_id,
              price:item.discount_price,
              rebate_amount:item.rebate_amount
            })
          }
          if(!validate) {
            return;
          }
          for(let item of this.goodsList) {
            let discount_price = parseFloat(item.discount_price);
            let rebate_amount = parseFloat(item.rebate_amount);
            let goods_price = parseFloat(item.goods_price);
            if(discount_price != goods_price) {
              createDialog = false;
            }
            if(discount_price > goods_price) {
              good = _.clone(item);
              good.selected = false;
              this.alertGoodsList.push(good);
              continue;
            }else{
              if(storageDialog && item.desc === '无库存') {
                good = _.clone(item);
                good.selected = false;
                this.alertStorageList.push(good);
                continue;
              }
              if(item.discount_price === '') {
                util.msg('请配置商品活动价');
                validate = false;
                break;
              }
              if(item.rebate_amount === '') {
                util.msg('请配置返利值');
                validate = false;
                break;
              }
              if(isNaN(discount_price) || discount_price < 0) {
                util.msg('活动价需大于等于0');
                validate = false;
                break;
              }
              if(isNaN(rebate_amount) || rebate_amount < 0) {
                  util.msg('返利值需大于等于0');
                  validate = false;
                  break;
              }
              if(rebate_amount > discount_price) {
                util.msg('返利值不得大于活动价');
                validate = false;
                break;
              }

            }
            goods.push({
              gid:item.goods_id,
              price:item.discount_price,
              rebate_amount:item.rebate_amount
            })
          }
          if(!validate) {
            return;
          }
          if(createDialog) {
            this.createDialog = true;
            return;
          }
          if(this.alertGoodsList.length > 0) {
            this.resetGoods();//去掉选中状态
            this.resetNewGoods();//去掉选中状态
            this.alertDialog = true;
            return;
          }
          if(this.alertStorageList.length > 0) {
            this.alertStorageDialog = true;
            return;
          }
          // if(goods.length == 0){
          //   util.msg('请添加商品!')
          //   return false;
          // }
        }
        return goods;
      },
      validateThree() {
        var store_sale_id = []
        if(this.pageType == 1 || this.pageType == 3) {
          if(this.unknownSales) {
            if(this.generateParams.identification === '') {
              util.msg('为便于区分，请填写销售员备注');
              return;
            }
            if(!/^((1?[1-9])|10|20)$/.test(this.generateParams.num)) {
              util.msg('生成数量需为大于0且小于等于20的正整数');
              return;
            }
            if(this.generateParams.name === '') {
              util.msg('请填写活动商品/活动店铺');
              return;
            }
          }
          this.salesmanList.forEach((item,i)=>{
            if(item.checked){
              store_sale_id.push(item.id);
            }
          })
          if(store_sale_id.length == 0){
            util.msg('请添加销售员!')
            return false;
          }
        }
        return store_sale_id;
      },
      submitOne() {
        let validRes = this.validateOne() && true;
        if(!validRes){
          return;
        }
        this.stepIndex = 2;
      },
      submitTwo() {
        if(this.validateTwo(this.createDialogValidate,this.storageDialogValidate)){
          this.stepIndex = 3;
        }
      },
      goodsSubmit() {
        // if(this.newGoodsList.length === 0 && this.goodsList.length === 0) {
        //   util.msg('请添加商品!')
        //   return false;
        // }
        // for(let item of this.newGoodsList){
        //   if(parseFloat(item.discount_price) != parseFloat(item.goods_price)) {
        //     if(this.pageType == 1) {
        //       this.submitTwo();
        //     }else{
        //       this.submit();
        //     }
        //     return;
        //   }
        // }
        // for(let item of this.goodsList){
        //   if(parseFloat(item.discount_price) != parseFloat(item.goods_price)) {
        //     if(this.pageType == 1) {
        //       this.submitTwo();
        //     }else{
        //       this.submit();
        //     }
        //     return;
        //   }
        // }
        // this.createDialog = true;
        if(this.pageType == 1) {
          this.submitTwo();
        }else{
          this.submit();
        }
      },
      async submit(){
        var validRes = true
        var members = []
        var goods = []
        var store_sale_id = [];
        // this.salesmanList.forEach((item,i)=>{
        //   if(item.checked){
        //     members.push({member_id:item.member_id})
        //     store_sale_id.push(item.id);
        //   }
        // })
        validRes = this.validateOne() && validRes;
        if(!validRes){
          return;
        }
        goods = this.validateTwo(this.pageType == 1 ? false : this.createDialogValidate,this.pageType == 1 ? false : this.storageDialogValidate);
        if(!goods) {
          return;
        }
        store_sale_id = this.validateThree();
        if(!store_sale_id) {
          return;
        }
        //this.saleActInfo.member_id = members
        this.saleActInfo.store_sale_id = JSON.stringify( store_sale_id )
        this.saleActInfo.goods = goods
        if(this.saleActInfo.is_show_hot === ''){
          this.saleActInfo.is_show_hot = 1;
        }
        let index = this.layer.load(2);
        let res;
        if(this.pageType == 1 || this.pageType == 2) {
          let act_change = 0;
          if(this.pageType == 2) {
            let originSaleActInfo = this.originResponsecontent.sale_act_info;
            let newSaleActInfo = this.saleActInfo;
            if(originSaleActInfo.sale_title != newSaleActInfo.sale_title || originSaleActInfo.end_date != newSaleActInfo.sale_end_date ||  originSaleActInfo.start_date != newSaleActInfo.sale_start_date) {
              act_change = 1;
            }
            if(this.originResponsecontent.goods_list.length != this.goodsList.length || this.newGoodsList.length > 0 || JSON.stringify(this.originResponsecontent.goods_list) != JSON.stringify(this.goodsList)) {
              act_change = 1;
            }
          }
          this.saleActInfo.act_change = act_change;
          res = await saleAct.activityEdit(this.saleActInfo);
        }else{
          this.saleActInfo.act_change = 0;
          res = await saleAct.activitySalesEdit(this.saleActInfo);
        }
        if(res.resultCode == 1){
          if(this.unknownSales) {
            //this.layer.close(index);
            if(this.saleActInfo.sale_act_id) {
              index = this.layer.load(2, {
                shade: [0.6, '#000'],
                content: '<span style="margin-left: -5px;color:#fff">生成中</span>',
                success: function (layero) {
                  layero.find('.layui-layer-content').css({
                    'padding-top': '40px',
                    'width': '50px'
                  });
                }
              });
            }else{
              index = this.layer.load(2, {
                shade: [0.6, '#000'],
                content: '<span style="margin-left: -80px;color:#fff">创建活动成功，正在为您生成二维码</span>',
                success: function (layero) {
                  layero.find('.layui-layer-content').css({
                    'padding-top': '40px',
                    'width': '240px'
                  });
                }
              });
            }
            //util.msg('创建活动成功，正在为您生成二维码');
            this.sale_act_id = this.generateParams.sale_act_id = res.responseContent.sale_act_id;
            let generateParams = this.generateParams;
            saleAct.generateQrCode(generateParams).then(res=>{
              this.layer.close(index);
              util.msg(res.shortMessage);
              if(res.resultCode === 1) {
                this.unknownSales = false;
                this.generateParams = {
                  type:1,
                  identification:'',
                  num:'',
                  name:this.saleActInfo.store_name,
                  sale_ids:[],
                  sale_act_id:0,
                  qr_code_type:1
                }
                this.getDetail();
                exportData.exportExcel({file:this.ImageIp + this.imagePathConfig.salesmanQr + res.responseContent.filename,filename:this.ImageIp + this.imagePathConfig.salesmanQr + res.responseContent.filename});
              }
            })
          }else{
            this.layer.close(index);
            util.msg(res.shortMessage);
            this.confirmLeave = true;
            this.$router.push('/promotion/sale_act/index')
            if(this.saleActInfo.sale_act_id == 0 ){
              this.setPageIndex(0);
            }
          }
          this.setUpdate(true);
        }else{
          this.layer.close(index);
          util.msg(res.shortMessage);
        }
      },
      checkChange() {
        let originSaleActInfo = this.originResponsecontent.sale_act_info;
        let newSaleActInfo = this.saleActInfo;
        if(originSaleActInfo.sale_title != newSaleActInfo.sale_title || originSaleActInfo.end_date != newSaleActInfo.sale_end_date || originSaleActInfo.is_show_hot != newSaleActInfo.is_show_hot || originSaleActInfo.sale_act_describe != newSaleActInfo.sale_act_describe || originSaleActInfo.start_date != newSaleActInfo.sale_start_date) {
          return true
        }
        if(this.unknownSales) {
          if(!_.isEqual(this.generateParams,{
              type:1,
              identification:'',
              num:'',
              name:this.saleActInfo.store_name,
              sale_ids:[],
              qr_code_type:1,
              sale_act_id:0
            })){
            return true
          }
        }
        if(this.originResponsecontent.goods_list.length != this.goodsList.length || this.newGoodsList.length > 0 || JSON.stringify(this.originResponsecontent.goods_list) != JSON.stringify(this.goodsList)) {
          return true;
        }
        let store_sale_id = [];
        this.salesmanList.forEach((item,i)=>{
          if(item.checked){
            store_sale_id.push(item.id);
          }
        })
        if(this.originResponsecontent.member_list.length != store_sale_id.length) {
          return true
        }else{
          let origin_member_list = _.clone(this.originResponsecontent.member_list);
          origin_member_list.sort(function (val1,val2) {
            return val1-val2;
          });
          store_sale_id.sort(function (val1,val2) {
            return val1-val2;
          });
          if(JSON.stringify(origin_member_list) != JSON.stringify(store_sale_id)) {
            return true;
          }
        }
      }

    },
    watch:{
      goodsList(){
        this.getOldGoods()
        this.updateAllGoods()
      },
      newGoodsList(){
        this.getNewGoods()
        this.updateAllGoods()
      },
      alertGoodsList(){
        this.getAlertGoods()
      },
      alertStorageList(){
        this.getAlertStorage()
      },
      oldGoodsList(list) {
        if(list.length === 0) {
          return;
        }
        for(let item of list) {
          if(!item.selected) {
            this.oldSelectPage = false;
            this.oldSelectAll = false;
            return;
          }
        }
        this.oldSelectPage = true;
        for(let item of this.goodsList) {
          if(this.checkMatch(item)  && !item.selected) {
            this.oldSelectAll = false;
            return;
          }
        }
        this.oldSelectAll = true;
      },
      newGoodsPageList(list) {
        if(list.length === 0) {
          return;
        }
        for(let item of list) {
          if(!item.selected) {
            this.newSelectPage = false;
            this.newSelectAll = false;
            return;
          }
        }
        this.newSelectPage = true;
        for(let item of this.newGoodsList) {
          if(this.checkMatch(item) && !item.selected) {
            this.newSelectAll = false;
            return;
          }
        }
        this.newSelectAll = true;
      },
      alertGoodsPageList(list) {
        if(list.length === 0) {
          return;
        }
        for(let item of list) {
          if(!item.selected) {
            this.alertSelectPage = false;
            this.alertSelectAll = false;
            return;
          }
        }
        this.alertSelectPage = true;
        for(let item of this.alertGoodsList) {
          if(!item.selected) {
            this.alertSelectAll = false;
            return;
          }
        }
        this.alertSelectAll = true;
      },
      alertStoragePageList(list) {
        if(list.length === 0) {
          return;
        }
        for(let item of list) {
          if(!item.selected) {
            this.alertStorageSelectPage = false;
            this.alertStorageSelectAll = false;
            return;
          }
        }
        this.alertStorageSelectPage = true;
        for(let item of this.alertStorageList) {
          if(!item.selected) {
            this.alertStorageSelectAll = false;
            return;
          }
        }
        this.alertStorageSelectAll = true;
      },
      saleActInfo:{
        handler: function () {
          if(this.saleActInfo.sale_title != ''){
            this.validData.saleTitleErr = false
          }
          if(this.saleActInfo.sale_start_date != ''){
            this.validData.startDateErr = false
          }
          if(this.saleActInfo.sale_end_date != ''){
            this.validData.endDateErr = false
          }
          if(this.saleActInfo.is_show_hot != ''){
            this.validData.showHotErr = false
          }
        },
        deep: true
      },
      // goodsType(goodsType) {
      //   this.resetGoodsParams();
      //   this.updateSecondClass();
      //   if(goodsType == 2) {
      //     this.getNewGoods();
      //   }else{
      //     this.getOldGoods();
      //   }
      // },
      salesManageDialog(val) {
        if(val) {
          this.manageSale.pageParams.sale_act_id = this.saleActInfo.sale_act_id;
          this.getSaleList();
        }
      }
    },
    created(){

    },
    mounted () {
        window.addEventListener('scroll',this.useSetMarginTop,true);
        window.addEventListener('keydown',this.hideSelectTitle,true);
        this.sale_act_id = storage.get('sale_act_id')
      if(this.sale_act_id){
          if(storage.get('sale_edit')) {
            this.pageType = 3;
          }else{
            this.pageType = 2;
          }
         this.steps = [
           {title:'STEP.1',text:'活动信息',current:true,icon:''},
           {title:'STEP.2',text:'活动商品',current:false,icon:''}
         ]
        this.getDetail();
      }else{
        this.saleActInfo.edit_sale = 1;
        saleAct.activityDetail().then((res)=>{
          this.saleActInfo.store_member_id = res.sale_act_info.member_id
          this.generateParams.name = res.sale_act_info.store_name
          this.getStoreSaleList()
        });
        this.getSecondClass();
      }
      //this.getSaleList();
      var _self = this;
      layui.use('layer', function(){
        this.layer = layui.layer;
      });
      layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
          elem: '#start_date',
          theme: "grid",
          type:'datetime',
          format:'yyyy-MM-dd HH:mm',
          trigger:'click',
          done:function(data){
            _self.validData.startTimeErr = false
            _self.saleActInfo.sale_start_date = data
          }
        });
        laydate.render({
          elem: '#end_date',
          theme: "grid",
          type:'datetime',
          format:'yyyy-MM-dd HH:mm',
          trigger:'click',
          done:function(data){
            _self.validData.endtimeErr = false
            _self.saleActInfo.sale_end_date = data
          }
        });

      })
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.salesManageDialog && !_self.isEdit){
            _self.manageSale.pageParams.pageIndex = 0;
            _self.getSaleList();
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
    beforeRouteLeave (to, from, next) {
      if(!this.confirmLeave && this.checkChange() && to.name !== 'login') {
        next(false);
        this.nextFun = next;
        this.leaveDialog = true;
      }else{
        next()
      }

    }
  }
</script>
