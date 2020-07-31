<template>
  <div class="qm-store-class-index">
    <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)">
    </qm-tabs>

    <router-view />
  </div>
</template>

<script>
  import QmTabs from 'component/qm-tabs/index';

    export default {
        name: "favorites_store",
        data(){
          return{
                tabs:{
                  tag:{name:'店铺会员列表',select:true,act:'tag'},
                  import_user:{name:'批量导入会员',select:true,act:'import_user',hidden:true},
                  import_detail:{name:'批量导入详情',select:true,act:'import_detail',hidden:true},
                },
          }
        },
        components: {
          QmTabs,
        },
        methods:{
          routerData(data){
            if(!data.item.hidden){
              var url = '/user/favorites_store/'+data.key
              this.$router.push(url);
            }
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
