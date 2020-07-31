<style scoped>
    select{
        font-size: 12px;
    }
    .n-con{
      position: relative;

    }
    .select-l{
      position: relative;
      float: left;
      margin-right: 10px;
    }
    .select-c{
      width: 130px;
      height: 30px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .select-c span{
      display: block;
      width: 110px;
      height: 30px;
      float: left;
      padding-left: 5px;
      line-height: 28px;
      font-size: 12px;
    }
    .select-c i{
      position: relative;
      top: 5px;
    }
    .select-m{
      position: absolute;
      top: 30px;
      left: 0;
      width: 130px;
      padding: 5px 0;
      border: 1px solid #ddd;
      z-index: 100;
      background: #fff;
      
    }
    .select-v{
      clear: both;
    }
    .select-m input{
      width: 110px;
      border: 0;
      float: left;
      padding: 0 5px 0 10px;
    }
    .select-m div span{
      display: block;
      line-height: 20px;
      padding-left: 10px;
      cursor: pointer;

    }
    .select-m div span:hover{
      background: #ff8518;
      color: #fff;
    }
    .input-c{
      width: 100%;
    }
    .input-c i{
      position: relative;
      left: 5px;
      top: 10px;
      float: left;
    }
    .isaction{
      background: #ff8518;
      color: #fff;
    }
</style>
<template>
  <!-- <span>
    <span class="ncsc-form-tit">{{tit}}：</span>
    <span class="mr5">
          <select class="w130" v-model="subgcId1">
            <option value="0">请选择一级分类</option>
            <option :value="item.gc_id" v-for="item in gcClass1">{{item.gc_name}}</option>
          </select>
          <select class="w130" v-model="subgcId2" v-show="subgcId1 > 0">
            <option value="0">请选择二级分类</option>
            <option :value="item.gc_id" v-for="item in gcClass2">{{item.gc_name}}</option>
          </select>
          <select @change="unBlur($event)" class="w130" v-model="subgcId3" v-show="subgcId2 > 0">
            <option value="0">请选择三级分类</option>
            <option :value="item.gc_id" v-for="item in gcClass3">{{item.gc_name}}</option>
          </select>
      </span>
  </span> -->
   <div class="n-con">
     <span class="ncsc-form-tit" style="float: left;">{{tit}}：</span>
     <div class="select-l" >
       <div class="select-c" @click="selectShow(1)">
        <span  class="activecon">{{subgValue1}}</span>
        <i :class="isShow1?'el-icon-caret-top':'el-icon-caret-bottom'"  class="activecon"></i>
      </div>
      <div class="select-m" v-if="isShow1">
        <div class="input-c ">
          <i class="el-icon-search"></i>
          <input type="text" placeholder="请输入分类名称" v-model="keyword1" class="activecon"/>
        </div>
        <div class="select-v" v-if="keyword1==''">
          <span v-for="item in gcClass1" @click="selectItem(item,1)" :class="!ismouse&&item.gc_id==subgcId1?'isaction':''" @mouseover="ismouse=true">{{item.gc_name}}</span>
        </div>
        <div class="select-v" v-else>
          <span v-for="item in gcClass1_1" @click="selectItem(item,1)" :class="!ismouse&&item.gc_id==subgcId1?'isaction':''" @mouseover="ismouse=true">{{item.gc_name}}</span>
        </div>
      </div>
     </div>
     <div class="select-l" v-show="subgcId1 > 0">
       <div class="select-c" @click="selectShow(2)">
        <span class="activecon">{{subgValue2}}</span>
        <i :class="isShow2?'el-icon-caret-top':'el-icon-caret-bottom'" class="activecon"></i>
      </div>
      <div class="select-m" v-if="isShow2">
        <div class="input-c">
          <i class="el-icon-search"></i>
          <input type="text" placeholder="请输入分类名称" v-model="keyword2" class="activecon"/>
        </div>
        <div class="select-v"  v-if="keyword2==''">
          <span v-for="item in gcClass2" @click="selectItem(item,2)" :class="item.gc_id==subgcId2?'isaction':''"  @mouseover="ismouse=true">{{item.gc_name}}</span>
        </div>
        <div class="select-v" v-else>
          <span v-for="item in gcClass2_1" @click="selectItem(item,2)" :class="item.gc_id==subgcId2?'isaction':''"  @mouseover="ismouse=true">{{item.gc_name}}</span>
        </div>
      </div>
     </div>
    <div class="select-l" v-show="subgcId2 > 0">
       <div class="select-c" @click="selectShow(3)">
        <span class="activecon">{{subgValue3}}</span>
        <i :class="isShow3?'el-icon-caret-top':'el-icon-caret-bottom'" class="activecon"></i>
      </div>
      <div class="select-m" v-if="isShow3">
        <div class="input-c">
          <i class="el-icon-search"></i>
          <input type="text" placeholder="请输入分类名称" v-model="keyword3" class="activecon"/>
        </div>
        <div class="select-v"  v-if="keyword3==''">
          <span v-for="item in gcClass3" @click="selectItem(item,3)" :class="item.gc_id==subgcId3?'isaction':''"  @mouseover="ismouse=true">{{item.gc_name}}</span>
        </div>
         <div class="select-v" v-else>
          <span v-for="item in gcClass3_1" @click="selectItem(item,3)" :class="item.gc_id==subgcId3?'isaction':''"  @mouseover="ismouse=true">{{item.gc_name}}</span>
        </div>
      </div>
     </div>
   </div>
</template>

<script>
  import {storeGoodsOnline} from 'api'
    export default {
        name: "qm-class"
      ,
      props:{
        tit: {
          default: '本店分类'
        },
        gcId1: {
          default:0
        },
        gcId2: {
          default:0
        },
        gcId3: {
          default:'0'
        },
        storeId: {
          default:'0'
        }
      },
      data(){
        return {
          gcClass1: [],
          gcClass2: [],
          gcClass3: [],
          subgcId1:this.gcId1,
          subgcId2:this.gcId2,
          subgcId3:this.gcId3,
          gcClass1_1:'',
          gcClass2_1:'',
          gcClass3_1:'',
          subgValue1:"请选择一级分类",
          subgValue2:"请选择二级分类",
          subgValue3:"请选择三级分类",
          keyword1:"",
          keyword2:"",
          keyword3:"",
          delectid2:0,
          delectid3:0,
          isShow1:false,
          isShow2:false,
          isShow3:false,
          ismouse:false,
        }
      },
      computed: {

      },
      methods:{
        getData(data) {
          $('select').blur();
          if(data.deep != 0 && data.pid == 0) {
            return;
          }
          data.storeId = this.storeId;
          storeGoodsOnline.loadClass(data).then((res)=>{
            if(data.deep == 0) {
              this.gcClass1 = res.list;
            }else if(data.deep == 1) {
              this.gcClass2 = res.list;
            }else if(data.deep == 2) {
              this.gcClass3 = res.list;
            }
          })
        },
        unBlur(e){
          var el = e.currentTarget;
          $(el).blur();
        },
        gc1ChangeReset() {
          this.subgcId2 = 0;
          this.subgcId3 = '0';
        },
        gc2ChangeReset() {
          this.subgcId3 = '0';
        },
        //  新加
        selectItem(item,idx){
          if(idx==1){
            this.subgcId1=item.gc_id;
            this.subgValue1=item.gc_name;
            this.subgValue2="请选择二级分类";
            this.subgValue3="请选择三级分类";
            this.isShow1=false;
            this.isShow2=false;
            this.isShow3=false;
          }
          else if(idx==2){
            this.subgcId2=item.gc_id;
            this.subgValue2=item.gc_name;
            this.subgValue3="请选择三级分类";
            this.isShow1=false;
            this.isShow2=false;
            this.isShow3=false;
          }
          else{
            this.subgcId3=item.gc_id;
            this.subgValue3=item.gc_name;
            this.isShow1=false;
            this.isShow2=false;
            this.isShow3=false;
          }
          
        },
        selectShow(idx){
          this.ismouse=false;
          if(idx==1){
            this.isShow1=!this.isShow1;
            this.keyword1='';
            let data = {
              deep: 0
            };
            this.getData(data);
            this.isShow2=false;
            this.isShow3=false;
          }
          else if(idx==2){
            this.isShow2=!this.isShow2;
            this.keyword2='';
            let data = {
              deep: 1,
              pid: this.delectid2
            };
            this.getData(data);
            this.isShow1=false;
            this.isShow3=false;
          }
          else{
            this.isShow3=!this.isShow3;
            this.keyword3='';
            let data = {
              deep: 1,
              pid: this.delectid3
            };
            this.getData(data);
            this.isShow1=false;
            this.isShow2=false;
          }

        },
      },
      watch:{
        subgcId1: function (val) {
          this.gc1ChangeReset();
          
          this.delectid2=val;
          this.$emit('update:gcId1', val);
          let data = {
            deep: 1,
            pid: val
          };
          this.getData(data);
        },
        subgcId2: function (val) {
          this.gc2ChangeReset();
          this.$emit('update:gcId2', val);
          this.delectid3=val;
          let data = {
            deep: 2,
            pid: val
          };
          this.getData(data);
        },
        subgcId3: function (val) {
          this.$emit('update:gcId3', val);
        },
        keyword1:function(val){
          let data = {
              deep: 0
            };
          this.getData(data);
          var gcClassnew1=this.gcClass1;
          var Array1=[];
          gcClassnew1.forEach(el=>{
            if(el.gc_name.indexOf(val)!=-1){
              Array1.push(el)
            }
          })
          this.gcClass1_1=Array1;
        },
        keyword2:function(val){
          let data = {
              deep: 1,
              pid: this.delectid2
            };
            this.getData(data);
          var gcClassnew1=this.gcClass2;
          var Array1=[];
          gcClassnew1.forEach(el=>{
            if(el.gc_name.indexOf(val)!=-1){
              Array1.push(el)
            }
          })
          this.gcClass2_1=Array1;
        },
        keyword3:function(val){
          let data = {
              deep: 2,
              pid: this.delectid3
          };
          this.getData(data);
          var gcClassnew1=this.gcClass3;
          var Array1=[];
          gcClassnew1.forEach(el=>{
            if(el.gc_name.indexOf(val)!=-1){
              Array1.push(el)
            }
          })
          this.gcClass3_1=Array1;
        }
        
      },
      created(){
        var that=this;
        document.addEventListener('click',function(e){
        if(e.target.className!='activecon'){
          that.isShow1=false;
          that.isShow2=false;
          that.isShow3=false;
        }
      })

      },
      mounted() {
        let data = {
          deep: 0
        };
        this.getData(data);
      },
      

    }
</script>
