<script setup>
import { ref } from "vue";

const q = ref("");
const emit = defineEmits(["search"]);

const search = () => {
  emit("search", q.value);
};
</script>

<template>
  <div class="search-bar">
    <input type="text" v-model="q" placeholder="Search products..." />
    <button @click="search">Search</button>
  </div>
</template>

<style scoped>
.search-bar {
  font-family: "Roboto Serif", serif;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  width: 300px;
  color: #333;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #2b2828;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

/* small screens */
@media (max-width: 600px) {
  .search-bar {
    width: 90%;
    margin: 20px auto;
  }

  input {
    width: 100%;
  }

  button {
    padding: 10px;
  }
}
</style>
