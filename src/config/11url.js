
var host = window.location.hostname;
var ajaxUrl ='';
var jsonUrl = '';
var fileUrl = '';
var printUrl = '';
switch (host) {
  case 'localhost':
      ajaxUrl = 'http://api.local.com/seller';
      jsonUrl = 'http://localhost:8080';
      fileUrl = 'http://testadmin.shenbd.com/seller';
      printUrl = 'http://testadmin.shenbd.com/mall/index.php';
      break;
  case 'testadmin.shenbd.com':
    ajaxUrl = 'http://apitest.shenbd.com/seller';
    jsonUrl = 'http://testadmin.shenbd.com/mall';
    fileUrl = 'http://testadmin.shenbd.com/seller';
    printUrl = 'http://testadmin.shenbd.com/mall/index.php';
    break;
  case 'hd.shenbd.com':
    ajaxUrl = 'http://apihd.shenbd.com/seller';
    jsonUrl = 'http://hd.shenbd.com/mall';
    fileUrl = 'http://hd.shenbd.com/seller';
    printUrl = 'http://hd.shenbd.com/mall/index.php';
    break;
  case 'b.shenbd.com':
    ajaxUrl = 'https://api.shenbd.com/seller';
    jsonUrl = 'https://b.shenbd.com/mall';
    fileUrl = 'https://b.shenbd.com/seller';
    printUrl = 'https://b.shenbd.com/mall/index.php';
    break;
  default:
    ajaxUrl = 'http://apitest.shenbd.com/seller';
    jsonUrl = 'http://localhost:8080';
    fileUrl = 'http://testadmin.shenbd.com/seller';
    printUrl = 'http://testadmin.shenbd.com/mall/index.php';
}
export default {
  env: process.env.NODE_ENV,
  basePath: ajaxUrl,
  jsonUrl:jsonUrl,
  fileUrl:fileUrl,
  printUrl:printUrl
}
