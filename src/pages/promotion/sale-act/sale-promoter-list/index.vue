<style scoped>
  .qm-store-class-base{
    padding: 20px 0;
  }
  .promoter-sale-info{
    overflow: hidden;
  }
  .promoter-sale-info li{
    float: left;
    width: 33%;
    font-size: 14px;
  }
  .ncsc-mod-section {
    margin-bottom: 0;
  }
</style>
<template>
  <div class="qm-store-class-base">
    <div class="ncsc-mod-section">
      <div class="ncsc-mod-hd">
        <div class="ncsc-title">销售员基本信息</div>
      </div>
      <div class="ncsc-mod-bd">
        <ul class="promoter-sale-info">
          <li>分销活动名称：{{sale_title}}</li>
          <li>销售员昵称：{{member_name}}</li>
          <li>销售员手机号：{{member_mobile ? member_mobile : '未绑定手机号'}}</li>
        </ul>
      </div>
    </div>
    <div class="ncsc-mod-section">
      <div class="ncsc-mod-hd">
        <div class="ncsc-title">推广详情</div>
      </div>
      <div class="ncsc-mod-bd" style="padding-left: 0">
        <select  class="w150 mr5" v-model="pageParams.state">
          <option value="0">全部状态</option>
          <option value="1">正常</option>
          <option value="2" >已流失</option>
        </select>
        <span class="ncsc-form-tit">推广时间：</span>
        <input type="text" class="input-add-on w100" name="query_start_date" id="query_start_date" :value="pageParams.query_start_date" readonly="readonly">
        <label class="add-on"><i class="fa fa-calendar" aria-hidden="true"></i></label>
        <span class="ncsc-sep">-</span>
        <input id="query_end_date" class="input-add-on w100" type="text" name="query_end_date" :value="pageParams.query_end_date" readonly="readonly">
        <label class="add-on"><i class="fa fa-calendar" aria-hidden="true"></i></label>
        <a  class="ncsc-btn ncsc-btn-orange" @click="search">搜索</a>
      </div>
    </div>
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="ncsc-table">
          <thead>
          <tr>
            <th class="w100"></th>
            <th class="w150">昵称</th>
            <th class="w130">手机号</th>
            <th class="w130">状态</th>
            <th class="w130">被推广时间</th>
            <th class="w100">购买件数</th>
            <th class="w100"></th>
          </tr>
          </thead>
          <tbody id="sale_act_sale_list" v-for="(item,i) in list">
          <tr>
            <td></td>
            <td>{{item.member_name}}</td>
            <td>{{item.member_mobile}}</td>
            <td>{{item.state}}</td>
            <td>{{item.time}}</td>
            <td>
              <a v-if="parseInt(item.goods_num) > 0" class="c-blue" style="text-decoration: underline" @click="goToDetail(item)">{{item.goods_num}}件</a>
              <a v-else-if="item.goods" class="c-blue" style="text-decoration: underline" @click="goToDetail(item)">0件</a>
              <span v-else class="c-gray">无购买信息</span>
            </td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </template>
    </qm-table>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>

  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmTable from 'component/qm-table/index';
  import QmTips from 'component/qm-tips/index';
  import {saleAct} from 'api'
  import storage from 'lib/utils/storage'
  export default {
    name: "sale-promoter-list",

    data() {
      return {
        dealDialog:false,
        pageParams:{
          state:0,
          pageIndex:0,
          pageSize:15,
          total:0,
          sale_id:0,
          sale_act_id:0,
          query_start_date:'',
          query_end_date:'',
        },
        list:[],
        member_name:'',
        member_mobile:'',
        sale_title:''
      }
    },

    computed:{

    },

    components:{
      QmTable,
      QmPagination,
      QmTips,
    },

    methods: {
      goToDetail(item) {
        storage.set('sale_id',item.sale_id)
        storage.set('member_id',item.member_id)
        storage.set('member_mobile',item.member_mobile)
        storage.set('member_name',item.member_name)
        this.$router.push({name:'salegoods_list'});
      },
      search(){
        if(this.pageParams.sale_act_id){
          this.getPageData()
        }
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      search() {
        this.pageParams.pageIndex = 0;
        this.getPageData();
      },
      getPageData(){
        saleAct.getPromoterList(this.pageParams).then((res)=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
        })
      },
    },
    watch:{
    },
    created(){

    },
    mounted () {
      var _self = this;
      layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
          elem: '#query_start_date',
          theme: "#ff8519",
          trigger:'click',
          done: function (value) {
            var newParams = _.clone(_self.pageParams);
            newParams.query_start_date = value;
            _self.pageParams = newParams;
          }
        });
        laydate.render({
          elem: '#query_end_date',
          theme: "#ff8519",
          trigger:'click',
          done: function (value) {
            var newParams = _.clone(_self.pageParams);
            newParams.query_end_date = value;
            _self.pageParams = newParams;
          }
        });

      });
      this.pageParams.sale_id = storage.get('sale_id')
      this.pageParams.sale_act_id = storage.get('sale_act_id')
      this.member_name = storage.get('member_name')
      this.member_mobile = storage.get('member_mobile')
      this.sale_title = storage.get('sale_title')
      this.getPageData()
    },
    updated(){
    }
  }
</script>
