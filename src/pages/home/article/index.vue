<style scoped>
  .ncsc-search-form{color:#757575; font-size: 12px;}
  .ncsc-search-form .ncsc-form-tit, .ncsc-search-form input, .ncsc-search-form textarea, .ncsc-search-form select, .ncsc-search-form .ncsc-form-category-search, .ncsc-search-form .ncsc-btn{font-size: 12px;}
  .ncsc-search-form .ncsc-form-inline{margin-right:20px;}
  .ncsc-search-form .ncsc-sep{margin:0 3px;}
  .ncsc-search-form a, .ncsc-search-form span, .ncsc-search-form .quick-time{display: inline-block; vertical-align: middle;}
  .ncsc-search-form .quick-time .active{color:#ff8519;}

  .ncsc-default-tlist li{overflow: hidden; line-height: 40px; border-bottom:1px dotted #eee;}
  .ncsc-default-tlist .time{float: right; color:#757575; font-size: 12px; margin-left: 20px;}
  .ncsc-default-tlist .detail{overflow: hidden;}
  .ncsc-default-tlist .tit{overflow: hidden; text-overflow: ellipsis; white-space: nowrap;font-size:14px}
  a:hover {
    color: #ff8519;
  }
  /* 警示信息文字 */
  .warning-option{font-size: 0; line-height: 32px; color: #757575; text-align: center; padding: 100px 0;}
  .warning-option i{font-size: 24px; line-height: 32px; vertical-align: middle; letter-spacing: normal; word-spacing: normal; display: inline-block; margin-right: 8px;}
  .warning-option span{font: 14px/32px "microsoft yahei"; vertical-align: middle; letter-spacing: normal; word-spacing: normal; display: inline-block;}
  .nodata{color:#bbb; text-align: center;}

  .norecord{ text-align: center; padding: 50px 0;}
  .norecord .norecord-txt{ margin-top: 30px; color:#757575;}

</style>
<template>
  <div  class="qm-store-class-index">
    <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)">
    </qm-tabs>
    <div class="ncsc-search-form menu-more">
      <form method="get">
        <input type="text" placeholder="请输入搜索关键字" class="w160 mr5" name="keyword" v-model="pageParams.keyword" value=""><input type="button" @click="search()" class="ncsc-btn" value="搜索">
      </form>
    </div>
    <div class="qm-store-class-base">
      <ul class="ncsc-default-tlist" id="treet1">
        <li nc_type="table_item" v-for="(item,i) in list">
          <div class="time">{{item.article_time}}</div>
          <div class="detail">
            <div class="tit">
            <router-link :to="{path: '/article/detail/' + item.article_id}">
              {{item.article_title}}
            </router-link>
          </div>
          </div>
        </li>
        <div class="warning-option nodata" v-show="noResult"><span>暂无符合条件的数据记录</span> </div>
        <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
      </ul>
    </div>

  </div>
</template>
<script>
  import util from 'lib/utils/util';
  import {mapActions,mapGetters} from 'vuex'
  import {home} from 'api'
  import QmTabs from '../../../components/qm-tabs/index';
  import QmPagination from 'component/qm-pagination/index'
    export default {
        name: "article_list",
      data(){
        return {
          noResult:true,
          list:[],
          pageParams:{
            keyword:'',
            type:1,
            pageIndex:0,
            pageSize:10,
            total:0
          },
          tabs:{
            index:{name:'商城公告',select:true,act:'index'},
          },
        }
      },
      computed:{
      },
      methods:{
          getPageData(){
            home.getArticleList(this.pageParams).then((res)=>{
              if(!res.list){
                this.noResult = true
              }else{
                this.noResult = false
              }
              this.list = res.list;
              var newPageParams = _.clone(this.pageParams)
              newPageParams.total = res.total;
              this.pageParams = newPageParams;
            })
          },
        changeIndex(index){
          this.pageParams.pageIndex = index;
          this.getPageData(this.pageParams);
        },
          search(){
            this.getPageData()
          }
      },
      components:{
        QmPagination,
        QmTabs
      },
      watch:{

      },
      mounted() {
        this.getPageData()
      }
    }
</script>

<style scoped>

</style>
