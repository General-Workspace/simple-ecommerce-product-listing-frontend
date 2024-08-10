<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/form/BaseButton.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";

const authStore = useAuthStore();
const router = useRouter();

const data = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  await authStore.login(data.value);

  if (authStore.isLoggedIn) {
    router.push({ name: "products" });
  } else {
    router.push({ name: "login" });
  }
};

const dataInput = computed(() => {
  return data.value.email === "" || data.value.password === "";
});

const processing = computed(() => {
  return authStore.loading ? "Processing..." : "Login";
});
</script>

<template>
  <div class="main">
    <BaseForm @submit="handleLogin">
      <ErrorMessage v-if="authStore.errorMessage !== null" :message="authStore.errorMessage" />
      <fieldset>
        <legend>Login</legend>
        <div class="input_group">
          <BaseInput
            id="email"
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            v-model="data.email"
          />
        </div>

        <div class="input_group">
          <BaseInput
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            v-model="data.password"
          />
        </div>
        <BaseButton type="submit" :label="processing" :disabled="authStore.loading || dataInput"></BaseButton>
        <span>Don't have an account? <router-link :to="{ name: 'signup' }"> Sign Up</router-link></span>
      </fieldset>
    </BaseForm>
  </div>
</template>

<style scoped>
.main {
  font-family: "Roboto Serif", serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 0 auto;
}

fieldset {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  width: 37rem;
}

legend {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 0 10px;
}

.input_group {
  margin-bottom: 1rem;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}

span {
  font-size: 0.9rem;
  margin-left: 0.5rem;
}
</style>
