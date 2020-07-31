import QmCheckboxFrame from '../../../../../components/qm-checkbox-frame/index';
import {mapGetters,mapActions} from 'vuex';
import util from 'lib/utils/util'
import fileUpload from 'lib/utils/fileUpload'
import QmTips from 'component/qm-tips/index';
import QmDialog from 'component/qm-dialog/index';
import 'viewerjs/dist/viewer.css';
import Viewer from "v-viewer/src/component.vue";
import draggable from 'vuedraggable';

export default {
    name: "store-store-setting-pay",
    data (){
        return {
            tipMessage:false,//操作完成倒计时关闭弹框
            errorMsg:'',//弹框错误提示语
            isPayOnline:false,
            isPayOutline:false,
            isZhifubaoCode:true,
            isWechatCode:false,
            isCashDelivery:false,
            offlinePayway:'',
            offlinePayImage1:'',
            offlinePayImage2:'',
            payImage:[],

            dialog1:false,
            dialogMessage1:'请选择需要操作的记录',
            dialogTitle1:'提示信息',

            btnClick:{
                paySetSubmitBtn:false
            },

            viewerOptions: {
                toolbar: false,
                navbar:false,
                fullscreen:false
              },

              dialogVisible:false,
              dialogVisibleFalse:false,
              imgUrl:'',
              hasImage:false,
  
              imgWidth:520,
              closeOnClickModal:false,
              modalAppendToBody:false
        }
    },
        components: {
            QmCheckboxFrame,
            QmTips,
            QmDialog,
            Viewer,
            draggable
        },

        computed:{
            ...mapGetters({
                metaData:'getMetaData',
                basicStore:'getBasicStore',
                ImageIp:'getImageIp',
                imagePathConfig:'getImagePathConfig',
              }),
          dragOptions() {
            return {
              animation: 200,
              disabled: false,
            };
          }
          },

        methods:{
            ...mapActions({
                paySet:'paySet',
                uploadFile:'uploadFile',
                multipleUploadFile:'multipleUploadFile',
                getStoreSetting:'getStoreSetting',
              }),

              uploadFileImage(key,imageABase64){
                var file_tag = this.metaData.key;
                var data = {
                    key:'',
                    file_tag:file_tag,
                    base64Str:imageABase64,
                    type:2
                }
                fileUpload.logoLoadData(imageABase64,file_tag,2).then((res)=>{

                    var imagePath = this.ImageIp + res.imgPath;
                    if(key == 'offlinePayImage2'){
                        this.offlinePayImage2 = imagePath;
                        this.isWechatCode = true;
                      this.updatePayImage(1,this.offlinePayImage2);
                    }
                    if(key == 'offlinePayImage1'){
                        this.offlinePayImage1 = imagePath
                        this.isZhifubaoCode = true;
                      this.updatePayImage(0,this.offlinePayImage1);
                    }
                    
                    
                })
              },
              offlinepayUpload(event,key){
                //单个图片上传，暂时不用
                var video = event.target.files[0];
                this.formateImage(video,key);
              },

              formateImage(video,key){
                var reader = new FileReader(); 
                var vm = this
                // var base64 = fileUpload.blobToDataURL(video).then(res => {
                //     var imageABase64 = encodeURIComponent(res);
                    // vm.uploadFileImage(key,imageABase64);
                    vm.uploadFileImage(key,video);
                    
                // })
              },

              offlinepayDelete(key){
                if(key == 1){
                    this.offlinePayImage2 = '';
                    this.isWechatCode = false;
                  this.updatePayImage(key,this.offlinePayImage2);
                }
                if(key == 0){
                    this.offlinePayImage1 = '';
                    this.isZhifubaoCode = false;
                    this.updatePayImage(key,this.offlinePayImage1);
                }

              },
          updatePayImage(key,image){
            var newPayImage = _.clone(this.payImage);
            newPayImage[key] = image;
            if(!newPayImage[0] && newPayImage[1]){
              //如果已删除了一个图片，另外的图片顶上
              var img = newPayImage[1];
              newPayImage[0] = img;
              newPayImage[1] = '';
              this.offlinePayImage1 = img
              this.offlinePayImage2 = '';
            }
            if(!newPayImage[0] && !newPayImage[1]){
              newPayImage.splice(1,1);
            }
            if(newPayImage[0] && !newPayImage[1]){
              newPayImage[1] = '';
            }
            this.payImage = newPayImage;
          },
          itemDraggable(file){
              this.offlinePayImage1 = file[0];
              this.offlinePayImage2 = file[1];
          },

               //锚点跳转
                goAnchor(selector) {
                    var child = document.querySelector(selector)
                    if(child != null){
                        // document.body.scrollTop = document.querySelector(selector).offsetTop-50;
                        // window.scrollTo(0,document.querySelector(selector).offsetTop-50);
                        document.getElementsByClassName("routerContent")[0].scrollTop = document.querySelector(selector).offsetTop-50;
                    }
                },

              paySetSubmit(){
                  if(this.isPayOutline && (!this.offlinePayway || this.offlinePayway == '')){
                    this.goAnchor("#offlinePayway")
                    return;
                  }
                  if(!this.isCashDelivery && !this.isPayOutline && !this.isPayOnline){
                      return;
                  }
                  
                  this.btnClick.paySetSubmitBtn = true;
                  var data = {
                    key:this.metaData.key,
                    offlinePayway:this.offlinePayway,
                    offlinePayImage1:util.delImgSuffic(this.offlinePayImage1.replace(this.ImageIp+this.imagePathConfig.storeLabel,'')),
                    offlinePayImage2:util.delImgSuffic(this.offlinePayImage2.replace(this.ImageIp+this.imagePathConfig.storeLabel,'')),
                    aogPay:this.isCashDelivery?1:0,
                    wxPay:this.isPayOnline?1:0,
                    offlinePay:this.isPayOutline?1:0
                  }
                  this.paySet(data).then((res)=>{
                    if(res && res != undefined){
                        this.btnClick.paySetSubmitBtn = false;
                        this.getStoreSetting();
                        util.msg("设置成功")
                    }
                  });
              },

              multipleUploadClick(event){
                if(this.offlinePayImage1 != "" && this.offlinePayImage2 != ''){
                    this.layer.msg("图片仅支持设置2张，已达上限");
                    return;
                }
              },
              multipleUpload(event){
                
                
                if(event.target.files.length > 2){
                    this.layer.msg("图片仅支持设置两张，已达上限");
                    return;
                }
                var vm = this
                if(event.target.files[0]){

                    var video1 = event.target.files[0];
                    var base641 = fileUpload.blobToDataURL(video1).then(res1 => {
                        var imageBase641 = encodeURIComponent(res1);
                        var file_tag1 = vm.metaData.key;
                        var data1 = {key:'', file_tag:file_tag1,base64Str:imageBase641,type:2}
                        if(event.target.files[1]){
                            var video2 = event.target.files[1]; 
                            var base642 = fileUpload.blobToDataURL(video2).then(res2 => {
                                var imageBase642 = encodeURIComponent(res2);
                                var file_tag2 = vm.metaData.key;
                                var data2 = {key:'', file_tag:file_tag2,base64Str:imageBase642,type:2}

                                var data = [data1,data2]
                                vm.multipleUploadFile(data).then((resp)=>{
                                    if(resp[0]){
                                        var imagePath1 = vm.ImageIp + resp[0].responseContent.imgPath;
                                        this.offlinePayImage1 = imagePath1;
                                      this.updatePayImage(0,this.offlinePayImage1);
                                        this.isZhifubaoCode = true;
                                    }
                                    if(resp[1]){
                                        var imagePath2 = vm.ImageIp + resp[1].responseContent.imgPath
                                        this.offlinePayImage2 = imagePath2;
                                      this.updatePayImage(1,this.offlinePayImage2);
                                        this.isWechatCode = true;
                                    }
                                })
                                
                            })
                        }else{
                            var data = [data1]
                                vm.multipleUploadFile(data).then((resp)=>{
                                    if(resp[0]){
                                        var imagePath1 = vm.ImageIp + resp[0].responseContent.imgPath;
                                        this.offlinePayImage1 = imagePath1;
                                      this.updatePayImage(0,this.offlinePayImage1);
                                        this.isZhifubaoCode = true;
                                    }
                                })
                        }
                    })
                }
              },

              //流上传
              multipleUploadReader(event){

                var isOne = false;
                var replaceImage = "offlinePayImage1";
                //只需要上传一张
                if((this.offlinePayImage1 && this.offlinePayImage1 != "") || (this.offlinePayImage2 && this.offlinePayImage2 != "")){
                    isOne = true;    
                    if(this.offlinePayImage1 && this.offlinePayImage1 != ""){
                        //判断是哪张需要保存替换
                        replaceImage = "offlinePayImage2"
                    }
                }

                // if(event.target.files.length > 2){
                //     this.layer.msg("图片仅支持设置两张，已达上限");
                //     return;
                // }
                var vm = this

                if(event.target.files[0]){
                    var video1 = event.target.files[0];
                    var file_tag1 = vm.metaData.key;
                    var data1 = {key:'', file_tag:file_tag1,base64Str:video1,type:2,is_suf:1}
                    
                    if(event.target.files[1] && !isOne){

                        var video2 = event.target.files[1]; 
                        var file_tag2 = vm.metaData.key;
                        var data2 = {key:'', file_tag:file_tag2,base64Str:video2,type:2}

                        var data = [data1,data2]

                        fileUpload.multipleUploadFile(data).then((resp)=>{

                            if(resp[0]){
                                var imagePath1 = vm.ImageIp + resp[0].data.responseContent.imgPath;
                                this.offlinePayImage1 = imagePath1;
                              this.updatePayImage(0,this.offlinePayImage1);
                                this.isZhifubaoCode = true;
                            }
                            if(resp[1]){
                                var imagePath2 = vm.ImageIp + resp[1].data.responseContent.imgPath
                                this.offlinePayImage2 = imagePath2;
                              this.updatePayImage(1,this.offlinePayImage2);
                                this.isWechatCode = true;
                            }
                        })
                    }else{
                        var data = [data1];
                        fileUpload.multipleUploadFile(data).then((resp)=>{
                            if(resp[0]){
                                var imagePath1 = vm.ImageIp + resp[0].data.responseContent.imgPath;
                                if(replaceImage == "offlinePayImage1"){
                                    this.offlinePayImage1 = imagePath1;
                                  this.updatePayImage(0,this.offlinePayImage1);
                                    this.isZhifubaoCode = true;
                                }else{
                                    this.offlinePayImage2 = imagePath1;
                                  this.updatePayImage(1,this.offlinePayImage2);
                                    this.isWechatCode = true;
                                }
                            }
                            //this.$refs.multiFile.value = null;
                        })
                    }
                }
              },

              initData(){
                if(this.basicStore.offlinepayFlag == 1){
                    this.isPayOutline = true;
                }else{
                    this.isPayOutline = false;
                }

                if(this.basicStore.wxPay == 1){
                    this.isPayOnline = true;
                }else{
                    this.isPayOnline = false;
                }

                if(this.basicStore.aogPay == 1){
                    this.isCashDelivery = true;
                }else{
                    this.isCashDelivery = false;
                }

                if(this.basicStore.offlinePayImage1){
                    this.offlinePayImage1 = this.ImageIp + this.imagePathConfig.storeLabel + this.basicStore.offlinePayImage1;
                    this.isZhifubaoCode = true;
                  this.updatePayImage(0,this.offlinePayImage1);
                }else{
                    this.isZhifubaoCode = false;
                    this.offlinePayImage1 = '';
                  this.updatePayImage(0,this.offlinePayImage1);
                }

                if(this.basicStore.offlinePayImage2){
                    this.offlinePayImage2 = this.ImageIp + this.imagePathConfig.storeLabel + this.basicStore.offlinePayImage2;
                    this.isWechatCode = true;
                  this.updatePayImage(1,this.offlinePayImage2);
                }else{
                    this.isWechatCode = false;
                    this.offlinePayImage2 = '';
                  this.updatePayImage(1,this.offlinePayImage2);
                }

                if(this.basicStore.offlinePayway){
                    this.offlinePayway = this.basicStore.offlinePayway;
                }else{
                    this.offlinePayway = '';
                }
              },

              isHasImg(pathImg){
                var vm = this;
                return new Promise((resolve, reject) => {
                    var ImgObj=new Image();
                    ImgObj.src= pathImg;
                    ImgObj.onload =function() {
                        if(ImgObj.width >= 1000){
                            vm.imgWidth = 1000;
                        }else{
                            vm.imgWidth = ImgObj.width;
                        }
                        resolve(true);
                    }
                    ImgObj.onerror =function() {
                        resolve(false)
                    }
                }) 
                
            },

            showImg(imgUrl){
                this.imgUrl = imgUrl;
                this.isHasImg(this.imgUrl).then((res)=>{
                    this.hasImage = res;
                    if(this.hasImage){
                        this.dialogVisible = true;
                    }else{
                        this.dialogVisibleFalse = true;
                    }
                });
            },
            open(){
                if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
                  $("html").css("overflow","hidden");
                  $(".main").css("marginRight","18px");
                  $(".header").css("width","calc(100% - 16px )");
                  // var marginl = "calc((100% - 2px - 1200px)/2)";
                  // $("#content").css("marginLeft",marginl);
                }
              },
              close(){
                if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
                  $("html").css("overflow","auto")
                  $(".main").css("marginRight","0px");
                  $(".header").css("width","calc(100% - 0px)");
                  // var marginl = "calc((100% - 1200px)/2)";
                  // $("#content").css("marginLeft",marginl);
                }
              },
        },

        watch:{
            basicStore(){
                this.initData();
              },
            dialogVisible(){
              var dragDom = document.querySelectorAll(".el-dialog");
              dragDom.forEach((el)=>{
                  console.log(el)
                  el.style.left = 0;
                  el.style.top =0

              })
            }
          },

          mounted(){
                this.initData();
          }
}
