let exportData = {}
//post方式导出excel前端处理公用方法
exportData.exportExcel = function(res) {
  // 创建a标签，设置属性，并触发点击下载
  var $a = $("<a>");
  $a.attr("href", res.file);
  $a.attr("download", res.filename);
  $("body").append($a);
  $a[0].click();
  $a.remove();
}

exportData.exportExcelNew = function(res) {
  
  // 这里是获取到的图片base64编码,这里只是个例子哈，要自行编码图片替换这里才能测试看到效果
  const imgUrl = res.file;
  // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
  if (window.navigator.msSaveOrOpenBlob) {
  var bstr = atob(imgUrl.split(',')[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  var blob = new Blob([u8arr])
  window.navigator.msSaveOrOpenBlob(blob, res.filename)
  } else {
  // 这里就按照chrome等新版浏览器来处理
  const a = document.createElement('a')
  a.href = imgUrl
  a.setAttribute('download', res.filename)
  a.click()
  }

}


export default exportData;

