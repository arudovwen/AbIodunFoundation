<template>
  <div>
    <sdPageHeader
      title="Services "
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>

    <Main>
      <div class="flex justify-between my-6">
        <input
          class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2"
          placeholder="Search description"
          v-model="search"
        />
        <div>
          <router-link to="/service/request">
            <sdButton
              @click="visible = true"
              class="btn-add_new"
              size="default"
              key="1"
              type="primary"
            >
           Request service
            </sdButton>
          </router-link>
        </div>
      </div>
      <Products />
    </Main>
  </div>
</template>

<script setup>
import { Main } from "../styled";
import Products from "components/pageComponents/userproducts/overview/ProductsTable";
import { ref, provide } from "vue";
const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "services",
    breadcrumbName: "Services",
  },
];
const search = ref("");
provide("search", search);
</script>
