<template>
  <div>
    <header v-if="token">
      <Navbar />
      <div class="right-content">
        <button @click="logoutFun">Log Out</button>
      </div>
    </header>
    <div>
      <slot />
    </div>
    <footer v-if="token">Footer</footer>
  </div>
</template>

<script setup>
const token = process.client ? localStorage.getItem("token") : null;
const logoutFun = () => {
  if (process.client) {
    localStorage.removeItem("token");
    // navigateTo("/login");
    window.location.replace("/login");
  }
};
</script>