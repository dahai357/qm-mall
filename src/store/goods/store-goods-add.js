import api from 'api'
import storage from './../../libs/utils/storage';
import Vue from 'vue'
export default {
  namespaced:true,
  state:{
    goodsInfo:''
  },
  getters:{
    getGoodsInfo(state){
      return state.goodsInfo;
    }
  },
  mutations:{
    setGoodsInfo(state,value){
      state.goodsInfo = value
    }
  },
  actions:{
    async getGoodsInfo({commit}, data) {
      const requestData = await api.storeGoodsAdd.getEditGoodsList(data);
      return requestData;
    },
    async hasImgMenu({commit}, data) {
      const requestData = await api.storeGoodsAdd.hasImgMenu(data);
      return requestData;
    }
  }
}
