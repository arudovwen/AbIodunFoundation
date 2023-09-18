<template>
  <div>
    <sdPageHeader
      title="Add Product"
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
import ProductForm from "components/pageComponents/product/AddProduct"

const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "/product-management",
    breadcrumbName: "Product management",
  },
  {
    path: "#",
    breadcrumbName: "Add product",
  },
];
</script>
