<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  message: {
    type: String,
  },
});

const errorMessage = ref(props.message);

const closeMessage = () => {
  errorMessage.value = "";
};
</script>

<template>
  <div class="error_message" v-if="errorMessage">
    <p>{{ errorMessage }}</p>
    <button @click="closeMessage">&times;</button>
  </div>
</template>

<style scoped>
.error_message {
  position: relative;
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.error_message button {
  position: absolute;
  bottom: 1.8rem;
  right: 0;
  color: #721c24;
  background-color: #f8d7da;
  padding: 0.01rem 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.12rem;
  font-weight: bold;
}

.error_message button:hover {
  background-color: #721c24;
  color: #f8d7da;
  transition: 0.3s;
}

.error_message p {
  margin: 0;
}
</style>
