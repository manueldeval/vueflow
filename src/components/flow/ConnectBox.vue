<template>
  <div class="box" ref="box" :style="{top:(top+'px'),left:(left+'px')}">
        <template v-for="loc in ['up','down','left','right']">
          <template v-for="(item, idx) in filterSlotDirection(loc)">
            <component  :ref="item.id" 
                        :is="item.type" 
                        :key="item.id" 
                        :location="loc" 
                        :offset="10+20*idx" 
                        v-bind="item"
                        @slotclicked="slotclicked"
                        >
            </component>
          </template>
        </template>
      <div style="margin:0px">
          <div class="header" v-dragit="onDragged">
            {{displayName}}
            <div style="display:inline">
            <icon name="arrows-alt" scale="0.7" style="float:right;padding:4px"></icon>
            </div>
            <div style="display:inline" @dblclick="dblclick">
            <icon name="eraser"  scale="0.7" style="float:right;padding:4px"></icon>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
  import FlowBox from './FlowBox.vue';
  import FlowSlot from './FlowSlot.vue';

  export default {
    extends: FlowBox,
    props: {
      name: {
        type: String,
        default: null
      },
      slots: {
        type: Array,
        required: false,
        default: function(){
          return [
            { id:'in1' ,  location:"up",    direction:"in",   type:"flow-slot" },
            { id:'in2' ,  location:"up",    direction:"in",   type:"flow-slot" },
            { id:'out1' , location:"down",  direction:"out",  type:"flow-slot" },
            { id:'out2' , location:"down",  direction:"out",  type:"flow-slot" }
          ]
        }
      }
    },
    computed: {
      displayName(){
        return this.name || this.id
      }
    },
    methods: {
      filterSlotDirection(dir){
        return this.slots.filter(p => p.location === dir)
      },
      _getConnectorPosition: function(connectorName){
        let definition = this.slots.find(p => p.id==connectorName)
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
      },
      slotclicked: function(slotId){
        this.$emit('slotclicked',this.id,slotId)
      },
      dblclick: function(){
        console.log(this.id)
        this.$emit('deletenode',this.id)
      }
    },
    components: {
      FlowSlot
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
  .box:hover {
    border-color: #007ACC;
    border-width: 1px;
    border-style: solid
  }
</style>