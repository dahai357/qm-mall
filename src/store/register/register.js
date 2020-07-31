import api from 'api'
import storage from './../../libs/utils/storage';
import Vue from 'vue';
import util from 'lib/utils/util';

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    //获取第一步注册信息
    async getRegisterStepOne({commit}, data) {
      const requestData = await api.register.getRegisterStepOne(data);
      util.authExpire(requestData);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }
    },
    //获取注册第三步信息
    async getRegisterStepThree({commit}, data) {
      const requestData = await api.register.getRegisterStepThree(data);
      util.authExpire(requestData);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }
    },
    async sendSms({commit}, data) {
      const requestData = await api.register.sendSms(data);
      util.authExpire(requestData);
      //resultCode 为1是发送成功
      if (requestData.resultCode === 1) {
        return requestData.resultCode;
      }else{
        return requestData.shortMessage;
      }
    },
    async registerStepOne({commit}, data) {
      const requestData = await api.register.registerStepOne(data);
      util.authExpire(requestData);
      //resultCode 为1是发送成功
      return requestData;
    },
    //获取第二步注册信息
    async getRegisterStepTwo({commit}, data) {
      const requestData = await api.register.getRegisterStepTwo(data);
      util.authExpire(requestData);
      return requestData;
    },
    //注册第二步
    async registerStepTwo({commit}, data) {
      const requestData = await api.register.registerStepTwo(data);
      util.authExpire(requestData);
        return requestData
    },
    //检测手机是否符合邀请条件
    async checkInviter({commit}, data) {
      const requestData = await api.register.checkInviter(data);
      util.authExpire(requestData);
        return requestData
    },
    //注册第三步
    async registerStepThree({commit}, data) {
      const requestData = await api.register.registerStepThree(data);
      util.authExpire(requestData);
        return requestData
    },
    //分类搜索
    async getSecondGcListByGcName({commit}, data) {
      const requestData = await api.register.getSecondGcListByGcName(data);
      util.authExpire(requestData);
        return requestData.responseContent
    },
    //忘记密码第一步
    async modifyOne({commit}, data) {
      const requestData = await api.register.modifyOne(data);
      util.authExpire(requestData);
        return requestData;
    },
    //取忘记密码第一步数据
    async getModifyOne({commit}, data) {
      const requestData = await api.register.getModifyOne(data);
      util.authExpire(requestData);
      if (requestData.resultCode === 1) {
        return requestData.responseContent;
      }
    },
    //忘记密码第二步
    async modifyTwo({commit}, data) {
      const requestData = await api.register.modifyTwo(data);
      util.authExpire(requestData);
        return requestData;
    },
    //注册上传注册相关图片文件（未登录情况调用）
    async nologinUploadBase64Img({commit}, data) {
      const requestData = await api.register.nologinUploadBase64Img(data);
      util.authExpire(requestData);
      if (requestData.resultCode === 1) {
        return requestData.responseContent
      }else{
        vue.layer.msg(requestData.longMessage);
      }
    },
    // 获取申请分类详情--最新(未登录)
    async getGoodsClassInfoNoLogin({commit}, data) {
      const requestData = await api.register.getGoodsClassInfoNoLogin(data);
      util.authExpire(requestData);
      if (requestData.resultCode === 1) {
        return requestData.responseContent;
      }
    },
    async makeCode({commit}, data) {
      const requestData = await api.register.makeCode(data);
      util.authExpire(requestData);
      return requestData;
    },
    //重新从登陆也进来注册，清掉原本的缓存
    async cleanRegisterInfo({commit}, data) {
      const requestData = await api.register.cleanRegisterInfo(data);
      util.authExpire(requestData);
      return requestData;
    },
    //复审 不通过 ，登录跳转注册第二步，设置缓存
    async setRegisterInfo({commit}, data) {
      const requestData = await api.register.setRegisterInfo(data);
      util.authExpire(requestData);
      return requestData;
    },
  }
}
