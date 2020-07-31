<style scoped>
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
      <a href="javascript:;" @click="$router.push({name:'store_goods_add_step_one'})" class="ncsc-btn ncsc-btn-orange-rim">普通商品上架</a>
    </div>
    <div class="clear"></div>
    <router-view/>
  </div>
</template>

<script>
import QmTabs from '../../../components/qm-tabs/index';
import storage from 'lib/utils/storage'

    export default {
        name: "store-goods-online",
        data(){
          return{
            tabs:{
              index:{name:'出售中的商品',select:true,act:'index'}
            },
          }
        },
        components: {
          QmTabs,
        },
        methods:{
          routerData(data){
            var url = '/goods/store_goods_online/'+data.key;
            this.$router.push(url);
          },
        },
      mounted() {

      }
    }
</script>

<style scoped>

</style>
