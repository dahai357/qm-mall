import request from '../libs/utils/request'
import consts from '../config/consts'

export default {

  async login (loginInfo) {
    return await request({
      url:'/user/login',
      method:'post',
      data: loginInfo,
      authLogin:false
    })
  },
  // 验证码验证
  async checkCode(data) {
    return await request({
      url: '/Account/checkCode',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //判断商家是否登陆
  async isSellerLogin(data) {
    return await request({
      url: '/Account/isSellerLogin',
      data: data,
      method: 'post'
    })
  },
  async getAccessToken () {
    const accessToken = await request({
      url:'/authInfo/takeAccess',
      method:'post',
      data: {
        nonce: Math.random().toString(36).substr(7),
        timestamp: new Date().getTime(),
        deviceType: consts.DEVICE_TYPE
      },
      requiresAccess:false,
      showMessage:false
    })
    return accessToken.responseContent.key;
  },
  async logOut (data) {
      return await request({
          url:'/seller/logOut',
          method:'post',
          data: data
      })
  }
}
