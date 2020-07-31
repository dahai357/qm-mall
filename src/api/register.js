import request from '../libs/utils/request'
import axios from "axios";
import Vue from 'vue'

export default {
  // 获取第一步注册信息
  async getRegisterStepOne(data) {
    return await request({
      url: '/account/getRegisterStepOne',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //发送手机验证码  msgtype类型：注册register，找回密码findpwd
  async sendSms(data) {
    return await request({
      url: '/account/sendSms',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //注册第一步
  async registerStepOne(data) {
    return await request({
      url: '/account/registerStepOne',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //获取第二步注册信息
  async getRegisterStepTwo(data) {
    return await request({
      url: '/account/getRegisterStepTwo',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //注册第二步
  async registerStepTwo(data) {
    return await request({
      url: '/account/registerStepTwo',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //检测手机是否符合邀请条件
  async checkInviter(data) {
    return await request({
      url: '/account/checkInviter',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //获取注册第三步信息
  async getRegisterStepThree(data) {
    return await request({
      url: '/account/getRegisterStepThree',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //注册第三步
  async registerStepThree(data) {
    return await request({
      url: '/account/registerStepThree',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //分类搜索
  async getSecondGcListByGcName(data) {
    return await request({
      url: '/account/getSecondGcListByGcName',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //忘记密码第一步
  async modifyOne(data) {
    return await request({
      url: '/account/modifyOne',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //取忘记密码第一步数据
  async getModifyOne(data) {
    return await request({
      url: '/account/getModifyOne',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //忘记密码第二步
  async modifyTwo(data) {
    return await request({
      url: '/account/modifyTwo',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  //注册上传注册相关图片文件（未登录情况调用）
  async nologinUploadBase64Img(data) {
    return await request({
      url: '/account/uploadBase64Img',
      data: data,
      method: 'post',
      authLogin:false
    })
  },
  // 获取申请分类详情--最新(未登录情况)
  async getGoodsClassInfoNoLogin(data){
    return await request({
      url:'/account/getGoodsClassInfoNoLogin',
      data:data,
      method: 'post',
      authLogin:false
    })
  },
  async makeCode(data){
    return await request({
      url:'/account/makeCode',
      data:data,
      method: 'post',
      authLogin:false
    })
  },
  //重新从登陆也进来注册，清掉原本的缓存
  async cleanRegisterInfo(data){
    return await request({
      url:'/account/cleanRegisterInfo',
      data:data,
      method: 'post',
      authLogin:false
    })
  },
  //复审 不通过 ，登录跳转注册第二步，设置缓存
  async setRegisterInfo(data){
    return await request({
      url:'/account/setRegisterInfo',
      data:data,
      method: 'post',
      authLogin:false
    })
  },
}

