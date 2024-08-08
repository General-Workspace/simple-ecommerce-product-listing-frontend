<script setup>
const emit = defineEmits(["submit"]);

const handleSubmit = () => {
  emit("submit");
};
</script>

<template>
  <form novalidate class="form" @submit.prevent="handleSubmit">
    <slot></slot>
  </form>
</template>

<style scoped>
.form {
  position: relative;
  width: 100%;
  max-width: 798px;
  margin: 0 auto;
  padding: 10px;
  border: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
