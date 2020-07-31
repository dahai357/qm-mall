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
    <template slot="title">选择跳转组合销售活动</template>
    <template slot="content" >
      <div class="content">
        <span class="warn mb5">仅支持设置未开始和进行中的组合销售活动</span>
        <div class="ncsc-search-form mb10">
          <label>活动状态 </label>
          <select v-model="pageParams.progress_state" class="w100">
            <option value="0">全部</option>
            <option value="1">未开始</option>
            <option value="2">进行中</option>
          </select>
          <input type="text" @keyup.enter="search" placeholder="支持用活动名称进行搜索" class="w200 mr5" v-model="pageParams.bl_name">
          <a id="bundling_search_goods" nctype="search_a" class="ncsc-btn ncsc-btn-orange-rim" @click="search();">搜索</a>
          <a nctype="search_a" class="ncsc-btn ncsc-btn-orange" v-if="showReset" @click="resetSearch();">重置</a>
        </div>
        <div class="search-result" v-if="list && list.length>0">
          <table class="ncsc-table">
            <thead>
            <tr>
              <th class="w15"></th>
              <th>活动名称</th>
              <th class="w90">组合销售价</th>
              <th class="w80">库存数量</th>
              <th class="w80">活动状态</th>
              <th class="w110">开始时间</th>
              <th class="w110">结束时间</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in list" @click="selectChange(i)" :class="item.checked ? 'checked':''">
              <td><input type="radio" name="item" :checked="item.checked" />
              </td>
              <td>
                <div class="info-box">
                  <div class="pic">
                    <img width="60" height="60" :src="item.img"/>
                  </div>
                  <div class="detail">
                    <p>{{item.bl_name}}</p>
                  </div>
                </div>
              </td>
              <td>
                {{item.bl_discount_price}}
                <p class="c-gray td-lt">{{item.sumMarketPrice}}</p>
              </td>
              <td>{{item.bl_storage}}</td>
              <td>
                <p>{{item.state_des}}</p>
              </td>
              <td class="c-gray">{{item.bl_quota_starttime}}</td>
              <td class="c-gray">{{item.bl_quota_endtime}}</td>
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
  import {storePromotionBundling} from 'api'
  import QmPagination from 'component/qm-pagination/index';
  import QmDialog from 'component/qm-dialog/index';

  export default {
    name: "qm-bundling",

    data() {
      return {
        pageParams:{
          bl_name:'',
          progress_state:0,
          widthOutEnd:1,
          pageIndex:0,
          pageSize:5,
          total:0
        },
        list: [],
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
        storePromotionBundling.bundlingList(data).then((res)=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
          this.reset()
          if(this.includeItems.length > 0){
            this.includeItems.forEach((i,k)=>{
              this.list.forEach((i2,k2)=>{
                if(i2.bl_id == i.bl_id){
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
        if(this.pageParams.bl_name != '' || this.pageParams.progress_state > 0){
          this.showReset = true;
        }
        this.getPageData(this.pageParams);
      },
      resetSearch(){
        this.showReset = false;
        this.pageParams.pageIndex = 0;
        this.pageParams.bl_name = ''
        this.pageParams.progress_state = 0
        this.getPageData(this.pageParams);
      },
    },
    mounted() {
      var _self = this;
      _self.init();
    }
  }
</script>
