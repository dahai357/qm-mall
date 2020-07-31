<style scoped>
  .ncsc-form-item2{ margin-bottom: 20px;}
  .ncsc-form-item2 .ncsc-form-tit{ text-align: right; display: inline-block; vertical-align: middle; min-width: 8em;}

  .list-category li{ line-height: 28px; position: relative; padding: 0 10px;}
  .list-category li:hover{ cursor: pointer; color:#ff8519;}
  .list-category .fa-angle-right{ position: absolute; right: 10px; top: 50%; margin-top:-.5em; line-height: 1; display: none;}
  .list-category .active, .list-category .active:hover{ background: #ff8519; color:#fff}
  .list-category .active .fa-angle-right{ display: block;}

  .list-category2 li{ font-size: 12px; padding:0 10px;  position: relative; box-sizing: border-box; line-height: 2;}
  .list-category2 li:first-child{ border:none;}
  .list-category2 li:hover{ cursor: pointer; background:#f5f5f5;}
  .list-category2 .btn-del{ display: block; height: 20px; line-height: 20px; width: 20px; text-align: center; font-family: SimSun; color:#333; position: absolute; top: 50%; margin-top: -10px; right: 10px;}
  .list-category2 .btn-del:hover{text-decoration: none; color: #ff8519;}

  .list-category-used li{ line-height: 29px; border-top:1px dotted #ddd;}

  .list-category-result:after{content: "\0020"; display: table; clear: both;}
  .list-category-result li{ float: left; width: 50%; padding: 6px 20px;}

  .category-used{ display: inline-block; vertical-align: middle; position: relative;}
  .category-used .category-tit{ border:1px solid #ddd; color:#757575; line-height: 30px; box-sizing: border-box; border-radius:5px;     padding: 0 10px; position: relative;}
  .category-used .category-tit i{ color:#757575; position: absolute; right: 10px; top: 7px;}
  .pop-category-used{ position: absolute; left: 0; width: 100%; box-sizing: border-box; top: 30px; border:1px solid #ddd; z-index:
    900; background: #fff; border-radius:5px; max-height: 302px; overflow-y: auto;}
  .category-used:hover{ cursor: pointer;}
  .category-used.active .category-tit{ color:#333}
  .category-used.active .category-tit i{ color:#333}

  .category-box{ display: table; border-collapse:collapse; table-layout: fixed}
  .category-box .category-item{ display: table-cell; vertical-align: top; border:1px solid #eee; box-sizing: border-box; padding: 10px;}
  .category-box .category-item-in{ overflow-y: auto;}

  .category-box-add1 .category-item{ width: 280px; }
  .category-box-add1 .category-item-in{ height: 280px;}

  .panel-category{ position: relative;}
  .pop-category-result{ position: absolute; width:841px; height: 302px; border:1px solid #eee; box-sizing: border-box; padding:20px 0; z-index: 800; left: 0; top: 0; background: #fff; border-radius:5px;}
  .pop-category-result .btn-pop-close{ position: absolute; font-family: Verdana; font-size: 24px; width: 24px; position: absolute; right: 10px; top: 10px; line-height: 1; color:#757575; text-align: center;}
  .pop-category-result .btn-pop-close:hover{ color:#ff8519; cursor: pointer;}
  .pop-category-result .total{ margin-bottom: 10px; padding:0 20px;}
  .pop-category-result .jq-pagination{ position: absolute; right: 20px; bottom: 20px; padding: 0;}
  .bottom .submit[disabled="disabled"] {
    color: #999;
    text-shadow: none;
    background-color: #F5F5F5;
    border: none;
    cursor: default;
  }
.pagination{
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 0;
}
</style>
<template>
  <div>
    <div class="wrapper_search" id="chooseGoodsCategory">
      <div class="ncsc-form-item2">
        <p class="ncsc-form-tit w9e">商品分类搜索：</p>
        <input type="text" class="w500 mr5" value="" autocomplete="off" placeholder="输入关键字搜索" id="search_key" v-model.trim="pageParams.className">
        <a href="javascript:;" class="ncsc-btn" id="btn_search" @click="search()">快速搜索</a>
      </div>
      <div class="ncsc-form-item2">
        <p class="ncsc-form-tit w9e">您常用的商品分类：</p>
        <div :class="[showStaple?'active':'','category-used']"  @click="showStaple=!showStaple" id="category_used" v-clickOut="changeStaple">
          <div class="category-tit w500">请选择<i class="fa fa-angle-down"></i></div>
          <div class="pop-category-used" id="pop_category_used" v-show="showStaple" >
            <ul class="list-category2 list-category-used">
              <li v-for="(item,i) in stapleList" @click="selectStaple(item)"><p class="text">{{item.staple_name}}</p><a @click.stop="removeStaple(item)" title="删除" class="btn-del" >×</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="panel-category">
        <div class="category-box category-box-add1">
          <div class="category-item" id="category_chief">
            <div class="category-item-in" id="first">
              <ul class="list-category">
                <li :class="{active:item.selected}" @click="selectChief(i)"  v-for="(item,i) in categoryChief" :id="'first'+item.gc_id"><p class="txt">{{item.gc_name}}</p><i class="fa fa-angle-right"></i></li>
              </ul>
            </div>
          </div>
          <div class="category-item" id="category_sub" v-show="categorySub.length > 0" >
            <div class="category-item-in" id="second">
              <ul class="list-category" >
                <li :class="{active:item.selected}" @click="selectSub(i)"  v-for="(item,i) in categorySub" :id="'second'+item.gc_id"><p class="txt">{{item.gc_name}}</p><i class="fa fa-angle-right"></i></li>
              </ul>
            </div>
          </div>
          <div class="category-item" id="category_third"  v-show="categoryThird.length > 0" >
            <div class="category-item-in" id="third">
              <ul class="list-category">
                <li :class="{active:item.selected}" @click="selectThird(i)"  v-for="(item,i) in categoryThird" :id="'third'+item.gc_id"><p class="txt">{{item.gc_name + (item.goods_class_t_id ? '(自定义分类)' : '')}}</p></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pop-category-result" id="pop_category_search" v-show="showSearchRes">
          <div class="btn-pop-close" @click="showSearchRes=false">&times;</div>
          <div class="total c-gray">搜索到 <span id="total_count" class="c-orange">{{pageParams.total}}</span> 个分类，点击则为选中对应分类</div>
          <ul class="list-category2 list-category-result" id="search_list">
            <li v-for="(item,i) in searchList" @click="selectSearch(item)">{{item.gc_name}}</li>
          </ul>
          <qm-pagination :pageParams="pageParams" @changeIndex="changeIndex($event)"></qm-pagination>
        </div>
      </div>
      <p class="mt20 c-gray">找不到您要的分类？<a  class="c-orange" @click="toSet()">前往配置 &raquo;</a></p>
      <div class="wp_confirm mt20">
        <form method="get">
          <div class="bottom tc" style="position: relative;">
            <label class="submit-border"><input :disabled="nextDisabled" @click="goNext()" nctype="buttonNextStep" value="下一步，填写商品信息" type="button" class="submit" /></label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import util from 'lib/utils/util';
  import 'viewerjs/dist/viewer.css';
  import QmDialog from 'component/qm-dialog/index';
  import {storeGoodsAdd} from 'api';
  import storage from 'lib/utils/storage';
  import QmPagination from 'component/qm-pagination/index';
  export default {
    name: "add-step-one",
    data() {
      return {
        bodyListener:'',
        showStaple:false,
        nextDisabled:true,
        categoryChief:[],
        categorySub:[],
        categoryThird:[],
        stapleList:[],
        searchList:[],
        pageParams:{
          className:'',
          pageIndex:0,
          pageSize:10,
          total:0
        },
        showSearchRes:false,
        classId:0,
        isStoreThird:0,
        commonId:0
      }
    },

    computed:{

    },

    components:{
      QmDialog,
      QmPagination
    },
  directives:{
    clickOut:{
      bind(el, binding, vnode) {
    function clickHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = clickHandler;
    document.addEventListener('click', clickHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
    }
  },
    methods: {
      //自定义事件函数
      changeStaple(){
        this.showStaple=false
      },
      //锚点跳转
      goAnchor(parentSelect,selector) {
        var param = document.querySelector(parentSelect);
        var child = document.querySelector(selector)
        if(child != null){
          document.querySelector(parentSelect).scrollTop = document.querySelector(selector).offsetTop-10;
        }
      },

      toSet(){
        this.$router.push('/store/store_class/index')
      },
      goNext(){
        if(!this.nextDisabled) this.$router.push({ name: 'store_goods_add_step_two', params: { classId:this.classId,isStoreThird:this.isStoreThird ,commonId: this.commonId}})
      },
      showNext(){
        this.nextDisabled = false
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getSearchData(this.pageParams);
      },
      getStapleList(){
        storeGoodsAdd.getStapleList().then((res)=>{
          var list = _.clone(res.list)
          list.forEach((item,i) => {
            item.selected = false
          })
          this.stapleList = list
        })
      },
      removeStaple(staple){
        var data ={
          staple_id:staple.staple_id
        }
        storeGoodsAdd.delStaple(data).then((res)=>{
          if(res.resultCode == 1){
            this.stapleList.forEach((item,i)=>{
              if(item.staple_id == staple.staple_id){
                this.stapleList.splice(i,1)
              }
            })
            util.msg('删除成功')
          }
        })
      },
      selectStaple(staple){
        this.resetChief()
        this.categoryChief.forEach((item,i)=>{
          if(staple.gc_id_1 == item.gc_id){
            item.selected = true
            var gc_id_3 = staple.gc_id_3?staple.gc_id_3:staple.goods_class_t_id;
            var is_system = staple.gc_id_3?1:0;
            this.getSecondClass(item.gc_id,staple.gc_id_2,gc_id_3,is_system)
          }
        })
      },
      selectSearch(search){

        this.resetChief()
        this.resetSub()
        this.resetThird()
        this.categoryChief.forEach((item,i)=>{
          if(search.gc_id_1 == item.gc_id){
            item.selected = true
            var gc_id_2 = search.gc_id_2?search.gc_id_2:0
            var gc_id_3 = search.gc_id_3?search.gc_id_3:0
            if(gc_id_3 == 0){
              this.nextDisabled = true
            }
            var is_system = search.is_system;
            this.$nextTick(()=>{
              this.goAnchor("#first","#first"+item.gc_id);
            })
            this.getSecondClass(item.gc_id,gc_id_2,gc_id_3,is_system)
          }
        })
        this.showSearchRes =false
      },
      getFirstClass(search){
        this.resetSub()
        this.resetThird()
        storeGoodsAdd.getFirstClass().then((res)=>{
          var list = _.clone(res.list)
          list.forEach((item,i) => {
            item.selected = false
          })
          this.categoryChief = list
          if(!_.isEmpty(search)) {
            this.selectSearch(search);
          }
        })
      },
      getSecondClass(pid,gc_id,gc_id_3,is_system){
        this.resetThird()
        var data = {
          gcParentId:pid
        }
        var idx = 0
        storeGoodsAdd.getSubClass(data).then((res)=>{
          var list = _.clone(res.list[0].children)
          list.forEach((item,i) => {
            if(gc_id > 0 && gc_id == item.gc_id){
              idx = i
              item.selected = true
            }else{
              item.selected = false
            }

          })
          this.categorySub = list;
          this.$nextTick(()=>{
              this.goAnchor("#second","#second"+gc_id);
            })
          if(gc_id){
            this.getThirdClass(idx,gc_id_3,is_system)
          }
        })
      },
      getThirdClass(idx,gc_id,is_system) {
        var list = this.categorySub[idx].children;
        list.forEach((item,i) => {
          if(gc_id >0 && gc_id == item.gc_id && is_system == item.is_system){
            item.selected = true;
          }else {
            item.selected = false
          }

        })
        this.categoryThird = list;
        this.$nextTick(()=>{
          this.goAnchor("#third","#third"+gc_id);
        })
      },
      resetChief(){
        this.categoryChief.forEach((item,i)=>{
          item.selected = false
        })
      },
      resetSub(){
        this.categorySub.forEach((item,i)=>{
          item.selected = false
        })
      },
      resetThird(){
        this.categoryThird.forEach((item,i)=>{
          item.selected = false
        })
      },
      clearSub(){
        this.categorySub = []
      },
      clearThird(){
        this.categoryThird = []
      },
      selectSub(idx){
        this.resetSub()
        this.nextDisabled = true
        this.categorySub.forEach((item,i)=>{
          if(idx == i){
            item.selected = true
            this.getThirdClass(i)
          }
        })
      },
      selectThird(idx){
        this.resetThird()
        var list = _.clone(this.categoryThird)
        list.forEach((item,i)=>{
          if(idx == i){
            item.selected = true
          }
        })
        this.categoryThird = list
      },
      selectChief(idx){
        this.resetChief()
        this.clearSub()
        this.clearThird()
        this.nextDisabled = true
        this.categoryChief.forEach((item,i)=>{
          if(idx == i){
            item.selected = true
            this.getSecondClass(item.gc_id)
          }
        })
      },
      getSearchData(){
        storeGoodsAdd.getStoreClassList(this.pageParams).then((res)=>{
          this.searchList = res.list
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
          if(res.list.length <= 0){
            util.msg('没有符合条件的数据')
          }else{
            this.showSearchRes = true
          }
        })
      },
      search(){
        if(this.pageParams.className === ''){
          util.msg('请输入搜索关键字');
          return;
        }
        this.pageParams.pageIndex = 0;
        this.getSearchData();
      }

    },
    watch:{
      categoryThird(){
        if(this.categoryThird.length){
          var check = false
          this.categoryThird.forEach((item,i)=>{
            if(item.selected){
              this.classId = item.gc_id;
              this.isStoreThird = item.is_system ? 0 :1;
              check = true
              storage.set('class_id',item.gc_id)
            }
          })
          if(check){
            this.showNext()
          }else{
            this.nextDisabled = true
          }
        }else{
          this.nextDisabled = true
        }
      }
    },
    mounted () {
      var _self = this;
      let search = {};
      if(this.$route.params.commonId > 0) {
        this.commonId = this.$route.params.commonId;
      }
      if(this.$route.params.gc_id_1 > 0) {
        search = this.$route.params;
        // search.gc_id_1 = this.$route.params.gc_id_1;
        // search.gc_id_2 = this.$route.params.gc_id_2;
        // search.gc_id_3 = this.$route.params.gc_id_3;
        // search.is_system = !this.$route.params.is_system;
      }
      this.getFirstClass(search)
      this.getStapleList()
      layui.use('layer', function(){
        this.layer = layui.layer;
      });
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
         _self.search();
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
    beforeDestroy(){
      //销毁键盘enter搜索事件
      document.body.removeEventListener('keyup', this.bodyListener);
    },
    updated(){

    }
  }
</script>
