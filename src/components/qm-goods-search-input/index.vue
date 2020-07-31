<style scoped>
    .ncsc-form-category-search{display: inline-block; vertical-align: middle; position: relative; font-size: 12px;}
    .ncsc-form-category-search .search-category{position: absolute; left: 0; top: 0; width: 100px; text-align: left; box-sizing: border-box; padding: 0 20px 0 10px;}
    .ncsc-form-category-search .search-category-name{line-height: 28px; position: relative;}
    .ncsc-form-category-search .search-category-name .fa-angle-down{position: absolute; right: -10px; top: 50%; margin-top: -7px;}
    .ncsc-form-category-search .search-category-drop{position: absolute; left: 0; width: 100%; top: 29px; padding: 0 10px 3px; box-sizing: border-box; background: #fff; border:1px solid #ddd; border-top:none; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; display: none; z-index: 300;}
    .ncsc-form-category-search .list-search-category li{line-height: 1.5; padding: 2px 0;}
    .ncsc-form-category-search input[type="text"]{padding-left: 100px;}
    .ncsc-form-category-search:hover{cursor: pointer;}
    .ncsc-form-category-search.active .search-category-drop{display: block;}
    .ncsc-form-category-search.active .fa-angle-down{margin-top: -8px;}
    .ncsc-form-category-search.active .fa-angle-down:before{content: "\f106";}
    .ncsc-form-category-search.active input{border-bottom-left-radius: 0;}
</style>
<template>
    <div :class="[isActive?'active ':'','ncsc-form-category-search mr5']" >
        <div class="search-category" @mouseover="isActive=true" @mouseout="isActive=false">
            <div class="search-category-name">
                <span class="category-txt">{{curSearchTypeTxt}}</span>
                <i class="fa fa-angle-down"></i>
            </div>
            <div class="search-category-drop">
                <ul class="list-search-category">
                    <li v-for="(type,k) in searchTypes" v-show="k != searchType"><a @click="changeType(k,type)">{{type}}</a></li>
                </ul>
            </div>
        </div>
        <input type="text" class="w250"  autocomplete="off" :value="value" @input="$emit('input', $event.target.value)">
    </div>
</template>

<script>
    export default {
        name: "qm-goods-search-input"
      ,
      props:['value','searchType'],
      data(){
        return {
          isActive:false,
          curSearchTypeTxt:'商品名称',
          searchTypes:{
            0:'商品名称',
            1:'条形码'
          },
        }
      },
      computed: {

      },
      methods:{
        changeType(type,txt){
          this.$emit('update:searchType',type);
          this.curSearchTypeTxt = txt;
        },
      },
      watch:{

      },
      mounted() {

      },


    }
</script>
