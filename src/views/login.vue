<script setup>
import { inject } from 'vue';
import { addAlert } from '../utilities';

const httpClient = inject('httpClient');
async function submitCredentials() {
    const urlParams = new URLSearchParams(window.location.search);
    await httpClient.post('/api/authentication/create-token', {
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value,
        'rememberMe': document.getElementById('rememberMe').checked,
        'totpCode': document.getElementById('totpCode').value ?? '',
        'redirect': urlParams.get('redirect') ?? ''
    }).then((response) => {
        window.location.replace(response.request.responseURL);
    }).catch((error) => {
        if(error.response){
            if(error.response.data.error === 'NoVerificationCode') {
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
</script>
<template>
    <main role="main" class="form-signin w-100 m-auto text-center">
        <form id="LoginForm" enctype="multipart/form-data">
            <h1 id="header" class="text-{{ theme == 'dark' ? 'light' : 'dark' }}" style="margin-bottom: 1rem">Movary</h1>
            <div class="form-floating">
              <input id="email" type="email" class="form-control text-{{ theme == 'dark' ? 'light' : 'dark' }}" placeholder="name@example.com" required @keyup.enter="submitCredentials"/>
              <label for="email">Email address</label>
            </div>
            <div class="form-floating">
              <input id="password" type="password" class="form-control text-{{ theme == 'dark' ? 'light' : 'dark' }}" placeholder="Password" required @keyup.enter="submitCredentials"/>
              <label for="password">Password</label>
            </div>
            <div class="checkbox mb-3" style="margin-bottom: 0.7rem !important">
                <label class="text-{{ theme == 'dark' ? 'light' : 'dark' }}"> <input id="rememberMe" type="checkbox" value="true" /> Remember me </label>
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
                    class="form-control form-control-lg text-{{ theme == 'dark' ? 'light' : 'dark' }}"
                    placeholder="Verification code"
                    maxlength="6"
                    autocomplete="off"
                    style="margin-bottom: .7rem;margin-top: .7rem"
                    required>
                <button class="w-100 btn btn-lg btn-primary mb-3" style="margin-bottom: .7rem!important;" @click="submitCredentials">Continue</button>
            </form>
            <div id="totpErrors"></div>
            <a href="/">Back</a>
        </div>
    </main>
</template>
<style src="./../assets/stylesheets/login.css"></style>
