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
    name: "diliveryman",
    data(){
      return{
        tabs:{
          index:{name:'配送员管理',select:true,act:'index'},
          delivery_eval_label:{name:'配送员评价标签库',select:false,act:'delivery_eval_label'},
          label_add :{name:'添加/编辑配送员标签',select:true,act:'label_add',hidden:true},
        },
      }
    },
    components: {
      QmTabs,
    },
    methods:{
      routerData(data){
        this.url = data.key;
        var url = '/data_center/diliveryman/'+data.key
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
