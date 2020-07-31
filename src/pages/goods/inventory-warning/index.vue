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
    <div class="menu-more">
      <a href="javascript:;" @click="addTemplate" class="ncsc-btn ncsc-btn-orange-rim">设置默认预警值</a>
    </div>
    <div class="clear"></div>
    <router-view />
  </div>
</template>

<script>
import QmTabs from '../../../components/qm-tabs/index';

import {mapMutations} from 'vuex'
    export default {
        name: "inventory-warning",
        data(){
          return{
            tabs:{
              index:{name:'预警列表',select:true,act:'index'}
            },
            curUrl: ''
          }
        },
        components: {
          QmTabs,
        },
        methods:{
          ...mapMutations('inventoryWarning',{
              setAlarmDialog:'setAlarmDialog'
          }),
          addTemplate(){
            this.setAlarmDialog(true);
          },
          routerData(data){
            this.curUrl = data.key
            var url = '/goods/inventory_warning/'+data.key
            this.$router.push(url);
          },
        },
      mounted() {
         var path = this.$route.path
         this.curUrl = path.substring(path.lastIndexOf('/') + 1);
      }
    }
</script>

<style scoped>
.qm-store-class-index{
  /* border: 1px solid #d7dde4; */
  background: #fff;
  padding: 10px 20px 30px;
  width: 1000px;
}
</style>
