
import api from 'api'
import storage from './../../libs/utils/storage';
import Vue from 'vue'
export default {
  state:{
    updateList:false,
    invoice:false,
    curUrl:'',
  },
  getters:{
    getUpdateList(state){
      return state.updateList;
    },
    getInvoice(state){
      return state.invoice;
    },
    getCurUrl(state){
      return state.curUrl;
    },
  },
  mutations:{
    setUpdateList(state,data){
      state.updateList = !state.updateList;
    },
    setInvoice(state,invoice){
		state.invoice=!state.invoice    },
    setCurUrl(state,curUrl){
      state.curUrl = !state.curUrl;
    },
  },
  actions:{
    // 签约申请费用计算
    async calcServiceFee({commit}, data) {
        const requestData = await api.qmStoreClass.calcServiceFee(data);
        return requestData

    },

    // 签约分类续费申请
    async serviceFeeSave({commit}, data) {
        const requestData = await api.qmStoreClass.serviceFeeSave(data);
        return requestData
    },

    // 提交支付宝支付
    async aliPay({commit}, data) {
      const requestData = await api.qmStoreClass.aliPay(data);
      if (requestData.resultCode === 1) {
          return requestData.responseContent
      }
    },

    // 轮询支付状态
    async getServiceChargeState({commit}, data) {
      const requestData = await api.qmStoreClass.getServiceChargeState(data);
          return requestData;
    },

    // 分类缴费记录
    async serviceFee({commit}, data) {
      const requestData = await api.qmStoreClass.serviceFee(data);
      if (requestData.resultCode === 1) {
          return requestData.responseContent;
      }
    },

    // 保证金往来记录
    async depositList({commit}, data) {
      const requestData = await api.qmStoreClass.depositList(data);
      if (requestData.resultCode === 1) {
          return requestData.responseContent;
      }
    },

    
    // 获取开票申请记录
    async classInvoiceList({commit}, data) {
      const requestData = await api.qmStoreClass.classInvoiceList(data);
      if (requestData.resultCode === 1) {
          return requestData.responseContent;
      }
    },

    // 获取商铺入住信息
    async getJoinInfo({commit}, data) {
      
      const requestData = await api.qmStoreClass.getJoinInfo(data);
      if (requestData.resultCode === 1) {
          return requestData.responseContent;
      }
    },

    // 保存开票信息
    async classInvoiceAdd({commit}, data) {
      const requestData = await api.qmStoreClass.classInvoiceAdd(data);
      return requestData;
    },

    // 搜索分类
    async getAvailGcClass({commit}, data) {
      const requestData = await api.qmStoreClass.getAvailGcClass(data);
      if (requestData.resultCode === 1) {
          return requestData.responseContent;
      }
    },

    // 获取申请分类详情
    async getClassInfo({commit}, data) {
      const requestData = await api.qmStoreClass.getClassInfo(data);
      if (requestData.resultCode === 1) {
          return requestData.responseContent;
      }
    },
    
    // 获取申请分类详情--最新
    async getGoodsClassInfo({commit}, data) {
      const requestData = await api.qmStoreClass.getGoodsClassInfo(data);
      if (requestData.resultCode === 1) {
          return requestData.responseContent;
      }
    },

    // 新分类申请提交
    async classApply({commit}, data) {
      const requestData = await api.qmStoreClass.classApply(data);
          return requestData;
    },


    // 签约分类申请||普通转签约申请
    async changeToSign({commit}, data) {
      const requestData = await api.qmStoreClass.changeToSign(data);
          return requestData;
    },

    // 重新申请签约分类
    async reChangeToSign({commit}, data) {
      const requestData = await api.qmStoreClass.reChangeToSign(data);
          return requestData;
    },

    // 保证金退回
    async depositReturn({commit}, data) {
      const requestData = await api.qmStoreClass.depositReturn(data);
          return requestData;
    },

    // 保证金信息
    async getDepositInfo({commit}, data) {
      const requestData = await api.qmStoreClass.getDepositInfo(data);
          return requestData;
    },

    // 保证金提交审核
    async depositSave({commit}, data) {
      const requestData = await api.qmStoreClass.depositSave(data);
          return requestData;
    },


    
  }
}
