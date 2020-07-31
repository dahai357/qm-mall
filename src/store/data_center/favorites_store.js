
import api from 'api'
import storage from './../../libs/utils/storage';
import Vue from 'vue'
export default {
  state:{
   
  },
  getters:{
    
  },
  mutations:{
    
  },
  actions:{
    //店铺会员页面数据获取接口
    async getStoreFavoritesList({commit}, data) {
        const requestData = await api.favoritesStore.getStoreFavoritesList(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
    //获取店铺会员标签列表
    async getTagList({commit}, data) {
        const requestData = await api.favoritesStore.getTagList(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
    //编辑会员标签
    async addMemberTag({commit}, data) {
        const requestData = await api.favoritesStore.addMemberTag(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
    //店铺会员-加入/取消黑名单
    async addBlacklist({commit}, data) {
        const requestData = await api.favoritesStore.addBlacklist(data);
        if (requestData.resultCode === 1) {
            return requestData.responseContent
        }
    },
    //删除店铺会员标签
    async delStoreTag({commit}, data) {
        const requestData = await api.favoritesStore.delStoreTag(data);
        // if (requestData.resultCode === 1) {
        //     return requestData.responseContent
        // }
        return requestData;
    },
    // 编辑/新增店铺会员标签
    async addStoreTag({commit}, data) {
        const requestData = await api.favoritesStore.addStoreTag(data);
        return requestData;
    },
    //获取会员等级列表
    async getLevel({commit}, data) {
      const requestData = await api.favoritesStore.getLevel(data);
      return requestData;
    },
    //获取会员等级色号列表
    async getLevelColor({commit}, data) {
      const requestData = await api.favoritesStore.getLevelColor(data);
      return requestData;
    },
    //编辑会员等级
    async setLevel({commit}, data) {
      const requestData = await api.favoritesStore.setLevel(data);
      return requestData;
    },
    //获取会员等级信息
    async getLevelInfo({commit}, data) {
      const requestData = await api.favoritesStore.getLevelInfo(data);
      return requestData;
    },
    //获取已经编辑过的等级数据
    async getUserLevel({commit}, data) {
      const requestData = await api.favoritesStore.getUserLevel(data);
      return requestData;
    },
    //查看会员-等级下会员列表
    async getStoreMemberList({commit}, data) {
      const requestData = await api.favoritesStore.getStoreMemberList(data);
      return requestData;
    },
    //商家编辑会员
    async updataStoreMember({commit}, data) {
      const requestData = await api.favoritesStore.updataStoreMember(data);
      return requestData;
    },
    //批量设置会员标签
    async updataLevel({commit}, data) {
      const requestData = await api.favoritesStore.updataLevel(data);
      return requestData;
    },
    //获取当前等级会员数
    async hasLevelMember({commit}, data) {
      const requestData = await api.favoritesStore.hasLevelMember(data);
      return requestData;
    },
    //对店铺的等级进行排序
    async setLevelNum({commit}, data) {
      const requestData = await api.favoritesStore.setLevelNum(data);
      return requestData;
    },
    //获取店铺导入会员记录列表
    async getImportList({commit}, data) {
      const requestData = await api.favoritesStore.getImportList(data);
      return requestData;
    },
    //获取导入中重复的数据
    async getImportRepeatList({commit}, data) {
      const requestData = await api.favoritesStore.getImportRepeatList(data);
      return requestData;
    },
    //实际操作导入
    async doImportMember({commit}, data) {
      const requestData = await api.favoritesStore.doImportMember(data);
      return requestData;
    },
    //获取店铺导入记录详情数据
    async getImportMember({commit}, data) {
      const requestData = await api.favoritesStore.getImportMember(data);
      return requestData;
    },
  }
}
