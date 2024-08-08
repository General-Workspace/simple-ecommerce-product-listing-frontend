<script setup>
defineProps({
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button :type="type" :label="label" :disabled="disabled">{{ label }}</button>
</template>

<style scoped>
button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 10px 0;
}

button:hover {
  filter: brightness(1.2);
  transition: all 0.4s ease-in-out;
}

button:focus {
  outline: none;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
