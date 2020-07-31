<style scoped>
/* 奇数行背景色 */
.layui-table tr:nth-child(2n + 1) {
  /* background-color: #aaffaa; */
  background-color: #f8f8f8;
}
/* 偶数行背景色 */
.layui-table tr:nth-child(2n) {
  /* background-color: #aaffaa; */
  background-color: #fff;
}
/* 鼠标指向表格时,奇数行背景颜色 */
.layui-table tbody tr:hover {
  background-color: #ff9933;
  color: #fff;
}
.layui-table td,
.layui-table th {
  padding: 0 15px !important;
  line-height: 30px;
  min-height: 30px;
}
.show_more {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.problemcon {
  background-image: linear-gradient(#f8a00a, #fe7a18);
  position: relative;
  margin-top: 20px;
  width: 100%;
  padding: 30px 0 20px 0;
  box-shadow: 0 0 15px #a8a8a8;
}
.problem_d {
  padding: 20px 5px 2px 5px;
  position: relative;
  margin: 0 auto;
  width: 170px;
  background: #fff;
  border-radius: 5px;
}
.problem_d em {
  position: absolute;
  top: -10px;
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
   background-image: linear-gradient(#f99c0c, #f9990d);
}
.problem_d em.right_r {
  right: -5px;
}
.problem_d em.left_r {
  left: -5px;
}
.problem_d a {
  position: absolute;
  left: 20px;
  top: -18px;
  display: block;
  width: 130px;
  height: 36px;
  background: #0193fd;
  color: #fff;
  text-align: center;
  line-height: 34px;
  font-size: 18px;
  border-radius: 20px;
  text-decoration: none;
}
.problem_d a img {
  width: 25px;
  height: auto;
  margin-right: 5px;
}
.problemcon span {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;
}
.more_pro {
  position: absolute;
  top: -100px;
  left: 200px;
  background:#ff8518;
  min-width: 600px;
  z-index: 2000;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
}
.more_pro .dialog__header {
  background: #ff8518 url(../../assets/seller/images/seller/bg-ncsc-dialog.jpg)
    left center no-repeat;
  text-align: center;
  height: 54px;
  line-height: 54px;
  color: #fff;
  font-size: 20px;
}
.more_pro_con {
  padding: 3px;
}
.more_pro_con p{
  padding: 10px 15px 0 15px;
}
.more_pro lable {
  display: block;
  display: inline;
}

.more_pro a {
  display: inline;
  border: 1px solid #fff;
  text-align: center;
  color: #fff;
  line-height: 25px;
  border-radius: 3px;
  padding: 3px 10px;
  text-decoration: none;
}
.more_pro_con input {
  background:#fff;
  border: none;
}
.more_pro_con font{
  position: relative;
  top: -5px;
  display: block;
  width: 30px;
  float: right;
  font-size: 25px;
  color: #fff;
  text-align: right;
  cursor: pointer;
}
.more_d {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
}
.more_d em{
  background: #ff8518;
}
.more_d em.left_r{
  left: -3px;
}
.more_d em.right_r{
  right: -3px;
}
.pro_line {
  padding: 10px;
  display: block;
  text-align: right;
}
.pro_line span {
  text-align: right !important;
  color: #000;
}
.norecord {
    text-align: center;
  }
.norecord .ico-norecord {
  display: inline-block;
  width: 300px;
  height: 234px;
  vertical-align: middle;
  background: url(./assets/no-result.png) center top no-repeat;
}
.norecord .norecord-txt {
  margin-top: 30px;
  color: #757575;
}
.maincon{
  max-height: 500px!important;
  overflow-y: scroll;
  
}
.maincon img{
  width: 100%!important;
  height: auto;
}
/*修改滚动条样式*/
div::-webkit-scrollbar{
  width:10px;
  height:30px;
  /**/
}
div::-webkit-scrollbar-track{
  background: rgb(239, 239, 239);
  border-radius:2px;
}
div::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:10px;
}
div::-webkit-scrollbar-thumb:hover{
  background: #333;
}
div::-webkit-scrollbar-corner{
  background: #179a16;
}
/* .title-table{
  width: 160px;
}
.title-table td{
  display: inline-block;
  white-space: nowrap; 
  width: 100%; 
  overflow: hidden;
  text-overflow:ellipsis;

} */
</style>
<template>
    <div class="problemcon" v-if="showPro">
        <div class="problem_d">
            <a>
                <img src="./../../assets/images/pro.png">猜你想问
            </a>
            <em class="right_r"></em>
            <em class="left_r"></em>
            <table class="layui-table title-table" lay-even lay-skin="nob" color="red">
                <tbody>
                    <tr v-for="(item,index) in listInfo.list" @click="contentView(item)" v-if='index<5'>
                        <td>{{titleNum(item.faq_title,8)}}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <!-- v-if="listInfo.total>5" -->
        <div v-if="listInfo.total>5">
          <span v-if="!isMore" @click="isMore=true">查看更多>></span>
          <span v-else @click="isMore=false"><<收起</span>
        </div>
        
        <div class="more_pro" v-if="isMore">
            <div class="more_pro_con">
                <p>
                    <input type="text" placeholder="请输入你的问题" v-model="keywork">
                    <a @click="seachList">搜索</a>
                    <font @click="isMore=false">×</font>
                </p>
                <div class="problem_d more_d">
                    <em class="right_r"></em>
                    <em class="left_r"></em>
                    
                    <table class="layui-table" lay-even lay-skin="nob" color="red">
                        <tbody>
                            <tr
                                :key="item.id"
                                @mouseover="changeActive(index)"
                                @mouseout="showIndex=-1"
                                @click="contentView(item)"
                                v-for="(item,index) in moreList"
                            >
                                <td
                                    v-if="showIndex==index"
                                    :class="showIndex==index?'':'show_more'"
                                >{{item.faq_title}}</td>
                                <td v-else :class="showIndex==index?'':'show_more'">{{item.faq_title}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="empty-list" v-show="emptyShow">
                      <div class="norecord">
                        <i class="ico-norecord"></i>
                        <p class="norecord-txt">
                          暂无符合条件的数据记录
                        </p>
                      </div>
                    </div>
                    <!-- <div class="pro_line"> -->
                    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)" v-if="ispage"></qm-pagination>
                  <!-- </div> -->
                </div>
                
            </div>
        </div>
        <qm-dialog :dialogVisible="templateDialog" :width="'800px'" @close="closeDialog()">
            <template slot="title">{{titleNum(deTitle,40)}}</template>
            <template slot="content">
              <div class="maincon" id="maincon">
                <slot>
                    <div v-html="deContent" id="content2">
                    </div>
                    <div v-html="devideoUrl">

                    </div>
                </slot>
                <!-- <video width="100%" height="100%" controls v-if="devideoUrl!=''">
                    <source :src="devideoUrl"  type="video/mp4">
                </video> -->
              </div>
          
               
                <div class="bottom">
                    <input type="button" id="submit" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="closeDialog()">
                    <div class="clear"></div>
                </div>
            </template>
        </qm-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import util from "lib/utils/util";
import QmDialog from "component/qm-dialog/index";
import QmTable from 'component/qm-table/index';
import QmPagination from 'component/qm-pagination/index';
import * as _ from "lodash";
import {app} from 'api';
export default {
  name: "side-pro",
  data() {
    return {
      list: [],
      moreList:[],
      listInfo:{
        list:[],
        total:"",
      },
      secondMenu:'',
      showIndex: -1,
      templateDialog: false,
      showPro: true,
      isMore:false,
      deTitle:"",
      deContent:"",
      devideoUrl:'',
      keywork:'',
      pageParams: {//分页
        searchText:'',
        pageIndex: 0,
        pageSize: 10,
        total: 0,
      },
      pageParams2:{
        total: 0,
      },
      ispage:false,
      emptyShow:false,

    };
  },
  computed: {
    // ...mapGetters({
    //   getProLsits:'getProLsits',
    // })
    
  },
  watch:{
    $route(to,from){
      this.isMore=false;
      var urllink=this.$route.path;
       if(urllink=="/home"){
        this.secondMenu="home";
      }
      else{
        var strUrl=new Array();
        strUrl=urllink.split("/");
        this.secondMenu=strUrl[2];

      }
      var data={
          secondMenu:this.secondMenu,
          searchText:'',
          pageIndex:0,
          pageSize:10,
      };
      this.getList(data);
      }

      
  },
  mounted(){
    var urllink=this.$route.path;
    console.log(urllink)
    if(urllink=="/home"){
      this.secondMenu="home";
    }
    else{
      var strUrl=new Array();
      strUrl=urllink.split("/");
      this.secondMenu=strUrl[2];

    }
    
    
    var data={
        secondMenu:this.secondMenu,
        searchText:this.keywork,
        pageIndex:0,
        pageSize:10,
    };
    this.getList(data);
  },
  methods: {
    ...mapActions({
      getProList:'getProList',
      }),
    getList(data){
        this.getProList(data).then((res)=>{
          this.listInfo=res.responseContent;
          if(this.listInfo&&this.listInfo.list.length>0){
            this.showPro=true;
          }
          else{
            this.showPro=false;
          }
          this.listInfo.list=this.listInfo.list;
          this.moreList=this.listInfo.list;
          this.listInfo.total=this.listInfo.total;
          this.pageParams.total=this.listInfo.total;
          this.pageNum = Math.ceil(this.pageParams.total/this.pageParams.pageSize);
          console.log(this.pageNum)
          if(this.pageNum>1){
            this.ispage=true;
          }
          
      })
    },
    changeActive(index) {
      this.showIndex = index;
    },
    closeDialog() {
      this.deContent='';
      this.devideoUrl='';
      this.templateDialog = false;


    },
    contentView(item){
      this.templateDialog=true;
      this.deTitle=item.faq_title;
      var faq_content=item.faq_content;
      faq_content=faq_content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
      this.deContent=faq_content;
      var faq_video=item.video_url;
      // faq_video=faq_video.replace(/\=='/g,"==''");
      faq_video=faq_video.replace(/\<iframe/gi, '<iframe id="iframes" style="width:100%!important;height:450px!important" ');
      setTimeout(function(){
        var srclink=document.getElementById("iframes").src+"'"
        document.getElementById("iframes").src=srclink;
        var h=document.getElementById("maincon").scrollHeight;
        console.log(h)
        if(h<=500){
          document.getElementById("maincon").style.overflowY="hidden";

        }
        else{
          document.getElementById("maincon").style.overflowY="scroll";
        }
      },1000)
      this.devideoUrl=faq_video;
      console.log(this.devideoUrl)
    },
    seachList(){
      this.ispage=false;
      this.pageParams.searchText=this.keywork;
      this.pageParams.pageIndex = 0
      var data={
          secondMenu:this.secondMenu,
          searchText:this.pageParams.searchText,
          pageIndex:this.pageParams.pageIndex,
          pageSize:this.pageParams.pageSize,
        };
        this.getPageData(data);

    },
    changeIndex(index) {
      var data={
        secondMenu:this.secondMenu,
        searchText:this.keywork,
        pageIndex:index,
        pageSize:10,
      }
      this.pageParams.pageIndex = index;  
      this.getList(data);   
    },
    getPageData(data) {
        this.getProList(data).then((res) => {
          this.moreList=res.responseContent.list;
          this.pageParams.total=res.responseContent.total;
          this.pageParams2.total=res.responseContent.total;
          this.pageNum = Math.ceil(this.pageParams2.total/this.pageParams.pageSize);
          if(this.pageParams2.total==0){
            this.emptyShow=true;
          }
          else if(this.pageNum>1){
            this.ispage=true;
          }

        })
    },
    titleNum(item,num){
      var content=item;
      if(content.length>num){
        return content.substring(0,num)+"...";
      }
      else{
        return content;
      }
    }
  },
  components: {
    QmDialog,
    QmPagination,
    QmTable,
  }
};
</script>

<style scoped>
</style>
