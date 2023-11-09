<template>
  <div class="login-wrapper">
    <h1>Login Page</h1>
    <button @click="loginFun">Login</button>
  </div>
</template>

<script setup>
const loginFun = () => {
  localStorage.setItem("token", "token");
  //   navigateTo("/home");
  window.location.replace("/home");
};
</script>

<style lang="scss">
.login-wrapper {
  padding: 0 10%;
  button {
    font-size: 14px;
    margin-block: 50px;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer !important;
    letter-spacing: 1px;
  }
}
</style>