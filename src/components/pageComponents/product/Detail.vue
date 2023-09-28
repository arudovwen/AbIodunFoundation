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
        <span class="block text-sm font-medium">Product name</span>
        <span class="text-base font-bold capitalize">{{
          product.productName || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium">Product type</span>
        <span class="text-base font-bold capitalize">{{
          product.productType || "-"
        }}</span>
      </div>
      <div class="col-span-2">
        <span class="block text-sm font-medium">Product description</span>
        <span class="text-base font-bold capitalize">{{
          product.productDescription || "-"
        }}</span>
      </div>
    </div>
    <div v-if="product">
      <ProductDetailTable />
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
const product = computed(() => state.products.product);
const loading = computed(() => state.products.loading);

onMounted(() => {
  if (route.params.id) {
    dispatch("getProduct", route.params.id);
  }
});
</script>
