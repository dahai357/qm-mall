<style scoped>
.base-info{
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 15px;
  color: #827f7f;
}
.base-info li{
  float: left;
}
.tip-doubt-word .tip-doubt-con .tip-txt {
  padding: 5px 10px;
  display: inline-block;
  position: relative;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #0093fa;
}
.memoSpan {
  margin-left: 50px;
  line-height: 20px;
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
.head-tips{
  font-size: 14px;
}
.set{
  color:#ff9a30;
}
.head-txt{
  margin: 0 5px;
}
.tit{
  font-size: 14px;
}
ul.sys-banner-list{
  display: flex;
  justify-content: center;
}
ul.sys-banner-list li{
  cursor: default;
  width: 100%;
  height: 70px;
  float: left;
  margin: 5px;
  position: relative;
}
ul.sys-banner-list li img{
  width: 100%;
  height: 100%;
}
.ncsc-upload-btn{
  display: block;
  width: 170px;
  height: 70px;
  position: relative;
  border: 1px dashed #ddd;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 5px;
}
.ncsc-upload-img-item .ncsc-upload-img-box{
  width: 170px;
  height: 70px;
}
.ncsc-upload-btn p{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 14px;
  line-height: 50px;
  height: 60px;
  color: #757575;
  text-align: center;
  z-index: 1;
  margin: 0;
  font-size: 25px;
  font-weight: bold;
}
.mask{
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background: #0C0C0C;
  position: absolute;
  top:0;
}
.ncsc-upload-avatar{
  position: relative;
}

.ncsc-form-default dl {
  line-height: 20px;
  display: table;
  width: 100%;
}


.ncsc-form-default dt {
  font-size: 14px;
  line-height: 30px;
  vertical-align: top;
  letter-spacing: normal;
  word-spacing: normal;
  text-align: right;
  display: table-cell;
  width: 19%;
  padding: 15px 1% 15px 0;
  margin: 0;
}

.ncsc-form-goods dl dt {
  width: 15.5%;
}
.ncsc-default-table
.ncsc-form-default dd {
  font-size: 14px;
  line-height: 30px;
  vertical-align: top;
  letter-spacing: normal;
  word-spacing: normal;
  display: table-cell;
  width: 79%;
  padding: 15px 0;
}

.ncsc-form-goods dl dd {
  width: 82.5%;
  padding: 15px 0 15px 1%;
}

.ncsc-default-table {
  padding:10px;
  width: 100%;
  border-collapse: collapse;
  line-height: 1.5;
}


.ncsc-default-table th, .ncsc-default-table td ,td{
  vertical-align: top;
  font-size: 14px;
}
.ncsc-default-table th{
  color: #666666;

}
.ncsc-default-table td a {
  width: 50px;
  font-size: 12px;
}
.ncsc-default-table th {
  background: #f9f9f9;
  padding: 10px;
  text-align: left;
}
.ncsc-mod-section{
  margin-bottom: 20px;
}
.has{
  color: #0093fa;
}
</style>
<template>
  <div class="qm-store-class-base">
    <div class="ncsc-form-default ncsc-form-wxpay">
      <div class="ncsc-mod-section">
        <div class="ncsc-mod-hd" onselectstart="return false;">
          <div class="ncsc-title">基本信息</div>
        </div>
      <div class="ncsc-mod-bd">
        <ul class="base-info" v-show="baseInfo.activity_name != ''">
          <li>砍价活动名称：{{baseInfo.activity_name}}</li>
          <li>活动开始时间：{{baseInfo.start_time}}</li>
          <li>活动结束时间：{{baseInfo.end_time}}</li>
        </ul>
        <ul class="base-info mt10" v-show="baseInfo.goods_name != ''">
          <li>商品名称：{{baseInfo.goods_name}}</li>
          <li>商品售价：{{baseInfo.goods_marketprice}}</li>
          <li>商品底价：{{baseInfo.goods_floor_price}}</li>
        </ul>
      </div>
      </div>
      <div class="ncsc-mod-section">
        <div class="ncsc-mod-hd" onselectstart="return false;">
          <div class="ncsc-title">商品砍价详情</div>
        </div>
      <div class="ncsc-mod-bd">
        <div class="search">
          <label>购买状态：</label>
          <select name="buy_state" v-model="searchBuyState">
            <option  v-for="(s,i) in buyState" :value="i">{{s}}</option>
          </select>
          <label>发起人：</label>
          <input type="text" class="w300 mr5" name="name" autocomplete="off" placeholder="支持用发起人昵称或手机号进行条件搜索" v-model="searchJoinMemberName">
          <input type="submit" class="ncsc-btn ncsc-btn-orange-rim" value="搜索" @click="search()">
        </div>
      </div>
      </div>
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="ncsc-default-table" >
          <thead>
          <tr>
            <th class="w280">发起人</th>
            <th class="w110">发起砍价时间</th>
            <th class="w120">参与砍价人数</th>
            <th class="w110">已砍金额</th>
            <th class="w170">当前金额</th>
            <th class="w110">购买状态</th>
            <th class="w110">订单状态</th>
          </tr>
          </thead>
          <tbody nctype="bundling_data"  class="bd-line tip" >
          <tr v-for="(item,key) in lists">
            <td>
              <div class="info-box">
                <div class="pic">
                  <img width="60" height="60" class="br100p" :src="item.member_avatar">
                </div>
                <div class="detail">
                  <p>{{item.member_name}}</p>
                  <p class="c-gray fs12"><span v-if="item.member_mobile.length == 11">{{item.member_mobile}}</span></p>
                </div>
              </div>
            </td>
            <td><span>{{item.gmt_create}}</span></td>
            <td><span v-if="item.join_count > 0"><a class="has" @click="showMembers(item.join_id)">{{item.join_count}}</a></span><span v-else>{{item.join_count}}</span></td>
            <td><span>{{item.all_cut_price}}</span></td>
            <td><span>{{item.remian_price}}</span></td>
            <td><span v-if="item.buy_state == 1">未购买</span><span v-else>已购买</span></td>
            <td><span>{{item.order_state}}</span></td>
          </tr>

          </tbody>
        </table>
      </template>
    </qm-table>
    </div>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
  import {mapGetters,mapActions,mapMutations} from 'vuex';
  import QmTable from 'component/qm-table/index';
  import {cutAct} from 'api'
  import util from 'lib/utils/util';
  import storage from 'lib/utils/storage'
  export default {
    name: "store-promotion-cut-view",

    data() {
      return {
        pageParams:{
          pageIndex:0,
          pageSize:10,
          total:1
        },
        searchJoinMemberName:'',
        searchBuyState:0,
        activity_id:0,
        activity_goods_id:0,
        baseInfo:{
          activity_name:'',
          start_time:'',
          end_time:'',
          goods_name:'',
          goods_marketprice:0,
          goods_floor_price:0,
        },
        lists:[],
        buyState:{
          0:'全部',
          1:'未购买',
          2:'已购买'
        }
      }
    },

    computed:{
    },

    components:{
      QmTable,
    },

    methods: {
      showMembers(joinId){
        let routeData = this.$router.resolve({
          name:"favorites_store_tag",
          params:{joinId:joinId}
        });
        window.open(routeData.href, '_blank');
      },
      search(){
        storage.set('cut_act_show_buy',0);
        let data = {
          activity_id:this.activity_id,
          member_name:this.searchJoinMemberName,
          buy_state:this.searchBuyState,
          goods_id:this.activity_goods_id
        }
        this.getJoinList(data);
      },
      goodsDetail(item) {
        if(item.desc === '已删除') {
          util.msg('商品不存在');
          return;
        }
        storage.set('goods_route_name',this.$route.name);
        let routeData = this.$router.resolve({
          name:"store_goods_add_step_two",
          params:{commonId:item.goods_commonid}
        });
        window.open(routeData.href, '_blank');
      },
      getBaseInfo(){
        let data = {
          activity_id:this.activity_id,
          goods_id:this.activity_goods_id
        }
        cutAct.getBaseInfo(data).then((res)=>{
          if(res.resultCode === 1){
            this.baseInfo.activity_name = res.responseContent.info.activity_name;
            this.baseInfo.start_time = res.responseContent.info.start_time;
            this.baseInfo.end_time = res.responseContent.info.end_time;
            if(res.responseContent.goods_info){
              this.baseInfo.goods_name = res.responseContent.goods_info.goods_name
              this.baseInfo.goods_marketprice = res.responseContent.goods_info.goods_marketprice
              this.baseInfo.goods_floor_price = res.responseContent.goods_info.goods_floor_price
            }
          }
        });
      },
      getJoinList(data){
        cutAct.getOriginJoinList(data).then((res)=>{
          if(res.list.length > 0){
            this.lists = res.list;
          }else{
            this.lists = []
          }
        });
      }
    },
    watch:{
    },
    mounted () {
      let act_id = storage.get('cut_act_id');
      let goods_id = storage.get('cut_act_goods_id');
      let show_buy = storage.get('cut_act_show_buy');
      if(act_id) {
        this.activity_id = act_id
      }
      if(goods_id){
        this.activity_goods_id = goods_id
      }
      let data = {activity_id:this.activity_id,goods_id:this.activity_goods_id,buy_state:0};
      if(show_buy == 1){
        this.searchBuyState = 2;
        data.buy_state = 2;
      }
      this.getBaseInfo();
      this.getJoinList(data);
    },
    beforeDestroy(){

    },
    updated(){
    },
  }
</script>
