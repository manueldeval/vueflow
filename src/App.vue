<template>
  <div id="app">
    <Workspace  :sidebar-width="200" 
                :header-height="35"
                :footer-height="20">
      <span       slot="header" ><img src="./assets/brain.png" style="with:35px;height:35px"/></span>
      <span       slot="sidebar">
           <button v-on:click="addNode">Add</button>

      </span>
      <flow-editor 
        slot="editor"
        :nodes="nodes"
        :edges="edges"
        @boxDragged="boxDragged">
      </flow-editor>
      <span slot="footer" >Mon footer</span>     
    </Workspace>
  </div>
</template>

<script>
import Workspace from "./components/Workspace" 
import FlowEditor from "./components/FlowEditor" 

let nodes = [
  { id: 'Node1', type: 'connect-box', left: 50, top: 10 },
  { id: 'Node2', type: 'connect-box', left: 300, top: 150},
  { id: 'Node3', type: 'connect-box', left : 20, top : 150},
  { id: 'Node4', type: 'connect-box', left : 20, top : 300}
];
let edges = [
  { id: "edge1", type: "flow-connector", from: {node: "Node1" , output: "out2"}, to:   {node: "Node2" , input: "in2"}},
  { id: "edge2", type: "flow-connector", from: {node: "Node1" , output: "out1"}, to:   {node: "Node3" , input: "in1"}},
  { id: "edge3", type: "flow-connector", from: {node: "Node3" , output: "out2"}, to:   {node: "Node4" , input: "in2"}},
]

export default {
  name: 'app',
  components: {
    Workspace,
    FlowEditor
  },
  data() {
    return { nodes, edges,count:4}
  },
  methods: {
    boxDragged(id,top,left){
      let node = this.nodes.find(node => node.id==id)
      node.top = top
      node.left = left
    },
    addNode(){
      this.count = this.count+1
      this.nodes.push ({ id: 'Node'+this.count, type: 'connect-box', left: 10, top: 10 })

    }
  }
}
</script>

<style lang="css">
  #app {
      height: 100%;
  }
</style>