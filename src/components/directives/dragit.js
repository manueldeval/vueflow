const POINTER_START_EVENTS = ['mousedown', 'touchstart']
const POINTER_MOVE_EVENTS = ['mousemove', 'touchmove']
const POINTER_END_EVENTS = ['mouseup', 'touchend']

function addEventListeners(el, events, handler) {
  events.forEach(event => {
    el.addEventListener(event, handler)
  });
}

function removeEventListeners(el, events, handler) {
  events.forEach(event => {
    el.removeEventListener(event, handler)
  });
}

function getPointer(evt) {
  let pointer
  if (evt.touches && evt.touches[0]) {
    pointer = evt.touches[0]
  } else if (evt.changedTouches && evt.changedTouches[0]) {
    pointer = evt.changedTouches[0]
  } else {
    pointer = evt
  }
  return pointer
}

export default {
  inserted: function (el,binding, vnode) {
    /*
    START
    */
    function draggStart(evt){
      var pointer = getPointer(evt)
      el.lastCoords = el.firstCoords = { x: pointer.clientX, y: pointer.clientY }
      binding.value({ el, first: true, clientX: pointer.clientX, clientY: pointer.clientY })
      evt.stopPropagation()
    }
    /*
    MOVE
    */
    function dragg(evt) {
      var pointer = getPointer(evt)
      if (el.lastCoords) {
        var deltaX = pointer.clientX - el.lastCoords.x
        var deltaY = pointer.clientY - el.lastCoords.y
        var offsetX = pointer.clientX - el.firstCoords.x
        var offsetY = pointer.clientY - el.firstCoords.y
        var clientX = pointer.clientX
        var clientY = pointer.clientY

        binding.value({ el,deltaX,deltaY,offsetX,offsetY,clientX,clientY})
        el.lastCoords = {x: pointer.clientX,y: pointer.clientY}
      }
    }
    /*
    STOP
    */
    function draggStop(evt){
      el.lastCoords = null
      var pointer = getPointer(evt)
      binding.value({ el, last: true, clientX: pointer.clientX, clientY: pointer.clientY })
      evt.stopPropagation()
    }
    addEventListeners(el,POINTER_START_EVENTS,draggStart)
    addEventListeners(document.documentElement,POINTER_MOVE_EVENTS,dragg)
    addEventListeners(document.documentElement,POINTER_END_EVENTS,draggStop)
  },
  unbind: function(el){
    removeEventListeners(el,POINTER_START_EVENTS)
    removeEventListeners(document.documentElement,POINTER_MOVE_EVENTS)
    removeEventListeners(document.documentElement,POINTER_END_EVENTS)
  }
}
