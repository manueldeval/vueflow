<template>
  <div :class="['plug','plug-'+location]" :style="style"></div>
</template>
<script>
  export default {
    props: {
      id: {
        type: String,
        default: ""
      },
      offset: {
        type: Number,
        default: 0
      },
      location: {
        type: String,
        default: "up"
      }
    },
    computed: {
      style:  function(){
        switch (this.location){
          case "up":    return {left: this.offset+"px"}
          case "down":  return {left: this.offset+"px"}
          case "left":  return {top: this.offset+"px"}
          case "right": return {top: this.offset+"px"}
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .plug{
    position: absolute;
    margin: 0px;
    padding: 0px;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #007ACC;
  }

  .plug-left{
    left: -5px;
  }
  .plug-up{
    top: -5px;
  }
  .plug-down{
    bottom: -5px;
  }
  .plug-right{
    right: -5px;
  }
</style>