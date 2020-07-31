import request from '../libs/utils/request'

export default {
    // 获取一级分类
  async getFirstClassList(data){
    return await request({
      url:'/storeClass/getFirstClassList',
      data:data,
      method:'post'
    })
  },  

  // 获取二级分类
  async getSubClassList(data){
    return await request({
      url:'/storeClass/getSubClassList',
      data:data,
      method:'post'
    })
  },

  // 获取树形二级分类
  async getSubClassListForTree(data){
      return await request({
          url:'/storeClass/getSubClassListForTree',
          data:data,
          method:'post'
      })
  },

    // 编辑、新增三级分类
  async classEdit(data){
    return await request({
      url:'/storeClass/classEdit',
      data:data,
      method:'post'
    })
  },  

  // 删除分类
  async dropClass(data){
    return await request({
      url:'/storeClass/dropClass',
      data:data,
      method:'post'
    })
  },

  // 获取分类广告图片
  async getAdvertisements(data){
    return await request({
      url:'/storeClass/getAdvertisements',
      data:data,
      method:'post'
    })
  },

   // 保存商品分类广告
   async advertisements(data){
    return await request({
      url:'/storeClass/advertisementsEdit',
      data:data,
      method:'post'
    })
  },
    // 获取店铺分类对应广告列表
    async getClassAdvList(data){
        return await request({
            url:'/storeClass/getClassAdvList',
            data:data,
            method:'post'
        })
    },

    // 获取店铺指定分类广告图数量
    async getClassAdvCount(data){
        return await request({
            url:'/storeClass/getClassAdvCount',
            data:data,
            method:'post'
        })
    },
  // 三级分类排序
  async setSort(data){
    return await request({
      url:'/storeClass/setSort',
      data:data,
      method:'post'
    })
  },

}
