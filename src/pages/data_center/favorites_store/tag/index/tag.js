import {mapGetters,mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util';
import QmTips from 'component/qm-tips/index';
import QmTable from 'component/qm-table/index';
import QmDialog from 'component/qm-dialog/index';
import storage from 'lib/utils/storage';

export default {
    name: "store-total-index",
    data(){
        return {
          bodyListener:'',
          userLevel:[],
          tipMessage:false,//操作完成倒计时关闭弹框
            showTagId:'',//保存弹窗编辑标签需自动勾选的标签ID
          errorMsg:'',//弹框错误提示语
            pageParams:{
                 pageIndex:0,
                 pageSize:10,
                searchText:'',//搜索内容（名称模糊搜索/会员手机号搜索）
                tagId:'',//会员标签id(搜索内容)
                sort:'',//	1:购买业绩升序，2:购买业绩降序，3:关注时间升序，4:关注时间降序
                total:0,
                searchType:1,
                beginTime:'',
                endTime:'',
                levelNum:'',
                joinId:0,//砍价发起id
            },
            list:[],
            totalMember:[],//会员情况汇总数据
            favoritesTagList:[],//会员标签数据（下拉框）
            favoritesTag:[],//会员标签通过key=tag_id value=tag_name来处理数据
            laypage:null,
            timeType:0,
            dialogVisible:false,
            dialogVisibleFalse:false,
            imgUrl:'',
            hasImage:false,
          showLabelDialog:false,//编辑标签弹框
          showLabelDialogType:0,//0:单个编辑 1：批量编辑
          labelDialogTitle:'',
            labelArr:{
              tagIds:0,//编辑会员标签选中的标签
              favId:[],
            },
          checkState: [],
          checkAllState : false,
          setLevelDialog:false,//变更等级弹窗
          updataLevel:'',
          levelArr:{
            levelNum:'',
            favId:[]
          },
          updateMemberDialog:false,
          currentItem:[],//当前编辑的用户
          resetBtn:false,
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
        QmTips,
       QmTable,
      QmDialog,
      storage
    },
    methods: {
        ...mapActions({
          getData:'getStoreFavoritesList',
          addMemberTag:'addMemberTag',
          addBlacklist:'addBlacklist',
          getUserLevel:'getUserLevel',
          updataLevelMethod:'updataLevel',
          updataStoreMember:'updataStoreMember',
        }),
        getPageData(data){
          var _self = this;
           _self.getData(data).then((res)=>{
             if((!res.memberList || res.memberList.length == 0) && _self.pageParams.pageIndex > 0){
               _self.pageParams.pageIndex -= 1;
               _self.getPageData(this.pageParams);
             }else{
               _self.list = res.memberList;
               _self.favoritesTagList = res.favoritesTagList;
               _self.favoritesTag = res.favoritesTag;
               _self.totalMember = res.totalMember;
               var newPageParams = _.clone(_self.pageParams)
               newPageParams.total = res.total;
               _self.pageParams = newPageParams;
               //取消复选框的选中
               this.checkState = [];
               this.checkAllState = false;
             }
            })
        },
        changeIndex(index){
            this.pageParams.pageIndex = index;
            this.getPageData(this.pageParams);
        },
        search(){
          //$('select').blur();
            if(this.pageParams.beginTime !== '' && this.pageParams.endTime !== '') {
              if(this.pageParams.beginTime > this.pageParams.endTime){
                util.msg('搜索时间范围结束时间不能大于开始时间');
                return;
              }
            }
            this.pageParams.pageIndex = 0;
            this.getPageData(this.pageParams);
        },
      showLabel(memberId,ids,type){
        $("input:radio[name='tag_ids']").removeAttr('checked');
          this.showTagId='';//初始化 标签标签弹窗 自动勾选项
          this.showLabelDialogType = type;
          if(type == 1) {
            if(this.checkState.length === 0) {
              util.msg('请选择需要设置标签的会员');
              return;
            }
            this.labelArr.tagIds = 0;
            this.labelArr.favId = [];
            for(var i = 0; i < this.favoritesTagList.length; i++) {
              this.favoritesTagList[i]['checked'] = false;
            }
            this.labelDialogTitle = '批量设置会员标签';
          }else{
            //弹框编辑会员标签
            var _self = this;
            _self.labelArr.tagIds = ids[0] ? ids[0] : 0;
            _self.labelArr.favId = [memberId];
            for(var i = 0; i < this.favoritesTagList.length; i++) {
              if((_self.labelArr.tagIds+"").includes(this.favoritesTagList[i]['tag_id']+"")){
                this.favoritesTagList[i]['checked'] = true;
                this.showTagId=this.favoritesTagList[i]['tag_id'];
              }else{
                this.favoritesTagList[i]['checked'] = false;
              }
            }
            this.labelDialogTitle = '会员标签管理';
          }
        this.showLabelDialog = true;
        // setTimeout(function () {
        //   $("[type='checkbox']").each(function () {
        //     if($(this).attr('isChecked')){
        //       $(this).prop('checked','true');
        //     }else{
        //       $(this).removeAttr('checked');
        //     }
        //   });
        // },50);
      },
        chekedTag(tag_id){
            this.showTagId=tag_id;
        },
      goOrder(member_id){
          storage.set('searchType',this.pageParams.searchType);
          storage.set('member_id',member_id);
          storage.set('beginTime',this.pageParams.beginTime);
          storage.set('endTime',this.pageParams.endTime);
        let routeData = this.$router.resolve({ path: '/order/store_order/index/from_user'});
        window.open(routeData.href, '_blank');
      },
      doAddMemberTag(){
          //操作编辑会员标签
        var _self = this;
        var checkedArr = [];
        $("input:radio[name='tag_ids']:checked").each(function() {
          checkedArr.push($(this).val());// 每一个被选中项的值
        });
        if(checkedArr.length === 0) {
          util.msg('请选择需要设置的会员标签');
          return;
        }
        // _self.labelArr.tagIds = checkedArr;
        if(this.showLabelDialogType == 1) {
          _self.labelArr.favId = this.checkState;
        }
        let labelArr = _self.labelArr;
        if(checkedArr[0]){
          labelArr.tagIds = checkedArr[0] == -1 ? 0 : checkedArr[0];
        }
   /*     //无选中项清0标签ID
          if(checkedArr.length === 0) {
              labelArr.tagIds = 0;
          }*/
        labelArr.favId = _self.labelArr.favId.map(val=>{//数组元素类型如果不是字符串参数会被过滤
          return ''+val;
        });
        _self.addMemberTag(labelArr).then((res)=>{
         if(res.state == 1){
           //编辑成功
           _self.getPageData(this.pageParams);
           _self.showLabelDialog = false;
           util.msg('操作成功');
         }
        })
      },
      doAddBlackList(memberId,type) {
          var data = [];
          var _self = this;
          data['memberId'] = memberId;
          data['type'] = type;
        _self.addBlacklist(data).then((res)=>{
          if(res.state == 1){
            //编辑成功
            util.msg('操作成功');
            _self.getPageData(this.pageParams);
          }
        })
      },
      sort(e){
          //排序的方法
          var el = e.currentTarget;
          var _self = this;
          $('.sort').removeClass('sort-up');
          $('.sort').removeClass('sort-down');
          var className = $(el).attr('data-sort');
          if(className == 'favtime_sort'){
            //关注时间排序
            if(_self.pageParams.sort == 3){
              _self.pageParams.sort = 4;
              $(el).addClass('sort-down') ;
            }else if(_self.pageParams.sort == 4){
              _self.pageParams.sort = '';
            }else{
              _self.pageParams.sort = 3;
              $(el).addClass('sort-up');
            }
          }else{
            //购买业绩排序
            if(_self.pageParams.sort == 1){
              _self.pageParams.sort = 2;
              $(el).addClass('sort-down') ;
            }else if( _self.pageParams.sort == 2){
              _self.pageParams.sort = '';
            }else{
              _self.pageParams.sort = 1;
              $(el).addClass('sort-up');
            }
          }
          _self.search();
      },
      checkall(e) {
        this.checkState = [];
        if(e.target.checked === true) {//批量全选
          for(let item of this.list) {
            this.checkState.push(item.favid);
          }
        }
      },
      getLevel(){
        this.getUserLevel().then((res)=>{
          this.userLevel = res.responseContent.list;
        })
      },
      changeLevel(){
        if(this.checkState.length === 0) {
          util.msg('请选择需要变更等级的会员');
          return;
        }
        this.levelArr.levelNum = '';
        this.setLevelDialog = true;
      },
      doChangeLevel(){
          if(!this.levelArr.levelNum){
            util.msg('请选择变更后的会员等级');
            return;
          }
        this.levelArr.favId = this.checkState;
        this.levelArr.favId =  this.levelArr.favId.map(val=>{//数组元素类型如果不是字符串参数会被过滤
          return ''+val;
        });
        this.updataLevelMethod(this.levelArr).then((res)=>{
          if(res.resultCode == 1){
            this.getPageData(this.pageParams);
            this.setLevelDialog = false;
            util.msg('操作成功');
          }else{
            util.msg(res.shortMessage);
          }
        })
      },
      showUpdateMember(item){
          this.currentItem = _.clone(item);
          this.updateMemberDialog = true;
      },
      doUpdateMember(){
        this.updataStoreMember({levelNum:this.currentItem.level_num,'mark':this.currentItem.mark,'favId':this.currentItem.favid}).then((res)=>{
          if(res.resultCode == 1){
            this.getPageData(this.pageParams);
            this.updateMemberDialog = false;
            util.msg('编辑成功');
          }else{
            util.msg(res.shortMessage);
          }
        })
      },
      doRouter(url){
        this.$router.push(url);
      },
      restSearch(){
        var newData = _.clone(this.pageParams);
        newData.tagId = '';
        newData.searchType = 1;
        newData.searchText = '';
        newData.beginTime = '';
        newData.endTime = '';
        newData.levelNum = '';
        this.pageParams = newData;
        this.search();
      },
    },
  filters: {
    f2y: function (value) {
      return (value/100).toFixed(2);
    },
  },
    mounted () {
      var _self = this;
      _self.getLevel();
      if(this.$route.params.hasOwnProperty('joinId') && this.$route.params.joinId > 0) {
        this.pageParams.joinId = this.$route.params.joinId;
      }
      _self.search();
      layui.use('laydate', function () {
        var laydate = layui.laydate;
        laydate.render({
          elem: '#start_time',
          theme: "#ff8519",
          done: function (value) {
            $('.mr5').removeClass('active');
            var newParams = _.clone(_self.pageParams);
            newParams.beginTime = value;
            _self.pageParams = newParams;
          }
        });
        laydate.render({
          elem: '#end_time',
          theme: "#ff8519",
          done: function (value) {
            $('.mr5').removeClass('active');
            var newParams = _.clone(_self.pageParams);
            newParams.endTime = value;
            _self.pageParams = newParams;
          }
        });
      })
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.showLabelDialog){
            //会员标签管理弹窗
            _self.doAddMemberTag();
          }else{
            _self.search();
          }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
  beforeDestroy(){
    document.body.removeEventListener('keyup', this.bodyListener);
  },
    watch:{
      checkState:function (val) {
        if(val.length > 0 && val.length === this.list.length) {
          this.checkAllState = true;
        }else{
          this.checkAllState = false;
        }
      },
      pageParams:{
        handler: function () {
          if(this.pageParams.beginTime || this.pageParams.endTime || this.pageParams.tagId || this.pageParams.searchText || this.pageParams.levelNum){
            this.resetBtn = true;
          }else{
            this.resetBtn = false;
          }
        },
        deep: true
      }
    }
}
