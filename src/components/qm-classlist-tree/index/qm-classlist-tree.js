
export default {
    name: "qm-classlist-tree"  ,
    props:{
        list:{
            default:(()=>{
                return [];
            }),
            type:Array
        },
        defaultProps:{
            default:(()=>{
                return {
                    children: 'children',
                    label: 'gc_name'
                };
            }),
            type:Object
        },
        defaultExpandedKeys:{
            default:(()=>{
                return [];
            }),
            type:Array
        },
        defaultCheckedKeys:{
            default:(()=>{
                return [];
            }),
            type:Array
        },
        showCheckox:{
            default:(()=>{
                return [];
            }),
            type:Boolean
        },
        y:0
    },
  
    data(){
      return {
        items:[]
      }
    },
    computed: {
     
    },
    methods:{
        checkChage(event){
            var value = this.$refs.tree.getCheckedKeys();
            
            // this.items= [];
            // if(value.length >0){
            //     value.forEach((val)=>{
            //         this.filterNode(val,this.list);
            //     })
            // }
            this.$emit('checkChage',value);
            // this.$emit('checkChageLists',this.items);
        },

        filterNode(gc_id,list){
        
            var item = null;
            list.forEach((li) => {
                if(li.gc_id == gc_id){
                    item = li;
                    this.items.push(li);                    
                    if(!item && li.children){
                        var childItem = this.filterNode(gc_id,li.children)
                        if(!childItem && childItem != undefined){
                            item = childItem;
                        }
                    }
                   return;
                }
                
            });
        }

    },
    watch:{
       
    },
    mounted() {
      

    }
  }