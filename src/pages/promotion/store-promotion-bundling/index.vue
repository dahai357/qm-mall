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
      <a class="ncsc-btn ncsc-btn-orange" v-if="curUrl === 'bundling_list'"  @click="addBundling()">添加活动</a>
    </div>
    <div class="clear"></div>
    <router-view />
  </div>
</template>

<script>
import QmTabs from '../../../components/qm-tabs/index';
import storage from 'lib/utils/storage'

    export default {
        name: "store-evaluate",
        data(){
          return{
                tabs:{
                  bundling_list:{name:'活动列表',select:true,act:'bundling_list'},
                  bundling_add:{name:'添加活动',select:false,act:'bundling_add',hidden:true},
                },
            curUrl:''
          }
        },
        components: {
          QmTabs,
        },
        methods:{
          addBundling(){
            storage.set('active_id',0)
            var data = {
              key:'bundling_add'
            }
            this.routerData(data)
          },
          routerData(data){
            this.curUrl = data.key
            var url = '/promotion/store_promotion_bundling/'+data.key
            this.$router.push(url);
          },
          changeCur(){
            var active_id = storage.get('active_id')
            if(active_id){
              this.tabs.bundling_add.name = '管理'
            }else{
              this.tabs.bundling_add.name = '添加活动'
            }
            var path = this.$route.path
            this.curUrl = path.substring(path.lastIndexOf('/') + 1);
          }
        },
      watch:{
        '$route'(newRouter){
          this.changeCur()
        }
      },
      mounted() {
        this.changeCur()
      },
    }
</script>

<style scoped>
</style>
