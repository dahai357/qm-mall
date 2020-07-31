import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
// 活动列表
  async getList(data){
    const requestData =  await request({
      url:'/storePoster/getList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  async getTemplate(data){
    const requestData =  await request({
      url:'/storePoster/getTemplate',
      data:data,
      method:'post'
    })
    return requestData
  },
  async saveTemplate(data){
    const requestData =  await request({
      url:'/storePoster/saveTemplate',
      data:data,
      method:'post'
    })
    return requestData
  },
  async getHistoryList(data){
    const requestData =  await request({
      url:'/storePoster/getHistory',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  async delHistory(data){
    const requestData =  await request({
      url:'/storePoster/delHistory',
      data:data,
      method:'post'
    })
    return requestData
  },
  async copyHistory(data){
    const requestData =  await request({
      url:'/storePoster/copyHistory',
      data:data,
      method:'post'
    })
    return requestData
  },
  async searchGoods(data){
    const requestData =  await request({
      url:'/storePoster/searchGoods',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  async searchClass(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/getThirdClassList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  async searchBundlingList(data){
    const requestData =  await request({
      url:'/storePoster/searchBundlingList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  async searchSaleActList(data){
    const requestData =  await request({
      url:'/storePoster/searchSaleActList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  async searchSaleActMan(data){
    const requestData =  await request({
      url:'/saleAct/getSaleList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  async searchCouponList(data){
    const requestData =  await request({
      url:'/storePoster/searchCouponList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  async saveImgHistory(data){
    const requestData =  await request({
      url:'/storePoster/saveImgHistory',
      data:data,
      method:'post'
    })
    return requestData
  },
  async checkSaleMan(data){
    const requestData =  await request({
      url:'/storePoster/checkSaleMan',
      data:data,
      method:'post'
    })
    return requestData
  },
}
