export default {
    name: "qm-timepickers"  ,
    props:{
      name:{
        type:String,
        default:'picker'
      },
      value:{
        type:String,
        default:''
      },
      min:{
        type:String,
        default:'1970-01-01 00:00:00'
      },
      max:{
        type:String,
        default:'2099-12-31 24:00:00'
      },
      theme:{
        type:String,
        default:'#ff8519'
      },
      format:{
        type:String,
        default:'HH:mm'
      },
      position:{
        type:String ,
        default:"absolute"
      },
      trigger:{
        type:String ,
        default:"click"
      }
    },
  
    data(){
      return {
        laydate:null
      }
    },
    computed: {
      
    },
    methods:{
     
      initDate(){
        //时间选择器

        var vm = this;
        this.$nextTick(()=>{
          layui.use('laydate', function(){
            var laydate = layui.laydate;
            vm.laydate = laydate.render({
              elem: '#'+vm.name,
              type: 'time',
              trigger: vm.trigger,
              position: vm.position,//定位，
              theme: vm.theme,//主题
              min: vm.min.length < 6 ? vm.min+":00":vm.min,//最小值
              max: vm.max.length < 6 ?vm.max+":00":vm.max,//最大值
              btns: ['confirm'], //只出现确定按钮
              format:vm.format, 
              done: function(value, date){
                vm.$emit('input',value); 
                vm.$emit('on-change',value)
  
              }
            });
          });
        })
        
      }
    },
    watch:{
  
      min(){
        var minDate = this.min.split(':');
        var interval = setInterval(() => {
          if(this.laydate){
            this.$nextTick(()=>{
                this.laydate.config.min.hours = parseInt(minDate[0]);
                this.laydate.config.min.minutes = parseInt(minDate[1]);
              clearInterval(interval);
            })
          }
        }, 100);
      },

      max(){

        var maxDate = this.max.split(':');
        var interval = setInterval(() => {
          if(this.laydate){
            this.$nextTick(()=>{
              this.laydate.config.max.hours = parseInt(maxDate[0]);
              this.laydate.config.max.minutes = parseInt(maxDate[1]);
              clearInterval(interval);
            })
          }
        }, 100);
      },
    },
    mounted() {
      
      this.initDate();

    }
  }