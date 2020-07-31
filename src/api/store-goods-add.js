import util from '../libs/utils/util'
import request from "../libs/utils/request";

export default {
  //获取填写商品详情页数据
  async getAddStepTwoList(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/getAddStepTwoList',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //编辑商品页面渲染数据
  async getEditGoodsList(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/getEditGoodsList',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //获取属性对应的规格详情数据
  async getStoreAttributeValue(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/getStoreAttributeValue',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //新增/编辑属性对应的规格详情数据
  async addStoreAttributeValue(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/addStoreAttributeValue',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //删除属性
  async delStoreAttribute(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/delStoreAttribute',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //删除属性值
  async delStoreAttributeValue(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/delStoreAttributeValue',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //图片空间获取图片列表信息
  async getPicList(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/getPicList',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //获取签约商品分类列表
  async getFirstClass(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/getFirstClass',
      data:data,
      method:'post'
    });
    return requestData.responseContent;
  },
  //通过父类商品分类ID获取所有子商品分类
  async getSubClass(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/getSubClass',
      data:data,
      method:'post'
    });
    return requestData.responseContent;
  },
  //获取商家常用的商品分类
  async getStapleList(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/getStapleList',
      data:data,
      method:'post'
    });
    return requestData.responseContent;
  },
  //删除商家常用的商品分类
  async delStaple(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/delStaple',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //店铺商品分类快速搜索
  async getStoreClassList(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/getStoreClassList',
      data:data,
      method:'post'
    });
    return requestData.responseContent;
  },
  //新增时保存商品
  async saveGoods(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/saveGoods',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //管理属性 属性列表
  async getStoreAttribute(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/getStoreAttribute',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //删除属性
  async delStoreAttribute(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/delStoreAttribute',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //商品新增第三步添加图片数据渲染
  async getAddStepThree(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/getAddStepThree',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //商品新增第三步添加图片保存
  async saveImage(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/saveImage',
      data:data,
      method:'post'
    });
    return requestData;
  },
  //是否有编辑图片菜单
  async hasImgMenu(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/hasImgMenu',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //商品发布页面商品名称模糊匹配
  async getGoodsList(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/getGoodsList',
      data:data,
      method:'post'
    });
    if (requestData.resultCode === 1) {
      return requestData.responseContent
    }
  },
  //插入图片空间
  async insertPicSpace(data){
    const requestData =  await request({
      url:'/StoreGoodsAdd/insertPicSpace',
      data:data,
      method:'post'
    });
    return requestData;
  },
}
