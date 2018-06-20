import Vue from 'vue';
import './css/main.scss'
import 'vue-awesome/icons'

import store from './components/store/FlowStore'
import VDragged from 'v-dragged'
import App from './App.vue';
import Icon from 'vue-awesome/components/Icon'
import dragit from './components/directives/dragit'

Vue.component('icon', Icon)
Vue.directive('dragit',dragit)

Vue.use(VDragged) 
new Vue({
  el: '#app',
  render: h => h(App),
  store: store
});

