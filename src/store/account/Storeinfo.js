import api from 'api'
export default {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        //获取店铺信息
        async getStoreInfo({ commit }, data) {
            const requestData = await api.account.getStoreInfo(data)
            if (requestData.resultCode === 1) {
                return requestData.responseContent
            }
        },
        //修改运营负责人
        async changeOperator({ commit }, data) {
            const requestData = await api.account.changeOperator(data)
            if (requestData.resultCode === 1) {
                return requestData
            }
        },
        //修改密码
        async changePassword({ commit }, data) {
            const requestData = await api.account.changePassword(data)
                return requestData
        },
    }
}