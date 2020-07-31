import api from 'api'
export default {
    namespaced:true,

    state:{
        isAdd:false,
        canEdit:false,
        isAddGift:false
    },
    getters:{
        getCanEdit(state){
            return state.canEdit
        },
        getIsAddGift(state){
            return state.isAddGift
        }
    },
    mutations:{
        setCanEdit(state,value){
            state.canEdit = value
        },
        setIsAddGift(state,value){
            state.isAddGift = value
        }
    },
    actions:{
        // 获取店铺优惠券
        async getStoreCouponList({commit}, data) {
            const requestData = await api.storeCoupon.getCouponList(data);
            if (requestData.resultCode === 1) {
                return requestData.responseContent
            }
        },
        async getCouponDetail({commit}, data) {
            const requestData = await api.storeCoupon.getCouponDetail(data);
            return requestData;
        },
        async checkEdit({commit}, data) {
            const requestData = await api.storeCoupon.checkEdit(data);
            return requestData;
        },
        async getCouponTypes({commit}, data) {
            const requestData = await api.storeCoupon.getCouponTypes(data);
            return requestData;
        },
        setEdit({commit}, data){
            commit('setCanEdit',data)
        },
        setIsAddGift({commit}, data){
            commit('setIsAddGift',data)
        }
    }
}
