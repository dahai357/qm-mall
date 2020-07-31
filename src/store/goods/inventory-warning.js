import api from 'api'
import storage from './../../libs/utils/storage';
import Vue from 'vue'
export default {
  namespaced:true,
  state:{
    alarmDialog:false
  },
  getters:{
    getAlarmDialog(state){
      return state.alarmDialog;
    }
  },
  mutations:{
    setAlarmDialog(state,value){
      state.alarmDialog = value
    }
  },
  actions:{
      async isInventoryWarning({commit,rootGetters}, data) {
          let menuList = rootGetters.getMenuList;
          api.inventoryWarning.isInventoryWarning().then(res=>{//库存预警值
              var newMenuList = _.clone(menuList);
              newMenuList['goods'].reddot = res.responseContent.isInventoryWarning;
              newMenuList['goods'].child.inventory_warning.reddot = res.responseContent.isInventoryWarning;
              newMenuList['order'].reddot = res.responseContent.hasDealing;
              newMenuList['order'].child.store_refund.reddot = res.responseContent.hasDealing;
              newMenuList['order'].reddot = res.responseContent.orderTips.all_count;
              newMenuList['order'].child.store_order.reddot = res.responseContent.orderTips.all_count;
              newMenuList['order'].child.store_order.reddot = res.responseContent.orderTips.all_count;
              newMenuList['order'].child.store_receiving.reddot = res.responseContent.orderTips.wait_count;
              commit('setMenuList',newMenuList,{root:true});
              commit('setOrderTips',res.responseContent.orderTips,{root:true});
          })
      },
  }
}
