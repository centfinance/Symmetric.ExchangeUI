import { createApp } from 'vue';
import { createWebHashHistory, createRouter } from 'vue-router';

import store from './store';
import App from './App.vue';
import Swap from './pages/Swap.vue';
import Deposit from './pages/Deposit.vue';
import Bridge from './pages/Bridge.vue';

const routerHistory = createWebHashHistory();
const router = createRouter({
    history: routerHistory,
    routes: [
        { path: '/', redirect: '/swap' },
        { path: '/swap/:assetIn?/:assetOut?', name: 'swap', component: Swap },
        { path: '/deposit', name: 'deposit', component: Deposit },
        { path: '/bridge', name: 'bridge', component: Bridge },
    ],
});

const app = createApp(App);

app.directive('autofocus', {
    mounted(el) {
        el.focus();
    },
});

app.use(router);
app.use(store);

app.mount('#app');

export { routerHistory, router, store };
