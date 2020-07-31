<style scoped>
.qm-store-class-base{
  padding:0;
}
  .eject_con{
    padding:20px 0;

  }
  .form-hd{

  }
.eject_con dl dt{
  width: 8em;
}
  .ml22{
    margin-left: 22px;
  }
  input.batch-file{
    -webkit-border-radius: initial;
    -moz-border-radius: initial;
    border-radius: initial;
    display: block;
    width: 180px;
  }
  a.demo{
    color: #0D9BF2;
    display: inline-block;
    cursor: pointer;
  }
  a.btn-import{
    margin-left: 11.2em;
    margin-top: 0.5em;
  }
.list-category2 li{ font-size: 12px;position: relative; box-sizing: border-box;padding: 0 10px; }
.list-category2 li:first-child{ border:none;}
.list-category2 li:hover{ cursor: pointer; background:#f5f5f5;}
.list-category2 .btn-del{ display: block; height: 20px; line-height: 20px; width: 20px; text-align: center; font-family: SimSun; color:#333; position: absolute; top: 50%; margin-top: -10px; right: 10px;}
.list-category2 .btn-del:hover{text-decoration: none; color: #ff8519;}
.list-category-used{max-height: 150px}
.list-category-used li{ line-height: 29px; border-top:1px dotted #ddd;}

.category-used{ display: inline-block; vertical-align: middle; position: relative; font-size:12px; width: 250px;}
.category-used .category-tit{ border:1px solid #ddd; color:#757575; line-height: 30px;height:30px; box-sizing: border-box;border-radius:5px;     padding: 0 10px; }
.category-used .category-tit i{ color:#757575; position: absolute; right: 10px; top: 7px;}
.pop-category-used{ position: absolute; left: 0; width: 100%; box-sizing: border-box; top: 30px; border:1px solid #ddd; z-index:
  500; background: #fff;  max-height: 302px; overflow-y: auto;}
.category-used:hover{ cursor: pointer;}
.category-used.active .category-tit{ color:#333;border-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius: 0;}
.category-used.active .category-tit i{ color:#333}
.modify_category{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
  line-height: 30px;
  height: 30px;
}
.modify_category:hover{
  color: white;
}
  .processing{
    width: 100%;
    height: 535px;
  }
.processing-ico{
  position: relative;
  top: 153px;
  margin: 0 auto;
  text-align: center;
  width: 170px;
  height: 170px;
}
.processing-ico img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation:turn 1.5s linear infinite;
}
@keyframes turn{
  0%{-webkit-transform:rotate(0deg);}
  25%{-webkit-transform:rotate(90deg);}
  50%{-webkit-transform:rotate(180deg);}
  75%{-webkit-transform:rotate(270deg);}
  100%{-webkit-transform:rotate(360deg);}

}
.process-txt{
  line-height: 170px;
  font-size: 32px;
  font-weight: bold;
  background-image: linear-gradient(to top, #ff4b55, #f7be5c);
  color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
}

.alert-hint{padding: 30px 0; background: none; text-align: center; color:#212121; font-size: 14px;}
.alert-hint h2{font-size: 30px; margin-top: 20px;}
.alert-hint h4{font-size: 20px; margin-top: 20px;}
.alert-hint a{color: #ff8519;}
.alert-hint .link-box{margin:20px -10px 0;}
.alert-hint .link-box a{margin:0 10px}
.alert-hint .msg{ background: #fff3e7; display: inline-block; width: 40%; padding: 15px;}
.btn-orange-border{color:#ff8519; border:1px solid #ff8519; line-height: 2.5; padding: 0 .8em; border-radius:.25em; font-size: 14px; display: inline-block;}
.btn-orange-border:hover{background:#ff8519; color:#fff; text-decoration: none;}
</style>
<template>
  <div class="qm-store-class-base">
    <div class="eject_con">
      <div v-show="taskStatus == 'doing'">
        <div class="processing">
          <div class="processing-ico">
            <img src="../../../../assets/images/waiting.png"/>
            <span class="process-txt">{{process}}%</span>
          </div>
        </div>
        <p class="processing-tips C4 S7">注：抓取数据需要一些时间，已为您自动切至后台导入模式，切换其他页面并不影响数据导入进度。</p>
      </div>
      <div v-show="taskStatus == 'done'">
        <div class="alert alert-hint" v-if="isSuccess">
          <i class="ico-success"></i>
          <h2>恭喜您，商品导入成功！&nbsp;&nbsp;</h2>
          <p class="link-box">
            本次共计导入{{successCount}}个商品，导入的商品在仓库中，您可修改价格、库存后进行上架
          </p>
          <h4>您还可以:</h4>
          <ul>
            <li>1. 继续 " <a href="javascript:;" @click="reload()">导入商品</a>"</li>
            <li>2. 进入 " 商品管理" 管理 "<a href="javascript:;" @click="$router.push({name:'store_goods_offline_index'})">仓库中的商品</a>"</li>
          </ul>
        </div>
        <div class="alert alert-hint" v-else>
          <i class="ico-wrong"></i>
          <h2>抱歉，本次商品导入失败！&nbsp;&nbsp;</h2>
          <p class="link-box">
            失败原因：目前导入仅支持淘宝商品链接<template v-if="subType == 1">，请核查导入文档中的商品链接</template>
          </p>
          <ul>
            <li><a href="javascript:;" @click="reload()">重新进行商品导入</a></li>
          </ul>
        </div>
      </div>
      <div v-show="taskStatus == 'none'">

        <p class="fs14 mb10 c-orange">通过商品链接把淘宝商品导入商城。</p>
        <div class="ncsc-form-s">
          <p class="fs14 mb10 c-gray form-hd"><i class="fa fa-square mr10 c-orange"></i>单个商品导入</p>
          <dl class="ml22">
            <dt>商品所属分类：</dt>
            <dd>
              <div :class="[showSingleMoreClass?'active':'','category-used']" class="w500"  id="category_used" >
                <input :readonly="modifySingleClassReadOnly" class="category-tit w500" type="text" v-model="singleKeyword" @input="searchClass($event,0)"/>
                <i @click="clearClassSearch(0)" v-show="singleKeyword != ''" class="fa fa-times-circle" style="position: absolute;right: 7px;top: 12px;"></i>
                <div class="pop-category-used" id="pop_category_used" v-show="showSingleMoreClass">
                  <ul class="list-category2 list-category-used">
                    <li v-if="singleResult.length == 0">没有匹配的分类</li>
                    <li v-for="(item,i) in singleResult" @click="selectClass(item,0)"><p class="text" v-html="item.f_gc_name_str"></p></li>
                  </ul>
                </div>
              </div>
              <p class="hint">可输入二级分类/三级分类进行条件搜索，选择对应需要导入的商品分类</p>
            </dd>
          </dl>
          <dl class="ml22">
            <dt>商品链接：</dt>
            <dd>
              <input type="text" v-model="singleGoodsUrl"  class="ncsc-form-control w500">
            </dd>
          </dl>
          <a class="ncsc-btn ncsc-btn-orange btn-import" @click="importSave(0)">开始导入</a>
        </div>
        <div class="ncsc-form-s mt30">
          <p class="fs14 mb10 c-gray form-hd"><i class="fa fa-square mr10 c-orange"></i>批量导入<span class="c-red">（特殊说明：单次最多可导入500条！）</span></p>
          <dl class="ml22">
            <dt>商品所属分类：</dt>
            <dd>
              <div :class="[showBatchMoreClass?'active':'','category-used']" class="w500"  >
                <input :readonly="modifyBatchClassReadOnly" class="category-tit w500" type="text" v-model="batchKeyword" @input="searchClass($event,1)"/>
                <i @click="clearClassSearch(1)" v-show="batchKeyword != ''" class="fa fa-times-circle" style="position: absolute;right: 7px;top: 12px;"></i>
                <div class="pop-category-used" v-show="showBatchMoreClass">
                  <ul class="list-category2 list-category-used">
                    <li v-if="batchResult.length == 0">没有匹配的分类</li>
                    <li v-for="(item,i) in batchResult" @click="selectClass(item,1)"><p class="text" v-html="item.f_gc_name_str"></p></li>
                  </ul>
                </div>
              </div>
              <p class="hint">可输入二级分类/三级分类进行条件搜索，选择对应需要导入的商品分类</p>
            </dd>
          </dl>
          <dl class="ml22">
            <dt>商品链接：</dt>
            <dd>
              <input type="file" ref="inputFile" class="ncsc-form-control batch-file" @change="selectFile($event)" accept=".xlt,.xlsx,.xls">
              <a class="demo" @click="downDemo">下载Excel模板</a>
            </dd>
          </dl>
          <a class="ncsc-btn ncsc-btn-orange btn-import" style="margin-top: -2px;" @click="importSave(1)">开始导入</a>
        </div>
      </div>
  </div>
    <qm-tips :tipsVisible="errorDialog" :width="'420px'" :showCancel="false" @update:tipsVisible="errorDialog = $event" @close="errorDialog=false" @confirm="errorDialog=false">
      <template slot="title">警告</template>
      <template slot="content">
        <p class="c-orange">注意单次最多可导入500条！</p>
        <p>当前选择的文件数据超过500条请重新选择导入的文件</p>
      </template>
    </qm-tips>
  </div>
</template>

<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import QmTips from 'component/qm-tips/index';
  import {importGoods} from 'api';
  import { Base64 } from 'js-base64';
  import axios from 'axios';
  import env from "../../../../config/url";
  import storage from 'lib/utils/storage'
  export default {
    name: "sale-act-list",

    data() {
      return {
        singleKeyword:'',
        batchKeyword:'',
        showSingleMoreClass:false,
        showBatchMoreClass:false,
        singleResult:[],
        batchResult:[],
        modifySingleClassReadOnly:false,
        modifyBatchClassReadOnly:false,
        selectSingleClassInfo:{
          gc_id:0,
          is_system:0,
          gc_name:""
        },
        selectBatchClassInfo:{
          gc_id:0,
          is_system:0,
          gc_name:""
        },
        singleGoodsUrl:'',
        batchGoodsUrl:'',
        file:'',
        taskStatus:'',
        allCount:0,
        successCount:0,
        isActivated:false,
        saveLock:false,
        isSuccess:false,
        subType:0,//提交类型：0单条，1批量
        errorDialog:false,
      }
    },

    computed:{
      process(){
        return this.allCount == 0 ? 0 : parseInt((this.successCount/this.allCount).toFixed(2)*100)
      }
    },

    components:{
      QmTips,
    },

    methods: {
      selectClass(item,type){
        if(type == 0){
          this.selectSingleClassInfo.gc_id = item.gc_id
          this.selectSingleClassInfo.is_system = item.is_system
          this.selectSingleClassInfo.gc_name = item.f_gc_name
          this.singleKeyword = item.f_gc_name
          this.showSingleMoreClass = false
          this.modifySingleClassReadOnly = true
        }else{
          this.selectBatchClassInfo.gc_id = item.gc_id
          this.selectBatchClassInfo.is_system = item.is_system
          this.selectBatchClassInfo.gc_name = item.f_gc_name
          this.batchKeyword = item.f_gc_name
          this.showBatchMoreClass = false
          this.modifyBatchClassReadOnly = true
        }
      },
      clearClassSearch(type){
        if(type == 0){
          this.singleKeyword = '';
          this.singleResult = [];
          this.showSingleMoreClass = false;
          this.modifySingleClassReadOnly = false
          this.selectSingleClassInfo.gc_id = 0
        }else{
          this.batchKeyword = '';
          this.batchResult = [];
          this.showBatchMoreClass =false;
          this.modifyBatchClassReadOnly = false;
          this.selectBatchClassInfo.gc_id = 0
        }
      },
      async searchClass(e,type){

        let keyword = e.target.value;
        let data ={
          'keyword' : keyword
        }
        let res = await this.getClass(data);
        if(res.list && res.list.length > 0){
          let reg = new RegExp(keyword,'g')
          res.list.forEach((item,k)=>{
            item.f_gc_name_str = item.f_gc_name.replace(reg,'<span class="highlight-txt">'+keyword+'</span>')
          })

        }

        this.$nextTick(()=>{
          if(e.target.value == ''){
            if(type == 0){
              this.showSingleMoreClass = false;
            }else{
              this.showBatchMoreClass = false;
            }
          }else{
            if(type == 0){
              this.singleResult = res.list;
              this.showSingleMoreClass = true;
            }else{
              this.batchResult = res.list;
              this.showBatchMoreClass = true;
            }
          }
        })

      },
       getClass(data){
        return importGoods.getThirdClassList(data)
      },
      selectFile(e){
        this.file = e.target.files[0]
      },
      downDemo(){
        window.open(env.jsonUrl + '/static/files/import_goods_demo.xls', '_blank');
      },
      importSave(type){
        if(this.saveLock) return false;
        this.saveLock = true;
        var instance = axios.create({
          baseURL: env.basePath,
          headers:{'Content-Type':'multipart/form-data'}
        })
        let params = new FormData()
        params.append('data[type]', type)
        params.append('data[key]', storage.get('key'))
        if(type == 0){
          if(this.selectSingleClassInfo.gc_id == ''){
            this.saveLock = false;
            layer.msg('请先选择商品所属分类')
            return
          }
          if(this.singleGoodsUrl == ''){
            this.saveLock = false;
            layer.msg('请输入需要导入的商品淘宝链接')
            return
          }
          params.append('data[cate_id]', this.selectSingleClassInfo.gc_id)
          params.append('data[is_third]', this.selectSingleClassInfo.is_system == 0 ? 1: 0)
          params.append('data[url]', Base64.encode(this.singleGoodsUrl))
        }else{
          if(this.selectBatchClassInfo.gc_id == ''){
            this.saveLock = false;
            layer.msg('请选择商品所属分类')
            return
          }
          if(this.file == 'undefined' || this.file == ''){
            this.saveLock = false;
            layer.msg('请选择批量导入的文档')
            return
          }
          params.append('data[cate_id]', this.selectBatchClassInfo.gc_id)
          params.append('data[is_third]', this.selectBatchClassInfo.is_system == 0 ? 1: 0)
          params.append('base64Str', this.file)
        }
        params.append('data[type]', type)
        this.subType = type;
        if(type == 0){
          var loading = this.$loading({
            lock: true,
            text: '导入中，请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        }
        instance.post("/importGoods/save",params).then((res)=>{
          this.saveLock = false;
          if(type == 0){
            //layer.msg(res.data.shortMessage)
            loading.close()
          }else{
            if(res.data.status == 'fail'){
              if(res.data.resultCode == 80003){
                this.errorDialog = true
              }else{
                layer.msg(res.data.shortMessage)
              }
            }else{
              this.checkTask();
            }
          }
          if(type == 0){
            this.handlerSingle(res.data.status)
          }
        })
      },
      checkTask(){
        importGoods.getTask().then((res) => {
          this.taskStatus = res.responseContent.status
          this.allCount = res.responseContent.all_count
          this.successCount = res.responseContent.success_count
          this.isSuccess = res.responseContent.success_count>0?true:false;
          if (res.responseContent.status == 'doing') {
            var taskTimer = setInterval(() => {
              if(!this.isActivated) return false;
              if(this.taskStatus == 'done' || this.taskStatus == 'none'){
                clearInterval(taskTimer);
                this.clearAll()
                return;
              }
              importGoods.getTask().then((res) => {
                this.allCount =res.responseContent.all_count
                this.successCount = res.responseContent.success_count
                this.isSuccess = res.responseContent.success_count>0?true:false;
                if (res.responseContent.status == 'done') {
                  clearInterval(taskTimer)
                  importGoods.setTaskShowed().then((res)=>{
                    this.taskStatus = 'done'
                    this.clearAll()
                  })
                } else if(res.responseContent.status == 'doing') {
                  this.taskStatus = 'doing'
                }else{
                  clearInterval(taskTimer)
                  this.clearAll()
                  this.taskStatus = 'none'
                }
              });

            }, 5000)
          }else if(res.responseContent.status == 'done'){
            clearInterval(taskTimer)
            this.clearAll()
            importGoods.setTaskShowed().then((res)=>{
            })
          }
        })

      },
      clearAll(){
        this.clearClassSearch(0);
        this.clearClassSearch(1);
        this.singleGoodsUrl = '';
        this.$refs.inputFile.value = ''
      },
      handlerSingle(status){
        if(status == 'success'){
          this.successCount = 1;
          this.isSuccess = true;
        }else{
          this.successCount = 0;
          this.isSuccess = false;
        }
        this.taskStatus = 'done'
      },
      reload(){
        this.clearAll()
        this.taskStatus = 'none'
      },
      testRequest(){
        let base_url = 'https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?jsv=2.5.1&api=mtop.taobao.detail.getdetail&v=6.0&isSec=0&ecode=0&AntiFlood=true&AntiCreep=true&H5Request=true&ttid=2018%40taobao_h5_9.9.9&type=jsonp&dataType=jsonp&data=%7B%22ft%22%3A%22t%22%2C%22id%22%3A%22597909649970%22%2C%22itemNumId%22%3A%22597909649970%22%2C%22itemId%22%3A%22597909649970%22%2C%22exParams%22%3A%22%7B%5C%22ft%5C%22%3A%5C%22t%5C%22%2C%5C%22id%5C%22%3A%5C%22597909649970%5C%22%7D%22%2C%22detail_v%22%3A%228.0.0%22%2C%22utdid%22%3A%221%22%7D';
        let detail_url = 'http://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data={%22id%22:%22597909649970%22}';
        var content = {
          base:'',
          detail:'',
        };
        $.ajax({
          url: base_url,
          type:'GET',
          async:false,
          dataType: 'jsonp',
          success: function(ret){
            content.base = JSON.stringify(ret['data']);
            $.ajax({
              url: detail_url,
              type:'GET',
              async:false,
              dataType: 'jsonp',
              success: function(ret){
                content.detail = JSON.stringify(ret['data']);
                if(content.base != '' && content.detail != ''){
                  var instance = axios.create({
                    baseURL: env.basePath,
                    headers:{'Content-Type':'multipart/form-data'}
                  })
                  let params = new FormData()
                  params.append('data[id]', '597909649970')
                  params.append('data[key]', storage.get('key'))
                  params.append('data[data]', JSON.stringify(content))
                  instance.post("/importGoods/saveFile",params).then((res)=>{

                  })
                }
              }
            });
          }
        });
        return;

      }
    },
    watch:{

    },

    created(){
    },
    beforeMount(){
    },
    mounted () {
      this.$nextTick(()=> {
      })
    },
    beforeDestroy(){

    },
    updated(){
    },
    activated() {
      this.isActivated = true;
      this.checkTask()
    },
    deactivated() {
      this.clearAll()
      this.isActivated = false
    }

  }
</script>
