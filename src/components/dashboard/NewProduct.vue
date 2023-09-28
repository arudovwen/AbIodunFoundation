<template>
  <div class="full-width-table">
    <BorderLessHeading>
      <Cards>
        <template #title>
          <div class="ninjadash-card-title-wrap">
            <span class="ninjadash-card-title-text"> Recent Products </span>
          </div>
        </template>
        <!-- <template #button>
          <div class="ninjadash-card-nav">
            <ul>
              <li
                :class="
                  productTab === 'today'
                    ? 'ninjadash-active'
                    : 'ninjadash-today'
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
                  productTab === 'week' ? 'ninjadash-active' : 'ninjadash-week'
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
                  productTab === 'month'
                    ? 'ninjadash-active'
                    : 'ninjadash-month'
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
        <TableDefaultStyle class="ninjadash-having-header-bg">
          <NewProductWrapper>
            <div className="table-responsive">
              <a-table
              :loading="loading"
                :columns="productColumns"
                :dataSource="newProductData"
                :pagination="false"
              />
            </div>
          </NewProductWrapper>
        </TableDefaultStyle>
      </Cards>
    </BorderLessHeading>
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  onMounted,

  reactive,

  ref,
} from "vue";
import { useStore } from "vuex";
import Cards from "components/cards/frame/CardsFrame.vue";
import { NewProductWrapper } from "./style";
import { BorderLessHeading, TableDefaultStyle } from "../styled";

import tableData from "../../demoData/table-data.json";

const NewProducts = defineComponent({
  name: "NewProducts",
  components: {
    Cards,
    NewProductWrapper,
    BorderLessHeading,
    TableDefaultStyle,
  },
  setup() {
    const query = reactive({
      pageNumber: 1,
      pageSize: 5,
      name: "",
    });
    const { state, dispatch } = useStore();
    const loading = computed(() => state.products.loading);

    onMounted(() => {
      dispatch("getProducts", query);
    });

    const { newProduct } = tableData;
    const productColumns = [
      {
        title: "Product Name",
        dataIndex: "productName",
        key: "productName",
      },
      {
        title: "Product Type",
        dataIndex: "productType",
        key: "productType",
      },
    ];
    const productTab = ref("today");

    const newProductData = computed(() =>
      state.products.data.map((user) => {
        const {
          id,

          productName,
          productType,
        } = user;

        return {
          key: id,
          productid: id,
          productName,
          productType: <span class="capitalize">{productType}</span>,
        };
      })
    );

    const handleTabActivation = (event, value) => {
      event.preventDefault();
      productTab.value = value;
    };

    return {
      handleTabActivation,
      newProduct,
      productColumns,
      productTab,
      newProductData,loading
    };
  },
});

export default NewProducts;
</script>
