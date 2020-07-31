<template>
  <div class="wrap">
    <div class="header">
      <div class="header-in">
        <div class="header-c1">
          <h1 class="logo"><a href=""><img src="~@/assets/seller/images/seller/style2018/logo.png" alt="身边店"></a></h1>
        </div>
         <div class="header-c2">
           已有账号？<a @click="doRouter('/login')"  class="btn-login">请登录</a>
         </div>
      </div>
    </div>
    <div class="content">
      <div class="pn pn-register">
        <div class="pn-in">
          <ul class="list-flow list-flow-pwd">
            <li class="item1 first">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num">1</p>
              <p class="txt">手机验证</p>
            </li>
            <li class="item2">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num">2</p>
              <p class="txt">重置密码</p>
            </li>
            <li class="item3 last">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num"><i class="ico-finish"></i></p>
              <p class="txt">修改成功</p>
            </li>
          </ul>
          <form id="modify_form">
            <div class="form-list">
              <div class="form-item">
                <div class="form-box form-icon w500">
                  <i class="ico-phone"></i>
                  <input name="telphone" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" type="text" id="telphone" autocomplete="off"  placeholder="输入手机号" v-model.trim="subData.mobile">
                </div>
                <p class="error-msg error-phone" style="display:block" v-show="validData.mobile">请输入手机号</p>
              </div>
              <div class="form-item form-phone-code">
                <div class="form-box form-icon w500">
                  <i class="ico-phone-code"></i>
                  <input name="valid_code" type="text" autocomplete="off" placeholder="输入手机验证码" v-model.trim="subData.code">
                  <p class="btn-get-code huoqu" @click="getValidCode()">获取验证码</p>
                </div>
                <p class="form-tip">输入手机短信验证码</p>
                <p class="error-msg error-code" style="display:block" v-show="validData.code">请输入验证码</p>
                <input type="hidden" id="second" value="60"/>
              </div>
              <div class="form-item">
                <input @click="submiData()" class="comm-btn" value="下一步" style="border: none" readonly>
              </div>
            </div>
          </form>
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
<style scoped src="./auth.css"></style>
<script>
  import util from 'lib/utils/util';
  import env from "../../config/url";
  import {mapActions,mapGetters} from 'vuex';
  export default {
    name: "auth-modify",
    data(){
      return {
        smsFlag:true,//发送验证码判断
        validData:{
         mobile:false,
          code:false,
        },
        subData:{
          mobile:'',
          code:'',
        },
        cleardaojishi:'',
      }
    },
    computed:{
      ...mapGetters({
      }),
    },
    methods:{
      ...mapActions({
        sendSms:'sendSms',//获取验证码
        modifyOne:'modifyOne',
      }),
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
          _self.smsFlag = false;
          _self.sendSms({msgtype:'findpwd',telphone:tel}).then((res)=>{
            _self.smsFlag = true;
            if(res == 1){
              //验证码发送成功
              util.msg('发送成功');
              $('#second').val(60);
              $('.huoqu').html('60s后重新获取');
              _self.countdown(60);
            }else{
              util.msg(res);
              _self.change_seccode();
              return;
            }
            return;
          })
        }else{
          util.msg('您的操作过于频繁，请稍后重试!');
          return;
        }
      },
      doRouter(url){
        this.$router.push(url);
      },
      submiData(){
        var validRes = true
        if(this.subData.mobile == ''){
          this.validData.mobile = true;
          this.$nextTick(()=>{
            $('.error-phone').text('请输入手机号');
          });
        }else if(!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.subData.mobile)){
          this.validData.mobile = true;
          this.$nextTick(()=>{
            $('.error-phone').text('手机号码格式错误');
          });
        }
        if(this.subData.code == ''){
          this.validData.code = true;
          this.$nextTick(()=>{
            $('.error-code').text('请输入验证码');
          });
        }
        Object.values(this.validData).forEach((item,i) => {
          if(item){
            validRes = false
          }
        })
       if(validRes){
          this.modifyOne(this.subData).then((res)=>{
            if(res.resultCode == 1){
              clearInterval(this.cleardaojishi);
              //提交成功，修改密码第二步
              this.$router.push('/modify2');
            }else{
              util.msg(res.shortMessage);
            }
          })
        }
      },
      countdown(time){
        this.cleardaojishi =setInterval(function(){
          if($('#second').val()==1){
            clearInterval(this.cleardaojishi);
            $('.huoqu').html('重新获取');
            this.smsFlag = true;
          }else{
            var msg=$('#second').val()+'s后重新获取';
            $('.huoqu').html(msg);
            $('#second').val($('#second').val()-1);

          }
        },1000);
      },
    },
    watch:{
      subData:{
        handler: function () {
          if(this.subData.mobile !== ''){
            this.validData.mobile = false
          }
          if(this.subData.code !== ''){
            this.validData.code = false
          }
        },
        deep: true
      }
    },
    mounted() {

    },
    beforeDestroy(){
      clearInterval(this.cleardaojishi);
    }
  }
</script>
