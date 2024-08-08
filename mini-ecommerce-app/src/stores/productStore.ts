import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

interface IProduct {
  name: string;
  price: string;
  description: string;
  imageURL: string;
}

export const useProductStore = defineStore("product", () => {
  const products = ref<IProduct[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const statusCode = ref<number | null>(null);

  const backendUrl = "https://mini-ecommerce-backend-2ce911e6e6e7.herokuapp.com";
  // const backendUrl = process.env.VITE_BACKEND_URL;

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${backendUrl}/api/v1/products/all-products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      products.value = response.data.data;
      // products.value.push(...response.data.data);
    } catch (error: any) {
      console.error(error);
      error.value = error.response.data.message;
    } finally {
      loading.value = false;
    }
  };

  const addProduct = async (payload: IProduct) => {
    loading.value = true;

    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("price", payload.price);
    formData.append("description", payload.description);
    formData.append("image", payload.imageURL);
    try {
      const response = await axios.post(`${backendUrl}/api/v1/products/add-product`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      statusCode.value = response.status;
    } catch (error: any) {
      console.error(error);
      error.value = error.response.data.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    loading,
    error,
    statusCode,
    fetchProducts,
    addProduct,
  };
});
