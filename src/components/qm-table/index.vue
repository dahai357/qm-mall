<style scoped>
  .norecord {
    text-align: center;
    padding: 100px 0;
  }
  .norecord .ico-norecord {
    display: inline-block;
    width: 300px;
    height: 234px;
    vertical-align: middle;
    background: url(./assets/no-result.png) center top no-repeat;
  }
  .norecord .norecord-txt {
    margin-top: 30px;
    color: #757575;
  }
</style>
<template>
  <div class="table-content">
    <div v-show="pageParams.total > 0">
      <slot name="table"></slot>
    </div>
    <div class="empty-list" v-show="emptyShow">
      <div class="norecord">
        <i class="ico-norecord"></i>
        <p class="norecord-txt">
          暂无符合条件的数据记录
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "empty-list"  ,

    props:{
      pageParams:{
        type:Object,
        default:{
          pageIndex:0,
          pageSize:10,
          total:0
        },

      }
    },
    data(){
      return {
        emptyShow:false
      }
    },
    computed: {

    },
    methods:{


    },
    watch:{
      pageParams:function(val,oldval){
        console.log(val)
        if(val.total === 0 || val.total === null){
          this.emptyShow = true
        }else{
          this.emptyShow = false
        }
      }
    },
    mounted() {
      if(this.pageParams.total === 0 || this.pageParams.total === null){
       // this.emptyShow = true
      }else{
      //  this.emptyShow = false
      }
    }
  }
</script>
