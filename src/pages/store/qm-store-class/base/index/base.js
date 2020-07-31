import {mapGetters,mapActions, mapMutations} from 'vuex'
import QmStoreTable from '../../../../../components/qm-store-table/index';
import QmDialog from 'component/qm-dialog/index';
import QmTips from 'component/qm-tips/index';
import fileUpload from 'lib/utils/fileUpload.js';

export default {
    name: "qm-store-class-base",

    data(){
        return {
          bodyListener:'',
            is_portal:0,

            returnDialog:false,
            payDialog:false,

            dialog1:false,
            dialogMessage1:'保证金退回成功',
            dialogTitle1:'提示信息',

            curPayInfo:{
                platform_account:''	,
                platform_account_user	:''	,
                platform_account_name	:'',
                leftAmount:0,
                path:''
            },
        }
    },


    computed:{
        ...mapGetters({
            storeInfo:'getStoreInfo',
            storeList:'getStoreList',
            deposit_flag:'getDeposit_flag',
            metaData:'getMetaData',
            ImageIp:'getImageIp',
            imagePathConfig:'getImagePathConfig',
            imageType:'getImageType',
            basicStore:'getBasicStore',
            updateList:'getUpdateList',
        }),

        isTotalMoreThan(){
            var isMoreThan = parseFloat(this.storeInfo.total_deposit) > parseFloat(this.storeInfo.cashed_deposit);
            return isMoreThan;
        },

        isCashedMoreThan(){
            var isMoreThan = parseFloat(this.storeInfo.total_deposit) < parseFloat(this.storeInfo.cashed_deposit);
            return isMoreThan;
        },
        getReturnMoney(){
            var returnMoney = parseFloat(this.storeInfo.cashed_deposit) - parseFloat(this.storeInfo.total_deposit);
            return returnMoney.toFixed(2);
        }
    },

    components:{
        QmStoreTable,
        QmDialog,
        QmTips
    },

    methods: {
        ...mapMutations({
            setCurUrl:'setCurUrl'
        }),
        ...mapActions({
            getClassList:'getClassList',
            depositReturn:'depositReturn',
            getDepositInfo:'getDepositInfo',
            uploadFile:'uploadFile',
            depositSave:'depositSave',
            getStoreSetting:'getStoreSetting',
           
        }),

        getData(){
            var data= {
                is_portal:this.is_portal
            }
            this.getClassList(data).then(()=>{   
                
            })
        },
        doRouter(url){
            this.$router.push(url);
            this.setCurUrl(url);
        },
        returnCash(){
            this.returnDialog = true;
        },
        sureReturn(){
            this.depositReturn().then((res)=>{
                this.returnDialog = false;
                if(res.resultCode == 1){
                    this.dialog1 = true;
                    this.getClassList();
                }else{
                    this.layer.msg(res.longMessage)
                    this.getClassList();
                }
            })
        },
        payDialogOpen(){
            this.getDepositInfo().then((res)=>{
                if(res.resultCode == 1){
                    this.curPayInfo = res.responseContent
                    if(!this.curPayInfo.path){
                        this.curPayInfo.path = '';
                    }
                    this.payDialog = true;
                }else{
                    // this.layer.msg(res.longMessage);
                    this.dialog1 = true;
                    this.dialogTitle1 = "提示信息";
                    this.dialogMessage1 = res.longMessage;
                    // this.payDialog = true;
                }
            })
            
        },

        localImgLoad(event) {
              
            var key = this.metaData.key;
            var type = this.imageType.IMG_DEPOSIT;

            fileUpload.logoLoad(event,key,type,this.uploadFile).then(res => {
                var imagePath = this.ImageIp + res.imgPath;
                var newPayInfo = _.clone(this.curPayInfo);
                newPayInfo.path = res.imgPath.replace(this.imagePathConfig.deposit,'');

                newPayInfo.imageUrl = imagePath;
                this.curPayInfo = newPayInfo;
            })
        },  

        depositSaveSure(){
            if(!this.curPayInfo.path || this.curPayInfo.path ==''){
                this.layer.msg('缴纳保证金凭证不能为空');
                return;
            }
            var data = {
                deposit_store_image:this.curPayInfo.path
            }
            this.depositSave(data).then((res)=>{
                this.layer.msg("操作成功");
                this.payDialog  = false;
                this.getStoreSetting();
                this.getData();
            })
        }
    },

    mounted () {
      var _self =this;
      _self.getData();
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          if(_self.payDialog){
            //缴纳保证金
            _self.depositSaveSure();
          }else if(_self.returnDialog){
            //退回保证金
            _self.sureReturn();
          }else if(_self.dialog1){
            //确认弹窗
            _self.dialog1 = false;
          }
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
  beforeDestroy(){
    //销毁键盘enter搜索事件
    document.body.removeEventListener('keyup', this.bodyListener);
  },

    filters: {

        nativef2y: function (value) {
            if(isNaN(parseFloat(value))){
                return "0.00";
            }else{  
                return parseFloat(value).toFixed(2);
            }
        },
    },

    watch:{
        updateList:function(){
            this.getClassList();
        },
    }
}
