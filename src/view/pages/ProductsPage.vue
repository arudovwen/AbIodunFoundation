<template>
  <div>
    <sdPageHeader
      title="Products "
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>
    <Main>
      <div class="flex justify-between my-6">
        <input
          class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2 outline-none focus:border-orange-200"
          placeholder="Search by name"
          v-model="search"
          type="search"
        />
        <div class="flex gap-x-4">
          <router-link to="/product-management/add">
            <sdButton class="btn-add_new" size="sm" key="1" type="primary">
              <unicon name="plus" width="14"></unicon> Add product
            </sdButton>
          </router-link>
          <router-link to="/product-management/requests">
            <sdButton class="btn-add_new" size="sm" key="1" type="primary">
              View requests
            </sdButton>
          </router-link>
        </div>
      </div>
      <Products />
    </Main>
  </div>
</template>

<script setup>
import { Main } from "../styled";
import Products from "components/pageComponents/products/overview/ProductsTable";
import { ref, provide } from "vue";
const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "products",
    breadcrumbName: "Products",
  },
];
const search = ref("");
provide("search", search);
</script>
