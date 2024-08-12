<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "vue-router";

import TheHeader from "@/components/layout/TheHeader.vue";
import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import TextArea from "@/components/form/TextArea.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import BaseButton from "@/components/form/BaseButton.vue";

const productStore = useProductStore();
const router = useRouter();

const product = computed(() => productStore.product);

const formData = ref({
  name: product.value.name,
  price: product.value.price.toString(),
  description: product.value.description,
  imageURL: product.value.imageURL,
});

const editProduct = async () => {
  await productStore.updateProduct(router.currentRoute.value.params.id, formData.value);

  if (productStore.statusCode === 200) {
    router.push({ name: "product", params: { id: router.currentRoute.value.params.id } });
  } else {
    router.push({ name: "edit-product", params: { id: router.currentRoute.value.params.id } });
  }
};

const processing = computed(() => {
  return productStore.loading ? "Processing..." : "Edit Product";
});
</script>

<template>
  <TheHeader></TheHeader>
  <main>
    <BaseForm @submit="editProduct">
      <fieldset>
        <legend>Edit Product</legend>

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
            name="name"
            type="text"
            placeholder="Enter name of Product"
            v-model="formData.name"
          />
        </div>

        <div class="input_group">
          <BaseInput
            id="price"
            label="Product Price"
            name="price"
            type="number"
            placeholder="Enter price of Product"
            v-model="formData.price"
          />
        </div>

        <div class="input_group">
          <TextArea name="description" id="description" label="Product Description" v-model="formData.description" />
        </div>

        <div class="input_group">
          <BaseButton type="submit" :label="processing" :disabled="productStore.loading"></BaseButton>
        </div>
      </fieldset>
    </BaseForm>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input_group {
  margin-bottom: 1rem;
}

input {
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

fieldset {
  width: 62%;
  padding: 0 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

legend {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

/* small screens */
@media (max-width: 600px) {
  fieldset {
    width: 90%;
  }

  .input_group {
    margin-bottom: 0.5rem;
  }
}
</style>
