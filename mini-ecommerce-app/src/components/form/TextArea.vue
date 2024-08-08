<script setup>
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
  name: {
    type: String,
    required: true,
    validator: (value) => value.length > 0,
  },
  modelValue: {
    type: String,
    default: "",
  },
  rows: {
    type: Number,
    default: 4,
  },
  cols: {
    type: Number,
    default: 50,
  },
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form_group">
    <div className="flex">
      <label :for="id"
        ><slot name="label">{{ label }}</slot></label
      >
    </div>
    <slot name="input">
      <textarea
        :id="id"
        :name="name"
        :rows="4"
        :cols="50"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </slot>
  </div>
</template>

<style scoped>
.form_group {
  margin-bottom: 0.62rem;
}

textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  background: transparent;
  border-radius: 5px;
}

textarea:focus {
  outline: none;
  border-color: #2563eb;
}

label {
  margin-bottom: 0.5rem;
}
</style>
