<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/form/BaseButton.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";

const authStore = useAuthStore();
const router = useRouter();

const data = ref({
  email: "",
  password: "",
  username: "",
});

const handleSignup = async () => {
  await authStore.signup(data.value);

  if (authStore.statusCode === 201) {
    router.push({ name: "login" });
  } else {
    router.push({ name: "signup" });
  }
};

const dataInput = computed(() => {
  return data.value.email === "" || data.value.password === "" || data.value.username === "";
});

const processing = computed(() => {
  return authStore.loading ? "Processing..." : "Sign Up";
});
</script>

<template>
  <div class="main">
    <BaseForm @submit="handleSignup">
      <ErrorMessage v-if="authStore.errorMessage !== null" :message="authStore.errorMessage" />
      <fieldset>
        <legend>Sign Up</legend>
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

        <div class="input_group">
          <BaseInput
            id="username"
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
            v-model="data.username"
          />
        </div>
        <BaseButton type="submit" :label="processing" :disabled="authStore.loading || dataInput"></BaseButton>
        <span class="ml-2"
          >Already have an account? <router-link class="text-green-500" to="/login">Login</router-link></span
        >
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
</style>
