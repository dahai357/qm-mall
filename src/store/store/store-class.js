
import api from 'api'

export default {
  state:{
      isAdv:false
   
  },
  getters:{
      getIsAdv(state){
          return state.isAdv
      },
  },
  mutations:{
      setIsAdv(state,value){
          state.isAdv = value
      }
  },
  actions:{
      // 获取一级分类
    async getFirstClassList({commit}, data) {
        const requestData = await api.storeClass.getFirstClassList(data);
        return requestData
    },   

      // 获取二级分类
    async getSubClassList({commit}, data) {
        const requestData = await api.storeClass.getSubClassList(data);
        return requestData
    },   

      // 编辑、新增三级分类
      async classEdit({commit}, data) {
        const requestData = await api.storeClass.classEdit(data);
        return requestData
    },   


    // 删除分类
    async dropClass({commit}, data) {
      const requestData = await api.storeClass.dropClass(data);
      return requestData
  },
      //获取店铺分类对应广告列表
      async getClassAdvList({commit}, data) {
        const requestData = await api.storeClass.getClassAdvList(data);
        return requestData
    },

      // 获取店铺指定分类广告图数量
      async getClassAdvCount({commit}, data) {
          const requestData = await api.storeClass.getClassAdvCount(data);
          return requestData
      },

// 获取分类广告图片
      async getAdvertisements({commit}, data) {
        const requestData = await api.storeClass.getAdvertisements(data);
        return requestData
    },   

    // 保存商品分类广告
    async advertisements({commit}, data) {
        const requestData = await api.storeClass.advertisements(data);
        return requestData
    },   
    // 三级分类排序
    async setSort({commit}, data) {
      const requestData = await api.storeClass.setSort(data);
      return requestData
    },   
    
    async test({commit}, data) {
      console.log('这是旧的写法');
      return 'aaaa'
    },
    setIsAdv({commit}, data){
        commit('setIsAdv',data)
    },

  }
}
