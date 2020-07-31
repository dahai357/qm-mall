import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
  //库存预警列表
  async warnGoodsList(data){
    const requestData =  await request({
      url:'/Inventorywarning/getWarnGoodsList',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //设置默认库存预警值
  async setDefaultWarning(data){
    const requestData =  await request({
      url:'/Inventorywarning/setDefaultWarning',
      data:data,
      method:'post'
    });
    return requestData
  },
  //单个商品增补库存
  async changeStorage(data){
    const requestData =  await request({
      url:'/Inventorywarning/changeStorage',
      data:data,
      method:'post'
    });
    return requestData
  },
  //多个商品批量增补库存
  async inventoryAddBatch(data){
    const requestData =  await request({
      url:'/Inventorywarning/inventoryAddBatch',
      data:data,
      method:'post'
    });
    return requestData
  },
  //忽略库存预警
  async ignoreGoods(data){
    const requestData =  await request({
      url:'/Inventorywarning/ignoreGoods',
      data:data,
      method:'post'
    });
    return requestData
  },
  //是否有库存预警
  async isInventoryWarning(data){
    const requestData =  await request({
      url:'/Inventorywarning/isInventoryWarning',
      data:data,
      method:'post'
    });
    return requestData
  },

  async modifyWarning(data){
    const requestData =  await request({
      url:'/Inventorywarning/modifyWarning',
      data:data,
      method:'post'
    });
    return requestData
  },
}
