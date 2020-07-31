import * as _ from 'lodash';

export default {
  name: "qm-pagination"  ,

  props:{
        pageParams:{
            type:Object,
            default:{
                pageIndex:0,
                pageSize:10,
                total:0,
            },
        },
        scrollTop:{
            type:Boolean,
            default:true,
        },
    },
  data(){
    return {
        pageList:[],
        pageNum:0,
        jumpNum:1
    }
  },
  computed: {

  },
  methods:{

    init(){

        this.pageList = [];
        this.pageNum = Math.ceil(this.pageParams.total/this.pageParams.pageSize)
        if(this.pageNum <= 7){
            for(var i=0;i < this.pageNum;i++){
                this.pageList.push(i+1);
            }
        }else{
            if(this.pageParams.pageIndex+1<5){
                for(var i=1;i<=5;i++){
                    this.pageList.push(i);
                }
                this.pageList.push('...');
                this.pageList.push(this.pageNum)
            }else if(this.pageNum - this.pageParams.pageIndex < 6){
                this.pageList.push(1);
                this.pageList.push('...');
                for(var i=this.pageNum-5;i<=this.pageNum;i++){
                    this.pageList.push(i);
                }
            }else{
                this.pageList.push(1);
                this.pageList.push('...');
                for(var i=this.pageParams.pageIndex-1;i<=this.pageParams.pageIndex+4;i++){

                    this.pageList.push(i+1);
                }
                this.pageList.push('...');
                this.pageList.push(this.pageNum)
            }
        }
    },

    changeIndex(i){
        if(i == this.pageParams.pageIndex || isNaN(i)){
            return
        }else{
            this.$emit('changeIndex',i);
        }
        if(this.scrollTop){
            document.body.scrollTop = 0;
            window.scrollTo(0,0)
            document.getElementsByClassName("routerContent")[0].scrollTop = 0;
        }
    },

    goFirst(){
        this.$emit('changeIndex',0);
        if(this.scrollTop){
            document.body.scrollTop = 0;
            window.scrollTo(0,0)
            document.getElementsByClassName("routerContent")[0].scrollTop = 0;
        }
    },
    goPrex(){
        if(this.pageParams.pageIndex == 0){
            return;
        }
        this.$emit('changeIndex',this.pageParams.pageIndex-1);
        if(this.scrollTop){
            document.body.scrollTop = 0;
            window.scrollTo(0,0)
            document.getElementsByClassName("routerContent")[0].scrollTop = 0;
        }
    },
    goNext(){
        if(this.pageParams.pageIndex == this.pageNum-1){
            return;
        }
        this.$emit('changeIndex',this.pageParams.pageIndex+1);
        if(this.scrollTop){
            document.body.scrollTop = 0;
            window.scrollTo(0,0)
            document.getElementsByClassName("routerContent")[0].scrollTop = 0;
        }
    },
    goLast(){
        this.$emit('changeIndex',this.pageNum-1);
        if(this.scrollTop){
            document.body.scrollTop = 0;
            window.scrollTo(0,0)
            document.getElementsByClassName("routerContent")[0].scrollTop = 0;
        }
    },

  },
  watch:{
    pageParams(){
        this.init();
    }
  },
  mounted() {
    this.init();
  }
}
