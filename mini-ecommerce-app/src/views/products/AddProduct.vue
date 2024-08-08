<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "vue-router";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/form/BaseButton.vue";
import ImageInput from "@/components/form/ImageInput.vue";

const productStore = useProductStore();
const router = useRouter();

const data = ref({
  imageURL: null,
  name: "",
  price: "",
  description: "",
});

const addProduct = async () => {
  await productStore.addProduct(data.value);

  if (productStore.statusCode === 201) {
    router.push({ name: "products" });
  } else {
    router.push({ name: "add-product" });
  }
};

const processing = computed(() => {
  return authStore.loading ? "Processing..." : "Add Product";
});
</script>

<template>
  <div class="main">
    <BaseForm @submit="addProduct">
      <fieldset>
        <legend>Add Product</legend>
        <div class="input_group">
          <ImageInput id="image" label="Product Image" name="imageURL" v-model="data.imageURL" />
        </div>

        <div class="input_group">
          <BaseInput
            id="name"
            label="Product Name"
            type="text"
            placeholder="Enter name of Product"
            v-model="data.name"
          />
        </div>

        <div class="input_group">
          <BaseInput id="price" label="Price" type="text" placeholder="Enter price of product" v-model="data.price" />
        </div>

        <div class="input_group">
          <BaseInput
            id="description"
            label="Product Description"
            type="text"
            placeholder="Enter a description of the product"
            v-model="data.description"
          />
        </div>
        <BaseButton type="submit" :label="processing" :disabled="productStore.loading"></BaseButton>
      </fieldset>
    </BaseForm>
  </div>
</template>

<style scoped></style>
