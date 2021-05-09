import Vue from 'vue';
import Vuex from 'vuex';
import Calendar from './components/Calendar.vue';
import Notifications from 'vue-notification';
import initializeStore from './store/store';

Vue.use(Vuex);

Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(Calendar),
	store: initializeStore(),
}).$mount('#calendar');
