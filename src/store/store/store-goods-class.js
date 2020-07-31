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
        // 店铺首页推荐分类列表
        async getClassList({commit}, data) {
            const requestData = await api.storeGoodsClass.getClassList(data);
            return requestData
        },

        // 编辑/新增分类
        async classEdit({commit}, data) {
            const requestData = await api.storeGoodsClass.classEdit(data);
            return requestData
        },

        // 设置店铺首页推荐分类排序
        async setClassSort({commit}, data) {
            const requestData = await api.storeGoodsClass.setClassSort(data);
            return requestData
        },

        // 删除分类
        async dropClass({commit}, data) {
            const requestData = await api.storeGoodsClass.dropClass(data);
            return requestData
        },

        // 获取分类商品列表
        async getGoodsList({commit}, data) {
            const requestData = await api.storeGoodsClass.getGoodsList(data);
            return requestData
        },

        // 首页推荐分类搜索商品
        async searchGoods({commit}, data) {
            const requestData = await api.storeGoodsClass.searchGoods(data);
            return requestData
        },

        // 保存首页推荐分类商品
        async saveGoods({commit}, data) {
            const requestData = await api.storeGoodsClass.saveGoods(data);
            return requestData
        },


        // 编辑分类和商品
        async saveClassAndGoods({commit}, data) {
            const requestData = await api.storeGoodsClass.saveClassAndGoods(data);
            return requestData
        },


    }
}
