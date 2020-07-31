<style scoped>
  .ncsc-article{word-break: break-all;}
  .ncsc-article .ncsc-article-hd{border-bottom:1px solid #eee; line-height: 2; padding-bottom:10px; position: relative;}
  .ncsc-article .ncsc-article-hd >>> .title{font-size: 20px;}
  .ncsc-article .ncsc-article-hd >>> .time{color:#757575;}
  .ncsc-article .ncsc-article-hd >>> .ncsc-btn{position: absolute; right: 0; bottom: 10px;}
  .ncsc-article .ncsc-article-bd{padding: 30px 0; line-height: 1.8; font-size: 14px;}
  .ncsc-article .ncsc-article-bd img,.ncsc-article .ncsc-article-bd >>> img{
    max-width:100%; vertical-align: bottom;
    width:auto;
    height:auto;
  }
  a:hover {
    color: #fff;
  }
</style>
<template>
  <div  class="qm-store-class-index">
  <div class="ncsc-article">
    <div class="ncsc-article-hd">
      <h3 class="title">{{info.article_title}}</h3>
      <div class="time">发布于 {{info.article_time}}</div>
      <router-link :to="{path: '/article'}" class="ncsc-btn ncsc-btn-orange-rim">
        返回
      </router-link>
    </div>
    <div class="ncsc-article-bd" v-html="info.article_content">
    </div>
  </div>
  </div>
</template>
<style scoped src="../../../assets/seller/css/style2018.css"></style>
<script>
  import util from 'lib/utils/util';
  import {home} from 'api'
  export default {
    name: "help_center_index",
    data(){
      return {
        info:{},
      }
    },
    computed:{
    },
    methods:{
      getPageData(data){
        home.getArticleDetail(data).then((res)=>{
          res.article_content = res.article_content.replace(/&lt;/g,"<")
          res.article_content = res.article_content.replace(/&gt;/g,">")
          this.info = res;
          console.log(this.info)
        })
      },
    },
    components:{
    },
    watch:{

    },
    mounted() {
      var data = {
        id:this.$route.params.id
      }
      this.getPageData(data)
    }
  }
</script>

<style scoped>

</style>
