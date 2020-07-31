<style scoped>
  .pn-help .pn-hd .title{
    font-weight: bold;
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
      <div class="pn pn-help">
        <div class="pn-in">
          <div class="pn-hd">
            <h2 class="title">帮助中心</h2>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="../../assets/seller/css/style2018.css"></style>
<script>
  import util from 'lib/utils/util';
  import {mapActions,mapGetters} from 'vuex'
    export default {
        name: "help_center",
      data(){
        return {
        }
      },
      computed:{
      },
      methods:{
      },
      watch:{

      },
      mounted() {

      }
    }
</script>

<style scoped>

</style>
