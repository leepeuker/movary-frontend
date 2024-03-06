<script setup>
import { storeToRefs} from 'pinia';
import { userStore } from '@/utilities';
import axiosInstance from '@/httpClient';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = userStore();
const username = user.getUser.username;
const authenticated = username !== null;
const inSettings = window.location.pathname.startsWith('/settings');
async function logout() {
    axiosInstance.delete('/api/authentication/token').then(() => {
        user.$reset();
        router.push({name: 'login'});
    })
}
</script>
<template>
    <nav class="navbar navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/">Movary</a>
            <div class="btn-group">
                <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#logPlayModal" style="border-color: #9d9d9d">Add movie</button>
                <button type="button" class="btn btn-outline-light" data-bs-toggle="dropdown" aria-expanded="false" style="border-color: #9d9d9d">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><router-link class="dropdown-item" :to="{ name: 'dashboard', params: { username: username } }">Dashboard</router-link></li>
                    <li><router-link class="dropdown-item" :to="{ name: 'history', params: { username: username } }">History</router-link></li>
                    <li><router-link class="dropdown-item" :to="{ name: 'watchlist', params: { username: username } }">Watchlist</router-link></li>
                    <li><router-link class="dropdown-item" :to="{ name: 'movies', params: { username: username } }">All Movies</router-link></li>
                    <li><router-link class="dropdown-item" :to="{ name: 'topActors', params: { username: username } }">Top Actors</router-link></li>
                    <li><router-link class="dropdown-item" :to="{ name: 'topDirectors', params: { username: username } }">Top Directors</router-link></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li v-if="authenticated"><a class="dropdown-item" :class="{ active: inSettings }" href="/settings/account/general">Settings</a></li>
                    <li v-if="authenticated"><a class="dropdown-item" style="cursor: pointer;" @click="logout()">Logout</a></li>
                    <li v-else><a class="dropdown-item" href="/login" style="cursor: pointer;">Login</a></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <div class="form-check form-switch" style="margin-left: 1rem">
                        <input id="darkModeInput" class="form-check-input" type="checkbox" role="switch" />
                        <label class="form-check-label" for="darkModeInput">Dark Mode</label>
                    </div>
                </ul>
            </div>
        </div>
    </nav>
</template>
