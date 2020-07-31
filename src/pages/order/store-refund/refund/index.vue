<style scoped>
  .ncsc-form-category-search{display: inline-block; vertical-align: middle; position: relative; font-size: 12px;}
  .ncsc-form-category-search .search-category{position: absolute; left: 0; top: 0; width: 100px; text-align: left; box-sizing: border-box; padding: 0 20px 0 10px;}
  .ncsc-form-category-search .search-category-name{line-height: 28px; position: relative;}
  .ncsc-form-category-search .search-category-name .fa-angle-down{position: absolute; right: -10px; top: 50%; margin-top: -7px;}
  .ncsc-form-category-search .search-category-drop{position: absolute; left: 0; width: 100%; top: 29px; padding: 0 10px 3px; box-sizing: border-box; background: #fff; border:1px solid #ddd; border-top:none; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; display: none; z-index: 300;}
  .ncsc-form-category-search .list-search-category li{line-height: 1.5; padding: 2px 0;}
  .ncsc-form-category-search input[type="text"]{padding-left: 100px;}
  .ncsc-form-category-search:hover{cursor: pointer;}
  .ncsc-form-category-search.active .search-category-drop{display: block;}
  .ncsc-form-category-search.active .fa-angle-down{margin-top: -8px;}
  .ncsc-form-category-search.active .fa-angle-down:before{content: "\f106";}
  .ncsc-form-category-search.active input{border-bottom-left-radius: 0;}
  .red-dot-1 {
    position: absolute;
    right: 1px;
    top: 2px;
    width: 6px;
    height: 6px;
    background: #ff8518;
    border-radius: 100%;
  }
</style>
<template>
  <div class="qm-store-class-base">
    <div class="search-form mb20">
      <ul class="comm-tab mb20 mt20" id="storage_c_type" v-if="pageParams.listType == 4">
        <li v-for="(item,key) in switchTypes" :class="(pageParams.flag == key || (pageParams.flag == 2 && key == 0)) ? 'active':''" @click="switchType(key)">
          {{item}}
          <i class="red-dot-1" v-if="key==0&&getOrderTips.wx_refund>0"></i>
        </li>
      </ul>
      <span class="ncsc-form-tit">申请时间：</span>
      <input type="text" id="start_time" class="input-add-on w100" v-model="pageParams.startTime" readonly="readonly">
      <label class="add-on"><i class="fa fa-calendar" aria-hidden="true"></i></label>
      <span class="ncsc-sep">-</span>
      <input id="end_time" type="text" class="input-add-on w100" :value="pageParams.endTime" readonly="readonly">
      <label class="add-on mr5"><i class="fa fa-calendar icon-calendar"></i></label>
      <template v-if="pageParams.listType === 1 || pageParams.listType === 2">
        <span class="ncsc-form-tit">处理状态：</span>
        <select @change="search" name="state" class="w100 mr5" v-model="pageParams.state">
          <option value="" selected="">全部</option>
          <option value="1">待审核</option>
          <option value="2">同意</option>
          <option value="3">不同意</option>
        </select>
      </template>
      <div :class="[isActive?'active ':'','ncsc-form-category-search mr5']">
        <div class="search-category"  @mouseover="isActive=true" @mouseout="isActive=false">
          <div class="search-category-name">
            <span class="category-txt">{{curSearchTypeTxt}}</span>
            <i class="fa fa-angle-down"></i>
          </div>
          <div class="search-category-drop"  @mouseover="isActive=true" @mouseout="isActive=false">
            <ul class="list-search-category">
              <li v-for="(type,k) in searchTypes" v-show="k !== pageParams.type"><a @click="changeType(k,type)">{{type}}</a></li>
            </ul>
          </div>
        </div>
        <input type="text" class="w250" name="key" autocomplete="off"  v-model="pageParams.searchText" />
      </div>
      <input type="submit" class="ncsc-btn" value="搜索" @click="search()">
    </div>
    <p v-show="pageParams.listType==4" class="c-gray mb10">线上支付订单下单日当天退款将自动线上原路退回，次日退款需要商家线下打款</p>
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="table-order" v-for="(item,key) in list">
          <tbody>
          <tr>
            <td class="w280">
            <template v-if="item.refund_type == 2">
              <div class="delivery-msg" v-if="item.refund_shipping_type == 0">
                <p class="delivery-type">买家到店退货</p>
              </div>
              <template v-if="item.refund_shipping_type == 1">
                <div class="address">
                  <p v-if="item.change_time">请跟买家协商时间</p>
                  <p v-if="item.receive_time > 0" :class="[item.format_receive_time ? 'c-orange':'']">收货时间：{{item.receive_time}}</p>
                  <p>{{item.extend_order_common.reciver_info.area}}{{item.extend_order_common.reciver_info.address}}</p>
                  <p>{{item.extend_order_common.reciver_name}}{{item.extend_order_common.reciver_info.phone}}</p>
                </div>
                <div class="delivery-msg" v-if="item.diliveryman_id > 0">
                  <ul class="list-msg list-pay">
                    <li>
                      <div class="tit">配送员：</div>
                      <div class="detail" v-if="deliverymanList[item.diliveryman_id] && deliverymanList[item.diliveryman_id].true_name">{{deliverymanList[item.diliveryman_id].true_name}}</div>
                    </li>
                    <li>
                      <div class="tit">配送费：</div>
                      <div class="detail">¥  {{deliverymanLog[item.refund_id]}}</div>
                    </li>
                  </ul>
                </div>
              </template>
            </template>
            <template v-else>
              <div class="delivery-msg">
                <p class="delivery-type">买家申请退款</p>
              </div>
            </template>
              <div class="pay-msg">
                <p :class="['pay-type',(item.extend_order.payment_type == 0 && item.extend_order.is_receive_payment == 0)?'c-orange':'']">
                  {{item.extend_order.pay_type_text}}
                </p>
                <ul class="list-msg list-pay">
                  <li>
                    <div class="tit">订单金额：</div>
                    <div class="detail">¥ <span v-if="item.extend_order.goods_amount ==0">0.00</span><span v-else>{{item.extend_order.goods_amount}}</span></div>
                  </li>
                  <li>
                    <div class="tit">配送费：</div>
                    <div class="detail">¥ <span v-if="item.extend_order.shipping_fee ==0">0.00</span><span v-else>{{item.extend_order.shipping_fee}}</span></div>
                  </li>
                  <li>
                    <div class="tit">优惠金额：</div>
                    <div class="detail">¥ <span v-if="item.extend_order.disconut_money ==0">0.00</span><span v-else>{{item.extend_order.disconut_money}}</span></div>
                  </li>
                  <li :class="[(((item.extend_order.payment_type == 0 || item.extend_order.payment_type == 2) && item.extend_order.is_receive_payment == 0) || (item.extend_order.payment_type != 0 && item.extend_order.payment_type != 2 && item.extend_order.payment_time == 0))?'c-orange':'']">
                    <div class="tit">
                      {{item.extend_order.money_type}}
                    </div>
                    <div class="detail">¥ <span v-if="item.extend_order.order_amount ==0">0.00</span><span v-else>{{item.extend_order.order_amount}}</span></div>
                  </li>
                  <li v-if="item.extend_order.refund_amount > 0">
                    <div class="tit">已退金额：</div>
                    <div class="detail">¥ <span v-if="item.extend_order.refund_amount ==0">0.00</span><span v-else>{{item.extend_order.refund_amount}}</span><a @click="showDetail(item)" class="c-orange ml10" >查看&raquo;</a></div>
                  </li>
                </ul>
              </div>
              <div class="info">
                <p>售后编号：{{item.refund_sn}}</p>
                <div class="info-tip-box">
                  <p class="info-btn-more"><i class="ico-more"></i></p>
                  <div class="info-tip">
                    <p>订&ensp;单&ensp;号：{{item.order_sn}}</p>
                    <p>买&emsp;&emsp;家：{{item.extend_order.buyer_name}}</p>
                    <p v-if="item.extend_order.add_time > 0">下单时间：{{dateFormat(item.extend_order.add_time,'yyyy-MM-dd HH:mm:ss')}}</p>
                    <p v-if="item.extend_order.finnshed_time > 0">完成时间：{{dateFormat(item.extend_order.finnshed_time,'yyyy-MM-dd HH:mm:ss')}}</p>
                    <p v-if="item.add_time > 0">申请时间：{{dateFormat(item.add_time,'yyyy-MM-dd HH:mm:ss')}}</p>
                  </div>
                </div>
              </div>
            </td>
            <td class="action-wrap">
              <ul class="plist-goods">
                  <li class="item" v-if="typeof(item.goods_group) == 'object' && item.goods_group.length > 0">
                    <div class="goods-detail">
                      <div class="pic">
                        <img :src="item.goods_image" alt="">
                      </div>
                      <div class="detail">
                        <div class="detail-c1">
                          <p class="count">×{{item.goods_num}}</p>
                        </div>
                        <div class="detail-c2">
                          <div class="tit">{{item.goods_name}}</div>
                          <p class="total-price">
                            <span class="c-orange fs16">￥<span v-if="item.goods_price ==0">0.00</span><span v-else>{{item.goods_price}}</span></span>
                            <span class="origin-price ml20">¥<span v-if="item.totalGoodsPrice ==0">0.00</span><span v-else>{{item.totalGoodsPrice}}</span></span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="goods-joint">
                      <div class="joint-tit">搭配商品</div>
                      <ul class="plist-goods-joint">
                        <li class="joint-item">
                          <div class="goods-detail" v-for="(g_item,g_key) in item.goods_group">
                            <div class="pic">
                              <img :src="g_item.goodsImagePath" alt="">
                            </div>
                            <div class="detail">
                              <div class="detail-c1">
                                <p class="count"> x {{g_item.num}}</p>
                              </div>
                              <div class="detail-c2">
                                <a class="tit" @click="openGoods(g_item.goodsCommonId)">{{g_item.goodsName}}</a>
                                <div class="intro">{{item.attr_text}}</div>
                                <p class="joint-total-price">
                                  <span class="fs16">￥<span v-if="g_item.discountPrice ==0">0.00</span><span v-else>{{g_item.discountPrice}}</span></span>
                                  <span class="origin-price ml20">￥<span v-if="g_item.goodsPrice ==0">0.00</span><span v-else>{{g_item.goodsPrice}}</span></span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                <li class="item" v-else>
                  <div class="goods-detail">
                    <div class="pic">
                      <img :src="item.goods_image" alt="">
                    </div>
                    <div class="detail">
                      <div class="detail-c1">
                        <p class="count">×{{item.goods_num}}</p>
                        <p class="price">￥<span v-if="item.goods_price ==0">0.00</span><span v-else>{{item.goods_price}}</span></p>
                      </div>
                      <div class="detail-c2">
                        <a class="tit" @click="openGoods(item.goods_commonid)">{{item.goods_name}}</a>
                        <p class="intro" v-if="item.goods_spec !== ''">{{item.goods_spec}}</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="return-msg">
                <ul class="list-msg list-return">
                  <li>
                    <div class="tit">售后类型：</div>
                    <div class="detail">{{item.refund_type == 1 ? '仅退款' : '退货退款'}}</div>
                  </li>
                  <li>
                    <div class="tit">售后原因：</div>
                    <div class="detail">{{item.reason_info}}</div>
                  </li>
                  <li>
                    <div class="tit">申请金额：</div>
                    <div class="detail">¥ <span v-if="item.buyer_refund_amount ==0">0.00</span><span v-else>{{item.buyer_refund_amount}}</span></div>
                  </li>
                  <li class="c-orange" v-if="item.seller_state == 2 || item.platform_state == 1">
                    <div class="tit">同意金额：</div>
                    <div class="detail">¥ <span v-if="item.refund_amount ==0">0.00</span><span v-else>{{item.refund_amount}}</span></div>
                  </li>
                  <li v-if="item.buyer_message !== ''">
                    <div class="tit">附加说明：</div>
                    <div class="detail">{{item.buyer_message}}</div>
                  </li>
                  <li v-if="typeof(item.pic_info) == 'object' && item.pic_info.length > 0">
                    <div class="tit">附&emsp;&emsp;件：</div>
                    <div class="detail">
                      <div class="img-box js-tips-img" v-for="(p_item,p_key) in item.pic_info">
                        <img :src="p_item" @click="showImageDetil(p_item)">
                      </div>
                    </div>
                  </li>
                </ul>
                <ul class="list-msg list-return">
                  <li>
                    <div class="tit">处理状态：</div>
                    <div class="detail">{{sellerState[item.seller_state]}}</div>
                  </li>
                  <li v-if="item.seller_message !== ''">
                    <div class="tit">商家备注：</div>
                    <div class="detail">{{item.seller_message}}</div>
                  </li>
                  <li class="c-orange" v-if="item.is_platform_in !== 0">
                    <div class="tit">平台状态：</div>
                    <div class="detail">{{platformState[item.platform_state]}}</div>
                  </li>
                  <li v-if="item.admin_message !== ''">
                    <div class="tit">平台备注：</div>
                    <div class="detail">{{item.admin_message}}</div>
                  </li>
                </ul>
              </div>
              <div class="action-bar">
                <a v-if="item.handle !== false && item.refund_state !== 0" href="javascript:void(0)" @click="showDeal(item)"  class="ncsc-btn-mini">处理</a>

                <a v-if="((item.take_delivery && item.is_platform_in==0) || (item.mark && item.is_platform_in>0 && item.platform_state>0)) && item.seller_state ==2" @click="showReceive(item)"  class="ncsc-btn-mini" >收货</a>

                <a v-if="((item.change_time && item.is_platform_in==0) || (item.mark && item.is_platform_in>0 && item.platform_state>0))&& item.seller_state ==2" class="ncsc-btn-mini" >修改收货时间</a>

                <a v-if="item.mark !== false" class="ncsc-btn-mini" @click="markRefund(item)">标记为已退款</a>
              </div>
              <div class="order-status">{{item.state_name}}</div>
            </td>
          </tr>
        </tbody>
        </table>
      </template>
    </qm-table>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
    <qm-tips :tipsVisible="confirmReceiveDialog" :width="'420px'" @update:tipsVisible="confirmReceiveDialog = $event" :showCancel="false" @close="confirmReceiveDialog = false"  @confirm="confirmReceive()">
      <template slot="title">收货</template>
      <template slot="content">是否确认收货？</template>
    </qm-tips>
    <qm-tips :tipsVisible="showDetailDialog" :width="'700px'" @update:tipsVisible="showDetailDialog = $event" :showCancel="false" @close="showDetailDialog = false"  @confirm="showDetailDialog = false">
      <template slot="title">退款详情</template>
      <template slot="content">

        <div class="eject_con" style="text-align: left">
          <template v-for="(d_item,d_key) in detailList">
          <ul class="plist-goods">
            <li class="item">
              <div class="goods-detail">
                <div class="pic">
                  <img :src="d_item.goodsImage" alt="">
                </div>
                <div class="detail" v-if="d_item.goodsGroup.length > 0">
                  <div class="detail-c1">
                    <p class="count">
                      ×{{d_item.goodsNum}}
                    </p>
                  </div>
                  <div class="detail-c2">
                    <div class="tit">
                      {{d_item.goodsName}}
                    </div>
                    <p class="total-price">
                <span>
                  ￥{{d_item.goodsPrice}}
                </span>
                      <span class="origin-price ml20">
                  ¥{{d_item.goodsOriginPrice}}
                </span>
                    </p>
                    <p v-if="d_item.isSucRefund > 0" class="c-orange mt5"> 实退金额：¥{{d_item.refundAmount}}</p>
                    <p v-else class="c-orange mt5"> 同意退款金额：¥{{d_item.refundAmount}}(待打款)</p>
                  </div>
                  <a class="btn-collapse js-collapse hide" @click="detailShow = !detailShow"><span class="txt" >{{detailShow?'收起':'展开'}}</span><i :class="['fa',detailShow?'fa-angle-up':'fa-angle-down']"></i></a>
                </div>
                <div class="detail" v-else>
                  <div class="detail-c1">
                    <p class="count">×{{d_item.goodsNum}}</p>
                    <p class="price">￥{{d_item.goodsPrice}}</p>
                  </div>
                  <div class="detail-c2">
                    <div class="tit"> {{d_item.goodsName}}</div>
                    <p class="intro" v-if="d_item.goodsAttr.length > 0">
                      <template v-for="(dd_item) in d_item.goodsAttr">{{dd_item.attrName}}:{{dd_item.attrValue}};</template>
                    </p>

                    <p v-if="d_item.isSucRefund" class="c-orange mt5"> 实退金额：¥{{d_item.refundAmount}}</p>
                    <p v-else class="c-orange mt5"> 同意退款金额：¥{{d_item.refundAmount}}(待打款)</p>

                  </div>
                </div>

              </div>
              <div v-if="d_item.goodsGroup.length>0" class="goods-joint" v-show="detailShow">
                <div class="joint-tit">
                  搭配商品
                </div>
                <ul class="plist-goods-joint">

                  <li class="joint-item">
                    <div v-for="goods in d_item.goodsGroup" class="goods-detail">
                      <div class="pic">
                        <img :src="goods.goodsImage" alt="">
                      </div>
                      <div class="detail">
                        <div class="detail-c1">
                          <p class="count">
                            x {{goods.num}}
                          </p>
                        </div>
                        <div class="detail-c2">
                          <div class="tit">
                            {{goods.goodsName}}
                          </div>
                          <div class="intro">
                            {{goods.goodsSpecUnser}}
                          </div>
                          <p class="joint-total-price">
                      <span>
                          ￥{{goods.discountPrice}}

                      </span>
                            <span class="origin-price ml20">
                           ￥{{goods.goodsPrice}}
                      </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

            </li>

          </ul>
          <div class="c-gray mb20">
            <p>售&ensp;后&ensp;编&ensp;号&ensp;：{{d_item.refundSn}}</p>
            <p>退款发起时间：{{dateFormat(d_item.addTime,'yyyy-MM-dd HH:mm:ss')}}</p>
            <p>退款同意时间：{{dateFormat(d_item.sellerTime,'yyyy-MM-dd HH:mm:ss')}}</p>
            <p v-if="d_item.gmtUpdate > 0">退款完成时间：{{dateFormat(d_item.gmtUpdate,'yyyy-MM-dd HH:mm:ss')}}</p>
          </div>
          </template>
        </div>

      </template>
    </qm-tips>
    <qm-tips :tipsVisible="dealDialog" :width="'550px'" @update:tipsVisible="dealDialog = $event" :showCancel="false" @close="dealDialog = false"  @confirm="confirmDeal()">
      <template slot="title">处理</template>
      <template slot="content">
        <form  style="text-align: left;" @submit.prevent="">
          <template v-if="refundInfo.refund_type == 1">
            <div class="ncsc-form-default" style="min-height: 0 !important;">
          <dl>
            <dt><i class="required">*</i>是否同意:</dt>
            <dd>
              <label class="mr20">
                <input type="radio" class="radio vm" name="seller_state" value="2" v-model="subData.isAgree" />
                同意</label>
              <label>
                <input type="radio" class="radio vm" name="seller_state" value="3" v-model="subData.isAgree"  />
                拒绝</label>
              <span><label class="error" v-show="validData.isAgreeError!=''"><i class="fa fa-exclamation-circle"></i>{{validData.isAgreeError}}</label></span>
            </dd>
          </dl>
          <dl class="image-text agree-con" v-show="subData.isAgree == 2">
            <dt>售后编号:</dt>
            <dd>{{refundInfo.refund_sn}}</dd>
          </dl>
          <dl class="agree-con"  v-show="subData.isAgree == 2">
            <dt>退款金额:</dt>
            <dd>
              <input type="text" class="w150 mr10" name="refund_amount" v-model="subData.refundAmount"/>元
              <span><label class="error" v-show="validData.refundAmountEmpty!=''"><i class="fa fa-exclamation-circle"></i>{{validData.refundAmountEmpty}}</label></span>
              <p class="c-orange fs12">退款金额不可大于可退款金额 {{refundInfo.can_refund_money}} 元!</p>
              <p class="hint mt0">
                <span class="mr15">订单金额：{{refundInfo.goods_amount}}元</span>
                <span class="mr15">实付金额：{{refundInfo.order_amount}}元</span>
                <span>已退金额：{{refundInfo.refund_amount}}元</span>
              </p>
            </dd>
          </dl>
          <dl class="">
            <dt>备注信息:</dt>
            <dd>
              <textarea name="seller_message" rows="2" class="textarea w300" v-model="subData.text"></textarea>
              <span><label class="error" v-show="validData.textError!=''"><i class="fa fa-exclamation-circle"></i>{{validData.textError}}</label></span>
            </dd>
          </dl>
          <dl>
            <dt></dt>
            <dl><p class="hint">只能提交一次，请认真选择。<br>拒绝时，买家可以向平台投诉或再次申请。</p>
              <p class="c-orange fs12">友情提示：非对应订单交易日，退款款项需要进行线下协商打款</p></dl>
          </dl>
            </div>
          </template>
          <template v-else>
            <div class="ncsc-form-default"  style="min-height: 0 !important;">
          <dl>
            <dt><i class="required">*</i>是否同意:
            </dt>
            <dd>
              <div>
                <label class="mr20">
                  <input type="radio" class="vm" name="seller_state" value="2" v-model="subData.isAgree"/>
                  同意</label>
                <label>
                  <input type="radio" class="vm" name="seller_state" value="3" v-model="subData.isAgree"/>
                  拒绝</label>
              </div>
              <span><label class="error" v-show="validData.isAgreeError!=''"><i class="fa fa-exclamation-circle"></i>{{validData.isAgreeError}}</label></span>
            </dd>
          </dl>
          <dl class="agree-con" v-show="subData.isAgree == 2">
            <dt>是否弃货：</dt>
            <dd>
              <label class="mr20">
                <input type="radio" class="vm" name="return_type" value="0" v-model="subData.isGiveUp"/>
                不弃货</label>
              <label>
                <input name="return_type"  class="vm" type="radio" value="1" v-model="subData.isGiveUp"/>
                弃货</label>
              <p class="c-gray fs12 lh1-5">如果选择弃货，买家将不用退回原商品，提交后直接由管理员确认退款。</p>
            </dd>
          </dl>
          <dl class="image-text agree-con"  v-show="subData.isAgree === 2">
            <dt>售后编号:</dt>
            <dd>{{refundInfo.refund_sn}}</dd>
          </dl>
          <dl class="agree-con" v-show="subData.isAgree == 2">
            <dt>退款金额:</dt>
            <dd>
              <input type="text" class="w150 mr10" id="refund_amount" name="refund_amount" v-model="subData.refundAmount" />元
              <span><label class="error" v-show="validData.refundAmountEmpty!=''"><i class="fa fa-exclamation-circle"></i>{{validData.refundAmountEmpty}}</label></span>
              <p class="c-orange fs12 lh2">退款金额不可大于可退款金额 {{refundInfo.can_refund_money}} 元!</p>
              <p class="hint mt0">
                <span class="mr15">订单金额：{{refundInfo.goods_amount}}元</span>
                <span class="mr15">实付金额：{{refundInfo.order_amount}}元</span>
                <span>已退金额：{{refundInfo.refund_amount}}元</span>
              </p>
            </dd>
          </dl>
          <dl>
            <dt>备注信息:</dt>
            <dd>
              <textarea name="seller_message" rows="2" class="textarea w300" v-model="subData.text"></textarea>
              <span><label class="error" v-show="validData.textError!=''"><i class="fa fa-exclamation-circle"></i>{{validData.textError}}</label></span>

              <span class="error"></span>
              <p class="hint"> 如是同意退货，请及时关注买家的发货情况，并进行收货（发货5天后可以选择未收到，超过7天不处理按弃货处理）。<br>
              <p class="c-orange fs12">友情提示：非对应订单交易日，退款款项需要进行线下协商打款</p>
            </dd>
          </dl>
  </div>
          </template>
        </form>
      </template>
    </qm-tips>
    <el-dialog
      :visible.sync="hasImageDialog"
      :lock-scroll="modalAppendToBody"
      :close-on-click-modal = "closeOnClickModal"
      :width="imgWidth + 20 +'px'"
      customClass="show-image">
      <template v-if="hasImage">
        <img :src="imageUrl" class="hasImageDiv" :style="{width:imgWidth +'px'}"/>
        <div class="closeDiv">
          <div id="lightbox-container-image-data">
            <div id="lightbox-image-details">
              <span id="lightbox-image-details-caption" style="display: none;"></span>
              <span id="lightbox-image-details-currentNumber" style="display: none;"></span>
            </div>
            <div id="lightbox-secNav">
              <a id="lightbox-secNav-btnClose" @click="hasImageDialog = false">
                <img src="//static.shenbd.com/lib/js/lightbox/img/lightbox-btn-close.gif">
              </a>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </template>

    </el-dialog>
    <el-dialog
      :visible.sync="unImageDialog"
      width="250px"
      :lock-scroll="modalAppendToBody"
      customClass="show-image">

      <div class="loader">
        <img src="//static.shenbd.com/lib/js/lightbox/img/lightbox-ico-loading.gif">
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  import QmPagination from 'component/qm-pagination/index';
  import QmDialog from 'component/qm-dialog/index';
  import QmTips from 'component/qm-tips/index';
  import QmTable from 'component/qm-table/index';
  import util from 'lib/utils/util';
  import {storeRefund} from 'api';
  export default {
    name: "store-refund-refund",
    data() {
      return {
        imageUrl:'',
        hasImage:false,
        hasImageDialog:false,
        unImageDialog:false,
        modalAppendToBody:false,
        closeOnClickModal:false,
        isActive:false,
        curSearchTypeTxt:'订单编号',
        searchTypes:{
          order_sn:'订单编号',
          refund_sn:'售后编号',
          buyer_name:'买家会员名',
        },
        switchTypes:{
          0:'待退款',
          1:'已退款'
        },
        sellerState: {
          1: '待审核',
          2: '同意',
          3: '不同意',
        },
        platformState:{
          0:'待审核',
          1:'同意',
          2:'不同意',
        },
        pageParams:{
          pageIndex:0,
          pageSize:10,
          total:0,
          state:'',
          startTime:'',
          endTime:'',
          type:'order_sn',
          searchText:'',
          listType:1,
          flag:2
        },
        list:[],
        deliverymanList:[],
        deliverymanLog:[],
        detailList:[],
        detailShow:false,
        confirmReceiveDialog:false,
        showDetailDialog:false,
        dealDialog:false,
        subData:{
          refundId:0,
          orderId:0,
          refundAmount:'',
          text:'',
          isGiveUp:0,
          isAgree:0
        },
        refundInfo:{
          refund_type:'',
          refund_id:'',
          refund_sn:'',
          order_amount:'',
          refund_amount:'',
          origin_amount:'',
          can_refund_money:'',
          goods_amount:'',
        },
        validData:{
            refundAmountEmpty:'',
            textError:'',
            isAgreeError:''
        },
        wx_refund:''
      }
    },

    computed:{
      ...mapGetters({
        getOrderTips:"getOrderTips"
      }),
    },

    components:{
      QmPagination,
      QmDialog,
      QmTips,
      QmTable
    },

    methods: {
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
      getPageData(data){
        storeRefund.storeRefundList(data).then((res)=>{
          this.list = res.returnList;
          this.deliverymanList = res.deliverymanList
          this.deliverymanLog = res.deliverymanLog
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
        })
        this.isInventoryWarning();
        //this.wx_refund=this.getOrderTips.wx_refund;
      },
      showImageDetil(imageUrl){
        this.imageUrl = imageUrl;
        this.isHasImg(this.imageUrl).then((res)=>{
          this.hasImage = res;
          if(this.hasImage){
            this.hasImageDialog = true;
          }else{
            this.unImageDialog = true;
          }
        });

      },
      isHasImg(pathImg){
        var vm = this;
        return new Promise((resolve, reject) => {
          var ImgObj=new Image();
          ImgObj.src= pathImg;
          ImgObj.onload =function(res) {
            if(ImgObj.width >= 520){
              vm.imgWidth = 520;
            }else{
              vm.imgWidth = ImgObj.width;
            }
            resolve(true);
          }
          ImgObj.onerror =function() {
            resolve(false)
          }
        })

      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      search(){
        $('select').blur();
        this.pageParams.pageIndex = 0;
        this.getPageData(this.pageParams);
      },
      showDetail(item){
        var data = {
          orderId:item.order_id
        }
        storeRefund.getRefunds(data).then((res)=>{
          this.detailList = res.refundReturns
          this.showDetailDialog = true
        })
      },
      showReceive(item){
        this.subData.refundId = item.refund_id
        this.confirmReceiveDialog = true
      },
      showDeal(item){
        this.resetSubData()
        this.subData.refundId = item.refund_id
        this.refundInfo.refund_type = item.refund_type
        this.refundInfo.refund_id = item.refund_id
        this.refundInfo.refund_sn = item.refund_sn
        this.refundInfo.order_amount = item.extend_order.order_amount
        this.refundInfo.refund_amount = item.extend_order.refund_amount
        this.refundInfo.origin_amount = item.extend_order.origin_amount
        this.refundInfo.goods_amount = item.extend_order.goods_amount
        this.refundInfo.can_refund_money = item.extend_order.can_refund_money
        this.dealDialog = true
      },
      confirmReceive(){
        var data = {
          refundId:this.subData.refundId,
        }
        storeRefund.confirmReceive(data).then((res)=>{
          this.confirmReceiveDialog = false
          this.getPageData(this.pageParams);
        })
      },
      markRefund(item){
        var data = {
          refundId: item.refund_id
        }
        storeRefund.makeRefund(data).then((res)=>{
          this.getPageData(this.pageParams);
        })
      },
      confirmDeal(){

          this.validData.refundAmountEmpty = '';
          this.validData.textError = '';
          this.validData.isAgreeError = ''
          if(this.subData.isAgree==0){
              this.validData.isAgreeError = '请选择是否同意'
              return false;
          }
        if(this.subData.isAgree == 2){
          if(this.subData.refundAmount==''){
              this.validData.refundAmountEmpty = '退款金额不能为空';
          }else if(!(/^\d+(\.\d{0,2})?$/.test(this.subData.refundAmount.trim())&&this.subData.refundAmount>=0)){
              // 旧的正则：/^\d{1,}\.\d{2}$/ 一位小数过不了
              this.validData.refundAmountEmpty = '退款金额不能小于0';
          }else if(parseFloat(this.subData.refundAmount+"")>parseFloat(this.refundInfo.can_refund_money+"")){
              this.validData.refundAmountEmpty = '退款金额不能大于'+this.refundInfo.can_refund_money+'元';
          }
          if(this.validData.refundAmountEmpty==''){
              var data = {
                  refundId:this.subData.refundId,
                  refundAmount:parseInt(this.subData.refundAmount * 100),
                  text:this.subData.text,
                  isGiveUp:this.subData.isGiveUp
              }
              storeRefund.agree(data).then((res)=>{
                  this.getPageData(this.pageParams);
              })
              this.dealDialog = false
          }
        }else if(this.subData.isAgree == 3){
          if(this.subData.text==''){
              this.validData.textError = '备注信息不能为空';
          }
          if(this.validData.textError==''){
              var data = {
                  refundId:this.subData.refundId,
                  text:this.subData.text
              }
              storeRefund.refuse(data).then((res)=>{
                  this.getPageData(this.pageParams);
              })
              this.dealDialog = false
          }
        }
      },
      switchType(key){
        if(key == 0){
          this.pageParams.flag = 2
        }else{
          this.pageParams.flag = 1
        }
        this.getPageData(this.pageParams);
      },
      dateFormat(date,format){
        var micro = parseInt(date+'000');
        return util.dateFormat(new Date(micro),format)
      },
      changeType(type,txt){
        this.pageParams.type = type
        this.curSearchTypeTxt = txt

      },
      setTime(type){
        var date = new Date();
        var _self = this;
        _self.timeType = type;
        if(type == -1){
          //时间控件选择变化，不进行查询
          $('.mr5').removeClass('active');
         /* _self.pageParams.startTime = $('#start_time').val();
          _self.pageParams.endTime = $('#end_time').val();*/
        }else{
          _self.pageParams.startTime = util.dateFormat(new Date(date-type*24*3600*1000),'yyyy-MM-dd');
          if(type == 1){
            //昨天的日期选择，结束时间也要是昨天
            _self.pageParams.endTime = util.dateFormat(new Date(date-type*24*3600*1000),'yyyy-MM-dd');
          }else{
            _self.pageParams.endTime = util.dateFormat(date,'yyyy-MM-dd');
          }
          _self.search();
        }
      },
        //验证数值
      checkNumData(value,type){
          //验证正整数
          if(type == 1){
              var re = /^[0-9]+$/;
              if(re.test(value)){
                  return value>1 ? true : false;
              }else{
                  return false;
              }
          }else{
              //验证正数
              var re = /^\d+(\.\d+)?$/;
              if(re.test(value)){
                  return true;
              }else{
                  return false;
              }
          }
      },
      initListType(route){
        if(route === 'store_refund_refund'){
          this.pageParams.listType = 1;
        }else if(route === 'store_refund_return'){
          this.pageParams.listType = 2;
        }else if(route === 'store_refund_return_wait'){
          this.pageParams.listType = 3;
        }else if(route === 'store_refund_wx_refund'){
          this.pageParams.listType = 4;
        }
      },
      resetParams(){
        this.pageParams.pageIndex = 0;
        this.pageParams.state = '',
        this.pageParams.startTime = '',
        this.pageParams.endTime = '',
          this.curSearchTypeTxt='订单编号',
        this.pageParams.type = 'order_sn',
        this.pageParams.searchText = '',
        this.pageParams.listType = 1,
        this.pageParams.flag = 2
      },
      resetSubData(){
        this.subData.refundId = 0,
        this.subData.orderId = 0,
        this.subData.refundAmount = '';
        this.subData.text = ''
        this.subData.isGiveUp = 0
        this.subData.isAgree = 0
      },
       open(){
          if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
            $("html").css("overflow","hidden");
            $(".main").css("marginRight","18px");
            $(".header").css("width","calc(100% - 16px )");
            // var marginl = "calc((100% - 2px - 1200px)/2)";
            // $("#content").css("marginLeft",marginl);
          }
        },
        close(){
          if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
            $("html").css("overflow","auto")
            $(".main").css("marginRight","0px");
            $(".header").css("width","calc(100% - 0px)");
            // var marginl = "calc((100% - 1200px)/2)";
            // $("#content").css("marginLeft",marginl);
          }
        },
    },
    watch:{
      '$route'(newRouter){
        this.resetParams()
        this.initListType(newRouter.name)
        this.getPageData(this.pageParams);
      }
    },
    mounted () {
      var _self = this;
      this.initListType(this.$route.name)
      this.getPageData(this.pageParams);
      layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
          elem: '#start_time',
          theme: "#ff8519",
          trigger:'click',
          done:function(data){
            var newParam = _.clone(_self.pageParams);
            newParam.startTime = data;
            _self.pageParams = newParam;
            _self.setTime(-1);
          }
        });
        laydate.render({
          elem: '#end_time',
          theme: "#ff8519",
          trigger:'click',
          done:function(data){
            var newParam = _.clone(_self.pageParams);
            newParam.endTime = data;
            _self.pageParams = newParam;
            _self.setTime(-1);
          }
        });

      })
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.dealDialog){
            //处理弹窗
            _self.confirmDeal();
          }else if(_self.showDetailDialog){
            //退款详情
            _self.showDetailDialog = false;
          }else if(_self.confirmReceiveDialog){
            //收获
            _self.confirmReceive();
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
