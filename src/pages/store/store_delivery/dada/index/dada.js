import {mapGetters,mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util';
import QmTable from 'component/qm-table/index';
import QmTips from 'component/qm-tips/index';
import QmDialog from 'component/qm-dialog/index';

export default {
    name: "store-total-index",
    data(){
        return {
          bodyListener:'',
          firstList:[],
          getParams:{
            modify:'',
          },
            pageParams:{
              pageIndex: 0,
              pageSize: 15,
              start_date:'',
              end_date:'',
              total:0,
              type:0,
              order_sn:'',
            },
            list:[],
            type_datas:[],//消费类型下拉框
            dialogVisible:false,//是否展示达达发单需知
            dadaTimer:'',
            smsFlag:true,//发送验证码判断
           subData:{
            apply_type:1,//商户申请类型： 1绑定商户，0注册商户
            city_name:'',//城市名称
            city_code:'',//城市编码--明天找林勤确认下哪里获取
            source_id:'',//商户ID(申请类型为绑定商户时必填)
            enterprise_name:'',//商户名称
            contact_phone:'',//联系电话
            email:'',//联系人邮箱
            business:'',//业务类型
          },
          validData:{
              enterprise_name:false,
              source_id:false,
              contact_phone:false,
              email:false,
              business:false,
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
      QmTips,
      QmDialog
    },
    methods: {
        ...mapActions({
          dadaList:'dadaList',
        getData:'getDadaAccounts',
          checkCode:'checkCode',
          sendSms:'sendSms',//获取验证码
          saveDada:'saveDada',
          getDadaRecharge:'getDadaRecharge',
        }),
      openOrder(orderSn){
        let routeData = this.$router.resolve({
          name:"store_order_index_type",
          params:{state_type:"index",actId:0,isToday:0,orderSn:orderSn}
        });
        window.open(routeData.href, '_blank');
      },
      changeType(e){
          var el = e.currentTarget;
          this.subData.apply_type = $(el).val();
        if( this.subData.apply_type == 1) {
          $('#frmNew').hide();
          $('#frmBind').show();
          $('#bindTip').show();
        } else {
          $('#frmBind').hide();
          $('#frmNew').show();
          $('#bindTip').hide();
        }
      },
      showDada(){
        this.dialogVisible = true;
        $('.phone-bind').css('margin-top','28.2vh');
      },

      changeName(){
        if(this.subData.enterprise_name == ''){
          this.validData.enterprise_name = true
        }else{
          this.validData.enterprise_name=false;
        }
      },
      changeId(){
            if(this.subData.source_id == ''){
              this.validData.source_id = true
            }else{
              this.validData.source_id=false;
            }
      },
      changeEmail(){
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(this.subData.email == ''){
          $('.error-email').text('请输入邮箱');
          this.validData.email = true
        }else if(!reg.test(this.subData.email)){
          $('.error-email').text('请输入正确的邮箱');
          this.validData.email = true
        }else{
          this.validData.email=false;
        }
      },
      changeBusiness(){
        this.subData.business = $('#business').val().trim();
        if(this.subData.business == ''){
          this.validData.business = true;
        }else{
          this.validData.business = false;
        }
      },
      changeTel(){
            var mobile = /1[3456789]{1}\d{9}$/;
            var phone = /(^(\d{3,4}-)?\d{6,8}$)|(^(\d{3,4}-)?\d{6,8}(-\d{1,5})?$)|(\d{11})/;
            if(this.subData.contact_phone == ''){
              $('.error-phone').text('请输入联系人电话');
              this.validData.contact_phone = true
            }else if((mobile.test(this.subData.contact_phone)) || phone.test(this.subData.contact_phone)){
              this.validData.contact_phone=false;
            }else{
              $('.error-phone').text('联系人电话号码格式错误');
              this.validData.contact_phone = true
            }
      },
      formData(){
        var validRes = true
          //提交申请
        if(this.subData.apply_type == 1){
          //已注册达达商户
          this.subData.business = $('#business').val().trim();
          if(this.subData.business == ''){
            this.validData.business = true;
          }
          if(this.subData.source_id == '' || this.subData.source_id == undefined){
            this.validData.source_id = true
          }else{
            this.validData.source_id=false;
          }
          if(this.subData.enterprise_name == ''){
            this.validData.enterprise_name = true
          }else{
            this.validData.enterprise_name=false;
          }
          var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if(this.subData.email == ''){
            $('.error-email').text('请输入邮箱');
            this.validData.email = true
          }else if(!reg.test(this.subData.email)){
            $('.error-email').text('请输入正确的邮箱');
            this.validData.email = true
          }else{
            this.validData.email=false;
          }
          var mobile = /1[3456789]{1}\d{9}$/;
          var phone = /(^(\d{3,4}-)?\d{6,8}$)|(^(\d{3,4}-)?\d{6,8}(-\d{1,5})?$)|(\d{11})/;
          if(this.subData.contact_phone == ''){
            $('.error-phone').text('请输入联系人电话');
            this.validData.contact_phone = true
          }else if((mobile.test(this.subData.contact_phone)) || phone.test(this.subData.contact_phone)){
            this.validData.contact_phone=false;
          }else{
            $('.error-phone').text('联系人电话号码格式错误');
            this.validData.contact_phone = true
          }
          Object.values(this.validData).forEach((item,i) => {
            if(item){
              validRes = false
            }
          })
          if(validRes){
            //this.changeStatus(3);
            this.saveDada(this.subData).then((res)=>{
              if(res.resultCode == 1){
                //提交成功，进入注册第二步
                this.showData();
                this.changeStatus(3);
              }else{
                util.msg(res.shortMessage);
              }
            })
          }
        }
      },
      showDialog(){
        var s = 5;
        $('.dialog-dada-notice').show();
        $('.dialog-dada-notice .btn-agree .second').html('5');
        window.dadaTimer = setInterval(function(){
          s -=1;
          if( s <= 0 ){
            clearInterval(window.dadaTimer);
            $('.dialog-dada-notice .btn-agree .hint').hide();
            $('.dialog-dada-notice .btn-agree').removeClass('disabled');
          }
          $('.dialog-dada-notice .btn-agree .second').text(s);
        }, 1000);
      },
      changeStatus(status){
        this.firstList.status=status;
      },
      showData(modify){
          var _self = this;
          modify = modify==1 ? modify:'';
        var getParams = _.clone(_self.getParams);
        getParams.modify = modify;
        _self.getParams = getParams;
        _self.dadaList(getParams).then((res)=>{
          _self.firstList = res;
          if(res.city){
            _self.subData.city_name = res.city.city_name;
            _self.subData.city_code = res.city.city_code;
          }
          _self.subData.enterprise_name = res.enterprise_name;
          _self.subData.contact_phone = res.contacts_phone;
          _self.subData.email = res.email;
          _self.subData.business = res.business;
          _self.subData.source_id = res.source_id;
          setTimeout(function () {
            $("[name='business'] option").each(function () {
              if($(this).val() == _self.firstList.business){
                $(this).prop('selected','true');
              }else{
                $(this).removeAttr('selected');
              }
            })
          },50);
        })
      },
        getPageData(data){
          var _self = this;
          data.type = $('#type').val();
           _self.getData(data).then((res)=>{
             if(res.list){
               _self.list = res.list;
             }
             _self.type_datas = res.type_datas;
             var newPageParams = _.clone(_self.pageParams)
             newPageParams.total = res.total;
             _self.pageParams = newPageParams;
            })
        },
      changeIndex(index) {
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      },
        search(){
          $('select').blur();
          this.pageParams.pageIndex = 0;
          this.getPageData(this.pageParams);
        },
      countdown(time){
        var _self = this;
        window.cleardaojishi =setInterval(function(){
          if($('#second').val()==1){
            clearInterval(window.cleardaojishi);
            $('#getCode').val('重新获取');
            _self.smsFlag = true;
          }else{
            var msg=$('#second').val()+'s后重新获取';
            $('#getCode').val(msg);
            $('#second').val($('#second').val()-1);

          }
        },1000);
      },
      doRouter(url){
        this.$router.push(url);
      },
      getValidCode(){
        var _self = this;
        var myreg =/^1[3|4|5|6|7|8|9][0-9]{9}$/;
        var regFlag=myreg.test(this.firstList.contact_phone);
        if(this.firstList.contact_phone==null||this.firstList.contact_phone==''){
          util.msg('手机号码不能为空');
          return;
        }
        if(regFlag===false){
          util.msg('手机号码输入有误');
          return;
        }
        if(_self.smsFlag){
          _self.smsFlag = false;
          _self.sendSms({msgtype:'findpwd',telphone:this.firstList.contact_phone}).then((res)=>{
            if(res == 1){
              //验证码发送成功
              util.msg('发送成功');
              $('#second').val(60);
              $('#getCode').val('60s后重新获取');
              _self.countdown(60);
            }else{
              util.msg(res);
            }
            return;
          })
        }else{
          util.msg('您的操作过于频繁，请稍后重试!');
          return;
        }
      }
    },
  watch:{
    subData:{
      handler: function () {
        if(this.subData.enterprise_name !== ''){
          this.validData.enterprise_name = false
        }
        if(this.subData.source_id !== ''){
          this.validData.source_id = false
        }
        if(this.subData.contact_phone !== ''){
          this.validData.contact_phone = false
        }
        if(this.subData.email !== ''){
          this.validData.email = false
        }

      },
      deep: true
    }
  },
    mounted () {
      var _self = this;
     _self.showData();
     _self.search();
      $('body').on('click','.dialog-dada-notice .btn-agree:not(".disabled")',function(){
        $('.dialog-dada-notice').hide();
        $('#before_apply').hide();
        $('#apply').show();
      })

      $('body').on('click','.dialog-dada-notice .dialog-close',function(){
        $('.dialog-dada-notice').hide();
        clearInterval(dadaTimer);
      })
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            laydate.render({
                elem: '#start_time',
                theme: "#ff8519",
                trigger:'click',
                done:function (data) {
                  _self.pageParams.start_date = data;
                  _self.search();
                }
              });
              laydate.render({
                elem: '#end_time',
                theme: "#ff8519",
                trigger:'click',
                done:function (data) {
                  _self.pageParams.end_date = data;
                  _self.search();
                }
              });
        })
      _self.bodyListener = (e) => {
        if (e.keyCode === 13){
          _self.search();
        }
      }
      document.body.addEventListener('keyup', _self.bodyListener, false);
    },
  beforeDestroy(){
    document.body.removeEventListener('keyup', this.bodyListener);
  },
}
