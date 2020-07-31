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
          <ul class="list-flow list-flow-pwd s3">
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
          <div class="message-box">
            <p class="tit"><i class="ico-succed"></i>恭喜您，密码修改成功！</p>
            <p class="txt"><span id="second">{{second}}</span>秒之后页面自动跳转<a @click="doRouter('/login')">我要去登录</a></p>
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
<style scoped src="./auth.css"></style>
<script>
  import {mapActions,mapGetters} from 'vuex';
  export default {
    name: "auth-modify",
    data(){
      return {
        second:5,
        cleardaojishi,
      }
    },
    computed:{
      ...mapGetters({
      }),
    },
    methods:{
      ...mapActions({
      }),
      showTime(){
        var _self = this;
        _self.cleardaojishi =setInterval(function(){
          $('#second').text(_self.second);
          if(_self.second<=0){
            clearInterval(_self.cleardaojishi);
            _self.$router.push('login');
          }else{
            _self.second = _self.second-1;
          }
        },1000);
      },
      doRouter(url){
        this.$router.push(url);
      },
    },
    mounted() {
      this.showTime();
      this.second=5;
      $(document).ready(function(e) {
        if (window.history && window.history.pushState) {
          $(window).on('popstate', function () {
            window.history.pushState('forward', null, '#');
            window.history.forward(1);
          });
        }
        window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
        window.history.forward(1);
      });
    },
    beforeDestroy(){
      clearInterval(this.cleardaojishi);
    }
  }
</script>
