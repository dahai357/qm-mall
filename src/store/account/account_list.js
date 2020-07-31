import api from 'api'

export default {
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        //账号列表数据
        async getAccountList({ commit }, data) {
            const requestData = await api.account.getAccountList(data)
            if (requestData.resultCode === 1) {
                return requestData.responseContent

            }
        },
        //获取店铺账号信息（编辑页展示）
        async getSellerInfo({ commit }, data) {
            const requestData = await api.account.getSellerInfo(data)
            if (requestData.resultCode === 1) {
                return requestData.responseContent.sellerInfo

            }
        },
        //账号组列表
        async getAccountGroupList({ commit }, data) {
            const requestData = await api.account.getAccountGroupList(data)
            if (requestData.resultCode === 1) {
                return requestData.responseContent.sellerGroupList

            }
        },
        //提交数据
        async editSellerAccount({ commit }, data) {
            const requestData = await api.account.editSellerAccount(data)
            if (requestData.resultCode === 1) {
                return requestData.responseContent

            } s
        },
        //删除账号
        async delAccount({ commit }, data) {
            const requestData = await api.account.delAccount(data)
            if (requestData.resultCode === 1) {
                return requestData.responseContent

            }
        },
        //发送短信验证码
        async sendMsg({ commit }, data) {
            const requestData = await api.account.sendMsg(data)
            return requestData


        },
        //添加账号-保存数据
        async saveAccount({ commit }, data) {
            const requestData = await api.account.saveAccount(data)
            return requestData
        },
      
    }
}