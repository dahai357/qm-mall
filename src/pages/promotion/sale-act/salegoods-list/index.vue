<style scoped>
.qm-store-class-base{
  padding: 20px 0;
}
.message-box2 .tit {
  font-size: 18px;
  font-weight: bold;
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
        <div class="ncsc-title">{{pageParams.member_id > 0 ? '基本信息' : '基本信息'}}</div>
      </div>
      <div class="ncsc-mod-bd">
        <ul class="promoter-sale-info">
          <li>分销活动名称：{{pageParams.sale_title}}</li>
          <li>{{pageParams.member_id > 0 ? '被推广人昵称' : '销售员昵称'}}：{{pageParams.member_name}}</li>
          <li>{{pageParams.member_id > 0 ? '被推广人绑定手机号' : '销售员手机号'}}：{{pageParams.member_mobile ? pageParams.member_mobile : '未绑定手机号'}}</li>
        </ul>
      </div>
    </div>
    <div class="ncsc-mod-section">
      <div class="ncsc-mod-hd">
        <div class="ncsc-title">{{pageParams.member_id > 0 ? '购买详情' : '销售详情'}}</div>
      </div>
      <div class="ncsc-mod-bd" style="padding: 0">
        <div class="search-form mt20 mb20 ">
          <span class="ncsc-form-tit">下单时间：</span>
          <input type="text" class="input-add-on w90" name="query_start_date" id="query_start_date" :value="tempParams.query_start_date" readonly="readonly">
          <label class="add-on"><i class="fa fa-calendar" aria-hidden="true"></i></label>
          <span class="ncsc-sep">-</span>
          <input id="query_end_date" class="input-add-on w90" type="text" name="query_end_date" :value="tempParams.query_end_date" readonly="readonly">
          <label class="add-on"><i class="fa fa-calendar" aria-hidden="true"></i></label>
          <select  class="w120 mr5" v-model="tempParams.settle_state">
            <option value="0">全部统计状态</option>
            <option value="1">已统计</option>
            <option value="2">未统计</option>
          </select>
          <select  class="w120 mr5" v-model="tempParams.order_state">
            <option value="-2">全部订单状态</option>
            <option value="-1">已关闭</option>
            <option value="0">已取消</option>
            <option value="10">待付款</option>
            <option value="20">待接单</option>
            <option value="251">待配送</option>
            <option value="301">配送中</option>
            <option value="250">待到店自提</option>
            <option value="300">待确认收货</option>
            <option value="302">已送达</option>
            <option value="35">取消待确认</option>
            <option value="40">已完成</option>
          </select>
          <select  class="w120 mr5" v-model="tempParams.seller_state">
            <option value="-1">全部退款状态</option>
            <option value="0">无退款</option>
            <option value="1">待审核</option>
            <option value="2">同意退款</option>
            <option value="3">不同意退款</option>
          </select>
          <input type="text" placeholder="支持输入商品名称进行搜索" class="w170" v-model="tempParams.keyword" autocomplete="off">
        </div>
        <div class="mb10">
          <input type="submit" class="ncsc-btn ncsc-btn-orange" value="搜索" @click="search()">
          <input type="submit" class="ncsc-btn ncsc-btn-orange-rim" value="撤销检索" v-show="cancelBtnShow" @click="cancelSearch">
          <input type="submit" class="ncsc-btn ncsc-btn-orange-rim" value="导出销售订单明细" @click="exportSaleOrder()">
        </div>
        <qm-table :pageParams="pageParams">
          <template slot="table">
            <table class="ncsc-table">
              <thead>
              <tr>
                <th class="w170">订单号/商品名称</th>
                <th class="w110">买家昵称</th>
                <th class="w110">下单时间</th>
                <th class="w90">统计状态</th>
                <th class="w90">商品价格</th>
                <th class="w90">购买数量</th>
                <th class="w70">订单状态</th>
                <th class="w70">退货数量</th>
                <th class="w70">退货金额</th>
                <th class="w70">退款状态</th>
                <th class="w70">返利</th>
              </tr>
              </thead>
              <tbody id="sale_act_sale_list" v-for="(item,i) in list">
              <tr>
                <td>
                  <p>{{item.goods_name}}</p>
                  <p>{{item.order_sn}}</p>
                </td>
                <td>{{item.member_name}}</td>
                <td>
                  <p>{{item.add_date}}</p>
                  <p>{{item.add_time}}</p>
                </td>
                <td>{{item.settled_state}}</td>
                <td>{{item.goods_pay_price}}</td>
                <td>{{item.goods_num}}</td>
                <td>{{item.order_state}}</td>
                <td>{{item.refund_goods_num}}</td>
                <td>{{item.refund_amount}}</td>
                <td>{{item.seller_state? item.seller_state:''}} <span class="c-gray" v-if="!item.seller_state">-</span></td>
                <td>{{item.rebate_amount}}</td>
              </tr>
              </tbody>
            </table>
          </template>
        </qm-table>
        <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmTable from 'component/qm-table/index';
  import QmTips from 'component/qm-tips/index';
  import {saleAct} from 'api'
  import storage from 'lib/utils/storage'
  import exportData from 'lib/utils/export';
  export default {
    name: "sale-act-list",

    data() {
      return {
        bodyListener:'',
        dealDialog:false,
        cancelBtnShow:false,
        pageParams:{
          pageIndex:0,
          pageSize:10,
          total:0,
          sale_title:'',
          member_mobile:'',
          member_name:'',
          goods_name:'',
          sale_act_id:0,
          goods_id:0,
          sale_id:0,
          order_state:-2,
          seller_state:-1,
          settle_state:0,
          member_id:0,
          query_start_date:'',
          query_end_date:'',
          keyword:''
        },
        tempParams:{
          goods_name:'',
          query_start_date:'',
          query_end_date:'',
          order_state:-2,
          seller_state:-1,
          settle_state:0,
          keyword:''
        },
        list:[],
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
      exportSaleOrder() {
        saleAct.exportSaleOrder(this.pageParams).then((res)=>{
          exportData.exportExcelNew(res)
        })
      },
      search(){
        this.pageParams = {
          ...this.pageParams,
          ...this.tempParams
        }
        if(_.isEqual(this.tempParams,{
            goods_name:'',
            query_start_date:'',
            query_end_date:'',
            order_state:-2,
            seller_state:-1,
            settle_state:0,
            keyword:''
          })) {
          this.cancelBtnShow = false;
        }else{
          this.cancelBtnShow = true;
        }
        this.changeIndex(0);
      },
      cancelSearch() {
        this.tempParams = {
          goods_name:'',
          query_start_date:'',
          query_end_date:'',
          order_state:-2,
          seller_state:-1,
          settle_state:0,
          keyword:''
        };
        this.pageParams = {
          ...this.pageParams,
          ...this.tempParams
        }
        this.cancelBtnShow = false;
        this.changeIndex(0);
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      getPageData(){
        saleAct.getSaleGoodsList(this.pageParams).then((res)=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
        })
      },
      confirmDeal(){
        saleAct.changeIsClosing(this.subData).then((res)=>{
          this.dealDialog = false
          this.getPageData()
        })
      },
      markConfirm(item){
        this.subData.sale_id = item.member_id
        this.dealDialog = true
      }
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
            var newParams = _.clone(_self.tempParams);
            newParams.query_start_date = value;
            _self.tempParams = newParams;
          }
        });
        laydate.render({
          elem: '#query_end_date',
          theme: "#ff8519",
          trigger:'click',
          done: function (value) {
            var newParams = _.clone(_self.tempParams);
            newParams.query_end_date = value;
            _self.tempParams = newParams;
          }
        });

      });
      this.pageParams.sale_act_id = storage.get('sale_act_id')
      this.pageParams.sale_id = storage.get('sale_id')
      this.pageParams.goods_id = storage.get('goods_id')
      this.pageParams.sale_title = storage.get('sale_title')
      this.pageParams.member_mobile = storage.get('member_mobile')
      this.pageParams.member_name = storage.get('member_name')
      this.pageParams.goods_name = storage.get('goods_name')
      this.pageParams.member_id = storage.get('member_id')
      if(this.pageParams.sale_act_id){
        this.getPageData()
      }
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          _self.search();
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      //销毁键盘enter搜索事件
      document.body.removeEventListener('keyup', this.bodyListener);
    },
    updated(){
    }
  }
</script>
