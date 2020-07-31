import * as _ from 'lodash';
import districtSelect from 'lib/utils/districtSelect';

export default {
  name: "qm-pagination"  ,

  props:{
        province:{
            type:String,
            default:''
        },
        city:{
            type:String,
            default:''
        },
        district:{
            type:String,
            default:''
        }
    },
  data(){
    return {
       
    }
  },
  computed: {

  },
  methods:{

    init(){
        districtSelect.initDistrict(this.province,this.city,this.district,{});
    },

    search(event,level){
        var value = event.target.value
        this.$emit('valueChange',{level:level,value:value});
        districtSelect.search(event.target,level);
      },

  },
  watch:{
    province:function(){
      // this.init();
      districtSelect.setlevelValue('province',this.province)
    },
    city:function(){
      // this.init();
      districtSelect.setlevelValue('city',this.city)
    },
    district:function(){
      // this.init();
      districtSelect.setlevelValue('district',this.district)
    },
  },
  mounted() {
    this.init();
  }
}
