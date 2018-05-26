<template>
    <div
      class="box"
      ref="box"
      :style="{top:(top+'px'),left:(left+'px')}"
      v-dragged="onDragged">{{id}} - {{ top }}/ {{ left }}
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
  mounted: function(){   
    //this._setBoxPosition(this.left,this.top)
    this.$emit('dragged',this,0,0)
  },
  methods: {
    getOutputConnectorPosition : function(connectorName) {
      return { x: this.left, y: this.top , direction: "up" }
    },
    getInputConnectorPosition : function(connectorName) {
      return { x: this.left, y: this.top , direction: "up" }
    },
    onDragged({ el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last }) {
      if (first || last) 
        this.$emit('dragged',this,0,0)
      else
        this.$emit('dragged',this,deltaX,deltaY)
    }
  }
}
</script>


