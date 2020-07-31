import api from 'api'
import storage from './../libs/utils/storage'
import Vue from 'vue'

export default {
    state:{
        statistics:{},//统计数据
        tips:{},//提示数据
        articleList:[],//公告数据
        helpCenter:[],//帮助数据
        basicStore:{},//店铺设置
        storeInfo:{},//店铺缴费信息
        storeList:[],//店铺分类信息
        deadline:0,//daoqi shijian
        payGcIds:[],
        deposit_flag:false,
        store_end_time:0,//店铺试用期到期天数
        isQuickLinkShow:true,//是否显示设置常用菜单

        sideMenuOrderClick:false,
        proLsit:[],
    },
    getters:{
        getProLsits(state){
          return state.proLsit;
        },

        getTips(state){
            return state.tips;
          },
          getArticleList(state){
            return state.articleList;
          },
          getHelpCenter(state){
            return state.helpCenter;
          },
          getStatistics(state){
              return state.statistics;
          },
          getBasicStore(state){
            return state.basicStore;
          },
          getStoreInfo(state){
            return state.storeInfo
          },
          getStoreList(state){
            return state.storeList
          },
          getDeadLine(state){
            return state.deadline
          },
          getStoreEndTime(state){
            return state.store_end_time
          },
          getPayGcIds(state){
            return state.payGcIds
          },
          getDeposit_flag(state){
            return state.deposit_flag
          },
          getIsQuickLinkShow(state){
            return state.isQuickLinkShow
          },
          getSideMenuOrderClick(state){
            return state.sideMenuOrderClick;
          }
    },
    mutations:{
        setTips(state,tips){
            state.tips = tips;
          },
          setArticleList(state,articleList){
            state.articleList = articleList;
          },
          setHelpCenter(state,helpCenter){
            state.helpCenter = helpCenter;
          },
          setStatistics(state,statistics){
              state.statistics = statistics;
          },
          getProblemList(state,proLsit){
              state.proLsit = proLsit;
              console.log("aaaa")
          },
          setBasicStore(state,basicStore){
            state.basicStore = basicStore
          },
          setStoreInfo(state,storeInfo){
            state.storeInfo = storeInfo;
          },
          setStoreList(state,storeList){
            state.storeList = storeList;
          },
          setDeadLine(state,deadline){
            state.deadline = deadline;
          },
          setStoreEndTime(state,store_end_time){
            state.store_end_time = store_end_time
          },
          setPayGcIds(state,payGcIds){
            state.payGcIds = payGcIds;
          },
          setDeposit_flag(state,deposit_flag){
            state.deposit_flag = deposit_flag;
          },
          setIsQuickLinkShow(state,isQuickLinkShow){
            state.isQuickLinkShow = isQuickLinkShow;
          },
          setSideMenuOrderClick(state,sideMenuOrderClick){
            state.sideMenuOrderClick = !state.sideMenuOrderClick
          }
          
    },
    actions:{

      
      //获取首页统计数据
        async getCountData({commit}, data) {
            const requestData = await api.home.getCountData(data);
            if (requestData.resultCode === 1) {
            commit('setStatistics', requestData.responseContent.statistics)
            commit('setTips', requestData.responseContent.tips)
            commit('setArticleList', requestData.responseContent.articleList)
            commit('setHelpCenter', requestData.responseContent.helpCenter)
            }
        },

        //获取首页店铺数据
        async getStoreSetting({commit}, data) {
            const requestData = await api.home.getStoreSetting(data);
            if (requestData.resultCode === 1) {
            commit('setBasicStore', requestData.responseContent)
            }
        },

        //获取经营分类列表
        async getClassList({commit},data){
          const requestData = await api.home.getClassList(data);
          if (requestData.resultCode === 1) {
              //判断全选时是否可选中（是否是续费操作）
            var storeInfo = requestData.responseContent.store_info;
            var deposit_flag = requestData.responseContent.deposit_flag;

            requestData.responseContent.list.forEach((item,i) => {
              if(
                (!(item.apply_state == 0 || item.apply_state == 2) &&
                item.is_charged == 1&&
                (item.class_style ==2) &&
                    (item.deadline != null&&item.deadline != 0&&item.deadline != '0')&&
                ((Date.parse(item.deadline)+ storeInfo.classChargeDelayDays*1000) > Date.parse(new Date())) &&
                ((Date.parse(item.deadline)+storeInfo.classChargeDelayDays*1000) < storeInfo.maxClassEndTime*1000)
                )
                ||
                (
                !(item.apply_state == 0 || item.apply_state == 2) 
                && item.is_charged ==1
                && item.class_style ==2
                &&  !item.deadline 
                && Date.parse(new Date()) < storeInfo.store_end_time*1000 +storeInfo.classChargeDelayDays*1000
                && (storeInfo.maxClassEndTime && storeInfo.store_end_time +storeInfo.classChargeDelayDays*1000< storeInfo.maxClassEndTime*1000)
                )
              ){
                  item.disabled = false;
              }else{
                  item.disabled = true;
              }

              item.inArray = false;
              if(requestData.responseContent.pay_gc_ids){
                  let pay_gc_ids = requestData.responseContent.pay_gc_ids;
                  for(var i in pay_gc_ids){
                      if(item.gc_id == pay_gc_ids[i]){
                          item.inArray = true;
                      }
                  }
              }

            });  

            
            commit('setPayGcIds', requestData.responseContent.pay_gc_ids)
            commit('setStoreInfo', requestData.responseContent.store_info)
            commit('setStoreList', requestData.responseContent.list)
            commit('setDeposit_flag',deposit_flag)
            }
        },

        async updateQuickLink ({commit, dispatch, state, rootState,rootGetters},data){

          const requestData = await api.home.updateQuickLink(data);
            if (requestData.resultCode === 1) {
              commit('setQuickLink',requestData.responseContent,{root: true});
              commit('setSubMenu',requestData.responseContent,{root: true});
              storage.set('quickLink',requestData.responseContent);
              var metaData = storage.get('metaData')
              metaData.quickLink = requestData.responseContent;
              storage.set('metaData',metaData);
              // console.log(rootGetters['getQuickLink']);
            }
        },

        // 检测是否有新的订单
        async checkReceiveOrder({commit}, data) {
            const requestData = await api.home.checkReceiveOrder(data);
            return requestData
        },

        async getHomeData ({commit, dispatch, state, rootState,rootGetters},data){
  
          var vue = new Vue();
          const requestData = await api.home.getHomeData(data);

          var requestData1 =  requestData[0];
          var requestData2 =  requestData[1]
          var requestData3 =  requestData[2]
          //接口一
          if (requestData1.resultCode === 1) {
            commit('setStatistics', requestData1.responseContent.statistics)
            commit('setTips', requestData1.responseContent.tips)
            commit('setArticleList', requestData1.responseContent.articleList)
            commit('setHelpCenter', requestData1.responseContent.helpCenter)
            }
          //接口二
            if (requestData2.resultCode === 1) {
              commit('setBasicStore', requestData2.responseContent)
              }

          //接口三
          if (requestData3.resultCode === 1) {
                //判断全选时是否可选中（是否是续费操作）
              var storeInfo = requestData3.responseContent.store_info;
              var basicStore = requestData2.responseContent
              console.log(basicStore);
              requestData3.responseContent.list.forEach((item,i) => {
                if(
                  (!(item.apply_state == 0 || item.apply_state == 2) &&
                  item.is_charged ==1&&
                  item.class_style ==2 &&
                  (item.deadline != null&&item.deadline != 0&&item.deadline != '0')&&
                  (Date.parse(item.deadline) + storeInfo.classChargeDelayDays*1000 > Date.parse(new Date())) &&
                   (Date.parse(item.deadline)+storeInfo.classChargeDelayDays*1000 < storeInfo.maxClassEndTime*1000)
                  )
                  ||
                  (
                  !(item.apply_state == 0 || item.apply_state == 2) 
                  && item.is_charged ==1
                  && item.class_style ==2
                  &&  !item.deadline
                  && Date.parse(new Date()) < (storeInfo.store_end_time+storeInfo.classChargeDelayDays)*1000
                  && (storeInfo.maxClassEndTime && (storeInfo.store_end_time +storeInfo.classChargeDelayDays)*1000 < storeInfo.maxClassEndTime*1000)
                  )
                ){
                    item.disabled = false;
                }else{
                    item.disabled = true;
                }

                item.inArray = false;
                if(requestData3.responseContent.pay_gc_ids){
                    let pay_gc_ids = requestData3.responseContent.pay_gc_ids;
                    for(var i in pay_gc_ids){
                        if(item.gc_id == pay_gc_ids[i]){
                            item.inArray = true;
                        }
                    }
                }

              });  
  
              commit('setStoreInfo', requestData3.responseContent.store_info)
              commit('setStoreList', requestData3.responseContent.list)
              commit('setDeadLine',requestData3.responseContent.deadline)
              commit('setStoreEndTime',requestData3.responseContent.store_end_time)
              commit('setDeposit_flag',requestData3.responseContent.deposit_flag)
              // commit('setDeposit_flag',false)
              // Vue.prototype.eventBus.$emit('showDeadLine');
            }
            Vue.prototype.requestAll = false;


        },
    }
  }
