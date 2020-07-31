import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
// 活动列表
  async bundlingList(data){
    const requestData =  await request({
      url:'/storePromotionBundling/getList',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 删除组合销售
  async dropBundling(data){
    const requestData =  await request({
      url:'/storePromotionBundling/dropBundling',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
  // 活动列表
  async getInfo(data){
    const requestData =  await request({
      url:'/storePromotionBundling/getInfo',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 删除组合销售
  async bundlingEdit(data){
    const requestData =  await request({
      url:'/storePromotionBundling/bundlingEdit',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },

  // 获取活动对应的商品
  async getGoodsCommonListByBlId(data){
      const requestData =  await request({
          url:'/storePromotionBundling/getGoodsCommonListByBlId',
          data:data,
          method:'post'
      })
      if (requestData.resultCode === 1) {
          return requestData.responseContent
      }
  },
}
