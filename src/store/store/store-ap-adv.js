import api from 'api'
import { stat } from 'fs';
import { isatty } from 'tty';

export default {

    namespaced:true,
    
    state:{
        isAdd:false,
        showAddBtn:true,
        isEdit:false
    },
    getters:{
        getIsAdd(state){
            return state.isAdd;
        },
        getShowAddBtn(state) {
            return state.showAddBtn;
        },
        getIsEdit(state){
            return state.isEdit;
        }
    },
    mutations:{
        setIsAdd(state,isAdd){
            state.isAdd = !state.isAdd;
        },
        setShowAddBtn(state,showAddBtn){
            state.showAddBtn = showAddBtn;
        },
        setIsEdit(state,isEdit){
            state.isEdit = isEdit;
        }
    },
    actions:{
        // 广告位列表
        async getList({commit}, data) {
            const requestData = await api.storeApAdv.getList(data);
            return requestData
        },

        // 新增、编辑广告位
        async advEdit({commit}, data) {
            const requestData = await api.storeApAdv.advEdit(data);
            return requestData
        },

        // 删除广告位
        async advDelete({commit}, data) {
            const requestData = await api.storeApAdv.advDelete(data);
            return requestData
        },

        // 设置广告状态
        async setUse({commit}, data) {
            const requestData = await api.storeApAdv.setUse(data);
            return requestData
        },

        // 获取单个广告详情
        async getOneAdv({commit}, data) {
            const requestData = await api.storeApAdv.getOneAdv(data);
            return requestData
        },
        async test({commit}, data) {
            console.log('这是新的带命名空间端写法');
            return 'test'
        },
        

    }
}
