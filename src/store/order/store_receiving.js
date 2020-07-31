
import api from 'api'

export default {
  
    namespaced:true,

    state:{
        state_type:'normal',
        router_state:true,
    },
    getters:{
        getState_type(state){
            return state.state_type;
        },
        getRouter_state(state){
            return state.router_state;
        },
    },
    mutations:{
        setState_type(state,state_type){
            state.state_type = state_type
        },
        setRouter_state(state,router_state){
            state.router_state = !state.router_state;
        }

    },
    actions:{
        
        // 商家接单操作（已开发）
        async orderReceive({commit}, data) {
            const requestData = await api.storeReceiving.orderReceive(data);
            return requestData
        }, 

        //1.2.0店铺拒绝接单（已核对）
        async refuseOrder({commit}, data) {
            const requestData = await api.storeReceiving.refuseOrder(data);
            return requestData
        }, 
    }
}