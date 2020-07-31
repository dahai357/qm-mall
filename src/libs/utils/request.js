import Vue from 'vue'
import env from "../../config/url";
import axios from "axios";
import consts from "../../config/consts";
import {auth} from '../../api'
import md5 from 'js-md5'
import storage from './storage'

let sign = '';

//允许跨域
var _axios = axios.create({
  transformRequest: [function (data) {

   var paramStr = Object.keys(data).map(key => {
    var qdata = ''

    if(typeof(data[key]) == 'object' &&  data[key] && data[key].length  && typeof data[key].length == 'number'){
      if(typeof(data[key][0]) == 'object'){
        qdata += 'data['+key+']'+'='+JSON.stringify(data[key])
      }else{
        data[key].forEach((ele,e) => {
          if(typeof ele == 'string'){
            if(e == data[key].length -1){
              qdata += 'data['+key+']['+e+']='+encodeURIComponent(ele);
            }else{
              qdata += 'data['+key+']['+e+']='+encodeURIComponent(ele)+'&';
            }
          }
        });
      }

    }else{
       qdata = `data[${key}]=${encodeURIComponent(data[key])}`;
    }
    return qdata;
  }).join('&') + `&encryptType=${consts.ENCRYPT_TYPE}&responseType=${consts.RESPONSE_TYPE}` + (sign === ''?'':`&sign=${sign}`)

   var newParamStr = paramStr.replace("data[qformula]=qformula&","")
   return newParamStr;

  }],
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
})
// 添加请求拦截器
_axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});
// 添加响应拦截器
_axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  var vue = new Vue();
  if (response.data.status === 'success') {
    if(vue.requestAll){

    }else{
      if(response.config.params.showMessage) vue.layer.msg(response.data.longMessage)
    }
    if (response.data.resultCode === '200003') {

    }
  } else {
    if(response.config.params.showMessage) vue.layer.msg(response.data.longMessage)
    //当返回您还未登录时，跳到登录页面
    if(response.data.resultCode == 10005 || response.data.resultCode == 200001){
      if(response && response.config && response.config.url && response.config.url.replace(env.basePath,"") == "/StoreGoodsAdd/checkReceiveOrder"){
        // 检查订单不需要做登录页跳转
      }else{
        //未登录
        var login = window.location.origin + window.location.pathname+'#/login'
        window.location.href = login
        window.location.reload()
        //vue.$router.push("/login");
      }
    }
  }
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

/**
 * 请求方法
 * @param url
 * @param data
 * @param method
 * @param mock
 * @param showMessage
 * @param requiresAccess
 * @param authLogin
 * @returns {boolean|AxiosPromise}
 */
async function axiosExtend({url = '/', data = {}, method = 'get', mock=false,showMessage=false, requiresAccess=true, authLogin=true} = {}) {
  if(mock){
    const mockFile = url.replace(/\//g, '.')
    const mockData = require(`../../mock/${mockFile}`)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockData)
      }, 100)
    })
  }
  url = env.basePath + url;
  let key
  if(authLogin){
    key = storage.get('key')
    // var cookieKey = storage.getCookie('key');
    // console.log(cookieKey,"cookieKey");
   // key = '3205936a89bd04158a6566c0ac26823d'
  }else{
    var key1 = storage.get('key');
    if(key1 == '' || key1 == 'null' || key1 == null || key1 == undefined){
      key = await auth.getAccessToken();
      storage.set('key',key)
      storage.setCookie('key',key);
    }else{
      // key = storage.get('key')
      key = key1
    }

  }
  if(!requiresAccess){
    const text = Object.keys(data)
      .sort((key1, key2) => key1.charAt(0) > key2.charAt(0) ? 1 : -1)
      .map(key => data[key])
      .join('')
    sign = md5(consts.AUTH_KEY + text)
  }
  Object.assign(data,{'key':key})
  var _opts = {}
  Object.assign(_opts, {
    url,
    data,
    method
  });
  if (!_opts.params) {
    _opts.params = {
      __time: Date.now(),
      showMessage:showMessage
    }
  } else {
    Object.assign(_opts.params, {
      __time: Date.now(),
      showMessage:showMessage
    })
  }
  return _axios(_opts)
}

export default axiosExtend
