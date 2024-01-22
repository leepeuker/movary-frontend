<script setup>
// eslint-disable-next-line no-unused-vars
const theme = document
  .querySelector('meta[name="theme-color"]')
  .getAttribute('name');
</script>
<template>
  <main role="main" class="form-signin w-100 m-auto text-center">
    <form enctype="multipart/form-data">
      <h1
        id="header"
        class="text-{{ theme == 'dark' ? 'light' : 'dark' }}"
        style="margin-bottom: 1rem"
      >
        Movary
      </h1>
      <div class="form-floating">
        <input
          id="floatingInput"
          type="email"
          name="email"
          class="form-control text-{{ theme == 'dark' ? 'light' : 'dark' }}"
          placeholder="name@example.com"
          required
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          id="floatingPassword"
          type="password"
          name="password"
          class="form-control text-{{ theme == 'dark' ? 'light' : 'dark' }}"
          placeholder="Password"
          required
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="checkbox mb-3" style="margin-bottom: 0.7rem !important">
        <label class="text-{{ theme == 'dark' ? 'light' : 'dark' }}">
          <input type="checkbox" name="rememberMe" value="true" /> Remember me
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary mb-3" type="submit">
        Sign in
      </button>
    </form>
  </main>
</template>
<style src="./../assets/stylesheets/login.css"></style>
