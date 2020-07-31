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
</style>
<template>
  <div class="qm-store-class-base">
    <p class="C4 S7">可制作海报，用户扫码即可跳转对应组合销售活动页进行推广宣传&nbsp;&nbsp;<a class="orange" @click="$router.push('/promotion/store_poster/index')">前往制作>></a></p>
    <ul class="comm-tab mb20 mt20" id="storage_c_type">
      <li v-for="(item,key) in switchTypes" :class="pageParams.progress_state == key ? 'active':''" @click="switchType(key)">{{item}}</li>
    </ul>
    <el-tooltip placement="right" effect="light" popper-class="atooltip">
      <div slot="content" class="toolTipCont">
        <div class="tip-doubt-con">
          <div class="tip-txt c-gray fs12">
            <p><b class="c-black">未开始：</b>未到开始时间的活动。</p>
            <p class="mt5">
              <b class="c-black">进行中：</b>
              <span style="line-height: 20px;">在活动时间范围内的活动，状态有以下几种：</span><br>
              <span class="memoSpan">设置的活动销售数量已售空，将显示已售空</span><br>
              <span class="memoSpan">活动的搭配商品已下架或删除，将显示商品异常</span><br>
              <span class="memoSpan">活动的搭配商品没有库存，将显示为已缺货</span><br>
              <span class="memoSpan" style="color:red">已售空，商品异常，已缺货状态下前端将不展示该活动</span>
            </p>
            <p class="mt5"><b class="c-black">已结束：</b>过了活动时间的活动</p>
          </div>
        </div>
      </div>
      <p class="lightBlue">
        <i class="fa fa-question-circle" aria-hidden="true"></i>说明
      </p>
    </el-tooltip>
    <qm-table :pageParams="pageParams">
      <template slot="table">
        <div class="operate-bar">
          <label class="mr10"><input type="checkbox" ref="selectAll" @change="selectAll($event)">本页全选</label>
          <a @click="batchDel" class="ncsc-btn-orange-unfilled">删除</a>
        </div>
        <table class="ncsc-table">
          <thead>
          <tr>
            <th class="w15"></th>
            <th>活动名称</th>
            <th class="w90">组合销售价</th>
            <th class="w80">库存数量</th>
            <th class="w110">开始时间</th>
            <th class="w110">结束时间</th>
            <th class="w80">进度状态</th>
            <th class="w100">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,i) in list">
            <td><input type="checkbox"  :checked="item.checked" @change="selectChange($event,i)"/>
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
            <td class="c-gray">{{item.bl_quota_starttime}}</td>
            <td class="c-gray">{{item.bl_quota_endtime}}</td>
            <td>
              <p>{{item.state_des}}</p>
              <p class="fs12" style="color: red;" v-if="item.state_subdes">{{item.state_subdes}}</p>
            </td>
            <td class="handle">
              <p><a @click="edit(item)" class="ncsc-btn">管理</a></p>
              <p><a @click="delOne(item)" class="ncsc-btn">删除</a></p>
              <p><a class="ncsc-btn btn-copy" @click="copyLink(item)">复制链接</a></p>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="operate-bar">
          <label class="mr10"><input type="checkbox" ref="selectAll2"  @change="selectAll($event)">本页全选</label>
          <a @click="batchDel" class="ncsc-btn-orange-unfilled">删除</a>
        </div>
      </template>
    </qm-table>
    <qm-tips :tipsVisible="delDialog" :width="'420px'" @update:tipsVisible="delDialog = $event" @close="delDialog = false" @confirm="confirmDel()">
      <template slot="title">提示信息</template>
      <template slot="content">您确定要删除吗?</template>
    </qm-tips>
    <qm-tips :tipsVisible="noSelectDialog" :showCancel="false" :width="'420px'" @close="noSelectDialog = false" @confirm="noSelectDialog = false">
      <template slot="title">提示信息</template>
      <template slot="content">请选择需要操作的记录</template>
    </qm-tips>
    <qm-tips :tipsVisible="copyDialog" :showButton="false" :time="2" :width="'420px'" @close="copyDialog = false" @confirm="copyDialog = false">
      <template slot="title">提示信息</template>
      <template slot="content">成功复制到剪贴板</template>
    </qm-tips>
    <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
  import {mapGetters,mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmTable from 'component/qm-table/index';
  import QmTips from 'component/qm-tips/index';
  import {storePromotionBundling} from 'api'
  import storage from 'lib/utils/storage'
  export default {
    name: "store-promotion-bundling-list",

    data() {
      return {
        bodyListener:'',
        switchTypes:{
          0:'全部',
          1:'未开始',
          2:'进行中',
          3:'已结束'
        },
        pageParams:{
          progress_state:0,
          bundling_id:'',
          pageIndex:0,
          pageSize:10,
          total:0
        },
        list:[],
        filterList:[],
        hasSelect:false,
        delDialog:false,
        noSelectDialog:false,
        copyDialog:false
      }
    },

    computed:{

    },

    components:{
      QmPagination,
      QmTips,
      QmTable,
    },

    methods: {
      getPageData(data){
        storePromotionBundling.bundlingList(data).then((res)=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
          //取消复选框的选中
          this.$refs.selectAll.checked = false
          this.$refs.selectAll2.checked = false
        })
      },
      switchType(key){
        if(this.$refs.selectAll) {
          this.$refs.selectAll.checked = false
          this.$refs.selectAll2.checked = false
        }

        this.pageParams.progress_state = key
        this.pageParams.pageIndex = 0;
        this.getPageData(this.pageParams);
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
      search(){
        this.pageParams.pageIndex = 0;
        this.getPageData(this.pageParams);
      },
      selectAll(event){
        var tempList = _.clone(this.list)
        tempList.forEach((item,i) => {
          if(event.target.checked){
            item.checked = true;
          }else{
            item.checked = false;
          }
        })
        this.updateList(tempList)
      },
      batchDel(){
        if(!this.hasSelect){
          this.noSelectDialog = true
          return;
        }
        this.delDialog = true
      },
      delOne(item){
        this.pageParams.bundling_id = item.bl_id
        this.delDialog = true
      },
      edit(item){
        storage.set('active_id',item.bl_id)
        this.$router.push("/promotion/store_promotion_bundling/bundling_add")
      },
      confirmDel(){
        var data = {
          bundling_id:this.pageParams.bundling_id
        }
        storePromotionBundling.dropBundling(data).then((res)=>{
          this.delDialog = false
          this.pageParams.pageIndex = 0;
          this.getPageData(this.pageParams);
        })
      },
      selectChange(event,i){
        var tempList = _.clone(this.list)
        if(event.target.checked){
          tempList[i].checked = true
        }else{
          tempList[i].checked = false
        }
        this.updateList(tempList)
      },
      updateList(data){
        this.list = data
        var remains = this.list.map((item)=>{return item.checked?item.bl_id:''}).filter(function(item){return item !==''})
        this.pageParams.bundling_id = remains.join(',')
        if(remains.length !== this.list.length){
          this.$refs.selectAll.checked = false
          this.$refs.selectAll2.checked = false
        }else{
          this.$refs.selectAll.checked = true
          this.$refs.selectAll2.checked = true
        }
        if(this.pageParams.bundling_id !== ''){
          this.hasSelect = true
        }else{
          this.hasSelect = false
        }
      },
      copyLink(item){
        var url = 'gotoshenbd://share.shenbd.com/share.html?type=group&gid='+item.bl_id
        this.$copyText(url).then(function (e) {
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
        layer.msg("成功复制到剪贴板")
      }
    },
    watch:{
      list(){
        if(this.list.length == 0 && this.pageParams.pageIndex > 0){
          this.pageParams.pageIndex -= 1;
          this.getPageData(this.pageParams);
        }
      }
    },
    mounted () {
      var _self = this;
      this.getPageData(this.pageParams);
      layui.use('layer', function(){
        this.layer = layui.layer;
      });
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.delDialog){
            _self.confirmDel();
          }else{
            _self.search();
          }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      //销毁键盘enter搜索事件
      document.body.removeEventListener('keyup', this.bodyListener);
    },
    updated(){
     /* var temp_evaluate_list = _.clone(this.goods_evaluate_list)
      for(const key in temp_evaluate_list){
        this.qrcode(key,consts.SHARE_URL+'?type=goods&cid='+temp_evaluate_list[key].geval_goods_commonid+'&gid=0&sid='+temp_evaluate_list[key].geval_storeid)
      }*/
    }
  }
</script>
