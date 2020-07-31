<style scoped>
.hasImageDiv {
  max-width: 520px;
}
</style>
<template>
  <div>
    <el-dialog
      :visible.sync="hasImageDialog"
      :lock-scroll="modalAppendToBody"
      :close-on-click-modal="closeOnClickModal"
      :width="imgWidth + 20 +'px'"
      customClass="show-image"
      v-dialogDrag>
      <template v-if="hasImage">
        <img :src="imageUrl" class="hasImageDiv" :style="{width:imgWidth +'px'}">
        <div class="closeDiv">
          <div id="lightbox-container-image-data">
            <div id="lightbox-secNav">
              <a id="lightbox-secNav-btnClose" @click="closeDiv()">
                <img src="//static.shenbd.com/lib/js/lightbox/img/lightbox-btn-close.gif">
              </a>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      :visible.sync="unImageDialog"
      :lock-scroll="modalAppendToBody"
      width="250px"
      customClass="show-image"
    >
      <div class="loader">
        <img src="//static.shenbd.com/lib/js/lightbox/img/lightbox-ico-loading.gif">
      </div>
      <div id="lightbox-secNav">
        <div class="clear"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "qm-dialog-img",
  props: {
    imageUrl: {
      type: String,
      default: ""
    },
    imageDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      unImageDialog: false,
      modalAppendToBody: false,
      closeOnClickModal: false,
      hasImage: false,
      hasImageDialog:false,
      imgWidth:0
    };
  },

  methods: {
    isHasImg(pathImg) {
      var vm = this;
      return new Promise((resolve, reject) => {
        var ImgObj = new Image();
        ImgObj.src = pathImg;
        ImgObj.onload = function(res) {
          if (ImgObj.width >= 520) {
            vm.imgWidth = 520;
          } else {
            vm.imgWidth = ImgObj.width;
          }
          resolve(true);
        };
        ImgObj.onerror = function() {
          resolve(false);
        };
      });
    },
    closeDiv() {
       this.$emit("close");
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
  watch: {
    imageDialog(newval,oldval) {
      var dragDom = document.querySelectorAll(".el-dialog");
      dragDom.forEach((el)=>{
        console.log(el)
        el.style.left = 0;
        el.style.top =0

      })
      if (newval) {
        this.isHasImg(this.imageUrl).then(res => {
          this.hasImage = res;
          if (this.hasImage) {
            this.hasImageDialog = true;
          } else {
            this.unImageDialog = true;
          }
        });
      }else{
        this.hasImageDialog = false;
      }
    }  
  },
};
</script>
