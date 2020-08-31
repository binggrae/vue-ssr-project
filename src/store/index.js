import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

export function createStore () {
    const plugins = [];

    if (process.browser) {
        const vuexLocal = new VuexPersistence({
            // Модули созраняемые в хранилище браузера
            modules: ['common'],
        });
        plugins.push(vuexLocal);
    }

    return new Vuex.Store({
        state: () => ({

        }),

        actions: {

        },

        mutations: {

        },
        plugins: plugins,
        modules: {
            common: import('@/store/modules/common'),
        }
    });
}
