import Vue from 'vue'
import Router from 'vue-router'
import util from '../libs/utils/util'
import iView from "iview";
import consts from "../config/consts";
import storage from "./../libs/utils/storage";
import routes from './routes';

Vue.use(Router)

const router = new Router({
  routes
})
let dov = Router.version.split('.');
if(dov[0] > 3 || dov[1] > 0){
  const originalPush = Router.prototype.push
  Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
  }
}

router.beforeEach((to, from, next) => {

  var vue = new Vue();

  // if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
  //     if(to.name != "distribution"){
  //         $('body').on("DOMNodeRemoved", function (event) {
  //             var dialog = $(".el-dialog__wrapper");
  //             var openDialog = false;
  //             for(let i=0;i<dialog.length;i++){
  //             if($(dialog[i]).css("display") == "block"){
  //                 openDialog = true;
  //             }
  //             }
  //             if(window.location.href.indexOf("distribution") == -1 || window.location.href.indexOf("store_coupon_index")){
  //                 if(!openDialog){
  //                     event.preventDefault();
  //                     var rch = event.target.clientHeight;
  //                     var csp = window.document.documentElement.scrollTop;
  //                     vue.$nextTick(()=>{
  //                       window.scrollTo(0, csp);
  //                     })
  //                 }
  //             }
  //         });
  //     }
  // }
  iView.LoadingBar.start()
  var metaData = storage.get('metaData') || {}
  if(!consts.EXCEPT_ROUTERS.has(to.name)){
    if(Object.keys(metaData).length === 0){
      document.title = to.meta.text?to.meta.text:'商家中心';
      next({path:'/login'})
      return;
    }
    if(to.matched.length === 0){
      document.title = to.meta.text?to.meta.text:'商家中心';
      next()
    }
    if(to.name === 'home'){
      document.title = to.meta.text?to.meta.text:'商家中心';
      next()
    }
    //店铺信息和修改密码是写死在页面上的，直接进入
    else if(to.matched[1] && (to.matched[1].path == '/change_pwd/change_pwd' || to.matched[1].path == '/account/store_info')){
      auth = true;
    }
    else{
      if(to.matched[2]){
        var child = to.matched[2].path .substring(to.matched[2].path.lastIndexOf("\/") + 1) // 二级路由
        var auth = false
        Object.values(metaData.allowMenu).forEach((item,i) => {
          if(Object.keys(item.child).find(function(el){
            return el === child
          })){
            auth = true
          }
        })
      }
      if(!auth){
        layer.msg('没有权限')
        return
      }
    }

  }
  document.title = to.meta.text?to.meta.text:'商家中心';
  next()
})
router.afterEach(route =>{
  iView.LoadingBar.finish()
})
export default router
