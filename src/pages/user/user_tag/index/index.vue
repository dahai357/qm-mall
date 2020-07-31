<style scoped>
  .layui-laypage, .layui-laypage em {
    border-radius: 5px !important;
    margin-right: 5px !important;;
  }
  .add-on {
    zoom: 1;
  }
  .add-on {
    line-height: 30px;
    background-color: #f3f3f3;
    vertical-align: middle;
    display: inline-block;
    text-align: center;
    width: 30px;
    height: 30px;
    border: solid #ddd;
    border-width: 1px 1px 1px 0;
    box-sizing: border-box;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-left: -5px;
    color: #757575;
  }
  .input-add-on {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    line-height: 30px;
    color: #212121;
    background-color: #FFF;
    vertical-align: middle;
    display: inline-block;
    height: 30px;
    padding: 0 10px;
    border: solid 1px #ddd;
    outline: 0 none;
    box-sizing: border-box;
    font-size: 12px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    color: #757575;
  }
  .qm-store-class-record{
    margin-top: 20px;
    padding-bottom: 20px;
  }
  .closeDiv{
    width: 500px;
  }
  #lightbox-container-image-data {
    padding: 0 10px;
    color: #666;
  }
  #lightbox-secNav-btnClose {
    width: 66px;
    float: right;
    /* padding-bottom: 0.7em; */
    margin-top: 10px;
  }
  .loader{
    height: 230px;
    text-align: center;
    vertical-align: middle;
    line-height: 230px;
  }
  input{font-size: 12px}
  .tab-div{
    width:23%;
    height: 130px;
    border:1px solid #ddd;
    border-radius:5px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding:10px;
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
  .tab-div p{
    padding-bottom: 5px;
  }
  .tab-div .tab-btn{
    margin-top: 10px;
    position:absolute;
    right:10px;
    bottom:10px;
  }
  .tab-div .tab-btn span{
    cursor:pointer;
  }
</style>
<template>
  <div>
    <div class="menu-more"><a class="ncsc-btn ncsc-btn-orange" @click="showAddStoreTag(0,'')">添加标签</a></div>
    <div class="clear"></div>
    <div class="qm-store-class-base">
      <div class="set-title fs16">标签展示</div>
      <div class="mt15">
        <qm-table :pageParams="pageParams">
          <template slot="table">
            <table class="ncsc-table">
              <div class="tab-div" v-for="(item) in list">
                <p class="fs12 fb">{{item.tag_name}}</p>
                <p class="c-gray">人数：<span :class="item.count>0?'c-blue':''">{{item.count}}</span></p>
                <p class="c-gray" v-if="item.update_time">最后编辑时间：<span>{{item.update_time}}</span></p>
                <div class="fs14 tab-btn c-blue">
                  <span class="mr10" @click="showAddStoreTag(item.tag_id,item.tag_name)">编辑</span>
                  <span @click="confirmDel(item.tag_id)">删除</span>
                </div>
              </div>
            </table>
          </template>
        </qm-table>
      </div>
      <qm-tips :tipsVisible="showEditLabel" :width="'480px'" @update:tipsVisible="showEditLabel = $event" :showCancel="false" @close="showEditLabel = false"  @confirm="doAddStoreTag()">
        <template slot="title"><span v-if="editTagArr.tagId > 0">编辑会员标签</span><span v-else>新增标签</span></template>
        <template slot="content">
          <div class="eject_con" style="text-align: left">
            <dl>
              <dt><i class="required">*</i>标签名称</dt>
              <dd>
                <input class="text w200" type="text" maxlength="5" name="tag_name" id="tag_name" :value.trim="editTagArr.tagName"/>
                <p class="error-p"><label class="error" style="font-size:14px;">请输入标签名称</label></p>
              </dd>
            </dl>
          </div>
        </template>
      </qm-tips>
      <qm-dialog :dialogVisible="tipMessage" :width="'500px'" @close="tipMessage == false">
        <template slot="title">提示信息</template>
        <template slot="content" >
          <div class="dialog-bd eject_con">
            <div class="dialog_message_contents comfirm"><i class="alert_info"></i><span>{{errorMsg}}</span></div>
            <dl class="bottom rightBtn">
              <dt></dt>
              <dd>
                2秒后页面跳转
              </dd>
            </dl>
          </div>
        </template>
      </qm-dialog>
      <qm-dialog :dialogVisible="deleteDialogVisible" :width="'500px'" @close="deleteDialogVisible = false">
        <template slot="title">提示信息</template>
        <template slot="content" >
          <div class="dialog-bd eject_con">
            <div class="dialog_message_contents comfirm"><i class="alert_info"></i>确认删除这个标签么?</div>
            <dl class="bottom rightBtn">
              <dt></dt>
              <dd>
                <label @click="doDelStoreTag()" class="submit-border"><input type="submit" class="ncsc-btn ncsc-btn-orange" value="确定"></label>
                <label @click="deleteDialogVisible = false" class="submit-border"><input type="submit" class="cancle btn-gray" value="取消"></label>
              </dd>
            </dl>
          </div>
        </template>
      </qm-dialog>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  import QmPagination from 'component/qm-pagination/index';
  import util from 'lib/utils/util';
  import QmTips from 'component/qm-tips/index';
  import QmTable from 'component/qm-table/index';
  import QmDialog from 'component/qm-dialog/index';
  export default {
    name: "store_transaction-index",
    data() {
      return {
        bodyListener: '',
        tipMessage: false,//操作完成倒计时关闭弹框
        errorMsg: '',//弹框错误提示语
        deleteDialogVisible: false,//删除确认弹框
        delLabelId: '',//删除的id
        pageParams: {
          pageIndex: 0,
          pageSize: 15,
          total: '',
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
        showEditLabel: false,//新增/编辑标签弹框
        editTagArr: {
          tagId: '',//标签id(编辑情况需要的参数)
          tagName: ''//标签名字
        },
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
        getData: 'getTagList',
        delStoreTag: 'delStoreTag',
        addStoreTag: 'addStoreTag',
      }),
      getPageData(data) {
        var _self = this;
        _self.getData(data).then((res) => {
          _self.list = res.list;
          var newPageParams = _.clone(_self.pageParams)
          if (!res.list) {
            newPageParams.total = 0;
          } else {
            newPageParams.total = res.list.length;
          }
          _self.pageParams = newPageParams;
        })
      },
      changeIndex(index) {
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
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
      doDelStoreTag() {
        var data = [];
        var _self = this;
        _self.deleteDialogVisible = false;
        data['tagId'] = _self.delLabelId;
        _self.delStoreTag(data).then((res) => {
          if (res.resultCode === 1) {
            //编辑成功
            _self.getPageData(this.pageParams);
          }
        })
      },
      showAddStoreTag(tagId, tagName) {
        //弹出新增/编辑标签弹框
        var _self = this;
        _self.editTagArr.tagId = tagId;
        _self.editTagArr.tagName = tagName;
        _self.showEditLabel = true;
        this.$nextTick(function () {
          $('.error-p').hide();
        });
      },
      confirmDel(label_id) {
        this.delLabelId = label_id;
        this.deleteDialogVisible = true;
      },
      doAddStoreTag() {
        //操作新增/编辑标签
        var _self = this;
        _self.editTagArr.tagName = $('#tag_name').val().trim();
        var flag = true;
        $('.error-p').hide();
        if (_self.editTagArr.tagName == '') {
          flag = false;
          $('#tag_name').next('.error-p').show();
        }
        if (flag) {
          _self.addStoreTag(_self.editTagArr).then((res) => {
            if (res.resultCode == 1 && res.responseContent.state == 1) {
              //编辑成功
              _self.getPageData(this.pageParams);
              _self.showEditLabel = false;
              util.msg('操作成功');
            } else if (res.resultCode == 0) {
              util.msg('已存在相同的标签');
            } else {
              util.msg('操作失败');
            }
          })
        }
      }
    },
    mounted() {
      var _self = this;
      _self.search();
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13) {
          if (_self.showEditLabel) {
            _self.doAddStoreTag();
          } else if (_self.deleteDialogVisible) {
            //删除会员标签
            _self.doDelStoreTag()
          }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy() {
      //销毁键盘enter搜索事件
      document.body.removeEventListener('keyup', this.bodyListener);
    },
  }
  </script>
