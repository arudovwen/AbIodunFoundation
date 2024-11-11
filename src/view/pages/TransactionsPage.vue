<template>
  <div>
    <sdPageHeader
      title="Transactions"
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
            placeholder="Search description"
          />
        </div>

        <div>
          <ExportButton :data="transactionsData" />
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
import { Main } from "../styled";
import ExportButton from "components/ExportButton";
import Transactions from "components/pageComponents/transactions/overview/TransactionsTable";
import { ref, provide, computed, onMounted, reactive } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import { formatCurrency } from "@/utility/formatCurrency";

const { state, dispatch } = useStore();
const search = ref("");
const query = reactive({
  pageNumber: 1,
  pageSize: 100000000,
  description: "",
  userId: "",
});
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
const transactionsData = computed(() =>
  state.transactions.allData.map((transaction) => {
    const {
      amount,
      transactionType,
      transactionDate,
      transactionStatus,
      description,
      currency,
    } = transaction;

    return {
      "Transaction Type": transactionType,
      "Transaction Date": moment(transactionDate).format("lll"),
      amount: formatCurrency(amount, currency),
      description,

      status: transactionStatus,
    };
  })
);

onMounted(() => {
  dispatch("getAllTransactions", query);
});
provide("search", search);
</script>
