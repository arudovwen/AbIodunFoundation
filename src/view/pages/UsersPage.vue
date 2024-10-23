<template>
  <div>
    <sdPageHeader
      title="Users Management"
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

        <div class="flex gap-x-4 items-center">
          <ExportButton :data="usersData" />
          <sdButton
            @click="visible = true"
            class="btn-add_new"
            size="sm"
            key="1"
            type="primary"
          >
            Add admin
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
import { ref, provide, computed } from "vue";
import Users from "components/pageComponents/users/overview/UserTable";
import AddUser from "components/pageComponents/users/AddUsers";
import ExportButton from "components/ExportButton";
import { useStore } from "vuex";
import moment from "moment";

// import AddRole from "components/pageComponents/users/AddRole";
const { state } = useStore();
const usersData = computed(() =>
  state.users.allData.map((user) => {
    const {
      fullName,
      emailAddress,
      roleName,
      mobileNo,
      status,
      createdOn,
      lastLogin,
    } = user;

    return {
      "Full Name": fullName,
      "Email Address": emailAddress,
      "Mobile No": mobileNo,
      role: roleName,
      "Email Validated": status !== 0 ? "Yes" : "No",
      created: moment(createdOn).format("ll"),
      lastLogin:
        lastLogin && lastLogin !== "n/a"
          ? moment(lastLogin).format("lll")
          : "-",
      status:
        status === 0
          ? " Pending Activation"
          : status === 1
          ? "Active"
          : status === 5
          ? "Inactive"
          : "",
    };
  })
);
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
