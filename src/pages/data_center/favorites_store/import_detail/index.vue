<style scoped>
  .tip-doubt-word .tip-doubt-con .tip-txt {
    padding: 5px 10px;
    display: inline-block;
    position: relative;
    border-radius: 5px;
    background: #fff;
    border: 1px solid #0093fa;
  }
  .td-lt {
    text-decoration: line-through;
  }
  .info-box .pic {
    padding-right: 15px;
    position: relative;
  }
  .info-box .detail {
    word-break: break-all;
  }
  .info-box .pic, .info-box .detail {
    display: table-cell;
    vertical-align: top;
  }
  .handle p{
    display: inline-block;
  }
  th,td{
    vertical-align: middle;
  }
  td .show-color{
    width:60px;
    height: 35px;
    border-radius:5px;
    display: inline-block;
  }
  .update-dialog dt{
    vertical-align: middle;
  }
  .titel-table td{
    font-size: 14px;
    padding-left: 70px;
    padding-bottom: 10px;
  }
</style>
<template>
  <div>
  <div class="menu-more"><a @click="doRouter('/user/favorites_store/import_user')" class="ncsc-btn ncsc-btn-orange">返回</a></div>
  <div class="clear"></div>
  <div class="qm-store-class-base">
    <div class="set-title fs14">导入记录说明</div>
    <table class="titel-table">
      <tr>
        <td>导入操作人：
          <span v-if="dataList.is_admin == 1">店主</span><span v-else>{{dataList.import_seller_mark}}</span>
          <span v-if="dataList.is_admin== 1 || dataList.import_seller_mark">({{dataList.seller_name}})</span>
          <span v-else>{{dataList.seller_name}}</span>
        </td>
        <td> <p>导入时间：<span>{{dataList.import_time}}</span></p></td>
        <td><p>所属会员标签：
          <span v-if="dataList.tag_name">{{dataList.tag_name}}</span>
          <span v-else>无标签</span>
        </p></td>
      </tr>
      <tr>
        <td> <p>会员等级：
          <span v-if="dataList.level_num > 0">VIP{{dataList.level_num}}-{{dataList.level_name}}</span>
          <span v-else>无等级</span>
        </p></td>
        <td> <p>成功导入：<span class="c-orange fb fs18 mr5">{{dataList.sus_num}}</span>条数据</p></td>
      </tr>
    </table>
    <div class="set-title fs14 mb20">导入会员数据</div>
    <!--统计数据展示-结束-->
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="ncsc-table table-transaction-online">
          <thead>
          <tr nc_type="table_header">
            <th style="width:40%;">会员手机号</th>
            <th style="width:40%;">更多信息</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item) in list">
            <td>{{item.import_mobile}}</td>
            <td>{{item.mark}}</td>
          </tr>
          </tbody>
        </table>
      </template>
    </qm-table>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
  </div>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css';
  import {mapGetters,mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmTable from 'component/qm-table/index';
  import QmTips from 'component/qm-tips/index';
  import util from 'lib/utils/util';
  import QmAddMember from 'component/qm-add-member/index';
  import storage from 'lib/utils/storage';
  export default {
    name: "user_level",

    data() {
      return {
        bodyListener:'',
        pageParams:{
          total:0,
          pageIndex:0,
          pageSize:15,
          ImportId:'',
        },
        list:[],
        dataList:[],
      }
    },

    computed:{
    },

    components:{
      QmPagination,
      QmTips,
      QmTable,
      QmAddMember,
    },

    methods: {
      ...mapActions({
        getImportMember: 'getImportMember',
      }),
      getPageData(){
        this.getImportMember(this.pageParams).then((res) => {
          this.dataList = res.responseContent.dataList;
          this.list = res.responseContent.memberList;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.responseContent.total;
          this.pageParams = newPageParams;
        })
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      search(){
        this.pageParams.pageIndex = 0;
        this.getPageData();
      },
      doRouter(url){
        this.$router.push(url);
      },
    },
    watch:{},
    mounted () {
      var _self = this;
      this.pageParams.importId = this.$route.params.import_id;
      this.search();
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
    },
  }
</script>
