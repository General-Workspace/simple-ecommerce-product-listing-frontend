import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

interface IProduct {
  name: string;
  price: string;
  description: string;
  imageURL: File;
}

export const useProductStore = defineStore("product", () => {
  const products = ref<IProduct[]>([]);
  const product = ref<IProduct | null>(null);
  const searchResults = ref<IProduct[]>([]);
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);
  const statusCode = ref<number | null>(null);

  const backendUrl = "https://mini-ecommerce-backend-2ce911e6e6e7.herokuapp.com";
  // const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${backendUrl}/api/v1/products/all-products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      products.value = response.data.data;
    } catch (error: any) {
      errorMessage.value = error.response.data.message;
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
    formData.append("imageURL", payload.imageURL);

    try {
      const response = await axios.post(`${backendUrl}/api/v1/products/add-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      statusCode.value = response.status;
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 422) {
        errorMessage.value = "Validation error. Please check your inputs.";
      } else {
        errorMessage.value = error.response.data.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const fetchProduct = async (id: string) => {
    loading.value = true;

    try {
      const response = await axios.get(`${backendUrl}/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      statusCode.value = response.status;

      product.value = response.data.data;
    } catch (error: any) {
      if (error.response.status === 422) {
        errorMessage.value = "Validation error. Please check your inputs.";
      } else {
        errorMessage.value = error.response.data.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const deleteProduct = async (id: string) => {
    loading.value = true;

    try {
      const response = await axios.delete(`${backendUrl}/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      statusCode.value = response.status;
    } catch (error: any) {
      if (error.response.status === 422) {
        errorMessage.value = "Validation error. Please check your inputs.";
      } else {
        errorMessage.value = error.response.data.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const updateProduct = async (id: string, payload: IProduct) => {
    loading.value = true;

    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("price", payload.price);
    formData.append("description", payload.description);
    formData.append("imageURL", payload.imageURL);

    try {
      const response = await axios.put(`${backendUrl}/api/v1/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      statusCode.value = response.status;

      product.value = response.data.data;
    } catch (error: any) {
      if (error.response.status === 422) {
        errorMessage.value = "Validation error. Please check your inputs.";
      } else {
        errorMessage.value = error.response.data.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const productSearch = async (search: string) => {
    loading.value = true;
    //?q=${search}

    try {
      const response = await axios.get(`${backendUrl}/api/v1/products/search`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          q: search,
        },
        // paramsSerializer: (params) => {
        //   return Object.entries(params)
        //     .map(([key, value]) => `${key}=${value}`)
        //     .join("&");
        // },
      });

      searchResults.value = response.data.data;
    } catch (error: any) {
      if (error.response.status === 422) {
        errorMessage.value = "Validation error. Please check your inputs.";
      } else {
        errorMessage.value = error.response.data.message;
      }
    }
  };

  return {
    products,
    product,
    searchResults,
    loading,
    errorMessage,
    statusCode,
    fetchProducts,
    addProduct,
    fetchProduct,
    deleteProduct,
    updateProduct,
    productSearch,
  };
});
