<template>
  <div>
    <div v-if="!loading && product" class="flex gap-x-5 justify-end mb-10">
      <router-link :to="`/product-management/product-detail/${product.id}`">
        <sdButton htmlType="button" type="primary" size="sm">
          Add Detail
        </sdButton>
      </router-link>
    </div>
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
        <span class="block text-sm font-medium text-gray-500"
          >Product type</span
        >
        <span class="text-base font-medium capitalize">{{
          product?.productType?.split(" ")[1] || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500">Currency</span>
        <span class="text-base font-medium capitalize">{{
          product.currency || "-"
        }}</span>
      </div>
      <div class="col-span-2">
        <span class="block text-sm font-medium text-gray-500"
          >Product description</span
        >
        <span class="text-base font-medium capitalize">{{
          product.productDescription || "-"
        }}</span>
      </div>
    </div>
    <div v-if="product">
      <ProductDetailTable />
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
import ProductDetailTable from "../products/overview/ProductsDetailTable.vue";

const route = useRoute();
const { state, dispatch } = useStore();
const product = computed(() => state.products.productD);
const loading = computed(() => state.products.loading);

onMounted(() => {
  if (route.params.id) {
    dispatch("getProduct", route.params.id);
  }
});
</script>
