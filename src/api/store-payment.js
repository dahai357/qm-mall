import request from "../libs/utils/request";

export default {
  //发送验证码
  async sendVerify(data){
    const requestData =  await request({
      url:'/storePayment/sendVerify',
      data:data,
      method:'post'
    });
    return requestData
  },


  //获取支付配置信息
  async getInfo(data){
    const requestData =  await request({
      url:'/storePayment/getInfo',
      data:data,
      method:'post'
    });
    return requestData
  },

  //对公账户验证
  async companyAccountVerify(data){
    const requestData =  await request({
      url:'/storePayment/companyAccountVerify',
      data:data,
      method:'post'
    });
    return requestData
  },
  //发起对公账户验证
  async requestAccountVerify(data){
    const requestData =  await request({
      url:'/storePayment/requestAccountVerify',
      data:data,
      method:'post'
    });
    return requestData
  },
  //保存基本信息
  async saveStepOne(data){
    const requestData =  await request({
      url:'/storePayment/saveStepOne',
      data:data,
      method:'post'
    });
    return requestData
  },

  //保存商户信息
  async saveStepTwo(data){
    const requestData =  await request({
      url:'/storePayment/saveStepTwo',
      data:data,
      method:'post'
    });
    return requestData
  },

  //保存结算账户
  async saveInfo(data){
    const requestData =  await request({
      url:'/storePayment/saveInfo',
      data:data,
      method:'post'
    });
    return requestData
  },

  // 协议签订地址
async agreementSign(data){
  return await request({
    url:'/storePayment/agreementSign',
    data:data,
    method:'post'
  })
},
}
