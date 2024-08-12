<script setup>
import { onMounted, computed, ref, watch } from "vue";
import { useProductStore } from "@/stores/productStore";

import TheHeader from "@/components/layout/TheHeader.vue";
import SearchBar from "@/components/layout/SearchBar.vue";

const productStore = useProductStore();
const searchQuery = ref("");
const filteredProducts = ref([]);

watch(
  () => productStore.products,
  (newProducts) => {
    if (!searchQuery.value) {
      filteredProducts.value = newProducts;
    }
  }
);

const products = computed(() => productStore.products);

const handleSearch = async (query) => {
  searchQuery.value = query;
  if (query === "") {
    filteredProducts.value = products.value;
  } else {
    filteredProducts.value = products.value.filter((product) => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    });
  }
};

onMounted(() => {
  productStore.fetchProducts().then(() => {
    filteredProducts.value = products.value;
  });
});
</script>

<template>
  <TheHeader />
  <div class="search-bar">
    <SearchBar @search="handleSearch" />
  </div>
  <div class="main">
    <div v-if="filteredProducts.length" class="products">
      <div v-for="product in filteredProducts" :key="product.id" class="product">
        <img :src="product.imageURL" :alt="product.name" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>Price: ${{ product.price }}</p>
        </div>

        <p class="desc">
          {{ product.description.length > 100 ? product.description.substring(0, 100) + "..." : product.description }}
        </p>
        <router-link :to="{ name: 'product', params: { id: product._id } }">Read More</router-link>
      </div>
    </div>

    <div v-else>
      <p>No products found</p>
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

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.product img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

a {
  text-decoration: none;
  color: #e2d8d8;
  background-color: rgb(3, 3, 88);
  padding: 0.5rem 1rem;
  border-radius: 5px;

  &:hover {
    background-color: rgb(3, 3, 188);
    transition: all 0.6s;
  }
}

.desc {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #f8e9e9;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

/* small screens */
@media (max-width: 600px) {
  .products {
    grid-template-columns: 1fr;
  }

  .product img {
    height: 150px;
  }

  .product {
    padding: 10px;
  }

  .desc {
    font-size: 0.8rem;
  }

  a {
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
  }
}
</style>
