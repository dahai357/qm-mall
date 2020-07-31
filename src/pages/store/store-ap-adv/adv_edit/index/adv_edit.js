
import {mapGetters,mapActions,mapMutations} from 'vuex';
import * as _ from 'lodash';
import QmTable from 'component/qm-table/index';
import QmPagination from 'component/qm-pagination/index';
import QmDialog from 'component/qm-dialog/index';
import util from 'lib/utils/util'
import fileUpload from 'lib/utils/fileUpload.js';
import QmTips from 'component/qm-tips/index';
import moment from 'moment';
import storage from 'lib/utils/storage'
import { Base64 } from 'js-base64';
import QmBundling from 'component/qm-bundling/index';
import QmSale from 'component/qm-sale/index';
import QmCoupon from 'component/qm-coupon/index';
import QmClassTree from 'component/qm-class-tree/index';
import QmGoods from 'component/qm-goods/index';
import {storePoster,storeGoodsClass,storeGoodsStorage,storePromotionBundling,storeClass} from 'api'

export default {
    name: "adv_list_two",
    data (){
        return {
          bodyListener:'',
            typeNames:{
                '1':'纯图片展示，不设置链接',
                '2':'跳转到指定网页',
                '3':'跳转查看指定图片',
                '4':'跳转到店内商品详情页',
                '5':'跳转到店内组合活动详情页',
                '6':'跳转到指定三级分类商品列表页面',
                '7':'跳转指定优惠券页面'
            },
            btnClick:{
            },

           
            advertise:{
                adv_id:0,//广告位id
                gc_image_id:0,
                src:'',//图片名称	
                href:'',//广告链接	
                position:'2',//广告位置	
                start_time:'',//开始时间	
                end_time:'',//结束时间
                type:0,
                imageUrl:'',
                hrefImg:'',
                hrefFile:'',
                advType:1,
                goodsId:0,
                href_goods_commonid:0,
                href_goods_id:0,
                href_gc_id:0,
                href_gc_id_1:0,
                href_gc_id_2:0,
                href_gc_id_is_system:1,
                href_bl_id:0,
                href_coupon_id:0,
                gc_id:0
            },

            errorMessage:'',
            imageUrl:'',
            hasImage:false,

            dialog1:false,
            dialog1Title : "添加广告",
            
            dialogMessage:false,
            dialogTitle:'提示信息',
            dialogText:'您确定要删除该广告吗',

            hasImageDialog:false,
            unImageDialog:false,

            imgWidth:'520',
            modalAppendToBody:false,
            closeOnClickModal:false,
            error:{
                startTimeError:false,
                startTimeValueError:false,
                endTimeError:false,
                imageError:false,
                typeError:false,
                typeUrlError:false,
                typeImgeError:false,
                gcIdError:false
            },
            advType:1,
            classNames:[],
            addGoodsDialog:false,
            selectedGoods:[],
            showReset:false,
            addClassDialog:false,
            selectClass:{},
            selectedClass:[],
            addBundlingDialog:false,
            selectBundling:{},
            selectedBundling:[],
            addCouponDialog:false,
            selectCoupon:{},
            selectedCoupon:[],
            searchKeyword:'',
            readonly:false,
            showMoreResult:false,
            searchResultList:[],
            curType:1,
            gcAdvCount:0,
            chooseClassFlag:true
        }
    },
    components: {
        QmTable,
        QmPagination,
        QmDialog,
        QmTips,
        QmGoods,
        QmBundling,
        QmSale,
        QmCoupon,
        QmClassTree
    },

    computed:{
      ...mapGetters({
        metaData:'getMetaData',
        ImageIp:'getImageIp',
        imagePathConfig:'getImagePathConfig',
      }),
      ...mapGetters('storeApAdv',{
        isAdd:'getIsAdd',
      }),
    },

    filters: {
        dateFormat: function (value) {
          if (!value) return '';
          return moment(value).format('YYYY-MM-DD HH:mm');
        }
    },

    methods:{
        ...mapMutations('storeApAdv',{
            setIsAdd:'setIsAdd',
            setShowAddBtn:'setShowAddBtn'
        }),
        ...mapActions('storeApAdv',{
            getList:'getList',
            advEdit:'advEdit',
            advDelete:'advDelete',
            setUse:'setUse',
            getOneAdv:'getOneAdv'
        }),

        ...mapActions({
            uploadFile:'uploadFile',
        }),
        changeAdvType(){
            if(this.advertise.advType == 2){
                this.getClassAdvCount();
            }
            this.$nextTick(()=>{
                if(this.advertise.advType == 1){
                    layui.use('laydate', function(){
                        let laydate = layui.laydate;
                        laydate.render({
                            elem: '#start_time',
                            theme: "grid",
                            type:'datetime',
                            format:'yyyy-MM-dd HH:mm',
                            trigger:'click',
                            done:function(data){
                                _self.advertise.start_time = data
                            }
                        });
                        laydate.render({
                            elem: '#end_time',
                            theme: "grid",
                            type:'datetime',
                            format:'yyyy-MM-dd HH:mm',
                            trigger:'click',
                            done:function(data){
                                _self.advertise.end_time = data
                            }
                        });
                    })
                }
            });
        },
        getGcNameList(){
            storeClass.getFirstClassList({'gcIdKeyFlag':1}).then((res)=>{
                if(res.resultCode == 1){
                    this.classNames = res.responseContent;
                    let arr = Object.keys(this.classNames);
                    if(arr.length == 1){
                        this.advertise.gc_id = arr[0];
                        this.chooseClassFlag = false;
                        this.getClassAdvCount();
                    }
                }
            })
        },
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
                layer.msg('请选择需要跳转的商品')
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
        changeType(type){
            if(type == this.curType){
                return;
            }
            this.clearGoods();
            this.curType = type;
            this.searchKeyword = ''
            this.readonly = false
            this.showMoreResult = false
            this.searchResultList = []
            this.advertise.href_goods_commonid =0;
            this.advertise.href_goods_id =0;
            this.advertise.href_gc_id =0;
            this.advertise.href_bl_id =0;
            this.advertise.href_coupon_id =0;
            if(6 === type){
                this.selectedClass = []
            }
            if(5 === type){
                this.selectedBundling = []
            }
            if(7 === type){
                this.selectedCoupon = []
            }
        },

        selectResult(item,second){
            this.showMoreResult = false
            this.searchResultList = []
            this.readonly = true;
            if(this.advertise.type == 4){
                this.advertise.href_goods_commonid = item.goods_commonid
                this.advertise.href_goods_id = item.goods_id
                //this.qrWxContent.showTxt = item.goods_name
                this.searchKeyword = item.goods_commonid+' - '+item.goods_name
            }else if(this.advertise.type == 6){
                this.advertise.href_gc_id = item.gc_id
                this.advertise.href_gc_id_1 = item.gc_id_1
                this.advertise.href_gc_id_2 = item.gc_id_2
                this.advertise.href_gc_id_is_system = item.is_system;
                this.searchKeyword = item.f_gc_name
            }else if(this.advertise.type == 5){
                this.advertise.href_bl_id = item.bl_id
                this.searchKeyword = item.bl_name
            }else if(this.advertise.type == 7){
                this.advertise.href_coupon_id = item.id
                this.searchKeyword = item.name+'('+item.typeName+')'
            }
        },
        editAdvertice(item,i){
            this.advertise = _.clone(item);
            this.dialog1Title = '编辑广告';
            this.dialog1 = true;
            // this.errorMessage = '';
            this.error = {
                startTimeError:false,
                startTimeValueError:false,
                endTimeError:false,
                imageError:false,
                typeError:false,
                typeUrlError:false,
                typeImgeError:false,
                gIdError:false
            };
            let _self = this;
            layui.use('layer', function(){
                this.layer = layui.layer;
            });
            this.$nextTick(()=>{
                layui.use('laydate', function(){
                    let laydate = layui.laydate;
                    laydate.render({
                        elem: '#start_time',
                        theme: "grid",
                        type:'datetime',
                        format:'yyyy-MM-dd HH:mm',
                        trigger:'click',
                        done:function(data){
                            _self.advertise.start_time = data
                        }
                    });
                    laydate.render({
                        elem: '#end_time',
                        theme: "grid",
                        type:'datetime',
                        format:'yyyy-MM-dd HH:mm',
                        trigger:'click',
                        done:function(data){
                            _self.advertise.end_time = data
                        }
                    });
    
                })
            })
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

        deleteAdvertice(item,i){
            this.advertise = _.clone(item);
            this.dialogMessage = true;
        },

        deleteAdverticeSure(item,i){
            var data = {
                adv_id:this.advertise.adv_id
            }
            this.advDelete(data).then((res)=>{
                util.msg(res.longMessage);
                this.getPageData(this.pageParams);
                this.dialogMessage = false;
            })
        },

        getPageData(data){
            this.getList(data).then((res)=>{
                if(res.resultCode == 1){
                    this.advList = res.responseContent.list;
                    this.pageParams.total = res.responseContent.total;
                    var newPageParams = _.clone(this.pageParams)
                    newPageParams.total = res.responseContent.total;
                    this.pageParams = newPageParams;
                }else{
                    this.layer.msg(res.longMessage);
                }

            })
        },
      beforeLocalImgLoad(event,ref){
        //先判断宽高问题，在进行上传
        var _self =this;
        //ref：1 广告图上传
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function(e) {
          let img = new Image();
          img.src = e.target.result;
          img.onload = function () {
            if (this.height > this.width) {
              _self.deleteImageUrl(1);
              util.msg('上传的图片宽高比例与建议尺寸偏差较大，为保证前端展示效果，请重新设置广告图');
            }else{
              _self.localImgLoad(event,ref);
            }
          }
        }
      },

        localImgLoad(event,ref) {
            var key = this.metaData.key;
            var type = 6;
            if(this.advertise.advType == 2){
                type = 4;
            }
            let refTemp = ref
            fileUpload.logoLoad(event,key,type,this.uploadFile).then(res => {
                let imagePath = this.ImageIp + res.imgPath
                let yuanImpagePath = util.delImgSuffic(imagePath);
                if(refTemp==1){
                    this.advertise.imageUrl = imagePath;
                    this.advertise.src = yuanImpagePath.substring(yuanImpagePath.lastIndexOf('/') + 1);
                }else{
                    this.advertise.hrefImg = imagePath;
                    this.advertise.hrefFile = yuanImpagePath.substring(yuanImpagePath.lastIndexOf('/') + 1);
                }
            })
        },

        reset(){
            this.advertise = {
                adv_id:0,//广告位id
                src:'',//图片名称
                href:'',//广告链接
                position:'2',//广告位置
                start_time:'',//开始时间
                end_time:'',//结束时间
                imageUrl:'',
                hrefImg:'',
                hrefFile:'',
                type:0
            }
        },

        deleteImageUrl(ref){
            if(ref == 1){
                this.advertise.src = '';
                this.advertise.imageUrl = '';
            }else{
                this.advertise.hrefImg = '';
                this.advertise.hrefFile = '';
            }
        },
        getClassAdvCount(){
            this.gcAdvCount = 0
            if(this.advertise.gc_id > 0 && this.advertise.advType == 2){
                storeClass.getClassAdvCount({'gcId':this.advertise.gc_id}).then((res)=>{
                    if(res.resultCode == 1){
                        this.gcAdvCount = res.responseContent;
                    }else{
                        this.layer.msg(res.longMessage);
                    }
                });
            }
        },
        submitAdvertise(){
            var validate = true;
            this.error = {
                startTimeError:false,
                startTimeValueError:false,
                endTimeError:false,
                imageError:false,
                typeError:false,
                typeUrlError:false,
                typeImgeError:false,
                gcIdError:false
            };
            if(this.advertise.advType == 2){
                if(!this.advertise.gc_id){
                    this.error.gcIdError = true
                    validate = false;
                }
            }else{
                if(this.advertise.start_time == ''){
                    this.errorMessage = '广告开始时间不能为空';
                    this.error.startTimeError = true;
                    validate = false;
                }
                if(this.advertise.end_time == ''){
                    this.errorMessage = '广告结束时间不能为空';
                    this.error.endTimeError = true;
                    validate = false;
                }
                if(this.advertise.end_time && this.advertise.start_time && Date.parse(new Date(this.advertise.end_time)) <= Date.parse(new Date(this.advertise.start_time))){
                    this.errorMessage = '广告结束时间必须大于开始时间';
                    this.error.startTimeValueError = true;
                    validate = false;
                }
            }
            if(this.advertise.type == 0){
                this.error.typeError = true;
                validate = false;
            }

            if(this.advertise.type ==1){
                this.advertise.href = ''
            }
            if(this.advertise.src == ''){
                this.errorMessage = '广告图片不能为空';
                this.error.imageError = true;
                validate = false;
            }
            if(this.advertise.type ==1){
                if(this.advertise.href!=''){
                    this.errorMessage = ''
                }
            }
            if(this.advertise.type==2){
                if(this.advertise.href==''){
                    this.errorMessage = '请设置跳转网址';
                    this.error.typeUrlError = true;
                    validate = false;
                }
                let reg = /^(http|https|gotoshenbd):\/\/[^\u4e00-\u9fa5]+$/;
                if(!reg.test(this.advertise.href)){
                    this.errorMessage = '请填写合法的url,以http://或https://gotoshenbd://开头';
                    this.error.typeUrlError = true;
                    validate = false;
                }
            }else if(this.advertise.type==3){
                if(this.advertise.hrefFile==''){
                    this.errorMessage = '请上传跳转图片'
                    this.error.typeImgeError = true;
                    validate = false;
                }
            }else if(this.advertise.type == 4){
                if(!(this.advertise.href_goods_commonid && this.advertise.href_goods_id)){
                    this.errorMessage = '请选择需要跳转的商品'
                    this.error.typeImgeError = true;
                    validate = false;
                }
            }else if(this.advertise.type == 5){
                if(!this.advertise.href_bl_id){
                    this.errorMessage = '请选择需要跳转的组合销售活动'
                    this.error.typeImgeError = true;
                    validate = false;
                }
            }else if(this.advertise.type == 6){
                if(!this.advertise.href_gc_id){
                    this.errorMessage = '请选择分类'
                    this.error.typeImgeError = true;
                    validate = false;
                }
            }else if(this.advertise.type == 7){
                if(!this.advertise.href_coupon_id){
                    this.errorMessage = '请选择优惠券'
                    this.error.typeImgeError = true;
                    validate = false;
                }
            }
            if(!validate){
                return ;
            }
            let submitData = _.clone(this.advertise);
            if(submitData.href!=null&&submitData.href!=''){
                submitData.href = Base64.encode(submitData.href)
            }
            this.advEdit(submitData).then((res)=>{
                this.layer.msg(res.longMessage)
                if(res.resultCode == 1){
                    storage.set('advType', this.advertise.advType)
                    let url = "/promotion/store_ap_adv/adv_list_two";
                    this.$router.push(url);
                }
            })
        },

        toggleUse(item,i){
            var data = {
                adv_id:item.adv_id
            }
            this.setUse(data).then((res)=>{
                if(res.resultCode == 1){
                    if(item.is_use == 1){
                        item.is_use = 0;
                    }else{
                        item.is_use = 1;
                    }
                }
                this.layer.msg(res.longMessage);
            })
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
        isAdd(){
            this.dialog1 = true;
            this.dialog1Title = '添加广告';
            // this.errorMessage = '';
            this.error = {
                startTimeError:false,
                startTimeValueError:false,
                endTimeError:false,
                imageError:false,
                typeError:false,
                typeUrlError:false,
                typeImgeError:false
            };
            this.reset();
            let _self = this;
            this.$nextTick(()=>{
                layui.use('laydate', function(){
                    let laydate = layui.laydate;
                    laydate.render({
                        elem: '#start_time',
                        theme: "grid",
                        type:'datetime',
                        format:'yyyy-MM-dd HH:mm',
                        trigger:'click',
                        done:function(data){
                            _self.advertise.start_time = data
                        }
                    });
                    laydate.render({
                        elem: '#end_time',
                        theme: "grid",
                        type:'datetime',
                        format:'yyyy-MM-dd HH:mm',
                        trigger:'click',
                        done:function(data){
                            _self.advertise.end_time = data
                        }
                    });
    
                })
            })
        }
    },

    mounted(){

        let _self = this;

        _self.setShowAddBtn(false);
      _self.getGcNameList();
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          _self.submitAdvertise();
        }
      }
      let params = _self.$route.params;
      let advType = storage.get('advType');
      if(advType == 1){
          layui.use('laydate', function(){
              let laydate = layui.laydate;
              laydate.render({
                  elem: '#start_time',
                  theme: "grid",
                  type:'datetime',
                  format:'yyyy-MM-dd HH:mm',
                  trigger:'click',
                  done:function(data){
                      _self.advertise.start_time = data
                  }
              });
              laydate.render({
                  elem: '#end_time',
                  theme: "grid",
                  type:'datetime',
                  format:'yyyy-MM-dd HH:mm',
                  trigger:'click',
                  done:function(data){
                      _self.advertise.end_time = data
                  }
              });
          })
      }
      _self.advType = advType;
      _self.advertise.advType = advType;
      let id = params.id;
      if(id > 0){
          if(advType == 2){
              _self.advertise.gc_image_id = params.id;
          }else{
              _self.advertise.adv_id = params.id;
          }
          _self.getOneAdv({'adv_id':id,'advType':_self.advType}).then((res)=>{
              if(res.resultCode == 1){
                  _self.advertise = res.responseContent;
                  _self.searchKeyword = res.responseContent.searchText
                  if(_self.searchKeyword){
                      _self.readonly = true;
                  }
                  this.getClassAdvCount();
              }else{
                  _self.layer.msg(res.longMessage);
              }
          });
      }else{
          _self.advertise.advType = advType;
      }

      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
  beforeDestroy(){
    //销毁键盘enter搜索事件
    document.body.removeEventListener('keyup', this.bodyListener);
  },
}
