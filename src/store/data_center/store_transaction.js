import api from 'api'
import storage from './../../libs/utils/storage';
import Vue from 'vue'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 签约申请费用计算
    async getStoreTransactionList({commit}, data) {
      const requestData = await api.storeTransaction.getStoreTransactionList(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }
    },
    // 线上订单交易明细列表数据导出
    async exportStoreTransactionList({commit}, data) {
      const requestData = await api.storeTransaction.exportStoreTransactionList(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }
    },
    // 获取订单详情
    async getOrderDetailInfo({commit}, data) {
      const requestData = await api.storeTransaction.getOrderDetailInfo(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }
    },
  }
}
