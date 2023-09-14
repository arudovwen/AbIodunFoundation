<template>
  <div>
    <sdPageHeader
      title="Overview"
      class="ninjadash-page-header-main"
      :routes="pageRoutes"
    ></sdPageHeader>
    <Main>
      <a-row :gutter="25">
        <a-col class="w-full" :xxl="24"><OverviewDataList /></a-col>
        <a-col :xxl="12" :xl="12" :xs="24">
          <Suspense>
            <template #default>
              <SaleRevenue />
            </template>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
          </Suspense>
        </a-col>
        <a-col :xxl="12" :xl="12" :xs="24">
          <Suspense>
            <template #default>
              <SourceRevenueGenerated />
            </template>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
          </Suspense>
        </a-col>
        <a-col :xxl="8" :xl="24" :xs="24">
          <Suspense>
            <template #default>
              <NewProduct />
            </template>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
          </Suspense>
        </a-col>
        <a-col :xxl="16" :xl="24" :xs="24">
          <Suspense>
            <template #default>
              <BestSeller />
            </template>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
          </Suspense>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { Main } from "../styled";
import cardData from "../../demoData/overviewCard.json";
import { defineComponent, defineAsyncComponent } from "vue";

const OverviewDataList = defineAsyncComponent(() =>
  import("components/dashboard/OverviewDataList.vue")
);
const SaleRevenue = defineAsyncComponent(() =>
  import("components/dashboard/SaleRevenue.vue")
);
const SourceRevenueGenerated = defineAsyncComponent(() =>
  import("components/dashboard/SourceRevenueGenerated.vue")
);
const BestSeller = defineAsyncComponent(() =>
  import("components/dashboard/BestSeller.vue")
);
const NewProduct = defineAsyncComponent(() =>
  import("components/dashboard/NewProduct.vue")
);

const pageRoutes = [
  {
    path: "/",
    breadcrumbName: "Dashboard",
  },
  {
    path: "#",
    breadcrumbName: "Overview",
  },
];

export default defineComponent({
  name: "DemoTwo",
  components: {
    Main,
    OverviewDataList,
    SaleRevenue,
    SourceRevenueGenerated,
    BestSeller,
    NewProduct
  },
  setup() {
    return { cardData, pageRoutes };
  },
});
</script>
