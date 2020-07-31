import * as _ from 'lodash';
import {mapGetters,mapActions} from 'vuex'
import QmDialog from 'component/qm-dialog/index';
import util from 'lib/utils/util'
import fileUpload from 'lib/utils/fileUpload'
import QmTable from 'component/qm-table/index';
import VueAMap from 'vue-amap';
import moment from 'moment';
import QRCode from 'qrcodejs2';
import env from "../../../config/url";
let amapManager = new VueAMap.AMapManager();

export default {
  name: "qm-store-table"  ,

  props:{
    is_portal:1
  },
  data(){
    return {
      bodyListener:'',
      layer:null,
      dialogVisible1:false,
      dialogVisibleTitle:'批量缴费',
      endDate:'',
      serviceFee:0,
      oldServiceFee:0,
      filterList:[],
      payType:1,
      qrcodeUrl:'',
      paySn:'',
      reApplyDialogShow:false,
      applyDialogShow:false,
      showItemDialog:false,

      curReApplyItem:{},
      curCategory:'',
      disabled:false,
      selectAllValue:false,
      discountTipsFlag:1,
      modalAppendToBody:false,
      hasImage:false,
      dialogImageVisible:false,
      dialogVisibleFalse:false,

      closeOnClickModal:false,
      imgWidth:520,
      imgUrl:'',
      serviceFeeDiscount:'',
      pageParams:{
        goods_name:'',
        member_name:'',
        evaluate_type:0,
        pageIndex:0,
        pageSize:10,
        total:0
      },
      reapplySignFlag :false,
      offReasonShowFlag :false,
      offReason:'',
      btnClick:{
        reApplySubmitBtn:false,
        serviceFeeSaveCommitBtn:false,
        changeToSignSubmitBtn:false,
      },
      deadlineTimeFlag :false,
      amapManager: amapManager,
      zoom: 15,
      resourcesHost:env.basePath,
      interval:false,
      center: [121.5273285, 31.21515044],
      events: {
        init: (o) => {
          o.getCity(result => {

          })
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          alert('map clicked');
        }
      },
      polygons: [
        {
          draggable: false,
          path: [[121.5273285, 31.21515044], [121.5293285, 31.21515044], [121.5293285, 31.21915044], [121.5273285, 31.21515044]],
          events: {
            click: () => {
            }
          }
        }
      ],
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init(o) {

          }
        }
      }],

      marker:
        {
          position: [121.5273285, 31.21515044],
          icon:  "//webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
        },


      count: 1,
          slotStyle: {
            padding: '2px 8px',
            background: '#eee',
            color: '#333',
            border: '1px solid #aaa'
          },
          zoom: 14,
          center: [121.5273285, 31.21515044],
          markers: [
            {
              position: [121.5273285, 31.21515044],
              events: {
                click: () => {
                  alert('click marker');
                },
                dragend: (e) => {
                  this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                }
              },
              visible: true,
              draggable: false,
              template: '<span>1</span>',
            }
          ],
          renderMarker: {
            position: [121.5273285, 31.21715058],
            contentRender: (h, instance) => {
              // if use jsx you can write in this
              // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
              return h(
                'div',
                {
                  style: {background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},
                  on: {
                    click: () => {
                      const position = this.renderMarker.position;
                      this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];
                    }
                  }
                },
                ['marker inner text']
              )
            }
          },
          componentMarker: {
            position: [121.5273285, 31.21315058],
          },
          slotMarker: {
            position: [121.5073285, 31.21715058]
          },


    }
  },
  computed:{
    ...mapGetters({
        metaData:'getMetaData',
        storeList:'getStoreList',
        storeInfo:'getStoreInfo',
        storeInfoFromClassList:'getStoreInfo',
        imagePathConfig:'getImagePathConfig',
        ImageIp:'getImageIp',
        payGcIds:'getPayGcIds',
        basicStore:'getBasicStore',
        menuList:'getMenuList',
        updateList:'getUpdateList',
      })
  },

  filters: {
    dateFormat: function (value) {
      if (!value) return ''
      value += ''
      if(value.length <= 10){
        value += '000';
      }
      return moment(parseInt(value)).format('YYYY-MM-DD HH:mm:ss');
    },
  },


  components: {
    QmDialog,
    QmTable
  },
  methods:{
    showImg(imgUrl){
        this.imgUrl = imgUrl;
        var imgData = imgUrl.split('.');
        var imgType = imgData[imgData.length-1]
        if(imgType){
          if(imgType == "jpg" || imgType == "jpeg" || imgType == "gif" || imgType == "png" || imgType == "bmp"){
            this.isHasImg(this.imgUrl).then((res)=>{
                this.hasImage = res;
                if(this.hasImage){
                    this.dialogImageVisible = true;
                }else{
                    this.dialogVisibleFalse = true;
                }
            });
          }else{
            window.open(this.imgUrl,"_self");
          }
        }
    },
    qrcode (text) {
        let qrCode =   new QRCode('wxqrcode',{
            width: 123, // 设置宽度，单位像素
            height: 123, // 设置高度，单位像素
            text: text // 设置二维码内容或跳转地址
        })
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

    onClick() {
      this.count += 1;
    },
    changePosition() {
      let position = this.markers[0].position;
      this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
    },
    chnageDraggle() {
      let draggable = this.markers[0].draggable;
      this.markers[0].draggable = !draggable;
    },
    toggleVisible() {
      let visableVar = this.markers[0].visible;
      this.markers[0].visible = !visableVar;
    },
    addMarker() {
      let marker = {
        position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
      };
      this.markers.push(marker);
    },
    removeMarker() {
      if (!this.markers.length) return;
      this.markers.splice(this.markers.length - 1, 1);
    },

    ...mapActions({
      calcServiceFee:'calcServiceFee',
      serviceFeeSave:'serviceFeeSave',
      aliPay:'aliPay',
      getServiceChargeState:'getServiceChargeState',
      changeToSign:'changeToSign',
      reChangeToSign:'reChangeToSign',
      getGoodsClassInfo:'getGoodsClassInfo',
      uploadFile:'uploadFile',
      getClassInfo:'getClassInfo',
      getClassList:'getClassList',
    }),

    getMap() {
      // amap vue component
      console.log(amapManager._componentMap);
      // gaode map instance
      console.log(amapManager._map);
    },

    selectAll(event){
      var newStoreList = _.clone(this.storeList);
      newStoreList.forEach((item,i) => {
        if(!item.disabled){
          if(event.target.checked){
            item.checked = true;
          }else{
            item.checked = false;
          }
        }
      });
      this.filterList = newStoreList.filter((item)=>{
        if(!item.disabled){
          if(item.checked){
            return item;
          }
        }
      })
      this.$store.commit('setStoreList',newStoreList);
    },

    clickRadioLabel(list,value){
      list.apply_state = value;
    },


    selectOne(item,i){
      var newStoreList = _.clone(this.storeList);
      newStoreList.forEach((item,i) => {
        if(!item.disabled){
            item.checked = false;
        }
      });
      newStoreList[i].checked = true;
      this.filterList = newStoreList.filter((item)=>{
        if(!item.disabled){
          if(item.checked){
            return item;
          }
        }
      })
      //bug8527
      var isAllSelect = true;
      newStoreList.forEach((res)=>{
        if(!res.disabled){
          if(!res.checked){
            isAllSelect = false;
          }
        }
      })
      this.selectAllValue = isAllSelect;
      this.$store.commit('setStoreList',newStoreList);
      this.betchRenewal('one');
    },

    serviceFeeSaveCommit(){
      var gc_ids = this.getGcIds();

      var date_r = this.endDate.match(/^(\d{4})(-)(\d{2})$/);
      // console.log(date_r);
      if(date_r==null){
          util.msg('请输入正确的日期格式XXXX-XX');
          return false;
      }
      var data = {
        endDate:this.endDate,
        gc_ids:gc_ids,
        pay_type:this.payType,
        aliReturn:window.location.href
      }


      this.btnClick.serviceFeeSaveCommitBtn = true;
      this. serviceFeeSave(data).then((resData)=>{
          this.btnClick.serviceFeeSaveCommitBtn = false;
          if(resData.resultCode === 1){
              let res = resData.responseContent
              if(res.payUrl){
                  this.qrcodeUrl = res.payUrl;
                  setTimeout(()=>{
                      this.qrcode(this.qrcodeUrl)
                  },100);
                  this.discountTipsFlag = 0
                  this.interval = setInterval(() => {

                      var data1 = {
                          paySn:res.paySn
                      }

                      this.getServiceChargeState(data1).then((result)=>{
                          if(result.resultCode == 1){
                              clearInterval(this.interval);
                              layer.msg('支付成功');
                              this.dialogVisible1 = false;
                              this.getClassList({is_portal:this.is_portal});
                          }
                      })
                  }, 1500);
                  return;
              }
              if(res.paySn){
                  this.paySn = res.paySn;
                  this.$refs.WIDout_trade_no.value = this.paySn;
                  this.$refs.aliReturn.value = window.location.href;
                  this.$refs.alipayment.submit();
                  var data1 = {
                      paySn:res.paySn
                  }
                  this.getServiceChargeState(data1).then(()=>{
                      if(result.status == 'success'){
                          clearInterval(this.interval);
                          layer.msg('支付成功');
                          if(curPage == 'home'){
                              this.$router.push("/home");//返回上一层
                          }else{
                              this.$router.push("/store/qm_store_class/base");//返回上一层
                          }

                      }
                  })
              }
          }else{
              layer.msg(resData.shortMessage);
          }

      })
    },


    logoLoad(event,item,file,f) {

      var key = this.metaData.key;
      var type = 3;
      var vm = this
      console.log('testFile');
      fileUpload.uploadFile(event,key,type,this.uploadFile).then(res => {
          var newFile = _.clone(file);
          newFile.intelligence = vm.ImageIp + res.imgPath;
          item.need_file[f] = newFile;

          var newItem = _.clone(item);
          newItem.need_file[f] = newFile;
          this.curCategory = newItem;
          layer.msg('上传成功');
      })
  },

  deleteIntelligence(event,item,file,f){

    event.stopPropagation();
    event.preventDefault();

    var newFile = _.clone(file);
    newFile.intelligence = '';

    var newItem = _.clone(item);
    newItem.need_file[f] = newFile;
    this.curCategory = newItem;

     event.stopPropagation();
  },

  reApplySubmit(){
      var classList = [];
      var typeList = [];
      var intelligenceList = [];
      var data= {

      }
      classList.push(this.curReApplyItem.gc_id+'');
      typeList.push(this.curReApplyItem.class_style+'');
        if(this.curCategory.need_file){
          this.curCategory.need_file.forEach((res,r)=>{
              data['intelligence_'+this.curReApplyItem.gc_id+'_'+r] = res.intelligence?res.intelligence.replace(this.ImageIp+this.imagePathConfig.Register,''):'';
          })
        }

      data.class_style = this.curCategory.class_style
      data.class=classList;
      data.type=typeList;
      data.gc_id=this.curReApplyItem.gc_id+'';
      this.btnClick.reApplySubmitBtn = true;


      this.reChangeToSign(data).then((res)=>{
        if(res.resultCode == 1){
          layer.msg(res.longMessage);
          this.btnClick.reApplySubmitBtn = false;
          this.reApplyDialogShow = false;
          this.getClassList({is_portal:this.is_portal});
        }else{
          layer.msg(res.longMessage);
          this.btnClick.reApplySubmitBtn = false;
        }
      });

    },

    changeToSignSubmit(){

      var data = {};
      var classList = [];
      classList.push(this.curReApplyItem.gc_id+"");
      data.gc_id = this.curReApplyItem.gc_id;
      data.class = classList;
      var fileAll = true;
      if(this.curReApplyItem.need_file){
        this.curReApplyItem.need_file.forEach((res,r)=>{
          if(res.intelligence && res.intelligence !=""){
            data['intelligence_'+this.curCategory.gc_id+'_'+r] = res.intelligence?res.intelligence.replace(this.ImageIp+this.imagePathConfig.Register,''):'';
          }else{
            // data['intelligence_'+this.curCategory.gc_id+'_'+r] = this.curReApplyItem.file_name[res.name]
            fileAll = false;
          }
        })
      }
      if(!fileAll){
        util.msg("经营分类所需的资质文件不能为空");
        return
      }
      this.btnClick.changeToSignSubmitBtn = true;
      this.changeToSign(data).then((res)=>{
        this.btnClick.changeToSignSubmitBtn = false;
        util.msg(res.longMessage);
        this.applyDialogShow = false;
        this.getClassList({is_portal:this.is_portal});
      })
    },

    betchRenewal(type){
      if(this.interval!=null){
          window.clearInterval(this.interval);
      }
      if(type == 'one'){
        this.dialogVisibleTitle = '缴费';
      }else{
        this.dialogVisibleTitle = '批量缴费';
      }
      if(!this.checkSelect()){
        layer.msg('请选择需要续费的签约分类！');
        return;
      }
      this.discountTipsFlag = 1
      //判断默认签约时间
      this.endDate = this.getEndDate();
      //获取gcids
      var gc_ids = this.getGcIds();
      var data = {
        endDate:this.endDate,
        gc_ids:gc_ids
      }

      this.calcServiceFee(data).then((res)=>{
          if(res.resultCode == 1){
            this.serviceFee = res.responseContent.totalFee;
            this.oldServiceFee = res.responseContent.oldTotalFee;
            this.qrcodeUrl = ''
            this.paySn = ''
            this.dialogVisible1 = true;
            this.$nextTick(()=>{
              var vm = this;
              layui.use('laydate', function(){
                var laydate = layui.laydate;
                laydate.render({
                    elem: '#endDate',
                    theme: "#ff8519",
                    type: 'month',
                    value: new Date(vm.endDate),
                    trigger:'click',
                    done:function(data){
                      vm.btnClick.serviceFeeSaveCommitBtn = false;
                      vm.endDate = data;
                      vm.reCalcServiceFee();
                    } 
                  });                
              })
            })
            this.serviceFeeDiscount = res.responseContent.serviceFeeDiscount
            this.filterList.forEach((gc)=>{
                let feeObj = res.responseContent.list[gc.gc_id];
                gc.gc_old_fee = feeObj.gc_old_fee;
                gc.gc_fee = feeObj.gc_fee;
                gc.timeTips = feeObj.timeTips;
                gc.discountTips = feeObj.discountTips;
            })
            this.btnClick.serviceFeeSaveCommitBtn = false;
          }else{
            this.btnClick.serviceFeeSaveCommitBtn = true;
            layer.msg(res.longMessage);
          }

      })

    },

    closeFee(){
      this.dialogVisible1 = false
    },

    autoComplete(){
      // $("#endDate").attr("autocomplete","on")
    },
    reCalcServiceFee(){

      // $("#endDate").attr("autocomplete","off")
        var date_r = this.endDate.match(/^(\d{4})(-)(\d{2})$/);
        if(date_r==null){
            //util.msg('请输入正确的日期格式XXXX-XX');
            return false;
        }

        var gc_ids = this.getGcIds();
        var data = {
            endDate:this.endDate,
            gc_ids:gc_ids
        }
        console.log(data,"data");
        this.calcServiceFee(data).then((res)=>{
            if(res.resultCode == 1){
                this.serviceFee = res.responseContent.totalFee;
                this.oldServiceFee = res.responseContent.oldTotalFee;
                this.qrcodeUrl = '',
                this.paySn = '',
                    // this.dialogVisible1 = true;
                this.filterList.forEach((gc)=>{
                    let feeObj = res.responseContent.list[gc.gc_id];
                    gc.gc_old_fee = feeObj.gc_old_fee;
                    gc.gc_fee = feeObj.gc_fee;
                    gc.timeTips = feeObj.timeTips;
                    gc.discountTips = feeObj.discountTips;
                })
                this.btnClick.serviceFeeSaveCommitBtn = false;
            }else{
                layer.msg(res.longMessage);
                this.btnClick.serviceFeeSaveCommitBtn = true
            }

        })
    },
    applyDialog(item,i){
      if(this.storeInfoFromClassList.canModifyFlag==0){
          layer.msg('您的合同已到期，请及时与平台续签合同');
          return;
      }
      this.curReApplyItem = item;
      var data = {
        gc_id:item.gc_id
      }
      this.getClassInfo(data).then((res)=>{
        this.curCategory = res;
        this.curCategory.need_file.forEach((file)=>{
          file.intelligence = this.ImageIp+this.imagePathConfig.Register+file.file_name
        })
        this.curReApplyItem = res;
        this.curReApplyItem.need_file.forEach((file)=>{
          file.intelligence = this.ImageIp+this.imagePathConfig.Register+file.file_name
        })
      })
      this.applyDialogShow = true;
    },

    reApplyDialog(item,i){
        this.reapplySignFlag = false;
        this.offReasonShowFlag = false
        this.offReason = ''
      if(this.storeInfoFromClassList.canModifyFlag==0){
          layer.msg('您的合同已到期，请及时与平台续签合同');
          return;
      }
      this.curReApplyItem = item;
      var data = {
        gc_id:item.gc_id
      }
      this.getClassInfo(data).then((res)=>{
        res.class_style = this.curReApplyItem.class_style
        this.curCategory = res;
        this.curCategory.need_file.forEach((file)=>{
            file.intelligence = ''
            if(file.file_name!=null&&file.file_name!=''){
                file.intelligence = this.ImageIp+this.imagePathConfig.Register+file.file_name
            }
        })
        this.curReApplyItem = res;
        this.curReApplyItem.need_file.forEach((file)=>{
            file.intelligence = ''
            if(file.file_name!=null&&file.file_name!=''){
                file.intelligence = this.ImageIp+this.imagePathConfig.Register+file.file_name
            }
        })
      })
        if(this.curReApplyItem&&this.curReApplyItem.id &&this.curReApplyItem.is_charged == 1){
            this.reapplySignFlag = true;
        }
        if(this.curReApplyItem.apply_class&&this.curReApplyItem.apply_class.off_reason){
          this.offReasonShowFlag = true;
          this.offReason = this.curReApplyItem.apply_class.off_reason;
        }else if(this.curReApplyItem.off_reason){
            this.offReasonShowFlag = true;
            this.offReason = this.curReApplyItem.off_reason;
        }
      this.reApplyDialogShow = true;
    },

    selectChange(event,i){

      var newStoreList = _.clone(this.storeList);
      if(event.target.checked){
        newStoreList[i].checked = true;
        var isAllSelect = true;
        newStoreList.forEach((res)=>{
          if(!res.disabled){
            if(!res.checked){
              isAllSelect = false;
            }
          }
        })
        if(isAllSelect){
          this.selectAllValue = true;
        }

      }else{
        newStoreList[i].checked = false;
        this.selectAllValue = false;
      }

      this.filterList = newStoreList.filter((item)=>{
        if(!item.disabled){
          if(item.checked){
            return item;
          }
        }
      })

      this.$store.commit('setStoreList',newStoreList);
    },

    getDeadDay(deadline){
      var startTime=Date.parse(new Date());
      var endTime=Date.parse(new Date(deadline));
      var day = (endTime-startTime)/1000/3600/24 ;

      return Math.ceil(day);
    },

    getGcIds(){
      var ids = '';
      this.filterList = this.storeList.filter((item)=>{
        if(!item.disabled){
          if(item.checked){
            return item;
          }
        }
      })
      ids = this.filterList.map((item)=>{return item.gc_id}).join(",");
      return ids;
    },
    checkSelect(){
      var isSelect = false;
      var newStoreList = _.clone(this.storeList);
      newStoreList.forEach((item,i) => {
        if(!item.disabled){
          if(item.checked){
            isSelect = true;
          }
        }
      });
      return isSelect;
    },

    getEndDate(deadline){
      var date = 0;
      var newStoreList = _.clone(this.storeList);
      newStoreList.forEach((item,i) => {

        if(!item.disabled){
          if(item.checked){
            if(item.deadline && item.deadline != 0 || item.deadline !=""){
              var dateDeadLine = item.deadline;
              if(date != 0){
                  if(Date.parse(item.deadline) > Date.parse(date)){
                    date = item.deadline;
                  }
              }else{
                date = item.deadline;
              }
            }
          }
        }
      });
      if(date == 0){
        if(this.basicStore.storeEndTime < 10000000000){
          date = this.basicStore.storeEndTime *1000;
        }else{
          date = this.basicStore.storeEndTime;
        }
      }


      var newDate = new Date(date);
      if(Date.parse(newDate) < Date.parse(new Date())){
        newDate = new Date();
      }
      if(this.isLastDay(newDate)){
        newDate = moment(newDate).add(1,"M");
      }else{
        newDate = moment(newDate).endOf("month");
      }
      // newDate.setDate(20);
      // newDate.setMonth(newDate.getMonth()+1)
      var defaultEndDate = moment(newDate).format('YYYY-MM');
      return defaultEndDate;
    },

    isLastDay(dt) {
        return new Date(dt.getTime() + 86400000).getDate() === 1;
    },
    getDeadDayFormat1(item){

    },
    getDeadDayFormat(deadline,class_style){
      var time = "-";
      if(class_style==1){
          return time;
      }
      if(deadline){
        time = deadline;
        time = moment(time).format('YYYY-MM-DD HH:mm:ss');

      }else if(this && this.basicStore && this.basicStore.storeEndTime){
        time = parseInt(this.basicStore.storeEndTime)*1000;
        time = moment(new Date(parseInt(time))).format('YYYY-MM-DD HH:mm:ss');
      }
      if(time=='-'){
          this.deadlineTimeFlag = false;
      }
      return time;
    },

    toFix0(value) {
      return parseFloat(value+'').toFixed(0);
    },

    getNeedFileLength(needFile){
      var length = 0;
      if(needFile){
        if(needFile.length%2 == 0){
          length = Math.floor(needFile.length/2);
        }else{
          length = Math.floor(needFile.length/2) + 1;
        }
      }
      return length;
    },

    showItemDetail(item,i){

      this.showItemDialog = true;
      this.curCategory = item;

      var sign_scope = item.sign_scope !=null && item.sign_scope != ''?JSON.parse(item.sign_scope):[];
      var polygonsPath = [];

      var max_lat=0,min_lat=0;
      var max_Lng=0,min_lng=0;

      sign_scope.forEach((scope,s)=>{
        if(s == 0){
          max_lat = scope.M;
          min_lat = scope.M;
          max_Lng = scope.O;
          min_lng = scope.O;
        }else{
          if(scope.M > max_lat) max_lat = scope.M;
          if(scope.M < min_lat) min_lat = scope.M;

          if(scope.O > max_Lng) max_Lng = scope.O;
          if(scope.O < min_lng) min_lng = scope.O;
        }

        let item = [scope.M,scope.O];
        polygonsPath.push(item);
      })

      // this.center = [(max_lat + min_lat)/2,(max_Lng + min_lng)/2];
      this.center = [this.basicStore.storeLongitude,this.basicStore.storeLatitude];
      this.marker.position = [this.basicStore.storeLongitude,this.basicStore.storeLatitude];
      var newPolygons = _.clone(this.polygons);
      newPolygons[0].path = polygonsPath;
      this.polygons = newPolygons;

    },
    open(){
      if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
        $("html").css("overflow","hidden");
        $(".main").css("marginRight","18px");
        $(".header").css("width","calc(100% - 16px )");
      }
    },
    close(){
      if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
        $("html").css("overflow","auto")
        $(".main").css("marginRight","0px");
        $(".header").css("width","calc(100% - 0px)");
      }
    },

  },
  watch:{
    dialogImageVisible(){
      var dragDom = document.querySelectorAll(".el-dialog");
      dragDom.forEach((el)=>{
        console.log(el)
        el.style.left = 0;
        el.style.top =0

      })

    },
    storeList(){
      this.pageParams.total = this.storeList.length;
      let tempPageParams = _.clone(this.pageParams);
      this.pageParams = tempPageParams
    },

    updateList:function(){
        if(this.selectAllValue){
          $("#all").click();
        }
    },
    dialogVisible1:function(){
        if(this.dialogVisible1==false){
            if(this.interval){
                clearInterval(this.interval)
            }
        }
    }
  },

  mounted() {
    var _self = this;
    layui.use('layer', function(){
      this.layer = layui.layer;
    });
    $("input[type='checkbox']").attr('ondblclick', 'this.click()');
    //body绑定键盘enter搜索事件
    _self.bodyListener = (e) => {
      if (e.keyCode === 13){
        if(_self.applyDialogShow && !_self.btnClick.changeToSignSubmitBtn){
          _self.changeToSignSubmit();
        }else if(_self.dialogVisible1 && !_self.btnClick.serviceFeeSaveCommitBtn && !_self.qrcodeUrl){
          //批量缴费
          _self.serviceFeeSaveCommit();
        }else if(_self.reApplyDialogShow && !_self.btnClick.reApplySubmitBtn){
          //重新申请分类
          _self.reApplySubmit();
        }else if(_self.showItemDialog){
          //分类详情
          _self.showItemDialog = false;
        }
      }
    }
    document.body.addEventListener('keyup', _self.bodyListener, false);
  },
  beforeDestroy(){
    //销毁键盘enter搜索事件
    document.body.removeEventListener('keyup', this.bodyListener);
  },
  beforeUpdate() {
    $("input[type='checkbox']").attr('ondblclick', 'this.click()');
  },
}
