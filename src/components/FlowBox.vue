<template>
    <div
      class="box"
      ref="box"
      :style="{top:(top+'px'),left:(left+'px')}"
      v-dragit="onDragged">{{id}} - {{ top }}/ {{ left }}
    </div> 
</template>

<style lang="scss" scoped>
  .box {
    width:100px;
    height:100px;
    background-color:rgb(124, 124, 124);
    position:absolute;
    border-radius: 5px;
    user-select: none;
  }
</style>


<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    top: {
      type: Number,
      default: 25
    },
    left: {
      type: Number,
      default: 25
    },
    onPositionChange: {
      type: Object,
      default: (point) => {}
    },
  },
  data () {
    return {
      beforeDragPosition: {x:0,y:0},
    }
  },
  methods: {
    getOutputConnectorPosition : function(connectorName) {
      return { x: this.left, y: this.top , direction: "up" }
    },
    getInputConnectorPosition : function(connectorName) {
      return { x: this.left, y: this.top , direction: "up" }
    },
    onDragged(e) {
      let { el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last } = e
      //console.log(e)
      if (first || last) 
        this.$emit('dragged',this.id,0,0)
      else
        this.$emit('dragged',this.id,deltaX,deltaY)
    }
  }
}
</script>


