<template>
  <a-row :gutter="25">
    <a-col
      v-for="(item, i) in tabs"
      :lg="6"
      :md="12"
      :sm="12"
      :xs="24"
      :key="i"
    >
      <Suspense>
        <template #default>
          <OverviewCard :ocData="item" :halfCircleIcon="true" />
        </template>
        <template #fallback>
          <sdCards headless>
            <a-skeleton active />
          </sdCards>
        </template>
      </Suspense>
    </a-col>
  </a-row>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, computed, onMounted, watch, ref } from "vue";
import OverviewCard from "components/cards/OverviewCard.vue";

const OverviewDataList = defineComponent({
  name: "OverviewDataList",
  components: {
    OverviewCard,
  },
  // "totalProducts": 0,
  //       "totalUsers": 1,
  //       "totalRequests": 0
  setup() {
    const tabs = ref([
      {
        id: 1,
        type: "secondary",
        icon: "box",
        total: 0,
        suffix: "",
        prefix: "",
        label: "Total Products",
        growth: "upward",
        growthRate: "25.36",
        dataPeriod: "Since Last Month",
        decimal: 0,
      },
      {
        id: 2,
        type: "warning",
        icon: "users-alt",
        total: 0,
        suffix: "",
        prefix: "",
        label: "Total Users",
        growth: "upward",
        growthRate: "25.36",
        dataPeriod: "Since Last Month",
        decimal: 0,
      },
      {
        id: 3,
        type: "primary",
        icon: "arrow-growth",
        total: 0,
        suffix: "",
        prefix: "",
        label: "Total Requests",
        growth: "upward",
        growthRate: "25.36",
        dataPeriod: "Since Last Month",
        decimal: 0,
      },
    ]);
    const { state, dispatch } = useStore();
    const stats = computed(() => state.users.stats);
    const profile = computed(() => state.auth.userData);
    const loading = computed(() => state.users.adminstatloading);

    onMounted(() => {
      if (profile?.value?.userRole?.toLowerCase() === "customer") {
        dispatch("getCustomerStats", profile.value.id);
      } else {
        dispatch("getAdminStats");
      }
    });

    watch(stats, () => {
      tabs.value = [
        {
          id: 1,
          type: "primary",
          icon: "box",
          total: stats.value.totalProducts || 0,
          suffix: "",
          prefix: "",
          label: "Total Products",
          growth: "upward",
          growthRate: "25.36",
          dataPeriod: "Since Last Month",
          decimal: 0,
        },
        {
          id: 2,
          type: "warning",
          icon: "users-alt",
          total:
            profile.value.userRole.toLowerCase() === "customer"
              ? stats.value.totalTransactions
              : stats.value.totalUsers || 0,
          suffix: "",
          prefix: "",
          label:
            profile.value.userRole.toLowerCase() === "customer"
              ? "Total Transactions"
              : "Total Users",
          growth: "upward",
          growthRate: "25.36",
          dataPeriod: "Since Last Month",
          decimal: 0,
        },
        {
          id: 3,
          type: "primary",
          icon: "arrow-growth",
          total: stats.value.totalRequests || 0,
          suffix: "",
          prefix: "",
          label: "Total Requests",
          growth: "upward",
          growthRate: "25.36",
          dataPeriod: "Since Last Month",
          decimal: 0,
        },
        {
          id: 3,
          type: "primary",
          icon: "receipt",
          total: stats.value.totalRequests || 0,
          suffix: "",
          prefix: "",
          label: "Total Loans Disbursed",
          growth: "upward",
          growthRate: "25.36",
          dataPeriod: "Since Last Month",
          decimal: 0,
        },
      ];
    });
    return {
      stats,
      loading,
      tabs,
    };
  },
});
export default OverviewDataList;
</script>
