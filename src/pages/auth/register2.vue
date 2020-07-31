<style>
  select{
    font-size: 14px!important;
  }
  #choose-area div{
    display: inline-block;
  }
  .shop-photo div{
    display: inline-block;
  }

  .search-box{
    background: none!important;
    width:50%!important;
  }

 .search-box li {
    width: auto;
    white-space: nowrap;
  }
  .el-vue-search-box-container{
    height: 29px!important;
  }
  #myPageTop{
    width:26%;
    border: 1px solid #e8e8e8!important;
  }
  .el-vue-search-box-container .search-box-wrapper input{
    width:200%;
    height: 0px!important;
    border: 1px solid #ebebeb;
  }
  .el-vue-search-box-container .search-box-wrapper{
    height: 0px!important;
  }
  .el-vue-search-box-container .search-tips{
    top: 0px!important;
  }
  .el-vue-search-box-container .search-tips{
    border:none!important;
  }
  .el-vue-search-box-container{
    box-shadow: none!important;
  }
  .ncsc-upload-btn .input-file, .input-file{
    font-size:16px!important;
  }
</style>
<style>
  .el-vue-search-box-container .search-btn{
    display: none!important;
  }
  .ico-upload{
    display: block!important;
  }
  .map-tip{
    padding-right: 20px;
  }
  .map-hr{
    background-color:#99adce!important;
    height: 1px;
    border:none;
    margin: 5px 0px!important;
  }
  .map-small{
    font-size:12px;
    color:#adadad;
    white-space:nowrap;
  }
  .tip-doubt .tip-doubt-con{
    left: 25px!important;
  }
  .map-point{
    position:relative;
    color:#fff;
  }
  .map-point span{
    position:absolute;
    left:35%;
    top:8%;
    font-size:10px;
  }
  .class-btn{
    color:#fff;
    float: right;
    background-color: rgb(255, 133, 25);
    text-align: center;
    width:40px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    border-radius:5px;
    margin-top: 5px;
  }
  .map-red span{
    left:15%!important;
  }
  .amap-copyright,.amap-logo{
    z-index: 0!important;
  }
  #ul-list{
    background-color: #fff;
    padding:10px;
    max-width:250px;
    max-height: 322px;
    overflow:auto;
  }
  .el-vue-search-box-container .search-tips ul{
    max-height: 347px;
  }
   .li-title{
    background-color:#ffc834;
    color:rgb(255, 133, 25);
   padding:3px 0px 3px 10px;
     width:100%;
  }
  #ul-list .li-tip{
    display:inline-block;
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:#0093fa;
    color:#fff;
    text-align: center;
  }
  #ul-list .li-div p{
    white-space:nowrap
  }
  #ul-list li{
    cursor:pointer;
    border-bottom: 1px dashed #757575;
    padding:5px;
  }
  #ul-list .li-div{
    width:80%;
    display: inline-block;
    vertical-align: middle;
  }
  .tip-doubt .tip-doubt-span{
    left: 45px!important;
  }
</style>
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
          <ul class="list-flow list-flow-reg s2">
            <li class="item1 first">
              <i class="line"></i>
              <i class="circle"></i>
              <p class="num">1</p>
              <a @click="doRouter('/register')" class="link">填写店铺登录信息</a>
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
          <div class="msg-check" v-if="list.reason_info != '' && list.reason_info != null && list.reason_info != undefined">
            <div class="msg-in">
              <div class="msg-tit"><b>审核意见：</b></div>
              <div class="msg-txt">{{list.reason_info}}</div>
            </div>
          </div>
          <form id="form_register" action="" method="post" >
            <div class="form-item form-item-inline" style="margin-top: 30px" v-if="list.can_invite">
              <p class="form-tit">邀请人手机号</p>
              <div class="form-box w300">
                <input type="text" id="inviter_tel" name="inviter_tel" autocomplete="off"  @change="checkMobile()" v-model.trim="subData.inviter_tel">
              </div>
              <p class="form-tip">填写邀请您注册“我的身边店”用户的手机号<br>如果没有，请您填写17759887501</p>
              <p class="error-msg inviter_tel_error" style="display:block" v-show="validData.inviter_tel"></p>
            </div>
            <div class="form-list">
              <div class="mod-section">
                <div class="mod-hd">
                  <div class="tit">门店信息</div>
                </div>
                <div class="mod-bd">
                  <div class="form-item form-item-inline">
                    <p class="form-tit">门店名称<span class="c-gray fs14"> (简称)</span></p>
                    <div class="form-box w300">
                      <input type="text" id="store_name" name="store_name" maxlength="16" value="" autocomplete="off" v-model.trim="subData.store_name">
                    </div>
                    <p class="error-msg" style="display:block" v-show="validData.store_name">门店名称不能为空</p>
                  </div>
                  <div class="form-item form-item-inline">
                    <p class="form-tit">店铺电话<span class="c-gray fs14 ml10">选填</span></p>
                    <div class="form-box w100">
                      <input @change="changeZoonTel()" id="store_zone_tel_start" name="store_zone_tel_start" type="text"  value="" placeholder="区号" autocomplete="off" v-model.trim="subData.store_zone_tel_start" />
                    </div>
                    <div class="sep">-</div>
                    <div class="form-box w150">
                      <input @change="changeZoonTel()" id="store_zone_tel_end"  name="store_zone_tel_end"  type="text"  value="" placeholder="固定电话号码" autocomplete="off" v-model="subData.store_zone_tel_end" />
                    </div>
                    <p class="error-msg error-store-zone-tel" style="display:block;"></p>
                  </div>
                  <div class="form-item form-file form-item-inline">
                    <p id="test" class="form-tit">门脸照片</p>
                    <ul class="list-file">
                      <div class="ncsc-upload-img-item ib-vm">
                        <div class="ncsc-upload-btn" v-if="!subData.shop_front_photo" id="shop-front-photo-div">
                          <a href="javascript:void(0);">
                            <input type="file" accept="image/gif, image/jpeg, image/png, image/bmp" class="input-file" name="shop_front_photo" id="shop_front_photo" @change="localImgLoad($event,'shop_front_photo')">
                            <p><i class="ico-upload"></i>图片上传</p>
                          </a>
                        </div>
                        <div class="ncsc-upload-img-box" v-else>
                          <div class="ncsc-upload-avatar js-tips-img">
                            <a>
                              <img nctype="idcard_reverse" :src="ImageIp+imagePathConfig.Register+subData.shop_front_photo" @click="showImageDetil(ImageIp+imagePathConfig.Register+subData.shop_front_photo)">
                            </a>
                          </div>
                          <div class="image-delete" @click="deleteImage('shop_front_photo')">×</div>
                        </div>
                      </div>
                      <p class="error-msg" style="display:block" v-show="validData.shop_front_photo">门脸照片不能为空</p>
                    </ul>
                  </div>
                  <div class="form-item form-file form-item-inline">
                    <p class="form-tit">商户logo</p>
                    <ul class="list-file">
                      <div class="ncsc-upload-img-item ib-vm">
                        <div class="ncsc-upload-btn" v-if="!subData.store_label_pic">
                          <a href="javascript:void(0);">
                            <input type="file" class="input-file" accept="image/gif, image/jpeg, image/png, image/bmp" name="store_label_pic" id="store_label_pic" @change="localImgLoad($event,'store_label_pic')">
                            <p><i class="ico-upload"></i>图片上传</p>
                          </a>
                        </div>
                        <div class="ncsc-upload-img-box" v-else>
                          <div class="ncsc-upload-avatar js-tips-img">
                            <a>
                              <img nctype="idcard_reverse" :src="ImageIp+imagePathConfig.storeLabel+subData.store_label_pic" @click="showImageDetil(ImageIp+imagePathConfig.storeLabel+subData.store_label_pic)">
                            </a>
                          </div>
                          <div class="image-delete" @click="deleteImage('store_label_pic')">×</div>
                        </div>
                      </div>
                      <p class="error-msg" style="display:block" v-show="validData.store_label_pic">商户logo不能为空</p>
                    </ul>
                    <p class="form-tip ml10">建议上传的标准尺寸：200*200<br>如没有，可暂时使用门脸照片或者其他有辨识度的照片<br>后期还可自行修改</p>
                  </div>
                  <div class="form-item form-file">
                    <p class="form-tit">店内照片</p>
                    <ul class="list-file shop-photo">
                      <div class="ncsc-upload-img-item ib-vm">
                        <div class="ncsc-upload-btn" v-if="!subData.shop_photo_0 || subData.shop_photo_0 == 'undefined'">
                          <a href="javascript:void(0);">
                            <input type="file" class="input-file" accept="image/gif, image/jpeg, image/png, image/bmp" name="shop_photo_0" id="shop_photo_0" @change="localImgLoad($event,'shop_photo_0')">
                            <p><i class="ico-upload"></i>图片上传</p>
                          </a>
                        </div>
                        <div class="ncsc-upload-img-box" v-else>
                          <div class="ncsc-upload-avatar js-tips-img">
                            <a>
                              <img nctype="idcard_reverse" :src="ImageIp+imagePathConfig.Register+subData.shop_photo_0" @click="showImageDetil(ImageIp+imagePathConfig.Register+subData.shop_photo_0)">
                            </a>
                          </div>
                          <div class="image-delete" @click="deleteImage('shop_photo_0')">×</div>
                        </div>
                      </div>
                      <div class="ncsc-upload-img-item ib-vm">
                      <div class="ncsc-upload-btn" v-if="!subData.shop_photo_1 || subData.shop_photo_1 == 'undefined'">
                        <a href="javascript:void(0);">
                          <input type="file" class="input-file" accept="image/gif, image/jpeg, image/png, image/bmp" name="shop_photo_1" id="shop_photo_1" @change="localImgLoad($event,'shop_photo_1')">
                          <p><i class="ico-upload"></i>图片上传</p>
                        </a>
                      </div>
                      <div class="ncsc-upload-img-box" v-else>
                        <div class="ncsc-upload-avatar js-tips-img">
                          <a>
                            <img nctype="idcard_reverse" :src="ImageIp+imagePathConfig.Register+subData.shop_photo_1" @click="showImageDetil(ImageIp+imagePathConfig.Register+subData.shop_photo_1)">
                          </a>
                        </div>
                        <div class="image-delete" @click="deleteImage('shop_photo_1')">×</div>
                      </div>
                    </div>
                      <div class="ncsc-upload-img-item ib-vm">
                        <div class="ncsc-upload-btn" v-if="!subData.shop_photo_2 || subData.shop_photo_2 == 'undefined'">
                          <a href="javascript:void(0);">
                            <input type="file" class="input-file" accept="image/gif, image/jpeg, image/png, image/bmp" name="shop_photo_2" id="shop_photo_2" @change="localImgLoad($event,'shop_photo_2')">
                            <p><i class="ico-upload"></i>图片上传</p>
                          </a>
                        </div>
                        <div class="ncsc-upload-img-box" v-else>
                          <div class="ncsc-upload-avatar js-tips-img">
                            <a>
                              <img nctype="idcard_reverse" :src="ImageIp+imagePathConfig.Register+subData.shop_photo_2" @click="showImageDetil(ImageIp+imagePathConfig.Register+subData.shop_photo_2)">
                            </a>
                          </div>
                          <div class="image-delete" @click="deleteImage('shop_photo_2')">×</div>
                        </div>
                      </div>
                    </ul>
                    <p class="error-msg" style="display:block" v-show="validData.shop_photo">店内照片需要2~3张</p>
                  </div>
                    <p class="form-tit mb5" @click="select()">门店地址</p>
                    <div id="choose-area" style="position: relative;">
                        <qm-area  v-if="area_show" :province="subData.province" :city="subData.city" :district="subData.district" @valueChange="areaValueChange($event)"> </qm-area>
                        <div id="myPageTop" style="position:absolute;top:182px;left:0px" v-if="map_show">
                          <el-amap-search-box ref="childSearch" :default="subData.store_address" class="search-box"  :searchOption="searchOption"  :on-search-result="onSearchResult"></el-amap-search-box>
                        </div>
                      <div v-show="markers.length > 0 && map_show" style="position:absolute;top:183px;left:0px;z-index: 1">
                        <div class="li-title">请选择门店地址</div>
                        <ul id="ul-list">
                          <li v-for="(marker, index) in markers" v-if="marker.title" @click="currentAddress.is_detail = false;markerClick(index,marker)">
                            <div class="li-tip">{{index}}</div>
                            <div class="li-div">
                              <p v-show="marker.title">{{marker.title}}</p>
                              <p class="c-gray" v-show="marker.address">{{marker.address}}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  <div class="form-box"  style="display:none;" id="resetCityZone">
                    <input type="text" name="store_subaddress" :value="subData.store_address" autocomplete="off" maxlength="32" placeholder="请输入详细地址信息，如楼栋号、单元等信息">
                    <input name="province" id="province" type="hidden" :value="subData.province"/>
                    <input name="city" id="city" type="hidden" :value="subData.city"/>
                    <input name="district" id="district" type="hidden" :value="subData.district"/>
                  </div>
                  <div class="form-item">
                    <p class="form-tit" style="margin-top: 8px;">门店详细地址</p>
                    <span class="c-gray fs14" style="margin:3px 0px;display: inline-block">该地址将用于店铺经营时到店自提使用，请在地图上标记店铺地址，请确保地址正确性。PS：无需包含省市区 如：楼栋号、单元等信息</span>
                    <input type="hidden" id="store_coordinate" v-model.trim="subData.store_coordinate"></input>
                    <div class="form-box" style="margin-top: 3px;width:72%;">
                      <input ref="test" type="text" maxlength="50" id="store_address" autocomplete="off" placeholder="文本地址需与许可证上的营业场所一致，否则审核不通过" value="" name="store_address" v-model.trim="subData.store_address">
                    </div>
                    <div @click="getDeailAddress()" style="position: absolute;font-size: 12px;left:74%;bottom:50px;cursor: pointer;">
                    <img style="width:20px;height:20px;" src="~@/assets/images/map_location.png" alt="身边店">
                      <div class="tip-doubt tip-doubt-word tip-l tip-notit">
                        <p class="tip-tit"><span class="c-orange">去定位</span></p>
                        <div class="tip-doubt-con tip-doubt-span">
                          <div class="tip-txt fs12">
                            <p class="c-orange">该地址将用于店铺经营时到店自提使用，请在<br>地图上标记店铺地址，请确保地址正确性！</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="error-msg error-address" style="display:block;" v-show="validData.store_address">请先填写门店所在地址</p>
                  </div>
                  <div class="form-map" style="height: 350px;" v-if="map_show">
                    <el-amap vid="amap" :zoom="zoom" :amap-manager="amapManager"  :center="center" :plugin="plugin" ref="map" :events="events" class="amap-demo">
                      <el-amap-marker v-for="(marker, index) in markers" ref="markerRef" :content="getMarkerContent(index,1)" :key="key" :icon="marker.icon"  :position="marker.position"  :events="marker.events" :zIndex="marker.zIndex"   :title="marker.title"  visible="marker.visible" :draggable="marker.draggable"  :vid="index"></el-amap-marker>
                      <el-amap-info-window class="map-win" v-if="currentWindow.visible" :offset="currentWindow.offset" :position="currentWindow.position" :content="currentWindow.content" :visible="currentWindow.visible":events="currentWindow.events" ></el-amap-info-window>
                    </el-amap>
                  </div>
                </div>
              </div>
              <div class="mod-section">
                <div class="mod-hd">
                  <div class="tit">负责人信息</div>
                </div>
                <div class="mod-bd">
                  <div class="form-item form-item-inline">
                    <p class="form-tit">运营负责人姓名</p>
                    <div class="form-box w250">
                      <input type="text" id="contacts_name" name="contacts_name" maxlength="50" autocomplete="off" value="list.contacts_name" v-model.trim="subData.contacts_name">
                    </div>
                    <p class="form-tip">建议填写指定负责人的姓名</p>
                    <p class="error-msg" style="display:block" v-show="validData.contacts_name">运营负责人姓名不能为空</p>
                  </div>
                  <div class="form-item form-item-inline">
                    <p class="form-tit">运营负责人手机号</p>
                    <div class="form-box w250">
                      <input type="text" id="contacts_phone" @change="checkContactsPhone()" name="contacts_phone" maxlength="11" autocomplete="off" value="list.contacts_phone" v-model.trim="subData.contacts_phone">
                    </div>
                    <p class="form-tip">建议填写指定负责人的手机号</p>
                    <p class="error-msg error-contacts-phone" style="display:block" v-show="validData.contacts_phone">运营负责人手机号不能为空</p>
                  </div>
                  <div class="form-item form-file form-item-inline">
                    <div class="form-tit">法人身份证正面
                      <div class="tip-doubt tip-doubt-img">
                        <p class="tip-tit"><i class="ico-doubt"></i>示例</p>
                        <div class="tip-doubt-con">
                          <img src="~@/assets/seller/images/seller/example/identity1.jpg" alt="">
                        </div>
                      </div>
                    </div>
                    <ul class="list-file">
                      <div class="ncsc-upload-img-item ib-vm">
                        <input nctype="idcard_front" name="idcard_front1" type="hidden" value="2019/04/20/06091069807237433.jpg">
                        <div class="ncsc-upload-btn" v-if="!subData.idcard_front">
                          <a href="javascript:void(0);">
                            <input type="file" class="input-file" accept="image/gif, image/jpeg, image/png, image/bmp" name="idcard_front" id="idcard_front" @change="localImgLoad($event,'idcard_front')">
                            <p><i class="ico-upload"></i>图片上传</p>
                          </a>
                        </div>
                        <div class="ncsc-upload-img-box" v-else>
                          <div class="ncsc-upload-avatar js-tips-img">
                            <a>
                              <img nctype="idcard_front" :src="ImageIp+imagePathConfig.Register+subData.idcard_front" @click="showImageDetil(ImageIp+imagePathConfig.Register+subData.idcard_front)">
                            </a>
                          </div>
                          <div class="image-delete" @click="deleteImage('idcard_front')">×</div>
                        </div>
                      </div>
                      <p class="error-msg" style="display:block;" v-show="validData.idcard_front">法人身份证正面不能为空</p>
                    </ul>
                    <p class="form-tip ml10">需是营业执照上的法人身份证原件照<br>照片内的身份证信息内容需放大后清晰可见</p>
                  </div>
                  <div class="form-item form-file form-item-inline">
                    <div class="form-tit">法人身份证反面
                      <div class="tip-doubt tip-doubt-img">
                        <p class="tip-tit"><i class="ico-doubt"></i>示例</p>
                        <div class="tip-doubt-con">
                          <img src="~@/assets/seller/images/seller/example/identity2.jpg" alt="">
                        </div>
                      </div>
                    </div>
                    <ul class="list-file">
                      <div class="ncsc-upload-img-item ib-vm">
                        <div class="ncsc-upload-btn" v-if="!subData.idcard_reverse">
                          <a href="javascript:void(0);">
                            <input type="file" class="input-file"  accept="image/gif, image/jpeg, image/png, image/bmp" name="idcard_reverse" id="idcard_reverse" @change="localImgLoad($event,'idcard_reverse')">
                            <p><i class="ico-upload"></i>图片上传</p>
                          </a>
                        </div>
                        <div class="ncsc-upload-img-box" v-else>
                          <div class="ncsc-upload-avatar js-tips-img">
                            <a>
                              <img nctype="idcard_reverse" :src="ImageIp+imagePathConfig.Register+subData.idcard_reverse" @click="showImageDetil(ImageIp+imagePathConfig.Register+subData.idcard_reverse)">
                            </a>
                          </div>
                          <div class="image-delete" @click="deleteImage('idcard_reverse')">×</div>
                        </div>
                      </div>
                      <p class="error-msg" style="display:block;" v-show="validData.idcard_reverse">法人身份证反面不能为空</p>
                    </ul>
                    <p class="form-tip ml10">需是营业执照上的法人身份证原件照<br>照片内的身份证信息内容需放大后清晰可见</p>
                  </div>
                </div>
              </div>
              <div class="mod-section">
                <div class="mod-hd">
                  <div class="tit">营业执照信息</div>
                </div>
                <div class="mod-bd">
                  <div class="form-item form-file form-item-inline">
                    <div class="form-tit">营业执照
                      <div class="tip-doubt tip-doubt-img">
                        <p class="tip-tit"><i class="ico-doubt"></i>示例</p>
                        <div class="tip-doubt-con">
                          <img src="~@/assets/seller/images/seller/example/license.jpg" alt="">
                        </div>
                      </div>
                    </div>
                    <ul class="list-file">
                      <div class="ncsc-upload-img-item ib-vm">
                        <div class="ncsc-upload-btn" v-if="!subData.business_licence_photo">
                          <a href="javascript:void(0);">
                            <input type="file" class="input-file" accept="image/gif, image/jpeg, image/png, image/bmp" name="business_licence_photo" id="business_licence_photo" @change="localImgLoad($event,'business_licence_photo')">
                            <p><i class="ico-upload"></i>图片上传</p>
                          </a>
                        </div>
                        <div class="ncsc-upload-img-box" v-else>
                          <div class="ncsc-upload-avatar js-tips-img">
                            <a>
                              <img nctype="idcard_reverse" :src="ImageIp+imagePathConfig.Register+subData.business_licence_photo" @click="showImageDetil(ImageIp+imagePathConfig.Register+subData.business_licence_photo)">
                            </a>
                          </div>
                          <div class="image-delete" @click="deleteImage('business_licence_photo')">×</div>
                        </div>
                      </div>
                      <p class="error-msg" style="display:block;" v-show="validData.business_licence_photo">营业执照不能为空</p>
                    </ul>
                    <p class="form-tip ml10">需上传原件照片<br>照片内的营业执照信息内容需放大后清晰可见</p>
                  </div>
                  <div class="form-item form-item-inline">
                    <p class="form-tit">名称<span class="c-gray fs12">&emsp;需与营业执照完全一致</span></p>
                    <div class="form-box w300">
                      <input type="text" maxlength="50" name="company_name" autocomplete="off" value="list.company_name" v-model.trim="subData.company_name">
                    </div>
                    <p class="error-msg" style="display:block;" v-show="validData.company_name">单位名称不能为空</p>
                  </div>
                  <div class="form-item">
                    <a @click="doRouter('/register')" class="comm-btn">上一步</a>
                    <input @click="submiData()" type="button" class="comm-btn" id="submitBtn" value="下一步">
                  </div>
                </div>
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
    <el-dialog :visible.sync="hasImageDialog" :lock-scroll="modalAppendToBody" :width="imgWidth + 20 +'px'" :close-on-click-modal = "closeOnClickModal" customClass="show-image">
      <template v-if="hasImage">
        <img :src="imageUrl" class="hasImageDiv" :style="{width:imgWidth +'px'}"/>
        <div class="closeDiv">
          <div id="lightbox-container-image-data">
            <div id="lightbox-image-details">
              <span id="lightbox-image-details-caption" style="display: none;"></span>
              <span id="lightbox-image-details-currentNumber" style="display: none;"></span>
            </div>
            <div id="lightbox-secNav">
              <a id="lightbox-secNav-btnClose" @click="hasImageDialog = false">
                <img src="//static.shenbd.com/lib/js/lightbox/img/lightbox-btn-close.gif">
              </a>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>

    <el-dialog :visible.sync="unImageDialog" width="250px" :lock-scroll="modalAppendToBody" customClass="show-image">
      <div class="loader">
        <img src="//static.shenbd.com/lib/js/lightbox/img/lightbox-ico-loading.gif">
      </div>
    </el-dialog>
  </div>
</template>
<style scoped src="../../assets/seller/css/style2018.css"></style>
<style scoped src="./auth.css"></style>
<script>
  import util from 'lib/utils/util';
  import fileUpload from 'lib/utils/fileUpload.js';
  import {mapActions,mapGetters} from 'vuex';
  import VueAMap from 'vue-amap';
  import QmArea from 'component/qm-area/index';

  // 初始化vue-amap
  VueAMap.initAMapApiLoader({
    // 高德的key
    key: '51540038b13949411b93f05fd94da971',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 高德 sdk 版本，默认为 1.4.4
    v: '1.4.3'
  });
  let amapManager = new VueAMap.AMapManager();
  export default {
    name: "auth-register",
    data(){
      return {
        redIcon:'http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
        blueIcon:'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        currentIndex:-1,
        currentPosition:'',
        searchKey:'',
        imgWidth:520,
        searchOption: {
          city: '上海市',
          citylimit: true
        },
        currentAddress:{
          province:'',//省
          city:'',//市
          district:'',//区
          citycode:'',
          store_addres:'',
          is_detail:false,
        },
        area_show:true,
        map_show : false,
        search_show:false,
        first_show:true,
        list:[],//第二部已注册情况记录的数据
        shop_photo_num:0,//已上传门脸照片张数
        key: '51540038b13949411b93f05fd94da971',//高德地图key
        imageUrl:'',
        hasImage:false,
        hasImageDialog:false,
        unImageDialog:false,
        modalAppendToBody:false,
        closeOnClickModal:false,
        validData:{
          store_name:false,
          contacts_name:false,
          contacts_phone:false,
          company_name:false,
          idcard_front:false,
          idcard_reverse:false,
          business_licence_photo:false,
          store_label_pic:false,
          shop_front_photo:false,
          store_zone_tel:false,
          shop_photo:false,
          store_address:false,
          inviter_tel:false,
        },
        subData:{
          store_name:'',//门店名称
          contacts_name:'',//运营负责人姓名
          contacts_phone:'',//运营负责人手机号
          company_name:'',//公司名称
          idcard_front:'',//身份证正面
          idcard_reverse:'',//身份证反面
          business_licence_photo:'',//营业执照
          store_label_pic:'',//商户logo
          shop_front_photo:'',//门脸照片
          shop_photo_0:'',//店内照片1
          shop_photo_1:'',//店内照片2
          shop_photo_2:'',//店内照片3
          inviter_tel:'',//邀请人手机号
          store_zone_tel_start:'',//店铺电话(区号)
          store_zone_tel_end:'',//店铺电话
          province:'',//省
          city:'',//市
          district:'',//区
          store_citycode:'',//邮编
          store_address:'',//门店详细地址
          store_coordinate:'',
        },
        address_error_type:0,
        currentWindow:{
          position:[],
          content:'',
          offset:[],
          visible:false,
          events: {
            close() {}
          },
        },
        amapManager: amapManager,
        zoom: 10,
       center: [119.377636,25.980473],
        markers: [],
        events: {
          init: (o) => {
            o.getCity(result => {

            })
          },
          'moveend': () => {
          },
          'zoomchange': () => {
          },
          'click': (e,data) => {
            $('.search-tips').hide();
            var _self = this;
            let lng ='';
            let lat = '';
            if(!data||!data['start']){
              lng = e.lnglat.lng;
              lat = e.lnglat.lat;
              this.currentWindow.visible=false;
            }else{
              lng = data['start'];
              lat = data['end'];
            }
            let location = lng + ","+ lat;
            _self.subData.store_coordinate = location;
            $.ajax({
              url: 'https://restapi.amap.com/v3/geocode/regeo',
              type: 'get',
              dataType: 'jsonp',
              data: {
                key: _self.key,
                location: location,
                extensions:'all',
                radius: 1000,
              },
              success: function (data) {
                var addressInfo = new Array();
                addressInfo['address'] = data.regeocode.formatted_address;
                if(data.regeocode.aois[0]){
                  addressInfo['name'] = data.regeocode.aois[0].name;
                }else{
                  if(data.regeocode.pois[0]){
                    addressInfo['name'] = data.regeocode.pois[0].name;
                  }
                }
                _self.addMarker(lng,lat,addressInfo,1);

                var addressComponent = data.regeocode.addressComponent;
                _self.currentAddress.province = addressComponent.province;
                _self.currentAddress.city = addressComponent.city;
                _self.currentAddress.district = addressComponent.district;
                _self.currentAddress.citycode = addressComponent.citycode;
                _self.currentAddress.store_addres = data.regeocode.formatted_address;
                _self.currentAddress.is_detail = false;
              }
            });
          }
        },
        polygons: [
          {
            draggable: false,
            path: [[121.5273285, 31.21515044], [121.5293285, 31.21515044], [121.5293285, 31.21915044], [121.5273285, 31.21515044]],
            events: {
              click: (e) => {
              }
            }
          }
        ],
        plugin: ['ToolBar', {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(o) {
            }
          }
        }],
        marker:
          {
            position: [119.342936,6.0525231],
            icon:  "",
            events:{
              click:(e)=>{
                this.events.click(e);
              }
            }
          },
      }
    },
    components: {
      QmArea,
      VueAMap
    },
    computed:{
      ...mapGetters({
        metaData:'getMetaData',
        ImageIp:'getImageIp',
        imagePathConfig:'getImagePathConfig',
        imageType:'getImageType',
      }),
    },
    methods:{
      ...mapActions({
        getRegisterStepTwo:'getRegisterStepTwo',
        registerStepTwo:'registerStepTwo',
        uploadFile:'nologinUploadBase64Img',
        checkInviter:'checkInviter',
      }),
      onSearchResult(pois) {
        //搜索组件的搜索结果返回事件
        var _self = this;
        let latSum = 0;
        let lngSum = 0;
        if (pois.length > 0) {
          let newMarkers = _.clone(_self.markers);
          newMarkers.forEach((item,i) => {
            _self.markers.forEach((sitem,si) => {
                if(sitem.icon == undefined || sitem.icon==''||sitem.icon==null){
                  _self.markers.splice(si, 1);
                }
              });
            });
            pois.forEach((poi,index) => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              var addressInfo = new Array();
              addressInfo['address'] = poi.address;
              addressInfo['name'] = poi.name;
              addressInfo['tel'] = poi.tel;
              _self.addMarker(poi.lng,poi.lat,addressInfo,0);
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            var location = center.lng+","+center.lat;
            _self.zoom = 15;
            _self.center = location.split(',');
          }
      },
      getMarkerContent (num,color) {
        //地图小图标
        var content='';
        if(color==2){
          var imgUrl = this.redIcon;
        }else{
          var imgUrl = this.blueIcon;
        }
        num = parseInt(num);
        if(num > 9){
          content = "<div class='map-point map-red'><img class='mark-img"+num+"' src="+imgUrl+" /><span>"+num+"</span></div>";
        }else{
          content = "<div class='map-point'><img class='mark-img"+num+"' src="+imgUrl+" /><span>"+num+"</span></div>";
        }
        return content;
      },
      markerClick (index,marker){
        var _self = this;
        let location = marker.position[0] + ","+ marker.position[1];
        $.ajax({
          url: 'https://restapi.amap.com/v3/geocode/regeo',
          type: 'get',
          dataType: 'jsonp',
          data: {
            key: _self.key,
            location: location,
            extensions:'all',
            radius: 1000,
          },
          success: function (data) {
            var addressComponent = data.regeocode.addressComponent;
            _self.currentAddress.province = _self.subData.province;
            _self.currentAddress.city = _self.subData.city;
            _self.currentAddress.district = addressComponent.district;
            _self.currentAddress.citycode = addressComponent.citycode;
            _self.currentAddress.is_detail = false;
          }
        });
        _self.currentIndex = index;
        _self.currentPosition = marker.position;
        if(_self.$refs.markerRef){
          _self.$refs.markerRef[index].events.click();
        }
      },
      getDeailAddress(){
        var _self = this;
        _self.validData.store_address = false;
        _self.validData.store_coordinate = false;
        //去定位点击事件
        if(!_self.subData.province || !_self.subData.city){
          this.$nextTick(()=>{
            $('.error-address').text('请选择门店所在省市区');
            $('#store_address').focus();
          });
          _self.validData.store_address = true;
        }else if(!_self.subData.store_address){
          this.$nextTick(()=>{
            $('.error-address').text('请先填写门店所在地址');
            this.address_error_type = 1;
            $('#store_address').focus();
          });
          _self.validData.store_address = true;
        }
        if(_self.subData.province.indexOf("市") != -1){
          //直辖市
          _self.searchOption.city =  _self.subData.province;
        }
        if(!this.validData.store_address){
          $('.search-tips').show();
          _self.currentWindow.visible = false;
          _self.subData.store_coordinate = '';
          _self.markers = [];
          _self.map_show = true;
          //将坐标清掉，重新选择定位
          let newMarkers = _.clone(_self.markers);
          newMarkers.forEach((item,i) => {
            _self.markers.forEach((sitem,si) => {
              if(sitem.icon == undefined || sitem.icon==''||sitem.icon==null){
                _self.markers.splice(si, 1);
              };
            });
          });
          this.$nextTick(()=>{
            $('.search-box-wrapper').children('input').on('keyup', function () {
              if ($(this).val().trim() == '') {
                $('.search-tips').hide();
              } else {
                $('.search-tips').show();
              }
            });
            setTimeout(function () {
              _self.$refs.childSearch.defult=_self.subData.store_address;
              _self.$refs.childSearch.keyword=_self.subData.store_address;
              _self.$refs.childSearch.tips = [];
              $('.search-box-wrapper').children('input').val(_self.subData.store_address);
              //调用搜索组件的搜索事件
              _self.$refs.childSearch.autoComplete();
              //查询不出结果，通过精准位置查询
              _self.$nextTick(()=>{
                setTimeout(function () {
                  if(_self.$refs.childSearch.tips.length == 0){
                    $.ajax({
                      url: 'https://restapi.amap.com/v3/geocode/geo',
                      type: 'get',
                      dataType: 'jsonp',
                      data: {
                        key: _self.key,
                        address:_self.subData.store_address,
                        city: _self.subData.city,
                      },
                      success: function (data) {
                        if(data.count > 0){
                          var resData = data.geocodes[0];
                          var addressInfo = new Array();
                          addressInfo['address'] = resData.formatted_address;
                          var name = resData.street+resData.number;
                          if(!name){
                            name=resData.formatted_address;
                          }
                          addressInfo['name'] = name;
                          var pos = resData.location.split(',');
                          _self.addMarker(pos[0], pos[1],addressInfo,1);
                          _self.currentAddress.province = resData.province;
                          _self.currentAddress.city = resData.city;
                          _self.currentAddress.district = resData.district;
                          _self.currentAddress.citycode = resData.citycode;
                          _self.currentAddress.store_addres = resData.formatted_address;
                          _self.currentAddress.is_detail = true;
                        }else{
                          //精准位置查询不出结果，通过关键词再次查询，这里如果再没数据，基本地址是有问题了的
                          $.ajax({
                            url: 'https://restapi.amap.com/v3/place/text',
                            type: 'get',
                            dataType: 'jsonp',
                            data: {
                              key: _self.key,
                              keywords:_self.subData.store_address,
                              city: _self.subData.city,
                              children:1,
                              extensions:'all',
                            },
                            success: function (data) {
                              if(data.pois[0]){
                                var resData = data.pois[0];
                                var addressInfo = new Array();
                                addressInfo['address'] = resData.address;
                                addressInfo['name'] = resData.name;
                                var pos = resData.location.split(',');
                                _self.addMarker(pos[0], pos[1],addressInfo,1);
                                _self.currentAddress.province = resData.pname;
                                _self.currentAddress.city = resData.cityname;
                                _self.currentAddress.district = resData.adname;
                                _self.currentAddress.citycode = resData.citycode;
                                _self.currentAddress.store_addres = resData.address;
                                _self.currentAddress.is_detail = true;
                              }
                            }
                          });
                        }
                      }
                    });
                  }
                },500);
              });
            },50);
          });
        }
      },
      showImageDetil(imageUrl){
        this.imageUrl = imageUrl;
        this.isHasImg(this.imageUrl).then((res)=>{
          this.hasImage = res;
          if(this.hasImage){
            this.hasImageDialog = true;
          }else{
            this.unImageDialog = true;
          }
        });

      },

      isHasImg(pathImg){
        var vm = this;
        return new Promise((resolve, reject) => {
          var ImgObj=new Image();
          ImgObj.src= pathImg;
          ImgObj.onload =function(res) {
            if(ImgObj.width >= 520){
              vm.imgWidth = 520;
            }else{
              vm.imgWidth = ImgObj.width;
            }
            resolve(true);
          }
          ImgObj.onerror =function() {
            resolve(false)
          }
        })

      },
      doRouter(url){
        this.$router.push(url);
      },
      areaValueChange(data){
        var _self = this;
        _self.subData.store_coordinate = '';
        if(data.value){
          var address = '';
          if(data.level == 'province'){
            _self.area_show = false;
            setTimeout(function () {
              _self.area_show = true;
            },50);
            _self.subData.city = '';
            _self.subData.district = '';
            _self.zoom = 10;
            _self.subData.province = data.value;
            address = _self.subData.province;
          }
          if(data.level == 'city'){
            _self.subData.district = '';
            _self.zoom = 10;
            _self.subData.city = data.value;
            _self.searchOption.city = data.value;
            address = _self.subData.province + data.value;
          }
          if(data.level == 'district'){
            _self.zoom = 13;
            _self.subData.district = data.value;
            address = _self.subData.province +  _self.subData.city  + data.value;
          }
          $.ajax({
            url: 'https://restapi.amap.com/v3/geocode/geo',
            type: 'get',
            dataType: 'jsonp',
            data: {
              key: _self.key,
              address: address
            },
            success: function (data) {
              var locationAttr = data.geocodes[0].location.split(',');
              _self.center = locationAttr;
            }
          });
        }else{
          if(data.level == 'province'){
            _self.subData.province = '';
            _self.subData.city = '';
            _self.subData.district = '';
          }else if(data.level == 'city'){
            _self.subData.city = '';
            _self.subData.district = '';
          }
        }
      },
      submiData(){
        var validRes = true;
        this.map_show = false;
        if(this.subData.contacts_phone == ''){
          this.validData.contacts_phone = true;
          this.$nextTick(()=>{
            $('.error-contacts-phone').text('运营负责人手机号不能为空');
          });
          $('#contacts_phone').focus();
        }else if(!/1[3456789]{1}\d{9}$/.test(this.subData.contacts_phone)){
          this.validData.contacts_phone = true;
          this.$nextTick(()=>{
            $('.error-contacts-phone').text('请输入正确的手机号码');
            $('#contacts_phone').focus();
          });
        }
        if(this.subData.contacts_name == ''){
          this.validData.contacts_name = true;
          $('#contacts_name').focus();
        }
        //门店详细地址
        if(this.subData.store_address == ''){
          this.$nextTick(()=>{
            $('.error-address').text('请先填写门店所在地址');
            this.address_error_type = 1;
            $('#store_address').focus();
          });
          this.validData.store_address = true;
        }else if(!this.subData.store_coordinate){
          this.$nextTick(()=>{
            $('.error-address').text('请先进行门店地址定位');
            this.address_error_type = 2;
            $('#store_address').focus();
          });
          this.validData.store_address = true;
        }

        if(this.subData.store_zone_tel_start != '' && !/^0\d{2,3}$/.test(this.subData.store_zone_tel_start)){
          this.validData.store_zone_tel = true;
          this.$nextTick(()=>{
            $('.error-store-zone-tel').text('请输入正确的区号');
            $('#store_zone_tel_start').focus();
          });
        }else if(this.subData.store_zone_tel_end != '' && !/^\d{7,8}$/.test(this.subData.store_zone_tel_end)){
          this.validData.store_zone_tel = true;
          this.$nextTick(()=>{
            $('.error-store-zone-tel').text('请输入正确的店铺电话');
            $('#store_zone_tel_end').focus();
          });
        }else{
          $('.error-store-zone-tel').text('');
          this.validData.store_zone_tel = false;
        }
        if(this.shop_photo_num < 2){
          this.validData.shop_photo = true;
          this.goAnchor("#resetCityZone");
        }
        //商户Logo
        if(this.subData.store_label_pic == ''){
          this.validData.store_label_pic = true;
          this.goAnchor("#store_label_pic");
        }
        //门脸照片
        if(this.subData.shop_front_photo==''){
          this.validData.shop_front_photo = true;
          this.goAnchor("#shop-front-photo-div");
        }
        if(this.subData.store_name == ''){
          $('#store_name').focus();
          this.validData.store_name = true
        }

        if(this.subData.company_name == ''){
          this.validData.company_name = true
        }
        if(this.subData.idcard_front == ''){
          this.validData.idcard_front = true
        }
        if(this.subData.idcard_reverse == ''){
          this.validData.idcard_reverse = true
        }
        if(this.subData.business_licence_photo == ''){
          this.validData.business_licence_photo = true
        }
        Object.values(this.validData).forEach((item,i) => {
          if(item){
            validRes = false
          }
        })
        if(validRes){
          var newData = _.clone(this.subData);
          newData.idcard_front = util.delImgSuffic(newData.idcard_front);
          newData.idcard_reverse = util.delImgSuffic(newData.idcard_reverse);
          newData.business_licence_photo = util.delImgSuffic(newData.business_licence_photo);
          newData.store_label_pic = util.delImgSuffic(newData.store_label_pic);
          newData.shop_front_photo = util.delImgSuffic(newData.shop_front_photo);
          newData.shop_photo_0 = util.delImgSuffic(newData.shop_photo_0);
          newData.shop_photo_1 = util.delImgSuffic(newData.shop_photo_1);
         this.registerStepTwo(newData).then((res)=>{
            if(res.resultCode == 1){
              //提交成功，进入注册第三步
              this.$router.push('/register3')
            }else{
              util.msg(res.shortMessage);
              if(res.resultCode == 40007){
                //请重新填写表单,缓存过期
                this.$router.push('/register')
              }
            }
          })
        }
      },
      localImgLoad(event,pro){
        var key = this.metaData.key;
        let cropSuffix = 'm_lfit,h_1200,w_1200'
        if(pro == 'store_label_pic'){
          var type = 2;
        }else{
          var type = this.imageType.IMG_REGISTER;
        }
        fileUpload.imageLoadWithSuffix(event,key,cropSuffix,type,this.uploadFile,-1,1).then(res => {
          if(pro == 'store_label_pic'){
            var imagePath = res.imgPath.replace(this.imagePathConfig.storeLabel,'');
          }else{
            var imagePath = res.imgPath.replace(this.imagePathConfig.Register,'');
          }
          if(pro == 'idcard_front'){
            this.subData.idcard_front = imagePath;
          }else if(pro == 'idcard_reverse'){
            this.subData.idcard_reverse = imagePath;
          }else if(pro == 'business_licence_photo'){
            this.subData.business_licence_photo = imagePath;
          }else if(pro == 'store_label_pic'){
            this.subData.store_label_pic = imagePath;
          }else if(pro == 'shop_front_photo'){
            this.subData.shop_front_photo = imagePath;
          }else if(pro == 'shop_photo_0'){
            this.shop_photo_num +=1;
            this.subData.shop_photo_0 = imagePath;
          }else if(pro == 'shop_photo_1'){
            this.shop_photo_num +=1;
            this.subData.shop_photo_1 = imagePath;
          }else if(pro == 'shop_photo_2'){
            this.shop_photo_num +=1;
            this.subData.shop_photo_2 = imagePath;
          }
        })
      },
      //锚点跳转
      goAnchor(selector) {
        var child = document.querySelector(selector)
        if(child != null){
           document.body.scrollTop = document.querySelector(selector).offsetTop-50;
           window.scrollTo(0,document.querySelector(selector).offsetTop-50);
        }
      },
      checkMobile(){
        if(this.subData.inviter_tel != ''){
          if(!/1[3456789]{1}\d{9}$/.test(this.subData.inviter_tel)) {
            this.validData.inviter_tel = true;
            this.$nextTick(()=>{
              $('.inviter_tel_error').text('请输入正确的手机号码');
            });
            return;
          }
          this.checkInviter({'mobile':this.subData.inviter_tel}).then((res)=>{
            if(res.resultCode == 1){
              this.validData.inviter_tel = false;
            }else{
              this.validData.inviter_tel = true;
              this.$nextTick(()=>{
              $('.inviter_tel_error').text(res.shortMessage);
              });
            }
          })
        }else{
          this.validData.inviter_tel = false;
        }
      },
      checkContactsPhone(){
        if(this.subData.contacts_phone == ''){
          this.validData.contacts_phone = true;
          this.$nextTick(()=>{
            $('.error-contacts-phone').text('运营负责人手机号不能为空');
          });
        }else if(!/1[3456789]{1}\d{9}$/.test(this.subData.contacts_phone)){
          this.validData.contacts_phone = true;
          this.$nextTick(()=>{
            $('.error-contacts-phone').text('请输入正确的手机号码');
          });
        }else{
          this.validData.contacts_phone = false;
        }
      },
      changeZoonTel(){
        if(this.subData.store_zone_tel_start != '' && !/^0\d{2,3}$/.test(this.subData.store_zone_tel_start)){
          $('.error-store-zone-tel').text('请输入正确的区号');
        }else if(this.subData.store_zone_tel_end != '' && !/^\d{7,8}$/.test(this.subData.store_zone_tel_end)){
          $('.error-store-zone-tel').text('请输入正确的店铺电话');
        }else{
          $('.error-store-zone-tel').text('');
        }
      },
      addMarker(start,end,title,type) {
        var _self = this;
        //type:0是列表搜索的地址，1是用户自己点地图生成的坐标
        let newMarkers = _.clone(this.markers);
        newMarkers.forEach((item,i) => {
          this.markers.forEach((sitem,si) => {
            if(sitem.type == 1){
              this.markers.splice(si, 1);
            }
          });
        });
        let marker = {
          position: [start,end],
          title:title['name'],
          events:{
            click:(e)=>{
              var _self = this;
              $('.map-point').children('img').attr('src',this.blueIcon);
              this.currentIndex = parseInt(this.currentIndex);
              if(this.currentIndex >= 0){
                var className = ".mark-img"+this.currentIndex;
                $(className).attr('src',this.redIcon);
                this.currentIndex = -1;
              }else{
                this.currentPosition = [start,end];
                var str = e.target.getContent();
                var index = str.indexOf("<span>");
                var num = str.substr(index + 6,3);
                num.replace("<",'');
                num.replace("/",'');
                $('.map-point').children('img').attr('src',this.blueIcon);
                e.target.setContent(this.getMarkerContent(num,2));
              }
                var newCurrentWindow = _.clone(this.currentWindow);
                newCurrentWindow.position= this.currentPosition;
                newCurrentWindow.visible = false;
                newCurrentWindow.offset = [0,-30];
                title['name'] = title['name'] ? title['name'] : '';
                title['address'] = title['address'] ? title['address'] : '';
                newCurrentWindow.content = "<div><div class='map-tip'>是否将该位置设置成门店位置？</div><hr class='map-hr'><div class='map-tip'>"+title['name']+"</div>";
                if(title['address']!=''){
                  newCurrentWindow.content += "<div class='map-tip map-small'>地址：" + title['address'] + "</div>";
                }
                if(title['tel']) {
                  newCurrentWindow.content += "<div class='map-tip map-small'>电话：" + title['tel'] + "</div>";
                }
                newCurrentWindow.content += "<div class='class-btn'>确定</div></div>";
                this.currentWindow = newCurrentWindow;
              _self.currentAddress.store_addres = title['address'];
                this.$nextTick(()=>{
                  this.currentWindow.visible = true;//点击点坐标，出现信息窗体
                  setTimeout(function () {
                    $('.amap-info-contentContainer').on("click", ".class-btn", function (e) {
                      _self.subData.store_coordinate = start + "," + end;
                     _self.map_show = false;
                     _self.currentWindow.visible = false;

                     //处理详细地址等数据信息
                      if(_self.currentAddress.province != undefined &&  _self.currentAddress.province != null &&  _self.currentAddress.province != ''){
                        _self.subData.province =  _self.currentAddress.province;
                      }
                      if(_self.currentAddress.citycode == '023'){
                        //重庆市单独处理市
                        if( _self.currentAddress.district.indexOf("区") != -1){
                          _self.subData.city = '重庆城区';
                        }else{
                          _self.subData.city = '重庆郊县';
                        }
                        _self.searchOption.city = _self.subData.city;
                      }else{
                        if(_self.currentAddress.city != undefined && _self.currentAddress.city != null && _self.currentAddress.city != ''){
                          _self.subData.city = _self.currentAddress.city;
                          _self.searchOption.city = _self.currentAddress.city;
                        }
                      }

                      if(_self.currentAddress.district != undefined && _self.currentAddress.district != null && _self.currentAddress.district != ''){
                        _self.subData.district = _self.currentAddress.district;
                      }
                      _self.subData.store_citycode = _self.currentAddress.citycode;
                      if(_self.currentAddress.city != undefined &&  _self.currentAddress.city != null &&  _self.currentAddress.city != ''){
                        _self.area_show = false;
                        setTimeout(function () {
                          _self.area_show = true;
                          _self.first_show = false;
                        },50);
                      }
                      //现在统一点击确认后，不会进行地址覆盖
                     /* if(!_self.currentAddress.is_detail){
                        //处理详细地址
                        var detailAddress =  _self.currentAddress.store_addres;
                        detailAddress = detailAddress.replace(_self.currentAddress.province,'');
                        detailAddress = detailAddress.replace(_self.currentAddress.city,'');
                        detailAddress = detailAddress.replace(_self.currentAddress.district,'');
                        if(detailAddress){
                          _self.subData.store_address = detailAddress;
                        }
                      }*/
                      util.msg('已将当前经纬度设置为门店定位地址');
                    });
                  },50);
                });
            }
          }
        };
        marker.address = title['address'];
        marker.type = type;
        marker.icon="";
        if(!title['name']){
          marker.zIndex=1000;
        }else{
          marker.zIndex=100;
        }
        this.markers.push(marker);
        if(type == 1){
          setTimeout(function () {
            _self.markerClick(_self.markers.length-1,marker);
          },50)
        }
      },
      deleteImage(type){
        if(type == 'idcard_front'){
          this.subData.idcard_front = '';
        }else if(type == 'idcard_reverse'){
          this.subData.idcard_reverse = '';
        }else if(type == 'business_licence_photo'){
          this.subData.business_licence_photo = '';
        }else if(type == 'store_label_pic'){
          this.subData.store_label_pic = '';
        }else if(type == 'shop_front_photo'){
          this.subData.shop_front_photo = '';
        }else if(type == 'shop_photo_0'){
          this.shop_photo_num --;
          this.subData.shop_photo_0 = '';
        }else if(type == 'shop_photo_1'){
          this.shop_photo_num --;
          this.subData.shop_photo_1 = '';
        }else if(type == 'shop_photo_2'){
          this.shop_photo_num --;
          this.subData.shop_photo_2 = '';
        }
      },
              open(){
          if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
            $("html").css("overflow","hidden");
            $(".main").css("marginRight","18px");
            $(".header").css("width","calc(100% - 16px )");
            // var marginl = "calc((100% - 2px - 1200px)/2)";
            // $("#content").css("marginLeft",marginl);
          }
        },
        close(){
          if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
            $("html").css("overflow","auto")
            $(".main").css("marginRight","0px");
            $(".header").css("width","calc(100% - 0px)");
            // var marginl = "calc((100% - 1200px)/2)";
            // $("#content").css("marginLeft",marginl);
          }
        },
    },
    watch:{
      subData:{
        handler: function () {
          if(this.subData.store_name !== ''){
            this.validData.store_name = false
          }
          if(this.subData.contacts_name !== ''){
            this.validData.contacts_name = false
          }
          if(this.subData.company_name !== ''){
            this.validData.company_name = false
          }
          if(this.address_error_type == 1){
            if(this.subData.store_address !== ''){
              this.validData.store_address = false;
            }
          }else if(this.address_error_type == 2){
            if(this.subData.store_coordinate !== ''){
              this.validData.store_address = false
            }
          }

          if(!this.subData.store_address){
            this.subData.store_coordinate = '';
          }
          if(this.subData.idcard_front !== ''){
            this.validData.idcard_front = false
          }
          if(this.subData.idcard_reverse !== ''){
            this.validData.idcard_reverse = false
          }
          if(this.subData.business_licence_photo !== ''){
            this.validData.business_licence_photo = false
          }
          if(this.subData.store_label_pic !== ''){
            this.validData.store_label_pic = false
          }
          if(this.subData.shop_front_photo !== ''){
            this.validData.shop_front_photo = false
          }
          if(this.shop_photo_num >= 2 ){
            this.validData.shop_photo = false
          }
        },
        deep: true
      }
    },
    mounted() {
      var _self = this;
      setTimeout(function () {
        //获取第二步注册好的信息（用于注册到第三步返回第二步注册的）
        _self.getRegisterStepTwo().then((res) => {
          if (res.resultCode == 40007) {
            //请重新填写表单,第一步未填写
            this.$router.push('/login')
          } else {
            _self.list = res.responseContent;
            if (res.responseContent.reason_info == '' || res.responseContent.reason_info == null || res.responseContent.reason_info == undefined) {
              _self.list.reason_info = '';
            }
            if (res.responseContent.contacts_phone != '' && res.responseContent.contacts_phone != null && res.responseContent.contacts_phone != undefined) {
              //有填写过数据才进行赋值
              _self.subData.inviter_tel = res.responseContent.inviter_tel;
              _self.subData.store_name = res.responseContent.store_name;
              _self.subData.contacts_name = res.responseContent.contacts_name;
              _self.subData.contacts_phone = res.responseContent.contacts_phone;
              _self.subData.company_name = res.responseContent.company_name;
              _self.subData.idcard_reverse = res.responseContent.idcard_reverse;
              _self.subData.idcard_front = res.responseContent.idcard_front;
              _self.subData.business_licence_photo = res.responseContent.business_licence_photo;
              _self.subData.store_label_pic = res.responseContent.store_label;
              _self.subData.shop_front_photo = res.responseContent.shop_front_photo;
              if (res.responseContent.shop_photo[0] != undefined) {
                _self.subData.shop_photo_0 = res.responseContent.shop_photo[0];
              }
              if (res.responseContent.shop_photo[1] != undefined) {
                _self.subData.shop_photo_1 = res.responseContent.shop_photo[1];
              }
              if (res.responseContent.shop_photo[2] != undefined) {
                _self.subData.shop_photo_2 = res.responseContent.shop_photo[2];
              }
              if (res.responseContent.shop_photo) {
                _self.shop_photo_num = res.responseContent.shop_photo.length;
              }
              if (res.responseContent.store_zone_tel_start != 'undefined') {
                _self.subData.store_zone_tel_start = res.responseContent.store_zone_tel_start;
              }
              if (res.responseContent.store_zone_tel_end != 'undefined') {
                _self.subData.store_zone_tel_end = res.responseContent.store_zone_tel_end;
              }
              _self.subData.province = res.responseContent.province;
              _self.subData.city = res.responseContent.city;
              _self.searchOption.city = res.responseContent.city;
              _self.subData.district = res.responseContent.district;
              _self.subData.store_citycode = res.responseContent.store_citycode;
              _self.subData.store_address = res.responseContent.store_address;
              _self.area_show = false;
              setTimeout(function () {
                _self.area_show = true;
              }, 50);
              if (res.responseContent.store_longitude != '' && res.responseContent.store_longitude != null && res.responseContent.store_latitude != '' && res.responseContent.store_latitude != null) {
                //有经纬度情况进行定位
                _self.subData.store_coordinate = res.responseContent.store_longitude + "," + res.responseContent.store_latitude;
                var pos = _self.subData.store_coordinate.split(',');
                _self.center = _self.subData.store_coordinate.split(',');
                _self.addMarker(pos[0], pos[1], [],1);
                _self.zoom = 10;
              }
            }
          }
        })
      },500)
    }
  }
</script>

