import * as _ from 'lodash';
import {mapGetters,mapActions} from 'vuex';

export default {
    name: "qm-json-industry"  ,

    data(){
        return {
            industrys1:[],
            industrys2:[],
            showI2:true,
            
        }
    },

    components: {

    },

    props:{
        industry_id1:{
            type:String,
            default:'-1'
        },
        industry_id2:{
            type:String,
            default:'-1'
        },
    },

    computed: {

    },
    methods:{    
        ...mapActions({
            getIndustryJson:'getIndustryJson'
          }),

          init(){
            this.getIndustryJson().then(res=>{
                this.industrys1 = res;
                if(this.industry_id1){
                    this.showI2 = false;
                    var industry_id1Interval = setInterval(() => {

                        if(this.industrys1 != []){
                            this.industrys2 = this.getIndustrys2(this.industrys1,this.industry_id1);
                            clearInterval(industry_id1Interval);
                            this.showI2 = true;
                        }
                    }, 100);
                }
            })
          },

          changeIndustry1(event){
            this.industrys2 = [];
            var value = event.target.value;
            this.$emit('valueChange',{level:'industry1',value:value})
            this.$emit('valueChange',{level:'industry2',value:-1})
          },
          changeIndustry2(event){
            var value = event.target.value;
            this.$emit('valueChange',{level:'industry2',value:value})
          },

          getIndustrys2(industrys1,industry_id1){
            
            var industrys2 = [];
            industrys1.forEach((industry1,i1) => {
                if(industry1.id == industry_id1){
                    industrys2 = industry1.sub
                }
            });
            return industrys2;
          }

    },
    watch:{

        industry_id1(){
            this.showI2 = false;
            var industry_id1Interval = setInterval(() => {

                if(this.industrys1 != []){
                    this.industrys2 = this.getIndustrys2(this.industrys1,this.industry_id1);
                    clearInterval(industry_id1Interval);
                    this.showI2 = true;
                }
            }, 100);
        },
        industry_id2(){
            
        },
        
    },
    mounted() {
        this.init();
    }
}
