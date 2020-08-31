import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import {AxiosWrapper} from '@/assets/api/AxiosWrapper';
import VueMeta from 'vue-meta';

import {createRouter} from '@/router';
import {createStore} from '@/store';
import {sync} from 'vuex-router-sync'


Vue.config.productionTip = false;

Vue.prototype.$http = AxiosWrapper.axios;

Vue.use(VueMeta);

require('moment/locale/ru');
Vue.use(require('vue-moment'), {
    moment: require('moment')
});


// const token = localStorage.getItem('token');
let token = 1;
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export async function createApp({beforeApp = () => {}, afterApp = () => {}} = {}) {
    const router = createRouter();
    const store = createStore();

    sync(store, router);

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

    return result;
}
