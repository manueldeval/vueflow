<template>
  <div class="box" ref="box" :style="{top:(top+'px'),left:(left+'px')}">
        <template v-for="loc in ['up','down','left','right']">
          <template v-for="(item, idx) in filterPlugDirection(loc)">
            <component  :ref="item.id" 
                        :is="item.type" 
                        :key="item.id" 
                        :location="loc" 
                        :offset="10+20*idx" 
                        v-bind="item">
            </component>
          </template>
        </template>
      <div style="margin:0px">
          <div class="header" v-dragit="onDragged">
            {{id}}
            <icon name="arrows-alt" scale="0.7" style="float:right;padding:4px"></icon>
          </div>
      </div>
  </div>
</template>
<script>
  import FlowBox from '../FlowBox.vue';
  import FlowPlug from '../FlowPlug.vue';

  export default {
    extends: FlowBox,
    props: {
      plugs: {
        type: Array,
        required: false,
        default: function(){
          return [
            { id:'in1' , location:"up", direction:"in", type:"flow-plug" },
            { id:'in2' , location:"up", direction:"in", type:"flow-plug" },
            { id:'out1' , location:"down", direction:"out", type:"flow-plug" },
            { id:'out2' , location:"down", direction:"out", type:"flow-plug" }
          ]
        }
      }
    },
    methods: {
      filterPlugDirection(dir){
        return this.plugs.filter(p => p.location === dir)
      },
      _getConnectorPosition: function(connectorName){
        let definition = this.plugs.find(p => p.id==connectorName)
        let direction = definition.location
        let x = this.left 
        let y = this.top 
        let offsetx = this.$refs[connectorName][0].$el.offsetLeft+5
        let offsety = this.$refs[connectorName][0].$el.offsetTop+5
        return  { x:x+offsetx, y:y+offsety, direction }
      },
      getOutputConnectorPosition : function(connectorName) {
        return this._getConnectorPosition(connectorName)
      },
      getInputConnectorPosition : function(connectorName) {
        return this._getConnectorPosition(connectorName)
      }
    },
    components: {
      FlowPlug
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    background-color:rgb(199, 199, 199);
    color: rgb(71, 71, 71);
    background-color:rgb(199, 199, 199);
    height: 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    text-align: center;
  }
  .box {
    width:150px;
    height:100px;
    background-color:rgb(124, 124, 124);
    position:absolute;
    border-radius: 5px;
    user-select: none;
  }
</style>