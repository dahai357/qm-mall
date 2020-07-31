import api from 'api'
import storage from './../../libs/utils/storage';
import Vue from 'vue'
export default {
  state:{
    templateDialog:false
  },
  getters:{
    getTemplateDialog(state){
      return state.templateDialog;
    }
  },
  mutations:{
    setTemplateDialog(state,value){
      state.templateDialog = value
    }
  },
  actions:{

  }
}
