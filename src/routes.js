import { createRouter, createWebHashHistory } from 'vue-router';
import Login from './views/login.vue';
import Dashboard from './views/dashboard.vue';

const routes = [
  // { path: '/', redirect: { name: 'dashboard' }, name: 'base' },
  { path: '/', component: Dashboard, name: 'dashboard' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/history', component: '', name: 'history' },
  { path: '/', component: '', name: 'watchlist' },
  { path: '/', component: '', name: 'movies' },
  { path: '/', component: '', name: 'topActors' },
  { path: '/', component: '', name: 'topDirectors' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Just a temporary way to ensure users are authenticated
const isAuthenticated = false;
// eslint-disable-next-line consistent-return
router.beforeEach((to, _from, next) => {
  if (isAuthenticated === false && to.name !== 'login') {
    next({ name: 'login' });
  }
  next();
});

export default router;
