<style scoped>
.qm-store-class-base{
  padding:0;
}
.message-box2 .tit {
  font-size: 18px;
  font-weight: bold;
}
.eject_con dl dt {
    width: 9em;
}
.tit-span:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
<template>
  <div class="qm-store-class-base">
    <div class="message-box2 mt30">
      <div class="tit"><span class="tit-span" @click="gotoDetail"><i class="ico-sale"></i>{{sale_title}}</span></div>
    </div>
    <div class="search-form mt20 mb20 ">
      <span class="ncsc-form-tit">状态：</span>
      <select name="remit_state" id="pid" class="w150 mr5" v-model="pageParams.remit_state">
        <option value="0">全部状态</option>
        <option value="1">未打款</option>
        <option value="2" >已打款</option>
        <option value="3" >部分打款</option>
      </select>
      <input type="text" placeholder="可输入销售员ID/销售员手机号/销售员姓名/备注进行搜索" class="w350 mr5" v-model="pageParams.keyword" autocomplete="off">
      <!--<span class="ncsc-form-tit">业务员手机号：</span>-->
      <!--<input type="text" class="w170 mr5" v-model="pageParams.tel" autocomplete="off">-->
      <!--<span class="ncsc-form-tit">昵称：</span>-->
      <!--<input type="text" class="w170 mr5" v-model="pageParams.member_name" autocomplete="off">-->
      <input type="submit" class="ncsc-btn" value="搜索" @click="search()">
    </div>
    <p class="c-gray fs12">为避免统计后产生退款，造成佣金亏损问题；平台设立统计期，只有订单已完成且超过退款期后，系统才会自动为销售员统计对应订单的推广收益</p>
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <div class="operate-bar">
          <label class="mr10"><input type="checkbox" ref="selectAll" @change="selectAll($event)">本页全选</label>
          <a @click="batchDone" class="ncsc-btn-orange-unfilled">标记打款</a>
        </div>
        <table class="ncsc-table">
          <thead>
          <tr>
            <th class="w15"></th>
            <th class="w80">销售员ID</th>
            <th class="w120">手机号/姓名</th>
            <th class="w100">推广人数</th>
            <!--<th>产品信息</th>-->
            <th>销售数量</th>
            <th>销售金额</th>
            <th>已统计返利</th>
            <th>未统计返利</th>
            <th>已打款金额</th>
            <th class="w100">打款状态<el-tooltip placement="right" effect="light" popper-class="atooltip">
                <div slot="content" class="toolTipCont">
                    <div class="tip-doubt-con">
                        <p>打款状态为商家跟销售员之间的返利结算打款情况</p>
                        <p class="mt10">未打款，则商家未与销售员打款返利金额</p>
                        <p>部分打款，则商家已打款部分返利金额，未全部打款结算</p>
                        <p>全部打款，则商家已全部打款结算销售员的返利金额</p>
                    </div>
                </div>
                <p class="lightBlue">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                </p>
            </el-tooltip>
            </th>
            <th class="w100">操作</th>
          </tr>
          </thead>
          <tbody id="sale_act_sale_list" v-for="(item,i) in list">
          <tr>
            <td><input v-if="item.remit_btn == 2" type="checkbox"  :checked="item.checked" @change="selectChange($event,i)"/>
            </td>
            <td>{{item.store_sale_id}}</td>
            <td class="tc">
                <p>{{item.member_name}}</p>
                <p>{{item.member_mobile}}</p>
            </td>
            <td>
                <a v-if="parseInt(item.member_count) > 0" class="c-blue" style="text-decoration: underline" @click="goToPromoter(item)">{{item.member_count}}</a>
                <span v-else>{{item.member_count}}</span>
            </td>
            <!--<td>-->
              <!--<table class="ncsc-table-spec" v-if="item.goods.length > 0">-->
                <!--<thead>-->
                <!--<tr>-->
                  <!--<th class="col1">产品名称</th>-->
                  <!--<th class="w100">有效销售量</th>-->
                  <!--<th class="w80">操作</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr v-for="(gv,gi) in item.goods">-->
                  <!--<td class="col1">{{gv.goods_name}}</td>-->
                  <!--<td>{{gv.goods_num}}</td>-->
                  <!--<td>-->
                    <!--<a @click="showDetail(item,gv)">查看详情 </a>-->
                  <!--</td>-->
                <!--</tr>-->
                <!--</tbody>-->
              <!--</table>-->
              <!--<span class="c-gray" v-else>无销售信息</span>-->
            <!--</td>-->
            <td>
                <a v-if="parseInt(item.goods_num) > 0" class="c-blue" style="text-decoration: underline" @click="showDetail(item)">{{item.goods_num}}</a>
                <span v-else>{{item.goods_num}}</span>
            </td>
            <td>{{item.total_pay_price}}</td>
            <td>{{item.settled_rebate_amount}}</td>
            <td>{{item.no_settled_rebate_amount}}</td>
            <td>
                <a v-if="parseFloat(item.remit_amount) > 0" class="c-blue" style="text-decoration: underline" @click="openRecordDialog(item.sale_id)">{{item.remit_amount}}</a>
                <span v-else>{{item.remit_amount}}</span>
              <!--<table class="ncsc-table-spec" v-if="item.goods.length > 0">-->
                <!--<thead>-->
                <!--<tr>-->
                  <!--<th class="col1">产品名称</th>-->
                  <!--<th class="w100">有效销售量</th>-->
                  <!--<th class="w80">操作</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr v-for="(gv,gi) in item.goods">-->
                  <!--<td class="col1"><a  @click="openGoods(gv.goods_commonid)">{{gv.goods_name}}</a></td>-->
                  <!--<td>{{gv.goods_num}}</td>-->
                  <!--<td>-->
                    <!--<a @click="showDetail(item,gv)">查看详情 </a>-->
                  <!--</td>-->
                <!--</tr>-->
                <!--</tbody>-->
              <!--</table>-->
              <!--<span class="c-gray" v-else>无销售信息</span>-->
            </td>
            <td>{{item.remit_state}}</td>
            <td class="handle">
              <p>
                <a  v-if="item.remit_btn == 2" @click="markConfirm(item)" class="ncsc-btn" >标记打款</a>
                <a  v-else-if="item.remit_btn == 1"  class="ncsc-btn disabled" >标记打款</a>
              </p>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </qm-table>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
    <qm-tips :tipsVisible="dealDialog" :width="'420px'" @update:tipsVisible="dealDialog = $event" @close="dealDialog = false" @confirm="confirmDeal()">
      <template slot="title">提示信息</template>
      <template slot="content">是否标记为已结算？</template>
    </qm-tips>
    <qm-dialog :dialogVisible="recordDialog" :width="'750px'" @close="recordDialog = false">
      <template slot="title">打款记录</template>
      <template slot="content">
        <qm-table :pageParams="recordParams">
          <template slot="table">
            <table class="ncsc-table-spec ncsc-table">
              <thead>
              <tr>
                <th class="col1 w120">操作人</th>
                <th class="w120">标记打款时间</th>
                <th class="w80">打款金额</th>
                <th>打款备注</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in recordList">
                <td class="col1">{{item.seller_name}}</td>
                <td>
                    <p class="tc">{{item.remit_date}}</p>
                    <p class="tc">{{item.remit_time}}</p>
                </td>
                <td>¥{{item.remit_amount}}</td>
                <td>{{item.remit_remark}}</td>
              </tr>
              </tbody>
            </table>
          </template>
        </qm-table>
        <qm-pagination :pageParams="recordParams" @changeIndex="changeRecordIndex($event)"></qm-pagination>
      </template>
    </qm-dialog>
    <qm-dialog :dialogVisible="batchRemitDialog" :width="'550px'" @close="batchRemitDialog = false" :customClass="'phone-bind'">
      <template slot="title">批量标记打款</template>
      <template slot="content" >
        <div class="dialog_content">
          <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
            <div class="ncsc-form-s" >
              <dl>
                <dt>活动名称：</dt>
                <dd>{{sale_title}}</dd>
              </dl>
              <dl>
                <dt>结算类型：</dt>
                <dd>
                  <div class="ncsc-form-custom-radio-group">
                    <div :class="['ncsc-form-custom-radio',batchRemitDialogData.remit_type == 1 ? 'checked' : '']">
                      <div class="ncsc-custom-radio-frame">
                        <input type="radio" name="type" value="1" id="qrcode_type_1" class="ncsc-custom-radio" v-model="batchRemitDialogData.remit_type">
                      </div>
                      <label for="qrcode_type_1" class="ncsc-custom-txt">
                        <span class="name">全额打款</span>
                      </label>
                    </div>
                    <div :class="['ncsc-form-custom-radio',batchRemitDialogData.remit_type == 2 ? 'checked' : '']">
                      <div class="ncsc-custom-radio-frame">
                        <input type="radio" name="type" value="2" id="qrcode_type_2" class="ncsc-custom-radio" v-model="batchRemitDialogData.remit_type">
                      </div>
                      <label for="qrcode_type_2" class="ncsc-custom-txt">
                        <span class="name">打款指定金额</span>
                      </label>
                    </div>
                  </div>
                </dd>
              </dl>
              <dl v-show="batchRemitDialogData.remit_type == 2">
                <dt>本次打款金额：</dt>
                <dd>
                  <input  type="text" class="ncsc-form-control w300"  v-model="batchRemitDialogData.remit_amount">
                  <p class="c-orange">打款金额不得大于¥{{batchRemitDialogData.unpaid_amount}}</p>
                </dd>
              </dl>
              <dl>
                <dt>打款说明：</dt>
                <dd>
                  <textarea  cols="38" rows="10" v-model="batchRemitDialogData.remit_remark"></textarea>
                </dd>
              </dl>
            </div>
            <div class="bottom">
              <input type="button" value="提交" class="ncsc-btn ncsc-btn-orange fr" @click="batchRemitSubmit">
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </template>
    </qm-dialog>
      <qm-dialog :dialogVisible="remitDialog" :width="'550px'" @close="remitDialog = false" :customClass="'phone-bind'">
          <template slot="title">标记打款</template>
          <template slot="content" >
              <div class="dialog_content">
                  <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
                      <div class="ncsc-form-s" >
                          <dl>
                              <dt>活动名称：</dt>
                              <dd>{{sale_title}}</dd>
                          </dl>
                          <dl>
                              <dt>销售员：</dt>
                              <dd>{{remitDialogData.sale_name}}{{remitDialogData.sale_mobile ? '('+ remitDialogData.sale_mobile +')' : ''}}</dd>
                          </dl>
                          <dl>
                              <dt>已统计返利：</dt>
                              <dd>¥{{remitDialogData.settled_rebate_amount}}</dd>
                          </dl>
                          <dl>
                              <dt>剩余未打款金额：</dt>
                              <dd class="c-orange" style="font-size: 16px;">¥{{remitDialogData.unpaid_amount}}</dd>
                          </dl>
                          <dl>
                              <dt>本次打款金额：</dt>
                              <dd>
                                  <input  type="text" class="ncsc-form-control w300"  v-model="remitDialogData.remit_amount" @keyup="onlyNumberPrice($event,'remitDialogData.remit_amount')">
                                  <p class="c-orange">打款金额不得大于¥{{remitDialogData.unpaid_amount}}</p>
                              </dd>
                          </dl>
                          <dl>
                              <dt>打款说明：</dt>
                              <dd>
                                  <textarea  cols="38" rows="10" v-model="remitDialogData.remit_remark"></textarea>
                              </dd>
                          </dl>
                      </div>
                      <div class="bottom">
                          <input type="button" value="提交" class="ncsc-btn ncsc-btn-orange fr" @click="remitSubmit">
                          <div class="clear"></div>
                      </div>
                  </div>
              </div>
          </template>
      </qm-dialog>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmTable from 'component/qm-table/index';
  import QmTips from 'component/qm-tips/index';
  import QmDialog from 'component/qm-dialog/index';
  import {saleAct} from 'api'
  import storage from 'lib/utils/storage';
  import mixin from 'component/main/mixin';
  import util from 'lib/utils/util';
  export default {
    name: "sale-act-list",
    mixins:[mixin],
    data() {
      return {
        bodyListener:'',
        sale_title:'',
        dealDialog:false,
        pageParams:{
          pageIndex:0,
          pageSize:20,
          total:0,
          sale_act_id:0,
          remit_state:0,
          sale_id:0,
          member_name:'',
          tel:'',
          keyword:''
        },
        list:[],
        hasSelect:false,
        recordDialog:false,
        remitDialog:false,
        batchRemitDialog:false,
        recordParams:{
          total:10,
          pageIndex:0,
          pageSize:5,
          sale_id:0
        },
        recordList:[],
        remitDialogData:{
          sale_name:'',
          sale_mobile:'',
          settled_rebate_amount:'',
          unpaid_amount:'',
          remit_amount:'',
          remit_remark:'',
          sale_ids:0
        },
        batchRemitDialogData:{
          remit_type:1,
          remit_amount:'',
          remit_remark:'',
          unpaid_amount:'',
          sale_ids:''
        }
      }
    },

    computed:{

    },

    components:{
      QmTable,
      QmPagination,
      QmTips,
      QmDialog
    },

    methods: {
      goToPromoter(item) {
        storage.set('sale_id',item.sale_id);
        storage.set('sale_act_id',item.sale_act_id);
        storage.set('member_mobile',item.member_mobile)
        storage.set('member_name',item.member_name)
        this.$router.push({name:'sale_promoter_list'});
      },
      openRecordDialog(sale_id) {
        this.recordDialog = true;
        this.recordParams.pageIndex = 0;
        this.recordParams.sale_id = sale_id
        this.getRecordData();
      },
      getRecordData() {
        saleAct.getRemitRecord(this.recordParams).then(res=>{
          this.recordList = res.list;
          var newPageParams = _.clone(this.recordParams)
          newPageParams.total = res.total;
          this.recordParams = newPageParams;
        })
      },
      changeRecordIndex(index) {
        this.recordParams.pageIndex = index;
        this.getRecordData();
      },
      ...mapMutations('saleAct',{
        setUpdate: 'setUpdate',
        setPageIndex:'setPageIndex',
      }),
      gotoDetail() {
        storage.set('sale_act_id',this.pageParams.sale_act_id);
        this.$router.push('/promotion/sale_act/sale_act_add');
      },
      openGoods(goodsCommonId){
        let routeData = this.$router.resolve({
          name:"store_goods_add_step_two",
          params:{commonId:goodsCommonId}
        });
        window.open(routeData.href, '_blank');
      },
      search(){
        storage.set('keyword',this.pageParams.keyword);
        storage.set('remit_state',this.pageParams.remit_state);
        if(this.pageParams.sale_act_id){
          this.pageParams.pageIndex = 0;
          this.getPageData()
        }
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      getPageData(){

        if(this.$refs.selectAll) {
          this.$refs.selectAll.checked = false
        }
        saleAct.getSalesManList(this.pageParams).then((res)=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
        })
      },
      confirmDeal(){
        saleAct.changeIsClosing(this.pageParams).then((res)=>{
          this.dealDialog = false
          this.getPageData()
          this.setUpdate(true);
        })
      },
      markConfirm(item){
        // this.pageParams.sale_id = item.member_id
        // this.pageParams.sale_id = item.sale_id
        // this.dealDialog = true
        this.remitDialogData.sale_ids = item.sale_id;
        this.remitDialogData.sale_name = item.member_name;
        this.remitDialogData.sale_mobile = item.member_mobile;
        this.remitDialogData.settled_rebate_amount = item.settled_rebate_amount;
        this.remitDialogData.unpaid_amount = item.unpaid_amount;
        this.remitDialog = true;
      },
      showDetail(item,goods){
        storage.set('member_id',0)
        storage.set('sale_id',item.sale_id)
        storage.set('member_mobile',item.member_mobile)
        storage.set('member_name',item.member_name)
        // storage.set('goods_id',goods.goods_id)
        // storage.set('goods_name',goods.goods_name)
        this.$router.push('/promotion/sale_act/salegoods_list');
      },
      selectAll(event){
        var tempList = _.clone(this.list)
        tempList.forEach((item,i) => {
          if(event.target.checked){
            item.checked = true;
          }else{
            item.checked = false;
          }
        })
        this.updateList(tempList)
      },
      selectChange(event,i){
        var tempList = _.clone(this.list)
        if(event.target.checked){
          tempList[i].checked = true
        }else{
          tempList[i].checked = false
        }
        this.updateList(tempList)
      },
      updateList(data){
        this.list = data
        // var remains = this.list.map((item)=>{return item.checked?item.member_id:''}).filter(function(item){return item !==''})
        // this.pageParams.sale_id = this.list.map((item)=>{return ( item.checked && !item.is_closing)?item.member_id:''}).filter(function(item){return item !==''}).join(',')
        var remains = this.list.map((item)=>{return item.checked?item.sale_id:''}).filter(function(item){return item !==''})
        this.pageParams.sale_id = this.list.map((item)=>{return ( item.checked && item.remit_btn == 2)?item.sale_id:''}).filter(function(item){return item !==''}).join(',')
        this.batchRemitDialogData.sale_ids = this.pageParams.sale_id;
        if(remains.length !== this.list.length){
          this.$refs.selectAll.checked = false
        }else{
          this.$refs.selectAll.checked = true
        }
        if(this.pageParams.sale_id !== ''){
          this.hasSelect = true
        }else{
          this.hasSelect = false
        }
      },
      batchDone(){
        if(this.hasSelect){
          //this.dealDialog = true
          let min_unpaid_amount = '';
          let unpaid_amount;
          for (let item of this.list) {
            if(item.checked && item.remit_btn == 2) {
              unpaid_amount = parseFloat(item.unpaid_amount);
              if(min_unpaid_amount === '' || min_unpaid_amount >  unpaid_amount) {
                min_unpaid_amount = unpaid_amount;
              }
            }
          }
          this.batchRemitDialogData.unpaid_amount = min_unpaid_amount.toFixed(2);
          this.batchRemitDialog = true;
        }else{
          util.msg("请选择需要标记打款的销售员")
        }
      },
      remitSubmit() {
        if(this.remitDialogData.remit_amount === '') {
          util.msg('请输入本次打款金额');
          return;
        }
        if(parseFloat(this.remitDialogData.remit_amount) > parseFloat(this.remitDialogData.unpaid_amount)) {
          util.msg('打款金额不得大于剩余未打款金额');
          return;
        }
        if(this.remitDialogData.remit_remark === '') {
          util.msg('请填写打款说明');
          return;
        }
        let remitDialogData = _.clone(this.remitDialogData);
        remitDialogData.sale_act_id = this.pageParams.sale_act_id;
        saleAct.markRemit(remitDialogData).then(res=>{
          if(res.resultCode === 1 || res.resultCode === 30041) {
            this.remitDialog = false;
            this.remitDialogData.remit_amount = '';
            this.remitDialogData.remit_remark = '';
            this.getPageData();
          }
        })
      },
      batchRemitSubmit() {
        if(this.batchRemitDialogData.remit_type == 2) {
          if(this.batchRemitDialogData.remit_amount === ''){
            util.msg('请填写本次批量打款金额');
            return;
          }
          if(parseFloat(this.batchRemitDialogData.remit_amount) > parseFloat(this.batchRemitDialogData.unpaid_amount)){
            util.msg('不得大于最低打款金额');
            return;
          }
        }
        if(this.batchRemitDialogData.remit_remark === '') {
          util.msg('请填写打款说明');
          return;
        }
        let batchRemitDialogData = _.clone(this.batchRemitDialogData);
        batchRemitDialogData.sale_act_id = this.pageParams.sale_act_id;
        saleAct.markRemit(batchRemitDialogData).then(res=>{
          if(res.resultCode === 1 || res.resultCode === 30041) {
            this.batchRemitDialog = false;
            this.batchRemitDialogData.remit_amount = '';
            this.batchRemitDialogData.remit_remark = '';
            this.batchRemitDialogData.remit_type = 1;
            this.getPageData();
          }
        })
      }
    },
    watch:{
    },
    created(){

    },
    mounted () {
      var _self = this;
      layui.use('layer', function(){
        _self.layer = layui.layer;
      });
      _self.pageParams.sale_act_id = storage.get('sale_act_id')
      _self.sale_title = storage.get('sale_title')
      if(_self.pageParams.sale_act_id){
        _self.getPageData()
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
