import { defineStore } from 'pinia';
import { instanceOfUserInfo, userInfo } from '@/types';
import axiosInstance from '@/httpClient';

function addAlert(parentDivId: string, message: string, color: string, withCloseButton = true as boolean, marginBottom = 1 as number) {
    let closeButton = '';
    if (withCloseButton === true) {
        closeButton = '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
    }

    document.getElementById(parentDivId).innerHTML = `<div class="alert alert-${color} alert-dismissible" role="alert" style="margin-bottom: ${marginBottom}rem">${message}${closeButton}</div>`;
}

// eslint-disable-next-line import/prefer-default-export
const userStore = defineStore('global', {
    state: () => ({
        applicationName: 'Movary' as string | null,
        user: null as userInfo | null
    }),
    actions: {
        setNewUser(username: string, userId: number, isAdmin: boolean) {
            this.user = {
                username,
                userId,
                isAdmin
            };
        }
    },
    getters: {
        getUser() : userInfo | null {
            return this.user;
        }
    },
    persist: {
        storage: sessionStorage
    }
});

const themeStore = defineStore('theme', {
    state: () => ({
        theme: 'light' as string
    }),
    actions: {
        toggleTheme() : void {
            if (this.theme === 'light') {
                this.theme = 'dark';
            } else {
                this.theme = 'light';
            }
        }
    },
    getters: {
        isLightTheme() : boolean {
            return this.theme === 'light';
        }
    },
    persist: {
        storage: localStorage
    }
})

async function checkAuthenticationStatus()  {
    let authenticationStatus: boolean | userInfo = false;
    const store = userStore();
    const user = store.getUser;
    if (instanceOfUserInfo(user)) {
        return user;
    }
    try {
        await axiosInstance.get('/api/authentication/token').then((response) => {

            if(response.status === 200) {
                store.setNewUser(
                    response.data.user.name,
                    response.data.user.id,
                    response.data.user.isAdmin
                );
                authenticationStatus = store.getUser;
            }
            return authenticationStatus;
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        if(error.response.status === 401) {
            return authenticationStatus;
        }
    }
    return authenticationStatus;
}

export { addAlert, userStore, themeStore, checkAuthenticationStatus };
