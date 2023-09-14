<template>
    <div>
      <sdPageHeader
        title="Requests"
        class="ninjadash-page-header-main"
        :routes="breadcrumbs"
      >
      </sdPageHeader>
      <Main>
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
      path: "#",
      breadcrumbName: "Requests",
    },
  ];
  </script>
  