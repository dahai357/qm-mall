import {mapGetters,mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util';
import exportData from 'lib/utils/export';
import QmTable from 'component/qm-table/index';
import moment from 'moment';
import QmTips from "component/qm-tips/index";
import QmClass from 'component/qm-class';
import QmGoodsSearchInput from 'component/qm-goods-search-input';

export default {
    name: "store_transaction-index",
    data(){
        return {
          bodyListener:'',
            pageParams:{
                beginTime:'',
                endTime:'',
                pageIndex:0,
                pageSize:15,
                total:0,
                goodsName:'',
                maxExportNum:5000,//当前限制最大导出数量
                gcId1:0,
                gcId2:0,
                gcId3:0,
                searchType:0
            },
          initPageParams:{

          },
            list:[],
            totalList:[],
            laypage:null,
            timeType:0,
            dialogVisible:false,
            dialogVisibleFalse:false,
            imgUrl:'',
            hasImage:false,
            exportDialog:false,
          resetShow:false
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
        QmTable,
        QmTips,
        QmGoodsSearchInput,
        QmClass
    },
    methods: {
        ...mapActions({
        getData:'getSaleStatisticsList',
        exportExcel:'exportSaleStatisticsList',

        }),
      reset() {
          this.pageParams = {
            ...this.pageParams,
            ...this.initPageParams
          }
          this.resetShow = false;
          this.pageParams.pageIndex = 0;
          this.$refs.goodsClass.subgcId1 = 0;
          this.setTime(0);
      },
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
        getPageData(data){
          var _self = this;
          //_self.pageParams.goodsName = $('#goods_name').val().trim();
           _self.getData(data).then((res)=>{
             let pageParams = _.clone(data);
             delete pageParams.pageIndex;
             delete pageParams.searchType;
             delete pageParams.total;
             if(_.isEqual(pageParams,this.initPageParams)){
               this.resetShow = false;
             }else{
               this.resetShow = true;
             }
                _self.list = res.goodsList;
                _self.totalList = res.totalList;
                var newPageParams = _.clone(_self.pageParams)
                newPageParams.total = res.total;
                _self.pageParams = newPageParams;
            })
        },
        changeIndex(index){
            this.pageParams.pageIndex = index;
            this.getPageData(this.pageParams);
        },
      exportData(){
          if(this.pageParams.total > this.pageParams.maxExportNum){
            this.exportDialog = true;
          }else{
            this.doExport();
          }
      },
      doExport(){
        this.exportExcel(this.pageParams).then((res)=>{
          exportData.exportExcelNew(res);
          this.exportDialog = false;
        })
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
            this.pageParams.pageIndex = 0;
            this.getPageData(this.pageParams);
        },
    },
    mounted () {
      var _self = this;
        _self.setTime(_self.timeType);
        let pageParams = _.clone(this.pageParams);
        delete pageParams.pageIndex;
        delete pageParams.searchType;
        delete pageParams.total;
        this.initPageParams = pageParams;
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
