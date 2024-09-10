<template>
  <div>
    <sdPageHeader
      title="Requests"
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>
    <Main>
      <div class="flex justify-between my-6">
        <input
          class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2"
          placeholder="Search by request"
          v-model="search"
        />
        <div><ExportButton :data="productsData" /></div>
      </div>
      <a-row :gutter="15">
        <a-col :md="24">
          <Products />
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script setup>
import { ref, provide, computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import { Main } from "../styled";
import ExportButton from "components/ExportButton";
import Products from "components/pageComponents/requests/overview/ProductsTable";
import { formatCurrency } from "@/utility/formatCurrency";

const { state } = useStore();
const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "/product-management",
    breadcrumbName: "ProductS",
  },
  {
    path: "#",
    breadcrumbName: "Requests",
  },
];
const search = ref("");
const productsData = computed(() =>
  state.requests.data.map((product) => {
    const {
      amount,
      equityContribution,
      description,
      dueDate,
      requestDate,
      interestRate,
      lockInPeriod,
      productName,
      createdAt,
    } = product;

    return {
      "Lock-In Period": lockInPeriod,
      "Product Name": productName,
      description,
      amount: formatCurrency(amount),
      "Interest Rate": `${interestRate}%`,
      "Equity Contribution": `${equityContribution}%`,
      "Due Date": moment(dueDate).format("ll"),
      "Request Date": moment(requestDate).format("ll"),
      created: moment(createdAt).format("ll"),
    };
  })
);
provide("search", search);
</script>
