
<template>
  <div class="pn-bd">
    <div class="ncsc-article">
      <div class="ncsc-article-hd">
        <h3 class="title">{{info.article_title}}</h3>
        <div class="time">发布于 {{info.article_time}}</div>
        <router-link :to="{path: '/help_center'}" class="btn-back">
          返回帮助中心 &raquo;
        </router-link>
      </div>
      <div class="ncsc-article-bd unique" v-html="info.article_content">
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

<style>
  /**不用在这里写任何代码，v-html样式无法在scoped中修改，所有需要用全局样式，并添加了unique标识*/
  .ncsc-article-bd.unique img {
      max-width: 100%;
  }
</style>
