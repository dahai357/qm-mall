import storage from "./storage";

let util = {}
util.title = function (title) {
  title = title ? title : '商家中心'
  window.document.title = title
}

util.layer = null;

//通用正则表达式
util.regexp = {
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
  number: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
  isZipCode: /^[0-9]{6}$/,
  phone: /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
  mobile: /^1[3|4|5|8|7]\d{9}$/,
  mobileOrPhone: /^(\d|\-){3,14}$/,
  idCard: /^\d{15}(\d{2}[A-Za-z0-9])?$/
}
// 日期格式化，复杂的日期格式化用moment库
util.dateFormat = function (date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 小时
    "H+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    "S": date.getMilliseconds()
    // 毫秒
  };
  var week = {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[date.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

//将图片转base64
util.blobToDataURL = function(blob) {
  return new Promise((resolve, reject) => {
      let base64
      var a = new FileReader()
      a.readAsDataURL(blob)
      a.onload = function (e) {
        base64 = e.target.result
        resolve(base64)
      }
  })
}

//通用日志函数
util.console = function() {
  if('development' === process.env.NODE_ENV) console.log(...arguments)
}

function go(url){
  window.location = url;
}
/* 格式化金额 */
util.number_format = function(num, ext){
  if(ext < 0){
    return num;
  }
  num = Number(num);
  if(isNaN(num)){
    num = 0;
  }
  var _str = num.toString();
  var _arr = _str.split('.');
  var _int = _arr[0];
  var _flt = _arr[1];
  if(_str.indexOf('.') == -1){
    /* 找不到小数点，则添加 */
    if(ext == 0){
      return _str;
    }
    var _tmp = '';
    for(var i = 0; i < ext; i++){
      _tmp += '0';
    }
    _str = _str + '.' + _tmp;
  }else{
    if(_flt.length == ext){
      return _str;
    }
    /* 找得到小数点，则截取 */
    if(_flt.length > ext){
      // _str = _str.substr(0, _str.length - (_flt.length - ext));
      _str = num.toFixed(ext).toString();
      if(ext == 0){
        _str = _int;
      }
    }else{
      for(var i = 0; i < ext - _flt.length; i++){
        _str += '0';
      }
    }
  }

  return _str;
},
util.msg = function (msg,timeCount=2000) {

  if(util.layer){
    util.layer.msg(msg,{time:timeCount});
  }else{
    layui.use('layer', function(){
      util.layer = layui.layer;
      util.layer.msg(msg,{time:timeCount});
    });
  }
}
util.delImgSuffic = function (img) {
  if(img.indexOf('?') !== -1){
    return img.replace(img.substring(img.indexOf('?')),'')
  }
  return img;
}
util.authExpire = function (data) {
  if(data.resultCode == 200006){
    storage.set('key',null);
    storage.setCookie('key',null);
    //授权过期
    var url = window.location.href;
    if(url.indexOf('login') == -1){
      var login = window.location.origin + window.location.pathname + '#/login'
      window.location.href = login
    }
    }
  }
util.myBrowser = function(){
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
    return "Opera"
  }; //判断是否Opera浏览器
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  } //判断是否Firefox浏览器
  if (userAgent.indexOf("Chrome") > -1){
    let _mime = {
      "application/vnd.chromium.remoting-viewer":'360',
      "application/txftn-webkit":'2345'
    }
    let _b =  Object.keys(_mime).filter(function(value){
      var mimeTypes = navigator.mimeTypes;
      for (var mt in mimeTypes) {
        if (mimeTypes[mt]["type"] == value) {
          return true;
        }
      }
      return false;
    })
    if(_b.length > 0){
      return _mime[_b[0]];
    }else if(navigator.mimeTypes.length > 10){
      return "unknown";
    }else if (1 == navigator.mimeTypes.length){
      return 'edge';
    }
  return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //判断是否Safari浏览器
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
    return "IE";
  }; //判断是否IE浏览器
}
util.discount = function(price1,price2,type) {
  if(type == 1) {//折扣
    return (price1/price2*10).toFixed(1);
  }else{//百分比
    return Math.round((price1/price2).toFixed(2)*100);
  }
}
export default util;

