import api from 'api'

export default {
  namespaced: true,

  state: {
    taskStatus: '',
    allCount: 0,
    successCount: 0
  },
  getters: {
    getTaskStatus(state) {
      return state.taskStatus
    },
    getAllCount(state){
      return state.allCount
    },
    getSuccessCount(state){
      return state.successCount
    }
  },
  mutations: {
    setTaskStatus(state, value) {
      state.taskStatus = value
    },
    setAllCount(state, value) {
      state.allCount = value
    },
    setSuccessCount(state, value) {
      state.successCount = value
    },
  },
  actions: {
    async setStatus({commit}) {
    /*  const res = await api.importGoods.getTask();
      let status = '';
      if (res.has_task == 1) {
        status = res.status
      } else {
        status = 'none'
      }
      commit('setTaskStatus', status)
      commit('setAllCount', res.all_count)
      commit('setSuccessCount', res.success_count)*/
    },
  }
}
