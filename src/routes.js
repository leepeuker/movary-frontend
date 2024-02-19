import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/login.vue';
import Dashboard from './views/dashboard.vue';
import { checkAuthenticationStatus, globalStore } from './utilities';

const routes = [
    // { path: '/', redirect: { name: 'login' }, name: 'base' },
    { path: '/login', component: Login, name: 'login', alias: '/' },
    { 
        path: '/users/:username([a-zA-Z0-9]+)',
        children: [
            { path: 'dashboard', component: Dashboard, name: 'dashboard' },
            { path: 'history', component: '', name: 'history' },
            { path: 'watchlist', component: '', name: 'watchlist' },
            { path: 'movies', component: '', name: 'movies' },
            { path: 'actors', component: '', name: 'topActors' },
            { path: 'directors', component: '', name: 'topDirectors' },
            { path: 'persons', component: '', name: 'persons' },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    const guard = await checkAuthenticationStatus().then((authentication) => {
        console.log(authentication);
        if (authentication.authenticated === 'false' && to.name !== 'login') {
            if(globalStore.currentUsername !== null) {
                globalStore.resetUsername();
            }
            return { name: 'login' };
        } if(authentication.authenticated) {
            globalStore.currentUsername = authentication.username;
            globalStore.currentUserId = authentication.userId;
            if(to.name === 'login') {
                return { name: 'dashboard', params: {username: authentication.username} };
            }
        }
        return true;
    });
    console.log(guard);
    return guard;
});

export default router;
