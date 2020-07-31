
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
import {storeClass} from 'api';

export default {
    name: "adv_list_two",
    data (){
        return {
          bodyListener:'',
            pageParams:{
                pageIndex:0,
                pageSize:15,
                total:0,
                type:-1,
                status:-1
            },
            pageParamsClass:{
                pageIndex:0,
                pageSize:15,
                total:0,
                type:-1,
                status:-1,
                gc_id:-1
            },
            advList:[],
            classAdvList: [],
            typeNames:{
                '1':'纯图片展示，不设置链接',
                '2':'跳转到指定网页',
                '3':'跳转查看指定图片',
                '4':'跳转到店内商品详情页',
                '5':'跳转到店内组合活动详情页',
                '6':'跳转到指定三级分类商品列表页面',
                '7':'跳转指定优惠券页面'
            },
            statusNames:{
              '1':'生效中',
              '2':'已过期',
              '3':'未生效',
              '4':'已禁用',
              '5':'平台下架'
            },
            classStatusNames:{
                '1':'生效中',
                '2':'已禁用',
                '3':'平台下架'
            },
            classNames:[],
            btnClick:{
            },

           
            advertise:{
                adv_id:0,//广告位id	
                src:'',//图片名称	
                href:'',//广告链接	
                position:'2',//广告位置	
                start_time:'',//开始时间	
                end_time:'',//结束时间
                type:0,
                imageUrl:'',
                hrefImg:'',
                hrefFile:''
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
                typeImgeError:false
            },
            advType:1
        }
    },
    components: {
        QmTable,
        QmPagination,
        QmDialog,
        QmTips
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
        ...mapActions('storeApAdv',{
            getList:'getList',
            advEdit:'advEdit',
            advDelete:'advDelete',
            setUse:'setUse'
        }),

        ...mapActions({
            uploadFile:'uploadFile',
        }),
        ...mapMutations('storeApAdv',{
            setShowAddBtn:'setShowAddBtn',
            setIsEdit:'setIsEdit'
        }),
        changeType(){
            /*this.pageParams.pageIndex = 0;
            this.pageParams.type = -1;
            this.pageParams.status = -1;
            this.pageParams.gc_id = -1;*/
            this.advType = this.advType == 1?2:1;
            storage.set('advType', this.advType);
            let data = this.pageParams;
            if(this.advType == 2){
                data = this.pageParamsClass;
            }
            this.getPageData(data);
        },
        changeIndex(index){
            if(this.advType == 1){
                this.pageParams.pageIndex = index;
                this.getPageData(this.pageParams);
            }else{
                this.pageParamsClass.pageIndex = index;
                this.getPageData(this.pageParamsClass);
            }
        },
        getGcNameList(){
            storeClass.getFirstClassList({'gcIdKeyFlag':1}).then((res)=>{
                if(res.resultCode == 1){
                    this.classNames = res.responseContent;
                }
            })
        },
        search(){
            $('select').blur();
            if(this.advType == 1){
                this.pageParams.pageIndex = 0;
                this.getPageData(this.pageParams);
            }else{
                this.pageParamsClass.pageIndex = 0
                this.getPageData(this.pageParamsClass)
            }
        },

        editAdvertice(item,i){
            storage.set('advType',this.advType);
            let url;
            this.setShowAddBtn(false);
            if(item){
                this.setIsEdit(true);
                this.advertise = _.clone(item);
                let id;
                if(this.advType == 2){
                    id = item.gc_image_id;
                }else{
                    id = item.adv_id;
                }
                url = "/promotion/store_ap_adv/adv_edit/"+id;
            }else{
                this.setIsEdit(false);
                url = "/promotion/store_ap_adv/adv_edit/0";
            }
            this.$router.push(url);
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
            let id = this.advType == 1?this.advertise.adv_id:this.advertise.gc_image_id;
            var data = {
                adv_id:id,
                advType: this.advType
            }
            this.advDelete(data).then((res)=>{
                util.msg(res.longMessage);
                if(this.advType == 1){
                    this.getPageData(this.pageParams);
                }else{
                    this.getPageData(this.pageParamsClass)
                }
                this.dialogMessage = false;
            })
        },

        getPageData(data){
            if(this.advType == 1){
                this.getList(data).then((res)=>{
                    if(res.resultCode == 1){
                        this.advList = res.responseContent.list;
                        //this.pageParams.total = res.responseContent.total;
                        var newPageParams = _.clone(this.pageParams)
                        newPageParams.total = res.responseContent.total;
                        this.pageParams = newPageParams;
                    }else{
                        this.layer.msg(res.longMessage);
                    }

                })
            }else{
                storeClass.getClassAdvList(data).then((res)=>{
                    if(res.resultCode == 1){
                        this.classAdvList = res.responseContent.list;
                        //this.pageParamsClass.total = res.responseContent.total;
                        var newPageParams = _.clone(this.pageParamsClass)
                        newPageParams.total = res.responseContent.total;
                        this.pageParamsClass = newPageParams;
                    }else{
                        this.layer.msg(res.longMessage);
                    }
                });
            }
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
          //ref：1 广告图上传
          var key = this.metaData.key;
          var type = 6;
          let refTemp = ref
          fileUpload.logoLoad(event, key, type, this.uploadFile).then(res => {
            let imagePath = this.ImageIp + res.imgPath
            if (refTemp == 1) {
              this.advertise.imageUrl = imagePath;
              this.advertise.src = imagePath.substring(imagePath.lastIndexOf('/') + 1);
            } else {
              this.advertise.hrefImg = imagePath;
              this.advertise.hrefFile = imagePath.substring(imagePath.lastIndexOf('/') + 1);
            }
          })
        },
        typeJump(item,i){
            storage.set('goods_route_name',this.$route.name);
            let routeData;
            if(item.type == 4){
                routeData = this.$router.resolve({
                    name:"store_goods_add_step_two",
                    params:{commonId:item.href_goods_commonid}
                });
            }else if(item.type == 5){
                storage.set('active_id',item.href_bl_id);
                routeData = this.$router.resolve({
                    name:"store_promotion_bundling_add"
                });
            }else if(item.type == 7){
                storage.set('coupon_id',item.href_coupon_id);
                routeData = this.$router.resolve({
                    name:"store_coupon_show"
                });
            }
            window.open(routeData.href, '_blank');
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

        toggleUse(item,i){
            let adv_id = this.advType == 1?item.adv_id:item.gc_image_id;
            var data = {
                adv_id:adv_id,
                advType:this.advType
            }
            this.setUse(data).then((res)=>{
                if(res.resultCode == 1){
                    if(item.is_use == 1){
                        item.is_use = 0;
                    }else{
                        item.is_use = 1;
                    }
                    this.getPageData(this.advType == 2?this.pageParamsClass:this.pageParams);
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
            this.editAdvertice('',0)
        },
        hasImageDialog(){
            var dragDom = document.querySelectorAll(".el-dialog");
            dragDom.forEach((el)=>{
                console.log(el)
                el.style.left = 0;
                el.style.top =0

            })
        }
    },

    mounted(){
        this.setShowAddBtn(true);

        this.getGcNameList();
        let _self = this;
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
        let advType = storage.get('advType');
        if(advType == 1 || advType == 2){
            this.advType = advType;
        }
      _self.getPageData({});
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
            _self.search();
        }
      }

        document.body.addEventListener('keyup', _self.bodyListener, false);
    },
  beforeDestroy(){
    //销毁键盘enter搜索事件
    document.body.removeEventListener('keyup', this.bodyListener);
  },
}
