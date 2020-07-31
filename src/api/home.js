import request from '../libs/utils/request'
import axios from "axios";
import Vue from 'vue'

export default {

  //获取问题数据
    async getProList (data) {
      return await request({
        url:'/Storeinfo/getStoreFaq',
        method:'post',
        data: data
      })
    },

    //获取统计数据
    async getCountData (data) {
        return await request({
          url:'/storeIndex/getData',
          method:'post',
          data: data
        })
      },

      //获取统计数据
    async getStoreSetting (data) {
      return await request({
        url:'/storeSetting/getBaseSet',
        method:'post',
        data: data
      })
    },

    // 获取经营分类列表
    async getClassList (data) {
      return await request({
        url:'/qmStoreClass/getClassList',
        method:'post',
        data: data
      })
    },

    //更新常用菜单
    async updateQuickLink (data) {
      return await request({
        url:'/storeIndex/updateQuickLink',
        method:'post',
        data: data
      })
    },

    async getHomeData(data){
      Vue.prototype.requestAll = true;
      return axios.all([
        this.getCountData(data),
        this.getStoreSetting(data),
        this.getClassList(data)
      ]);
    },

    //检测是否有新的订单
    async checkReceiveOrder (data) {
      return await request({
        url:'/StoreGoodsAdd/checkReceiveOrder',
        method:'post',
        data: data
      })
    },
  //获取文章列表
  async getArticleList(data){
    const requestData =  await request({
      url:'/StoreIndex/getArticleList',
      data:data,
      method:'post'
    });
    return requestData.responseContent;
  },
  //获取文章详情
  async getArticleDetail(data){
    const requestData =  await request({
      url:'/StoreIndex/articleDetail',
      data:data,
      method:'post'
    });
    return requestData.responseContent;
  },
}
