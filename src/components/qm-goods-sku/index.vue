<style scoped>
    .eject_store_goods_storage_copy .ncsc-table-goods-attr-box {overflow-y: auto;min-height: 150px;overflow-x: hidden;}
    .eject_store_goods_storage_copy .batch-last .batch-input{left:auto; right: 10px; margin-left: 0;}
    .eject_store_goods_storage_copy .batch-last .batch-input::before{margin-left: 20px;}
    .ncsc-table-spec {border: 1px solid #dbdbdb;border-collapse: separate;box-sizing: border-box;width: 100%;border-radius: 5px;}
    .ncsc-table-goods-attr th {border-top: none;position: relative;}
    .ncsc-table-goods-attr td, .ncsc-table-goods-attr th {font-size: 14px;border-left: none;padding: 5px 10px;}
    .ncsc-table-spec th {font-weight: bold;color: #757575;background: none;}
    .ncsc-table-spec th input{font-weight: normal;}
    .ncsc-table-spec td, .ncsc-table-spec th {border-bottom: 1px solid #dbdbdb;border-left: 1px solid #dbdbdb;text-align: left;height: 20px;
        vertical-align: top;padding: 10px;}
    table td, table th {word-break: break-all;}
    .ncsc-table-goods-attr tr:nth-child(2n+1) td {background: #f8f8f8;}
    .ncsc-table-goods-attr td {line-height: 30px;}
    .ncsc-table-goods-attr tbody input[type="text"]{width: 60px;}
    .add-on .icon-renminbi:before{content:'元'; color:#212121;}
    .add-on i{ font-style: normal;font-size: 1em;}

    .ncsc-table-goods-attr td, .ncsc-table-goods-attr th{font-size: 14px; border-left:none; padding: 5px 10px;}
    .ncsc-table-goods-attr td{line-height: 30px;}
    .ncsc-table-goods-attr th{border-top:none; position: relative;}
    .ncsc-table-goods-attr tr:nth-child(2n+1) td{background: #f8f8f8;}
    .ncsc-table-goods-attr tbody input[type="text"]{width: 60px;}

    .batch{display: block; vertical-align: middle; font-weight: normal;}
    .batch .btn-batch{display: inline-block; color:#ff8519; font-size: 12px;}
    .batch .btn-batch:hover{cursor: pointer; text-decoration: underline;}
    .batch .batch-input{background: #000; background-color: rgba(0,0,0,.6); padding: 0 10px 10px; position: absolute; z-index: 1; top: 50px; left: 50%; margin-left:-80px; text-align: left; width: 175px; color:#fff; border-radius:5px;}
    .batch .batch-input::before{content:''; position: absolute; border:5px solid transparent; border-bottom:5px solid #000; border-bottom:5px solid rgba(0,0,0,.6); position: absolute; left: 50%; margin-left: -15px; top: -10px;}
    .batch .batch-input .batch-tit{font-size: 14px; margin: 5px 0; font-weight: bold;}
    .batch .batch-input .close{line-height: 20px; color: #757575; text-decoration: none; background-color: #FFF; text-align: center; display: block; width: 20px; height: 20px; font-size: 16px; text-align: center; border-radius: 100%; border: solid 1px #ddd; top: -8px; right: -8px; position: absolute; z-index: 2; font-family: SimSun;}
    .batch .batch-input .close:hover{border-color:#ff8519; background:#ff8519; color:#fff;}
    .batch .batch-input input{border:none;}
    .batch .batch-input .ncsc-btn{border:none; background: #fff; color:#212121; border-radius:15px;}
    .batch .batch-input .ncsc-btn:hover{border:none; background: #ff8519; color:#fff}
    .batch input[type="checkbox"]{margin-bottom: 0;}
    .max-height{overflow-y: auto;min-height: 150px;overflow-x: hidden;}
    tr.filter th{
      padding-left: 5px;
    }
    .w115{width:115px;}
</style>
<template>
    <div  class="ncsc-table-goods-attr-box" :style="styleObject">
        <table class="ncsc-table-spec ncsc-table-goods-attr" id="spec_table" cellspacing="0" cellpadding="0" >
            <thead>
            <tr class="filter" v-if="filterMode">
              <th v-for="(item,key,idx) in filterHead" :key="key">
                <select @change="changeFilter($event,key,item.value)" v-model="item.value">
                  <option value="" selected="selected">{{key.substr(1)}}</option>
                  <option v-for="(ci,ct) in item.item" :value="ci.key" :selected="ci.checked">{{ci.key}}</option>
                </select>
              </th>
              <th v-for="(item,key,idx) in specTitle" :class="item.width"  :key="key">
                <span class="red" v-if="item.required">*</span>
                <input type="text" :readonly="!item.input" :class="item.inputWidth" :placeholder="item.text" :name="key" v-model="newbarcode" @input="onlyInteage2($event,'newbarcode')" v-if="key=='barcode'" />
                <input type="text" :readonly="!item.input" :class="item.inputWidth" :placeholder="item.text" :name="key" v-model="item.inputValue"  v-else/>
              </th>
            </tr>
            <tr v-if="!filterMode">
                <th v-for="item in goodsAttr.goodsAttrName">{{item}}</th>
                <th v-for="(item,key) in specTitle" :class="item.width">
                    <span class="red" v-if="item.required">*</span>{{item.text}}
                    <div class="batch" v-show="key === 'market_price' && item.input === true"><p class="btn-batch" @click="multiSetMarketPrice = true">[批量修改]</p>
                        <div class="batch-input" v-show="multiSetMarketPrice">
                            <div class="batch-tit">批量设置原价：</div>
                            <a href="javascript:void(0)" @click="multiSetMarketPrice =false" class="close">×</a>
                            <input @keyup="onlyNumberPrice($event,'marketPrice')"  class="stock w100 mr5" type="text" v-model="marketPrice">
                            <a href="javascript:void(0)" class="ncsc-btn"  @click="multiSetMarketPriceSave">设置</a>
                        </div>
                    </div>
                    <div class="batch" v-show="key === 'price' && item.input === true"><p class="btn-batch" @click="multiSetPrice = true">[批量修改]</p>
                        <div class="batch-input" v-show="multiSetPrice">
                            <div class="batch-tit">批量设置售价：</div>
                            <div class="mb5">
                                <label for="b_price_0"><input type="radio" @click="changePriceType()" value="0" id="b_price_0" v-model="multiPriceType" >按价格</label>
                                <label class="ml10" for="b_price_1"><input type="radio" @click="changePriceType()" value="1" id="b_price_1" v-model="multiPriceType" >按折扣</label>
                            </div>
                            <a href="javascript:void(0)" @click="multiSetPrice = false" class="close">×</a>
                            <input v-if="multiPriceType==0" @keyup="onlyNumberPrice($event,'price')" class="price w80 mr5 setPrice" type="text" v-model="price">
                            <input v-else class="price w80 mr5 setPrice" @keyup="onlyDiscount($event,'price')" type="text" v-model="price">
                          <span>{{multiPriceText}}</span>
                            <a href="javascript:void(0)" class="ncsc-btn" @click="multiSetPriceSave">设置</a>
                        </div>
                    </div>
                    <div class="batch" v-show="key === 'stock' && item.input === true"><p class="btn-batch" @click="multiSetStorage = true">[批量修改]</p>
                        <div class="batch-input" v-show="multiSetStorage">
                            <div class="batch-tit">批量设置库存：</div>
                            <a href="javascript:void(0)" @click="multiSetStorage =false" class="close">×</a>
                            <input  class="stock w100 mr5" type="text" maxlength="7" v-model="storage" @keyup="onlyInteage($event,'storage')">
                            <a href="javascript:void(0)" class="ncsc-btn"  @click="multiSetStorageSave">设置</a>
                        </div>
                    </div>
                    <div class="batch" v-show="key === 'barcode' && item.input === true"><p class="btn-batch" @click="multiSetBarcode = true">[批量修改]</p>
                        <div class="batch-input" v-show="multiSetBarcode">
                            <div class="batch-tit">批量设置条形码：</div>
                            <a href="javascript:void(0)" @click="multiSetBarcode =false" class="close">×</a>
                            <input  class="stock w100 mr5" type="text" v-model="barcode" @input="onlyInteage2($event,'barcode')">
                            <a href="javascript:void(0)" class="ncsc-btn"  @click="multiSetBarcodeSave">设置</a>
                        </div>
                    </div>
                    <div class="batch batch-last " v-show="key === 'sku' && item.input === true"><p class="btn-batch" @click="multiSetStorageAlarm = true">[批量修改]</p>
                        <div class="batch-input" v-show="multiSetStorageAlarm">
                            <div class="batch-tit">批量设置库存预警值</div>
                            <a href="javascript:void(0)" class="close" @click="multiSetStorageAlarm = false">×</a>
                            <input  type="text" class="stock w100 mr5" maxlength="3" v-model="storageAlarm" @keyup="onlyInteage($event,'storageAlarm')">
                            <a href="javascript:void(0)" class="ncsc-btn" @click="multiSetStorageAlarmSave">设置</a>
                        </div>
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(item,key) in goodsAttr.spValue" :key="key" v-if="item.is_show">
                    <td v-for="(item2,key2) in item.sp_value" :key="key2">{{item2}}</td>
                    <template v-for="(item3,key3) in specTitle">
                        <td v-if="!item3.input"><span>{{item[key3]}}</span></td>
                        <template v-else>
                            <td v-if="key3 === 'market_price'"><input class="input-add-on text price" type="text" @keyup="onlyNumberPrice($event,'goodsAttr.spValue['+key+'].market_price')"  v-model="item.market_price"><em class="add-on"><i class="icon-renminbi"></i></em></td>
                            <td v-if="key3 === 'price'"><input class="input-add-on text price" type="text" @keyup="onlyNumberPrice($event,'goodsAttr.spValue['+key+'].price')"  v-model="item.price"><em class="add-on"><i class="icon-renminbi"></i></em></td>
                            <td v-else-if="key3 === 'stock'"><input class="text stock" type="text" maxlength="7" v-model="item.stock" @keyup="onlyInteage($event,'goodsAttr.spValue['+key+'].stock')"></td>
                            <td v-else-if="key3 === 'barcode'"><input class="text stock" type="text" v-model="item.barcode"  @input="onlyInteage2($event,'goodsAttr.spValue['+key+'].barcode')"></td>
                            <td v-else-if="key3 === 'sku'"><input class="text sku" type="text" maxlength="3"  v-model="item.sku" @keyup="onlyInteage($event,'goodsAttr.spValue['+key+'].sku')"></td>
                        </template>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  import {storeGoodsOnline} from 'api';
  import util from 'lib/utils/util';
  import mixin from 'component/main/mixin';
    export default {
        name: "qm-goods-sku"
      ,
      mixins:[mixin],
      props:{
        goodsAttr:{
          type:Object,
          default:function () {
            return {
              goodsAttr:[],
              goodsAttrName:[],
              spValue:[]
            }
          }
        },
        commonId:{},
        goodsName:{},
        specTitle:{
          type:Object,
          default:function () {
            return {
              market_price:{
                input:false,
                text:'原价',
                required:false,
                width:'w90',
                inputWidth:'w80',
                inputValue:''
              },
              price:{
                input:true,
                text:'售价',
                required:true,
                width:'w110',
                inputWidth:'w80',
                inputValue:''
              },
              stock:{
                input:true,
                text:'库存',
                required:true,
                width:'w80',
                inputWidth:'w50',
                inputValue:''
              },
              barcode:{
                input:false,
                text:'条形码',
                required:false,
                width:'w70',
                inputWidth:'w70',
                inputValue:''
              },
              sku:{
                input:true,
                text:'库存预警',
                required:false,
                width:'w60',
                inputWidth:'w80',
                inputValue:''
              }
            }
          }
        },
        goodsAttrChecked:{
          type:Object,
          default:function () {
            return {};
          }
        },
        goods:{
          type:Object,
          default:function () {
            return {
              goods_barcode:'',
              goods_marketprice:'',
              goods_price:'',
              goods_storage_alarm:''
            }
          }
        },
        originGoodsAttrName:{
          type:Array,
          default:function () {
            return [];
          }
        },
        originSpValue:{
          type:Array,
          default:function () {
            return [];
          }
        },
        styleObject:{
          type:Object,
          default:function () {
            return {
              //maxHeight:(window.innerHeight-250)+'px'
            }
          }
        },
        filterMode:{
          type:Boolean,
          default:function () {
            return false;
          }
        },
        filterChange:{
          type:Boolean,
          default:function () {
            return false;
          }
        }
      },
      data(){
        return {
          filterSelect:{},
          filterHead:{
          },//筛选模式下表头
          marketPrice:'',
          price:'',
          storage:'',
          barcode:'',
          storageAlarm:'',
          multiPriceType:0,
          multiSetPrice:false,
          multiSetStorage:false,
          multiSetStorageAlarm:false,
          multiSetMarketPrice:false,
          multiSetBarcode:false,
          localGoodsAttrName:[],
          localSpValue:[],
          newbarcode:'',
        }
      },
      computed: {
        multiPriceText:function () {
          return this.multiPriceType == 0 ? '元':'%';
        }
      },
      methods:{
        changeFilter(e,key,val){
         /* let tempSelect = _.clone(this.filterSelect);
          tempSelect[{key}] = val

          this.filterSelect = tempSelect;*/
          let tempSelect = _.clone(this.filterSelect);
          tempSelect[key] = val;
          // this.$set(tempSelect,key,val);
          this.filterSelect = {};
          Object.assign(this.filterSelect,tempSelect);
        },
        multiSetPriceSave(){
          if(this.multiPriceType == 0) {//批量设置价格
            if(this.price === '') {
              util.msg('请输入售价');
              return;
            }
            let price = parseFloat(this.price);
            if(price >= 0) {
              price = price.toFixed(2);
              for (let val of this.goodsAttr.spValue) {
                val['price'] = price;
              }
              this.multiSetPrice = false;
              this.price = '';
            }
          }else{
            if(this.price === '') {
              util.msg('请输入折扣');
              return;
            }
            let discount = parseInt(this.price);
            if(discount < 0 || discount > 100){
              util.msg('折扣只能输入0-100的整数');
              return;
            }
              for (let val of this.goodsAttr.spValue) {
                val['price'] = util.number_format((val['market_price']*100*discount/10000),2);
              }
              this.multiSetPrice = false;
              this.price = '';
          }
        },
        changePriceType(){
          this.price = '';
        },
        multiSetStorageSave(){
          if(this.storage === '') {
            util.msg('请输入库存');
            return;
          }
          let storage = parseInt(this.storage);
          if(storage >= 0) {
            for (let val of this.goodsAttr.spValue) {
              val['stock'] = storage;
            }
            this.multiSetStorage = false;
            this.storage = '';
          }
        },
        multiSetStorageAlarmSave(){
          if(this.storageAlarm === '') {
            util.msg('请输入库存预警');
            return;
          }
          let storageAlarm = parseInt(this.storageAlarm);
          if(storageAlarm >= 0) {
            for (let val of this.goodsAttr.spValue) {
              val['sku'] = storageAlarm;
            }
            this.multiSetStorageAlarm = false;
            this.storageAlarm = '';
          }
        },
        multiSetMarketPriceSave() {
          if(this.marketPrice === '') {
            util.msg('请输入原价');
            return;
          }
          let price = parseFloat(this.marketPrice);
          if(price >= 0) {
            price = price.toFixed(2);
            for (let val of this.goodsAttr.spValue) {
              val['market_price'] = price;
            }
            this.multiSetMarketPrice = false;
            this.marketPrice = '';
          }
        },
        multiSetBarcodeSave() {
          if(this.barcode === '') {
            util.msg('请输入条形码');
            return;
          }
          if(this.barcode) {
            for (let val of this.goodsAttr.spValue) {
              val['barcode'] = this.barcode;
            }
            this.multiSetBarcode = false;
            this.barcode = '';
          }
        },
        doExchange(arr, depth,results,result) {
          for (let i = 0; i < arr[depth].length; i++) {
            result[depth] = arr[depth][i]
            if (depth != arr.length - 1) {
              this.doExchange(arr, depth + 1,results,result)
            } else {
              results.push(result.slice(0))
            }
          }
        },
        getSpecGroup() {
          let result = [],results = [],arr = [],spValue = [];
          for (let item of this.goodsAttr.goodsAttrName) {
            arr.push(this.goodsAttrChecked[item]);
          }
          this.doExchange(arr,0,results,result);
          for (let item of results) {
            let obj = {
              sp_value:item,
              barcode:this.goods.goods_barcode,
              goods_id:0,
              market_price:this.goods.goods_marketprice,
              price:this.goods.goods_price,
              stock:0,
              sku:this.goods.goods_storage_alarm,
              is_show:true,
            };
            spValue.push(obj);
          }
          return spValue;
        },
        compareAttr(goodsAttrChecked) {
          let spValue;
          if(_.isEqual(goodsAttrChecked,this.goodsAttr.goodsAttr)) {
            //this.goodsAttr.goodsAttrName = this.originGoodsAttrName;
            spValue = this.originSpValue;
          }else if(JSON.stringify(this.goodsAttr.goodsAttrName) == JSON.stringify(this.localGoodsAttrName)){
            spValue = this.getSpecGroup();
            for (let index in spValue) {
              for (let item2 of this.localSpValue) {
                if(JSON.stringify(spValue[index].sp_value) === JSON.stringify(item2.sp_value)) {
                  spValue[index] = item2;
                  break;
                }
              }
            }
          }else if(JSON.stringify(this.goodsAttr.goodsAttrName) == JSON.stringify(this.originGoodsAttrName)){
            spValue = this.getSpecGroup();
            for (let index in spValue) {
              for (let item2 of this.originSpValue) {
                if(JSON.stringify(spValue[index].sp_value) === JSON.stringify(item2.sp_value)) {
                  spValue[index] = item2;
                  break;
                }
              }
            }
          }else{
            spValue = this.getSpecGroup();
          }
          //直接赋值v-model不生效 改成$set赋值
          this.goodsAttr.spValue.splice(spValue.length);
          for (let index in spValue) {
            this.$set(this.goodsAttr.spValue,index,spValue[index]);
          }
          console.log(this.goodsAttr.spValue,'this.goodsAttr.spValue')
          //if(this._events.hasOwnProperty('goodsChange')){
              this.$emit('goodsChange');
          //}
          this.localGoodsAttrName = this.goodsAttr.goodsAttrName;
          this.localSpValue = this.goodsAttr.spValue;
        },
        isMalposition() {
          if(!_.isObject(this.goodsAttrChecked) || !_.isObject(this.goodsAttr.goodsAttr)) {
            return;
          }
          if(_.isEqual(Object.keys(this.goodsAttrChecked).sort(),Object.keys(this.goodsAttr.goodsAttr).sort()) && JSON.stringify(this.goodsAttr.goodsAttrName) != JSON.stringify(this.originGoodsAttrName)) {//属性和属性值错位
            let positions = [],spValue=[];
            for (let item of this.goodsAttr.goodsAttrName) {
              positions.push(this.originGoodsAttrName.indexOf(item));
            }
            for(let item of this.originSpValue) {
              let sp_value = [];
              for (let item2 of positions) {
                sp_value.push(item.sp_value[item2]);
              }
              item.sp_value = sp_value;
              spValue.push(item);
            }
            //直接赋值v-model不生效 改成$set赋值
            this.goodsAttr.spValue.splice(spValue.length);
            for (let index in spValue) {
              this.$set(this.goodsAttr.spValue,index,spValue[index]);
            }
            this.$emit('update:originGoodsAttrName',this.goodsAttr.goodsAttrName)
          }
        },
        resetFilterHead(){
          let tmpFilterHead = {}
          if(Array.isArray(this.goodsAttr.goodsAttrName) && this.goodsAttr.goodsAttrName.length > 0){
            this.goodsAttr.goodsAttrName.forEach(e => {
              let tmpItem = []
              if(this.goodsAttrChecked[e] && this.goodsAttrChecked[e].length > 0){
                this.goodsAttrChecked[e].forEach((ai,ak) => {
                  tmpItem.push({key:ai,checked:""})
                })
              }
              Object.assign(tmpFilterHead,{ ['@'+e] : {item:tmpItem,value:""} })
            })
          }
          this.filterHead = tmpFilterHead
        },
        resetSp(){
          for (let val of this.goodsAttr.spValue) {
            val['is_show'] = true
          }
        },
        resetSelect(){
          this.filterSelect = []
        },
        resetFilter(){
          Object.keys(this.filterHead).forEach((item,k) => {
            this.filterHead[item].value = ''
          })
        },
        rangeFilter(){
          this.resetSp()
          Object.keys(this.filterSelect).forEach(fv =>{
            if(!Object.keys(this.filterHead).includes(fv)){
              this.filterSelect[fv] = ''
            }
          })
          Object.keys(this.filterHead).forEach((item,k) => {
            let e = this.filterSelect[item];
            if(e !== undefined){
              for (let val of this.goodsAttr.spValue) {
                if (Array.isArray(val.sp_value) && val.sp_value.length > 0 && val['is_show'] == true) {
                  if ('' == e || val.sp_value[k] == e) {
                    val['is_show'] = true;
                  } else {
                    val['is_show'] = false;
                  }
                }
              }
            }
          })
        }
      },
      watch:{
        filterChange:function(val) {
          if(true == val){
            let has = false;
            if(this.specTitle.market_price.inputValue !== '') {
              has = true;
              let price = parseFloat(this.specTitle.market_price.inputValue);
              if(price >= 0) {
                price = price.toFixed(2);
                for (let val of this.goodsAttr.spValue) {
                  if(val['is_show']){
                    val['market_price'] = price;
                  }
                }
              }
              this.specTitle.market_price.inputValue = ''
            }
            if(this.specTitle.price.inputValue !== '') {
              has = true;
              let price = parseFloat(this.specTitle.price.inputValue);
              if (price >= 0) {
                price = price.toFixed(2);
                for (let val of this.goodsAttr.spValue) {
                  if(val['is_show']) {
                    val['price'] = price;
                  }
                }
              }
              this.specTitle.price.inputValue = ''
            }
            if(this.specTitle.stock.inputValue !== '') {
              has = true;
              let storage = parseInt(this.specTitle.stock.inputValue);
              if(storage >= 0) {
                for (let val of this.goodsAttr.spValue) {
                  if(val['is_show']) {
                    val['stock'] = storage;
                  }
                }
              }
              this.specTitle.stock.inputValue = ''
            }
            if(this.newbarcode!='') {
              has = true;
              let barcode1= this.newbarcode.replace(/[^0-9,]*/g,"");
              for (let val of this.goodsAttr.spValue) {
                if(val['is_show']) {
                  val['barcode'] = barcode1;
                }
              }
              this.newbarcode = ''
            }
            if(this.specTitle.sku.inputValue !== '') {
              has = true;
              let storageAlarm = parseInt(this.specTitle.sku.inputValue);
              if (storageAlarm >= 0) {
                for (let val of this.goodsAttr.spValue) {
                  if(val['is_show']) {
                    val['sku'] = storageAlarm;
                  }
                }
              }
              this.specTitle.sku.inputValue = ''
            }
            this.$emit('update:filterChange', false);
            if(!has){
              layer.msg('未填写内容无法进行填充');
            }
          }
        },
        filterSelect: {
          handler: function () {
            this.rangeFilter()
          },
          deep: true
        },
        goodsAttrChecked:function (val) {
          let spValue;
          this.resetFilterHead()
          if(!_.isEmpty(val)) {
            this.isMalposition()
            this.compareAttr(val)
          }else{
            // this.goodsAttr.goodsAttrName.splice(0,this.goodsAttr.goodsAttrName.length);
            // this.goodsAttr.spValue.splice(0,this.goodsAttr.spValue.length);
            this.goodsAttr.goodsAttrName = [];
            this.goodsAttr.spValue = [];
          }
          this.filterSelect = {}
          Object.assign(this.filterSelect,{})
          /*   Object.keys(this.filterSelect).forEach(fv =>{
            if(this.filterSelect[fv] != ''){
              Object.keys(val).forEach((vv,vi) => {
                if(fv == vv && val[vv].length == 1){
                  this.filterSelect[fv] = val[vv][0]
                }
              })
            }

          })*/
        },
        filterMode(){
          this.resetSelect()
          this.resetSp()
          this.resetFilter()
        }
      },
      mounted() {
        this.localGoodsAttrName = this.goodsAttr.goodsAttrName;
        this.localSpValue = this.goodsAttr.spValue;
        this.resetFilterHead()
        let spValue;
        if(!_.isEmpty(this.goodsAttrChecked)) {
          this.isMalposition();
          this.compareAttr(this.goodsAttrChecked)
        }
      }
    }
</script>
