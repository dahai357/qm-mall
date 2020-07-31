import * as _ from 'lodash';
import {mapGetters,mapActions} from 'vuex';

export default {
    name: "qm-json-city"  ,

    data(){
        return {
            provinces:[],
            citys:[],
            regions:[],

            showCity:false,
            showRegion:false,
        }
    },

    components: {

    },

    props:{
        province_id:{
            type:String,
            default:0
        },
        city_id:{
            type:String,
            default:0
        },
        region_id:{
            type:String,
            default:0
        },
        isShowRegion:{
            type:Boolean,
            default:true
        }
    },

    computed: {

    },
    methods:{    
        ...mapActions({
            getCityJson:'getCityJson'
          }),

          init(){
            this.getCityJson().then(res=>{
                this.provinces = res;
                if(this.province_id){
                    var provinceInterval = setInterval(() => {
                        if(this.provinces != []){
                            this.citys = this.getCitys(this.provinces,this.province_id);
                            if(this.city_id){
                                var cityInterval = setInterval(() => {
                                    if(this.citys != []){
                                        this.regions = this.getRegions(this.citys,this.city_id);
                                        clearInterval(cityInterval);
                                    }
                                }, 100);
                            }
                            clearInterval(provinceInterval);
                        }
                    }, 100);
                }
            })
          },


          changeProvince(event){
              this.citys = [];
              this.regions = [];
              var value = event.target.value;
              this.$emit('valueChange',{level:'province',value:value})
              this.$emit('valueChange',{level:'city',value:-1})
              this.$emit('valueChange',{level:'region',value:-1})
          },
          changeCity($event){
            var value = event.target.value;
            this.$emit('valueChange',{level:'city',value:value})
            this.$emit('valueChange',{level:'region',value:-1})
          },
          changeRegion($event){
            var value = event.target.value;
            this.$emit('valueChange',{level:'region',value:value})
          },


          getCitys(provinces,province_id){
            var citys = [];
            provinces.forEach((province,p) => {
                if(province.id == province_id){
                    citys = province.city
                }
            });
            return citys;
          },
          getRegions(citys,region_id){
            var regions = [];
            citys.forEach((city,c) => {
                if(city.id == region_id){
                    regions = city.area
                }
            });
            return regions;
          }
    },
    watch:{
        province_id(){
            var provinceInterval = setInterval(() => {
                if(this.provinces != []){
                    this.citys = this.getCitys(this.provinces,this.province_id);
                    clearInterval(provinceInterval);
                }
            }, 100);
        },
        city_id(){
            var cityInterval = setInterval(() => {
                if(this.citys != []){
                    this.regions = this.getRegions(this.citys,this.city_id);
                    clearInterval(cityInterval);
                }
            }, 100);
        },
        region_id(){

        },
    },
    mounted() {
        this.init();
    }
}
