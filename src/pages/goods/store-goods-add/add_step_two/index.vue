<style scoped>
  .ncsc-mod-section{margin-bottom: 30px;}
  .ncsc-mod-section .ncsc-mod-hd{overflow: hidden; background: #f3f3f3; font-size: 16px; padding: 0 20px; line-height:2.5;}
  .ncsc-mod-section .ncsc-mod-hd .ncsc-title{float: left;}
  .ncsc-mod-section .ncsc-mod-hd .more{ float: right;}
  .ncsc-mod-section .ncsc-collapse{float: right; width: 20px; height: 20px; line-height: 20px; text-align: center; margin-top: 10px;}
  .ncsc-mod-section .ncsc-collapse:hover{cursor: pointer;}
  .ncsc-mod-section .ncsc-mod-bd{padding: 20px 50px;}
  .ncsc-mod-section.hide .ncsc-mod-bd{display: none;}

  .goods-search{position: relative;}
  .goods-search .search-tip{ position: absolute;left: 0;top: 90px;border: 1px solid #ddd;box-sizing: border-box;background: #fff;z-index: 600;max-height: 260px;overflow-y: auto;}
  .goods-search .list-result{padding: 10px 0;}
  .goods-search .list-result li{line-height: 1.3;padding: 6px 10px;word-break: break-all; font-size: 12px;}
  .goods-search .list-result li:hover{background: #f5f5f5}

  .ncsc-form-item{padding: 15px 0; font-size: 16px;}
  .ncsc-form-item:first-child{padding-top: 0;}
  .ncsc-form-item input[type="text"], .ncsc-form-item input[type="time"], .ncsc-form-item input[type="tel"], .ncsc-form-item input[type="password"],.ncsc-form-item input[type="number"], .ncsc-form-item textarea, .ncsc-form-item select{font-size: 16px;}
  .ncsc-form-control{box-sizing: border-box; vertical-align: middle; border-radius:5px;}
  .ncsc-form-control::placeholder{color: #bbb;}
  .ncsc-form-item input[type="text"], .ncsc-form-item input[type="time"], .ncsc-form-item input[type="tel"], .ncsc-form-item input[type="password"],.ncsc-form-item input[type="number"]{padding: 6px 10px; height: 40px; line-height: 26px;}
  .ncsc-form-item textarea.ncsc-form-control{resize: none; line-height: 30px; padding: 5px 10px; height: 100px;}
  .ncsc-form-item textarea.ncsc-form-r2{height: 70px;}
  .ncsc-form-item .add-on{width: 40px; height: 40px; line-height: 40px;}
  .ncsc-form-item .add-on .icon-renminbi{font-size: 16px;}
  .ncsc-form-item .ncsc-brand-select{font-size: 14px;}
  .ncsc-form-item input[type="text"].ncsc-form-input-s{line-height: 30px; height: 30px; padding: 0 10px; font-size: 14px;}
  .ncsc-form-item .ncsc-form-custom-radio .ncsc-custom-txt{font-size: 16px;}
  .ncsc-form-item input[type="text"]:disabled{color:#bbb}
  .ncsc-form-item .ncsc-form-box{ padding: 10px 0;}
  .ncsc-form-item .ncsc-form-box .tip-doubt-img .tip-doubt-con{ left: 10px; top: -15px;}
  .ncsc-form-item .ncsc-form-detail{ display: inline-block;}
  .ncsc-form-tit{line-height: 2.25;display: block}
  .ncsc-form-tit .required{font: 12px/16px Tahoma; color: red; vertical-align: middle; margin-right: 4px;}
  .ncsc-sep{display: inline-block; vertical-align: middle; margin:0 10px; color:#bbb; width: 12px; text-align: center;}
  .ncsc-form-error{display: inline-block; vertical-align: middle; color: red; margin:0; font-size: 12px;}
  .ncsc-form-error.block{display: block;}
  .ncsc-form-inline{display: inline-block; vertical-align: middle; line-height: 1;}

  .ncsc-form-item2{ margin-bottom: 20px;}
  .ncsc-form-item2 .ncsc-form-tit{ text-align: right; display: inline-block; vertical-align: middle; min-width: 8em;}

  .ncsc-form-spec .ncsc-form-box{ padding: 30px 0; border-top: 1px dotted #dbdbdb;}
  .ncsc-form-spec .ncsc-form-box:first-child{border:none; padding-top: 0;}
  .ncsc-form-spec .ncsc-form-box .ncsc-form-item-sub{ padding-top: 30px;}

  .ncsc-form-group .ncsc-form-custom-radio, .ncsc-form-group .ncsc-form-custom-checkbox, .ncsc-form-custom-radio-group .ncsc-form-custom-radio{margin: 5px}

  .ncsc-table-spec{border: 1px solid #dbdbdb; border-collapse: separate; box-sizing: border-box; width: 100%; border-radius: 5px;}
  .ncsc-table-spec td, .ncsc-table-spec th{border-bottom: 1px solid #dbdbdb; border-left: 1px solid #dbdbdb; text-align: left; height: 20px; vertical-align: top; padding:10px;}
  .ncsc-table-spec th{font-weight: bold; color:#757575; background: none;}
  .ncsc-table-spec .ncsc-input-txt{width: 100%; border-radius:5px;}
  .ncsc-table-spec .ncsc-btn-spec{font-size: 12px; color:#ff8519; margin:0 2px;}
  .ncsc-table-spec .col1{border-left: none;}
  .ncsc-table-spec tr:last-child td{border-bottom:none;}
  .ncsc-table-spec .info-box-man, .ncsc-table-spec .info-box-man .pic, .ncsc-table-spec .info-box-man .detail{display: inline-block;}
  .ncsc-table-spec .info-box-man .pic{padding-right: 5px;}
  .ncsc-table-spec2{border: 1px solid #dbdbdb; border-collapse: separate; box-sizing: border-box; width: 100%; border-radius: 5px;}
  .ncsc-table-spec2 td, .ncsc-table-spec2 th{border-top: 1px solid #dbdbdb; border-left: 1px solid #dbdbdb; text-align: left; padding: 10px; font-size: 14px; vertical-align: top;}
  .ncsc-table-spec2 th{font-weight: bold; color:#757575; width:15%;}
  .ncsc-table-spec2 td{width:35%;}
  .ncsc-table-spec2 tr:first-child th, .ncsc-table-spec2 tr:first-child td{border-top:none;}
  .ncsc-table-spec2 tr th:first-child{border-left: none;}
  .ncsc-table-spec2 .img-group{margin-bottom: -10px;}
  .ncsc-table-spec2 .img{display: inline-block; margin:0 10px 10px 0;}

  .ncsc-table-set-attr td{padding: 0;}
  .ncsc-table-set-attr .col1{padding: 10px;}
  /*.ncsc-table-set-attr .col2{width: 245px;}*/
  .ncsc-table-set-attr .col3{width: 380px;}
  .ncsc-table-set-attr .ncsc-list-attr{overflow: hidden;}
  .ncsc-table-set-attr .ncsc-list-attr li{display: table; width: 100%; border-top: 1px solid #dbdbdb; margin-top: -1px;}
  .ncsc-table-set-attr .ncsc-list-attr .ncsc-attr-tit, .ncsc-table-set-attr .ncsc-list-attr .ncsc-attr-detail{display: table-cell; padding: 10px;}
  .ncsc-table-set-attr .ncsc-list-attr .ncsc-attr-name{width: 225px;}
  .ncsc-table-set-attr .ncsc-list-attr .ncsc-attr-detail{width: 380px; border-left: 1px solid #dbdbdb; padding:10px;}
  .ncsc-table-set-attr .ncsc-form-custom-checkbox-s .ncsc-custom-checkbox-txt{font-size: 14px;}
  .ncsc-table-set-attr .ncsc-form-custom-checkbox-s .ncsc-custom-checkbox-frame{margin-right: 3px;}
  /*.ncsc-table-set-attr .ncsc-form-group{margin-top: -5px;}*/
  .ncsc-table-set-attr .ncsc-form-group .ncsc-form-custom-checkbox{margin-bottom:0;}

  .ncsc-select-album{background-color: #FFF; margin-top: 20px;}

  .btn-manage-attr {color: #ff8519;display: inline-block;}

  /*添加属性弹窗*/
  .eject_con_attr .ncsc-form-group .ncsc-form-custom-checkbox{margin:5px 20px}
  .eject_con_attr .new-attr-box{padding:20px 0 0 15px; border-top:1px solid #eee;}
  .eject_con_attr .eject-attr-used{ margin-bottom: 20px; max-height:160px; overflow-y:auto;}
  .eject_con_attr .new-attr-con{padding: 5px 0 0 25px;  }
  .eject_con_attr .new-attr-con .ncsc-form-s span{display: inline-block}
  /*添加规格弹窗*/
  .list-spec{ margin:0 -10px;}
  .list-spec li{ display: inline-block; vertical-align: middle; margin:0 10px 10px; position: relative; padding: 0 15px; border:1px solid #ddd; border-radius:5px;}
  .list-spec .btn-del-spec{ font-family: SimSun; color: #757575; background-color: #FFF; text-align: center; display: block; width: 14px; height: 14px; line-height: 14px; border: 1px solid #bbb; border-radius: 100%; position: absolute; z-index: 1; top: -7px; right: -7px; font-size: 12px;}
  .list-spec .btn-del-spec:hover{ text-decoration: none; color: #fff; background: #ff8519; border-color: #ff8519;}
  /*管理属性*/
  .manage-attr{ border: 1px solid #ddd; position: relative; padding: 20px; border-radius:5px;}
  .manage-attr th{ text-align: left}
  .manage-attr .ncsc-search-form{ padding-bottom:5px;}

  .ncsc-form-default .bottom{margin-left: 5%;}
  #gcategory a:hover{text-decoration: none;color: #fff;}

  .tip-doubt{position: relative; display: inline-block; vertical-align: middle; margin:0 5px;}
  .tip-doubt .tip-tit{font-size: 12px; color:#0093fa; line-height: 18px;}
  .tip-doubt .ico-doubt{display: inline-block; vertical-align: middle; width: 13px; height: 13px; background: url(~@/assets/seller/images/seller/ncsc_bg_img.png) -160px -460px no-repeat; margin-right: 4px; margin-bottom: 3px;}
  .tip-doubt .tip-doubt-con{position: absolute; display: none; left: 50px; z-index: 500;}
  .tip-doubt:hover{cursor: pointer;}
  .tip-doubt:hover .tip-doubt-con{display: block;}
  .tip-doubt-word .tip-doubt-con{width: 200px; top:-7px; text-align: left; word-break: break-all;}
  .tip-doubt-word .tip-doubt-con .tip-txt{padding:5px 10px; display: inline-block; position: relative; border-radius:5px; background: #fff; border:1px solid #0093fa}
  .tip-doubt-word .tip-doubt-con .tip-txt:before, .tip-doubt-word .tip-doubt-con .tip-txt:after{content:''; display:block;overflow:hidden;position:absolute;width:0;height:0;font-size:0;border-bottom:6px dashed transparent;border-left:6px dashed transparent;border-top:6px dashed transparent;border-right-style:solid;border-right-width:6px; top: 9px;}
  .tip-doubt-word .tip-doubt-con .tip-txt:before{left:-12px;color:#eee; color:#0093fa}
  .tip-doubt-word .tip-doubt-con .tip-txt:after{z-index:2;left:-11px;color:#fff}
  .tip-doubt-word.tip-notit .tip-doubt-con{ left: 25px;}
  .tip-doubt-word .tip-doubt-con{width: 200px; top:-7px; text-align: left; word-break: break-all;}
  .tip-doubt-word .tip-doubt-con .tip-txt{padding:5px 10px; display: inline-block; position: relative; border-radius:5px; background: #fff; border:1px solid #0093fa}
  .tip-doubt-word .tip-doubt-con .tip-txt:before, .tip-doubt-word .tip-doubt-con .tip-txt:after{content:''; display:block;overflow:hidden;position:absolute;width:0;height:0;font-size:0;border-bottom:6px dashed transparent;border-left:6px dashed transparent;border-top:6px dashed transparent;border-right-style:solid;border-right-width:6px; top: 9px;}
  .tip-doubt-word .tip-doubt-con .tip-txt:before{left:-12px;color:#eee; color:#0093fa}
  .tip-doubt-word .tip-doubt-con .tip-txt:after{z-index:2;left:-11px;color:#fff}
  .tip-doubt-word.tip-notit .tip-doubt-con{ left: 25px;}
  .tip-doubt.tip-l .tip-doubt-con{ width: 600px;}
  .tip-doubt-word.tip-notit .tip-doubt-con{ left: 25px;}
  .spec-checkall{border-bottom: 1px dashed #dbdbdb;padding-bottom: 5px}
  .c-gray{color:#757575}
  .tips{
    color: #ff8519;
    font-size: 14px;
  }
  .filter_button {
    margin-left: 5px;
    display: inline-block;
    display: inline-block;
    float: right;
    margin-top: 0;
  }
  .filter_button input{
    height: 25px;
    line-height: 25px;
  }
  .w115{width:115px;}
  .tiptxt{font-size: 14px; color: #ffbe6e}
</style>
<template>
  <div class="item-publish" @click="search.show=false">
    <div class="ncsc-form-default ncsc-form-goods">
        <div v-if="!isSupplierGoods">
            <div class="ncsc-mod-section">
                <div class="ncsc-mod-hd" onselectstart="return false;">
                    <div class="ncsc-title">商品基本信息</div>
                    <div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section" @click="section.section1 = !section.section1"><i :class="['fa',section.section1 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
                </div>
                <div class="ncsc-mod-bd" v-show="section.section1">
                    <div class="ncsc-form-item">
                        <div class="ncsc-form-tit"><i class="required">*</i>商品分类</div>
                        <div id="gcategory">
                            {{goodsClass.gc_tag_name}}
                            <a class="ncsc-btn ncsc-btn-orange-rim ml5" href="javascript:;" @click="$router.push({name:'store_goods_add_step_one',params:{commonId:goodsParams.commonId,gc_id_3:goodsClass.class_id,is_system:goodsClass.is_system,gc_id_2:goodsClass.gc_id_2,gc_id_1:goodsClass.gc_id_1}})">编辑</a>
                        </div>
                    </div>
                    <div class="ncsc-form-item goods-search">
                        <div class="ncsc-form-tit"><i class="required">*</i>商品名称
                          <div class="tip-doubt tip-doubt-word tip-l tip-notit">
                            <p class="tip-tit"><i class="ico-doubt"></i></p>
                            <div class="tip-doubt-con">
                              <div class="tip-txt c-gray fs12">
                                <p>商品搜索为分词搜索，商品名称设置时若对应词组需要被分词搜索到，可使用空格逗号或括号来<br>进行分词设置</p>
                                <p class="mt10">例如：设置商品名称为：三点一测语文 下</p>
                                <p>那么三点一测语文由分词库直接进行分词， 下这个词就会被作为单独的词可进行分词搜索</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      <div>
                        <input class="ncsc-form-control w500" type="text" id="g_name" v-model="goods.goods_name" autocomplete="off" @keyup="search.searchParams.pageIndex=0;searchFun();">
                      </div>
                        <p class="ncsc-form-error" v-show="validate.g_name"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.g_name}}</label></p>
                        <div class="search-tip w500" id="search-tip" @scroll="scrollEvent" v-show="search.show">
                            <ul class="list-result" >
                                <li v-for="item in search.searchList" @click="getGoods(item.goods_commonid)">{{item.goods_name}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="ncsc-form-item">
                        <div class="ncsc-form-tit">商品副标题</div>
                        <textarea name="g_jingle" row="3" class="textarea ncsc-form-control w500" id="g_jingle" v-model="goods.goods_jingle"></textarea>
                        <p class="ncsc-form-error" v-show="validate.g_jingle"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.g_jingle}}</label></p>
                    </div>
                    <div class="ncsc-form-item">
                        <div class="ncsc-form-tit"><i class="required">*</i>商品图片</div>
                        <div class="ncsc-goodspic-list ncsc-upload-img-list">
                          <draggable v-model="files" v-bind="dragOptions" draggable=".draggable" ghost-class="ghost" @change="itemDraggable($event,files)">
                                    <div v-for="(file,idx) in files" class="ncsc-upload-img-item" :class="!file?'':'draggable'">
                                        <div idx="idx" class="ncsc-upload-img-box" v-show="file">
                                            <div class="ncsc-upload-avatar">
                                                <img :src="file" @click="showDialog(file)">
                                            </div>
                                            <div class="image-delete" @click="deleteLogo(idx)">×</div>
                                        </div>
                                        <div class="ncsc-upload-btn" v-if="!file">
                                            <a href="javascript:void(0);">
                                                <input type="file" @change="multipleUpload($event)" class="input-file ignore"  accept="image/gif, image/jpeg, image/png, image/bmp" multiple="">
                                              <!--<input type="file"  class="input-file ignore"  accept="image/gif, image/jpeg, image/png, image/bmp" multiple="" @change="logoLoad($event,idx)">-->
                                                <p><i class="ico-upload"></i>图片上传</p>
                                            </a>
                                        </div>
                                    </div>
                          </draggable>
                        </div>
                        <div class="clear"></div>
                        <div class="ncsc-select-album">
                           <!-- <div @click="beforeMulti" id="eruth" class="ncsc-btn btn-multiple-upload-img mr5" :class="fileMax?'disabled':''" >
                              <input  type="file" @change="multipleUpload($event)" :disabled="fileMax" name="multipleImg" class="multiple-upload-img ignore" accept="image/gif, image/jpeg, image/png, image/bmp" multiple="">批量上传
                            </div>-->
                            <a href="javascript:void(0);" class="ncsc-btn" @click="openGoodsPicSpace">{{goodsPicSpace ? '关闭图片空间' :'从图片空间选择'}}</a>
                        </div>
                        <qm-pic-space :goodsPicSpace="goodsPicSpace" :classList="picSpace.classList"
                                      :picList="picSpace.picList" :pageParams="picSpace.pageParams"
                                      @changePicSpaceIndex="changePicSpaceIndex" @insertLogo="insertLogo"
                        ></qm-pic-space>
                        <p class="hint">商品图片作为前台默认轮播图，建议上传尺寸800px*800px图片，至少需上传一张，最多5张</p>
                        <input type="text" style="opacity: 0;width: 1px; height:1px; padding:0; border:none" id="g_image">
                        <p class="ncsc-form-error" v-show="validate.g_image"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.g_image}}</label></p>
                    </div>
                </div>
            </div>
            <div class="ncsc-mod-section">
                <div class="ncsc-mod-hd" onselectstart="return false;">
                    <div class="ncsc-title">商品属性</div>
                    <div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section" @click="section.section2 = !section.section2" ><i :class="['fa',section.section2 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
                </div>
                <div class="ncsc-mod-bd" v-show="section.section2">
                    <div class="ncsc-form-item">
                        <div class="ncsc-form-tit">
                            <i class="required">*</i>商品类型
                            <el-tooltip placement="right-start" effect="light" popper-class="atooltip" >
                                <div slot="content" class="toolTipCont">
                                    <img src="@/assets/seller/images/seller/example/goods-spec.png" alt="">
                                </div>

                                <p class="lightBlue">
                                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                                </p>
                            </el-tooltip>
                        </div>
                        <div class="ncsc-form-custom-radio-group">
                            <div :class="['ncsc-form-custom-radio',(1 == goods.multi_spec) ? 'checked' : '']">
                                <div class="ncsc-custom-radio-frame">
                                    <input type="radio"  value="1" id="multi_spec_1" class="ncsc-custom-radio" v-model="goods.multi_spec">
                                </div>
                                <label for="multi_spec_1" class="ncsc-custom-txt">
                                    <span class="name">多规格商品</span>
                                </label>
                            </div>
                            <div :class="['ncsc-form-custom-radio',(0 == goods.multi_spec) ? 'checked' : '']">
                                <div class="ncsc-custom-radio-frame">
                                    <input type="radio"  value="0" id="multi_spec_0" class="ncsc-custom-radio" v-model="goods.multi_spec">
                                </div>
                                <label for="multi_spec_0" class="ncsc-custom-txt">
                                    <span class="name">单规格商品</span>
                                </label>
                            </div>
                        </div>
                        <input type="text" style="opacity: 0;width: 1px; height:1px; padding:0; border:none" id="g_multi_spec">
                        <p class="ncsc-form-error" v-show="validate.g_multi_spec"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.g_multi_spec}}</label></p>
                    </div>
                    <a href="javascript:;" class="btn-manage-attr  mb10" @click="openManageDialog"><span>管理属性</span><i :class="[manageDialog ? 'fa-angle-up' : 'fa-angle-down','fa' ]"></i></a><span class="c-gray fs12 ml20">(点击可对已添加的属性/规格进行删除管理)</span>
                    <div class="manage-attr mb20" v-show="manageDialog">
                        <div class="ncsc-search-form">
                            <input id="search_attr" type="text" class="w200 mr5" name="attr_name" value="" placeholder="输入商品属性名称搜索" v-model="manageAttr.pageParams.tempAttrName">
                            <a href="javascript:;" id="btn_search_attr" class="ncsc-btn" @click="manageAttrSearch">搜索</a>
                        </div>
                        <div id="search_attr_wrapper">
                            <div class="operate-bar">
                                <label for="manageAll" class="mr10"><input type="checkbox" id="manageAll" v-model="manageAttr.checkAllState" @click="manageAttrcheckall">全选</label>
                                <a href="javascript:;" class="ncsc-btn-mini mr5" @click="openDelDialog(1)">删除</a>
                            </div>
                            <qm-table :pageParams="manageAttr.pageParams">
                                <template slot="table">
                                    <table class="ncsc-default-table">
                                        <thead>
                                        <tr>
                                            <th class="w15"></th>
                                            <th class="w200">商品属性名称</th>
                                            <th>属性规格</th>
                                            <th class="w110">是否存在商品</th>
                                            <th class="w120">操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in manageAttr.attrList">
                                            <td><input type="checkbox" class="checkitem" :disabled="item.goods_exist == 1" :value="item.id" v-model="manageAttr.checkState" @click="manageAttrCheck(item.id)"></td>
                                            <td>{{item.attr_name}}</td>
                                            <td>{{item.attr_value instanceof Array ? item.attr_value.join('/') : ''}}</td>
                                            <td>{{item.goods_exist ? '是' :'否'}}</td>
                                            <td class="handle">
                                                <p>
                                                    <a href="javascript:;" class="ncsc-btn" @click="manageAttrOpenSpecDialog(item.attr_name)" v-if="item.type == 1">编辑</a>
                                                    <a href="javascript:;" :class="[item.goods_exist ? 'disabled' : '','ncsc-btn']" @click="openDelDialog(0,item)">删除</a>
                                                </p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </template>
                            </qm-table>
                            <qm-pagination :pageParams="manageAttr.pageParams" @changeIndex="changeManageAttrIndex($event)" :scrollTop="false"></qm-pagination>
                        </div>
                    </div>
                    <div class="ncsc-form-tit">属性配置</div>
                    <table class="ncsc-table-spec ncsc-table-set-attr" cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th class="col1"></th>
                            <th class="col2">
                                商品属性<el-tooltip placement="right-start" effect="light" popper-class="atooltip" >
                                    <div slot="content" class="toolTipCont">
                                        <img src="@/assets/seller/images/seller/example/goods-attr.png" alt="">
                                    </div>

                                    <p class="lightBlue">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                    </p>
                                </el-tooltip>
                            </th>
                            <th class="col3">商品规格</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="platformAttrs instanceof Array && platformAttrs.length > 0">
                            <td class="col1">
                                <p class="ncsc-attr-name">平台属性</p>
                            </td>
                            <td colspan="2">
                                <ul class="ncsc-list-attr" id="platform_attr">
                                    <li v-for="(item,index) in platformAttrs" :key="index">
                                        <template v-if="item.attr_type == 1">
                                            <div class="ncsc-attr-tit">
                                                <p class="ncsc-attr-name">{{item.attr_name}}</p>
                                                <a href="javascript:;" class="ncsc-btn-spec" @click="dropAttr(index,0)">[删除属性]</a>
                                            </div>
                                            <div class="ncsc-attr-detail">
                                                <div class="ncsc-form-group spec-checkall" v-show="item.value instanceof Array && item.value.length > 0">
                                                    <div  :class="[item.selectAll ? 'checked' : '','ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s']"><div class="ncsc-custom-checkbox-frame"><input  @change="attrAllSelect(index,0)" :id="'plat_spec_checkall_'+index" type="checkbox" class="ncsc-custom-checkbox"></div> <label  :for="'plat_spec_checkall_'+index" class="ncsc-custom-checkbox-txt">规格全选</label></div>
                                                </div>
                                                <div class="ncsc-form-group">
                                                    <div :class="[item2.select ? 'checked' : '','ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s']" v-for="(item2,index2) in item.value">
                                                        <div class="ncsc-custom-checkbox-frame">
                                                            <input :id="'platform_'+index+'_'+index2"  type="checkbox" @change="attrSelect(index,index2,0)"  class="ncsc-custom-checkbox">
                                                        </div>
                                                        <label :for="'platform_'+index+'_'+index2" class="ncsc-custom-checkbox-txt">{{item2.attr_value_name}}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else-if="item.attr_type == 2">
                                            <div class="ncsc-attr-tit">
                                                <p class="ncsc-attr-name">{{item.attr_name}}</p>
                                                <a href="javascript:;" class="ncsc-btn-spec"  @click="dropAttr(index,0)">[删除属性]</a>
                                            </div>
                                            <div class="ncsc-attr-detail">
                                                <input type="text" class="ncsc-input-txt" v-model="item.value" autocomplete="off">
                                            </div>
                                        </template>
                                        <template v-else-if="item.attr_type == 3">
                                            <div class="ncsc-attr-tit">
                                                <p class="ncsc-attr-name">{{item.attr_name}}</p>
                                                <a href="javascript:;" class="ncsc-btn-spec" @click="dropAttr(index,0)">[删除属性]</a>
                                            </div>
                                            <div class="ncsc-attr-detail">
                                                <select class="w150" @change="changeAttr($event,index)">
                                                    <option value="">请选择</option>
                                                    <option :value="item2.attr_value_name" v-for="item2 in item.value" :selected="item2.attr_value_name == item.select_value">{{item2.attr_value_name}}</option>
                                                </select>
                                            </div>
                                        </template>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="col1">
                                <p class="ncsc-attr-name">自定义属性</p>
                                <a href="javascript:;" class="ncsc-btn-spec" @click="attrDialog = true">[增加属性]</a>
                            </td>
                            <td colspan="2">
                                <ul class="ncsc-list-attr">
                                    <template v-if="storeAttrs instanceof Array && storeAttrs.length > 0">
                                        <li v-for="(item,index) in storeAttrs" :key="index" v-if="item.show">
                                            <template v-if="item.type == 1">
                                                <div class="ncsc-attr-tit">
                                                    <p class="ncsc-attr-name">{{item.attr_name}}</p>
                                                    <a href="javascript:;" class="ncsc-btn-spec" @click="openSpecDialog(item.attr_name,index)">[编辑规格]</a>
                                                    <a href="javascript:;" class="ncsc-btn-spec" @click="dropAttr(index,1)">[删除属性]</a>
                                                </div>
                                                <div class="ncsc-attr-detail">
                                                    <div class="ncsc-form-group spec-checkall" v-show="item.attr_value instanceof Array && item.attr_value.length > 0">
                                                        <div  :class="[item.selectAll ? 'checked' : '','ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s']"><div class="ncsc-custom-checkbox-frame"><input  @change="attrAllSelect(index,1)" :id="'spec_checkall_'+index" type="checkbox" class="ncsc-custom-checkbox"></div> <label  :for="'spec_checkall_'+index" class="ncsc-custom-checkbox-txt">规格全选</label></div>
                                                    </div>
                                                    <div class="ncsc-form-group">
                                                        <div :class="[item2.select ? 'checked' : '','ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s']" v-for="(item2,index2) in item.attr_value">
                                                            <div class="ncsc-custom-checkbox-frame">
                                                                <input :id="'store_'+index+'_'+index2"  type="checkbox"  @change="attrSelect(index,index2,1)"  class="ncsc-custom-checkbox">
                                                            </div>
                                                            <label :for="'store_'+index+'_'+index2" class="ncsc-custom-checkbox-txt">{{item2.attr_value_name}}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                            <template v-else-if="item.type == 2">
                                                <div class="ncsc-attr-tit">
                                                    <p class="ncsc-attr-name">{{item.attr_name}}</p>
                                                    <a href="javascript:;" class="ncsc-btn-spec" @click="dropAttr(index,1)">[删除属性]</a>
                                                </div>
                                                <div class="ncsc-attr-detail">
                                                    <input type="text" class="ncsc-input-txt"  autocomplete="off" v-model="item.attr_value">
                                                </div>
                                            </template>
                                        </li>
                                    </template>
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <input type="number" style="opacity: 0;width: 1px; height:1px; padding:0; border:none" id="promotion_notice">
                    <p class="ncsc-form-error" v-show="promotionNotice"><label class="error"><i class="fa fa-exclamation-circle"></i>{{promotionNotice}}</label></p>
                    <div class="ncsc-form-tit mt15" v-if="goodsAttrName.length > 0">单品配置
                      <span class="tips" v-if="!filterMode">筛选模式下，支持对商品规格进行筛选批量填写信息</span>
                      <span class="tips" v-if="filterMode">在标题栏中输入或选择规格进行筛选批量填充</span>
                      <div class="mr filter_button">
                        <input v-if="!filterMode" type="button" value="进入筛选模式" class="ncsc-btn ncsc-btn-orange-rim h30" @click="filterMode=!filterMode">
                        <input v-if="filterMode" type="button" value="批量填充" class="ncsc-btn ncsc-btn-orange h30" @click="filterChange=!filterChange">
                        <input v-if="filterMode" type="button" value="退出筛选模式" class="ncsc-btn ncsc-btn-orange-rim h30" @click="filterMode=!filterMode">
                      </div>
                    </div>
                    <div v-if="goodsAttrName.length > 0">
                        <QmGoodsSku @goodsChange="goodsChange" :filterMode.sync="filterMode" :filterChange.sync="filterChange" :goodsAttr="goodsAttrProp" :specTitle="specTitle" :goodsAttrChecked="goodsAttrChecked" :goods="goods" :originGoodsAttrName.sync = "originGoodsAttrName" :originSpValue = "originSpValue"></QmGoodsSku>
                        <input type="text" style="opacity: 0;width: 1px; height:1px; padding:0; border:none" id="g_spec">
                        <p class="ncsc-form-error" v-show="validate.g_spec"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.g_spec}}</label></p>
                    </div>
                    <template v-if="goods.multi_spec == 0">
                        <div class="ncsc-form-item">
                            <div class="ncsc-form-tit"><i class="required">*</i>商品原价</div>
                            <input  v-model="goods.goods_marketprice" @keyup="onlyNumberPrice($event,'goods.goods_marketprice')"  type="text" id="g_marketprice" class="input-add-on w100" autocomplete="off"><em class="add-on">元</em><p class="ncsc-form-error" v-show="validate.g_marketprice"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.g_marketprice}}</label></p>
                        </div>
                        <div class="ncsc-form-item">
                            <div class="ncsc-form-tit">商品折扣</div>
                            <input  type="text" class="input-add-on w100" id="goodsDiscount" :value="goodsDiscount" @keyup="calPrice" autocomplete="off"><em class="add-on">%</em>
                            <p class="ncsc-form-error" v-show="validate.goodsDiscount"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.goodsDiscount}}</label></p>
                            <p class="ncsc-form-hint ncsc-form-hint-s">商品折扣和商品售价只需填写一项即可；商品折扣仅支持输入1-100的正整数</p>
                        </div>
                        <div class="ncsc-form-item">
                            <div class="ncsc-form-tit"><i class="required">*</i>商品售价</div>
                            <input v-model="goods.goods_price" @keyup="onlyNumberPrice($event,'goods.goods_price')" type="text" class="input-add-on w100" autocomplete="off" id="g_price"><em class="add-on">元</em>
                            <p class="ncsc-form-error" v-show="validate.g_price"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.g_price}}</label></p>
                            <p class="ncsc-form-hint ncsc-form-hint-s">此价格为商品实际销售价格，如果商品存在规格，该价格显示最低价格。</p>
                        </div>
                        <div class="ncsc-form-item">
                            <div class="ncsc-form-tit"><i class="required">*</i>商品库存</div>
                            <input  v-model="goods.goods_storage" type="text" class="ncsc-form-control w140" autocomplete="off" maxlength="7" @keyup="onlyInteage($event,'goods.goods_storage')" id="g_storage">
                            <p class="ncsc-form-error" v-show="validate.g_storage"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.g_storage}}</label></p>
                        </div>
                        <div class="ncsc-form-item">
                            <div class="ncsc-form-tit">商品条形码</div>
                            <input  v-model="goods.goods_barcode" type="text" class="ncsc-form-control w200" autocomplete="off" @input="onlyInteage2($event,'goods.goods_barcode')">
                            <p class="hint">可手动输入，也可以使用巴枪扫码输入</p>
                        </div>
                        <div class="ncsc-form-item">
                            <div class="ncsc-form-tit">库存预警值</div>
                            <input  v-model="goods.goods_storage_alarm" type="text" class="ncsc-form-control w140" maxlength="3" autocomplete="off" @keyup="onlyInteage($event,'goods.goods_storage_alarm')">
                            <p class="hint">请填写0~255的数字，0为不预警。</p>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div v-show="!isSupplierGoods">
            <div class="ncsc-mod-section">
                <div class="ncsc-mod-hd" onselectstart="return false;">
                    <div class="ncsc-title">商品详情描述</div>
                    <div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section" @click="section.section3 = !section.section3"><i :class="['fa',section.section3 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
                </div>
                <div class="ncsc-mod-bd" v-show="section.section3">
                    <div class="ncsc-form-item">
                        <div class="ncsc-form-tit">商品视频</div>
                        <input v-model="goods.goods_youku_url" type="text" class="ncsc-form-control w400" autocomplete="off">
                        <p class="hint">需插入优酷视频通用代码链接</p>
                    </div>
                    <div class="ncsc-form-item">
                        <div class="ncsc-form-tit">商品描述</div>
                        <div>
                            <Kindeditor :options="kindEditor" v-model="kindEditor.editorText" ref="kindeditor"></Kindeditor>
                        </div>
                        <div class="mt15">
                            <a href="javascript:void(0);" class="ncsc-btn" @click="openDescPicSpace">{{descPicSpace ? '关闭图片空间' :'从图片空间选择'}}</a>
                            <qm-pic-space :goodsPicSpace="descPicSpace" :classList="descSpace.classList"
                                          :picList="descSpace.picList" :pageParams="descSpace.pageParams"
                                          @changePicSpaceIndex="changeDescSpaceIndex" @insertLogo="insertDesc"
                            ></qm-pic-space>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isSupplierGoods">
            <div class="ncsc-mod-section">
                <div class="ncsc-mod-hd" onselectstart="return false;">
                    <div class="ncsc-title">商品基本信息</div>
                    <div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section" @click="section.section1 = !section.section1"><i :class="['fa',section.section1 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
                </div>
                <div class="ncsc-mod-bd" v-show="section.section1">
                    <div class="ncsc-form-item">
                        <div class="ncsc-form-tit"><i class="required">*</i>商品分类</div>
                      <div id="gcategory">
                        {{goodsClass.gc_tag_name}}
                        <a class="ncsc-btn ncsc-btn-orange-rim ml5" href="javascript:;" @click="$router.push({name:'store_goods_add_step_one',params:{commonId:goodsParams.commonId,gc_id_3:goodsClass.class_id,is_system:goodsClass.is_system,gc_id_2:goodsClass.gc_id_2,gc_id_1:goodsClass.gc_id_1}})">编辑</a>
                      </div>
                    </div>
                    <div class="ncsc-form-item goods-search">
                        <div class="ncsc-form-tit"><i class="required">*</i>商品名称</div>
                        <div>
                            {{goods.goods_name}}
                        </div>
                    </div>
                    <div class="ncsc-form-item">
                        <div class="ncsc-form-tit">商品副标题</div>
                        {{goods.goods_jingle}}
                    </div>
                    <div class="ncsc-form-item">
                        <div class="ncsc-form-tit"><i class="required">*</i>商品图片</div>
                        <div class="ncsc-goodspic-list ncsc-upload-img-list">
                                <div class="ncsc-upload-img-item" v-for="(file,idx) in files">
                                    <div class="ncsc-upload-img-box" v-show="file">
                                        <div class="ncsc-upload-avatar">
                                            <img :src="file" @click="showDialog(file)">
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <div class="ncsc-mod-section">
                <div class="ncsc-mod-hd" onselectstart="return false;">
                    <div class="ncsc-title">商品属性</div>
                    <div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section" @click="section.section2 = !section.section2"><i :class="['fa',section.section2 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
                </div>
                <div class="ncsc-mod-bd" v-show="section.section2">
                    <div class="ncsc-form-item">
                        <div class="ncsc-form-tit">
                            <i class="required">*</i>商品类型
                            <el-tooltip placement="right-start" effect="light" popper-class="atooltip" >
                                <div slot="content" class="toolTipCont">
                                    <img src="@/assets/seller/images/seller/example/goods-spec.png" alt="">
                                </div>

                                <p class="lightBlue">
                                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                                </p>
                            </el-tooltip>
                        </div>
                        <div>{{goods.multi_spec == 1 ? '多规格商品' : '单规格商品'}}</div>
                    </div>
                    <div class="ncsc-form-tit" v-if="showAttrConfig">
                        属性配置
                    </div>
                    <table class="ncsc-table-spec ncsc-table-set-attr" cellpadding="0" cellspacing="0" v-if="showAttrConfig">
                        <thead>
                        <tr>
                            <th class="col1"></th>
                            <th class="col2">
                                商品属性<el-tooltip placement="right-start" effect="light" popper-class="atooltip" >
                                <div slot="content" class="toolTipCont">
                                    <img src="@/assets/seller/images/seller/example/goods-attr.png" alt="">
                                </div>

                                <p class="lightBlue">
                                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                                </p>
                            </el-tooltip>
                            </th>
                            <th class="col3">商品规格</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="showPlatAttrConfig">
                            <td class="col1">
                                <p class="ncsc-attr-name">平台属性</p>
                            </td>
                            <td colspan="2">
                                <ul class="ncsc-list-attr">
                                    <template v-for="(item,index) in platformAttrs">
                                        <li v-if="item.attr_type == 1 && item.select">
                                            <div class="ncsc-attr-tit">
                                                <p class="ncsc-attr-name">{{item.attr_name}}</p>
                                            </div>
                                            <div class="ncsc-attr-detail">
                                                <div class="ncsc-form-group">
                                                    <div :class="[item2.select ? 'checked' : '','ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s']" v-for="(item2,index2) in item.value" v-if="item2.select">
                                                        <div class="ncsc-custom-checkbox-frame">
                                                            <input disabled :id="'platform_'+index+'_'+index2"  type="checkbox" @change="attrSelect(index,index2,0)"  class="ncsc-custom-checkbox">
                                                        </div>
                                                        <label :for="'platform_'+index+'_'+index2" class="ncsc-custom-checkbox-txt">{{item2.attr_value_name}}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li v-else-if="item.attr_type == 2 && item.value">
                                            <div class="ncsc-attr-tit">
                                                <p class="ncsc-attr-name">{{item.attr_name}}</p>
                                            </div>
                                            <div class="ncsc-attr-detail">
                                                <span>{{item.value}}</span>
                                            </div>
                                        </li>
                                        <li v-else-if="item.attr_type == 3 && item.select_value">
                                            <div class="ncsc-attr-tit">
                                                <p class="ncsc-attr-name">{{item.attr_name}}</p>
                                            </div>
                                            <div class="ncsc-attr-detail">
                                                <!--<span v-for="item2 in item.value" v-if="item2.select">{{item2.attr_value_name}}</span>-->
                                                <span>{{item.select_value}}</span>
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </td>
                        </tr>
                        <tr v-if="showStoreAttrConfig">
                            <td class="col1">
                                <p class="ncsc-attr-name">自定义属性</p>
                            </td>
                            <td colspan="2">
                                <ul class="ncsc-list-attr">
                                    <template v-if="storeAttrs instanceof Array && storeAttrs.length > 0">
                                        <li v-for="(item,index) in storeAttrs" :key="index" v-if="item.show">
                                            <template v-if="item.type == 1">
                                                <div class="ncsc-attr-tit">
                                                    <p class="ncsc-attr-name">{{item.attr_name}}</p>
                                                </div>
                                                <div class="ncsc-attr-detail">
                                                    <div class="ncsc-form-group">
                                                        <div :class="[item2.select ? 'checked' : '','ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s']" v-for="(item2,index2) in item.attr_value">
                                                            <div class="ncsc-custom-checkbox-frame">
                                                                <input disabled :id="'store_'+index+'_'+index2"  type="checkbox"  @change="attrSelect(index,index2,1)"  class="ncsc-custom-checkbox">
                                                            </div>
                                                            <label :for="'store_'+index+'_'+index2" class="ncsc-custom-checkbox-txt">{{item2.attr_value_name}}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                            <template v-else-if="item.type == 2">
                                                <div class="ncsc-attr-tit">
                                                    <p class="ncsc-attr-name">{{item.attr_name}}</p>
                                                </div>
                                                <div class="ncsc-attr-detail">
                                                    <!--<input type="text" class="ncsc-input-txt"  autocomplete="off" v-model="item.attr_value">-->
                                                    <span>{{item.attr_value}}</span>
                                                </div>
                                            </template>
                                        </li>
                                    </template>
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <input type="number" style="opacity: 0;width: 1px; height:1px; padding:0; border:none" id="promotion_notice">
                    <p class="ncsc-form-error" v-show="promotionNotice"><label class="error"><i class="fa fa-exclamation-circle"></i>{{promotionNotice}}</label></p>
                    <div class="ncsc-form-tit mt15" v-if="goodsAttrName.length > 0">单品配置
                      <span class="tips" v-if="!filterMode">筛选模式下，支持对商品规格进行筛选批量填写信息</span>
                      <span class="tips" v-if="filterMode">在标题栏中输入或选择规格进行筛选批量填充</span>
                      <div class="mr filter_button">
                        <input v-if="!filterMode" type="button" value="进入筛选模式" class="ncsc-btn ncsc-btn-orange-rim h30" @click="filterMode=!filterMode">
                        <input v-if="filterMode" type="button" value="批量填充" class="ncsc-btn ncsc-btn-orange h30" @click="filterChange=!filterChange">
                        <input v-if="filterMode" type="button" value="退出筛选模式" class="ncsc-btn ncsc-btn-orange-rim h30" @click="filterMode=!filterMode">
                      </div>
                    </div>
                    <div v-if="goodsAttrName.length > 0">
                        <QmGoodsSku :filterMode.sync="filterMode" :filterChange.sync="filterChange"  :goodsAttr="goodsAttrProp" :specTitle="specTitle" :goodsAttrChecked="goodsAttrChecked" :goods="goods" :originGoodsAttrName.sync = "originGoodsAttrName" :originSpValue = "originSpValue"></QmGoodsSku>
                        <input type="number" style="opacity: 0;width: 1px; height:1px; padding:0; border:none" id="g_spec">
                        <p class="ncsc-form-error" v-show="validate.g_spec"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.g_spec}}</label></p>
                    </div>
                    <template v-if="goodsAttrName.length === 0">
                        <div class="ncsc-form-item">
                            <div class="ncsc-form-tit"><i class="required">*</i>商品原价</div>
                            {{goods.goods_marketprice}}
                        </div>
                        <div class="ncsc-form-item">
                            <div class="ncsc-form-tit">商品折扣</div>
                            <input  type="text" class="input-add-on w100" id="goodsDiscount" :value="goodsDiscount" @keyup="calPrice" autocomplete="off"><em class="add-on">%</em>
                            <p class="ncsc-form-error" v-show="validate.goodsDiscount"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.goodsDiscount}}</label></p>
                            <p class="ncsc-form-hint ncsc-form-hint-s">商品折扣和商品售价只需填写一项即可；商品折扣仅支持输入小于等于100的正整数</p>
                        </div>
                        <div class="ncsc-form-item">
                            <div class="ncsc-form-tit"><i class="required">*</i>商品售价</div>
                            <input v-model="goods.goods_price" type="text" class="input-add-on w100" @keyup="onlyNumberPrice($event,'goods.goods_price')" autocomplete="off" id="g_price"><em class="add-on">元</em>
                            <p class="ncsc-form-error" v-show="validate.g_price"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.g_price}}</label></p>
                            <p class="ncsc-form-hint ncsc-form-hint-s">此价格为商品实际销售价格，如果商品存在规格，该价格显示最低价格。</p>
                        </div>
                        <div class="ncsc-form-item">
                            <div class="ncsc-form-tit"><i class="required">*</i>商品库存</div>
                            <input  v-model="goods.goods_storage" type="text" class="ncsc-form-control w140" autocomplete="off" maxlength="7" @keyup="onlyInteage($event,'goods.goods_storage')" id="g_storage">
                            <p class="ncsc-form-error" v-show="validate.g_storage"><label class="error"><i class="fa fa-exclamation-circle"></i>{{validate.g_storage}}</label></p>
                        </div>
                        <div class="ncsc-form-item" v-if="goods.goods_barcode">
                            <div class="ncsc-form-tit">商品条形码</div>
                            {{langeFrant(goods.goods_barcode)}}
                        </div>
                        <div class="ncsc-form-item">
                            <div class="ncsc-form-tit">库存预警值</div>
                            <input  v-model="goods.goods_storage_alarm" type="text" class="ncsc-form-control w140" autocomplete="off" maxlength="3" @keyup="onlyInteage($event,'goods.goods_storage_alarm')">
                            <p class="hint">请填写0~255的数字，0为不预警。</p>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div v-show="isSupplierGoods">
            <div class="ncsc-mod-section">
                <div class="ncsc-mod-hd" onselectstart="return false;">
                    <div class="ncsc-title">商品详情描述</div>
                    <div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section" @click="section.section3 = !section.section3"><i :class="['fa',section.section3 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
                </div>
                <div class="ncsc-mod-bd" v-show="section.section3">
                    <div class="ncsc-form-item" v-if="goods.brand_name">
                        <div class="ncsc-form-tit">商品品牌</div>
                        {{goods.brand_name}}
                    </div>
                    <div class="ncsc-form-item" v-if="goods.goods_youku_url">
                        <div class="ncsc-form-tit">商品视频</div>
                        {{goods.goods_youku_url}}
                    </div>
                    <div class="ncsc-form-item">
                        <div class="ncsc-form-tit">商品描述</div>
                        <div>
                            <Kindeditor :options="kindEditor" v-model="kindEditor.editorText" ref="kindeditor2" :readonly = "true"></Kindeditor>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ncsc-mod-section" v-if="seller_distribution == 1">
        <div class="ncsc-mod-hd" onselectstart="return false;">
          <div class="ncsc-title">商品物流信息</div>
          <div class="ncsc-collapse js-collapse" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section" @click="section.section4 = !section.section4"><i :class="['fa',section.section4 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
        </div>
        <div class="ncsc-mod-bd" v-show="section.section4">
          <div class="ncsc-form-item">
            <div class="ncsc-form-tit">配送费模板</div>
            <div class="ncsc-form-custom-radio-group">
              <div :class="['ncsc-form-custom-radio',(item.template_id == goods.delivery_template_id) ? 'checked' : '']" v-for="item in template">
                <div class="ncsc-custom-radio-frame">
                  <input type="radio"  :value="item.template_id" :id="'template_id_'+item.template_id" class="ncsc-custom-radio" v-model="goods.delivery_template_id">
                </div>
                <label :for="'template_id_'+item.template_id" class="ncsc-custom-txt">
                  <span class="name">{{item.template_name}}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="ncsc-form-item">
            <div class="ncsc-form-tit">免配送费</div>
            <div class="ncsc-form-custom-radio-group">
              <div :class="['ncsc-form-custom-radio',(1 == goods.goods_free) ? 'checked' : '']">
                <div class="ncsc-custom-radio-frame">
                  <input type="radio" name="goods_free" value="1" id="goods_free_1" class="ncsc-custom-radio" v-model="goods.goods_free">
                </div>
                <label for="goods_free_1" class="ncsc-custom-txt">
                  <span class="name">是</span>
                </label>
              </div>
              <div :class="['ncsc-form-custom-radio',(0 == goods.goods_free) ? 'checked' : '']">
                <div class="ncsc-custom-radio-frame">
                  <input type="radio" name="goods_free" value="0" id="goods_free_0" class="ncsc-custom-radio" v-model="goods.goods_free">
                </div>
                <label for="goods_free_0" class="ncsc-custom-txt">
                  <span class="name">否</span>
                </label>
              </div>
            </div>
            <p class="tiptxt" v-if="1 == goods.goods_free">注：为保护商家收益，免配送费商品与非免配送费商品一同下单时，订单仍收取配送费</p>
          </div>
        </div>
      </div>
      <div class="ncsc-mod-section">
        <div class="ncsc-mod-hd" onselectstart="return false;">
           <div class="ncsc-title">商品搜索热词</div>
           <div class="ncsc-collapse js-collapse hide" data-target=".ncsc-mod-bd" data-wrap='.ncsc-mod-section' @click="section.section5 = !section.section5"><i :class="['fa',section.section5 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
        </div>
        <div class="ncsc-mod-bd" v-show="section.section5">
            <p class="hint mt0 mb10">商品最多可设置20个搜索热词</p>
            <input type="text" class="text ncsc-form-control w200" v-model="recommendWord">
            <a href="JavaScript:void(0);" class="btn-txt-orange ml15" @click="addRecommendWord">添加</a>
            <div><p class="ncsc-form-error">{{recommendWordErr}}</p></div>
            <ul class="ncsc-list-recommend">
               <li v-for="(item,i) in goods.recommendWord" :key="i">{{item}}<div class="ncsc-btn-del" @click="remRecommendWord(i)">×</div></li>
            </ul>
        </div>
      </div>
      <div class="ncsc-mod-section">
        <div class="ncsc-mod-hd" onselectstart="return false;">
          <div class="ncsc-title">其他信息</div>
          <div class="ncsc-collapse js-collapse hide" data-target=".ncsc-mod-bd" data-wrap=".ncsc-mod-section" @click="section.section6 = !section.section6"><i :class="['fa',section.section6 ? 'fa-angle-up' : 'fa-angle-down']"></i></div>
        </div>
        <div class="ncsc-mod-bd" v-show="section.section6">
          <div class="ncsc-form-item" v-if="storeGoodsClass.length > 0">
            <div class="ncsc-form-tit">店铺首页推荐分类</div>
            <div class="ncsc-form-group">
              <div :class="['ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s',(stcidsArray.indexOf(item.stc_id) > -1) ? 'checked' : '']" v-for="item in storeGoodsClass">
                <div class="ncsc-custom-checkbox-frame">
                  <input :id="'stc_id_'+item.stc_id" type="checkbox" :value="item.stc_id"  class="ncsc-custom-checkbox" v-model="stcidsArray">
                </div>
                <label :for="'stc_id_'+item.stc_id" class="ncsc-custom-checkbox-txt">{{item.stc_name}}</label>
              </div>
            </div>
          </div>
          <div class="ncsc-form-item">
            <div class="ncsc-form-tit">商品发布</div>
            <div class="ncsc-form-custom-radio-group">
              <div :class="['ncsc-form-custom-radio',(1 == goods.goods_state) ? 'checked' : '']">
                <div class="ncsc-custom-radio-frame">
                  <input type="radio" name="g_state" value="1" id="g_state_1" class="ncsc-custom-radio" v-model="goods.goods_state">
                </div>
                <label for="g_state_1" class="ncsc-custom-txt">
                  <span class="name">立即发布</span>
                </label>
              </div>
              <div :class="['ncsc-form-custom-radio',(0 == goods.goods_state) ? 'checked' : '']">
                <div class="ncsc-custom-radio-frame">
                  <input type="radio" name="g_state" value="0" id="g_state_0" class="ncsc-custom-radio" v-model="goods.goods_state">
                </div>
                <label for="g_state_0" class="ncsc-custom-txt">
                  <span class="name">放入仓库</span>
                </label>
              </div>
            </div>
          </div>
          <div class="ncsc-form-item">
            <div class="ncsc-form-tit">推荐</div>
            <div class="ncsc-form-custom-radio-group">
              <div :class="['ncsc-form-custom-radio',(1 == goods.goods_commend) ? 'checked' : '']">
                <div class="ncsc-custom-radio-frame">
                  <input type="radio" name="g_commend" value="1" id="g_commend_1" v-model="goods.goods_commend" class="ncsc-custom-radio">
                </div>
                <label for="g_commend_1" class="ncsc-custom-txt">
                  <span class="name">是</span>
                </label>
              </div>
              <div :class="['ncsc-form-custom-radio',(0 == goods.goods_commend) ? 'checked' : '']">
                <div class="ncsc-custom-radio-frame">
                  <input type="radio" name="g_commend" value="0" id="g_commend_0" v-model="goods.goods_commend" class="ncsc-custom-radio">
                </div>
                <label for="g_commend_0" class="ncsc-custom-txt">
                  <span class="name">否</span>
                </label>
              </div>
            </div>
          </div>
          <div class="ncsc-form-item">
            <div class="ncsc-form-tit">新品</div>
            <div class="ncsc-form-custom-radio-group">
              <div :class="['ncsc-form-custom-radio',(1 == goods.goods_new) ? 'checked' : '']">

                <div class="ncsc-custom-radio-frame">
                  <input type="radio" name="goods_new" value="1" id="goods_new_1" class="ncsc-custom-radio" v-model="goods.goods_new">
                </div>
                <label for="goods_new_1" class="ncsc-custom-txt">
                  <span class="name">是</span>
                </label>
              </div>
              <div :class="['ncsc-form-custom-radio',(0 == goods.goods_new) ? 'checked' : '']">
                <div class="ncsc-custom-radio-frame">
                  <input type="radio" name="goods_new" value="0" id="goods_new_0" class="ncsc-custom-radio" v-model="goods.goods_new">
                </div>
                <label for="goods_new_0" class="ncsc-custom-txt">
                  <span class="name">否</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom ml50">
        <label class="submit-border">
          <input type="submit" class="submit" :value="(goodsAttrName.length > 0 && !isSupplierGoods || !goodsParams.commonId) ? '下一步，提交' : '提交'" @click="submit">
        </label>
      </div>
      <qm-dialog :dialogVisible="attrDialog" :width="'600px'" @close="attrDialogClose">
        <template slot="title">添加属性</template>
        <template slot="content" >
          <div class="dialog_content">
            <div class="eject_con eject_con_attr">
              <div class="ncsc-form-group eject-attr-used">
                <div :class="[addAttr.existAttr.indexOf(index) > -1 ? 'checked' : '','ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s']" v-for="(item,index) in storeAttrs" v-if="item.type == 2 || (item.type == 1 && goods.multi_spec  == 1)">
                  <div class="ncsc-custom-checkbox-frame">
                    <input type="checkbox" :id="'add_attr'+index" :value="index" v-model="addAttr.existAttr" class="ncsc-custom-checkbox" @click="addAttr.isAdd = false">
                  </div>
                  <label :for="'add_attr'+index" class="ncsc-custom-checkbox-txt">{{item.attr_name}}</label>
                </div>
              </div>
              <div class="new-attr-box">
                <div :class="[addAttr.isAdd ? 'checked' : '','ncsc-form-custom-checkbox','ncsc-form-custom-checkbox-s']">
                  <div class="ncsc-custom-checkbox-frame">
                    <input type="checkbox" id="add_attr" class="ncsc-custom-checkbox" v-model="addAttr.isAdd" @click="addAttr.existAttr = []">
                  </div>
                  <label for="add_attr" class="ncsc-custom-checkbox-txt">新增属性</label>
                </div>
                <div class="new-attr-con" v-show="addAttr.isAdd">
                  <div class="ncsc-form-s mt10">
                    <span class="w70 tr">名称：</span>
                    <input type="text" class="ncsc-form-control w300" v-model="addAttr.attrName">
                  </div>
                  <div class="ncsc-form-s mt10">
                    <span class="w70 tr">多规格：</span>
                    <div class="ncsc-form-custom-radio-group ncsc-form-inline" v-if="goods.multi_spec == 1">
                      <div :class="[addAttr.isMultiSpec == 1 ? 'checked' : '','ncsc-form-custom-radio']">
                        <div class="ncsc-custom-radio-frame">
                          <input type="radio" id="is_multi_spec" value="1" v-model="addAttr.isMultiSpec"  class="ncsc-custom-radio">
                        </div>
                        <label for="is_multi_spec" class="ncsc-custom-txt">
                          <span class="name">是</span>
                        </label>
                      </div>
                      <div :class="[addAttr.isMultiSpec == 2 ? 'checked' : '','ncsc-form-custom-radio']">
                        <div class="ncsc-custom-radio-frame">
                          <input type="radio" id="is_not_multi_spec" value="2" v-model="addAttr.isMultiSpec"  class="ncsc-custom-radio">
                        </div>
                        <label for="is_not_multi_spec" class="ncsc-custom-txt">
                          <span class="name">否</span>
                        </label>
                      </div>
                    </div>
                    <span v-else>否</span>
                  </div>
                  <div class="ncsc-form-s mt10" v-show="addAttr.isMultiSpec == 1">
                    <span class="w70 tr">新增规格：</span>
                    <textarea   cols="50" rows="5" class="w400 h110" v-model.trim="addAttr.specValue"></textarea>
                    <p class="hint" style="margin-left: 75px">如有多个规格，一个规格写一行</p>
                  </div>
                </div>
              </div>
              <div class="error-txt mt20" v-show="addAttr.errorMsg"></div>
              <div class="bottom">
                <a href="javascript:void(0);"  class="ncsc-btn ncsc-btn-orange" @click="attrConfirm">确定</a>
                <a href="javascript:;" class="ncsc-btn js-dialog-close" @click="attrDialogClose">取消</a>
              </div>
            </div>
          </div>
        </template>
      </qm-dialog>
      <qm-dialog :dialogVisible="specDialog" :width="'600px'" @close="specDialog = false">
        <template slot="title">编辑规格</template>
        <template slot="content" >
          <div class="dialog_content">
            <div class="eject_con">
              <dl>
                <dt>商品属性名称：</dt>
                <dd>{{addSpec.attrName}}</dd>
              </dl>
              <dl>
                <dt>原商品规格：</dt>
                <dd>
                  <ul class="list-spec">
                    <li v-for="item in addSpec.specList">{{item.value}}<a  class="btn-del-spec" v-if="!item.goods_exist" @click="delAttributeValue(item.value)">×</a></li>
                  </ul>
                  <p class="fs12 c-gray">规格下已有商品，则对应规格选项不允许删除</p>
                </dd>
              </dl>
              <dl>
                <dt>新增规格：</dt>
                <dd>
                  <textarea name=""  cols="50" rows="5" class="w400 h110" v-model="addSpec.specValue"></textarea>
                  <p class="hint">如有多个规格，一个规格写一行</p>
                </dd>
              </dl>
              <div  class="error-txt mt20" v-show="addSpec.errorMsg">{{addSpec.errorMsg}}</div>
              <div class="bottom">
                <a href="javascript:void(0);" class="ncsc-btn ncsc-btn-orange" @click="specConfirm">确定</a>
                <a href="javascript:;" class="ncsc-btn js-dialog-close" @click="specDialog=false">取消</a>
              </div>
            </div>
          </div>
        </template>
      </qm-dialog>
      <qm-tips :tipsVisible.sync="manageAttr.delDialog" :width="'420px'"  @close="manageAttr.delDialog = false" @confirm="confirmDel()">
        <template slot="title">提示信息</template>
        <template slot="content">您确定要删除吗?</template>
      </qm-tips>
    </div>
        <qm-dialog-img :imageUrl="imgSrc" :imageDialog="showImg" @close="showImg=false">
    </qm-dialog-img>
  </div>
</template>

<script>
    import util from 'lib/utils/util';
    import {mapGetters,mapActions} from 'vuex';
    import 'viewerjs/dist/viewer.css';
    import fileUpload from 'lib/utils/fileUpload';
    import QmPagination from 'component/qm-pagination/index';
    import QmDialog from 'component/qm-dialog/index';
    import QmTable from 'component/qm-table/index';
    import QmGoodsSku from 'component/qm-goods-sku';
    import QmPicSpace from 'component/qm-pic-space';
    import Kindeditor from 'component/kindeditor';
    import {storeGoodsOnline,storeGoodsAdd,getGoodsPromotion} from 'api'
    import QmTips from 'component/qm-tips/index';
    import storage from 'lib/utils/storage';
    import env from "../../../../config/url";
    import QmDialogImg from "component/qm-dialog-img/index";
    import draggable from 'vuedraggable';
    import mixin from 'component/main/mixin';
    export default {
        name: "add-step-two",
        mixins:[mixin],
        data() {
            return {
              filterMode:false,
              filterChange:false,
              showImg:false,
                add_step_two_submit_operate:false,//防止重复提交
              imgSrc:"",
              kindEditor:{
                editorText:'',
                items:[
                  'source', '|', 'fullscreen', 'undo', 'redo', 'print', 'cut', 'copy', 'paste',
                  'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                  'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                  'superscript', '|', 'selectall', 'clearhtml','quickformat','|',
                  'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                  'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'multiimage', 'flash', 'media', 'table', 'hr', 'emoticons', 'link', 'unlink', '|', 'image'
                ],
                allowImageUpload:true,
                allowFlashUpload:false,
                allowMediaUpload:false,
                allowFileManager:false,
                resizeType:1,
                uploadJson:env.fileUrl+'/File/upload?key='+storage.get('key'),
                width:'750px',
                height:'419px'
              },
              goodsPicSpace:false,
              descPicSpace:false,
              picSpace:{
                picList:[],
                classList:[],
                pageParams:{
                  pageIndex:0,
                  pageSize:14,
                  total:0,
                  aclassId:0
                }
              },
              descSpace:{
                picList:[],
                classList:[],
                pageParams:{
                  pageIndex:0,
                  pageSize:14,
                  total:0,
                  aclassId:0
                }
              },
              fileMax:false,
              files:[''],
              viewerOptions: {
                toolbar: false,
                navbar:false,
                fullscreen:false
              },
              addAttr:{//添加属性弹窗内容
                isAdd:0,
                attrName:'',
                isMultiSpec:0,
                errorMsg:'',
                existAttr:[],
                specValue:''
              },
              addSpec:{//添加规格弹窗内容
                attrName:'',
                index:'',
                specList:[],
                errorMsg:'',
                specValue:''
              },
              manageAttr:{//管理属性
                checkState:[],
                checkAllState:false,
                attrList:[],
                pageParams:{
                  gcId1:this.gcId1,
                  attrName:'',
                  pageIndex:0,
                  pageSize:5,
                  total:0,
                  tempAttrName:''//点击搜索按钮时赋值给attrName
                },
                delDialog:false,
                delDialogType:0,
                id:0
              },
              specDialog:false,
              attrDialog:false,
              manageDialog:false,
              goodsParams:{
                commonId:0,
                classId:0,
                isStoreThird:0
              },
              goodsClass:{
                gc_tag_name:'',
                gc_id_1:0,
                gc_id_2:0,
                gc_id_3:0,
                goods_class_t_id:0,
                class_id:0,
                is_system:0
              },
              platformAttrs:[],
              storeAttrs:[],
              spValue:[],
              goodsAttrName:[],
              originGoodsAttrName:[],
              originSpValue:[],
              originGoodsState:0,
              goodsAttrChecked:{},
              goods:{
                multi_spec:1,
                goods_marketprice:'',
                goods_price:'',
                goods_storage:'',
                goods_storage_alarm:'',
                goods_barcode:'',
                goods_free:0,
                goods_name:'',
                goods_jingle:'',
                goods_youku_url:'',
                goods_body:'',
                goods_commend:0,
                goods_state:1,
                goods_new:0,
                delivery_template_id:0,
                storage_goods_commonid:0,
                brand_name:'',
                recommendWord:[]
              },
              recommendWord:'',
              recommendWordErr:'',
              gcId1:0,
              seller_distribution:1,
              template:[],
              storeGoodsClass:[],
              stcidsArray:[],
              showAttrConfig:false,//用于供应商处复制来的商品,
              showPlatAttrConfig:false,//用于供应商处复制来的商品,
              showStoreAttrConfig:false,//用于供应商处复制来的商品,
              timeout:0,
              search:{
                searchParams:{
                  goodsName:'',
                  pageIndex:0,
                  pageSize:10
                },
                searchList:[],
                show:false
              },
              isSupplierGoods:false,
              validate:{
                g_name:'',
                g_jingle:'',
                g_price:'',
                g_marketprice:'',
                g_storage:'',
                g_spec:'',
                g_image:'',
                goodsDiscount:'',
                g_multi_spec:'',
              },
              section:{
                section1:true,
                section2:true,
                section3:true,
                section4:true,
                section5:true,
                section6:false,
              },
              specTitle:{
                market_price:{
                  input:true,
                  text:'原价(元)',
                  required:true,
                  width:'w110',
                  inputWidth:'w80',
                  inputValue:''
                },
                price:{
                  input:true,
                  text:'售价(元)',
                  required:true,
                  width:'w110',
                  inputWidth:'w80',
                  inputValue:''
                },
                stock:{
                  input:true,
                  text:'库存(件)',
                  required:true,
                  width:'w115',
                  inputWidth:'w80',
                  inputValue:''
                },
                barcode:{
                  input:true,
                  text:'条形码',
                  required:false,
                  width:'w60',
                  inputWidth:'w70',
                  inputValue:''
                },
                sku:{
                  input:true,
                  text:'库存预警',
                  required:false,
                  width:'w60',
                  inputWidth:'w80',
                  inputValue:''
                }
              },
              promotion:[],
              promotionNotice:''
            }
        },

        computed:{
          ...mapGetters({
            metaData:'getMetaData',
            imagePathConfig:'getImagePathConfig',
            ImageIp:'getImageIp',
          }),
          goodsAttrProp:function () {
            return{
              spValue:this.spValue,
              goodsAttrName:this.goodsAttrName,
              goodsAttr:this.goods.goods_attr
            }
          },
          goodsDiscount:function () {
            let price = parseFloat(this.goods.goods_price),
              market_price = parseFloat(this.goods.goods_marketprice);
            if(price >= 0 && market_price >= 0) {
              if(market_price == 0) {
                this.goods.goods_price = 0;
                return 0;
              }
              let goodsDiscount = util.discount(price,market_price);
              if(goodsDiscount > 100) {
                this.validate.goodsDiscount = '商品折扣仅支持输入0-100的整数';
              }else{
                this.validate.goodsDiscount = '';
              }
              return goodsDiscount;
            }else{
              return '';
            }
          },
          dragOptions() {
            return {
              animation: 200,
              disabled: false,
            };
          }
        },

        components:{
          QmPagination,
          QmDialog,
          QmTable,
          QmGoodsSku,
          QmPicSpace,
          QmTips,
          Kindeditor,
          QmDialogImg,
          draggable
        },

        methods: {
          ...mapActions({
            uploadFile:'uploadFile',
            multipleUploadFile:'multipleUploadFile'
          }),
          ...mapActions('storeGoodsAdd',{
            getGoodsInfo:'getGoodsInfo'
          }),
          
          /*商品名称检索*/
          scrollEvent(e) {
            var nDivHight = e.target.clientHeight;
            var nScrollHight = e.target.scrollHeight;
            var nScrollTop = e.target.scrollTop;
            if(nScrollTop + nDivHight >= nScrollHight){
              this.search.searchParams.pageIndex += 1;
              this.searchFun();
            }
          },
          searchFun() {
            let val = this.goods.goods_name.trim();
            if(val) {
              this.search.searchParams.goodsName = val;
              clearTimeout(this.timeout);
              this.timeout = setTimeout(()=> {
                this.searchData();
              },500);
            }else{
              this.search.searchList = [];
              this.search.show = false;
            }
          },
          searchData() {
            storeGoodsAdd.getGoodsList(this.search.searchParams).then(res=>{
                if(this.search.searchParams.pageIndex > 0) {
                  this.search.searchList = this.search.searchList.concat(res.list);
                }else{
                  this.search.searchList = res.list;
                }
                if(this.search.searchList.length === 0) {
                  this.search.show = false;
                }else{
                  this.search.show = true;
                }
            })
          },
          /*商品名称检索*/
          calPrice(e) {
            e.target.value = e.target.value.replace(/\D/g,'');
            let value = parseInt(e.target.value);
            if(value >= 0) {
              this.goods.goods_price = util.number_format((this.goods.goods_marketprice*100*value/10000),2);
            }else{
              this.goods.goods_price = '';
            }
          },
          onContentChange(val){
            this.kindEditor.editorText = val
          },
          /* 商品图片空间 */
          openGoodsPicSpace() {
            this.goodsPicSpace = !this.goodsPicSpace;
            if(this.goodsPicSpace === true) {
              this.getPicSpace();
            }
          },
          changePicSpace(val) {
            this.picSpace.pageParams.aclassId = val;
            this.getPicSpace();
          },
          getPicSpace() {
            storeGoodsAdd.getPicList(this.picSpace.pageParams).then(res=>{
              this.picSpace.classList = res.classList;
              this.picSpace.picList = res.picList;
              this.picSpace.classList = res.classList;
              var newPageParams = _.clone(this.picSpace.pageParams)
              newPageParams.total = res.total;
              this.picSpace.pageParams = newPageParams;
            })
          },
          changePicSpaceIndex(index){
            this.picSpace.pageParams.pageIndex = index;
            this.getPicSpace();
          },
          insertLogo(pic) {
            for (let idx in this.files) {
              if(!this.files[idx]) {
                this.updateFiles(idx,pic,true);
                if(this.files.length < 5){
                  this.files.push('');
                }
                break;
              }
            }
          },
          /* 商品图片空间 */
          /* 商品描述图片空间 */
          openDescPicSpace() {
            this.descPicSpace = !this.descPicSpace;
            if(this.descPicSpace === true) {
              this.getDescSpace();
            }
          },
          changeDescSpace(val) {
            this.picSpace.pageParams.aclassId = val;
            this.getPicSpace();
          },
          getDescSpace() {
            storeGoodsAdd.getPicList(this.descSpace.pageParams).then(res=>{
              this.descSpace.classList = res.classList;
              this.descSpace.picList = res.picList;
              this.descSpace.classList = res.classList;
              var newPageParams = _.clone(this.descSpace.pageParams)
              newPageParams.total = res.total;
              this.descSpace.pageParams = newPageParams;
            })
          },
          changeDescSpaceIndex(index){
            this.descSpace.pageParams.pageIndex = index;
            this.getDescSpace();
          },
          insertDesc(pic) {
            //this.kindEditor.editorText += '<img src="'+pic+'" data-ke-src="'+pic+'">';
            this.$refs.kindeditor.appendHtml('<img src="'+pic+'" data-ke-src="'+pic+'">');
          },
          /* 商品描述图片空间 */
          /* 上传图片 */
          addPicSpace(file,imgPath){
            let data={
              name:file['name'],
              size:file['size'],
              img:imgPath
            }
            storeGoodsAdd.insertPicSpace(data)
          },
          logoLoad(event,idx){
            var key = this.metaData.key;
            var type = 1;
            fileUpload.logoLoad(event,key,type,this.uploadFile).then(res => {
              this.addPicSpace(event.target.files[0],res.imgPath);
              this.updateFiles(idx,res.imgPath)
            })
          },
          deleteLogo(idx){
            this.updateFiles(idx,'');
            var len = this.files.length-1
            if(len != idx){
              this.files.splice(idx,1);
            }
            var len = this.files.length-1;
            if(this.files[len] && len < 5){
              this.files.push('');
            }
          },
          updateFiles(idx,imgPath,fullPath){
            var f = _.clone(this.files)
            fullPath = fullPath || false;
            f[idx] = imgPath?(fullPath ? imgPath : (this.ImageIp + imgPath)):''
            if(!f.includes('')){
              this.fileMax = true
            }else{
              this.fileMax = false
            }
            this.files = f
          },
          beforeMulti(){
            if(this.fileMax){
              util.msg('图片仅支持设置 5 张，已达上限')
              return
            }
          },
          multipleUpload(event){
            // if(event.target.files.length > 5){
            //   util.msg("图片仅支持设置五张，已达上限");
            //   return;
            // }
            var vm = this
            // 先将未上传的图片的的下标找出
            var fIndex = [];
            vm.files.forEach((file,f)=>{
              if(file === ''){
                fIndex.push(f);
              }
            })
            for (let i=0; i<event.target.files.length;i++) {
              var item = event.target.files[i];
              var imageBase641 = item;
                var file_tag1 = vm.metaData.key;
                var data1 = {key:'', file_tag:file_tag1,base64Str:imageBase641,type:1,is_suf:1}
                var data = [data1]
                fileUpload.multipleUploadFile(data).then((resp)=>{
                  if(resp[0]){
                    var idx = vm.files.findIndex(function (f) {
                      return f === ''
                    })
                    if(this.files.length < 5){
                      this.files.push('');
                    }
                    if(idx === -1){
                      return;
                    }
                    vm.addPicSpace(item,resp[0].data.responseContent.imgPath);
                    vm.updateFiles(idx,resp[0].data.responseContent.imgPath)
                  }
                })
            }
          },
          /* 上传图片 */
          /* 管理属性 */
          openDelDialog(type,item) {
            if(type === 1) {
              if(this.manageAttr.checkState.length === 0) {
                util.msg('请选择要操作的记录');
                return;
              }
            }else{
              if(item.goods_exist == 1) {
                util.msg('该属性已创建商品，暂不支持删除');
                return;
              }
              this.manageAttr.id = item.id;
            }
            this.manageAttr.delDialog = true;
            this.manageAttr.delDialogType = type;
          },
          async confirmDel() {
            let res;
            if(this.manageAttr.delDialogType === 1) {//批量删除
              res = await storeGoodsAdd.delStoreAttribute({gcId1:this.gcId1,ids:this.manageAttr.checkState.join(',')})
            }else{
              res = await storeGoodsAdd.delStoreAttribute({gcId1:this.gcId1,ids:this.manageAttr.id})
            }
            util.msg(res.shortMessage);
            if(res.resultCode === 1) {
              this.manageAttr.delDialog = false;
              let getGoodsAttr = false;
              if(this.manageAttr.delDialogType === 1) {
                  let index;
                  for (let id of this.manageAttr.checkState) {
                      index = -1;
                      for (let idx in this.storeAttrs) {
                          if(id == this.storeAttrs[idx].id) {
                              index = idx;
                              break;
                          }
                      }
                      if(index > -1) {
                        if(!getGoodsAttr && this.storeAttrs[index].hasOwnProperty('show') && this.storeAttrs[index].show && this.storeAttrs[index].attr_value instanceof  Array && this.storeAttrs[index].attr_value.length > 0) {
                          for (let attr_value of  this.storeAttrs[index].attr_value) {
                            if(attr_value.select) {
                              getGoodsAttr = true;
                              break;
                            }
                          }
                        }
                        this.storeAttrs.splice(index,1);
                      }
                  }
              }else{
                  let index = -1;
                  for (let idx in this.storeAttrs) {
                      if(this.manageAttr.id == this.storeAttrs[idx].id) {
                          index = idx;
                      }
                  }
                  if(index > -1) {
                    if(!getGoodsAttr && this.storeAttrs[index].hasOwnProperty('show') && this.storeAttrs[index].show && this.storeAttrs[index].attr_value instanceof  Array && this.storeAttrs[index].attr_value.length > 0) {
                      for (let attr_value of  this.storeAttrs[index].attr_value) {
                        if(attr_value.select) {
                          getGoodsAttr = true;
                          break;
                        }
                      }
                    }
                    this.storeAttrs.splice(index,1);
                  }
              }
              if(getGoodsAttr) {
                this.getGoodsAttr();
              }
              this.getManageAttrPage();
            }
          },
          openManageDialog() {
            this.manageDialog = !this.manageDialog;
            if(this.manageDialog === true) {
              this.manageAttr.pageParams.gcId1 = this.gcId1;
              this.getManageAttrPage();
            }
          },
          getManageAttrPage() {
            storeGoodsAdd.getStoreAttribute(this.manageAttr.pageParams).then(res=>{
              if(this.manageAttr.pageParams.pageIndex > 0 && res.list.length === 0) {
                this.manageAttr.pageParams.pageIndex -= 1;
                this.getManageAttrPage();
              }else{
                this.manageAttr.attrList = res.list;
                var newPageParams = _.clone(this.manageAttr.pageParams)
                newPageParams.total = res.total;
                this.manageAttr.pageParams = newPageParams;
                //取消复选框的选中
                this.manageAttr.checkState = [];
                this.manageAttr.checkAllState = false;
              }

            });
          },
          manageAttrcheckall(e) {
            this.manageAttr.checkState = [];
            if(e.target.checked === true) {//批量全选
              for(let item of this.manageAttr.attrList) {
                if(item.goods_exist == 0) {
                  this.manageAttr.checkState.push(item.id);
                }
              }
            }
          },
          manageAttrSearch() {
            this.manageAttr.pageParams.attrName = this.manageAttr.pageParams.tempAttrName;
            this.manageAttr.pageParams.pageIndex = 0;
            this.getManageAttrPage();
          },
          manageAttrCheck(id) {
            let index = this.manageAttr.checkState.indexOf(id);
            if(index === -1) {
              this.manageAttr.checkState.push(id);
            }else{
              this.manageAttr.checkState.splice(index, 1);
            }
          },
          changeManageAttrIndex(index){
            this.manageAttr.pageParams.pageIndex = index;
            this.getManageAttrPage();
          },
          /* 管理属性 */
          delAttributeValue(attrValue) {
            storeGoodsAdd.delStoreAttributeValue({gcId1:this.gcId1,attrName:this.addSpec.attrName,attrValue:attrValue}).then(res=>{
              if(res.resultCode === 1) {
                for (let i in this.addSpec.specList) {
                  if(this.addSpec.specList[i].value === attrValue) {
                    this.addSpec.specList.splice(i,1);
                    break;
                  }
                }
                for (let i in this.storeAttrs[this.addSpec.index].attr_value) {
                  if(this.storeAttrs[this.addSpec.index].attr_value[i].attr_value_name === attrValue) {
                    this.storeAttrs[this.addSpec.index].attr_value.splice(i,1);
                    break;
                  }
                }
                this.getGoodsAttr();
                if(this.manageDialog === true) {
                  for (let item of this.manageAttr.attrList) {//如果管理属性的列表展开并且修改属性的在列表上就刷新列表
                    if(item.attr_name === this.addSpec.attrName) {
                      this.getManageAttrPage();
                      return;
                    }
                  }
                }
              }
            })
          },
          openSpecDialog(attr_name,index) {
            this.addSpec.attrName = attr_name;
            this.addSpec.index = index;
            this.specDialog = true;
            storeGoodsAdd.getStoreAttributeValue({gcId1:this.gcId1,attrName:this.addSpec.attrName}).then(res=>{
              this.addSpec.specList = res.list;
            })
          },
          manageAttrOpenSpecDialog(attr_name) {
            let index = -1;
            if(this.storeAttrs instanceof Array && this.storeAttrs.length > 0) {
              for (let idx in this.storeAttrs) {
                if(this.storeAttrs[idx].attr_name == attr_name && this.storeAttrs[idx].type == 1) {
                  index = idx;
                  break;
                }
              }
            }
            this.openSpecDialog(attr_name,index);
          },
          specConfirm() {
            if(!this.addSpec.specValue) {
              this.specDialog = false;
              return;
            }
            this.addSpec.specValue = this.addSpec.specValue.trim();
            let textarea,index;
            textarea = this.addSpec.specValue.split(/\n/g);
            for (let idx in this.storeAttrs[this.addSpec.index].attr_value) {
              index = textarea.indexOf(this.storeAttrs[this.addSpec.index].attr_value[idx].attr_value_name);
              if(index > -1) {//如果添加的是已经存在的规格
                textarea.splice(index,1);
                if(this.storeAttrs[this.addSpec.index].show) {
                  this.storeAttrs[this.addSpec.index].attr_value[idx].select = true;
                }
                if(_.isEmpty(textarea)) {
                  this.specDialog = false;
                  this.addSpec = {
                    attrName:'',
                    index:'',
                    specList:[],
                    errorMsg:'',
                    specValue:''
                  };
                  return;
                }
              }
            }
            for (let item of textarea) {
              if(item !== '') {
                this.storeAttrs[this.addSpec.index].attr_value.push({attr_value_name:item,select:this.storeAttrs[this.addSpec.index].show ? true : false});
              }
            }
            let attrName = this.addSpec.attrName;
            let idx = this.addSpec.index;
            storeGoodsAdd.addStoreAttributeValue({gcId1:this.gcId1,attrName:attrName,attrValues:textarea}).then(res=>{
              this.storeAttrs[idx].id = res.responseContent.id;
              if(this.manageDialog === true) {
                if(this.manageAttr.attrList.length < this.manageAttr.pageParams.pageSize) {//如果管理属性的列表展开并且条数小于5条
                  this.getManageAttrPage();
                  return;
                }
                for (let item of this.manageAttr.attrList) {//如果管理属性的列表展开并且修改属性的在列表上就刷新列表
                  if(item.attr_name === attrName) {
                    this.getManageAttrPage();
                    break;
                  }
                }
              }
            });
            this.specDialog = false;
            this.getGoodsAttr();
            this.addSpec = {
              attrName:'',
              index:'',
              specList:[],
              errorMsg:'',
              specValue:''
            };
          },
          attrDialogClose(){
            this.attrDialog = false;
            this.addAttr = {
              isAdd:0,
              attrName:'',
              isMultiSpec:0,
              errorMsg:'',
              existAttr:[],
              specValue:''
            };
          },
          attrConfirm() {
            if(this.addAttr.existAttr.length > 0) {
              let tempAttr = [],tempAttr2 = [];
              for(let item of this.addAttr.existAttr) {
                //排序 按商家勾选商品属性的顺序
                let attr = _.clone(this.storeAttrs[item]);
                attr.show = true;
                this.storeAttrs[item].remove = true;
                tempAttr.push(attr);
              }
              for (let item of this.storeAttrs) {
                if(!item.hasOwnProperty('remove')){
                  tempAttr2.push(item)
                }
              }
              this.storeAttrs = tempAttr2.concat(tempAttr);
              this.getGoodsAttr();//调整排序
            }else{
              this.addAttr.attrName = this.addAttr.attrName.trim();
              if(this.addAttr.attrName) {
                if(this.goods.multi_spec == 0) {
                  this.addAttr.isMultiSpec = 2;
                }
                if(this.addAttr.isMultiSpec == 0) {
                  util.msg('请选择是否多规格');
                  return;
                }
                if(this.addAttr.isMultiSpec == 1 && this.addAttr.specValue === '') {
                  util.msg('请填写需要填写的规格值');
                  return;
                }
                for (let item of this.storeAttrs) {
                  if(item.attr_name == this.addAttr.attrName) {
                    util.msg('属性"'+this.addAttr.attrName+'"已存在');
                    return;
                  }
                }
                for (let item of this.platformAttrs) {
                  if(item.attr_name === this.addAttr.attrName) {
                    util.msg('属性"'+this.addAttr.attrName+'"已存在,若要添加,请先删除平台属性"'+this.addAttr.attrName+'"')
                    return;
                  }
                }
                if(this.addAttr.isMultiSpec == 1) {
                  let len = this.storeAttrs.push({
                    attr_name:this.addAttr.attrName,
                    attr_value:[],
                    show:true,
                    type:1
                  });
                  this.addSpec.specValue = this.addAttr.specValue;
                  this.addSpec.index = len-1;
                  this.specConfirm();
                }else{
                  this.storeAttrs.push({
                    attr_name:this.addAttr.attrName,
                    attr_value:'',
                    show:true,
                    type:2
                  });
                }
              }else{
                util.msg('请填写属性名称');
                return;
              }
            }
            this.attrDialog = false;
            this.addAttr = {
              isAdd:0,
              attrName:'',
              isMultiSpec:0,
              errorMsg:'',
              existAttr:[],
              specValue:''
            };
          },
          dropAttr(index,type){//type 0:平台 1:店铺
            if(type == 0) {
              this.platformAttrs.splice(index,1);
            }else{
              this.storeAttrs[index].select = false;
              this.storeAttrs[index].show = false;
              if(this.storeAttrs[index].hasOwnProperty('attr_value') && this.storeAttrs[index].attr_value instanceof Array) {
                for (let item of this.storeAttrs[index].attr_value) {
                  item.select = false;
                }
              }
            }
            this.getGoodsAttr();
          },
          attrSelect(index,index2,type) {//type 0:平台 1:店铺
            if(type == 0) {
              this.platformAttrs[index].value[index2].select = !this.platformAttrs[index].value[index2].select;
            }else{
              this.storeAttrs[index].attr_value[index2].select = !this.storeAttrs[index].attr_value[index2].select;
            }
            this.getGoodsAttr();
          },
          attrAllSelect(index,type) {//type 0:平台 1:店铺
            if(type == 1) {
              if(this.storeAttrs[index].selectAll) {
                this.storeAttrs[index].selectAll = false;
              }else{
                this.storeAttrs[index].selectAll = true;
              }
              for (let item of this.storeAttrs[index].attr_value) {
                item.select = this.storeAttrs[index].selectAll;
              }
            }else{
              if(this.platformAttrs[index].selectAll) {
                this.platformAttrs[index].selectAll = false;
              }else{
                this.platformAttrs[index].selectAll = true;
              }
              for (let item of this.platformAttrs[index].value) {
                item.select = this.platformAttrs[index].selectAll;
              }
            }

            this.getGoodsAttr();
          },
          changeAttr(e,index){
            if(e.target.value) {
              this.platformAttrs[index].select_value = e.target.value;
            }
          },
          getGoodsAttr() {
            let goodsAttrChecked = {},goodsAttrName=[];
            for (let item of this.platformAttrs) {
              if(item.attr_type == 1){
                for(let item2 of item.value) {
                  if(item2.select) {
                    item.select = true;
                    if(goodsAttrChecked.hasOwnProperty(item.attr_name)) {
                      goodsAttrChecked[item.attr_name].push(item2.attr_value_name);
                    }else{
                      goodsAttrName.push(item.attr_name);
                      goodsAttrChecked[item.attr_name] = [item2.attr_value_name];
                    }
                  }
                }
              }
            }
            for (let item of this.storeAttrs) {
              if(item.type == 1 && item.show){
                for(let item2 of item.attr_value) {
                  if(item2.select) {
                    item.select = true;
                    if(goodsAttrChecked.hasOwnProperty(item.attr_name)) {
                      goodsAttrChecked[item.attr_name].push(item2.attr_value_name);
                    }else{
                      goodsAttrName.push(item.attr_name);
                      goodsAttrChecked[item.attr_name] = [item2.attr_value_name];
                    }
                  }
                }
              }
            }
            this.goodsAttrName = goodsAttrName;
            this.goodsAttrChecked = goodsAttrChecked;
            if(goodsAttrName.length === 0){
              this.goodsAttrProp.spValue = [];
            }else{
              this.goods.multi_spec = 1;
            }
          },
          getGoods(id) {
            let commonId = id ? id : this.goodsParams.commonId;
            let params = {
              ...this.goodsParams,
              commonId:commonId
            }

            let newParams = _.clone(params);
            if(!newParams.classId){
              newParams.classId = 0;
            }
            if(!newParams.isStoreThird){
              newParams.isStoreThird = 0;
            }
            if(commonId > 0) {
              this.getGoodsInfo(newParams).then(res=>{
              //storeGoodsAdd.getEditGoodsList(this.goodsParams).then(res=>{
                if(res.resultCode === 1) {
                  let data = res.responseContent;
                  data.goodsClass.is_system = data.goodsClass.gc_id_3 ? 1: 0;
                  data.goodsClass.class_id = data.goodsClass.gc_id_3 ? data.goodsClass.gc_id_3 : data.goodsClass.goods_class_t_id;
                  this.goodsClass = data.goodsClass;
                  this.platformAttrs = data.platformAttrs;
                  this.storeAttrs = data.storeAttrs;
                  this.spValue = data.spValue;
                  //添加is_show字段
                  this.spValue.forEach((item,k) => {
                    this.spValue[k]['is_show'] = true;
                  })
                  //this.originSpValue = _.clone(JSON.parse(JSON.stringify(this.spValue)));
                  this.originSpValue = _.clone(this.spValue);
                  this.goodsAttrName = data.goodsAttrName;
                  this.originGoodsAttrName = _.clone(this.goodsAttrName);
                  this.originGoodsState = data.goods.goods_state;
                  if(id) {
                    data.goods.goods_state = 1;
                    this.originGoodsState = 0;
                  }
                  data.goods.multi_spec = data.goodsAttrName.length > 0 ? 1 : 0;
                  this.goods = data.goods;
                  if(!this.goodsParams.classId) {
                    if(this.goods.goods_class_t_id){
                      this.goodsParams.classId = this.goods.goods_class_t_id;
                      this.goodsParams.isStoreThird = 1
                    }else{
                      this.goodsParams.classId = this.goods.gc_id;
                    }
                  }
                  this.files = [];
                  for (let idx in data.goods.img) {
                    this.files[idx] = data.goods.img[idx];
                  }
                  if(data.goods.img && data.goods.img.length == 5) {
                    this.fileMax = true;
                  }else{
                    this.files.push('');
                  }
                  this.gcId1 = data.goods.gc_id_1;
                  this.template = data.template;
                  this.storeGoodsClass = data.storeGoodsClass;
                  this.stcidsArray = data.stcidsArray;
                  this.seller_distribution = data.storeInfo.seller_distribution;

                  this.kindEditor.editorText = data.goods.goods_body;
                  if(this.goods.storage_goods_commonid > 0 && !id) {
                    this.isSupplierGoods = true;
                    this.specTitle.market_price.input =false;
                    this.specTitle.barcode.input =false;
                    this.$refs.kindeditor2.html(this.kindEditor.editorText)
                    this.supplierGoods();
                  }else{
                    this.$refs.kindeditor.html(this.kindEditor.editorText)
                  }
                  this.getGoodsAttr();
                }else{
                  util.msg(res.shortMessage);
                }
              })
            }else{
              storeGoodsAdd.getAddStepTwoList(this.goodsParams).then(res=>{
                if(res.resultCode === 1) {
                  let data = res.responseContent;
                  data.goodsClass.is_system = data.goodsClass.gc_id_3 ? 1 : 0;
                  data.goodsClass.class_id = data.goodsClass.gc_id_3 ? data.goodsClass.gc_id_3 : data.goodsClass.goods_class_t_id;
                  this.goodsClass = data.goodsClass;
                  this.platformAttrs = data.platformAttrs;
                  this.storeAttrs = data.storeAttrs;
                  this.gcId1 = data.gc_id_1;
                  this.template = data.template;
                  this.storeGoodsClass = data.storeGoodsClass;
                  this.seller_distribution = data.storeInfo.seller_distribution;
                  this.goods.goods_storage_alarm = data.storeInfo.default_storage_alarm;
                  this.goods.multi_spec = 1;
                  this.goods.delivery_template_id = data.chooseTemplateId;
                }else{
                  util.msg(res.shortMessage);
                }
              })
            }
          },
          supplierGoods() {
            if(this.platformAttrs instanceof Array &&  this.platformAttrs.length > 0) {
              for (let idx in this.platformAttrs) {
                if(this.platformAttrs[idx].attr_type ==3) {
                  if(this.platformAttrs[idx].select_value) {
                    this.showPlatAttrConfig = true;
                    break;
                  }
                  // for (let item of this.platformAttrs[idx].value) {
                  //   if(item.select) {
                  //     this.showPlatAttrConfig = true;
                  //     this.platformAttrs[idx].select = true;
                  //     break;
                  //   }
                  // }
                }else if(this.platformAttrs[idx].attr_type ==1) {
                  for (let item of this.platformAttrs[idx].value) {
                    if(item.select) {
                      this.showPlatAttrConfig = true;
                      break;
                    }
                  }
                }else if(this.platformAttrs[idx].attr_type ==2) {
                  if(this.platformAttrs[idx].value) {
                    this.showPlatAttrConfig = true;
                  }
                }
              }
            }
            if(this.storeAttrs instanceof Array &&  this.storeAttrs.length > 0) {
              for (let item of this.storeAttrs) {
                if(item.show) {
                  this.showStoreAttrConfig = true;
                }
              }
            }
            if(this.showStoreAttrConfig || this.showPlatAttrConfig) {
              this.showAttrConfig = true;
            }
          },
          downPic(idx){
            console.log('downPic'+idx);
          },
          itemDraggable(event,files){
          },
          specHandle() {
            if(this.goodsAttrName.length > 0) {
              let g_price = 0,
                  g_marketprice = 0,
                  g_storage = 0,
                  g_alarm = 0,
                  goods_barcode = '',
                  g_price_sign = false,
                  g_marketprice_sign = false;
              for (let item of this.goodsAttrProp.spValue) {
                if(item.market_price) {
                  if(!g_marketprice_sign) {
                    g_marketprice = parseFloat(item.market_price);
                    g_marketprice_sign = true;
                  }else{
                    g_marketprice = (parseFloat(item.market_price) > g_marketprice) ? g_marketprice : parseFloat(item.market_price);
                  }
                }
                g_marketprice = parseFloat(g_marketprice).toFixed(2);
                if(item.price) {
                  if(!g_price_sign) {
                    g_price = parseFloat(item.price);
                    g_price_sign = true;
                  }else{
                    g_price = (parseFloat(item.price) > g_price) ? g_price : parseFloat(item.price);
                  }
                }
                g_price = parseFloat(g_price).toFixed(2);
                if(item.stock) {
                  g_storage += item.stock;
                }
                if(item.sku) {
                  g_alarm += item.sku;
                }
                if(item.barcode && !goods_barcode) {
                  goods_barcode = item.barcode;
                }
              }
              this.goods.goods_marketprice = g_marketprice;
              this.goods.goods_price = g_price;
              this.goods.goods_storage = g_storage;
              this.goods.goods_storage_alarm = g_alarm;
              this.goods.goods_barcode = goods_barcode;
            }
          },
          submit() {
              if(this.add_step_two_submit_operate){
                  util.msg('重复提交');
                  return;
              }
            this.specHandle();
            if(this.validateFn() === false){
              return;
            }
            var subFiles = [];
            this.files.map(f=>{
              if(f != ''){
                var imgPath = f.replace(this.ImageIp+this.imagePathConfig.goods,'').replace(f.substring(f.indexOf('?')),'');
                var filename = imgPath;
                imgPath = imgPath.split('/');
                if(imgPath.length >= 2) {
                  filename = imgPath[imgPath.length-1];//修复bug7406 https://img.shenbd.com/mall/store/goods/4/4/4/4/4/4/4/4_06271297999361255.jpg?x-oss-process=image/resize,m_mfit,h_334,w_334 图片路径重复
                }
                subFiles.push(filename)
              }
            });
            let sgcate_id = this.stcidsArray.map(val=>{
              return ''+val;
            });
            let data = {
              img:subFiles,
              spec:JSON.stringify(this.goodsAttrProp.spValue),
              goods_attr_name:this.goodsAttrName,
              goodsAttrChecked:JSON.stringify(this.goodsAttrChecked),
              goods_barcode:this.goods.goods_barcode,
              cate_id:this.goodsParams.isStoreThird == 1 ? 0 : this.goodsParams.classId,
              store_cate_id:this.goodsParams.isStoreThird == 1 ? this.goodsParams.classId : 0,
              g_name:this.goods.goods_name,
              g_jingle:this.goods.goods_jingle,
              g_video:this.goods.goods_youku_url,
              cate_name:this.goodsClass.gc_tag_name,
              type_id:this.goodsClass.type_id,
              g_price:this.goods.goods_price,
              g_marketprice:this.goods.goods_marketprice,
              g_storage:this.goods.goods_storage,
              g_alarm:this.goods.goods_storage_alarm,
              platformAttrs:this.platformAttrs,
              storeAttrs:JSON.stringify(this.storeAttrs),
              g_body:this.kindEditor.editorText,
              g_commend:this.goods.goods_commend,
              goods_new:this.goods.goods_new,
              goods_free:this.goods.goods_free,
              g_state:this.goods.goods_state,
              template_id:this.goods.delivery_template_id,
              sgcate_id:sgcate_id,
              recommend_word:this.goods.recommendWord
            };
            if(this.goodsParams.commonId > 0) {
              data.commonId = this.goodsParams.commonId;
                this.add_step_two_submit_operate=true;//锁定提交
              if(this.goods.storage_goods_commonid > 0) {
                storeGoodsOnline.editStorageSaveGoods(data).then(res=>{
                    this.add_step_two_submit_operate=false;//释放锁定
                  if(res.resultCode == 1) {//前往商品列表
                    util.msg('操作成功');
                    let goods_route_name = storage.get('goods_route_name') || 'store_goods_online_index';
                    this.$router.push({name:goods_route_name});
                  }else{
                    util.msg(res.shortMessage)
                  }
                })
              }else{
                storeGoodsOnline.editSaveGoods(data).then(res=>{
                    this.add_step_two_submit_operate=false;//释放锁定
                  if(res.resultCode == 1) {
                    if(this.goodsAttrName.length > 0) {//第三步
                      this.$router.push({name:'store_goods_add_step_three',params:{commonId:this.goodsParams.commonId}});
                    }else{//商品列表
                      util.msg('操作成功');
                      let goods_route_name = storage.get('goods_route_name') || 'store_goods_online_index';
                      this.$router.push({name:goods_route_name});
                    }
                  }else{
                    util.msg(res.shortMessage)
                  }
                })
              }

            }else{
                this.add_step_two_submit_operate=true;//锁定提交
              storeGoodsAdd.saveGoods(data).then(res=>{
                  this.add_step_two_submit_operate=false;//释放锁定
                if(res.resultCode == 1) {
                    if(this.goodsAttrName.length > 0) {//第三步
                      this.$router.push({name:'store_goods_add_step_three',params:{commonId:res.responseContent.commonId,type:1}});
                    }else{//第四步
                      this.$router.push({name:'store_goods_add_step_four',params:{commonId:res.responseContent.commonId}});
                    }
                }else{
                  util.msg(res.shortMessage);
                }
              })
            }
          },
          validateFn() {
            let id = '';
            this.validate = {
              g_name:'',
              g_jingle:'',
              g_price:'',
              g_marketprice:'',
              g_storage:'',
              g_spec:'',
              g_image:'',
              g_multi_spec:'',
              goodsDiscount:''
            };
            this.promotionNotice = '';
            if(!this.isSupplierGoods) {
              if(this.goods.goods_name === '') {
                this.validate.g_name = '请填写商品名称';
                id = id || 'g_name';
              }else if(this.goods.goods_name.length > 50) {
                this.validate.g_name = '商品名称最长50个字';
                id = id || 'g_name';
              }
              if(this.goods.goods_jingle.length > 140) {
                this.validate.g_jingle = '商品副标题不能超过140个字符';
                id = id || 'g_jingle';
              }
              if(this.files.filter(function(item){return item !==''}).length === 0){
                this.validate.g_image = '请上传商品图片';
                id = id || 'g_image';
              }
            }
            if(this.goods.multi_spec == 1) {
              if(this.goodsAttrName.length > 0) {
                for (let item of this.goodsAttrProp.spValue) {
                  if(item.market_price === '' || item.price === '') {
                    this.validate.g_spec = '请填写商品价格';
                    id = id || 'g_spec';
                    break;
                  }
                  let market_price = parseFloat(item.market_price);
                  let price = parseFloat(item.price);
                  if(isNaN(market_price) || market_price < 0 || isNaN(price) || price < 0) {
                    this.validate.g_spec = '请填写正确的价格';
                    id = id || 'g_spec';
                    break;
                  }
                  if(market_price < price) {
                    this.validate.g_spec = '售价不能大于原价';
                    id = id || 'g_spec';
                    break;
                  }
                  if(item.stock === '') {
                    this.validate.g_spec = '请填写商品库存';
                    id = id || 'g_spec';
                    break
                  }else{
                    let goods_storage = parseInt(item.stock);
                    if(isNaN(goods_storage) || goods_storage < 0) {
                      this.validate.g_spec = '请填写正确的库存数量';
                      id = id || 'g_spec';
                      break
                    }
                  }
                  let sku = parseInt(item.sku);
                  if(isNaN(sku) || sku < 0 || sku > 255) {
                    this.validate.g_spec = '库存预警应为0-255数字';
                    id = id || 'g_spec';
                    break
                  }
                }
              }else{
                this.validate.g_multi_spec = '请先设置商品属性规格';
                id = id || 'g_multi_spec';
              }
            }else{
              if(this.goods.goods_marketprice === '') {
                this.validate.g_marketprice = '请填写商品原价';
                id = id || 'g_marketprice';
              }else{
                let price = parseFloat(this.goods.goods_marketprice);
                if(isNaN(price) || price < 0) {
                  this.validate.g_marketprice = '请填写正确的价格';
                  id = id || 'g_marketprice';
                }
              }
              if(this.goods.goods_price === '') {
                this.validate.g_price = '请填写商品售价';
                id = id || 'g_price';
              }else{
                let price = parseFloat(this.goods.goods_price);
                if(isNaN(price) || price < 0) {
                  this.validate.g_price = '请填写正确的价格';
                  id = id || 'g_price';
                }
              }
              if(this.goodsDiscount > 100) {
                this.validate.goodsDiscount = '商品折扣仅支持输入0-100的整数';
                id = id || 'goodsDiscount';
              }
              if(this.goods.goods_storage === '') {
                this.validate.g_storage = '请填写商品库存';
                id = id || 'g_storage';
              }else{
                let goods_storage = parseInt(this.goods.goods_storage);
                if(isNaN(goods_storage) || goods_storage < 0) {
                  this.validate.g_storage = '请填写正确的库存数量';
                  id = id || 'g_storage';
                }
              }
            }
            for (let key in this.validate) {
              if(this.validate[key]) {
                document.getElementById(id).focus();
                return false;
              }
            }
            if(!this.checkSaleActPrice()) {
                return false;
            }
            for (let item of this.storeAttrs) {
              if(item.type == 2 && item.show && item.attr_value === '') {
                this.promotionNotice = '商品规格空白不能提交';
                document.getElementById('promotion_notice').focus();
                return false;
              }
            }
            return true;
          },
          remRecommendWord(index) {
            this.goods.recommendWord.splice(index,1);
          },
          addRecommendWord() {
            this.recommendWordErr = '';
            var text = this.recommendWord.trim();
            if(!text) {
              this.recommendWordErr = '请输入需要设置的搜索热词';
              return;
            }
            for (var item of this.goods.recommendWord) {
              if(item === text) {
                this.recommendWordErr = '无需重复设置热词';
                return;
              }
            }
            if(this.goods.recommendWord.length >= 20) {
              this.recommendWordErr = '该商品热词已达上限';
              return;
            }
            this.goods.recommendWord.unshift(text);
            this.recommendWord = '';
          },
          showDialog(img){
          this.imgSrc=img
          this.showImg=true
          },
          goodsChange() {
              this.promotionNotice = '';
              if(this.originGoodsState == 0 || (this.originGoodsAttrName.length === 0 && this.spValue.length === 0)) {
                  return;
              }
              let notice = [];
              for(let item of this.promotion) {
                  let promotion = item.promotion;
                  for(let item2 of this.spValue) {
                      if(parseInt(item.goods_id) === parseInt(item2.goods_id)){
                          promotion = [];
                          break;
                      }
                  }
                  for(let item3 of promotion) {
                      if(notice.indexOf(item3) === -1) {
                          notice.push(item3)
                      }
                  }
                  if(notice.length >= 3) {//分销、组合、优惠券
                      break;
                  }
              }
              if(notice.length > 0) {
                  this.promotionNotice = '当前商品参与'+notice.join('/')+'，编辑属性后对应设置将失效';
              }
          },
          checkSaleActPrice() {
              this.promotionNotice = '';
              if(this.originGoodsAttrName.length === 0 && this.spValue.length === 0) {
                  for(let item of this.promotion) {
                      if(item.hasOwnProperty('price') && parseInt(this.goods.goods_id) === parseInt(item.goods_id)){
                          if(parseFloat(this.goods.goods_price) < parseFloat(item.price)) {
                              this.promotionNotice = '当前商品参与分销活动，对应价格为'+item.price+'；不得低于该价格';
                              document.getElementById('promotion_notice').focus();
                              return false;
                          }
                      }
                  }
              }else{
                  let notice = [],promotionNotice = '';
                  for(let item of this.promotion) {
                      for(let item2 of this.spValue) {
                          if(item.hasOwnProperty('price') && parseInt(item.goods_id) === parseInt(item2.goods_id)){
                              if(parseFloat(item2.price) < parseFloat(item.price)) {
                                  let value = _.clone(item2);
                                  value.discount_price = item.price;
                                  notice.push(value)
                                  break;
                              }
                          }
                      }
                  }
                  if(notice.length > 0) {
                      for(let item of notice) {
                          promotionNotice += item.sp_value.join('、')+'参与分销活动,'+'对应价格为'+item.discount_price+';';
                      }
                      promotionNotice += '不得低于对应价格';
                      this.promotionNotice = promotionNotice;
                      document.getElementById('promotion_notice').focus();
                      return false;
                  }
              }
              return true;
          }
        },
        watch:{
          'goods.multi_spec':{
            handler(val) {
              if(val == 0) {
                for (let item of this.platformAttrs) {
                  if(item.attr_type == 1) {
                    item.show = false;
                    if(item.select) {
                      for(let item2 of item.value) {
                        item2.select = false;
                      }
                    }
                  }
                }
                for (let item of this.storeAttrs) {
                  if(item.type == 1){
                    item.show = false;
                    if(item.select){
                      for(let item2 of item.attr_value) {
                        item2.select = false;
                      }
                    }
                  }
                }
                this.goodsAttrName = [];
                this.goodsAttrChecked = {};
                this.goodsAttrProp.spValue = [];
              }
            },
            deep:true
          },
          'goods.goods_name':{
            handler(val) {
              this.validate.g_name = '';
              if(val === '') {
                this.validate.g_name = '请填写商品名称';
              }else if(val.length > 50) {
                this.validate.g_name = '商品名称最长50个字';
              }
            },
            deep:true
          },
          'goods.goods_jingle':{
            handler(val) {
              this.validate.g_jingle = ''
              if(val.length > 140) {
                this.validate.g_jingle = '商品副标题不能超过140个字符';
              }
            },
            deep:true
          },
          'goods.goods_marketprice':{
            handler(val) {
              this.validate.g_marketprice = '';
              if(val === '') {
                this.validate.g_marketprice = '请填写商品原价';
              }else{
                let price = parseFloat(val);
                if(isNaN(price) || price < 0) {
                  this.validate.g_marketprice = '请填写正确的价格';
                }
              }
            },
            deep:true
          },
          'goods.goods_price':{
            handler(val) {
              this.validate.g_price = '';
              if(val === '') {
                this.validate.g_price = '请填写商品售价';
              }else{
                let price = parseFloat(val);
                if(isNaN(price) || price < 0) {
                  this.validate.g_price = '请填写正确的价格';
                }
              }
            },
            deep:true
          },
          'goods.goods_storage':{
            handler(val) {
              this.validate.g_storage = '';
              if(val === '') {
                this.validate.g_storage = '请填写商品库存';
              }else{
                let storage = parseInt(val);
                if(isNaN(storage) || storage < 0)  {
                  this.validate.g_storage = '请填写正确的库存数量';
                }
              }
            },
            deep:true
          },
          'files':{
            handler(val) {
              this.validate.g_image = '';
              if(val.filter(function(item){return item !==''}).length === 0){
                this.validate.g_image = '请上传商品图片';
              }
            },
            deep:true
          },
          'storeAttrs':{
            handler(val) {
              for (let item of val) {
                let selectAll = true;
                if(item.attr_value instanceof  Array && item.attr_value.length > 0) {
                  for (let item2 of item.attr_value) {
                    if(!item2.select) {
                      selectAll = false;
                      item.selectAll = false;
                      break;
                    }
                  }
                  if(selectAll) {
                    item.selectAll = true;
                  }
                }
              }
            },
            deep:true
          },
          'platformAttrs':{
            handler(val) {
              for (let item of val) {
                let selectAll = true;
                if(item.value instanceof  Array && item.value.length > 0) {
                  for (let item2 of item.value) {
                    if(!item2.select) {
                      selectAll = false;
                      item.selectAll = false;
                      break;
                    }
                  }
                  if(selectAll) {
                    item.selectAll = true;
                  }
                }
              }
            },
            deep:true
          },
        },
        mounted () {
          if(this.$route.params.hasOwnProperty('commonId')) {
            this.goodsParams.commonId = this.$route.params.commonId
          }
          if(this.$route.params.hasOwnProperty('classId')) {
            this.goodsParams.classId = this.$route.params.classId
          }
          if(this.$route.params.hasOwnProperty('isStoreThird')) {
            this.goodsParams.isStoreThird = this.$route.params.isStoreThird
          }
          layui.use('layer', function(){
            this.layer = layui.layer;
          });
          this.getGoods();
          if(this.goodsParams.commonId > 0) {
              storeGoodsOnline.getGoodsPromotion({commonId:this.goodsParams.commonId}).then(res=>{
                this.promotion = res.promotion;
              })
          }
        },
        updated(){

        },
    }
</script>
