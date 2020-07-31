import api from 'api'

export default {

    namespaced:true,

    state:{
      isAdd:false,
      canEdit:false,
      update:false,
      pageIndex:0,
    },
    getters:{
      getIsAdd(state){
          return state.isAdd;
      },
        getCanEdit(state){
          return state.canEdit
        },
        getUpdate(state){
          return state.update
        },
        getPageIndex(state){
          return state.pageIndex
        },
      getUpdate(state){
        return state.update
      },
      getPageIndex(state){
        return state.pageIndex
      },
    },
    mutations:{
        setIsAdd(state,isAdd){
            state.isAdd = !state.isAdd;
        },
      setCanEdit(state,value){
        state.canEdit = value
      },
      setUpdate(state,value){
        state.update = !state.update
      },
      setPageIndex(state,value){
        state.pageIndex = value
      },
    },
    actions:{
        // 获取在用二级分类
        async getOnlineSecondClass({commit}, data) {
            const requestData = await api.saleAct.getOnlineSecondClass(data);
            return requestData
        },

        // 获取在用三级分类
        async getOnlineThirdClass({commit}, data) {
            const requestData = await api.saleAct.getOnlineThirdClass(data);
            return requestData
        },
      setEdit({commit}, data){
        commit('setCanEdit',data)
      }

    }
}
