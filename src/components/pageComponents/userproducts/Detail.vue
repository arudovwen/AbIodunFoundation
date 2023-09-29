<template>
  <div class="sm:w-[768px]">
    <div v-if="!loading && product" class="flex gap-x-5 justify-end mb-10">
      <router-link :to="`/service/edit-request/${request.id}`">
        <sdButton htmlType="button" type="primary" size="sm">
          Edit request
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
   
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { state, dispatch } = useStore();
const request = computed(() => state.requests.request);
const product = computed(() => state.products.product);
const loading = computed(() => state.products.loading);

onMounted(() => {
  if (route.params.id) {
    dispatch("getRequest", route.params.id);
  }
});
</script>
