<template>
  <flow-editor 
          :nodes="nodes"
          :edges="edges"
          @boxDragged="boxDragged">
  </flow-editor>
</template>

<script>
import FlowEditor from "./flow/FlowEditor" 
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
      FlowEditor
  },
  data() {
    return {
      count: 0
    }
  },
  computed: mapState(['edges','nodes']),
  methods: {
    boxDragged(id,top,left){
      let node = this.nodes.find(node => node.id==id)
      node.top = top
      node.left = left
    }
  }
}
</script>

<style lang="css">
  #app {
      height: 100%;
  }
</style>