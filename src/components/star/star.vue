<style scoped>
  .raty{font-size: 0; line-height: 0; vertical-align: middle; display: inline-block;}
  .raty img{letter-spacing: normal; word-spacing: normal; display: inline-block; width: 16px; height: 16px; margin: 2px 0;}
</style>
<template>
  <div class="star">
    <em class="raty" style="width: 100px;">
      <template v-for="i in stars">
        <img v-if="i <= raty" :src="starIcon[0]" alt="1" title="满意">&nbsp;\
        <img v-if="i > raty" :src="starIcon[1]" alt="1" title="满意">&nbsp;\
      </template>
    </em>
  </div>
</template>

<script>

    export default {
        name: "star"
      ,
      props:{
        raty:{
          type:Number,
          default:1
        }
      },
      data(){
        return {
          stars:[1,2,3,4,5],
          starIcon: [
            require("assets/seller/images/star-on.png"),
            require("assets/seller/images/star-off.png")
          ]
        }
      },
      computed: {

      },
      methods:{

      },
      watch:{
      },
      mounted() {

      },


    }
</script>
