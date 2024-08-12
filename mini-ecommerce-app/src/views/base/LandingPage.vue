<script setup lang="ts"></script>

<template>
  <div class="main">
    <p>Welcome to this Mini-Ecommerce App</p>
    <div>
      <p>
        Have an account?
        <router-link :to="{ name: 'login' }">Login</router-link>
      </p>
      <p>
        Don't have an account?
        <router-link :to="{ name: 'signup' }">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Roboto Serif", serif;
}

div {
  display: flex;
  gap: 1rem;
}

.main > p {
  font-size: 2rem;
}

a {
  color: #2e05e6;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

/* small screens */
@media (max-width: 600px) {
  .main > p {
    font-size: 1.3rem;
  }

  div {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
