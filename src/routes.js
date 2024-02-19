import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/login.vue';
import Dashboard from './views/dashboard.vue';
import NotFound from './views/404.vue';
import { checkAuthenticationStatus, globalStore } from './utilities';

const routes = [
    { path: '/login', component: Login, name: 'login', alias: '/' },
    { 
        path: '/users/:username([a-zA-Z0-9]+)',
        children: [
            { path: 'dashboard', component: Dashboard, name: 'dashboard' },
            { path: 'history', component: '', name: 'history' },
            { path: 'watchlist', component: '', name: 'watchlist' },
            {
                path: 'movies', component: '', name: 'movies',
                children: [
                    { path: ':id(\\d+)', component: '', name: 'movie' },
                ]
            },
            { path: 'actors', component: '', name: 'topActors' },
            { path: 'directors', component: '', name: 'topDirectors' },
            { path: 'persons/:id(\\d+)', component: '', name: 'persons' },
        ]
    },
    { path: '/:pathMatch(.*)', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    const guard = await checkAuthenticationStatus().then((authentication) => {
        if (authentication.authenticated === false && to.name !== 'login') {
            if(globalStore.currentUsername !== null) {
                globalStore.resetUsername();
            }
            return { name: 'login' };
        } if(authentication.authenticated === true) {
            globalStore.currentUsername = authentication.username;
            globalStore.currentUserId = authentication.userId;
            globalStore.currentUserIsAdmin = authentication.isAdmin;
            if(to.name === 'login') {
                return { name: 'dashboard', params: {username: authentication.username} };
            }
        }
        return true;
    });
    return guard;
});

export default router;
