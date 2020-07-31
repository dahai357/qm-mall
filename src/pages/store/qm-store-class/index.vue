<template src='./index/qm-store-class.html'>

</template>

<script>
import QmTabs from 'component/qm-tabs/index';
import {mapGetters,mapActions, mapMutations} from 'vuex';
import QmDialog from 'component/qm-dialog/index';
import util from 'lib/utils/util.js';
import QmArea from 'component/qm-area/index';
import storage from 'lib/utils/storage';
import fileUpload from 'lib/utils/fileUpload';

    export default {
        name: "qm-store-class",
        data(){
          return{
            bodyListener:'',
                tabs:{
                    index:{name:'分类管理',select:true,act:'index'},
                    service_fee_list:{name:'分类缴费记录',select:false,act:'service_fee_list'},
                    deposit_list:{name:'保证金往来记录',select:false,act:'deposit_list'},
                    class_invoice_log:{name:'开票申请',select:false,act:'class_invoice_log'},
                },
                url:'index',
                dialogVisible:false,
                dataParams:{
                  amount:'',
                  type:2,
                  company:'',
                  company_code:'',
                  province:'',
                  city:'',
                  district:'',
                  address:'',
                  receiver:'',
                  receive_phone:'',
                  receive_email:'',
                },
              valiData:   {
                amount:false,
                company:false,
                company_code:false,
                address:false,
                receiver:false,
                receive_phone:false,
                receive_email:false,
              },
              errorText:{
                error_code:'统一信用代码不能为空',
              },
                applyNewClassVisible:false,

                btnClick:{
                  submitDataBtn:false,
                  invoiceSubmitBtn:false,
                },

                classList : [
                  {
                    choose:'请选择',
                    hover:false,
                    showSearch:false,
                    categoryName:'',
                    showLoad:false,
                    categoryList:[],
                    type:2,
                    curCategory:{
                      intelligence:'',
                      type:2,
                    }
                  }
                ],
          }
        },
        components: {
          QmTabs,
          QmDialog,
          QmArea
        },
        computed:{
            ...mapGetters({
                basicStore:'getBasicStore',
                imagePathConfig:'getImagePathConfig',
                ImageIp:'getImageIp',
                storeInfoFromClassList:'getStoreInfo',
                curUrl:'getCurUrl'
            })
        },
        directives:{
              clickout:{
             bind(el, binding, vnode) {
    function clickHandler(e) {

      if (el.contains(e.target)) {
        return false;
      }

      if(binding.value){
//         console.log(binding.value)

        // for(let key in binding.value){
        //   binding.value[key].showSearch=false
        // }
        binding.value.showSearch=false
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = clickHandler;
    document.addEventListener('click', clickHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
          }
        },
        methods:{
          ...mapMutations({
            setUpdateList:'setUpdateList',
            setInvoice:'setInvoice'
          }),
          ...mapActions({
            classInvoiceList:'classInvoiceList',
            getStoreSetting:'getStoreSetting',
            getJoinInfo:'getJoinInfo',
            classInvoiceAdd:'classInvoiceAdd',
            getAvailGcClass:'getAvailGcClass',
            getClassInfo:'getClassInfo',
            getGoodsClassInfo:'getGoodsClassInfo',
            uploadFile:'uploadFile',
            classApply:'classApply'
          }),
          routerData(data){

            this.url = data.key;
            var url = '/store/qm_store_class/'+data.key
            this.$router.push(url);

          },
          addInvoice(){
            if(this.basicStore.totalPaidFee - this.basicStore.appliedPaidFee <= 0|| !this.basicStore.canAddInvoice){
              return
            }
            this.initSubData();
            this.dialogVisible = true;
          },
          initSubData(){
            this.getJoinInfoData();
            //错误提示关闭
            this.valiData.amount = false;
            this.valiData.company = false;
            this.valiData.company_code = false;
            this.valiData.address = false;
            this.valiData.receiver = false;
            this.valiData.receive_phone = false;
            this.valiData.receive_email = false;

          },
          areaValueChange(data){
            if(data.level == 'province'){
              this.dataParams.city = '';
              this.dataParams.province = data.value
            }
            if(data.level == 'city'){
              this.dataParams.district = '';
              this.dataParams.city = data.value
            }
            if(data.level == 'district'){
              this.dataParams.district = data.value
            }
          },

          invoiceSubmit(){
              this.valiData =  {
                  amount:false,
                  company:false,
                  company_code:false,
                  address:false,
                  receiver:false,
                  receive_phone:false,
                  receive_email:false
              }
            var validRes = true;
            if(this.dataParams.amount == null || this.dataParams.amount == '' || this.dataParams.amount.trim() == ''){
              this.valiData.amount = true;
              this.$nextTick(()=>{
                $(".arrmountError").text("开票金额不能为空");
              })
            }else{
              if(isNaN(parseFloat(this.dataParams.amount)) || (!isNaN(parseFloat(this.dataParams.amount)) && parseFloat(this.dataParams.amount) <=0 )){
                 this.valiData.amount = true;
                  this.$nextTick(()=>{
                    $(".arrmountError").text("开票金额必须大于0");
                  })
              }
            }
            if(this.dataParams.company == ''){
              this.valiData.company = true;
            }
            this.checkCode();
            if(this.dataParams.type == 1 && this.dataParams.address == ''){
              this.valiData.address = true;
            }
            if(this.dataParams.type == 1 && this.dataParams.receiver == ''){
              this.valiData.receiver = true;
            }
            if(this.dataParams.type == 1 && this.dataParams.receive_phone == ''){
              this.valiData.receive_phone = true;
            }
            if(this.dataParams.type == 2){
                this.checkEmail();
            }
            Object.values(this.valiData).forEach((item,i) => {
                if(item){
                    validRes = false
                }
            })
            if(validRes){
              this.btnClick.invoiceSubmitBtn = true;
              this.classInvoiceAdd(this.dataParams).then((res)=>{
                this.btnClick.invoiceSubmitBtn = false;
                if(res.resultCode == 1){
                  this.basicStore.canAddInvoice = false;
                  this.dialogVisible = false;
                  this.setInvoice(true);
                  this.getStoreSetting();
                }else{
                  layer.msg(res.longMessage);
                }
              })
            }else{
                console.log(this.valiData);
            }
          },
          checkEmail(){
            //邮箱验证
            if(this.dataParams.receive_email == ''){
              //正确写法
              this.valiData.receive_email = true;
              this.$nextTick(()=>{
                $('.error-email').text('开票类型为增值税电子普通发票时邮箱不能为空');
              })
              return false;
              //错误写法：dom看似加载完了，实际有可能存在加载较慢的情况
              // this.valiData.receive_email = true;
              // $('.error-email').text('开票类型为增值税电子普通发票时邮箱不能为空');

              //错误写法：dom还没加载就开始赋值
              // $('.error-email').text('开票类型为增值税电子普通发票时邮箱不能为空');
              // this.valiData.receive_email = true;
            }
            if(!/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(this.dataParams.receive_email)){
              this.valiData.receive_email = true;
              this.$nextTick(()=>{
                $('.error-email').text('请填写正确的邮箱格式');
              })
            }
          },
          checkCode(){

            if(this.dataParams.company_code == null || this.dataParams.company_code == ''){
                this.valiData.company_code = true;
                this.errorText.error_code = "统一信用代码不能为空"
                return false;
            }
            //统一信用代码校验
            if(!(this.dataParams.company_code.length==15 || this.dataParams.company_code.length==18)){
              this.valiData.company_code = true;
              this.errorText.error_code = "统一信用代码格式错误"
            }
          },
          applyNewClassVisibleOpen(){
            if(this.storeInfoFromClassList.canModifyFlag==0){
                this.layer.msg('您的合同已到期，请及时与平台续签合同');
                return;
            }
            this.applyNewClassVisible = true;
            this.classList = [
                  {
                    choose:'请选择',
                    hover:false,
                    showSearch:false,
                    categoryName:'',
                    showLoad:false,
                    categoryList:[],
                    type:2,
                    curCategory:{
                      intelligence:'',
                      type:2,
                    }
                  }
                ]
          },

          clickRadioLabel(list,value){
            list.type = value;
          },

          addCategory(){
            this.classList.push(
              {
                choose:'请选择',
                hover:false,
                showSearch:false,
                categoryName:'',
                showLoad:false,
                categoryList:[],
                type:2,
                curCategory:{
                  intelligence:'',
                  type:2,
                },
              }
            );
          },
          deleteCategory(item,i){
            this.classList.splice(i,1);
          },
          enterHover(item){
            // item.hover = !item.hover;
            item.hover = true
          },
          leaveHover(item){
            item.hover= false
          },
          showSearch(item,i){
            this.classList.forEach((res)=>{
              if(res.showSearch){
                // res.showSearch = !res.showSearch
                res.categoryList = []
              }
            })
            item.showSearch = !item.showSearch
          },

          searchCategory(item,i){
            item.showLoad = true;
            if(item.categoryName == ''){
              this.layer.msg('请输入搜索关键字');
              return;
            }
            var data = {
              gc_name:item.categoryName
            }
            this.getAvailGcClass(data).then((res)=>{
              item.showLoad = false;
              if(res.length <= 0){
                item.categoryList = [];
                this.layer.msg('没有符合条件的数据');
                return;
              }
              item.categoryList = res;
            })
          },

          choose(list,l,item,i){
            list.choose = item.gc_name_show;
            list.categoryName = '';
            list.showSearch = false;
            list.categoryList = [];
            var data = {
              gc_id:item.gc_id_2
            }
            this.getGoodsClassInfo(data).then((res)=>{
              list.curCategory = res;
              list.curCategory.type = 2
            })
          },

          logoLoad(event,list,item,file,f) {

                // var key = this.metaData.key;
                var metaData = storage.get("metaData");
                var key = metaData.key;
                var type = 3;
                var vm = this;
                fileUpload.uploadFile(event,key,type,this.uploadFile).then(res => {
                  res.imgPath = util.delImgSuffic(res.imgPath);
                    var newFile = _.clone(file);
                    newFile.intelligence = vm.ImageIp + res.imgPath;
                    item.need_file[f] = newFile;

                    var newItem = _.clone(item);
                    newItem.need_file[f] = newFile;

                    list.curCategory = newItem;
                    this.layer.msg('上传成功');
                })
            },

            submitData(){

              var classList = [];
              var typeList = [];
              var intelligenceList = [];
              var data= {

              }

              this.classList.forEach((list,l)=>{

                if(!(list.curCategory && list.curCategory.gc_id != 0)){
                  util.msg('请选择经营分类');
                  return;
                }
                classList.push(list.curCategory.gc_id+'');
                typeList.push(list.type+'');
                if(list.curCategory.need_file){
                  list.curCategory.need_file.forEach((res,r)=>{
                      data['intelligence_'+list.curCategory.gc_id+'_'+r] = res.intelligence?res.intelligence.replace(this.ImageIp+this.imagePathConfig.Register,''):'';
                  })
                }
              })
              data.class=classList,
              data.type=typeList,
              this.btnClick.submitDataBtn = true;
              this.classApply(data).then((res)=>{
                this.btnClick.submitDataBtn = false;
                util.msg(res.longMessage);
                this.setUpdateList(true);
                if(res.status=="success"){
                  this.applyNewClassVisible = false;
                  this.classList = []
                }
                // this.applyNewClassVisible = false;
               
              
                
              });
            },
            deleteIntelligence(event,list,item,file,f){
              event.stopPropagation();
              event.preventDefault();
               var newItem = _.clone(item);
               newItem.need_file[f].intelligence = '';
               list.curCategory = newItem;
            },

            leaveItem(list){
              list.showSearch = false;
            },
          getJoinInfoData(){
            this.getJoinInfo().then((res)=>{
              this.reset(res);
            })
          },
          reset(res){
            this.dataParams.company = res.company_name;
            this.dataParams.company_code = res.business_licence_number;
            this.dataParams.receiver = res.contacts_name;
            this.dataParams.receive_phone = res.contacts_phone
            this.dataParams.province = res.province;
            this.dataParams.city = res.city;
            this.dataParams.district = res.district;
            this.dataParams.address = res.store_address;
            this.dataParams.amount = '';
            this.dataParams.type = 2;
            this.dataParams.receive_email = '';
            this.dataParams.amount = '';
          },

          disabledInvoice(){
            if(this.basicStore.totalPaidFee - this.basicStore.appliedPaidFee <= 0){
              util.msg("剩余可开票金额为0")
            }else{
              util.msg("每月只可申请一次开票，本月已申请")
            }
          }
        },

      watch:{
        dataParams:{
          handler: function () {
            if(this.dataParams.amount != ''){
              this.valiData.amount = false;
            }
            if(this.dataParams.company != ''){
              this.valiData.company = false;
            }
            if(this.dataParams){
              if(this.dataParams.company_code && this.dataParams.company_code != '' && (this.dataParams.company_code.length==15||this.dataParams.company_code.length==18)){
                this.valiData.company_code = false;
              }
            }
            if(this.dataParams.type != 1 || this.dataParams.address != ''){
              this.valiData.address = false;
            }
            if(this.dataParams.type != 1 || this.dataParams.receiver != ''){
              this.valiData.receiver = false;
            }
            if(this.dataParams.type != 1 || this.dataParams.receive_phone != ''){
              this.valiData.receive_phone = false;
            }
            if((this.dataParams.type == 1 || this.dataParams.receive_email != '') && /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(this.dataParams.receive_email)){
              this.valiData.receive_email = false;
            }
          },
          deep: true
        },
        curUrl:function(){
          this.url = this.curUrl;
        }
      },
        mounted(){
          var  _self = this;

          if(_self.$route.fullPath == '/store/qm_store_class/class_invoice_log'){
            _self.url = 'class_invoice_log';
          }

          if(_self.$router.history.current.name == 'qm_store_class_corespondece' || _self.$router.history.current.name == 'qm_store_class_record'){
            _self.url = '';
          }

          _self.getStoreSetting().then(()=>{

          })
          _self.getJoinInfoData();
          //body绑定键盘enter搜索事件
          _self.bodyListener = (e) => {
            if (e.keyCode === 13 && _self.dialogVisible){
              //开票申请
              _self.invoiceSubmit();
            }
            if (e.keyCode === 13 && !_self.btnClick.submitDataBtn){
              //申请新分类
              if(_self.applyNewClassVisible){
                _self.submitData();
              }
            }
          }
          document.body.addEventListener('keyup', _self.bodyListener, false);
        },
      beforeDestroy(){
        //销毁键盘enter搜索事件
        document.body.removeEventListener('keyup', this.bodyListener);
      },
    }
</script>

<style scoped src="./index/qm-store-class.css">

</style>
