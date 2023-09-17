<template>
  <div>
    <sdPageHeader
      title="Update Product"
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>
    <Main>
      <a-row :gutter="25">
        <a-col :sm="24" :xs="24">
          <sdCards headless>
           <ProductForm />
          </sdCards>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script setup>
import { Main } from "../styled";
import ProductForm from "components/pageComponents/product/EditProduct"

const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "/page-management/products",
    breadcrumbName: "Products",
  },
  {
    path: "#",
    breadcrumbName: "Add product",
  },
];
</script>
