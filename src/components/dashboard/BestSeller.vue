<template>
  <div class="full-width-table">
    <BorderLessHeading>
      <Cards>
        <template #title>
          <div class="ninjadash-card-title-wrap">
            <span class="ninjadash-card-title-text"> Recent Transactions </span>
          </div>
        </template>
        <!-- <template #button>
          <div class="ninjadash-card-nav">
            <ul>
              <li
                :class="
                  sellerTab === 'today' ? 'ninjadash-active' : 'ninjadash-today'
                "
              >
                <router-link
                  @click="(e) => handleTabActivation(e, 'today')"
                  to="#"
                >
                  Today
                </router-link>
              </li>
              <li
                :class="
                  sellerTab === 'week' ? 'ninjadash-active' : 'ninjadash-week'
                "
              >
                <router-link
                  @click="(e) => handleTabActivation(e, 'week')"
                  to="#"
                >
                  Week
                </router-link>
              </li>
              <li
                :class="
                  sellerTab === 'month' ? 'ninjadash-active' : 'ninjadash-month'
                "
              >
                <router-link
                  @click="(e) => handleTabActivation(e, 'month')"
                  to="#"
                >
                  Month
                </router-link>
              </li>
            </ul>
          </div>
        </template> -->
        <TableDefaultStyle
          class="ninjadash-having-header-bg ninjadash-large-table"
        >
          <div className="table-responsive">
            <a-table
              :columns="sellerColumns"
              :dataSource="transactionsData"
              :pagination="false"
              :loading="loading"
            />
          </div>
        </TableDefaultStyle>
      </Cards>
    </BorderLessHeading>
  </div>
</template>
<script>
import { defineComponent, ref, computed, reactive, onMounted } from "vue";
import Cards from "components/cards/frame/CardsFrame.vue";
import { BorderLessHeading, TableDefaultStyle } from "../styled";
import { useStore } from "vuex";
import tableData from "../../demoData/table-data.json";
import { formatCurrency } from "@/utility/formatCurrency";
import moment from "moment";

const BestSeller = defineComponent({
  name: "BestSeller",
  components: {
    Cards,
    BorderLessHeading,
    TableDefaultStyle,
  },
  setup() {
    const { bestSeller } = tableData;
    const { state, dispatch } = useStore();
    onMounted(() => {
      dispatch("getTransactions", query);
    });
    const loading = computed(() => state.transactions.fetchloading);
    const profile = computed(() => state.auth.userData);
    const query = reactive({
      pageNumber: 1,
      pageSize: 5,
      description: "",
      userId:
        profile.value.userRole.toLowerCase() === "customer"
          ? profile.value.id
          : "",
    });

    const transactionsData = computed(() =>
      state.transactions.data.map((transaction) => {
        const {
          id,
          amount,
          transactionType,
          transactionDate,
          transactionStatus,
          description,
          currency,
        } = transaction;

        return {
          key: id,
          id: id,
          amount: (
            <span class="capitalize">{formatCurrency(amount, currency)}</span>
          ),
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
    const sellerColumns = [
      {
        title: "Date",
        dataIndex: "transactionDate",
        key: "transactionDate",
      },
      {
        title: "Type",
        dataIndex: "transactionType",
        key: "transactionType",
      },

      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
    ];
    const sellerTab = ref("today");
    const bestSellerData = computed(() => []);

    const handleTabActivation = (event, value) => {
      event.preventDefault();
      sellerTab.value = value;
    };

    return {
      bestSeller,
      sellerColumns,
      sellerTab,
      bestSellerData,
      handleTabActivation,
      transactionsData,
      loading,
    };
  },
});

export default BestSeller;
</script>
