<template>
  <div class="full-width-table">
    <BorderLessHeading>
      <Cards>
        <template #title>
          <div class="ninjadash-card-title-wrap">
            <span class="ninjadash-card-title-text"> Recent Requests </span>
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
              :dataSource="bestSellerData"
              :pagination="false"
            />
          </div>
        </TableDefaultStyle>
      </Cards>
    </BorderLessHeading>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import Cards from "components/cards/frame/CardsFrame.vue";
import { BorderLessHeading, TableDefaultStyle } from "../styled";

import tableData from "../../demoData/table-data.json";

const BestSeller = defineComponent({
  name: "BestSeller",
  components: {
    Cards,
    BorderLessHeading,
    TableDefaultStyle,
  },
  setup() {
    const { bestSeller } = tableData;
    const sellerColumns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },

      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
    ];
    const sellerTab = ref("today");
    const bestSellerData = computed(() => [] );

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
    };
  },
});

export default BestSeller;
</script>
