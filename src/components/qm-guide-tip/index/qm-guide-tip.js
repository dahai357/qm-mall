import {mapGetters,mapActions} from 'vuex';
import QmCheckboxFrame from 'component/qm-checkbox-frame/index';
import QmTimepickers from 'component/qm-timepickers/index';
import * as _ from 'lodash';
import util from 'lib/utils/util';
import fileUpload from 'lib/utils/fileUpload';
import moment from 'moment';
import draggable from 'vuedraggable';

export default {
    name: "qm-guide-tip"  ,

    data(){
        return {
            telType:2,
            bodyListener:'',
            nextDisabled:false,
            showPage:1,
            showGuide:false,
            TimeShow:false,
            storeLabel:'',
            storeOpenDisDayIs:false,
            storeOpenDisNextDay:false,
            zone:'',
            tel:'',
            cellTel:'',
            imagePath:'',
            newBasicStore:{},
            isOpenAutomaticReceipt:false,
            isPayOnline:false,
            isPayOutline:false,
            isZhifubaoCode:true,
            isWechatCode:false,
            isCashDelivery:false,
            offlinePayway:'',
            offlinePayImage1:'',
            offlinePayImage2:'',
            payImage:[],

            buyerDistribution:false,
            distrReadyTime:30,
            sellerDistribution:false,
            storeDisDayIs:false,
            storeDisNextDay :false,
            storeDisSta_Time:'',
            storeDisEnd_Time:'',
            freeShippingPrice : '',
            freeShippingPriceIs : false,
            startShippingPrice : '',
            startShippingPriceIs : false,
            deliveryMemo:'',
            formulaValidFlag:true,
            formulaValidTips:'',
            tableData:[
                {
                    "template_id":"time0",
                    "template_name":"默认配置",
                    "list":[
                        {
                            "distance":"other",
                            "half":"",
                            "one":"",
                            "two":"",
                            "day":"",
                            "twodays":"",
                            "threedays":"",
                            "other":""
                        }
                    ]
                }
            ],


            zoneTelTips:'',
            cellTelTips:'',
            validData:{
                storeName:false,
                storeTime:false,
                zoneTel :false
            },
            isStoreOpen:false,
            showRemark:false,
            distributionList:[
                {startTime:'',endTime:'',isNextDay:false}
            ],
            maxTime:'00:00:00',
            minTIme:'',
            distributionListErr :false,
            addNextDayFlag:true,
            dayFormulaValidFlag:true,
            dayFormulaValidTips:'',
            storeTimeIs:false,
            tableDataDay:[
                {
                    "template_id":"day0",
                    "template_name":"默认配置",
                    "list":[
                        {
                            "distance":"other",
                            "one":"",
                            "two":"",
                            "three":"",
                            "four":"",
                            "seven":"",
                            "other":""
                        }
                    ]
                }
            ],
            timeType:1,
            timeTypeShow:1,
            buyerDistributionList:[
                {startTime:'',endTime:'',isNextDay:false}
            ],
            buyerMaxTime:'00:00:00',
            buyerMinTime:'',
            buyerDistributionListErr :false,

        }
    },

    components: {
        QmCheckboxFrame,
        QmTimepickers,
        draggable
    },

    props:{

    },

    computed: {
        ...mapGetters({
            metaData:'getMetaData',
            ImageIp:'getImageIp',
            basicStore:'getBasicStore',
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
            getStoreSetting:'getStoreSetting',
            uploadFile:'uploadFile',
            baseSet:'baseSet',
            paySet:'paySet',
            multipleUploadFile:'multipleUploadFile',
            getDistributionSet:'getDistributionSet',
            distributionSet:'distributionSet',
            switchSet:'switchSet',
            checkFormula:'checkFormula'
          }),

          // 是否选中次日
          isNextDay(val){
            if(this.basicStore.storeStartTime == '00:00'){
                this.storeOpenDisNextDay = false;
            }else{
                this.basicStore.storeCloseTime = "";
            }
        },

        // 是否选中次日
        isNextDay1(data,l){
            if(data.startTime&&data.endTime){
                data.endTime = ''
            }
            let tempList = type == 1? _.clone(this.distributionList):_.clone(this.buyerDistributionList)
            let newTempList = [];
            tempList.forEach((temp, a)=>{
                if(a<=l){
                    newTempList.push(temp);
                }
            });
            if(type == 1){
                this.distributionList = newTempList;
            }else{
                this.buyerDistributionList = newTempList;
            }
        },

        hideNewGuide(){
            this.getStoreSetting().then(()=>{
                this.showGuide = false;
                this.$emit("hideNewGuide",false)
            });
        },
        //锚点跳转
        goAnchor(selector) {
            var child = document.querySelector(selector)
            if(child != null){
                // document.body.scrollTop = document.querySelector(selector).offsetTop-50;
                // window.scrollTo(0,document.querySelector(selector).offsetTop-50);
                document.getElementsByClassName("guide-right")[0].scrollTop = document.querySelector(selector).offsetTop-100;
            }
        },


        submitData(){
            if(this.showPage == 1){
              this.submitBaseData()
            }
            if(this.showPage == 2){
              this.paySubmit();
            }
            if(this.showPage == 3){
              this.nextDisabled = true;
              this.distributionSubmit();
            }
            if(this.showPage == 1 || this.showPage == 2){
              this.goAnchor("#guide-tips",0)
            }
        },
      showNowPage(e){
           var el = e.currentTarget;
           var page = $(el).attr('idx');
           if(page != -1){
             this.showPage = Number(page);
           }
           this.goAnchor("#guide-tips",0)
      },

        submitBaseData(){
            this.zoneTelTips = ''
            this.cellTelTips = ''
            this.validData = {
                storeName:false,
                storeTime:false,
                zoneTel :false
            }
            var cBasicStore = _.clone(this.basicStore);
            if(!this.storeOpenDisDayIs && (!this.basicStore.storeStartTime || this.basicStore.storeStartTime == '' || !this.basicStore.storeCloseTime || this.basicStore.storeCloseTime == '')){
                this.validData.storeTime = true;
                return;
            }
            if(!cBasicStore.storeName || cBasicStore.storeName == ''){
                this.validData.storeName = true;
                return
            }
            if(this.telType == 1) {
              if((this.zone && !this.tel) || (!this.zone && this.tel)){
                this.validData.zoneTel = true;
                this.zoneTelTips = '区号和固定电话填写时都不能为空';
                return
              }
              if(this.zone&&this.tel){
                if(!(/^\d{7,8}$/.test(this.tel)&&/^0\d{2,3}$/.test(this.zone))){
                  this.validData.zoneTel = true;
                  this.zoneTelTips = '固定电话格式错误';
                  return ;
                }
              }
            }else{
              if(this.cellTel !== '' &&  !/1[3456789]{1}\d{9}$/.test(this.cellTel)) {
                this.cellTelTips = '输入的手机号格式不正确';
                return ;
              }
            }

            
            cBasicStore.storeOpenDisDayIs = this.storeOpenDisDayIs?1:0;
            cBasicStore.storeOpenDisNextDay = this.storeOpenDisNextDay?1:0;
            cBasicStore.storeZoneTel = this.zone + '-' +this.tel
            cBasicStore.storeNotice = cBasicStore.storeNotice.trim();
            cBasicStore.key = this.metaData.key;
            cBasicStore.storeLabel = util.delImgSuffic(this.storeLabel.replace(this.ImageIp+this.imagePathConfig.storeLabel,""));
            if(this.telType == 1) {
              cBasicStore.storeZoneTelEnd = this.tel;
              cBasicStore.storeZoneTelStart = this.zone
            }else{
              cBasicStore.storeZoneTelEnd = this.cellTel;
              cBasicStore.storeZoneTelStart = ''
            }
            cBasicStore.buyerDistributionList = this.buyerDistributionList
            cBasicStore.distributionList = this.distributionList
            cBasicStore.deliveryMemo = this.deliveryMemo
            cBasicStore.storeTimeIs = this.storeTimeIs
            if(cBasicStore.storeLabel==""){
                util.msg("店铺logo不能为空");
                return false
            }
            cBasicStore.storeLabelSrc = util.delImgSuffic(cBasicStore.storeLabelSrc);
            cBasicStore.storeIndexBanner = util.delImgSuffic(cBasicStore.storeIndexBanner);
            cBasicStore.offlinePayImage1 = util.delImgSuffic(cBasicStore.offlinePayImage1);
            cBasicStore.offlinePayImage2 = util.delImgSuffic(cBasicStore.offlinePayImage2);
            cBasicStore.qrcodeUrl = util.delImgSuffic(cBasicStore.qrcodeUrl);
            this.baseSet(cBasicStore).then((res)=>{

                // this.layer.msg(res.longMessage);
                if(res.resultCode === 1){
                    cBasicStore.storeLabel = res.responseContent.storeLabel;
                    this.telType = 2;
                    if(this.telType == 1 && this.zone && this.tel) {
                        this.telType = 1;
                        cBasicStore.storeZoneTel = this.zone+'-'+this.tel;
                    }else{
                        cBasicStore.storeZoneTel = this.cellTel;
                    }
                    this.$store.commit('setBasicStore',cBasicStore)
                    if(this.showPage < 4){
                        this.showPage += 1;
                        $('#one-page').attr('idx',1);
                       $('#two-page').attr('idx',2);
                    }
                    // this.$store.commit('setBasicStore',cBasicStore)
                    this.getStoreSetting();
                }else{
                  util.msg(res.longMessage);
                }
            }) 
        },


        paySubmit(){
            var data = {
              key:this.metaData.key,
              offlinePayway:this.offlinePayway,
              offlinePayImage1:util.delImgSuffic(this.offlinePayImage1.replace(this.ImageIp+this.imagePathConfig.storeLabel,'')),
              offlinePayImage2:util.delImgSuffic(this.offlinePayImage2.replace(this.ImageIp+this.imagePathConfig.storeLabel,'')),
              aogPay:this.isCashDelivery?1:0,
              wxPay:this.isPayOnline?1:0,
              offlinePay:this.isPayOutline?1:0
            }
            var cBasicStore = _.clone(this.basicStore);

            cBasicStore.offlinePayway = data.offlinePayway;
            cBasicStore.aogPay = data.aogPay;
            cBasicStore.wxPay = data.wxPay;
            cBasicStore.offlinePay = data.offlinePay;

            this.paySet(data).then((res)=>{
              if(res && res != undefined){
                if(this.showPage < 4){
                    this.showRemark = false; 
                    this.showPage += 1;
                  $('#three-page').attr('idx',3);
                    $("#guide-tips").on('scroll',()=>{
                        $('.layui-laydate').hide()
                    });
                }
                // this.$store.commit('setBasicStore',cBasicStore)
                this.getStoreSetting();
              }
            });
        },
        distributionSubmit(){
            if(this.dayFormulaValidFlag == false){
                this.goAnchor('#storeTimeIs',20)
                this.nextDisabled = false;
                return;
            }
            if(this.formulaValidFlag==false){
                this.nextDisabled = false;
                this.goAnchor('#distributionDiv',20)
                return;
            }
            this.distributionListErr = false;
            let tempList = _.clone(this.distributionList)
            tempList.forEach((temp,i)=>{
                if(!(temp.startTime&&temp.endTime)){
                    this.distributionListErr = true;
                    return false;
                }
                let dateStrat = new moment();
                let dateEnd = new moment();
                let sp = temp.startTime.split(":");
                if(sp[0]){
                    dateStrat = moment(dateStrat).set('hour', parseInt(sp[0]));
                }
                if(sp[1]){
                    dateStrat = moment(dateStrat).set('minute', parseInt(sp[1]));
                }
                if(i==0){
                    let dateMin = moment(dateStrat).add(-1,'minute');
                    this.minTime = moment(dateMin).format("HH:mm")+':00'
                }
                let ep = temp.endTime.split(":");
                if(ep[0]){
                    dateEnd = moment(dateEnd).set('hour', parseInt(ep[0]));
                }
                if(ep[1]){
                    dateEnd = moment(dateEnd).set('minute', parseInt(ep[1]));
                }
                if(temp.isNextDay==false&&dateEnd.diff(dateStrat)<=0){
                    this.distributionListErr = true;
                }
                let dateMax = moment(dateEnd).add(1,'minute');
                this.maxTime =  moment(dateMax).format("HH:mm")+':00';
            })
            if(!this.storeTimeIs){
                this.buyerDistributionListErr = false;
                let buyerTempList = _.clone(this.buyerDistributionList)
                buyerTempList.forEach((temp,i)=>{
                    if(!(temp.startTime&&temp.endTime)){
                        this.buyerDistributionListErr = true;
                        return false;
                    }
                    let dateStrat = new moment();
                    let dateEnd = new moment();
                    let sp = temp.startTime.split(":");
                    if(sp[0]){
                        dateStrat = moment(dateStrat).set('hour', parseInt(sp[0]));
                    }
                    if(sp[1]){
                        dateStrat = moment(dateStrat).set('minute', parseInt(sp[1]));
                    }
                    if(i==0){
                        let dateMin = moment(dateStrat).add(-1,'minute');
                        this.buyerMinTime = moment(dateMin).format("HH:mm")+':00'
                    }
                    let ep = temp.endTime.split(":");
                    if(ep[0]){
                        dateEnd = moment(dateEnd).set('hour', parseInt(ep[0]));
                    }
                    if(ep[1]){
                        dateEnd = moment(dateEnd).set('minute', parseInt(ep[1]));
                    }
                    if(temp.isNextDay==false&&dateEnd.diff(dateStrat)<=0){
                        this.buyerDistributionListErr = true;
                    }
                    let dateMax = moment(dateEnd).add(1,'minute');
                    this.buyerMaxTime =  moment(dateMax).format("HH:mm")+':00';
                })
            }
            if(this.buyerDistribution){
                if(!(this.distrReadyTime&&this.distrReadyTime>0)){
                    this.nextDisabled = false;
                    util.msg('自提时配货时长不能为空');
                    return ;
                }
                if(!this.storeTimeIs && (this.buyerDistributionListErr)){
                    this.nextDisabled = false;
                    this.goAnchor('#storeTimeIs',20)
                    return;
                }
            }
            if(this.sellerDistribution&&(!this.storeDisDayIs && (this.distributionListErr))){
                this.nextDisabled = false;
                this.goAnchor('#storeDisDayIs',20)
                return;
            }
            this.tableData.forEach((table,t)=>{
                if(t==0){
                    table.template_id = 'time'+t;
                }
            })

            this.tableDataDay.forEach((table,t)=>{
                if(t==0){
                    table.template_id = 'day'+t;
                }
            })
            var qformula = this.formatList(this.tableData,'qformula');
              var data = {
                buyerDistribution:this.buyerDistribution?1:0,
                storeDecorationSwitch:this.distrReadyTime,
                sellerDistribution:this.sellerDistribution?1:0,
                storeDisDayIs:this.storeDisDayIs?1:0,
                storeDisNextDay:this.storeDisNextDay?1:0,
                distributionList:JSON.stringify(this.distributionList),
                qformula:JSON.stringify(this.tableData),
                freeShippingPriceIs:this.freeShippingPriceIs?1:0,
                freeShippingPrice:this.freeShippingPrice,
                startShippingPriceIs:this.startShippingPriceIs?1:0,
                startShippingPrice:this.startShippingPrice,
                deliveryMemo:this.deliveryMemo,
                buyerDistributionList:JSON.stringify(this.buyerDistributionList),
                storeTimeIs:this.storeTimeIs?1:0,
                dayqformula:JSON.stringify(this.tableDataDay),
                timeType:this.timeTypeShow
              }
              var cBasicStore = _.clone(this.basicStore);
              cBasicStore.buyerDistribution = data.buyerDistribution;
              cBasicStore.sellerDistribution = data.sellerDistribution;
              cBasicStore.storeDisDayIs =data. storeDisDayIs;
              cBasicStore.storeDisNextDay = data.storeDisNextDay;
              cBasicStore.startShippingPriceIs = data.startShippingPriceIs?1:0
              cBasicStore.startShippingPrice = data.startShippingPrice
              cBasicStore.freeShippingPriceIs = data.freeShippingPriceIs;
              cBasicStore.freeShippingPrice = data.freeShippingPrice;
              cBasicStore.storeTimeIs = data.storeTimeIs;
              cBasicStore.deliveryMemo = data.deliveryMemo;
              cBasicStore.buyerDistributionList = this.buyerDistributionList;
              cBasicStore.distributionList = this.distributionList;
              cBasicStore.timeType = this.timeTypeShow;
              this.distributionSet(data).then((res)=>{
                this.nextDisabled = false;
                if(res.resultCode === 1){
                    if(this.showPage < 4){
                    this.getStoreSetting().then(()=>{
                        this.isStoreOpen = true;
                        this.switchStore(true);
                        this.showPage += 1;
                        $('#four-page').attr('idx',4);
                    });
                  }
                //   this.$store.commit('setBasicStore',cBasicStore)
                
                }
                else{
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


          addModel(){
              if(this.timeType == 1){
                  let timestamp =new Date().getTime();
                  var template_name = '自定义模板'+this.tableData.length;
                  this.tableData.push({
                      "template_id":timestamp,
                      "template_name":template_name,
                      "list":[
                          {
                              "distance":"other",
                              "half":"",
                              "one":"",
                              "two":"",
                              "day":"",
                              "twodays":"",
                              "threedays":"",
                              "other":""
                          }
                      ]
                  });
                  this.$nextTick(()=>{
                      let talbeDataLen = this.tableData.length;
                      for (let i in this.tableData){
                          if(i == talbeDataLen-1){
                              $("#templateName"+i).select()
                          }
                      }
                  });
              }else{
                  var template_name = '自定义模板'+this.tableDataDay.length;
                  this.tableDataDay.push({
                      "template_id":"day"+timestamp,
                      "template_name":template_name,
                      "list":[
                          {
                              "distance":"other",
                              "one":"",
                              "two":"",
                              "three":"",
                              "four":"",
                              "seven":"",
                              "other":""
                          }
                      ]
                  });
                  this.$nextTick(()=>{
                      let talbeDataLen = this.tableDataDay.length;
                      for (let i in this.tableDataDay){
                          if(i == talbeDataLen-1){
                              $("#templateNameDay"+i).select()
                          }
                      }
                  });
              }
              this.formulaValid();
        },

        deleteModel(index){
            if(this.timeType == 1){
                this.tableData.splice(index,1);
            }else{
                this.tableDataDay.splice(index,1);
            }
            this.formulaValid();
        },

        addDistance(item,i){
            if(this.timeType == 1){
                item.list.unshift({
                    "distance":"",
                    "half":"",
                    "one":"",
                    "two":"",
                    "day":"",
                    "twodays":"",
                    "threedays":"",
                    "other":""
                });
            }else{
                item.list.unshift({
                    "distance":"",
                    "one":"",
                    "two":"",
                    "three":"",
                    "four":"",
                    "seven":"",
                    "other":""
                });
            }
            this.formulaValid();
        },
        changeTimeType(type){
            this.formulaValid();
            if(this.timeType == 1 && this.formulaValidFlag == false){
                util.msg('请先完成可选时间段模板配置');
                return ;
            }
            if(this.timeType == 2 && this.dayFormulaValidFlag == false){
                util.msg('请先完成非可选时间段模板配置');
                return ;
            }
            this.timeType = type;
        },
        deleteDistace(item,i,subI){
            item.list.splice(subI,1)
            this.formulaValid();
        },

        doRouter(url){
          this.$router.push(url);
          this.$emit("hideNewGuide",false);
        },
        setMaxStart(data,l){
            if(l==0){
                if(data.endTime!=null&&data.endTime!=''){
                    let date = new moment();
                    let sp = data.endTime.split(":");
                    if(sp[0]){
                        date = moment(date).set('hour', parseInt(sp[0]));
                    }
                    if(sp[1]){
                        date = moment(date).set('minute', parseInt(sp[1]));
                    }
                    if(data.isNextDay){
                        date = moment(date).add(1,'minute');
                    }else{
                        date = moment(date).add(-1,'minute');
                    }
                    return moment(date).format("HH:mm")+':59';
                }else{
                    return '23:59:59'
                }
            }else{
                if(data.endTime!=null&&data.endTime!=''){
                    if(data.isNextDay){
                        return '23:59';
                    }else{
                        let date = new moment();
                        let sp = data.endTime.split(":");
                        if(sp[0]){
                            date = moment(date).set('hour', parseInt(sp[0]));
                        }
                        if(sp[1]){
                            date = moment(date).set('minute', parseInt(sp[1]));
                        }
                        date = moment(date).add(-1,'minute');
                        return moment(date).format("HH:mm")+':59';
                    }
                }else{
                    return '23:59'
                }
            }
        },
        setMinStart(data,l,type){
            if(l==0){
                return "00:00:00"
            }else{
                let nextData ;
                if(type == 2){
                    nextData = this.buyerDistributionList[l-1];
                }else{
                    nextData = this.distributionList[l-1];
                }
                if(nextData&&nextData.endTime!=null&&nextData.endTime!=''){
                    if(nextData.endTime=='23:59'){
                        data.isNextDay = true;
                    }
                    let date = new moment();
                    let sp = nextData.endTime.split(":");
                    if(sp[0]){
                        date = moment(date).set('hour', parseInt(sp[0]));
                    }
                    if(sp[1]){
                        date = moment(date).set('minute', parseInt(sp[1]));
                    }
                    date = moment(date).add(1,'minute');
                    let endTime =  moment(date).format("HH:mm");
                    return endTime;
                }else{
                    if(type == 2){
                        this.buyerDistributionListErr = true;
                    }else{
                        this.distributionListErr = true;
                    }
                }
            }
        },
        setMinEnd(data,l){

            if(data.isNextDay){
                return '00:00:00';
            }
            if(data.startTime != null && data.startTime != ''){
                if(data.startTime !='00:00:00'){
                    let date = new moment();
                    let sp = data.startTime.split(":");
                    if(sp[0]){
                        date = moment(date).set('hour', parseInt(sp[0]));
                    }
                    if(sp[1]){
                        date = moment(date).set('minute', parseInt(sp[1]));
                    }
                    date = moment(date).add(30,'minute');
                    let endTime =  moment(date).format("HH:mm");
                    return endTime;
                }else{
                    return "00:00:00"
                }
            }
            return '00:00:00';
        },
        setMin(data){
            if(data.isNextDay){
                return "00:00:00"
            }else{
                if(data.startTime){
                    let date = new moment();
                    let sp = data.startTime.split(":");
                    if(sp[0]){
                        date = moment(date).set('hour', parseInt(sp[0]));
                    }
                    if(sp[1]){
                        date = moment(date).set('minute', parseInt(sp[1]));
                    }
                    date = moment(date).add(1,'minute');
                    let endTime =  moment(date).format("HH:mm");
                    return endTime;
                }else{
                    return "00:00:00"
                }
            }
        },
        setMax(data,l,type){
            if(!data.isNextDay){
                return "23:59:59"
            }else{
                // return this.storeDisSta_Time;
                let date = new moment();
                let sp ;
                if(type == 2){
                    if(this.buyerDistributionList[0].startTime&&this.buyerDistributionList[0].startTime=='00:00'){
                        data.isNextDay = false
                    }
                    if(l==0){
                        sp = data.startTime.split(":");
                    }else{
                        sp = this.buyerDistributionList[0].startTime.split(":");
                    }
                }else{
                    if(this.distributionList[0].startTime&&this.distributionList[0].startTime=='00:00'){
                        data.isNextDay = false
                    }
                    if(l==0){
                        sp = data.startTime.split(":");
                    }else{
                        sp = this.distributionList[0].startTime.split(":");
                    }
                }
                if(sp[0]){
                    date = moment(date).set('hour', parseInt(sp[0]));
                }
                if(sp[1]){
                    date = moment(date).set('minute', parseInt(sp[1]));
                }
                date = moment(date).add( -1,'minute');
                let endTime =  moment(date).format("HH:mm");
                return endTime;
            }
        },
        setMaxStartStoreTime(){
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
        setMinEndStoreTime(){
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
        setMaxEndStoreTime(){
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
        },

        timeChangeStoreTime(value){
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
        },
        endTimeChange(data,l,type){
            if(type == 2){
                let tempList = _.clone(this.buyerDistributionList);
                var data = _.clone(tempList[l])
                tempList[l] = data;
                this.buyerDistributionList = tempList;
            }else{
                let tempList = _.clone(this.distributionList);
                var data = _.clone(tempList[l])
                tempList[l] = data;
                this.distributionList = tempList;
            }
        },
        //添加配送时段
        addDistribution(type){
            let tempList ;
            if(type == 2 ){
                tempList = _.clone(this.buyerDistributionList);
            }else{
                tempList = _.clone(this.distributionList);
            }
            let addFlag = true
            let addNextDayFlag = true
            tempList.forEach((temp,l)=>{
                if(temp.startTime&&temp.endTime){
                    if(temp.isNextDay){
                        addNextDayFlag = false
                    }
                }else{
                    addFlag = false
                }
            })
            if(addFlag==false){
                util.msg("请完成当前设置！")
                return ;
            }
            if(addNextDayFlag==false){
                util.msg("已经设置到次日，不能再设置")
                return ;
            }
            let len = tempList.length;
            let newDis = {startTime:'',endTime:'',isNextDay:false}
            if(tempList[len-1].endTime=='23:59'){
                newDis = {startTime:'',endTime:'',isNextDay:true}
            }
            if(type == 2){
                this.buyerDistributionList.push(newDis);
            }else{
                this.distributionList.push(newDis);
            }
        },
        //删除配送时段
        delDistribution(t,type){
            if(type == 2){
                this.buyerDistributionList.splice(t,1);
            }else{
                this.distributionList.splice(t,1)
            }
        },
        switchStore(value){
            if(this.basicStore.checkArray.storeInfo == 0){
            //   this.layer.msg("店铺基本信息未开启");
              return
            }
            if(this.basicStore.checkArray.payWay == 0){
            //   this.layer.msg("支付配置未开启");
              return
            }
            if(this.basicStore.checkArray.deliveryWay == 0){
            //   this.layer.msg("配送方式未开启");
              return
            }

            var data = {
              key:this.metaData.key,
              openFlag:0,
            }
            if(this.isStoreOpen){
                data.openFlag = 1;
            }else{
                data.openFlag = 0;
            }
            if(this.isOpenAutomaticReceipt){
                data.openAutomaticReceipt = 1;
            }else{
                data.openAutomaticReceipt = 0;
            }
            this.switchSet(data).then((res)=>{
                this.getStoreSetting();
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
            fileUpload.logoLoadData(imageABase64,file_tag,2,1).then((res)=>{

                var imagePath = this.ImageIp + res.imgPath;
                if(key == 'offlinePayImage2'){
                    this.offlinePayImage2 = imagePath;
                  this.updatePayImage(1,this.offlinePayImage2);
                    this.isWechatCode = true;
                }
                if(key == 'offlinePayImage1'){
                    this.offlinePayImage1 = imagePath;
                  this.updatePayImage(0,this.offlinePayImage1);
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
            vm.uploadFileImage(key,video);
          },

          offlinepayDelete(key){
            if(key == 1){
                this.offlinePayImage2 = '';
              this.updatePayImage(1,this.offlinePayImage2);
                this.isWechatCode = false;
            }
            if(key == 0){
                this.offlinePayImage1 = '';
              this.updatePayImage(0,this.offlinePayImage1);
                this.isZhifubaoCode = false;
            }

          },

        deleteLogo(){

            // var cBasicStore = _.clone(this.basicStore);
            // cBasicStore.storeLabel = '';
            // this.$store.commit('setBasicStore',cBasicStore)
            this.storeLabel = "";
        },

        logoLoad(event) {
            var key = this.metaData.key;
            var type = 2;
            var vm = this
            fileUpload.logoLoad(event,key,type,this.uploadFile,1).then(res => {
                var imagePath = res.imgPath.replace(this.imagePathConfig.storeLabel,'');;

                /*var cBasicStore = _.clone(this.basicStore);
                cBasicStore.storeLabel = imagePath;
                this.$store.commit('setBasicStore',cBasicStore)*/
                this.basicStore.storeLabel = imagePath;
                this.storeLabel = this.ImageIp + this.imagePathConfig.storeLabel+ imagePath;

            })
        }, 
        
        initData(){
            if(this.basicStore.storeZoneTel){
                var storeZoneTel = this.basicStore.storeZoneTel.split("-");
                if(storeZoneTel.length == 2 && storeZoneTel[0] && storeZoneTel[1]) {
                  this.zone = storeZoneTel[0];
                  this.tel = storeZoneTel[1];
                  this.telType = 1;
                }else{
                  this.cellTel = storeZoneTel[0];
                  this.telType = 2;
                }
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
              this.updatePayImage(0,this.offlinePayImage1);
                this.isZhifubaoCode = true;
            }else{
                this.isZhifubaoCode = false;
                this.offlinePayImage1 = '';
              this.updatePayImage(0,this.offlinePayImage1);
            }

            if(this.basicStore.offlinePayImage2){
                this.offlinePayImage2 = this.ImageIp + this.imagePathConfig.storeLabel + this.basicStore.offlinePayImage2;
              this.updatePayImage(1,this.offlinePayImage2);
                this.isWechatCode = true;
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

            if(this.basicStore.buyerDistribution == 1){
                this.buyerDistribution = true
            }else{
                this.buyerDistribution = false;
            }
            this.distrReadyTime = this.basicStore.storeDecorationSwitch

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

            this.distributionList = this.basicStore.distributionList
            if(this.distributionList==null||(this.distributionList&&this.distributionList.length==0)){
                this.distributionList = [];
                this.distributionList.push({startTime:'',endTime:'',isNextDay:false});
            }

            if(this.basicStore.freeShippingPrice == null || this.basicStore.freeShippingPrice == 0 || this.basicStore.freeShippingPrice ==''){
                this.freeShippingPrice = '';
                this.freeShippingPriceIs = false;
            }else{
                this.freeShippingPrice = this.basicStore.freeShippingPrice;
                this.freeShippingPriceIs = true;
            }
            if(this.basicStore.startShippingPrice == null || this.basicStore.startShippingPrice == 0 || this.basicStore.startShippingPrice ==''){
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
            if(this.basicStore.openAutomaticReceipt==1){
                this.isOpenAutomaticReceipt=true;
            }else{
                this.isOpenAutomaticReceipt=false;
            }
            this.deliveryMemo = this.basicStore.deliveryMemo
            this.storeTimeIs = this.basicStore.storeTimeIs;
            this.buyerDistributionList = this.basicStore.buyerDistributionList
            if(this.buyerDistributionList==null||(this.buyerDistributionList&&this.buyerDistributionList.length==0)){
                this.buyerDistributionList = [];
                this.buyerDistributionList.push({startTime:'',endTime:'',isNextDay:false});
            }

            if(this.basicStore.timeType){
                this.timeType = this.basicStore.timeType;
                this.timeTypeShow = this.basicStore.timeType;
            }
            if(this.basicStore.formula && this.basicStore.formula.length >0){
                this.tableData = this.basicStore.formula;
            }   else{
                this.tableData= [
                    {
                        "template_id":"time0",
                        "template_name":"默认配置",
                        "list":[
                            {
                                "distance":"other",
                                "half":"",
                                "one":"",
                                "two":"",
                                "day":"",
                                "twodays":"",
                                "threedays":"",
                                "other":""
                            }
                        ]
                    }
                ]
            }
            if(this.basicStore.simple_formula && this.basicStore.simple_formula.length >0){
                this.tableDataDay = this.basicStore.simple_formula;
            }   else{
                this.tableDataDay= [
                    {
                        "template_id":"day0",
                        "template_name":"默认配置",
                        "list":[
                            {
                                "distance":"other",
                                "one":"",
                                "two":"",
                                "three":"",
                                "four":"",
                                "seven":"",
                                "other":""
                            }
                        ]
                    }
                ]
            }
            this.newBasicStore = _.clone(this.basicStore);

            this.formulaValid();
        },
        validFeeValue(type){
            let value = ''
            if(type == "startShippingPrice"){
                value = this.startShippingPrice
            }else  if(type == 'freeShippingPrice'){
                value = this.freeShippingPrice
            }
            let t = value.charAt(0);
            if(value.length==1){
                value=value.replace(/[^1-9]/g,'')
            }else{
                if(t == '0'){
                    if(value.length == 1){
                        value = '';
                    }else{
                        value = value.substr(1);
                    }
                }
                value=value.replace(/\D/g,'')
            }
            if(type == "startShippingPrice"){
                this.startShippingPrice = value
            }else  if(type == 'freeShippingPrice'){
                this.freeShippingPrice = value
            }
        },
        timeChange(data,t,type) {
            if (data.startTime && data.endTime && !data.isNextDay) {
                let dateMin = new moment();
                let spMin = data.startTime.split(":");
                if (spMin[0]) {
                    dateMin = moment(dateMin).set('hour', parseInt(spMin[0]));
                }
                if (spMin[1]) {
                    dateMin = moment(dateMin).set('minute', parseInt(spMin[1]));
                }
                dateMin = moment(dateMin).add(30,'minute');
                let dateEnd = new moment();
                let spEnd = data.endTime.split(":");
                if (spEnd[0]) {
                    dateEnd = moment(dateEnd).set('hour', parseInt(spEnd[0]));
                }
                if (spEnd[1]) {
                    dateEnd = moment(dateEnd).set('minute', parseInt(spEnd[1]));
                }
                if(dateMin>dateEnd){
                    data.endTime = '';
                }
            }
            if(t==0&&data.startTime){
                let dateMin = new moment();
                let spMin = data.startTime.split(":");
                if (spMin[0]) {
                    dateMin = moment(dateMin).set('hour', parseInt(spMin[0]));
                }
                if (spMin[1]) {
                    dateMin = moment(dateMin).set('minute', parseInt(spMin[1]));
                }
                dateMin = moment(dateMin).add( -1,'minute');
                if(type == 2){
                    this.buyerMinTime = moment(dateMin).format("HH:mm")+':59'
                }else{
                    this.minTime = moment(dateMin).format("HH:mm")+':59'
                }
            }
            if (data.startTime && data.endTime) {
                var date = new moment();
                var date1 = _.clone(date);
                var sp = data.startTime.split(":");
                if (sp[0]) {
                    date = moment(date).set('hour', parseInt(sp[0]));
                }
                date = moment(date).set('minute', parseInt(sp[1]));
                if (sp[1]) {
                    if (!data.isNextDay) {
                        date = moment(date).add("minute", 1)
                    } else {
                        date = moment(date).add("minute", -1)
                    }

                }
                var csp = data.endTime.split(":");
                if (csp[0]) {
                    date1 = moment(date1).set('hour', parseInt(csp[0]));
                }
                if (csp[1]) {
                    date1 = moment(date1).set('minute', parseInt(csp[1]));
                }

                if (date > date1 && !data.isNextDay) {
                    // var cBasicStore = _.clone(this.basicStore);
                    data.endTime = moment(date).format("HH:mm");
                    // cBasicStore.storeDisEnd_Time = moment(date).format("HH:mm");
                    // this.$store.commit('setBasicStore', cBasicStore)
                    data.endTime = moment(date).format("HH:mm");
                } else if(date < date1 && data.isNextDay){
                    // var cBasicStore = _.clone(this.basicStore);
                    data.endTime = moment(date).format("HH:mm");
                    // cBasicStore.storeDisEnd_Time = moment(date).format("HH:mm");
                    data.isNextDay = 1;
                    // cBasicStore.storeDisNextDay = 1;
                    // this.$store.commit('setBasicStore', cBasicStore)
                    data.endTime = moment(date).format("HH:mm");
                }
            }
            if(type == 2){
                let tempList = _.clone(this.buyerDistributionList);
                var data = _.clone(tempList[t])
                tempList[t] = data;
                this.buyerDistributionList = tempList;
            }else{
                let tempList = _.clone(this.distributionList);
                var data = _.clone(tempList[t])
                tempList[t] = data;
                this.distributionList = tempList;
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
      //流上传
      multipleUploadReader(event){

        var isOne = false;
        var replaceImage = "offlinePayImage1";
        //只需要上传一张
        if((this.offlinePayImage1 && this.offlinePayImage1 != "") || (this.offlinePayImage2 && this.offlinePayImage2 != "")) {
          isOne = true;
          if (this.offlinePayImage1 && this.offlinePayImage1 != "") {
            //判断是哪张需要保存替换
            replaceImage = "offlinePayImage2"
          }
        }

          // if(event.target.files.length > 2){
          //     this.layer.msg("图片仅支持设置两张，已达上限");
          //     return;
          // }
          var vm = this

          if (event.target.files[0]) {
            var video1 = event.target.files[0];
            var file_tag1 = vm.metaData.key;
            var data1 = {key: '', file_tag: file_tag1, base64Str: video1, type: 2,is_suf:1}

            if (event.target.files[1] && !isOne) {

              var video2 = event.target.files[1];
              var file_tag2 = vm.metaData.key;
              var data2 = {key: '', file_tag: file_tag2, base64Str: video2, type: 2}

              var data = [data1, data2]

              fileUpload.multipleUploadFile(data).then((resp) => {

                if (resp[0]) {
                  var imagePath1 = vm.ImageIp + resp[0].data.responseContent.imgPath;
                  this.offlinePayImage1 = imagePath1;
                  this.updatePayImage(0, this.offlinePayImage1);
                  this.isZhifubaoCode = true;
                }
                if (resp[1]) {
                  var imagePath2 = vm.ImageIp + resp[1].data.responseContent.imgPath
                  this.offlinePayImage2 = imagePath2;
                  this.updatePayImage(1, this.offlinePayImage2);
                  this.isWechatCode = true;
                }
              })
            } else {
              var data = [data1];
              fileUpload.multipleUploadFile(data).then((resp) => {
                if (resp[0]) {
                  var imagePath1 = vm.ImageIp + resp[0].data.responseContent.imgPath;
                  if (replaceImage == "offlinePayImage1") {
                    this.offlinePayImage1 = imagePath1;
                    this.updatePayImage(0, this.offlinePayImage1);
                    this.isZhifubaoCode = true;
                  } else {
                    this.offlinePayImage2 = imagePath1;
                    this.updatePayImage(1, this.offlinePayImage2);
                    this.isWechatCode = true;
                  }
                }
              })
          }
        }
      },
    distanceValid(item,i){
            let value;
            if(i == 'distrReadyTime'){
                value = this.distrReadyTime;
            }else{
                let newItem = _.clone(item);
                value = newItem.distance
            }
            let t = value.charAt(0);
            if(value.length==1){
                value=value.replace(/[^1-9]/g,'')
            }else{
                if(t == '0'){
                    if(value.length == 1){
                        value = '';
                    }else{
                        value = value.substr(1);
                    }
                }
                value=value.replace(/\D/g,'')
            }
            if(i == 'distrReadyTime'){
                this.distrReadyTime = value;
            }else{
                item.distance = value;
            }
        },
        onlyNumber(item,i,type) {
            let newItem = _.clone(item);
            let value;
            if (this.timeType == 1) {
                if (type == 'half') {
                    value = newItem.half
                } else if (type == 'one') {
                    value = newItem.one
                } else if (type == 'two') {
                    value = newItem.two
                } else if (type == 'day') {
                    value = newItem.day
                } else if (type == 'twodays') {
                    value = newItem.twodays
                } else if (type == 'threedays') {
                    value = newItem.threedays
                } else if (type == 'other') {
                    value = newItem.other
                }
            } else {
                if (type == 'one') {
                    value = newItem.one
                } else if (type == 'two') {
                    value = newItem.two
                } else if (type == 'three') {
                    value = newItem.three
                } else if (type == 'four') {
                    value = newItem.four
                } else if (type == 'seven') {
                    value = newItem.seven
                } else if (type == 'other') {
                    value = newItem.other
                }
            }
            let t = value.charAt(0);
            //先把非数字的都替换掉，除了数字和.和-号    
            value = value.replace(/[^\d\.\-]/g, '');
            //前两位不能是0加数字      
            value = value.replace(/^0\d[0-9]*/g, '');
            //必须保证第一个为数字而不是.       
            value = value.replace(/^\./g, '');
            //保证只有出现一个.而没有多个.       
            value = value.replace(/\.{2,}/g, '.');
            //保证.只出现一次，而不能出现两次以上       
            value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
            //如果第一位是负号，则允许添加    
            value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            value = value.replace(/\-/g, "")
            if (t == '-') {
                if (value.length == 1) {
                    value = '';
                } else {
                    value = value.substr(1);
                }
            }
            if (this.timeType == 1) {
                if (type == 'half') {
                    item.half = value
                } else if (type == 'one') {
                    item.one = value
                } else if (type == 'two') {
                    item.two = value
                } else if (type == 'day') {
                    item.day = value
                } else if (type == 'twodays') {
                    item.twodays = value
                } else if (type == 'threedays') {
                    item.threedays = value
                } else if (type == 'other') {
                    item.other = value
                }
            } else {
                if (type == 'one') {
                    item.one = value
                } else if (type == 'two') {
                    item.two = value
                } else if (type == 'three') {
                    item.three = value
                } else if (type == 'four') {
                    item.four = value
                } else if (type == 'seven') {
                    item.seven = value
                } else if (type == 'other') {
                    item.other = value
                }
            }
        },
      formulaValid(){
          this.tableData.forEach((table,t)=>{
              if(t==0){
                  table.template_id = 'time'+t;
                  return;
              }
          })
          this.tableDataDay.forEach((table,t)=>{
              if(t==0){
                  table.template_id = 'day'+t;
                  return;
              }
          })
          let data = {
              qformula:this.timeType==1?JSON.stringify(this.tableData):JSON.stringify(this.tableDataDay),
              timeType:this.timeType
          }
          this.checkFormula(data).then((res)=>{
              if(this.timeType==1){
                  if(res.resultCode === 1){
                      this.formulaValidFlag = true;
                      this.formulaValidTips = '';
                  }else{
                      this.formulaValidFlag = false;
                      this.formulaValidTips = res.shortMessage;
                  }
              }else{
                  if(res.resultCode === 1){
                      this.dayFormulaValidFlag = true;
                      this.dayFormulaValidTips = '';
                  }else{
                      this.dayFormulaValidFlag = false;
                      this.dayFormulaValidTips = res.shortMessage;
                  }
              }
          })

      }
    },
    watch:{
        basicStore(){
            this.initData();
        }
    },
    mounted() {
       var _self = this;
        this.showPage = 1;
        var key = this.metaData.key;
        var data = {            
            key:key
        }
        this.getStoreSetting(data).then(()=>{
            this.initData();
        }) 
        this.getDistributionSet().then((res)=>{
            this.timeType = res.state;
            this.timeTypeShow = res.state;
            if(res.formula && res.formula.length >0){
                this.tableData = res.formula;
            }   else{
                this.tableData= [
                    {
                        "template_id":"time0",
                        "template_name":"默认配置",
                        "list":[
                            {
                                "distance":"other",
                                "half":"",
                                "one":"",
                                "two":"",
                                "day":"",
                                "twodays":"",
                                "threedays":"",
                                "other":""
                            }
                        ]
                    }
                ]
            }
            if(res.simple_formula && res.simple_formula.length >0){
                this.tableDataDay = res.simple_formula;
            }   else{
                this.tableDataDay= [
                    {
                        "template_id":"day0",
                        "template_name":"默认配置",
                        "list":[
                            {
                                "distance":"other",
                                "one":"",
                                "two":"",
                                "three":"",
                                "four":"",
                                "seven":"",
                                "other":""
                            }
                        ]
                    }
                ]
            }
        });
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
            if(_self.showRemark){
              //返回继续填写按钮
              _self.showRemark = false;
            }else{
              if(_self.showPage != 4){
                _self.submitData();
              }
            }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      //销毁键盘enter搜索事件
      document.body.removeEventListener('keyup', this.bodyListener);
        $("#guide-tips").off();
    }
}
