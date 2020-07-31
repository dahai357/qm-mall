<style scoped>

</style>
<template>
  <div class="qm-store-class-index">
    <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)">
    </qm-tabs>
    <router-view />
  </div>
</template>

<script>
import QmTabs from '../../../components/qm-tabs/index';
import {mapMutations, mapGetters, mapActions} from 'vuex';
    export default {
        name: "store-evaluate",
        data(){
          return{
                tabs:{
                  refund:{name:'退款记录',select:true,act:'refund'},
                  return:{name:'退货记录',select:false,act:'return'},
                  return_wait:{name:'待收货',select:false,act:'return_wait'},
                  wx_refund:{name:'退款列表',select:false,act:'wx_refund'},
                },
              interval:null
          }
        },
        components: {
          QmTabs,
        },
      computed:{
        ...mapGetters({
          getOrderTips:"getOrderTips"
        }),
      },
        methods:{
          ...mapActions('inventoryWarning',{
            isInventoryWarning:'isInventoryWarning'
          }),
          routerData(data){
            var url = '/order/store_refund/'+data.key
            this.$router.push(url);
            /*this.tabs.refund.reddot=this.getOrderTips.refund_count;
            this.tabs.return.reddot=this.getOrderTips.return_count;
            this.tabs.return_wait.reddot=this.getOrderTips.return_wait;
            this.tabs.wx_refund.reddot=this.getOrderTips.wx_refund;*/
          },
        },
      watch: {
        getOrderTips: function () {
          if (Object.keys(this.tabs).length > 0) {
            let _tabs = _.clone(this.tabs);
            this.tabs.refund.reddot=this.getOrderTips.refund_count
            this.tabs.return.reddot=this.getOrderTips.return_count
            this.tabs.return_wait.reddot=this.getOrderTips.return_wait
            this.tabs.wx_refund.reddot=this.getOrderTips.wx_refund
            this.tabs = _tabs
          }
        }
      },
      mounted() {
        this.tabs = {
          refund:{name:'退款记录',select:true,act:'refund',reddot:this.getOrderTips.refund_count},
          return:{name:'退货记录',select:false,act:'return',reddot:this.getOrderTips.return_count},
          return_wait:{name:'待收货',select:false,act:'return_wait',reddot:this.getOrderTips.return_wait},
          wx_refund:{name:'退款列表',select:false,act:'wx_refund',reddot:this.getOrderTips.wx_refund},
        }
        this.interval = setInterval(() => {
          this.isInventoryWarning();
        }, 20000);
        //this.interval = setInterval(() => {this.isInventoryWarning()}, 30000);
        //this.interval;
      }
    }
</script>

