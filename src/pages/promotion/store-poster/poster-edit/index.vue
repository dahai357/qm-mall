<style scoped>
  .qm-store-class-base{
    padding: 10px 0px 10px 0px;
  }
  .eject_con.guide{
    position: relative;
    min-height: 500px;
  }
  .eject_con .img{
    padding-bottom: 145px;
  }
/*  .eject_con.guide.horizon{
    margin-left: -25px;
    margin-top: -26px;
  }
  .eject_con.guide.vertical{
    margin-left:50px;
  }*/

  .guide-btn{
    width: 184px;
    height: 129px;
    display: inline-block;
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: url(../../../../assets/images/hb_guide_btn.png) 0 0 no-repeat;
  }
  .guide-click{
    display: inline-block;
    width: 100%;
    height: 74px;
    margin-top: 48px;
  }
  .done{
    text-align: center;
    padding: 35px 20px 10px 20px;
  }
  .done h3{
    font-weight: bold;
    margin-bottom: 10px;
  }
  .done a{
    display: block;
    width: max-content;
    margin: 10px auto;
  }
  .done a.btn-create{
    width: 115px;
  }
  .done a.btn-go{
    color: #ff8519;
  }
  .op-hd .icon{
    color: #ff8519;
    font-size: 15px;
    margin-right: 5px;
  }
  .op-hd{
    font-size: 15px;
    text-align: right;
    padding: 10px 0;
  }
  .op-hd a:hover{
    text-decoration: none;
  }
  .op-hd a.change{
    margin-right: 15px;
    border: 1px solid rgba(255,133,25,1);
    border-radius: 21px;
    padding: 5px 15px;
  }

  .op-hd a.touch{
    color: #757575;
    display: inline-block;
    background-image: url(../../../../assets/images/touch.png);
    background-size: 15px;
    background-repeat: no-repeat;
    padding-left: 20px;
    background-position-y: bottom;
    margin-right: 10px;
  }
  .op-hd a.touch:hover{
    color: #757575;
  }
  .op-bd .section{
    display: flex;
  }
  .op-bd .section.horizontal{
    display: block;
  }
  .op-bd .tit{
    font-size: 14px;
    margin:10px 0px;
    color: #ff8519;
  }
  .prev{
    display: block;
    width: 462px;
    padding:15px;
    background: #e3e3e3;
  }
  .prev .img-bg{
    position: relative;
    border: 1px solid #eee;
  }
  .prev .img-bg-change:hover{
    border: 1px solid #c3c3c3;
  }
/*  .prev .img-bg-change:hover:before{
    content:"ff";
    background:#d9444a;
    color:#fff;
    padding:.8em 1em;
    position:absolute;
    left:100%;
    top:-70%;
    margin-left:14px;
    white-spack:pre;
  }*/
  .prev .img-bg.selected:hover:before{
    position: absolute;
    left: 15px;
    top: 5px;
    background: #5e5e5e;
    color: #eee;
    border: 1px solid #5e5e5e;
    border-radius: 0.3rem;
    padding: 0 5px;
    content: "点击修改背景";
    z-index: 2;
  }
  .prev .img-bg.qrwx-bg.selected:hover:before{
    position: absolute;
    left: 15px;
    top: 5px;
    background: #5e5e5e;
    color: #eee;
    border: 1px solid #5e5e5e;
    border-radius: 0.3rem;
    padding: 0 5px;
    content: "点击设置二维码跳转内容";
    z-index: 2;
  }

  .prev img{
    position: absolute;
    border: 1px solid transparent;
  }
  .prev .text-section{
    position: absolute;
    z-index: 1111;
    text-align: center;
    width: 100%;
  }
  .prev .img-section{
    position: absolute;
    z-index: 1111;
    text-align: center;
  }
  .prev .img-section img{
    position: relative;
    display: block;
  }
  .prev .qr_wx{
    position: absolute;
    z-index: 1111;
  }
  .prev .multi_text{
    position: absolute;
    z-index: 1111;
  }
  .prev .qr_wx img{
    position: relative;
    display: block;
  }
  .prev .text-section p.text-tips,.prev .qr_wx  p.text-tips,.prev .img-section  p.text-tips{
    display: none;
    background: #5e5e5e;
    color: #eee;
    border: 1px solid #5e5e5e;
    border-radius: 0.3rem;
    padding: 0 5px;
  }
  .prev .text-section:hover p.text-tips,.prev .qr_wx:hover  p.text-tips,.prev .img-section:hover p.text-tips{
    display: inline-block;
  }
  .prev .multi_text  p.text-tips{
    display: none;
    color: #eee;
    margin:0 auto;
    text-align: center;
  }
  .prev .multi_text:hover p.text-tips{
    display: block;
   }
  .prev .multi_text  p.text-tips span{
    background: #5e5e5e;
    border: 1px solid #5e5e5e;
    border-radius: 0.3rem;
    padding: 0 5px;
    display: inline-block;
  }
  .prev .text .content{
    cursor: default;
    border: 1px solid transparent;
  }
  .prev .multi_text .content{
    cursor: default;
    border: 1px solid transparent;
  }
  .prev .text{
    cursor: default;
    border: 1px solid transparent;
  }
  .prev .cg:hover{
    border: 1px solid #eee;
  }
  .prev .img-bg.selected{
    border: 1px solid #333;
  }
  .prev .text.selected,.prev .img.selected,.prev .qr_wx_img.selected,.prev .content.selected{
    border: 1px solid #eee;
  }
  .op-bd .section.horizontal .prev{
    display: flex;
    width: 100%;
    margin: auto;
    justify-content: center;
  }

  .opts{
    padding:0px 10px;
    margin-left: 40px;
    overflow: hidden;
  }
  .opts .opt-hd{
    font-size: 16px;
    color: #757575;
    font-weight: bold;
  }
  .opts .opt-hd span{
    font-size: 13px;
    color: #b5b5b5;
    display: inline-block;
  }
  .opts .tit{
    margin-bottom: 5px;
    color: #757575;
  }
  .opts .require{
    color: #dd0000;
    margin-right:2px;
  }
  .opts .radio{
    color: #757575;
    vertical-align: bottom;
    line-height: 20px;
    height: 20px;
    margin-bottom: 10px;
  }
  .opts .radio input[type=radio]{
    vertical-align: bottom;
  }
  .opts ul.img-history{
    display: flex;
  }
  .opts ul.img-history li{
    padding-right: 5px;
  }
  .opts ul.img-history li img{
    display: block;
    width: 50px;
    height: 50px;
  }
  .op-bd .section.horizontal .opts{
    margin-left: 0;
    margin-top: 10px;
    padding-bottom: 100px;
  }
  .op-bottom{
    margin: 0 auto;
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
  .op-bottom a{
    padding: 10px 25px;
    background: #ff8519;
    display: inline-block;
    border: 1px solid rgba(255,133,25,1);
    border-radius: 21px;
    color: #eee;
    font-size: 14px;
  }
  .op-bottom a:hover{
    background: #fff;
    color: #ff8519;
    text-decoration: none;
  }
  .op-bottom a i{
    margin-right: 5px;
  }
  .ncsc-form-s{
    min-height: 30px;
    margin-left: 15px;
  }
  .list-category2 li{ font-size: 12px;position: relative; box-sizing: border-box;padding: 0 10px; }
  .list-category2 li:first-child{ border:none;}
  .list-category2 li:hover{ cursor: pointer; background:#f5f5f5;}
  .list-category2 .btn-del{ display: block; height: 20px; line-height: 20px; width: 20px; text-align: center; font-family: SimSun; color:#333; position: absolute; top: 50%; margin-top: -10px; right: 10px;}
  .list-category2 .btn-del:hover{text-decoration: none; color: #ff8519;}
  .list-category-used{max-height: 150px}
  .list-category-used li{ line-height: 29px; border-top:1px dotted #ddd;}

  .category-used{ display: inline-block; vertical-align: middle; position: relative; font-size:12px; width: 300px;}
  .category-used .category-tit{ border:1px solid #ddd; color:#757575; line-height: 30px;height:30px; box-sizing: border-box;border-radius:5px;     padding: 0 10px; }
  .category-used .category-tit i{ color:#757575; position: absolute; right: 10px; top: 7px;}
  .pop-category-used{ position: absolute; left: 0; width: 100%; box-sizing: border-box; top: 30px; border:1px solid #ddd; z-index:
    500; background: #fff;  max-height: 302px; overflow-y: auto;}
  .category-used:hover{ cursor: pointer;}
  .category-used.active .category-tit{ color:#333;border-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius: 0;}
  .category-used.active .category-tit i{ color:#333}
  .modify_category{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
    line-height: 30px;
    height: 30px;
  }
  .modify_category:hover{
    color: white;
  }
  .ncsc-form-s dl{
    display: block;
    height: 30px;
  }
  .ncsc-form-s .show-txt{
    margin-left: 11px;
    color: #ff8519;
    line-height: 20px;
    position: relative;
    width: 240px;
  }
  .ncsc-form-s .show-txt .text{
    display: inline-block;
    width: 90%;
  }

  .upload{
    text-align: center;
    min-width: 250px;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background: #ff8519;
    color: #fff;
    border: none;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
  }
  a.upload:hover{
    text-decoration: none;
  }
  .upload input[type='file']{
    position: absolute;
    top:0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .btns{
    height: 70px;
    text-align: center;
    margin: 0 auto;
    width: 280px;
  }
  .btns a{
    display: block;
  }

  /**
  字体
   */
  @font-face{
    font-family: "Yuanti";
    src: url('../../../../assets/fonts/regular.ttf');
    font-weight: normal;
    font-style: normal;
  }
  .search{
    height: 35px;
    padding-left: 6px;
    padding-right: 5px;
  }
  .search .keyword{
    font-size: 12px;
  }
  .w220{
    width: 220px;
  }
</style>

<template>
  <div class="qm-store-class-base">
    <div class="op-hd">
      <a class="touch" @click="showGuide = true">查看可编辑区域</a>
      <a class="change" @click="changeTemplate()"><i class="fa fa-refresh icon"></i>更换模板</a>
    </div>
    <div class="op-bd">
      <p class="tit"><i class="fa fa-mouse-pointer"></i>鼠标悬停查看可修改区域，点击可对应自定义编辑</p>
      <div :class="[template.direction == 1 ? 'horizontal':'']" class="section">
        <section class="prev">
          <div class="img-bg" :class="[template.selected == true?'selected':'',(template.type == 'qrcode'||template.type =='wxcode')?'qrwx-bg':'']" @mouseover.stop="mouseover({},0)" @mouseout.stop="mouseout({},0)" :style="bdStyle" @click="changeBg()" >
            <template v-for="item in places">
              <template v-if="item.label == 'text'">
                <div class="text-section" :style="`top:${item.y_pos}px;left:${item.x_pos}px;width:${item.width==0?'auto':item.width}px;`"  @mousedown="down($event,item)" @touchstart="down($event,item)" @mousemove="move($event,item)"  @mouseup="end($event,item)" @touchend="end($event,item)">
                  <div class="text" @mouseover.stop="mouseover(item,1)" @mouseout.stop="mouseout(item,1)" :style="`width:${item.width==0?'auto':item.width}px;height:${item.height==0?'auto':item.height}px;${item.style_1}`" @click.stop="changeText(item)">
                    <div class="content" :class="item.selected == true?'selected':''" :style="`${item.style_2};font-size:${item.font_size}px;`">
                      {{item.content}}
                    </div>
                  </div>
                  <p class="text-tips">点击可编辑文字</p>
                </div>
              </template>
              <template v-if="item.label == 'img'">
                <div class="img-section" :style="`top:${item.y_pos}px;left:${item.x_pos}px;${item.style_2}`"  @mousedown="down($event,item)" @touchstart="down($event,item)" @mousemove="move($event,item)"  @mouseup="end($event,item)" @touchend="end($event,item)">
                <img class="img" :class="item.selected == true?'selected':''" @mouseover.stop="mouseover(item,1)" @mouseout.stop="mouseout(item,1)" :src="getImageUrl(item.content)" :style="`width:${item.width}px;height:${item.height}px;${item.style_1}`" @click.stop="changeImage(item)">
                  <p class="text-tips" v-if="item.can_change == 1">点击更换图片</p>
                </div>
              </template>
              <template v-if="item.label == 'qr_wx'">
                <div  class="qr_wx" :style="`top:${item.y_pos}px;left:${item.x_pos}px;`"  @mousedown="down($event,item)" @touchstart="down($event,item)" @mousemove="move($event,item)"  @mouseup="end($event,item)" @touchend="end($event,item)">
                  <div :style="`${item.style_2}`">
                  <img class="qr_wx_img" :class="item.selected == true?'selected':''" @mouseover.stop="mouseover(item,1)" @mouseout.stop="mouseout(item,1)" :src="getImageUrl(item.content)" :style="`width:${item.width}px;height:${item.height}px;${item.style_1}`" @click.stop="changQrWx(item)">
                  </div>
                  <p class="text-tips" >点击设置二维码跳转内容</p>
                </div>
              </template>
              <template v-if="item.label == 'multi_text'">
                <div  class="multi_text" :style="`top:${item.y_pos}px;left:${item.x_pos}px;`"  :ref="'div'+item.id" @mousedown="down($event,item)" @touchstart="down($event,item)" @mousemove="move($event,item)"  @mouseup="end($event,item)" @touchend="end($event,item)">
                  <div class="content" :class="item.selected == true?'selected':''" @mouseover.stop="mouseover(item,1)" @mouseout.stop="mouseout(item,1)" :style="`width:${item.width==0?'auto':item.width}px;height:${item.height==0?'auto':item.height}px;${item.style_1};font-size:${item.font_size}px;`" v-html="item.content" @click.stop="changeMultiText(item)">
                  </div>
                  <p class="text-tips"><span>点击可编辑文字</span></p>
                </div>
              </template>
            </template>
          </div>
        </section>
        <section class="opts">
          <p class="opt-hd">编辑操作区<span class="ml10">当前海报尺寸比例：{{template.o_width}}*{{template.o_height}}<template v-if="template.show_size != ''">( {{template.show_size}} )</template></span></p>
          <div v-if="showImageSection">
            <a class="upload"><input type="file" @change="localImgLoad($event)" accept="image/jpeg,image/png">上传图片</a>
            <p class="tit" style="color:#ff8519">推荐上传尺寸：{{curItem.o_width}}*{{curItem.o_width}}；支持上传10M以下png/jpg格式的图片</p>
            <p class="tit">最近上传图片：</p>
            <ul class="img-history">
              <li v-for="(item,k) in imgHistory"><img @click="changeImgValue(item.src)" :src="getImageUrl(item.src)" /></li>
            </ul>
          </div>
          <div v-if="showTextSection">
            <p class="tit"><span class="require">*</span>内容：</p>
            <input type="text" class="w400" :maxlength="textMaxLength" @input="changeTextValue($event)" v-model.trim="textValue" />
            <br />
            <br />
            字号：<input type="number" class="w60" v-model="curItem.font_size" @input ="changeFont($event)" />
          </div>
          <div v-if="showMultiTextSection">
            <p class="tit"><span class="require">*</span>内容：</p>
            <textarea class="w400" style="resize: none; " :maxlength="multiTextMaxLength" @input="changeMultiTextValue($event)" v-model="multiTextValue" ></textarea>
            <br />
            <br />
            字号：<input type="number" class="w60" v-model="curItem.font_size" @input ="changeFont($event)" />
          </div>
          <div v-if="showQrWxSection">
            <p class="tit"><span class="require">*</span>类型：</p>
            <input class="radio" type="radio" v-model="qrWxType" value="0" id="qxwx_1"><label for="qxwx_1" style="margin-right: 15px;line-height: 20px;height: 20px;vertical-align: top;">小程序码</label>
            <input class="radio" type="radio" v-model="qrWxType" value="1" id="qxwx_2"><label for="qxwx_2" style="margin-right: 15px;line-height: 20px;height: 20px;vertical-align: top;">二维码</label>
          </div>
          <div v-if="showQrSection || showWxSection || showQrWxSection">
            <p class="tit"><span class="require">*</span>跳转内容：</p>
            <p class="radio" v-if="!type1ExcludeIds.includes(template.id)"><input type="radio" name="qxwxcontent" v-model="qrWxContent.type" value="0" id="qxwxcontent_1" @click="changeType(0)"><label for="qxwxcontent_1">店铺码</label></p>
            <p class="radio" v-if="!type2ExcludeIds.includes(template.id)"><input type="radio" name="qxwxcontent" v-model="qrWxContent.type" value="1" id="qxwxcontent_2" @click="changeType(1)"><label for="qxwxcontent_2">指定商品码</label></p>
            <div class="ncsc-form-s" v-if="qrWxContent.type == 1">
              <input class="category-tit w300 orange" :readonly="readonly" v-show="readonly"  v-model.trim="searchKeyword" type="text" />
              <a class="ncsc-btn ncsc-btn-orange-rim" @click="openAddGoodsDialog()"><template v-if="!readonly">选择</template><template v-else>更换</template>商品</a>
            </div>
            <p class="radio" v-if="!type3ExcludeIds.includes(template.id)"><input type="radio" name="qxwxcontent" v-model="qrWxContent.type" value="2" id="qxwxcontent_3" @click="changeType(2)"><label for="qxwxcontent_3">指定三级分类码</label></p>
            <div class="ncsc-form-s" v-if="qrWxContent.type == 2">
              <input class="category-tit w300 orange" :readonly="readonly" v-show="readonly"  v-model.trim="searchKeyword" type="text" />
              <a class="ncsc-btn ncsc-btn-orange-rim" @click="openAddClassDialog()"><template v-if="!readonly">选择</template><template v-else>更换</template>分类</a>
            </div>
            <p class="radio" v-if="!type4ExcludeIds.includes(template.id)"><input type="radio" name="qxwxcontent" v-model="qrWxContent.type" value="3" id="qxwxcontent_4" @click="changeType(3)"><label for="qxwxcontent_4">指定组合销售活动码</label></p>
            <div class="ncsc-form-s" v-if="qrWxContent.type == 3">
              <input class="category-tit w300 orange" :readonly="readonly" v-show="readonly"  v-model.trim="searchKeyword" type="text" />
              <a class="ncsc-btn ncsc-btn-orange-rim" @click="openAddBundlingDialog()"><template v-if="!readonly">选择</template><template v-else>更换</template>活动</a>
            </div>
            <p class="radio" v-if="!type5ExcludeIds.includes(template.id)"><input type="radio" name="qxwxcontent" v-model="qrWxContent.type" value="4" id="qxwxcontent_5" @click="changeType(4)"><label for="qxwxcontent_5">指定分销码</label></p>
            <div class="ncsc-form-s" v-if="qrWxContent.type == 4">
              <input class="category-tit w300 orange" :readonly="readonly" v-show="readonly"  v-model.trim="searchKeyword" type="text" />
              <a class="ncsc-btn ncsc-btn-orange-rim" @click="openAddSale()"><template v-if="!readonly">选择</template><template v-else>更换</template>分销活动</a>
            </div>
            <div class="ncsc-form-s mt5" v-if="qrWxContent.type == 4 && this.qrWxContent.id != 0">
              <input class="category-tit w300 orange" :readonly="readonly2" v-show="readonly2"  v-model.trim="searchKeyword2" type="text" />
              <a class="ncsc-btn ncsc-btn-orange-rim" @click="openAddSaleMan(true)"><template v-if="!readonly2">选择</template><template v-else>更换</template>销售员</a>
            </div>
            <p class="radio" v-if="!type6ExcludeIds.includes(template.id)"><input type="radio" name="qxwxcontent" v-model="qrWxContent.type" value="5" id="qxwxcontent_6" @click="changeType(5)"><label for="qxwxcontent_6">指定优惠券码</label></p>
            <div class="ncsc-form-s" v-if="qrWxContent.type == 5">
              <input class="category-tit w300 orange" :readonly="readonly" v-show="readonly"  v-model.trim="searchKeyword" type="text" />
              <a class="ncsc-btn ncsc-btn-orange-rim" @click="openAddCoupon(true)"><template v-if="!readonly">选择</template><template v-else>更换</template>优惠券</a>
            </div>
          </div>
          <div class="op-bottom">
            <a class="" @click="save()" ><i class="fa fa-cloud-download icon"></i>完成编辑，保存下载海报</a>
          </div>
        </section>
      </div>
    </div>
    <el-dialog
      :visible="showGuide"
      :show-close="false"
      :close-on-click-modal="false"
      width="756px"
      :before-close="guideClose"
      customClass="hb-guide"
      :lock-scroll="lockScroll"
      :top=elTop
    >
      <div class="dialog_content">
        <div class="eject_con guide" :class="[this.template.direction == 1 ? 'horizon': 'vertical']" :style="`margin-top:${template.g_top}px;margin-left:${template.g_left}px;`"  xmlns="http://www.w3.org/1999/html">
          <div class="img">
            <img :src="getImageUrl(this.template.guide_src)" />
          </div>
          <div class="guide-btn" ><a class="guide-click" @click="guideClose"></a></div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible="showDone"
      :show-close="false"
      :close-on-click-modal="false"
      width="420px"
      customClass="no-padding phone-bind"
      :lock-scroll="lockScroll"
      top="30vh"
    >
      <div class="dialog_content">
        <div class="eject_con" xmlns="http://www.w3.org/1999/html">
         <div class="done">
           <h3>海报已生成！</h3>
           <p class="C4">已为您自动新开页面展示对应海报图片，可自行将图片另存</p>
           <a class=" btn-go" @click="goHistory()">可查看已编辑的海报>></a>
           <div class="btns">
             <a class="ncsc-btn ncsc-btn-orange-rim btn-create fl" @click="goStay()">返回，继续编辑</a>
             <a class="ncsc-btn ncsc-btn-orange btn-create fr" @click="goIndex()">制作其他海报</a>
           </div>
         </div>
        </div>
      </div>
    </el-dialog>
    <qm-tips :tipsVisible.sync="leaveDialog" :width="'420px'" @close="dialogCancelLeave()" @cancel="dialogCancelLeave()" @confirm="dialogConfirmLeave()" :confirmTxt="'离开页面'" :cancelTxt="'留在当前页'" :cancelFront="true" :confirmClass="'ncsc-btn-orange-rim'" :cancelClass="'ncsc-btn-orange'">
      <template slot="title">警告</template>
      <template slot="content">
        页面配置内容尚未提交保存<br>确定要离开当前页面吗?
      </template>
    </qm-tips>
    <qm-dialog :dialogVisible="downDialog" :width="'500px'" @close="downDialog=false" :customClass="'phone-bind'">
      <template slot="title">下载设置</template>
      <template slot="content" >
        <div class="dialog_content">
          <div class="eject_con explain_form" xmlns="http://www.w3.org/1999/html">
            <div class="ncsc-form-s" >
              <div class="ml13">
                <span  class="select-salesman-txt">下载格式：</span>
                <input id="down_type_0" name="downType" type="radio" value="0"  @click="selectType(0)" class="ncsc-custom-checkbox">
                <label for="down_type_0"  class="ncsc-custom-checkbox-txt" style="vertical-align: bottom;">JPG</label>
                <input id="down_type_1" name="downType" type="radio" value="1"  @click="selectType(1)" class="ncsc-custom-checkbox">
                <label for="down_type_1"  class="ncsc-custom-checkbox-txt" style="vertical-align: bottom;">PNG</label>
              </div>
              <div class="ml13" style="margin-top: 10px;">
                <span  class="select-salesman-txt" style="vertical-align: top;">下载用途：</span>
                <div style="display: inline-block;">
                  <input id="down_set_0" name="selectSet" type="radio" value="0"  @click="selectSet(0)" class="ncsc-custom-checkbox">
                  <label for="down_set_0"  class="ncsc-custom-checkbox-txt" style="vertical-align: bottom;">微信转发</label><br />
                  <input id="down_set_1" name="selectSet" type="radio" value="1"  @click="selectSet(1)" class="ncsc-custom-checkbox">
                  <label for="down_set_1"  class="ncsc-custom-checkbox-txt" style="vertical-align: bottom;">打印</label><span style="color: #ff8519;display: inline-block;vertical-align: bottom;margin-left: 3px;">打印版本为高清版本，需要耐心等待几分钟</span>
                </div>
              </div>
            </div>
            <div class="bottom">
              <input type="button" value="确认" class="ncsc-btn ncsc-btn-orange fr" @click="confirmDown">
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </template>
    </qm-dialog>
    <qm-goods v-if="addGoodsDialog" @close="addGoodsDialog=false" @save="saveGoods($event)" :includeItems="selectedGoods"></qm-goods>
    <qm-class-tree v-if="addClassDialog" @close="addClassDialog=false" @save="saveClass($event)" :includeItems="selectedClass"></qm-class-tree>
    <qm-bundling v-if="addBundlingDialog" @close="addBundlingDialog=false" @save="saveBundling($event)" :includeItems="selectedBundling"></qm-bundling>
    <qm-sale v-if="addSaleDialog" @close="addSaleDialog=false" @save="saveSale($event)" :includeItems="selectedSale"></qm-sale>
    <qm-sale-man v-if="addSaleManDialog" @close="addSaleManDialog=false" @save="saveSaleMan($event)" :includeItems="selectedSaleMan" @preSave="reSelectSale" :saleItem="selectSale" :reOpen="reOpen"></qm-sale-man>
    <qm-coupon v-if="addCouponDialog" @close="addCouponDialog=false" @save="saveCoupon($event)" :includeItems="selectedCoupon"></qm-coupon>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import QmTips from 'component/qm-tips/index';
  import QmDialog from 'component/qm-dialog/index';
  import {storePoster,storeGoodsClass,storeGoodsStorage,storePromotionBundling,saleAct} from 'api'
  import storage from 'lib/utils/storage'
  import fileUpload from 'lib/utils/fileUpload.js';
  import exportData from 'lib/utils/export';
  import QmBundling from 'component/qm-bundling/index';
  import QmSale from 'component/qm-sale/index';
  import QmSaleMan from 'component/qm-sale-man/index';
  import QmCoupon from 'component/qm-coupon/index';
  import QmClassTree from 'component/qm-class-tree/index';
  import QmGoods from 'component/qm-goods/index';
  import mixin from 'component/main/mixin';
  export default {
    name: "store-poster-edit",
    mixins:[mixin],
    data() {
      return {
        template:{},
        places:[],
        history_template:{},
        history_places:[],
        showGuide:false,
        pageParams:{
          template_id:0,
          history_id:0
        },
        showTextSection:false,
        textValue:'',
        textMaxLength:0,
        showMultiTextSection:false,
        multiTextValue:'',
        multiTextMaxLength:0,
        showImageSection:false,
        showQrWxSection:false,
        showQrSection:false,
        showWxSection:false,
        qrWxType:-1,//0小程序，1二维码
        qrWxContent:{
          type:-1,//0店铺码，1指定商品码，2指定三级分类码，3指定组合销售活动码，4指定销售员码，5指定优惠券码
          id:0,
          second_id:0,
          third_id:0,
          showTxt:'',
          showSecondTxt:''
        },
        curItem:{},
        originTemplate:{},
        originPlaces:[],
        confirmLeave:false,
        leaveDialog:false,
        downDialog:false,
        downType:-1,//下载格式：0jpg，1png
        downSet:-1,//下载设置：0微信转发，1我要打印
        showDone:false,
        readonly:false,
        readonly2:false,
        searchKeyword:'',
        showMoreResult:false,
        searchResultList:[],
        searchKeyword2:'',
        showMoreResult2:false,
        searchResultList2:[],
        elTop:"20vh",
        elLeft:"",
        imgHistory:[],
        type1ExcludeIds:[11,12],
        type2ExcludeIds:[11,12],
        type3ExcludeIds:[11,12],
        type4ExcludeIds:[11,12],
        type5ExcludeIds:[],
        type6ExcludeIds:[11,12],
        curType:-1,
        moveFlag:false,
        addGoodsDialog:false,
        selectedGoods:[],
        showReset:false,
        addClassDialog:false,
        selectClass:{},
        selectedClass:[],
        addBundlingDialog:false,
        selectBundling:{},
        selectedBundling:[],
        addSaleDialog:false,
        selectSale:{},
        selectedSale:[],
        addSaleManDialog:false,
        selectSaleMan:{},
        selectedSaleMan:[],
        reOpen:false,
        addCouponDialog:false,
        selectCoupon:{},
        selectedCoupon:[],
      }
    },

    computed:{
      ...mapGetters({
        ImageIp:'getImageIp',
        metaData:'getMetaData',
        imagePathConfig:'getImagePathConfig',
      }),
      bdStyle:function () {
        if(this.template.background_src){
          const src = this.getImageUrl(this.template.background_src)
          return `width:${this.template.width}px;;height:${this.template.height}px;background-image:url(${src});`
        }
      }
    },

    components: {
      QmTips,
      QmDialog,
      QmGoods,
      QmBundling,
      QmSale,
      QmSaleMan,
      QmCoupon,
      QmClassTree
    },
    methods: {
      //--------------------弹窗部分start--------------------//
      openAddGoodsDialog() {
        let data = {
          type:'store_coupon'
        }
        storeGoodsClass.searchGoods(data).then(res =>{
          if(res.responseContent.total > 0){
            this.addGoodsDialog = true;
          }else{
            layer.msg('店铺内暂无出售中的商品，请先进行商品上架')
          }
        });

      },
      saveGoods(item){
        if(item.length == 0){
          layer.msg('请选择二维码对应跳转商品')
          return;
        }
        this.selectedGoods = item
        this.selectResult(this.selectedGoods[0])
        this.addGoodsDialog = false;
      },
      clearGoods(){
        this.selectedGoods = []
      },
      openAddClassDialog(){
        this.addClassDialog = true
      },
      closeAddClassDialog(){
        this.addClassDialog = false
      },

      saveClass(item){
        this.selectClass = item
        this.selectedClass = [item]
        if(!this.selectClass.hasOwnProperty('gc_id_1')){
          layer.msg('请选择需要跳转的分类')
          return;
        }
        this.selectResult(this.selectClass)
        this.closeAddClassDialog()
      },

      openAddBundlingDialog(){
        let data ={
          'widthOutEnd':1
        }
        storePromotionBundling.bundlingList(data).then(res => {
          if (res.total > 0) {
            this.addBundlingDialog = true;
          } else {
            layer.msg('当前没有可选择的组合销售活动，请先前往配置')
            return;
          }
        })
      },
      saveBundling(item){
        this.selectBundling = item
        if(!this.selectBundling.hasOwnProperty('bl_id')){
          layer.msg('请选择需要跳转的组合销售活动')
          return;
        }
        this.selectedBundling = [item]
        this.selectResult(this.selectBundling)
        this.addBundlingDialog = false;
      },

      openAddSale(){
        let data ={
          'widthOutEnd':1
        }
        saleAct.getList(data).then(res => {
          if (res.total > 0) {
            this.addSaleDialog = true;
          } else {
            layer.msg('当前没有可选择的分销活动，请先前往配置')
            return;
          }
        })
      },
      saveSale(item){
        this.selectSale = item
        if(!this.selectSale.hasOwnProperty('sale_act_id')){
          layer.msg('请选择分销活动')
          return;
        }
        this.selectedSale = [item]
        //this.selectResult(this.selectSale)
        this.addSaleDialog = false;
        this.selectedSaleMan = []
        this.openAddSaleMan(false)
      },
      reSelectSale(){
        this.addSaleManDialog = false;
        this.openAddSale()
      },
      openAddSaleMan(re){
        this.reOpen = re
        this.addSaleManDialog = true;
      },
      saveSaleMan(item){
        this.selectSaleMan = item
        if(!this.selectSaleMan.hasOwnProperty('sale_id')){
          layer.msg('请选择销售员')
          return;
        }
        this.selectedSaleMan = [item]
        this.selectResult(this.selectSale)
        this.selectResult(this.selectSaleMan,true)
        this.addSaleManDialog = false;
      },

      openAddCoupon(){
        storePoster.searchCouponList().then(res => {
          if (res.total > 0) {
            this.addCouponDialog = true;
          } else {
            layer.msg('当前不存在有效的优惠券，请先前往配置')
            return;
          }
        })
      },
      saveCoupon(item){
        this.selectCoupon = item
        if(!this.selectCoupon.hasOwnProperty('id')){
          layer.msg('请选择优惠券')
          return;
        }
        this.selectedCoupon = [item]
        this.selectResult(this.selectCoupon)
        this.addCouponDialog = false;
      },
      //--------------------弹窗部分end--------------------//

      changQrWx(item){
        if(this.canChange(item)){
          this.showQrWxSection = true;
        }
      },
      changeImage(item){
        if(this.canChange(item)){
          this.showImageSection = true
          this.curItem = item
        }
      },
      changeText(item){
        this.resetSection()
        if(this.canChange(item)){
          this.showTextSection = true
          this.curItem = item
          this.textValue = item.content
          this.textMaxLength = item.max_length
        }
      },
      changeMultiText(item){
        this.resetSection()
        if(this.canChange(item)){
          this.showMultiTextSection = true
          this.curItem = item
          this.multiTextValue = item.content.replace(new RegExp(/<br>/g),'\n')
          this.multiTextValue = this.multiTextValue.replace(new RegExp(/&nbsp;/g),' ')
          this.multiTextMaxLength = item.max_length
        }
      },
      canChange(item){
        this.resetSection()
        return item.can_change == 1;
      },
      changeBg(){
        if(this.template.can_modify_background == 1){
          this.resetSection()
          if(this.template.type == 'qrcode' || this.template.type == 'wxcode'){
            this.showQrSection = true;
          }
        }
      },
      changeImgValue(src){
        this.curItem.content = src
      },
      changeTextValue(e){
        if(e.target.value == ''){
          let orgin_content = '';
          this.originPlaces.forEach((item,i)=>{
            if(item.id == this.curItem.id){
              orgin_content = item.content
            }
          })
          this.curItem.content = orgin_content
        }else{
          this.curItem.content = this.textValue
        }
      },
      changeMultiTextValue(e){
        if(e.target.value == ''){
          let orgin_content = '';
          this.originPlaces.forEach((item,i)=>{
            if(item.id == this.curItem.id){
              orgin_content = item.content
            }
          })
          this.curItem.content = orgin_content
        }else{
          this.curItem.content = this.multiTextValue
        }
        this.curItem.content = this.curItem.content.replace(new RegExp(/\n/g),'<br>')
        this.curItem.content = this.curItem.content.replace(new RegExp(/\s/g),'&nbsp;')
      },
      changeFont(e){
        if(e.target.value != ''){
          if(e.target.value < 1){
            this.curItem.font_size = 1;
          }else if(e.target.value > 99){
            this.curItem.font_size = 99;
          }
        }

      },
      changeTemplate(){
        this.$router.push("/promotion/store_poster/index")
      },
      resetSection(){
        this.showQrSection =false
        this.showTextSection = false
        this.showQrWxSection = false
        this.showImageSection = false
        this.showWxSection = false
        this.showMultiTextSection = false
      },
      localImgLoad(event) {
        let size = event.target.files[0].size
        size = size/(1024*1024)
        if(size > 10){
          layer.msg('图片大小超过限制');
          return;
        }
        var key = this.metaData.key;
        var type = 9;
        fileUpload.logoLoad(event,key,type,this.uploadFile).then(res => {
          layer.msg('上传成功')
          let tmpPath = res.imgPath.split('/');
          if(tmpPath.length > 1){
            let src = tmpPath[1];
            //默认
            this.curItem.content = src
            this.imgHistory.unshift({src})
            this.imgHistory = this.imgHistory.slice(0,5);
            storePoster.saveImgHistory({'template_id':this.pageParams.template_id,'history_id':this.pageParams.history_id,'src':src})
          }
        })
      },
      mouseover(item,type){
        this.resetSelected()
        let tmp_template = _.clone(this.template)
        let tmp_places = _.clone(this.places)
        if(type == 0){
          if(this.template.can_modify_background == 1){
            tmp_template.selected = true
          }
        }else{
          if(item.can_change == 1){
            tmp_places.forEach((place,i)=>{
              if(place.id == item.id){
                tmp_places[i].selected = true;
              }
            })
          }

        }
        this.template = tmp_template
        this.places = tmp_places
      },
      mouseout(item,type){
        this.resetSelected()
      },
      resetSelected(){
        let tmp_template = _.clone(this.template)
        let tmp_places = _.clone(this.places)
        tmp_template.selected = false;
        tmp_places.forEach((item,i)=>{
          tmp_places[i].selected = false;
        })
        this.template = tmp_template
        this.places = tmp_places
      },
      save(){
        let tempType = this.template.type;
        console.log(this.qrWxType)
        if(tempType == 'qrcode'){
        }else if(tempType == 'book'){
          if(this.qrWxType == -1){
            layer.msg('请配置海报中的二维码类型')
            return;
          }
        }
        let chk = this.checkWxQr()
        let chk2 = this.checkPlace()
        if(false === chk){
          return;
        }
        if(false === chk2){
          layer.msg('请配置文字的字体大小')
          return;
        }
        this.downDialog = true
      },
      checkPlace(){
        let flag = true;
        this.places.forEach((item,k)=>{
          if((item.label == 'multi_text' || item.label == 'text') && item.font_size == ''){
            flag = false
          }
        })
        return flag
      },
      checkWxQr(){
        let flag = true;
        if(this.qrWxContent.type == -1){
          layer.msg('请配置海报中的二维码跳转内容')
          flag = false;
        }else if(this.qrWxContent.type == 1 && this.qrWxContent.id == 0 ){
          layer.msg('请选择商品')
          flag = false;
        }else if(this.qrWxContent.type == 2 && this.qrWxContent.id == 0 ){
          layer.msg('请选择三级分类')
          flag = false;
        }else if(this.qrWxContent.type == 3 && this.qrWxContent.id == 0 ){
          layer.msg('请选择组合销售活动')
          flag = false;
        }else if(this.qrWxContent.type == 4 && this.qrWxContent.id == 0 ){
          layer.msg('请选择分销活动')
          flag = false;
        }else if(this.qrWxContent.type == 4 && this.qrWxContent.id > 0 && this.qrWxContent.second_id == 0 ){
          layer.msg('请选择销售员')
          flag = false;
        }else if(this.qrWxContent.type == 5 && this.qrWxContent.id == 0 ){
          layer.msg('请选择优惠券')
          flag = false;
        }
        return flag
      },
      selectType(type){
        this.downType = type;
      },
      selectSet(set){
        this.downSet = set;
      },
      changeType(type){
        if(type == this.curType){
          return;
        }
        this.clearGoods();
        this.curType = type;
        this.searchKeyword = ''
        this.searchKeyword2 = ''
        this.readonly = false
        this.readonly2 = false
        this.showMoreResult = false
        this.searchResultList = []
        this.qrWxContent.id = 0
        this.qrWxContent.showTxt = ''
        this.qrWxContent.second_id = 0
        this.qrWxContent.third_id = 0
        this.qrWxContent.showSecondTxt = ''
        if(2 === type){
          this.selectedClass = []
        }
        if(3 === type){
          this.selectedBundling = []
        }
        if(4 === type){
          this.selectedSale = []
          this.selectedSaleMan = []
        }
        if(5 === type){
          this.selectedCoupon = []
        }
      },
      confirmDown(){
        if(this.downType == -1){
          layer.msg('请选择下载格式')
          return
        }
        if(this.downSet == -1){
          layer.msg('请选择下载用途')
          return
        }
        if(this.template.type == 'qrcode'){
          this.template.qr_wx_content_type = this.qrWxContent.type
        }
        let tmp = [{
          'id':this.pageParams.template_id,
          'history_id':this.pageParams.history_id,
          'background_src':this.template.background_src,
          'qr_wx_content_type':this.qrWxContent.type,
          'qr_wx_content_id': this.qrWxContent.id,
          'qr_wx_content_second_id':this.qrWxContent.second_id,
          'qr_wx_content_third_id':this.qrWxContent.third_id,
          'qr_wx_type':this.qrWxType,
          'show_txt':this.searchKeyword,
          'show_second_txt':this.searchKeyword2
        }]
        let data ={
          'template':tmp,
          'places':JSON.stringify(this.places),
          'down_type':this.downType,
          'down_set':this.downSet
        }
        this.downDialog = false
        layer.load(0,{ shade: [0.5,'#000']})
        storePoster.saveTemplate(data).then((res)=>{
          layer.closeAll()
          if(res.resultCode == 1){
            this.pageParams.history_id = res.responseContent.history_id
            this.showDone = true
            window.open(this.getImageUrl(res.responseContent.href), '_blank');
          }else{
            layer.msg(res.shortMessage);
          }
        })
      },
      checkChange(){console.log(this.qrWxContent.type)
        let tempType = this.template.type;
        if(this.qrWxContent.type > -1){
          return true;
        }
        if(this.originTemplate.background_src != this.template.background_src){
          return true
        }
        let chk = false
        if(this.originPlaces.length > 0){
          this.originPlaces.forEach((item,i) => {
            this.places.forEach((item2,i2)=>{
              if(item2.id == item.id){
                if(item.can_change == 1 && item.content != item2.content){
                  chk = true
                  return;
                }
              }
            })
          })
        }

        return chk;
      },
      dialogCancelLeave() {
        this.leaveDialog = false;
        this.changeMenu('promotion','store_poster');
        this.$parent.curUrl = 'edit';
      },
      async dialogConfirmLeave() {
        //保存并离开
        /*let res = await this.onlySave()
        if(res.resultCode == 1){

        }*/
        this.nextFun();
      },
      onlySave(){
        let tmp = [{
          'id':this.pageParams.template_id,
          'history_id':this.pageParams.history_id,
          'background_src':this.template.background_src,
          'qr_wx_content_type':this.qrWxContent.type,
          'qr_wx_content_id': this.qrWxContent.id,
          'qr_wx_content_second_id':this.qrWxContent.second_id,
          'qr_wx_type':this.qrWxType,
          'show_txt':this.searchKeyword,
          'show_second_txt':this.searchKeyword2,
          'only_save':1,
        }]
        let data ={
          'template':tmp,
          'places':JSON.stringify(this.places),
          'down_type':this.downType,
          'down_set':this.downSet,
        }
        return storePoster.saveTemplate(data)
      },
      guideClose(){
        this.showGuide = false
      },
      goIndex(){
        this.confirmLeave = true;
        this.$router.push("/promotion/store_poster/index")
      },
      goHistory(){
        this.confirmLeave = true;
        this.$router.push("/promotion/store_poster/poster_history")
      },
      goStay(){
        this.showDone = false;
      },
      getImageUrl(src){
        return this.ImageIp+'mb/'+src;
      },
      clearSelect(second){
        if(second){
          this.readonly2 = false;
          this.qrWxContent.second_id = 0
          this.qrWxContent.third_id = 0
          this.searchKeyword2 = ''
        }else{
          this.readonly2 = false;
          this.qrWxContent.second_id = 0
          this.qrWxContent.third_id = 0
          this.searchKeyword2 = ''
          this.readonly = false;
          this.qrWxContent.id = 0
          this.searchKeyword = ''
        }

      },
      selectResult(item,second){
        this.showMoreResult = false
        this.searchResultList = []
        this.readonly = true;
        if(this.qrWxContent.type == 1){
          this.qrWxContent.id = item.goods_commonid
          this.qrWxContent.second_id = item.goods_id
          //this.qrWxContent.showTxt = item.goods_name
          this.searchKeyword = item.goods_commonid+' - '+item.goods_name
        }else if(this.qrWxContent.type == 2){
          this.qrWxContent.id = item.gc_id
          this.searchKeyword = item.f_gc_name
        }else if(this.qrWxContent.type == 3){
          this.qrWxContent.id = item.bl_id
          this.searchKeyword = item.bl_name
        }else if(this.qrWxContent.type == 4){
          if(second){
            this.readonly2 = true;
            this.showMoreResult2 = false
            this.searchResultList2 = []
            this.qrWxContent.second_id = item.sale_id;
            this.qrWxContent.third_id = item.store_sale_id;//太坑
            this.searchKeyword2 = item.store_sale_id+' - '+item.member_name+(item.member_mobile == ''? '' : ' - '+ item.member_mobile )
          }else{
            this.readonly2 = false;
            this.qrWxContent.id = item.sale_act_id
            this.searchKeyword = item.sale_act_id + ' - ' + item.sale_title
            this.qrWxContent.second_id = 0;
            this.qrWxContent.third_id = 0
            this.searchKeyword2 = ''
          }
        }else if(this.qrWxContent.type == 5){
          this.qrWxContent.id = item.id
          this.searchKeyword = item.name+'('+item.typeName+')'
        }
      },
      searchGoods(e){
        this.showMoreResult = false;
        if(this.searchKeyword != ''){
          let data = {
            'keyword':this.searchKeyword
          }
          this.showMoreResult = true;
          storePoster.searchGoods(data).then((res)=>{
            this.searchResultList = res.list
          })
        }

      },
      searchClass_bak(e){
        this.showMoreResult = false
        if(this.searchKeyword != ''){
          let data ={
            'keyword' : this.searchKeyword
          }
          this.showMoreResult = true;
          storePoster.searchClass(data).then(res=> {
            this.searchResultList = res.list
          })
        }
      },
      searchBundlingList(e){
        this.showMoreResult = false
        if(this.searchKeyword != ''){
          let data ={
            'keyword' : this.searchKeyword
          }
          this.showMoreResult = true;
          storePoster.searchBundlingList(data).then(res=> {
            this.searchResultList = res.list
          })
        }
      },
      searchSaleActList(e){
        this.showMoreResult = false
        this.searchKeyword2 = ''
        this.showMoreResult2 = false
        if(this.searchKeyword != ''){
          let data ={
            'keyword' : this.searchKeyword
          };
          this.showMoreResult = true;
          storePoster.searchSaleActList(data).then(res=> {
            this.searchResultList = res.list
          })
        }
      },
      searchSaleActMan(e){
        this.showMoreResult2 = false
        if(this.searchKeyword2 != ''){
          let data ={
            'keyword' : this.searchKeyword2,
            'sale_act_id':this.qrWxContent.id
          }
          this.showMoreResult2 = true;
          storePoster.searchSaleActMan(data).then(res=> {
            this.searchResultList2 = res.list
          })
        }
      },
      searchCouponList(e){
        this.showMoreResult = false
        if(this.searchKeyword != ''){
          let data ={
            'keyword' : this.searchKeyword,
          }
          this.showMoreResult = true;
          storePoster.searchCouponList(data).then(res=> {
            this.searchResultList = res.list
          })
        }
      },
      getPageData(data){
        storePoster.getTemplate(data).then((res)=>{
          this.template = res.responseContent.template
          this.places = res.responseContent.places
          this.imgHistory = res.responseContent.img_history
          if(!this.imgHistory){
            this.imgHistory = [];
          }
          //this.history_template = res.responseContent.history_template
          //this.history_places = res.responseContent.history_places
          if(this.pageParams.history_id == 0){
            this.showGuide = true
          }else{
            this.template.background_src = res.responseContent.history_template.background_src
            this.places.forEach((item,i) => {
              if(item.can_change == 1){
                res.responseContent.history_places.forEach((item2,i2) => {
                  if(item2.place_id == item.id){
                    this.places[i].content = item2.content
                    this.places[i].x_pos = item2.x_pos
                    this.places[i].y_pos = item2.y_pos
                    this.places[i].font_size = item2.font_size
                  }
                })
              }
            })
          }
          this.originTemplate = JSON.parse(JSON.stringify(this.template))
          this.originPlaces = JSON.parse(JSON.stringify(this.places))
          this.resetSelected()
          let label = '';
          if(this.template.can_modify_background){
            this.template.selected = true;
            this.changeBg()
          }else{
            let tmp_places = _.clone(this.places)
            tmp_places = tmp_places.sort(function(a,b){return a.sort - b.sort;})
            for(let i=0;i<tmp_places.length;i++){
              if(tmp_places[i].can_change == 1){
                tmp_places[i].selected = 1;
                this.curItem = tmp_places[i]
                label = tmp_places[i].label
                break;
              }
            }
            switch (label) {
              case 'multi_text':
                this.changeMultiText(this.curItem);
                break;
              case 'qr_wx':
                this.changQrWx(this.curItem);
                break;
              case 'img':
                this.changeImage(this.curItem);
                break;
              case 'text':
                this.changeText(this.curItem)
                 break;
            }
            this.places = tmp_places
          }
          if(res.responseContent.history_qr_wx != false && res.responseContent.history_qr_wx.hasOwnProperty('id')){
            let history_qr_wx = res.responseContent.history_qr_wx
            //回填
            this.qrWxType = history_qr_wx.qr_wx_type
            this.qrWxContent.type = history_qr_wx.qr_wx_content_type
            this.qrWxContent.id = history_qr_wx.qr_wx_content_id
            this.qrWxContent.second_id = history_qr_wx.qr_wx_content_second_id
            this.qrWxContent.third_id = history_qr_wx.qr_wx_content_third_id
            this.searchKeyword = history_qr_wx.show_txt
            this.searchKeyword2 = history_qr_wx.show_second_txt
            if(this.qrWxContent.type == 4){
              this.readonly2 = true
            }
            this.readonly = true
            this.curType = history_qr_wx.qr_wx_content_type
            switch (this.qrWxContent.type) {
              case 1:
                let txt = this.searchKeyword.split(' - ');
                this.selectedGoods = [{'goods_commonid':this.qrWxContent.id,goods_id:this.qrWxContent.second_id,'goods_name':txt[1]}]
                break;
              case 2:
                this.selectedClass = [{gc_id:this.qrWxContent.id}]
                break;
              case 3:
                this.selectedBundling = [{'bl_id':this.qrWxContent.id}]
                break;
              case 4:
                this.selectedSale = [{'sale_act_id':this.qrWxContent.id}]
                this.selectSale = {'sale_act_id':this.qrWxContent.id}
                this.selectedSaleMan = [{'store_sale_id':this.qrWxContent.third_id}]
                break;
              case 5:
                this.selectedCoupon = [{'id':this.qrWxContent.id}]
                break;

            }
          }
        })
      },
      down(e,item){
        this.curItem = item
        this.moveFlag =true
        if(item.can_change == 1){
          //this.$refs[`div${this.curItem.id}`][0].children[0].style.cursor='move'
        }
      },
      move(e){
        return;
        if(this.curItem.can_change == 1){
          //阻止页面的滑动默认事件
          document.addEventListener("mousemove",function(){ // 1.2 如果碰到滑动问题，请注意是否获取到 touchmove
            e.preventDefault();
            e.stopPropagation(); // 如果没有引入jq 就用 stopPropagation()
          },false);
          if(this.moveFlag){console.log(this.curItem.x_pos)
            if(this.curItem.x_pos < 0){
              this.curItem.x_pos = 0
            }else if(this.curItem.y_pos < 0){
              this.curItem.y_pos = 0
            }else if(this.curItem.x_pos + this.curItem.width > this.template.width){
              this.curItem.x_pos = this.curItem.x_pos-1
            }else if(this.curItem.y_pos + this.curItem.height > this.template.height){
              this.curItem.y_pos = this.curItem.y_pos-1
            }else{
              this.curItem.x_pos += e.movementX;
              this.curItem.y_pos += e.movementY;
            }

          }
        }

      },
      end(e){
        this.moveFlag =false
        this.curItem = {}
        e.target.style.cursor=''
      }
    },
    watch:{

    },
    mounted () {
      this.pageParams.template_id = storage.get('template_id');
      this.pageParams.history_id = storage.get('history_id');
      var _self = this;
      this.getPageData(this.pageParams);
      layui.use('layer', function(){
        this.layer = layui.layer;
      });
    },
    beforeDestroy(){

    },
    updated(){
    },
    beforeRouteLeave (to, from, next) {
      if(!this.confirmLeave && this.checkChange() && to.name !== 'login') {
        next(false);
        this.nextFun = next;
        this.leaveDialog = true;
      }else{
        next()
      }

    }
  }
</script>
