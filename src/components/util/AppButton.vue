<template>
  <button
    :type="type"
    class="text-base rounded-3xl p-3 shadow-md border"
    :class="getButtonClass"
    @click="method"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "button",
      validator: (value) => ["submit", "reset", "button"].includes(value),
    },
    text: {
      type: String,
      required: true,
      default: "Button",
    },
    variant: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "danger"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    method: {
      type: Function,
      default: null,
    },
  },
  computed: {
    getButtonClass() {
      if (this.disabled) {
        return "text-red-500 bg-gray-400 cursor-not-allowed";
      } else {
        switch (this.variant.toLowerCase()) {
          case "danger":
            return "text-red-500 border-red-600";
          default:
            return "text-primary border-primary";
        }
      }
    },
  },
};
</script>

<style></style>
