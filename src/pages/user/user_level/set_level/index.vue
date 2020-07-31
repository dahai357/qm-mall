<style scoped>
  .qm-store-class-base{
    padding: 10px 0 10px 0;
  }
  .ncsc-btn {
    color: #212121;
    border: solid 1px #ddd;
  }
.wrap{
  font-size: 14px;
  margin-top: 20px;
}
  caption, th {
    text-align: left;
    font: 14px/1.5 "Microsoft Yahei", "PingFang SC", "ST Heiti", SimHei, sans-serif, "Helvetica Neue", Tahoma;
  }
  .no-promotion {
    color: #757575;
    padding: 50px 0;
    line-height: 20px;
    text-align: center;
  }
  .ui-sortable .ui-state-disabled {
    opacity: 1;
    filter: Alpha(Opacity=100);
  }
  .ui-state-disabled {
    cursor: default !important;
  }

  .bottom .submit:hover {
    text-decoration: none;
    background: #ef7101;
    cursor: pointer;
  }
  label {
    display: inline-block;
    vertical-align: middle;
  }
  .bd-line td {
    border-bottom: solid 1px #eee;
  }
  form label.error i {
    margin: 0 5px 3px;
  }

  .ncsc-btn.disabled, .ncsc-btn-orange.disabled {
    color: #adadad;
    border-color: #eee;
    background: none;
  }
  .disabled.btn-multiple-upload-img .multiple-upload-img{
    z-index: -2;
  }
  .ncsc-btn-orange-rim {
    border-color: #ff8519;
    color: #ff8519;
  }
  .ncsc-btn-orange-rim:hover {
    background: #ff8519;
    color: #fff;
  }

  .ncsc-form-default dl {
    line-height: 20px;
    display: table;
    width: 100%;
  }


  .ncsc-form-default dt {
    font-size: 14px;
    line-height: 30px;
    vertical-align: top;
    letter-spacing: normal;
    word-spacing: normal;
    text-align: right;
    display: table-cell;
    width: 19%;
    padding: 15px 1% 15px 0;
    margin: 0;
  }

  .ncsc-form-goods dl dt {
    width: 15.5%;
  }

  .ncsc-form-default dd {
    font-size: 14px;
    line-height: 30px;
    vertical-align: top;
    letter-spacing: normal;
    word-spacing: normal;
    display: table-cell;
    width: 79%;
    padding: 15px 0;
  }

  .ncsc-form-goods dl dd {
    width: 82.5%;
    padding: 15px 0 15px 1%;
  }

  .ncsc-default-table {
    width: 100%;
    border-collapse: collapse;
    line-height: 1.5;
  }


  .ncsc-default-table th, .ncsc-default-table td ,td{
    vertical-align: top;
    font-size: 14px;
    height: 20px;
  }

  .ncsc-default-table th {
    background: #f9f9f9;
    padding: 10px;
    text-align: left;
  }


  .ncsc-default-table td,td {
    border-bottom: 1px solid #eee;
    padding: 20px 10px;
  }

  .bd-line td {
    border-bottom: solid 1px #eee;
  }
  .ghost{
    border: dotted 1px #ff8519;
    box-shadow: 2px 2px 2px rgba(153, 153, 153, 0.25);
    filter: alpha(opacity=75);
    -moz-opacity: 0.75;
    opacity: .75;
    cursor: ns-resize;
    background-color: #ffeddd;
  }
  .gray td{
    background: #f5f5f5;
    color: #757575;
  }
   tr a:hover {
    color: #ff8519;
  }
  .ncsc-btn:hover {
    text-decoration: none;
    border-color: #ff8519;
  }
  .set-color{
    width:100px;
    height:40px;
    border:none;
    padding-left: 8px;
    border: solid 1px #ddd;
    cursor: pointer;
  }

  #color-choose{
    width:150px;
    border:1px solid #ddd;
    padding:10px 10px 5px 5px;
    margin-top: 5px;
    position: absolute;
    background-color: #fff;
  }
  #color-choose div{
    width:20px;
    height: 20px;
    display: inline-block;
    margin-left: 6px;
    cursor: pointer;
  }
  .set-title{
    padding-left: 50px;
  }
  .ml22{
    margin-left: 22px;
  }
</style>
<template>
  <div class="qm-store-class-base" @click="hideColorTip($event)">
    <div class="wrap">
      <div class="ncsc-form-default">
        <form id="add_form" >
          <div class="set-title">基本信息</div>
          <dl>
            <dt>VIP等级：</dt>
            <dd>VIP{{subData.level_num}}</dd>
          </dl>
          <dl>
            <dt><i class="required">*</i>名称：</dt>
            <dd>
              <p>
                <input type="text" maxlength="6" class="w200 text" placeholder="最多6个字" v-model.trim="subData.level_name">
                <span v-show="validData.level_name"><label class="error"><i class="fa fa-exclamation-circle"></i>请设置等级名称</label></span>
              </p>

            </dd>
          </dl>
          <dl>
            <dt><i class="required">*</i>背景设置：</dt>
            <dd>
              <div style="position: relative;display: inline-block;" class="w100" idx="1" @click="hideColorTip($event)">
                <input :style="getCssStyle(subData.level_color)" readonly class="set-color" :placeholder="!subData.level_color?'请设置背景色':''" @click="chooseColor()">
                <div id="color-choose" v-show="show_color">
                  <div :style="getCssStyle(citem)" v-for="(citem,cindex) in colorList" @click="getColor(citem,cindex)"></div>
                </div>
              </div>
              <span v-show="validData.level_color"><label class="error"><i class="fa fa-exclamation-circle"></i>请设置背景色</label></span>
              <div class="c-gray">设置用户背景色，便于订单列表页快速区分查看</div>
            </dd>
          </dl>
          <div class="set-title">权益</div>
          <dl>
            <dt>权益：</dt>
            <dd>
              <p><label><input type="checkbox" value="1" v-model="subData.free_shipping"/>会员包邮</label></p>
              <p><label><input type="checkbox" value="1" v-model="subData.is_vip_discount"/>会员专享折扣</label></p>
              <p v-show="subData.is_vip_discount == 1">
                <input @keyup="calPrice" placeholder="仅支持输入1-100的正整数" type="text" maxlength="3" class="w200 text" v-model="subData.vip_discount">&nbsp;&nbsp;%
                <label><input type="checkbox" name="discount_coupon" value="1" v-model="subData.discount_coupon"/>折扣优惠与优惠券同享</label>
              </p>
              <p v-show="validData.vip_discount"><label class="error"><i class="fa fa-exclamation-circle"></i>{{vip_discount_error}}</label></p>
              <p class="c-orange" v-show="subData.discount_coupon == 1">当前设置该等级会员在享受会员折扣的基础上仍支持使用优惠券</p>
            </dd>
          </dl>
    <div class="bottom">
      <label class="submit-border"><input id="submit_button" @click="submit()" type="button"  value="保存" class="submit"></label>
    </div>
          <div class="c-red mt30 ml50">
            <p class="fb">注意事项</p>
            <div class="ml35">
              <p>1：会员折扣是在售价基础上给予会员额外的专属折扣</p>
              <p>2：请注意平衡活动价/售价/会员价三者之间的价格梯度，会员价一旦低于活动价，则会出现参与分销活动的会员选择按照会员价购买</p>
              <p class="ml22">为保证商家的利益，平台默认此单不计入分销员推广收益。请谨慎设置！</p>
            </div>
          </div>
    </form>
  </div>
  </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  import QmDialogImg from "component/qm-dialog-img/index";
  import storage from 'lib/utils/storage';
  import util from 'lib/utils/util';
  export default {
    name: "set_level",
    data() {
      return {
        subData:{
          free_shipping:0,
          vip_discount:'',
          is_vip_discount:0,
          discount_coupon:0,
          level_name:'',
          level_color:'',
          level_color_id:'',
          level_num:'',
        },
        validData:{
          vip_discount:false,
          level_name:false,
          level_color:false,
        },
        vip_discount_error:'',
        colorList:[],
        show_color:false,
      }
    },
    computed:{
      ...mapGetters({
      }),
      dragOptions() {
        return {
          animation: 200,
          disabled: false,
        };
      }
    },
    components:{
      QmDialogImg,
      storage
    },
    methods: {
      ...mapActions({
        'getLevelColor':'getLevelColor',
        'setLevel':'setLevel',
        'getLevelInfo':'getLevelInfo'
      }),
      submit() {
        var validRes = true;
        if(this.subData.is_vip_discount == 1){
          if(!this.subData.vip_discount){
            this.validData.vip_discount = true;
            this.vip_discount_error = '请设置会员可享受的折扣';
          }else if(!this.checkRate(this.subData.vip_discount) || this.subData.vip_discount > 100 || this.subData.vip_discount < 1){
            this.validData.vip_discount = true;
            this.vip_discount_error = '折扣值仅支持输入1-100的正整数';
          }
        }
        if(!this.subData.level_name){
          this.validData.level_name = true;
        }
        if(!this.subData.level_color){
          this.validData.level_color = true;
        }
        Object.values(this.validData).forEach((item, i) => {
          if (item) {
            validRes = false;
          }
        })
        if(validRes){
          if(this.subData.discount_coupon){
            this.subData.discount_coupon = 1;
          }
          if(this.subData.free_shipping){
            this.subData.free_shipping = 1;
          }
          if(!this.subData.is_vip_discount){
            this.subData.vip_discount = 0;
          }
          this.setLevel(this.subData).then((res) => {
            if(res.resultCode == 1){
              util.msg('编辑成功');
              this.$router.push('/user/user_level/index/');
            }else{
              util.msg(res.shortMessage);
            }
          })
        }
      },
      getData(){
        this.getLevelColor().then((res) => {
          if(res.resultCode == 1){
            this.colorList = res.responseContent.list;
          }
        })
        this.getLevelInfo({'level_num':this.subData.level_num}).then((res) => {
          if(res.resultCode == 1){
            var data = res.responseContent.list;
            var newSubData = _.clone(this.subData);
            newSubData.discount_coupon = data['discount_coupon'];
            newSubData.free_shipping = data['free_shipping'];
            newSubData.level_color_id = data['level_color'];
            newSubData.level_color = data['level_color_name'];
            newSubData.level_name = data['level_name'];
            newSubData.vip_discount = data['vip_discount'];
            if(newSubData.vip_discount > 0){
              newSubData.is_vip_discount = true;
            }
            this.subData = newSubData;
          }
        })
      },
      calPrice(e) {
        this.subData.vip_discount = e.target.value.replace(/\D/g,'');
        var value = parseInt('val'+this.subData.vip_discount);
        if(value){
          this.subData.vip_discount = value;
        }
        if(!this.subData.vip_discount){
          this.validData.vip_discount = true;
          this.vip_discount_error = '请设置会员可享受的折扣';
        }else if(this.subData.vip_discount > 100 || this.subData.vip_discount < 1){
          this.vip_discount_error ='折扣值仅支持输入1-100的正整数';
          this.validData.vip_discount = true;
        }else{
          this.validData.vip_discount = false;
        }
      },
      getCssStyle(color){
        return 'background-color:'+color;
      },
      chooseColor(){
        this.show_color = !this.show_color;
      },
      getColor(color,id){
        this.subData.level_color = color;
        this.subData.level_color_id = id;
        this.show_color = false;
      },
      checkRate(val){
        var re = /^[1-9]+[0-9]*]*$/;
        if (re.test(val))
        {
          return true;
        }
        return false;
      },
      hideColorTip(e){
        e.stopPropagation();
        var el = e.currentTarget;
        var idx = $(el).attr('idx');
        if(idx != 1){
          this.show_color = false;
        }
      }
    },
    watch:{
        subData:{
          handler: function () {
            if(this.subData.is_vip_discount == 0){
              this.subData.vip_discount = '';
              this.subData.discount_coupon = 0;
              this.validData.vip_discount = false;
            }
            if(this.subData.level_name){
              this.validData.level_name = false;
            }
            if(this.subData.level_color){
              this.validData.level_color = false;
            }
          },
          deep: true
        }
    },
    mounted () {
      this.subData.level_num = this.$route.params.level_num;
      this.getData();
    }
  }
</script>
