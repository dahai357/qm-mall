import consts from './../config/consts'
import storage from './../libs/utils/storage'
import api from 'api'

export default {
  state:{
    msgCount:0,
    subMenu:{},
    imageIp:'',
    baseConfig:{},
    imagePathConfig:{},
    imageType:{},
  },
  getters:{
    getSubMenu(state){
      return state.subMenu || {}
    },
    getImageIp(state){
      return state.imageIp;
    },
    getImagePathConfig(state){
      return state.imagePathConfig
    },
    getImageType(state){
      return state.imageType
    },
    getBaseConfig(state){
      return state.baseConfig
    },
  },
  mutations:{
    setSubMenu(state,data){
      if(data){
        for (const key in data) {
          if(key == ""){
            delete data[key];
          }
        }
      }
      state.subMenu = data
    },
    setImageIp(state,imageIp){
      state.imageIp = imageIp
    },
    setBaseConfig(state,data){
      state.baseConfig = data
    },
    setImageType(state,data){
      state.imageType = data
    },
    setImagePathConfig(state,data){
      state.imagePathConfig = data
    }
  },
  actions:{

    //获取问题列表
    async getProList({commit}, data) {
      const requestData = await api.home.getProList(data);
      if (requestData.resultCode === 1) {
        return requestData;
      }
    },
    updateSubMenu({commit,rootGetters},route){
      let root = route[0];
      let root1 = route[1];
      let root2 = route[2];
      let subMenu = {}
      if(root === consts.HOME){
        if(root2 && (root2 == "article_detail" || root2 == "article_index")){
        }else{
          subMenu = storage.get('quickLink')
        }
      }else{
        if(root2 && root2 == "store_info/index"){
        }else{
          let menuList = rootGetters.getMetaData.allowMenu || {}
          Object.keys(menuList).map(function (key) {
            if(key === root){
              subMenu = menuList[key].child
            }
          })
        }
      }
      for (const key in subMenu) {
        if(key == ""){
          delete subMenu[key];
        }
      }
      commit('setSubMenu',subMenu)
    },

      // 获取配置数据
    async getConfig({commit}, data) {
      const res = await api.json.getConfig(data);
      if(res.status == 200){
        commit('setBaseConfig',res.data.baseConfig);
        commit('setImageType',res.data.imageType);
        commit('setImagePathConfig',res.data.imagePathConfig);

        var host = window.location.hostname;
        console.log(host,'host');
        switch (host) {
          case 'localhost':
            commit('setImageIp',"https://imgpre.shenbd.com/")
            break;
          case '192.168.1.145':
            commit('setImageIp',"https://imgpre.shenbd.com/")
            break;
          case 'testadmin.shenbd.com':
            commit('setImageIp',"https://imgpre.shenbd.com/")
            break;
          case 'hd.shenbd.com':
            commit('setImageIp',"https://imghd.shenbd.com/")
            break;
          case 'b.shenbd.com':
            commit('setImageIp',"https://img.shenbd.com/")
            break;
          case 'pre.ngrok.shenbd.com':
            commit('setImageIp',"https://imgpre.shenbd.com/")
            break;
          default:
            commit('setImageIp',"https://imgpre.shenbd.com/")
            break;
        }

      }else{
        var vue = new Vue();
        vue.layer.msg('找不到对应的数据');
      }
    },
  }
}
