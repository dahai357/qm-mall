import {mapGetters,mapActions} from 'vuex'
import QmTable from 'component/qm-table/index';
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util'
import QmTips from "component/qm-tips/index";
import QmCheckboxFrame from 'component/qm-checkbox-frame/index';
import { Base64 } from 'js-base64';
import * as _ from "lodash";
import exportData from 'lib/utils/export';
import QmArea from 'component/qm-area/index';

export default {
    name: "store-receiving-index",

    data(){
        return {
          bodyListener:'',
          lastGetlistTime:'',
          showNewOrder:false,
            pageParams:{
                query_start_date:'',
                query_end_date:'',
                or_com_type:'-1',
                shipping_type:'-1',
                order_sn:'',
                skip_off:0,
                state_type:"state_wait",

                pageIndex:0,
                pageSize:15,
                total:1,
                only_total:0,
              lastSearchTime:0,
              },

                dialog1:false,//修改金额
                dialog2:false,//提示框
                dialog3:false,//修改订单
                dialog4:false,//选择配送员
                dialog5:false,//处理
                dialog6:false,//确认收到货款
                dialog7:false,//接单
                dialog8:false,//拒单
                dialogMessage1:'请选择需要操作的记录',
                dialogTitle1:'提示信息',
                deliveriers:[],//配送员列表,
                curDeliverier:{},//当前配送员

              orderList:[],
              selected_delivery_mans:{},
          calcType:2,
          isUpdateOrderPrice:false,//修改订单或者价格 标记价格是否变动过
          updateOrderPriceIsError:false,//标记修改订单或者价格是否抛出错误  主要用于防止直接提交订单 会出现吐丝2次问题
            ediOrderPriceIsCommit:'',//用于标记是否处于计算金额中
          showL:true,//用于做强制渲染
            isEdiPriceCommitButton:false,//标记修改价格或者修改订单是否点击提交按钮
            ediPriceCommitType:false,//修改订单或者价格提交类型
          lastEvent:false,//用于记录修改订单或者修改价格获得焦点框的对象
              dada_shop:[],
              goods_amount:0,
              curOrder:{},
              lastOrderAmount:'',
              new_diliveryman:false,
              diliveryman_name:'',
              diliveryman_tel:'',
              reason:'',

              error:{
                goods_amount_error:false,
                goods_amount_error_text:'商品总价必须为大于0的数字',
                diliveryman_error:false,
                diliveryman_error_text:'配送费用不能为空',
                dealWith_error:false,
                recieve_goods_error:false,
                reason_error:false,
              },
                nowOrderAmount:'',

                dealWithValue:1,//处理结果
                dealWithRemark:'',

                canSearch:false, //由于列表里有计时器，为了防止快速点击导致计时器错乱，在点击后到请求接口接口结束前不能再点击
                timers:[],
                showExport:false,
                exportSourceData:{},

                //达达
                dadaState:'all',
                firstDadaList:[],
          showChangeAddress:false,
          addressInfo:{
            province:'',
            city:'',
            district:'',
            subaddress:'',
            reciver_name:'',
            phone:'',
            order_id:0,
            colorList:[],
          }
        }
    },

    computed:{
      ...mapGetters({
        isReceiveOrder:'getIsReceiveOrder',
      }),
    },
    components:{
        QmTable,
        QmPagination,
        QmTips,
        QmCheckboxFrame,
        QmArea
    },

    methods: {
        ...mapActions('storeOrder',{
            getList:'getList',
          modifyOrderAmountNew: 'modifyOrderAmountNew',
              modifyOrderAmount:'modifyOrderAmount',
              modifyOrder:'modifyOrder',
              getOrderPrice:'getOrderPrice',
              makeAlreadyTransfer:'makeAlreadyTransfer',
              getDeliveriers:'getDeliveriers',
              getDiliverymanList:'getDiliverymanList',
              applyConfirm:'applyConfirm',
              receivePayment:'receivePayment',
              selectDelivery:'selectDelivery',
              addDelivery:'addDelivery',
              isBlacklist:'isBlacklist',
              dadaList:'getDadaList',
              modifyAddress:'modifyAddress',
          getCalcOrderPrice: 'getCalcOrderPrice',
          getCalcOrder: 'getCalcOrder',
          }),
        ...mapActions('inventoryWarning',{
          isInventoryWarning:'isInventoryWarning'
        }),
          ...mapActions('storeReceiving',{
            orderReceive:'orderReceive',
            refuseOrder:'refuseOrder'
          }),
      confirmExport(){
        this.getExcel()
      },
      exportData(){
        if(this.pageParams.total == 0){
          layer.msg('暂无数据可导出')
          return;
        }
        if(this.pageParams.total > 10000){
          this.showExport = true;
        }else{
          this.showExport = false;
          this.getExcel()
        }
      },
      getCssStyle(color){
        var styleStr = 'font-size: 13px;margin-left:0px;';
        if(color){
          styleStr += 'background-color: '+this.colorList[color]+';color:#fff;';
        }
        return styleStr;
      },
      getExcel() {
        this.showExport = false;
          layer.msg('正在导出，请稍后...')
        var newData = _.clone(this.pageParams);
        newData.export = 1;
        this.getList(newData).then((res)=> {
          if (res.resultCode == 1) {
            exportData.exportExcelNew(res.responseContent);
          }
        })
      },
      areaValueChange(data){
        if(data.level == 'province'){
          this.addressInfo.city = '';
          this.addressInfo.district = '';
          this.addressInfo.province = data.value
        }
        if(data.level == 'city'){
          this.addressInfo.district = '';
          this.addressInfo.city = data.value
        }
        if(data.level == 'district'){
          this.addressInfo.district = data.value
        }
      },
  changeAddress(item){
    this.showChangeAddress = true;
    let tmpAddressInfo = _.clone(this.addressInfo)
    tmpAddressInfo.order_id = item.order_id
    tmpAddressInfo.province = item.extend_order_common.area_arr[0]
    tmpAddressInfo.city = item.extend_order_common.area_arr[1]
    tmpAddressInfo.district = item.extend_order_common.area_arr[2]
    tmpAddressInfo.reciver_name = item.extend_order_common.reciver_info.name
    tmpAddressInfo.subaddress = item.extend_order_common.reciver_info.street + item.extend_order_common.reciver_info.subaddress
    tmpAddressInfo.phone = item.extend_order_common.reciver_info.phone
    this.addressInfo = tmpAddressInfo
  },
  confirmChangeAddress(){
    if('' == this.addressInfo.reciver_name){
      layer.msg('请填写收货人姓名');
      return;
    }
    if('' == this.addressInfo.phone){
      layer.msg('请填写收货电话');
      return;
    }
    if(!(/1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.addressInfo.phone) || /^\d{7,8}$/.test(this.addressInfo.phone))){
      layer.msg('收货电话格式不正确');
      return;
    }
    if('' == this.addressInfo.province){
      layer.msg('请选择收货地址所在省');
      return;
    }
    if('' == this.addressInfo.city){
      layer.msg('请选择收货地址所在市');
      return;
    }
    if('' == this.addressInfo.district){
      layer.msg('请选择收货地址所在区/县');
      return;
    }
    if('' == this.addressInfo.subaddress){
      layer.msg('请填写详细地址');
      return;
    }
    this.modifyAddress(this.addressInfo).then((res)=>{
      layer.msg(res.shortMessage)
      if(res.resultCode == 1){
        this.getPageData(this.pageParams)
        this.showChangeAddress = false;
      }
    })
  },
  closeChangeAddress(){
    this.showChangeAddress = false;
  },
      openGoods(goodsCommonId){
        let routeData = this.$router.resolve({
          name:"store_goods_add_step_two",
          params:{commonId:goodsCommonId}
        });
        window.open(routeData.href, '_blank');
      },
          init(){
            this.getPageData(this.pageParams);
            this.getDeliveriers().then((res)=>{
                this.deliveriers = res.responseContent
              })
            this.dadaList().then((res)=>{
              this.firstDadaList = res;
            });

          },

      showToggle(idx){
        let newList = _.clone(this.orderList);
        newList[idx].toggle = !newList[idx].toggle
        this.orderList = newList
      },
        getPageData(data){
          $('select').blur();
            var newData = _.clone(data);
            this.canSearch = false;

            //赠品假数据
            this.getList(newData).then((res)=>{
              this.colorList = res.responseContent.colorList;
                this.lastGetlistTime = res.requestTime;
                if(res.resultCode == 1){
                  if((!res.responseContent.list || res.responseContent.list.length == 0) && this.pageParams.pageIndex > 0){
                    this.pageParams.pageIndex -= 1;
                    this.getPageData(this.pageParams)
                    return;
                  }
                  this.lastSearchTime = res.responseContent.last_search_time;
                  this.showNewOrder = false;
                    //有可能在计时器阶段刷新，这时需要将原有计时器清空
                    this.timers.forEach((timer)=>{
                      clearInterval(timer);
                    })
                    this.timers = [];

                    this.orderList = [];
                    res.responseContent.list.forEach((list)=>{
                      list.serverTime = res.responseTime
                    })
                    this.orderList = res.responseContent.list;
                  this.dada_shop =  res.responseContent.dada_shop;
                    this.selected_delivery_mans = res.responseContent.selected_delivery_mans;

                    this.orderList.forEach((res2,r)=>{
                      //商品+组合+赠品
                      let g_count = 0;
                      res2.goods_list.forEach((g,v)=>{
                        if(g.goods_commonid == 0){
                          g_count += (g.goods_group.length + 1)
                        }else{
                          g_count++
                        }
                      })
                      if(res2.extend_order_gifts){
                        g_count += res2.extend_order_gifts.length
                      }
                      if(g_count > 3){
                        res2.has_more = true
                      }else{
                        res2.has_more = false
                      }
                      res2.toggle = false
                        // 1567998763
                        var maxtime = 0;
                        if(res2.serverTime && res2.serverTime > 0){
                          if(res2.payment_type == 0 || res2.payment_type == 2){
                              maxtime = 10*60-(res2.serverTime - res2.add_time);
                          }else{
                              maxtime = 10*60-(res2.serverTime - res2.payment_time);
                          }
                        }else{
                          if(res2.payment_type == 0 || res2.payment_type == 2){
                              maxtime = 10*60-((new Date()).getTime()/1000 - res2.add_time);
                          }else{
                              maxtime = 10*60-((new Date()).getTime()/1000 - res2.payment_time);
                          }
                        }
                       /* if(maxtime > 0){
                            this.countDown(maxtime,res2,r);
                        }else{
                            var newItem = _.clone(res2);
                            var  newList = _.clone(this.orderList);
                            newItem.state_desc = '已关闭';
                            newItem.hideMenu = true;
                            newItem.maxtime = ''
                            newItem.take_order = false;
                            newList[r] = newItem;
                            this.orderList = newList;
                        }*/
                    })
                    var newParams = _.clone(this.pageParams);
                    newParams.total = res.responseContent.total?res.responseContent.total:0;
                    this.pageParams = newParams;
                    this.canSearch = true;
                }else{
                    this.canSearch = true;
                    this.layer.msg(res.longMessage);
                }
            })
          this.isInventoryWarning();
        },
      changeTwoDecimal_f(val){
        var f_x = parseFloat(val);
        if (isNaN(f_x))
        {
          return 0;
        }
        var f_x = Math.round(val*100)/100;
        var s_x = f_x.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0)
        {
          pos_decimal = s_x.length;
          s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2)
        {
          s_x += '0';
        }
        return s_x;
      },
        changeIndex(index){
          this.pageParams.pageIndex = index;
          this.getPageData(this.pageParams);
        },
        getDeliveryTime(item){
            var delivery_time = item.delivery_time*1000;
            var today = util.dateFormat(new Date(),"yyyy-MM-dd");
            var delivery = util.dateFormat(new Date(delivery_time),"yyyy-MM-dd");
            var tempTime = util.dateFormat(new Date(delivery_time),"HH:mm");
            var time = util.dateFormat(new Date(delivery_time),"HH:mm")
                +"-"+util.dateFormat(new Date(delivery_time + 1800000),"HH:mm");
            if(tempTime == '23:59'){
                if(today == delivery){
                    return '今天内';
                }else{
                    return util.dateFormat(new Date(delivery_time),"yyyy-MM-dd") +"内";
                }
            }else{
                if(today == delivery){
                    return '今天' +" "+ time;
                }else{
                    return util.dateFormat(new Date(delivery_time),"yyyy-MM-dd") +" "+ time;
                }
            }
          },
      getMyselfDeliveryTime(item){
        var delivery_time = item.delivery_time*1000;
        var today = util.dateFormat(new Date(),"yyyy-MM-dd");
        var delivery = util.dateFormat(new Date(delivery_time),"yyyy-MM-dd");
        var time = util.dateFormat(new Date(delivery_time),"HH:mm")
        // +"-"+util.dateFormat(new Date(delivery_time + 1800000),"HH:mm");
        if(today == delivery){
          return '今天' +" "+ time;
        }else{
          return util.dateFormat(new Date(delivery_time),"yyyy-MM-dd") +" "+ time;
        }
      },

          checkRate(nubmer) {
            var rate = true;
        　　var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
        　　if (!re.test(nubmer)) {
              rate = false;
        　　}
            return rate;
        },
        changePrice(item){
            this.error.goods_amount_error = false;
            this.curOrder = item;
            this.goods_amount = (item.order_amount/100).toFixed(2);

          this.error.goods_amount_error = false;
          this.curOrder = item;
              this.goods_amount = (item.order_amount / 100).toFixed(2);
          this.dialog1 = true;
          this.dialog1Success = false;
          this.curOrder.goods_list.forEach((list) => {
            list.now_goods_price = this.changeTwoDecimal_f(list.goods_price / 100);
            list.now_goods_saleprice = this.changeTwoDecimal_f(list.goods_saleprice / 100);
          })
          this.curOrder.now_coupon_amount=this.curOrder.coupon_amount;
          this.curOrder.change_goods_amount = this.curOrder.goods_amount;
          this.curOrder.change_order_amount = this.curOrder.order_amount;
          this.curOrder.now_member_discount_amount = this.curOrder.member_discount_amount;
          this.curOrder.change_shipping_fee = this.changeTwoDecimal_f(this.curOrder.shipping_fee / 100);
          this.curOrder.last_shipping_fee = this.changeTwoDecimal_f((this.curOrder.shipping_fee / 100));
          this.curOrder.change_reliefAmount = this.curOrder.change_goods_amount + this.curOrder.shipping_fee - this.curOrder.change_order_amount
          this.nowOrderAmount = this.changeTwoDecimal_f((this.curOrder.order_amount / 100));
          this.lastOrderAmount=this.nowOrderAmount;
          this.calcType=2;
          this.isUpdateOrderPrice=false;
          this.updateOrderPriceIsError=false;
            this.isEdiPriceCommitButton=false;
            this.ediPriceCommitType=false
            this.ediOrderPriceIsCommit=false;
          },

          changePriceSure(){
            this.error.goods_amount_error = false;
            this.error.goods_amount_error_text =  '商品总价必须为大于0的数字';
            if(!this.checkRate(this.goods_amount)){
              this.error.goods_amount_error = true;
              return;
            }
            if(this.goods_amount <=0){
              this.error.goods_amount_error = true;
              return;
            }
            if(this.goods_amount>10000000){
                this.error.goods_amount_error = true;
                this.error.goods_amount_error_text = '商品总价不能超过1000万';
                return;
            }
            var data = {
              orderId:this.curOrder.order_id,
              orderAmount:this.goods_amount
            }
            this.modifyOrderAmount(data).then((res)=>{
                this.dialog1 = false;
                util.msg(res.longMessage)
                this.getPageData(this.pageParams,2);
            })
          },
      //修改价格 修改订单 提交修改数据验证
      checkEdiOrderParams(type,is_commit=false){
        var re=true;
        var nu=0;
        var goods_amount_error_text;
        var goods_amount_error;
        this.error.goods_amount_error = false;
        this.error.goods_amount_error_text = '';
        if((this.nowOrderAmount===null||this.nowOrderAmount===''||this.nowOrderAmount===undefined)&&(type=='orderAmount'||is_commit)){
          re=false;
          this.error.goods_amount_error_text = '订单应收金额不得为空';
          //this.error.goods_amount_error = true;
          return re;
        }
        if(this.curOrder.change_shipping_fee===null||this.curOrder.change_shipping_fee===''||this.curOrder.change_shipping_fee===undefined){
          re=false;
          this.error.goods_amount_error_text = '订单收取配送费不得为空';
          return re;
        }
        if ((this.nowOrderAmount<=0||!this.checkRate(this.nowOrderAmount))&&(type=='orderAmount'||is_commit)) {
          re=false;
          this.error.goods_amount_error_text = '订单价格必须为大于0';
          return re;
        }
        if ((this.nowOrderAmount < this.curOrder.change_shipping_fee)&&type=='orderAmount') {
          re=false;
            this.error.goods_amount_error_text='订单金额应该大于配送费';
          return re;
        }
        this.curOrder.goods_list.forEach(function (goods) {
          if(goods.now_goods_price===null||goods.now_goods_price===''||goods.now_goods_price===undefined){
            re=false;
            goods_amount_error_text = '商品价格不得为空';
            goods_amount_error = true;
            return re;
          }
          if(goods.now_goods_saleprice===''||goods.now_goods_saleprice===undefined||goods.now_goods_saleprice===''){
            re=false;
            goods_amount_error_text = '商品价格不得为空';
            goods_amount_error = true;
            return re;
          }
          if(goods.goods_num===null||goods.goods_num===''||goods.goods_num===undefined){
            re=false;
            goods_amount_error_text = '商品数量不能为空';
            goods_amount_error = true;
            return re;
          }
          nu=nu+goods.goods_num*1;
        })
        if(!re){
          this.error.goods_amount_error_text =goods_amount_error_text;
          //this.error.goods_amount_error = goods_amount_error;
        }else if(nu===0){
          re=false;
          this.error.goods_amount_error_text = '商品数量不能全为0';
          //this.error.goods_amount_error = true;
        }
        return re;
      },
      //还原上次的价格数据
      restoreLastPrice(newVal,oldVal,key,type){
        var newCurOrder=_.clone(this.curOrder);
        //还原v-model数据
        switch (type) {
          case 'goodsPrice':
            newCurOrder.goods_list[key].now_goods_price=oldVal;
            break;
          case 'orderAmount':
            this.nowOrderAmount=oldVal;
            break;
          case 'goodsSaleprice':
            newCurOrder.goods_list[key].now_goods_saleprice=oldVal;
            break;
          case 'changeShippingFee':
            newCurOrder.change_shipping_fee=oldVal;
            break;
          case 'num':
            newCurOrder.goods_list[key].goods_num=oldVal;
            break;
          default:
            break;
        }
        this.curOrder=newCurOrder;
        this.showL =false;
        this.$nextTick(() => {
          this.showL =true;

        });
      },
      //编辑价格获取数据
      ediNowgoodsPrice(newVal,oldVal,key,type) {
        var commitGoodsList = [];
        var newGoods = {};
        var oldGoodsList
        var data;
        this.isUpdateOrderPrice=true;
        this.updateOrderPriceIsError=false;
        if(this.ediOrderPriceIsCommit){
          util.msg('金额计算中。。。');
          return;
        }
        this.ediOrderPriceIsCommit=true;
        //如果输入框为空 则默认0
        if(newVal===''||newVal===undefined||newVal===null){
          this.restoreLastPrice(newVal,0,key,type);
        }
        if(!this.checkEdiOrderParams(type)){
          util.msg(this.error.goods_amount_error_text);
          this.ediOrderPriceIsCommit=false;
          this.updateOrderPriceIsError=true;
          //数量全为0 则还原上次填写的值
          if(type==='num'||this.error.goods_amount_error_text == '订单价格必须为大于0'){
            this.restoreLastPrice(newVal,oldVal,key,type);
          }
          return;
        }
        //需提交的订单信息
        this.curOrder.goods_list.forEach(function (goods) {
          newGoods = {
            goodsId: goods.goods_id,
            goodsCommonId: goods.goods_commonid,
            recId:goods.rec_id,
            goodsNum: goods.goods_num,
            goodsPrice: (goods.now_goods_price>0?goods.now_goods_price:0) * 100,
            goodsSaleprice: (goods.now_goods_saleprice>0?goods.now_goods_saleprice:0) * 100,
          };
          commitGoodsList.push(newGoods);
        })
        //请求数据
        data = {
          orderId: this.curOrder.order_id,
          goodsList: commitGoodsList,
          shippingFee: this.curOrder.change_shipping_fee * 100
        }
        switch (type) {
          case 'goodsPrice':
            data.calcType = 1;
            break;
          case 'orderAmount':
            data.orderAmount = this.nowOrderAmount * 100;
            data.calcType = 2;
            break;
          case 'goodsSaleprice':
          default:
            data.calcType = 3;
            break;
        }
        this.calcType=data.calcType;
        this.getCalcOrderPrice(data).then((res) => {
          if(res.resultCode==1){
            this.nowOrderAmount = (res.responseContent.orderAmount / 100).toFixed(2);
            this.lastOrderAmount=this.nowOrderAmount;
            this.curOrder.now_coupon_amount=res.responseContent.couponAmount;
            this.curOrder.now_member_discount_amount=res.responseContent.memberDiscountAmount;
            oldGoodsList = _.clone(this.curOrder.goods_list);
            res.responseContent.orderGoodsList.forEach(function (newgoods) {
              oldGoodsList.forEach(function (oldgoods) {
                if (newgoods.recId == oldgoods.rec_id) {
                  oldgoods.now_goods_price = (newgoods.goodsPrice/ 100).toFixed(2);
                  oldgoods.now_goods_saleprice = (newgoods.goodsSaleprice / 100).toFixed(2);
                }
              })
            })
            this.curOrder.goods_list=oldGoodsList;
            this.ediOrderPriceIsCommit=false;
              //如果点击过提交按钮 则直接提交修改数据
              if(this.isEdiPriceCommitButton){
                  this.isEdiPriceCommitButton=false;
                  this.changePriceSureNew(this.ediPriceCommitType);
                  this.ediPriceCommitType=false;
              }
          }else{
            util.msg(res.longMessage);
            this.ediOrderPriceIsCommit=false;
            //返回错误，还原上一次未修改前的数据，当返回为订单状态变更无法修改时，还原最初数据
            if(res.resultCode==30175){
              this.restoreLastPrice(newVal,oldVal,key,type);
            }
            this.updateOrderPriceIsError=true;
            //this.restoreLastPrice(newVal,oldVal,key,type);
          }
          this.$forceUpdate();
        }).catch((err)=>{
            util.msg('计算失败，请重新输入');
            this.restoreLastPrice(newVal,oldVal,key,type);
            this.ediOrderPriceIsCommit=false;
        })
      },
      //修改订单 价格编辑 获取数据
      orderEditPrice(newVal,oldVal,key,type) {
        var commitGoodsList = [];
        var newGoods = {};
        var data={};
        var oldGoodsList;
        this.isUpdateOrderPrice=true;
        this.updateOrderPriceIsError=false;
        if(this.ediOrderPriceIsCommit){
          util.msg('金额计算中。。。');
          return;
        }
        //如果输入框为空 则默认0
        if(newVal===''||newVal===undefined||newVal===null){
          this.restoreLastPrice(newVal,0,key,type);
        }
        this.ediOrderPriceIsCommit=true;
        if(!this.checkEdiOrderParams(type)){
          util.msg(this.error.goods_amount_error_text);
          this.ediOrderPriceIsCommit=false;
          this.updateOrderPriceIsError=true;
          //数量全为0 则还原上次填写的值
          if(type==='num'||this.error.goods_amount_error_text == '订单价格必须为大于0'){
            this.restoreLastPrice(newVal,oldVal,key,type);
          }
          return;
        }
        this.curOrder.goods_list.forEach(function (goods) {
          newGoods = {
            goodsId: goods.goods_id,
            goodsCommonId: goods.goods_commonid,
            goodsNum: goods.goods_num,
            recId:goods.rec_id,
            goodsPrice: (goods.now_goods_price>0?goods.now_goods_price:0) * 100,
            goodsSaleprice: (goods.now_goods_saleprice>0?goods.now_goods_saleprice:0) * 100,
          };
          commitGoodsList.push(newGoods);
        })
        data = {
          orderId: this.curOrder.order_id,
          goodsList: commitGoodsList,
          shippingFee: this.curOrder.change_shipping_fee * 100,
          orderAmount: (this.nowOrderAmount>0?this.nowOrderAmount:0) * 100
        }
        switch (type) {
        case 'num':
          case 'goodsPrice':
            data.calcType = 1;
            break;
          case 'orderAmount':
            data.orderAmount = this.nowOrderAmount * 100;
            data.calcType = 2;
            break;
          case 'goodsSaleprice':
          default:
            data.calcType = 3;
            break;
        }
        this.calcType=data.calcType;
        this.getCalcOrder(data).then((res) => {
          if(res.resultCode==1){
            this.nowOrderAmount = (res.responseContent.orderAmount / 100).toFixed(2);
            this.lastOrderAmount=this.nowOrderAmount;
            this.curOrder.now_coupon_amount=res.responseContent.couponAmount;
            this.curOrder.update_goods_amount = res.responseContent.storeTotalGoodsAmount;
            this.curOrder.now_member_discount_amount = res.responseContent.memberDiscountAmount;
            oldGoodsList = _.clone(this.curOrder.goods_list);
            res.responseContent.orderGoodsList.forEach(function (newgoods) {
              oldGoodsList.forEach(function (oldgoods) {
                if (newgoods.recId == oldgoods.rec_id) {
                  oldgoods.now_goods_price = (newgoods.goodsPrice/ 100).toFixed(2);
                  oldgoods.now_goods_saleprice = (newgoods.goodsSaleprice / 100).toFixed(2);
                }
              })
            })
            this.curOrder.goods_list=oldGoodsList;
            this.ediOrderPriceIsCommit=false;
              //如果点击过提交按钮 则直接提交修改数据
              if(this.isEdiPriceCommitButton){
                  this.isEdiPriceCommitButton=false;
                  this.changePriceSureNew(this.ediPriceCommitType);
                  this.ediPriceCommitType=false;
              }
          }else{
            this.ediOrderPriceIsCommit=false;
            util.msg(res.longMessage);
            if(res.resultCode==30175){
              this.restoreLastPrice(newVal,oldVal,key,type);
            }
            this.updateOrderPriceIsError=true;
          }
          this.$forceUpdate();
        }).catch((err)=>{
            util.msg('计算失败，请重新输入');
            this.restoreLastPrice(newVal,oldVal,key,type);
            this.ediOrderPriceIsCommit=false;
        })
      },
      changePriceSureNew(type) {
        var modifyOrderFlag = 0;
        var commitGoodsList = [];
        var newGoods = {};
        var data;
        if(this.ediOrderPriceIsCommit){
            this.isEdiPriceCommitButton=true;
            this.ediPriceCommitType=type;
            util.msg('金额计算中，请稍等。。。');
          return;
        }
        if (this.updateOrderPriceIsError){
          this.updateOrderPriceIsError=false;
          return;
        }
        //数据未修改过不进行提交
        if(!this.isUpdateOrderPrice){
          this.dialog1 = false;
          this.dialog3 = false;
          util.msg('操作成功');
          return;
        }
        this.ediOrderPriceIsCommit=true;
        if(!this.checkEdiOrderParams(type,true)){
          util.msg(this.error.goods_amount_error_text);
          this.ediOrderPriceIsCommit=false;
          return;
        }
        if (type == 'orderInfo') {
          modifyOrderFlag = 1;
        }
        this.curOrder.goods_list.forEach(function (goods) {
          newGoods = {
            goodsId: goods.goods_id,
            goodsCommonId: goods.goods_commonid,
            goodsNum: goods.goods_num,
            recId:goods.rec_id,
            goodsPrice: goods.now_goods_price*100,
            goodsSaleprice: goods.now_goods_saleprice * 100,
          };
          commitGoodsList.push(newGoods);
        })
        data = {
          orderId: this.curOrder.order_id,
          goodsList: commitGoodsList,
          shippingFee: this.curOrder.change_shipping_fee * 100,
          modifyOrderFlag: modifyOrderFlag,
          calcType: this.calcType,
          //calcType:2,
          orderAmount: this.nowOrderAmount * 100
        }
        /* if(this.curOrder.member_discount_amount>0){
           data['calcType']=3;
         }*/
        this.modifyOrderAmountNew(data).then((res) => {
          util.msg(res.longMessage);
          this.ediOrderPriceIsCommit=false;
            this.isEdiPriceCommitButton=false;
            this.ediPriceCommitType=false;
          if(res.resultCode==1){
            //util.msg(res.longMessage);
            this.dialog1 = false;
            this.dialog3 = false;
            this.getPageData(this.pageParams, 2);
          }
          //util.msg(res.longMessage);
        }).catch((err)=>{
            util.msg('数据请求失败');
            this.ediOrderPriceIsCommit=false;
        })
      },
          onlyNumber(type){
            let value ;
            if(type=='goods_amount'){
                value = this.goods_amount
            }else if(type == 'nowOrderAmount'){
                value = this.nowOrderAmount;
            }
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
            if(type=='goods_amount'){
                this.goods_amount = value ;
            }else if(type == 'nowOrderAmount'){
                this.nowOrderAmount = value ;
            }
        },
        //确认收到货款
          recieveGoods(list,l){
            this.error.recieve_goods_error = false;
            this.curOrder = list;
            this.dialog6 = true;
          },
          recieveGoodSure(){
            var data = {
              orderId:this.curOrder.order_id
            }
            this.receivePayment(data).then((res)=>{
              if(res.resultCode == 1){
                this.dialog6 = false;
                this.getPageData(this.pageParams);
              }
              util.msg(res.longMessage)
            })
          },

          //跳转到打印页面
          routerPrint(list){
            this.$router.push('/order/store_receiving/order_print/'+list.order_id);
          },
          //跳转到达达申请
          routerDada(){
            this.$router.push('/store/store_delivery/dada');
          },
          //点击新增按钮
          addNewdiliveryman(){
            this.deliveriers.forEach((deliver)=>{
              deliver.select = false;
              this.curDeliverier = {};
            })
          },

          changeOrder(item){

            this.curOrder = item;
                this.curOrder.change_goods_amount = this.curOrder.goods_amount;
            this.curOrder.update_goods_amount = this.curOrder.goods_amount;
            this.curOrder.change_order_amount = this.curOrder.order_amount;
            //this.curOrder.change_shipping_fee = this.curOrder.shipping_fee;
            this.curOrder.change_shipping_fee = this.changeTwoDecimal_f(this.curOrder.shipping_fee / 100);
            this.curOrder.change_reliefAmount = this.curOrder.change_goods_amount + this.curOrder.shipping_fee - this.curOrder.change_order_amount
            this.curOrder.now_member_discount_amount = this.curOrder.member_discount_amount;
            this.curOrder.now_coupon_amount=this.curOrder.coupon_amount;
            this.curOrder.goods_list.forEach((goodlist, gl) => {
              goodlist.numChangeShow = false;
              goodlist.now_goods_price = this.changeTwoDecimal_f(goodlist.goods_price / 100);
              goodlist.now_goods_saleprice = this.changeTwoDecimal_f(goodlist.goods_saleprice / 100);
              if (goodlist.oldNum && goodlist.oldNum >= 0 && goodlist.oldNum != goodlist.goods_num) {
                goodlist.goods_num = goodlist.oldNum;
              }
            });
            this.nowOrderAmount = this.changeTwoDecimal_f((this.curOrder.order_amount / 100));
            this.lastOrderAmount=this.nowOrderAmount;
            this.dialog3 = true;
            this.calcType=2;
            this.isUpdateOrderPrice=false;
            this.updateOrderPriceIsError=false;
            this.dialogTitle1 = "修改订单";
            this.isEdiPriceCommitButton=false;
            this.ediPriceCommitType=false;
              this.ediOrderPriceIsCommit=false;
          },

          submitChageOrder(){
            if(!this.checkRate(this.nowOrderAmount)){
              util.msg("订单金额输入有误")
              return;
            }
            if(parseFloat(this.nowOrderAmount) <= 0){
              util.msg("订单金额必须大于0")
              return;
            }
            if(this.nowOrderAmount>10000000){
                util.msg("订单金额必须小于等于1000万")
                return;
            }
            if(this.nowOrderAmount.toString().indexOf(".") != -1){
              var length = this.nowOrderAmount.toString().split(".")[1].length
              if(length > 2){
                util.msg("订单金额输入有误")
                return;
              }
            }
            var newOrder = _.clone(this.curOrder);
            newOrder.change_order_amount = this.nowOrderAmount*100;
            this.curOrder = newOrder;

            var isAllBtnClose = true;
            var goodlist = []
            this.curOrder.goods_list.forEach((res) => {
              if(res.numChangeShow){
                isAllBtnClose = false;
              }
              goodlist.push(
                {
                  goodsId	:res.goods_id,
                  goodsCommonId	:res.goods_commonid,
                  goodsNum	:parseInt(res.goods_num)
                }
              );
            });
            if(!isAllBtnClose){
              util.msg("修改数量后请点击确定")
              return
            }
            var data = {
              orderId:this.curOrder.order_id,
              goodsList:goodlist,
              orderAmount:this.curOrder.change_order_amount.toFixed(0)
            }

            this.modifyOrder(data).then((res)=>{
              if(res.resultCode == 1){
                util.msg(res.longMessage)
                this.getPageData(this.pageParams);
                this.dialog3 = false;
              }else{
                util.msg(res.longMessage)
              }
            })

          },

          //切换配送员
          changeDeliver(deliverier,dv){
            this.curDeliverier = deliverier;
            var newDeliveriers = _.clone(this.deliveriers);
            newDeliveriers.forEach((res)=>{
              res.select = false;
              if(res.id == deliverier.id){
                res.select = true;
              }
            })
            this.deliveriers = newDeliveriers;
          },
          //选择配送员
          showDeliveryman(list){
            this.error.diliveryman_error = false;
            this.curOrder = list;
            this.curDeliverier = this.curOrder.extend_deliveryman_log?this.curOrder.extend_deliveryman_log:{};
            this.curDeliverier.id = this.curDeliverier.diliveryman_id;
            this.new_diliveryman = false;
            this.diliveryman_name = '';
            this.diliveryman_tel = '';
            this.dialog4 = true;
            this.deliveriers.forEach((deliver)=>{
              deliver.select = false;
              if(deliver.id == list.diliveryman_id){
                deliver.select = true;
              }
            })
          },

          //选择配送员提交
          changeDiliverymanSure(){
            if(this.curOrder.extend_deliveryman_log.distribution_fee == null || this.curOrder.extend_deliveryman_log.distribution_fee == ''){
              this.error.diliveryman_error = true;
              this.error.diliveryman_error_text = '配送费用不能为空'
              return;
            }
            if(this.new_diliveryman){
              if(!this.diliveryman_name || this.diliveryman_name == ''){
                this.error.diliveryman_error = true;
                this.error.diliveryman_error_text = '配送员姓名不能为空'
                return;
              }
              if(!this.diliveryman_tel||this.diliveryman_tel == ''){
                  this.error.diliveryman_error = true;
                  this.error.diliveryman_error_text = '请输入配送员手机号'
                  return;
              }
              if(!/^1[3456789]\d{9}$/.test(this.diliveryman_tel)){
                  this.error.diliveryman_error = true;
                  this.error.diliveryman_error_text = '请输入正确的手机号码'
                  return ;
              }
            }
            var data = {
              orderId	: this.curOrder.order_id,
              id	: this.curDeliverier.id?this.curDeliverier.id:0,
              distributionFee	:this.curOrder.extend_deliveryman_log.distribution_fee,
              orderType	:1,
              memberMobile:this.diliveryman_tel,
              trueName:this.diliveryman_name,
            }

            if(this.new_diliveryman){
              //新增配送员
              this.addDelivery(data).then((res)=>{
                if(res.resultCode == 1 ){
                  data.id = res.data.memberId
                    //修改配送员
                  this.selectDelivery(data).then((res)=>{
                    if(res.resultCode == 1 ){
                      this.dialog4 = false;
                      this.getPageData(this.pageParams);
                    }
                    this.dialog4 = false;
                    util.msg(res.longMessage)
                  })
                }else{
                  util.msg(res.longMessage)
                }
              })
            }else{
              //修改配送员
              this.selectDelivery(data).then((res)=>{
                if(res.resultCode == 1 ){
                  this.dialog4 = false;
                  this.getPageData(this.pageParams);
                }
                this.dialog4 = false;
                util.msg(res.longMessage)
              })
            }
          },

          //接单
          takeOrder(list){
              var data = {
                memberId:list.buyer_id
              }
              this.isBlacklist(data).then((res)=>{
                if(res.resultCode == 1){
                  list.isBlacklist =res.responseContent.isBlacklist;
                  list.tagNames =res.responseContent.tagNames;
                  this.curOrder = list;
                  this.dialog7 = true;
                }
              })
          },
          takeOrderSure(list){
              var data = {
                orderId:this.curOrder.order_id
              }
              this.orderReceive(data).then((res)=>{
                if(res.resultCode == 1){
                    this.dialog7 = false;
                    this.curOrder = {};
                    util.msg("接单成功");
                    this.getPageData(this.pageParams);
                }else{
                  this.dialog7 = false;
                  util.msg("订单状态已更新");
                  this.getPageData(this.pageParams);
                }
              })
          },
        //   拒单
          unTakeOrder(list){
              this.curOrder = list;
              this.reason = '';
              this.dialog8 = true;
          },
          unTakeOrderSure(){
            this.error.reason_error = false;
            if(this.reason == ''){
                this.error.reason_error = true
                return
            }
            var data = {
                orderId:this.curOrder.order_id,
                message:this.reason
            }
            this.refuseOrder(data).then((res)=>{
                if(res.resultCode == 1){
                  util.msg(res.longMessage);
                    this.dialog8 = false;
                    this.getPageData(this.pageParams);
                }else{
                  util.msg(res.longMessage);
                  this.getPageData(this.pageParams);
                }
            })
          },
          /*待接单倒计时*/
            countDown( maxtime,item,r ){
                var newItem = _.clone(item);
                if(newItem.timer){
                  clearInterval(newItem.timer);
                  delete newItem.timer;
                }
                newItem.timer = setInterval(() => {
                    var minutes,seconds,msg;
                    if(maxtime>=0){
                        minutes = Math.floor(maxtime/60);
                        seconds = Math.floor(maxtime%60);
                        msg = "剩余关闭时间:"+minutes+"分"+seconds+"秒";
                        newItem.maxtime = msg;
                        --maxtime;
                        var  newList = _.clone(this.orderList);
                        newList[r] = newItem;
                        this.orderList = newList;
                    }else{
                        clearInterval(newItem.timer );

                        newItem.state_desc = '已关闭';
                        newItem.hideMenu = true;
                        newItem.maxtime = ''
                        newItem.take_order = false;
                        var  newList = _.clone(this.orderList);
                        newList[r] = newItem;
                        this.orderList = newList;

                        this.getPageData(this.pageParams);
                    }
                }, 1000);
                this.timers.push(newItem.timer);
            },

            //修改订单--点击修改
          numChangeShow(goods,gs){
            var newGoods = _.clone(goods);
            var newOrder = _.clone(this.curOrder);

            newGoods.numChangeShow = true;
            newGoods.oldNum = goods.goods_num;

            newOrder.goods_list[gs] = newGoods;
            this.curOrder = newOrder;
        },

            //修改订单--点击修改--确定
          numChangeSure(goods,gs){

            if(isNaN(parseInt(goods.goods_num))){
              this.layer.msg('请输入整数');
              return;
            }

            var goodlist = []
            this.curOrder.goods_list.forEach((res) => {

              goodlist.push(
                {
                  goodsId	:res.goods_id,
                  goodsCommonId	:res.goods_commonid,
                  goodsNum	:parseInt(res.goods_num)
                }
              );
            });

            var data = {
              orderId:this.curOrder.order_id,
              goodsList:goodlist,
              orderAmount:this.curOrder.change_order_amount.toFixed(0)
            }

            this.getOrderPrice(data).then((res)=>{
              if(res.resultCode == 1){
                var data = res.responseContent;

                var newGoods = _.clone(goods);
                var newOrder = _.clone(this.curOrder);

                newOrder.change_goods_amount = data.goodsTotalAmount;
                newOrder.change_shipping_fee = data.shippingFee;
                newOrder.change_reliefAmount = data.reliefAmount;
                newOrder.change_order_amount = data.orderAmount;
                this.nowOrderAmount = this.changeTwoDecimal_f((data.orderAmount/100));

                newOrder.goods_list[gs] = newGoods;
                newGoods.numChangeShow = false;
                this.curOrder = newOrder;

              }else{
                this.layer.msg(res.longMessage);
                  //自己计算金额
                  var newGoods = _.clone(goods);
                  newGoods.goods_num = goods.oldNum;
                  var newOrder = _.clone(this.curOrder);
                  // newGoods.goods_num = parseInt(newGoods.goods_num).toFixed(0);
                  // newGoods.numChangeShow = false;
                  // //计算金额
                  // var totalPrice = 0;
                  // newOrder.goods_list.forEach((goodlsit,gl)=>{
                  //   var itemPrice = goodlsit.goods_price * goods.goods_num;
                  //   totalPrice += itemPrice;
                  // })
                  // newOrder.change_goods_amount = totalPrice;
                  // newOrder.change_reliefAmount = newOrder.change_goods_amount + newOrder.change_shipping_fee - newOrder.change_order_amount

                  newGoods.numChangeShow = false;
                  newOrder.goods_list[gs] = newGoods;
                  this.curOrder = newOrder;
              }
            })
        },
        //修改订单--点击修改--取消
        numChangeCancle(goods,gs){
            var newGoods = _.clone(goods);
            var newOrder = _.clone(this.curOrder);

            newGoods.numChangeShow = false;
            newGoods.goods_num = goods.oldNum;

            newOrder.goods_list[gs] = newGoods;
            this.curOrder = newOrder;
        }
    },
    filters: {
        f2y: function (value) {
          return (value/100).toFixed(2);
        },

        base64:function(value){
          return Base64.decode(value);
        },

        datetime:function(value){
          return util.dateFormat(new Date(value*1000),'yyyy-MM-dd HH:mm:ss')
        },
      discount_t:function (goods_price,goods_marketprice) {

        if(goods_marketprice==""||goods_marketprice==0){
          return 0;
        }
        let tempVal = parseFloat(Math.round((goods_price/goods_marketprice)*100)/10).toFixed(2)
        //tempVal=Math.ceil(tempVal*10)/10;
        let realVal = tempVal.substring(0, tempVal.length - 1)
        return realVal
      }
      },


    watch:{

    },
    mounted () {

        var _self = this;
          layui.use('laydate', function(){
            var laydate = layui.laydate;
            laydate.render({
                elem: '#query_start_date',
                theme: "#ff8519",
                trigger:'click',
                done: function (value) {
                  var newParams = _.clone(_self.pageParams);
                  newParams.query_start_date = value;
                  _self.pageParams = newParams;
                }
              });
              laydate.render({
                elem: '#query_end_date',
                theme: "#ff8519",
                trigger:'click',
                done: function (value) {
                  var newParams = _.clone(_self.pageParams);
                  newParams.query_end_date = value;
                  _self.pageParams = newParams;
                }
              });

          });
      _self.init();
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.dialog7){
            //接单
            _self.takeOrderSure();
          }else if(_self.dialog8){
            //拒单
            _self.unTakeOrderSure();
          }else if(_self.dialog1){
            //修改价格
            _self.changePriceSure();
          }else if(_self.dialog3){
            //修改订单
            _self.submitChageOrder();
          }else{
            if(_self.canSearch){
              _self.getPageData(_self.pageParams);
            }
          }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
  beforeDestroy(){
    //销毁键盘enter搜索事件
    document.body.removeEventListener('keyup', this.bodyListener);
  },
}
