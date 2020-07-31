import request from '../libs/utils/request'

export default {

 // 店铺首页推荐分类列表
 async getClassList(data){
    return await request({
      url:'/storeGoodsClass/getClassList',
      data:data,
      method:'post'
    })
  },

  // 编辑/新增分类
 async classEdit(data){
    return await request({
      url:'/storeGoodsClass/classEdit',
      data:data,
      method:'post'
    })
  },

  // 设置店铺首页推荐分类排序
 async setClassSort(data){
  return await request({
    url:'/storeGoodsClass/setClassSort',
    data:data,
    method:'post'
  })
},


// 删除分类
async dropClass(data){
  return await request({
    url:'/storeGoodsClass/dropClass',
    data:data,
    method:'post'
  })
},

// 获取分类商品列表
async getGoodsList(data){
  
  return await request({
    url:'/storeGoodsClass/getGoodsList',
    data:data,
    method:'post'
  })
},

// 首页推荐分类搜索商品
async searchGoods(data){
  var url = '';
  if(data.type == 'store_goods_class'||data.type == 'store_coupon'){
    url = '/storeGoodsClass/searchGoods'
  }
  if(data.type == 'store_promotion_bundling'||data.type == 'store_coupon_gift' || data.type == 'sale_act_goods'){
    url = '/storePromotionBundling/searchGoods'
  }else if(data.type == 'store_promotion_bundling_goods'){
    url = '/storePromotionBundling/searchGoodsCommon'
  }
  return await request({
    url:url,
    data:data,
    method:'post'
  })
},

// 保存首页推荐分类商品
async saveGoods(data){
  return await request({
    url:'/storeGoodsClass/saveGoods',
    data:data,
    method:'post'
  })
},

//编辑分类和商品
async saveClassAndGoods(data){
    return await request({
        url:'/storeGoodsClass/saveClassAndGoods',
        data:data,
        method:'post'
    });
},


}
