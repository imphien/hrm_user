<template>
  <div class="d-flex">
    <span class="input-title fw-medium">{{ props.title }}</span>
    <input type="text" v-model="value" @input='$emit("data", $event.target.value)'>
  </div>
</template>
<script setup>
import {toRef} from "vue";

  // eslint-disable-next-line no-undef
  const props = defineProps({
    title : {
      type: String,
      default: '',
    },
    value : {
      type: String,
      default: '',
    }
  });
  // eslint-disable-next-line no-undef
  defineEmits(['data'])

  const value = toRef(props['value'], 'value');
</script>
<style scoped>
  .input-title {
    padding: 6px 15px 0 0;
    min-width: 115px;
  }

  input {
    padding: 5px 10px;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
  }
</style>