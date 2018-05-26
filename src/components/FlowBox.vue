<template>
    <div
      class="box"
      ref="box"
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
  watch: {
    top: function(val) {this._setBoxPosition(this.left,this.top)},
    left: function(val) {this._setBoxPosition(this.left,this.top)}
  },
  mounted: function(){   
    this._setBoxPosition(this.left,this.top)
    this.$emit('dragged',this)
  },
  methods: {
    getOutputConnectorPosition : function(connectorName) {
      return { x: this._getBoxPosition().x, y: this._getBoxPosition().y , direction: "up" }
    },
    getInputConnectorPosition : function(connectorName) {
      return { x: this._getBoxPosition().x, y: this._getBoxPosition().y , direction: "up" }
    },
    _boxElement: function(){
      return this.$refs.box
    },
    _setBoxPosition: function(x,y){
      this._boxElement().style.left = x + "px" 
      this._boxElement().style.top = y + "px"
    },
    _getBoxPosition: function(){
      return { 
        x: parseInt(this._boxElement().style.left.replace("px","")),
        y: parseInt(this._boxElement().style.top.replace("px","")) 
      }
    },
    onDragged({ el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last }) {
      if (first) {
        this.beforeDragPosition = this._getBoxPosition()
        return
      }
      if (last) {
        return
      }
      console.log( offsetX, offsetY, clientX, clientY)
      console.log(this.beforeDragPosition.x+(offsetX*3),this.beforeDragPosition.y+offsetY)
      this._setBoxPosition(this.beforeDragPosition.x+offsetX/1,this.beforeDragPosition.y+offsetY/1)
      this.$emit('dragged',this)
    }
  }
}
</script>


