import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({

});


export const store = new Vuex.Store({
    plugins: [vuexLocal.plugin]
});