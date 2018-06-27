<template>
  <div 
    :class="['slot','slot-'+location]" 
    :style="style"
    @click="toto"
  ></div>
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
    },
    methods: {
      toto(){
        this.$emit('slotclicked',this.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .slot{
    position: absolute;
    margin: 0px;
    padding: 0px;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #007ACC;
  }
  .slot:hover{
    border-style: solid;
    border-color: white;
    border-width: 1px;
  }
  .slot-left{
    left: -5px;
  }
  .slot-up{
    top: -5px;
  }
  .slot-down{
    bottom: -5px;
  }
  .slot-right{
    right: -5px;
  }
</style>