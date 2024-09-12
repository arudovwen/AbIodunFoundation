<template>
  <div>
    <sdPageHeader
      title="Regions & Currency"
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>
    <Main>
      <div class="flex justify-between items-center py-6">
        <div class="flex gap-x-4 items-center flex-1">
          <select
            v-model="searchType"
            class="bg-white border border-gray-100 py-2 px-3 rounded outline-none"
          >
            <option>Country</option>
            <option>Currency</option>
          </select>
          <input
            v-model="search"
            class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2"
            :placeholder="`Search by ${searchType}`"
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
            Add region
          </sdButton>
        </div>
      </div>
      <a-row :gutter="15">
        <a-col :md="24">
          <RegionTable />
        </a-col>
      </a-row>
    </Main>
  </div>
  <Modal :open="visible" @close="visible = false">
    <AddRegion />
  </Modal>
</template>

<script setup>
import Modal from "components/Modal";
import { Main } from "../styled";
import { ref, provide } from "vue";
import RegionTable from "components/pageComponents/regions/overview/RegionTable";
import AddRegion from "components/pageComponents/regions/AddRegion";

const visible = ref(false);
const search = ref("");
const searchType = ref("Country");
const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "regions",
    breadcrumbName: "Regions",
  },
];

provide("visible", visible);
provide("searchType", searchType);
provide("search", search);
</script>
