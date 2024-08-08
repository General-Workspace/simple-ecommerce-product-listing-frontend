<script setup>
import { ref } from "vue";

defineProps({
  id: {
    type: String,
    required: true,
    validator: (value) => value.length > 0,
  },
  label: {
    type: String,
    required: true,
    validator: (value) => value.length > 0,
  },
  type: {
    type: String,
    required: true,
    default: "text",
    validator: (value) => ["text", "password", "email"].includes(value),
  },
  placeholder: {
    type: String,
    required: true,
    validator: (value) => value.length > 0,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);

const isPasswordVisible = ref(false);
</script>

<template>
  <div class="base-input">
    <div class="label_group">
      <label :for="id">{{ label }}</label>
    </div>

    <div class="input_group">
      <input
        :id="id"
        :type="type === 'password' && isPasswordVisible ? 'text' : type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<style scoped>
.label_group label {
  margin-bottom: 0.5rem;
}

.label_group {
  display: flex;
  gap: 0.5rem;
}

.input-group {
  position: relative;
  display: grid;
  grid-template-rows: 1fr minmax(1rem);
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

input:focus {
  outline: none;
  border-color: #2563eb;
}
</style>
