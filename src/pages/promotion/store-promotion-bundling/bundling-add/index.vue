<style scoped>
  .qm-store-class-base{
    padding: 10px 0 10px 0;
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
    height: 20px;
  }

  .ncsc-default-table th {
    background: #f9f9f9;
    padding: 10px;
    text-align: left;
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
  .edit-spec{
    position: absolute;
    right: 20px;
    bottom: 0px;
  }
  .edit-spec a{
    color: #0093fa;
  }
  .w390{
    width: 390px !important;
  }
  .w240{
    width: 240px;
  }
  .batch{display: block; vertical-align: middle; font-weight: normal;}
  .batch .btn-batch{display: inline-block; color:#ff8519; font-size: 12px;}
  .batch .btn-batch:hover{cursor: pointer; text-decoration: underline;}
  .batch .batch-input{background: #000; background-color: rgba(0,0,0,.6); padding: 0 10px 10px; position: absolute; z-index: 1; top: 50px; left: 50%; margin-left:-80px; text-align: left; width: 160px; color:#fff; border-radius:5px;}
  .batch .batch-input::before{content:''; position: absolute; border:5px solid transparent; border-bottom:5px solid #000; border-bottom:5px solid rgba(0,0,0,.6); position: absolute; left: 50%; margin-left: -15px; top: -10px;}
  .batch .batch-input .batch-tit{font-size: 14px; margin: 5px 0; font-weight: bold;}
  .batch .batch-input .close{line-height: 20px; color: #757575; text-decoration: none; background-color: #FFF; text-align: center; display: block; width: 20px; height: 20px; font-size: 16px; text-align: center; border-radius: 100%; border: solid 1px #ddd; top: -8px; right: -8px; position: absolute; z-index: 2; font-family: SimSun;}
  .batch .batch-input .close:hover{border-color:#ff8519; background:#ff8519; color:#fff;}
  .batch .batch-input input{border:none;}
  .batch .batch-input .ncsc-btn{border:none; background: #fff; color:#212121; border-radius:15px;}
  .batch .batch-input .ncsc-btn:hover{border:none; background: #ff8519; color:#fff}
  .batch input[type="checkbox"]{margin-bottom: 0;}
  .tiptxt{
    font-size: 14px;
    color: #ffbe6e;

  }
  .tecenter{
    text-align: center!important;

  }
</style>
<template>
  <div class="qm-store-class-base">
    <div class="wrap">
      <ul class="c-gray">
        <li>凡选择指定组合的商品，在这个商品的详细页将出现发布的组合套装。下架商品不能参加该活动。</li>
      </ul>
      <div class="ncsc-form-default">
        <!-- 说明 -->

        <form id="add_form" >
          <dl>
            <dt><i class="required">*</i>活动名称：</dt>
            <dd>
              <p>
                <input id="bundling_name" name="bundling_name" type="text" maxlength="25" class="w400 text" v-model.trim="subData.bundling_name" />
                <span><label class="error" v-show="validData.nameErr"><i class="fa fa-exclamation-circle"></i>请填写活动名称</label></span>
              </p>
            </dd>
          </dl>
          <dl>
            <dt>活动描述：</dt>
            <dd>
              <p>
                <input id="bl_title" name="bl_title" type="text" maxlength="25" class="w400 text" v-model="subData.bl_title"/>
                <span></span></p>
            </dd>
          </dl>

          <dl>
            <dt><i class="required">*</i>开始时间：</dt>
            <dd>
              <input id="bl_quota_starttime" v-model="subData.bl_quota_starttime" type="text" class="input-add-on w150"  readonly="readonly">
              <label class="add-on mr5"><i class="fa fa-calendar icon-calendar"></i></label>
              <span><label class="error" v-show="validData.startTimeErr"><i class="fa fa-exclamation-circle"></i>开始时间不能为空</label></span>
              <span><label class="error" v-show="validData.startTimeLessThenNow"><i class="fa fa-exclamation-circle"></i>开始时间不能早于当前时间</label></span>
            </dd>
          </dl>
          <dl>
            <dt><i class="required">*</i>结束时间：</dt>
            <dd>
              <input id="bl_quota_endtime" v-model="subData.bl_quota_endtime" type="text" class="input-add-on w150"  readonly="readonly">
              <label class="add-on mr5"><i class="fa fa-calendar icon-calendar"></i></label>
              <span><label class="error" v-show="validData.endtimeErr"><i class="fa fa-exclamation-circle"></i>结束时间不能为空</label></span>
              <span><label class="error" v-show="validData.endtimeLittleErr"><i class="fa fa-exclamation-circle"></i>开始时间不能早于结束时间</label></span>
              <span><label class="error" v-show="validData.endTimeLessThenNow"><i class="fa fa-exclamation-circle"></i>结束时间不能早于当前时间</label></span>
            </dd>
          </dl>
          <dl id="ncsc-upload-thumb">
            <dt><i class="required">*</i>组合图片：</dt>
            <dd>
              <p>
                <input id="goods_img" type="hidden" value="" name="goods_img">
                <span><label class="error" v-show="validData.filesErr"><i class="fa fa-exclamation-circle"></i>组合图片不能为空</label></span>
              </p>
              <div class="ncsc-goodspic-list ncsc-upload-img-list">
                <draggable v-model="files" v-bind="dragOptions" draggable=".draggable" ghost-class="ghost">
                <div class="ncsc-upload-img-item" :class="!file?'':'draggable'" v-for="(file,idx) in files">
                  <div class="ncsc-upload-img-box" v-if="file">
                    <div class="ncsc-upload-avatar" :id="'imagesname' + idx">
                      <img :src="file" @click="showDialog(file)">

                    </div>
                    <div class="image-delete" @click="deleteLogo(idx)">×</div>
                  </div>
                  <div class="ncsc-upload-btn" v-if="!file">
                    <a href="javascript:void(0);">
                      <!--<i&lt;!&ndash;nput type="file" class="input-file" :data-id="'imagesname' + idx"  name="store_label1" @change="logoLoad($event,idx)">&ndash;&gt;-->
                      <input type="file" class="input-file" :data-id="'imagesname' + idx" name="multipleImg" @change="multipleUpload($event)" multiple>
                      <p><i class="ico-upload"></i>图片上传</p>
                    </a>
                  </div>
                </div>
                </draggable>
              </div>
<!--
    <div class="ncsc-btn btn-multiple-upload-img mt15 " :class="fileMax?'disabled':''"  @click="beforeMulti"><input @change="multipleUpload($event)" :disabled="fileMax" ref="multiFile" type="file" name="multipleImg" class="multiple-upload-img ignore" accept="image/gif, image/jpeg, image/png, image/bmp" multiple />批量上传</div>
-->
    </dd>
    </dl>
    <dl>
      <dt><i class="required">*</i>组合销售的价格：</dt>
      <dd>
        <span class="package-price c-orange mr5">{{subData.discount_price}}</span>元
        <p class="hint mt10">原价<span nctype="cost_price" class="price mr5 ml5">{{subData.bl_sum_marketprice}}</span>元 (已添加搭配商品的默认价格总计)</p>
      </dd>
    </dl>
    <dl>
      <dt  id="bundling"  style="width:11%"><i class="required">*</i>商品：</dt>
      <dd>
        <p>
          <input  id="bundling_goods"  type="hidden" value="" name="bundling_goods">
          <span><label class="error" v-show="validData.goodsErr"><i class="fa fa-exclamation-circle"></i>商品不能为空</label></span>
          <span><label class="error" v-show="validData.goodsOneErr"><i class="fa fa-exclamation-circle"></i>一个商品设置数量必须大于1</label></span>
          <span><label class="error" v-show="validData.goodsPriceErr"><i class="fa fa-exclamation-circle"></i>{{goodsPriceErrTips}}</label></span>
          <span><label class="error" v-show="validData.goodsNumErr"><i class="fa fa-exclamation-circle"></i>{{goodsNumErrTips}}</label></span>
        </p>
        <table class="ncsc-default-table">
          <thead>
          <tr>
            <th class="w70" style="display: none;">指定优惠</th>
            <th class="w240">商品名称</th>
            <th class="w120 tecenter">原价(元)</th>
            <th class="w120 tecenter">售价(元)</th>
            <th class="w120 tecenter">
              活动价(元)
              <div class="batch" v-show="goods"><p class="btn-batch" @click="setPrice(1)">[批量修改]</p></div>
            </th>
            <th class="w120 tecenter">数量</th>
            <th class="w80 tecenter">操作</th>
          </tr>
          </thead>
          <tbody nctype="bundling_data" class="bd-line">
          <tr class="ui-state-disabled" v-show="goods.length === 0">
            <td colspan="20" class="norecord">
              <div class="no-promotion"><span>组合套装还未选择添加商品。</span></div>
            </td>
          </tr>

          </tbody>
        </table><draggable handle=".handler" v-model="goods" v-bind="dragOptions" class="mb30" ghost-class="ghost" draggable=".item" @change="itemDraggable($event)" >
        <template v-for="(gv,gk) in goods">
          <tr style="display: block;position: relative;" :class="[gv.desc?'gray':'','item']">
            <td class="w240">
              <div class="info-box">
                <div class="pic">
                  <a target="_blank" @click="goodsDetail(gv)"><img nctype="bundling_data_img"  :src="gv.src" width="60" height="60"></a>
                </div>
                <div class="detail">
                  <p><a target="_blank" @click="goodsDetail(gv)">{{gv.goods_name}}</a></p>
                  <p v-if="gv.desc" class="c-red mt5">{{gv.desc}}</p>
                </div>
              </div>
            </td>
            <td class="goods-price w120 tecenter handler" >
              <p class="w120">{{gv.goods_marketprice}}</p>
            </td>
            <td class="goods-price w120 tecenter handler" nctype="bundling_data_price">
              <p class="w120">{{gv.goods_price}}</p>
            </td>
            <td class="w120 tecenter">
              <p  v-if="gv.isMutliSpec">{{gv.bl_count_price}}</p>
              <input :type="gv.isMutliSpec ? 'hidden':'text'" nctype="price"  v-model="gv.bl_count_price" class="text tecenter w70" @blur="formatDiscountPrice(gv)" @keyup="onlyNumber(gv,gk,1)">
            </td>
            <td class="w120 tecenter">
              <p v-if="gv.desc">{{gv.num}}</p>
              <input :type="gv.desc ? 'hidden':'text'" nctype="num" v-model="gv.num" class="text tecenter w70" @keyup="onlyIntNumber(gv, gk)">
            </td>
            <td class="handle w80 tecenter"><p><a @click="removeOne(gv,gk)" class="ncsc-btn">移除</a></p></td>
             <template v-if="gv.isMutliSpec">
              <div class="edit-spec">
                <a @click="openEditGoodsCommonDialog(gv,gk)">编辑参与活动的商品规格</a>
              </div>
            </template>
          </tr>
          <template v-if="gv.isMutliSpec">
            <template v-if="gv.goodsList">
              <template v-for="(g,k) in gv.goodsList">
                <tr :class="[(g.desc == '已删除' || g.desc == '无库存')?'gray':'','item']">
                  <td  class="w240 handler">
                    <p>{{g.goods_spec}}</p>
                    <p v-if="g.desc" class="c-red mt5">{{g.desc}}</p>
                  </td>
                  <td class="w120 tecenter"><p class="w120">{{g.goods_marketprice}}</p></td>
                  <td  class="w120 tecenter"><p class="w120">{{g.goods_price}}</p></td>
                  <td  class="w120 tecenter">
                    <input v-if="g.desc != '已删除'"  type="text" nctype="price"  v-model="g.bl_count_price" class="text tecenter w80"  @keyup="onlyNumber(g,k,1)" @blur="calcParentCountPrice(gk,k)"/>
                    <template v-if="g.desc == '已删除'">{{g.bl_count_price}}</template>
                  </td>
                  <td  class="w120 tecenter">
                  </td>
                  <td class="handle w80"></td>
                </tr>
              </template>
            </template>
          </template>
        </template>
      </draggable>
        <a class="ncsc-btn ncsc-btn-orange-rim" @click="openAddGoodsDialog()">添加商品</a>
      </dd>
    </dl>
    <dl>
      <dt><i class="required">*</i>库存数量：</dt>
      <dd>
        <input id="bl_storage" name="bl_storage" type="text" class="text w100 mr5" v-model="subData.bl_storage" /><span><label class="error" v-show="validData.storageErr"><i class="fa fa-exclamation-circle"></i>库存数量不能为空,且只能是大于等于0的整数</label></span>
        <p class="hint mt10"></p>
      </dd>
    </dl>
    <dl>
      <dt>免配送费：</dt>
      <dd>
        <ul class="ncsc-form-radio-list">
          <li><label  for="goods_free_1"><input type="radio" id="goods_free_1" name="goods_free" value="1" v-model="subData.goods_free" />是</label></li>
          <li><label for="goods_free_0"><input type="radio" id="goods_free_0" name="goods_free" value="0" v-model="subData.goods_free" />否</label></li>
        </ul>
        <p class="tiptxt" v-if="subData.goods_free==1">注：为保护商家收益，免配送费商品与非免配送费商品一同下单时，订单仍收取配送费</p>
      </dd>
    </dl>
    <dl>
      <dt>配送费模板：</dt>
      <dd>
        <select name="template_id" v-model="subData.template_id">
          <option v-if="templates.length == 0" value="0">默认配置</option>
          <option v-for="template in templates" :value="template.template_id" >{{template.template_name}}</option>
        </select>
        <p class="hint">若还没设置，可前往店铺->店铺设置->配送设置中配置</p>
      </dd>
    </dl>
    <dl>
      <dt>活动状态：</dt>
      <dd>
        <ul class="ncsc-form-radio-list">
          <li><label for="bundling_status_1">
            <input type="radio" name="state" value="1" id="bundling_status_1" v-model="subData.state" />开启</label></li>
          <li><label for="bundling_status_0">
            <input type="radio" name="state" value="0" id="bundling_status_0" v-model="subData.state" />关闭</label></li>
        </ul>
      </dd>
    </dl>
    <div class="bottom">
      <label class="submit-border"><input id="submit_button" @click="submit()" type="button"  value="提交" class="submit"></label>
    </div>
    </form>
  </div>
  </div>
                <qm-dialog-img :imageUrl="imgSrc" :imageDialog="showImg" @close="showImg=false">
                        </qm-dialog-img>
    <qm-dialog :dialogVisible="addGoodsDialog" :width="'800px'" @close="addGoodsDialog=false" :customClass="'phone-bind sale-add-goods'">
      <template slot="title">添加商品</template>
      <template slot="content" >
        <qm-add-goods v-if="addGoodsDialog"
                      :pageSize="8"
                      :showMorePrice="true"
                      :addTxt="'添加到优惠套餐'"
                      :removeTxt="'从优惠套餐移除'"
                      :goodsList="existGoods"
                      :showAddAllPage="true"
                      :source="'store_promotion_bundling_goods'"
                      :borderNone = "true"
                      :excludeGoods = "excludeGoods"
                      @addOneGoods="addOneGoods($event)"
                      @addPageGoods="addPageGoods($event)"
                      @removeOneGoods="removeOneGoods($event)"
        ></qm-add-goods>
        <div class="bottom" style="margin-top: 0">
          <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="addGoodsConfirm">
        </div>
      </template>
    </qm-dialog >
    <qm-dialog   :dialogVisible="editGoodsCommonDialog" :width="'800px'" @close="editGoodsCommonDialog=false">
      <template slot="title">编辑参与活动的商品规格</template>
      <template slot="content" >
      <div>
        <dl>
          <div class="info-box">
            <div class="pic">
              <a target="_blank"  @click="goodsDetail(og)"><img nctype="bundling_data_img"  :src="goodsCommon.src" width="60" height="60"></a>
            </div>
            <div class="detail">
              <p><a target="_blank"  @click="goodsDetail(og)">{{goodsCommon.goods_name}}</a></p>
              <p class="c-orange mt5">总计{{goodsCommon.allGoodsCount}}个商品规格，当前已选{{goodsCommon.blGoodsCount}}个</p>
            </div>
          </div>
        </dl>
        <dl>
          <dd>
            <div class="operate-bar">
              <label for="check_all" class="mr10"><input type="checkbox" @change="selectAll($event)" v-model="selectAllFlag" id="check_all" data-id="check_all">全选</label>
              <span class="fs12 c-gray">勾选需要参与活动的商品规格</span>
            </div>
            <div id="new_add">
              <table class="ncsc-default-table">
                <thead>
                <tr>
                  <th class="w40"></th>
                  <th class="w170">商品规格</th>
                  <th class="w60">原价(元)</th>
                  <th class="w60">售价(元)</th>
                  <th class="w80">库存(件)</th>
                  <th class="w110">
                    活动价(元)
                    <div class="batch"><p class="btn-batch" @click="setPrice(2)">[批量修改]</p></div>
                  </th>
                  <th class="w70">活动折扣</th>
                </tr>
                </thead>
                <tbody nctype="bundling_data"  class="bd-line tip" >
                <tr v-for="(og,oi) in newGoodsList" class="item">
                    <td class="w40 handler"><input type="checkbox" @change="newSelectOne($event,oi)" v-model="og.isChoosed"></td>
                    <td class="w170 handler">
                       {{og.goods_spec}}
                    </td>
                    <td class="w60 handler wb-ba" nctype="bundling_data_price">
                        {{og.goods_marketprice}}
                    </td>
                    <td class="w60 handler wb-ba">
                        {{og.goods_price}}
                    </td>
                    <td :class="og.goods_storage == 0?'w50 wb-ba c-orange':'w50 wb-ba'">{{og.goods_storage>0?og.goods_storage:'无库存'}}</td>
                    <td class="w70 wb-ba">
                      <input type="text" nctype="price" v-model="og.bl_count_price" class="text w90" @blur="formatDiscountPrice(og)" @keyup="onlyNumber(og,oi,2)">
                    </td>
                    <td class="w110">
                      {{og.discount}}
                    </td>
                </tr>
                </tbody>
              </table>
            </div>
          </dd>
        </dl>
      </div>
      <div class="bottom sale-alert-dialog-bottom">
        <input type="button" value="取消" class="ncsc-btn ncsc-btn-orange-rim fr" @click="editGoodsCommonDialog=false">
        <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="alertGoodsConfirm">
        <div class="clear"></div>
      </div>
      </template>
    </qm-dialog>
    <qm-tips :tipsVisible="noSelectDialog" :showCancel="false" :width="'420px'" @close="noSelectDialog = false" @confirm="noSelectDialog = false">
      <template slot="title">提示信息</template>
      <template slot="content">请选择需要操作的商品</template>
    </qm-tips>
    <qm-tips :tipsVisible="setPriceDialog" :width="'420px'" @update:tipsVisible="setPriceDialog = $event" :showCancel="false" @close="setPriceDialog = false"  @confirm="confirmPrice()">
      <template slot="title">批量设置活动价</template>
      <template slot="content">
        <div id="set_act_price" >
          <div class="eject_con">
            <dl>
              <dt>修改类型：</dt>
              <dd>
                <input type="radio" @click="setPriceErr='';setNewPrice=0;" name="set_act_price" id="multi_set_act_price" v-model="setType" value="1" checked="checked"><label for="multi_set_act_price" class="mr10">批量设置统一活动价</label>
                <input type="radio" @click="setPriceErr='';setNewPrice=0;" name="set_act_price" id="multi_set_act_discount" v-model="setType" value="2" ><label for="multi_set_act_discount">批量设置折扣</label>
              </dd>
            </dl>
            <dl>
              <dt>{{setType == 1?'活动价':'折扣'}}：</dt>
              <dd>
                <input @keyup.enter="confirmPrice()"  v-model.number="setNewPrice" type="text" class="w230"><span id="multi_set_act_discount_sign" v-show="setType == 2" style="margin-left: 5px;">%</span>
              </dd>
            </dl>
            <div style="display: block;text-align:left;margin-bottom: 10px;color: red;font-size: 12px;"  class="error-txt mt20" >{{setPriceErr}}</div>
          </div>
        </div>
      </template>
    </qm-tips>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  import {storePromotionBundling,storeSetting} from 'api'
  import storage from 'lib/utils/storage'
  import fileUpload from 'lib/utils/fileUpload'
  import draggable from 'vuedraggable';
  import QmDialog from 'component/qm-dialog/index';
  import QmAddGoods from 'component/qm-add-goods/index';
  import QmDialogImg from "component/qm-dialog-img/index";
  import QmTips from 'component/qm-tips/index';
  import util from 'lib/utils/util';
  export default {
    name: "store-promotion-bundling-add",
    data() {
      return {
        setPriceErr:'',
        setNewPrice:'',
        setType:0,
        errTips:'',
        files:[''],
        fileMax:false,
        goods:[],
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
          filesErr:false,
          goodsErr:false,
          storageErr:false,
          goodsOneErr:false,
          goodsPriceErr:false,
          goodsNumErr:false
        },
        subData:{
          bundling_id:0,
          bundling_name:'',
          bl_title:'',
          bl_quota_starttime:'',
          bl_quota_endtime:'',
          discount_price:0,
          bl_sum_price:0,
          bl_sum_marketprice:0,
          bl_storage:'',
          goods_free:1,
          template_id:0,
          state:1,
        },
        addGood:false, //是否显示添加商品
        imgSrc:"",
        showImg:false,
        addGoodsDialog:false,
        editGoodsCommonDialog:false,
        newGoodsList :[],
        goodsCommon:{},
        selectAllFlag :false,
        noSelectDialog:false,
        setPriceDialog:false,
        editGoodsCommonIndex:0,
        editGoodsCommon:{},
        choosedGoodsCommonids:[],
        existGoods:[],
        mutliSpecGoodsList:[],
        excludeGoods:[]
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
      draggable,
      QmAddGoods,
      QmDialog,
      QmDialogImg,
      QmTips
    },

    methods: {
      ...mapActions({
        uploadFile:'uploadFile',
        multipleUploadFile:'multipleUploadFile'
      }),
      onlyIntNumber(item,i){
          let value;
          let newItem = _.clone(item);
          value = newItem.num
          let t = value.charAt(0);
          if(value.length==1){
              value=value.replace(/[^1-9]/g,'')
          }else{
              if(t == '0'){
                  if(value.length == 1){
                      value = '';
                  }else{
                      value = value.substr(1);
                  }
              }
              value=value.replace(/\D/g,'')
          }
          item.num = value;
      },
      onlyNumber(item,i,type){
          let newItem = _.clone(item);
          let value ;

          value = newItem.bl_count_price

          let t = value.charAt(0);
          //先把非数字的都替换掉，除了数字和.和-号    
          value = value.replace(/[^\d\.\-]/g,'');
          //前两位不能是0加数字      
          value = value.replace(/^0\d[0-9]*/g,'');
          //必须保证第一个为数字而不是.       
          value = value.replace(/^\./g,'');
          //保证只有出现一个.而没有多个.       
          value = value.replace(/\.{2,}/g,'.');
          //保证.只出现一次，而不能出现两次以上       
          value = value.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
          //如果第一位是负号，则允许添加    
          value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
          value =  value.replace(/\-/g,"")
          if(t == '-'){
              if(value.length == 1){
                  value = '';
              }else{
                  value = value.substr(1);
              }
          }

          item.bl_count_price = value
          if(type == 2){
              this.discount(item);
          }
      },
      formatDiscountPrice(item){
          if(item.bl_count_price && item.bl_count_price >= 0){
              item.bl_count_price = util.number_format(item.bl_count_price,2)
          }
      },
      confirmPrice(){
          if(this.setType == 1){
              if(this.setNewPrice === '') {
                  this.setPriceErr = "请设置活动价";
                  return
              }
              this.setNewPrice = util.number_format(this.setNewPrice,2)
              if(this.setNewPrice < 0){
                  this.setPriceErr = "活动价必须为不小于0的数值";
                  return
              }
          }else{
              var r = /^([1-9]([0-9])?|100|0)$/;
              if(this.setNewPrice === '') {
                  this.setPriceErr = "请设置折扣值";
                  return
              }
              if(!r.test(this.setNewPrice)) {
                  this.setPriceErr = "折扣值需为0-100的整数";
                  return
              }
          }
          if(this.setPriceType == 1){
              var gs = _.clone(this.goods)
              gs.forEach((item,i)=>{
                if(item.isMutliSpec == 1){
                    let goodsList = _.clone(item.goodsList);
                    let maxPrice = 0;
                    let minPrice = 0;
                    if(goodsList && goodsList.length>0 ){
                        goodsList.forEach((newItem,j)=>{
                            if(this.setType == 1){
                                goodsList[j].bl_count_price = util.number_format(this.setNewPrice,2)
                            }else{
                                goodsList[j].bl_count_price = util.number_format(parseFloat(goodsList[j].goods_marketprice)*this.setNewPrice/100,2)
                            }
                            if(j == 0){
                                minPrice = goodsList[j].bl_count_price;
                                maxPrice = goodsList[j].bl_count_price;
                            }else{
                                if(maxPrice - goodsList[j].bl_count_price < 0){
                                    maxPrice = goodsList[j].bl_count_price;
                                }
                                if(minPrice - goodsList[j].bl_count_price > 0){
                                    minPrice = goodsList[j].bl_count_price;
                                }
                            }
                        });
                        let priceRange = this.getPriceRange(goodsList,'bl_count_price');
                        gs[i].bl_count_price = priceRange[0];
                        gs[i].bl_count_price_range = priceRange[1];
                        goodsList = priceRange[2];
                        gs[i].goodsList = goodsList;
                    }
                }else{
                    if(this.setType == 1){
                        gs[i].bl_count_price = this.setNewPrice
                    }else{
                        gs[i].bl_count_price = util.number_format(parseFloat(gs[i].goods_marketprice)*this.setNewPrice/100,2)
                    }
                }
              });
          }else{
              var gs = _.clone(this.newGoodsList)
              gs.forEach((item,i)=>{
                  if(item.isChoosed){
                      if(this.setType == 1){
                          gs[i].bl_count_price = this.setNewPrice
                          gs[i].discount = (gs[i].goods_marketprice == 0?'':(util.number_format((this.setNewPrice/gs[i].goods_marketprice)*10,1)+'折'));
                      }else{
                          gs[i].discount = util.number_format(this.setNewPrice/10,1) + '折';
                          gs[i].bl_count_price = util.number_format(parseFloat(gs[i].goods_marketprice)*this.setNewPrice/100,2)
                      }

                  }
              })
          }
          this.setPriceDialog = false

      },
      getPriceRange(goodsList,type){
          let tempList = _.clone(goodsList);
          let maxPrice = 0;
          let minPrice = 0;
          if(tempList){
              tempList.forEach((item,j)=>{
                  let value = 0;
                  if(type == 'bl_count_price'){
                      value = item.bl_count_price;
                      tempList[j].bl_count_price = util.number_format(item.bl_count_price,2);
                  }else if(type == 'goods_marketprice'){
                      value = item.goods_marketprice;
                  }
                  if(j == 0){
                      minPrice = value;
                      maxPrice = value;
                  }else{
                      if(value - maxPrice > 0){
                          maxPrice = value;
                      }
                      if(minPrice - value > 0){
                          minPrice = value;

                      }
                  }
              })
          }
          let price = util.number_format(maxPrice,2);
          let rangePrice = [price];
          if(minPrice != maxPrice){
              price = util.number_format(minPrice,2) + '~' + util.number_format(maxPrice,2);
              rangePrice = [util.number_format(minPrice,2),util.number_format(maxPrice,2)]
          }
          return [price,rangePrice,tempList];
      },
      setPrice(type ){
          this.setPriceErr = "";
          this.setPriceType = type;
          this.setNewPrice = '';
          this.setType = 1

          var has = false
          if(this.setPriceType == 2){
              this.newGoodsList.forEach((item,i)=>{
                  if(item.isChoosed){
                      has = true
                  }
              })
          }else{
              if(this.goods&&this.goods.length>0){
                  has = true;
              }
          }
          if(!has){
              //this.noSelectDialog = true
              util.msg('请选择需要操作的商品');
              return
          }
          this.setPriceDialog = true
      },
      discount(item){
          let tempItem = _.clone(item);
          if(tempItem.bl_count_price>=0){
              item.discount = (tempItem.goods_marketprice == 0 ?'': ((parseFloat((tempItem.bl_count_price/tempItem.goods_marketprice)*10).toFixed(1))+'折'));
          }else{
              item.discount = '';
          }
      },
      selectAll(event){
        let tempList = _.clone(this.newGoodsList);
        tempList.forEach((data,i)=>{
            tempList[i].isChoosed = this.selectAllFlag;
        });
        this.newGoodsList = tempList;
        this.updateGoodsList();
      },
      updateGoodsList(){
          let choosedCount = 0;
          let tempListNew = _.clone(this.newGoodsList);
          tempListNew.forEach((data,i)=>{
              if(tempListNew[i].isChoosed){
                  choosedCount++;
              }
          });
          this.selectAllFlag = false
          if(tempListNew.length == choosedCount){
              this.selectAllFlag = true
          }
          this.goodsCommon.blGoodsCount = choosedCount;
      },
      newSelectOne(event,i){
          var tempList = _.clone(this.newGoodsList)
          if(event.target.checked){
              tempList[i].isChoosed = true
          }else{
              tempList[i].isChoosed = false
          }
          this.newGoodsList = tempList;
          this.updateGoodsList();

      },
      alertGoodsConfirm(){
          let tempList = _.clone(this.newGoodsList);
          let choosedList = [];
          let returnFlag = true;
          tempList.forEach((item,i)=>{
              if(item.isChoosed && returnFlag){
                  if(!item.bl_count_price){
                      util.msg('请设置商品规格活动价');
                      returnFlag = false
                      return true;
                  }
                  if(util.number_format(item.bl_count_price,2)<0){
                      util.msg('商品规格活动价不能小于0');
                      returnFlag = false
                      return true;
                  }
                  if(item.bl_count_price - item.goods_price > 0){
                      util.msg('商品规格活动价不能大于售价');
                      returnFlag = false
                      return true;
                  }
                  choosedList.push(item);
              }
          });
          if(returnFlag && !(choosedList && choosedList.length>0)){
              util.msg('请勾选需要参与活动的商品规格');
              returnFlag = false;
          }
          if(returnFlag == false){
              return;
          }
          this.editGoodsCommon.goodsList = choosedList;
          let countPriceRange = this.getPriceRange(choosedList,'bl_count_price');
          this.editGoodsCommon.bl_count_price = countPriceRange[0];
          this.editGoodsCommon.bl_count_price_range = countPriceRange[1];
          let marketPriceRange = this.getPriceRange(choosedList,'goods_marketprice');
          this.editGoodsCommon.goods_marketprice = marketPriceRange[0];
          this.editGoodsCommon.goods_marketprice_range = marketPriceRange[1];
          this.editGoodsCommon.goodsList = choosedList;
          let tempGoodsList = _.clone(this.goods);
          tempGoodsList[this.editGoodsCommonIndex] = this.editGoodsCommon;
          this.goods = tempGoodsList;
          this.editGoodsCommonDialog = false;
      },
      openEditGoodsCommonDialog(item,i){
        this.selectAllFlag = false
        let data = {
            goods_commonid:item.goods_commonid,
            bl_id:item.bl_id,
            bl_goods_commonid:item.bl_goods_commonid
        }
        let existGoodsList = []
        console.log(item.goodsList);
        if(item.goodsList){
            item.goodsList.forEach((newItem,k)=>{
                newItem.isChoosed = 1;
                this.discount(newItem);
                existGoodsList['\'' + newItem.goods_id + '\''] = newItem;
            });
        }
        console.log(existGoodsList);
        storePromotionBundling.getGoodsCommonListByBlId(data).then((res)=>{
            this.newGoodsList = res.list;
            this.goodsCommon = res.common;
            let blCount = 0;
            if(existGoodsList){
                let tempGoodsList = _.clone(this.newGoodsList);
                tempGoodsList.forEach((tempItem, j)=>{
                    if(existGoodsList['\'' + tempItem.goods_id+ '\'']){
                        tempGoodsList[j] = existGoodsList['\'' + tempItem.goods_id+ '\'']
                        blCount++;
                    }
                });
                this.goodsCommon.blGoodsCount = blCount;
                this.newGoodsList = tempGoodsList;
                this.updateGoodsList();
            }
        });
        this.editGoodsCommonIndex = i;
        this.editGoodsCommon = item ;
        this.editGoodsCommonDialog = true;
      },
      addGoodsConfirm() {
          //this.newGoodsList = this.existGoods.concat(this.newGoodsList);
          let tempGoodsList = _.clone(this.existGoods);
          this.goods = tempGoodsList.concat(this.mutliSpecGoodsList);
          this.addGoodsDialog = false;
      },
      openAddGoodsDialog() {
          let tempGoodsList  = _.clone(this.goods);
          this.choosedGoodsCommonids = [];
          this.existGoods = []
          this.mutliSpecGoodsList = []
          if(tempGoodsList){
              tempGoodsList.forEach((item,i)=>{
                  if(!item.isMutliSpec){
                      this.existGoods.push(item);
                      this.excludeGoods.push(item);
                      this.choosedGoodsCommonids.push(item.goods_commonid);
                  }else{
                      this.mutliSpecGoodsList.push(item);
                  }
              })
          }
          this.addGoodsDialog = true;
          
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
      itemDraggable(event){

      },
      showDialog(img){
         this.imgSrc=img
      this.showImg=true
      },
      addOneGoods(event){
        var tmp_goods = _.clone(event)
        tmp_goods.bl_goods_price = tmp_goods.goods_price
        tmp_goods.bl_count_price = tmp_goods.goods_price
        tmp_goods.num = 1
        this.choosedGoodsCommonids.push(tmp_goods.goods_commonid);
        this.existGoods.push(tmp_goods)
      },
      removeOne(goods,index){
        this.updateGoods(goods.goods_commonid,index)
      },
      removeOneGoods(event){
        this.updateGoodsExist(event.good.goods_commonid)
      },
      updateGoods(goods_id,index){
        var newList = _.clone(this.goods);
        newList.forEach((goods,gs)=>{
          if(gs == index){
            newList.splice(gs,1);
          }
        })
        this.goods = newList;
      },
      addPageGoods(event){
          event.forEach((item,i)=>{
              if(this.choosedGoodsCommonids&&this.choosedGoodsCommonids.indexOf(item.goods_commonid) < 0){
                  this.addOneGoods(item)
              }
          })
      },
      updateGoodsExist(goods_id){
          var newList = _.clone(this.existGoods);
          newList.forEach((goods,gs)=>{
              if(goods.goods_commonid == goods_id){
                  let index = this.choosedGoodsCommonids.indexOf(goods.goods_commonid);
                  this.choosedGoodsCommonids.splice(index,1);
                  newList.splice(gs,1);
              }
          })
          this.existGoods = newList;
      },
      getData(){
        var data ={
          bundling_id:this.subData.bundling_id
        }
        storePromotionBundling.getInfo(data).then((res)=>{
          this.subData.bundling_name = res.bundling_info.bl_name
          this.subData.bl_title = res.bundling_info.bl_title
          this.subData.bl_quota_starttime = res.bundling_info.bl_quota_starttime
          this.subData.bl_quota_endtime = res.bundling_info.bl_quota_endtime
          this.subData.discount_price = res.bundling_info.bl_discount_price
          this.subData.bl_sum_price = res.bundling_info.bl_sum_price
          this.subData.bl_sum_marketprice = res.bundling_info.bl_sum_marketprice;
          this.subData.bl_storage = res.bundling_info.bl_storage
          this.subData.goods_free = res.bundling_info.goods_free
          this.subData.template_id = res.bundling_info.delivery_template_id
          this.subData.state = res.bundling_info.bl_state

          var tempF = []
          for(var i=0;i<5;i++){
            if(res.bundling_info.bl_image_src[i]){
              tempF.push(res.bundling_info.bl_image_src[i])
            }
          }
          if(tempF.length < 5){
            tempF.push('')
          }
          this.files = tempF
          if(this.files.filter(function(item){return item !==''}).length == 5){
            this.fileMax = true
          }
          this.goods = res.goods_list
        })
      },
      getTemplates(){
        storeSetting.getTemplateList().then((res)=>{
          this.templates = res.responseContent;
          if(this.subData.template_id==0){
              this.templates.forEach((temp,t)=>{
                  if(temp.isChoosed == 1){
                      this.subData.template_id = temp.template_id;
                      return;
                  }
              })
          }
        })
      },

      //锚点跳转
      goAnchor(selector) {
          var child = document.querySelector(selector)
          if(child != null){
              // document.body.scrollTop = document.querySelector(selector).offsetTop-50;
              // window.scrollTo(0,document.querySelector(selector).offsetTop-50);
              document.getElementsByClassName("routerContent")[0].scrollTop = document.querySelector(selector).offsetTop-50;
          }
      },
      submit(){
        var validRes = true
        if(this.subData.bundling_name == ''){
          this.validData.nameErr = true
          $("#bundling_name").focus();
          return false;
        }
        if(this.subData.bl_quota_starttime==null||this.subData.bl_quota_starttime==''){
            this.validData.startTimeErr = true
            $("#bl_quota_starttime").focus();
            return false;
        }
        if(this.subData.bl_quota_endtime==null||this.subData.bl_quota_endtime==''){
            this.validData.endtimeErr = true
            $("#bl_quota_endtime").focus();
            return false;
        }
        if(this.subData.bundling_id == 0){
            let currentTime  = Date.now()
            currentTime -= currentTime % (60 * 1000)
            if(new Date(this.subData.bl_quota_starttime.replace(/-/g, '/')).getTime() < currentTime) {
                this.validData.startTimeLessThenNow = true;
                $("#bl_quota_starttime").focus();
                return false;
            }
            if(new Date(this.subData.bl_quota_endtime.replace(/-/g, '/')).getTime() < currentTime) {
                this.validData.endTimeLessThenNow = true;
                $("#bl_quota_endtime").focus();
                return false;
            }
        }
        if(this.subData.bl_quota_starttime >= this.subData.bl_quota_endtime){
          this.validData.endtimeLittleErr = true;
          $("#bl_quota_endtime").focus();
          return false;
        }
        if(this.files.filter(function(item){return item !==''}).length === 0){
          this.validData.filesErr = true
          $('#bl_quota_endtime').focus();
          return false;
        }else{
          this.validData.filesErr = false
        }
        if(this.goods.length <= 0){
          this.validData.goodsErr = true
          this.goAnchor('#bundling');
          return false;
        }
        if(this.validData.goodsOneErr || this.validData.goodsPriceErr || this.validData.goodsNumErr){
            this.goAnchor('#bundling');
            return false;
        }
        if(this.subData.bl_storage==null||this.subData.bl_storage==''){
            this.validData.storageErr = true
            $('#bl_storage').focus();
            return false;
        }
        if(!((/^[1-9]\d*$/.test(this.subData.bl_storage)&&this.subData.bl_storage>0)||this.subData.bl_storage==0)){
          this.validData.storageErr = true
          $('#bl_storage').focus();
          return false;
        }
        Object.values(this.validData).forEach((item,i) => {
          if(item){
            validRes = false
          }
        })
        if(validRes) {
          var subFiles = []
          var _self = this
          Object.values(this.files).forEach(function(f,k){
            if(f != ''){
              var imgPath = f.replace(_self.ImageIp+_self.imagePathConfig.goods,'').replace(f.substring(f.indexOf('?')),'')
              subFiles.push({file:imgPath})
            }
          })
          var subGoods = []
          this.goods.forEach(function(g,k){
            subGoods.push({gid:g.goods_id,appoint:1,price:g.bl_count_price,num:g.num})
          })
          var data = {
            ...this.subData,
            files:subFiles,
            goods:JSON.stringify(this.goods)
          }
          storePromotionBundling.bundlingEdit(data).then((res) => {
            if(res.resultCode == 1){
              this.$router.push('/promotion/store_promotion_bundling/bundling_list')
            }
          })
        }
      },
      logoLoad(event,idx){
        var key = this.metaData.key;
        var type = 1;
        fileUpload.logoLoad(event,key,type,this.uploadFile).then(res => {
          this.updateFiles(idx,res.imgPath)
        })
      },
      deleteLogo(idx){
        this.updateFiles(idx,'');
        var len = this.files.length-1;
        if(len != idx){
          this.files.splice(idx,1);
        }
        var len = this.files.length-1;
        if(this.files[len] && len < 5){
          this.files.push('');
        }
      },
      beforeMulti(){
        if(this.fileMax){
          util.msg('图片仅支持设置 5 张，已达上限')
          return
        }
      },
      multipleUpload(event){
        var vm = this

        // Object.values(event.target.files).forEach(function(item,i){
        //   if(i >= 5){
        //     return;
        //   }
        //   var key = vm.metaData.key;
        //   fileUpload.eachLoad(event,key,1,i).then((resp)=>{
        //     if(resp){
        //       var idx = vm.files.findIndex(function (f) {
        //         return f === ''
        //       })
        //       if(idx === -1){
        //         return;
        //       }
        //       vm.updateFiles(idx,resp.imgPath)
        //     }
        //   })
        // })

        // 先将未上传的图片的的下标找出
        var fIndex = [];
        for(let idx = 0;idx<5;idx++){
          if(vm.files[idx] === ''|| vm.files[idx] == undefined || vm.files[idx]==null){
            fIndex.push(idx);
          }
        }
        for(let i=0;i<event.target.files.length;i++){
          var item = event.target.files[i];
          if(i >= 5){
            return;
          }
          var key = vm.metaData.key;
          fileUpload.eachLoad(event,key,1,i,1).then((resp)=>{
            if(resp){
              var idx = vm.files.findIndex(function (f) {
                return f === ''
              })
              if(idx === -1){
                return;
              }
              if(this.files.length < 5){
                this.files.push('');
              }
               //同时发起多个请求，图片比较小的会先返回，所以不能用idx，7399
              // vm.updateFiles(idx,resp.imgPath)
              if(i >= fIndex.length){
                return
              }else{
                // 匹配上传图片的下标，fIndex[i]为对应图片下标
                vm.updateFiles(fIndex[i],resp.imgPath)
                //this.$refs.multiFile.value = null;
              }
            }
          })
        }
      },
      updateFiles(idx,imgPath){
        var f = _.clone(this.files)
        f[idx] = imgPath?(this.ImageIp + imgPath):''
        if(!f.includes('')){
          this.fileMax = true
        }else{
          this.fileMax = false
        }
        this.files = f
      },
        calcParentCountPrice(i,j){
          let tempGoods = _.clone( this.goods[i]);
          let goodsList = tempGoods.goodsList;
          if(goodsList){
              let countPrice = this.getPriceRange(goodsList,'bl_count_price');
              tempGoods.bl_count_price = countPrice[0];
              tempGoods.bl_count_price_range = countPrice[1];
              tempGoods.goodsList = countPrice[2]
              let tempGoodsList = _.clone(this.goods);
              tempGoodsList.forEach((item,k)=>{
                  if(k == i){
                      tempGoodsList[k] = tempGoods;
                  }
              });
              this.goods = tempGoodsList;
          }
        }
    },
    watch:{
        subData:{
          handler: function () {
            if(this.subData.bundling_name !== ''){
              this.validData.nameErr = false
            }
            let currentTime  = Date.now()
            currentTime -= currentTime % (60 * 1000)
            if(this.subData.bl_quota_starttime != '' && this.subData.bundling_id == 0) {
                if(new Date(this.subData.bl_quota_starttime.replace(/-/g, '/')).getTime() < currentTime) {
                    this.validData.startTimeLessThenNow = true;
                }else{
                    this.validData.startTimeLessThenNow = false;
                }
            }
            if(this.subData.bl_quota_endtime != ''){
                if(new Date(this.subData.bl_quota_endtime.replace(/-/g, '/')).getTime() < currentTime) {
                    if(this.subData.bundling_id == 0){
                        this.validData.endTimeLessThenNow = true;
                    }
                }else{
                    this.validData.endTimeLessThenNow = false;
                    if(this.subData.bl_quota_starttime >= this.subData.bl_quota_endtime){
                        this.validData.endtimeLittleErr = true
                    }else{
                        this.validData.endtimeLittleErr = false
                    }
                }
            }
            if(this.files.length > 0){
              this.validData.filesErr = false
            }
            if(this.goods.length > 0){
              this.validData.goodsErr = false
            }
            if(this.subData.bl_storage==null||this.subData.bl_storage==''){
                this.validData.storageErr = true
            }
            if(!((/^[1-9]\d*$/.test(this.subData.bl_storage)&&this.subData.bl_storage>0)||this.subData.bl_storage==0)){
                this.validData.storageErr = true
            }else{
                this.validData.storageErr = false
            }
          },
          deep: true
        },
      goods:{
        handler: function () {
          var discount_price = 0
          var bl_sum_price = 0
          var bl_sum_marketprice = 0
          var discount_price_max = 0
          var bl_sum_price_max = 0
          var bl_sum_marketprice_max = 0
          if(this.goods.length > 0){
            this.validData.goodsErr = false
            let goodsPriceErr = false;
            let goodsNumErr = false;
            let tempGoodsErrTips = '';
            let tempGoodsNumErrTips = '';
            this.validData.goodsPriceErr = false;
            this.validData.goodsNumErr = false;
            this.goodsPriceErrTips = '';
            this.goodsNumErrTips = '';
            let tempGoodsList = _.clone(this.goods);
            tempGoodsList.forEach(function(item,k){
                if(item.isMutliSpec){
                    let num = item.num
                    let tempSubGoodsList = _.clone(item.goodsList);
                    if(!tempSubGoodsList){
                        goodsPriceErr = true;
                        tempGoodsErrTips = '多规格商品必须选择对应规格'
                        return;
                    }
                    tempSubGoodsList.forEach((tempItem, j)=>{
                        let tempPrice = tempItem.bl_count_price;
                        let tempGoodsPrice = tempItem.bl_goods_price;
                        let marketPirce = tempItem.goods_marketprice;
                        let tempNum = num;
                        if(tempItem.bl_count_price == null || tempItem.bl_count_price === ''){
                            goodsPriceErr = true;
                            tempPrice = 0;
                            tempGoodsErrTips = '商品价格不能为空'
                        }else if(!(/^\d+(\.\d{0,2})?$/.test(tempItem.bl_count_price)&&tempItem.bl_count_price>=0)){
                            goodsPriceErr = true;
                            tempPrice = 0;
                            tempGoodsErrTips = '商品价格必须大于等于0'
                        }else if(parseFloat(tempItem.bl_count_price) > parseFloat(tempItem.goods_price)) {
                            goodsPriceErr = true;
                            tempGoodsErrTips = '活动价不能大于售价'
                        }
                        if(goodsPriceErr == false ){
                            if(num == null || num == ''||!/^[1-9]\d*$/.test(num)){
                                goodsNumErr = true;
                                num = 0;
                                tempGoodsNumErrTips = '商品数量必须为正整数'
                            }
                        }
                    })
                    discount_price += parseFloat(item.bl_count_price_range[0]) * parseInt(num)
                    bl_sum_price += parseFloat(item.goods_price) * parseInt(num)
                    bl_sum_marketprice += parseFloat(item.goods_marketprice_range[0]) * parseInt(num);
                    discount_price_max += item.bl_count_price_range.length ==1 ?(parseFloat(item.bl_count_price_range[0]) * parseInt(num)):(parseFloat(item.bl_count_price_range[1]) * parseInt(num));
                    bl_sum_price_max += parseFloat(item.goods_price) * parseInt(num)
                    bl_sum_marketprice_max += item.goods_marketprice_range.length ==1 ?(parseFloat( item.goods_marketprice_range[0]) * parseInt(num)):(parseFloat( item.goods_marketprice_range[1]) * parseInt(num));
                }else{
                    let tempPrice = item.bl_count_price;
                    let tempGoodsPrice = item.bl_goods_price;
                    let tempNum = item.num;
                    if(item.bl_count_price == null || item.bl_count_price === ''){
                        goodsPriceErr = true;
                        tempPrice = 0;
                        tempGoodsErrTips = '商品价格不能为空'
                    }else if(!(/^\d+(\.\d{0,2})?$/.test(item.bl_count_price)&&item.bl_count_price>=0)){
                        goodsPriceErr = true;
                        tempPrice = 0;
                        tempGoodsErrTips = '商品价格必须大于等于0'
                    }else if(parseFloat(item.bl_count_price) > parseFloat(item.goods_price)) {
                        goodsPriceErr = true;
                        tempGoodsErrTips = '活动价不能大于售价'
                    }
                    if(goodsPriceErr == false ){
                        if(item.num == null ||item.num == ''||!/^[1-9]\d*$/.test(item.num)){
                            goodsNumErr = true;
                            tempNum = 0;
                            tempGoodsNumErrTips = '商品数量必须为正整数'
                        }
                    }
                    discount_price += parseFloat(tempPrice) * parseInt(tempNum)
                    bl_sum_price += parseFloat(tempGoodsPrice) * parseInt(tempNum)
                    bl_sum_marketprice += parseFloat(item.goods_marketprice) * parseInt(tempNum);
                    discount_price_max += parseFloat(tempPrice) * parseInt(tempNum)
                    bl_sum_price_max += parseFloat(tempGoodsPrice) * parseInt(tempNum)
                    bl_sum_marketprice_max += parseFloat(item.goods_marketprice) * parseInt(tempNum);
                }
            })
            this.validData.goodsPriceErr = goodsPriceErr;
            this.validData.goodsNumErr = goodsNumErr;
            this.goodsPriceErrTips = tempGoodsErrTips;
            this.goodsNumErrTips = tempGoodsNumErrTips;
          }
          this.subData.discount_price = discount_price == discount_price_max? discount_price.toFixed(2):  discount_price.toFixed(2)+'-'+ discount_price_max.toFixed(2)
          this.subData.bl_sum_price = bl_sum_price.toFixed(2)
          this.subData.bl_sum_marketprice = bl_sum_marketprice == bl_sum_marketprice_max? bl_sum_marketprice.toFixed(2):  bl_sum_marketprice.toFixed(2)+'-'+bl_sum_marketprice_max.toFixed(2)
          if(this.goods.length === 1){
            if(this.goods[0].num == 1){
              this.validData.goodsOneErr = true
            }else{
              this.validData.goodsOneErr = false
            }
          }else{
            this.validData.goodsOneErr = false
          }
        },
        deep:true
      }
    },
    filter:{

    },
    mounted () {
      this.subData.bundling_id = storage.get('active_id')
      var _self = this;
      layui.use('layer', function(){
        this.layer = layui.layer;
      });
      layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
          elem: '#bl_quota_starttime',
          theme: "grid",
          type:'datetime',
          format:'yyyy-MM-dd HH:mm',
          trigger:'click',
          done:function(data){
            _self.validData.startTimeErr = false
            _self.subData.bl_quota_starttime = data
          }
        });
        laydate.render({
          elem: '#bl_quota_endtime',
          theme: "grid",
          type:'datetime',
          format:'yyyy-MM-dd HH:mm',
          trigger:'click',
          done:function(data){
            _self.validData.endtimeErr = false
            _self.subData.bl_quota_endtime = data
          }
        });

      })
      this.getTemplates()
      if(this.subData.bundling_id > 0){
        this.getData()
      }
    },
    updated(){
    }
  }
</script>
