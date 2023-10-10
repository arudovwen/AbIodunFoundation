<template>
  <div>
    <sdPageHeader title="Transactions Page " class="ninjadash-page-header-main" :routes="breadcrumbs">
    </sdPageHeader>
    <Main>
      <div class="flex justify-between items-center py-6">
        <div class="flex gap-x-4 items-center flex-1">
          <input
            v-model="search"
            class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2"
            placeholder="Search description"
          />
        </div>

        <div>
          <!-- <sdButton
            @click="visible = true"
            class="btn-add_new"
            size="sm"
            key="1"
            type="primary"
          >
            <unicon name="plus" width="14"></unicon> Add New Administrator
          </sdButton> -->
        </div>
      </div>
      <a-row :gutter="25">
        <a-col :sm="24" :xs="24">
          <sdCards headless>
            <Transactions />
          </sdCards>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>


<script setup>
import { ref, provide } from "vue";
import { Main } from "../styled";
import Transactions from "components/pageComponents/transactions/overview/TransactionsTable";

const search = ref("");
const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "transactions",
    breadcrumbName: "Transactions",
  },
];
provide("search", search);
</script>
