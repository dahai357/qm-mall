import {mapGetters,mapActions} from 'vuex'
import QmPagination from 'component/qm-pagination/index';
import util from '../../../../../libs/utils/util';
import QmTable from 'component/qm-table/index';
export default {
    name: "qm-store-class-recodr",
    data(){
        return {
          bodyListener:'',
            pageParams:{
                start_time:'',
                end_time:'',
                pageIndex:0,
                pageSize:10,
                total:0
            },
            list:[],
            gc_list:{},
            laypage:null,
            timeType:'',

        }
    },
    computed:{
        ...mapGetters({
            storeInfo:'getStoreInfo',
            storeList:'getStoreList',
        })
    },

    components:{
        QmPagination,
        QmTable
    },

    methods: {
        ...mapActions({
            serviceFee:'serviceFee'
        }),

        getPageData(data){
            this.serviceFee(data).then((res)=>{
                    //回设日期类型
                    if(this.pageParams.start_time && this.pageParams.end_time){
                        this.timeType = "";
                        var turnNewDate = util.dateFormat(new Date(new Date(this.pageParams.end_time)-7*24*3600*1000),'yyyy-MM-dd');
                        
                        if(this.pageParams.start_time == turnNewDate){
                            this.timeType = "week";
                        }


                        var preMonth = this.getLastMonthTime(new Date(this.pageParams.end_time));
                        if(this.pageParams.start_time == preMonth){
                            this.timeType = "month";
                        }


                        var yearTime = new Date(this.pageParams.end_time);
                        yearTime.setFullYear(yearTime.getFullYear()-1);
                        var preYear = util.dateFormat(yearTime,'yyyy-MM-dd');;

                        if(this.pageParams.start_time == preYear){
                            this.timeType = "year";
                        }
                    }

                this.gc_list = res.gc_list;
                this.list = res.list;
                var newPageParams = _.clone(this.pageParams)
                newPageParams.total = res.total;
                this.pageParams = newPageParams;
            })
        },

        changeIndex(index){
            this.pageParams.pageIndex = index;
            this.getPageData(this.pageParams);
        },

        setTime(type){
            var date = new Date();
            this.timeType = type;
            if(type == 'week'){
                this.pageParams.start_time = util.dateFormat(new Date(date-7*24*3600*1000),'yyyy-MM-dd');
                this.pageParams.end_time = util.dateFormat(date,'yyyy-MM-dd');
            }            
            if(type == 'month'){
                var preMonth = this.getLastMonthTime(date);
                this.pageParams.start_time = preMonth;
                this.pageParams.end_time = util.dateFormat(date,'yyyy-MM-dd');
            }
            if(type == 'year'){
                var yearTime = new Date();
                yearTime.setFullYear(yearTime.getFullYear()-1);
                this.pageParams.start_time = this.end_time = util.dateFormat(yearTime,'yyyy-MM-dd');;
                this.pageParams.end_time = util.dateFormat(date,'yyyy-MM-dd');
            }
            this.search();
        },

        search(){
            this.pageParams.pageIndex = 0;
            this.getPageData(this.pageParams);
        },

        // 获取上一个月时间,返回yyyy-MM-dd字符串
        getLastMonthTime(date){
            //  1    2    3    4    5    6    7    8    9   10    11   12月
            var daysInMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31];
            var strYear = date.getFullYear();
            var strDay = date.getDate();
            var strMonth = date.getMonth()+1;
            //一、解决闰年平年的二月份天数   //平年28天、闰年29天//能被4整除且不能被100整除的为闰年,或能被100整除且能被400整除
            if (((strYear % 4) === 0) && ((strYear % 100)!==0) || ((strYear % 400)===0)){
                daysInMonth[2] = 29;
            }
            if(strMonth - 1 === 0) //二、解决跨年问题
            {
                strYear -= 1;
                strMonth = 12;
            }
            else
            {
                strMonth -= 1;
            }
        //  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
            strDay = Math.min(strDay,daysInMonth[strMonth]);//三、前一个月日期不一定和今天同一号，例如3.31的前一个月日期是2.28；9.30前一个月日期是8.30
        
            if(strMonth<10)//给个位数的月、日补零
            {
                strMonth="0"+strMonth;
            }
            if(strDay<10)
            {
                strDay="0"+strDay;
            }
            var datastr = strYear+"-"+strMonth+"-"+strDay;
            return datastr;
        }
    },

    mounted () {
        this.getPageData(this.pageParams);
        var _self = this;
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            laydate.render({
                elem: '#start_time',
                theme: "#ff8519",
                trigger:'click',
                done:function(data){
                    var newParam = _.clone(_self.pageParams);
                    newParam.start_time = data
                    _self.pageParams = newParam;
                 } 
              });
              laydate.render({
                elem: '#end_time',
                theme: "#ff8519",
                trigger:'click',
                done:function(data){
                    var newParam = _.clone(_self.pageParams);
                    newParam.end_time = data
                    _self.pageParams = newParam;
                 } 
              });
              
        })
      this.bodyListener = (e) => {
        if (e.keyCode === 13){
          this.search();
        }
      }
      document.body.addEventListener('keyup', this.bodyListener, false);
    },
  beforeDestroy(){
    document.body.removeEventListener('keyup', this.bodyListener);
  },
}
