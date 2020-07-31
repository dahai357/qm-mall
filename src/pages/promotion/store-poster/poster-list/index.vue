<style scoped>
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
  .comm-span{display: block;font-size: 14px;color:#827f7f;}
  .comm-span:after{content: "\0020"; display: table; clear: both;}
  .comm-span li{float: left; padding: 0 15px; line-height: 25px; margin-left: -1px; position: relative; border-radius: 5px;
    margin-right: 10px;}
  .comm-span li:hover{cursor: pointer; color:#ff8519; }
  .comm-span a:hover{ text-decoration: none;}
  .comm-span .active{z-index: 2; background-color:#ffcc99; color:#ff6600}
  .tab-tit{
    color:#827f7f;
    margin-right: 15px;
    float: left;
  }
  .hd-tabs{
    height: 25px;
    line-height: 25px;
  }
  ul.poster{
    display: flex;
    flex-wrap: wrap;

  }
  ul.poster li{
    margin-right: 25px;
    width: 25%
  }
  ul.poster li img{
    width: 100%;
    overflow: hidden;
  }
  .tit{
    color:#827f7f;
    font-size: 14px;
  }
  .card{
    position: relative;
  }
  .card .btn-edit{
    display: none;
  }
  .card .mask{
    display: none;
  }
  .card:hover .btn-edit{
    display: block;
  }
  .card:hover .mask{
    display: block;
  }
  .card .mask{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    background-color: #000;
  }
  .btn-edit{
    z-index: 11111;
    opacity: 100;
    border-radius: 20px;
    position: absolute;
    bottom: 20px;
    left: 27%;
    height: 35px;
    line-height: 32px;
    color: #000;
    font-size: 15px;
    font-weight: bold;
  }
  .pencil{
    margin-right: 5px;
  }
</style>
<template>
  <div class="qm-store-class-base">
   <div class="hd-tabs mt20 mb20">
     <p class="tab-tit">海报类型：</p>
     <ul class="comm-span" id="storage_c_type">
       <li v-for="(item,key) in switchTypes" :class="pageParams.type == key ? 'active':''" @click="switchType(key)">{{item}}</li>
     </ul>
   </div>
    <Waterfall
      :list="list"
      :gutter="10"
      :width="240"
      :gridWidth="gridWidth"
      :breakpoints="{
    1200: { //当屏幕宽度小于等于1200
      rowPerView: 4,
    },
    800: { //当屏幕宽度小于等于800
      rowPerView: 3,
    },
    500: { //当屏幕宽度小于等于500
      rowPerView: 2,
    }
  }"
      backgroundColor="rgb(255, 255, 255)"
      ref="waterfall"
    >
      <template slot="item" slot-scope="props">
        <div class="card">
          <div class="mask"></div>
          <a class="ncsc-btn ncsc-btn-orange btn-edit" @click="goEdit(props.data)" ><img class="pencil" src="@/assets/images/pencil-circle.png">在线编辑</a>
          <img style="" width="100%"height="100%" :src="props.data.cover_src_url" alt="" @load="$refs.waterfall.refresh()">
        </div>
      </template>
    </Waterfall>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmTips from 'component/qm-tips/index';
  import {storePoster} from 'api'
  import storage from 'lib/utils/storage'
  import Waterfall from "component/vue-waterfall/index";
  export default {
    name: "store-poster-list",

    data() {
      return {
        bodyListener:'',
        switchTypes:{
          0:'全部',
          1:'分销系列',
          2:'促销系列',
        },
        pageParams:{
          type:0,
          pageIndex:0,
          pageSize:20,
          total:0
        },
        list:[],
        gridWidth: -1,
        reload:false,
      }
    },

    computed:{
    },

    components:{
      QmPagination,
      QmTips,
      Waterfall
    },

    methods: {
      goEdit(item){
        storage.set('template_id',item.id)
        storage.set('history_id',0)
        this.$router.push("/promotion/store_poster/edit")
      },
      getPageData(data){
        storePoster.getList(data).then((res)=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
          this.$refs.waterfall.refresh()
        })
      },
      switchType(key){
        this.pageParams.type = key
        this.pageParams.pageIndex = 0;
        this.getPageData(this.pageParams);
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
    },
    watch:{

    },
    mounted () {
      var _self = this;
      this.getPageData(this.pageParams);
      layui.use('layer', function(){
        this.layer = layui.layer;
      });

    },
    beforeDestroy(){

    },
    updated(){
    }
  }
</script>
