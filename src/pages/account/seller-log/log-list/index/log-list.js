import QmTabs from 'component/qm-tabs/index';
import { mapActions,mapMutations } from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import * as _ from 'lodash';
import util from 'lib/utils/util';
import moment from 'moment';
import QmTable from 'component/qm-table/index';
export default {
   name: "log_list",
   data() {
      return {
        bodyListener:'',
         pageParams: {
            startTime: '',
            endTime: '',
            pageIndex: 0,
            pageSize: 10,
            total: 0,
            sellerName: '',
            logContent: ''
         },
         list: [],
         tabs: {
            log_list: { name: '日志列表', select: true, act: 'log_list' },
         }

      }
   },
   filters: {
      //过滤数据
      "updataloglist": function (value) {
         return value == 1 ? "成功" : "失败";
      },
      //日期过滤
      "updataListTime": function (value) {
         return value = moment(new Date(value * 1000)).format('YYYY-MM-DD HH:mm:ss');
      }
   },
   computed: {
   },
   methods: {
      ...mapMutations({
         setIsQuickLinkShow:'setIsQuickLinkShow'
       }),
      ...mapActions({
         getAccountLog: 'getAccountLog'
      }),
      getPageData(data) {
         this.getAccountLog(data).then((res) => {
            this.list = res.list;
            var newPageParams = _.clone(this.pageParams)
            newPageParams.total = res.total
            this.pageParams = newPageParams;

         })
      },
      changeIndex(index) {
         this.pageParams.pageIndex = index;
         this.getPageData(this.pageParams);
      },
      search() {
         this.pageParams.startTime = $('#start_time').val();
         this.pageParams.endTime = $('#end_time').val();
         this.pageParams.sellerName = $('#seller_Name').val().trim();
         this.pageParams.logContent = $('#log_Content').val().trim();
         this.pageParams.total = null;
         this.pageParams.pageIndex = 0
         this.getPageData(this.pageParams);
         

      }
   },
   mounted() {
      if(this.$router.history.current.name == 'home'){
        this.setIsQuickLinkShow(true);
      }else{
        this.setIsQuickLinkShow(false);
      }

      this.getPageData(this.pageParams)
      layui.use('laydate', function () {
         var laydate = layui.laydate;
         laydate.render({
            elem: '#start_time',
            theme: "#ff8519",

         });
         laydate.render({
            elem: '#end_time',
            theme: "#ff8519",
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
   beforeRouteLeave(to, from, next) {
      // window.scrollTo(0,0);
      document.body.scrollTop = 0;
      window.scrollTo(0,0);
      document.getElementsByClassName("routerContent")[0].scrollTop = 0;
      if(to.name == 'home'){
        this.setIsQuickLinkShow(true);
      }else{
        this.setIsQuickLinkShow(false);
      }
      next()
    },
   components: {
      QmTabs,
      QmPagination,
      QmTable
   }
}
