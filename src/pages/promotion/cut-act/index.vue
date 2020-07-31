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

  .dropdown{ position: relative; display: inline-block;}
  .dropdown .ncsc-btn{ border-color:#212121; font-size: 16px;}
  .dropdown .ncsc-btn:hover, .dropdown.open .ncsc-btn{ color:#fff; background: #212121;}
  .dropdown .dropdown-menu{ position: absolute;  min-width: 120px; top: 40px; right: 0; border:1px solid #b6b6b6; border-radius:5px; background: #fff;}
  .dropdown .dropdown-menu:before{ content:''; position: absolute; border:8px dashed transparent; border-bottom:8px solid #b6b6b6; right:5px; top: -16px; width:0;height:0;font-size:0; overflow:hidden;}
  .list-dropdown{ border-radius:5px; overflow:hidden;}
  .list-dropdown li{ padding:0 10px; position: relative; box-sizing: border-box; line-height: 2; border-top: 1px solid #b6b6b6; white-space: nowrap;}
  .list-dropdown li:first-child{ border:none}
  .list-dropdown li:hover{ background: #f5f5f5; cursor: pointer;}
</style>
<template>
  <div class="qm-store-class-index">
    <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)">
    </qm-tabs>
    <div class="menu-more">
      <a class="ncsc-btn ncsc-btn-orange" v-if="curUrl === 'index'"  @click="addCut()">添加活动</a>
    </div>
    <div class="clear"></div>
    <keep-alive>
      <router-view v-if="$route.meta.cutKeepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.cutKeepAlive" />
  </div>
</template>

<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'
import QmTabs from '../../../components/qm-tabs/index';
import storage from 'lib/utils/storage'
import {cutAct} from 'api'
import exportData from 'lib/utils/export';

    export default {
        name: "store-evaluate",
        data(){
          return{
                tabs:{
                  index:{name:'砍价管理',select:true,act:'index'},
                  cut_add:{name:'添加活动',select:false,act:'cut_add',hidden:true},
                  cut_edit:{name:'编辑活动',select:false,act:'cut_edit',hidden:true,stay:true},
                  cut_view:{name:'查看活动情况',select:false,act:'cut_view',hidden:true},
                  cut_join:{name:'砍价详情',select:false,act:'cut_join',hidden:true,stay:true},
                },
            curUrl:'',
            dropDown:false,

            href:'',
            download:'',
          }
        },
        components: {
          QmTabs,
        },
      computed:{
      },
        methods:{
          addCut(){
            storage.set('active_id',0)
            var data = {
              key:'cut_add'
            }
            this.routerData(data)
          },
          back(){
            var data = {
              key:'index'
            }
            this.routerData(data)
          },
          routerData(data){
            this.curUrl = data.key
            var url = '/promotion/cut_act/'+data.key
            this.$router.push(url);
          },
          changeCur(){
            var cut_act_id = storage.get('cut_act_id')
            var cut_edit = storage.get('cut_edit')

            if(cut_act_id){
              this.tabs.cut_add.name = this.canEdit?(cut_edit ? '销售员管理':'编辑活动'):'查看活动'
            }else{
              this.tabs.cut_add.name = '添加活动'
            }
            var path = this.$route.path
            this.curUrl = path.substring(path.lastIndexOf('/') + 1);
            if(this.curUrl == 'cut_join'){
              this.tabs.cut_view.hidden = false;
            }else if(this.curUrl != 'cut_join'){
              this.tabs.cut_view.hidden = true;
            }
          },
        },
      watch:{
        '$route'(newRouter){
          this.dropDown = false
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
