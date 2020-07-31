import request from '../libs/utils/request'

export default {

    // 广告位列表
  async getList(data){
    return await request({
      url:'/storeAdv/getList',
      data:data,
      method:'post'
    })
  },

   // 新增、编辑广告位
   async advEdit(data){
    return await request({
      url:'/storeAdv/advEdit',
      data:data,
      method:'post'
    })
  },

  // 删除广告位
  async advDelete(data){
    return await request({
      url:'/storeAdv/advDelete',
      data:data,
      method:'post'
    })
  },

  // 设置广告状态
  async setUse(data){
    return await request({
      url:'/storeAdv/setUse',
      data:data,
      method:'post'
    })
  },
  //获取单个广告详情
    async getOneAdv(data){
        return await request({
            url:'/storeAdv/getOneAdv',
            data:data,
            method:'post'
        })
    },
}
