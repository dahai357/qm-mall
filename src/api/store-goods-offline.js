import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
  //库存预警列表
  async getOfflineGoodsList(data){
    const requestData =  await request({
      url:'/StoreGoodsOffline/getOfflineGoodsList',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //上架
  async goodsShow(data){
    const requestData =  await request({
      url:'/StoreGoodsOffline/goodsShow',
      data:data,
      method:'post'
    });
    return requestData;
  },
}
