<template>
  <div id="container" class="flexChild columnParent">
    
    <div id="header" ref="header" class="flexChild">
      <slot name="header">Fichier</slot>
    </div>

    <div id="content"   class="rowParent">
      <div id="sidebar" ref="sidebar">
        <slot name="sidebar">Fichier</slot>
      </div>
      <div id="drag"    v-dragged="onDragged"></div>
      <div id="editor">
        <slot name="editor">Editor</slot>
      </div>
    </div>

    <div id="footer" ref="footer" class="flexChild">
      <slot name="footer">Footer</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sidebarWidth: {
      type: Number,
      default: 200
    },
    headerHeight: {
      type: Number,
      default: 25
    },
    footerHeight: {
      type: Number,
      default: 25
    }
  },
  data () {
    return {
      beforeDragSideBarWidth: 0
    }
  },
  mounted: function(){
    this.setHeaderHeight(this.headerHeight)
    this.setFooterHeight(this.footerHeight)
    this.setSideBarWidth(this.sidebarWidth)
    this.beforeDragSideBarWidth = this.getSideBarWidth()
  },
  methods: {
    _footerElement: function(){
      return this.$refs.footer
    },
    setFooterHeight: function(value){
      this._footerElement().style.height=value+'px'
    },
    _headerElement: function(){
      return this.$refs.header
    },
    setHeaderHeight: function(value){
      this._headerElement().style.height=value+'px'
    },
    _sidebarElement: function(){
      return this.$refs.sidebar
    },
    setSideBarWidth: function(value){
      this._sidebarElement().style.width=value+'px'
    },
    getSideBarWidth: function(){
      return parseInt(this._sidebarElement().style.width.replace("px",""))
    },
    onDragged({ el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last }) {
      if (first) {
        return
      }
      if (last) {
        this.beforeDragSideBarWidth = this.getSideBarWidth()
        return
      }
      this.setSideBarWidth(this.beforeDragSideBarWidth+offsetX)
    }
  }
}
</script>

<style lang="scss">
@import '../css/theme.scss';

#drag{
  flex: 0 0 auto;
  width: 5px;
  cursor: ew-resize;
  background-color: $workspace-editor-bg-color;
}

#drag:hover {
  background-color: $workspace-dragbar-bg-color;
}

.rowParent, .columnParent{ 
  height:100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
}

.columnParent{
  flex-direction: column;
}

#sidebar{
  height:100%;
  background-color: $workspace-sidebar-bg-color;
  flex: 0 0 auto;
}


#editor{
  background-color: $workspace-editor-bg-color ;
  overflow: hidden;
  flex: 1; 
}


#header{
  background-color: $workspace-header-bg-color;
  flex: 0 0 auto; 
}

#footer{
  background-color: $workspace-footer-bg-color;
  flex: 0 0 auto; 
}
</style>