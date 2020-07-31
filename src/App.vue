<template>
  <div class="main">
    <router-view />
  </div>
</template>


<script>
import {mapGetters,mapActions} from 'vuex'
import consts from "./config/consts";
import storage from 'lib/utils/storage'
import util from 'lib/utils/util';

export default {
  name: 'main-app',
  created(event, callback){
    this.eventBus.$on('doLogin',this.doLogin)
    this.eventBus.$on('doLogout',this.doLogout)
    this.eventBus.$on('gotoLogin',this.gotoLogin)
  },
  destroyed(){

  },
  data(){
    return {
      time:null,
      rch:0,
    };
  },
  computed:{
    ...mapGetters({
      baseConfig:'getBaseConfig'
    }),
    isLogin:{
      get(){
        return this.$store.state.isLogin;
      },
      set(newVal){
        this.$store.state.isLogin = newVal;
      }
    }
  },

  destroyed() {
      window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
      window.removeEventListener('onunload', e => this.unloadHandler(e))
  },
  watch: {
    '$route'(newRouter) {
      if(!consts.EXCEPT_ROUTERS.has(newRouter.name)){
        this.checkLogin()
      }
    },
  },
  mounted(){
    var vm = this;

    //  window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    //  window.addEventListener('onunload', e => this.unloadHandler(e))

    //以下是调用上面的函数
    // var mb = this.myBrowser();
    // if ("IE" == mb) {
    //     // alert("我是 IE");
    //     window.onbeforeunload = function (){
    //       if(event.clientX>document.body.clientWidth&&event.clientY<0||event.altKey)
    //       {
    //         localStorage.clear();
    //       }
    //     }
    // }
    // if ("FF" == mb) {
    //     window.onunload = function(e){
    //       localStorage.clear();
    //     }
    // }

    // if ("Chrome" == mb) {
    //     window.onbeforeunload = function (){
    //         var event = vm.closeOrUpdate();
    //         var pages = storage.get("pages");
    //         if(pages && pages.length > 0){
    //           pages.forEach((page,p)=>{
    //             if(page+"" == vm.time +""){
    //               pages.splice(p,1);
    //             }
    //           })
    //           if(pages.length <= 0 || event == "close"){
    //             localStorage.clear();
    //           }
    //         }else{
    //           localStorage.clear();
    //         }
    //         storage.set("pages",pages);
    //     }
    //     window.onunload = function(e){
    //        var event = vm.closeOrUpdate();
    //       var pages = storage.get("pages");
    //         if(pages && pages.length > 0){
    //           pages.forEach((page,p)=>{
    //             if(page+"" == vm.time +""){
    //               pages.splice(p,1);
    //             }
    //           })
    //           if(pages.length <= 0 || event == "close"){
    //             localStorage.clear();
    //           }
    //         }else{
    //           localStorage.clear();
    //         }
    //         storage.set("pages",pages);
    //     }
    // }
    // if ("Opera" == mb) {
    //     window.onunload = function(e){
    //       localStorage.clear();
    //     }
    // }
    // if ("Safari" == mb) {
    //     window.onunload = function(e){
    //       localStorage.clear();
    //     }
    // }

    //  window.onload = function(e){

    //     var allcookies = document.cookie;
    //     e = e || window.event;
    //     // 兼容IE8和Firefox 4之前的版本
    //     if (e) {
    //       e.returnValue = '';
    //     }
    //     var pages = storage.get("pages");
    //     if(pages && pages != null && pages != undefined){

    //     }else{
    //       pages = [];
    //     }
    //     vm.time = new Date().getTime();
    //     pages.push(vm.time);
    //     storage.set("pages",pages);
    //      storage.set("test","test")
    //     return '加载';
    // },

    this.getConfig();

    var name = ""
    // var interval = setInterval(() => {
    //   var name = this.$router.history.current.name;
    //   if(name){
    //     clearInterval(interval);
    //     if(!consts.FRESH_EXCEPT_ROUTERS.has(name)){
            // this.checkLogin()//这个还需要router前置守卫判断
    //     }
    //   }
    // }, 100);
    var hash = window.location.hash;
    var hashData = hash.split('/');
    if(hashData[1]){
      name = hashData[1];
    }

    if(!consts.FRESH_EXCEPT_ROUTERS.has(name)){
        this.checkLogin()//这个还需要router前置守卫判断
    }

    // this.ieFixed();

    document.body.onmousemove = ()=>{
      this.changeKeyTime();
    }
    document.body.onmousedown = ()=>{
      this.changeKeyTime();
    }
    document.body.onkeydown = ()=>{
      this.changeKeyTime();
    }
    document.body.onkeypress = ()=>{
      this.changeKeyTime();
    }
    document.body.onclick = ()=>{
      this.checkKeyTime();
    }

  },
  methods:{
    ...mapActions({
      checkLogin:'checkLogin',
      getConfig:'getConfig'
    }),
    gotoLogin(){
      this.$router.push('/login');
    },
    onClick(){
      console.log("aaa");
    },
    ieFixed(){
      var vm = this;
      //ie 防抖动
      if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
          $('body').on("mousewheel", function (event) {
            var dialog = $(".el-dialog__wrapper");
            var openDialog = false;
            for(let i=0;i<dialog.length;i++){
              if($(dialog[i]).css("display") == "block"){
                  openDialog = true;
              }
            }
            if(!openDialog){
              event.preventDefault();
                  var wd = event.originalEvent.wheelDelta;
                  var csp = window.document.documentElement.scrollTop;
                  vm.$nextTick(()=>{
                      window.scrollTo(0, csp - wd);
                  })
            }

          });
          // $('body').on("click", function (event) {

          // });
          // $('body').on("DOMSubtreeModified", function (event) {
          //         event.preventDefault();
          //         var csp = window.document.documentElement.scrollTop;
          //         var csh = window.document.documentElement.scrollHeight;
          //         window.scrollTo(0, csp);
          // });





          // $(window).on("resize", function (event) {
          //         event.preventDefault();
          //         console.log("ccc");
          // });
      }
    },
    doLogin(){
      this.isLogin = true;
    },
    doLogout(){
      this.logOut()
    },
    checkKeyTime(){
        //有缓存数据
/*        var keyTime = storage.get("keyTime");
        var nowTime = Date.parse(new Date());
        var time = nowTime - keyTime;
        if(time > 12*60*60*1000){
          // key过期
          if(this.$route.name != "login"){
            // util.msg("授权过期");
            storage.set('keyTime',null);
            storage.set('key',null);
            storage.setCookie('key',null);
            Vue.prototype.eventBus.$emit('gotoLogin');
          }
        }*/
    },
    changeKeyTime(){
    /*  this.checkKeyTime();
      var keyTime = Date.parse(new Date())
      storage.set('keyTime',keyTime);*/
    },

    beforeunloadHandler(e){
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '';
        }
        alert("刷新");
        return '刷新';
    },

    unloadHandler(e){
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '';
        }
        alert("关闭");
        return '关闭';
    },

    myBrowser(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        }; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
      return "Chrome";
    }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }; //判断是否IE浏览器
    },
    //判断浏览器是刷新还是关闭
    //鼠标相对于用户屏幕的水平位置 - 窗口左上角相对于屏幕左上角的水平位置 = 鼠标在当前窗口上的水平位置
    closeOrUpdate(){
        var n = window.event.screenX - window.screenLeft;
        //鼠标在当前窗口内时，n<m，b为false；鼠标在当前窗口外时，n>m，b为true。20这个值是指关闭按钮的宽度
        var b = n > document.documentElement.scrollWidth-20;
        //鼠标在客户区内时，window.event.clientY>0；鼠标在客户区外时，window.event.clientY<0
        if(b && window.event.clientY < 0 || window.event.altKey || window.event.ctrlKey){
            // 关闭浏览器时你想做的事
            return "close"
        }else if(event.clientY > document.body.clientHeight || event.altKey){
            // 关闭浏览器时你想做的事
            return "update"
        }
    }
  }
}
</script>

<style>
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #ff8519;
  }
  .el-checkbox__label{
    padding-left: 5px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #ff8519;
    border-color: #ff8519;
  }
  .el-checkbox__inner:hover {
    border-color: #ff8519;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner{
    border-color: #ff8519;
  }
  .highlight-txt{
    color:#ff8519
  }
  .el-tree-node__content{
    height: 35px;
    line-height: 35px;
  }
  .el-tree-node.is-expanded .el-tree-node__children  .el-tree-node__content{
    margin-left: 5px;
  }
  .el-button--text,.el-button--text:focus, .el-button--text:hover{
    color: #ff8519;
  }
  .el-tree-node.is-checked>.el-tree-node__content{
    background-color:#f9f9f9;
    border: 1px solid #ff8519;
  }
  .el-tree-node.is-checked>.el-tree-node__content span{
    color: #ff8519;
  }

  .el-tree-node.is-current>.el-tree-node__content{
    background-color:#f9f9f9;
    border: 1px solid #ff8519;
  }
  .el-tree-node.is-current>.el-tree-node__content span{
    color: #ff8519;
  }
  .transparent{
    background: transparent;
  }
  .transparent .el-dialog__header{
    background: #ff8518 url(./assets/seller/images/seller/bg-ncsc-dialog.jpg) left center no-repeat;
    padding: 0 !important;

  }
  .transparent .el-dialog__header .el-dialog__headerbtn{
    color:white;
    top: 15px;
    right: 15px;
  }

  .transparent .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
    color: white;
  }
  .transparent.el-dialog{
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .transparent .el-dialog__body{
    padding: 0px;
    overflow: hidden;
  }
  .no-padding.transparent .el-dialog__body{
    padding:0px;
  }
.transparent .eject_con{
  background: #fff;
}
.transparent .virtual{
  height: 200px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.ncsc-dialog-in {
    background: url(./assets/seller/images/seller/b-dialog-expires.png) no-repeat;
    width: 662px;
    height: 481px;
    border: solid 0px #fff;
    webkit-box-shadow: 0 1px 3px rgba(0,0,0,0);
    box-shadow: 0 1px 3px rgba(0,0,0,0);
}

/* elementUI的样式类有些替换不了，写在这里 */
.phone-bind{

}
.hb-guide.el-dialog{
  background: transparent;
  box-shadow: none;
}
.phone-bind .el-dialog__header{
   background: #ff8518 url(./assets/seller/images/seller/bg-ncsc-dialog.jpg) left center no-repeat;
   padding: 0 !important;

}
.phone-bind .el-dialog__header .el-dialog__headerbtn{
  color:white;
  top: 15px;
  right: 15px;
}

.phone-bind .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
    color: white;
}

.phone-bind .el-dialog__body{
  padding: 30px 30px 0px 30px;
}
.sale-alert-dialog .el-dialog__body{
  padding: 20px 30px 0px 30px;
}
.no-padding.phone-bind .el-dialog__body{
  padding:0px;
}

.new-guide.el-dialog{
  padding: 0;
  border-radius: 20px;
}
  .new-tip.el-dialog{
    border-radius: 0px;
  }
.new-guide .el-dialog__body{
  padding: 0;
}

.new-guide .el-dialog__header {
    padding: 0;
}
.new-guide.el-dialog:before {
  top: -147px;
  content: '';
  position: absolute;
  width: 21px;
  height: 9px;
  background: url(./assets/seller/images/seller/newbie-guide/sprite-ng.png) no-repeat;
  /* background: #ff8518; */
  margin-left: 95px;
}

.show-image.el-dialog{
  padding: 0;
  /* border-radius: 20px; */
}
.show-image .el-dialog__body{
  padding: 10px;
}

.show-image .el-dialog__header {
    padding: 0;
}
.manage-sale .el-dialog__footer {
  padding-bottom: 0;
}
.manage-sale .el-dialog__body {
  padding: 10px 30px 0px 30px;
}
.sale-add-goods .el-dialog__body {
  padding: 10px 30px 30px 30px;
}
.show-image .el-dialog__close.el-icon.el-icon-close{
  display: none;
}
.layui-laydate .layui-laydate-content .layui-this{
  background-color: #ff8519 !important;
}
.online-goods .el-dialog__body{
    padding: 20px 20px 0px 20px;
}
body{
  padding-right: 0 !important;
  /* overflow: scroll !important; */
}
html,html body {
  /* height:100%; */
  height:auto
  ;margin: 0;
  background: #f5f7f9;
}
html{
  width: 100%;
  scrollbar-base-color: transparent;
  scrollbar-darkshadow-color: transparent;
  scrollbar-highlight-color: transparent;
  scrollbar-face-color: transparent;
  /* overflow-y: scroll; */
  overflow-y: hidden;
  /* 加scroll让滚动条一直存在,会影响弹窗滚动到顶部 */
}
html::-webkit-scrollbar{
  /* display: none; */
  /* width:1px; */
}
.popover-class{
  margin-top: 64px !important;
}

/* .el-dialog__wrapper{
  -ms-overflow-style:none;
  overflow:-moz-scrollbars-none;
} */
.el-dialog__wrapper .dialog-fade-leave-active{
  -ms-animation:none;
}

.el-dialog__wrapper::-webkit-scrollbar{
  display: none;
}

/* .el-dialog__wrapper{
    -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
    overflow: auto !important;
} */


/* .el-tooltip__popper.is-dark {
   border: solid 1px rgb(0,147,250) !important;
} */


.el-tooltip__popper[x-placement^=right] .popper__arrow{
  border-right-color: rgb(9, 125, 250) !important;
}
/* .el-tooltip__popper[x-placement^=right] .popper__arrow:after {
  border-right-color: rgb(0,147,250) !important;
} */

/* 商品编辑富文本插件导致抖动 */
/* .ke-edit-iframe,
.ke-edit-textarea {
	box-sizing: unset !important;
} */

</style>
