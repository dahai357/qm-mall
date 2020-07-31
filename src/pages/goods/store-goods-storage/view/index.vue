<style scoped>
  .ncsc-form-default {
    padding-bottom: 20px;
    min-height: 600px;
  }
  .qm-store-class-base {
    padding: 20px 0 10px;
  }
  .ncsc-mod-section{margin-bottom: 30px;}
  .ncsc-mod-section .ncsc-mod-hd{overflow: hidden; background: #f3f3f3; font-size: 16px; padding: 0 20px; line-height:2.5;}
  .ncsc-mod-section .ncsc-mod-hd .ncsc-title{float: left;}
  .ncsc-mod-section .ncsc-mod-hd .more{ float: right;}
  .ncsc-mod-section .ncsc-collapse{float: right; width: 20px; height: 20px; line-height: 20px; text-align: center; margin-top: 10px;}
  .ncsc-mod-section .ncsc-collapse:hover{cursor: pointer;}
  .ncsc-mod-section .ncsc-mod-bd{padding: 20px 50px;}
  .ncsc-mod-section.hide .ncsc-mod-bd{display: none;}

  .ncsc-table-spec2{border: 1px solid #dbdbdb; border-collapse: separate; box-sizing: border-box; width: 100%; border-radius: 5px;}
  .ncsc-table-spec2 td, .ncsc-table-spec2 th{border-top: 1px solid #dbdbdb; border-left: 1px solid #dbdbdb; text-align: left; padding: 10px; font-size: 14px; vertical-align: top;}
  .ncsc-table-spec2 th{font-weight: bold; color:#757575; width:15%;}
  .ncsc-table-spec2 td{width:35%;}
  .ncsc-table-spec2 tr:first-child th, .ncsc-table-spec2 tr:first-child td{border-top:none;}
  .ncsc-table-spec2 tr th:first-child{border-left: none;}
  .ncsc-table-spec2 .img-group{margin-bottom: -10px;}
  .ncsc-table-spec2 .img{display: inline-block; margin:0 10px 10px 0;}
  .ncsc-form-goods .goods-description>>>img{max-width: 100%; vertical-align: bottom;}

  .ncsc-table-set-attr td{padding: 0;}
  .ncsc-table-set-attr .col1{padding: 10px;}
  .ncsc-table-set-attr .col2{width: 245px;}
  .ncsc-table-set-attr .col3{width: 380px;}
  .ncsc-table-set-attr .ncsc-list-attr{overflow: hidden;}
  .ncsc-table-set-attr .ncsc-list-attr li{display: table; width: 100%; border-top: 1px solid #dbdbdb; margin-top: -1px;}
  .ncsc-table-set-attr .ncsc-list-attr .ncsc-attr-tit, .ncsc-table-set-attr .ncsc-list-attr .ncsc-attr-detail{display: table-cell; padding: 9px;}
  .ncsc-table-set-attr .ncsc-list-attr .ncsc-attr-name{width: 225px;}
  .ncsc-table-set-attr .ncsc-list-attr .ncsc-attr-detail{width: 380px; border-left: 1px solid #dbdbdb; padding:10px;}
  .ncsc-table-set-attr .ncsc-form-custom-checkbox-s .ncsc-custom-checkbox-txt{font-size: 14px;}
  .ncsc-table-set-attr .ncsc-form-custom-checkbox-s .ncsc-custom-checkbox-frame{margin-right: 3px;}
  .ncsc-table-set-attr .ncsc-form-group{margin-top: -5px;}
  .ncsc-table-set-attr .ncsc-form-group .ncsc-form-custom-checkbox{margin-bottom:0;}
  #btn_add_goods{margin-left: 5%;}
</style>

<template>
  <div class="qm-store-class-base item-publish store-goods-view" v-if="goods.hasOwnProperty('goodsClass')">
    <div class="ncsc-form-default ncsc-form-goods">
      <div class="ncsc-mod-section">
        <div class="ncsc-mod-hd" onselectstart="return false;">
          <div class="ncsc-title">商品基本信息</div>
          <div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section" @click="section.section1 = !section.section1"><i :class="['fa',section.section1 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
        </div>
        <div class="ncsc-mod-bd" v-show="section.section1">
          <table class="ncsc-table-spec2">
            <tbody>
            <tr>
              <th>商品分类</th>
              <td>{{goods.goodsClass.gc_tag_name}}</td>
            </tr>
            <tr>
              <th>商品名称</th>
              <td>{{goods.goods.goods_name}}</td>
            </tr>
            <tr v-if="goods.goods.goods_jingle">
              <th>商品副标题</th>
              <td>{{goods.goods.goods_jingle}}</td>
            </tr>
            <tr>
              <th>商品图片</th>
              <td>
                    <div class="img-group js-tips-img">
                      <div class="img" v-for="src in goods.goods.img" :key="src">
                        <img :src="src" :key="src" width="50" height="50"  @click="showDialog(src)">
                      </div>
                    </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="ncsc-mod-section">
        <div class="ncsc-mod-hd" onselectstart="return false;">
          <div class="ncsc-title">商品属性</div>
          <div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section" @click="section.section2 = !section.section2"><i :class="['fa',section.section2 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
        </div>
        <div class="ncsc-mod-bd" v-show="section.section2">
          <div class="ncsc-form-tit" v-if="goods.platformAttrs.length > 0 || goods.storeAttr.length > 0">属性配置</div>
          <table class="ncsc-table-spec ncsc-table-set-attr" v-if="goods.platformAttrs.length > 0 || goods.storeAttr.length > 0" cellpadding="0" cellspacing="0">
            <thead>
            <tr>
              <th class="col1"></th>
              <th class="col2">商品属性</th>
              <th class="col3">商品规格</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="goods.platformAttrs.length > 0">
              <tr>
                <td class="col1">
                  <p class="ncsc-attr-name">平台属性</p>
                </td>
                <td colspan="2">
                  <ul class="ncsc-list-attr">
                    <li v-for="item in goods.platformAttrs">
                      <div class="ncsc-attr-tit">
                        <p class="ncsc-attr-name">{{item.attribute}}</p>
                      </div>
                      <div class="ncsc-attr-detail">
                        {{item.attribute_value instanceof Array ? item.attribute_value.join(',') : item.attribute_value}}
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            </template>
            <template v-if="goods.storeAttr.length > 0">
              <tr>
                <td class="col1">
                  <p class="ncsc-attr-name">自定义属性</p>
                </td>
                <td colspan="2">
                  <ul class="ncsc-list-attr">
                    <li v-for="item in goods.storeAttr">
                      <div class="ncsc-attr-tit">
                        <p class="ncsc-attr-name">{{item.attribute}}</p>
                      </div>
                      <div class="ncsc-attr-detail">
                        {{item.attribute_value instanceof Array ? item.attribute_value.join(',') : item.attribute_value}}
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
          <div class="ncsc-form-tit mt15" v-if="goods.spValue.length > 0">单品配置</div>
          <div v-if="goods.spValue.length > 0">
            <QmGoodsSku :goodsAttr="goodsAttrProp" :specTitle="specTitle"></QmGoodsSku>
          </div>
          <table class="ncsc-table-spec2 mt15" v-if="goods.spValue.length === 0">
            <tbody>
            <tr>
              <th>商品原价</th>
              <td>{{goods.goods.goods_marketprice}}</td>
            </tr>
            <tr v-if="goods.goods.goods_barcode">
              <th>商品条形码</th>
              <td>{{goods.goods.goods_barcode}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="ncsc-mod-section" v-if="goods.goods.brand_name || goods.goods.goods_youku_url || goods.goods.goods_body">
        <div class="ncsc-mod-hd" onselectstart="return false;">
          <div class="ncsc-title">商品详情描述</div>
          <div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section" @click="section.section3 = !section.section3"><i :class="['fa',section.section3 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
        </div>
        <div class="ncsc-mod-bd" v-show="section.section3">
          <table class="ncsc-table-spec2">
            <tbody>
              <tr v-if="goods.goods.brand_name">
                <th>商品品牌</th>
                <td>{{goods.goods.brand_name}}</td>
              </tr>
              <tr v-if="goods.goods.goods_youku_url">
                <th>商品视频</th>
                <td>{{goods.goods.goods_youku_url}}</td>
              </tr>
              <tr v-if="goods.goods.goods_body">
                <th>商品描述</th>
                <td class="goods-description"><span  v-html="goods.goods.goods_body"></span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bottom ml50" id="btn_add_goods" v-show="!goods.goods.is_copy">
        <a href="javascript:;" @click="openAddDialog" class="submit">加入商品</a>
      </div>
    </div>
    <qm-add-storage-goods-dialog :addDialog.sync="addDialog" :selectedGcTag="selectedGcTag" :multiSpecAddDialog.sync="multiSpecAddDialog" :goods="goodsInfo" :goodsAttr="goodsAttr" :sku="sku" @saveSuccess="saveSuccess"></qm-add-storage-goods-dialog>
        <qm-dialog-img :imageUrl="imgSrc" :imageDialog="showImg" @close="showImg=false"></qm-dialog-img>
  </div>
</template>

<script>
  import util from 'lib/utils/util';
  import 'viewerjs/dist/viewer.css'
  import { mapMutations } from 'vuex'
  import QmAddStorageGoodsDialog from 'component/qm-add-storage-goods-dialog';
  import QmGoodsSku from 'component/qm-goods-sku'
  import QmDialog from 'component/qm-dialog/index';
  import QmDialogImg from "component/qm-dialog-img/index";
  import {storeGoodsStorage} from 'api'
  export default {
    name: "store-goods-storage-view",
    data() {
      return {
        showImg:false,
        imgSrc:"",
        specTitle:{
          market_price:{
            input:false,
            text:'原价',
            required:false,
            width:'w90'
          },
          barcode:{
            input:false,
            text:'条形码',
            required:false,
            width:'w100'
          }
        },
        params:{
          commonId:0
        },
        goods:{
        },
        viewerOptions: {
          toolbar: false,
          navbar:false,
          fullscreen:false
        },
        addDialog:false,
        multiSpecAddDialog:false,
        sku:'',
        goodsInfo: {
          goodsMarketPrice: '',
          goodsName: '',
          commonId:''
        },
        goodsAttr:{
          goodsAttr:'',
          goodsAttrName:'',
          spValue:''
        },
        section:{
          section1:true,
          section2:true,
          section3:true,
        },
        selectedGcTag:[

        ],
      }
    },

    computed:{
      goodsAttrProp:function () {
        return{
          spValue:this.goods.spValue,
          goodsAttrName:this.goods.goodsAttrName
        }
      }
    },

    components:{
      QmDialog,
      QmGoodsSku,
      QmAddStorageGoodsDialog,
      QmDialogImg
    },

    methods: {
      ...mapMutations('storeGoodsStorage',{
        setGoodsStorageTabs:'setGoodsStorageTabs'
      }),
      async getGoods(data) {
        let res = await storeGoodsStorage.lookGoods(data);
        res.spValue.forEach((item,k) => {
          res.spValue[k]['is_show'] = true;
        })
        this.goods = res;
      },
      showDialog(img){
      this.imgSrc=img;
      this.showImg=true
    },
      saveSuccess() {
        this.addDialog = false;
        this.multiSpecAddDialog = false;
        this.goods.goods.is_copy = true;
      },
      async openAddDialog() {
        this.goodsInfo.goodsName = this.goods.goods.goods_name;
        this.goodsInfo.goodsMarketPrice = this.goods.goods.goods_marketprice;
        this.goodsInfo.commonId = this.goods.goods.goods_commonid;
        let res = await storeGoodsStorage.copyOneViewData({commonId:this.goodsInfo.commonId});
        this.sku = res.default_storage_alarm;
        this.goodsAttr.goodsAttr = res.goodsAttr;
        this.goodsAttr.goodsAttrName = res.goodsAttrName;
        this.selectedGcTag = res.goodsClass
        if(res.spValue.length > 0) {
          for (let val of res.spValue) {
            val.sku = this.sku;
            val.stock = '';
          }
        }
        this.goodsAttr.spValue = res.spValue;
        this.goodsAttr.spValue.forEach((item,k) => {
          this.goodsAttr.spValue[k]['is_show'] = true;
        })
        if(this.goodsAttr.spValue.length === 0) {
          this.addDialog = true;
        }else{
          this.multiSpecAddDialog = true;
        }
      },
    },
    watch:{

    },
    mounted () {
      this.params.commonId = this.$route.params.commonId;
      // this.params.commonId = 5093255;
      this.getGoods(this.params);
      layui.use('layer', function(){
        this.layer = layui.layer;
      });
    },
    updated(){

    },
  }
</script>
