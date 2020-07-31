import QmCheckboxFrame from 'component/qm-checkbox-frame/index';
import QmTimepickers from 'component/qm-timepickers/index';
import {mapGetters,mapActions} from 'vuex';
import QmTips from 'component/qm-tips/index';
import QmDialog from 'component/qm-dialog/index';
import util from 'lib/utils/util';
import moment from 'moment';

export default {
    name: "store-store-setting-distribution",
    data (){
        return {
          tipMessage:false,//操作完成倒计时关闭弹框
          errorMsg:'',//弹框错误提示语
            buyerDistribution:false,
            distrReadyTime:30,
            sellerDistribution:false,
            storeDisDayIs:false,
            storeDisNextDay :false,
            storeDisSta_Time:'',
            storeDisEnd_Time:'00:00:00',            
            freeShippingPrice : '',
            freeShippingPriceIs : false,
            startShippingPriceIs : false,
            deliveryMemo:'',
            startShippingPrice : '',
            dialog1:false,
            dialogMessage1:'请选择需要操作的记录',
            dialogTitle1:'提示信息',
            dialog2:false,
            automaticDeliveryClerkDay:0,
            minAutomaticDeliveryClerkDay:0,
            orderReceiveAutoEvalDay:0,
            minOrderReceiveAutoEvalDay:0,
            formulaValidFlag:true,
            formulaValidTips:'',
            btnClick:{
                distributionSubmitBtn:false
            },

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
            distributionList:[
                {startTime:'',endTime:'',isNextDay:false}
            ],
            maxTime:'00:00:00',
            minTime:'',
            distributionListErr :false,
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
            addNextDayFlag:true
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
            basicStore:'getBasicStore',

        })
      },

        methods:{

            ...mapActions({
                getDistributionSet:'getDistributionSet',
                distributionSet:'distributionSet',
                getStoreSetting:'getStoreSetting',
                checkFormula:'checkFormula'
              }),

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
                      let timestamp = new Date().getTime();
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
              delDistribution(t ,type){
                  if(type == 2){
                      this.buyerDistributionList.splice(t,1);
                  }else{
                      this.distributionList.splice(t,1)
                  }
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
              setMinStart(data,l ,type){
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
                if(data.startTime && data.startTime !='00:00:00'){
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
              distributionSubmit(){
                if(this.formulaValidFlag==false){
                    this.goAnchor("#storeDisDayIs")
                    return;
                }
                if(this.dayFormulaValidFlag == false){
                    this.goAnchor('#distributionDiv')
                    return;
                }
                if(!this.sellerDistribution && !this.buyerDistribution){
                    return;
                }
                if(this.buyerDistribution){
                    if(!(this.distrReadyTime&&this.distrReadyTime>0)){
                        util.msg('自提时配货时长不能为空');
                        return ;
                    }
                }
                if(this.automaticDeliveryClerkDay==''||this.automaticDeliveryClerkDay==0){
                    util.msg('请设置配送订单自动确认收货时间');
                    return ;
                }else if(this.automaticDeliveryClerkDay<this.minAutomaticDeliveryClerkDay){
                    util.msg('自动收货时间不能小于'+this.minAutomaticDeliveryClerkDay+'天');
                    return ;
                }else {
                    if(!/^\d+$/.test(this.automaticDeliveryClerkDay)){
                        util.msg('配送订单自动确认收货时间必须为大于0的整数');
                        return;
                     }
                }
                this.btnClick.distributionSubmitBtn = true;
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
                // var qformula = this.tableData;
                  var data = {
                    buyerDistribution:this.buyerDistribution?1:0,
                    storeDecorationSwitch:this.distrReadyTime,
                    sellerDistribution:this.sellerDistribution?1:0,
                    storeDisDayIs:this.storeDisDayIs?1:0,
                    storeDisNextDay:this.storeDisNextDay?1:0,
                    distributionList:JSON.stringify(this.distributionList),
                    buyerDistributionList:JSON.stringify(this.buyerDistributionList),
                    storeTimeIs:this.storeTimeIs?1:0,
                    qformula:JSON.stringify(this.tableData),
                    dayqformula:JSON.stringify(this.tableDataDay),
                    timeType:this.timeTypeShow,
                    freeShippingPriceIs:this.freeShippingPriceIs?1:0,
                    freeShippingPrice:this.freeShippingPrice,
                    startShippingPriceIs:this.startShippingPriceIs?1:0,
                    startShippingPrice:this.startShippingPrice,
                      automaticDeliveryClerkDay:this.automaticDeliveryClerkDay,
                  deliveryMemo:this.deliveryMemo
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
                  if(this.sellerDistribution&&(!this.storeDisDayIs && (this.distributionListErr))){
                        this.goAnchor("#storeDisDayIs")
                        return;
                  }

                  if(this.buyerDistribution&&(!this.storeTimeIs && (this.buyerDistributionListErr))){
                      this.goAnchor("#storeTimeIs")
                      return;
                  }

                  this.distributionSet(data).then((res)=>{

                      if(res.resultCode === 1){
                        this.btnClick.distributionSubmitBtn = false;
                        util.msg("设置成功")
                      }else{
                        util.msg(res.longMessage)
                      }
                  })
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

              tipSendFee(){
                this.dialog2 = true;
              },

              // 是否选中次日
              isNextDay1(data,l, type ){
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
                  this.automaticDeliveryClerkDay = this.basicStore.automaticDeliveryClerkDay;
                  this.minAutomaticDeliveryClerkDay = this.basicStore.minAutomaticDeliveryClerkDay;
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
            distanceValid(item,i){
                let value;
                if(i == 'distrReadyTime') {
                    value = this.distrReadyTime;
                }else if(i=='automaticDeliveryClerkDay'){
                    value = this.automaticDeliveryClerkDay;
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
                }else if(i=='automaticDeliveryClerkDay'){
                     this.automaticDeliveryClerkDay=value;
                }else{
                    item.distance = value;
                }
            },
            onlyNumber(item,i,type){
                let newItem = _.clone(item);
                let value ;
                if(this.timeType == 1){
                    if(type=='half'){
                        value = newItem.half
                    }else if(type=='one'){
                        value = newItem.one
                    }else if(type=='two'){
                        value = newItem.two
                    }else if(type=='day'){
                        value = newItem.day
                    }else if(type=='twodays'){
                        value = newItem.twodays
                    }else if(type=='threedays'){
                        value = newItem.threedays
                    }else if(type=='other'){
                        value = newItem.other
                    }
                }else{
                    if(type=='one'){
                        value = newItem.one
                    }else if(type=='two'){
                        value = newItem.two
                    }else if(type=='three'){
                        value = newItem.three
                    }else if(type=='four'){
                        value = newItem.four
                    }else if(type=='seven'){
                        value = newItem.seven
                    }else if(type=='other'){
                        value = newItem.other
                    }
                }
                let t = value.charAt(0);
                //先把非数字的都替换掉，除了数字和.和-号    
                value = value.replace(/[^\d\.\-]/g,'');
                //前两位不能是0加数字      
                value = value.replace(/^0\d[0-9]*/g,'');
                //必须保证第一个为数字而不是.       
                value = value.replace(/^\./g,'');
                //保证只有出现一个.而没有多个.       
                value = value.replace(/\.{2,}/g,'.');
                //保证.只出现一次，而不能出现两次以上       
                value = value.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                //如果第一位是负号，则允许添加    
                value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                value =  value.replace(/\-/g,"")
                if(t == '-'){
                    if(value.length == 1){
                        value = '';
                    }else{
                        value = value.substr(1);
                    }
                }
                if(this.timeType == 1){
                    if(type=='half'){
                        item.half = value
                    }else if(type=='one'){
                        item.one = value
                    }else if(type=='two'){
                        item.two = value
                    }else if(type=='day'){
                        item.day = value
                    }else if(type=='twodays'){
                        item.twodays = value
                    }else if(type=='threedays'){
                        item.threedays = value
                    }else if(type=='other'){
                        item.other = value
                    }
                }else{
                    if(type=='one'){
                        item.one = value
                    }else if(type=='two'){
                        item.two = value
                    }else if(type=='three'){
                        item.three = value
                    }else if(type=='four'){
                        item.four = value
                    }else if(type=='seven'){
                        item.seven = value
                    }else if(type=='other'){
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
        mounted(){
            var key = this.metaData.key;
            var data = {
                key:key
            }
            this.getStoreSetting(data).then(()=>{

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
            // this.getStoreSetting().then(()=>{
                this.initData();
            // })  
        },


        watch:{
            basicStore(){
                this.initData();
            }
    
          },
          
          beforeRouteEnter(to, from, next){
            // if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
            //     if(to.name == "distribution"){
            //         $('body').on("DOMNodeRemoved", function (event) {
            //             var dialog = $(".el-dialog__wrapper");
            //             var openDialog = false;
            //             for(let i=0;i<dialog.length;i++){
            //             if($(dialog[i]).css("display") == "block"){
            //                 openDialog = true;
            //             }
            //             }
            //             if(window.location.href.indexOf("distribution") != -1){
            //                 if(!openDialog){
            //                     event.preventDefault();
            //                     var rch = event.target.clientHeight;
            //                     var csp = window.document.documentElement.scrollTop;
            //                     window.scrollTo(0, csp - rch);
            //                 } 
            //             } 
            //         });
            //     }
            // }
            next()
        }  ,
        beforeRouteLeave(to, from, next){

            next()
          },
}
