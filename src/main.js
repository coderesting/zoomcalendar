import Vue from 'vue';
import Calendar from './components/Calendar.vue';
import VueCookies from 'vue-cookies';
import Notifications from 'vue-notification';

Vue.use(Notifications);

Vue.use(VueCookies);
Vue.$cookies.config('1y');

Vue.config.productionTip = false;

new Vue({
	render: h => h(Calendar)
}).$mount('#calendar');
