<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push({ name: "login" });
};
</script>

<template>
  <header>
    <nav>
      <router-link to="/" class="logo">Mini <span>Ecommerce</span></router-link>
      <ul>
        <li>
          <router-link to="/products">Products</router-link>
        </li>
        <li>
          <router-link to="/add-product">Add Product</router-link>
        </li>
      </ul>
      <button @click="logout">Logout</button>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: #333;
  color: #fff;
  padding: 30px 50px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.logo span {
  display: inline-block;
  color: #f39c12;
}

ul {
  display: flex;
  list-style: none;
}

li {
  margin-left: 1rem;
}

ul a {
  color: #fff;
  text-decoration: none;
}

ul a:hover {
  text-decoration: underline;
}

button {
  padding: 10px 20px;
  background-color: #f39c12;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
