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
    <template slot="title">选择分销活动</template>
    <template slot="content" >
      <div class="content">
        <span class="warn mb5">仅支持设置未开始和进行中的分销活动</span>
        <div class="ncsc-search-form mb10">
          <label>活动状态 </label>
          <select v-model="pageParams.progress_state" class="w100">
            <option value="0">全部</option>
            <option value="1">未开始</option>
            <option value="2">进行中</option>
          </select>
          <input type="text" @keyup.enter="search" placeholder="支持用活动ID/活动名称/参与的销售员进行搜索" class="w350 mr5" v-model="pageParams.keyword">
          <a id="bundling_search_goods" nctype="search_a" class="ncsc-btn ncsc-btn-orange-rim" @click="search();">搜索</a>
          <a nctype="search_a" class="ncsc-btn ncsc-btn-orange" v-if="showReset" @click="resetSearch();">重置</a>
        </div>
        <div class="search-result" v-if="list && list.length>0">
          <table class="ncsc-table">
            <thead>
            <tr>
              <th class="w15"></th>
              <th class="w100">活动名称</th>
              <th class="w80">销售员数</th>
              <th class="w70">活动状态</th>
              <th class="w100">开始时间</th>
              <th class="w100">结束时间</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in list" @click="selectChange(i)" :class="item.checked ? 'checked':''">
              <td><input type="radio" name="item" :checked="item.checked" />
              </td>
              <td>{{item.sale_act_id}} - {{item.sale_title}}</td>
              <td>{{item.sale_man_count}}</td>
              <td>{{item.sale_act_state_des}}</td>
              <td>
                <p>{{item.sale_start_date}}</p>
                <p>{{item.sale_start_time}}</p>
              </td>
              <td>
                <p>{{item.sale_end_date}}</p>
                <p>{{item.sale_end_time}}</p>
              </td>
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
        <input type="button" value="下一步，选择销售员" class="ncsc-btn ncsc-btn-orange fr" @click="save">
      </div>
    </template>
  </qm-dialog>

</template>

<script>
  import * as _ from 'lodash';
  import {saleAct} from 'api'
  import QmPagination from 'component/qm-pagination/index';
  import QmDialog from 'component/qm-dialog/index';

  export default {
    name: "qm-sale",

    data() {
      return {
        pageParams:{
          keyword:'',
          progress_state:0,
          widthOutEnd:1,
          sort:13,
          pageIndex:0,
          pageSize:10,
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
      getPageData(data){console.log(this.includeItems)
        saleAct.getList(data).then((res)=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
          this.reset()
          if(this.includeItems.length > 0){
            this.includeItems.forEach((i,k)=>{
              this.list.forEach((i2,k2)=>{
                if(i2.sale_act_id == i.sale_act_id){
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
        if(this.pageParams.keyword != '' || this.pageParams.progress_state > 0){
          this.showReset = true;
        }
        this.getPageData(this.pageParams);
      },
      resetSearch(){
        this.showReset = false;
        this.pageParams.pageIndex = 0;
        this.pageParams.keyword = ''
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
