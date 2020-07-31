<style scoped>
    .qm-store-class-base{
        padding:0;
    }
    .ncsc-btn-orange-rim {
        border-color: #ff8519;
        color: #ff8519;
    }
    .ncsc-btn-orange-rim:hover {
        background: #ff8519;
        color: #fff;
    }

    .add-goods-step{font-size: 0; margin:20px 0;}
    .add-goods-step li{color: #ccc; vertical-align: top; display: inline-table; position: relative; z-index: 1; padding: 0 30px;}
    .add-goods-step li h6{line-height: 16px;}
    .add-goods-step li h2{font-size: 22px; font-weight: lighter; line-height: 30px;}
    .add-goods-step li .arrow{font-size: 20px; line-height: 50px; text-align: center; width: 20px; height: 50px; position: absolute; z-index: 1; top: 0; right: -10px;}
    .add-goods-step li.current,.add-goods-step li.current h2{color:#ff8519;}
    .sticky .add-goods-step{width: 940px; height: 50px; padding: 10px 0 10px 20px; margin: 0; border-bottom: solid 1px #27A9E3; position: fixed; z-index: 99; top: 0;}
    .div-goods-select-box{position: relative; max-width: 742px;}
    .div-goods-select{position: relative; margin-bottom: 20px; border: solid 1px #eee; padding: 20px 10px; border-radius:5px; box-sizing: border-box; width: 742px;}
    .div-goods-select .close, .div-goods-select-box .close{font: lighter 18px/18px SimSun; color: #757575; background-color: #FFF; text-align: center; display: block; width: 18px; height: 18px; border: 1px solid #bbb; border-radius: 20px; position: absolute; z-index: 1; top: -11px; right: -11px; cursor: pointer;}
    .div-goods-select .close:hover, .div-goods-select-box .close:hover{color:#fff; background:#ff8519; border-color:#ff8519; text-decoration: none;}
    .selected-group-goods{width: 160px; padding: 10px; margin-bottom: 10px; border: solid 1px #ddd; display: inline-block; vertical-align: top; margin:0 20px 30px 0; box-sizing: border-box; border-radius:5px;}
    .selected-group-goods .goods-thumb{ width: 100px; margin:0 auto; display: table; table-layout: fixed}
    .selected-group-goods .goods-thumb-in{ display: table-cell; width: 100%; height: 100px; vertical-align: middle; text-align: center;}
    .selected-group-goods .goods-thumb img{max-width: 100px; max-height: 100px;}
    .selected-group-goods .goods-name, .selected-group-goods .goods-price{line-height: 20px; white-space: nowrap; text-overflow: ellipsis; display: block; width: 100%; height: 20px; overflow: hidden;}
    .selected-group-goods .goods-name{margin-top: 5px;}

    .phone-bind-title{
        color: white;
        text-align: center;
        height: 54px;
        line-height: 54px;
        color: #fff;
        font-size: 20px;
    }
    .dialog-footer{
        margin:20px 0;
    }
    .dialog-footer .submit{
        text-align: center;
        min-width: 200px;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        background: #ff8519;
        color: #fff;
        border: none;
        padding: 0 10px;
        display: inline-block;
        border-radius: 5px;
        box-sizing: border-box;
        text-align: center;
    }
    .dialog-footer .submit:hover{
        background:rgb(239,113,1);
    }
    .submit-border{
        margin:20px 0 20px 30%;
    }

    .distribution-node-nomargin-search {
        font-size: 12px;
        color: #ff8518;
        cursor: pointer;
        margin: 0 20px;
        font-size: 16px;
    }

</style>
<template>
    <div class="qm-store-class-base">
        <ul class="add-goods-step">
            <li :class="this.subData.type == 0?'current':''">
                <h6>STEP.1</h6>
                <h2>选择优惠券分类</h2>
                <i class="fa fa-angle-right arrow "></i>
            </li>
            <li :class="this.subData.type > 0?'current':''">
                <h6>STEP.2</h6>
                <h2>填写优惠券信息</h2>
                <i class="fa fa-angle-right arrow "></i>
            </li>
            <li>
                <h6>STEP.3</h6>
                <h2>优惠券添加成功</h2>
            </li>
        </ul>
        <div v-show="this.subData.type==0" class="ncsc-form-default" >
            <dl>
                <dt>优惠券类型:</dt>
                <dd>
                    <select class="d_inline valid" v-model="type" name="type">
                        <option v-for="(temp,f) in coupon_types" :value="f">{{temp}}</option>
                    </select>
                    <a class="distribution-node-nomargin-search" @click="openCouponCopyDialog()">复制优惠券</a>
                    <p class="hint vital"></p>
                </dd>
            </dl>
            <div class="bottom">
                <label class="submit-border">
                    <input type="button" class="submit" value="下一步" @click="goNext()" />
                </label>
            </div>
        </div>
        <div v-show="this.subData.type>0"  class="ncsc-form-default">
            <template v-if="subData.id==0">
                <dl>
                    <dt>优惠券类型:</dt>
                    <dd>
                        <select class="d_inline valid" name="type" id="type" v-model="subData.type">
                            <option v-for="(first,f) in coupon_types"  :value="f" >{{first}}</option>
                        </select>
                        <p class="hint vital"></p>
                    </dd>
                </dl>
            </template>
            <template v-else>
                <dl >
                    <dt>优惠券类型:</dt>
                    <dd>
                        {{coupon_types[subData.type]}}
                        <input type="hidden" v-model="subData.type" name="type"/>
                    </dd>
                </dl>
            </template>
            <template v-if="subData.type ==2 || subData.type ==3 || subData.type ==4">
                <dl>
                    <dt>优惠方式:</dt>
                    <dd>
                        <ul class="ncsc-form-radio-list">
                            <li>
                                <input type="radio" v-model="subData.coupon_type" value="1" id="coupon_type_1" @change="setTitle($event)" />
                                <label for="coupon_type_1">满减</label>
                            </li>
                            <li>
                                <input type="radio"  v-model="subData.coupon_type" value="0" id="coupon_type_0" @change="setTitle($event)" />
                                <label for="coupon_type_0">折扣</label>
                            </li>
                            <li>
                                <input type="radio"  v-model="subData.coupon_type" value="2" id="coupon_type_2" @change="setTitle($event)"  />
                                <label for="coupon_type_2">满额赠券</label>
                            </li>
                            <li>
                                <input type="radio"  v-model="subData.coupon_type" value="3" id="coupon_type_3" @change="setTitle($event)" />
                                <label for="coupon_type_3">满额赠礼品</label>
                            </li>
                        </ul>
                    </dd>
                </dl>
            </template>
            <template v-if="subData.type==1">
                <dl id="cash_money_1">
                    <dt><i class="required">*</i>优惠券金额:</dt>
                    <dd>
                        <input name="cash_money" type="number" class="w100" v-model="subData.cash_money" @blur="setTitle($event)"/>
                        <span><label class="error" v-show="validData.cashMoneyErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.cashMoneyErrContent}}</label></span>
                    </dd>
                </dl>
                <dl >
                    <dt><i class="required">*</i>优惠券名称:</dt>
                    <dd>
                        <input name="name" type="text" class="w300" v-model="subData.name" @blur="validName($event)"/><span></span>
                        <span><label class="error" v-show="validData.nameErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.nameErrContent}}</label></span>
                    </dd>
                </dl>
            </template>
            <template v-else>
                <dl>
                    <dt><i class="required">*</i>订单金额满:</dt>
                    <dd>
                        <input name="order_amount" type="number" class="w100 mr5" v-model="subData.order_amount"  @blur="setTitle($event)"/>元
                        <span><label class="error" v-show="validData.orderMoneyErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.orderMoneyErrContent}}</label></span>
                    </dd>
                </dl>
                <dl id="order_amount_dl" :style="{display: subData.coupon_type==1?'table':'none'}">
                <dt><i class="required">*</i>减免:</dt>
                <dd>
                    <input name="cash_money" type="number" class="w100 mr5" v-model="subData.cash_money"  @blur="setTitle($event)" />元
                    <span><label class="error" v-show="validData.cashMoneyErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.cashMoneyErrContent}}</label></span>
                </dd>
                </dl>
                <dl id="discount_dl"  :style="{display: subData.coupon_type==0?'table':'none'}">
                <dt><i class="required">*</i>优惠券折扣:</dt>
                <dd>
                    <input name="discount" type="number" class="w100 mr5" v-model="discountShow"  @blur="setTitle($event)" min="1" max="100" onkeyup=""/>%
                    <span><label class="error" v-show="validData.discountErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.discountErrContent}}</label></span>
                    <p class="hint vital">请填写小于100的正整数</p>
                </dd>
                </dl>

                <dl >
                    <dt><i class="required">*</i>优惠券名称:</dt>
                    <dd>
                        <input name="name" type="text" class="w300" v-model="subData.name" />
                        <span><label class="error" v-show="validData.nameErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.nameErrContent}}</label></span>
                    </dd>
                </dl>
                <dl id="gift_coupon_dl" :style="{display: subData.coupon_type==2?'table':'none'}">
                    <dt><i class="required">*</i>满额赠券:</dt>
                    <dd>
                        <select name="gift_coupon_id" id="gift_coupon_id" :style="{display: (avail_coupon_list&&avail_coupon_list.length>0)?'block':'none'}" v-model="subData.gift_coupon_id" >
                            <option value="0">请选择对应券</option>
                            <option v-for="(temp,i) in avail_coupon_list" :value="temp.id" >{{temp.name}}</option>
                        </select>
                        <span><label class="error" v-show="validData.giftCouponIdErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.giftCouponIdErrContent}}</label></span>
                        <p class="c-gray">
                            用于满额赠券活动的优惠券必须满足<span class="c-black">“前台不展示”</span><span class="c-black">“不限制发布张数”</span><span class="c-black">“允许领用多张”</span>;<br/><a @click="addGiftCoupon()" class="c-orange" target="_blank">前往配置 &raquo;</a></p>

                    </dd>
                </dl>
                <dl id="gift_goods_dl" :style="{display: subData.coupon_type==3?'table':'none'}">
                    <dt><i class="required">*</i>礼品:</dt>
                    <dd>
                        <div id="giftGoodsListDiv">
                            <template v-for="(giftCoupon,i) in gift_goods_list">
                                <div nctype="gift_goods_info" class="selected-group-goods div-goods-select" >
                                    <div class="goods-thumb"><img
                                            :src="giftCoupon.src"/></div>
                                    <div class="goods-name">
                                        <a nctype="groupbuy_goods_href"
                                           @click="goodsDetail(giftCoupon)"
                                           target="_blank">{{giftCoupon.goods_name}}</a>
                                    </div>
                                    <div class="goods-price fs12">￥<span nctype="gift_goods_price">{{giftCoupon.goods_price}}</span></div>
                                    <a @click="removeOneGift(giftCoupon)" class="close">&times;</a>
                                </div>
                            </template>
                        </div>
                        <a v-show="!addGiftGood" class="ncsc-btn ncsc-btn-orange-rim" @click="addGiftGood = !addGiftGood">添加商品</a>
                        <qm-add-goods v-if="addGiftGood"
                                      :showAddPage="true"
                                      :showMorePrice="true"
                                      :addTxt="'选择为礼品'"
                                      :removeTxt="'从礼品移除'"
                                      :goodsList="gift_goods_list"
                                      :source="'store_coupon_gift'"
                                      :showAddAllPage="true"
                                      @addSearchAllGoods="addGiftPageGoods($event)"
                                      @addPageGoods="addGiftPageGoods($event)"
                                      @addOneGoods="addOneGiftGoods($event)"
                                      @close="addGiftGood = !addGiftGood"
                                      @removeOneGoods="removeOneGiftGoods($event)"
                        ></qm-add-goods>
                        <span><label class="error" v-show="validData.giftGoodsCommonidsErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.giftGoodsCommonidsErrContent}}</label></span>
                    </dd>
                </dl>
                <template v-if="subData.type==3">
                    <dl>
                        <dt><i class="required">*</i>优惠券对应商品:</dt>
                        <dd>
                            <div id="goodsListDiv">
                                <template v-for="(couponGoods,i) in coupon_goods_list">
                                    <div nctype="groupbuy_goods_info" class="selected-group-goods div-goods-select-box">
                                        <div class="goods-thumb"><img
                                                                      :src="couponGoods.src"/></div>
                                        <div class="goods-name">
                                            <a nctype="groupbuy_goods_href"
                                               @click="goodsDetail(couponGoods)"
                                               target="_blank">{{couponGoods.goods_name}}</a>
                                        </div>
                                        <div class="goods-price fs12">￥<span nctype="groupbuy_goods_price"
                                        >{{couponGoods.goods_price}}</span></div>
                                        <input  name="goods_id[]"  :value="couponGoods.goods_id" type="hidden" />
                                        <a @click="removeOneCoupon(couponGoods)"  class="close" >&times;</a>
                                    </div>
                                </template>
                            </div>
                            <a v-show="!addCouponGood" class="ncsc-btn ncsc-btn-orange-rim" @click="addCouponGood = !addCouponGood">添加商品</a>
                            <qm-add-goods v-if="addCouponGood"
                                          :showAddPage="true"
                                          :showMorePrice="true"
                                          :addTxt="'选择为优惠券商品'"
                                          :removeTxt="'从优惠券商品移除'"
                                          :goodsList="coupon_goods_list"
                                          :source="'store_coupon'"
                                          :showAddAllPage="true"
                                          @addSearchAllGoods="addCouponPageGoods($event)"
                                          @addPageGoods="addCouponPageGoods($event)"
                                          @addOneGoods="addOneCouponGoods($event)"
                                          @close="addCouponGood = !addCouponGood"
                                          @removeOneGoods="removeOneCouponGoods($event)"
                            ></qm-add-goods>
                            <span><label class="error" v-show="validData.goodsCommonidsErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.goodsCommonidsErrContent}}</label></span>
                        </dd>
                    </dl>
                </template>
                <template v-else-if="subData.type==2">
                    <dl>
                        <dt><i class="required">*</i>参与活动商品分类:</dt>
                        <dd>
                            <!-- <p>
                                <input id="goods_classify" type="hidden" value="" name="goods_classify">
                                <span></span>
                            </p>
                            <ul class="ncsc-form-radio-list">
                                <li>
                                    <input type="checkbox" class="checkall"  ref="selectAll" id="checkall" @click="selectAll($event)">
                                    <label for="checkall">全部</label>
                                </li>
                                <template v-for="(classTemp,i) in class_list">
                                    <li>
                                        <input type="checkbox"  @click="selectChange($event,i)"  :checked="classTemp.checked">
                                        <label >{{classTemp.gc_name}}</label>
                                    </li>
                                </template>
                            </ul> -->
                            <button class="ncsc-btn-orange-rim  basic-button" @click="showClassListTree()">选择参与活动商品分类</button>

                            <span><label class="error" v-show="validData.classIdsErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.classIdsErrContent}}</label></span>
                        </dd>
                    </dl>

                </template>
            </template>
            <dl>
                <dt>前台展示:</dt>
                <dd>
                    <ul class="ncsc-form-radio-list">
                        <li>
                            <input type="radio" name="is_show" value="1" id="is_show_1" v-model="subData.is_show">
                            <label for="is_show_1">展示</label>
                        </li>
                        <li>
                            <input type="radio" name="is_show" value="0" id="is_show_0" v-model="subData.is_show">
                            <label for="is_show_0">不展示</label>
                        </li>
                    </ul>
                    <span><label class="error" v-show="validData.isShowErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.isShowErrContent}}</label></span>
                </dd>
            </dl>

            <dl id="showTimeDl" :style="{display: subData.is_show==0?'none':'table'}">
                <dt><i class="required">*</i>优惠券前台展示期:</dt>
                <dd>
                    <input id="start_time" name="start_time" type="text" class="input-add-on w140" v-model="subData.start_time" readonly/>
                    <label class="add-on mr5"><i class="fa fa-calendar icon-calendar"></i></label>&nbsp;~
                    <input id="end_time" name="end_time" type="text" class="input-add-on w140" v-model="subData.end_time" readonly/>
                    <label class="add-on mr5"><i class="fa fa-calendar icon-calendar"></i></label>
                    <span><label class="error" v-show="validData.startTimeErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.startTimeErrContent}}</label></span>
                    <span><label class="error" v-show="validData.endTimeErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.endTimeErrContent}}</label></span>
                </dd>
            </dl>
            <dl>
                <dt><i class="required">*</i>领取后有效天数:</dt>
                <dd>
                    <input name="effective_days" id="effective_days" type="text" class="w100" v-model="subData.effective_days" />
                    <span><label class="error" v-show="validData.effectiveDaysErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.effectiveDaysErrContent}}</label></span>
                </dd>
            </dl>
            <dl>
                <dt>是否限制发布张数:</dt>
                <dd>
                    <ul class="ncsc-form-radio-list">
                        <li>
                            <input type="radio" name="is_limit_num" value="0" id="is_limit_num_0" v-model="subData.is_limit_num" />
                            <label for="is_limit_num_0">限制</label>
                        </li>
                        <li>
                            <input type="radio" name="is_limit_num" value="1" id="is_limit_num_1" v-model="subData.is_limit_num"  />
                            <label for="is_limit_num_1">不限制</label>
                        </li>
                    </ul>
                    <span><label class="error" v-show="validData.isLimitNumErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.isLimitNumErrContent}}</label></span>
                </dd>
            </dl>
            <dl :style="{display:subData.is_limit_num==0?'table':'none'}">
                <dt><i class="required">*</i>优惠券总张数:</dt>
                <dd>
                    <input name="ticket_num" type="number" class="w100" v-model="subData.ticket_num" />
                    <span><label class="error" v-show="validData.ticketNumErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.ticketNumErrContent}}</label></span>
                </dd>
            </dl>
            <dl>
                <dt>是否允许领用多张:</dt>
                <dd>
                    <ul class="ncsc-form-radio-list">
                        <li>
                            <input type="radio" name="is_overlay" value="1" id="is_overlay_1" v-model="subData.is_overlay">
                            <label for="is_overlay_1">允许</label>
                        </li>
                        <li>
                            <input type="radio" name="is_overlay" value="0" id="is_overlay_0" v-model="subData.is_overlay" >
                            <label for="is_overlay_0">不允许</label>
                        </li>
                    </ul>
                    <span><label class="error" v-show="validData.isOverlayErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.isOverlayErrContent}}</label></span>
                </dd>
            </dl>
            <dl  id="get_ticket_numDiv" :style="{display: subData.is_overlay==0?'none':'table'}"  >
                <dt><i class="required">*</i>可领取张数:</dt>
                <dd>
                    <input name="get_ticket_num" type="number" class="w100" v-model="subData.get_ticket_num" />
                    <span><label class="error" v-show="validData.getTicketNumErrContent!=''"><i class="fa fa-exclamation-circle"></i>{{validData.getTicketNumErrContent}}</label></span>
                    <p class="hint vital">前台不展示的券用作满额赠券活动时使用可领取张数</p>
                </dd>
            </dl>
            <dl>
                <dt>有效:</dt>
                <dd>
                    <ul class="ncsc-form-radio-list">
                        <li>
                            <input type="radio" name="is_available" value="1" id="is_available_1" v-model="subData.is_available">
                            <label for="is_available_1">是</label>
                        </li>
                        <li>
                            <input type="radio" name="is_available" value="0" id="is_available_0" v-model="subData.is_available">
                            <label for="is_available_0">否</label>
                        </li>
                    </ul><span></span>
                    <p class="hint vital"></p>
                </dd>
            </dl>
            <p class="hint vital"></p>
            <div class="bottom">
                <label class="submit-border">
                    <input type="button" class="submit" value="保存" @click="submit()" />
                </label>
            </div>
        </div>

        <!-- 选择参与活动商品分类弹窗 -->
        <!-- <qm-tips :tipsVisible="dialog1" :width="'480px'" 
        :showCancel="false" @close="dialog1 = false" @confirm="classListSure()">
            <template slot="title">选择参与活动商品分类</template>
            <template slot="content">
                <qm-classlist-tree :list="subClssList" :defaultCheckedKeys="defaultCheckedKeys" :defaultExpandedKeys="defaultExpandedKeys" @checkChage="checkChage($event)"></qm-classlist-tree>
            </template>
        </qm-tips> -->

        <el-dialog
            :visible.sync="dialog1"
            :width="'480px'"
            customClass="phone-bind"
            v-dialogDrag>

            <div slot="title" class="phone-bind-title">
                <slot name="title">选择参与活动商品分类</slot>
            </div>
            <div>
                <slot name="content">
                    <qm-classlist-tree :list="subClssList" :defaultCheckedKeys="defaultCheckedKeys" :defaultExpandedKeys="defaultExpandedKeys" @checkChage="checkChage($event)"></qm-classlist-tree>
                </slot>
            </div>

            <span class="dialog-footer">
                <label class="submit-border">
                    <input data-v-c51847de="" id="store_submit" type="button" value="确定" class="submit" @click="classListSure()">
                </label>
            </span>
        </el-dialog>
        <qm-dialog :dialogVisible="couponCopyDialog" :width="'750px'" @close="colseCouponCopyDialog" :customClass="'phone-bind manage-sale'">
            <template slot="title">选择需要复制的优惠券</template>
            <template slot="content" >
                <span>请选择需要复制的优惠券</span>
                <div class="mb10 search-form">
                    <select name="type"  class="mt20 mb20"  v-model="pageParams.type" @change="getCouponList()">
                        <option value="-1">选择优惠券类型</option>
                        <template v-for="(first,f) in list_coupon_types">
                            <option v-if ="first == pageParams.type" :value="f" :key="f" selected>{{first}}</option>
                            <option v-else :value="f" :key="f" selected>{{first}}</option>
                        </template>
                    </select>
                    <select name="type"  class="mt20 mb20"  v-model="pageParams.is_available"  @change="getCouponList()">
                        <option value="">优惠券状态</option>
                        <option value="1">有效</option>
                        <option value="0">无效</option>
                    </select>
                    <input  type="text" class="ncsc-form-control w180 " placeholder="支持优惠券名称模糊搜索" v-model.trim="pageParams.name">
                    <input type="button"  value="搜索" class="ncsc-btn ncsc-btn-orange "  @click="getCouponList()">
                    <input v-if="showCancelSearchBtn==1" type="button"  value="撤销检索" class="ncsc-btn ncsc-btn-orange-rim "  @click="cancelSearch()">
                </div>
                <qm-table :pageParams="pageParams">

                    <template slot="table">
                        <table class="ncsc-table mt20">
                            <thead>
                            <tr>
                                <th>优惠券名称</th>
                                <th>优惠券类型</th>
                                <th class="w100">优惠券状态</th>
                            </tr>
                            </thead>
                            <tbody>
                                <template  v-for="(item,i) in coupon_list">
                                    <tr @click="copyCoupon(item)">
                                        <td><p>{{item.name}}</p></td>
                                        <td>{{list_coupon_types[item.type]}}</td>
                                        <td>{{item.is_available==1?'有效':'无效'}}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </template>
                </qm-table>
                <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)" :scrollTop="false"></qm-pagination>
            </template>
        </qm-dialog>

    </div>
</template>
<script>
    import 'viewerjs/dist/viewer.css'
    import {mapGetters,mapActions} from 'vuex'
    import storage from 'lib/utils/storage'
    import QmAddGoods from 'component/qm-add-goods/index';
    import QmPagination from 'component/qm-pagination/index'
    import QmDialog from 'component/qm-dialog/index';
    import QmTable from 'component/qm-table/index';
    import {storeCoupon,storeClass} from 'api'
    import QmTips from "component/qm-tips/index";
    import util from 'lib/utils/util'
    import QmClasslistTree from "component/qm-classlist-tree/index";

    export default {
        name: "store-coupon-add",
        data() {
            return {
                coupon_types:[],
                list_coupon_types:[],
                type:0,
                validData:{
                    nameErrContent:'',
                    cashMoneyErrContent:'',
                    orderMoneyErrContent:'',
                    goodsCommonidsErrContent:'',
                    classIdsErrContent:'',
                    startTimeErrContent:'',
                    endTimeErrContent:'',
                    effectiveDaysErrContent:'',
                    ticketNumErrContent:'',
                    getTicketNumErrContent:'',
                    userMemoErrContent:'',
                    discountErrContent:'',
                    giftCouponIdErrContent:'',
                    giftGoodsCommonidsErrContent:'',
                    isShowErrContent:'',
                    isLimitNumErrContent:'',
                    isOverlayErrContent:''
                },
                subData:{
                    id:0,
                    name:'',
                    start_time:0,
                    end_time:0,
                    type:0,
                    get_way:0,
                    is_limit_num:0,
                    ticket_num:'',
                    order_amount:'',
                    discount:'',
                    gift_coupon_id:0,
                    effective_days:7,
                    store_id:0,
                    owner_type:0,
                    gift_goods_commonids:[],
                    is_available:1,
                    order_num:0,
                    used_ticket_num:0,
                    get_ticket_num:1,
                    coupon_type:1,
                    use_memo:'',
                    is_del:0,
                    is_show:1,
                    gift_goods_ids:'',
                    class_ids:[],
                    goods_commonids:[],
                    is_overlay:0,
                    is_disable:0
                },
                discountShow:'',
                coupon_goods_list:[],
                gift_goods_list:[],
                avail_coupon_list:[],
                addGiftGood:false, //是否显示添加商品
                addCouponGood:false,
                class_list:[],

                subClssList:[],
                // 默认选中
                defaultCheckedKeys:[],
                // 默认展开
                defaultExpandedKeys:[],
                //选中的ids
                checkValues:[],
                checkNodeValues:[],
                dialog1:false,
                couponCopyDialog:false,
                pageParams:{
                    pageIndex:0,
                    pageSize:5,
                    total:0,
                    type:-1,
                    is_available:'',
                    name:''
                },
                showCancelSearchBtn:0,
                coupon_list:[],
                copyFlag:0,
            }
        },
        watch:{
            dialog1(){
                var dragDom = document.querySelectorAll(".el-dialog");
                dragDom.forEach((el)=>{
                    console.log(el)
                    el.style.left = 0;
                    el.style.top =0

                })
            }

        },
        computed:{
        },
        components:{
            QmAddGoods,
            QmClasslistTree,
            QmPagination,
            QmDialog,
            QmTips,
            QmTable
        },
        methods: {
            ...mapActions('storeCoupon',{
                setEdit: 'setEdit',
            }),
            colseCouponCopyDialog(){
              this.couponCopyDialog = false
            },
            openCouponCopyDialog(){
                this.couponCopyDialog = true
                this.getCouponList()
            },
            getPageData(data){
                storeCoupon.getCouponList(data).then((res)=>{
                    this.coupon_list = res.list;
                    this.list_coupon_types = res.coupon_types;
                    var newPageParams = _.clone(this.pageParams)
                    newPageParams.total = res.total;
                    this.pageParams = newPageParams;
                    if(!(this.pageParams.is_available==''&&this.pageParams.type==-1&&this.pageParams.name=='')){
                        this.showCancelSearchBtn = 1;
                    }
                })
            },
            showClassListTree() {
              this.dialog1 = true;
            },
            getCouponList(){
                this.pageParams.pageIndex = 0;
                this.getPageData(this.pageParams);
            },
            cancelSearch(){
                this.pageParams.is_available = '';
                this.pageParams.type = -1;
                this.pageParams.name = '';
                this.getCouponList()
                this.showCancelSearchBtn = 0;
            },
            changeIndex(index){
                this.pageParams.pageIndex = index;
                this.getPageData(this.pageParams);
            },
            goodsDetail(item){
              storage.set('goods_route_name',this.$route.name);
              let routeData = this.$router.resolve({
                name:"store_goods_add_step_two",
                params:{commonId:item.goods_commonid}
              });
              window.open(routeData.href, '_blank');
            },
            goNext(){
                this.subData.type = this.type;
            },
            addNewCoupon(){
                this.subData= {
                        id:0,
                        name:'',
                        start_time:0,
                        end_time:0,
                        type:0,
                        get_way:0,
                        is_limit_num:0,
                        ticket_num:'',
                        order_amount:'',
                        discount:'',
                        gift_coupon_id:0,
                        effective_days:7,
                        store_id:0,
                        owner_type:0,
                        gift_goods_commonids:[],
                        is_available:1,
                        order_num:0,
                        used_ticket_num:0,
                        get_ticket_num:1,
                        coupon_type:1,
                        use_memo:'',
                        is_del:0,
                        is_show:1,
                        gift_goods_ids:'',
                        class_ids:[],
                        goods_commonids:[],
                        is_overlay:0,
                        is_disable:0
                }
                if(this.subData.id==0&&this.subData.type==0){
                    this.type = 1;
                }
                this.getCouponData(0)
            },
            initData(){
                storeCoupon.getCouponTypes().then((res)=>{
                    this.coupon_types = res;
                })
            },
            getCouponData(giftFlag){
                let data ={
                    id:this.subData.id,
                    type:this.type
                }
                storeCoupon.getCouponDetail(data).then((res)=>{
                    this.coupon_types = res.coupon_types
                    this.couponCouponTypes = res.couponCouponTypes
                    if(giftFlag==0){
                        if(res.start_time) {
                            this.subData.start_time = res.start_time
                        }
                        if(res.end_time) {
                            this.subData.end_time = res.end_time
                        }
                        if(res.coupon&&Object.keys(res.coupon).length>0){
                            this.subData.name = res.coupon.name
                            this.subData.store_id = res.coupon.store_id
                            this.subData.type = res.coupon.type
                            this.type = res.coupon.type
                            this.subData.coupon_type = res.coupon.coupon_type
                            this.subData.cash_money = parseInt(res.coupon.cash_money)
                            this.subData.order_amount = parseInt(res.coupon.order_amount)
                            this.subData.discount = res.coupon.discount
                            this.subData.start_time = res.coupon.start_time
                            this.subData.end_time = res.coupon.end_time
                            this.subData.effective_days = res.coupon.effective_days
                            this.subData.is_limit_num = res.coupon.is_limit_num
                            this.subData.ticket_num = res.coupon.ticket_num
                            this.subData.is_overlay = res.coupon.is_overlay
                            this.subData.get_ticket_num = res.coupon.get_ticket_num
                            this.subData.is_show = res.coupon.is_show
                            this.subData.is_available = res.coupon.is_available
                            this.subData.use_memo = res.coupon.use_memo
                            this.subData.gift_coupon_id = res.coupon.gift_coupon_id
                            if(res.coupon.type == 2){//指定品类优惠券
                                this.subData.class_ids = res.coupon.class_ids
                                this.defaultCheckedKeys = [];
                                var ids = this.subData.class_ids.split(",");
                                ids.forEach((tempId)=>{
                                    if(tempId.trim() != ''){
                                        this.defaultCheckedKeys.push(tempId);
                                    }
                                })
                                this.checkValues = this.defaultCheckedKeys;
                                this.defaultExpandedKeys = this.defaultCheckedKeys
                            }
                            if(res.coupon.type==3){//指定商品优惠券
                                this.subData.goods_commonids = res.coupon.goods_commonids
                            }
                            if(res.coupon.coupon_type==3){ //满额赠商品
                                this.subData.gift_goods_commonids = res.coupon.gift_goods_ids;
                            }
                        }
                        let tempClassList = res.class_list
                        tempClassList.forEach((item,i)=>{
                            item.checked = false
                            if(this.subData.class_ids&&this.subData.class_ids.indexOf(','+item.gc_parent_id+',')>=0){
                                item.checked = true
                            }
                        })
                        this.class_list = tempClassList;
                        if(res.coupon_goods_list){
                            this.coupon_goods_list = res.coupon_goods_list
                        }
                        if(res.gift_goods_list){
                            this.gift_goods_list = res.gift_goods_list
                        }
                    }
                    if(res.avail_coupon_list){
                        this.avail_coupon_list = res.avail_coupon_list
                    }
                    this.subData.gift_coupon_id = this.subData.gift_coupon_id
                    if(this.copyFlag == 1){
                        this.subData.id = ''
                        this.subData.is_available = 1
                    }
                })
            },
            getSubClassList(){
                storeClass.getSubClassListForTree().then((res)=>{
                    if(res.resultCode == 1){
                        this.subClssList = res.responseContent
                    }
                })
            },
            checkChage(event){
                this.checkValues = event;
            },
            classListSure(){
                if(this.checkValues==null||this.checkValues==''){
                    util.msg('请选择参与活动商品分类');
                    return ;
                }
                this.dialog1 = false;
            },
            addOneCouponGoods(event){
                var tmp_goods = _.clone(event)
                this.coupon_goods_list.push(tmp_goods)
            },
            addCouponPageGoods(event){
                var goodsList = _.clone(event)
                goodsList.forEach((tempGoods,i)=>{
                    if(tempGoods.isExist==false){
                        this.coupon_goods_list.push(tempGoods)
                    }
                })
            },
            removeOneCoupon(goods){
                this.updateCouponGoods(goods.goods_commonid)
            },
            removeOneCouponGoods(event){
                this.updateCouponGoods(event.good.goods_commonid)
            },
            updateCouponGoods(goods_commonid){
                var newList = _.clone(this.coupon_goods_list);
                newList.forEach((goods,gs)=>{
                    if(goods.goods_commonid == goods_commonid){
                        newList.splice(gs,1);
                    }
                })
                this.coupon_goods_list = newList;
            },
            addOneGiftGoods(event){
                var tmp_goods = _.clone(event)
                this.gift_goods_list.push(tmp_goods)
            },
            addGiftPageGoods(event){
                var goodsList = _.clone(event)
                goodsList.forEach((tempGoods,i)=>{
                    if(tempGoods.isExist==false){
                        this.gift_goods_list.push(tempGoods)
                    }
                })
            },
            removeOneGift(goods){
                this.updateGiftGoods(goods.goods_id)
            },
            removeOneGiftGoods(event){
                this.updateGiftGoods(event.good.goods_id)
            },
            updateGiftGoods(goods_id){
                var newList = _.clone(this.gift_goods_list);
                newList.forEach((goods,gs)=>{
                    if(goods.goods_id == goods_id){
                        newList.splice(gs,1);
                    }
                })
                this.gift_goods_list = newList;
            },selectAll(event){
                var tempList = _.clone(this.class_list)
                tempList.forEach((item,i) => {
                    if(event.target.checked){
                        item.checked = true;
                    }else{
                        item.checked = false;
                    }
                })
                this.updateClassList(tempList)
            },
            selectChange(event,i){
                var tempList = _.clone(this.class_list)
                if(event.target.checked){
                    tempList[i].checked = true
                }else{
                    tempList[i].checked = false
                }
                this.updateClassList(tempList)
            },
            updateClassList(data){
                this.class_list = data;
                let tempClass_ids = [];
                let remains = this.class_list.map((item)=>{return item.checked?item.gc_parent_id:''}).filter(function(item){return item !==''})
                if(remains.length !== this.class_list.length){
                    this.$refs.selectAll.checked = false
                }else{
                    this.$refs.selectAll.checked = true
                }
            },
            setTitle(event){
                let couponType = this.subData.coupon_type
                let orderAmount = this.subData.order_amount
                let cashMoney =  this.subData.cash_money
                let discount =  this.subData.discount
                let type = this.subData.type
                if(type==1){
                    if(cashMoney>0){
                        this.subData.name = cashMoney+'元无门槛'
                    }else{
                        this.subData.name = ''
                    }
                }else{
                    let head=''
                    let title =''
                    if(type==3){
                        head = '指定商品'
                    }else if(type==2){
                        head = '指定品类'
                    }else{
                        head = '全场'
                    }
                    if(couponType==1&&orderAmount>0&&cashMoney>0){
                        title = '满'+orderAmount+'减'+cashMoney+'元'
                    }else if (couponType==2&&orderAmount>0){
                        title = '满'+orderAmount+'送券'
                    }else if(couponType==3&&orderAmount>0){
                        title = '满'+orderAmount+'送礼品'
                    }else if(couponType==0&&discount>0){
                        if(orderAmount>0){
                            title = '满'+orderAmount+'享'+discount+'折'
                        }else{
                            title = discount+'折'
                        }
                    }
                    if(title){
                        this.subData.name = head+title
                    }else{
                        this.subData.name = ''
                    }
                }
            },
            validName(event){
                this.validData.nameErrContent ='';
                if(this.subData.name == ''){
                    this.validData.nameErrContent = '优惠券名称不能为空'
                }
                if(this.subData.name.length<3||this.subData.name.length>20){
                    this.validData.nameErrContent = '优惠券名称字符串长度在3~20之间'
                }
            },
            copyCoupon(item){
                let tempCoupon = _.clone(item)
                this.copyFlag = 1
                this.type = tempCoupon.type
                this.subData.id = tempCoupon.id
                this.getCouponData(0);
                this.couponCopyDialog = false
            },
            submit(){
                this.initData()
                this.subData.class_ids = this.checkValues.join(",")
                this.subData.goods_commonids = ''
                let couponGoodsList = this.coupon_goods_list;
                if(couponGoodsList&&couponGoodsList.length>0){
                    couponGoodsList.forEach((item,i)=>{
                        this.subData.goods_commonids += item.goods_commonid+','
                    })
                }
                this.subData.gift_goods_commonids = ''
                let giftGoodsList = this.gift_goods_list;
                if(giftGoodsList&&giftGoodsList.length>0){
                    giftGoodsList.forEach((item,i)=>{
                        this.subData.gift_goods_commonids += item.goods_id+','
                    })
                }
                if(this.subData.coupon_type==2){
                    let gift_coupon_list = _.clone(this.avail_coupon_list);
                    let giftCouponChoosed = false;
                    gift_coupon_list.forEach((item,i)=>{
                        if(item.id == this.subData.gift_coupon_id){
                            giftCouponChoosed = true;
                        }
                    });
                    if(giftCouponChoosed == false){
                        this.subData.gift_coupon_id = 0;
                    }
                }

                this.validData = {
                    nameErrContent:'',
                    cashMoneyErrContent:'',
                    orderMoneyErrContent:'',
                    goodsCommonidsErrContent:'',
                    classIdsErrContent:'',
                    startTimeErrContent:'',
                    endTimeErrContent:'',
                    effectiveDaysErrContent:'',
                    ticketNumErrContent:'',
                    getTicketNumErrContent:'',
                    userMemoErrContent:'',
                    discountErrContent:'',
                    giftCouponIdErrContent:'',
                    giftGoodsCommonidsErrContent:'',
                    isShowErrContent:'',
                    isLimitNumErrContent:'',
                    isOverlayErrContent:''
                }
                var validRes = true

                if(this.subData.name == ''){
                    this.validData.nameErrContent = '优惠券名称不能为空'
                }
                if(this.subData.name.length<3||this.subData.name.length>20){
                    this.validData.nameErrContent = '优惠券名称字符串长度在3~20之间'
                }
                if(this.subData.type==1||this.subData.coupon_type==1){
                    if(!(/^[1-9]\d*$/.test(this.subData.cash_money)&&this.subData.cash_money>0)){
                        this.validData.cashMoneyErrContent = '优惠券金额必须为大于0的正整数'
                    }
                }
                if(this.subData.type>1){
                    if(!(/^[1-9]\d*$/.test(this.subData.order_amount)&&this.subData.order_amount>0)){
                        this.validData.orderMoneyErrContent = '订单金额必须为大于0的正整数'
                    }
                }
                if(this.subData.coupon_type==0){
                    if(!(/^100$|^(\d|[1-9]\d)$/.test(this.discountShow)&&(this.discountShow>0&&this.discountShow<=100))){
                        this.validData.discountErrContent = '优惠券折扣小于100的正整数'
                    }
                }else if(this.subData.coupon_type==1&&this.subData.type!=1){
                    if(parseInt(this.subData.cash_money)>=parseInt(this.subData.order_amount)){
                        this.validData.cashMoneyErrContent = '请输入小于订单金额的正整数';
                    }
                }else if(this.subData.coupon_type==2){
                    if(this.subData.gift_coupon_id<=0){
                        this.validData.giftCouponIdErrContent = '优惠方式为满额赠券时对应优惠券不能为空';
                    }
                }else if(this.subData.coupon_type==3){
                    if(!(this.subData.gift_goods_commonids&&this.subData.gift_goods_commonids.length>0)){
                        this.validData.giftGoodsCommonidsErrContent = '优惠方式为满额赠礼品时对应礼品商品不能为空'
                    }
                }
                if(this.subData.type==3){
                    if(!(this.subData.goods_commonids&&this.subData.goods_commonids.length>0)){
                        this.validData.goodsCommonidsErrContent = '指定商品优惠券对应商品不能为空'
                    }
                }else if(this.subData.type==2){
                    if(!(this.subData.class_ids&&this.subData.class_ids.length>0)){
                        this.validData.classIdsErrContent = '参与活动商品分类不能为空'
                    }
                }
                if(this.subData.is_show==1){
                    if(this.subData.start_time==''){
                        this.validData.startTimeErrContent = '展示期的开始时间不能为空'
                    }
                    if(this.subData.end_time==null || this.subData.end_time==''){
                        this.validData.endTimeErrContent = '展示期的结束时间不能为空'
                    }
                    if(this.subData.id == 0){
                        let currentTime  = Date.now()
                        currentTime -= currentTime % (60 * 1000)
                        console.log(currentTime);
                        if(new Date(this.subData.end_time.replace(/-/g, '/')).getTime() < currentTime) {
                            this.validData.endTimeErrContent = '展示期的结束时间不能早于当前时间'
                        }
                    }
                    let start_date = this.subData.start_time
                    let date1 = new Date(Date.parse(start_date.replace(/-/g, "/")))
                    let date2 = new Date(Date.parse(this.subData.end_time.replace(/-/g, "/")))
                    if(date1 >= date2){
                        this.validData.endTimeErrContent = '展示期的结束时间必须大于开始时间'
                    }
                    if(this.subData.coupon_id>0){
                        let data = {
                            coupon_id:this.subData.coupon_id,
                            type:'is_show',
                            value:this.subData.is_show
                        }
                        storeCoupon.checkEdit(data).then((res)=>{
                            if(res==0||res=='0'){
                                this.validData.isShowErrContent = '当前优惠券正在被使用为赠券，不能前台展示'
                            }
                        });
                    }
                }
                if(this.subData.coupon_id>0){
                    if(this.subData.is_limit_num==1){
                        let data = {
                            coupon_id:this.subData.coupon_id,
                            type:'is_limit_num',
                            value:this.subData.is_limit_num
                        }
                        storeCoupon.checkEdit(data).then((res)=>{
                            if(res==0||res=='0'){
                                this.validData.isLimitNumErrContent = '当前优惠券正在被使用为赠券，不能限制发布张数'
                            }
                        });
                    }
                    if(this.subData.is_overlay==0){
                        let data = {
                            coupon_id:this.subData.coupon_id,
                            type:'is_overlay',
                            value:this.subData.is_overlay
                        }
                        storeCoupon.checkEdit(data).then((res)=>{
                            if(res==0||res=='0'){
                                this.validData.isOverlayErrContent = '当前优惠券正在被使用为赠券，必须允许领用多张'
                            }
                        });
                    }
                }
                if(!(/^[1-9]\d*$/.test(this.subData.effective_days)&&this.subData.effective_days>0)){
                    this.validData.effectiveDaysErrContent = '优惠券领取后有效天数不能为空，且必须为大于0的正整数'
                }
                if(this.subData.is_limit_num==0&&this.subData.ticket_num<=0){
                        this.validData.ticketNumErrContent = '请输入正整数'
                }
                if(this.subData.is_overlay==1&&(this.subData.get_ticket_num<=0||!(/^[1-9]\d*$/.test(this.subData.get_ticket_num)))){
                    this.validData.getTicketNumErrContent = '优惠券领取张数必须为正整数'
                }
                if(this.subData.use_memo&&this.subData.use_memo.length>100){
                    this.validData.userMemoErrContent = '优惠券领取及使用说明不能超过100个字符（含中文）'
                }
                Object.values(this.validData).forEach((item,i) => {
                    if(item!=''){
                        validRes = false
                    }
                });
                if(validRes) {
                    let data = {
                        ...this.subData
                    }
                    storeCoupon.editCoupon(data).then((res) => {
                        if(res.resultCode == 1){
                            this.$router.push('/promotion/store_coupon/index')
                        }
                    })
                }
            },
            initData(){
                let classList = _.clone(this.class_list);
                this.subData.class_ids = ''
                if(classList&&classList.length>0){
                    classList.forEach((item,i) => {
                        if(item.checked){
                            this.subData.class_ids += item.gc_parent_id+','
                        }
                    })
                }
                this.subData.goods_commonids = ''
                let couponGoodsList = _.clone(this.coupon_goods_list);
                if(couponGoodsList&&couponGoodsList.length>0){
                    couponGoodsList.forEach((item,i)=>{
                        this.subData.goods_commonids += item.goods_commonid+','
                    })
                }
                this.subData.gift_goods_commonids = ''
                let giftGoodsList = _.clone(this.gift_goods_list);
                if(giftGoodsList&&giftGoodsList.length>0){
                    giftGoodsList.forEach((item,i)=>{
                        this.subData.gift_goods_commonids += item.goods_commonid+','
                    })
                }
            },
            addGiftCoupon(){
                this.initData()
                storage.set('oldCoupon',this.subData)
                storage.set('old_class_list',this.class_list)
                storage.set('old_coupon_goods_list',this.coupon_goods_list)
                storage.set('old_gift_goods_list',this.gift_goods_list)
                storage.set('returnGift',1)
                storage.set('coupon_id',0)
                storage.set('type',1)
                let urlkey = 'giftadd'
                this.curUrl = urlkey
                let url = '/promotion/store_coupon/'+ urlkey
                this.$router.push(url);
            }
        },
        watch:{
            discountShow(){
                this.validData.discountErrContent = ''
                if(this.subData.coupon_type==0){
                    if(!(/^100$|^(\d|[1-9]\d)$/.test(this.discountShow)&&(this.discountShow>0&&this.discountShow<=100))){
                        this.validData.discountErrContent = '优惠券折扣小于100的正整数'
                        return ;
                    }
                }
                this.setTitle();
                this.subData.discount = this.discountShow/10;

            }
        },
        mounted () {

            let giftFlag =0 ;
            let returnGift = storage.get('returnGift')
            if(returnGift == 1){
                giftFlag = 1
                this.subData = storage.get('oldCoupon')
                this.class_list = storage.get('old_class_list')
                this.coupon_goods_list = storage.get('old_coupon_goods_list')
                this.gift_goods_list = storage.get('old_gift_goods_list')
                this.type = this.subData.type
                storage.set('coupon_id',this.subData.id)
            }else{
                this.subData.id = storage.get('coupon_id')
                this.type = storage.get('type')
                this.subData.type = storage.get('type')
            }
            storage.set('returnGift',0)
            if(this.subData.id>0){
                this.setEdit(true)
            }else{
                this.setEdit(false)
            }
            var _self = this;
            layui.use('layer', function(){
                this.layer = layui.layer;
            });
            layui.use('laydate', function(){
                var laydate = layui.laydate;
                laydate.render({
                    elem: '#start_time',
                    type:'datetime',
                    format:'yyyy-MM-dd HH:mm',
                    theme: "#ff8519",
                    trigger:'click',
                    done: function (value) {
                        _self.validData.startTimeErrContent = ''
                        _self.subData.start_time = value
                    }
                });
                laydate.render({
                    elem: '#end_time',
                    theme: "#ff8519",
                    type:'datetime',
                    trigger:'click',
                    format:'yyyy-MM-dd HH:mm',
                    done:function(data){
                        _self.validData.endTimeErrContent = ''
                        _self.subData.end_time = data
                    }
                });

            })
            if(this.subData.id==0&&this.subData.type==0){
                this.type = 1;
            }
            this.getCouponData(giftFlag)
            this.getSubClassList();
        },
        updated(){
        }
    }
</script>
