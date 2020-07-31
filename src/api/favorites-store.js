import request from '../libs/utils/request'
import axios from "axios";
import Vue from 'vue'

export default {
    // 店铺会员页面数据获取接口
    async getStoreFavoritesList(data){
      return await request({
        url:'/Storefavorites/getStoreFavoritesList',
        data:data,
        method:'post'
      })},
      // 获取店铺会员标签列表
    async getTagList(data){
      return await request({
        url:'/Storefavorites/getTagList',
        data:data,
        method:'post'
      })},
      // 编辑会员标签
    async addMemberTag(data){
      return await request({
        url:'/Storefavorites/addMemberTag',
        data:data,
        method:'post'
      })},
      // 店铺会员-加入/取消黑名单
    async addBlacklist(data){
          return await request({
            url:'/Storefavorites/addBlacklist',
            data:data,
            method:'post'
      })},
  // 删除店铺会员标签
    async delStoreTag(data){
          return await request({
            url:'/Storefavorites/delStoreTag',
            data:data,
            method:'post',
            showMessage:true
      })},
  // 编辑/新增店铺会员标签
    async addStoreTag(data){
          return await request({
            url:'/Storefavorites/addStoreTag',
            data:data,
            method:'post'
      })},

  // 获取会员等级列表
  async getLevel(data){
    return await request({
      url:'/Storefavorites/getLevel',
      data:data,
      method:'post'
    })},
  // 获取会员等级色号列表
  async getLevelColor(data){
    return await request({
      url:'/Storefavorites/getLevelColor',
      data:data,
      method:'post'
    })},
  //编辑会员等级
  async setLevel(data){
    return await request({
      url:'/Storefavorites/setLevel',
      data:data,
      method:'post'
    })},
  //获取会员等级信息
  async getLevelInfo(data){
    return await request({
      url:'/Storefavorites/getLevelInfo',
      data:data,
      method:'post'
    })},
  //获取已经编辑过的等级数据
  async getUserLevel(data){
    return await request({
      url:'/Storefavorites/getUserLevel',
      data:data,
      method:'post'
    })},
  //查看会员-等级下会员列表
  async getStoreMemberList(data){
    return await request({
      url:'/Storefavorites/getStoreMemberList',
      data:data,
      method:'post'
    })},
  //商家编辑会员
  async updataStoreMember(data){
    return await request({
      url:'/Storefavorites/updataStoreMember',
      data:data,
      method:'post'
    })},
  //批量设置会员标签
  async updataLevel(data){
    return await request({
      url:'/Storefavorites/updataLevel',
      data:data,
      method:'post'
    })},
  //获取当前等级会员数
  async hasLevelMember(data){
    return await request({
      url:'/Storefavorites/hasLevelMember',
      data:data,
      method:'post'
    })},
  //对店铺的等级进行排序
  async setLevelNum(data){
    return await request({
      url:'/Storefavorites/setLevelNum',
      data:data,
      method:'post'
    })},
  //获取店铺导入会员记录列表
  async getImportList(data){
    return await request({
      url:'/Storefavorites/getImportList',
      data:data,
      method:'post'
    })},
  //获取导入中重复的数据
  async getImportRepeatList(data){
    return await request({
      url:'/Storefavorites/getImportRepeatList',
      data:data,
      method:'post'
    })},
  //实际操作导入
  async doImportMember(data){
    return await request({
      url:'/Storefavorites/doImportMember',
      data:data,
      method:'post'
    })},
  //获取店铺导入记录详情数据
  async getImportMember(data){
    return await request({
      url:'/Storefavorites/getImportMember',
      data:data,
      method:'post'
    })},
}

