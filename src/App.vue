<template>
  <div id="app">
    <Workspace  :sidebar-width="200" 
                :header-height="35"
                :footer-height="20">
      <span       slot="header" ><img src="./assets/brain.png" style="with:35px;height:35px"/></span>
      <span       slot="sidebar">sidebar</span>
      <flow-editor slot="editor"></flow-editor>
      <span       slot="footer" >Mon footer</span>     
    </Workspace>
  </div>
</template>

<script>
import Workspace from "./components/Workspace" 
import FlowEditor from "./components/FlowEditor" 

export default {
  name: 'app',
  components: {
    Workspace,
    FlowEditor
  }
}
</script>

<style lang="css">
  #app {
      height: 100%;
  }
</style>