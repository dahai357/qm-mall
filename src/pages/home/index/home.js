
  import {mapGetters,mapActions} from 'vuex'
  import * as _ from 'lodash';
  import QmCount from '../../../components/qm-count/index';
  import QmButtonTip from '../../../components/qm-button-tip/index';
  import QmTabs from '../../../components/qm-tabs/index';
  import QRCode from 'qrcodejs2'
  import QmStoreTable from 'component/qm-store-table/index';
  import QmDialog from 'component/qm-dialog/index';
  import QmTips from 'component/qm-tips/index';
  import fileUpload from 'lib/utils/fileUpload.js';
  import util from 'lib/utils/util';
  import storage from 'lib/utils/storage';
  import env from "config/url";
  import {home} from 'api'

  export default {
    name: 'home-index',
    components: {
      QmCount,
      QmButtonTip,
      QmTabs,
      QmStoreTable,
      QmDialog,
      QmTips
    },
    data () {
      return {
        bodyListener:'',
        helps:{
          shop:{name:'商城公告',select:true,act:'shop'},
          help:{name:'帮助中心',act:'help'},
        },
        helpRouter:'shop',
        is_portal:1,
        dialogDeadLine:false,

        returnDialog:false,

        dialog1:false,
        dialogMessage1:'保证金退回成功',
        dialogTitle1:'提示信息',
        isQrcodeExist:false,
        isQrcode1Exist:false,
        storeLabel:'',

        payDialog:false,
        curPayInfo:{
            platform_account:''	,
            platform_account_user	:''	,
            platform_account_name	:'',
            leftAmount:0,
            path:''
        },
        moduleShowFlag :0,
        modalAppendToBody:false,
        closeOnClickModal:false,
        isShowedDeadline:false,
        downloadSrc:'',
      };
    },
    filters: {
      timeFormat (time) {
        return format(new Date(time), 'YYYY-MM-DD HH:mm')
      },
    },

    created( ){

    },

    beforeDestroy () {

    },
    watch:{
      basicStore(){
        if(this.basicStore.storeLabel && this.basicStore.storeLabel != ''){
          this.storeLabel = this.basicStore.storeLabel;
        }
      }
    },

    filters: {
      dateFormat: function (value) {
        if (!value) return ''
        value += ''
        if(value.length <= 10){
          value += '000';
        }
        return util.dateFormat(new Date(parseInt(value)),"yyyy-MM-dd HH:mm:ss");
      },
      nativef2y: function (value) {
        if(isNaN(parseFloat(value))){
          return "0.00";
        }else{
          return parseFloat(value).toFixed(2);
        }
      },
      moneyFormat: function (value) {
        if(value >= 100000000){
          //上亿的 用亿做单位
          return (value/100000000).toFixed(2);
        }
        if(value < 100000000 && value >= 1000000){
          //上百万的用万做单位
          return (value/10000).toFixed(2);
        }
        return value;
      },
    },

    computed:{
      ...mapGetters({
          sellerInfo:'getSellerInfo',
          metaData:'getMetaData',
          tips:'getTips',
          articleList:'getArticleList',
          helpCenter:'getHelpCenter',
          statistics:'getStatistics',
          basicStore:'getBasicStore',
          storeInfo:'getStoreInfo',
          storeList:'getStoreList',
          deadLine:'getDeadLine',
          deposit_flag:'getDeposit_flag',
          storeEndTime:'getStoreEndTime',
          ImageIp:'getImageIp',
          imagePathConfig:'getImagePathConfig',
          imageType:'getImageType',
          menuList:'getMenuList',
          
          proLsit:'proLsit',
        }),

        isTotalMoreThan(){
          var isMoreThan = parseFloat(this.storeInfo.total_deposit) > parseFloat(this.storeInfo.cashed_deposit);
          return isMoreThan;
      },

      isCashedMoreThan(){
          var isMoreThan = parseFloat(this.storeInfo.total_deposit) < parseFloat(this.storeInfo.cashed_deposit);
          return isMoreThan;
      },
      getReturnMoney(){
          var returnMoney = parseFloat(this.storeInfo.cashed_deposit) - parseFloat(this.storeInfo.total_deposit);
          return returnMoney.toFixed(2);
      },
      getStoreName(){
        return this.sellerInfo.storeName.subString(0,7);
      },
    },
    methods: {
      ...mapActions({
        getProList:'getProList',
          getCountData:'getCountData',
          getStoreSetting:'getStoreSetting',
          getClassList:'getClassList',
          getHomeData:'getHomeData',
          depositReturn:'depositReturn',
          getDepositInfo:'getDepositInfo',
          uploadFile:'uploadFile',
          depositSave:'depositSave',
          getStoreSetting:'getStoreSetting',

        }),
      showCode(ref,opt){
        if(1 === opt){
          ref.classList.add('hover')
        }else{
          ref.classList.remove('hover')
        }

      },
      downCode(imgsrc,direct){

        if(1 === direct){
          window.open(imgsrc, '_blank');
        }else{
          window.open(env.basePath+'/Viewer/getImage?url='+encodeURIComponent(imgsrc));
        }
      },
        async getData(){
          var key = this.metaData.key;
        var data = {
            key:key,
            is_portal:1
        }
        this.getHomeData(data).then(()=>{
            //this.qrcode(this.basicStore.store_qrcode_url);
            this.showDeadLine();
          })
        },
        gotoOrder(url){
          storage.set('portal_wait_pay',1);
          this.$router.push(url);
        },
        getDeadDay(deadline){
          var startTime=Date.parse(new Date());
          var endTime=Date.parse(new Date(deadline));
          var day = (endTime-startTime)/1000/3600/24 ;

          return Math.ceil(day);
        },

        goOpen(flag){
          if(flag == 1){
            this.doRouter('/store/store_setting/store_setting')
          }else{
            this.doRouter('/store/store_setting/store_switch')
          }
        },

        doRouter(url){
            this.$router.push(url);
        },
        getStoreState(basicStore){
          var storeStateLabel = "打烊";
          if(basicStore.openFlag == 1){

            if(basicStore.storeOpenDisDayIs == 1){
              storeStateLabel = '营业中';
            }else{
              var startTime = basicStore.storeStartTime;
              var closeTime = basicStore.storeCloseTime;

              var myDate = new Date();
              var date = myDate.toDateString();
              var timestamp = myDate.getTime();
              var timestampStart = (new Date(date+' '+startTime+':00')).getTime();
              var timestampClose = (new Date(date+' '+closeTime+':00')).getTime();
              if(startTime==='00:00' && closeTime==='00:00'){
                storeStateLabel = '营业中';
              }else if(timestamp > timestampStart){
                  if( timestamp < timestampClose || timestampStart > timestampClose){
                    storeStateLabel = '营业中';
                  }
              }
            }
          }else{
            storeStateLabel = "未开业"
          }
          return storeStateLabel;
        },
        routerMore(){
          if(this.helpRouter == 'shop'){
            this.doRouter("/article/index");
          }else{
            this.doRouter("/help_center/index");
          }
        },

        routerData(event){
          this.helpRouter = event.key;
        },

        returnCash(){
          this.returnDialog = true;
      },

      localImgLoad(event) {

        var key = this.metaData.key;
        var type = this.imageType.IMG_DEPOSIT;

        fileUpload.logoLoad(event,key,type,this.uploadFile).then(res => {

            var newCurPayInfo = _.clone(this.curPayInfo);
            var imagePath = this.ImageIp + res.imgPath;
            newCurPayInfo.path = res.imgPath.replace(this.imagePathConfig.deposit,'');
            newCurPayInfo.imageUrl = imagePath;
            this.curPayInfo = newCurPayInfo;
        })
    },

      changeHomeMenu(menu,m,i){
        var newHomeMenus = _.clone(this.helps);
        for (const key in newHomeMenus) {
          if (newHomeMenus.hasOwnProperty(key)) {
            newHomeMenus[key].select = false;
          }
        }
        newHomeMenus[m].select = true;
        this.helps = newHomeMenus;
      },

      sureReturn(){
          this.depositReturn().then((res)=>{
              this.returnDialog = false;
              if(res.resultCode == 1){
                  // this.dialog1 = true;
                  util.msg("保证金退回成功");
                  this.getData();
              }else{
                  this.layer.msg(res.longMessage)
                  this.getData();
              }
          })
      },
      closeDeadline(){
        this.dialogDeadLine = false;
        storage.set('isShowedDeadline',1);
      },
      showDeadLine(){
        this.isShowedDeadline = storage.get('isShowedDeadline');
        if(this.storeEndTime>0){
            this.dialogDeadLine = true;
        }else if(this.deadLine > 0){
          this.dialogDeadLine = true;
        }
      },

      qrcode (text) {
        if(this.isQrcodeExist){
          return;
        }else{
          let qrcode = new QRCode('qrcode',{
            width: 70, // 设置宽度，单位像素
            height: 70, // 设置高度，单位像素
            text: text // 设置二维码内容或跳转地址
            })
            this.isQrcodeExist = true;
            $("#qrcode").attr("title","");
        }
        if(this.isQrcode1Exist){
          return;
        }else{
          let qrcode1 = new QRCode('qrcode1',{
              width: 160, // 设置宽度，单位像素
              height: 160, // 设置高度，单位像素
              text: text // 设置二维码内容或跳转地址
            })
            this.isQrcode1Exist = true;
            $("#qrcode1").attr("title","");
        }
      },

      payDialogOpen(){
        this.getDepositInfo().then((res)=>{
            if(res.resultCode == 1){
                this.curPayInfo = res.responseContent
                if(!this.curPayInfo.path){
                    this.curPayInfo.path = '';
                }
                this.payDialog = true;
            }else{
                util.msg(res.longMessage);
            }
        })

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
        this.$store.commit('setStoreList',newStoreList);
      },

      depositSaveSure(){
        if(!this.curPayInfo.path || this.curPayInfo.path ==''){
              this.layer.msg('缴纳保证金凭证不能为空');
              return;
          }
          var data = {
              deposit_store_image:this.curPayInfo.path
          }
          this.depositSave(data).then((res)=>{
              this.layer.msg("操作成功");
              this.payDialog  = false;
              this.getStoreSetting();
              this.getData();
          })
      },

      openHelp(url){
        let routeData = this.$router.resolve({
            path: url,
        });
        window.open(routeData.href, '_blank');

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
    created(){
      // this.getData();
    },
    beforeMount(){
      this.getData();
    },
    mounted () {
      var _self = this;
      // this.getData();
      this.helps = {
        shop:{name:'商城公告',select:true,act:'shop'},
        help:{name:'帮助中心',act:'help'},
      }

        let newMenuList = _.clone(this.menuList);
        if(newMenuList['store']&&newMenuList['store'].child.qm_store_class){
            this.moduleShowFlag = 1
        }
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.returnDialog){
            _self.sureReturn();
          }else if(_self.payDialog){
            //缴纳保证金
            _self.depositSaveSure();
          }else if(_self.dialogDeadLine){
            _self.closeDeadline()
          }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },

    beforeRouteEnter(to, from, next){
      next()
  },
};
