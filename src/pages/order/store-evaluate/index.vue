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
      <a class="ncsc-btn ncsc-btn-orange" v-if="curUrl === 'templates'"  @click="addTemplate()">新增模板</a>
    </div>
    <div class="clear"></div>
    <router-view />
  </div>
</template>

<script>
import QmTabs from '../../../components/qm-tabs/index';

    export default {
        name: "store-evaluate",
        data(){
          return{
                tabs:{
                    list:{name:'买家评价',select:true,act:'list'},
                    templates:{name:'回复评价模板',select:false,act:'templates'},
                },
            curUrl:''
          }
        },
        components: {
          QmTabs,
        },
        methods:{
          addTemplate(){
            this.$store.commit('setTemplateDialog',true)
          },
          routerData(data){
            this.curUrl = data.key
            var url = '/order/store_evaluate/'+data.key
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

</style>
