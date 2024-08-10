import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

interface IUser {
  username: string;
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<any>(null);
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);
  const statusCode = ref<number | null>(null);

  const isLoggedIn = computed(() => !!token.value);

  const backendUrl = "https://mini-ecommerce-backend-2ce911e6e6e7.herokuapp.com";
  // const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const signup = async (payload: IUser) => {
    loading.value = true;
    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/signup`, payload);
      token.value = response.data.token;
      user.value = response.data.user;

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

  const login = async (payload: ILogin) => {
    loading.value = true;
    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/login`, payload);

      const { data } = response.data;

      if (data) {
        token.value = data.token;
        user.value = data.user;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
      }
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

  const loadTokenFromStorage = () => {
    const tokenFromStorage = localStorage.getItem("token");
    const userFromStorage = localStorage.getItem("user");

    if (tokenFromStorage && userFromStorage) {
      token.value = tokenFromStorage;
      user.value = JSON.parse(userFromStorage);
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return {
    token,
    user,
    loading,
    errorMessage,
    isLoggedIn,
    statusCode,
    signup,
    login,
    logout,
    loadTokenFromStorage,
  };
});
