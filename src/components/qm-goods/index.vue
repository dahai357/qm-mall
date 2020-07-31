<style scoped>
  .content{
    border-radius: 5px;
  }
  .warn{
    color:red;
    display: inline-block;
  }
  .noresult {
    height: 280px;
    text-align: center;
    line-height: 280px;
  }
  .search-result table tr.checked{
    background:#fff4e9
  }
</style>

<template>
  <qm-dialog :dialogVisible="true" :width="'800px'" @close="close()" :customClass="'phone-bind sale-add-goods'">
    <template slot="title">选择跳转商品</template>
    <template slot="content" >
      <qm-add-goods
                    :showMorePrice="true"
                    :addTxt="'跳转该商品'"
                    :removeTxt="'取消选择'"
                    :goodsList="existGoods"
                    :source="'store_coupon'"
                    :showAddPage="false"
                    :borderNone = "true"
                    :showMultiSearch="true"
                    @addOneGoods="addOneGoods($event)"
                    @removeOneGoods="removeOneGoods($event)"
      ></qm-add-goods>
      <div class="bottom" style="margin-top: 0">
        <input type="button" value="确定" class="ncsc-btn ncsc-btn-orange fr" @click="save">
      </div>
    </template>
  </qm-dialog>

</template>

<script>
  import * as _ from 'lodash';
  import QmPagination from 'component/qm-pagination/index';
  import QmDialog from 'component/qm-dialog/index';
  import QmAddGoods from 'component/qm-add-goods/index';

  export default {
    name: "qm-coupon",

    data() {
      return {
        pageParams:{
          name:'',
          type:-1,
          pageIndex:0,
          pageSize:10,
          total:0
        },
        existGoods:[],
        excludeGoods:[],
      }
    },
    props:{
      includeItems:{
        type:Array,
        default:()=>[]
      }
    },
    components: {
      QmPagination,
      QmDialog,
      QmAddGoods

    },
    methods:{
      init(){
        if(this.includeItems.length > 0){
          this.includeItems.forEach((item,k)=>{
            this.existGoods.push(item)
          })
        }
      },
      save(){
        this.$emit('save',this.existGoods)
      },
      close(){
        this.$emit('close');
      },
      removeOneGoods(event){
        this.existRemoveOne(event.good)
      },
      addOneGoods(g){
        this.existGoods = [];
        let a = _.clone(g);
        a.discount_price = g.goods_price;
        a.rebate_amount = '';
        if(a.goods_storage == 0) {
          a.desc = '无库存';
        }
        this.existGoods.unshift(a);
      },
      existRemoveOne(g){
        this.existGoods.forEach((item,i)=>{
          if(item.goods_id == g.goods_id){
            this.existGoods.splice(i,1)
          }
        })
      },

    },
    mounted() {
      var _self = this;
      _self.init();
    }
  }
</script>
