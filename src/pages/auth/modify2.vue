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
          <ul class="list-flow list-flow-pwd s2">
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
          <form id="form" action="index.php?c=seller_login&a=modify2" method="post">
            <input type="hidden" name="form_submit" value="ok"/>
            <div class="form-list">
              <div class="form-item form-password">
                <div class="form-box form-icon w500">
                  <i class="ico-password2"></i>
                  <input id="password" maxlength="16" onkeyup="this.value=this.value.replace(/[^a-zA-Z0-9]/g,'');" name="password" type="password" autocomplete="new-password" placeholder="重置密码" v-model.trim="subData.password">
                  <p class="btn-visible" @click="inputSwitch($event,'password')"></p>
                </div>
                <p idx="0" class="error-msg error-password" style="display:block" v-show="validData.password"></p>
                <p class="form-tip">密码长度为6~16个数字或字母组合</p>
              </div>
              <div class="form-item form-password">
                <div class="form-box form-icon w500">
                  <i class="ico-password"></i>
                  <input name="password2" maxlength="16" onkeyup="this.value=this.value.replace(/[^a-zA-Z0-9]/g,'');" id="repassword" type="password" autocomplete="new-password" placeholder="确认密码" v-model.trim="subData.rePassword">
                  <p class="btn-visible" @click="inputSwitch($event,'repassword')"></p>
                </div>
                <p idx="0" class="error-msg error-repassword" style="display:block" v-show="validData.rePassword"></p>
              </div>
              <div class="form-item">
                <input @click="submiData()" class="comm-btn" value="下一步" readonly>
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
        validData:{
         password:false,
          rePassword:false,
        },
        subData:{
          password:'',
          rePassword:'',
        },
      }
    },
    computed:{
      ...mapGetters({
      }),
    },
    methods:{
      ...mapActions({
        modifyTwo:'modifyTwo',
        getModifyOne:'getModifyOne',
      }),
      submiData(){
        var validRes = true
        if(this.subData.password == ''){
          $('.error-password').text('密码不能为空');
          $('.error-password').attr('idx',1);
          this.validData.password = true
        }else if(this.subData.password.length < 6){
          $('.error-password').text('密码不能小于6位');
          $('.error-password').attr('idx',2);
          this.validData.password = true
        }else if(this.subData.password.length > 16){
          $('.error-password').text('密码不能大于16位');
          $('.error-password').attr('idx',2);
          this.validData.password = true
        }
        if(this.subData.rePassword == ''){
          $('.error-repassword').text('确认密码不能为空');
          $('.error-repassword').attr('idx',1);
          this.validData.rePassword = true
        }else if(this.subData.password != this.subData.rePassword){
          $('.error-repassword').text('两次输入的密码不一致');
          $('.error-repassword').attr('idx',2);
          this.validData.rePassword = true
        }
        Object.values(this.validData).forEach((item,i) => {
          if(item){
            validRes = false
          }
        })
       if(validRes){
          this.modifyTwo(this.subData).then((res)=>{
            if(res.resultCode == 1){
              //提交成功，修改密码第二步
              this.$router.push('/modify3')
            }else{
              util.msg(res.shortMessage);
            }
          })
        }
      },
      inputSwitch(e,idName){
        var el = e.currentTarget;
        if($(el).hasClass('visible')){
          $(el).removeClass('visible');
          document.getElementById(idName).type = 'password';
        }else{
          $(el).addClass('visible');
          document.getElementById(idName).type = 'text';
        }
      },
      doRouter(url){
        this.$router.push(url);
      },
    },
    watch:{
      subData:{
        handler: function () {
          if(this.subData.password !== '' &&  $('.error-password').attr('idx')==1){
            this.validData.password = false
          }else if(this.subData.password.length >= 6 &&  $('.error-password').attr('idx')==2 && this.subData.password.length <=16){
            this.validData.password = false
          }
          if(this.subData.rePassword !== '' &&  $('.error-repassword').attr('idx')==1){
            this.validData.rePassword = false
          }else if(this.subData.rePassword == this.subData.password &&  $('.error-repassword').attr('idx')==2){
            this.validData.rePassword = false
          }
        },
        deep: true
      }
    },
    mounted() {
      this.getModifyOne().then((res)=>{
        if(res.findPasswordMobile == '' || res.findPasswordMobile == null){
          this.$router.push('/modify1')
        }
      });
    }
  }
</script>
