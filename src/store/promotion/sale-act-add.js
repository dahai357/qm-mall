import api from 'api'
import storage from './../../libs/utils/storage';
import Vue from 'vue'
export default {
  namespaced:true,
  state:{
    salesManageDialog:false
  },
  getters:{
    getSalesManageDialog(state){
      return state.salesManageDialog;
    }
  },
  mutations:{
    setSalesManageDialog(state,value){
      state.salesManageDialog = value
    }
  },
  actions:{

  }
}
