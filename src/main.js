import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';

import { library } from '@fortawesome/fontawesome-svg-core';
import * as fab from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

 
library.add(fab.faSearch);
library.add(fab.faExclamationTriangle);


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueResource);

new Vue({
  render: h => h(App),
}).$mount('#app')
