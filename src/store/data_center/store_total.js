
import api from 'api'
import storage from './../../libs/utils/storage';
import Vue from 'vue'
export default {
  state:{
   
  },
  getters:{
    
  },
  mutations:{
    
  },
  actions:{
    //获取线上交易统计列表数据
    async getStoreTotalList({commit}, data) {
        const requestData = await api.storeTotal.getStoreTotalList(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
//线上交易统计excel文件导出
async exportStoreTotalList({commit}, data) {
  const requestData = await api.storeTotal.exportStoreTotalList(data);
  if (requestData.resultCode === 1) {
    return requestData.responseContent
  }
}
  }
}
