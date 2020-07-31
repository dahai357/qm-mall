<style scoped>
</style>
<template>
  <div class="qm-store-class-base">

  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import QmPagination from 'component/qm-pagination/index'
  import QmDialog from 'component/qm-dialog/index';
  import QmTips from 'component/qm-tips/index';
  import util from 'lib/utils/util'
  import {storeEvaluate} from 'api'
  export default {
    name: "store-refund-return",
    data() {
      return {
        pageParams:{
          pageIndex:0,
          pageSize:10,
          total:0
        },
        list:[],
      }
    },

    computed:{
    },

    components:{
      QmPagination,
      QmDialog,
      QmTips
    },

    methods: {
      getPageData(data){
        storeEvaluate.templatesList(data).then((res)=>{
          this.list = res.list;
          var newPageParams = _.clone(this.pageParams)
          newPageParams.total = res.total;
          this.pageParams = newPageParams;
        })
      },
      changeIndex(index){
        this.pageParams.pageIndex = index;
        this.getPageData(this.pageParams);
      }
    },
    watch:{

    },
    mounted () {
      this.getPageData(this.pageParams);
      layui.use('layer', function(){
        this.layer = layui.layer;
      });
    },
    updated(){
    }
  }
</script>
