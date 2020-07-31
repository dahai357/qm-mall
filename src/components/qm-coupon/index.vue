<style scoped>
  .content{
    border-radius: 5px;
  }
  .warn{
    color:red;
    display: inline-block;
  }
  .noresult {
    height: 280px;
    text-align: center;
    line-height: 280px;
  }
  .search-result table tr.checked{
    background:#fff4e9
  }
</style>

<template>
  <qm-dialog :dialogVisible="true" :width="'800px'" @close="close()" :customClass="'phone-bind sale-add-goods'">
    <template slot="title">选择优惠券</template>
    <template slot="content" >
      <div class="content">
        <span class="warn mb5">仅支持设置有效的优惠券</span>
        <div class="ncsc-search-form mb10">
          <select name="type" v-model="pageParams.type">
            <option value="-1">优惠券类型</option>
            <template v-for="(first,f) in couponTypes">
              <option :value="f" :key="f">{{first}}</option>
            </template>
          </select>
          <input type="text" @keyup.enter="search" placeholder="支持优惠券名称进行条件搜索" class="w250 mr5" v-model="pageParams.name">
          <a id="bundling_search_goods" nctype="search_a" class="ncsc-btn ncsc-btn-orange-rim" @click="search();">搜索</a>
          <a nctype="search_a" class="ncsc-btn ncsc-btn-orange" v-if="showReset" @click="resetSearch();">重置</a>
        </div>
        <div class="search-result" v-if="list && list.length>0">
          <table class="ncsc-table">
            <thead>
            <tr>
              <th class="w15"></th>
              <th>优惠券类型</th>
              <th>优惠券名称</th>
              <th>剩余张数</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in list" @click="selectChange(i)" :class="item.checked ? 'checked':''">
              <td><input type="radio" name="item" :checked="item.checked" />
              </td>
              <td>{{couponTypes[item.type]}}</td>
              <td>{{item.name}}</td>
              <td>{{item.is_limit_num==1?'不限制':(item.ticket_num - item.used_ticket_num)}}</td>
            </tr>
            </tbody>
          </table>
          <qm-pagination :scrollTop="false" :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
        </div>
        <div class="search-result noresult" v-else>
          <div>暂无符合条件的数据记录</div>
        </div>
      </div>
      <div class="bottom" style="margin-top: 0">
        <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="save">
      </div>
    </template>
  </qm-dialog>

</template>

<script>
  import * as _ from 'lodash';
  import {storePoster} from 'api'
  import QmPagination from 'component/qm-pagination/index';
  import QmDialog from 'component/qm-dialog/index';

  export default {
    name: "qm-coupon",

    data() {
      return {
        pageParams:{
          name:'',
          type:-1,
          pageIndex:0,
          pageSize:10,
          total:0
        },
        list: [],
        couponTypes:{
          1: "无门槛",
          2: "指定品类",
          3: "指定商品",
          4: "普通",
        },
        curItem:{},
        showReset:false,
      }
    },
    props:{
      includeItems:{
        type:Array,
        default:()=>[]
      }
    },
    components: {
      QmPagination,
      QmDialog

    },
    methods:{
      init(){
        this.changeIndex(0);
      },
      save(){
        this.$emit('save',this.curItem)
      },
      selectChange(i){
        this.reset()
        var tempList = _.clone(this.list)
        tempList[i].checked = true;
        this.curItem = tempList[i]
        this.list = tempList;
      },
      reset(){
        if( this.list &&  this.list.length > 0){
          this.list.forEach((item,k)=>{
            this.list[k].checked = false;
          })
        }
      },
      close(){
        this.$emit('close');
      },
      getPageData(data){
        storePoster.searchCouponList(data).then((res)=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
          this.reset()
          if(this.includeItems.length > 0){
            this.includeItems.forEach((i,k)=>{
              this.list.forEach((i2,k2)=>{
                if(i2.id == i.id){
                  this.curItem = i2
                  i2.checked = true;
                }
              })
            })
          }
        })
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      search(){
        this.pageParams.pageIndex = 0;
        if(this.pageParams.name != '' || this.pageParams.type != -1){
          this.showReset = true;
        }
        this.getPageData(this.pageParams);
      },
      resetSearch(){
        this.showReset = false;
        this.pageParams.pageIndex = 0;
        this.pageParams.name = ''
        this.pageParams.type = -1
        this.getPageData(this.pageParams);
      },
    },
    mounted() {
      var _self = this;
      _self.init();
    }
  }
</script>
