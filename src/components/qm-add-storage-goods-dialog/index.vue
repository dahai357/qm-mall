<style scoped>
    .eject_store_goods_storage_copy .ncsc-form-tit {font-size: 16px;line-height: 3;display: block}
    /*.goods-sku-container .ncsc-table-goods-attr-box{overflow-y: auto;min-height: 150px;overflow-x: hidden;}*/
    .list-category2 li{ font-size: 12px;position: relative; box-sizing: border-box;padding: 0 10px; }
    .list-category2 li:first-child{ border:none;}
    .list-category2 li:hover{ cursor: pointer; background:#f5f5f5;}
    .list-category2 .btn-del{ display: block; height: 20px; line-height: 20px; width: 20px; text-align: center; font-family: SimSun; color:#333; position: absolute; top: 50%; margin-top: -10px; right: 10px;}
    .list-category2 .btn-del:hover{text-decoration: none; color: #ff8519;}
    .list-category-used li{ line-height: 29px; border-top:1px dotted #ddd;}

    .category-used{ display: inline-block; vertical-align: middle; position: relative; font-size:12px; width: 190px;border-right:0;border-top-right-radius: 0;border-bottom-right-radius: 0;}
    .category-used .category-tit{ white-space: nowrap;text-overflow: ellipsis; overflow: hidden;word-break: break-all;border:1px solid #ddd; color:#757575; line-height: 30px;height:30px; box-sizing: border-box; border-right:0;border-radius:5px; border-top-right-radius: 0;border-bottom-right-radius: 0;    padding: 0 10px; position: relative;}
    .category-used .category-tit i{ color:#757575; position: absolute; right: 10px; top: 7px;}
    .pop-category-used{ position: absolute; left: 0; width: 100%; box-sizing: border-box; top: 30px; border:1px solid #ddd; z-index:
      500; background: #fff;  max-height: 302px; overflow-y: auto;}
    .category-used:hover{ cursor: pointer;}
    .category-used.active .category-tit{ color:#333;}
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
  .input{
    line-height: 25px;
    height: 25px;
    float: left;
    margin-right: 3px;
    margin-top: 5px;
  }
  .input.ncsc-btn-orange:hover{
    color: #eee;
  }
.search{
  height: 35px;
  padding-left: 6px;
  padding-right: 5px;
}
  .search .keyword{
    font-size: 12px;
  }
  .w220{
    width: 220px;
  }
    .tips_content .eject_con{
      text-align: center;
    }
    .tips_content .bottom{
      padding:0 25px;
    }
    .batch_form.eject_con dl dt{
      width: 8em;
    }
</style>

<style lang="scss" scoped>
  .mytree /deep/{
    .el-tree > .el-tree-node:after {
      border-top: none;
    }
    .el-tree-node {
      position: relative;
      padding-left: 10px;
    }
    //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
    .el-tree-node__expand-icon.is-leaf{
      display: none;
    }
    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node :last-child:before {
      height: 38px;
    }

    .el-tree > .el-tree-node:before {
      border-left: none;
    }

    .el-tree > .el-tree-node:after {
      border-top: none;
    }

    .el-tree-node:before {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:after {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:before {
      border-left: 1px solid #b9b9b9;
      bottom: 0px;
      height: 100%;
      top: -23px;
      width: 1px;
    }

    .el-tree-node:after {
      border-top: 1px solid #b9b9b9;
      height: 20px;
      top: 15px;
      width: 20px;
    }
  }
  .btns {
    display: inline-block;
    vertical-align: bottom;
  }
  </style>
<template>

    <div>
        <qm-dialog :dialogVisible="addDialog" :width="'420px'" @close="closeAddDialog">
            <template slot="title">加入商品</template>
            <template slot="content" >
                <div class="dialog_content" @click="dialogClick($event)">
                    <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
                        <div class="ncsc-form-s" >
                            <dl>
                                <dt>商品名称：</dt>
                                <dd>{{goods.goodsName}}</dd>
                            </dl>
                          <dl>
                            <dt>商品分类：</dt>
                            <dd>
                              <div :class="[showStaple?'active':'','category-used']" class="fl"  id="category_used" >
                                <div class="category-tit">{{gcInfo.gc_tag_name}}</div>
                                <div class="pop-category-used" id="pop_category_used" v-show="showStaple" >
                                  <p style="padding: 0 10px;">最近使用分类：</p>
                                  <ul class="list-category2 list-category-used">
                                    <li v-for="(item,i) in localStapleList" @click="selectStaple(item)"><p class="text">{{item.staple_name}}</p></li>
                                    <li><p class="text" style="text-align: center;color:#ff8519" @click="showMore()">更多分类</p></li>
                                  </ul>
                                </div>
                              </div>
                              <input type="button" value="修改分类" class="ncsc-btn ncsc-btn-orange fl modify_category" @click="showStaplePop()">
                            </dd>
                          </dl>
                            <dl>
                                <dt>商品原价：</dt>
                                <dd>{{goods.goodsMarketPrice}}元</dd>
                            </dl>
                            <dl>
                                <dt>商品折扣：</dt>
                                <dd><input type="text" :value="addDiscount" @keyup="calPrice" class="ncsc-form-control">%</dd>
                            </dl>
                            <dl>
                                <dt><i class="required">*</i>商品售价：</dt>
                                <dd><input type="text" class="ncsc-form-control"  v-model="addParams.price" @keyup="onlyNumberPrice($event,'addParams.price')">元</dd>
                            </dl>
                            <dl>
                                <dt><i class="required">*</i>追加库存：</dt>
                                <dd><input type="text" class="ncsc-form-control" maxlength="8" v-model="addParams.storage"  @keyup="onlyInteage($event,'addParams.storage')"  ></dd>
                            </dl>
                            <dl>
                                <dt>库存预警值：</dt>
                                <dd>
                                    <input type="text" class="ncsc-form-control"  v-model="sku" maxlength="3"  @keyup="onlyInteage($event,'sku')"  >
                                    <p class="hint">请填写0~255的数字，0为不预警。</p>
                                </dd>
                            </dl>
                        </div>
                        <div class="bottom">
                            <input type="button" value="提交" class="ncsc-btn ncsc-btn-orange fr" @click="addSave">
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </template>
        </qm-dialog>
        <qm-dialog :dialogVisible="multiSpecAddDialog" :width="'960px'" @close="closeMultiSpecAddDialog">
            <template slot="title">加入商品</template>
            <template slot="content" >
                <div class="dialog_content" @click="dialogClick($event)">
                    <div class="eject_con eject_store_goods_storage_copy" xmlns="http://www.w3.org/1999/html">
                        <div class="ncsc-form-s mt20" >
                          <dl>
                            <dt>商品名称：</dt>
                            <dd>{{goods.goodsName}}</dd>
                          </dl>
                          <dl>
                            <dt>商品分类：</dt>
                            <dd>
                              <div :class="[showStaple?'active':'','category-used']" class="fl"   >
                                <div class="category-tit">{{gcInfo.gc_tag_name}}</div>
                                <div class="pop-category-used"  v-show="showStaple" >
                                  <p style="padding: 0 10px;">最近使用分类：</p>
                                  <ul class="list-category2 list-category-used">
                                    <li v-for="(item,i) in localStapleList" @click="selectStaple(item)"><p class="text">{{item.staple_name}}</p></li>
                                    <li><p class="text" style="text-align: center;color:#ff8519" @click="showMore()">更多分类</p></li>
                                  </ul>
                                </div>
                              </div>
                              <input type="button" value="修改分类" class="ncsc-btn ncsc-btn-orange fl modify_category" @click="showStaplePop()">
                            </dd>
                          </dl>
                            <qm-goods-sku :goodsAttr="goodsAttr" :styleObject="styleObject"></qm-goods-sku>
                        </div>
                        <div class="bottom">
                            <input type="button" value="提交" class="ncsc-btn ncsc-btn-orange fr" @click="addMultiSpecSave">
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </template>
        </qm-dialog>
      <qm-dialog :dialogVisible="showTips" :width="'420px'" @close="showTips=!showTips">
        <template slot="title">提示</template>
        <template slot="content" >
          <div class="dialog_content tips_content">
            <div class="eject_con" style="font-size: 15px; font-weight: bold;">
              <p>店铺不存在"<span style="color: #ff8519;">{{gcInfo.gc_tag_name}}</span>"分类</p>
              <p>是否自动为您新建？</p>
            </div>
              <div class="bottom">
                <input type="button" value="不新建,修改商品分类" class="ncsc-btn fl ncsc-btn-orange-rim" @click="showTips=!showTips">
                <input type="button" value="新建,并加入商品" class="ncsc-btn ncsc-btn-orange fr" @click="submitAdd()">
                <div class="clear"></div>
              </div>
          </div>
        </template>
      </qm-dialog>
      <qm-dialog v-if="addDialog || multiSpecAddDialog || batchAddDialog" :dialogVisible="showMoreCategory" :width="'420px'" @close="closeMoreCategory()">
        <template slot="title">选择/修改分类</template>
        <template slot="content" >
          <div class="search">
            <input type="text" v-model.trim="keyword" placeholder="支持输入二级/三级分类进行条件搜索" class= "keyword w220" />
            <div class="btns">
              <input @click="reset()" v-show="showReset" type="button" class="ncsc-btn fr ml5" value="撤销检索" />
              <input @click="search()" type="button" class="ncsc-btn ncsc-btn-orange  fr" value="搜索" />
            </div>
          </div>
          <div class="dialog_content mytree" style="min-height:200px;max-height:268px;overflow-y: auto;overflow-x: hidden">
            <el-tree
              :indent="0"
              :expand-on-click-node="false"
              :default-expanded-keys="expands"
              node-key="gc_id"
              :data="categoryList"
              :props="defaultProps"
              @node-click="handleNodeClick"
              ref="tree">
      <span class="custom-tree-node" style="height: 40px;line-height: 40px;display: inline-block;margin-left: 5px;" slot-scope="{ node, data }">
        <template v-if="data.isNew">
          <input type="text" maxlength="8" v-model.trim="data.gc_name" placeholder="请输入三级分类名称" class="input w150" />
          <input @click="confirmAdd(node,data)" type="button" class="input ncsc-btn ncsc-btn-orange fr" value="确定" />
          <input @click="delAdd(node,data)" type="button" class="input ncsc-btn fr" value="取消" />
        </template>
        <template v-else>
           <span>{{ node.label }}</span>
          <span style="display: inline-block;margin-left: 10px;color: #ff8519;" v-if="data.level == 2">
            <el-button
              type="text"
              size="mini"
              @click="() => addNew(data)">
              新增三级分类
            </el-button>
          </span>
        </template>

      </span>
            </el-tree>
          </div>

          <div class="bottom">
            <input type="button" value="提交" class="ncsc-btn ncsc-btn-orange fr" @click="addGc()">
            <div class="clear"></div>
          </div>
        </template>
      </qm-dialog>

      <qm-dialog :dialogVisible="batchAddDialog" :width="'450px'" @close="closeBatchAddDialog()">
        <template slot="title">批量加入商品</template>
        <template slot="content" >
          <div class="dialog_content" @click="dialogClick($event)">
            <div class="eject_con explain_form batch_form" xmlns="http://www.w3.org/1999/html">
              <div>
                <dl>
                  <dt>商品分类：</dt>
                  <dd>
                    <div :class="[showStaple?'active':'','category-used']" class="fl"   >
                      <div class="category-tit">{{gcInfo.gc_tag_name}}</div>
                      <div class="pop-category-used"  v-show="showStaple" >
                        <p style="padding: 0 10px;">最近使用分类：</p>
                        <ul class="list-category2 list-category-used">
                          <li v-for="(item,i) in localStapleList" @click="selectStaple(item)"><p class="text">{{item.staple_name}}</p></li>
                          <li><p class="text" style="text-align: center;color:#ff8519" @click="showMore()">更多分类</p></li>
                        </ul>
                      </div>
                    </div>
                    <input type="button" :value="gcInfo.gc_tag_name == '' ? '选择分类':'修改分类'" class="ncsc-btn ncsc-btn-orange fl modify_category" @click="showStaplePop()">
                  </dd>
                </dl>
                <dl>
                  <dt>价格设置类型：</dt>
                  <dd>
                    <div class="ncsc-form-custom-radio-group">
                      <div :class="addParams.type == 1 ? 'ncsc-form-custom-radio checked':'ncsc-form-custom-radio'" @click="addParams.type = 1">
                        <div class="ncsc-custom-radio-frame">
                          <input type="radio" name="type" value="1" id="type_1" class="ncsc-custom-radio">
                        </div>
                        <label for="type_1" class="ncsc-custom-txt">
                          <span class="name">按折扣设置价格</span>
                        </label>
                      </div>
                      <div :class="addParams.type == 0 ? 'ncsc-form-custom-radio checked':'ncsc-form-custom-radio'" @click="addParams.type = 0">

                        <div class="ncsc-custom-radio-frame">
                          <input type="radio" name="type" value="0" id="type_0" class="ncsc-custom-radio" checked="checked">
                        </div>
                        <label for="type_0" class="ncsc-custom-txt">
                          <span class="name">按统一价格设置</span>
                        </label>
                      </div>
                    </div>

                    <p></p>
                  </dd>
                </dl>
                <dl>
                  <dt><i class="required">*</i><template v-if="addParams.type == 1">商品折扣：</template><template v-else>商品售价：</template> </dt>
                  <dd v-if="addParams.type == 1">
                    <input type="text" class="text" v-model="addParams.discount" @keyup="onlyInteage($event,'addParams.discount')" maxlength="3">%
                    <p class="ncsc-form-hint" >0-100的整数</p>
                  </dd>
                  <dd v-else><input type="text" class="ncsc-form-control"  v-model="addParams.price" @keyup="onlyNumberPrice($event,'addParams.price')">元</dd>
                </dl>
                <dl>
                  <dt><i class="required">*</i>追加库存：</dt>
                  <dd>
                    <input type="text" class="text" v-model="addParams.storage" @keyup="onlyInteage($event,'addParams.storage')" maxlength="8">
                  </dd>
                </dl>
                <dl>
                  <dt>库存预警值：</dt>
                  <dd>
                    <input type="text" class="ncsc-form-control"  v-model="addParams.sku" maxlength="3"  @keyup="onlyInteage($event,'addParams.sku')"  >
                    <p class="hint">请填写0~255的数字，0为不预警。</p>
                  </dd>
                </dl>
              </div>
              <div class="bottom">
                <input type="button"  value="提交" class="ncsc-btn ncsc-btn-orange fr" @click="batchAddSave">
                <div class="clear"></div>
              </div>
            </div>
          </div>
        </template>
      </qm-dialog>
    </div>
</template>

<script>
  import Vue from 'vue'
  import {mapGetters,mapActions} from 'vuex';
  import util from 'lib/utils/util';
  import QmGoodsSku from 'component/qm-goods-sku'
  import QmDialog from 'component/qm-dialog/index';
  import {storeGoodsStorage} from 'api'
  import mixin from 'component/main/mixin';
  import md5 from 'js-md5';
    export default {
        name: "qm-add-storage-goods-dialog"
      ,
      mixins:[mixin],
      props:{
        selectedGcTag:{
          type:Array,
          default:[]
        },
        stapleList:{
          type:Array,
          default:[]
        },
        batchAddDialog:{//多规格商品添加弹窗
          type:Boolean,
          default:false
        },
        addDialog:{//单规格商品添加弹窗
          type:Boolean,
          default:false
        },
        multiSpecAddDialog:{//多规格商品添加弹窗
          type:Boolean,
          default:false
        },
        checkState:{
          type:Array,
          default:[]
        },
        saveBatchAdd:{
          type:Boolean,
          default:false
        },
        goods:{
          type:Object,
          default: function () {
            return {
              goodsMarketPrice: '',
              goodsName: '',
              commonId:''
            }
          }
        },
        goodsAttr:{
          type:Object,
          default: function () {
            return {
              goodsAttr:[],
              goodsAttrName:[],
              spValue:[],
              gcName:''
            }
          }
        },
        sku:{
          default:''
        }
      },
      data(){
        return {
          showReset:false,
          showTips:false,
          expands:[],
          keyword:'',
          categoryList:[],
          defaultProps:{
            children: 'children',
            label:'gc_name'
          },
          showMoreCategory:false,
          showStaple:false,
          localStapleList:[],
          addParams: {//添加商品参数
            discount: '',
            storage: '',
            price: '',
            sku:'',
            type:1,
          },
          gcInfo:{
            gc_id_1:0,
            gc_id_2:0,
            gc_id_3:0,
            is_system:0,
            is_supplier:0,//是否供应商分类
            gc_name:'',
            gc_tag_name:''
          },
          styleObject:{
            maxHeight:(window.innerHeight-250)+'px'
          },
          selectedGc:{}
        }
      },
      computed: {
        addDiscount:function () {
          let price = parseFloat(this.addParams.price),
            market_price = parseFloat(this.goods.goodsMarketPrice);
          if(price >= 0 && market_price >= 0) {
            if(market_price == 0) {
              this.addParams.price = 0;
              return 0;
            }
            //return Math.round((price/market_price).toFixed(2)*100);
            return util.discount(price,market_price);
          }else{
            return '';
          }
        },
      },
      components:{
        QmDialog,
        QmGoodsSku
      },
      methods:{
        ...mapActions({
          classEdit:'classEdit',
        }),
        closeMoreCategory(){
          this.showMoreCategory = false
          this.showReset = false
          this.keyword = ''
        },
        dialogClick(e){
          //关闭弹窗
          if(e.target.tagName != 'P' && e.target.tagName != 'INPUT'){
            this.showStaple = false;
          }
        },
        batchAddSave(){//批量添加保存
          if(this.gcInfo.gc_tag_name == ''){
            util.msg('请选择分类');
            return;
          }
          if(this.addParams.storage === '') {
            util.msg('库存不能为空');
            return;
          }
          if(this.addParams.type == 1){
            if(this.addParams.discount === '') {
              util.msg('折扣不能为空');
              return;
            }
            var r = /^([1-9]([0-9])?|100|0)$/;
            if(!r.test(this.addParams.discount)) {
              util.msg('折扣需为0-100的整数');
              return;
            }
          }else{
            if(this.addParams.price === '') {
              util.msg('售价不能为空');
              return;
            }
            let price = parseFloat(this.addParams.price);
            if(isNaN(price) || price < 0 ) {
              util.msg('请填写正确的价格');
              return;
            }
          }

          if(!(!isNaN(parseInt(this.addParams.storage)) && this.addParams.storage%1 === 0)) {
            util.msg('请正确填写库存');
            return;
          }
          let sku = parseInt(this.addParams.sku);
          if(isNaN(sku) || sku < 0 || sku > 255) {
            util.msg('库存预警应为0-255数字');
            return;
          }
          let commonIds = this.checkState.join(',');
          let data = {
            ...this.gcInfo,
            ...this.addParams,
            commonId: commonIds,
            sign: md5(commonIds+'store_goods_storage'+'copy_all')
          };
          storeGoodsStorage.copyAllSaveData(data).then(res=> {
            util.msg(res.shortMessage);
            if(res.resultCode === 1) {
              this.closeBatchAddDialog();
              //清空填写的数据
              this.addParams.discount = '';
              this.addParams.storage = '';
              this.$emit('update:saveBatchAdd', true);
            }
          });
        },
        updateGcInfo(item){
          this.gcInfo.gc_id_1 = item.gc_id_1;
          this.gcInfo.gc_id_2 = item.gc_id_2;
          this.gcInfo.gc_id_3 = item.gc_id_3
          this.gcInfo.is_system = item.is_system;
          this.gcInfo.gc_name = item.gc_name
          this.gcInfo.gc_tag_name = item.gc_tag_name
          this.gcInfo.is_supplier = 0
        },
        search(){
          this.selectedGc = {};
          let data = {
            keyword:this.keyword
          }
          if(this.keyword != ''){
            this.showReset = true
          }else{
            this.showReset = false
          }
          this.getAllClass(data)
        },
        reset(){
          this.selectedGc = {};
          this.keyword = ''
          this.showReset = false
          this.getAllClass()
        },
        delAdd(node, data){
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.gc_id === data.gc_id);
          children.splice(index, 1);
        },
        confirmAdd(node,data){
          var  _reg1 =  new RegExp("^[\u4e00-\u9fa5_a-zA-Z0-9]+$");
          if(data.gc_name == ''){
              layer.msg('请填写三级分类名称')
              return;
          }
          if(!_reg1.test(data.gc_name)){
            layer.msg("分类名称仅支持中文、英文、数字")
            return;
          }
          var postData = {
            gc_parent_id:node.parent.data.gc_id,
            gc_name:data.gc_name,
            goods_class_t_id:0
          }
          this.classEdit(postData).then((res)=>{
            if(res.resultCode==1){
              const newChild = { gc_id: res.responseContent.gc_id, gc_name: data.gc_name,level:3,is_system:0};
              if (!node.parent.data.children) {
                this.$set(node.parent.data, 'children', []);
              }
              node.parent.data.children.unshift(newChild);
              this.delAdd(node,data)
            }else{
              layer.msg(res.shortMessage);
            }
          })

        },
        showMore(){
          this.showMoreCategory = true;
          this.showStaple =false
        },
        getAllClass(data){
          storeGoodsStorage.getAllClass(data).then(res=>{
            this.categoryList = res.list
            this.expands = res.expands
          })
        },
        showStaplePop(){
          if(!this.showStaple){
            this.localStapleList = []
            if(this.stapleList.length > 0){
              this.localStapleList = this.stapleList.slice(0,5)
              this.showStaple = true;
            }else{
              this.showMore()
            }
          }else{
            this.showStaple = false;
          }

        },
        selectStaple(item){
          this.gcInfo.gc_id_1 = item.gc_id_1;
          this.gcInfo.gc_id_2 = item.gc_id_2;
          this.gcInfo.gc_id_3 = item.gc_id_3?item.gc_id_3:item.goods_class_t_id;
          this.gcInfo.is_system = item.gc_id_3?1:0;
          this.gcInfo.gc_tag_name = item.staple_name;
          this.gcInfo.is_supplier = 0;
          this.showStaple =false
        },
        addNew(data){
          if(this.expands.length == 0 || this.expands.indexOf(data.gc_id) == -1){
            this.expands.push(data.gc_id)
          }
          const newChild = { gc_id: 0, gc_name: '',isNew:1 };
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          let hasNew = false
          data.children.forEach(function(k,v){
            if(1 == data.children[v].isNew){
              hasNew = true;
            }
          })
          if(hasNew) {
            layer.msg('请输入三级分类名称')
            return
          }
          data.children.unshift(newChild);
        },
        handleNodeClick(data,node,e){
          this.selectedGc = {}
          if(data.level != 3){
            e.node.isCurrent = false
            return;
          }
          let item = {
            gc_id_1:node.parent.parent.data.gc_id,
            gc_id_2:node.parent.data.gc_id,
            gc_id_3:data.gc_id,
            is_system:data.is_system,
            gc_name:data.gc_name,
            gc_tag_name:node.parent.parent.data.gc_name+'>'+node.parent.data.gc_name+'>'+data.gc_name
          }
          this.updateGcInfo(item)
        },
        addGc(){
          this.showMoreCategory = false;
          this.showStaple = false;
          this.closeMoreCategory()
        },
        closeBatchAddDialog() {
          //清空填写的数据
          this.resetPageData();
          this.$emit('update:batchAddDialog', false);
        },
        closeAddDialog() {
          this.resetPageData();
          this.$emit('update:addDialog', false);
        },
        closeMultiSpecAddDialog() {
          this.resetPageData();
          this.$emit('update:multiSpecAddDialog', false);
        },
        resetPageData(){
          this.addParams.discount = '';
          this.addParams.storage = '';
          this.addParams.price = '';
          this.addParams.sku = '';
          this.addParams.type = 1;
          this.showMoreCategory = false;
          this.showStaple = false;
        },
        calPrice(e) {
          e.target.value = e.target.value.replace(/\D/g,'');
          let value = parseInt(e.target.value);
          if(value >= 0) {
            this.addParams.price = util.number_format((this.goods.goodsMarketPrice*100*value/10000),2);
          }else{
            this.addParams.price = '';
          }
        },
        addSave() {//添加单规格商品保存
          if(this.addParams.price === '') {
            util.msg('售价不能为空');
            return;
          }
          let price = parseFloat(this.addParams.price);
          if(isNaN(price) || price < 0 ) {
            util.msg('请填写正确的价格');
            return;
          }
          if(this.addParams.storage === '') {
            util.msg('库存不能为空');
            return;
          }
          let sku = parseInt(this.sku);
          if(isNaN(sku) || sku < 0 || sku > 255) {
            util.msg('库存预警应为0-255数字');
            return;
          }
          if(this.addDiscount > 100) {
            util.msg('商品折扣仅支持输入0-100的整数');
            return;
          }
          if(1 == this.gcInfo.is_supplier && 0 == this.gcInfo.is_system){
            //分类是否存在
            storeGoodsStorage.checkHasClass(this.gcInfo).then(res=>{
              if(1 == res.resultCode) {
                if(1 == res.responseContent.find){
                 this.submitAdd()
                }else{
                  this.showTips = true
                }
              }
            })
          }else{
            this.submitAdd()
          }
        },
        submitAdd(){
          this.addParams.sku = this.sku;
          let data = {
            ...this.addParams,
            ...this.gcInfo,
            commonId: this.goods.commonId,
          };
          this.copyOneSaveData(data);
        },
        addMultiSpecSave() {//添加多规格商品保存
          for (let item of this.goodsAttr.spValue) {
            // if(item.stock === '') {
            //   util.msg('库存不能为空');
            //   return;
            // }
            if(item.market_price === '' || item.price === '') {
              util.msg('请填写商品价格');
              return;
            }
            let market_price = parseFloat(item.market_price);
            let price = parseFloat(item.price);
            if(isNaN(market_price) || market_price < 0 || isNaN(price) || price < 0) {
              util.msg('请填写正确的价格');
              return;
            }
            if(item.stock === '') {
              util.msg('请填写商品库存');
              return;
            }else{
              let goods_storage = parseInt(item.stock);
              if(isNaN(goods_storage) || goods_storage < 0) {
                util.msg('请填写正确的库存数量');
                return;
              }
            }
            let sku = parseInt(item.sku);
            if(isNaN(sku) || sku < 0 || sku > 255) {
              util.msg('库存预警应为0-255数字');
              return;
            }
          }

          if(1 == this.gcInfo.is_supplier && 0 == this.gcInfo.is_system){
            //分类是否存在
            storeGoodsStorage.checkHasClass(this.gcInfo).then(res=>{
              if(1 == res.resultCode) {
                if(1 == res.responseContent.find){
                  this.subMulti()
                }else{
                  this.showTips = true
                }
              }
            })
          }else{
            this.subMulti()
          }
        },
        subMulti(){
          let spValue = JSON.stringify(this.goodsAttr.spValue);
          let data = {
            ...this.gcInfo,
            spec: spValue,
            commonId: this.goods.commonId
          };
          this.copyOneSaveData(data);
        },
        copyOneSaveData(data) {
          storeGoodsStorage.copyOneSaveData(data).then(res=>{
            util.msg(res.shortMessage);
            if(res.resultCode === 1) {
              this.addParams = {
                discount: '',
                storage: '',
                price: '',
                sku:''
              };
              this.showTips = false
              this.$emit('saveSuccess');
              // this.addDialog = false;
              // this.multiSpecAddDialog = false;
              // setTimeout(res=>{
              //   this.getPageData(this.pageParams);
              // },1000);
            }
          })
        },
        bodyListener(e){
          if(e && e.keyCode == 13){
            if(this.addDialog){
              this.addSave()
            }else if(this.multiSpecAddDialog){
              this.addMultiSpecSave()
            }else if(this.batchAddDialog){
              this.batchAddSave()
            }
          }
        }
      },
      watch:{
        addDialog:function(val,oldval){
          if(val == true){
            this.getAllClass([])
          }
        },
        multiSpecAddDialog:function(val,oldval){
          if(val == true){
            this.getAllClass([])
          }
        },
        batchAddDialog:function(val,oldval){
          if(val == true){
            this.getAllClass([])
          }
        },
        selectedGcTag(){
          this.gcInfo.gc_id_1 = this.selectedGcTag.gc_id_1;
          this.gcInfo.gc_id_2 = this.selectedGcTag.gc_id_2;
          this.gcInfo.gc_id_3 = this.selectedGcTag.gc_id_3?this.selectedGcTag.gc_id_3:this.selectedGcTag.goods_class_t_id;
          this.gcInfo.is_system = this.selectedGcTag.gc_id_3?1:0;
          this.gcInfo.gc_tag_name = this.selectedGcTag.gc_tag_name;
          this.gcInfo.gc_name = '';
          this.gcInfo.is_supplier = 1;
          if(this.selectedGcTag.default_alarm > 0){
            this.addParams.sku = this.selectedGcTag.default_alarm
          }
        }
      },
      mounted() {
        document.body.addEventListener('keyup', this.bodyListener, true);
      },
      beforeDestroy(){
        //销毁键盘enter搜索事件
        document.body.removeEventListener('keyup', this.bodyListener);
      },

    }
</script>
