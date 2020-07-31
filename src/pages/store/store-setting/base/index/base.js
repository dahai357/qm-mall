
import QmCheckboxFrame from 'component/qm-checkbox-frame/index';
import QmTimepickers from 'component/qm-timepickers/index';
import {mapGetters,mapActions} from 'vuex';
import QmDialog from 'component/qm-dialog/index';
import * as _ from 'lodash';
import fileUpload from 'lib/utils/fileUpload.js';
import QmTips from 'component/qm-tips/index';
import util from 'lib/utils/util';
import moment from 'moment';

export default {
    name: "store-setting-base",
    data (){
        return {
          telType:2,
          bodyListener:'',
          tipMessage:false,//操作完成倒计时关闭弹框
          errorMsg:'',//弹框错误提示语
            storeLabel:'',
            storeOpenDisDayIs:false,
            storeOpenDisNextDay:false,
            zone:'',
            tel:'',
            cellTel:'',
            imagePath:'',
            newBasicStore:{},
            dialogVisible:false,
            change_type:0,
            change_tel:'',
            password:'',
            change_code:'',
            change__code:'',

            newCodeSecond:0,
            isNewCodeSend:false,
            oldCodeSecond:0,
            isOldCodeSend:false,

            dialog1:false,
            dialogMessage1:'请选择需要操作的记录',
            dialogTitle1:'提示信息',
            modalAppendToBody:false,
            closeOnClickModal:false,
            btnClick:{
                submitDataBtn:false,
                submitChangePhoneBtn:false
            },
            storeLabelName:'',
            zoneTelTips:'',
            cellTelTips:'',
            validData:{
              storeName:false,
              storeTime:false,
              zoneTel :false
            }
           }
    },
        components: {
            QmCheckboxFrame,
            QmTimepickers,
            QmTips,
          QmDialog
        },

        computed:{
            ...mapGetters({
                metaData:'getMetaData',
                ImageIp:'getImageIp',
                basicStore:'getBasicStore',
                imagePathConfig:'getImagePathConfig',
              }),
              getNewCodeSecond(){
                  if(this.isNewCodeSend){
                      if(this.newCodeSecond == 0){
                            return '重新获取';
                      }else{
                            return this.newCodeSecond+'s后重新获取';
                      }
                  }else{
                    return '获取验证码'
                  }
              },
              getOldCodeSecond(){
                    if(this.isOldCodeSend){
                        if(this.oldCodeSecond <= 0){
                            return '重新获取';
                        }else{
                            return this.oldCodeSecond+'s后重新获取';
                        }
                    }else{
                    return '获取验证码'
                    }
                },
                setMin(){
                    if(this.storeOpenDisNextDay){
                        return "00:00:00"
                    }else{
                        if(this.basicStore.storeStartTime){
                            var date = new moment();
                            var date1 = _.clone(date);
                            var sp = this.basicStore.storeStartTime.split(":");
                            if(sp[0]){
                                date = moment(date).set('hour', parseInt(sp[0]));
                            }
                            if(sp[1]){
                                date = moment(date).set('minute', parseInt(sp[1]));
                            }
                            date = moment(date).add('minute', 1);
                            var endTime =  moment(date).format("HH:mm");
                            return endTime;
                        }else{
                            return "00:00:00"
                        }
                        
                    }
                },
                setMaxStart(){
                    if(!this.storeOpenDisNextDay){
                        if(this.basicStore.storeCloseTime){
                            var date = new moment();
                            var date1 = _.clone(date);
                            var sp = this.basicStore.storeCloseTime.split(":");
                            if(sp[0]){
                                date = moment(date).set('hour', parseInt(sp[0]));
                            }
                            if(sp[1]){
                                date = moment(date).set('minute', parseInt(sp[1]));
                            }
                            date = moment(date).add('minute', -1);
                            var endTime =  moment(date).format("HH:mm");
                            return endTime;
                        }
                    }
                    return "23:59:59"
                },
                setMax(){
                    if(!this.storeOpenDisNextDay){
                        return "23:59:59"
                    }else{
                        // return this.basicStore.storeStartTime;
                        if(this.basicStore.storeStartTime){
                            var date = new moment();
                            var date1 = _.clone(date);
                            var sp = this.basicStore.storeStartTime.split(":");
                            if(sp[0]){
                                date = moment(date).set('hour', parseInt(sp[0]));
                            }
                            if(sp[1]){
                                date = moment(date).set('minute', parseInt(sp[1]));
                            }
                            date = moment(date).add('minute', -1);
                            var endTime =  moment(date).format("HH:mm");
                            return endTime;
                        }else{
                            return "23:59:59"
                        }
                    }
                }
          },

        methods:{
            ...mapActions({
                uploadFile:'uploadFile',
                getStoreSetting:'getStoreSetting',
                baseSet:'baseSet',
                sendOldPhone:'sendOldPhone',
                sendNewPhone:'sendNewPhone',
                modifyPhone:'modifyPhone',
                logOut:'logOut'
              }),
              handleClose(done) {
                done();
              },
            localImgLoad(event) {
                var key = this.metaData.key;
                var type = 2;
                fileUpload.logoLoad(event,key,type,this.uploadFile,1).then(res => {
                    var imagePath = res.imgPath.replace(this.imagePathConfig.storeLabel,'');
                    // var cBasicStore = _.clone(this.basicStore);
                    // cBasicStore.storeIndexBanner = imagePath;
                    // this.$store.commit('setBasicStore',cBasicStore)
                    this.imagePath = this.ImageIp + this.imagePathConfig.storeLabel+ imagePath;
                })
            },

            logoLoad(event) {
                var key = this.metaData.key;
                var type = 2;
                fileUpload.logoLoad(event,key,type,this.uploadFile,1).then(res => {
                    var imagePath = res.imgPath.replace(this.imagePathConfig.storeLabel,'');

                    this.basicStore.storeLabel = imagePath;
                    this.storeLabel = this.ImageIp + this.imagePathConfig.storeLabel+ imagePath;

                    // var cBasicStore = _.clone(this.basicStore);
                    // cBasicStore.storeLabel = imagePath;
                    // this.$store.commit('setBasicStore',cBasicStore)
                })
            },

            deleteHomeLogo(){
                this.imagePath = "";

                // var cBasicStore = _.clone(this.basicStore);
                // cBasicStore.storeIndexBanner = '';
                // this.$store.commit('setBasicStore',cBasicStore)
            },
            deleteLogo(){
                this.storeLabel = "";
                this.basicStore.storeLabel = "";
                // var cBasicStore = _.clone(this.basicStore);
                // cBasicStore.storeLabel = '';
                // this.$store.commit('setBasicStore',cBasicStore)
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

            submitData(){
                this.zoneTelTips = ''
                this.cellTelTips = ''
                this.validData = {
                    storeName:false,
                    storeTime:false,
                    zoneTel :false
                }
                var cBasicStore = _.clone(this.basicStore);
                if(!this.storeOpenDisDayIs && (!this.basicStore.storeStartTime || this.basicStore.storeStartTime == '' || !this.basicStore.storeCloseTime || this.basicStore.storeCloseTime == '')){
                    this.goAnchor("#storeOpenDisDayIs")
                    this.validData.storeTime = true;
                    return;
                }
                if(!cBasicStore.storeName || cBasicStore.storeName == ''){
                    this.validData.storeName = true;
                    this.$nextTick(()=>{
                      $('.error-store').text('店铺名称不能为空');
                    });
                    return
                }
              if(cBasicStore.storeName.length > 16){
                this.validData.storeName = true;
                this.$nextTick(()=>{
                  $('.error-store').text('店铺名称长度不能超过16个字符');
                });
                return
              }
                if(this.telType == 1) {
                  if((this.zone && !this.tel) || (!this.zone && this.tel)){
                    this.goAnchor("#telzone")
                    this.validData.zoneTel = true;
                    this.zoneTelTips = '区号和固定电话填写时都不能为空';
                    return
                  }
                  if(this.zone&&this.tel){
                    if(!(/^\d{7,8}$/.test(this.tel)&&/^0\d{2,3}$/.test(this.zone))){
                      this.goAnchor("#telzone")
                      this.validData.zoneTel = true;
                      this.zoneTelTips = '固定电话格式错误';
                      return ;
                    }
                  }
                }else{
                  if(this.cellTel !== '' && !/1[3456789]{1}\d{9}$/.test(this.cellTel)) {
                    this.goAnchor("#telzone")
                    this.cellTelTips = '输入的手机号格式不正确';
                    return ;
                  }
                }
                this.btnClick.submitDataBtn = true;

                cBasicStore.storeOpenDisDayIs = this.storeOpenDisDayIs?1:0;
                cBasicStore.storeOpenDisNextDay = this.storeOpenDisNextDay?1:0;
                cBasicStore.storeZoneTel = this.zone + '-' +this.tel
                cBasicStore.key = this.metaData.key;
                cBasicStore.storeNotice = cBasicStore.storeNotice.trim();
                cBasicStore.storeIndexBanner = util.delImgSuffic(this.imagePath.replace(this.ImageIp,"").replace(this.imagePathConfig.storeLabel,""));
                if(this.telType == 1) {
                  cBasicStore.storeZoneTelEnd = this.tel;
                  cBasicStore.storeZoneTelStart = this.zone
                }else{
                  cBasicStore.storeZoneTelEnd = this.cellTel;
                  cBasicStore.storeZoneTelStart = ''
                }
                if(cBasicStore.storeLabel==""){
                    util.msg("店铺logo不能为空");
                    return false
                }
                cBasicStore.storeLabel = util.delImgSuffic(cBasicStore.storeLabel);
                cBasicStore.storeLabelSrc = util.delImgSuffic(cBasicStore.storeLabelSrc);
                cBasicStore.offlinePayImage1 = util.delImgSuffic(cBasicStore.offlinePayImage1);
                cBasicStore.offlinePayImage2 = util.delImgSuffic(cBasicStore.offlinePayImage2);
                cBasicStore.qrcodeUrl = util.delImgSuffic(cBasicStore.qrcodeUrl);
                this.baseSet(cBasicStore).then((res)=>{
                    if(res.resultCode === 1){
                        util.msg("保存成功");
                        cBasicStore.storeLabel = res.responseContent.storeLabel;
                        if(this.telType == 1 && this.zone && this.tel) {
                          cBasicStore.storeZoneTel = this.zone+'-'+this.tel;
                        }else{
                          cBasicStore.storeZoneTel = this.cellTel;
                        }
                        this.$store.commit('setBasicStore',cBasicStore)
                        this.btnClick.submitDataBtn = false;
                    }else{
                      util.msg(res.shortMessage);
                    }
                })
            },

            submitChangePhone(){

                if(this.password == ''){
                    this.layer.msg('登陆密码不能为空');
                    return;
                }
                if(this.change_tel == ''){
                    this.layer.msg('新手机号不能为空');
                    return;
                }
                if(!/1[3456789]{1}\d{9}$/.test(this.change_tel)){
                    this.layer.msg('新手机号格式错误');
                    return;
                }
                if(this.change_code == '' || this.change__code == ''){
                    this.layer.msg('请输入6位数字验证码');
                    return;
                }
                this.btnClick.submitChangePhoneBtn = true;

                var data = {
                    change_type:this.change_type,
                    tel:this.change_tel,
                    password:this.password,
                    _code:this.change__code,
                    code:this.change_code
                }

                this.modifyPhone(data).then((data)=>{
                    this.layer.msg(data.longMessage);
                    this.btnClick.submitChangePhoneBtn = false;
                    if(data.resultCode == 1){
                      this.dialogVisible = false;
                      this.basicStore.storePhone = this.change_tel;
                      this.logOut();
                    }
                })
            },
          showModifyDialog(){
            this.password = '';
            this.change_tel = '';
            this.change__code = '';
            this.change_code = '';
            this.dialogVisible = true
          },

            getChangeCode(){

                if(this.newCodeSecond > 0){
                    return;
                }

                if(!this.change_tel || this.change_tel == ''){
                    this.layer.msg('手机号码不能为空');
                }
                else if(this.change_tel.length != 11 || isNaN(parseInt(this.change_tel))){
                    this.layer.msg('手机号码输入有误');
                }else{

                    var data = {
                        phone:parseInt(this.change_tel)
                    }

                    this.sendNewPhone(data).then((res)=>{
                        this.newCodeSecond = 60;

                        this.isNewCodeSend = true;
                        var intervalNew = setInterval(() => {
                            this.newCodeSecond -= 1;
                            if(this.newCodeSecond <= 0){
                                clearInterval(intervalNew);
                            }
                        }, 1000);
                    })
                }


            },
            getChangeOldCode(){
                if(this.oldCodeSecond > 0){
                    return;
                }
                this.sendOldPhone().then((res)=>{
                    this.oldCodeSecond = 60;
                    this.isOldCodeSend = true;
                        var intervalOld = setInterval(() => {

                            this.oldCodeSecond -= 1;
                            if(this.oldCodeSecond <= 0){
                                clearInterval(intervalOld);
                            }
                        }, 1000);
                })
            },
            initData(){
                if(this.basicStore.storeZoneTel){
                    var storeZoneTel = this.basicStore.storeZoneTel.split("-");
                    if(storeZoneTel.length == 2 && storeZoneTel[0] && storeZoneTel[1]) {
                      this.zone = storeZoneTel[0];
                      this.tel = storeZoneTel[1]
                      this.telType = 1;
                    }else{
                      this.cellTel = storeZoneTel[0];
                      this.telType = 2;
                    }
                }
                if(this.basicStore.storeIndexBanner){
                    this.imagePath =  this.ImageIp + this.imagePathConfig.storeLabel+this.basicStore.storeIndexBanner
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

                this.newBasicStore = _.clone(this.basicStore);
            },

            // 是否选中次日
            isNextDay(val){
                // if(val){
                    this.basicStore.storeCloseTime = "";
                // }            
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

              timeChange(value){
                if(this.basicStore.storeStartTime && this.basicStore.storeCloseTime){
                    var date = new moment();
                    var date1 = _.clone(date);
                    var sp = this.basicStore.storeStartTime.split(":");
                    if(sp[0]){
                        date = moment(date).set('hour', parseInt(sp[0]));
                    }
                    date = moment(date).set('minute', parseInt(sp[1]));
                    if(sp[1]){
                        if(!this.storeOpenDisNextDay){
                            date = moment(date).add("minute",1)
                        }else{
                            date = moment(date).add("minute",-1)
                        }
                        
                    }
                    var csp = this.basicStore.storeCloseTime.split(":");
                    if(csp[0]){
                        date1 = moment(date1).set('hour', parseInt(csp[0]));
                    }
                    if(csp[1]){
                        date1 = moment(date1).set('minute', parseInt(csp[1]));
                    }
                    
                    if(date > date1 && !this.storeOpenDisNextDay){
                        var cBasicStore = _.clone(this.basicStore);
                        cBasicStore.storeCloseTime = moment(date).format("HH:mm");
                        if(!this.storeOpenDisDayIs){
                            cBasicStore.storeOpenDisDayIs = 0;
                        }
                        this.$store.commit('setBasicStore',cBasicStore)
                    }else if(date < date1 && this.storeOpenDisNextDay){
                        var cBasicStore = _.clone(this.basicStore);
                        cBasicStore.storeCloseTime = moment(date).format("HH:mm");
                        cBasicStore.storeOpenDisNextDay = 1;
                        if(!this.storeOpenDisDayIs){
                            cBasicStore.storeOpenDisDayIs = 0;
                        }
                        this.$store.commit('setBasicStore',cBasicStore)
                    }
                }
              }

        },

        


        mounted(){
          var _self = this;
            this.getStoreSetting().then(()=>{
                this.initData();
            })
          //body绑定键盘enter搜索事件
          _self.bodyListener = (e) => {
            if (e.keyCode === 13){
              if(_self.dialogVisible && !_self.btnClick.submitChangePhoneBtn){
                //手机绑定
                _self.submitChangePhone();
              }
            }
          }
          document.body.addEventListener('keyup', _self.bodyListener, false);
        },

        watch:{
            basicStore(){
                this.initData();
              }
        },

        beforeRouteEnter(to, from, next){
            // if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
            //     if(to.name == "base"){
            //         $('body').on("DOMNodeRemoved", function (event) {
            //             var dialog = $(".el-dialog__wrapper");
            //             var openDialog = false;
            //             for(let i=0;i<dialog.length;i++){
            //             if($(dialog[i]).css("display") == "block"){
            //                 openDialog = true;
            //             }
            //             }
            //             if(window.location.href.indexOf("store_setting/store_setting") != -1){
            //                 if(!openDialog){
            //                     if(event.target.id =="store_notice"){
            //                         event.preventDefault();
            //                         var rch = event.target.clientHeight;
            //                         console.log(rch,"ccccs");
            //                         var csp = window.document.documentElement.scrollTop;
            //                         if(csp > 130){
            //                             window.scrollTo(0, csp - 130);
            //                         }
            //                     }
            //                 } 
            //             } 
            //         });
            //     }
            // }
            next()
        }  ,

}
