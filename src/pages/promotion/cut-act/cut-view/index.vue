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
      </div>
      </div>
      <div class="ncsc-mod-section">
        <div class="ncsc-mod-hd" onselectstart="return false;">
          <div class="ncsc-title">商品砍价情况</div>
        </div>
      <div class="ncsc-mod-bd">
        <div class="search">
          <label>商品名称：</label>
          <input type="text" class="w300 mr5" name="name" autocomplete="off" placeholder="输入商品名称，支持A+B+C的模糊搜索" v-model="searchGoodsName">
          <input type="submit" class="ncsc-btn ncsc-btn-orange-rim" value="搜索" @click="search()">
        </div>
      </div>
      </div>
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <table class="ncsc-default-table" >
          <thead>
          <tr>
            <th class="w280">商品名称</th>
            <th class="w110">参与活动总数</th>
            <th class="w110">商品底价</th>
            <th class="w110">发起砍价次数</th>
            <th class="w170">砍价价格购买数</th>
            <th class="">涉及用户<el-tooltip placement="bottom-start" effect="light" popper-class="atooltip" class="mt3" >
              <div slot="content" class="toolTipCont">
                <p>去重显示参与对应商品砍价活动的用户数</p>
                <p>若一个用户参与了同一个商品的砍价活动则只计算为1次</p>
              </div>
              <p class="lightBlue">
                <i class="fa fa-question-circle" aria-hidden="true"></i>
              </p>
            </el-tooltip></th>
          </tr>
          </thead>
          <tbody nctype="bundling_data"  class="bd-line tip" >
          <tr v-for="(og,key) in goods">
            <td class=" handler">
              <div class="info-box">
                <div class="pic">
                  <a target="_blank"  @click="goodsDetail(og)"><img nctype="bundling_data_img"  :src="og.src" width="60" height="60"></a>
                </div>
                <div class="detail">
                  <p><a target="_blank"  @click="goodsDetail(og)">{{og.goods_name}}</a></p>
                  <p v-if="og.desc" class="c-orange mt5">{{og.desc}}</p>
                </div>
              </div>
            </td>
            <td><span v-if="og.is_limit == 0">不限制</span><span v-else>{{og.goods_stock}}</span></td>
            <td><span>{{og.goods_floor_price}}</span></td>
            <td><span v-if="og.sponsor_count > 0"><a class="has" @click="showJoin(og.goods_id,0)">{{og.sponsor_count}}</a></span><span v-else>{{og.sponsor_count}}</span></td>
            <td><span v-if="og.order_count > 0"><a class="has" @click="showJoin(og.goods_id,1)">{{og.order_count}}</a></span><span v-else>{{og.order_count}}</span></td>
            <td><span>{{og.join_count}}</span></td>
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
        searchGoodsName:'',
        activity_id:0,
        baseInfo:{
          activity_name:'',
          start_time:'',
          end_time:''
        },
        goods:[]
      }
    },

    computed:{
    },

    components:{
      QmTable,
    },

    methods: {
      showJoin(id,type){
        storage.set('cut_act_goods_id',id);
        if(type == 1){
          storage.set('cut_act_show_buy',1);
        }else{
          storage.set('cut_act_show_buy',0);
        }
        this.$router.push("/promotion/cut_act/cut_join")
      },
      search(){
        let data = {
          activity_id:this.activity_id,
          goods_name:this.searchGoodsName
        }
        this.getGoods(data);
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
          activity_id:this.activity_id
        }
        cutAct.getBaseInfo(data).then((res)=>{
          if(res.resultCode === 1){
            this.baseInfo.activity_name = res.responseContent.info.activity_name;
            this.baseInfo.start_time = res.responseContent.info.start_time;
            this.baseInfo.end_time = res.responseContent.info.end_time;
          }
        });
      },
      getGoods(data){
        cutAct.getGoods(data).then((res)=>{
          if(res.list.length > 0){
            this.goods = res.list;
          }else{
            this.goods = []
          }
        });
      }
    },
    watch:{
    },
    mounted () {
      let id = storage.get('cut_act_id');
      if(id) {
        this.activity_id = id
      }
      this.getBaseInfo();
      this.getGoods({activity_id:this.activity_id});
    },
    beforeDestroy(){

    },
    updated(){
    },
  }
</script>
