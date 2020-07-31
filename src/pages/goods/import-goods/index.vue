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
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import QmTabs from '../../../components/qm-tabs/index';

  export default {
    name: "import-goods",
    data(){
      return{
        tabs:{
          index:{name:'商品导入',select:true,act:'index'},
        },
        curUrl:'',
      }
    },
    components: {
      QmTabs,
    },
    computed:{
    },
    methods:{
      routerData(data){
        this.setStatus();
        this.curUrl = data.key
        var url = '/goods/import_goods/'+data.key
        this.$router.push(url);
      },
      changeCur(){
      },
    },
    watch:{
      '$route'(newRouter){
        this.changeCur()
      },
    },
    mounted() {
      this.changeCur()
    },
  }
</script>

<style scoped>

</style>
