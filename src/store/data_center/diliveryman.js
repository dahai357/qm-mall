import api from 'api'
import storage from './../../libs/utils/storage';
import Vue from 'vue'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    //获取线上交易统计列表数据
    async getDiliverymanList({commit}, data) {
      const requestData = await api.diliveryman.getDiliverymanList(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }else{
        return requestData.shortMessage;
      }
    },
    //获取配送员评价标签库
    async getDiliveryLabel({commit}, data) {
      const requestData = await api.diliveryman.getDiliveryLabel(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }else{
        return requestData.shortMessage;
      }
    },
    //配送员续期/解除接口
    async delDiliveryman({commit}, data) {
      const requestData = await api.diliveryman.delDiliveryman(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }else{
        return requestData.shortMessage;
      }
    },
    //配送员配送信息列表
    async getDiliveryLog({commit}, data) {
      const requestData = await api.diliveryman.getDiliveryLog(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }else{
        return requestData.shortMessage;
      }
    },
    //新增或者编辑配送员评价标签
    async addDiliveryLabel({commit}, data) {
      const requestData = await api.diliveryman.addDiliveryLabel(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }else{
        return requestData.shortMessage;
      }
    },
    //删除配送员评价标签库标签
    async delDiliveryLabel({commit}, data) {
      const requestData = await api.diliveryman.delDiliveryLabel(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }else{
        return requestData.shortMessage;
      }
    },
    //新增配送员
    async addDiliveryman({commit}, data) {
      const requestData = await api.diliveryman.addDiliveryman(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }else{
        return requestData.shortMessage;
      }
    },
    //编辑标签获取标签详情
    async getLabelInfo({commit}, data) {
      const requestData = await api.diliveryman.getLabelInfo(data);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }else{
        return requestData.shortMessage;
      }
    },
    //修改配送员
    async editDiliveryman({commit}, data) {
      const requestData = await api.diliveryman.editDiliveryman(data);
          return requestData;
    },
    //修改配送员费用
    async updateDiliverymanFee({commit}, data) {
      const requestData = await api.diliveryman.updateDiliverymanFee(data);
          return requestData;
    },
  }
}
