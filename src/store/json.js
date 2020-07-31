
import api from 'api'
import Vue from 'vue';

export default {
  state:{
   
  },
  getters:{
    
  },
  mutations:{
    
  },
  actions:{
    // 获取城市json数据
    async getCityJson({commit}, data) {
        const res = await api.json.getCityJson(data);
        if(res.status == 200){
          return res.data;
        }else{
          var vue = new Vue();
          vue.layer.msg('找不到对应的数据');
        }
    },

    // 获取行业json数据
    async getIndustryJson({commit}, data) {
      const res = await api.json.getIndustryJson(data);
      if(res.status == 200){
        return res.data;
      }else{
        var vue = new Vue();
        vue.layer.msg('找不到对应的数据');
      }
  },
    
  }
}
