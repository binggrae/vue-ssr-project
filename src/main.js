import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {store} from './store';
import VueCookies from 'vue-cookies';

import {AxiosWrapper} from "@/assets/api/AxiosWrapper";
import VueMeta from "vue-meta";

import Bus from "@/utils/common/bus";

import {createRouter} from "@/router";


Vue.config.productionTip = false;

Vue.prototype.$bus = Bus;
Vue.prototype.$http = AxiosWrapper.axios;

Vue.use(VueMeta);

require('moment/locale/ru');
Vue.use(require('vue-moment'), {
    moment: require('moment')
});

Vue.use(VueCookies);



// const token = localStorage.getItem('token');
let token = 1;
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export async function createApp({beforeApp = () => {}, afterApp = () => {}} = {}) {
    const router = createRouter();

    await beforeApp({router});

    const app = new Vue({
        router,
        vuetify,
        store,
        render: h => h(App)
    });

    const result = {
        app,
        router,
    };

    await afterApp(result);

    return result
}
