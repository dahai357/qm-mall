import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
// 退款记录列表数据
  async storeRefundList(data){
    const requestData =  await request({
      url:'/storeRefund/index',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  // 确认收货
  async confirmReceive(data){
    const requestData =  await request({
      url:'/storeReturn/confirmReceive',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
  // 标记为已退款
  async makeRefund(data){
    const requestData =  await request({
      url:'/storeRefund/makeRefund',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
// 获得售后列表（查看按钮）
  async getRefunds(data){
    const requestData =  await request({
      url:'/storeRefund/getRefunds',
      data:data,
      method:'post'
    })
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },

  // 同意退款
  async agree(data){
    const requestData =  await request({
      url:'/storeRefund/agree',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },

  // 拒绝退款
  async refuse(data){
    const requestData =  await request({
      url:'/storeRefund/refuse',
      data:data,
      method:'post',
      showMessage:true
    })
    return requestData
  },
  //获取单条退款订单详情
  async getDetailRefund(data){
    const requestData =  await request({
      url:'/Storerefund/getDetailRefund',
      data:data,
      method:'post'
    })
    return requestData;
  },
}
