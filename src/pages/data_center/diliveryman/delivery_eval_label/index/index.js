import {mapGetters, mapActions} from 'vuex'
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util';
import QmTable from 'component/qm-table/index';
import QmDialog from 'component/qm-dialog/index';


export default {
  name: "store_transaction-index",
  data() {
    return {
      tipMessage:false,//操作完成倒计时关闭弹框
      errorMsg:'',//弹框错误提示语
      deleteDialogVisible:false,//删除确认弹框
      delLabelId:'',//删除的id
      pageParams: {
        pageIndex: 0,
        pageSize: 15,
        total: 0,
      },
      list: [],
      totalList: [],
      trueNameList: [],//快递员姓名列表(用于搜索框列表)
      laypage: null,
      timeType: 'week',
      dialogVisible: false,
      dialogVisibleFalse: false,
      imgUrl: '',
      hasImage: false,
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
    QmTable,
    QmDialog
  },
  methods: {
    ...mapActions({
      getData: 'getDiliveryLabel',
      delDiliveryLabel:'delDiliveryLabel',

    }),
    getPageData(data) {
      var _self = this;
      _self.getData(data).then((res) => {
        _self.list = res.list;
        var newPageParams = _.clone(_self.pageParams)
        newPageParams.total = res.total;
        _self.pageParams = newPageParams;
      })
    },
    changeIndex(index) {
      this.pageParams.pageIndex = index;
      this.getPageData(this.pageParams);
    },
    doRouter(url){
      this.$router.push(url);
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
      this.pageParams.pageIndex = 0;
      this.getPageData(this.pageParams);
    },
    goEdit(labelId){
      this.$router.push('/data_center/diliveryman/label_add?labelId='+labelId);
    },
    doDelDiliveryLabel(){
      var data = [];
      var _self = this;
      _self.deleteDialogVisible = false;
      data['labelId'] = _self.delLabelId;
      _self.delDiliveryLabel(data).then((res)=>{
        if(res.state == 1){
          //编辑成功
          util.msg('删除成功');
          _self.getPageData(this.pageParams);
        }else{
          util.msg(res);
        }
      })
    },
    confirmDel(label_id){
      this.delLabelId = label_id;
      this.deleteDialogVisible = true;
    }
  },
  mounted() {
    var _self = this;
    _self.search();
  },
}
