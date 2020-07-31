import {mapGetters, mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util';
import exportData from 'lib/utils/export';
import QmTips from 'component/qm-tips/index';
import QmTable from 'component/qm-table/index';
import QmDialog from 'component/qm-dialog/index';


export default {
  name: "store_transaction-index",
  data() {
    return {
      bodyListener:'',
      pageParams: {
        beginTime: '',
        endTime: '',
        pageIndex: 0,
        pageSize: 15,
        payment_type:'',//支付方式
        order_state:'',//订单状态
        total: 0,
      },
      list: [],
      totalList: [],
      detailList:[],
      laypage: null,
      timeType: 0,
      dialogVisible: false,
      dialogVisibleFalse: false,
      imgUrl: '',
      hasImage: false,
      showDetailDialog:false,
      countDownId :'',//倒计时的Id,由于是变量加字符串，这边放到这里处理
      newWxpayRateBeginDate:''
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
    QmDialog
  },
  methods: {
    ...mapActions({
      getData: 'getStoreTransactionList',
      exportExcel: 'exportStoreTransactionList',
      getOrderDetailInfo:'getOrderDetailInfo',

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
      _self.getData(data).then((res) => {
        _self.list = res.list;
        _self.totalList = res.totalList;
        var newPageParams = _.clone(_self.pageParams)
        newPageParams.total = res.totalCount;
        this.newWxpayRateBeginDate = res.newWxpayRateBeginDate
        _self.pageParams = newPageParams;
      })
    },
    detailGetPageData(orderId) {
      //查看详情页数据获取
      var _self = this;
      var data = [];
      data['orderId'] = orderId;
       _self.getOrderDetailInfo(data).then((res) => {
        _self.detailList = res.list;
        _self.countDownId = 'order-'+res.list.order_id;
      })
      _self.showDetailDialog = true;
    },
    changeIndex(index) {
      this.pageParams.pageIndex = index;
      this.pageParams.payment_type = $('#payment_type').val();
      this.pageParams.order_state = $('#order_state').val();
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
      this.pageParams.pageIndex = 0;
      this.pageParams.payment_type = $('#payment_type').val();
      this.pageParams.order_state = $('#order_state').val();
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
    }
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
