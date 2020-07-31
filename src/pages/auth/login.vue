<style scoped>
.friendlyTip{
  margin-top: -34px;
  margin-bottom: 15px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #FF3434;
}
.friendlyTip a{
  color: #3699db;
}
</style>
<template>
  <div class="wrap">
    <div class="header">
      <div class="header-in">
        <div class="header-c1">
          <h1 class="logo"><a href=""><img src="~@/assets/seller/images/seller/style2018/logo.png" alt="身边店"></a></h1>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="pn-login">
        <div class="pn-in">
          <div class="scene">
            <i class="welcome"></i>
            <i class="cloud"></i>
            <i class="build"></i>
            <i class="cart1"></i>
            <i class="cart2"></i>
            <i class="person"></i>
            <i class="slogan"></i>
          </div>
          <div class="mod-login">
            <div class="friendlyTip" v-show="showFriendlyTip">
              <p>
                <img src="@/assets/images/tips.png" class="br100p">
                <span >友情提示：为了保证更好的体验，推荐使用谷歌浏览器!&nbsp;&nbsp;</span>
                <a href="https://img.shenbd.com/ChromeSetup_32.zip">前往下载>></a>
              </p>
            </div>
            <div class="mod-hd">
              <div class="tit">商家管理中心</div>
              <p class="txt">请输入您注册商铺时申请的手机号码，登录密码为商城用户通用密码。</p>
            </div>
            <form id="form_login" action="" method="post" autocomplete="off">
              <input type="hidden" name="refer" value="">
              <input name="nchash" type="hidden" value="" />
              <input type="hidden" name="form_submit" value="ok" />
              <div class="mod-bd">
                <div class="form-list">
                  <div class="form-item">
                    <div class="form-box form-icon">
                      <i class="ico-name"></i>
                      <input id="seller_name" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="11" name="seller_name" autocomplete="off" type="text" placeholder="请输入手机号码" v-model="subData.mobile">
                    </div>
                    <p class="error-msg error-phone" style="display:block" v-show="validData.mobile">用户名不能为空</p>
                  </div>
                  <div class="form-item form-password">
                    <div class="form-box form-icon">
                      <i class="ico-password"></i>
                      <input id="password" name="password" type="password"  autocomplete="new-password" placeholder="请输入密码" v-model="subData.password">
                      <p class="btn-visible" @click="inputSwitch($event)"></p>
                    </div>
                    <p class="error-msg error-password" style="display:block" v-show="validData.password">密码不能为空</p>
                  </div>
                  <div class="form-item form-verification">
                    <div class="form-box form-icon">
                      <i class="ico-verification"></i>
                      <input name="captcha" id="captcha" maxlength="4" type="text"  placeholder="验证码" autocomplete="off" v-model="subData.captcha">
                    </div>
                    <p class="error-msg error-captcha" style="display:block" v-show="validData.captcha">验证码不能为空</p>
                    <div class="verification-img">
                      <img id="codeimage" @click="change_seccode();" src="">
                    </div>
                  </div>
                  <div class="form-item link-box">
                    <a @click="goRegister()" class="register">立即注册</a>
                    <a @click="doRouter('/modify1')">忘记密码</a>
                  </div>
                  <div class="form-item">
                    <input type="button" style="width:100%" @click="doLogin()" class="comm-btn btn-login" value="商家登录">
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="login-type">
            <div  class="login-type-1 login-select" v-bind:class="{business:isBusiness}" data-login-type="business" @click="loginTypeSelect('business')">
              <img class="bussiness-img" src="~@/assets/seller/images/seller/style2018/login-type-1.png">
              <img class="supplier-img" src="~@/assets/seller/images/seller/style2018/login-type-1-s.png" style="display: none">
              商家登录
            </div>
            <div class="login-type-2 login-select" data-login-type="supplier" v-bind:class="{supplier:isSupplier}" @click="loginTypeSelect('supplier')">
              <img class="bussiness-img" src="~@/assets/seller/images/seller/style2018/login-type-2.png">
              <img  style="display: none" class="supplier-img" src="~@/assets/seller/images/seller/style2018/login-type-2-s.png">
              供应商登录
            </div>
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
<style scoped src="../../assets/seller/css/style2018.css"></style>
<style src="./auth.css"></style>



<script>
  import env from "../../config/url";
  import {mapActions,mapGetters} from 'vuex';
  import axios from "axios";
  import consts from "../../config/consts";
  import storage from '../../libs/utils/storage'
  //env.shopUrl="http://test.shenbd.com/mall";
  import util from 'lib/utils/util';
  //env.jsonUrl="http://test.shenbd.com/mall";
    export default {
        name: "auth-login",
      data(){
        return {
          showFriendlyTip:false,
          flag:true,
          isBusiness:true,
          isSupplier:false,
          validData:{
            mobile:false,
            password:false,
            captcha:false,//图形验证码
          },
          subData:{
            mobile:'',
            password:'',
            captcha:'',//图形验证码
            login_type:'business',
            nchash:false,
            sessToken:false
          },
        }
      },
      computed:{
        ...mapGetters({
          isLogin:'getIsLogin'
        }),
      },
      methods:{
        ...mapActions({
          setLogin:'setLogin',
          logOut:'logOut',
          checkCode:'checkCode',
          makeCode:'makeCode',
          supplierLogin:'supplierLogin',
          cleanRegisterInfo:'cleanRegisterInfo',
          setRegisterInfo:'setRegisterInfo',
          isSellerLogin:'isSellerLogin'
        }),
        doLogin(){
          var validRes = true;
          this.validData.password = false;
          this.validData.mobile = false;
          this.validData.captcha = false;
          if(this.subData.mobile == ''){
            this.validData.mobile = true;
            this.$nextTick(()=>{
              $('.error-phone').text('用户名不能为空');
            });
          }
          if(this.subData.password == ''){
            this.validData.password = true;
            this.$nextTick(()=>{
              $('.error-password').text('密码不能为空');
            });
          }
          if(this.subData.captcha == ''){
            this.validData.captcha = true;
            this.$nextTick(()=>{
              $('.error-captcha').text('验证码不能为空');
            });
          }else {
            //供应商登入
            this.subData.seller_name=this.subData.mobile;
            if (this.isSupplier) {
              Object.values(this.validData).forEach((item, i) => {
                if (item) {
                  validRes = false;
                  this.change_seccode();
                }
              })
              axios.get(env.shopUrl+"/index.php?c=seller_login_supplier&a=login",{
              params:{
                seller_name:this.subData.mobile,
                password:this.subData.password,
                captcha:this.subData.captcha,
                nchash:this.subData.nchash,
                form_submit:'ok',
                sessToken:this.subData.sessToken
              }}).then((res) => {
                if(res.data.status==1) {
                  storage.set('spplier_code',res.data.data.session_id);
                  window.location.href = res.data.data.url;
                }else if(res.data.status==-12){
                  this.validData.captcha = true;
                  this.$nextTick(()=>{
                    $('.error-captcha').text('验证码错误');
                  });
                }else{
                  $('.error-phone').text(res.data.msg);
                  this.$nextTick(()=>{
                    this.validData.mobile = true;
                  })
                }
              });
            } else {
              //商家后台登入验证码校验
              this.checkCode({captcha: this.subData.captcha}).then((res) => {
                if (res.resultCode !== 1) {
                  this.validData.captcha = true;
                  this.$nextTick(()=>{
                    $('.error-captcha').text('验证码错误');
                  });
                  this.change_seccode();
                } else {
                  Object.values(this.validData).forEach((item, i) => {
                    if (item) {
                      validRes = false;
                      this.change_seccode();
                    }
                  })
                  if (validRes) {
                    this.setLogin(this.subData).then((res) => {
                      if (res.resultCode == 1 || res.resultCode == 200003) {
                        this.$router.push('home')
                        storage.set('isShowedDeadline',0);
                        // this.$router.push('home');
                      /*  let routeData = this.$router.resolve({
                            path: 'home'
                        });
                        window.open(routeData.href, '_self');*/
                      } else {
                        this.change_seccode();
                        if (res.resultCode == 10122) {
                          this.validData.password = true;
                          this.$nextTick(()=>{
                            $('.error-password').text(res.shortMessage);
                          });
                        }else if(res.resultCode == 10125){
                          this.$router.push('register2');
                        } else {
                          this.validData.mobile = true;
                          this.$nextTick(()=>{
                            $('.error-phone').text(res.shortMessage);
                          });
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        },
        goRegister(){
          this.cleanRegisterInfo().then((res) => {
            this.doRouter('/register')
          });
        },
        change_seccode(){
          if (this.isSupplier) {
            axios.get(env.shopUrl+"/index.php?c=seccode&a=makecodeOut",{}).then((res) => {
              if(res.data.status==1){
                if(!this.subData.nchash){
                  this.subData.nchash=res.data.data.nchash;
                }
                this.subData.sessToken=res.data.data.sessToken;
                $('#codeimage').attr('src',res.data.data.img);
              }
            }).catch(function (err) {
              console.log(err);
            });
          } else {
          this.makeCode().then((res)=>{
            if(res.resultCode == 200006){
              this.makeCode().then((res)=>{
                $('#codeimage').attr('src',res.responseContent.image);
              })
            }else{
              $('#codeimage').attr('src',res.responseContent.image);
            }
          }).catch(function (err) {
            console.log(err);
          })
          }
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
        doRouter(url){
          this.$router.push(url);
        },
        loginTypeSelect:function(loginType){
          switch (loginType) {
            case 'business':
              this.isBusiness=true;
              this.isSupplier=false;
              $(".tit").text("商家管理中心");
              $(".btn-login").val("商家登录");
              $(".register").show();
              $(".supplier-img").hide();
              $(".bussiness-img").show();
              $(".login-type-1").css("color","#FF8519");
              $(".login-type-2").css("color","#9E9E9E");
              $(".txt").text("请输入您注册商铺时申请的手机号码，登录密码为商城用户通用密码。");
              //$(".login-type-1 img").attr("src","/assets/seller/images/seller/style2018/login-type-1.png");
              //$(".login-type-2 img").attr("src","/assets/seller/images/seller/style2018/login-type-2.png");
              break;
            case 'supplier':
              this.isBusiness=false;
              this.isSupplier=true;
              $(".tit").text("供应商管理中心");
              $(".btn-login").val("供应商登录");
              $(".register").hide();
              $(".supplier-img").show();
              $(".bussiness-img").hide();
              $(".login-type-2").css("color","#FF8519");
              $(".login-type-1").css("color","#9E9E9E");
              $(".txt").text("请输入您注册供应商时提供的手机号码，登录密码为商城用户通用密码。");
             // $(".login-type-1 img").attr("src","/assets/seller/images/seller/style2018/login-type-1-s.png");
              //$(".login-type-2 img").attr("src","/assets/seller/images/seller/style2018/login-type-2-s.png")
              break;
            default:break;
          }
          if(consts.LOGIN_TYPY!=loginType){
            this.subData.mobile='';
            this.subData.password='';
            this.subData.captcha='';
            $('.error-captcha').text('');
            $('.error-phone').text('');
            $('.error-password').text('');
          }
         this.change_seccode();
          this.subData.login_type=loginType;
          consts.LOGIN_TYPY=loginType;
        }
      },
      watch:{
        subData:{
          handler: function () {
            if(this.subData.mobile !== ''){
              this.validData.mobile = false
            }
            if(this.subData.password !== ''){
              this.validData.password = false
            }
            if(this.subData.captcha !== ''){
              this.validData.captcha = false
            }
          },
          deep: true
        }
      },
      mounted() {
          var _self = this;
        var cookieKey = storage.getCookie('key');
          if(!cookieKey){
            localStorage.clear();
          }

          //判断商家是否登陆
        this.isSellerLogin().then((res) => {
          if (res.resultCode == 200003) {
            this.$nextTick(()=>{
              const metaData = storage.get('metaData') || {};
              this.$store.commit('setLoginData', metaData)
              this.$router.push('/home')
            })
          }else{
            //判断供应商是否登陆
            axios.get(env.shopUrl+"/index.php?c=seller_login_supplier&a=is_supplier_login",{
              params:{
                sessToken:storage.get('spplier_code')
              }}).then((res) => {
              if(res.data.status==1) {
                window.location.href = res.data.data.url;
              }
            });
          }
        });
        this.loginTypeSelect(consts.LOGIN_TYPY);
        //body绑定键盘enter搜索事件
        _self.bodyListener = (e) => {
          if (e.keyCode === 13){
            //登录
              _self.doLogin();
          }
        }
        document.body.addEventListener('keyup', _self.bodyListener, false);

        var broser = util.myBrowser();
        if("Chrome" != broser){
          this.showFriendlyTip = true;
        }
      },
      beforeDestroy(){
        //销毁键盘enter搜索事件
        document.body.removeEventListener('keyup', this.bodyListener);
      },
    }
</script>

<style>
</style>
