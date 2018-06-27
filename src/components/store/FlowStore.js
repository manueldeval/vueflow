import Vue from 'vue'
import Vuex from 'vuex'
import guid from './uuid.js'

Vue.use(Vuex)

function demoNodeFactory(opts){
  const uuid = guid()
  const options = opts || {}
  const id = options.id || uuid
  const name = options.name || id.substr(0,Math.min(7,id.length))
  const type = options.type ||  'connect-box'
  const left = options.left || 20
  const top = options.top || 20
  return { id, name, type, left, top}
}

let nodes = [
  demoNodeFactory(),
  { id: 'Node1', type: 'connect-box', left: 50,  top: 10},
  { id: 'Node2', type: 'connect-box', left: 300, top: 150},
  { id: 'Node3', type: 'connect-box', left: 20,  top: 150},
  { id: 'Node4', type: 'connect-box', left: 20,  top: 300},
];

let edges = [
  { id: "edge1", type: "flow-connector", from: {node: "Node1" , output: "out2"}, to:   {node: "Node2" , input: "in2"}},
  { id: "edge2", type: "flow-connector", from: {node: "Node1" , output: "out1"}, to:   {node: "Node3" , input: "in1"}},
  { id: "edge3", type: "flow-connector", from: {node: "Node3" , output: "out2"}, to:   {node: "Node4" , input: "in2"}},
]

// Return true si un slot est actuellement selectionné
function isActualySelected(state){
  return  state.slotSelected.nodeId != null || 
          state.slotSelected.slotId != null
}
function unselectSlot(state){
  state.slotSelected.nodeId = null
  state.slotSelected.slotId = null
}
function slotSelected(state,{nodeId,slotId}){
  if (isActualySelected(state)){
    connectSelectionTo(state,{nodeId,slotId})
    unselectSlot(state)
    unhighlightCompatibleSlot(state)
  } else {
    state.slotSelected.nodeId = nodeId
    state.slotSelected.slotId = slotId
    highlightCompatibleSlot(state)
  }
}
function highlightCompatibleSlot(state){
  console.log("highlightCompatibleSlot: Not implemented")
}
function unhighlightCompatibleSlot(state){
  console.log("unhighlightCompatibleSlot: Not implemented")
}
function connectSelectionTo(state,{nodeId,slotId}){
  state.edges.push({ id: guid(), 
    type: "flow-connector", 
    from: {node: state.slotSelected.nodeId , output: state.slotSelected.slotId}, 
    to:   {node: nodeId , input: slotId}})
}
function deleteConnector(state,{edgeId}){
  const edge = state.edges.find(e => e.id == edgeId)
  if (!edge){
    console.error("Edge ",edgeId," not found.")
  } else {
    state.edges.splice(state.edges.indexOf(edge), 1);
  }
}
function deleteNode(state,{nodeId}){
  let edgesToDelete = state.edges.filter(edge => edge.from.node == nodeId || edge.to.node == nodeId)
  edgesToDelete.forEach(edge => deleteConnector(state,{edgeId: edge.id}))
  const node = state.nodes.find(e => e.id == nodeId)
  if (!node){
    console.error("Node ",nodeId," not found.")
  } else {
    state.nodes.splice(state.nodes.indexOf(node), 1);
  }
}
function boxDragged(state,{id,top,left}){
  let node = state.nodes.find(node => node.id==id)
  node.top = top
  node.left = left
}

/** 
 * Store implementation
 */
export default new Vuex.Store({
  state: {
    nodes: nodes,
    edges: edges,
    slotSelected: {
      nodeId: null,
      slotId: null
    }
  },
  getters:{
    // Compute derived state based on the current state. More like computed property.
   },
  mutations:{
    boxDragged,
    unselectSlot,
    slotSelected,
    deleteConnector,
    deleteNode
  },
  actions:{
    // Get data from server and send that to mutations to mutate the current state
  }
})
