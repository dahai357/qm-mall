
import api from 'api'

export default {

    namespaced:true,

    state:{
        state_type:'all',
        init_param:'all',
    },
    getters:{
        getState_type(state){
            return state.state_type;
        },
        getInit_param(state){
            return state.init_param;
        }

    },
    mutations:{
        setState_type(state,state_type){
            state.state_type = state_type
        },
        setInit_param(state,init_param){
            state.init_param = init_param
        }
    },
    actions:{
        // 订单列表
        async getList({commit}, data) {
            const requestData = await api.storeOrder.getList(data);
            return requestData
        },

        // 修改订单金额
        async modifyOrderAmount({commit}, data) {
            const requestData = await api.storeOrder.modifyOrderAmount(data);
            return requestData
        },
        // 修改订单价格获取计算数据
        async getCalcOrderPrice({commit}, data) {
            const requestData = await api.storeOrder.getCalcOrderPrice(data);
            return requestData
        },
        // 修改订单获取计算数据
        async getCalcOrder({commit}, data) {
            const requestData = await api.storeOrder.getCalcOrder(data);
            return requestData
        },
        // 修改订单金额数据提交（新）
        async modifyOrderAmountNew({commit}, data) {
            const requestData = await api.storeOrder.modifyOrderAmountNew(data);
            return requestData
        },
        // 修改订单内容
        async modifyOrder({commit}, data) {
            const requestData = await api.storeOrder.modifyOrder(data);
            return requestData
        },

        // 获取订单价格相关
        async getOrderPrice({commit}, data) {
            const requestData = await api.storeOrder.getOrderPrice(data);
            return requestData
        },

        // 标记为已打款
        async makeAlreadyTransfer({commit}, data) {
            const requestData = await api.storeOrder.makeAlreadyTransfer(data);
            return requestData
        },

        // 获得配送员列表
        async getDeliveriers({commit}, data) {
            const requestData = await api.storeOrder.getDeliveriers(data);
            return requestData
        },

        // 获得配送员列表--更多信息
        async getDiliverymanList({commit}, data) {
            const requestData = await api.storeOrder.getDiliverymanList(data);
            return requestData
        },

        // 打印订单
        async orderPrint({commit}, data) {
            const requestData = await api.storeOrder.orderPrint(data);
            return requestData
        },
        // 申请取消订单处理（1.1.1已核对）
        async applyConfirm({commit}, data) {
            const requestData = await api.storeOrder.applyConfirm(data);
            return requestData
        },
        // 确认收款(已开发)
        async receivePayment({commit}, data) {
            const requestData = await api.storeOrder.receivePayment(data);
            return requestData
        },

        // 选择配送员（已开发）
        async selectDelivery({commit}, data) {
            const requestData = await api.storeOrder.selectDelivery(data);
            return requestData
        },

        // 添加配送员(已经开发)
        async addDelivery({commit}, data) {
            const requestData = await api.storeOrder.addDelivery(data);
            return requestData
        },
      //达达订单发布
        async addDadaOrder({commit}, data) {
            const requestData = await api.storeOrder.addDadaOrder(data);
            return requestData
        },
      //达达订单发布
        async getAddTips({commit}, data) {
            const requestData = await api.storeOrder.getAddTips(data);
            return requestData
        },
      //处理订单增加小费
        async addTips({commit}, data) {
            const requestData = await api.storeOrder.addTips(data);
            return requestData
        },
      //获取商家取消达达订单
        async getCancelDadaOrder({commit}, data) {
            const requestData = await api.storeOrder.getCancelDadaOrder(data);
            return requestData
        },
      //确认商家取消达达订单
        async cancelDadaOrder({commit}, data) {
            const requestData = await api.storeOrder.cancelDadaOrder(data);
            return requestData
        },
      //达达订单重新发布
        async reDadaOrder({commit}, data) {
            const requestData = await api.storeOrder.reDadaOrder(data);
            return requestData
        },

        //达达订单重新发布
        async isBlacklist({commit}, data) {
            const requestData = await api.storeOrder.isBlacklist(data);
            return requestData
        },
      //v1.2.2确认达达骑手取消订单
        async confirmDadaOrder({commit}, data) {
            const requestData = await api.storeOrder.confirmDadaOrder(data);
            return requestData
        },
      //v1.2.3获取申请取消订单
        async getApplyConfirm({commit}, data) {
            const requestData = await api.storeOrder.getApplyConfirm(data);
            return requestData
        },
      //v1.2.2达达异常取消订单确认
        async excconfirmDadaOrder({commit}, data) {
            const requestData = await api.storeOrder.excconfirmDadaOrder(data);
            return requestData
        },
      async getDadaList({commit}, data) {
        const requestData = await api.storeDelivery.dadaList(data);
        return requestData.responseContent;
      },
      async getExpressList({commit}, data) {
        const requestData = await api.storeOrder.getExpressList(data);
        return requestData;
      },
      async addNewExpressList({commit}, data) {
        const requestData = await api.storeOrder.addNewExpressList(data);
        return requestData;
      },
      async orderApplySend({commit}, data) {
        const requestData = await api.storeOrder.orderApplySend(data);
        return requestData;
      },
      async getDadaShop({commit}, data) {
        const requestData = await api.storeOrder.getDadaShop(data);
        return requestData;
      },
      async rePreOrder({commit}, data) {
        const requestData = await api.storeOrder.rePreOrder(data);
        return requestData;
      },

      async confirmGetBySelf({commit}, data) {
        const requestData = await api.storeOrder.confirmGetBySelf(data);
        return requestData;
      },
      async modifyAddress({commit}, data) {
        const requestData = await api.storeOrder.modifyAddress(data);
        return requestData;
      },
    }
}
