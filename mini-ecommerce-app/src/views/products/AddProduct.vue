<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "vue-router";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/form/BaseButton.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import TextArea from "@/components/form/TextArea.vue";
import TheHeader from "@/components/layout/TheHeader.vue";

const productStore = useProductStore();
const router = useRouter();

const formData = ref({
  name: "",
  price: "0",
  description: "",
  imageURL: null,
});

const addProduct = async () => {
  await productStore.addProduct(formData.value);

  if (productStore.statusCode === 201) {
    router.push({ name: "products" });
  } else {
    router.push({ name: "add-product" });
  }
};

const processing = computed(() => {
  return productStore.loading ? "Processing..." : "Add Product";
});
</script>

<template>
  <TheHeader />
  <div class="main">
    <BaseForm @submit="addProduct">
      <fieldset>
        <legend>Add Product</legend>

        <div class="input_group">
          <ImageInput
            v-model="formData.imageURL"
            label="Upload Product Image"
            id="imageURL"
            name="imageURL"
            :multiple="false"
          />
        </div>

        <div class="input_group">
          <BaseInput
            id="name"
            label="Product Name"
            type="text"
            placeholder="Enter name of Product"
            v-model="formData.name"
          />
        </div>

        <div class="input_group">
          <BaseInput
            id="price"
            label="Price"
            type="number"
            placeholder="Enter price of product"
            v-model="formData.price"
          />
        </div>

        <div class="input_group">
          <TextArea id="description" label="Product Description" name="description" v-model="formData.description" />
        </div>
        <BaseButton type="submit" :label="processing" :disabled="productStore.loading"></BaseButton>
      </fieldset>
    </BaseForm>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto Serif", serif;
}

.input_group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  height: 3rem;
  background-color: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

fieldset {
  width: 62%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 1rem;
}

legend {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  padding: 0 1rem;
}
</style>
