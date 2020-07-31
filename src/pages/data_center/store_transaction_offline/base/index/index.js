import {mapGetters, mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util';
import exportData from 'lib/utils/export';
import QmTips from 'component/qm-tips/index';
import QmTable from 'component/qm-table/index';
import QmDialog from 'component/qm-dialog/index';
import QmDialogImg from "component/qm-dialog-img/index";


export default {
  name: "store_transaction-index",
  data() {
    return {
      bodyListener:'',
      imageUrl:'',
      hasImage:false,
      hasImageDialog:false,
      unImageDialog:false,
      modalAppendToBody:false,
      closeOnClickModal:false,
      pageParams: {
        beginTime: '',
        endTime: '',
        pageIndex: 0,
        pageSize: 15,
        total: 0,
        orderType:'',
      },
      sellerState: {
        1: '待审核',
        2: '同意',
        3: '不同意',
      },
      platformState:{
        0:'待审核',
        1:'同意',
        2:'不同意',
      },
      list: [],
      totalList: [],
      detailList:[],
      refundDetail:{
        //关于退款订单详情数据
        list:[],//退款记录列表
        deliverymanList:[],
        deliverymanLog:[],//	配送员列表
      },
      laypage: null,
      timeType: 0,
      dialogVisible: false,
      dialogVisibleFalse: false,
      imgUrl: '',
      showDetailDialog:false,//订单详情弹框
      showRefundDetailDialog:false,//退款订单详情弹框
      countDownId :''//倒计时的Id,由于是变量加字符串，这边放到这里处理
    }
  },
  computed: {
    ...mapGetters({
      storeInfo: 'getStoreInfo',
      storeList: 'getStoreList',
      basicStore: 'getBasicStore',
    })
  },
  components: {
    QmPagination,
    QmTips,
    QmTable,
    QmDialog,
    QmDialogImg
  },
  methods: {
    ...mapActions({
      getData: 'getTransactionFlowingList',//获取列表数据
      exportExcel: 'exportTransactionFlowingList',//导出EXCEL
      getOrderDetailInfo:'getOrderDetailInfo',//获取订单详情
      getDetailRefund:'getDetailRefund',//获取单条退款订单详情

    }),
    openOrder(orderSn){
      let routeData = this.$router.resolve({
        name:"store_order_index_type",
        params:{state_type:"index",actId:0,isToday:0,orderSn:orderSn}
      });
      window.open(routeData.href, '_blank');
    },
    openGoods(goodsCommonId){
      let routeData = this.$router.resolve({
        name:"store_goods_add_step_two",
        params:{commonId:goodsCommonId}
      });
      window.open(routeData.href, '_blank');
    },
    getPageData(data) {
      var _self = this;
      _self.pageParams.orderType = $('#order-type').val();
      _self.getData(data).then((res) => {
        _self.list = res.data;
        _self.totalList = res;
        var newPageParams = _.clone(_self.pageParams)
        newPageParams.total = res.totalCount;
        _self.pageParams = newPageParams;
      })
    },
    showImageDetil(imageUrl){
      this.imageUrl = imageUrl;
      this.hasImageDialog = true;

    },
    isHasImg(pathImg){
      var vm = this;
      return new Promise((resolve, reject) => {
        var ImgObj=new Image();
        ImgObj.src= pathImg;
        ImgObj.onload =function(res) {
          if(ImgObj.width >= 520){
            vm.imgWidth = 520;
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
    detailGetPageData(orderId,refundId,orderType) {
      //查看详情页数据获取
      var _self = this;
      var data = [];
      if(orderType != 3){
        data['orderId'] = orderId;
        _self.getOrderDetailInfo(data).then((res) => {
          _self.detailList = res.list;
          _self.countDownId = 'order-'+res.list.order_id;
        })
        _self.showDetailDialog = true;
      }else{
        data['refundId'] = refundId;
        _self.getDetailRefund(data).then((res) => {
          _self.refundDetail.list = res.returnList;
          _self.refundDetail.deliverymanList = res.deliverymanList;
          _self.refundDetail.deliverymanLog = res.deliverymanLog;
        })
        _self.showRefundDetailDialog = true;
      }
    },
    dateFormat(date,format){
      var micro = parseInt(date+'000');
      return util.dateFormat(new Date(micro),format)
    },
    changeIndex(index) {
      this.pageParams.pageIndex = index;
      this.getPageData(this.pageParams);
    },
    exportTrancactionData() {
      var _self = this;
      _self.exportExcel(_self.pageParams).then((res) => {
        exportData.exportExcelNew(res);
      })
    },
    setTime(type) {
      var date = new Date();
      var _self = this;
      _self.timeType = type;
      if (type == -1) {
        //时间控件选择变化，不进行查询
        $('.mr5').removeClass('active');
        // _self.pageParams.beginTime = $('#start_time').val();
        // _self.pageParams.endTime = $('#end_time').val();
      } else {
        _self.pageParams.beginTime = util.dateFormat(new Date(date - type * 24 * 3600 * 1000), 'yyyy-MM-dd');
        if (type == 1) {
          //昨天的日期选择，结束时间也要是昨天
          _self.pageParams.endTime = util.dateFormat(new Date(date - type * 24 * 3600 * 1000), 'yyyy-MM-dd');
        } else {
          _self.pageParams.endTime = util.dateFormat(date, 'yyyy-MM-dd');
        }
        _self.search();
      }
    },
    search() {
      $('select').blur();
      this.pageParams.pageIndex = 0;
      this.getPageData(this.pageParams);
    },
    countDown( maxtime,id){
      /*待接单倒计时*/
      var timer = setInterval(function(){
        var minutes,seconds,msg;
        if(maxtime>=0){
          minutes = Math.floor(maxtime/60);
          seconds = Math.floor(maxtime%60);
          msg = "剩余关闭时间:"+minutes+"分"+seconds+"秒";
          $('#'+id).html(msg);
          --maxtime;
        }else{
          clearInterval( timer );
          $('#'+id).closest('.order-status').html('已关闭').addClass('c-gray');
          $('#'+id+'_receive_order').remove();
          $('#'+id+'_receive_order').nextAll('a').remove();
          //document.getElementById(id).innerHTML = '已关闭';
        }
      }, 1000);
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
  mounted() {
    var _self = this;
    _self.setTime(_self.timeType);
    layui.use('laydate', function () {
      var laydate = layui.laydate;
      laydate.render({
        elem: '#start_time',
        theme: "#ff8519",
        trigger:'click',
        done: function (data) {
          var newParam = _.clone(_self.pageParams);
                  newParam.beginTime = data
                  _self.pageParams = newParam;
          _self.setTime(-1);
        }
      });
      laydate.render({
        elem: '#end_time',
        theme: "#ff8519",
        trigger:'click',
        done: function (data) {
          var newParam = _.clone(_self.pageParams);
                  newParam.endTime = data
                  _self.pageParams = newParam;
          _self.setTime(-1);
        }
      });
    })
    _self.bodyListener = (e) => {
      if (e.keyCode === 13){
        _self.search();
      }
    }
    document.body.addEventListener('keyup', _self.bodyListener, false);
  },
  beforeDestroy(){
    document.body.removeEventListener('keyup', this.bodyListener);
  },
}
