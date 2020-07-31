import request from '../libs/utils/request'

export default {
  // 活动列表
  async getList(data){
    const requestData =  await request({
      url:'/cutActivity/getList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 删除活动
  async activeDel(data){
    const requestData =  await request({
      url:'/cutActivity/delete',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
  // 编辑、新增活动
  async activityEdit(data){
    const requestData =  await request({
      url:'/cutActivity/add',
      data:data,
      method:'post',
      showMessage:false
    })
    return requestData
  },

  // 活动详情
  async getDetail(data){
    const requestData =  await request({
      url:'/cutActivity/detail',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 活动基础信息
  async getBaseInfo(data){
    const requestData =  await request({
      url:'/cutActivity/baseInfo',
      data:data,
      method:'post'
    })
    return requestData
  },
  // 活动商品列表
  async getGoods(data){
    const requestData =  await request({
      url:'/cutActivity/getGoods',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 发起记录列表
  async getOriginJoinList(data){
    const requestData =  await request({
      url:'/cutActivity/getOriginJoinList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // banner列表
  async getBanners(data){
    const requestData =  await request({
      url:'/cutActivity/getBanners',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 编辑banner
  async setBanner(data){
    const requestData =  await request({
      url:'/cutActivity/setBanner',
      data:data,
      method:'post',
      showMessage:false
    })
    return requestData
  },
}
