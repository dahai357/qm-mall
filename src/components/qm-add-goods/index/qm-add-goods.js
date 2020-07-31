import * as _ from 'lodash';
import {mapGetters,mapMutations,mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index';

export default {
  name: "qm-add-goods"  ,

  data(){
      return {
        bodyListener:'',

        gc_id_2:0,
        gc_id_3:0,

        secondClass:[],

        thirdClass:[],

        goods_name:'',

        pageParams:{
            goods_name:'',
            member_name:'',
            evaluate_type:0,
            search_type:1,
            pageIndex:0,
            pageSize:this.pageSize,
            total:0,
            searchAllSelect:0
        },
        searchParams:{
          gc_id_2:0,
          gc_id_3:0,
          keyword:''
        },

        goodList:[],
        allGoodList:[],

        isAllPageShow:false,
        searchType:1,

      }
  },

  components: {
    QmPagination,

},

  props:{
    goodsList:{
        type:Array,
        default:[]
    },
    showCategory:{
      type:Boolean,
      default:true
    },
    showAddPage:{
      type:Boolean,
      default:true
    },
    showAddAllPage:{
      type:Boolean,
      default:false
    },
    showMorePrice:{
      type:Boolean,
      default:false
    },
    showMultiSearch:{
      type:Boolean,
      default:false
    },
    addTxt:{
      type:String,
      default:'添加商品'
    },
    removeTxt:{
      type:String,
      default:'移除商品'
    },
    source:{
        type:String,
        default:'store_goods_class'
    },
    pageSize:{
      type:Number,
      default:8
    },
    borderNone:{
      type:Boolean,
      default:false
    },
    excludeGoods:{
      type:Array,
      default:()=>[]
    },
    saleActId:{
      type:Array,
      default:()=>[]
    }
  },

  computed: {
    // filterList(){
    //   var filterList = this.goodList.filter((item,i)=>{
    //     if(i >= this.pageParams.pageIndex * this.pageParams.pageSize && (this.pageParams.pageIndex+1) * this.pageParams.pageSize > i){
    //       return item;
    //     }
    //   })
    //   return filterList;
    // },
  },
  methods:{

    ...mapActions('storeGoodsClass',{
        getGoodsList:'getGoodsList',
        searchGoods:'searchGoods',
        saveGoods:'saveGoods'
    }),
    ...mapActions('saleAct',{
        getOnlineSecondClass:'getOnlineSecondClass',
        getOnlineThirdClass:'getOnlineThirdClass',

    }),

    init(){
        this.getSecondClass();
        this.changeIndex(0);
    },

    getSecondClass(){
        var data = {

        }
        this.getOnlineSecondClass(data).then((res)=>{
            if(res.resultCode == 1){
                this.secondClass = res.responseContent;
            }else{
                this.layer.msg(res.longMessage);
            }

        })
    },

    changeSecondClass(event){
        var value = event.target.value;
        this.gc_id_2 = value;
        this.gc_id_3 = 0;
        if(value == 0){
            this.thirdClass = [];
        }else{
            this.getThirdClass(event.target.value);
        }

    },

    getThirdClass(gc_id){
        var data = {
            gc_id_2:gc_id
        }
        this.getOnlineThirdClass(data).then((res)=>{
            if(res.resultCode == 1){
                this.thirdClass = res.responseContent;
            }else{
                this.layer.msg(res.longMessage);
            }
        })
    },

    search(){
        this.pageParams.pageIndex = 0
        var data = _.clone(this.pageParams);
        this.searchParams.keyword = data.keyword = this.goods_name;
        this.searchParams.gc_id_2 = data.gc_id_2 = this.gc_id_2;
        this.searchParams.gc_id_3 = data.gc_id_3 = this.gc_id_3;
        data.pageIndex = 0;
        data.search_type = this.searchType
        data.type = this.source;
        data.excludeGoodsIds = this.getExcludeGoodsIds()
        data.sale_act_id = this.saleActId.join(',').split(',');
        if(this.excludeGoods.length > 0) {
          let excludeGoodsIds = [];
          this.excludeGoods.forEach((goods,gs)=>{
            excludeGoodsIds.push(''+goods.goods_id);
          });
          data.excludeGoodsIds = excludeGoodsIds;
        }
        this.getPageData(data);
    },
    getExcludeGoodsIds(){
      let excludeGoodsIds = [];
      if(this.excludeGoods.length > 0) {
        this.excludeGoods.forEach((goods,gs)=>{
          excludeGoodsIds.push(''+goods.goods_id);
        });
      }
      return excludeGoodsIds;
    },

    getPageData(data){
        this.searchGoods(data).then((res)=>{
            if(res.resultCode == 1){
               if(((this.gc_id_2 && this.gc_id_2 != 0) || this.goods_name != '') && res.responseContent.list.length > 0){
                  this.isAllPageShow = true;
                }else{
                  this.isAllPageShow = false;
                }

                if(res.responseContent.list){

                }else{
                  res.responseContent.list = [];
                }
                this.goodList = res.responseContent.list;
                this.goodList.forEach((good,g) => {
                    good.isExist = false,
                    this.goodsList.forEach((goods,gs)=>{
                      if(this.source == 'store_promotion_bundling'||data.type == 'store_coupon_gift' || this.source == 'sale_act_goods'){
                        if(good.goods_id == goods.goods_id){
                          good.isExist = true;
                        }
                      }else{
                        if(good.goods_commonid == goods.goods_commonid){
                          good.isExist = true;
                        }
                      }
                    })
                });
                //bug8582 【店铺首页推荐分类】商品添加到分类，列表没有分页展示
                // this.goodList = this.goodList.filter((g,f)=>{
                //   return this.pageParams.pageSize*this.pageParams.pageIndex <= f && f < this.pageParams.pageSize*(this.pageParams.pageIndex+1)
                // })

                var newParams = _.clone(this.pageParams);
                newParams.total = res.responseContent.total;
                this.pageParams = newParams;
            }else{
                this.layer.msg(res.longMessage);
            }
        })
    },

    changeThirdClass(event){
        var value = event.target.value;
        this.gc_id_3 = value;
    },


    addPageGoods(){
        this.$emit('addPageGoods',this.goodList);
    },

    addSearchAllGoods(){
      let index = this.layer.load(2);
      this.pageParams.searchAllSelect = 1;
      var data = _.clone(this.pageParams);
      // data.keyword = this.goods_name;
      // data.gc_id_2 = this.gc_id_2;
      // data.gc_id_3 = this.gc_id_3;
      data.type = this.source;
      data.sale_act_id = this.saleActId.join(',').split(',');
      if(this.excludeGoods.length > 0) {
        let excludeGoodsIds = [];
        this.excludeGoods.forEach((goods,gs)=>{
          excludeGoodsIds.push(''+goods.goods_id);
        });
        data.excludeGoodsIds = excludeGoodsIds;
      }
      data = {
        ...data,
        ...this.searchParams
      }
      this.searchGoods(data).then((res)=>{
        this.layer.close(index);
        var emitList = _.clone(res.responseContent.list);
        emitList.forEach((item,i)=>{
          item.isExist = false;
          for(let item2 of this.goodsList) {
              console.log(item2);
              if(this.source == 'store_promotion_bundling'|| this.source == 'store_coupon_gift' || this.source == 'sale_act_goods'){
                  if(item2.goods_id == item.goods_id) {
                      item.isExist = true;
                      break;
                  }
              }else{
                  if(item2.goods_commonid == item.goods_commonid) {
                      item.isExist = true;
                      break;
                  }
              }
          }
        });
        this.$emit('addPageGoods',emitList);
        this.pageParams.searchAllSelect = 0;
      });
      // var emitList = _.clone(this.goodList);
      // this.$emit('addPageGoods',emitList.reverse());
      // 该显示效果分类限制展示8个商品，当前分类下的商品数已超限制
    },

    showDetail(item,i){
      let routeData = this.$router.resolve({
        name:"store_goods_add_step_two",
        params:{commonId:item.goods_commonid}
      });
      window.open(routeData.href, '_blank');
    },

    addOneGoods(good){
        this.$emit('addOneGoods',good);
    },

    changeIndex(index){
        var data = _.clone(this.pageParams);
        // data.keyword = this.goods_name,
        // data.gc_id_2 = this.gc_id_2,
        // data.gc_id_3 = this.gc_id_3
        data.pageIndex = index;
        data.type = this.source;
        data.sale_act_id = this.saleActId.join(',').split(',');
        if(this.excludeGoods.length > 0) {
          let excludeGoodsIds = [];
          this.excludeGoods.forEach((goods,gs)=>{
            excludeGoodsIds.push(''+goods.goods_id);
          });
          data.excludeGoodsIds = excludeGoodsIds;
        }
        this.pageParams.pageIndex = index;
        data = {
          ...data,
          ...this.searchParams
        }
        this.getPageData(data);
    },

    close(){
        this.$emit('close');
    },

    removeOneGoods(good,g){
        this.$emit("removeOneGoods",{good:good,index:g})
    },


  },
  watch:{

    goodsList(){
        var newGoodList = _.clone(this.goodList);
        newGoodList.forEach((good,g) => {
            good.isExist = false;
            this.goodsList.forEach((goods,gs)=>{
                if(this.source == 'store_promotion_bundling'||this.source == 'store_coupon_gift'  || this.source == 'sale_act_goods'){
                  if(good.goods_id == goods.goods_id){
                    good.isExist = true;
                  }
                }else{
                  if(good.goods_commonid == goods.goods_commonid){
                    good.isExist = true;
                  }
                }
            })
        });
        this.goodList = newGoodList;

    }

  },
  mounted() {
    var _self =this;
    _self.init();
    //body绑定键盘enter搜索事件
    // _self.bodyListener = (e) => {
    //   if (e.keyCode === 13 && _self.showCategory){
    //     _self.search();
    //   }
    // }
    // document.body.addEventListener('keyup', _self.bodyListener, false);
  },
  beforeDestroy(){
    //销毁键盘enter搜索事件
    //document.body.removeEventListener('keyup', this.bodyListener);
  },
}
