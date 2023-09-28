<template>
  <div>
    <sdPageHeader
      title="Requests"
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>
    <Main>
      <div class="flex justify-between my-6">
        <input
          class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2"
          placeholder="Search by request"
        />
      </div>
      <a-row :gutter="15">
        <a-col :md="24">
          <Products />
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script setup>
import { Main } from "../styled";
import Products from "components/pageComponents/requests/overview/ProductsTable";

const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "/product-management",
    breadcrumbName: "ProductS",
  },
  {
    path: "#",
    breadcrumbName: "Requests",
  },
];
</script>
