<template>
  <div class="d-flex">
    <span class="input-title fw-medium">{{ props.title }}</span>
    <input
        :type="type"
        :value="inputValue"
        @input="validateInput"
        :required="required"
    >
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  required: {
    type: Boolean,
    default: true,
  },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["data"]);

const inputValue = ref(props.value);

watch(
    () => props.value,
    (newValue) => {
      inputValue.value = newValue;
    }
);

const validateInput = (event) => {
  let value = event.target.value;

  if (props.type === "number") {
    value = value.replace(/\D/g, "");

    if (value && parseInt(value, 10) <= 0) {
      value = "";
    }
  }

  inputValue.value = value;

  emit("data", value);
};
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