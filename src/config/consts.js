var ua = window.navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  //微信浏览器
  window.type = 5;
} else {
  window.type = 1;
}
const DEVICE_TYPE =  window.type;
const ENCRYPT_TYPE = 3;
const RESPONSE_TYPE = 'json';
const AUTH_KEY = '~!@#$`1234qwert';
const LOGIN_TYPY='business';
const EXCEPT_ROUTERS = new Set([
  'login','register','register2','register3','register4','article_index','article_detail','help_center_index','help_center_detail','modify1','modify2','modify3'
])
const FRESH_EXCEPT_ROUTERS = new Set([
  'login','register','register2','register3','register4','article_index','article_detail','modify1','modify2','modify3'
])
const HOME = '_home'
const SHARE_URL = 'http://share.shenbd.com/share.html'
const SERVICE_TEL = '13705953251'
export default {
  DEVICE_TYPE,ENCRYPT_TYPE,RESPONSE_TYPE,AUTH_KEY,EXCEPT_ROUTERS,FRESH_EXCEPT_ROUTERS,HOME,SHARE_URL,SERVICE_TEL,LOGIN_TYPY
}
