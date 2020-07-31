
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
    async uploadFile({commit}, data) {
        var vue = new Vue();
        const requestData = await api.storeSetting.uploadFile(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }else{
            vue.layer.msg(requestData.longMessage);
        }
    },

    async multipleUploadFile({commit}, data) {
        var vue = new Vue();
        const requestData = await api.storeSetting.multipleUploadFile(data);
        vue.layer.msg(requestData[requestData.length-1].longMessage);
        Vue.prototype.requestAll = false;
        return requestData;
    },


    async baseSet({commit}, data) {
        const requestData = await api.storeSetting.baseSet(data);
        return requestData
    },

    async switchSet({commit}, data) {
      var vue = new Vue();
      const requestData = await api.storeSetting.switchSet(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }else{
            vue.layer.msg(requestData.longMessage);
        }
    },
// 保存搜索配置
    async searchConfigSet({commit}, data) {
        const requestData = await api.storeSetting.searchConfigSet(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
 // 保存支付配置
    async paySet({commit}, data) {
        var vue = new Vue();
        const requestData = await api.storeSetting.paySet(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }else{
            vue.layer.msg(requestData.longMessage);
        }
    },
  // 保存配送配置
    async distributionSet({commit}, data) {
        const requestData = await api.storeSetting.distributionSet(data);
            return requestData
    },
// 获取自主配送数据
    async getDistributionSet({commit}, data) {
        const requestData = await api.storeSetting.getDistributionSet(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },

// 获取配送公式列表
  async getTemplateList({commit}, data) {
      const requestData = await api.storeSetting.getTemplateList(data);
      if (requestData.resultCode === 1) {
          return requestData.responseContent
      }
  },


    // 旧手机方式验证码
    async sendOldPhone({commit}, data) {
        const requestData = await api.storeSetting.sendOldPhone(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
  // 新手机方式验证码
    async sendNewPhone({commit}, data) {
        const requestData = await api.storeSetting.sendNewPhone(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
    // 修改手机绑定
    async modifyPhone({commit}, data) {
        const requestData = await api.storeSetting.modifyPhone(data);
        return requestData
    },

    // 保存打印配置
    async printSet({commit}, data) {
        const requestData = await api.storeSetting.printSet(data);
        return requestData
    },

    //检查配送公式合法性
    async checkFormula({commit}, data) {
        const requestData = await api.storeSetting.checkFormula(data);
        return requestData
    }

  }
}
