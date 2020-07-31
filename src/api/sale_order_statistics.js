import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
  async getSaleOrderList(data){
    const requestData =  await request({
      url:'/SaleOrderStatistics/getSaleOrderList',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  async getSaleOrderStatistics(data){
    const requestData =  await request({
      url:'/SaleOrderStatistics/getSaleOrderStatistics',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
}
