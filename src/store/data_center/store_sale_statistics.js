
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
    async getSaleStatisticsList({commit}, data) {
        const requestData = await api.storeSaleStatistics.getSaleStatisticsList(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
//线上交易统计excel文件导出
async exportSaleStatisticsList({commit}, data) {
  const requestData = await api.storeSaleStatistics.exportSaleStatisticsList(data);
  if (requestData.resultCode === 1) {
    return requestData.responseContent
  }
}
  }
}
