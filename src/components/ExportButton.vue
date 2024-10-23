<template>
  <div>
    <export-excel :data="data" worksheet="document" type="csv" :name="name">
      <sdButton
       size="sm"

        class="!border-primary !border w-full !bg-transparent !text-primary font-medium btn-sm"
        >Export Excel</sdButton
      >
    </export-excel>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
defineProps({
  data: {
    default: [],
  },
  buttonText: {
    default: "Export",
  },
  name: {
    default: "document.csv",
  },
});
</script>
