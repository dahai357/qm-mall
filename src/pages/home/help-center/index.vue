<style scoped>

</style>
<template>
  <div class="pn-bd">
    <div class="search-box">
      <input type="text" placeholder="请输入搜索关键字" class="search-txt" name="keyword" v-model="pageParams.keyword" autocomplete="off">
      <input type="submit" class="btn-search" @click="search()" value="搜索">
    </div>
    <div class="mod mod-article-list">
      <div class="mod-hd">
        <div class="tit">全部文章</div>
      </div>
      <div class="mod-bd">
        <ul class="ncsc-default-tlist">
          <li v-for="(item,i) in list">
            <div class="time">{{item.article_time}}</div>
            <div class="detail">
              <div class="tit">
                <router-link :to="{path: '/help_center/detail/' + item.article_id}">
                  {{item.article_title}}
                </router-link>
              </div>
            </div>
          </li>
        </ul>
        <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
      </div>
    </div>
  </div>
</template>
<style scoped src="../../../assets/seller/css/style2018.css"></style>
<script>
  import util from 'lib/utils/util';
  import {mapActions,mapGetters} from 'vuex'
  import {home} from 'api'
  import QmPagination from 'component/qm-pagination/index'
    export default {
        name: "help_center_index",
      data(){
        return {
          list:[],
          pageParams:{
            keyword:'',
            type:2,
            pageIndex:0,
            pageSize:10,
            total:0
          },
        }
      },
      computed:{
      },
      methods:{
          getPageData(){
            home.getArticleList(this.pageParams).then((res)=>{
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
