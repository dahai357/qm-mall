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
    font-size: 15px;
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

  .btn-edit{
    z-index: 11111;
    opacity: 100;
    border-radius: 20px;
    position: absolute;
    bottom: 20px;
    left: 30%;
    height: 35px;
    line-height: 32px;
    color: #000;
    font-size: 15px;
    font-weight: bold;
  }
  .pencil{
    margin-right: 5px;
  }
  .num{
    font-size: 17px;
    font-weight: bold;
    color: #ff8519;
  }
  .card-bottom {
    padding: 5px 5px;
    display: flex;
    vertical-align: bottom;
    justify-content: center;
  }
  .left {
    width: 75px;
    color: #656565;
    line-height: 15px;
    height: 30px;
    margin-right: 10px;
  }
  a.select{
    text-decoration: none;
    position: absolute;
    top: 10px;
    left: 10px;
    background: #fff;
    width: 22px;
    height: 22px;
    border-radius: 22.8px;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  a.select .check-circle{
    color: gray;
    display: block;
    margin-top: -1px;
    margin-left: 1px;
    font-size: 23px;
  }
  a.selected .check-circle{
    color:#ff8519
  }
  a.btn-opt {
    width: 30px;
    height: 30px;
    display: block;
    font-size: 30px;
    float: left;
    margin-right: 8px;
  }
  a.btn-opt.copy{
    background-image: url(../../../../assets/images/poster-copy.png);
    background-size: cover;
  }
  a.btn-opt.copy:hover{
    background-image: url(../../../../assets/images/poster-copy-hover.png);
    background-size: cover;
  }
  a.btn-opt.edit{
    background-image: url(../../../../assets/images/poster-edit.png);
    background-size: cover;
  }
  a.btn-opt.edit:hover{
    background-image: url(../../../../assets/images/poster-edit-hover.png);
    background-size: cover;
  }
  a.btn-opt.del{
    background-image: url(../../../../assets/images/poster-del.png);
    background-size: cover;
  }
  a.btn-opt.del:hover{
    background-image: url(../../../../assets/images/poster-del-hover.png);
    background-size: cover;
  }
  .container{
    display: flex;
    width:100%;
  }
  .flow{
    display: flex;
    width:100%;
    position: relative;
/*    overflow: hidden;
    flex-wrap: wrap;
    justify-content: space-between;*/
    padding: 10px;
  }
  .flow li{
    width: 212px;
    position:absolute;
    top: 0;
    left: 0;
  }
</style>
<template>
  <div class="qm-store-class-base">
   <div class="hd-tabs mt20 ">
     <p class="tab-tit">共计已编辑制作<span class="num">{{pageParams.total}}</span>张海报</p>
   </div>
    <div class="container" :style="`height:${flowHeight}px`">
      <ul class="flow" >
        <li class="" v-for="(item,i) in list" :style="`transform: translate(${item.x_step}px, ${item.y_step}px);`">
          <div class="card">
            <img style="" width="100%"height="100%" :src="item.cover_src_url" alt="" >
            <a class="select" @click="changeSelect(item)" :class="item.selected?'selected':''"><i class="fa fa-check-circle check-circle"></i></a>
            <div class="card-bottom">
              <div class="left">{{item.gmt_update | datetime}}</div>
              <div class="right">
                <a class="btn-opt copy" title="复制" @click="copy(item)"></a>
                <a class="btn-opt edit" title="编辑" @click="edit(item)"></a>
                <a class="btn-opt del" title="删除" @click="del(item)"></a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
    <qm-tips :tipsVisible.sync="delDialog" :width="'420px'" @close="closeDel()" @cancel="closeDel()" @confirm="confirmDel()"  :cancelFront="true" :confirmClass="'ncsc-btn-orange'" :cancelClass="'ncsc-btn-orange-rim'">
      <template slot="title">提示信息</template>
      <template slot="content">
        确定删除该海报?
      </template>
    </qm-tips>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmTips from 'component/qm-tips/index';
  import {storePoster} from 'api'
  import storage from 'lib/utils/storage'
  import util from 'lib/utils/util'
  import Waterfall from "component/vue-waterfall/index";
  export default {
    name: "store-poster-list",

    data() {
      return {
        bodyListener:'',
        pageParams:{
          pageIndex:0,
          pageSize:20,
          total:0
        },
        list:[],
        delDialog:false,
        ids:[],
        flowHeight:0,
        heights:{
          1:212,
          2:213.05,
          12:169.59,
          11:159.25,
          13:211.28,
          14:212.7,

        }
      }
    },

    computed:{
      ...mapGetters('storePoster',{
        checkAll:'getCheckAll',
        wantDel:'getWantDel',
        getDelIds:'getDelIds',
        getSelfChange:'getSelfChange'
      })
    },

    components:{
      QmPagination,
      QmTips,
      Waterfall
    },

    filters:{
      datetime:function(value){
        return util.dateFormat(new Date(value*1000),'yyyy-MM-dd HH:mm:ss')
      },
    },
    methods: {
      ...mapActions('storePoster',{
        setDelIds: 'setDelIds',
        setWantDel:'setWantDel',
        setAll: 'setAll',
        setSelfChange:'setSelfChange'
      }),
      changeSelect(item){
        item.selected = !item.selected
        this.setSelfChange(true);
        this.refreshIds()
      },
      copy(item){
        let data = {
          'id':item.id
        }
        storePoster.copyHistory(data).then((res)=>{
          this.getPageData(this.pageParams)
          layer.msg(res.shortMessage)
        })
      },
      edit(item){
        storage.set('template_id',item.template_id)
        storage.set('history_id',item.id)
        this.$router.push("/promotion/store_poster/edit")
      },
      del(item){
        this.ids = [item.id]
        this.delDialog = true
      },
      closeDel(){
        this.delDialog=false
        this.setWantDel(false)
      },
      confirmDel(){
        let data = {
          'ids':this.ids.join(',')
        }
        storePoster.delHistory(data).then((res)=>{
          if(this.list.length == 1 && this.pageParams.pageIndex >0){
            this.pageParams.pageIndex -= 1
          }
          this.getPageData(this.pageParams)
          this.delDialog = false
          this.setDelIds([])
          this.setWantDel(false)
          layer.msg(res.shortMessage)
        })
      },
      refreshIds(){
        let tmpIds = []
        this.list.forEach((item,k)=>{
          if(true === item.selected){
            tmpIds.push(item.id)
          }
        })
        if(this.getSelfChange){
          if(tmpIds.length == this.list.length){
            this.setAll(true)
          }else{
            this.setAll(false)
          }

        }
        this.setDelIds(tmpIds)
      },
      getPageData(data){
        this.flowHeight = 0;
        storePoster.getHistoryList(data).then((res)=>{
          if(res.list.length == 0 && this.pageParams.pageIndex >= 1){
            this.pageParams.pageIndex--;
            this.getPageData(this.pageParams)
          }
          let x = 11;
          let y = 10;
          let y_step = 0;//纵向根据上面一个元素的高度
          let idx = 0;
          let row_count = Math.ceil(res.list.length/4);
          for(let i=0;i<row_count;i++){
            let line_max_height = 0;//每一行最高那个的高度
            for(let j=0;j<4;j++){
              let x_step = 212;//横向等于宽度
              if(res.list.length >= idx +1){
                let y_step = y;
                for(let n=0;n<i;n++){
                  y_step += (this.heights[res.list[idx-4*(n+1)].template_id] + 50)
                }
                res.list[idx].y_step = y_step
                res.list[idx].x_step = (x+((j>0?10:0)*j))+ x_step*j
                res.list[idx].selected = false
                if(this.heights[res.list[idx].template_id] > line_max_height){
                  line_max_height = this.heights[res.list[idx].template_id];
                }
                idx++;
              }
            }
            this.flowHeight += line_max_height;
          }
          this.flowHeight += 50*row_count;
          res.list.forEach((item,k)=>{
            res.list[k].selected = false
          })
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
          //this.$refs.waterfall.refresh()
          this.setAll(false)
        })
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
        this.setDelIds([])
      },
    },
    watch:{
      checkAll:function(val){
        if(this.getSelfChange){
          this.setSelfChange(false)
          return;
        }
        let tmpList = this.list
        tmpList.forEach((item,k)=>{
          tmpList[k].selected = val
        })
        this.list = tmpList
        this.refreshIds()
      },
      wantDel:function (val) {
        if(val){
          this.ids = this.getDelIds
          this.delDialog = true
        }else {
          this.delDialog = false
        }
      }
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
