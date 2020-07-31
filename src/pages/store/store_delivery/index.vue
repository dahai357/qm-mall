<template>
  <div class="qm-store-class-index">
    <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)">
    </qm-tabs>

    <router-view />
  </div>
</template>

<script>
import QmTabs from '../../../components/qm-tabs/index';

    export default {
        name: "store_delivery",
        data(){
          return{
                tabs:{
                    dada:{name:'达达配送接入申请',select:true,act:'dada'},
                    recharge:{name:'达达账户充值',select:false,act:'recharge',hidden:true},
                },
          }
        },
        components: {
          QmTabs,
        },
        methods:{
          routerData(data){
            var url = '/store/store_delivery/'+data.key
            this.$router.push(url);
          },
        }
    }
</script>

<style scoped>

</style>
