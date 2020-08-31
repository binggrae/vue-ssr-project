import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
    const router = new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                name: 'IndexPage',
                component: () => import('@/pages/main/Index.vue'),
            }
        ]
    });

    router.beforeEach((to, from, next) => {
        next();
        /* TODO ADD AUTH RULES
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (store.getters['user/isLoggedIn']) {
                next();
                return
            }
            next('/login');
        } else if (to.matched.some(record => record.meta.requiresGuest)) {
            if (!store.getters['user/isLoggedIn']) {
                next();
                return
            }
            next('/');
        } else {
            next();
        }
        */

    });

    return router;
}
