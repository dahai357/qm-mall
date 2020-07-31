import api from 'api'

export default {

    namespaced:true,
    
    state:{
    },
    getters:{

    },
    mutations:{

    },
    actions:{
        // 获取银行列表
        async branchBankList({commit}, data) {
            const requestData = await api.unionpay.branchBankList(data);
            return requestData
        },

        

    }
}
