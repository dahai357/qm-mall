import QmCheckboxFrame from '../../../../../components/qm-checkbox-frame/index';
import {mapGetters,mapActions} from 'vuex';
import QmTips from 'component/qm-tips/index';
import QmDialog from 'component/qm-dialog/index';
import util from 'lib/utils/util'

export default {
    name: "store-store-setting-switch",
    data (){
        return {
          tipMessage:false,//操作完成倒计时关闭弹框
          errorMsg:'',//弹框错误提示语
            isStoreOpen:false,
            isOpenAutomaticReceipt:false,
            checkArray:{},
            
            dialog1:false,
            dialogMessage1:'请选择需要操作的记录',
            dialogTitle1:'提示信息',

            btnClick:{
                switchStoreBtn:false
            }
        }
    },
        components: {
            QmCheckboxFrame,
            QmTips,
           QmDialog
        },

        computed:{
            ...mapGetters({
                metaData:'getMetaData',
                basicStore:'getBasicStore',
              }),
          },

        methods:{
            ...mapActions({
                switchSet:'switchSet',
                getStoreSetting:'getStoreSetting',
              }),

              switchStore(){

                  if(this.basicStore.checkArray.storeInfo == 0){
                    this.layer.msg("店铺基本信息未开启");
                    return
                  }
                  if(this.basicStore.checkArray.payWay == 0){
                    this.layer.msg("支付配置未开启");
                    return
                  }
                  if(this.basicStore.checkArray.deliveryWay == 0){
                    this.layer.msg("配送方式未开启");
                    return
                  }

                  this.btnClick.switchStoreBtn = true;
                  var data = {
                    key:this.metaData.key,
                    openFlag:0,
                  }
                  var msgErrorN='';
                  if(this.isStoreOpen){
                      data.openFlag = 1;
                      msgErrorN='您的店铺开启成功';
                  }else{
                      data.openFlag = 0;
                      msgErrorN='您的店铺关闭成功';
                  }
                  if(this.isOpenAutomaticReceipt){
                      data.openAutomaticReceipt = 1;
                      msgErrorN = msgErrorN+'/店铺自动接单已开启';
                  }else{
                      data.openAutomaticReceipt = 0;
                      msgErrorN = msgErrorN+'/店铺自动接单已关闭';
                  }
                  this.switchSet(data).then((res)=>{
                    this.btnClick.switchStoreBtn = false;
                      util.msg(msgErrorN);
                  })
              }
        },

        watch:{
            basicStore(){

                if(this.basicStore.openFlag == 1){
                    this.isStoreOpen = true;
                }else{
                    this.isStoreOpen = false;
                }
                if(this.basicStore.openAutomaticReceipt == 1){
                    this.isOpenAutomaticReceipt = true;
                }else{
                    this.isOpenAutomaticReceipt = false;
                }
                if(this.basicStore.checkArray){
                    this.checkArray = this.basicStore.checkArray;
                }
              }
    
          },

          mounted(){
            if(this.basicStore.openFlag == 1){
                this.isStoreOpen = true;
            }else{
                this.isStoreOpen = false;
            }
              if(this.basicStore.openAutomaticReceipt == 1){
                  this.isOpenAutomaticReceipt = true;
              }else{
                  this.isOpenAutomaticReceipt = false;
              }
            this.getStoreSetting().then((res)=>{
              this.openFlag = this.basicStore.openFlag
            }) 
          }
}
