import '@app/static';
import 'babel-polyfill';
import Vue from 'vue';
import router from '@app/router';
import store from '@app/store';
import api from '@app/api';
import components from '@app/components';
import { setPluginLang } from '@app/plugins';
import { sync } from 'vuex-router-sync';
import App from '@app/App.vue';

let lang = 'zh';
setPluginLang(lang);


Vue.use(Vue => {
    Vue.prototype.$api = api;
});
Vue.use(components);

sync(store, router);

const app = new Vue({
    router,
    render(h) {
        return h(App);
    },
});

window.addEventListener('DOMContentLoaded', () => app.$mount('#app'), false);

export default app;
