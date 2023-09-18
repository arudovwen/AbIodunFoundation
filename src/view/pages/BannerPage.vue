<template>
    <div>
      <sdPageHeader title="Banners" class="ninjadash-page-header-main" :routes="breadcrumbs">
  
      </sdPageHeader>
      <Main>
        <Banners />
      </Main>
    </div>
  </template>
  
  <script setup>
  import { Main } from "../styled";
  import Banners from "components/pageComponents/banners/overview/BannerTable";
  
  const breadcrumbs = [
    {
      path: "/dashboard",
      breadcrumbName: "Dashboard",
    },
    {
      path: "Banners",
      breadcrumbName: "Banners",
    },
  ];
  </script>
  