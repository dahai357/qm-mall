import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
  //取该分类的下级分类数据（用于下拉框联动）
  async loadClass(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/loadClass',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //删除
  async dropGoods(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/dropGoods',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //下架
  async goodsUnshow(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/goodsUnshow',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //列表
  async geOnlineGoodsList(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/geOnlineGoodsList',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //修改价格
  async modifyPrice(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/modifyPrice',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //修改库存
  async modifyStorage(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/modifyStorage',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //分销管理->设置库存
  async setStorage(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/setStorage',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //编辑普通商品时保存
  async editSaveGoods(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/editSaveGoods',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //编辑供应商商品时保存
  async editStorageSaveGoods(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/editStorageSaveGoods',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //编辑图片数据渲染
  async getEditImage(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/getEditImage',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //编辑图片数据保存
  async editSaveImage(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/editSaveImage',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //获取组合
    async getGroupGoods(data){
        const requestData =  await request({
            url:'/StoreGoodsOnline/getGroupGoods',
            data:data,
            method:'post'
        });
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
    //获取商品参加的促销活动
    async getGoodsPromotion(data){
        const requestData =  await request({
            url:'/StoreGoodsOnline/getGoodsPromotion',
            data:data,
            method:'post'
        });
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
  //获取三级分类
  async getThirdClassList(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/getThirdClassList',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //批量修改商品分类
  async modifyGoodsClass(data){
    const requestData =  await request({
      url:'/StoreGoodsOnline/modifyGoodsClass',
      data:data,
      method:'post'
    });
    return requestData;
  },
}
