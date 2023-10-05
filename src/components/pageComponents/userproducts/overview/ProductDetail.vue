<template>
  <div>
    <div v-if="product && !loading" class="grid grid-cols-2 gap-10 mb-10">
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Product name</span
        >
        <span class="text-base font-medium capitalize">{{
          product.productName || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500">Amount</span>
        <span class="text-base font-medium capitalize">{{
          formatCurrency(product.amount) || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Request date</span
        >
        <span class="text-base font-medium capitalize">{{
          moment(product.requestDate).format("lll") || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500">Due date</span>
        <span class="text-base font-medium capitalize">{{
          moment(product.dueDate).format("lll") || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Lock-in period</span
        >
        <span class="text-base font-medium capitalize">{{
          product.lockInPeriod || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Interest rate</span
        >
        <span class="text-base font-medium capitalize">{{
          formatCurrency(product.interestRate) || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Equity contribution</span
        >
        <span class="text-base font-medium capitalize"
          >{{ product.equityContribution }}%</span
        >
      </div>
      <div class="col-span-2">
        <span class="block text-sm font-medium text-gray-500">Description</span>
        <span class="text-base font-medium capitalize">{{
          product.description || "-"
        }}</span>
      </div>
    </div>
    <div
      v-if="loading"
      class="flex items-center justify-center h-[500px] w-full"
    >
      <a-spin size="large" />
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
import { formatCurrency } from "@/utility/formatCurrency";

const route = useRoute();
const { state, dispatch } = useStore();
const product = computed(() => state.requests.request);

const loading = computed(() => state.requests.getloading);

onMounted(() => {
  if (route.params.id) {
    dispatch("getUserProductById", route.params.id);
    // dispatch("getUserProductRequirementById", route.params.id);
  }
});
</script>
