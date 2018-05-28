<template>
  <div  ref="container" 
        class="flow-container"
        @mousewheel="onWheel"
        v-dragit="onDragged"
        :style="{
          width:((100/scale)+'%'),
          height:((100/scale)+'%'),
          transform: 'scale('+scale+')',
          top: top +'px',
          left: left +'px'
        }">
        <template v-for="item in edges">
          <component 
            :is="item.type" 
            :key="item.id" 
            v-bind="item">
          </component>
        </template>

        <template v-for="item in nodes">
          <component 
            :ref="item.id"
            :is="item.type" 
            :key="item.id" 
            v-bind="item"
            @dragged="positionChanged">
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
import ConnectBox from "./impl/ConnectBox" 


export default {
  name: 'app',
  components: {
    FlowEditor,
    FlowBox,
    FlowConnector,
    ConnectBox
  },
  data () {
    return {
      top: 0,
      left: 0,
      scale: 1.0,
      nodes: [
        {
          id: 'Node1',
          type: 'connect-box',
          left : 50,
          top : 10
        },{
          id: 'Node2',
          type: 'connect-box',
          left : 300,
          top : 200
        },{
          id: 'Node3',
          type: 'connect-box',
          left : 20,
          top : 200
        }
      ],
      edges: [
        {
          id: "edge1",
          type: "flow-connector",
          from: {node: "Node1" , output: "out2"},
          to:   {node: "Node2" , input: "in2"},
          src: { x:10 ,  y:20, direction:"right"},
          dst: { x:500 , y:100, direction:"left"}
        },{
          id: "edge2",
          type: "flow-connector",
          from: {node: "Node1" , output: "out1"},
          to:   {node: "Node3" , input: "in1"},
          src: { x:10 ,  y:20, direction:"right"},
          dst: { x:50 , y:10, direction:"left"}
        }
      ]
    }
  },
  mounted: function(){
    this.updateAllPositions();
  },
  methods: {
    onWheel: function(e){
      let ratio = e.deltaY>0?-0.05:0.05;
      let newScale = this.scale+ ratio
      if (newScale > 0 && newScale <= 1) {
        this.scale = newScale
      }
    },
    updateAllPositions: function(){
      this.nodeNames().forEach(id => {
        this.positionChanged(id,0,0)
      });
    },
    nodeElement: function(ref){
      return this.$refs[ref][0]
    },
    nodeNames: function(){
      return this.nodes.map(node => node.id)
    },
    positionChanged: function(boxId,offsetX,offsetY){
      this.changeNodePosition(boxId,offsetX,offsetY)
      this.changeEdgesPosition(boxId)
    },
    changeEdgesPosition: function(boxId){
      let box = this.nodeElement(boxId)
      let srcEdges = this.edges.filter(edge => edge.from.node == box.id)
      let dstEdges = this.edges.filter(edge => edge.to.node   == box.id)
      srcEdges.forEach(edge => {
        let connectorPosition = box.getOutputConnectorPosition(edge.from.output)  
        edge.src.x = connectorPosition.x
        edge.src.y = connectorPosition.y
        edge.src.direction = connectorPosition.direction
      })
      dstEdges.forEach(edge => {
        let connectorPosition = box.getInputConnectorPosition(edge.to.input)  
        edge.dst.x = connectorPosition.x
        edge.dst.y = connectorPosition.y
        edge.dst.direction = connectorPosition.direction
      })
    },
    changeNodePosition: function(id,ox,oy){
      let node = this.nodes.find(n => n.id == id)
      node.top = node.top + (oy / this.scale)
      node.left = node.left + (ox / this.scale)
    },
    onDragged: function(e){
      let {deltaX,deltaY,first,last} = e
      if (first || last) return
      this.nodeNames().forEach((nodeId) => {
        this.changeNodePosition(nodeId,deltaX,deltaY)
      })
      this.updateAllPositions()
    }
  }
}
</script>


