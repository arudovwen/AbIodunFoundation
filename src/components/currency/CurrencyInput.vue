<template>
  <input
    ref="inputRef"
    type="text"
    :placeholder="placeholder"
    class="rounded outline-none border border-[#E3E6EF] w-full px-5 py-3 focus:shadow-[0_0_0_2px_rgba(10,49,95,0.2)]"
  />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";
import { watch } from "vue";
export default {
  name: "CurrencyInput",
  props: {
    modelValue: Number, // Vue 2: value
    options: {
      currency: "NGN",
    },
    placeholder: String,
  },
  setup(props) {
    const { inputRef, setOptions, setValue } = useCurrencyInput(props.options);

    watch(
      () => props.modelValue, // Vue 2: props.value
      (value) => {
        setValue(value);
      }
    );

    watch(
      () => props.options,
      (options) => {
        setOptions(options);
      }
    );

    return { inputRef };
  },
};
</script>
