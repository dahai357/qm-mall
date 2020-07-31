// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill';
import("babel-polyfill");

import Vue from 'vue'
import App from './App'
import router from './router'
import emptyList from './components/empty-list/index';
import store from './store'
import VueClipboard from 'vue-clipboard2'

//全局样式
import './assets/css'
import './assets/css/style.css'
//引入font-awesome
// import 'font-awesome/css/font-awesome.min.css'

import VueAMap from 'vue-amap';

// 引入sass
import './assets/scss/style.scss'

// 引入 vue-kikindeditor 需要的文件
import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/themes/default/default.css'
import './directives'
Vue.use(VueKindEditor)

Vue.use(VueClipboard);
Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '51540038b13949411b93f05fd94da971',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.6'
});

layui.use('layer', function(){
  Vue.prototype.layer = layui.layer;
});

Number.prototype.toFixed=function (d) {//解决精度问题 如3.735.toFixed(2)=3.73实际是3.74
  var s=this+"";
  if(!d)d=0;
  if(s.indexOf(".")==-1)s+=".";
  s+=new Array(d+1).join("0");
  if(new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+(d+1)+"})?)\\d*$").test(s)){
    var s="0"+RegExp.$2,pm=RegExp.$1,a=RegExp.$3.length,b=true;
    if(a==d+2){
      a=s.match(/\d/g);
      if(parseInt(a[a.length-1])>4){
        for(var i=a.length-2;i>=0;i--){
          a[i]=parseInt(a[i])+1;
          if(a[i]==10){
            a[i]=0;
            b=i!=1;
          }else break;
        }
      }
      s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");
    }if(b)s=s.substr(1);
    return (pm+s).replace(/\.$/,"");
  }return this+"";
};
Vue.component('empty-list', emptyList) //空列表提示

Vue.config.productionTip = false

/**
 * 事件总线，所有事件都注册到这个对象
 * @type {Vue}
 */

  

Vue.prototype.eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
