import api from 'api'
import Vue from 'vue'
export default {
    
    namespaced:true,

    state:{
    
    },
    getters:{
        
    },
    mutations:{
        
    },
    actions:{
        //取该分类的下级分类数据（用于下拉框联动）
        async loadClass({commit}, data) {
            const requestData = await api.storeGoodsOnline.loadClass(data);
            return requestData
        },

    }   
}
