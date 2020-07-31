
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
    async dadaList({commit}, data) {
        var vue = new Vue();
        const requestData = await api.storeDelivery.dadaList(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }else{
            vue.layer.msg(requestData.longMessage);
        }
    },
    async getDadaAccounts({commit}, data) {
        var vue = new Vue();
        const requestData = await api.storeDelivery.getDadaAccounts(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }else{
            vue.layer.msg(requestData.longMessage);
        }
    },
    async saveDada({commit}, data) {
      const requestData = await api.storeDelivery.saveDada(data);
      return requestData;
    },
    async getDadaRecharge({commit}, data) {
      const requestData = await api.storeDelivery.getDadaRecharge(data);
      return requestData;
    }
  }
}
