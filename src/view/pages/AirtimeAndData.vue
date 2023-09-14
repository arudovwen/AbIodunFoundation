<template>
    <div>
      <sdPageHeader
        title="Airtime & Data"
        class="ninjadash-page-header-main"
        :routes="breadcrumbs"
      >
      </sdPageHeader>
      <Main>
        <a-row :gutter="15">
          <a-col :md="24">
            <!-- <Users /> -->
          </a-col>
        </a-row>
      </Main>
    </div>
  </template>
  
  <script setup>
  import { Main } from "../styled";

  const breadcrumbs = [
    {
      path: "/dashboard",
      breadcrumbName: "Dashboard",
    },
    {
      path: "#",
      breadcrumbName: "Airtime & Data",
    },
  ];
  </script>
  