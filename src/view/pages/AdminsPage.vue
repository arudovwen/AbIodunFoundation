<template>
  <div>
    <sdPageHeader
      title="Administrators"
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>
    <Main>
      <a-row :gutter="15">
        <a-col :md="24">
          <Users />
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script setup>
import { Main } from "../styled";
import Users from "components/pageComponents/users/overview/UserTable";

const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "#",
    breadcrumbName: "Administrators",
  },
];
</script>
