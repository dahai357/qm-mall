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
            notLevel:'',//不需要等于这个等级的数据
            isAllIds:1,//需要全部全选的时候传入1
            total:0,
            pageIndex:0,
            pageSize:10,
            timeType:1,
            beginTime:'',//开始时间
            endTime:'',//
            levelNum:'',
            tagId:'',//会员标签id
            searchType:1,//1：会员绑定手机号 2：用户名
            searchText:'',//搜索内容（会员绑定/会员手机号搜索）
            favFrom:'',//1主动关注，2购买关注,3:扫码关注
          },
          resetBtn:false,
          favoritesTag:[],//会员标签通过key=tag_id value=tag_name来处理数据
          favoritesTagList:[],
          list:[],
          levelInfo:[],
          checkState: [],
          checkAllState : false,
          userLevel:[],
          levelArr:[],
          allIds:[],
          levelParms:{
            levelNum:'',
            favId:[]
          },
          allCheck:0,
        }
    },
    components: {
      QmPagination,
      QmTips,
      QmTable,
    },
    props:['currentLevel'],
    computed: {
        ...mapGetters({
        }),
    },
    methods:{    
        ...mapActions({
          getStoreMemberList: 'getStoreMemberList',
          getUserLevel:'getUserLevel',
          updataLevelMethod:'updataLevel',
          }),

      hideNewAddMember(){
        this.$emit("hideNewAddMember",false)
        },
      getPageData(){
        this.getStoreMemberList(this.pageParams).then((res) => {
          this.list = res.responseContent.memberList;
          this.favoritesTag = res.responseContent.favoritesTag;
          this.favoritesTagList = res.responseContent.favoritesTagList;
          this.levelInfo = res.responseContent.levelInfo;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.responseContent.total;
          this.pageParams = newPageParams;
          //取消复选框的选中
          this.allIds = res.responseContent.allIds;
        })
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      search(){
        if(this.pageParams.beginTime !== '' && this.pageParams.endTime !== '') {
          if(this.pageParams.beginTime > this.pageParams.endTime){
            util.msg('搜索时间范围结束时间不能大于开始时间');
            return;
          }
        }
        this.pageParams.pageIndex = 0;
        this.checkState = [];
        this.getPageData();
      },
      checkall(e) {
        this.checkState = [];
        if(e.target.checked === true) {//批量全选
          for(let item of this.allIds) {
            this.checkState.push(item.favid);
          }
        }
      },
      getLevel(){
        this.getUserLevel().then((res)=>{
          this.userLevel = res.responseContent.list;
          this.levelArr = res.responseContent.levelArr;
        })
      },
      restSearch(){
          var newData = _.clone(this.pageParams);
          newData.beginTime = '';
          newData.endTime = '';
          newData.levelNum = '';
          newData.tagId = '';
          newData.searchType = 1;
          newData.searchText = '';
          newData.favFrom = '';
          this.pageParams = newData;
          this.search();
      },
      doChangeLevel(){
        if(this.checkState.length === 0) {
          util.msg('请选择需要添加的会员');
          return;
        }
        layer.load();
        let favIdArr = [];
        //批量变更等级
        favIdArr = this.checkState;
        favIdArr =  favIdArr.map(val=>{//数组元素类型如果不是字符串参数会被过滤
          return ''+val;
        });
        this.levelParms.favId = _.clone(favIdArr);
        var sendTime = Math.ceil(this.levelParms.favId.length/1000);
        var idx = 0;
        for(var i=0;i<sendTime;i++){
          var sendArr = this.levelParms.favId.slice(i*1000,(i+1)*1000);
          if(sendArr){
            var idStr = sendArr.toString();
            this.updataLevelMethod({levelNum:this.levelParms.levelNum,favId:idStr}).then((res)=>{
              if(res.resultCode == 1){
                idx += 1;
                if(idx==sendTime){
                  layer.closeAll('loading');
                  util.msg('操作成功');
                  this.hideNewAddMember();
                }
              }else{
                util.msg(res.shortMessage);
                return;
              }
            })
          }
        }
      },
    },
    watch:{
      checkState:function (val) {
        if(val.length > 0 && val.length === this.allIds.length) {
          this.checkAllState = true;
        }else{
          this.checkAllState = false;
        }
      },
      pageParams:{
        handler: function () {
          if(this.pageParams.beginTime || this.pageParams.endTime || this.pageParams.userLevel || this.pageParams.levelNum || this.pageParams.tagId || this.pageParams.searchText || this.pageParams.favFrom){
            this.resetBtn = true;
          }else{
            this.resetBtn = false;
          }
        },
        deep: true
      }
    },
    mounted() {
       var _self = this;
      this.levelParms.levelNum = this.currentLevel;
      this.pageParams.notLevel = this.currentLevel;
      this.search();
      this.getLevel();
      layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
          elem: '#start_time-tip',
          theme: "#ff8519",
          done: function (value) {
            $('.mr5').removeClass('active');
            var newParams = _.clone(_self.pageParams);
            newParams.beginTime = value;
            _self.pageParams = newParams;
          }
        });
        laydate.render({
          elem: '#end_time-tip',
          theme: "#ff8519",
          done: function (value) {
            $('.mr5').removeClass('active');
            var newParams = _.clone(_self.pageParams);
            newParams.endTime = value;
            _self.pageParams = newParams;
          }
        });
      })
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(document.activeElement.id==="search-text" ){
            //搜索内容填写框如果获取焦点，就响应搜索
            _self.search();
          }else{
            _self.doChangeLevel();
          }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      //销毁键盘enter搜索事件
      document.body.removeEventListener('keyup', this.bodyListener);
        $("#guide-tips").off();
    }
}
