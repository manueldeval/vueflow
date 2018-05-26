import Vue from 'vue';
import VDragged from 'v-dragged'
import App from './App.vue';
import './css/main.scss'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

Vue.component('icon', Icon)

Vue.use(VDragged) 
new Vue({
  el: '#app',
  render: h => h(App)
});

