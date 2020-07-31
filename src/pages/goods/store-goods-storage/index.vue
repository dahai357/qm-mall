<style scoped>
  .qm-store-class-index{
    min-height: 640px;
  }
</style>
<template>
  <div class="qm-store-class-index">
    <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)">
    </qm-tabs>
    <div class="clear"></div>
    <keep-alive>
      <router-view v-if="$route.meta.storageKeepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.storageKeepAlive" />
    <!--<router-view />-->
  </div>
</template>

<script>
import QmTabs from '../../../components/qm-tabs/index';

    export default {
        name: "store-goods-storage",
        data(){
          return{
            tabs:{
              index:{name:'供应商商品库',select:true,act:'index'},
              view:{name:'查看商品',select:false,act:'view',hidden:true}
            },
            curUrl: ''
          }
        },
        computed:{

        },
        components: {
          QmTabs,
        },
        methods:{
          routerData(data){
            this.curUrl = data.key
            var url = '/goods/store_goods_storage/'+data.key
            this.$router.push(url);
          },
        },
      mounted() {
         var path = this.$route.path;
         this.curUrl = path.substring(path.lastIndexOf('/') + 1);
      },
    }
</script>

<style scoped>

</style>
