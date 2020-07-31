
import {mapGetters,mapActions} from 'vuex';
import * as _ from 'lodash';
import QmDialog from 'component/qm-dialog/index';
import storage from 'lib/utils/storage'
import fileUpload from 'lib/utils/fileUpload.js';
import util from 'lib/utils/util';
import { Base64 } from 'js-base64';
export default {
    name: "advertising",
    data (){
        return {

          advertisingData : [
            {image:'',href:'',type:0,imageFile:'',hrefFile:'',hrefImg:''},
            {image:'',href:'',type:0,imageFile:'',hrefFile:'',hrefImg:''},
            {image:'',href:'',type:0,imageFile:'',hrefFile:'',hrefImg:''},
            {image:'',href:'',type:0,imageFile:'',hrefFile:'',hrefImg:''},
            {image:'',href:'',type:0,imageFile:'',hrefFile:'',hrefImg:''}
          ],
          validData:[
              {imgFlag:true,hrefFlag:true,hrefValidFlag:true,fileFlag:true,linkFlag:true},
              {imgFlag:true,hrefFlag:true,hrefValidFlag:true,fileFlag:true,linkFlag:true},
              {imgFlag:true,hrefFlag:true,hrefValidFlag:true,fileFlag:true,linkFlag:true},
              {imgFlag:true,hrefFlag:true,hrefValidFlag:true,fileFlag:true,linkFlag:true},
              {imgFlag:true,hrefFlag:true,hrefValidFlag:true,fileFlag:true,linkFlag:true}
          ],
          validFlag : true,
          list_num:{
              0:'一',
              1:'二',
              2:'三',
              3:'四',
              4:'五'
          },
          gc_id:0,
          gc_name:'',

          deleteDialogVisible:false,

          dialogData:'',
          dialog1:false,
          btnClick:{
              
          },

          dialogVisible:false,
          dialogVisibleFalse:false,
          imgWidth:520,
          hasImage:false,
          closeOnClickModal:false,
          modalAppendToBody:false
        }
    },
        components: {
          QmDialog
        },

        computed:{
          ...mapGetters({
            metaData:'getMetaData',
            ImageIp:'getImageIp',
            imagePathConfig:'getImagePathConfig',
          }),
        },

        methods:{
            ...mapActions({
              getAdvertisements:'getAdvertisements',
              uploadFile:'uploadFile',
              advertisements:'advertisements'
            }),

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
            init(gc_id){

              var data = {
                gc_id:gc_id
              }

              this.getAdvertisements(data).then((res)=>{
                if(res.resultCode == 1){
                  this.advertisingData = [
                        {image:'',href:'',type:0,imageFile:'',hrefFile:'',hrefImg:''},
                        {image:'',href:'',type:0,imageFile:'',hrefFile:'',hrefImg:''},
                        {image:'',href:'',type:0,imageFile:'',hrefFile:'',hrefImg:''},
                        {image:'',href:'',type:0,imageFile:'',hrefFile:'',hrefImg:''},
                        {image:'',href:'',type:0,imageFile:'',hrefFile:'',hrefImg:''}
                    ]
                  var newAdvertisingData = _.clone(this.advertisingData);
                  if(res.responseContent&&res.responseContent.length>0){
                    if(res.responseContent[0]){
                      newAdvertisingData[0] = res.responseContent[0];
                    }
                    if(res.responseContent[1]){
                      newAdvertisingData[1] = res.responseContent[1];
                    }
                    if(res.responseContent[2]){
                      newAdvertisingData[2] = res.responseContent[2];
                    }
                    if(res.responseContent[3]){
                      newAdvertisingData[3] = res.responseContent[3];
                    }
                    if(res.responseContent[4]){
                      newAdvertisingData[4] = res.responseContent[4];
                    }
                    this.advertisingData = newAdvertisingData;
                  }
                 
                }
              })

            },

            deleteFile(item,i){
              // var newAdvertisingData = _.clone(this.advertisingData);
              // var newItem = _.clone(item);
              // newItem.imageFile = '';
              // newAdvertisingData[i] = newItem;
              item.image = "";
              item.imageFile = ''
              // this.advertisingData = newAdvertisingData;
            },
            deleteSubImage(item,i){
              item.hrefImg = ''
            },

            localImgLoad(event,item,i,ref) {
              
              var key = this.metaData.key;
              var type = 4;
              fileUpload.logoLoad(event,key,type,this.uploadFile,1).then(res => {
                  let imagePath = this.ImageIp+res.imgPath;
                  let yuanImagePath = util.delImgSuffic(imagePath);
                  let newItem = _.clone(item);
                  if(ref==1){
                      newItem.imageFile = imagePath;
                      newItem.image =  yuanImagePath.substring(yuanImagePath.lastIndexOf('/') + 1);
                  }else{
                      newItem.hrefImg = imagePath;
                      newItem.hrefFile = yuanImagePath.substring(yuanImagePath.lastIndexOf('/') + 1);
                  }
                  let newData = _.clone(this.advertisingData);
                  newData[i] = newItem
                  this.advertisingData = newData
              })

          },   

          

        valiteReset(){
          this.validData = [
              {imgFlag:true,hrefFlag:true,hrefValidFlag:true,fileFlag:true,linkFlag:true},
              {imgFlag:true,hrefFlag:true,hrefValidFlag:true,fileFlag:true,linkFlag:true},
              {imgFlag:true,hrefFlag:true,hrefValidFlag:true,fileFlag:true,linkFlag:true},
              {imgFlag:true,hrefFlag:true,hrefValidFlag:true,fileFlag:true,linkFlag:true},
              {imgFlag:true,hrefFlag:true,hrefValidFlag:true,fileFlag:true,linkFlag:true}
          ]
        },

          submitFile(){

            let isValite = true;
            this.valiteReset()
            let newAdvertisingData = []
            this.advertisingData.forEach((res,r) => {
                let advTemp = _.clone(res);
                if(res.image != ''){
                  advTemp.imageFile = util.delImgSuffic(advTemp.imageFile);
                  if(!res.type || res.type == '' ||res.type <= 0){
                    this.validData[r].linkFlag = false;
                    isValite= false;
                  }
                }else{
                    if(res.type>0&&!((res.image==''&&res.type==1)||(res.image==''&&res.type==2&&res.href=='')||(res.image==''&&res.type==3&&res.hrefImg==''))){
                        this.validData[r].imgFlag = false;
                        isValite= false;
                    }
                }
                if(res.type>0&&res.image){
                    if(res.type==2){
                        if(res.href==''){
                            this.validData[r].hrefFlag = '广告链接不能为空';
                            isValite = false;
                        }
                        let reg = /^(http|https|gotoshenbd):\/\/[^\u4e00-\u9fa5]+$/;
                        if(!reg.test(res.href)){
                            this.validData[r].hrefValidFlag = false
                            this.validData[r].hrefFlag = true
                            isValite= false;
                        }
                    }else if(res.type==3){
                        if(res.hrefImg==''){
                            this.validData[r].fileFlag = false
                            isValite = false;
                        }
                    }
                }
                if(advTemp.href!=null&&advTemp.href!=''){
                    advTemp.href= Base64.encode(advTemp.href);
                }
                newAdvertisingData.push(advTemp);
            });
            if(isValite){
              let data = {
                  gc_id:this.gc_id,
                  advertisingData : JSON.stringify(newAdvertisingData)
              }
              this.advertisements(data).then((res)=>{

                if(res.resultCode == 1){
                  this.init(this.gc_id);
                  util.msg("保存成功");
                }
  
              })
            }
            
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

    
          },

        mounted(){
            this.gc_id = storage.get('gc_id')
            this.gc_name = storage.get('gc_name')
            this.init(this.gc_id)
        }
}
