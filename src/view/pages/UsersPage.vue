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
            v-model="search"
            class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2"
            placeholder="Search by name"
          />
        </div>

        <div>
          <sdButton
            @click="visible = true"
            class="btn-add_new"
            size="sm"
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
  <Modal :open="visible" @close="visible = false">
    <AddUser />
  </Modal>
</template>

<script setup>
import Modal from "components/Modal";
import { Main } from "../styled";
import { ref, provide } from "vue";
import Users from "components/pageComponents/users/overview/UserTable";
import AddUser from "components/pageComponents/users/AddUsers";

const visible = ref(false);
const search = ref("");
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

provide("visible", visible);
provide("search", search);
</script>
