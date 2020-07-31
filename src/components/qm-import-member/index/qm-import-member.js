import {mapGetters,mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index'
import QmTable from 'component/qm-table/index';
import QmTips from 'component/qm-tips/index';
import util from 'lib/utils/util';
import storage from 'lib/utils/storage';
export default {
    name: "qm-add-member"  ,

    data(){
        return {
          bodyListener:'',
          pageParams:{
            redisKey:'',
            total:0,
            pageIndex:0,
            pageSize:10,
          },
          list:[],
          yuanList:[],
          checkState: [],
          checkAllState : false,
          checkedPhone:[],
          importResult:{
            susNum:0,//导入成功数据
            errorNum:0,//导入失败数据
            errorFilePath:'',
            importResultDialog:false,//导入文件结果弹窗
          },
        }
    },
    components: {
      QmPagination,
      QmTips,
      QmTable,
    },
    props:['redisKey'],
    computed: {
        ...mapGetters({
        }),
    },
    methods:{    
        ...mapActions({
          getImportRepeatList : 'getImportRepeatList',
          doImportMember : 'doImportMember',
          }),

      hideImportDialog(){
        this.$emit("hideImportDialog",this.importResult)
        },
      initData(){
        this.getImportRepeatList(this.pageParams).then((res) => {
          this.yuanList = res.responseContent.repeatData;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.responseContent.total;
          this.pageParams = newPageParams;
          this.search();
        })
      },
      getPageData(){
          let beginKey = this.pageParams.pageIndex*this.pageParams.pageSize;
          let endKey = beginKey+this.pageParams.pageSize;
          this.list = this.yuanList.slice(beginKey,endKey);
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = this.pageParams.total;
          this.pageParams = newPageParams;
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      search(){
        this.pageParams.pageIndex = 0;
        this.checkState = [];
        this.getPageData();
      },
      checkall(e) {
        this.checkState = [];
        if(e.target.checked === true) {//批量全选
          for(let item of this.yuanList) {
            this.checkState.push(item[0]);
          }
        }
      },
      doImport(){
          //操作导入
        layer.load();
        this.doImportMember({redisKey:this.pageParams.redisKey,checkedPhone:this.checkedPhone.toString()}).then((res)=>{
          layer.closeAll('loading');
          if(res.resultCode == 1){
           this.importResult.susNum = res.responseContent.susCount;
           this.importResult.errorNum = res.responseContent.errorCount;
           this.importResult.errorFilePath = res.responseContent.filePath;
            this.hideImportDialog();
          }else{
            util.msg(res.shortMessage);
          }
        })
      },
      unMergeImport(){
          //不合并数据导入
        this.checkState = [];
        this.checkedPhone = [];
        this.doImport();
      },
      MergeImport(){
          //合并数据导入
        if(this.checkState.length === 0) {
          util.msg('还未选择需要合并的会员数据');
          return;
        }
        let phoneArr = [];
        //批量变更等级
        phoneArr = this.checkState;
        phoneArr =  phoneArr.map(val=>{//数组元素类型如果不是字符串参数会被过滤
          return ''+val;
        });
        this.checkedPhone = _.clone(phoneArr);
        this.doImport();
      },
    },
    watch:{
      checkState:function (val) {
        if(val.length > 0 && val.length === this.yuanList.length) {
          this.checkAllState = true;
        }else{
          this.checkAllState = false;
        }
      },
    },
    mounted() {
       var _self = this;
      this.pageParams.redisKey = this.redisKey;
      this.initData();
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      //销毁键盘enter搜索事件
      document.body.removeEventListener('keyup', this.bodyListener);
    }
}
