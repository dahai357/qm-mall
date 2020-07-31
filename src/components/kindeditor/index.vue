<style scoped>

</style>
<template>
    <div class="kindeditor">
        <textarea class="form-control" ref="kindeditor" v-model="localValue" name="content" v-loaded-callback='initKindeditor'></textarea>
    </div>
</template>

<script>
  import '../../../static/kindeditor/kindeditor-min.js'
  import '../../../static/kindeditor/lang/zh_CN.js'
  // import '../../../static/kindeditor/themes/default/default.css'
    export default {
      name: "kindeditor"
      ,
      props:['options', 'value','readonly'],
      data(){
        return {
          localValue: '',
          KE:''
        }
      },
      computed: {

      },
      methods:{
        initKindeditor () {
          var _this = this
          // 默认参数
          var options = {
            afterChange () {
              _this.localValue = this.html()
            },
            basePath:'../../../static/kindeditor/'
          }
          // 调用外部参数
          if (_this.options) {
            for(var i in _this.options){
              options[i] = _this.options[i]
            }
          }
          this.KE = KindEditor.create(_this.$refs.kindeditor,options);
          if(this.readonly === true) {
            this.KE.readonly(true);
          }
        },
        // 设置初始值
        setDefault () {
          this.localValue = this.value
        },
        kout(){
          // if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
            $("html").css("overflow","auto")
            $(".main").css("marginRight","0px");
            $(".header").css("width","calc(100% - 0px)");
          // }
        },
        // 修改父件的值
        updateValue () {
          this.$emit('input',this.localValue)
        },
        appendHtml(val) {
          this.KE.appendHtml(val);
        },
        html(val) {
          this.KE.html(val);
        }
      },
      watch:{
        localValue: 'updateValue',
        value: 'setDefault'
      },
      mounted() {

      },
      created() {
        this.setDefault()
      },
      directives:{
        loadedCallback:{
          inserted: function (el, binding, vnode) {
            binding.value(el, binding, vnode)
          }
        }
      }
    }
</script>
