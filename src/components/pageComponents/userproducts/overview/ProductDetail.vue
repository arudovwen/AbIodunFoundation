<template>
  <div>
 
    <div v-if="product && !loading" class="grid grid-cols-2 gap-10 mb-10">
      <div>
        <span class="block text-sm font-medium">Product name</span>
        <span class="text-base font-bold capitalize">{{
          product.productName || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Amount</span>
        <span class="text-base font-bold capitalize">{{
          formatCurrency(product.amount) || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Request date</span>
        <span class="text-base font-bold capitalize">{{
          moment(product.requestDate).format("lll") || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Due date</span>
        <span class="text-base font-bold capitalize">{{
          moment(product.dueDate).format("lll") || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Lock-in period</span>
        <span class="text-base font-bold capitalize">{{
          product.lockInPeriod || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Interest rate</span>
        <span class="text-base font-bold capitalize">{{
          formatCurrency(product.interestRate) || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Equity contribution</span>
        <span class="text-base font-bold capitalize">{{
          formatCurrency(product.equityContribution) || "-"
        }}</span>
      </div>
      <div class="col-span-2">
        <span class="block text-sm font-medium">Description</span>
        <span class="text-base font-bold capitalize">{{
          product.description || "-"
        }}</span>
      </div>
    </div>
    <div v-if="productReq && !loadingReq" class="grid grid-cols-2 gap-10 mb-10">
      <h4 class="col-span-2 font-bold mb-8">Requirements</h4>
      <div>
        <span class="block text-sm font-medium">Business name</span>
        <span class="text-base font-bold capitalize">{{
          product.businessName || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Business address</span>
        <span class="text-base font-bold capitalize">{{
          product.businessAddress || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Residential address</span>
        <span class="text-base font-bold capitalize">{{
          product.residentialAddress || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Use of Funds</span>
        <span class="text-base font-bold capitalize">{{
          product.useOfFunds
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Facility amount</span>
        <span class="text-base font-bold capitalize">{{
          formatCurrency(product.facilityAmount) || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Business type </span>
        <span class="text-base font-bold capitalize"
          >{{ product.businessTypeCode }} - {{ product.businessType }}</span
        >
      </div>
      <div>
        <span class="block text-sm font-medium">BVN</span>
        <span class="text-base font-bold capitalize">{{ productReq.bvn }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Lock-in period</span>
        <span class="text-base font-bold capitalize">{{
          product.lockInPeriod || "-"
        }}</span>
      </div>

      <div class="col-span-2">
        <span class="block text-sm font-medium">CAC Document</span>
        <span class="text-base font-bold capitalize">{{
          product.description || "-"
        }}</span>
      </div>
      <div class="col-span-2">
        <span class="block text-sm font-medium">Business statement</span>
        <span class="text-base font-bold capitalize">{{
          product.description || "-"
        }}</span>
      </div>
      <div class="col-span-2">
        <span class="block text-sm font-medium">Utility Bill</span>
        <span class="text-base font-bold capitalize">{{
          product.description || "-"
        }}</span>
      </div>
      <div class="col-span-2">
        <span class="block text-sm font-medium">Identification Document</span>
        <span class="text-base font-bold capitalize">{{
          product.description || "-"
        }}</span>
      </div>
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
const productReq = computed(() => state.requests.requestReq);

const loading = computed(() => state.requests.getloading);
const loadingReq = computed(() => state.requests.getreqloading);

onMounted(() => {
  if (route.params.id) {
    dispatch("getUserProductById", route.params.id);
    // dispatch("getUserProductRequirementById", route.params.id);
  }
});
</script>
