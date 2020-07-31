import api from 'api'
import storage from './../../libs/utils/storage';
import Vue from 'vue'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 签约申请费用计算
    async getTransactionFlowingList({commit}, data) {
      const requestData = await api.storeTransactionOffline.getTransactionFlowingList(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }
    },
    // 线上订单交易明细列表数据导出
    async exportTransactionFlowingList({commit}, data) {
      const requestData = await api.storeTransactionOffline.exportTransactionFlowingList(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }
    },
    // 获取单条退款订单详情
    async getDetailRefund({commit}, data) {
      const requestData = await api.storeRefund.getDetailRefund(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }
    },
  }
}
