<style scoped src="../../assets/seller/css/style2018.css"></style>
<style scoped src="./auth.css"></style>
<!--<style scoped>
  .form-custom-checkbox .custom-checkbox-frame::before { content: ''; display: block; width: 20px; height: 20px; border: 1px solid #757575; -webkit-box-sizing: border-box; box-sizing: border-box; border-radius: 3px; }
  .form-custom-checkbox .custom-checkbox-frame::after { content: ''; position: absolute; width: 26px; height: 16px; background: url("~@/assets/images/sprite.png") -150px -30px no-repeat; left: -2px; top: 0; display: none; }
</style>-->
<template>
  <div class="wrap">
    <div class="header">
      <div class="header-in">
        <div class="header-c1">
          <h1 class="logo"><a href=""><img src="~@/assets/seller/images/seller/style2018/logo.png" alt="身边店"></a></h1>
        </div>
         <div class="header-c2">
           已有账号？<a @click="doRouter('/login')" class="btn-login">请登录</a>
         </div>
      </div>
    </div>
    <div class="content">
      <div class="pn pn-register">
        <div class="pn-in">
          <ul class="list-flow list-flow-reg">
            <li class="item1 first">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num">1</p>
              <p class="txt">填写店铺登录信息</p>
            </li>
            <li class="item2">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num">2</p>
              <p class="txt">填写店铺资料</p>

            </li>
            <li class="item3">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num">3</p>
              <p class="txt">申请店铺分类</p>
            </li>
            <li class="item4 last">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num"><i class="ico-finish"></i></p>
              <p class="txt">注册完成</p>
            </li>
          </ul>
          <form id="form_register">
            <div class="form-list">
              <div class="form-item">
                <div class="form-box form-icon w500">
                  <i class="ico-phone"></i>
                  <input idx="1"  @blur="checkFhone()" name="telphone" autocomplete="off" id="telphone" type="text" placeholder="输入手机号"  value="" v-model.trim="subData.telphone">
                </div>
                <p class="error-msg phone-error" style="display:block" v-show="validData.telphone">联系方式不能为空</p>
                <p class="form-tip">用于APP与商户后台登录<br>需填写法人代表手机号或法人代表指定手机号</p>
              </div>
              <div class="form-item form-password">
                <div class="form-box form-icon w500">
                  <i class="ico-password"></i>
                  <input @blur="checkPassword()" onkeyup="this.value=this.value.replace(/[^a-zA-Z0-9]/g,'');" maxlength="16" id="password" name="password" type="password" placeholder="请输入密码" v-model.trim="subData.password">
                  <p class="btn-visible"@click="inputSwitch($event)"></p>
                </div>
                <p idx="1" class="error-msg password-error" style="display:block" v-show="validData.password">密码不能为空</p>
                <p class="form-tip">密码长度为6~16个数字或字母组合</p>
              </div>
              <div id="first-register">
              <div class="form-item">
                <div class="form-box form-icon w500">
                  <i class="ico-verification"></i>
                  <input name="captcha" id="captcha" maxlength="4" type="text" placeholder="图形验证码"  autocomplete="off" v-model.trim="subData.captcha">
                </div>
                <p class="error-msg error-captcha" style="display:block" v-show="validData.captcha">验证码不能为空</p>
                <div class="verification-img">
                  <img id="codeimage" @click="change_seccode();" src="">
                </div>
              </div>
              <div class="form-item form-phone-code">
                <div class="form-box form-icon w500">
                  <i class="ico-phone-code"></i>
                  <input name="valid_code" type="text" placeholder="输入手机验证码"  autocomplete="off" v-model.trim="subData.valid_code">
                  <p class="btn-get-code huoqu" @click="getValidCode()">获取验证码</p>
                  <input type="hidden" id="second" value="60"/>
                </div>
                <p class="error-msg error-validcode" style="display:block"></p>
                <p class="form-tip">输入手机短信验证码</p>
              </div>
              </div>
              <div class="form-item">
                <div class="form-custom-checkbox form-custom-checkbox-s" :class="subData.mall_agreement1?'checked':''">
                  <div class="custom-checkbox-frame">
                    <input id="mall_agreement1" type="checkbox" value="1" name="mall_agreement1" class="custom-checkbox" v-model.trim="subData.mall_agreement1">
                  </div>
                  <div class="custom-checkbox-txt">
                    请您认真阅览后并勾选同意 <a href="//www.shenbd.com/service/storeagreement.html" target="_blank" class="btn-agreement">《平台服务协议》</a>                          </div>
                </div>
                <p class="error-msg" style="display:block" v-show="validData.mall_agreement1"><label for="mall_agreement1">请先阅读并同意《平台服务协议》</label></p>
              </div>
         <!--     <div class="form-item">
                <div class="form-custom-checkbox form-custom-checkbox-s" :class="subData.mall_agreement2?'checked':''">
                  <div class="custom-checkbox-frame">
                    <input id="mall_agreement2" type="checkbox" value="1" name="mall_agreement2" class="custom-checkbox" v-model.trim="subData.mall_agreement2">
                  </div>
                  <div class="custom-checkbox-txt">
                    请您认真阅览后并勾选同意 <a href="//www.shenbd.com/service/storeagreementbytrial.html" target="_blank" class="btn-agreement">《平台试用期服务协议》</a>
                  </div>
                </div>
                <p class="error-msg" style="display:block" v-show="validData.mall_agreement2"><label for="mall_agreement2">请先阅读并同意《平台试用期服务协议》</label></p>
              </div>-->
              <div class="form-item">
                <input type="button" @click="submiData()" class="comm-btn" id="submitBtn" value="下一步" style="border: none;">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="dialog-register">
      <div class="dialog-in">
        <div class="dialog-con">
          <div class="dialog-hd">
            <div class="dialog-tit">注册协议</div>
            <div class="dialog-close disabled">&times;</div>
          </div>
          <div class="dialog-bd">
            <p><b>【审慎阅读】</b>您在申请注册流程中点击同意前，应当认真阅读以下协议。<span class="tdu">请您务必审慎阅读、充分理解协议中相关条款内容，其中包括：</span></p>
            <p>1、<b>经营分类添加个数要求：签约分类<span class="c-orange">不少于一个</span>，普通分类数量不限。</b></p>
            <p>2、<b><span class="c-orange">签约分类：</span> 由商家自主申请的在协议签订区域范围内享有独家推荐权的付费（签约技术服务费）销售分类。（部分签约分类需在提交国家规定的相关资质后方可申请）。</b></p>
            <p>3、<b>普通分类： 由您自主申请的除签约分类之外的免费（签约技术服务费）销售分类。（部分普通分类需在提交国家规定的相关资质后方可申请）。</b></p>
            <p>如您对协议有任何疑问，可向平台客服咨询，热线电话：13705953251。</p>
            <p><b>【特别提示】</b>当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分阅读、理解并接受协议的全部内容。</p>
            <p><b class="tdu">阅读协议的过程中，如果您不同意相关协议或其中任何条款约定，您应立即停止注册程序。</b></p>
            <p><a href="//www.shenbd.com/service/storeagreement.html" target="_blank" class="c-orange">《平台服务协议》</a></p>
           <!-- <p><a href="//www.shenbd.com/service/storeagreementbytrial.html" target="_blank" class="c-orange">《平台试用期服务协议》</a></p>-->
            <p><a @click="closeRegister($event)" class="btn-agree disabled">同意协议<span class="hint">（<span class="second"></span>秒后可点击）</span></a></p>
          </div>
        </div>
      </div>
    </div>
    <div id="footer">
      <p>
        <a target="_blank" href="http://www.shenbd.com/service/storeagreement.html">平台服务协议</a>
        |  <a target="_blank" href="http://www.shenbd.com/service/privacy.html">隐私政策</a>
      </p>
      © 2019福州千盟经贸有限公司 版权所有 <a target="_blank" href="http://beian.miit.gov.cn/?spm=5176.12825654.7y9jhqsfz.110.e9392c4aiY4UJy">闽ICP备17018652号-1</a>
    </div>
  </div>
</template>
<script>
  import util from 'lib/utils/util';
  import env from "../../config/url";
  import {mapActions,mapGetters} from 'vuex';
  export default {
    name: "auth-register",
    data(){
      return {
        store_register_id:'',//第一步已注册ID
        store_register_tel:'',//第一步注册好的手机号（用于注册到第二步返回第一步注册的）
        smsFlag:true,//发送验证码判断
        validData:{
          password:false,//密码输入框校验
          mall_agreement1:false,
          mall_agreement2:false,
          telphone:false,//电话输入框
          captcha:false,//图形验证码
        },
        subData:{
          password:'',//密码输入框校验
          mall_agreement1:'',
          mall_agreement2:'',
          telphone:'',//电话输入框
          captcha:'',//图形验证码
          valid_code:'',
        },
        cleardaojishi:'',
      }
    },
    computed:{
      ...mapGetters({
        isLogin:'getIsLogin'
      }),
    },
    methods:{
      ...mapActions({
        getRegisterStepOne:'getRegisterStepOne',
        checkCode:'checkCode',
        sendSms:'sendSms',//获取验证码
        registerStepOne:'registerStepOne',
        makeCode:'makeCode',
      }),
      submiData(){
        var validRes = true
       this.checkPassword();
        this.checkFhone();
        if(this.subData.mall_agreement1 == 0){
          this.validData.mall_agreement1 = true
        }
       /* if(this.subData.mall_agreement2 == 0){
          this.validData.mall_agreement2 = true
        }*/
        if(this.store_register_id == '' || this.store_register_id == null){
          //第一步注册已提交返回不需要验证
          if(this.subData.captcha == 0){
            this.validData.captcha = true;
            this.$nextTick(()=>{
              $('.error-captcha').text('验证码不能为空');
            });
          }
        }
        Object.values(this.validData).forEach((item,i) => {
          if(item){
            validRes = false;
            this.change_seccode();
          }
        })
        if(validRes && (this.store_register_id == '' || this.store_register_id == null || this.store_register_id==undefined)){
          //第一步注册未提交验证码验证
          //验证码校验
          this.checkCode({captcha:this.subData.captcha}).then((res)=>{
            if(res.resultCode !== 1) {
              this.validData.captcha = true;
              this.$nextTick(()=>{
                $('.error-captcha').text('验证码错误');
              });
              this.change_seccode();
            }else{
              Object.values(this.validData).forEach((item,i) => {
                if(item){
                  validRes = false
                }
              })
              if(validRes){
                this.registerStepOne(this.subData).then((res)=>{
                  if(res.resultCode == 1){
                    //提交成功，进入注册第二步
                    this.$router.push('/register2')
                  }else if(res.resultCode == 40006){
                    this.validData.password =  true;
                    $('.password-error').text(res.shortMessage);
                  }else{
                    this.change_seccode();
                    util.msg(res.shortMessage);
                  }
                })
              }
            }
          })
        }else if(validRes){
          //第一步注册已提交返回不需要手机验证码验证
          this.registerStepOne(this.subData).then((res)=>{
            if(res.resultCode == 1){
              //提交成功，进入注册第二步
              this.$router.push('/register2')
            }else{
              $('.error-msg').text('');
              if(res.resultCode == 40003){
                $('.phone-error').text(res.shortMessage);
                this.validData.telphone = true
              }else if(res.resultCode == 90013 || res.resultCode == 90015){
                $('.error-validcode').text(res.shortMessage);
              }else{
                this.validData.password =  true;
                $('.password-error').text(res.shortMessage);
              }
            }
          })
        }
      },
      checkFhone(){
        if(this.subData.telphone == ''){
          $('.phone-error').attr('idx',1);
          $('.phone-error').text('联系方式不能为空');
          this.validData.telphone = true
        }else{
          /*if(!/1[3456789]{1}\d{9}$/.test(this.subData.telphone || /^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$/.test(this.subData.telphone))){*/
          if(!/1[3456789]{1}\d{9}$/.test(this.subData.telphone)){
            $('.phone-error').attr('idx',2);
            $('.phone-error').text('请输入正确的号码');
            this.validData.telphone = true
          }
        }
      },
      checkPassword(){
        if(this.subData.password == ''){
          $('.password-error').text('密码不能为空');
          $('.password-error').attr('idx',1);
          this.validData.password = true
        }else if(this.subData.password.length < 6){
          $('.password-error').attr('idx',2);
          $('.password-error').text('密码不能小于6位');
          this.validData.password = true
        }else if(this.subData.password.length > 16){
          $('.password-error').attr('idx',2);
          $('.password-error').text('密码不能大于16位');
          this.validData.password = true
        }
      },
      change_seccode(){
        this.makeCode().then((res)=>{
          $('#codeimage').attr('src',res.responseContent.image);
        })
        $('#captcha').select();
      },
      inputSwitch(e){
        var el = e.currentTarget;
        if($(el).hasClass('visible')){
          $(el).removeClass('visible');
          document.getElementById("password").type = 'password';
        }else{
          $(el).addClass('visible');
          document.getElementById("password").type = 'text';
        }
      },
      countDownFirst($obj,callback){
        var s = 10;
        $obj.text(s);
        var timer = setInterval(function(){
          s -=1;
          if( s <= 0 ){
            clearInterval(timer);
            callback();
          }
          $obj.text(s);
        }, 1000);
      },
      countdown(time){
        var _self = this;
        this.cleardaojishi =setInterval(function(){
          if($('#second').val()==1){
            clearInterval(_self.cleardaojishi);
            $('.huoqu').html('重新获取');
            _self.smsFlag = true;
          }else{
            var msg=$('#second').val()+'s后重新获取';
            $('.huoqu').html(msg);
            $('#second').val($('#second').val()-1);

          }
        },1000);
      },
      closeRegister(e){
        var el = e.currentTarget;
        if($(el).hasClass('disabled')==false){
          $('.dialog-register').hide();
        }
      },
      doRouter(url){
        this.$router.push(url);
      },
      getValidCode(){
        var _self = this;
        var $mobileObj=$("#telphone");
        var tel=$mobileObj.val();
        var myreg =/^1[3|4|5|6|7|8|9][0-9]{9}$/;
        var regFlag=myreg.test(tel);
        if(tel==null||tel==''){
          util.msg('手机号码不能为空');
          return;
        }
        if(regFlag===false){
          util.msg('手机号码输入有误');
          return;
        }
        if(_self.smsFlag){
          _self.sendSms({msgtype:'register',telphone:tel}).then((res)=>{
            if(res == 1){
              _self.smsFlag = false;
              //验证码发送成功
              util.msg('发送成功');
              $('#second').val(60);
              $('.huoqu').html('60s后重新获取');
              _self.countdown(60);
            }else{
              util.msg(res);
              _self.change_seccode();
            }
            return;
          })
        }else{
          util.msg('您的操作过于频繁，请稍后重试!');
          return;
        }
      }
    },
    watch:{
      subData:{
        handler: function () {
          if(this.subData.password !== '' && this.subData.password.length >= 6){
            this.validData.password = false
          }
          if(/1[3456789]{1}\d{9}$/.test(this.subData.telphone) && this.subData.telphone !== ''){
            this.validData.telphone = false
          }
          if(this.subData.captcha !== ''){
            this.validData.captcha = false
          }
          if(this.subData.mall_agreement1 == true){
            this.validData.mall_agreement1 = false
          }
         /* if(this.subData.mall_agreement2 == true){
            this.validData.mall_agreement2 = false
          }*/
        },
        deep: true
      }
    },
    mounted() {
      var _self = this;
      $('.huoqu').html('获取验证码');
      _self.smsFlag = true;
      _self.makeCode().then((res)=>{
        $('#codeimage').attr('src',res.responseContent.image);
      })
      //获取第一步注册好的信息（用于注册到第二步返回第一步注册的）
      _self.getRegisterStepOne().then((res)=>{
        _self.store_register_id = res.store_register_id;
        _self.store_register_tel = res.store_register_tel;
        if(_self.store_register_id != '' && _self.store_register_id != null){
          $('.dialog-register').hide();
          $('#first-register').hide();
          _self.subData.telphone = _self.store_register_tel;
          $('#telphone').attr('disabled',true);
        }
      })
      $('.dialog-register .dialog-in').css({
        'height':  parseInt($('.dialog-register .dialog-in').height())+'px',
        'margin-top': parseInt(-$('.dialog-register .dialog-in').height()/2)+'px'
      })
      $('body').on('click','.dialog-register .dialog-close:not(".disabled")',function(){
        $('.dialog-register').hide();
        $('body').removeClass('no-scroll');
      })
      _self.countDownFirst($('.dialog-register .btn-agree .second'),function(){
        $('.dialog-register .btn-agree .hint').hide();
        $('.dialog-register .btn-agree').removeClass('disabled');
        $('.dialog-register .dialog-close').removeClass('disabled');
      });
    },
    beforeDestroy(){
      clearInterval(this.cleardaojishi);
    }
  }
</script>
