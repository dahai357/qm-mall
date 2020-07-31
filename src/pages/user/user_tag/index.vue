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
import storage from 'lib/utils/storage';
import '../../..//assets/seller/css/data_center.css';

    export default {
        name: "user_tag",
        data(){
          return{
                tabs:{
                  index:{name:'会员标签管理',select:true,act:'index'},
                },
            curUrl:''
          }
        },
        components: {
          QmTabs,
        },
        methods:{
          routerData(data){
            this.curUrl = data.key
            var url = '/user/user_tag/'+data.key
            this.$router.push(url);
          }
        },
      watch:{
      },
      mounted() {
      },
    }
</script>

<style scoped>
</style>
