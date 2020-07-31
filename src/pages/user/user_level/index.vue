<style scoped>
  .menu-more {

    float: right;
    right: 0;
    top: 0;
    display: block;

    z-index: 1;
    bottom: 10px;
    right: -5px;
  }

  .menu-more a {
    margin: 0 5px;
  }
  .menu-more a:hover{
    text-decoration: none;
    color: #fff;
  }
</style>
<template>
  <div class="qm-store-class-index">
    <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)">
    </qm-tabs>
    <div class="clear"></div>
    <router-view />
  </div>
</template>

<script>
import QmTabs from '../../../components/qm-tabs/index';
import storage from 'lib/utils/storage';

    export default {
        name: "user_level",
        data(){
          return{
                tabs:{
                  user_level:{name:'等级管理',select:true,act:'index'},
                  set_level:{name:'等级配置',select:false,act:'set_level',hidden:true},
                  look_member:{name:'查看会员',select:false,act:'look_member',hidden:true},
                },
            curUrl:''
          }
        },
        components: {
          QmTabs,
        },
        methods:{
          routerData(data){
            if(!data.item.hidden){
              this.curUrl = data.key
              var url = '/user/user_level/'+data.key
              this.$router.push(url);
            }
          },

        },
      watch:{
      },
      mounted() {
      },
    }
</script>

<style scoped>
</style>
