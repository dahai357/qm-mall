<style scoped  lang="scss" src="./main.css">
</style>
<template>
  <div class="home" >
    <div>
      <div class="header" v-if="!isPrint">
        <div class="menu-div">
          <div class="main-logo">
            <router-link to="/"><img class="logo" src="./../../assets/logo-white2.png" alt="身边店"></router-link>
          </div>

        <div class="ncsc-nav">
          <div v-for="(menu,m) in menuList" :key="'menu'+m" :class="menu.curent?'curent-menu':'menu'" @click="changeCurent(m,menu.child)" @mouseenter="changeMenuHover(menu,m,true)" @mouseleave="changeMenuHover(menu,m,false)">{{menu.name}}<i class="red-dot" v-if="menu.hasOwnProperty('reddot') && menu.reddot"></i><div v-if="menu.new" class="circle-orange"></div>
              <div v-if="menu.child && menu.hover" class="sub-menu">
                <div v-for="(sub,skey) in menu.child" :key="'skey'+skey" class="sub-menu-item" @click="changeSubCurent($event,m,menu.child,sub,skey,menu)">
                    <a href="javascript:void(0)">{{ sub.name}}<i class="red-dot" v-if="sub.hasOwnProperty('reddot') && sub.reddot"></i></a></div>
              </div>
          </div>

        </div>

        <div class="ncsc-admin" @mouseenter="changeAdminHover(true)" @mouseleave="changeAdminHover(false)">
          <div class="admin-name">
            {{ sellerInfo.memberName }}
            </div>
            <i v-if="adminHover" class="el-icon-caret-top admin-icon"></i><i v-else class="el-icon-caret-bottom admin-icon"></i>
            <div class="sub-menu account-menu" v-if="adminHover">
                <!--<div class="sub-menu-item" v-for="(other,o) in otherMenu.child" @click="toggleAccountMenu(other,o)">{{otherMenu.name}}</div>-->
                <div v-if="metaData.seller_is_admin" class="sub-menu-item" @click="pushRouter('/account/store_info/index' )">店铺信息</div>
                <div class="sub-menu-item" @click="pushRouter('/change_pwd/change_pwd')">修改密码</div>
                <div class="sub-menu-item" @click="logOut()">退出</div>
          </div>
        </div>
        </div>
      </div>
        <div class="content" id="content" :style="!isPrint?'marginTop:30px':'marginTop:30px'">

            <div class="absoluteMenu " v-if="!isPrint" style="marginTop:20px">
              <side-menu @on-select="navigate" ref="sideMenu" :active-name="$route.name"></side-menu>
              <!--
                <a class="download" :href="baseConfig.downloadPath">下载客户端
                <i class="fa fa-download" aria-hidden="true"></i>
              </a>
              <a class="download" :href="baseConfig.downloadXpPath">下载客户端(xp)
                <i class="fa fa-download" aria-hidden="true"></i>
              </a>-->
                <a class="download" style="background: none;cursor: default;">
                </a>
            </div>

            <!-- <div class="fl empertyLeft" v-if="!isPrint">

            </div> -->
            <div class="fl empertyLeft1" v-if="isPrint">

            </div>

          <div class="routerContent fl" ref="scollElement">
            <router-view style="width: 1000px;"/>
            <div id="footer" v-if="!isPrint">
                        <p>
                            <a target="_blank" href="http://www.shenbd.com/service/storeagreement.html">平台服务协议</a>
                           <!-- |  <a target="_blank" href="http://www.shenbd.com/service/storeagreementbytrial.html">平台试用期服务协议</a>-->
                            |  <a target="_blank" href="http://www.shenbd.com/service/privacy.html">隐私政策</a>
                          </p>
                © 2019福州千盟经贸有限公司 版权所有 <a target="_blank" href="http://beian.miit.gov.cn/?spm=5176.12825654.7y9jhqsfz.110.e9392c4aiY4UJy">闽ICP备17018652号-1</a>
            </div>

          </div>
        </div>


      </div>

<div id="tbox" @click="scrollToTop" v-if="!isPrint">
  <div class="btn" id="gotop" style="display: block;"><i class="top"></i><a href="javascript:void(0);" >返回顶部</a></div>
</div>

<audio id="bgMusic" ref="bgMusic">
    <source src="../../../static/mp3/dingdong10.mp3" type="audio/mp3">
</audio>
<audio id="bgCMusic" ref="bgCMusic">
    <source src="../../../static/mp3/dingdong35.mp3" type="audio/mp3">
</audio>
<audio id="bgAMusic" ref="bgAMusic">
  <source src="../../../static/mp3/dingdong40.mp3" type="audio/mp3">
</audio>
    <el-dialog
        :visible.sync="showGuide"
        :lock-scroll="modalAppendToBody"
        width="980px"
        hieght="700px"
        :show-close="showClose"
        :close-on-click-modal = "closeOnClickModal"
        customClass="new-guide"
        >
        <qm-guide-tip @hideNewGuide="hideNewGuide($event)" v-if="showGuide"></qm-guide-tip>

    </el-dialog>
  </div>
</template>

<script>
  import util from 'util';
  import sideMenu from '@/components/side-menu'
  import QmGuideTip from 'component/qm-guide-tip/index';
  import {mapGetters,mapActions, mapMutations} from 'vuex'
  import mixin from './mixin'
  import * as _ from 'lodash';
  import storage from '../../libs/utils/storage';
  import {inventoryWarning} from 'api'
  import {banBackSpace} from '../../libs/utils/preventBackspace'
  import axios from 'axios';

    export default {
      name: "Main",
      state:{
        isReceiveOrder :{}
      },
      mixins:[mixin],
      data(){
          return {
            topActiveName:'',
            adminHover:false,
            menus:[

            ],

            isReceiveOrder:{},
            interval:null,

            showGuide:false,
            showClose:false,

            isPrint:false,
            modalAppendToBody:false,
            closeOnClickModal:false,
          }
      },
      components:{
        sideMenu,
        QmGuideTip
      },
      computed:{
        ...mapGetters({
          menuList:'getMenuList',
          otherMenu:'getOtherMenu',
          sellerInfo:'getSellerInfo',
          baseConfig:'getBaseConfig',
          metaData:'getMetaData',
          subMenu:'getSubMenu'
        })
      },

      methods: {
        ...mapMutations({
          setIsQuickLinkShow:'setIsQuickLinkShow',
          setSideMenuOrderClick:"setSideMenuOrderClick"
        }),
        ...mapMutations('storeReceiving',{
            router_state:'setRouter_state'
         }),
        ...mapActions({
          logOut:'logOut',
          logOutNew:'logOutNew',
          checkReceiveOrder:'checkReceiveOrder'
        }),
        hideNewGuide(){
          this.showGuide = false;
        },
        navigate(url){
          this.$router.push(url)
        },
        updateActive(router,refresh = false){
            var rootPath = router.matched[1].name
            var subKey = '';
            if(router.matched[2]){
              var secondPath = router.matched[2].name
              subKey = this.parseSubKey(router.matched[0].name,rootPath,secondPath);
            }else{

              subKey = router.matched[1].name.split("/")[0]
            }

            this.changeSubData(rootPath,subKey,router.name)

        },
        parseSubKey(routerName,rootPath,secondPath){
          if(routerName != 'account'){
            for (const key in this.menuList) {
              if(key === rootPath){
                var tempSubMenu = this.menuList[key].child;
                for (const subKey in tempSubMenu){
                  if(secondPath === tempSubMenu[subKey].act){
                    return subKey;
                  }
                }
              }
            }
          }else{
            for(const key in this.otherMenu.child){
              var item = this.otherMenu.child[key]
              if(rootPath == item.act){
                return item.act;
              }
            }
          }
          return ''
        },
        changeCurent(m){
          var url = '';
          var newMenuList = _.clone(this.menuList);
            for (const key in newMenuList) {

              if(newMenuList[key].curent){
                if(key == m){
                  return;
                }
                newMenuList[key].curent = !newMenuList[key].curent;
              }
            }
            newMenuList[m].curent = !newMenuList[m].curent;
            this.$store.commit("setMenuList",newMenuList);
            //修改左边菜单
            var newSubMenu = _.clone(newMenuList[m].child);

            if(m == 'home'){
              newSubMenu =  storage.get('quickLink')
              for (const key in newSubMenu) {
                if(key == ""){
                  delete newSubMenu[key];
                }
              }
            }
              var firstKey = this.get_object_first_attribute(newSubMenu);

              for (const key in newSubMenu) {
                if(newSubMenu[key].curent){
                  if(key == firstKey){
                    break;
                  }
                  newSubMenu[key].curent = !newSubMenu[key].curent;
                }
              }
              if(newSubMenu[firstKey] && m != "home"){
                newSubMenu[firstKey].select = true;
              }
              this.$store.commit('setSubMenu',newSubMenu);
            if(m == 'home'){
              url = '/home'
            }else{
              url = '/' + m + '/' + newSubMenu[firstKey].act;
            }
            //路由跳转
            this.$router.push({ path: url });

        },
        //点击二级菜单
        changeSubCurent(event,m,child,sub,skey,menu){
          event.stopPropagation();
          this.changeSubData(m,skey,'')

          //路由跳转
          var url = '/' + m + '/' + sub.act+'/'+sub.op;
          this.$router.push({ path: url });
          if(skey == 'store_receiving'){
             this.router_state(true);
          }
          if(skey == 'store_ap_adv'){
              storage.set('advType',1);
          }
          if(skey == "store_order"){
             this.setSideMenuOrderClick(true);
           }

          if(menu){
            var newMenu = _.clone(menu);
            newMenu.hover = false;
            var list = _.clone(this.menuList);
            list[m] = newMenu;
            this.$store.commit("setMenuList",list);
            // menu.hover = false;
          }

          $(".layui-laydate.laydate-theme-molv").css('display','none');
        },

        //账号路由跳转
        toggleAccountMenu(item,key){
          this.adminHover=false
          var newSubMenu = _.clone(this.otherMenu.child);
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

        },
        //普通跳转
        pushRouter(url){
           this.adminHover=false
           // this.resetSubData()
            var newMenuList = _.clone(this.menuList);
            // for (const key in newMenuList) {
            //     newMenuList[key].curent = false;
            // }
            // this.$store.commit("setMenuList",newMenuList);
            this.$store.commit('setSubMenu',{});
            this.$router.push({ path: url });
        },
        resetSubData(){
          var newMenuList = _.clone(this.menuList);
          for (const key in newMenuList) {
            if(newMenuList[key].curent){
              newMenuList[key].curent = false;
            }
          }
          this.$store.commit("setMenuList",newMenuList);
        },

        changeSubData(m,skey,route){
          var newMenuList = _.clone(this.menuList);
          for (const key in newMenuList) {
            if(newMenuList[key].curent){
             /* if(key == m){
                break;
              }*/
              newMenuList[key].curent = false;
            }
          }
          //newMenuList[m].curent = !newMenuList[m].curent;

          if(newMenuList[m]){
            newMenuList[m].curent = true;
            //修改左边菜单
            if(route != 'home'){
              var newSubMenu = _.clone(newMenuList[m].child);
              for (const key in newSubMenu) {
                if(newSubMenu[key].select){
                  if(key == skey){
                    //return;
                  }
                  newSubMenu[key].select = !newSubMenu[key].select
                }
              }
              if(newSubMenu[skey]){
                newSubMenu[skey].select = true;
              }

              var name = this.$router.history.current.name;
              //打印订单不需要选中接单菜单
              if(name == 'store_order_order_print'){
                for (const key in newSubMenu) {
                    newSubMenu[key].select = false
                }
              }
              this.$store.commit('setSubMenu',newSubMenu);
            }else{
              newSubMenu =  storage.get('quickLink');
              for (const key in newSubMenu) {
                if(key == ""){
                  delete newSubMenu[key];
                }
              }
              var firstKey = this.get_object_first_attribute(newSubMenu);
              for (const key in newSubMenu) {
                if(newSubMenu[key] && newSubMenu[key].curent){
                  if(key == firstKey){
                    break;
                  }
                  newSubMenu[key].curent = !newSubMenu[key].curent;
                }
              }
              if(newSubMenu[firstKey] && m != "home"){
                newSubMenu[firstKey].select = true;
              }
              this.$store.commit('setSubMenu',newSubMenu);
            }
          }else{
            var newOtherMenu = {}
            if(m=='article' || route == 'store_info/index' || route == '/change_pwd/change_pwd'){

            }else{
              newOtherMenu = this.otherMenu.child;
              for (const key in newOtherMenu) {
                  newOtherMenu[key].select = false;

                  if(newOtherMenu[key].act == skey){
                    newOtherMenu[key].select = true;
                  }
              }
            }
            this.$store.commit('setSubMenu',newOtherMenu);
          }
          this.$store.commit("setMenuList",newMenuList);
        },
        changeMenuHover(menu,m,value){
          var newMenuList = _.clone(this.menuList);
          newMenuList[m].hover = value;
          this.$store.commit('setMenuList',newMenuList);
        },
        changeAdminHover(value){
          this.adminHover =value
        },
        get_object_first_attribute(data){
            for (var key in data){
              return key;
            }
        },
        scrollToTop(){
          // var interval = setInterval(() => {
          //   // var scrollY = window.scrollY;
          //   // var scrollY = document.body.scrollTop;
          //   // if(scrollY > 10){
          //   //   // window.scrollTo(0,scrollY - 50)
          //   //   document.body.scrollTop = scrollY - 50;
          //   // }else{
          //   //   // window.scrollTo(0,0)
          //   //   document.body.scrollTop = 0;
          //   //   window.scrollTo(0,0);
          //   //   clearInterval(interval);
          //   // }
          //   var rt = document.getElementsByClassName("routerContent")[0].scrollTop;
          //   if(rt > 10){
          //     // window.scrollTo(0,scrollY - 50)
          //     document.getElementsByClassName("routerContent")[0].scrollTop = rt - 50;
          //   }else{
          //     // window.scrollTo(0,0)
          //     document.getElementsByClassName("routerContent")[0].scrollTop = 0;
          //     window.scrollTo(0,0);
          //     clearInterval(interval);
          //   }
          // }, 10);
              document.getElementsByClassName("routerContent")[0].scrollTop = 0;
              window.scrollTo(0,0);
        },
         open(){
          if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
            $("html").css("overflow","hidden");
            $(".main").css("marginRight","18px");
            $(".header").css("width","calc(100% - 16px )");
            // var marginl = "calc((100% - 2px - 1200px)/2)";
            // $("#content").css("marginLeft",marginl);
          }
        },
        close(){
          if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
            $("html").css("overflow","auto")
            $(".main").css("marginRight","0px");
            $(".header").css("width","calc(100% - 0px)");
            // var marginl = "calc((100% - 1200px)/2)";
            // $("#content").css("marginLeft",marginl);
          }
        },
      },
      getters:{
        getIsReceiveOrder(state){
          return state.isReceiveOrder;
        }
      },
      mutations:{
        setIsReceiveOrder(state,isReceiveOrder){
          state.isReceiveOrder = isReceiveOrder;
        },
      },
      watch:{
          '$route'(newRouter){
              this.updateActive(newRouter,true);
              this.$store.commit('setCurTabMenu',newRouter.path);
              // this.updateActive(newRouter.name)
              // this.$refs.sideMenu.updateOpenName(newRouter.name)
              inventoryWarning.isInventoryWarning().then(res=>{//库存预警值
                  var newMenuList = _.clone(this.menuList);
                  newMenuList['goods'].reddot = res.responseContent.isInventoryWarning;
                  newMenuList['goods'].child.inventory_warning.reddot = res.responseContent.isInventoryWarning;
                  newMenuList['order'].reddot = res.responseContent.hasDealing;
                  newMenuList['order'].child.store_refund.reddot = res.responseContent.hasDealing;
                  newMenuList['order'].reddot = res.responseContent.orderTips.all_count;
                  newMenuList['order'].child.store_order.reddot = res.responseContent.orderTips.all_count;
                  newMenuList['order'].child.store_receiving.reddot = res.responseContent.orderTips.wait_count;
                  this.$store.commit('setMenuList',newMenuList);
                  this.$store.commit('setOrderTips',res.responseContent.orderTips);

              })
          }
      },
      mounted() {
        inventoryWarning.isInventoryWarning().then(res=>{//库存预警值
          var newMenuList = _.clone(this.menuList);
          newMenuList['goods'].reddot = res.responseContent.isInventoryWarning;
          newMenuList['goods'].child.inventory_warning.reddot = res.responseContent.isInventoryWarning;
          newMenuList['order'].reddot = res.responseContent.hasDealing;
          newMenuList['order'].child.store_refund.reddot = res.responseContent.hasDealing;
          newMenuList['order'].reddot = res.responseContent.orderTips.all_count;
          newMenuList['order'].child.store_order.reddot = res.responseContent.orderTips.all_count;
            newMenuList['order'].child.store_receiving.reddot = res.responseContent.orderTips.wait_count;
          this.$store.commit('setMenuList',newMenuList);
          this.$store.commit('setOrderTips',res.responseContent.orderTips);
        })
          this.$store.commit('setCurTabMenu',this.$route.path);
          this.updateActive(this.$route,true);

          this.interval = setInterval(() => {
              this.checkReceiveOrder().then((res)=>{
                if(res.resultCode == 1){
                  this.isReceiveOrder = res.responseContent;
                  this.$store.commit('setIsReceiveOrder', res.responseContent);
                  if(this.isReceiveOrder.cancel_count > 0){
                        var audio = document.getElementById("bgCMusic");
                        // 播放(继续播放)
                        audio.play();
                        // this.$refs.bgMusic.play();
                  }

                  if(this.isReceiveOrder.count > 0){
                      //新增待接单数据 导航子菜单显示红点
                      var newMenuList = _.clone(this.menuList);
                      newMenuList['order'].child.store_receiving.reddot = this.isReceiveOrder.count;
                      this.$store.commit('setMenuList',newMenuList);

                      var audio = document.getElementById("bgMusic");
                          // 播放(继续播放)
                          audio.play();
                          // this.$refs.bgCMusic.play();
                  }
                  if(this.isReceiveOrder.has_dealing>=0){
                      //新增售后 导航子菜单显示红点
                      var newMenuList = _.clone(this.menuList);
                      newMenuList['order'].child.store_refund.reddot = this.isReceiveOrder.has_dealing;
                      this.$store.commit('setMenuList',newMenuList);
                  }
                  if(this.isReceiveOrder.autmatic_tips > 0){

                    var audio = document.getElementById("bgAMusic");
                    // 播放(继续播放)
                    audio.play();
                    // this.$refs.bgCMusic.play();
                  }
                }
              })
          }, 30000);

          // this.$nextTick(()=>{
          //     var marginl = "0px";
          //     if(window.innerWidth <= 1200){
          //       marginl = "0px";
          //     }else{
          //       // marginl = "calc((100% - 1200px)/2 + (100vw - 100%)/2)";
          //       marginl = "calc((100% - 1200px)/2";
          //     }
          //     if($("#content")){
          //       $("#content").css("marginLeft",marginl);
          //     }
          // })
          if(this.metaData.newLogin == 1){
            var guided = storage.get('guided');
            if(!guided){
              this.showGuide = true;
              //这行不能去掉，去掉会导致--新用户首次登录，直接退出窗口，再任何界面刷新都会弹出弹窗
              storage.set('guided',true);
            }else{
              // storage.set('guided',false);
            }

            const newMetaData = _.clone(this.metaData);
            newMetaData.newLogin = 0;
            this.metaData = newMetaData;
            storage.set('metaData',newMetaData);
          }else{
            this.showGuide =false;
          }

          if(this.$route.name=="store_order_order_print"){
            this.isPrint = true;
          }else{
            this.isPrint = false;
          }
          document.onkeypress=banBackSpace
          document.onkeydown=banBackSpace

           $('.routerContent')[0].addEventListener("scroll", function(event){
                $('.layui-laydate').hide()
            });
      },

      beforeRouteUpdate (to, from, next) {
        var length = 0 ;
        for (const key in this.subMenu) {
          length++;
        }
        if(!this.subMenu || length == 0){
          var rootPath = to.matched[1].name
          this.changeSubData(rootPath,"",to.name)
        }
        // window.scrollTo(0,0);
      this.$nextTick(()=>{
        // document.body.scrollTop = 0;
        // window.scrollTo(0,0)
        document.getElementsByClassName("routerContent")[0].scrollTop = 0;
       })
        if(to.name == 'home'){
          this.setIsQuickLinkShow(true);
        }else{
          this.setIsQuickLinkShow(false);
        }
        next()
      },

      beforeRouteEnter(to, from, next){
            next()
      },


      beforeRouteLeave(to, from, next){
        console.log("beforeRouteLeave");
        clearInterval(this.interval);
        next()
      },

      destory(){
        clearInterval(this.interval);
      },
    }
</script>

<style scoped>
  .account-menu{
    margin-left: 0px;
    width: 70%;
  }
</style>
