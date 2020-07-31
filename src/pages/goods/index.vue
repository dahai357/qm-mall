<template>
  <div class="goods">
    <keep-alive :exclude="exclude">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import storage from 'lib/utils/storage'
    export default {
      name: "goods",
      data() {
        return {
          exclude:['store-goods-add','store-goods-storage','inventory-warning']
        }
      },
      beforeRouteUpdate (to,from,next) {
        let exclude = ['store_goods_online_index','store_goods_offline_index','store_goods_offline_lockup','store_goods_offline_waitverify'];
        if(to.name==='store_goods_online_index' || to.name==='store_goods_offline_index' || to.name==='store_goods_offline_lockup' || to.name==='store_goods_offline_waitverify') {
          //exclude = ['store_goods_online_index','store_goods_offline_index','store_goods_offline_lockup','store_goods_offline_waitverify']
          exclude.splice(exclude.indexOf(to.name),1);
        }
        if(to.name === 'store_goods_add_step_two' && (from.name==='store_goods_online_index' || from.name==='store_goods_offline_index' || from.name==='store_goods_offline_lockup' || from.name==='store_goods_offline_waitverify')) {
          storage.set('goods_route_name',this.$route.name);
        }
        if(to.name === 'store_goods_add_step_two' || to.name === 'store_goods_add_step_three') {
          exclude = [];
        }
        for(let i in exclude) {
          exclude[i] = exclude[i].replace('_index','').replace(/_/g,'-');
        }
        exclude.push('store-goods-add');
        exclude.push('inventory-warning');
        exclude.push('store-goods-storage');
        this.exclude = exclude;
        next();
      },
    }
</script>

<style scoped>

</style>
