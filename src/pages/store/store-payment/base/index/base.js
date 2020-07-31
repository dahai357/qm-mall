
import {mapGetters,mapActions} from 'vuex';
import QmStep from 'component/qm-step/index';
import QmCheckboxFrame from 'component/qm-checkbox-frame/index';
import fileUpload from 'lib/utils/fileUpload.js';
import QmArea from 'component/qm-area/index';
import QmJsonCity from 'component/qm-json-city/index';
import QmJsonIndustry from 'component/qm-json-industry/index';
import QmTips from 'component/qm-tips/index';
import QmDialog from 'component/qm-dialog/index';
import Viewer from "v-viewer/src/component.vue";
import "viewerjs/dist/viewer.css";
import env from "../../../../../config/url";
import storage from 'lib/utils/storage';
import util from 'lib/utils/util';
export default {
    name: "store-payment-index",
    data (){
        return {
          newWxpayRateBeginDate:'',
            markers: [
              [121.59996, 31.197646],
              [121.40018, 31.197622],
              [121.69991, 31.207649]
            ],
            mapCenter: [121.59996, 31.197646],
            btnClick:{

            },

            steps:[
              {title:'STEP.1',text:'填写基本信息',current:true,icon:'step_1.png'},
              {title:'STEP.2',text:'填写商户信息',current:false,icon:'step_2.png'},
              {title:'STEP.3',text:'填写结算账户',current:false,icon:'step_3.png'},
              {title:'STEP.4',text:'协议及资质审核',current:false,icon:'step_4.png'},
            ],
            stepIndex:1,
            valid_code:'',

            showBankList:false,

            showValidate:false,

            info:{
              city1Txt:'',
              city2Txt:'',
              instudryTxt:'',
              bank_photo:'',
            },

            isRead:false,
            isReadChecked:false,

            dialogVisible:false,

            error:{
              //基本信息
              valid_code_error:false,
              idcard_error:false,
              idcard_format_error:false,
              legal_card_deadline_error:false,
              idcard_front_error:false,
              idcard_reverse_error:false,
              //商户信息
              province_id_error:false,
              city_id_error:false,
              region_id_error:false,
              road_error:false,
              No_error:false,
              instudry1_error:false,
              instudry2_error:false,
              business_licence_photo1_error:false,
              shop_front_photo1_error:false,
              shop_photo1_error:false,
              //结算账户--个人
              bank_account_error:false,
              bank_account_again_error:false,
              bank_account_unequal_error:false,
              open_province_id_error:false,
              open_city_id_error:false,
              sub_branch_error:false,
              reserved_tel_error:false,
              bank_photo_error:false,
              //结算账户--店铺
              account_permit_error:false,
              open_name_error:false,
              verify_money_error:false,
              verify_code_error:false,

            },
            viewerOptions: {
              toolbar: false,
              navbar: false,
              fullscreen: false,
            },


            newCodeSecond:0,
            isNewCodeSend:false,
            legal_card_deadline_long:false,

            dealineStroge:'',

            branchBankLists:[],

            dialog1:false,
            dialogMessage1:'请选择需要操作的记录',
            dialogTitle1:'提示信息',

            closeOnClickModal:false,
            modalAppendToBody:false,
            /*图片弹窗*/
            dialogVisibleImage:false,
            dialogVisibleImageFalse:false,
            imgUrl:'',
            hasImage:false,

            imgWidth:520,
            citys:[],
            industries:[],
            agreeMentSignUrl:env.basePath+'/storePayment/agreementSign?key='+storage.get('key')
        }
    },
        components: {
          QmStep,
          QmCheckboxFrame,
          QmArea,
          QmJsonCity,
          QmJsonIndustry,
          QmTips,
          Viewer,
          QmDialog,
          util
        },

        computed:{
            ...mapGetters({
              metaData:'getMetaData',
              ImageIp:'getImageIp',
              imagePathConfig:'getImagePathConfig',
              imageType:'getImageType',

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
        },

        methods:{
          getPageData(data){
            this.getData(data).then((res)=>{
               this.newWxpayRateBeginDate = res.newWxpayRateBeginDate
              })
          },

          addMarker: function() {
            let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
            let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
            this.markers.push([lng, lat]);
          },

            ...mapActions('storePayment',{
                sendVerify:'sendVerify',
                getInfo:'getInfo',
                companyAccountVerify:'companyAccountVerify',
                requestAccountVerify:'requestAccountVerify',
                saveStepOne:'saveStepOne',
                saveStepTwo:'saveStepTwo',
                saveInfo:'saveInfo',
                agreementSign:'agreementSign'
              }),

              ...mapActions('unionpay',{
                branchBankList:'branchBankList',
              }),

              ...mapActions({
                uploadFile:'uploadFile',
                getCityJson:'getCityJson',
                getIndustryJson:'getIndustryJson',
                getData: 'getStoreTransactionList',
              }),


              setBackCode(bank){
                this.info.bank_code = bank.code,
                this.info.sub_branch = bank.bankBranchName;
                this.showBankList = false;
              },

              agree(){
                if(!this.isReadChecked){
                  return;
                }
                this.isRead = true,
                this.dialogVisible = false;
              },

              getImage(name){
                if(name == 'state_0'){
                  return require('../../../../../assets/seller/images/state_0.png')
                }
                if(name == 'state_4'){
                  return require('../../../../../assets/seller/images/state_4.png')
                }
                if(name == 'state_5'){
                  return require('../../../../../assets/seller/images/state_5.png')
                }
              },

              init(){
                  this.getInfo().then((res)=>{
                    if(res.resultCode == 1){
                      // res.responseContent.personal = false;  //改
                      //省，市，区
                      if(res.responseContent.province_id == null || res.responseContent.province_id == 0 || res.responseContent.province_id == ""){
                        res.responseContent.province_id = -1;
                      }
                      if(res.responseContent.city_id == null || res.responseContent.city_id == 0 || res.responseContent.city_id == ""){
                        res.responseContent.city_id = -1
                      }
                      if(res.responseContent.region_id == null || res.responseContent.region_id == 0 || res.responseContent.region_id == ""){
                        res.responseContent.region_id = -1
                      }
                      if(res.responseContent.instudry1 == null){
                        res.responseContent.instudry1 = -1
                      }
                      if(res.responseContent.instudry2 == null){
                        res.responseContent.instudry2 = -1
                      }
                      if(res.responseContent.open_province_id == null || res.responseContent.open_province_id == 0 || res.responseContent.open_province_id == ""){
                        res.responseContent.open_province_id = -1
                      }
                      if(res.responseContent.open_city_id == null || res.responseContent.open_city_id == 0 || res.responseContent.open_city_id == ""){
                        res.responseContent.open_city_id = -1
                      }
                      if(!res.responseContent.personal){
                        if(!res.responseContent.idcard || res.responseContent.idcard == null){
                          res.responseContent.idcard = ''
                        }
                        if(res.responseContent.verify_money == null){
                          res.responseContent.verify_money = ''
                        }
                        if(res.responseContent.verify_code == null){
                          res.responseContent.verify_code = ''
                        }
                        if(res.responseContent.account_permit == null){
                          res.responseContent.account_permit = ''
                        }

                        if(!res.responseContent.bank_code){
                          res.responseContent.bank_code = res.responseContent.sub_branch_no
                        }
                      }
                      if(!res.responseContent.road || res.responseContent.road == undefined || res.responseContent.road == "undefined"){
                        res.responseContent.road = "";
                      }
                      if(!res.responseContent.No || res.responseContent.No == undefined || res.responseContent.No == "undefined"){
                        res.responseContent.No = "";
                      }
                      if(!res.responseContent.more_address || res.responseContent.more_address == undefined || res.responseContent.more_address == "undefined"){
                        res.responseContent.more_address = "";
                      }
                      if(!res.responseContent.legal_card_deadline || res.responseContent.legal_card_deadline == undefined || res.responseContent.legal_card_deadline == "undefined"){
                        res.responseContent.legal_card_deadline = "";
                      }
                      if(!res.responseContent.hasOwnProperty('bank_photo')) {
                        res.responseContent.bank_photo = '';
                      }
                      this.info = res.responseContent;
                      this.dealineStroge = this.info.legal_card_deadline;
                      if(this.info.state == 0) {
                        this.stepIndex = 1;
                      }else if(this.info.state == 1) {
                        this.stepIndex = 3;
                      }else if(this.info.state >= 2) {
                        this.stepIndex = 4;
                      }
                      if(this.info.legal_card_deadline === '2099-12-31') {
                        this.legal_card_deadline_long = true;
                      }
                      if(this.info.idcard) {//填过第一步的信息,自动勾选同意
                        this.isRead = true;
                        this.isReadChecked = true;
                      }else{
                        //自动弹窗
                        this.dialogVisible = true;
                      }
                      if(this.info.bank_account) {
                        this.info.bank_account_again = this.info.bank_account;
                      }
                      this.showMultipleChoice(this.citys,'city','city1Txt',this.info.province_id,this.info.city_id,this.info.region_id);
                      this.showMultipleChoice(this.industries,'industry','instudryTxt',this.info.instudry1,this.info.instudry2);
                      this.showMultipleChoice(this.citys,'city','city2Txt',this.info.open_province_id,this.info.open_city_id);
                    }
                  })

                  this.getCityJson().then(res=>{
                    this.citys = res;
                    if(this.info.hasOwnProperty('province_id')) {
                      this.showMultipleChoice(this.citys,'city','city1Txt',this.info.province_id,this.info.city_id,this.info.region_id);
                      this.showMultipleChoice(this.citys,'city','city2Txt',this.info.open_province_id,this.info.open_city_id);
                    }
                  })
                  this.getIndustryJson().then(res=>{
                    this.industries = res;
                    if(this.info.hasOwnProperty('instudry1')) {
                      this.showMultipleChoice(this.industries,'industry','instudryTxt',this.info.instudry1,this.info.instudry2);
                    }
                  })
              },
              showMultipleChoice(data,type,txtName,chiefId,subId,thirdId) {
                let name = [],subArray = [],thirdArray = [];
                let level = this.getLevelName(type);
                if(data.length == 0) {
                  return;
                }
                for(let i=0;i<data.length;i++){
                  if(data[i].id==chiefId){
                    name.push(data[i].name);
                    subArray = data[i][level.l1];
                    break;
                  }
                }
                for(let j=0;j<subArray.length;j++){
                  if(subArray[j].id==subId){
                    name.push(subArray[j].name);
                    thirdArray = subArray[j][level.l2];
                    break;
                  }
                }
                if(thirdId){
                  for(let k=0;k<thirdArray.length;k++){
                    if(thirdArray[k].id==thirdId){
                      name.push(thirdArray[k].name);
                      break;
                    }
                  }
                }
                this.info[txtName] = name.join(' - ');
              },
              getLevelName(type) {
                let levelName=[];
                let choiceDate = [
                  {
                    "type": "city",
                    "level":['province', 'city', 'area']
                  },
                  {
                    "type": "industry",
                    "level":['chief', 'sub']
                  }
                ]

                for(let i=0;i<choiceDate.length;i++){
                  if(choiceDate[i].type==type){
                    levelName = choiceDate[i].level;
                  }
                }

                return{
                  l0:levelName[0],
                  l1:levelName[1],
                  l2:levelName[2]
                }
              },
              valueChange(event){
                var newInfo = _.clone(this.info);
                if(event.level == 'province'){
                  newInfo.province_id = event.value;
                }else if(event.level == 'city'){
                  newInfo.city_id = event.value;
                }else{
                  newInfo.region_id = event.value;
                }
                this.info = newInfo;
              },

              openValueChange(event){
                var newInfo = _.clone(this.info);
                if(event.level == 'province'){
                  newInfo.open_province_id = event.value;
                }else if(event.level == 'city'){
                  newInfo.open_city_id = event.value;
                }
                this.info = newInfo;
              },

              industryValueChange(event){
                var newInfo = _.clone(this.info);
                if(event.level == 'industry1'){
                  newInfo.instudry1 = event.value;
                }else if(event.level == 'industry2'){
                  newInfo.instudry2 = event.value;
                }
                this.info = newInfo;
              },

              searchBank(){
                    var cityId = this.info.open_city_id;
                    var keyWord = this.info.sub_branch.replace(/(^\s*)|(\s*$)/g, "");

                    if(!cityId||cityId=='-1'||cityId==-1){
                        this.dialog1  = true;
                        this.dialogMessage1 = '请先选择开户所在地'
                    }else if(keyWord ===''){
                      this.dialog1  = true;
                      this.dialogMessage1 = '请输入搜索关键字'
                    }else{
                        var data = {
                          cityId:cityId,
                          keyword:keyWord
                        }
                        this.branchBankList(data).then((res)=>{
                            if(res.resultCode == 1){
                              var data = JSON.parse(res.responseContent);
                              this.branchBankLists = data.branchBankList;
                              if(!this.branchBankLists || this.branchBankLists.length == 0){
                                this.showBankList = false;
                                this.dialog1 = true;
                                this.dialogTitle1 = '提示信息';
                                this.dialogMessage1 = '请重新输入有效支行关键字';
                              }else{
                                this.showBankList = true;
                              }
                            }else{
                              this.layer.msg(res.longMessage);
                            }

                        })
                    }
              },

              getChangeCode(){

                if(this.newCodeSecond > 0){
                    return;
                }
                var data = {
                  mobile:parseInt(this.info.contacts_phone),
                  // mobile:15280179619
                }

                this.sendVerify(data).then((res)=>{
                    this.layer.msg(res.longMessage);
                    if(res.resultCode == 1){
                      this.newCodeSecond = 60;
                      this.isNewCodeSend = true;
                      var intervalNew = setInterval(() => {
                          this.newCodeSecond -= 1;
                          if(this.newCodeSecond <= 0){
                              clearInterval(intervalNew);
                          }
                      }, 1000);
                    }
                })
            },


            showDeadLine(value){
              if(value){

                // this.info.legal_card_deadline = this.dealineStroge;
                this.info.legal_card_deadline = "2099-12-31";
              }else{
                this.info.legal_card_deadline = '';
              }
            },

              deleteImage(type){
                if(type == 'idcard_front'){
                  this.info.idcard_front = '';
                }else if(type == 'idcard_reverse'){
                  this.info.idcard_reverse = '';
                }else if(type == 'business_licence_photo'){
                  this.info.business_licence_photo = '';
                }else if(type == 'shop_front_photo'){
                  this.info.shop_front_photo = '';
                }else if(type == 'shop_photo'){
                  this.info.shop_photo = '';
                }else if(type == 'bank_photo'){
                  this.info.bank_photo = '';
                }else if(type == 'account_permit'){
                  this.info.account_permit = '';
                }
              },

              localImgLoad(event,pro){
                var key = this.metaData.key;
                var type = this.imageType.IMG_REGISTER;
                let cropSuffix = 'm_lfit,h_1200,w_1200'
                fileUpload.imageLoadWithSuffix(event,key,cropSuffix,type,this.uploadFile,1,1).then(res => {
                    var imagePath = res.imgPath.replace(this.imagePathConfig.Register,'');
                    if(pro == 'idcard_front'){
                      this.info.idcard_front = imagePath;
                    }else if(pro == 'idcard_reverse'){
                      this.info.idcard_reverse = imagePath;
                    }else if(pro == 'business_licence_photo'){
                      this.info.business_licence_photo = imagePath;
                    }else if(pro == 'shop_front_photo'){
                      this.info.shop_front_photo = imagePath;
                    }else if(pro == 'shop_photo'){
                      this.info.shop_photo = imagePath;
                    }else if(pro == 'bank_photo'){
                      this.info.bank_photo = imagePath;
                      // this.info.self_portrait = imagePath;
                    }else if(pro == 'account_permit'){
                      this.info.account_permit = imagePath;
                    }
                })
              },

              back(){
                this.steps.forEach((step) => {
                  step.current = false;
                });
                this.stepIndex -=1
                this.steps[this.stepIndex -1].current = true;
              },
              submitStep1(){

                this.reset();

                if(!this.isRead){
                  this.layer.msg('请您认真阅览《银联开通知情同意书》并勾选同意');
                  return;
                }

                var valided = true;
                if(this.valid_code == ''){
                  this.error.valid_code_error = true;
                  valided = false;
                }
                if(this.info.idcard == ''){
                  this.error.idcard_error = true;
                  valided = false;
                }else if(!(/\d{17}[\d|x]|\d{15}/).test(this.info.idcard) || (this.info.idcard.length !== 15 && this.info.idcard.length !== 18)) {
                  this.error.idcard_format_error = true;
                  valided = false;
                }
                if(this.info.legal_card_deadline == ''){
                  this.error.legal_card_deadline_error = true;
                  valided = false;
                }
                if(this.info.idcard_front == ''){
                  this.error.idcard_front_error = true;
                  valided = false;
                }
                if(this.info.idcard_reverse == ''){
                  this.error.idcard_reverse_error = true;
                  valided = false;
                }
                if(!valided){
                  return;
                }
                var data = {
                  tel:this.info.contacts_phone,
                  // tel:15280179619,
                  valid_code:this.valid_code,
                  idcard:this.info.idcard,
                  legal_card_deadline:this.info.legal_card_deadline,
                  idcard_front1:util.delImgSuffic(this.info.idcard_front),
                  idcard_reverse1:util.delImgSuffic(this.info.idcard_reverse)
                }
                this.saveStepOne(data).then((res)=>{
                  if(res.resultCode == 1){
                    this.info.state = 0;
                    this.stepIndex = 2;
                    this.steps.forEach((step) => {
                      step.current = false;
                    });
                    this.steps[1].current = true;
                  }else{
                    this.layer.msg(res.longMessage);
                  }
                })
              },

              submitStep2(){

                this.reset();

                var valided = true;
                if(this.info.province_id == '' || this.info.province_id == -1 || this.info.province_id == '-1'){
                  this.error.province_id_error = true;
                  valided = false;
                }
                if(this.info.city_id == '' || this.info.city_id == -1 || this.info.city_id == '-1'){
                  this.error.city_id_error = true;
                  valided = false;
                }
                if(this.info.region_id == '' || this.info.region_id == -1 || this.info.region_id == '-1'){
                  this.error.region_id_error = true;
                  valided = false;
                }
                if(this.info.road == ''){
                  this.error.road_error = true;
                  valided = false;
                }
                if(this.info.No == ''){
                  this.error.No_error = true;
                  valided = false;
                }
                if(this.info.instudry1 == '' || this.info.instudry1 == -1 || this.info.instudry1 == '-1'){
                  this.error.instudry1_error = true;
                  valided = false;
                }
                if(this.info.instudry2 == '' || this.info.instudry2 == -1 || this.info.instudry2 == '-1'){
                  this.error.instudry2_error = true;
                  valided = false;
                }
                if(this.info.business_licence_photo == ''){
                  this.error.business_licence_photo1_error = true;
                  valided = false;
                }
                if(this.info.shop_front_photo == ''){
                  this.error.shop_front_photo1_error = true;
                  valided = false;
                }
                if(this.info.shop_photo == ''){
                  this.error.shop_photo1_error = true;
                  valided = false;
                }
                if(!valided){
                  return;
                }
                var data = {
                  province_id:this.info.province_id,
                  city_id:this.info.city_id,
                  region_id:this.info.region_id,
                  license_address:'',
                  road	:this.info.road,
                  No	:this.info.No,
                  more_address	:this.info.more_address,
                  instudry1	:this.info.instudry1	,
                  instudry2	:this.info.instudry2,
                  business_licence_photo1	:util.delImgSuffic(this.info.business_licence_photo),
                  shop_front_photo1	:util.delImgSuffic(this.info.shop_front_photo),
                  shop_photo1:util.delImgSuffic(this.info.shop_photo)
                }

                this.saveStepTwo(data).then((res)=>{
                  if(res.resultCode == 1){
                    this.stepIndex = 3;
                    this.steps.forEach((step) => {
                      step.current = false;
                    });
                    this.steps[2].current = true;
                  }else{
                    this.layer.msg(res.longMessage);
                  }
                })
              },

              submitStep3(){
                this.reset();

                var valided = true;
                if(this.info.bank_account == ''){
                  this.error.bank_account_error = true;
                  valided = false;
                }
                if(!this.info.bank_account_again || this.info.bank_account_again == ''){
                  this.error.bank_account_again_error = true;
                  valided = false;
                }
                if(this.info.bank_account != '' && this.info.bank_account_again && this.info.bank_account_again != '' && this.info.bank_account != this.info.bank_account_again){
                  this.error.bank_account_unequal_error = true;
                  valided = false;
                }
                if(this.info.open_province_id == '' || this.info.open_province_id == -1 || this.info.open_province_id == '-1'){
                  this.error.open_province_id_error = true;
                  valided = false;
                }
                if(this.info.open_city_id == '' || this.info.open_city_id == -1 || this.info.open_city_id == '-1'){
                  this.error.open_city_id_error = true;
                  valided = false;
                }

                if(this.info.sub_branch == ''){
                  this.error.sub_branch_error = true;
                  valided = false;
                }
                if(this.info.personal){
                  if(this.info.reserved_tel == ''){
                    this.error.reserved_tel_error = true;
                    valided = false;
                  }
                  if(this.info.bank_photo == ''){
                    this.error.bank_photo_error = true;
                    valided = false;
                  }
                }

                if(!this.info.personal){
                  if(this.info.bank_photo == ''){
                    this.error.account_permit_error = true;
                  }
                  if(this.info.open_name == ''){
                    this.error.open_name_error = true;
                  }

                  // if(!this.info.personal && this.info.state <2 && this.info.verify_money == ''){
                  //   this.error.verify_money_error = true;
                  // }
                  //
                  // if(!this.info.personal && this.info.state <2 && this.info.verify_code == ''){
                  //   this.error.verify_code_error = true;
                  // }
                }

                if(!valided){
                  return;
                }
                var data = {
                  open_name	:this.info.open_name,
                  bank_account	:this.info.bank_account	,
                  bank_account_again	:this.info.bank_account_again,
                  open_province_id	:this.info.open_province_id,
                  open_city_id	:this.info.open_city_id,
                  open_address	:'',
                  sub_branch	:this.info.sub_branch,
                  reserved_tel	:this.info.reserved_tel,
                  self_portrait1	:util.delImgSuffic(this.info.bank_photo),
                  account_permit1	:util.delImgSuffic(this.info.bank_photo),

                  bank_code	:this.info.bank_code?this.info.bank_code:this.info.sub_branch_no,
                  verify_money	:'',
                  verify_code:'',
                }
                let index = this.layer.load(1);
                this.saveInfo(data).then((res)=>{
                  this.layer.close(index);
                  if(res.resultCode == 1){
                    if(this.info.personal){
                      this.stepIndex = 4;
                      this.steps.forEach((step) => {
                        step.current = false;
                      });
                      this.steps[3].current = true;
                      window.open(this.agreeMentSignUrl);
                    }else{
                      this.dialog1 = true;
                      this.dialogMessage1 = res.longMessage;
                      this.showValidate = true;
                    }
                  }else{
                    this.dialog1 = true;
                    this.dialogTitle1 = "提示信息"
                    this.dialogMessage1 = res.longMessage
                    // this.layer.msg(res.longMessage);
                  }
                })
              },

              reset(){
                this.error = {
                  //基本信息
                  valid_code_error:false,
                  idcard_error:false,
                  idcard_format_error:false,
                  legal_card_deadline_error:false,
                  idcard_front_error:false,
                  idcard_reverse_error:false,
                  //商户信息
                  province_id_error:false,
                  city_id_error:false,
                  region_id_error:false,
                  road_error:false,
                  No_error:false,
                  instudry1_error:false,
                  instudry2_error:false,
                  business_licence_photo1_error:false,
                  shop_front_photo1_error:false,
                  shop_photo1_error:false,
                  //结算账户--个人
                  bank_account_error:false,
                  bank_account_again_error:false,
                  bank_account_unequal_error:false,
                  open_province_id_error:false,
                  open_city_id_error:false,
                  sub_branch_error:false,
                  reserved_tel_error:false,
                  bank_photo_error:false,
                  //结算账户--店铺
                  account_permit_error:false,
                  open_name_error:false,
                  verify_money_error:false,
                  verify_code_error:false,
                };
              },
              reauthentication(){
                this.requestAccountVerify().then((res)=>{
                  this.dialog1 = true;
                  this.dialogTitle1 = "提示信息"
                  this.dialogMessage1 = res.longMessage
                });
              },
              vidateCompany(){

                this.reset();

                var valide = true;
                if(!this.info.personal){
                  // if(this.info.account_permit == ''){
                  //   this.error.account_permit_error = true;
                  //   valide = false;
                  // }

                  // if(this.info.open_name == ''){
                  //   this.error.open_name_error = true;
                  //   valide = false;
                  // }
                  if(this.showValidate == false && this.info.state == 0) {
                    this.dialog1 = true;
                    this.dialogTitle1 = "提示信息"
                    this.dialogMessage1 = '请先进行对公认证'
                    return false;
                  }
                  if(this.info.verify_money == ''){
                    this.error.verify_money_error = true;
                    valide = false;
                  }

                  if(this.info.verify_code == ''){
                    this.error.verify_code_error = true;
                     valide = false;
                  }
                }

                if(!valide){
                  return;
                }

                var data = {
                  trans_amt:this.info.verify_money.replace(/(^\s*)|(\s*$)/g, ""),
                  verify_code:this.info.verify_code.replace(/(^\s*)|(\s*$)/g, ""),
                }

                this.companyAccountVerify(data).then((res)=>{
                  if(res.resultCode == 1){
                    this.stepIndex = 4;
                    this.steps.forEach((step) => {
                      step.current = false;
                    });
                    this.steps[3].current = true;
                  }else{
                    this.dialog1 = true;
                    this.dialogTitle1 = "提示信息"
                    this.dialogMessage1 = res.longMessage
                  }
                });
              },

              reApplay(){
                this.init();
                this.steps.forEach((step) => {
                  step.current = false;
                });
                this.stepIndex = 1;
              },

              openUrl(){
                // this.agreementSign().then((res)=>{
                //   if(res.resultCode == 1){
                //     var url = res.responseContent.url;
                //     window.open(url);
                //   }
                // })
                //window.open(env.basePath+'/storePayment/agreementSign?key='+storage.get('key'));
              },

              showImg(imgUrl){
                  this.imgUrl = imgUrl;
                  this.isHasImg(this.imgUrl).then((res)=>{
                      this.hasImage = res;
                      if(this.hasImage){
                          this.dialogVisibleImage = true;
                      }else{
                          this.dialogVisibleImageFalse = true;
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
          dialogVisibleImage(){
            var dragDom = document.querySelectorAll(".el-dialog");
            dragDom.forEach((el)=>{
                console.log(el)
                el.style.left = 0;
                el.style.top =0

            })
          }

          },

          mounted(){

            this.getPageData({
              beginTime: '',
              endTime: '',
              pageIndex: 0,
              pageSize: 15,
              total: 0,
            })

            this.init();
            var vm = this;
            layui.use('laydate', function(){
              var laydate = layui.laydate;
              laydate.render({
                  elem: '#id_validity',
                  trigger:'click',
                  // theme: "#ff8519"
                  done:function(data){
                    vm.dealineStroge = data;
                    vm.info.legal_card_deadline = data;
                  }
                });
            })
          }
}
