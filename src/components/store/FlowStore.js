import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let nodes = [
  { id: 'Node1', type: 'connect-box', left: 50, top: 10 },
  { id: 'Node2', type: 'connect-box', left: 300, top: 150},
  { id: 'Node3', type: 'connect-box', left : 20, top : 150},
  { id: 'Node4', type: 'connect-box', left : 20, top : 300},
];
let edges = [
  { id: "edge1", type: "flow-connector", from: {node: "Node1" , output: "out2"}, to:   {node: "Node2" , input: "in2"}},
  { id: "edge2", type: "flow-connector", from: {node: "Node1" , output: "out1"}, to:   {node: "Node3" , input: "in1"}},
  { id: "edge3", type: "flow-connector", from: {node: "Node3" , output: "out2"}, to:   {node: "Node4" , input: "in2"}},
]

export default new Vuex.Store({
  state: {
    nodes: nodes,
    edges: edges
  },
  getters:{
    // Compute derived state based on the current state. More like computed property.
   },
   mutations:{
    // Mutate the current state
   },
   actions:{
    // Get data from server and send that to mutations to mutate the current state
   }
})
