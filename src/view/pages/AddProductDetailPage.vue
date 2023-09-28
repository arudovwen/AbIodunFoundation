<template>
  <div>
    <sdPageHeader
      title="Add Product Detail"
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
import { useRoute } from "vue-router";
import { Main } from "../styled";
import ProductForm from "components/pageComponents/product/AddProductDetail";

const route = useRoute();
const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "/product-management",
    breadcrumbName: "Products",
  },
  {
    path: `/product-management/product/${route.params.id}`,
    breadcrumbName: "Details",
  },
  {
    path: "#",
    breadcrumbName: "Add product detail",
  },
];
</script>
