export default {
  name: "qm-checkbox-frame"  ,
  props:{
    value:{
        type:Boolean,
        default:false
    },
    text:{
        type:String,
        default:''
    },
    size:{
      type:String,
      default:'normal'
    },
    disabled:{
      type:Boolean,
      default:false,
    }
  },

  data(){
    return {
     
    }
  },
  computed: {
    
  },
  methods:{
    changeSelect(event){
        var value = !this.value;
        this.$emit('input',value); 
        this.$emit('on-change',value);
        this.$emit('valueChage',value);
    }
  },
  watch:{

  },
  mounted() {
    
  }
}