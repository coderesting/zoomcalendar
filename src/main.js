import Vue from "vue";
import Calendar from "./components/Calendar.vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.$cookies.config("1y");
Vue.config.productionTip = false;

new Vue({
	render: (h) => h(Calendar),
}).$mount("#calendar");
