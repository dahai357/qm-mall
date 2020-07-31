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
    name: "store_sale_statistics",
    data(){
      return{
        tabs:{
          index:{name:'商品营业销量统计',select:true,act:'index'},
        },
      }
    },
    components: {
      QmTabs,
    },
    methods:{
      routerData(data){

        var url = '/data_center/store_sale_statistics/'+data.key
        this.$router.push(url);
      },
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
