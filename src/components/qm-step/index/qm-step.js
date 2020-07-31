import * as _ from 'lodash';

export default {
    name: "qm-step"  ,

    data(){
        return {

        }
    },

    components: {
    },

    props:{
        steps:{
            type:Array,
            default:[]
        },
        stepIndex:{
            type:Number,
            default:1
        }
    },

    computed: {

    },
    methods:{    

        getIamge(name){
            return require('../../../assets/seller/images/step/'+name);
        },
        getActiveImage(name){
            return require('../../../assets/seller/images/step/active_'+name);
        },
    },
    watch:{

    },
    mounted() {

    },
}
