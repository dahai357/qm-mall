import { get } from "https";

export default {
    name: "qm-dialog"  ,
    props:{
        dialogVisible:{
            type:Boolean,
            default:false
        },
        width:{
            type:String,
            default:'500px'
        },
        customClass:{
            type:String,
            default:'phone-bind'
        },
      showClose:{
        type:Boolean,
        default:true
      }
    },

    data(){
      return {
        modalAppendToBody:false,
        closeOnClickModal:false,
      }
    },
    computed: {

    },
    methods:{
        handleClose(done) {
            this.$emit('close');
          },
          open(){
            if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
              $("html").css("overflow","hidden");
              $(".main").css("marginRight","18px");
              $(".header").css("width","calc(100% - 16px )");
            }
          },
      close(){
            if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
              $("html").css("overflow","auto")
              $(".main").css("marginRight","0px");
              $(".header").css("width","calc(100% - 0px)");
            }
          },

    },
    watch:{
        dialogVisible(){
          var dragDom = document.querySelectorAll(".el-dialog");
          dragDom.forEach((el)=>{
            el.style.left = 0;
            el.style.top =0

          })
        }
    },
    mounted() {


    }
  }
