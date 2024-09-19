<template>
    <div>
      <sdPageHeader title="Service Detail" class="ninjadash-page-header-main"   :routes="breadcrumbs">
  
      </sdPageHeader>
      <Main>
        <a-row :gutter="25">
          <a-col :sm="24" :xs="24">
            <sdCards headless>
             <Product />
            </sdCards>
          </a-col>
        </a-row>
      </Main>
    </div>
  </template>
  
  <script setup>
  import { Main } from "../styled";
  import Product from "components/pageComponents/userproducts/overview/ProductDetail";
  const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "/product-management/requests",
    breadcrumbName: "Requests",
  },
  {
    path: "#",
    breadcrumbName: "Detail",
  },
];
  </script>
  