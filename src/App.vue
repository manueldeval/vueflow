<template>
  <div id="app">
    <Workspace  :sidebar-width="200" 
                :header-height="35"
                :footer-height="20">
      <span slot="header" ><img src="./assets/brain.png" style="padding:2px;with:30px;height:30px"/></span>
      <span slot="sidebar">
           <button>Add</button>
      </span>
      <SoundFlowEditor slot="editor"></SoundFlowEditor>      
      <span slot="footer" >Mon footer</span>     
    </Workspace>
  </div>
</template>

<script>
import Workspace from "./components/Workspace"
import FlowEditor from "./components/flow/FlowEditor" 
import SoundFlowEditor from "./components/SoundFlowEditor"

export default {
  name: 'app',
  components: {
    Workspace,
    SoundFlowEditor
  }
}
</script>

<style lang="css">
  #app {
      height: 100%;
  }
</style>