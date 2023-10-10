<template>
  <UserTableStyleWrapper>
    <TableWrapper class="table-responsive">
      <a-table
        :dataSource="transactionsData"
        :columns="transactionTableHeader"
        :loading="loading || deleteloading"
        :pagination="{
          defaultPageSize: query.pageSize,
          total: total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page) => {
            fetchRecords(page);
          },
        }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <div class="flex gap-x-4">
              <router-link :to="`/transaction/${record.id}`">
                <button class="text-xs bg-gray-200 rounded-full py-1 px-2">
                  View
                </button>
              </router-link>
            </div>
          </template>
        </template>
      </a-table>
    </TableWrapper>
  </UserTableStyleWrapper>
</template>
<script>
import moment from "moment";
import { useStore } from "vuex";
import { debounce } from "lodash";
import { UserTableStyleWrapper } from "../style";
import { TableWrapper } from "../../../styled";
import {
  computed,
  defineComponent,
  onMounted,
  watch,
  reactive,
  inject,
  ref,
} from "vue";
import { transactionTableHeader } from "@/utility/constant";
import { message } from "ant-design-vue";
import { formatCurrency } from "@/utility/formatCurrency";

const UserListTable = defineComponent({
  name: "UserListTable",
  components: { UserTableStyleWrapper, TableWrapper },
  setup() {
    const visible = ref(false);
    const detail = ref("");
    const type = ref("");
    const search = inject("search");
    const { state, dispatch } = useStore();
    const loading = computed(() => state.transactions.fetchloading);
    const total = computed(() => state.transactions.total);
    const addsuccess = computed(() => state.transactions.addsuccess);
    const deleteloading = computed(() => state.transactions.deleteloading);
    const deletesuccess = computed(() => state.transactions.deletesuccess);
    const profile = computed(() => state.auth.userData);
    const header = computed(() =>
      profile?.value?.userRole?.toLowerCase() === "customer"
        ? transactionTableHeader.filter(
            (i) => i.title.toLowerCase() !== "actions"
          )
        : transactionTableHeader
    );
    const transactionsData = computed(() =>
      state.transactions.data.map((transaction) => {
        const {
          id,
          amount,
          transactionType,
          transactionDate,
          transactionStatus,
          description,
        } = transaction;

        return {
          key: id,
          id: id,
          amount: <span class="capitalize">{formatCurrency(amount)}</span>,
          description,
          transactionType: <span class="capitalize">{transactionType}</span>,
          transactionDate: moment(transactionDate).format("lll"),

          status: (
            <div class="">
              <span class="bg-gray-50 text-gray-600 px-3 py-[2px] rounded-full capitalize text-center max-w-max">
                {" "}
                {transactionStatus}
              </span>
            </div>
          ),
          action: "",
        };
      })
    );
    const query = reactive({
      pageNumber: 1,
      pageSize: 10,
      description: "",
      userId:
        profile.value.userRole.toLowerCase() === "customer"
          ? profile.value.id
          : "",
    });

    onMounted(() => {
      dispatch("getTransactions", query);
    });
    function fetchRecords(page) {
      dispatch("getTransactions", { ...query, pageNumber: page });
    }
    function openDelete(data, value) {
      type.value = value;
      visible.value = true;
      detail.value = data;
    }

    function handleDelete() {
      if (type.value === "disable") {
        dispatch("disableUser", detail.value.userId);
      } else {
        dispatch("enableUser", detail.value.userId);
      }
    }
    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getTransactions", { ...query, description: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getTransactions", query);
    });
    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getTransactions", query);
        message.success("User disabled!");
        visible.value = false;
      }
    });

    watch(search, () => {
      debouncedSearch(search.value);
    });

    return {
      handleDelete,
      openDelete,
      visible,
      query,
      total,
      fetchRecords,
      transactionsData,
      transactionTableHeader,
      loading,
      deleteloading,
      header,
      profile,
    };
  },
});

export default UserListTable;
</script>
