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
          <ul class="list-flow list-flow-reg s4">
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
          <div class="message-box">
            <p class="tit"><i class="ico-succed"></i>您已提交注册申请，请耐心等待审核结果。</p>
            <div class="txt">
              <p>我们的审核时限为24小时(工作日)，遇法定节假日顺延。</p>
              <p>我们会以短信告知您审核结果，如有问题，请拨打热线：13705953251。</p>
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
<style scoped src="./auth.css"></style>
<script>
  import {mapActions,mapGetters} from 'vuex';
  export default {
    name: "auth-register",
    data(){
      return {
      }
    },
    computed:{
      ...mapGetters({
      }),
    },
    methods:{
      ...mapActions({
      }),
      doRouter(url){
        this.$router.push(url);
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>
</style>
