import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
  //供应商商品库商品列表
  async getSupplierGoodsList(data){
    const requestData =  await request({
      url:'/StoreGoodsStorage/getSupplierGoodsList',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //获取店铺已缴费二级分类对应的供应商信息
  async getSupplierList(data){
    const requestData =  await request({
      url:'/StoreGoodsStorage/getSupplierList',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //批量，多个复制供应商商品加入商品
  async copyAllSaveData(data){
    const requestData =  await request({
      url:'/StoreGoodsStorage/copyAllSaveData',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //通过供应商商品复制加入商品页面渲染数据
  async copyOneViewData(data){
    const requestData =  await request({
      url:'/StoreGoodsStorage/copyOneViewData',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //保存数据供应商商品复制加入商品
  async copyOneSaveData(data){
    const requestData =  await request({
      url:'/StoreGoodsStorage/copyOneSaveData',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //查看供应商商品
  async lookGoods(data){
    const requestData =  await request({
      url:'/StoreGoodsStorage/lookGoods',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //获取商家所有签约分类
  async getAllClass(data){
    const requestData =  await request({
      url:'/StoreGoodsStorage/getAllClass',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //分类是否存在
  async checkHasClass(data){
    const requestData =  await request({
      url:'/StoreGoodsStorage/checkHasClass',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData
    }
  },
}
