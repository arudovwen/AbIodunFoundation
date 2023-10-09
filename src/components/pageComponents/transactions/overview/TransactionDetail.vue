<template>
  <div>
    <div
      v-if="product && !loading && !reqloading"
      class="grid grid-cols-2 gap-6 mb-10"
    >
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Transaction type</span
        >
        <span class="text-base font-medium capitalize">{{
          transaction.transactionType || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Transaction status</span
        >
        <span class="text-base font-medium capitalize">{{
          transaction.transactionStatus || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Product name</span
        >
        <span class="text-base font-medium capitalize">{{
          product?.productName || "-"
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
          product?.lockInPeriod || "-"
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
          >{{ product?.equityContribution   || "-"}}%</span
        >
      </div>
      <div class="col-span-2">
        <span class="block text-sm font-medium text-gray-500">Description</span>
        <span class="text-base font-medium capitalize">{{
          product?.description || "-"
        }}</span>
      </div>
    </div>
    <div>
      <h4 class="col-span-2 text-lg font-bold mb-8">Requirements</h4>
      <div
        v-if="productReq && !loadingReq && !reqloading"
        class="grid grid-cols-2 gap-10 mb-10"
      >
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Business name</span
          >
          <span class="text-base font-medium capitalize">{{
            productReq?.businessName || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Business address</span
          >
          <span class="text-base font-medium capitalize">{{
            productReq?.businessAddress || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Residential address</span
          >
          <span class="text-base font-medium capitalize">{{
            productReq?.residentialAddress || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Use of Funds</span
          >
          <span class="text-base font-medium capitalize">{{
            productReq?.useOfFunds  || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Facility amount</span
          >
          <span class="text-base font-medium capitalize">{{
            formatCurrency(productReq?.facilityAmount) || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Business type
          </span>
          <span class="text-base font-medium capitalize">{{
            productReq?.businessType || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500">BVN</span>
          <span class="text-base font-medium capitalize">{{
            productReq?.bvn || "-"
          }}</span>
        </div>

        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >CAC Document</span
          >
          <span class="text-base font-medium capitalize">{{
            product?.description || "-"
          }}</span>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Business statement</span
          >
          <span class="text-base font-medium capitalize">{{
            product?.description || "-"
          }}</span>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Utility Bill</span
          >
          <span class="text-base font-medium capitalize">{{
            product?.description || "-"
          }}</span>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Identification Document</span
          >
          <span class="text-base font-medium capitalize">{{
            product?.description || "-"
          }}</span>
        </div>
      </div>
    </div>

    <div
      v-if="loading || loadingReq || reqloading"
      class="flex items-center justify-center h-[500px] w-full"
    >
      <a-spin size="large" />
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
import { formatCurrency } from "@/utility/formatCurrency";

const route = useRoute();
const query = {
  pageNumber: 1,
  pageSize: 100000,
  name: "",
};
const { state, dispatch } = useStore();
const product = computed(() => state.requests.request);
const productReq = computed(() => state.requests.data[0]);
const transaction = computed(() => state.transactions.transaction);

const success = computed(() => state.transactions.getsuccess);

const loading = computed(() => state.transactions.getloading);
const reqloading = computed(() => state.requests.getloading);
const loadingReq = computed(() => state.requests.getreqloading);

onMounted(() => {
  if (route.params.id) {
    dispatch("getTransactionById", route.params.id);
  }
});
watch(success, () => {
  transaction.value.userProductId &&
    dispatch("getUserProductById", transaction.value.userProductId);
  transaction.value.userProductId &&
    dispatch("getUserProductRequirements", {
      ...query,
      userproductId: transaction.value.userProductId,
    });
});
</script>
