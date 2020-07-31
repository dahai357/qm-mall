import api from 'api'

export default {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        //账号日志数据
        async getAccountLog({ commit }, data) {
            const requestData = await api.account.getAccountLog(data)
            if (requestData.resultCode === 1) {
                return requestData.responseContent
            }
        }
    }
}