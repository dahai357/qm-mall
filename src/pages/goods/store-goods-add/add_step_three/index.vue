<style scoped>
  .ncsc-is-focus-attr{padding: 0 50px;}
  .ncsc-is-focus-attr-con{padding:0 10px 0 35px;}
  .ncsc-form-item{padding: 15px 0; font-size: 16px;}
  .ncsc-form-item:first-child{padding-top: 0;}
  .ncsc-goodspic-list .title{background: #f3f3f3; margin-bottom: 20px; line-height: 2.5; font-size: 14px; padding: 0 20px;}
  .ncsc-select-album{background-color: #FFF; margin-top: 20px;}
  .ncsc-goodspic-list:hover .ncsc-select-album{border-color: #CCC;}
  .ncsc-form-goods-pic .ncsc-goodspic-list {padding-bottom: 20px;margin-top: 20px;overflow: hidden;}

  .ncsc-upload-img-list {
    margin: 0 -5px;
    display:inline-block;
  }
  .ncsc-upload-img-list .ncsc-upload-img-item {
    margin: 0 5px;
  }
</style>
<template>
  <div class="ncsc-is-focus-attr">
    <div class="ncsc-form-item">
      <div :class="['ncsc-form-custom-checkbox',setCarousel ? 'checked' : '']">
        <div class="ncsc-custom-checkbox-frame">
          <input id="attr_checkbox" type="checkbox"  class="ncsc-custom-checkbox" v-model="setCarousel">
        </div>
        <label for="attr_checkbox" class="ncsc-custom-checkbox-txt">设置轮播属性</label>
      </div>
    </div>
    <div class="ncsc-is-focus-attr-con" v-show="setCarousel">
      <div class="ncsc-form-item">
        <div class="ncsc-form-tit">选择属性设置轮播图（属性轮播图为单选，仅可设置其中一个属性轮播图生效）</div>
        <div class="ncsc-form-group">
          <div class="ncsc-form-custom-radio-group">
            <div :class="['ncsc-form-custom-radio',key === attrName ? 'checked' : '']" v-for="(item,key,idx) in goodsAttr">
              <div class="ncsc-custom-radio-frame">
                <input type="radio" name="img_type" :id="'attr'+idx"  class="ncsc-custom-radio" :value="key" v-model="attrName">
              </div>
              <label :for="'attr'+idx" class="ncsc-custom-txt">
                <span class="name">{{key}}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="ncsc-form-goods-pic">
        <div class="ncsc-goodspic-list" v-for="(item,key) in img">
          <div class="title">{{attrName}}：{{key}}</div>
          <draggable v-model="img[key]" v-bind="dragOptions" draggable=".draggable" ghost-class="ghost">
          <div v-for="(item2,idx) in img[key]" class="ncsc-upload-img-list" :class="item2.goods_image?'draggable':''">
            <div class="ncsc-upload-img-item">
              <div class="ncsc-upload-img-box" v-if="item2.goods_image">
                <div class="ncsc-upload-avatar js-tips-img"><a @click="showDialog(item2.goods_image)"><img :src="item2.goods_image"></a></div>
                <div class="image-delete" @click="deleteLogo(key,idx)">×</div>
              </div>
              <div class="ncsc-upload-btn" v-if="!item2.goods_image">
                <a href="javascript:void(0);">
                  <!--<input type="file" class="input-file" name="file_0_0"  accept="image/gif, image/jpeg, image/png, image/bmp" @change="logoLoad($event,key,idx)">-->
                  <input type="file" @change="multipleUpload($event,key)" class="input-file" name="multipleImg" accept="image/gif, image/jpeg, image/png, image/bmp" multiple="">
                  <p><i class="ico-upload"></i>图片上传</p>
                </a>
              </div>
            </div>
          </div>
          </draggable>
          <div class="clear"></div>
          <div class="ncsc-select-album">
           <!-- <div class="ncsc-btn btn-multiple-upload-img mr10" @click="beforeMulti(key)" :class="fileMax[key]?'disabled':''">
              <input type="file" @change="multipleUpload($event,key)" :disabled="fileMax[key]" name="multipleImg" class="multiple-upload-img" accept="image/gif, image/jpeg, image/png, image/bmp" multiple="">
              批量上传
            </div>-->
            <a class="ncsc-btn selected" href="javascript:;" @click="openPicSpace(key)">{{picSpaceDialog[key] ? '关闭图片空间' :'从图片空间选择'}}</a>
              <qm-pic-space :goodsPicSpace="picSpaceDialog[key]" :classList="picSpace.classList"
                            :picList="picSpace.picList" :pageParams="picSpace.pageParams"
                            @changePicSpaceIndex="changePicSpaceIndex($event,key)" @insertLogo="insertPic($event,key)"
              ></qm-pic-space>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom ml35"><label class="submit-border"><input type="submit" class="submit" value="提交" @click="submit"></label></div>
    <qm-dialog-img :imageUrl="imgSrc" :imageDialog="showImg" @close="showImg=false">
    </qm-dialog-img>
  </div>
</template>

<script>
    import util from 'lib/utils/util';
    import {mapGetters,mapActions} from 'vuex';
    import fileUpload from 'lib/utils/fileUpload'
    import 'viewerjs/dist/viewer.css'
    import QmPagination from 'component/qm-pagination/index'
    import QmDialog from 'component/qm-dialog/index';
    import QmTable from 'component/qm-table/index';
    import {storeGoodsAdd,storeGoodsOnline} from 'api'
    import QmPicSpace from 'component/qm-pic-space';
    import storage from 'lib/utils/storage';
    import QmDialogImg from "component/qm-dialog-img/index";
    import draggable from 'vuedraggable';
    export default {
        name: "add-step-three",
        data() {
            return {
              showImg:false,
              imgSrc:"",
              commonId:0,
              img:{},
              allImage:[],
              attrName:'',
              yuanAttrName:'',
              goodsAttr:[],
              setCarousel:false,
              fileMax:{},
              picSpaceDialog:{},
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
              originImg:[],
              originAttrName:'',
              type:0
            }
        },
        computed:{
          ...mapGetters({
            metaData:'getMetaData',
            imagePathConfig:'getImagePathConfig',
            ImageIp:'getImageIp',
          }),
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
          QmPicSpace,
          draggable,
          QmDialogImg
        },

        methods: {
          ...mapActions({
            uploadFile:'uploadFile',
            multipleUploadFile:'multipleUploadFile'
          }),
          addPicSpace(file,imgPath){
            let data={
              name:file['name'],
              size:file['size'],
              img:imgPath
            }
            storeGoodsAdd.insertPicSpace(data)
          },
          submit() {
            let img = JSON.parse(JSON.stringify(this.img)),i;//深复制
            for(let key in img) {
              let pass = false;
              for(let idx in img[key]) {
                let f = img[key][idx].goods_image;
                if(f != '') {
                  pass = true;
                  var imgPath = f.replace(this.ImageIp+this.imagePathConfig.goods,'').replace(f.substring(f.indexOf('?')),'');
                  var filename = '';
                  var imgPath = imgPath.split('/');
                  if(imgPath.length >= 2) {
                    filename = imgPath[imgPath.length-1];//修复bug7406 https://img.shenbd.com/mall/store/goods/4/4/4/4/4/4/4/4_06271297999361255.jpg?x-oss-process=image/resize,m_mfit,h_334,w_334 图片路径重复
                  }
                  img[key][idx].goods_image =filename
                }else{
                  img[key].splice(idx,1);
                }
              }
              if(!pass) {
                util.msg('每个属性都必须至少有一张图片');
                return;
              }
            }
            console.log(img)
            img = JSON.stringify(img);
            if(this.setCarousel === true && (img === '{}' || img === '[]')) {
              util.msg('每个属性都必须至少有一张图片');
              return;
            }
            let data = {
              commonid:this.commonId,
              img:img,
              attr_name:this.attrName
            };
            storeGoodsOnline.editSaveImage(data).then(res=>{
              if(res.resultCode == 1) {
                if(this.type === 1) {
                  this.$router.push({name:'store_goods_add_step_four',params:{commonId:this.commonId}});
                }else{
                  //商品列表
                  util.msg('操作成功');
                  let goods_route_name = storage.get('goods_route_name') || 'store_goods_online_index';
                  this.$router.push({name:goods_route_name});
                }
              }else{
                util.msg(res.shortMessage);
              }
            })
          },
          openPicSpace(key) {
            var picSpaceDialog = _.clone(this.picSpaceDialog);
            picSpaceDialog[key] = !(picSpaceDialog[key]);
            this.picSpaceDialog = picSpaceDialog;
            if(this.picSpaceDialog[key] === true) {
              this.getPicSpace();
            }
          },
          insertPic(pic,key) {
            for (let idx in this.img[key]){
              if(!this.img[key][idx].goods_image) {
                this.updateFiles(key,idx,pic,true);
                break;
              }
            }
            if(this.img[key].length < 5){
              var newItem = {
                goods_image:'',
                goods_image_id:0
              }
              this.img[key].push(newItem);
            }
            this.allImage[this.attrName] = this.img;
          },
          changePicSpaceIndex(index,key){
            this.picSpace.pageParams.pageIndex = index;
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

          logoLoad(event,key,idx){
            var metakey = this.metaData.key;
            var type = 1;
            fileUpload.logoLoad(event,metakey,type,this.uploadFile).then(res => {
              this.addPicSpace(event.target.files[0],res.imgPath);
              this.updateFiles(key,idx,res.imgPath)
            })
          },
          deleteLogo(key,idx){
            this.updateFiles(key,idx,'');
            var len = this.img[key].length-1
            if(len != idx){
              this.img[key].splice(idx,1);
            }
            var len = this.img[key].length-1;
            if(this.img[key][len].goods_image && len < 5){
              var newItem = {
                goods_image:'',
                goods_image_id:0
              }
              this.img[key].push(newItem);
            }
          },
          updateFiles(key,idx,imgPath,fullPath){
            var f = _.clone(this.img)
            fullPath = fullPath || false;
            f[key][idx].goods_image = imgPath?(fullPath ? imgPath : (this.ImageIp + imgPath)):''
            this.fileMax[key] = true;
            for (let item of f[key]) {
              if(item.goods_image == '') {
                this.fileMax[key] = false;
                break;
              }
            }
            this.img = f
          },
          beforeMulti(key){
            if(this.fileMax[key]){
              util.msg('图片仅支持设置 5 张，已达上限')
              return
            }
          },
          multipleUpload(event,key){
            // if(event.target.files.length > 5){
            //   util.msg("图片仅支持设置五张，已达上限");
            //   return;
            // }
            var vm = this
            for (let i=0; i<event.target.files.length;i++) {
              var item = event.target.files[i];
              //fileUpload.blobToDataURL(item).then(res1 => {
                //var imageBase641 = encodeURIComponent(res1);
                var imageBase641 = item;
                var file_tag1 = vm.metaData.key;
                var data1 = {key:'', file_tag:file_tag1,base64Str:imageBase641,type:1,is_suf:1}
                var data = [data1]
                fileUpload.multipleUploadFile(data).then((resp)=>{
                  if(resp[0]){
                    var idx = vm.img[key].findIndex(function (f) {
                      return f.goods_image === ''
                    })
                    if(idx === -1){
                      return;
                    }
                  if(vm.img[key].length < 5){
                    var newItem = {
                      goods_image:'',
                      goods_image_id:0
                    }
                    vm.img[key].push(newItem);
                  }
                    vm.addPicSpace(item,resp[0].data.responseContent.imgPath);
                    vm.updateFiles(key,idx,resp[0].data.responseContent.imgPath)
                  }
                //})
              })
            }
            this.allImage[this.attrName] = this.img;
          },
          showDialog(img){
            this.imgSrc=img
            this.showImg=true
          },

        },
        watch:{
          attrName:function (val) {
            if(val === '') {
              return;
            }
            var picSpaceDialog = _.clone(this.picSpaceDialog);
            Object.keys(picSpaceDialog).forEach(function(item,i){
              picSpaceDialog[item] = false;
            });

            this.picSpaceDialog = picSpaceDialog;

            if(this.allImage[this.attrName]){
              this.img = this.allImage[this.attrName];
            }else{
              let img = {}
              for (let item of this.goodsAttr[val]) {
                let imgItem = [];
                for (let i=0;i<1;i++){
                  imgItem[i] = {
                    goods_image:'',
                    goods_image_id:0
                  }

                }
                img[item] = imgItem;
              }
              this.img = img;
            }
          },
          setCarousel:function (val) {
            if(val === false) {
              this.img = {};
              this.attrName = '';
            }else{
              this.attrName = this.originAttrName;
            }
          },
        },
        mounted () {
          var _self = this;
          layui.use('layer', function(){
            this.layer = layui.layer;
          });
          this.commonId = this.$route.params.commonId;
          this.type = this.$route.params.type;
          storeGoodsOnline.getEditImage({commonid:this.commonId}).then(res=>{
            this.img = res.img;
            this.attrName = res.attr_name;
            this.goodsAttr = res.goods_attr;
            if(this.attrName) {
              this.setCarousel = true;
            }
            for (var idx in this.img) {
              if(this.goodsAttr[this.attrName].indexOf(idx) ==-1){
                delete this.img[idx];
              }else{
                this.fileMax[idx] = false;
                this.picSpaceDialog[idx] = false;
                let length = this.img[idx].length;
                if(length >= 5) {
                  this.fileMax[idx] = true;
                }
                this.img[idx].forEach(function(imgItem,imgKey){
                  if(!imgItem['goods_image']){
                    _self.img[idx].splice(imgKey,1);
                  }
                });
                var len = this.img[idx].length;
                if(!len){
                  this.img[idx] = [];
                  len = this.img[idx].length;
                }
                if(len < 5){
                  this.img[idx][len] = {
                    goods_image:'',
                    goods_image_id:0
                  };
                }
              }
            }
            this.originImg = this.img;
            this.originAttrName = this.attrName;
            this.allImage[this.attrName] = this.originImg;
          })
        },
        updated(){

        }
    }
</script>

