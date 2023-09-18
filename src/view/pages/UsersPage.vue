<template>
  <div>
    <sdPageHeader
      title="Users"
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>
    <Main>
      <div class="flex justify-between items-center py-6">
        <div class="flex gap-x-4 items-center flex-1">
          <input
            class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2"
            placeholder="Search by name"
          />
        </div>

        <div>
          <sdButton
            @click="visible = true"
            class="btn-add_new"
            size="small"
            key="1"
            type="primary"
          >
          <unicon name="plus" width="14"></unicon> Add New Administrator
          </sdButton>
        </div>
      </div>
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
    path: "users",
    breadcrumbName: "Users",
  },
];
</script>
