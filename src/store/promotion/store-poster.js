import api from 'api'
export default {
    namespaced:true,

    state:{
        isAdd:false,
        checkAll:false,
        delIds:[],
        wantDel:false,
        selfChange:false,
    },
    getters:{
      getCheckAll(state){
        return state.checkAll
      },
      getDelIds(state){
        return state.delIds
      },
      getWantDel(state){
        return state.wantDel
      },
      getSelfChange(state){
        return state.selfChange
      },
    },
    mutations:{
      setCheckAll(state,value){
        state.checkAll = value
      },
      setIds(state,value){
        state.delIds = value
      },
      setDel(state,value){
        state.wantDel = value
      },
      setSelf(state,value){
        state.selfChange = value
      },
    },
    actions:{
      setAll({commit}, data){
        commit('setCheckAll',data)
      },
      setDelIds({commit}, data){
        commit('setIds',data)
      },
      setWantDel({commit}, data){
        commit('setDel',data)
      },
      setSelfChange({commit}, data){
        commit('setSelf',data)
      },
        async hasHistory({commit}, data) {
          const requestData = await api.storePoster.getHistoryList(data);
          return requestData;
        },
    }
}
