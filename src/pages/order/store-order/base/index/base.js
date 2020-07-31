import QmTable from 'component/qm-table/index';
import { mapMutations,mapGetters,mapActions } from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import QmTips from "component/qm-tips/index";
import util from 'lib/utils/util'
import QmCheckboxFrame from 'component/qm-checkbox-frame/index';
import * as $ from 'jquery';
import * as _ from 'lodash';
import env from "config/url";
import md5 from 'md5';
import storage from 'lib/utils/storage';
import exportData from 'lib/utils/export';
import QmArea from 'component/qm-area/index';
import {storeOrder} from 'api';
import mainview from 'component/main/main.vue';
import { Base64 } from 'js-base64';

    export default {
        name: "store-order-index",
        data(){
          return{
            bodyListener:'',
            lastGetlistTime:'',
            pageParams:{
              shipping_type:'-1',//订单类型：-1所有类型，1配送订单，2自提订单
              order_state:'-1',//订单状态：-1所有状态，0待付款，1待接单，2待发货，3待到店自提，4配送中，5已送达，6待确认收货，7取消待确认，8取消待确认打款，9已取消，10已关闭
              order_sn:'',
              or_com_type:'-1',//打印状态,-1所有状态，0未打印，1已打印
              date_type:0,//时间类型：0下单时间，1收款时间，2发货时间，3取消/关闭时间，4完成时间
              query_start_date:'',
              query_end_date:'',
              pay_type:'-1',//支付方式：-1所有支付方式，0线上支付，1线下支付，2货到付款
              pay_channel:'-1',//支付渠道，-1所有支付渠道，0微信支付，1支付宝支付，2微信小程序支付
              key_type:'0',//关键词类型：0取件码，1订单序号，2收货人电话，3买家昵称，4发货单号
              keyword:'',
              delivery_type:'-1',//配送方式：-1所有配送方式，0自主配送，1达达配送，2快递配送
              has_coupon:'-1',// 优惠券情况:-1全部，0没有使用优惠券，1有使用优惠券

            deal_state: 0,//发货处理子标签：0待配送，配送中，待自提，已送达（待确认收货），配送异常处理
            make_already_transfer: -1,//打款状态 -1 全部 0已打款 1未打款 2无需打款
            skip_off: 0,
            only_cancel: 0,
            state_type: "all",
            pageIndex: 0,
            pageSize: 15,
            total: 1,
            buyer_id: '',
            only_total: 0,
            lastSearchTime: 0,
          },
          printAddressPageParams: {
            state_type: "state_deal",
            shipping_type: 1,
            deal_state: 0,
            pay_type: '-1',//支付方式：-1所有支付方式，0线上支付，1线下支付，2货到付款
            key_type: '0',
            keyword: '',
            pageIndex: 0,
            pageSize: 5,
            total: 0,
            query_start_date: '',
            query_end_date: '',
            checkAll: false
          },
          printAddressList: {},
          isInit: false,
          isActive: false,
          isActivePrint: false,
          curSearchTypeTxt: '取件码',
          curSearchTypeTxtPrint: '收货人姓名',
          searchTypes: [],
          isDealWithSure:false,//标记是否连续点击
          searchPrintTypes: [
            {name_type: '收货人姓名', key_type: 0},
            {name_type: '订单号', key_type: 1},
            {name_type: '订单序号', key_type: 3},
            {name_type: '收货人电话', key_type: 4},
            {name_type: '买家昵称', key_type: 5},
          ],
          searchOrderStates: [],
          searchDateTypes: [],
          conditionSearch: false,
          showManage: {
            orderSn: false,
            deliveryType: false,
            payType: false,
            keyword: false,
            printState: false,
            dateTime: false,
            dateType: false,
            orderState: false,
            orderType: false,
            timeLabel: false,
            timeRangeLabel: false,
          },
          dialog1: false,//修改金额
          dialog2: false,//提示框
          dialog3: false,//修改订单
          dialog4: false,//选择配送员
          dialog5: false,//处理
          dialog6: false,//确认收到货款
          dialog7: false,//接单
          dialog8: false,//拒单
          dialog9: false,//达达增加小费
          dialog10: false,//达达取消订单确认
          dialog11: false,//达达取消订单
          dialog12: false,//达达取消完成确认
          dialog13: false,//处理达达订单
          dialog14: false,//确认自提
          dialogPrintAddress: false,//批量打印地址
          expressList: {},
          stapleExpressList: [],
          showChoiceExpress: false,
          choiceExpress: false,//选择快递配送
          showStaple: false,
          showAddExpress: false,
          curSendCode: '',//物流单号
          curExpressId: '0',//物流公司id
          curExpressMame: '0',//物流公司名称
          showExpressReset: false,//撤销搜索
          expressKeyword: '',//搜索物流公司名称
          addExpressName: '',//添加物流公司名称
          dialogMessage1: '请选择需要操作的记录',
          dialogTitle1: '提示信息',
          deliveriers: [],//配送员列表,
          curDeliveryFee: 0.00,//当前配送员
          dialog1Success: false,
          dialogPrintAddressSuccess: false,
          showExport: false,
          exportSourceData: {},

          orderList: [],
          orderPrintList: [],
          selected_delivery_mans: {},

          curOrder: {},
          curKey: '',

          goods_amount: 0,
          checkData: [],
          checkAllPage: [],//记录全选的页面
          error: {
            goods_amount_error: false,
            goods_amount_error_text: '商品总价必须为大于0的数字',
            diliveryman_error: false,
            diliveryman_error_text: '配送费用不能为空',
            dealWith_error: false,
            recieve_goods_error: false,
            reason_error: false,
          },

          new_diliveryman: false,
          diliveryman_name: '',
          diliveryman_tel: '',
          before_diliveryman_id: '',//已发货的配送员ID，用于处理如果再次发货，是同一个人不再请求发货，避免重复发短信
          before_diliveryman_fee: '',//已发货的配送费用，用于处理如果再次发货，是同一个人不再请求发货，避免重复发短信
          reason: '',
          tipInfo: [],
          dealWithValue: 1,//处理结果
          dealWithRemark: '',
          isShowDada: true,

          canSearch: false, //由于列表里有计时器，为了防止快速点击导致计时器错乱，在点击后到请求接口接口结束前不能再点击
          timers: [],

          //达达
          dadaState: 'all',
          dada_shop: [],
          currentOrderId: '',
          pstate_type: '',
          cancelDadaOrderInfo: [],
          currentType: 0,//0发货 1重新发货
          cancelWarn: false,//是否展示警告
          currentContent: '',//处理弹框对应的友情提示内容'
          nowTime: 0,
          warningTime: 0,
          handleDisabled: true,
          hideConfirm: false,//发货确定按钮关闭
          nowOrderAmount: '',
            lastOrderAmount:'',
          firstDadaList: [],
          calcType: 2,
            isUpdateOrderPrice:false,//修改订单或者价格 标记价格是否变动过
            updateOrderPriceIsError:false,//标记修改订单或者价格是否抛出错误  主要用于防止直接提交订单 会出现吐丝2次问题
            ediOrderPriceIsCommit:'',//用于标记是否处于计算金额中
            lastEvent:false,//用于记录修改订单或者修改价格获得焦点框的对象
            isEdiPriceCommitButton:false,//标记修改价格或者修改订单是否点击提交按钮
            ediPriceCommitType:false,//修改订单或者价格提交类型
            showL:true,//用于做强制渲染
          storeId: '',
          curSelectDeliverIndex: -1,//当前选中的配送员

          isFaHuo: false,
          searchTime: 0,
          fromUser: 0,
          showChangeAddress: false,
          addressInfo: {
            province: '',
            city: '',
            district: '',
            subaddress: '',
            reciver_name: '',
            phone: '',
            order_id: 0,
            colorList: [],
          }
        }
      },
      components: {
        QmTable,
        QmPagination,
        QmTips,
        QmCheckboxFrame,
        QmArea,
        mainview,
      },
      computed: {
        ...mapGetters('storeOrder', {
          state_type: 'getState_type'
        }),
        ...mapGetters({
          getSideMenuOrderClick: "getSideMenuOrderClick",
          isReceiveOrder: 'getIsReceiveOrder',
        }),
        ...mapGetters('storeReceiving', {
          print_type: 'getState_type'
        }),
        ...mapGetters({
          basicStore: 'getBasicStore',
        }),
        ...mapGetters({
          getOrderTips: "getOrderTips"
        }),
      },
      methods: {
        ...mapMutations('storeOrder', {
          setState_type: 'setState_type',
        }),
        ...mapActions('inventoryWarning', {
          isInventoryWarning: 'isInventoryWarning'
        }),
        ...mapActions('storeOrder', {
          getList: 'getList',
          modifyOrderAmount: 'modifyOrderAmount',
          modifyOrderAmountNew: 'modifyOrderAmountNew',
          modifyOrder: 'modifyOrder',
          getOrderPrice: 'getOrderPrice',
          makeAlreadyTransfer: 'makeAlreadyTransfer',
          getDeliveriers: 'getDeliveriers',
          getDiliverymanList: 'getDiliverymanList',
          applyConfirm: 'applyConfirm',
          receivePayment: 'receivePayment',
          selectDelivery: 'selectDelivery',
          addDelivery: 'addDelivery',
          addDadaOrder: 'addDadaOrder',
          getAddTips: 'getAddTips',
          addTips: 'addTips',
          getCancelDadaOrder: 'getCancelDadaOrder',
          cancelDadaOrder: 'cancelDadaOrder',
          reDadaOrder: 'reDadaOrder',
          isBlacklist: 'isBlacklist',
          excconfirmDadaOrder: 'excconfirmDadaOrder',
          confirmDadaOrder: 'confirmDadaOrder',
          getApplyConfirm: 'getApplyConfirm',
          dadaList: 'getDadaList',
          rePreOrder: 'rePreOrder',
          getExpressList: 'getExpressList',
          addNewExpressList: 'addNewExpressList',
          orderApplySend: 'orderApplySend',
          confirmGetBySelf: 'confirmGetBySelf',
          getCalcOrderPrice: 'getCalcOrderPrice',
          getCalcOrder: 'getCalcOrder',
        }),
        ...mapActions('storeReceiving', {
          orderReceive: 'orderReceive',
          refuseOrder: 'refuseOrder',
        }),
        areaValueChange(data) {
          if (data.level == 'province') {
            this.addressInfo.city = '';
            this.addressInfo.district = '';
            this.addressInfo.province = data.value
          }
          if (data.level == 'city') {
            this.addressInfo.district = '';
            this.addressInfo.city = data.value
          }
          if (data.level == 'district') {
            this.addressInfo.district = data.value
          }
        },
        getCssStyle(color) {
          var styleStr = 'font-size: 13px;';
          if (color) {
            styleStr += 'background-color: ' + this.colorList[color] + ';color:#fff;';
          }
          return styleStr;
        },
        changeAddress(item) {
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
        confirmChangeAddress() {
          if ('' == this.addressInfo.reciver_name) {
            layer.msg('请填写收货人姓名');
            return;
          }
          if ('' == this.addressInfo.phone) {
            layer.msg('请填写收货电话');
            return;
          }
          if (!(/1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.addressInfo.phone) || /^\d{7,8}$/.test(this.addressInfo.phone))) {
            layer.msg('收货电话格式不正确');
            return;
          }
          if ('' == this.addressInfo.province) {
            layer.msg('请选择收货地址所在省');
            return;
          }
          if ('' == this.addressInfo.city) {
            layer.msg('请选择收货地址所在市');
            return;
          }
          if ('' == this.addressInfo.district) {
            layer.msg('请选择收货地址所在区/县');
            return;
          }
          if ('' == this.addressInfo.subaddress) {
            layer.msg('请填写详细地址');
            return;
          }
          storeOrder.modifyAddress(this.addressInfo).then((res) => {
            layer.msg(res.shortMessage)
            if (res.resultCode == 1) {
              this.getPageData(this.pageParams)
              this.showChangeAddress = false;
            }
          })
        },
        closeChangeAddress() {
          this.showChangeAddress = false;
        },
        scrollEvent() {
        },
        confirmExport() {
          this.getExcel()
        },
        exportData() {
          if (this.pageParams.total == 0) {
            layer.msg('暂无数据可导出')
            return;
          }
          if (this.pageParams.total > 10000) {
            this.showExport = true;
          } else {
            this.showExport = false;
            this.getExcel()
          }
        },
        getExcel() {
          this.showExport = false;
          layer.msg('正在导出，请稍后...')
          var newData = _.clone(this.pageParams);
          newData.skip_off = newData.skip_off || newData.skip_off == 1 ? 1 : 0;
          newData.only_cancel = newData.only_cancel || newData.only_cancel == 1 ? 1 : 0;
          newData.dadaState = this.dadaState;
          if (newData.state_type != 'all') {
            newData.skip_off = 0;
          }

          if (this.$route.params.hasOwnProperty('actId')) {
            newData.sale_act_id = this.$route.params.actId
          }
          if (this.$route.params.hasOwnProperty('isToday')) {
            newData.is_today = this.$route.params.isToday
          }
          if (this.$route.params.hasOwnProperty('orderSn') && this.$route.params.orderSn != undefined) {
            newData.order_sn = this.$route.params.orderSn
          }
          newData.export = 1;
          this.getList(newData).then((res) => {
            if (res.resultCode == 1) {
              exportData.exportExcelNew(res.responseContent);
            }
          })
        },
        changeShipping(event) {
          this.pageParams.order_state = -1
          this.pageParams.delivery_type = -1
        },
        initPageFilter() {
          if (this.pageParams.state_type == 'index' || this.pageParams.state_type == 'all') {
            this.setDealSearchTypes(-1);
          } else if (this.pageParams.state_type == 'state_deal') {
            this.setDealSearchTypes(0);
          } else if (this.pageParams.state_type == 'state_cancel_wait_confirm') {
            this.setDealSearchTypes(20);
          } else if (this.pageParams.state_type == 'state_receive_money') {
            this.setDealSearchTypes(30);
            this.setSearchDateTypes(30);
            this.setSearchOrderStates(30);
          } else if (this.pageParams.state_type == 'state_make_money') {
            this.setDealSearchTypes(40);
            this.setSearchDateTypes(40);
          }
        },
        comFromFavoritesStore(type) {
          //从店铺会员页面过来，要进行一些筛选条件处理
          if (this.searchTime == 2 && type !== 3) {
            storage.remove('searchType');
            storage.remove('member_id');
            storage.remove('beginTime');
            storage.remove('endTime');
          }
          if (storage.get('searchType')) {
            var searchType = storage.get('searchType');
            var memberId = storage.get('member_id');
            var beginTime = storage.get('beginTime');
            var endTime = storage.get('endTime');
            this.pageParams.buyer_id = memberId;
            if (searchType == 2) {
              //如果按购买时间进行条件搜索，则打开的订单列表页面是用用户信息和下单时间进行条件搜索
              this.pageParams.query_start_date = beginTime;
              this.pageParams.query_end_date = endTime;
            }
            this.conditionSearch = true;
            if (type !== 3) {
              this.searchTime += 1;
            }
          }
        },
        setSearchOrderStates(state) {
          let search_order_states = [];
          if (state == 30) {
            //待收款
            search_order_states = ['待发货', '待到店自提', '配送中', '已送达', '待确认收货', '取消待确认', '取消待确认打款', '已取消', '已关闭']
          }
          this.searchOrderStates = search_order_states;
        },
        setSearchDateTypes(state) {
          let search_date_types = []
          if (state == -1) {
            search_date_types = ['下单时间', '收款时间', '发货时间', '取消/关闭时间', '完成时间']
          } else if (state == 1) {
            search_date_types = ['下单时间', '发货时间']
          } else if (state == 2) {
            search_date_types = ['下单时间', '预计自提时间']
          } else if (state == 3) {
            search_date_types = ['下单时间', '发货时间', '送达时间', '确认自提时间']
          } else if (state == 4) {
            search_date_types = ['下单时间', '发货时间']
          } else if (state == 30) {
            //待收款
            search_date_types = ['下单时间', '发货时间', '完成时间']
          } else if (state == 40) {
            //待打款
            search_date_types = ['下单时间', '发货时间', '取消/关闭时间']
          }
          this.searchDateTypes = search_date_types
        },
        setDealSearchTypes(state) {
          let search_types = [];
          this.pageParams.key_type = 0;
          if (state == -1) {
            //所有订单
            this.curSearchTypeTxt = '取件码';
            search_types = ['取件码', '订单序号', '收货人电话', '买家昵称', '发货单号']
            this.curSearchTypeTxt = '收货人姓名';
            search_types = ['收货人姓名', '取件码', '订单序号', '收货人电话', '买家昵称', '发货单号', '配送员']
          } else if (state == 0) {
            this.curSearchTypeTxt = '收货人姓名';
            search_types = ['收货人姓名', '订单号', '取件码', '订单序号', '收货人电话', '买家昵称'];
          } else if (state == 1) {
            this.curSearchTypeTxt = '收货人姓名';
            search_types = ['收货人姓名', '订单号', '取件码', '订单序号', '收货人电话', '买家昵称', '配送员', '发货单号'];
          } else if (state == 2) {
            this.curSearchTypeTxt = '收货人姓名';
            search_types = ['收货人姓名', '订单号', '取件码', '订单序号', '收货人电话', '买家昵称'];
          } else if (state == 3) {
            this.curSearchTypeTxt = '收货人姓名';
            search_types = ['收货人姓名', '订单号', '取件码', '订单序号', '收货人电话', '买家昵称', '配送员', '发货单号'];
          } else if (state == 4) {
            this.curSearchTypeTxt = '收货人姓名';
            search_types = ['收货人姓名', '订单号', '订单序号', '收货人电话', '买家昵称', '配送员'];
          } else if (state == 20) {
            //取消待确认
            this.curSearchTypeTxt = '收货人姓名';
            search_types = ['收货人姓名', '订单号', '取件码', '订单序号', '收货人电话', '买家昵称', '配送员', '发货单号'];
          } else if (state == 30) {
            //待付款
            this.curSearchTypeTxt = '收货人姓名';
            search_types = ['收货人姓名', '订单号', '取件码', '订单序号', '收货人电话', '买家昵称', '配送员', '发货单号'];
          } else if (state == 40) {
            //待打款
            this.curSearchTypeTxt = '收货人姓名';
            search_types = ['收货人姓名', '订单号', '取件码', '订单序号', '收货人电话', '买家昵称', '配送员', '发货单号'];
          }
          this.searchTypes = search_types;
        },
        changeDealState(state) {
          this.clearAll()
          this.setDealSearchTypes(state)
          this.setSearchDateTypes(state)
          var newParams = _.clone(this.pageParams);
          newParams.deal_state = state;
          this.printAddressPageParams.deal_state = state;
          this.pageParams = newParams;
          this.getPageData(this.pageParams);
          this.isInventoryWarning();
        },
        checkConditionSearch() {
          if (this.pageParams.shipping_type != '-1') {
            this.conditionSearch = true;
          }
          if (this.pageParams.order_state != '-1') {
            this.conditionSearch = true;
          }
          if (this.pageParams.order_sn != '') {
            this.conditionSearch = true;
          }
          if (this.pageParams.or_com_type != '-1') {
            this.conditionSearch = true;
          }
          if (this.pageParams.date_type != 0) {
            this.conditionSearch = true;
          }
          if (this.pageParams.query_start_date != '') {
            this.conditionSearch = true;
          }
          if (this.pageParams.query_end_date != '') {
            this.conditionSearch = true;
          }
          if (this.pageParams.pay_type != '-1') {
            this.conditionSearch = true;
          }
          if (this.pageParams.pay_channel != '-1') {
            this.conditionSearch = true;
          }
          if (this.pageParams.key_type != '0') {
            this.conditionSearch = true;
          }
          if (this.pageParams.keyword != '') {
            this.conditionSearch = true;
          }
          if (this.pageParams.delivery_type != '-1') {
            this.conditionSearch = true;
          }
          if (this.pageParams.has_coupon != '-1') {
            this.conditionSearch = true;
          }
        },
        resetFilter() {
          Object.keys(this.showManage).forEach(item => {
            this.showManage[item] = false;
          })
        },
        initFilter() {
          this.resetFilter();
          if (this.pageParams.state_type == 'index' || this.pageParams.state_type == 'all' || this.pageParams.state_type == '') {
            return;
          }
          if (this.pageParams.state_type == 'state_wait') {
            this.showManage.dateTime = true;
            this.showManage.timeLabel = true;
            this.showManage.orderSn = true;
          } else if (this.pageParams.state_type == 'state_new') {
            this.showManage.orderSn = true;
          } else if (this.pageParams.state_type == 'state_deal') {
            if (this.pageParams.deal_state == 0) {
              this.showManage.dateTime = true
              this.showManage.timeLabel = true
              this.showManage.printState = true
              this.showManage.keyword = true
            } else if (this.pageParams.deal_state == 2 || this.pageParams.deal_state == 3) {
              this.showManage.dateType = true
              this.showManage.dateTime = true
              this.showManage.timeRangeLabel = true
              this.showManage.keyword = true
            } else if (this.pageParams.deal_state == 1 || this.pageParams.deal_state == 4) {
              this.showManage.dateType = true
              this.showManage.dateTime = true
              this.showManage.timeRangeLabel = true
              this.showManage.keyword = true
              this.showManage.deliveryType = true
              if (this.pageParams.deal_state == 4) {
                this.showManage.deliveryType = false
              }
            }
          } else if (this.pageParams.state_type == 'state_cancel_wait_confirm') {
            this.showManage.dateTime = true
            this.showManage.timeLabel = true
            this.showManage.printState = true
            this.showManage.keyword = true
          } else if (this.pageParams.state_type == 'state_receive_money') {
            this.showManage.orderType = true
            this.showManage.orderState = true
            this.showManage.printState = true
            this.showManage.dateType = true
            this.showManage.dateTime = true
            this.showManage.timeRangeLabel = true
            this.showManage.keyword = true
            this.showManage.payType = true
          } else if (this.pageParams.state_type == 'state_make_money') {
            this.showManage.orderType = true
            this.showManage.printState = true
            this.showManage.keyword = true
            this.showManage.dateType = true
            this.showManage.dateTime = true
            this.showManage.timeRangeLabel = true
          }
        },
        reset() {
          this.clearAll();
          this.getPageData(this.pageParams);
        },
        resetPrint() {
          this.printAddressPageParams.pay_type = -1;
          //this.printAddressPageParams.key_type=0;
          this.printAddressPageParams.keyword = '';
          this.printAddressPageParams.pageIndex = 0;
          this.printAddressPageParams.pageSize = 5;
          this.printAddressPageParams.total = 1;
          this.printAddressPageParams.query_start_date = '';
          this.printAddressPageParams.checkAll = false;
          this.printAddressPageParams.query_end_date = '';
          if (document.querySelector('#quan')) {
            document.querySelector('#quan').checked = false;
          }
          //this.checkData=[];
          this.checkAllPage = [];
          this.getPagePrintData(this.printAddressPageParams);
        },
        closePrint() {
          this.printAddressPageParams.pay_type = -1;
          //https://zen.shenbd.com/zentao/bug-view-9872.htmlthis.printAddressPageParams.key_type=0;
          this.printAddressPageParams.keyword = '';
          this.printAddressPageParams.pageIndex = 0;
          this.printAddressPageParams.pageSize = 5;
          this.printAddressPageParams.total = 1;
          this.printAddressPageParams.query_start_date = '';
          this.printAddressPageParams.query_end_date = '';
          this.printAddressPageParams.checkAll = false;
          if (document.querySelector('#quan')) {
            document.querySelector('#quan').checked = false;
          }
          this.checkData = [];
          this.checkAllPage = [];
          this.dialogPrintAddress = false
        },
        changeAllChecked: function (e) {
          var checkObj = document.querySelectorAll('.checkItem'); // 获取所有checkbox项
          if (e.target.checked) { // 判定全选checkbox的勾选状态
            for (var i = 0; i < checkObj.length; i++) {
              if (!checkObj[i].checked) { // 将未勾选的checkbox选项push到绑定数组中
                this.checkData.push(parseInt(checkObj[i].value));
              }
            }
            this.printAddressPageParams.checkAll = true;
            if (this.checkAllPage.indexOf(this.printAddressPageParams.pageIndex) < 0) {
              this.checkAllPage.push(this.printAddressPageParams.pageIndex);
            }
          } else { // 如果是去掉全选则清空checkbox选项绑定数组
            var checkDataIndex = -1;
            for (var i = 0; i < checkObj.length; i++) {
              checkDataIndex = this.checkData.indexOf(parseInt(checkObj[i].value));
              if (checkDataIndex >= 0) {
                this.checkData.splice(checkDataIndex, 1)
              }
            }
            //this.checkData = [];
            this.printAddressPageParams.checkAll = false;
            if (this.checkAllPage.indexOf(this.printAddressPageParams.pageIndex) >= 0) {
              this.checkAllPage.splice(this.checkAllPage.indexOf(this.printAddressPageParams.pageIndex), 1);
            }
          }
        },
        changeChecked: function (e) {
          var checkObj = document.querySelectorAll('.checkItem');
          if (e.target.checked) { // 判定全选checkbox的勾选状态
            var checkDataIndex = -1;
            for (var i = 0; i < checkObj.length; i++) {
              if (checkObj[i].value != e.target.value) {
                if (!checkObj[i].checked) {
                  return false;
                }
              }
            }
            document.querySelector('#quan').checked = true;
            this.printAddressPageParams.checkAll = true;
            if (this.checkAllPage.indexOf(this.printAddressPageParams.pageIndex) < 0) {
              this.checkAllPage.push(this.printAddressPageParams.pageIndex);
            }
          } else { // 如果是去掉全选则清空checkbox选项绑定数组
            /*var checkDataIndex=-1;
              for(var i=0;i<checkObj.length;i++){
                if(checkObj[i].value!=e.target.value){
                  checkDataIndex = this.checkData.indexOf(checkObj[i].value);
                  if(checkDataIndex>=0){
                    return false;
                  }
                }
              }*/
            if (document.querySelector('#quan')) {
              document.querySelector('#quan').checked = false;
            }
            this.printAddressPageParams.checkAll = false;
            if (this.checkAllPage.indexOf(this.printAddressPageParams.pageIndex) >= 0) {
              this.checkAllPage.splice(this.checkAllPage.indexOf(this.printAddressPageParams.pageIndex), 1);
            }
          }
        },
        clearAll() {
          this.conditionSearch = false;
          var newParams = _.clone(this.pageParams);
          newParams.shipping_type = '-1';
          let from_portal = storage.get('portal_wait_pay');
          if (from_portal != 1) {
            newParams.order_state = '-1';
          } else {
            storage.set('portal_wait_pay', 0)
          }
          newParams.order_sn = '';
          newParams.or_com_type = '-1';
          newParams.date_type = 0;
          newParams.query_start_date = '';
          newParams.query_end_date = '';
          newParams.pay_type = '-1';
          newParams.pay_channel = '-1';
          newParams.make_already_transfer = -1;
          //    newParams.key_type = '0';
          newParams.keyword = '';
          newParams.delivery_type = '-1';
          newParams.has_coupon = '-1';
          newParams.pageIndex = 0;
          newParams.pageSize = 15;
          newParams.total = 1;
          newParams.only_cancel = 0;
          newParams.skip_off = 0;
          this.pageParams = newParams;
        },
        showToggle(idx) {
          let newList = _.clone(this.orderList);
          newList[idx].toggle = !newList[idx].toggle
          this.orderList = newList
        },
        changeKeyType(type, txt) {
          this.pageParams.key_type = type
          this.curSearchTypeTxt = txt

        },
        changeKeyTypePrint(k, type) {
          this.printAddressPageParams.key_type = type.key_type
          this.curSearchTypeTxtPrint = type.name_type

        },
        openGoods(goodsCommonId) {
          let routeData = this.$router.resolve({
            name: "store_goods_add_step_two",
            params: {commonId: goodsCommonId}
          });
          window.open(routeData.href, '_blank');
        },
        changeDadaState(state) {
          //清空查询状态
          var newParams = _.clone(this.pageParams);
          newParams.query_start_date = "";
          newParams.query_end_date = "";
          newParams.or_com_type = "-1";
          newParams.shipping_type = "-1";
          newParams.order_sn = "";
          newParams.pageIndex = 0;
          newParams.pageSize = 15;
          newParams.total = 1;
          newParams.only_cancel = 0;
          newParams.skip_off = 0;
          newParams.make_already_transfer = -1;
          this.pageParams = newParams;

          this.dadaState = state;
          this.getPageData(this.pageParams);
        },
        searchData() {
          this.checkConditionSearch();
          $('select').blur();
          if (!this.canSearch) {
            return false;
          }
          //搜索按钮，页数置为1
          var newParams = _.clone(this.pageParams);
          var start_date = new Date(newParams.query_start_date.replace(/-/g, '/'));
          var end_date = new Date(newParams.query_end_date.replace(/-/g, '/'));
          if (end_date < start_date) {
            util.msg('结束时间不能小于开始时间')
            return false;
          }
          newParams.pageIndex = 0;
          newParams.pageSize = 15;
          newParams.total = 1;
          this.pageParams = newParams;
          this.getPageData(this.pageParams);
        },
        searchPrintData() {
          //搜索按钮，页数置为1
          var newPrintAddressPageParams = _.clone(this.printAddressPageParams);
          newPrintAddressPageParams.pageIndex = 0;
          //newPrintAddressPageParams.pageSize = 15;
          //newPrintAddressPageParams.total = 1;
          this.printAddressPageParams = newPrintAddressPageParams;
          //this.checkData = [];
          this.checkAllPage = [];
          if (document.getElementById("quan")) {
            document.getElementById("quan").checked = false;
          }
          this.getPagePrintData(this.printAddressPageParams);
        },
        init() {
          if (this.pstate_type != 'index') {
            $("#" + this.pstate_type).click
          }
          if (this.$route.params.hasOwnProperty('orderState') && this.$route.params.orderState == 1) {
            this.pageParams.order_state = 0;
          }
          var newParams = _.clone(this.pageParams);
          newParams.state_type = this.pstate_type;
          newParams.dadaState = this.dadaState;

          this.initPageFilter();
          this.getPageData(newParams, 0, 'init');

          this.getDeliveriers().then((res) => {
            this.deliveriers = res.responseContent
          })
          this.dadaList().then((res) => {
            this.firstDadaList = res;
          });
        },

        changeSkipOff(event) {
          if (event.target.checked) {
            this.pageParams.only_cancel = false;
            this.pageParams.pageIndex = 0;
          }
          this.getPageData(this.pageParams);

        },
        changeOnlyCancel(event) {
          if (event.target.checked) {
            this.pageParams.skip_off = false;
            this.pageParams.pageIndex = 0;
          }
          this.getPageData(this.pageParams);
        },
        //标记为已打款
        signMakeAlreadyTransfer(list, key) {
          this.curOrder = list;
          this.curKey = key;
          var data = {
            order_id: list.order_id
          }
          this.makeAlreadyTransfer(data).then((res) => {
            util.msg("操作成功")
            if (res.resultCode == 1) {
              this.getPageData(this.pageParams, 2);
            }
          })
        },
        //确认收到货款
        recieveGoods(list, key) {
          this.error.recieve_goods_error = false;
          this.curOrder = list;
          this.curKey = key,

            this.dialog6 = true;
        },
        //确认自提
        getOrderBySelf(list, key) {
          this.error.recieve_goods_error = false;
          this.curOrder = list;
          this.curKey = key,
            this.dialog14 = true;
        },
        getOrderBySelfSure() {
          var data = {
            orderId: this.curOrder.order_id
          }
          this.confirmGetBySelf(data).then((res) => {
            if (res.resultCode == 1) {
              this.dialog14 = false;
              this.getPageData(this.pageParams, 2);
            }
            util.msg(res.shortMessage)
          })
        },
        recieveGoodSure() {
          var data = {
            orderId: this.curOrder.order_id
          }
          this.receivePayment(data).then((res) => {
            if (res.resultCode == 1) {
              this.dialog6 = false;
              this.getPageData(this.pageParams, 2);
            }
            util.msg(res.longMessage)
          })
        },
        formatNumber(n) {
          n = n.toString();
          return n[1] ? n : '0' + n
        },
        formatDate(number, format) {
          var _self = this;
          var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
          var returnArr = [];

          var date = new Date(number * 1000);
          returnArr.push(date.getFullYear());
          returnArr.push(_self.formatNumber(date.getMonth() + 1));
          returnArr.push(_self.formatNumber(date.getDate()));

          returnArr.push(_self.formatNumber(date.getHours()));
          returnArr.push(_self.formatNumber(date.getMinutes()));
          returnArr.push(_self.formatNumber(date.getSeconds()));

          for (var i in returnArr) {
            format = format.replace(formateArr[i], returnArr[i]);
          }
          return format;
        },
        //处理
        dealWith(list, key) {
          //打开前提示语先置空，不然不同的提示语会闪现问题
          if (this.currentContent.content) {
            this.currentContent.content = '';
          }
          this.isDealWithSure=false;
          this.getApplyConfirm({orderId: list.order_id}).then((res) => {
            if (res.resultCode == 1) {
              this.currentContent = res.responseContent;
              if (this.currentContent.content == '' || this.currentContent.content == undefined || this.currentContent.content == null) {
                if (list.order_amount > 0) {
                  if (list.payment_type == 2 || list.payment_type == 0) {
                    //线下支付/货到付款
                    this.currentContent.content = '友情提示：退款款项需要进行线下协商打款';
                  } else {
                    //线上支付且非支付当日
                    var nowDate = this.formatDate(parseInt(new Date().getTime() / 1000), 'Y-M-D');
                    var paymentData = this.formatDate(list.payment_time, 'Y-M-D');
                    if (nowDate != paymentData) {
                      this.currentContent.content = '友情提示：非对应订单交易日，退款款项需要进行线下协商打款';
                    }
                  }
                }
              }
            }
          })
          this.error.dealWith_error = false;
          this.dealWithValue = 1;
          this.dealWithRemark = '';
          this.curOrder = list;
          this.curKey = key;
          this.dialog5 = true;
        },
        changeAgree() {
          var isAgree = $("[name='isAgree']:checked").val();
          var content = $("[name='promotion_info']").val().trim();
          if (isAgree == 0 && content == '') {
            this.handleDisabled = false;
            $('.error-warn').text('请输入拒绝理由');
          } else {
            this.handleDisabled = true;
            $('.error-warn').text('');
          }
        },
        changeMark(e) {
          var el = e.currentTarget;
          if (this.currentContent.status == 5 && this.handleDisabled) {
            return false;
          }
          var content = $(el).val().trim();
          if (content != '') {
            $('.error-warn').text('');
          }

        },
        //处理--确定
        dealWithSure() {
          if(this.isDealWithSure){
            console.log('频繁提交1');
            util.msg('频繁提交');
            return false;
          }else{
            console.log('频繁提交2');
            this.isDealWithSure=true;
          }
          if (this.dealWithValue == 0 || this.dealWithValue == '0') {
            if (this.dealWithRemark == '') {
              this.error.dealWith_error = true;
              this.isDealWithSure=false;
              return;
            }
          }

          var data = {
            orderId: this.curOrder.order_id,
            isAgree: this.dealWithValue,
            promotionInfo: this.dealWithRemark
          }
            this.applyConfirm(data).then((res) => {

              if (res.resultCode == 1) {
                this.dialog5 = false;
                this.isDealWithSure=false;
                this.getPageData(this.pageParams, 2);
              } else {

              }
              if (res.responseContent != '' && res.responseContent != null && res.responseContent != undefined) {
                util.msg(res.responseContent)
              } else {
                util.msg(res.longMessage)
              }

            })
        },

        //跳转到打印页面
        routerPrint(list, printContent = 'all') {
          // 旧方法
          // let routeData = this.$router.resolve({
          //     path: '/order/store_receiving/order_print/'+list.order_id
          // });
          // window.open(routeData.href, '_blank');
          // window.open(window.location.origin+window.location.pathname+'print.html?order_id'+list.order_id, '_blank');
          // 第二入口方式
          // var url = window.location.origin+window.location.pathname+'print.html#/order/store_receiving/order_print/'+list.order_id;
          // window.open(url, '_blank');
          // 调用旧网站方法
          // var url = "http://testadmin.shenbd.com/mall/index.php?c=store_receiving&a=order_print&order_id="+list.order_id
          // window.open(url, '_blank');
          var print_type = ""
          if (this.basicStore.printType == 1) {
            print_type = 'normal'
          } else {
            print_type = 'xiaopiao'
          }
          var key = storage.get("key")
          var site_url = env.printUrl;
          var timestamp = Math.floor(new Date().getTime() / 1000);
          var secret = '~!@#$`1234qwertasdfgzxcvb';
          var sign_arg = md5(list.store_id.toString() + list.order_id.toString() + timestamp.toString() + secret);
          if (printContent == 'address') {
            var print_url = site_url + '?c=store_receiving&a=order_print_batch&store_id=' + list.store_id
              + '&order_id=' + list.order_id + '&timestamp=' + timestamp + '&sign=' + sign_arg + '&key=' + key + '&print_type=' + print_type + '&print_content=' + printContent;
          } else {
            var print_url = site_url + '?c=store_receiving&a=order_print&store_id=' + list.store_id
              + '&order_id=' + list.order_id + '&timestamp=' + timestamp + '&sign=' + sign_arg + '&key=' + key + '&print_type=' + print_type + '&print_content=' + printContent;
          }
          window.open(print_url, '_blank');

        },
        closeDialog4() {
          this.dialog4 = false
          this.clearSelectExpress()
        },
        clearSelectExpress() {
          this.curExpressId = '0'
          this.curExpressMame = ''
          this.curSendCode = ''
        },
        selectExpress(item) {
          this.curExpressId = item.e_id
          this.curExpressMame = item.e_name
          if (this.showChoiceExpress) {
            this.showChoiceExpress = false
          }

        },
        closeChoiceExpress() {
          this.showChoiceExpress = false
          this.showAddExpress = false
          this.addExpressName = ''
        },
        addExpress() {
          if (this.addExpressName === '') {
            layer.msg('请输入需要快递/物流公司名称')
          }
          let data = {
            name: this.addExpressName
          }
          this.addNewExpressList(data).then((res) => {
            if (res.resultCode == 1) {
              this.curExpressId = res.responseContent.e_id
              this.curExpressMame = res.responseContent.e_name
              this.addExpressName = ''
              this.showChoiceExpress = false
              this.showAddExpress = false
            } else {
              layer.msg(res.longMessage)
            }
          });
        },
        openExpress() {
          this.resetExpress()
          this.showChoiceExpress = !this.showChoiceExpress
          if (this.showChoiceExpress) {
            this.$nextTick(() => {
              document.querySelector('#express-content').scrollTop = 0;
            })
          }
        },
        resetExpress() {
          this.expressKeyword = '';
          this.showExpressReset = false
          this.searchExpress()
        },
        confirmSearchExpress() {
          if (this.expressKeyword != '')
            this.showExpressReset = true
          this.searchExpress()
        },
        searchExpress() {
          let data = {
            name: this.expressKeyword
          }
          this.getAllExpressList(data)
        },
        getAllExpressList(data) {
          this.getExpressList(data).then((res) => {
            if (res.resultCode == 1) {
              this.expressList = res.responseContent.expressList;
              this.stapleExpressList = res.responseContent.stapleExpressList
            }
          });
        },
        //跳转到达达申请
        routerDada() {
          this.$router.push('/store/store_delivery/dada');
        },

        //切换配送员
        changeDeliver(deliverier, dv) {
          this.curDeliverier = deliverier;
          var newDeliveriers = _.clone(this.deliveriers);
          newDeliveriers.forEach((res) => {
            res.select = false;
            if (deliverier && res.id == deliverier.id) {
              res.select = true;
              this.new_diliveryman = false;
            }
          })
          this.deliveriers = newDeliveriers;
        },
        //选择配送员
        showDeliveryman(list, type, key) {
          this.currentType = type;
          this.error.diliveryman_error = false;
          this.curOrder = list;
          this.curKey = key;
          this.choiceExpress = false
          this.clearSelectExpress()
          //达达订单重发布，更新预计费用
          if (this.curOrder['dada_query'] == 0 && this.curOrder['delivery_fee'] <= 0) {
            this.rePreOrder({orderId: this.curOrder.order_id}).then((res) => {
              if (res.resultCode == 1) {
                if (res.responseContent.dadaQuery) {
                  this.curOrder['dada_query'] = res.responseContent.dadaQuery;
                }
                if (res.responseContent.deliveryFee) {
                  this.curOrder['delivery_fee'] = res.responseContent.deliveryFee;
                }
              }
            });
          }
          this.getAllExpressList();
          this.curDeliverier = list.extend_deliveryman_log ? list.extend_deliveryman_log : {};
          if (this.curOrder.extend_deliveryman_log == null) {
            this.curOrder.extend_deliveryman_log = {}
          }
          this.curDeliverier.id = this.curDeliverier.diliveryman_id;
          this.new_diliveryman = false;
          this.diliveryman_name = '';
          this.diliveryman_tel = '';
          $("[name='r_delivery_type'][value='0']").prop('checked', "checked");
          $('#diliveryman-form').show();
          $('#dada-form').hide();
          if (list.delivery_type != 1 && list.select_deliveryman && this.selected_delivery_mans[list.diliveryman_id]) {
            if (list.extend_deliveryman_log) {
              this.curDeliveryFee = this.f2y(list.extend_deliveryman_log.distribution_fee);
            } else {
              this.curDeliveryFee = 0.00;
            }
          } else {
            this.curDeliveryFee = '';
          }
          this.before_diliveryman_id = list.diliveryman_id
          this.before_diliveryman_fee = this.curDeliveryFee;

          this.hideConfirm = false;
          this.dialog4 = true;
          this.curSelectDeliverIndex = -1;
          var newDelivers = _.clone(this.deliveriers);
          newDelivers.forEach((deliver) => {
            deliver.select = false;
            if (deliver.id == list.diliveryman_id) {
              deliver.select = true;
            }
          })
          this.deliveriers = [];
          this.deliveriers = newDelivers;
          if (list.delivery_type == 2) {
            this.$nextTick(() => {
              $("[name='r_delivery_type'][value='2']").prop('checked', "checked");
              $('#diliveryman-form').hide();
              $('#dada-form').hide();
            });
            this.choiceExpress = true
            this.curExpressId = list.express_id
            this.curSendCode = list.express_code
            this.curExpressMame = list.express_name

          }
        },
        showAddTips(order_id) {
          this.currentOrderId = order_id;
          //达达增加小费弹框
          this.getAddTips({'orderId': order_id}).then((res) => {
            if (res.resultCode == 1) {
              this.tipInfo = res.responseContent;
              $('#tips').val('');
              $('#result_tips').text(this.f2y(this.tipInfo.tips) + 0);
              $('.error-tip').text('');
              this.dialog9 = true;
            } else {
              util.msg(res.longMessage)
            }
          })
        },
        f2y: function (value) {
          return parseFloat((value / 100).toFixed(2));
        },
        doAddTips() {
          var flag = true;
          var tips = $('#tips').val().trim();
          if (tips == '') {
            $('.error-tip').text('请输入小费');
            flag = false;
          } else if (tips <= 0) {
            $('.error-tip').text('小费必须大于0.1元');
            flag = false;
          }
          if (flag) {
            //处理订单增加小费
            this.addTips({'orderId': this.currentOrderId, 'tips': ($('#result_tips').text()) * 100}).then((res) => {
              if (res.resultCode == 1) {
                util.msg('增加小费成功');
                this.getPageData(this.pageParams);
                this.dialog9 = false;
              } else {
                util.msg(res.longMessage)
              }
            })
          }
        },
        changeTipInput(e) {
          var _self = this;
          //过滤输入格式
          _self.cleanDecimal(e);
          var el = e.currentTarget;
          var tips = $(el).val();
          if (tips !== '') {
            $('.error-tip').text('');
          }
          var re = /^\d+(?:\.\d{0,2})?$/;
          if (tips.match(re) == null) {
            $('#result_tips').text(_self.f2y(_self.tipInfo.tips) + 0);
          } else {
            $('#result_tips').text(((_self.f2y(_self.tipInfo.tips)) + parseFloat(tips)).toFixed(2));
          }
        },
        cleanDecimal(obj) {
          var el = obj.currentTarget;
          $(el).val($(el).val().replace(/[^\d.]/g, ""));//清除“数字”和“.”以外的字符
          $(el).val($(el).val().replace(/\.{2,}/g, "."));//只保留第一个. 清除多余的
          $(el).val($(el).val().replace(".", "$#$").replace(/\./g, "").replace("$#$", "."));//只保留第一个. 清除多余的
          $(el).val($(el).val().replace(".", "$#$").replace(/\./g, "").replace("$#$", "."));//只保留第一个. 清除多余的
          $(el).val($(el).val().replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'));//只能输入两个小数
          if ($(el).val().indexOf(".") < 0 && $(el).val() != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            $(el).val(parseFloat($(el).val()))
          }
        },
        //选择配送员提交
        changeDiliverymanSure() {
          //获取配送方式
          var deliveryType = $("input[name='r_delivery_type']:checked").val();
          if (deliveryType == 0) {
            //自主配送员配送
            if (this.curDeliveryFee == null || this.curDeliveryFee === '') {
              this.error.diliveryman_error = true;
              this.error.diliveryman_error_text = '配送费用不能为空'
              return;
            } else if (!(/^\d+(\.\d{0,2})?$/.test(this.curDeliveryFee) && this.curDeliveryFee >= 0)) {
              this.error.diliveryman_error = true;
              this.error.diliveryman_error_text = '配送费用格式错误'
              return;
            }

            this.curOrder.extend_deliveryman_log.distribution_fee = this.curDeliveryFee * 100
            if (this.new_diliveryman) {
              if (!this.diliveryman_name || this.diliveryman_name == '') {
                this.error.diliveryman_error = true;
                this.error.diliveryman_error_text = ' 配送员姓名不能为空'
                return;
              }
              if (!this.diliveryman_tel || this.diliveryman_tel == '') {
                this.error.diliveryman_error = true;
                this.error.diliveryman_error_text = '请输入配送员手机号'
                return;
              }
              if (!/^1[3456789]\d{9}$/.test(this.diliveryman_tel)) {
                this.error.diliveryman_error = true;
                this.error.diliveryman_error_text = '请输入正确的手机号码'
                return;
              }
            } else {
              var selectDeliver = false;
              if (this.deliveriers) {
                this.deliveriers.forEach((del) => {
                  if (del.select) {
                    selectDeliver = true;
                  }
                })
              }
              if (!selectDeliver) {
                this.error.diliveryman_error = true;
                this.error.diliveryman_error_text = '请选择配送员'
                return;
              }
            }

            var data = {
              orderId: this.curOrder.order_id,
              id: this.curDeliverier.id ? this.curDeliverier.id : 0,
              distributionFee: (parseFloat(this.curDeliveryFee) * 100).toFixed(2),
              orderType: 1,
              memberMobile: this.diliveryman_tel,
              trueName: this.diliveryman_name,
            }
            if (this.new_diliveryman) {
              //新增配送员
              this.addDelivery(data).then((res) => {
                if (res.resultCode == 1) {
                  this.getDeliveriers().then((res) => {
                    this.deliveriers = res.responseContent
                  })
                  data.id = res.data.memberId
                  //修改配送员
                  this.selectDelivery(data).then((res) => {
                    this.isFaHuo = false;
                    if (res.resultCode == 1) {
                      this.dialog4 = false;
                      this.getPageData(this.pageParams, 2);
                    }
                    this.dialog4 = false;
                    util.msg(res.longMessage)
                  })
                } else {
                  if (res.resultCode == 30119) {
                    var newDeliveriers = _.clone(this.deliveriers);
                    newDeliveriers.forEach((res) => {
                      res.select = false;
                      if (res.mobile == this.diliveryman_tel) {
                        res.select = true;
                        this.error.diliveryman_error = false;
                        this.curDeliverier.id = res.id;
                        this.new_diliveryman = false;
                      }
                    })
                    this.deliveriers = newDeliveriers;
                  }
                  util.msg(res.longMessage)
                }
              })

            } else {
              if (data.id == this.before_diliveryman_id && this.curDeliveryFee == this.before_diliveryman_fee) {
                this.dialog4 = false;
                util.msg('操作成功');
                return false;
              }
              //修改配送员
              this.selectDelivery(data).then((res) => {
                this.isFaHuo = false;
                if (res.resultCode == 1) {
                  this.dialog4 = false;
                  this.getPageData(this.pageParams, 2);
                }
                this.dialog4 = false;
                util.msg(res.longMessage)
              })
            }
          } else if (deliveryType == 1) {
            //达达配送
            if (this.currentType == 1) {
              //type:0 达达发货 1：达达重新发货
              this.reDadaOrder({'orderId': this.curOrder.order_id, 'tips': 0}).then((res) => {
                if (res.resultCode == 1) {
                  this.dialog4 = false;
                  this.getPageData(this.pageParams, 2);
                }
                this.dialog4 = false;
                util.msg(res.longMessage)
              })
            } else {
              this.addDadaOrder({'orderId': this.curOrder.order_id, 'tips': 0}).then((res) => {
                if (res.resultCode == 1) {
                  this.dialog4 = false;
                  this.getPageData(this.pageParams, 2);
                }
                this.dialog4 = false;
                util.msg(res.longMessage)
              })
            }
          } else if (deliveryType == 2) {
            if (this.curExpressId == '' || this.curExpressId == 0) {
              layer.msg('请选择发货快递/物流公司');
              return;
            }
            if (this.curSendCode == '' || this.curSendCode == 0) {
              layer.msg('请填写发货单号');
              return;
            }
            this.orderApplySend({
              'order_id': this.curOrder.order_id,
              'express_id': this.curExpressId,
              'express_code': this.curSendCode
            }).then((res) => {
              this.clearSelectExpress()
              this.choiceExpress = false
              if (res.resultCode == 1) {
                this.dialog4 = false;
                this.getPageData(this.pageParams);
              }
              this.dialog4 = false;
              util.msg(res.longMessage)
            })
          }
        },
        //点击新增按钮
        addNewdiliveryman(value) {
          var newDeliveriers = _.clone(this.deliveriers);
          if (value) {
            newDeliveriers.forEach((deliver, de) => {
              if (deliver.select) {
                deliver.select = false;
                this.curSelectDeliverIndex = de;
              }
            })
            this.curDeliverier = {};
          } else {
            this.changeDeliver(newDeliveriers[this.curSelectDeliverIndex], this.curSelectDeliverIndex);
          }
          this.deliveriers = newDeliveriers;
        },
        //修改配送费
        changeDiliverymanFee(event) {
          var value = event.target.value;
          var newOrder = _.clone(this.curOrder);
          if (!newOrder.extend_deliveryman_log) {
            newOrder.extend_deliveryman_log = {}
          }
          newOrder.extend_deliveryman_log.distribution_fee = parseFloat(value).toFixed(2) * 100;
          this.curOrder = newOrder;
        },

        changeIndex(index) {
          var data = _.clone(this.pageParams);
          data.keyword = this.goods_name,
            data.gc_id_2 = this.gc_id_2,
            data.gc_id_3 = this.gc_id_3
          data.pageIndex = index;
          data.type = this.source;
          this.pageParams.pageIndex = index;
          this.getPageData(data, 3);
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
        changePriceSure() {
          //this.curOrder.order_amount = 2000;
          this.error.goods_amount_error = false;
          this.error.goods_amount_error_text = '商品总价必须为大于0的数字';
          if (!this.checkRate(this.goods_amount)) {
            this.error.goods_amount_error = true;
            return;
          }
          if (this.goods_amount <= 0) {
            this.error.goods_amount_error = true;
            return;
          }
          if (this.goods_amount > 10000000) {
            this.error.goods_amount_error = true;
            this.error.goods_amount_error_text = '订单金额不能超过1000万';
            return;
          }
          var data = {
            orderId: this.curOrder.order_id,
            orderAmount: this.goods_amount
          }
          this.modifyOrderAmount(data).then((res) => {
            // this.dialog1Success = true;
            util.msg(res.longMessage);
            this.dialog1 = false
            this.getPageData(this.pageParams, 2);
          })
        },
        loadingLayDate() {
          var _self = this;
          layui.use('laydate', function () {
            var laydate = layui.laydate;
            laydate.render({
              elem: '.query_start_date',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.pageParams);
                newParams.query_start_date = value;
                _self.pageParams = newParams;
              }
            });
            laydate.render({
              elem: '.query_end_date',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.pageParams);
                newParams.query_end_date = value;
                _self.pageParams = newParams;
              }
            });
            laydate.render({
              elem: '.query_start_date_b',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.pageParams);
                newParams.query_start_date = value;
                _self.pageParams = newParams;
              }
            });
            laydate.render({
              elem: '.query_end_date_b',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.pageParams);
                newParams.query_end_date = value;
                _self.pageParams = newParams;
              }
            });
            laydate.render({
              elem: '#query_start_date_b_print',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.printAddressPageParams);
                newParams.query_start_date = value;
                _self.printAddressPageParams = newParams;
              }
            });
            laydate.render({
              elem: '#query_end_date_b_print',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.printAddressPageParams);
                newParams.query_end_date = value;
                _self.printAddressPageParams = newParams;
              }
            });
          });
        },
        printOrderBatch(store_id) {
          var print_type = ""
          if (this.checkData.length == 0) {
            util.msg('请选择要打印的订单');
            return;
          }
          if (this.basicStore.printType == 1) {
            print_type = 'normal'
          } else {
            print_type = 'xiaopiao'
          }
          var key = storage.get("key")
          var site_url = env.printUrl;
          var timestamp = Math.floor(new Date().getTime() / 1000);
          var secret = '~!@#$`1234qwertasdfgzxcvb';
          var order_ids = this.checkData.join("|")
          var sign_arg = md5(this.storeId.toString() + order_ids.toString() + timestamp.toString() + secret)
          var print_url = site_url + '?c=store_receiving&a=order_print_batch&store_id=' + this.storeId
            + '&order_id=' + order_ids + '&timestamp=' + timestamp + '&sign=' + sign_arg + '&key=' + key + '&print_type=' + print_type + '&print_content=address';
          window.open(print_url, '_blank');
        },
        onlyNumber(type) {
          let value;
          if (type == 'goods_amount') {
            value = this.goods_amount
          } else if (type == 'nowOrderAmount') {
            value = this.nowOrderAmount;
          }
          let t = value.charAt(0);
          //先把非数字的都替换掉，除了数字和.和-号    
          value = value.replace(/[^\d\.\-]/g, '');
          //前两位不能是0加数字      
          value = value.replace(/^0\d[0-9]*/g, '');
          //必须保证第一个为数字而不是.       
          value = value.replace(/^\./g, '');
          //保证只有出现一个.而没有多个.       
          value = value.replace(/\.{2,}/g, '.');
          //保证.只出现一次，而不能出现两次以上       
          value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
          //如果第一位是负号，则允许添加    
          value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
          value = value.replace(/\-/g, "")
          if (t == '-') {
            if (value.length == 1) {
              value = '';
            } else {
              value = value.substr(1);
            }
          }
          if (type == 'goods_amount') {
            this.goods_amount = value;
          } else if (type == 'nowOrderAmount') {
            this.nowOrderAmount = value;
          }
        },
        changeOrder(item, key) {
          this.curOrder = item;
          this.curKey = key,
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
        /* changeOrder(item,key){
            this.curOrder = item;
            this.curKey = key,
            this.curOrder.change_goods_amount = this.curOrder.goods_amount;
            this.curOrder.change_order_amount = this.curOrder.order_amount;
            this.curOrder.change_shipping_fee = this.curOrder.shipping_fee;
            this.curOrder.change_reliefAmount = this.curOrder.change_goods_amount + this.curOrder.change_shipping_fee - this.curOrder.change_order_amount

            this.curOrder.goods_list.forEach((goodlist,gl) => {
              goodlist.numChangeShow = false;
             if(goodlist.oldNum && goodlist.oldNum>=0 && goodlist.oldNum != goodlist.goods_num){
               goodlist.goods_num = goodlist.oldNum;
             }
            });
            this.nowOrderAmount = this.changeTwoDecimal_f((this.curOrder.order_amount/100));

            this.dialog3 = true;
            this.dialogTitle1 = "修改订单";
          },*/

        //修改订单--点击修改
        numChangeShow(goods, gs) {
          var newGoods = _.clone(goods);
          var newOrder = _.clone(this.curOrder);

          newGoods.numChangeShow = true;
          newGoods.oldNum = goods.goods_num;

          newOrder.goods_list[gs] = newGoods;
          this.curOrder = newOrder;
        },
        changeTwoDecimal_f(val) {
          var f_x = parseFloat(val);
          if (isNaN(f_x)) {
            return 0;
          }
          var f_x = Math.round(val * 100) / 100;
          var s_x = f_x.toString();
          var pos_decimal = s_x.indexOf('.');
          if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
          }
          while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
          }
          return s_x;
        },

        //修改订单--点击修改--确定
        numChangeSure(goods, gs) {
          if (isNaN(parseInt(goods.goods_num))) {
            this.layer.msg('请输入整数');
            return;
          }

          var goodlist = []
          this.curOrder.goods_list.forEach((res) => {

            goodlist.push(
              {
                goodsId: res.goods_id,
                goodsCommonId: res.goods_commonid,
                goodsNum: parseInt(res.goods_num)
              }
            );
          });

          var data = {
            orderId: this.curOrder.order_id,
            goodsList: goodlist,
            orderAmount: this.curOrder.change_order_amount.toFixed(0)
          }

          this.getOrderPrice(data).then((res) => {
            if (res.resultCode == 1) {
              var data = res.responseContent;

              var newGoods = _.clone(goods);
              var newOrder = _.clone(this.curOrder);

              newOrder.change_goods_amount = data.goodsTotalAmount;
              newOrder.change_shipping_fee = data.shippingFee;
              newOrder.change_reliefAmount = data.reliefAmount;
              newOrder.change_order_amount = data.orderAmount;
              this.nowOrderAmount = this.changeTwoDecimal_f((data.orderAmount / 100));
              newGoods.numChangeShow = false;
              newOrder.goods_list[gs] = newGoods;

              this.curOrder = newOrder;

            } else {
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
        numChangeCancle(goods, gs) {

          var newGoods = _.clone(goods);
          var newOrder = _.clone(this.curOrder);

          newGoods.numChangeShow = false;
          newGoods.goods_num = goods.oldNum;

          newOrder.goods_list[gs] = newGoods;
          this.curOrder = newOrder;
        },
        submitChageOrder() {
          if (!this.checkRate(this.nowOrderAmount)) {
            util.msg("订单金额输入有误")
            return;
          }
          if (parseFloat(this.nowOrderAmount) <= 0) {
            util.msg("订单金额必须大于0")
            return;
          }
          if (this.nowOrderAmount > 10000000) {
            util.msg("订单金额必须小于等于1000万")
            return;
          }
          if (this.nowOrderAmount.toString().indexOf(".") != -1) {
            var length = this.nowOrderAmount.toString().split(".")[1].length
            if (length > 2) {
              util.msg("订单金额输入有误")
              return;
            }
          }

          var newOrder = _.clone(this.curOrder);
          newOrder.change_order_amount = this.nowOrderAmount * 100;
          this.curOrder = newOrder;

          var isAllBtnClose = true;
          var goodlist = []
          this.curOrder.goods_list.forEach((res) => {
            if (res.numChangeShow) {
              isAllBtnClose = false;
            }
            goodlist.push(
              {
                goodsId: res.goods_id,
                goodsCommonId: res.goods_commonid,
                goodsNum: parseInt(res.goods_num)
              }
            );
          });
          if (!isAllBtnClose) {
            util.msg("修改数量后请点击确定")
            return
          }
          var data = {
            orderId: this.curOrder.order_id,
            goodsList: goodlist,
            orderAmount: this.curOrder.change_order_amount.toFixed(0)
          }

          this.modifyOrder(data).then((res) => {
            if (res.resultCode == 1) {
              util.msg(res.longMessage);
              this.getPageData(this.pageParams, 2);
              this.dialog3 = false;
            } else {
              util.msg(res.longMessage)
            }
          })

        },
        showCancelDadaOrder(list, key) {
          //取消达达订单弹窗
          this.currentOrderId = list.order_id;
          this.curOrder = list;
          this.curKey = key;
          if (list.delivery_status == 2) {
            this.cancelWarn = true;
          } else {
            this.cancelWarn = false;
          }
          this.getCancelDadaOrder({'orderId': this.currentOrderId}).then((res) => {
            if (res.resultCode == 1) {
              if (res.responseContent.tips) {
                this.cancelWarn = true;
              }
              this.cancelDadaOrderInfo = res.responseContent;
              $('#cancel-text').val('');
              $('.error-cancel').text('');
              $('#cancel_reason_id').find("option[value='']").prop('selected', 'selected');
              this.dialog11 = true;
            } else {
              util.msg(res.longMessage);
              this.getPageData(this.pageParams, 2);
            }
          })
        },
        showDoCancelDadaOrder() {
          if (this.warningTime == 1) {
            var cancelId = $('#cancel_reason_id').val();
            var cancelText = $('#cancel-text').val().trim();
            this.cancelDadaOrder({
              'orderId': this.currentOrderId,
              'cancelReasonId': cancelId,
              'cancelReason': cancelText,
              'deliveryStatus': this.cancelDadaOrderInfo.orderInfo.deliveryStatus
            }).then((res) => {
              if (res.resultCode == 1) {
                this.getPageData(this.pageParams, 2);
                this.dialog10 = false;
              } else {
                util.msg(res.longMessage);
                this.getPageData(this.pageParams, 2);
              }
            })
          } else {
            //展示达达操作取消订单弹框
            $('#cancel-text').val('');
            $('.error-cancel').text('');
            $('#cancel_reason_id').find("option[value='']").prop('selected', 'selected');
            this.dialog11 = true;
          }
        },
        doCancelDadaOrder() {
          var flag = true;
          //执行达达操作取消订单
          var cancelId = $('#cancel_reason_id').val();
          var cancelText = $('#cancel-text').val().trim();
          if (cancelId == '') {
            $('.error-cancel-id').text('请选择取消原因');
            flag = false;
          } else {
            if (cancelId == 10000 && cancelText == '') {
              $('.error-cancel-text').text('请填写订单取消原因');
              flag = false;
            }
          }
          if (flag) {
            this.cancelDadaOrder({
              'orderId': this.currentOrderId,
              'cancelReasonId': cancelId,
              'cancelReason': cancelText,
              'deliveryStatus': this.cancelDadaOrderInfo.orderInfo.deliveryStatus
            }).then((res) => {
              if (res.resultCode == 1) {
                if (res.responseContent.status == 2 && (this.warningTime < 1)) {
                  //订单已有接单
                  this.warningTime = 1;
                  this.cancelDadaOrderInfo.orderInfo.deliveryStatus = 2;
                  this.getPageData(this.pageParams, 1);
                  ;
                  this.dialog10 = true;
                  this.dialog11 = false;
                } else {
                  this.getPageData(this.pageParams, 2);
                  this.dialog11 = false;
                }
              } else {
                util.msg(res.longMessage);
                this.dialog11 = false;
                this.getPageData(this.pageParams, 2);
              }
            })
          }
        },
        changeCancelId(e) {
          var el = e.currentTarget;
          $(el).blur();
          var cancelId = $('#cancel_reason_id').val();
          $('.error-cancel-text').text('');
          if (cancelId == '') {
            $('.error-cancel-id').text('请选择取消原因');
          } else {
            $('.error-cancel-id').text('');
          }
        },
        changeCancelText() {
          var cancelId = $('#cancel_reason_id').val();
          var cancelText = $('#cancel-text').val().trim();
          if (cancelId == 10000 && cancelText == '') {
            $('.error-cancel-text').text('请填写订单取消原因');
          } else {
            $('.error-cancel-text').text('');
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
        showConfirmCancelDada(order_id) {
          this.currentOrderId = order_id;
          //达达取消确认完成弹窗
          this.dialog12 = true;
        },
        doConfirmCancelDada() {
          //操作确认取消达达订单excconfirmDadaOrder
          this.excconfirmDadaOrder({'orderId': this.currentOrderId}).then((res) => {
            if (res.resultCode == 1) {
              this.dialog12 = false;
              this.getPageData(this.pageParams);
            } else {
              util.msg(res.longMessage);
            }
          })
        },
        showHandleDada(list, key) {
          this.curOrder = list;
          this.curKey = key;
          //处理达达订单弹窗
          this.dialog13 = true;
        },
        changeHandel() {
          var isConfirm = $("[name='is_confirm']:checked").val();
          if (isConfirm == '' || isConfirm == undefined) {
            $('.error-handel').text('请选择处理意见');
          } else {
            $('.error-handel').text('');
          }
        },
        doHandelDada() {
          //v1.2.2确认达达骑手取消订单
          var flag = true;
          $('.error-handel').text('');
          var is_confirm = $("[name='is_confirm']:checked").val();
          if (is_confirm == '' || is_confirm == undefined) {
            $('.error-handel').text('请选择处理意见');
            flag = false;
          }
          if (flag) {
            this.confirmDadaOrder({'orderId': this.curOrder.order_id, 'isConfirm': is_confirm}).then((res) => {
              if (res.resultCode == 1) {
                this.dialog13 = false;
                this.getPageData(this.pageParams, 2);
              } else {
                util.msg(res.longMessage);
              }
            })
          }
        },
        goWaitOrder() {
          this.pageParams.state_type = 'state_wait';
          this.searchData(this.pageParams);
          this.$router.push('/order/store_order/index/state_wait');
        },
        /* changePrice(item,key){
            this.error.goods_amount_error = false;
            this.curOrder = item;
            this.curKey = key,
            this.goods_amount = (item.order_amount/100).toFixed(2);
            this.dialog1 = true;
            this.dialog1Success = false;
          },*/
        changePrice(item, key) {
          this.error.goods_amount_error = false;
          this.curOrder = item;
          this.curKey = key,
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
          this.isEdiPriceCommitButton=false;
          this.ediPriceCommitType=false;
          this.updateOrderPriceIsError=false;
          this.ediOrderPriceIsCommit=false;
        },
        printAddress() {
          this.error.goods_amount_error = false;
          this.curOrder = {};
          this.curKey = 1;
          this.printAddressPageParams.key_type = this.pageParams.key_type;
          this.printAddressPageParams.keyword = this.pageParams.keyword;
          this.printAddressPageParams.query_start_date = this.pageParams.query_start_date;
          this.printAddressPageParams.query_end_date = this.pageParams.query_end_date;
          this.searchPrintData();
          this.dialogPrintAddress = true;
          this.dialogPrintAddressSuccess = false;
        },
        getPagePrintData(data, type, from) {
          var newData = _.clone(data);
          //this.checkData = [];
          this.getList(newData).then((res) => {
            this.orderPrintList = res.responseContent.list;
            this.storeId = res.responseContent.store_id;
            var printAddressPageParams = _.clone(this.printAddressPageParams);
            var selectAll = true;
            printAddressPageParams.total = res.responseContent.total ? res.responseContent.total : 0;
            this.printAddressPageParams = printAddressPageParams;
            if (document.getElementById("quan")) {
              if (this.checkAllPage.indexOf(this.printAddressPageParams.pageIndex) >= 0) {
                document.getElementById("quan").checked = true;
              } else {
                this.orderPrintList.forEach((list) => {
                  if (this.checkData.indexOf(list.order_id) < 0) {
                    selectAll = false;
                  }
                })
                document.getElementById("quan").checked = selectAll;
              }
            }

            /*if(this.printAddressPageParams.checkAll){
                document.getElementById("quan").checked=true;
                this.orderPrintList.forEach((list)=>{
                  if(this.checkData.indexOf(list.order_id)<0){
                    this.checkData.push(list.order_id);
                  }
                })
              }*/
          })
        },
        getPageData(data, type, from) {
          //type:3:分页进行查询，店铺会员跳转过来，如果是分页查询不要将缓存清了

          if (type != 1) {
            this.warningTime = 0;
          }
          this.initFilter();

          //从店铺会员页面过来，要进行一些筛选条件处理
          if (storage.get('member_id') && (this.searchTime < 2 || type == 3) && this.fromUser == 1) {
            data.buyer_id = storage.get('member_id');
          } else {
            this.pageParams.buyer_id = '';
          }
          if (this.fromUser == 1) {
            this.comFromFavoritesStore(type);
          }
          var newData = _.clone(data);

          if (newData.state_type == undefined) {
            //   newData.state_type = "all"
          }
          newData.skip_off = newData.skip_off || newData.skip_off == 1 ? 1 : 0;
          newData.only_cancel = newData.only_cancel || newData.only_cancel == 1 ? 1 : 0;
          newData.dadaState = this.dadaState;
          if (newData.pay_type != 0 && newData.pay_type != -1) {
            newData.pay_channel = -1;
          }

          if (newData.state_type != 'all') {
            newData.skip_off = 0;
          }
          //type 为2 是获取单条订单记录
          if (type == 2 || type == 1) {
            newData.order_id = this.curOrder.order_sn;
          }

          this.canSearch = false;
          if (this.$route.params.hasOwnProperty('actId')) {
            newData.sale_act_id = this.$route.params.actId
          }
          if (this.$route.params.hasOwnProperty('isToday')) {
            newData.is_today = this.$route.params.isToday
          }
          if (this.$route.params.hasOwnProperty('orderSn') && this.$route.params.orderSn != undefined) {
            newData.order_sn = this.$route.params.orderSn
          }
          this.isInventoryWarning();
          //配送员列表更新下
          this.getDeliveriers().then((res) => {
            this.deliveriers = res.responseContent
          })
          this.getList(newData).then((res) => {
            this.colorList = res.responseContent.colorList;
            if (this.pageParams.state_type == 'all' || this.pageParams.state_type == 'state_wait') {
              this.lastGetlistTime = res.requestTime;
            }
            this.canSearch = true;
            if (res.resultCode == 1) {
              this.lastSearchTime = res.responseContent.last_search_time;
              //有可能在计时器阶段刷新，这时需要将原有计时器清空
              this.timers.forEach((timer) => {
                clearInterval(timer);
              })
              this.timers = [];
              //type 为2 是获取单条订单记录
              if (type == 2 || type == 1) {
                var key = this.curKey;
                var orderList = _.clone(this.orderList);
                orderList[key] = res.responseContent.list[0];
                this.orderList = orderList;
              } else {
                this.orderList = [];
                this.orderList = res.responseContent.list;
              }
              this.selected_delivery_mans = res.responseContent.selected_delivery_mans ? res.responseContent.selected_delivery_mans : {};
              this.nowTime = Date.parse(new Date()) / 1000;
              this.dada_shop = res.responseContent.dada_shop;
              if (this.dada_shop && this.dada_shop.cityName) {
                this.isShowDada = true;
              } else {
                this.isShowDada = false;
              }
              this.orderList.forEach((list) => {
                list.serverTime = res.responseTime
              })

              this.orderList.forEach((res2, r) => {
                //商品+组合+赠品
                let g_count = 0;
                res2.goods_list.forEach((g, v) => {
                  if (g.goods_commonid == 0) {
                    g_count += (g.goods_group.length + 1)
                  } else {
                    g_count++
                  }
                })
                if (res2.extend_order_gifts) {
                  g_count += res2.extend_order_gifts.length
                }
                if (g_count > 3) {
                  res2.has_more = true
                } else {
                  res2.has_more = false
                }
                res2.toggle = false
                if (res2.order_state == 20) {
                  var maxtime = 0;
                  if (res2.serverTime && res2.serverTime > 0) {
                    if (res2.payment_type == 0 || res2.payment_type == 2) {
                      maxtime = 10 * 60 - (res2.serverTime - res2.add_time);
                    } else {
                      maxtime = 10 * 60 - (res2.serverTime - res2.payment_time);
                    }
                  } else {
                    if (res2.payment_type == 0 || res2.payment_type == 2) {
                      maxtime = 10 * 60 - ((new Date()).getTime() / 1000 - res2.add_time);
                    } else {
                      maxtime = 10 * 60 - ((new Date()).getTime() / 1000 - res2.payment_time);
                    }
                  }
                  // if(maxtime > 0){
                  //   this.countDown(maxtime,res2,r);
                  // }else{
                  //   var newItem = _.clone(res2);
                  //   var  newList = _.clone(this.orderList);
                  //   newItem.state_desc = '已关闭';
                  //   newItem.maxtime = ''
                  //   newItem.take_order = false;
                  //   newList[r] = newItem;
                  //   this.orderList = newList;
                  // }
                  //if(maxtime > 0){
                  //  this.countDown(maxtime,res2,r);
                  // }else{
                  //  var newItem = _.clone(res2);
                  //  var  newList = _.clone(this.orderList);
                  //   newItem.state_desc = '已关闭';
                  //  newItem.maxtime = ''
                  // newItem.take_order = false;
                  //  newList[r] = newItem;
                  //  this.orderList = newList;
                  // }
                }

              })

              var newParams = _.clone(this.pageParams);
              newParams.total = res.responseContent.total ? res.responseContent.total : 0;
              this.pageParams = newParams;
              if (this.pageParams.state_type == "all" && this.pstate_type == "index") {
                this.setState_type("index");
              } else {
                if (this.pstate_type != "index") {
                  this.setState_type(this.pageParams.state_type);
                }
              }
            } else {
              this.layer.msg(res.longMessage);
              this.canSearch = true;
            }
          })
        },
        changeType(e) {
          var el = e.currentTarget;
          this.choiceExpress = false;
          if ($(el).val() == 1) {
            this.hideConfirm = true;
            this.$nextTick(() => {
              $('#diliveryman-form').hide();
              $('#dada-form').show();
            });
          } else if ($(el).val() == 0) {
            this.hideConfirm = false;
            this.$nextTick(() => {
              $('#dada-form').hide();
              $('#diliveryman-form').show();
            });
          } else if ($(el).val() == 2) {
            this.hideConfirm = false;
            this.$nextTick(() => {
              $('#diliveryman-form').hide();
              $('#dada-form').hide();
              this.choiceExpress = true;
            });
          }
        },

        getDeliveryTime(item) {
          var delivery_time = item.delivery_time * 1000;
          var today = util.dateFormat(new Date(), "yyyy-MM-dd");
          var delivery = util.dateFormat(new Date(delivery_time), "yyyy-MM-dd");
          var time = util.dateFormat(new Date(delivery_time), "HH:mm")
            + "-" + util.dateFormat(new Date(delivery_time + 1800000), "HH:mm");
          var tempTime = util.dateFormat(new Date(delivery_time), "HH:mm");
          if (tempTime == '23:59') {
            if (today == delivery) {
              return '今天内';
            } else {
              return util.dateFormat(new Date(delivery_time), "yyyy-MM-dd") + "内";
            }
          } else {
            if (today == delivery) {
              return '今天' + " " + time;
            } else {
              return util.dateFormat(new Date(delivery_time), "yyyy-MM-dd") + " " + time;
            }
          }
        },
        getMyselfDeliveryTime(item) {
          var delivery_time = item.delivery_time * 1000;
          var today = util.dateFormat(new Date(), "yyyy-MM-dd");
          var delivery = util.dateFormat(new Date(delivery_time), "yyyy-MM-dd");
          var time = util.dateFormat(new Date(delivery_time), "HH:mm")
          // +"-"+util.dateFormat(new Date(delivery_time + 1800000),"HH:mm");
          if (today == delivery) {
            return '今天' + " " + time;
          } else {
            return util.dateFormat(new Date(delivery_time), "yyyy-MM-dd") + " " + time;
          }
        },
        changeIndex(index) {
          var data = _.clone(this.pageParams);
          data.pageIndex = index;
          this.pageParams.pageIndex = index;
          this.getPageData(data, 3);
        },
        changeIndexPrint(index) {
          var data = _.clone(this.printAddressPageParams);
          data.pageIndex = index;
          this.printAddressPageParams.pageIndex = index;
          this.getPagePrintData(data);
        },
        //接单
        takeOrder(list, key) {
          var data = {
            memberId: list.buyer_id
          }
          this.isBlacklist(data).then((res) => {
            if (res.resultCode == 1) {
              list.isBlacklist = res.responseContent.isBlacklist;
              list.tagNames = res.responseContent.tagNames;
              this.curOrder = list;
              this.dialog7 = true;
            }
          })
        },
        takeOrderSure(list) {
          var data = {
            orderId: this.curOrder.order_id
          }
          this.orderReceive(data).then((res) => {
            if (res.resultCode == 1) {
              this.dialog7 = false;
              this.curOrder = {};
              util.msg("接单成功");
              this.getPageData(this.pageParams);
            } else {
              this.dialog7 = false;
              util.msg("订单状态已更新");
              this.getPageData(this.pageParams);
            }
          })
        },
        newOrderTip() {
          this.isInventoryWarning();
          this.searchData(this.pageParams)
        },

        //   拒单
        unTakeOrder(list) {
          this.curOrder = list;
          this.reason = '';
          this.dialog8 = true;
        },
        unTakeOrderSure() {
          this.error.reason_error = false;
          if (this.reason == '') {
            this.error.reason_error = true
            return
          }
          var data = {
            orderId: this.curOrder.order_id,
            message: this.reason
          }
          this.refuseOrder(data).then((res) => {
            if (res.resultCode == 1) {
              this.dialog8 = false;
              this.getPageData(this.pageParams);
            }
            util.msg(res.longMessage)
          })
        },
        test(maxtime, newItem, r) {
          newItem.timer1 = setTimeout(() => {
            var minutes, seconds, msg;
            if (maxtime >= 0) {
              minutes = Math.floor(maxtime / 60);
              seconds = Math.floor(maxtime % 60);
              msg = "剩余关闭时间:" + minutes + "分" + seconds + "秒";
              newItem.maxtime = msg;
              --maxtime;
              var newList = _.clone(this.orderList);
              newList[r] = newItem;
              this.orderList = newList;
              this.test(maxtime, newItem, r);
            } else {
              clearTimeout(newItem.timer1);
              this.getPageData(this.pageParams);
              newItem.state_desc = '已关闭';
              newItem.maxtime = ''
              newItem.take_order = false;
              var newList = _.clone(this.orderList);
              newList[r] = newItem;
              this.orderList = newList;
            }
          }, 1000);
        },


        /*待接单倒计时*/
        countDown(maxtime, item, r) {
          var newItem = _.clone(item);
          if (newItem.timer) {
            clearInterval(newItem.timer);
            delete newItem.timer;
          }
          // this.test(maxtime,newItem,r);
          newItem.timer = setInterval(() => {
            var minutes, seconds, msg;
            if (maxtime >= 0) {
              minutes = Math.floor(maxtime / 60);
              seconds = Math.floor(maxtime % 60);
              msg = "剩余关闭时间:" + minutes + "分" + seconds + "秒";
              newItem.maxtime = msg;
              --maxtime;
              var newList = _.clone(this.orderList);
              newList[r] = newItem;
              this.orderList = newList;
            } else {
              clearInterval(newItem.timer);
              this.getPageData(this.pageParams);
              newItem.state_desc = '已关闭';
              newItem.maxtime = ''
              newItem.take_order = false;
              var newList = _.clone(this.orderList);
              newList[r] = newItem;
              this.orderList = newList;
            }
          }, 1000);
          this.timers.push(newItem.timer);
        }
        },

        filters: {
          f2y: function (value) {
            return (value / 100).toFixed(2);
          },
          base64: function (value) {
            return Base64.decode(value);
          },
          datetime: function (value) {
            return util.dateFormat(new Date(value * 1000), 'yyyy-MM-dd HH:mm:ss')
          },
          num_filter: function (value) {
            // 截取当前数据到小数点后三位
            let tempVal = parseFloat(value).toFixed(2)
            let realVal = tempVal.substring(0, tempVal.length - 1)
            return realVal
            // 截取当前数据到小数点后两位
            //return (value*10).toFixed(1);
          },
          discount_t: function (goods_price, goods_marketprice) {

            if (goods_marketprice == "" || goods_marketprice == 0) {
              return 0;
            }
            let tempVal = parseFloat(Math.round((goods_price / goods_marketprice) * 100) / 10).toFixed(2)
            //tempVal=Math.ceil(tempVal*10)/10;
            let realVal = tempVal.substring(0, tempVal.length - 1)
            return realVal
          }
        },

        watch: {
          state_type: function () {
            this.orderList = [];
            this.clearAll();
            var newParams = _.clone(this.pageParams);

            newParams.deal_state = 0;
            newParams.state_type = this.state_type;
            newParams.only_cancel = 0;
            newParams.skip_off = 0;


            if (this.state_type == 'index') {
              newParams.state_type = 'all';
            }
            this.pageParams = newParams;
            ``
            this.pageParams.pageIndex = 0;
            this.getPageData(this.pageParams);
            if (this.state_type == 'dada') {
              this.dadaState = 'all'
            }
            this.initPageFilter();
            this.isInventoryWarning();
            document.body.scrollTop = 0;
            window.scrollTo(0, 0);
            document.getElementsByClassName("routerContent")[0].scrollTop = 0;
          },
          /*checkData:{
            handler(){ // 数据数组有变化将触发此函数
              if(document.querySelector('#quan')){
                if(this.checkData.length == this.orderPrintList.length){
                  document.querySelector('#quan').checked = true;
                }else {
                  document.querySelector('#quan').checked = false;
                }
              }
            },
            deep: true // 深度监视
          },*/
          getSideMenuOrderClick: function () {
            var newParams = {
              query_start_date: '',
              query_end_date: '',
              or_com_type: '-1',
              shipping_type: '-1',
              order_sn: '',
              skip_off: 0,
              only_cancel: 0,
              state_type: "all",

              pageIndex: 0,
              pageSize: 15,
              total: 1
            };

            newParams.state_type = this.state_type ? this.state_type : 'all';
            newParams.only_cancel = 0;
            newParams.skip_off = 0;
            if (this.state_type == 'index') {
              newParams.state_type = 'all';
            }
            this.pageParams = newParams;
            this.getPageData(this.pageParams);
            if (this.state_type == 'dada') {
              this.dadaState = 'all'
            }

            document.body.scrollTop = 0;
            window.scrollTo(0, 0);
            document.getElementsByClassName("routerContent")[0].scrollTop = 0;
          }
        },

        mounted() {
          var _self = this;
          if (this.$route.params.state_type == 'from_user') {
            this.fromUser = 1;
            this.$router.push('/order/store_order/index/index');
          }
          layui.use('laydate', function () {
            var laydate = layui.laydate;
            laydate.render({
              elem: '.query_start_date',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.pageParams);
                newParams.query_start_date = value;
                _self.pageParams = newParams;
              }
            });
            laydate.render({
              elem: '.query_end_date',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.pageParams);
                newParams.query_end_date = value;
                _self.pageParams = newParams;
              }
            });
            laydate.render({
              elem: '.query_start_date_b',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.pageParams);
                newParams.query_start_date = value;
                _self.pageParams = newParams;
              }
            });
            laydate.render({
              elem: '.query_end_date_b',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.pageParams);
                newParams.query_end_date = value;
                _self.pageParams = newParams;
              }
            });
            laydate.render({
              elem: '#query_start_date_b_print',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.printAddressPageParams);
                newParams.query_start_date_print = value;
                _self.printAddressPageParams = newParams;
              }
            });
            laydate.render({
              elem: '#query_end_date_b_print',
              theme: "#ff8519",
              trigger: 'click',
              done: function (value) {
                var newParams = _.clone(_self.printAddressPageParams);
                newParams.query_end_date_print = value;
                _self.printAddressPageParams = newParams;
              }
            });
          });

          var params = _self.$route.params;
          _self.pstate_type = params.state_type;

          if (params.state_type != "index") {
            var data = _.clone(_self.pageParams);
            data.state_type = params.state_type;
            _self.pageParams = data;
          }
          console.log(444)
          _self.init();
          //body绑定键盘enter搜索事件
          _self.bodyListener = (e) => {
            if (e.keyCode === 13) {
              if (_self.dialog1) {
                //修改价格
                _self.changePriceSureNew('orderPrice');
              } else if (_self.dialog3) {
                //修改订单
                _self.changePriceSureNew('orderInfo');
              } else if (_self.dialog4) {
                //发货
                if (_self.showChoiceExpress) {
                  _self.searchExpress();
                  return;
                }
                if (_self.curOrder.dada_query != 2 || !_self.hideConfirm) {
                  _self.changeDiliverymanSure();
                }
              } else if (_self.dialog5) {
                //处理
                if (_self.currentContent.status != 5 || !_self.handleDisabled) {
                  _self.dealWithSure();
                }
              } else if (_self.dialog6) {
                //确认收到货款
                _self.recieveGoodSure();
              } else if (_self.dialog14) {
                //确认买家自提
                _self.getOrderBySelfSure();
              } else if (_self.dialog7) {
                //接单
                _self.takeOrderSure();
              } else if (_self.dialog8) {
                //拒单
                _self.unTakeOrderSure();
              } else if (_self.dialog9) {
                //增加小费
                _self.doAddTips();
              } else if (_self.dialog10) {
                _self.showDoCancelDadaOrder();
              } else if (_self.dialog11) {
                //取消达达订单
                _self.doCancelDadaOrder();
              } else if (_self.dialog12) {
                //确认收货
                _self.doConfirmCancelDada();
              } else if (_self.dialog13) {
                //处理达达订单
                _self.doHandelDada();
              } else {
                if (_self._self.canSearch) {
                  _self.searchData();
                }
              }
            }
          }
          document.body.addEventListener('keyup', _self.bodyListener, false);
        },
        beforeDestroy() {
          //销毁键盘enter搜索事件
          document.body.removeEventListener('keyup', this.bodyListener);
          storage.remove('searchType');
          storage.remove('member_id');
          storage.remove('beginTime');
          storage.remove('endTime');
        },
      }
