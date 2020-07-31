<style scoped>
  .qm-tabs{
    width: 100%;
    margin-bottom: 30px;
    border-bottom: solid 1px #eee;
  }
  /*发布流程步骤提示*/
  .add-goods-step{font-size: 0; margin:20px 0;}
  .add-goods-step li{color: #ccc; vertical-align: top; display: inline-block; position: relative; z-index: 1; padding: 0 30px;}
  .add-goods-step li h6{line-height: 16px;}
  .add-goods-step li h2{font-size: 22px; font-weight: lighter; line-height: 30px;}
  .add-goods-step li .fa{font-size: 20px; line-height: 50px; text-align: center; width: 20px; height: 50px; position: absolute; z-index: 1; top: 0; right: -10px;}
  .add-goods-step li.current,.add-goods-step li.current h2{color:#ff8519;}
  .sticky .add-goods-step{width: 940px; height: 50px; padding: 10px 0 10px 20px; margin: 0; border-bottom: solid 1px #27A9E3; position: fixed; z-index: 99; top: 0;}
</style>
<template>
  <div class="qm-store-class-index">
    <qm-tabs :tabs="tabs" :blod="false" class="store-tabs" :marginRight="20" @routerData="routerData($event)" v-if="(commonId > 0 && $route.name!=='store_goods_add_step_four' && type == 0)">
    </qm-tabs>
    <ul class="add-goods-step" v-if="commonId == 0|| $route.name==='store_goods_add_step_four' || type==1">
      <li :class="[curUrl=='store_goods_add_step_one'?'current':'']">
        <h6>STEP.1</h6>
        <h2>选择商品分类</h2>
        <i class="fa fa-angle-right"></i> </li>
      <li :class="[curUrl=='store_goods_add_step_two'?'current':'']">
        <h6>STEP.2</h6>
        <h2>填写商品详情</h2>
        <i class="fa fa-angle-right"></i> </li>
      <li :class="[curUrl=='store_goods_add_step_three'?'current':'']">
        <h6>STEP.3</h6>
        <h2>上传商品图片</h2>
        <i class="fa fa-angle-right"></i> </li>
      <li :class="[curUrl=='store_goods_add_step_four'?'current':'']">
        <h6>STEP.4</h6>
        <h2>商品发布成功</h2>
      </li>
    </ul>
    <div class="clear"></div>
    <router-view />
  </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';
    import QmTabs from '../../../components/qm-tabs/index';

    export default {
        name: "store-goods-add",
        data(){
          return{
            curUrl: '',
            tabs:{
              add_step_one:{name:'普通商品上架',select:true,act:'add_step_one',hidden:true},
            },
            commonId:0,
            imgMenu:false,
            type:0
          }
        },
        components: {
          QmTabs,
        },
        methods:{
          ...mapActions('storeGoodsAdd',{
            getGoodsInfo:'getGoodsInfo',
            hasImgMenu:'hasImgMenu'
          }),
          changeCur(){
            this.curUrl = this.$route.name
          },
          changeImgMenu() {
            let router_name = this.$route.name;
            if(router_name === 'store_goods_add_step_one') {
              this.tabs = {
                add_step_one:{name:'选择分类',select:true,act:'store_goods_add_step_one',hidden:false},
                add_step_two:{name:'编辑商品',select:false,act:'store_goods_add_step_two',hidden:false},
                add_step_three:{name:'编辑图片',select:false,act:'store_goods_add_step_three',hidden:false},
              }
            }else{
              this.tabs = {
                add_step_two:{name:'编辑商品',select:(router_name === 'store_goods_add_step_two') ? true: false,act:'store_goods_add_step_two',hidden:false},
                add_step_three:{name:'编辑图片',select:(router_name === 'store_goods_add_step_three') ? true: false,act:'store_goods_add_step_three',hidden:false},
              }
            }
          },
          changeRouter() {
            this.commonId = this.$route.params.commonId ? this.$route.params.commonId : 0;
            if(this.imgMenu === true && this.commonId > 0) {
              this.changeImgMenu();
              return;
            }
            let router_name = this.$route.name;
            if(this.$route.params.hasOwnProperty('type')) {
              this.type = this.$route.params.type ? this.$route.params.type : 0;
            }
            if(this.commonId > 0) {
              this.hasImgMenu({commonId:this.commonId}).then(res=>{
                this.imgMenu = res.hasImgMenu;
              })
            }
            if(this.commonId > 0) {
              if(router_name === 'store_goods_add_step_one') {
                this.tabs = {
                  add_step_one:{name:'选择分类',select:true,act:'store_goods_add_step_one',hidden:false},
                  add_step_two:{name:'编辑商品',select:false,act:'store_goods_add_step_two',hidden:false},
                }
              }else{
                this.tabs = {
                  add_step_two:{name:'编辑商品',select:(router_name === 'store_goods_add_step_two') ? true: false,act:'store_goods_add_step_two',hidden:false},
                }
              }

            }else{
              this.tabs = {
                add_step_one:{name:'普通商品上架',select:true,act:'store_goods_add_step_one',hidden:true},
              };
            }

          },
          routerData(data) {
            this.curUrl = data.key;
            this.$router.push({name:data.key,params:{commonId:this.commonId}});
          }
        },
        watch:{
          '$route'(newRouter){
            this.changeRouter();
            this.changeCur();
          },
          imgMenu(val) {
            if(val === true) {
              this.changeImgMenu();
            }
          }
        },
        mounted() {
          this.changeRouter();
          this.changeCur();
        },
    }
</script>

<style scoped>
.qm-store-class-index{
  /* border: 1px solid #d7dde4; */
  background: #fff;
  padding: 10px 20px 30px;
  /* width: 1000px; */
  width: 980px;
}
</style>
