<style scoped>
    .list-summary li {
        padding: 0 12px;
    }
    .overflow-ellipsis{
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
    .overflow-two-ellipsis {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
</style>
<template>
    <div class="qm-store-class-base">
        <div class="clear"></div>
        <div class="tab-style">
            <div class="qm-store-class-record">
                <div>
                    <span class="ncsc-form-tit" >订单号：</span>
                    <input type="text" v-model="pageParams.orderSn">
                    <span class="ncsc-form-tit" >商品名称：</span>
                    <input type="text" v-model="pageParams.goodsName">
                    <span class="ncsc-form-tit" >分销活动：</span>
                    <input type="text" v-model="pageParams.actName">
                    <span class="ncsc-form-tit" >销售员：</span>
                    <input type="text" placeholder="销售员姓名/备注/手机号" v-model="pageParams.saleName">
                </div>
                <div class="mt10">
                    <span class="ncsc-form-tit">订单状态：</span>
                    <select class="w140" @change="search" v-model="pageParams.orderState">
                        <option value="-2">全部状态</option>
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
                    <span class="ncsc-form-tit">下单时间：</span>
                    <input name="start_time" id="start_time" type="text" class="input-add-on w100" :value="pageParams.beginTime" readonly="readonly">
                    <label class="add-on"><i class="fa fa-calendar" aria-hidden="true"></i></label>
                    <span class="ncsc-sep">-</span>
                    <input name="end_time" id="end_time" type="text" class="input-add-on w100" :value="pageParams.endTime" readonly="readonly">
                    <label class="add-on mr5"><i class="fa fa-calendar icon-calendar"></i></label>
                    <span class="ncsc-form-tit">最近：</span>
                    <div class="quick-time js-quick-time">
                        <a href="javascript:;" @click="setTime(0)" class="mr5" :class="timeType == 0?'active':''">今天</a>
                        <a href="javascript:;" @click="setTime(1)" class="mr5" :class="timeType == 1?'active':''">昨天</a>
                        <a href="javascript:;" @click="setTime(6)" class="mr5" :class="timeType == 6?'active':''">最近7天</a>
                        <a href="javascript:;" @click="setTime(29)" class="mr5" :class="timeType == 29?'active':''">最近30天</a>
                    </div>
                    <input type="submit" class="ncsc-btn" value="搜索" @click="search()">
                </div>
            </div>
            <div class="c-gray mb20 fs12">注：以下只统计含分销商品的订单，且只统计对应订单内的分享商品数据，未参与分销活动的商品不显示</div>
            <div class="summary-box mb20" v-cloak>
                <ul class="list-summary">
                    <li>
                        <div class="name">
                            分销活动
                        </div>
                        <p class="num">{{statistics.act_num}}</p>
                    </li>
                    <li>
                        <div class="name">
                            销售员<span class="fs14">(位)</span>
                        </div>
                        <p class="num">{{statistics.sale_num}}</p>
                    </li>
                    <li>
                        <div class="name">
                            订单分销数量<span class="fs14">(件)</span>
                        </div>
                        <p class="num">{{statistics.goods_num}}</p>
                    </li>
                    <li>
                        <div class="name">
                            退款/取消数量<span class="fs14">(件)</span>
                        </div>
                        <p class="num c-red">-{{statistics.refund_goods_num}}</p>
                    </li>
                    <li>
                        <div class="name">
                            有效分销件数
                        </div>
                        <p class="num c-blue">{{statistics.effect_goods_num}}</p>
                    </li>
                    <li>
                        <div class="name">
                            退款/取消金额(元)
                        </div>
                        <p class="num c-red">-{{statistics.refund_amount}}</p>
                    </li>
                    <li>
                        <div class="name">
                            有效分销金额<span class="fs14">(元)</span>
                        </div>
                        <p class="num c-blue">{{statistics.goods_pay_price}}</p>
                    </li>
                    <li>
                        <div class="name">
                            订单数<span class="fs14">(单)</span>
                        </div>
                        <p class="num c-blue">{{statistics.order_num}}</p>
                    </li>
                </ul>
            </div>
            <qm-table :pageParams="pageParams">
                <template slot="table">
                    <table class="ncsc-table table-transaction-online">
                        <thead>
                        <tr>
                            <th class="w140">活动/销售员</th>
                            <th class="w140">订单号/下单时间</th>
                            <th class="w100">订单状态</th>
                            <th class="w180">商品名称</th>
                            <th>分销单件</th>
                            <th>分销数量</th>
                            <th>退款/取消<br/>数量</th>
                            <th>退款/取消<br/>金额</th>
                            <th>有效分销<br/>件数</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item) in list">
                            <td v-if="item.sale_act_id">
                                <p class="w140 overflow-ellipsis" :title="item.sale_act_id+'-'+item.sale_title">{{item.sale_act_id}}-{{item.sale_title}}</p>
                                <p>{{item.true_name}}-{{item.member_mobile}}</p>
                            </td>
                            <td v-else></td>
                            <td>
                                {{item.order_sn}}
                                <br/>
                                {{item.add_time}}
                            </td>
                            <td>{{item.order_state}}</td>
                            <td>
                                <p class="w180 overflow-two-ellipsis">{{item.goods_name}}</p>
                                <p class="c-gray">{{item.goods_spec}}</p>
                            </td>
                            <td>
                                ¥{{item.goods_pay_price}}
                            </td>
                            <td>{{item.goods_num}}</td>
                            <td>{{item.refund_goods_num}}</td>
                            <td>¥{{item.refund_amount}}</td>
                            <td>{{item.effect_goods_num}}</td>
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
  import QmPagination from 'component/qm-pagination/index';
  import QmTable from 'component/qm-table/index';
  import {saleOrderStatistics} from 'api';
  import moment from 'moment';
  export default {
    name: "sale-order-statistics-index",
    data() {
      return {
        timeType:0,
        pageParams:{
          beginTime:'',
          endTime:'',
          pageIndex:0,
          pageSize:15,
          total:12,
          goodsName:'',
          orderSn:'',
          actName:'',
          saleName:'',
          orderState:-2
        },
        list:[],
        statistics:{},
      }
    },

    computed:{

    },

    components:{
      QmPagination,
      QmTable
    },

    methods: {
      setTime(type){
        var date = new Date();
        var _self = this;
        _self.timeType = type;
        if(type == -1){
          //时间控件选择变化，不进行查询
          $('.mr5').removeClass('active');
          // _self.pageParams.beginTime = $('#start_time').val();
          // _self.pageParams.endTime = $('#end_time').val();
        }else{
          _self.pageParams.beginTime = moment(new Date(date-type*24*3600*1000)).format('YYYY-MM-DD');

          if(type == 1){
            //昨天的日期选择，结束时间也要是昨天
            _self.pageParams.endTime = moment(new Date(date-type*24*3600*1000)).format('YYYY-MM-DD');
          }else{
            _self.pageParams.endTime = moment(date).format('YYYY-MM-DD');
          }
          _self.search();
        }
      },
      getPageData(){
        saleOrderStatistics.getSaleOrderList(this.pageParams).then(res=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
        })
      },
      getStatistics() {
        saleOrderStatistics.getSaleOrderStatistics(this.pageParams).then(res=>{
            this.statistics = res;
        })
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData();
      },
      search(){
        this.pageParams.pageIndex = 0;
        this.getPageData();
        this.getStatistics();
      },
    },
    watch:{

    },
    mounted () {
      var _self = this;
      _self.setTime(_self.timeType);
      layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
          elem: '#start_time',
          theme: "#ff8519",
          trigger:'click',
          done:function (data) {
            var newParam = _.clone(_self.pageParams);
            newParam.beginTime = data
            _self.pageParams = newParam;
            _self.setTime(-1);
          }
        });
        laydate.render({
          elem: '#end_time',
          theme: "#ff8519",
          trigger:'click',
          done:function (data) {
            var newParam = _.clone(_self.pageParams);
            newParam.endTime = data
            _self.pageParams = newParam;
            _self.setTime(-1);
          }
        });
      })
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          _self.search();
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      document.body.removeEventListener('keyup', this.bodyListener);
    },
  }
</script>
