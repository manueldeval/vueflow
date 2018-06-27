<template>
  <flow-editor 
          :nodes="nodes"
          :edges="edges"
          @boxdragged="boxDragged"
          @deleteConnector="deleteConnector"
          @slotclicked="slotclicked"
          @deletenode="deletenode"
          >
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
  computed: {
    ... mapState(['edges','nodes']),
  },
  methods: {
    boxDragged(id,top,left){
      this.$store.commit('boxDragged',{id,top,left})
    },
    slotclicked(nodeId,slotId){
      this.$store.commit('slotSelected',{nodeId,slotId})
    },
    deleteConnector(edgeId){
      this.$store.commit('deleteConnector',{edgeId})
    },
    deletenode(nodeId){
      this.$store.commit('deleteNode',{nodeId})
    }
  }
}
</script>

<style lang="css">
  #app {
      height: 100%;
  }
</style>