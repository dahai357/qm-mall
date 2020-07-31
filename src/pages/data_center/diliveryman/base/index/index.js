import {mapGetters, mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util';
import QmTips from 'component/qm-tips/index';
import QmTable from 'component/qm-table/index';
import QmDialog from 'component/qm-dialog/index';
import moment from 'moment';
import {Base64} from "js-base64";

export default {
  name: "store_transaction-index",
  data() {
    return {
      bodyListener:'',
      pageParams: {
        beginTime: '',
        endTime: '',
        diliverymanId: '',//	配送员ID（搜索条件）
        total:'',
      },
      viewParams:{
        beginTime: '',
        endTime: '',
        total: 0,
        diliverymanId: '',
        pageIndex: 0,
        pageSize: 10,
      },
      viewData:{
        source:'',
        memberAvatarPath:'',
        trueName:'',
      },
      list: [],
      dadaFee:0,
      totalList: [],
      viewList:[],//查看详情数据
      viewTotal:0,//查看详情的条数
      trueNameList: [],//快递员姓名列表(用于搜索框列表)
      laypage: null,
      timeType: 'week',
      dialogVisible: false,
      dialogVisibleFalse: false,
      imgUrl: '',
      hasImage: false,
      showViewDialog:false,
      showAddDialog:false,//新增配送员弹框
      errorMsg:'',//弹框错误提示语
      showEditDialog:false,//修改配送员姓名的弹窗
      currentPhone:'',//当前编辑的配送员手机号
      currentItem:'',//当前编辑的配送数据
      currentName:'',//当前编辑的配送员姓名
      updateName:'',//修改后的配送员姓名
      editError:false,
      itemOrder:'',//当前修改的配送员订单信息
      showEditOrderDialog:false,//修改配送费弹窗
      updateFee:'',//修改的配送员费用
      editFeeError:false,
      editFeeErrorText:'',
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
      getData: 'getDiliverymanList',
      delDiliveryman:'delDiliveryman',
      getDiliveryLog:'getDiliveryLog',
      addDiliveryman:'addDiliveryman',
      editDiliveryman:'editDiliveryman',
      updateDiliverymanFeeMethod:'updateDiliverymanFee',
    }),
    openOrder(orderSn){
      let routeData = this.$router.resolve({
        name:"store_order_index_type",
        params:{state_type:"index",actId:0,isToday:0,orderSn:orderSn}
      });
      window.open(routeData.href, '_blank');
    },
    getPageData(data) {
      var _self = this;
      _self.pageParams.diliverymanId = $('#true_name').val();
      _self.getData(data).then((res) => {
        _self.list = res.list;
        _self.dadaFee = res.dadaFee;
        _self.totalList = res.totalList;
        _self.trueNameList = res.trueNameList;
        var newPageParams = _.clone(_self.pageParams)
        newPageParams.total = res.list.length;
        _self.pageParams = newPageParams;
      })
    },
    viewGetPageData(source,memberAvatarPath,trueName,id) {
      //查看详情页数据获取
      var _self = this;
      _self.viewData.source = source;
      _self.viewData.memberAvatarPath = memberAvatarPath;
      _self.viewData.trueName = trueName;
      //参数设置
      _self.viewParams.diliverymanId = id;
      _self.viewParams.beginTime = _self.pageParams.beginTime;
      _self.viewParams.endTime = _self.pageParams.endTime;
      _self.viewParams.source = source;
      _self.getDiliveryLog(_self.viewParams).then((res) => {
        _self.viewList = res.list == null ? [] : res.list;
        var newPageParams = _.clone(_self.viewParams)
        newPageParams.total = res.total;
        _self.viewParams = newPageParams;
      })
      _self.showViewDialog = true;
    },
    getLog(){
      this.getDiliveryLog(this.viewParams).then((res) => {
        this.viewList = res.list == null ? [] : res.list;
        var newPageParams = _.clone(this.viewParams)
        newPageParams.total = res.total;
        this.viewParams = newPageParams;
      })
    },
    showDeatailView(source,memberAvatarPath,trueName,id){
      this.viewParams.pageIndex = 0;
      this.viewGetPageData(source,memberAvatarPath,trueName,id);
    },
    changeIndex(index) {
      var _self = this;
      _self.viewParams.pageIndex = index;
      _self.viewGetPageData(_self.viewData.source,_self.viewData.memberAvatarPath,_self.viewData.trueName,_self.viewParams.diliverymanId);
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
        if (type == 'week') {
          this.pageParams.beginTime = moment(new Date(date - 7 * 24 * 3600 * 1000)).format('YYYY-MM-DD');
          this.pageParams.endTime = moment(date).format('YYYY-MM-DD');
        }
        if (type == 'month') {
          var preMonth = _self.getLastMonthTime(date);
          this.pageParams.beginTime = preMonth;
          this.pageParams.endTime =  moment(date).format('YYYY-MM-DD');

        }
        if (type == 'year') {
          var yearTime = new Date();
          yearTime.setFullYear(yearTime.getFullYear() - 1);
          this.pageParams.beginTime = this.end_time = moment(yearTime).format('YYYY-MM-DD');
          ;
          this.pageParams.endTime = moment(date).format('YYYY-MM-DD');
        }
      }
      _self.search();
    },
    // 获取上一个月时间,返回yyyy-MM-dd字符串
    getLastMonthTime(date) {
      //  1    2    3    4    5    6    7    8    9   10    11   12月
      var daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var strYear = date.getFullYear();
      var strDay = date.getDate();
      var strMonth = date.getMonth() + 1;
      //一、解决闰年平年的二月份天数   //平年28天、闰年29天//能被4整除且不能被100整除的为闰年,或能被100整除且能被400整除
      if (((strYear % 4) === 0) && ((strYear % 100) !== 0) || ((strYear % 400) === 0)) {
        daysInMonth[2] = 29;
      }
      if (strMonth - 1 === 0) //二、解决跨年问题
      {
        strYear -= 1;
        strMonth = 12;
      } else {
        strMonth -= 1;
      }
      //  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
      strDay = Math.min(strDay, daysInMonth[strMonth]);//三、前一个月日期不一定和今天同一号，例如3.31的前一个月日期是2.28；9.30前一个月日期是8.30

      if (strMonth < 10)//给个位数的月、日补零
      {
        strMonth = "0" + strMonth;
      }
      if (strDay < 10) {
        strDay = "0" + strDay;
      }
      var datastr = strYear + "-" + strMonth + "-" + strDay;
      return datastr;
    },
    search() {
      $('select').blur();
      this.pageParams.pageIndex = 0;
      this.getPageData(this.pageParams);
    },
    doDelDiliveryman(id){
      var data = [];
      var _self = this;
      data['diliverymanId'] = id;
      _self.delDiliveryman(data).then((res)=>{
        if(res.state == 1){
          //编辑成功
          util.msg('操作成功');
          _self.getPageData(this.pageParams);
        }else{
          util.msg(res);
        }
      })
    },
    showAdd(){
      this.showAddDialog = true;
      this.$nextTick(()=>{
        $('.error-p').hide();
        $('#add-true-name').val('');
        $('#add-mobile').val('');
      });
    },
    doAddDiliveryman(){
      var data = [];
      var _self = this;
      data['trueName'] = $('#add-true-name').val().trim();
      data['mobile'] = $('#add-mobile').val().trim();
      var flag = true;
      $('.error-p').hide();
      if(data['trueName'] == ''){
        flag = false;
        $('#add-true-name').next('.error-p').show();
      }
      if(data['mobile'] == ''){
        flag = false;
        $('#add-mobile').next('.error-p').show();
      }
      if(flag){
        _self.addDiliveryman(data).then((res)=>{
          if(res.state == 1){
            //编辑成功
            util.msg('添加成功');
            _self.showAddDialog = false;
            _self.getPageData(_self.pageParams);
          }else{
            util.msg(res);
          }
        })
      }
    },
    showEdit(item){
      this.currentItem = item;
      this.updateName = '';
      this.editError = false;
      this.showEditDialog = true;
    },
    updateDiliveryman(){
      if(!this.updateName){
        this.editError = true;
      }
      if(!this.editError){
        this.editDiliveryman({'diliverymanId':this.currentItem.id,'newTrueName':this.updateName,'memberId':this.currentItem.member_id}).then((res)=>{
          if(res.resultCode === 1){
            util.msg('修改成功');
            this.getPageData(this.pageParams);
            this.showEditDialog = false;
            this.updateName = '';
          }else{
            util.msg(res.shortMessage);
          }
        })
      }
    },
    showEditFee(item){
      if(item.order_state == 40){
        util.msg('该订单已完成，无法修改配送费');
      }else if(item.delivery_state == 30){
        util.msg('该订单配送员已确认送达，无法修改配送费');
      }else if(item.order_state == 0){
        util.msg('该订单已取消，无法修改配送费');
      }else{
        this.itemOrder = item;
        this.updateFee = '';
        this.editFeeError = false;
        this.showEditOrderDialog = true;
      }
    },
    onlyNumber(){
      let value ;
      value = this.updateFee
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
      this.updateFee = value ;
    },
    updateDiliverymanFee(){
      if(!this.updateFee){
        this.editFeeErrorText="请输入修改后的配送员费用";
        this.editFeeError = true;
      }
      if(!this.editFeeError){
        this.updateDiliverymanFeeMethod({'diliverymanId':this.itemOrder.diliveryman_id,'distributionFee':this.updateFee*100,'orderId':this.itemOrder.order_id}).then((res)=>{
          if(res.resultCode === 1){
            util.msg('修改成功');
          }else{
            util.msg(res.shortMessage);
          }
          this.getLog();
          this.showEditOrderDialog = false;
          this.updateFee = '';
        })
      }

    }
  },
  watch:{
    updateName:{
      handler: function () {
        if(this.updateName){
          this.editError = false;
        }
      },
      deep: true
    },
    updateFee:{
      handler: function () {
        if(this.updateFee){
          this.editFeeError = false;
        }
      },
      deep: true
    },
  },
  filters: {
    f2y: function (value) {
      return (value/100).toFixed(2);
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
    //body绑定键盘enter搜索事件
    _self.bodyListener = (e) => {
      if (e.keyCode === 13){
        if(_self.showAddDialog){
          //添加配送员
          _self.doAddDiliveryman();
        }else if(_self.showEditDialog){
          //修改配送员姓名
          _self.updateDiliveryman();
        }else if(_self.showEditOrderDialog){
          //修改配送费
          _self.updateDiliverymanFee();
        }
      }
    }
    document.body.addEventListener('keyup', _self.bodyListener, false);
  },
  beforeDestroy(){
    //销毁键盘enter搜索事件
    document.body.removeEventListener('keyup', this.bodyListener);
  },
}
