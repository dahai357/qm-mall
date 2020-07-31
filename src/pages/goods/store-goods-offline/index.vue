<style scoped>

</style>
<template>
  <div class="qm-store-class-index">
    <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)">
    </qm-tabs>
    <div class="clear"></div>
    <!--冗余keep-alive 为了触发activated钩子-->
    <keep-alive :exclude="exclude">
    <router-view />
    </keep-alive>
  </div>
</template>

<script>
import QmTabs from '../../../components/qm-tabs/index';

    export default {
        name: "store-goods-offline",
        data(){
          return{
            tabs:{
              index:{name:'仓库中的商品',select:true,act:'index'},
              lockup:{name:'违规商品',select:true,act:'lockup'},
              waitverify:{name:'待审核的商品',select:true,act:'waitverify'},
            },
            exclude:[]
          }
        },
        components: {
          QmTabs,
        },
        methods:{
          routerData(data){
            var url = '/goods/store_goods_offline/'+data.key;
            this.$router.push(url);
          },
        },
      mounted() {

      },
      beforeRouteUpdate (to,from,next) {
        let exclude = ['store_goods_offline_index','store_goods_offline_lockup','store_goods_offline_waitverify'];
        exclude.splice(exclude.indexOf(to.name),1);
        for(let i in exclude) {
          exclude[i] = exclude[i].replace(/_/g,'-');
        }
        this.exclude = exclude;
        next();
      }
    }
</script>

<style scoped>

</style>
