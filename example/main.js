import Vue from 'vue';
import { DataTablePlugin } from '../src';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(DataTablePlugin);

new Vue({
  render: h => h(App)
}).$mount('#app')
