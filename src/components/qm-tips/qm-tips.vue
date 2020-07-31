<style scoped>
  .phone-bind-title{
    color: white;
    text-align: center;
    height: 54px;
    line-height: 54px;
    color: #fff;
    font-size: 20px;
  }
  .dialog_message_contents {
    font-size: 16px;
    text-align: center;
    word-break: break-all;
  }
  .dialog_buttons_bar {
    border: none;
    text-align: right;
    padding-top: 10px;
  }
  .dialog_body .dialog_buttons_bar time.countdown {
    color: #757575;
    font-size: 14px;
    margin: 0;
  }
  .dialog_body .dialog_buttons_bar time.countdown i {
    display: none;
  }
  .bottom{
    padding-bottom: 20px;
  }
  .disabled {
    color: #adadad;
    border-color: #eee;
    background: none;
  }
  .disabled:hover{
    color: #adadad!important;
    border-color: #eee!important;
    background: none!important;
  }
</style>
<template>
  <div class="qm-tips">
    <el-dialog
      :visible.sync="tipsVisible"
      :width="width"
      :before-close="handleClose"
      :customClass="customClass"
      :close-on-click-modal = "closeOnClickModal"
      :lock-scroll="lockScroll"
      :top="top"
      v-dialogDrag
      >
      <div slot="title" class="phone-bind-title">
        <slot name="title"></slot>
      </div>
      <div class="dialog_content">
        <div class="eject_con" xmlns="http://www.w3.org/1999/html">

          <div class="dialog_message_contents"><i class="alert_info"></i><slot name="content"  :data="sourceData"></slot></div>
          <div  class="bottom">
            <div class="button" v-if="showButton">
              <template v-if="!cancelFront">
                <input v-if="showCancel" type="button" :value="cancelTxt"  class="ncsc-btn  fr" :class="cancelClass" @click="cancelAction()">
                <input type="button" v-if="confirmGray"  disabled="true" :value="confirmTxt" class="ncsc-btn disabled fr" @click="confirmAction()">
                <input type="button" v-if="!confirmGray" :value="confirmTxt" class="ncsc-btn  fr" :class="confirmClass" @click="confirmAction()">
              </template>
              <template v-else>
                <input type="button" v-if="confirmGray"  disabled="true" :value="confirmTxt" class="ncsc-btn disabled fr" @click="confirmAction()">
                <input type="button" v-if="!confirmGray" :value="confirmTxt" class="ncsc-btn  fr" :class="confirmClass" @click="confirmAction()">
                <input v-if="showCancel" type="button" :value="cancelTxt"  class="ncsc-btn  fr" :class="cancelClass" @click="cancelAction()">
              </template>
            </div>
            <div class="clear"></div>
            <div v-if="copyTime > 0" class="dialog_buttons_bar"><time class="countdown"><i class="fa fa-time"></i>{{copyTime}} 秒后窗口关闭</time></div>
          </div>
        </div>
      </div>
    </el-dialog>
   </div>
</template>

<script>
    export default {
        name: "qm-tips"
      ,
      props:{
          sourceData: {
          type: Object,
          default: function () {
            return {}
          }
        },
        tipsVisible:{
          type:Boolean,
          default:false
        },
        noPadding:{
          type:Boolean,
          default:false
        },
        showCancel:{
          type:Boolean,
          default:true
        },
        showButton:{
          type:Boolean,
          default:true
        },
        confirmGray:false,
        top:{
          type:String,
          default:'30vh'
        },
        width:{
          type:String,
          default:'500px'
        },
        time:{
          type:Number,
          default:0
        },
        confirmTxt:{
          type:String,
          default:'确定'
        },
        cancelTxt:{
          type:String,
          default:'取消'
        },
        confirmClass:{
          type:String,
          default:'ncsc-btn-orange'
        },
        cancelClass:{
          type:String,
          default:'btn-cancel'
        },
        cancelFront:false,
      },
      data(){
        return {
          copyTime:0,
          timer:null,
          modalAppendToBody:false,
          lockScroll:false,
          closeOnClickModal:false,
          customClass:this.noPadding ? 'no-padding phone-bind':'phone-bind'
        }
      },
      computed: {
      },
      methods:{
        cancelAction(){
          var events = _.clone(this._events)
          if(events.hasOwnProperty('cancel')){
            this.$emit('cancel');
          }else{
            this.$emit('update:tipsVisible', false)
          }
        },
        confirmAction(){
          this.$emit('confirm');
        },
        handleClose(done) {
          this.$emit('close');
        },
        setTimer(){
          if(this.timer == null) {
            this.timer = setInterval( () => {
              this.copyTime--
            }, 1000)
          }
        },
        open(){
          if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
            $("html").css("overflow","hidden");
            $(".main").css("marginRight","18px");
            $(".el-dialog__wrapper").css("left","0px")
            $(".header").css("width","calc(100% - 16px )");
            // var marginl = "calc((100% - 2px - 1200px)/2)";
            // $("#content").css("marginLeft",marginl);
          }
        },
        close(){
          if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
            $("html").css("overflow","auto")
            $(".el-dialog__wrapper").css("left","18px")
            $(".main").css("marginRight","0px");
            $(".header").css("width","calc(100% - 0px)");
            // var marginl = "calc((100% - 1200px)/2)";
            // $("#content").css("marginLeft",marginl);
          }
        },
        isIE() { //ie?
          if (!!window.ActiveXObject || "ActiveXObject" in window)
                  { return true; }
          else
                  { return false; }
          }

      },
      watch:{
          tipsVisible(){
            var dragDom = document.querySelectorAll(".el-dialog");
            dragDom.forEach((el)=>{
              console.log(el)
              el.style.left = 0;
              el.style.top =0

            })
            if(this.tipsVisible){
              
              this.copyTime = this.time
              if(this.copyTime > 0){
                this.setTimer()
              }

            }
          },
          copyTime(){
            if(this.copyTime <= 0){
              clearInterval(this.timer)
              this.timer = null
              this.handleClose()
            }
            }
      },
      mounted() {

        if(this.isIE()){

        }else{

        }
      }

    }
</script>
