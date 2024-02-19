import { defineStore } from 'pinia';
import { inject } from 'vue';

function addAlert(parentDivId, message, color, withCloseButton = true, marginBottom = 1) {
    let closeButton = '';
    if (withCloseButton === true) {
        closeButton = '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
    }

    document.getElementById(parentDivId).innerHTML = `<div class="alert alert-${color} alert-dismissible" role="alert" style="margin-bottom: ${marginBottom}rem">${message}${closeButton}</div>`;
}

// eslint-disable-next-line import/prefer-default-export
const globalStore = defineStore('global', {
    state: () => ({
        applicationName: 'Movary',
        applicationTimezone: null,
        currentUsername: null,
        currentUserIsAdmin: false,
        currentUserCountry: null,
        currentUserId: null,
        routeUsername: null,
        dateFormat: null,
        theme: () => {
            if (localStorage.getItem('theme') === null) {
                localStorage.setItem('theme', 'light');
            } else if (localStorage.getItem('theme') !== 'dark' && localStorage.getItem('theme') !== 'light') {
                localStorage.setItem('theme', 'light');
            }
            return localStorage.getItem('theme');
        }
    }),
    actions: {
        toggleTheme() {
            if (this.theme === 'light') {
                this.theme = 'dark';
                localStorage.setItem('theme', 'dark');
            } else {
                this.theme = 'light';
                localStorage.setItem('theme', 'light');
            }
        },
        resetUsername() {
            this.currentUsername = null;
        }
    },
    persist: {
        storage: sessionStorage
    }
});

async function checkAuthenticationStatus() {
    if (globalStore.username !== null) {
        return {
            authenticated: 'true',
            username: globalStore.username,
            userId: globalStore.currentUserId
        };
    }
    const httpClient = inject('httpClient');
    try {
        const request = await httpClient.get('/api/authentication/authenticated');
        const data = await request.data;
        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
    return {
        authenticated: 'false'
    };
}

export { addAlert, globalStore, checkAuthenticationStatus };
