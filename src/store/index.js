import Vue from 'vue'
import Vuex from 'vuex'
import api from 'api'
import storage from './../libs/utils/storage'
import app from './app'
import home from './home'
import sotreSetting from './store/store-setting';
import storeDelivery from './store/store-delivery';
import qmStoreClass from './store/qm-store-class';
import storeTransaction from './data_center/store_transaction'
import storeTransactionOffline from './data_center/store_transaction_offline'
import storeEvaluate from './order/store_evaluate'
import storeTotal from './data_center/store_total'
import storeSaleStatistics from './data_center/store_sale_statistics'
import diliveryman from './data_center/diliveryman'
import storeClass from './store/store-class';
import favoritesStore from './data_center/favorites_store'
import inventoryWarning from './goods/inventory-warning'
import storeApAdv from './store/store-ap-adv'
import account from './account/log_list';
import accountList from './account/account_list';
import Storeinfo from './account/Storeinfo';
import groupList from './account/group_list';
import storeGoodsClass from './store/store-goods-class'
import storeGoodsOnline from './store/store-goods-online'
import saleAct from './store-coupon/sale-act';
import storePayment from './store/store-payment';
import storeGoodsStorage from './goods/store-goods-storage'
import json from './json';
import unionpay from './union-pay';
import register from './register/register';
import storeOrder from './order/store-order';
import storeReceiving from './order/store_receiving';
import storeCoupon from './promotion/store-coupon';
import storeGoodsAdd from './goods/store-goods-add';
import saleActAdd from './promotion/sale-act-add';
import storePoster from './promotion/store-poster';
import cutAct from './promotion/cut-act';
import util from 'lib/utils/util';
import importGoods from './goods/import-goods';


Vue.use(Vuex)
//登录初始化相关
const store = new Vuex.Store({
  //state属性不要直接调用
  state: {
    isLogin: false,
    key: '',
    metaData: {},
    sellerInfo: {},
    menuList: {},
    otherMenu:{},
    orderTips:{
      state_new:0,
      wait_count:0,
      wait_send_count:0,
      wrong_count:0,
      cancel_wait_count:0,
      receive_money_count:0,
      make_money_count:0,
      deal_count:0,
      all_count:0,
      self_mention_wait_count:0,
      refund_count:0,
      return_count:0,
      return_wait:0,
      wx_refund:0,
      refund_return_all:0
    },
    quickLink:{},
    curTabMenu:'',
    isReceiveOrder:{
      autmatic_tips: 0,
      cancel_count: 0,
      count: 0,
    }
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    },
    getMetaData(state) {
      return state.metaData;
    },
    getSellerInfo(state) {
      return state.sellerInfo;
    },
    getMenuList(state) {
      return state.menuList;
    },
    getOrderTips(state) {
      return state.orderTips;
    },
    getOtherMenu(state) {
      return state.otherMenu;
    },
    getQuickLink(state){
      return state.quickLink;
    },
    getCurTabMenu(state){
      return state.curTabMenu;
    },
    getIsReceiveOrder(state){
      return state.isReceiveOrder;
    },

  },
  mutations: {
    setLoginData(state, metaData) {
      state.metaData = metaData;
      if(metaData.key) state.key = metaData.key;
      state.sellerInfo = {
        memberName:metaData.memberName,
        sellerId:metaData.sellerId,
        memberMobile:metaData.memberMobile,
        memberAvatar:metaData.memberAvatar,
        memberId:metaData.memberId,
        storeId:metaData.storeId,
        storeLabel:metaData.storeLabel,
        storeName:metaData.storeName,
        lastLoginTime:metaData.lastLoginTime,
      };
      state.menuList['home'] = {name: "首页", type: "menu", pname: "root",hover:false,act:"home"}
      Object.keys(metaData.allowMenu).forEach(function (key) {
          state.otherMenu = '';
        if(key === 'account'){
          state.otherMenu = metaData.allowMenu[key]
          state.menuList[key] = metaData.allowMenu[key];
          state.menuList[key].hover = false;
          state.menuList[key].act = key;
        }else{
          state.menuList[key] = metaData.allowMenu[key];
          state.menuList[key].hover = false;
          state.menuList[key].act = key;
        }
      })
      state.quickLink = metaData.quickLink;
    },
    clear(state) {
      state.isLogin = false;
      state.key = '';
      state.metaData = {};
      state.sellerInfo = {};
      state.menuList = {};
      state.quickLink = {};
    },
    setSession(state) {
      storage.set('key',state.key);
      storage.setCookie('key',state.key);
      var keyTime = Date.parse(new Date())
      storage.set('keyTime',keyTime);
      storage.set('guided',state.newLogin == 0 ? true:false);
      storage.set('metaData',state.metaData);
      storage.set('sellerInfo',state.sellerInfo);
      storage.set('menuList',state.menuList);
      storage.set('quickLink',state.quickLink);
    },
    setMenuListItem(state,obj){
      state.menuList = obj;
    },
    setMenuList(state,menuList){
      state.menuList = menuList;
    },
    setOrderTips(state,orderTips){
      state.orderTips = orderTips;
    },
    setQuickLink(state,quickLink){
      state.quickLink = quickLink;
    },
    setIsReceiveOrder(state,isReceiveOrder){
      state.isReceiveOrder = isReceiveOrder;
    },
    setCurTabMenu(state,curTabMenu){
      var curtabSplit = curTabMenu.split('/');
      if(curtabSplit.length > 4){
        //这个不能修改，修改了带传参的页面无法显示
        state.curTabMenu =  curtabSplit[3]?curtabSplit[3]:'';
        // state.curTabMenu =  curtabSplit[curtabSplit.length-1]?curtabSplit[curtabSplit.length-1]:'';
      }else{
        state.curTabMenu =  curTabMenu .substring(curTabMenu.lastIndexOf("\/") + 1, curTabMenu.length);
      }
    },

  },
  actions: {
    async setLogin({commit,dispatch}, loginInfo) {
      const data = await api.auth.login(loginInfo);
      if (data.resultCode === 1) {
        // if(data.responseContent.isOwnShop)
        // {
        //   window.location.href = data.responseContent.ownShopUrl;
        //   return;
        // }
        Vue.prototype.eventBus.$emit('doLogin');
        commit('setLoginData', data.responseContent)
        commit('setSession')
      }else if(data.resultCode == 200003){
        dispatch("checkLogin");
      }
      return data;
    },


    checkLogin({commit}) {
      const metaData = storage.get('metaData') || {};

      if(Object.keys(metaData).length === 0){
          //没缓存数据
          Vue.prototype.eventBus.$emit('gotoLogin');
      }else{
        //有缓存数据
        var cookieKey = storage.getCookie('key');
        if(!cookieKey){
          var login = window.location.origin + window.location.pathname+'#/login';
          window.location.href = login;
          localStorage.clear();
        }
        var keyTime = storage.get("keyTime");
        var nowTime = Date.parse(new Date());
        var time = nowTime - keyTime;
        if(time > 24*3600*1000){
          // key过期
          // util.msg("授权过期");
          storage.set('keyTime',null);
          storage.set('key',null);
          storage.setCookie('key',null);
          Vue.prototype.eventBus.$emit('gotoLogin');
        }else{
          Vue.prototype.eventBus.$emit('doLogin');
          commit('setLoginData', metaData)
          commit('setSession')
        }
      }
    },
    async logOut({commit}) {
        let param = {'key':storage.getCookie('key')}
        const data = await api.auth.logOut(param);
        console.log(data);
        if (data.resultCode === 1) {

            commit('clear');
            commit('setSession')

            // var body = $("body")
            // var script = body.find("script:last").remove();
            // $("<scri" + "pt>" + "</scr" + "ipt>").attr({src: "/app.js", type: 'text/javascript' }).appendTo(body);
            // var url = window.location.origin + window.location.pathname+"#/login"
            // window.location.reload();
            //  window.location.href = url;
            Vue.prototype.eventBus.$emit('gotoLogin');
        }
    },

    //新的退出登陆方法
    logOutNew({commit}) {
      commit('clear');
      commit('setSession')
      localStorage.clear();
      window.location.reload();

    },

    //判断商家是否登陆
    async checkCode({commit}, data) {
      const requestData = await api.auth.checkCode(data);
      util.authExpire(requestData);
      return requestData;
    },
    //验证码校验
    async isSellerLogin({commit}, data) {
      const requestData = await api.auth.isSellerLogin(data);
      return requestData;
    },
    /**
     * 直接调用handle方法
     * @deprecated
     * @param dispatch
     * @param commit
     * @returns {Q.Promise<Function> | Q.Promise<Function | never> | * | PromiseLike<Function | never>}
     */
    handleData({dispatch, commit}) {
      return dispatch('setMetaData').then(() => function () {
        commit('setSellerInfo')
        commit('setMenuList')
      })
    },
  },
  modules: {
    app,
    home,
    sotreSetting,
    qmStoreClass,
    storeClass,
    storeTransaction,
    storeEvaluate,
    storeTotal,
    storeSaleStatistics,
    diliveryman,
    favoritesStore,
    inventoryWarning:inventoryWarning,
    storeApAdv:storeApAdv,
    account,
    accountList,
    groupList,
    Storeinfo,
    storeGoodsOnline:storeGoodsOnline,
    saleAct:saleAct,
  	storeGoodsStorage:storeGoodsStorage,
    storePayment:storePayment,
    storeTransactionOffline,
    json,
    unionpay:unionpay,
    register,
    storeOrder:storeOrder,
    storeReceiving:storeReceiving,
    storeGoodsClass:storeGoodsClass,
    storeCoupon:storeCoupon,
    storeGoodsAdd:storeGoodsAdd,
    storeDelivery,
    saleActAdd:saleActAdd,
    storePoster:storePoster,
    importGoods:importGoods,
    cutAct:cutAct
  }
})

export default store
