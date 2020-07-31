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
      <el-checkbox @change="selectAll($event)" v-model="getCheckAll" v-if="(curUrl === 'poster_history')">全选</el-checkbox>
      <a class="ncsc-btn ncsc-btn-orange" v-if="(curUrl === 'index' || curUrl === 'edit') && showHistory"  @click="posterHistory()">历史编辑记录</a>
      <a class="ncsc-btn ncsc-btn-orange-rim"  v-if="(curUrl === 'poster_history')" @click="batchDel()">批量删除</a>
    </div>
    <div class="clear"></div>
    <router-view />
  </div>
</template>

<script>
import QmTabs from '../../../components/qm-tabs/index';
import {mapGetters,mapActions} from 'vuex';

    export default {
        name: "store-poster",
        data(){
          return{
                tabs:{
                  index:{name:'在线编辑宣传海报',select:true,act:'index'},
                  poster_history:{name:'历史编辑记录',select:false,act:'poster_history',hidden:true},
                  edit:{name:'',select:false,act:'edit',hidden:true},
                },
            curUrl:'',
            showHistory:true,
          }
        },
        components: {
          QmTabs,
        },
      computed:{
          ...mapGetters('storePoster',{
            getDelIds:'getDelIds',
            getCheckAll:'getCheckAll'
          })
      },
        methods:{
          ...mapActions('storePoster',{
            hasHistory:'hasHistory',
            setAll: 'setAll',
            setWantDel:'setWantDel',
            setSelfChange:'setSelfChange'
          }),
          batchDel(){
            if(this.getDelIds.length == 0){
              layer.msg('请选择要删除的记录')
              return;
            }
            this.setWantDel(true)
          },
          selectAll(e){
            this.setSelfChange(false)
            this.setAll(e)
          },
          posterHistory(){
            var data = {
              key:'poster_history'
            }
            this.routerData(data)
          },
          routerData(data){
            this.curUrl = data.key
            var url = '/promotion/store_poster/'+data.key
            this.$router.push(url);
          },
          changeCur(){
            var path = this.$route.path
            this.curUrl = path.substring(path.lastIndexOf('/') + 1);
            if(this.curUrl == 'edit'){
              this.tabs.poster_history.hidden = true;
            }
            this.hasHistory({}).then(res=>{
              if(res.total > 0){
                this.showHistory = true;
              }else{
                this.showHistory = false;
              }
            })
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
