import {mapGetters,mapActions, mapMutations} from 'vuex'
import QmPagination from 'component/qm-pagination/index';
import QmDialog from 'component/qm-dialog/index';
import QmTable from 'component/qm-table/index';

export default {
    name: "qm-store-class-base",

    data(){
        return {
            pageParams:{
                pageIndex:0,
                pageSize:15,
                total:0
            },
            list:[],
            dialogVisible:false,
            preItem:{},


            form: {},
            //预留校验部分
      
            //记录省市县
            provinceList: [],
            dataprovinceList: [],
            provinceCode: "",
      
            cityList: [],
            datacityList: [],
            cityCode: "",
      
            countryList: [],
            datacountryList: [],
            countryCode: "",
      
            //是否可以编辑
            disabled: true,
            activeClass: "active",
            disactiveClass: "disactive",

            dialog1Title:"申请信息查看",
            auditDays:3,
        }
    },

    components:{
        QmPagination,
        QmDialog,
        QmTable
    },

    computed:{
        ...mapGetters({
            basicStore:'getBasicStore',
            invoice:'getInvoice'
        })
    },

    methods: {
        ...mapActions({
            classInvoiceList:'classInvoiceList',
            getStoreSetting:'getStoreSetting'
        }),

        changeIndex(index){
            this.pageParams.pageIndex = index;
            this.getPageData(this.pageParams);
        },
        
        getPageData(data){
            this.classInvoiceList(data).then((res)=>{
                this.list = res.list;
                var newPageParams = _.clone(this.pageParams)
                newPageParams.total = res.total;
                this.pageParams = newPageParams;
            })
        },

        openDialog(item,i){
            this.dialog1Title = "申请信息查看";
            this.dialogVisible = true;
            this.preItem = item;
        },

          
    },

    filters:{
        toFix2(value){
            return parseFloat(value+"").toFixed(2)
        }
    },

    mounted () {
        this.getPageData(this.pageParams);
        this.getStoreSetting().then(()=>{

        })
    },
    watch:{
        invoice:function(){
            this.getPageData(this.pageParams);
        }
    }
}