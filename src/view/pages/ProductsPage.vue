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
          class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2"
          placeholder="Search by name"
        />
        <div>
          <router-link to="/product-management/add">
            <sdButton
              @click="visible = true"
              class="btn-add_new"
              size="default"
              key="1"
              type="primary"
            >
              <unicon name="plus" width="14"></unicon> Add product
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
</script>
