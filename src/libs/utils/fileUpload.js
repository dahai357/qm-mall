import axios from 'axios';
import env from "../../config/url";
import storage from '../../libs/utils/storage';
import util from "lib/utils/util";
import { Loading } from 'element-ui';

let fileUpload = {}

var instance = axios.create({
    baseURL: env.basePath,
    headers:{'Content-Type':'multipart/form-data'}
});

// 批量上传
fileUpload.multipleUploadFile = function(data){

    return new Promise((resolve, reject) => {

      var allUrl = [];
      data.forEach((el,e) => {
        let params = new FormData()
        params.append('base64Str', el.base64Str)
        params.append('data[file_tag]', el.file_tag)
        params.append('data[type]', el.type)
        params.append('data[isSuf]', el.is_suf)
        params.append('data[key]', el.key==""?storage.get('key'):el.key)
        allUrl.push(instance.post("/upload/uploadBase64Img",params))
      });

      axios.all(allUrl).then((res)=>{

        if (res[res.length-1].data.resultCode === 1) {
            resolve(res);
        }else{
            resolve([]);
            util.msg("上传失败");
        }
      });
    })

}
//页面没有经过处理，传的参数是el
fileUpload.logoLoad = function(event,file_tag,type,fnc,is_suf) {

    // var loadingInstance = Loading.service({
    //     lock: true,
    //     text: '文件上传中...',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    // });

    return new Promise((resolve, reject) => {
        var video = event.target.files[0];
        var reader = new FileReader();

        // var base64 = fileUpload.blobToDataURL(video).then(res => {

            // var imageABase64 = encodeURIComponent(res);

            let params = new FormData()
            params.append('base64Str', video)
            params.append('data[file_tag]', file_tag)
            params.append('data[type]', type)
            params.append('data[isSuf]', is_suf)
            params.append('data[key]', storage.get('key'))

            // var data = {
            //     file_tag:file_tag,
            //     base64Str:video,
            //     type:type,
            //     key:key
            // }


            // return await instance.post('/upload/uploadFile',data)
            instance.post("/upload/uploadFile",params).then((res)=>{

                // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    // loadingInstance.close();
                // });

                if (res.data.resultCode === 1) {
                    resolve(res.data.responseContent);
                }else{
                    util.msg(res.data.longMessage);
                }
            })


            // fnc(data).then((res)=>{
            //     resolve(res);
            // })
        // })
    })
},

//页面经过处理，传的参数是file
fileUpload.logoLoadData = function(video,file_tag,type,is_suf) {

    // var loadingInstance = Loading.service({
    //     lock: true,
    //     text: '文件上传中...',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    // });

    return new Promise((resolve, reject) => {

            let params = new FormData()
            params.append('base64Str', video)
            params.append('data[file_tag]', file_tag)
            params.append('data[type]', type)
            params.append('data[isSuf]', is_suf)
            params.append('data[key]', storage.get('key'))
            instance.post("/upload/uploadFile",params).then((res)=>{
                // loadingInstance.close();
                if (res.data.resultCode === 1) {
                    resolve(res.data.responseContent);
                }else{
                    util.msg(res.data.longMessage);
                }
            })
    })
},


  fileUpload.eachLoad = function(event,file_tag,type,i,is_suf) {

    return new Promise((resolve, reject) => {
      var video = event.target.files[i];

      let params = new FormData()
      params.append('base64Str', video)
      params.append('data[file_tag]', file_tag)
      params.append('data[type]', type)
      params.append('data[key]', storage.get('key'))
      params.append('data[isSuf]', is_suf)
      instance.post("/upload/uploadFile",params).then((res)=>{
        if (res.data.resultCode === 1) {
          resolve(res.data.responseContent);
        }else{
          util.msg(res.data.longMessage);
        }
      })
    })
  },

  //将图片转base64
  fileUpload.blobToDataURL = function(blob) {
    var isLt2M = blob.size / 1024 / 1024 > 2
    return new Promise((resolve, reject) => {
        let base64
        var a = new FileReader()
        a.readAsDataURL(blob)
        if (isLt2M) {
            // 进行压缩
            var zip64Str = fileUpload.zipFile(a)
            resolve(zip64Str)
        }else{
            a.onload = function (e) {
                base64 = e.target.result;
                resolve(base64)
            }
        }
    })
}

fileUpload.zipFile = function(reader){
    return new Promise((resolve, reject) => {
    reader.onload = (e) => {
        let base64Str = reader.result.split(',')[1]
        //创建一个img对象
         var  img = new Image();
         img.src = e.target.result
          // base64地址图片加载完毕后执行
              img.onload = function () {
                  // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
                  var canvas = document.createElement('canvas');
                  var context = canvas.getContext('2d');
                  // 图片原始尺寸
                  var originWidth = this.width;
                  var originHeight = this.height;
                  // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
                  var maxWidth = 300,
                      maxHeight = 300;
                  // 目标尺寸
                  var targetWidth = originWidth,
                      targetHeight = originHeight;
                  // 图片尺寸超过最大尺寸的限制
                  if(originWidth > maxWidth || originHeight > maxHeight) {
                      if(originWidth / originHeight > maxWidth / maxHeight) {
                          // 更改宽度，按照宽度限定尺寸
                          targetWidth = maxWidth;
                          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                      } else {
                          targetHeight = maxHeight;
                          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                      }
                  }
                  //对图片进行缩放
                  canvas.width = targetWidth;
                  canvas.height = targetHeight;
                  // 清除画布
                  context.clearRect(0, 0, targetWidth, targetHeight);
                  // 图片压缩
                  context.drawImage(img, 0, 0, targetWidth, targetHeight);
                  /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/
                  //压缩后的base64文件
                  var newUrl = canvas.toDataURL('image/jpeg', 0.92);
                  resolve(newUrl)
              }
            }
        })
}

//文件上传带后缀
fileUpload.imageLoadWithSuffix = function(event,file_tag,crop_suffix,type,fnc,is_login,is_suf) {
    return new Promise((resolve, reject) => {
        var video = event.target.files[0];
        var reader = new FileReader();
        let params = new FormData();
        params.append('base64Str', video)
        params.append('data[file_tag]', file_tag)
        params.append('data[cropSuffix]', crop_suffix)
        params.append('data[type]', type)
        params.append('data[isSuf]', is_suf)
        params.append('data[key]', storage.get('key'));
        if(video.size >(10*1024*1024)){
          util.msg('上传文件大小不能超过10MB');
          return;
        }
        if(is_login == -1){
          instance.post("/account/uploadFile",params).then((res)=>{
            if (res.data.resultCode === 1) {
              resolve(res.data.responseContent);
            }else{
              util.msg(res.data.longMessage);
            }
          })
        }else{
          instance.post("/upload/uploadFile",params).then((res)=>{
            if (res.data.resultCode === 1) {
              resolve(res.data.responseContent);
            }else{
              util.msg(res.data.longMessage);
            }
          })
        }
    })
}




//文件上传带后缀
fileUpload.uploadFile = function(event,file_tag,type,fnc) {
    return new Promise((resolve, reject) => {
        var video = event.target.files[0];
        var reader = new FileReader();
        let params = new FormData()
        params.append('base64Str', video)
        params.append('data[file_tag]', file_tag)
        params.append('data[fileFlag]', 1)
        params.append('data[type]', type)
        params.append('data[key]', storage.get('key'))
        instance.post("/upload/uploadFile",params).then((res)=>{
            if (res.data.resultCode === 1) {
                resolve(res.data.responseContent);
            }else{
                util.msg(res.data.longMessage);
            }
        })
    })
}

//不登陆情况上传图片
fileUpload.uploadFileNoLogin = function(event,file_tag,type,fnc) {

    // var loadingInstance = Loading.service({
    //   lock: true,
    //   text: '文件上传中...',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // });

    return new Promise((resolve, reject) => {
        var video = event.target.files[0];
        var reader = new FileReader();

        let params = new FormData()
        params.append('base64Str', video)
        params.append('data[file_tag]', file_tag)
        params.append('data[fileFlag]', 1)
        params.append('data[type]', type)
        params.append('data[key]',  storage.get('key'))
        instance.post("/account/uploadFile",params).then((res)=>{

            // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            // loadingInstance.close();
            if (res.data.resultCode === 1) {
                resolve(res.data.responseContent);
            }else{
                util.msg(res.data.longMessage);
            }
        })
    })
}


fileUpload.importExcelFile = function(event,importData) {
  return new Promise((resolve, reject) => {
    var video = event.target.files[0];
    let params = new FormData()
    params.append('data[tagId]', importData.tagId);
    params.append('data[levelNum]', importData.levelNum);
    params.append('base64Str', video);
    params.append('data[key]', storage.get('key'));
    instance.post("/Storefavorites/importUser",params).then((res)=>{
      resolve(res.data);
    })
  })
}

export default fileUpload;
