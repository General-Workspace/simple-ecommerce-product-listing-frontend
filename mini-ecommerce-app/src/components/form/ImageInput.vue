<script>
export default {
  emits: ["update:modelValue"],
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="form_group">
    <div className="flex">
      <label :for="id"
        ><slot name="label">{{ label }}</slot></label
      >
    </div>
    <slot name="input">
      <input type="file" :id="id" :name="name" @input="$emit('update:modelValue', $event.target.files[0])" />
    </slot>
  </div>
</template>

<style scoped>
.form_group {
  margin-bottom: 1rem;
}

.form_control {
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
