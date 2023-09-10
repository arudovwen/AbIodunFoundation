<template>
  <div>
    <sdPageHeader title="Users Page " class="ninjadash-page-header-main" :routes="breadcrumbs">

    </sdPageHeader>
    <Main>
      <a-row :gutter="25">
        <a-col :sm="24" :xs="24">
          <sdCards headless>
            <h3>Skeleton Page</h3>
          </sdCards>
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
    path: "users",
    breadcrumbName: "Users",
  },
];
</script>
