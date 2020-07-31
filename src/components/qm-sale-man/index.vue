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
  .sale_info ul{
    display: flex;
    padding:10px 0;
    border-bottom: 1px dashed #e3e3e3;
  }
  .sale_info ul li{
    display: inline-block;
    width: 100%;
  }
</style>

<template>
  <qm-dialog :dialogVisible="true" :showClose="false" :width="'800px'" @close="close()" :customClass="'phone-bind sale-add-goods'">
    <template slot="title">选择指定销售员</template>
    <template slot="content" >
      <div class="content">
        <div class="sale_info mb10">
          <ul>
            <li>活动名称：{{info.sale_act_id}} - {{info.sale_title}}</li>
            <li>活动状态：{{info.sale_act_state_des}}</li>
            <li>销售员数：{{info.sale_man_count}}</li>
          </ul>
        </div>
        <div class="ncsc-search-form mb10">
          <input type="text" @keyup.enter="search" placeholder="支持用销售员ID/销售员姓名/销售员手机号进行搜索" class="w400 mr5" v-model="pageParams.keyword">
          <a id="bundling_search_goods" nctype="search_a" class="ncsc-btn ncsc-btn-orange-rim" @click="search();">搜索</a>
          <a nctype="search_a" class="ncsc-btn ncsc-btn-orange" v-if="showReset" @click="resetSearch();">重置</a>
        </div>
        <div class="search-result" v-if="list && list.length>0">
          <table class="ncsc-table">
            <thead>
            <tr>
              <th class="w15"></th>
              <th class="w100">销售员ID</th>
              <th class="w80">销售员姓名/备注</th>
              <th class="w70">销售员手机号码</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in list" @click="selectChange(i)" :class="item.checked ? 'checked':''">
              <td><input type="radio" name="item" :checked="item.checked" />
              </td>
              <td>{{item.store_sale_id}}</td>
              <td>{{item.member_name}}</td>
              <td>{{item.member_mobile == '' ? '未绑定手机号':item.member_mobile}}</td>
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
        <input v-if="!reOpen" type="button" value="上一步，选择活动" class="ncsc-btn ncsc-btn-orange-rim fr" @click="preSave">
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
    name: "qm-sale-man",

    data() {
      return {
        pageParams:{
          keyword:'',
          sale_act_id:0,
          widthOutEnd:1,
          pageIndex:0,
          pageSize:10,
          total:0
        },
        list: [],
        info:{},
        curItem:{},
        showReset:false,
      }
    },
    props:{
      includeItems:{
        type:Array,
        default:()=>[]
      },
      saleItem:{
        type:Object,
        default:()=>{}
      },
      reOpen:{
        type:Boolean,
        default:()=>false
      }
    },
    components: {
      QmPagination,
      QmDialog

    },
    methods:{
      init(){
        this.pageParams.sale_act_id = this.saleItem.sale_act_id
        this.changeIndex(0);
      },
      save(){
        //判断当前销售员
        storePoster.checkSaleMan({store_sale_id:this.curItem.store_sale_id,sale_act_id: this.curItem.sale_act_id}).then(res => {
          if(res.responseContent.is_exist){
            this.$emit('save',this.curItem)
          }else{
            layer.msg('请选择销售员')
          }
        })

      },
      preSave(){
        this.$emit('preSave')
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
        storePoster.searchSaleActMan(data).then((res)=>{
          this.list = res.list;
          this.info = res.info;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
          this.reset()
          if(this.includeItems.length > 0){
            this.includeItems.forEach((i,k)=>{
              this.list.forEach((i2,k2)=>{
                if(i2.store_sale_id == i.store_sale_id){
                  i2.checked = true;
                  this.curItem = i2
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
        if(this.pageParams.keyword != ''){
          this.showReset = true;
        }
        this.getPageData(this.pageParams);
      },
      resetSearch(){
        this.showReset = false;
        this.pageParams.pageIndex = 0;
        this.pageParams.keyword = ''
        this.getPageData(this.pageParams);
      },
    },
    mounted() {
      var _self = this;
      _self.init();
    }
  }
</script>
