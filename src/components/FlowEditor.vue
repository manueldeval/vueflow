<template>
  <div ref="container" class="flow-container" @mousewheel="onWheel">

        <template v-for="item in edges">
          <component 
            :is="item.type" 
            :key="item.id" 
            v-bind="item">
          </component>
        </template>

        <template v-for="item in nodes">
          <component 
            :is="item.type" 
            :key="item.id" 
            v-bind="item"
            @dragged="positionChanged">
          </component>
        </template> 

  </div>
</template>

<style lang="scss">
  $scale: 1;
  .flow-container { 
    top: 0px;
    left: 0px;
    transform: scale($scale) ;
    transform-origin : top left;
    //background-color: slategrey;
    overflow:auto;
    position:relative;
    height: 200%/$scale;
    width: 100%/$scale;
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
      nodes: [
        {
          id: 'Node1',
          type: 'connect-box',
          top : 10,
          left : 50,
        },{
          id: 'Node2',
          type: 'connect-box',
          top : 200,
          left : 300
        },{
          id: 'Node3',
          type: 'connect-box',
          top : 200,
          left : 20
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
  methods: {
    onWheel: function(e){
      console.log(e)
    },
    resize: function(){
      console.log("RESIZED!")
    },
    positionChanged: function(box){
      this.changeNodePosition(box.id,box._getBoxPosition().y,box._getBoxPosition().x)
      this.changeEdgesPosition(box)
    },
    changeEdgesPosition: function(box){
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
    changeNodePosition: function(id,top,left){
      let node = this.nodes.find(n => n.id == id)
      node.top = top
      node.left = left
    }
  }
}
</script>


