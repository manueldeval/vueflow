<template>
  <div  ref="container" 
        class="flow-container"
        @mousewheel="onWheel"
        v-dragit="onDragged"
        :style="{
          width:((100/scale)+'%'),
          height:((100/scale)+'%'),
          transform: 'scale('+scale+')',
          backgroundPosition: left +'px '+top+'px'
        }">

        <template v-for="item in nodes">
          <component 
            :ref="item.id"
            :is="item.type" 
            :key="item.id" 
            v-bind="item"
            :left="(item.left+left)"
            :top="(item.top+top)"
            @dragged="positionChanged"
            @slotclicked="slotclicked"
            @deletenode="deletenode"
            >
          </component>
        </template> 

        <template v-for="item in edges">
          <component 
            :is="item.type" 
            :key="item.id" 
            @dblclick="deleteConnector"
            v-bind="item">
          </component>
        </template>
  </div>

</template>

<style lang="scss">
  .flow-container { 
    transform-origin : top left;
    overflow:auto;
    position:relative;
    height:10000px;
    width: 10000px;
    background-image: linear-gradient(0deg,  transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), 
                      linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent);
    background-size:50px 50px;
  }
  .flow-container:active:hover {
  cursor: move;
  }

</style>


<script>
import FlowEditor from "./FlowEditor" 
import FlowBox from "./FlowBox" 
import FlowConnector from "./FlowConnector" 
import ConnectBox from "./ConnectBox" 


export default {
  name: 'app',
  components: {
    FlowEditor,
    FlowBox,
    FlowConnector,
    ConnectBox
  },
  props: {
    edges: {
      type: Array,
      default:[]
      //The object is {node: "Node1" , output: "out2"}
    },
    nodes:{
      type: Array,
      default:[]
      //The object is { id: "edge1", type: "flow-connector", from: {node: "Node1" , output: "out2"}, to:   {node: "Node2" , input: "in2"}},
    }
  },
  data () {
    return {
      top: 0,
      left: 0,
      scale: 1.0
    }
  },
  mounted() {
    // Uggly hack to force re-render...
    this.nodeNames().forEach((nodeId) => {
      this.positionChanged(nodeId,0,1)
      this.$nextTick(() => {
        this.positionChanged(nodeId,0,-1)
      })
    })
  },
  methods: {
    onWheel: function(e){
      let ratio = e.deltaY>0?-0.05:0.05;
      let newScale = this.scale+ ratio
      if (newScale > 0 && newScale <= 1) {
        this.scale = newScale
      }
    },
    nodeNames: function(){
      return this.nodes.map(node => node.id)
    },
    positionChanged: function(id,ox,oy){
      let node = this.nodes.find(n => n.id == id)
      node.top = node.top + (oy / this.scale)
      node.left = node.left + (ox / this.scale)
      this.$emit('boxdragged',id,node.top,node.left)
    },
    onDragged: function(e){
      let {deltaX,deltaY,first,last} = e
      if (first || last) return
      this.top = this.top + deltaY / this.scale
      this.left = this.left + deltaX / this.scale
    },
    slotclicked: function(nodeId,slotId){
      this.$emit('slotclicked',nodeId,slotId)
    },
    deleteConnector: function(edgeId){
      this.$emit('deleteConnector',edgeId)
    },
    deletenode: function(nodeId){
      this.$emit('deletenode',nodeId)
    }
  }
}
</script>


