import api from 'api'

export default {
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        //账号组列表
        async groupList({ commit }, data) {
            const requestData = await api.account.groupList(data)
            if (requestData.resultCode === 1) {
                return requestData.responseContent

            }
        },
        //新增/编辑账号组页面数据渲染
        async getSellerGroupInfo({ commit }, data) {
            const requestData = await api.account.getSellerGroupInfo(data)
            if (requestData.resultCode === 1) {
                return requestData.responseContent

            }
        },
        //新增/修改账号组保存数据
        async saveGroup({ commit }, data) {
            const requestData = await api.account.saveGroup(data)
            if (requestData.resultCode === 1) {
                return requestData.responseContent

            }
        },
        //删除用户组
        async groupDel({ commit }, data) {
            const requestData = await api.account.groupDel(data)
            if (requestData.resultCode === 1) {
                return requestData.responseContent

            }
        }
    }
}