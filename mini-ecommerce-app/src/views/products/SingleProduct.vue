<script setup>
import { computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

import TheHeader from "@/components/layout/TheHeader.vue";

const productStore = useProductStore();
const authStore = useAuthStore();
const router = useRouter();

const product = computed(() => productStore.product);

const createdBy = computed(() => {
  if (productStore.product) {
    return productStore.product.createdBy;
  }

  return null;
});

const deleteProduct = async () => {
  await productStore.deleteProduct(router.currentRoute.value.params.id);

  if (productStore.statusCode === 200) {
    router.push({ name: "products" });
  } else {
    router.push({ name: "product", params: { id: router.currentRoute.value.params.id } });
  }
};

productStore.fetchProduct(router.currentRoute.value.params.id);

// const createdBy = computed(() => {
//   if (product.value) {
//     return product.value.createdBy;
//   }

//   return null;
// });

// onMounted(() => {
//   authStore.loadTokenFromStorage();

//   if (!authStore.isLoggedIn) {
//     router.push({ name: "login" });
//   }

//   productStore.fetchProduct(router.currentRoute.value.params.id);
// });
</script>

<template>
  <TheHeader />
  <div class="main">
    <div class="product">
      <img :src="product.imageURL" alt="product.name" />
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p>Price: ${{ product.price }}</p>
      </div>

      <p className="border-t-2 pt-2">{{ product.description }}</p>
    </div>

    <div class="btns" v-if="createdBy === authStore.user.id">
      <router-link :to="{ name: 'edit-product', params: { id: product._id } }">Edit</router-link>
      <button @click="deleteProduct">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: "Roboto Serif", serif;
}

.product {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.product-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.product img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

a {
  text-decoration: none;
  color: #fff;
  background-color: rgb(15, 15, 158);
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4e0303;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

.btns {
  display: flex;
  gap: 1rem;
}
</style>
