import {mapGetters, mapActions} from 'vuex';
import QmPagination from 'component/qm-pagination/index';
import util from 'lib/utils/util';
import QmDialog from 'component/qm-dialog/index';

export default {
  name: "store_transaction-index",
  data() {
    return {
      bodyListener:'',
      tipMessage:false,//操作完成倒计时关闭弹框
      errorMsg:'',//弹框错误提示语
      pageParams: {
        labelId:this.$route.query.labelId
      },
      list:[],
    }
  },
  computed: {
    ...mapGetters({
      storeInfo: 'getStoreInfo',
      storeList: 'getStoreList',
      basicStore: 'getBasicStore',
    })
  },
  components: {
    QmPagination,
    QmDialog
  },
  methods: {
    ...mapActions({
      getData: 'getLabelInfo',
      addDiliveryLabel:'addDiliveryLabel',

    }),
    getPageData(data) {
      var _self = this;
      _self.getData(data).then((res) => {
        _self.list = res;
        $("#is-show").find("option[value="+res.is_show+"]").attr("selected",true);
      })
    },
    search() {
      this.pageParams.pageIndex = 0;
      this.getPageData(this.pageParams);
    },
    doAddDiliveryLabel(){
      var data = [];
      var _self = this;
      data['labelId'] = _self.pageParams.labelId;
      data['labelName'] = $('#label_name').val().trim();
      data['isShow'] = $('#is-show').val();
      var flag = true;
      $('.error-p').hide();
      if(data['labelName'] == ''){
        flag = false;
        $('#label_name').next('.error-p').show();
      }
      if(flag){
        _self.addDiliveryLabel(data).then((res)=>{
          if(res.state == 1){
            //编辑成功
            util.msg('保存成功');
            this.$router.push('/data_center/diliveryman/delivery_eval_label');
          }else{
            util.msg(res);
          }
        })
      }
    },
    changeBlur(){
      $('select').blur();
    },
    doRouter(url){
      this.$router.push(url);
    },
  },
  mounted() {
    var _self = this;
    _self.search();
    //body绑定键盘enter搜索事件
    _self.bodyListener = (e) => {
      if (e.keyCode === 13){
        _self.doAddDiliveryLabel();
      }
    }
    document.body.addEventListener('keyup', _self.bodyListener, false);
  },
  beforeDestroy(){
    //销毁键盘enter搜索事件
    document.body.removeEventListener('keyup', this.bodyListener);
  },
}
