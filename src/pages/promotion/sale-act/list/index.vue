<style scoped>
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.qm-store-class-base{
  padding:10px 0px 20px;
}
.ncsc-form-tit{
  margin-left: 0;
}
.sort{cursor: pointer;display: inline-block; position: relative; padding-right: 15px;}
.sort:hover{text-decoration: none;color: #ff8519;}
.sort .fa-caret-up, .sort .fa-caret-bottom{width: 10px; height: 5px; position: absolute; right: 0; top: 50%; background: url(~@/assets/seller/images/seller/ncsc_bg_img.png) -165px -490px no-repeat;}
.sort .fa-caret-up{margin-top: -6px;}
.sort .fa-caret-bottom{margin-top: 1px; background-position: -165px -500px;}
.sort.sort-up, .sort.sort-down{color:#ff8519;}
.sort.sort-up .fa-caret-up{background-position: -180px -490px;}
.sort.sort-down .fa-caret-bottom{background-position: -180px -500px;}
.fa-caret-up:before{
  content: normal;
}
.ncsc-table{
  table-layout:fixed
}
.ncsc-table td a:hover {
  cursor: pointer;
  color: #ff8519;
  outline: medium none;
  -webkit-transition-property: color;
  -webkit-transition-duration: 0.3s;
  -webkit-transition-timing-function: ease;
}

.ncsc-table .qrcode-box {
  vertical-align: middle;
  line-height: 1;
  position: relative;
  display: inline-block;
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
  font-size: 14px;
}
.ncsc-table .qrcode-in p {
  line-height: 0;
  width: 160px;
  height: 160px;
  overflow: hidden;
  margin: 5px auto 0;
}
.ncsc-table .qrcode-in:before, .ncsc-table .qrcode-in:after{content:''; display:block;overflow:hidden;position:absolute;width:0;height:0;font-size:0;border-bottom:8px dashed transparent;border-left:8px dashed transparent;border-top:8px dashed transparent;border-right-style:solid;border-right-width:8px; top: 50%; margin-top: -8px;}
.ncsc-table .qrcode-in:before{left:-16px;color:#bbb}
.ncsc-table .qrcode-in:after{z-index:2;left:-15px;color:#fff}
.qrcode-box.active .qrcode-in{ display: block;}
.ncsc-table .qrcode-box:hover .qrcode-in {
  display: block;
}
.ncsc-table .codetd:hover .qrcode-in {
        display: block;
    }
  .fa-qrcode{
    color: #757575;
    font-size: 1.2em;
  }
  .ml13{
    margin-left: 13px;
  }
  .plist-man {
    overflow: hidden;
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
  .plist-seller-dialog {
    max-height: 160px;
    overflow-y: auto;
  }
  .plist-seller-dialog .name {
    max-width: none;
    width: 65px;
    line-height: 30px;
  }
  /*.plist-seller-ex2 .name {*/
    /*width: auto;*/
  /*}*/
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
  .plist-seller-dialog li {
    width: 25%;
    /*padding: 5px 1% 5px 0;*/
  }
  .ncsc-btn-orange:hover {
    color:#fff;
  }
  .ncsc-default-table td,td {
    border-bottom: 1px solid #eee;
    padding: 20px 10px;
  }
  .no-promotion {
    color: #757575;
    padding: 50px 0;
    line-height: 20px;
    text-align: center;
  }
.div-goods-select-box .div-goods-select {
  margin-bottom: 0;
  padding-bottom: 0;
  padding-top: 10px;
}
.sale-alert-dialog-pagination .pagination {
  margin-top: 0;
}
.sale-alert-dialog-bottom {
  margin-top: 0;
}
.w390 {
    width: 390px;
}
</style>
<template>
  <div class="qm-store-class-base">
    <p class="C4 S7">可制作海报，用于扫码即可参与直接对应分销活动&nbsp;&nbsp;<a class="orange" @click="$router.push('/promotion/store_poster/index')">前往制作>></a></p>
    <div class="search-form mt30 mb20">
      <input @keyup.enter="search" placeholder="支持用活动名称/活动ID进行条件搜索" type="text" class="w250 mr5" name="sale_title" v-model="pageParams.sale_title">
      <span class="ncsc-form-tit">活动状态：</span>
      <select name="progress_state" class="w100 mr5" v-model="pageParams.progress_state">
        <option  v-for="(s,i) in states" :value="i">{{s}}</option>
      </select>
      <input placeholder="支持销售员ID/销售员手机号/销售员名称/销售员备注搜索参与的活动" type="text" class="w390 mr5" name="sale_title" v-model="pageParams.sale_keyword">
      <input type="submit" class="ncsc-btn" value="搜索" @click="search()">
      <input v-show="resetShow" type="submit" class="ncsc-btn" value="重置" @click="reset()">
    </div>
    <p class="c-gray fs12">用户扫描多个同一家店铺正在进行中的分销活动二维码，则默认切换参与最后一次扫码的活动</p>
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <div class="operate-bar">
          <label class="mr10"><input type="checkbox" v-model="checkStateAll" @change="checkAll">全选</label>
          <a class="ncsc-btn-orange-unfilled" @click="openBatchAddGoodsDialog">批量添加活动商品</a>
          <span style="vertical-align: middle" class="ml5">注：建议勾选具备相同返利的活动</span>
        </div>
        <table class="ncsc-table">
          <thead>
          <tr>
            <th class="w15"></th>
            <th class="w70">活动ID</th>
            <th class="w80">活动名称</th>
            <th class="w70"><a @click="changeSort(6)" :class="[pageParams.sort==11?'sort-up':(pageParams.sort==12?'sort-down':''),'sort js-sort']">商品数<i class="fa fa-caret-up"></i><i class="fa fa-caret-bottom"></i></a></th>
            <th class="w70">销售员数</th>
	    <th class="w70"><a @click="changeSort(3)" :class="[pageParams.sort==5?'sort-up':(pageParams.sort==6?'sort-down':''),'sort js-sort']">订单总数<i class="fa fa-caret-up"></i><i class="fa fa-caret-bottom"></i></a></th>
	    <th class="w70"><a @click="changeSort(4)" :class="[pageParams.sort==7?'sort-up':(pageParams.sort==8?'sort-down':''),'sort js-sort']">今日订单<i class="fa fa-caret-up"></i><i class="fa fa-caret-bottom"></i></a></th>
            <th class="w100"><a @click="changeSort(5)" :class="[pageParams.sort==9?'sort-up':(pageParams.sort==10?'sort-down':''),'sort js-sort']">修改时间<i class="fa fa-caret-up"></i><i class="fa fa-caret-bottom"></i></a></th>
            <th class="w100"><a @click="changeSort(1)" :class="[pageParams.sort==1?'sort-up':(pageParams.sort==2?'sort-down':''),'sort js-sort']">开始时间<i class="fa fa-caret-up"></i><i class="fa fa-caret-bottom"></i></a></th>
            <th class="w100"><a @click="changeSort(2)" :class="[pageParams.sort==3?'sort-up':(pageParams.sort==4?'sort-down':''),'sort js-sort']">结束时间<i class="fa fa-caret-up"></i><i class="fa fa-caret-bottom"></i></a></th>
            <th class="w80">
              状态<el-tooltip placement="right" effect="light" popper-class="atooltip">
                <div slot="content" class="toolTipCont">
                  <div class="tip-doubt-con">
                    <h3>活动状态说明</h3>
                    <p class="mt5">未开始：未到开始时间的活动。</p>
                    <p class="mt10">进行中： 在活动时间范围内的活动，状态有以下几种：</p>
                    <div class="ml10">
                      <p class="mt5">活动内的商品已下架，则显示商品下架</p>
                      <p class="mt5">活动内的商品被删除，则显示商品删除</p>
                      <p class="mt5">活动内的商品没有库存，则显示为商品缺货</p>
                      <p class="mt5">同时存在多种情况时，则显示商品异常</p>
                    </div>
                    <p class="mt10">已结束：过了活动时间的活动</p>
                  </div>
                </div>
                <p class="lightBlue">
                  <i class="fa fa-question-circle" aria-hidden="true"></i>
                </p>
              </el-tooltip>
            </th>
            <!--<th class="w90">是否展示热销</th>-->
            <th class="w120">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in list">
            <td><input v-if="item.show_close" type="checkbox" :value="item.sale_act_id" v-model="checkState" @change="checkOne" />
            <td>{{item.sale_act_id}}</td>
            <td :class="isShouGou?'codetd':''">
              <a style="word-break: break-all;" @click="showItem(item)">{{item.sale_title}}</a>
              <div><div class="qrcode-box mr5"  ><i class="fa fa-qrcode"></i><div class="qrcode-in"><div class="mb5">店主分销二维码</div><div>打开 我的身边店APP 扫一扫</div><p><img width="160" height="160"
                                                                                                                      :src="item.own_qrcode"></p></div></div></div>
            </td>
            <td class="c-gray">{{item.sale_goods_count}}</td>
            <td class="c-gray">{{item.sale_man_count}}</td>
            <td class="c-gray"><a v-if="item.order_count>0" href="javascript:;" style="color:#30acff" @click="toOrder('/order/store_order/index/index/'+item.sale_act_id)">{{item.order_count}}</a> <a href="javascript:;" v-else>0</a></td>
            <td class="c-gray"><a v-if="item.order_today_count>0" href="javascript:;" style="color:#30acff" @click="toOrder('/order/store_order/index/index/'+item.sale_act_id+'/1')">{{item.order_today_count}}</a><a href="javascript:;" v-else>0</a></td>
            <td class="c-gray">
                <p>{{item.gmt_update_date}}</p>
                <p>{{item.gmt_update_time}}</p>
            </td>
            <td class="c-gray">
                <p>{{item.sale_start_date}}</p>
                <p>{{item.sale_start_time}}</p>
            </td>
            <td class="c-gray">
                <p>{{item.sale_end_date}}</p>
                <p>{{item.sale_end_time}}</p>
            </td>
            <td class="c-gray">
                {{item.sale_act_state_des}}
                <p v-if="item.exception" class="c-red fs12">{{item.exception}}</p>
            </td>
            <!--<td class="c-gray">{{item.is_show_hot?'展示':'不展示'}}</td>-->
            <td class="handle">
              <p>
                <a @click="showItem(item)" class="ncsc-btn">
                  <template v-if="item.show_edit">
                    活动内容管理
                  </template>
                  <template v-else>
                    活动查看
                  </template>
                </a>
              </p>
              <p v-if="item.show_edit">
                <a @click="showItem(item,true)" class="ncsc-btn">
                  销售员管理
                </a>
              </p>
              <p>
                <a @click="saleManage(item)" class="ncsc-btn">
                  业绩详情
                </a>
              </p>
              <p v-if="item.show_close">
                <a @click="closeItem(item.sale_act_id)" class="ncsc-btn">
                关闭
                </a>
              </p>
              <p v-if="item.can_delete">
                <a @click="delItem(item.sale_act_id)" class="ncsc-btn">
                删除
                </a>
              </p>
              <!--<p>-->
                <!--<a @click="openQrcodeDialog(item)" class="ncsc-btn">-->
                  <!--生成分销二维码-->
                <!--</a>-->
              <!--</p>-->
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </qm-table>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
    <qm-tips :tipsVisible="closeDialog" :width="'420px'" @update:tipsVisible="closeDialog = $event" @close="closeDialog = false" @confirm="confirmClose()">
      <template slot="title">提示信息</template>
      <template slot="content">活动结束后不能再开启，是否确定结束？</template>
    </qm-tips>
    <qm-tips :tipsVisible="delDialog" :width="'420px'" @update:tipsVisible="delDialog = $event" @close="delDialog = false" @confirm="confirmDel()">
      <template slot="title">提示信息</template>
      <template slot="content">是否确定删除？</template>
    </qm-tips>
    <qm-dialog :dialogVisible="qrCodeDialog" :width="'600px'" @close="closeQrCodeDialog" :customClass="'phone-bind'">
      <template slot="title">生成分销二维码</template>
      <template slot="content" >
        <div class="dialog_content">
          <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
            <div class="ncsc-form-s" >
              <dl>
                <dt>生成类型：</dt>
                <dd>
                  <div class="ncsc-form-custom-radio-group">
                    <div :class="[generateParams.type == 1 ? 'checked':'','ncsc-form-custom-radio']">
                      <div class="ncsc-custom-radio-frame">
                        <input type="radio" name="type" value="1" id="qrcode_1" class="ncsc-custom-radio" v-model="generateParams.type">
                      </div>
                      <label for="qrcode_1" class="ncsc-custom-txt">
                        <span class="name">批量生成分销二维码</span>
                      </label>
                    </div>
                    <div :class="[generateParams.type == 2 ? 'checked':'','ncsc-form-custom-radio']">
                      <div class="ncsc-custom-radio-frame">
                        <input type="radio" name="type" value="2" id="qrcode_2" class="ncsc-custom-radio" v-model="generateParams.type">
                      </div>
                      <label for="qrcode_2" class="ncsc-custom-txt">
                        <span class="name">指定销售员生成分销二维码</span>
                      </label>
                    </div>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt>优惠码类型：</dt>
                <dd>
                  <div class="ncsc-form-custom-radio-group">
                    <div :class="[generateParams.qr_code_type == 1 ? 'checked':'','ncsc-form-custom-radio']">
                      <div class="ncsc-custom-radio-frame">
                        <input type="radio" name="type" value="1" id="qrcode_type_1" class="ncsc-custom-radio" v-model="generateParams.qr_code_type">
                      </div>
                      <label for="qrcode_type_1" class="ncsc-custom-txt">
                        <span class="name">二维码</span>
                      </label>
                    </div>
                    <div :class="[generateParams.qr_code_type == 2 ? 'checked':'','ncsc-form-custom-radio']">
                      <div class="ncsc-custom-radio-frame">
                        <input type="radio" name="type" value="2" id="qrcode_type_2" class="ncsc-custom-radio" v-model="generateParams.qr_code_type">
                      </div>
                      <label for="qrcode_type_2" class="ncsc-custom-txt">
                        <span class="name">小程序码</span>
                      </label>
                    </div>
                  </div>
                </dd>
              </dl>
              <template v-if="generateParams.type == 1">
                <dl>
                  <dt>标注：</dt>
                  <dd><input  type="text" class="ncsc-form-control w300" placeholder="可用于基本标注本次分发对象" v-model="generateParams.identification"></dd>
                </dl>
                <dl>
                  <dt>生成数量：</dt>
                  <dd><input  type="number" class="ncsc-form-control w300" placeholder="一次最多可批量生成20个" v-model="generateParams.num"></dd>
                </dl>
                <dl>
                  <dt><p>活动商品/</p><p style="margin-top: -10px">活动店铺</p></dt>
                  <dd>
                    <input  type="text" class="ncsc-form-control w300"  v-model="generateParams.name">
                    <p class="c-gray mt5">可填写活动店铺名称或活动参与商品名称</p>
                  </dd>
                </dl>
                <p class="c-gray mt10">该功能主要用于暂不明确销售人员的情况下，批量生成二维码，可先将对应分销二维码给出，后收集到销售人员信息后填补保存</p>
              </template>
              <template v-if="generateParams.type == 2">
                <div class="ml13">
                  <p>选择需要生成分销二维码的销售员：</p>
                  <input  type="text" class="ncsc-form-control w300 mt10" v-model="saleParams.keyword" placeholder="支持用销售员的名称或手机号进行条件搜索">
                  <input type="button"  value="搜索" class="ncsc-btn ncsc-btn-orange mt10"  @click="getSaleList">
                  <ul class="plist-man plist-seller-dialog  mt10">
                    <li v-for="item in saleList">
                      <div :class="['ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s',generateParams.sale_ids.indexOf(item.sale_id) > -1 ? 'checked' : '']">
                        <div  class="ncsc-custom-checkbox-frame"><input type="checkbox" v-model="generateParams.sale_ids" :value="item.sale_id" class="ncsc-custom-checkbox"></div>
                        <label class="ncsc-custom-checkbox-txt">
                          <img :src="item.member_avatar" alt="">
                        </label>
                        <span  class="name" :title="item.true_name">{{item.true_name}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <p class="c-gray mt10">该功能主要用于销售员二维码丢失或需要多张，指定销售人员生成活动二维码进行分销</p>
              </template>
            </div>
            <div class="bottom">
              <input type="button" value="生成" class="ncsc-btn ncsc-btn-orange fr" @click="generate">
              <div class="clear"></div>
            </div>
            <div v-show="generateParams.type == 1 && qrcode_package_url"><a :href="this.ImageIp + this.imagePathConfig.salesmanQr + qrcode_package_url" :download="this.ImageIp + this.imagePathConfig.salesmanQr + qrcode_package_url" style="text-decoration: underline">点击可下载"{{qrcode_package_name}}"的{{qr_code_type == 2 ? '小程序码' : '二维码'}}文件</a></div>
          </div>
        </div>
      </template>
    </qm-dialog>
    <qm-dialog :dialogVisible="addGoodsDialog" :width="'800px'" @close="addGoodsDialog=false" :customClass="'phone-bind sale-add-goods'">
      <template slot="title">批量添加活动商品</template>
      <template slot="content" >
        <div class="ml20 c-red"><i class="required">*</i>列表只获取勾选活动均未加入的商品</div>
        <qm-add-goods v-if="addGoodsDialog"
                      :pageSize="8"
                      :showMorePrice="true"
                      :addTxt="'加入到推销商品中'"
                      :removeTxt="'从推销商品中移除'"
                      :goodsList="existGoods"
                      :saleActId="checkState"
                      :showAddAllPage="true"
                      :source="'sale_act_goods'"
                      :borderNone = "true"
                      :excludeGoods = "alertGoodsList"
                      @addOneGoods="addOneGoods($event)"
                      @addPageGoods="addPageGoods($event)"
                      @close="addGoodsDialog = !addGoodsDialog"
                      @removeOneGoods="removeOneGoods($event)"
        ></qm-add-goods>
        <div class="bottom" style="margin-top: 0">
          <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="addGoodsConfirm">
          <a class="ncsc-btn ncsc-btn-orange-rim fr" @click="addGoodsDialog=false">取消</a>
        </div>
      </template>
    </qm-dialog>
    <qm-dialog :dialogVisible="alertDialog" :width="'800px'" @close="alertGoodsCancel" :customClass="'phone-bind sale-alert-dialog'">
      <template slot="title">批量添加活动商品</template>
      <template slot="content" >
        <div>
          <p class="fl">设置商品的活动价格：</p>
          <a  class="ncsc-btn ncsc-btn-orange fr" @click="continueAddGoods" v-show="totalGoodsNum > alertGoodsList.length">+&nbsp;继续添加商品</a>
        </div>
        <div class="clear"></div>
        <div class="operate-bar" v-show="alertGoodsPageList.length > 0">
          <label for="dialog_check_all_one_page" class="mr10"><input id="dialog_check_all_one_page" type="checkbox" @change="selectAlertGoods($event,1)" v-model="alertSelectPage"  data-id="check_all_one_page" >本页全选</label>
          <label for="dialog_check_all" class="mr10"><input id="dialog_check_all" type="checkbox" @change="selectAlertGoods($event,2)" v-model="alertSelectAll"  data-id="check_all">全部全选</label>
          <a href="javascript:void(0);" class="ncsc-btn-mini mr10" @click="alertRemove()" id="batch_remove2">移除</a>
          <a href="javascript:void(0);" class="ncsc-btn-mini" @click="alertSetPrice()" >批量修改活动价</a>
          <a href="javascript:void(0);" class="ncsc-btn-mini" @click="alertSetRebate()">批量设置返利</a>
        </div>
        <div>
          <table class="ncsc-default-table">
            <thead  v-show="alertGoodsPageList.length > 0">
            <tr>
              <th class="w40"></th>
              <th class="w170">商品名称</th>
              <th class="w70">原价(元)</th>
              <th class="w70">售价(元)</th>
              <th class="w50">库存</th>
              <th class="w50">折扣</th>
              <th class="w110">活动价(元)</th>
              <th class="w110">返利/元</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody nctype="bundling_data"  class="bd-line tip" v-show="alertGoodsPageList.length === 0">
            <tr  class="ui-state-disabled">
              <td colspan="20" class="norecord" style="border-bottom: none">
                <div class="tc"><img src="../../../../assets/seller/images/seller/sale_conf_goods.png" alt="请选择需要批量添加的商品"></div>
                <div class="no-promotion"><span>请选择需要批量添加的商品</span></div>
              </td>
            </tr>
            </tbody>
          <tbody>
          <tr v-for="(og,oi) in alertGoodsPageList" :class="[og.can_not_edit?'gray':'','item']">
            <td class="w40 handler"><input type="checkbox" @change="alertSelectOne($event,oi)" v-model="og.selected"></td>
            <td class="w170 handler">
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
            <td class="w70 handler wb-ba" nctype="bundling_data_price">
              {{og.goods_marketprice}}
            </td>
            <td class="w70 handler wb-ba">
              {{og.goods_price}}
            </td>
            <td class="w50 wb-ba">{{og.goods_storage}}</td>
            <td class="w50 wb-ba">{{og.discount_price|discount(og.goods_marketprice)}}</td>
            <td class="w110">
              <p v-if="og.can_not_edit">{{og.discount_price}}</p>
              <input :type="og.can_not_edit?'hidden':'number'" nctype="price" step="0.01" v-model="og.discount_price" class="text w90">
            </td>
            <td class="w110">
              <p v-if="og.can_not_edit">{{og.rebate_amount}}</p>
              <input :type="og.can_not_edit?'hidden':'number'" nctype="price" step="0.01" v-model="og.rebate_amount" class="text w90">
            </td>
            <td class="handle"><p><a href="javascript:void(0);" @click="alertRemoveOne(og)"  class="ncsc-btn btn-remove">移除</a></p></td>
          </tr>
          </tbody>
          </table>
        </div>
        <div class="sale-alert-dialog-pagination">
          <ajax-pagination :pageParams="pageParams4" @changeIndex="changeIndex4($event)"></ajax-pagination>
        </div>
        <div class="bottom sale-alert-dialog-bottom">
          <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="alertGoodsConfirm">
          <a class="ncsc-btn ncsc-btn-orange-rim fr" @click="alertGoodsCancel">取消</a>
          <div class="clear"></div>
        </div>
      </template>
    </qm-dialog>
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
                <input type="radio" @click="oldErr='';oldSetNewPrice='';" name="set_act_price" id="multi_set_act_price" v-model="oldSetType" value="1" checked="checked"><label for="multi_set_act_price" class="mr10">批量设置统一活动价</label>
                <input type="radio" @click="oldErr='';oldSetNewPrice='';" name="set_act_price" id="multi_set_act_discount" v-model="oldSetType" value="2" ><label for="multi_set_act_discount">批量设置折扣</label>
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
    <qm-tips :tipsVisible.sync="leaveDialog" :width="'420px'" @close="leaveDialog = false" @cancel="leaveDialog = false" @confirm="dialogConfirmLeave()" :confirmTxt="'是'" :cancelTxt="'否'" :cancelFront="true" :confirmClass="'ncsc-btn-orange-rim'" :cancelClass="'ncsc-btn-orange'">
      <template slot="title">警告</template>
      <template slot="content">
        当前信息未保存<br>是否继续退出页面
      </template>
    </qm-tips>
  </div>
</template>

<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import AjaxPagination from 'component/ajax-pagination/index'
  import QmPagination from 'component/qm-pagination/index'
  import QmTable from 'component/qm-table/index';
  import QmTips from 'component/qm-tips/index';
  import QmDialog from 'component/qm-dialog/index';
  import {saleAct} from 'api'
  import storage from 'lib/utils/storage';
  import util from 'lib/utils/util';
  import exportData from 'lib/utils/export';
  import QmAddGoods from 'component/qm-add-goods/index';
  export default {
    name: "sale-act-list",

    data() {
      return {
        leaveDialog:false,
        totalGoodsNum:0,
        noSelectDialog:false,
        rebateDialog:false,
        oldErr:'',
        oldSetNewPrice:'',
        oldSetType:1,
        discountBasics:1,
        setPriceType:2,
        rebateErr:'',
        rebatePrice:'',
        rebateSetType:1,
        rebateDiscountBasics:1,
        rebatGoodsType:2,
        confirmOldDialog:false,
        alertDialog:false,
        alertSelectPage:false,
        alertSelectAll:false,
        addGoodsDialog:false,
        existGoods:[],
        batchAddGoodsDialog:false,
        checkState:[],
        checkStateAll:false,
        checkLenth:0,
        newGoodsList:[],
        alertGoodsList:[],
        alertGoodsPageList:[],
        states:{
          0:'全部',
          1:'未开始',
          2:'进行中',
          3:'已结束'
        },
        pageParams:{
          progress_state:0,
          sale_title:'',
          sort:0,
          sale_act_id:0,
          pageIndex:0,
          pageSize:10,
          total:0,
          act_id:'',
          sale_keyword:''
        },
        initPageParams:{
          progress_state:0,
          sale_title:'',
          sale_keyword:''
        },
        pageParams4:{
          pageIndex:0,
          pageSize:5,
          total:0
        },
        list:[],
        closeDialog:false,
        delDialog:false,
        isShouGou:navigator.userAgent.toLowerCase().indexOf('se 2.x')>-1 ? true : false,
        qrCodeDialog:false,
        saleParams:{
          sale_act_id:0,
          keyword:''
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
        saleList:[],
        qrcode_package_url:'',
        qrcode_package_name:'',
        qr_code_type:1,
        resetShow:false
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
      ...mapGetters({
        ImageIp:'getImageIp',
        basicStore:'getBasicStore',
        imagePathConfig:'getImagePathConfig',
      }),
      ...mapGetters('saleAct',{
        update:'getUpdate',
        getPageIndex:'getPageIndex'
      }),
    },

    components:{
      QmPagination,
      QmTips,
      QmTable,
      QmDialog,
      QmAddGoods,
      AjaxPagination
    },

    methods: {
      ...mapActions('saleAct',{
        setEdit: 'setEdit',
      }),
      ...mapMutations('saleAct',{
        setPageIndex:'setPageIndex',
      }),
      ...mapActions('storeGoodsClass',{
        searchGoods:'searchGoods',
      }),
      reset() {
        this.pageParams = {
          ...this.pageParams,
          ...this.initPageParams
        }
        this.resetShow = false;
        this.changeIndex(0);
      },
      changeIndex4(index){
        this.pageParams4.pageIndex = index;
        //this.alertSelectPage = false;
        this.getAlertGoods(this.pageParams4);
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
      setAllAlertGoods(){
        let alertGoodsList = _.clone(this.alertGoodsList);
        alertGoodsList.forEach((item,i)=>{
          alertGoodsList[i].selected = true
        })
        this.alertGoodsList = alertGoodsList;
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
      alertSelectOne(event,i){
        var gs = _.clone(this.alertGoodsPageList)
        if(event.target.checked){
          gs[i].selected = true
        }else{
          gs[i].selected = false
        }
        this.alertGoodsPageList = gs
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
      alertRemoveOne(g){
        this.alertGoodsList.forEach((item,i)=>{
          if(item.goods_id == g.goods_id){
            this.alertGoodsList.splice(i,1)
          }
        })
      },
      alertRemove(){
        var goods = []
        var has = false
        this.alertGoodsList.forEach((item,i)=>{
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
        this.alertSelectPage = false
        this.alertSelectAll = false
        this.alertGoodsList = goods
      },
      alertSetPrice(){
        this.oldErr = ''
        this.oldSetNewPrice = '';
        this.oldSetType = 1;
        this.discountBasics = 1;
        var has = false
        this.alertGoodsList.forEach((item,i)=>{
          if(item.selected){
            has = true
          }
        })
        if(!has){
          //this.noSelectDialog = true
          util.msg('请选择需要操作的商品');
          return
        }
        this.confirmOldDialog = true
      },
      alertSetRebate() {
        this.rebateErr = "";
        this.rebatePrice = '';
        this.rebateSetType = 1;
        this.rebateDiscountBasics = 1;
        var has = false
        this.alertGoodsList.forEach((item,i)=>{
          if(item.selected){
            has = true
          }
        })
        if(!has){
          //this.noSelectDialog = true
          util.msg('请选择需要操作的商品');
          return
        }
        this.rebateDialog = true
      },
      alertGoodsCancel() {
        if(this.alertGoodsList.length > 0) {
          this.leaveDialog = true;
        }else{
          this.alertDialog = false;
        }
      },
      dialogConfirmLeave() {
        this.alertDialog = false;
        this.leaveDialog = false;
      },
      alertGoodsConfirm() {
        if(this.alertGoodsList.length === 0) {
          util.msg('请先选择需要添加的商品')
          return false;
        }
        let validate=true,goods = [];
        for(let item of this.alertGoodsList) {
          let discount_price = parseFloat(item.discount_price);
          let rebate_amount = parseFloat(item.rebate_amount);
          let goods_price = parseFloat(item.goods_price);
          if(item.discount_price === '') {
            util.msg('请设置商品活动价');
            validate = false;
            break;
          }
          if(item.rebate_amount === '') {
            util.msg('请设置商品返利');
            validate = false;
            break;
          }
          if(discount_price > goods_price) {
            util.msg('商品活动价不得大于商品售价');
            validate = false;
            break;
          }
          if(isNaN(rebate_amount) || rebate_amount < 0 || rebate_amount > discount_price) {
            util.msg('返利需大于等于0，小于等于活动价');
            validate = false;
            break;
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
        let data = {
          goods:JSON.stringify(goods),
          sale_act_id:this.checkState.join(',').split(',')
        };
        saleAct.batchAddSaleGoods(data).then(res=>{
          if(res.resultCode === 1) {
            this.alertGoodsList = [];
            this.alertDialog = false;
            this.getPageData(this.pageParams);
          }
        })
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
          var r = /^([1-9]([0-9])?|100|0)$/;
          if(this.oldSetNewPrice === '') {
            this.oldErr = "请设置折扣值";
            return
          }
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
      rebateConfirm() {
        let rebatePrice;
        if(this.rebateSetType == 1) {
          if(this.rebatePrice === '') {
            this.rebateErr = "请输入返利值";
            return;
          }
          this.rebatePrice = util.number_format(this.rebatePrice,2)
          if(this.rebatePrice < 0){
            this.rebateErr = "返利值必须为大于等于0的数值";
            return
          }
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
      newAddOne(g){
        let a = _.clone(g);
        a.discount_price = g.goods_price;
        a.rebate_amount = '';
        this.existGoods.unshift(a);
      },
      addOneGoods(event) {
        this.newAddOne(event)
      },
      addPageGoods(event) {
        event.forEach((item,i)=>{
          if(!item.isExist){
            this.newAddOne(item)
          }
        })
      },
      removeOneGoods(event) {
        this.existGoods.forEach((item,i)=>{
          if(item.goods_id == event.good.goods_id){
            this.existGoods.splice(i,1)
          }
        })
      },
      addGoodsConfirm() {
        //this.alertGoodsList = this.existGoods.concat(this.alertGoodsList);
        if(this.existGoods.length === 0) {
          util.msg('请选择需要添加的商品');
          return;
        }
        this.alertGoodsList = _.clone(this.existGoods);
        this.addGoodsDialog = false;
        this.alertDialog = true;
        this.getAlertGoods();
      },
      continueAddGoods() {
        this.existGoods = _.clone(this.alertGoodsList);
        this.addGoodsDialog = true
      },
      openBatchAddGoodsDialog() {
        if(this.checkState.length === 0) {
          util.msg('请选择需要添加商品的活动');
          return;
        }
        this.searchGoods({
          type:'sale_act_goods',
          checkExist:1,
          sale_act_id:this.checkState.join(',').split(',')
        }).then(res=>{
            this.totalGoodsNum = res.responseContent.total;
            if(!(res.responseContent.sale_titles instanceof Array)) {
              util.msg('当前勾选的活动  暂无可批量添加的商品');
            }else if(res.responseContent.sale_titles.length > 0){
              util.msg(res.responseContent.sale_titles.join('、')+'活动全部商品已参与活动，无需二次添加');
            }else{
              this.existGoods = [];
              this.alertGoodsList = []
              this.addGoodsDialog = true;
            }
        })
      },
      checkOne() {
        let checkState = this.checkState;
        if(checkState.length> 0 && checkState.length == this.checkLenth) {
          this.checkStateAll = true;
        }else{
          this.checkStateAll = false;
        }
      },
      checkAll(e) {
        let checkState = [];
        if(e.target.checked === true) {//批量全选
          for(let item of this.list) {
            if(item.show_close) {
              checkState.push(item.sale_act_id);
            }
          }
        }
        this.checkState = checkState;
      },
      getPageData(data){
        saleAct.getList(data).then((res)=>{
          this.list = res.list;
          this.checkLenth = 0;
          this.checkState = [];
          this.checkStateAll = false;
          for (let item of this.list) {
            if(item.show_close) {
              this.checkLenth++;
            }
          }
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
        })
      },
      getSaleList() {
        saleAct.getSaleList(this.saleParams).then(res=>{
          this.saleList = res.list;
          if(this.saleList.length === 0) {
            util.msg('没有匹配的销售员');
          }
        })
      },
      openQrcodeDialog(item) {
        this.saleParams.sale_act_id = item.sale_act_id;
        this.generateParams.sale_act_id = item.sale_act_id;
        this.qrcode_package_url = item.qrcode_package_url;
        this.qrcode_package_name = item.qrcode_package_name;
        this.qr_code_type = item.qr_code_type;
        this.qrCodeDialog = true;
        this.generateParams.name = this.basicStore.storeName;
        this.getSaleList();
      },
      closeQrCodeDialog() {
        this.qrCodeDialog = false;
        this.generateParams = {
          type:1,
          identification:'',
          num:'',
          name:this.basicStore.storeName,
          sale_ids:[],
          sale_act_id:0,
          qr_code_type:1
        }
        this.saleParams.keyword = '';
      },
      generate() {
        let generateParams = this.generateParams;
        if(this.generateParams.type == 1) {
          if(this.generateParams.identification === '') {
            util.msg('为便于区分，请填写标注');
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
        }else if(this.generateParams.type == 2) {
          if(this.generateParams.sale_ids.length == 0) {
            util.msg('请选择要生成分销二维码的销售员');
            return;
          }
          generateParams.sale_ids = generateParams.sale_ids.map(function (value) {
            return ''+value;
          })
        }
        let index = this.layer.load(1);
        saleAct.generateQrCode(generateParams).then(res=>{
          this.layer.close(index);
          util.msg(res.shortMessage);
          if(res.resultCode === 1) {
            exportData.exportExcel({file:this.ImageIp + this.imagePathConfig.salesmanQr + res.responseContent.filename,filename:this.ImageIp + this.imagePathConfig.salesmanQr + res.responseContent.filename});
            if(this.generateParams.type == 1) {
              this.getPageData(this.pageParams);
            }
            this.closeQrCodeDialog();
          }
        })
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      search(){
        this.pageParams.sort = 0
        this.pageParams.pageIndex = 0;
        if(_.isEqual(this.initPageParams,{
            progress_state:this.pageParams.progress_state,
            sale_title:this.pageParams.sale_title,
            sale_keyword:this.pageParams.sale_keyword
          })) {
          this.resetShow = false;
        }else{
          this.resetShow = true;
        }
        this.getPageData(this.pageParams);
      },
      changeSort(type){
        switch (type) {
          case 1:
            if(this.pageParams.sort === 1){
              this.pageParams.sort = 2
            }else{
              this.pageParams.sort = 1
            }
            break;
          case 2:
            if(this.pageParams.sort === 3){
              this.pageParams.sort = 4
            }else{
              this.pageParams.sort = 3
            }
            break;
          case 3:
            if(this.pageParams.sort === 5){
              this.pageParams.sort = 6
            }else{
              this.pageParams.sort = 5
            }
            break;
          case 4:
            if(this.pageParams.sort === 7){
              this.pageParams.sort = 8
            }else{
              this.pageParams.sort = 7
            }
            break;
          case 5:
            if(this.pageParams.sort === 9){
              this.pageParams.sort = 10
            }else{
              this.pageParams.sort = 9
            }
            break;
          case 6:
            if(this.pageParams.sort === 11){
              this.pageParams.sort = 12
            }else{
              this.pageParams.sort = 11
            }
            break;
        }
        this.getPageData(this.pageParams)
      },
      showItem(sale,sale_edit){
        storage.set('sale_act_id',sale.sale_act_id);
        if(sale_edit) {
          storage.set('sale_edit',1);
        }else{
          storage.set('sale_edit',0);
        }
        this.setEdit(sale.show_edit)
        this.$router.push('/promotion/sale_act/sale_act_add');
      },
      closeItem(act_id){
        this.pageParams.sale_act_id = act_id
        this.closeDialog = true
      },
      delItem(act_id){
        this.pageParams.sale_act_id = act_id
        this.delDialog = true
      },
      saleManage(item){
        storage.set('sale_act_id',item.sale_act_id)
        storage.set('sale_title',item.sale_title)
        this.setEdit(item.show_edit)
        this.$router.push('/promotion/sale_act/salesman_list');
      },
      confirmClose(){
        var data = {
          sale_act_id:this.pageParams.sale_act_id
        }
        saleAct.close(data).then((res)=>{
          this.closeDialog = false
          this.getPageData(this.pageParams);
        })
      },
      confirmDel(){
        var data = {
          sale_act_id:this.pageParams.sale_act_id
        }
        saleAct.activeDel(data).then((res)=>{
          this.delDialog = false
          this.getPageData(this.pageParams);
        })
      },
      toOrder(url){
        let routeUrl = this.$router.resolve({
          path: url,
        });
        window.open(routeUrl .href, '_blank');
      }
    },
    watch:{
      list(){
        if(this.list.length == 0 && this.pageParams.pageIndex > 0){
          this.pageParams.pageIndex -= 1;
          this.getPageData(this.pageParams);
        }
      },
      update(){
        // if(this.getPageIndex == 0){
        //   this.pageParams.pageIndex = 0;
        // }
        // this.getPageData(this.pageParams);
      },
      alertGoodsList(){
        this.getAlertGoods()
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
    },
    mounted () {
      var _self = this;
      //_self.getPageData(this.pageParams);
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.qrCodeDialog){
            //生成分销二维码
            _self.generate();
          }else if(_self.delDialog){
            //删除分销活动
            _self.confirmDel();
          }else{
           // _self.search();
          }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      document.body.removeEventListener('keyup', this.bodyListener);
      //this.getPageData(this.pageParams);
    },
    updated(){
    },
    activated: function () {
      this.checkState = [];
      this.checkStateAll = false;
      if(this.getPageIndex == 0){
        this.pageParams.pageIndex = 0;
        this.setPageIndex(1);
      }
      this.getPageData(this.pageParams);
    }
  }
</script>
