<template>
  <div>
    <sdPageHeader title="Dashboard" class="ninjadash-page-header-main"  :routes="breadcrumbs">
    </sdPageHeader>
    <Main>
      <div class="bg-white/10 rounded-lg flex flex-col gap-y-6">
        <Banner />
        <Stats />
        <div class="flex flex-col lg:flex-row gap-y-6 lg:gap-y-0 gap-x-6">
          <Chart />
          <Transactions />
        </div>
      </div>
    </Main>
  </div>
</template>

<script setup>
import { Main } from "../styled";
import Banner from "components/pageComponents/dashboard/Banner";
import Stats from "components/pageComponents/dashboard/Stats";
import Chart from "components/pageComponents/dashboard/Chart";
import Transactions from "components/pageComponents/dashboard/Transactions";

const breadcrumbs = [
  {
    path: "index",
    breadcrumbName: "Dashboard",
  },
  {
    path: "overview",
    breadcrumbName: "Overview",
  },
];
</script>
