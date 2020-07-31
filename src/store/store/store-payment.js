import api from 'api'

export default {
    
  namespaced:true,

  state:{
   
  },
  getters:{
    
  },
  mutations:{
    
  },
  actions:{

    // 发送验证码
    async sendVerify({commit}, data) {
        const requestData = await api.storePayment.sendVerify(data);
        return requestData
    },
    // 获取支付配置信息
    async getInfo({commit}, data) {
        const requestData = await api.storePayment.getInfo(data);
        return requestData
    },

    // 对公账户验证
    async companyAccountVerify({commit}, data) {
        const requestData = await api.storePayment.companyAccountVerify(data);
        return requestData
    },
    // 发起对公账户验证
    async requestAccountVerify({commit}, data) {
      const requestData = await api.storePayment.requestAccountVerify(data);
      return requestData
    },
     // 保存基本信息
     async saveStepOne({commit}, data) {
        const requestData = await api.storePayment.saveStepOne(data);
        return requestData
    },

    // 保存商户信息
    async saveStepTwo({commit}, data) {
        const requestData = await api.storePayment.saveStepTwo(data);
        return requestData
    },

    // 保存结算账户
    async saveInfo({commit}, data) {
        const requestData = await api.storePayment.saveInfo(data);
        return requestData
    },   

    // 协议签订地址
    async agreementSign({commit}, data) {
        const requestData = await api.storePayment.agreementSign(data);
            return requestData;
      },
  }
}
