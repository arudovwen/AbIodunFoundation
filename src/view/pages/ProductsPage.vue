<template>
  <div>
    <sdPageHeader title="Products Page " class="ninjadash-page-header-main" :routes="breadcrumbs">

    </sdPageHeader>
    <Main>
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
