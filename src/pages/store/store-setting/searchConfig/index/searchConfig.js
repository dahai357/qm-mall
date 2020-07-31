import Vue from 'vue'
import {mapGetters,mapActions} from 'vuex';
import QmTips from 'component/qm-tips/index';
import QmDialog from 'component/qm-dialog/index';
import util from 'lib/utils/util'
export default {
    name: "store-store-setting-searchConfig",
    data (){
        return {
            tipMessage:false,//操作完成倒计时关闭弹框
             errorMsg:'',//弹框错误提示语
            recommendWord:['玫瑰花','丁香花'],
            name:'',
            dialog1:false,
            dialogMessage1:'请选择需要操作的记录',
            dialogTitle1:'提示信息',
            btnClick:{
                submitRecommendWordBtn:false
            }
        }
    },
        components: {
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
                searchConfigSet:'searchConfigSet',
              }),
            add(){
                if(this.recommendWord.length==20){
                    util.msg('热门推荐关键词个数不能超过20');
                    return ;
                }
                if(!this.name || this.name == '' || this.name.trim() ==''){
                  util.msg('请输入搜索热词');
                    return;
                }
                if(this.name.length>15){
                  util.msg('字符串长度不能超过15个字符');
                    return ;
                }
                if(this.checkExist(this.name,this.recommendWord)){
                  util.msg('重复请重新输入');
                    return;
                }
                this.recommendWord.push(this.name);
                this.name = '';
            },
            deleteData(index){
                this.recommendWord.splice(index,1);
            },
            checkExist(value,list){
                var isExist = false;
                list.forEach((item,i) => {
                    if(value == item){
                        isExist = true;
                    }
                });
                return isExist;
            },

            submitRecommendWord(){
                if(this.name){
                  util.msg('输入的热词未添加，请先点击添加');
                  return;
                }
              this.btnClick.submitRecommendWordBtn = true;
                var data = {
                    key:this.metaData.key,
                    recommendWord:this.recommendWord
                }
                this.searchConfigSet(data).then(()=>{
                    this.btnClick.submitRecommendWordBtn = false;
                  util.msg("设置成功")
                })
            }
        },

        watch:{
            basicStore(){
                if(this.basicStore.recommendWord){
                    this.recommendWord = this.basicStore.recommendWord;
                }else{
                    this.recommendWord = [];
                }
              }
    
          },

          mounted(){
            if(this.basicStore.recommendWord){
                this.recommendWord = this.basicStore.recommendWord;
            }else{
                this.recommendWord = [];
            }
          }
}
