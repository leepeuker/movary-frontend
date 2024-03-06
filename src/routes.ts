import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/login.vue';
import Dashboard from '@/views/dashboard.vue';
import NotFound from '@/views/404.vue';
import { checkAuthenticationStatus, userStore } from '@/utilities';
import { instanceOfUserInfo, userInfo } from '@/types';

const routes = [
    {
        path: '/login',
        component: Login,
        name: 'login',
        alias: '/'
    },
    {
        path: '/users/:username([a-zA-Z0-9]+)',
        children: [
            { path: 'dashboard', component: Dashboard, name: 'dashboard' },
            { path: 'history', component: '', name: 'history' },
            { path: 'watchlist', component: '', name: 'watchlist' },
            {
                path: 'movies',
                component: '',
                name: 'movies',
                children: [
                    { path: ':id(\\d+)', component: '', name: 'movie' }
                ]
            },
            { path: 'actors', component: '', name: 'topActors' },
            { path: 'directors', component: '', name: 'topDirectors' },
            { path: 'persons/:id(\\d+)', component: '', name: 'persons' }
        ],
    },
    { path: '/:pathMatch(.*)', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to) => {
    const userData = userStore();
    let returnRoute: boolean | object = true;
    await checkAuthenticationStatus().then((authentication: false | userInfo) => {
        if (authentication === false && to.name !== 'login') {
            if (userData.getUser !== null) {
                userData.$reset();
            }
            returnRoute = { name: 'login' };
        } else if (instanceOfUserInfo(authentication) === true && authentication !== false) {
            if (to.name === 'login') {
                returnRoute = { name: 'dashboard', params: { username: authentication.username } };
            }
        }
    });
    return returnRoute;
});

export default router;
