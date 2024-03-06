<script setup>
import { addAlert, userStore, themeStore } from '@/utilities';
import axiosInstance from '@/httpClient';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = userStore();
async function submitCredentials() {
    const urlParams = new URLSearchParams(window.location.search);
    await axiosInstance.post('/api/authentication/token', {
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value,
        'rememberMe': document.getElementById('rememberMe').checked,
        'totpCode': document.getElementById('totpCode').value ?? '',
        'redirect': urlParams.get('redirect') ?? ''
    }).then((response) => {
        user.setNewUser(response.data.user.name, response.data.user.id, response.data.user.isAdmin);
        router.push({name: 'dashboard', params: { username: response.data.user.name }});
        document.getElementById('app').style.minHeight = '100vh;';
    }).catch((error) => {
        if(error.response){
            if(error.response.data.error === 'MissingTotpCode') {
            document.getElementById('LoginForm').classList.add('d-none');
            document.getElementById('TotpWrapper').classList.remove('d-none');
            } else if(error.response.data.error === 'InvalidTotpCode') {
                addAlert('totpErrors', error.response.data.message, 'danger', false);
            } else {
                addAlert('loginErrors', error.response.data.message, 'danger', false);
            }
        }
    });
}
const store = themeStore();
document.getElementById('app').style.minHeight = '';
</script>
<template>
    <main role="main" class="form-signin w-100 m-auto text-center">
        <form id="LoginForm" enctype="multipart/form-data">
            <h1 id="header" :class="[store.isLightTheme ? 'text-dark' : 'text-light']" style="margin-bottom: 1rem">Movary</h1>
            <div class="form-floating">
              <input id="email" type="email" class="form-control" :class="[store.isLightTheme ? 'text-dark' : 'text-light']" placeholder="name@example.com" required @keyup.enter="submitCredentials"/>
              <label for="email">Email address</label>
            </div>
            <div class="form-floating">
              <input id="password" type="password" class="form-control" :class="[store.isLightTheme ? 'text-dark' : 'text-light']" placeholder="Password" required @keyup.enter="submitCredentials"/>
              <label for="password">Password</label>
            </div>
            <div class="checkbox mb-3" style="margin-bottom: 0.7rem !important">
                <label :class="[store.isLightTheme ? 'text-dark' : 'text-light']"> <input id="rememberMe" type="checkbox" value="true" /> Remember me </label>
            </div>
            <button class="w-100 btn btn-lg btn-primary mb-3" type="button" @click="submitCredentials">Sign in</button>
            <div id="loginErrors"></div>
        </form>
        <div id="TotpWrapper" class="d-none">
            <form>
                <p style="margin-bottom: 0">Enter the 6 digit verification code from your authenticator app.</p>
                <input
                    id="totpCode"
                    type="text"
                    class="form-control form-control-lg"
                    :class="[store.isLightTheme ? 'text-light' : 'text-dark']"
                    placeholder="Verification code"
                    maxlength="6"
                    autocomplete="off"
                    style="margin-bottom: .7rem;margin-top: .7rem"
                    required>
                <button class="w-100 btn btn-lg btn-primary mb-3"  type="button" style="margin-bottom: .7rem!important;" @click="submitCredentials">Continue</button>
            </form>
            <div id="totpErrors"></div>
            <a href="/">Back</a>
        </div>
    </main>
</template>
<style src="./../assets/stylesheets/login.css"></style>
