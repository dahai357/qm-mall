<style scoped>

  .store-logo{text-align: center; padding: 20px;
  /* width:198px;height: 172px; */
  background: #fff}
  .store-logo img{border-radius:5px;
  max-width: 100px; max-height: 100px;
  }
  .store-logo a{color:#757575; display: block; margin-top: 11px;     }
  .store-logo a:hover{text-decoration: none; color:#ff8519;}
  .store-logo .icon-edit{margin:4px 3px 0 0}
  .store-logo .store-txt{margin-top: 10px; font-size: 14px;}

  .setting-usual{
    font-size: 16px;    padding: 14px 24px; background: rgb(249,249,249);    color: #757575;
    cursor: pointer;
    }
  .setting-usual:hover{color:#ff8519}
  .icon-small{font-size: 0.8em;margin-left: 4px}
  .side-menu-item{padding-left: 30px;line-height: 48px;    font-size: 16px;    color: #757575;background: #fff;cursor: pointer;}
  .side-menu-item:hover{color:#ff8519}
  .side-menu-item-select{
    padding-left: 30px;
    line-height: 48px;
    font-size: 16px;
    color: #ff8519;
    background: rgb(255, 237, 221);
    position: relative;
    }
  .side-menu-item-select::after{
    content: "";
		    /* border-top: solid 20px #ff8519;;
		    border-left: solid 2px #ff8519;
		    border-right: solid 20px #ff8519;
        border-bottom: solid 2px #ff8519; */
        width: 3px;
        height: 20px;
        position: absolute;
        background: #ff8519;
		    left: 0%;
		    top: 30%;
  }
  .sidebar .sitemap-menu {
    background: #fff;
    display: none;
    width: 750px;
    padding: 15px 20px;
    border: solid 1px #eee;
    position: absolute;
    z-index: 1;
    top: -175px;
    left: 210px;
    border-radius: 5px;
}
.sitemap-menu .title-bar h2 {
    color: #ff8519;
    font-size: 25px;
    line-height: 40px;
}
.sitemap-menu .title-bar h2 em {
    font-size: 12px;
    color: #757575;
    margin-left: 8px;
}
.sitemap-menu .title-bar .close:hover {
    color: #ff8519;

}
.sitemap-menu .title-bar .close{
  font: lighter 26px/26px Verdana;
    color: #999;
    vertical-align: middle;
    text-align: center;
    width: 26px;
    height: 26px;
    position: absolute;
    z-index: 1;
    top: 20px;
    right: 20px;
    cursor: pointer;
}
.quicklink_list_all{
  /* float: left; */
  width: 25%;
      font: lighter 16px/32px "microsoft yahei";
    color: #212121;
    padding: 0px 15px;
    margin:20px 0px 0px;
    display: inline-block;
    vertical-align: top;
}
.quicklink_list_sub_all{
    color: #757575;
    overflow: hidden;
    zoom: 1;
    line-height: 1.8;
    font-size: 14px;
    display: block;
    padding: 0 8px;
}
.orange{
  color:#ff8519
}
.gray{
  color:rgb(187,187,187)
}


</style>
<template>
  <div class="side-menu">
    <div class="store-logo">
      <img :src="storeLabelUrl">
      <a @click="doRouter('/store/store_setting/store_setting')">
      <!-- <i class="el-icon-edit-outline"></i> -->
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      编辑店铺设置</a>
    </div>

    <el-popover
    ref="popoverQuickLink"
    placement="right-end"
    width="800"
    :offset="20"
    popper-class="popover-class"
    v-model="showQuickLink">
    <div class="sitemap-menu">
      <div class="title-bar">
          <h2> <i class="fa fa-sitemap"></i>
          <!-- <i class="icon-sitemap"></i> -->
          管理导航<em>小提示：添加您经常使用的功能到首页侧边栏，方便操作。</em> </h2>
          <span id="closeSitemap" class="close" @click="showQuickLink = false">×</span>
      </div>
      <div id="quicklink_list" class="content">
        <div class="quicklink_list_all" v-if="m != 'home'" v-for="(menu,m,index) in menuList">
          {{menu.name}}
          <div class="quicklink_list_sub_all" v-for="(submenu,sm,sindex) in menu.child">{{submenu.name}}
            <i class="fa fa-check-square-o fr" :class="submenu.quickLink?'orange':'gray'" style="margin-top:5px;" @click="changeQuickLink(submenu,sm,sindex)"></i>
          </div>
        </div>
      </div>

    </div>
  </el-popover>

    <div v-show="isQuickLinkShow" class="setting-usual" v-popover:popoverQuickLink>设置常用功能菜单<i class="el-icon-arrow-right icon-small"></i></div>
    <div  v-for="(item, key) in subMenu" :key="'key'+key" :name="'/'+item.act+'/'+item.op" :class="(item.select?'side-menu-item-select ':'')+'side-menu-item'" @click="toggleSideMenu(item,key)">{{item.name}}</div>
    <side-pro></side-pro>
  </div>
</template>

<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex';
  import util from 'lib/utils/util';
  import QmDialog from 'component/qm-dialog/index';
  import sidePro from 'component/side-pro/side-pro';
  
  import * as _ from 'lodash';
  import storage from "../../libs/utils/storage";
    export default {
        name: "side-menu"
      ,
      data(){
        return {
          isHome:true,
          openName:'',
          activeName:'',
          showQuickLink:false,//是否显示快速链接设置
          storeLabel:'',
          storeLabelUrl:'',
        }
      },
      computed: {
        ...mapGetters({
          subMenu: 'getSubMenu',
          menuList:'getMenuList',
          quickLink:'getQuickLink',
          sellerInfo:'getSellerInfo',
          metaData:'getMetaData',
          isQuickLinkShow:'getIsQuickLinkShow',
          basicStore:'getBasicStore',
          ImageIp:'getImageIp',
          imagePathConfig:'getImagePathConfig',
        })
      },
      methods:{
          ...mapMutations({
            setIsQuickLinkShow:'setIsQuickLinkShow',
            setSideMenuOrderClick:"setSideMenuOrderClick"
          }),
          ...mapMutations('storeReceiving',{
            router_state:'setRouter_state'
         }),
          ...mapActions({
            updateSubMenu:'updateSubMenu',
            updateQuickLink:'updateQuickLink',
            getStoreSetting:'getStoreSetting'
          }),
        handSelect(name){
            this.$emit('on-select',name)
        },
        handOtherSelect(name){

        },
        doRouter(url){
            this.$router.push(url);
        },
        getOpenedNamesByActiveName (name = '') {
          return this.$route.matched.map(item => item.name).filter(item => item !== name)
        },
        updateOpenName(name){
            this.openName = name
        },
        toggleSideMenu(item,key){
          var newSubMenu = _.clone(this.subMenu);
          for (const key in newSubMenu) {
            if(newSubMenu[key].select){
              newSubMenu[key].select = false;
            }
          }
          newSubMenu[key].select = true;
          this.$store.commit("setSubMenu",newSubMenu);

          //路由跳转
           var url = '/' + item.pname + '/' + item.act+ '/' + item.op;
           this.$router.push({ path: url });
           if(key == "store_receiving"){
             this.router_state(true);
           }
           if(key == "store_ap_adv"){
              storage.set('advType',1);
           }
           if(key == "store_order"){
             this.setSideMenuOrderClick(true);
           }
        },

        fixQuickLink(quickLink,menuList){
          var newMenuList = _.clone(menuList);
          //先做清空处理
          this.clearQuickLinkFlag(newMenuList);
          //再做赋值处理
          this.setQuickLinkFlag(newMenuList,quickLink);
          //最后改变state的menuList的值
          this.$store.commit('setMenuList',newMenuList);
        },

        clearQuickLinkFlag(menuList){
          for (const menu in menuList) {
            if(menuList[menu].quickLink){ menuList[menu].quickLink = false}
            if(menuList[menu].child){
              this.clearQuickLinkFlag(menuList[menu].child);
            }
          }
        },
        setQuickLinkFlag(menuList,quickLink){
          for (const menu in menuList) {
            for (const link in quickLink) {
              if(menuList[menu].act == quickLink[link].act){
                menuList[menu].quickLink = true;
              }
            }
            if(menuList[menu].child){
              this.setQuickLinkFlag(menuList[menu].child,quickLink);
            }
          }
        },

        changeQuickLink(submenu,sm,sindex){
          var data = {
            key:this.metaData.key,
            item:submenu.act
          }
          
          if(!submenu.quickLink){
            var count = 0;
            for (const key in this.quickLink) {
              if (this.quickLink.hasOwnProperty(key)) {
                const element = this.quickLink[key];
                count ++;
              }
            }
            if(count  >= 8){
              util.msg("快捷操作最多添加8个");
              this.fixQuickLink(this.quickLink,this.menuList)
              return;
            }
          }
          this.updateQuickLink(data).then((res)=>{});
        },
      },
      watch:{
        openName(){
          // this.updateSubMenu(this.getOpenedNamesByActiveName(this.openName))
          // this.activeName = '/' + this.openName;
          // this.$nextTick(() => {
            // this.$refs.menus.updateOpened()
            // this.$refs.menus.updateActiveName()
          // })
        },

        quickLink(){
          this.fixQuickLink(this.quickLink,this.menuList);
        },

        subMenu(){

        },
        basicStore(){
          if(this.basicStore.storeLabel && this.basicStore.storeLabel != ''){
            this.storeLabel = this.basicStore.storeLabel;
            this.storeLabelUrl =  this.ImageIp + this.imagePathConfig.storeLabel + this.storeLabel+'&t='+Number(new Date());

          }
        }
      },
      mounted() {

        if(this.$router.history.current.name  == 'home'){
          this.setIsQuickLinkShow(true);
        }else{
          this.setIsQuickLinkShow(false);
        }
        this.updateSubMenu(this.getOpenedNamesByActiveName(name))
        this.openName = this.$route.name

        this.fixQuickLink(this.quickLink,this.menuList);

        this.getStoreSetting();
      },
      components:{
      QmDialog,
      sidePro,
    },
    }
</script>

<style scoped>

</style>
