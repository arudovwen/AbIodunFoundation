<template>
  <div>
    <sdPageHeader title="Transactions Page " class="ninjadash-page-header-main" :routes="breadcrumbs">
    </sdPageHeader>
    <Main>
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
import { Main } from "../styled";
import Transactions from "components/pageComponents/transactions/overview/TransactionsTable";

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
</script>
