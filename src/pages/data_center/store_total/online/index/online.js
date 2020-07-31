import {mapGetters,mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util';
import exportData from 'lib/utils/export';
import QmTable from 'component/qm-table/index';
import moment from 'moment';

export default {
    name: "store-total-index",
    data(){
        return {
          bodyListener:'',
            pageParams:{
                beginTime:'',
                endTime:'',
                total:'',
            },
            list:[],
            totalList: [],
            laypage:null,
            timeType:0,
            dialogVisible:false,
            dialogVisibleFalse:false,
            imgUrl:'',
            hasImage:false,
            newWxpayRateBeginDate:''
        }
    },
    computed:{
        ...mapGetters({
            storeInfo:'getStoreInfo',
            storeList:'getStoreList',
            basicStore:'getBasicStore',
        })
    },
    components:{
        QmPagination,
        QmTable
    },
    methods: {
        ...mapActions({
        getData:'getStoreTotalList',
        exportExcel:'exportStoreTotalList',

        }),
      //depositList
        getPageData(data){
          var _self = this;
           _self.getData(data).then((res)=>{
                _self.list = res.list;
               _self.totalList = res.totalList;
             var newPageParams = _.clone(_self.pageParams)
             newPageParams.total = res.list.length;
             this.newWxpayRateBeginDate = res.newWxpayRateBeginDate
             _self.pageParams = newPageParams;
            })
        },
        changeIndex(index){
            this.getPageData(this.pageParams);
        },
        setTime(type){
            var date = new Date();
            var _self = this;
            _self.timeType = type;
             if(type == -1){
               //时间控件选择变化，不进行查询
               $('.mr5').removeClass('active');
              // _self.pageParams.beginTime = $('#start_time').val();
              // _self.pageParams.endTime = $('#end_time').val();
             }else{
               _self.pageParams.beginTime = moment(new Date(date-type*24*3600*1000)).format('YYYY-MM-DD');
               if(type == 1){
                 //昨天的日期选择，结束时间也要是昨天
                 _self.pageParams.endTime = moment(new Date(date-type*24*3600*1000)).format('YYYY-MM-DD');
               }else{
                 _self.pageParams.endTime = moment(date).format('YYYY-MM-DD');
               }
               _self.search();
             }
        },
        search(){
            this.getPageData(this.pageParams);
        },
      exportData(){
        var _self = this;
        _self.exportExcel(_self.pageParams).then((res)=>{
          exportData.exportExcelNew(res);
      })
      },
    },
    mounted () {
      var _self = this;
        _self.setTime(_self.timeType);
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            laydate.render({
                elem: '#start_time',
                theme: "#ff8519",
                trigger:'click',
                done:function (data) {
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
                done:function (data) {
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
