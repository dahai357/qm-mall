import Vue from 'vue'
import Router from 'vue-router'
import iView from "iview";
import consts from "../config/consts";
import storage from "./../libs/utils/storage";
import routes from './print.routers';

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
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
        //账号相关菜单是以简写命名需要进行特殊处理
        if(to.matched[1].name == 'store_account' || to.matched[1].name == 'store_account_group' || to.matched[1].name == 'seller_log'){
          var child = to.matched[2].path .substring(to.matched[2].path.lastIndexOf("\/") + 1) // 二级路由
          var auth = false
          Object.values(metaData.allowMenu).forEach((item,i) => {
            if(item.child){
              for (const key in item.child) {
                if (item.child.hasOwnProperty(key)) {
                  const element = item.child[key];
                  if(element.op === child){
                    auth = true;
                  }
                  if(element.op === 'account_list' && to.matched[1].name == 'store_account'){
                    auth = true;
                  }
                  if(element.op === 'group_list' && to.matched[1].name == 'store_account_group'){
                    auth = true;
                  }
                }
              }
            }
          })
        }else{
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
