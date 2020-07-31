import QmCheckboxFrame from 'component/qm-checkbox-frame/index';
import {mapGetters,mapActions} from 'vuex';
import QmTips from 'component/qm-tips/index';
import QmDialog from 'component/qm-dialog/index';
import util from 'lib/utils/util';
export default {
    name: "store-store-store-print",
    data (){
        return {
          tipMessage:false,//操作完成倒计时关闭弹框
          errorMsg:'',//弹框错误提示语
            dialog1:false,
            dialogMessage1:'请选择需要操作的记录',
            dialogTitle1:'提示信息',
            printType:-1,
            printRemarks:''
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
                printSet:'printSet',
                getStoreSetting:'getStoreSetting',
              }),

              submitPrintSet(){
                  var data = {
                    print_type:this.printType,
                      print_remarks:this.printRemarks
                  }
                  this.printSet(data).then((res)=>{
                    util.msg("打印设置成功")
                    this.getStoreSetting();
                  })
              }
        },

        watch:{
            basicStore(){
                this.printType = this.basicStore.printType;
              }
    
          },

          mounted(){
            this.getStoreSetting().then((res)=>{
                this.printType = this.basicStore.printType;
                this.printRemarks=this.basicStore.printRemarks
            }) 

          }
}
