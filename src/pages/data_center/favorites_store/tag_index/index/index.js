import {mapGetters,mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util';
import QmTips from 'component/qm-tips/index';
import QmTable from 'component/qm-table/index';
import QmDialog from 'component/qm-dialog/index';

export default {
    name: "store_transaction-index",
    data(){
        return {
          bodyListener:'',
          tipMessage:false,//操作完成倒计时关闭弹框
          errorMsg:'',//弹框错误提示语
          deleteDialogVisible:false,//删除确认弹框
          delLabelId:'',//删除的id
            pageParams:{
                pageIndex:0,
                pageSize:15,
                total:'',
            },
            list:[],
            totalList:[],
            trueNameList:[],//快递员姓名列表(用于搜索框列表)
            laypage:null,
            timeType:'week',
            dialogVisible:false,
            dialogVisibleFalse:false,
            imgUrl:'',
            hasImage:false,
            showEditLabel:false,//新增/编辑标签弹框
            editTagArr:{
              tagId:'',//标签id(编辑情况需要的参数)
              tagName:''//标签名字
            },
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
      QmDialog
    },
    methods: {
        ...mapActions({
          getData:'getTagList',
          delStoreTag:'delStoreTag',
          addStoreTag:'addStoreTag',
        }),
        getPageData(data){
          var _self = this;
           _self.getData(data).then((res)=>{
                _self.list = res.list;
             var newPageParams = _.clone(_self.pageParams)
             if(!res.list){
               newPageParams.total = 0;
             }else{
               newPageParams.total = res.list.length;
             }
             _self.pageParams = newPageParams;
            })
        },
        changeIndex(index){
            this.pageParams.pageIndex = index;
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
      },
        search(){
            this.pageParams.pageIndex = 0;
            this.getPageData(this.pageParams);
        },
      doDelStoreTag(){
          var data = [];
          var _self = this;
        _self.deleteDialogVisible =false;
          data['tagId'] = _self.delLabelId;
        _self.delStoreTag(data).then((res)=>{
          util.msg(res.shortMessage);
          if (res.resultCode === 1) {
            //编辑成功
            _self.getPageData(this.pageParams);
          }
        })
      },
      showAddStoreTag(tagId,tagName){
          //弹出新增/编辑标签弹框
        var _self = this;
        _self.editTagArr.tagId  = tagId;
        _self.editTagArr.tagName = tagName;
        _self.showEditLabel = true;
        this.$nextTick(function () {
          $('.error-p').hide();
        });
      },
      confirmDel(label_id){
        this.delLabelId = label_id;
        this.deleteDialogVisible = true;
      },
      doAddStoreTag(){
          //操作新增/编辑标签
        var _self = this;
        _self.editTagArr.tagName = $('#tag_name').val().trim();
        var flag = true;
        $('.error-p').hide();
        if( _self.editTagArr.tagName == ''){
          flag = false;
          $('#tag_name').next('.error-p').show();
        }
        if(flag){
          _self.addStoreTag(_self.editTagArr).then((res)=>{
            if(res.resultCode == 1 && res.responseContent.state == 1){
              //编辑成功
              _self.getPageData(this.pageParams);
              _self.showEditLabel = false;
              util.msg('操作成功');
            }else if(res.resultCode == 0){
              util.msg('已存在相同的标签');
            }else{
              util.msg('操作失败');
            }
          })
        }
      }
    },
    mounted () {
      var _self = this;
        _self.search();
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if(e.keyCode === 13){
          if (_self.showEditLabel){
            _self.doAddStoreTag();
          }else if(_self.deleteDialogVisible){
            //删除会员标签
            _self.doDelStoreTag()
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
