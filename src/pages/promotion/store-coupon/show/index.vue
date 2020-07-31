<style scoped>
    .ncsc-table-spec2{border: 1px solid #dbdbdb; border-collapse: separate; box-sizing: border-box; width: 100%; border-radius: 5px;}
    .ncsc-table-spec2 td, .ncsc-table-spec2 th{border-top: 1px solid #dbdbdb; border-left: 1px solid #dbdbdb; text-align: left; padding: 10px; font-size: 14px; vertical-align: top;}
    .ncsc-table-spec2 th{font-weight: bold; color:#757575; width:15%;}
    .ncsc-table-spec2 td{width:35%;}
    .ncsc-table-spec2 tr:first-child th, .ncsc-table-spec2 tr:first-child td{border-top:none;}
    .ncsc-table-spec2 tr th:first-child{border-left: none;}
    .ncsc-table-spec2 .img-group{margin-bottom: -10px;}
    .ncsc-table-spec2 .img{display: inline-block; margin:0 10px 10px 0;}
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
</style>
<template>
    <div class="qm-store-class-base">
    <div class="item-publish">
        <table class="ncsc-table-spec2">
            <tbody>
            <tr>
                <th>优惠券名称</th>
                <td colspan="3">{{coupon.name}}</td>
            </tr>
                <tr>
                    <th>优惠券类型</th>
                    <td>
                        {{coupon_types[coupon.type]}}
                    </td>
                    <template v-if="coupon.type==2 || coupon.type ==3 || coupon.type == 4 ">
                        <th>优惠方式</th>
                        <td colspan="3">{{couponCouponTypes[coupon.coupon_type]}}</td>
                    </template>
                    <template v-if="coupon.type==1">
                        <th>优惠券金额(元)</th>
                        <td colspan="3">
                            {{coupon.cash_money}}
                        </td>
                    </template>
                </tr>
                <template v-if="coupon.type==2 || coupon.type ==3 || coupon.type == 4 ">
                    <tr>
                        <th>订单金额满</th>
                        <td :colspan="coupon.coupon_type==3?3:1">
                        {{coupon.order_amount}}元
                        </td>
                        <template v-if="coupon.coupon_type==1">
                            <th>减免</th>
                            <td>
                                {{coupon.cash_money}}元
                            </td>
                        </template>
                        <template v-if="coupon.coupon_type==0">
                            <th>优惠券折扣</th>
                            <td>
                                {{coupon.discount}}折
                            </td>
                        </template>

                        <template v-if="coupon.coupon_type==2">
                            <th>满额赠券</th>
                            <td>
                                <template v-for="(temp,f) in avail_coupon_list">
                                    <template v-if="temp.id == coupon.gift_coupon_id">
                                        {{temp.name}}
                                    </template>
                                </template>
                            </td>
                        </template>
                    </tr>
                    <template v-if="coupon.coupon_type==3">
                        <tr>
                            <th>礼品</th>
                            <td colspan="3">
                                <div id="giftGoodsListDiv">
                                    <template v-for="(goods,i) in gift_goods_list">
                                        <div nctype="gift_goods_info" class="selected-group-goods div-goods-select" style="display:inline-block;margin:5px 10px;">
                                            <div class="goods-thumb"><img
                                                                          :src="goods.src"/></div>
                                            <div class="goods-name">
                                                <a nctype="groupbuy_goods_href"
                                                   @click="goodsDetail(goods)"
                                                   target="_blank">{{goods.goods_name}}</a>
                                            </div>
                                            <div class="goods-price fs12">￥<span nctype="gift_goods_price"
                                            >{{goods.goods_price}}</span></div>
                                        </div>
                                    </template>
                                </div>
                            </td>
                        </tr>
                    </template>
                    <template v-if="coupon.type==3">
                        <tr>
                            <th>优惠券对应商品</th>
                            <td colspan="3">
                                <div id="goodsListDiv">
                                    <template v-for="(couponGoods,i) in coupon_goods_list">
                                        <div nctype="groupbuy_goods_info" class="selected-group-goods div-goods-select-box" style="margin:10px">
                                            <div class="goods-thumb"><div class="goods-thumb-in"><img id="groupbuy_goods_image"
                                                                                                      :src="couponGoods.src"/></div></div>
                                            <div class="goods-name">
                                                <a nctype="groupbuy_goods_href" id="groupbuy_goods_name"
                                                  @click="goodsDetail(couponGoods)"
                                                   target="_blank">{{couponGoods.goods_name}}</a>
                                            </div>
                                            <div class="goods-price fs12">￥<span nctype="groupbuy_goods_price"
                                            >{{couponGoods.goods_price}}</span></div>
                                            <input  name="goods_id[]"  :value="couponGoods.goods_id" type="hidden" />
                                        </div>
                                    </template>
                                </div>
                            </td>
                        </tr>
                    </template>
                    <template v-else-if="coupon.type==2">
                        <tr>
                            <th>参与活动商品分类</th>
                            <td colspan="3">
                                <button class="ncsc-btn-orange-rim  basic-button" @click="showClassListTree()">查看参与活动商品分类</button>
                            </td>
                        </tr>
                    </template>
                </template>
                <tr v-if="coupon.is_show==1">
                    <th>前台展示期</th>
                    <td>
                        {{coupon.start_time}}~{{coupon.end_time}}
                    </td>
                    <th>领取后有效天数</th>
                    <td >
                        {{coupon.effective_days}}
                    </td>
                </tr>
                <tr v-else>
                    <th>领取后有效天数</th>
                    <td colspan="3">
                        {{coupon.effective_days}}
                    </td>
                </tr>
                <tr>
                    <th>是否限制发布张数</th>
                    <td :colspan="coupon.is_limit_num?3:1" >
                    {{coupon.is_limit_num?'不限制':'限制'}}
                    </td>
                    <template v-if="!coupon.is_limit_num">
                        <th>优惠券总张数</th>
                        <td>
                            {{coupon.ticket_num}}
                        </td>
                    </template>
                </tr>
                <tr>
                    <th>是否允许领用多张</th>
                    <td :colspan="coupon.is_overlay?1:3" >
                        {{coupon.is_overlay?'允许':'不允许'}}
                    </td>
                    <template v-if="coupon.is_overlay">
                        <th>可领取张数</th>
                        <td>
                            {{coupon.get_ticket_num}}
                        </td>
                    </template>
                </tr>
                <tr>
                    <th>前台展示</th>
                    <td>
                        {{coupon.is_show?'显示':'不显示'}}
                    </td>
                    <th>有效</th>
                    <td>
                        {{coupon.is_available?'是':'否'}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <el-dialog
            :visible.sync="dialog1"
            :width="'480px'"
            customClass="phone-bind"
            v-dialogDrag>

        <div slot="title" class="phone-bind-title">
            <slot name="title">查看参与活动商品分类</slot>
        </div>
        <div>
            <slot name="content">
                <qm-classlist-tree :list="subClssList" :defaultCheckedKeys="defaultCheckedKeys" :defaultExpandedKeys="defaultExpandedKeys"></qm-classlist-tree>
            </slot>
        </div>

        <span class="dialog-footer">
            <label class="submit-border">
                <input data-v-c51847de="" id="store_submit" type="button" value="确定" class="submit" @click="classListSure()">
            </label>
        </span>
    </el-dialog>
    </div>
</template>
<script>
    import 'viewerjs/dist/viewer.css'
    import {mapGetters,mapActions} from 'vuex'
    import storage from 'lib/utils/storage'
    import {storeCoupon,storeClass} from 'api'
    import QmClasslistTree from "component/qm-classlist-tree/index";
    export default {
        name: "store-coupon-show",
        data() {
            return {
              bodyListener:'',
                coupon_types:[],
                id:0,
                coupon:{},
                coupon_goods_list:[],
                gift_goods_list:[],
                avail_coupon_list:[],
                couponCouponTypes:[],
                class_list:[],
                subClssList:[],
                // 默认选中
                defaultCheckedKeys:[],
                // 默认展开
                defaultExpandedKeys:[],
                dialog1:false
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
            ...mapGetters({
                getCouponDetail:'getCouponDetail',
            })
        },
        components:{
            QmClasslistTree
        },
        methods: {

            showClassListTree(){
                this.dialog1 = true;
            },
            classListSure(){
                this.dialog1 = false;
            },
            getSubClassList(){
                storeClass.getSubClassListForTree({'disable':1}).then((res)=>{
                    if(res.resultCode == 1){
                        this.subClssList = res.responseContent
                    }
                })
            },
            getCouponData(){
                var data ={
                    id:this.id
                }
                storeCoupon.getCouponDetail(data).then((res)=>{
                    this.coupon = res.coupon
                    if(this.coupon.type == 2){//指定品类优惠券
                        this.defaultCheckedKeys = [];
                        var ids = this.coupon.class_ids.split(",");
                        ids.forEach((res)=>{
                            if(res.trim() != ''){
                                this.defaultCheckedKeys.push(res);
                            }
                        })
                    }
                    this.defaultExpandedKeys = this.defaultCheckedKeys
                    this.coupon_types = res.coupon_types
                    this.coupon_goods_list = res.coupon_goods_list
                    this.gift_goods_list = res.gift_goods_list
                    this.avail_coupon_list = res.avail_coupon_list
                    this.couponCouponTypes = res.couponCouponTypes
                    this.class_list = res.class_list

                })
            },
            goodsDetail(item) {
                storage.set('goods_route_name',this.$route.name);
                let routeData = this.$router.resolve({
                  name:"store_goods_add_step_two",
                  params:{commonId:item.goods_commonid}
                });
                window.open(routeData.href, '_blank');
            }
        },
        watch:{

        },
        mounted () {
          var _self = this;
            this.id = storage.get('coupon_id')
            if(this.id > 0){
                this.getCouponData()
            }
            this.getSubClassList();
          //body绑定键盘enter搜索事件
          _self.bodyListener = (e) => {
            if (e.keyCode === 13){
              if(_self.dialog1){
                _self.classListSure();
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
