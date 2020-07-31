import {mapGetters,mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util';
import QmTable from 'component/qm-table/index';
import QmTips from 'component/qm-tips/index';

export default {
    name: "store-total-index",
    data(){
        return {
          bodyListener:'',
          firstList:[],
            list:[],
            type_datas:[],//消费类型下拉框
            dialogVisible:false,//是否展示达达发单需知
            dadaTimer:'',
            smsFlag:true,//发送验证码判断
           subData:{
             amount:'',
          },
          validData:{
            amount:false
          }
        }
    },
    computed:{
        ...mapGetters({
            storeInfo:'getStoreInfo',
            storeList:'getStoreList',
            basicStore:'getBasicStore',
        })
    },
    components:{
        QmPagination,
        QmTable,
      QmTips
    },
    methods: {
        ...mapActions({
          dadaList:'dadaList',
          getDadaRecharge:'getDadaRecharge',
        }),
      changeAmount(){
        var patten = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
        if(this.subData.amount == ''){
          $('.error-amount').text('请输入充值金额');
          this.validData.amount = true
        }else if(!patten.test(this.subData.amount)){
          $('.error-amount').text('请填写正确的金额');
          this.validData.amount = true
        }else if(this.subData.amount < 0.01 || this.subData.amount > 9999999){
          $('.error-amount').text('充值金额需在0.01与9999999之间');
          this.validData.amount = true
        }else{
          this.validData.amount=false;
        }
      },
      formData(){
          var _self =this;
        var validRes = true
        _self.changeAmount();
          Object.values(_self.validData).forEach((item,i) => {
            if(item){
              validRes = false
            }
          })
          if(validRes){
            this.getDadaRecharge(_self.subData).then((res)=>{
              if(res.responseContent.status == 1){
                _self.subData.amount = '';
                var layeridx = layer.confirm('请在新打开的页面中完成支付', {
                  title: '确认支付状态',
                  skin:'my-skin',
                  btn: ['已完成支付','支付遇到问题，重新充值'] //按钮
                }, function(){
                  _self.$router.push('/store/store_delivery/dada');
                  layer.close(layeridx);
                }, function(){
                });
                layer.open({
                  type: 2,
                  title: false,
                  area: ['900px', '600px'],
                  shade: 0.8,
                  shadeClose: true,
                  content: res.responseContent.data
                });
              }else{
                util.msg(res.responseContent.message);
              }
            })
          }
      },
      showData(){
          var _self = this;
        _self.dadaList().then((res)=>{
          _self.firstList = res;
        })
      },
    },
    mounted () {
      var _self = this;
     _self.showData();
      //body绑定键盘enter搜索事件
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          _self.formData();
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
  beforeDestroy(){
    //销毁键盘enter搜索事件
    document.body.removeEventListener('keyup', this.bodyListener);
  },
}
