<template src="./index/store-setting.html">

</template>

<script>
    import QmTabs from '../../../components/qm-tabs/index';
    import {mapGetters,mapActions} from 'vuex';
    import QmCheckboxFrame from '../../../components/qm-checkbox-frame/index';
    import QmTimepickers from '../../../components/qm-timepickers/index';
    import * as _ from 'lodash';
    import util from 'lib/utils/util';
    import fileUpload from 'lib/utils/fileUpload';
    import QmGuideTip from 'component/qm-guide-tip/index';	
    import QmTips from 'component/qm-tips/index';
    import geolocation from 'lib/utils/geolocation';
    export default {
        name: "store-setting",
        data (){
            return {
                tabs:{
                    store_setting:{name:'店铺基本信息',select:true,act:'store_setting'},
                    store_pay:{name:'支付配置',select:false,act:'store_pay'},
                    store_distribution:{name:'配送配置',select:false,act:'store_distribution'},
                    store_config:{name:'搜索配置',select:false,act:'store_config'},
                    store_print:{name:'打印配置',select:false,act:'store_print'},
                    store_switch:{name:'店铺开关',select:false,act:'store_switch'},
                },
                guideHover:false,
                showGuide:false,
                showPage:1,
                showClose:false,

                storeLabel:'',
                storeOpenDisDayIs:false,
                storeOpenDisNextDay:false,
                zone:'',
                tel:'',
                imagePath:'',
                newBasicStore:{},

                isPayOnline:false,
                isPayOutline:false,
                isZhifubaoCode:true,
                isWechatCode:false,
                isCashDelivery:false,
                offlinePayway:'',
                offlinePayImage1:'',
                offlinePayImage2:'',


                buyerDistribution:false,
                sellerDistribution:false,
                storeDisDayIs:false,
                storeDisNextDay :false,
                storeDisSta_Time:'',
                storeDisEnd_Time:'',            
                freeShippingPrice : '',
                freeShippingPriceIs : false,
                startShippingPriceIs : false,
                startShippingPrice : '',

                tableData:[
                    {
                        "template_id":"0",
                        "template_name":"默认配置",
                        "list":[
                            {
                                "distance":"other",
                                "half":"0",
                                "one":"0.5",
                                "two":"0",
                                "day":"0.9",
                                "other":"1.00"
                            }
                        ]
                    }
                ],            
                
                
                isStoreOpen:false,
                dialogPeisong:false,
                modalAppendToBody:false,
                closeOnClickModal:false,
            }
        },
            components: {
              QmTabs,
              QmCheckboxFrame,
 			  QmTimepickers,
              QmTips,
              QmGuideTip,            
              },
            
             computed:{
              ...mapGetters({
                  metaData:'getMetaData',
                  ImageIp:'getImageIp',
                  basicStore:'getBasicStore',
                  imagePathConfig:'getImagePathConfig',
                }),
            },

            methods:{
              ...mapActions({
                getStoreSetting:'getStoreSetting',
                uploadFile:'uploadFile',
                baseSet:'baseSet',
                paySet:'paySet',
                uploadFile:'uploadFile',
                multipleUploadFile:'multipleUploadFile',
                getDistributionSet:'getDistributionSet',
                distributionSet:'distributionSet',
                switchSet:'switchSet',
              }),
              switchStore(){
                  var data = {
                    key:this.metaData.key,
                    openFlag:0,
                  }
                  if(this.isStoreOpen){
                      data.openFlag = 1
                  }else{
                      data.openFlag = 0
                  }
                  this.switchSet(data).then((res)=>{

                  })
              },
              routerData(data){
                var url = '/store/store_setting/'+data.key
                this.$router.push(url);
              },
              hideNewGuide(){
                this.showGuide = false;
              },
              deleteLogo(){
                var cBasicStore = _.clone(this.basicStore);
                cBasicStore.storeLabel = '';
                this.$store.commit('setBasicStore',cBasicStore)
              },
              logoLoad(event) {
                

                var key = this.metaData.key;
                var type = 2;
                var vm = this
                fileUpload.logoLoad(event,key,type,this.uploadFile,1).then(res => {
                    var imagePath = res.imgPath.replace(this.imagePathConfig.storeLabel,'');;

                    var cBasicStore = _.clone(this.basicStore);
                    cBasicStore.storeLabel = imagePath;
                    this.$store.commit('setBasicStore',cBasicStore)
                })

            },     

            submitData(){

              if(this.showPage == 1){
                this.submitBaseData()
              }
              if(this.showPage == 2){
                this.paySubmit();
              }
              if(this.showPage == 3){
                this.distributionSubmit();
              }
              
                
            },

            submitBaseData(){
              var cBasicStore = _.clone(this.basicStore);
                if(!cBasicStore.storeName || cBasicStore.storeName == ''){
                    return
                }
                if(!this.storeOpenDisDayIs && (!this.basicStore.storeStartTime || this.basicStore.storeStartTime == '' || !this.basicStore.storeCloseTime || this.basicStore.storeCloseTime == '')){
                    return;
                }
                    cBasicStore.storeOpenDisDayIs = this.storeOpenDisDayIs?1:0;
                    cBasicStore.storeOpenDisNextDay = this.storeOpenDisNextDay?1:0;
                    cBasicStore.storeZoneTel = this.zone + '-' +this.tel
                    cBasicStore.key = this.metaData.key;
                    cBasicStore.storeLabel = util.delImgSuffic(this.basicStore.storeLabel.replace(this.ImageIp+this.imagePathConfig.storeLabel,""));
                    cBasicStore.storeZoneTelEnd = this.tel;
                    cBasicStore.storeZoneTelStart = this.zone;
                    cBasicStore.storeLabelSrc = util.delImgSuffic(cBasicStore.storeLabelSrc);
                    cBasicStore.storeIndexBanner = util.delImgSuffic(cBasicStore.storeIndexBanner);
                    cBasicStore.offlinePayImage1 = util.delImgSuffic(cBasicStore.offlinePayImage1);
                    cBasicStore.offlinePayImage2 = util.delImgSuffic(cBasicStore.offlinePayImage2);
                    cBasicStore.qrcodeUrl = util.delImgSuffic(cBasicStore.qrcodeUrl);

                    this.baseSet(cBasicStore).then((res)=>{

                        this.layer.msg(res.longMessage);
                        if(res.resultCode === 1){
                            if(this.showPage < 4){
                                this.showPage += 1;
                            }
                            this.$store.commit('setBasicStore',cBasicStore)
                        }
                    }) 
            },

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
                    }
                    if(key == 'offlinePayImage1'){
                        this.offlinePayImage1 = imagePath
                        this.isZhifubaoCode = true;
                    }
                    
                    
                })
              },

              offlinepayUpload(event,key){
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
                if(key == 'offlinePayImage2'){
                    this.offlinePayImage2 = '';
                    this.isWechatCode = false;
                }
                if(key == 'offlinePayImage1'){
                    this.offlinePayImage1 = ''
                    this.isZhifubaoCode = false;
                }

              },

              paySubmit(){


                  // var oldOfflinePayImage1 = this.offlinePayImage1;
                  // var oldOfflinePayImage2 = this.offlinePayImage2;

                  var data = {
                    key:this.metaData.key,
                    offlinePayway:this.offlinePayway,
                    

                    offlinePayImage1:this.offlinePayImage1.replace(this.ImageIp+this.imagePathConfig.storeLabel,''),
                    offlinePayImage2:this.offlinePayImage2.replace(this.ImageIp+this.imagePathConfig.storeLabel,''),
                    aogPay:this.isCashDelivery?1:0,
                    wxPay:this.isPayOnline?1:0,
                    offlinePay:this.isPayOutline?1:0
                  }
                  var cBasicStore = _.clone(this.basicStore);

                  cBasicStore.offlinePayway = data.offlinePayway;
                  // cBasicStore.offlinePayImage1 = oldOfflinePayImage1;
                  // cBasicStore.offlinePayImage2 = oldOfflinePayImage2;
                  cBasicStore.aogPay = data.aogPay;
                  cBasicStore.wxPay = data.wxPay;
                  cBasicStore.offlinePay = data.offlinePay;

                  
                  this.paySet(data).then((res)=>{
                    if(res && res != undefined){
                        if(this.showPage < 4){
                            this.showPage += 1;
                        }
                        this.$store.commit('setBasicStore',cBasicStore)
                    }
                  });
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
                                        this.isZhifubaoCode = true;
                                    }
                                    if(resp[1]){
                                        var imagePath2 = vm.ImageIp + resp[1].responseContent.imgPath
                                        this.offlinePayImage2 = imagePath2;
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
                                        this.isZhifubaoCode = true;
                                    }
                                })
                        }
                    })
                }
              },
            
            addModel(){
                  var template_name = '自定义模板'+this.tableData.length;
                  this.tableData.push({
                    "template_id":"",
                    "template_name":template_name,
                    "list":[
                        {
                            "distance":"other",
                            "half":"",
                            "one":"",
                            "two":"",
                            "day":"",
                            "other":""
                        }
                    ]
                })
              },

              deleteModel(index){
                  this.tableData.splice(index,1);
              },

              addDistance(item,i){
                  item.list.unshift({
                    "distance":"",
                    "half":"",
                    "one":"",
                    "two":"",
                    "day":"",
                    "other":""
                });
              },

              deleteDistace(item,i,subI){
                  item.list.splice(subI,1)
              },

              doRouter(url){
                this.$router.push(url);
              },

              distributionSubmit(){


                var qformula = this.formatList(this.tableData,'qformula');
                

                  var data = {
                    buyerDistribution:this.buyerDistribution?1:0,
                    sellerDistribution:this.sellerDistribution?1:0,
                    storeDisDayIs:this.storeDisDayIs?1:0,
                    storeDisNextDay:this.storeDisNextDay?1:0,
                    storeDisStaTime:this.storeDisSta_Time,
                    storeDisEndTime:this.storeDisEnd_Time,
                    qformula:qformula,
                    freeShippingPriceIs:this.freeShippingPriceIs?1:0,
                    freeShippingPrice:this.freeShippingPrice,
                    startShippingPriceIs:this.startShippingPriceIs?1:0,
                    startShippingPrice:this.startShippingPrice
                  }

                  var cBasicStore = _.clone(this.basicStore);

                  cBasicStore.buyerDistribution = data.buyerDistribution;
                  cBasicStore.sellerDistribution = data.sellerDistribution;
                  cBasicStore.storeDisDayIs =data. storeDisDayIs;
                  cBasicStore.storeDisNextDay = data.storeDisNextDay;
                  cBasicStore.storeDisStaTime = data.storeDisStaTime;
                  cBasicStore.storeDisEndTime = data.storeDisEndTime;
                  cBasicStore.freeShippingPriceIs = data.freeShippingPriceIs;
                  cBasicStore.freeShippingPrice = data.freeShippingPrice;
                  cBasicStore.startShippingPriceIs = data.startShippingPriceIs;
                  cBasicStore.startShippingPrice = data.startShippingPrice;


                  
                  this.distributionSet(data).then((res)=>{
                    if(res.resultCode === 1){
                        if(this.showPage < 4){
                        this.showPage += 1;
                      }
                      this.$store.commit('setBasicStore',cBasicStore)
                    }else{
                        util.msg(res.longMessage)
                    }
                    
                  })
              },

              formatList(dataList,keyStr){
                var paramStr = keyStr+'&';
                dataList.forEach((list,l) => {
                    for (const key in list) {
                        if ((typeof list[key] == 'object' && list[key].length && typeof list[key].length == 'number') || typeof list[key] == 'array') {
                            
                            list[key].forEach((value,v)=>{
                                for (const skey in value) {
                                    paramStr += 'data['+keyStr+']['+l+']['+key+']['+v+']['+skey+']='+value[skey] + "&"
                                }
                            })
                        }else{
                            paramStr += 'data['+keyStr + ']['+l+']['+key+']='+list[key]+ "&"
                        }
                    }
                });
                paramStr = paramStr.substring(0,paramStr.length -1);
                return paramStr;
              },

              initData(){
                if(this.basicStore.storeZoneTel){
                    var storeZoneTel = this.basicStore.storeZoneTel.split("-");
                    this.zone = storeZoneTel[0];
                    this.tel = storeZoneTel[1]
                }
                if(this.basicStore.storeIndexBanner){
                    this.imagePath = 'https://imgpre.shenbd.com/mall/store/'+this.basicStore.storeIndexBanner
                }else{
                    this.imagePath = '';
                }
                if(this.basicStore.storeOpenDisDayIs == 1){
                    this.storeOpenDisDayIs = true;
                }else{
                    this.storeOpenDisDayIs = false;
                }
              
                if(this.basicStore.storeOpenDisNextDay == 1){
                    this.storeOpenDisNextDay = true;
                }else{
                    this.storeOpenDisNextDay = false;
                }
                if(this.basicStore.storeLabel){
                    this.storeLabel = this.ImageIp + this.imagePathConfig.storeLabel+this.basicStore.storeLabel;
                }else{
                    this.storeLabel = '';
                }
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
                }else{
                    this.isZhifubaoCode = false;
                    this.offlinePayImage1 = '';
                }

                if(this.basicStore.offlinePayImage2){
                    this.offlinePayImage2 = this.ImageIp + this.imagePathConfig.storeLabel + this.basicStore.offlinePayImage2;
                    this.isWechatCode = true;
                }else{
                    this.isWechatCode = false;
                    this.offlinePayImage2 = '';
                }

                if(this.basicStore.offlinePayway){
                    this.offlinePayway = this.basicStore.offlinePayway;
                }else{
                    this.offlinePayway = '';
                }

                if(this.basicStore.buyerDistribution == 1){
                    this.buyerDistribution = true
                }else{
                    this.buyerDistribution = false;
                }

                if(this.basicStore.sellerDistribution == 1){
                    this.sellerDistribution = true
                }else{
                    this.sellerDistribution = false;
                }

                if(this.basicStore.storeDisDayIs == 1){
                    this.storeDisDayIs = true
                }else{
                    this.storeDisDayIs = false;
                }

                if(this.basicStore.storeDisNextDay == 1){
                    this.storeDisNextDay = true;
                }else{
                    this.storeDisNextDay = false;
                }

                if(this.basicStore.storeDisSta_Time){
                    this.storeDisSta_Time = this.basicStore.storeDisSta_Time
                }else{
                    this.storeDisSta_Time = '';
                }

                if(this.basicStore.storeDisEnd_Time){
                    this.storeDisEnd_Time = this.basicStore.storeDisEnd_Time
                }else{
                    this.storeDisEnd_Time = '';
                }
            

                if(this.basicStore.freeShippingPrice == 0){
                    this.freeShippingPrice = this.basicStore.freeShippingPrice;
                    this.freeShippingPriceIs = false;
                }else{
                    this.freeShippingPrice = this.basicStore.freeShippingPrice;
                    this.freeShippingPriceIs = true;
                }
                if(this.basicStore.startShippingPrice == 0){
                    this.startShippingPrice = this.basicStore.startShippingPrice;
                    this.startShippingPriceIs = false;
                }else{
                    this.startShippingPrice = this.basicStore.startShippingPrice;
                    this.startShippingPriceIs = true;
                }
                if(this.basicStore.openFlag == 1){
                    this.isStoreOpen = true;
                }else{
                    this.isStoreOpen = false;
                }

                this.newBasicStore = _.clone(this.basicStore);
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

            mounted(){
                this.showPage = 1;

                var key = this.metaData.key;
                var data = {            
                    key:key
                }

                this.initData();
                this.getStoreSetting(data).then(()=>{

                }) 
                
                this.getDistributionSet().then((res)=>{
                    if(res && res.length >0){
                        this.tableData = res;
                    }else{
                         this.tableData= [
                            {
                                "template_id":"0",
                                "template_name":"默认配置",
                                "list":[
                                    {
                                        "distance":"other",
                                        "half":"",
                                        "one":"",
                                        "two":"",
                                        "day":"",
                                        "other":""
                                    }
                                ]
                            }
                        ]
                    }
                });
                geolocation.getCurrentLocation().then((address)=>{
                    //address是当前地址
                    console.log(address,'address');
                });
                
                // this.dialogPeisong = true;
            },

            watch:{

                basicStore(){
                this.initData();
              }
          },
    }
</script>

<style src="./index/store-setting.css" scoped>

</style>
