<template>
  <div>
    <sdPageHeader
      title="Products "
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>
    <Main>
      <div class="flex justify-between my-6">
        <input
          class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2 outline-none focus:border-orange-200"
          placeholder="Search by name"
          v-model="search"
          type="search"
        />
        <div class="flex gap-x-4">
          <ExportButton :data="productsData" />
          <router-link to="/product-management/add">
            <sdButton class="btn-add_new" size="sm" key="1" type="primary">
              <unicon name="plus" width="14"></unicon> Add product
            </sdButton>
          </router-link>
          <router-link to="/product-management/requests">
            <sdButton class="btn-add_new" size="sm" key="1" type="primary">
              View requests
            </sdButton>
          </router-link>
        </div>
      </div>
      <Products />
    </Main>
  </div>
</template>

<script setup>
import { Main } from "../styled";
import ExportButton from "components/ExportButton";
import Products from "components/pageComponents/products/overview/ProductsTable";
import { ref, provide, computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";

const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "products",
    breadcrumbName: "Products",
  },
];
const { state } = useStore();
const search = ref("");
const productsData = computed(() =>
  state.products.data.map((user) => {
    const {
      createdAt,
      isDeleted,
      productDescription,
      productName,
      productType,
    } = user;

    return {
      "Product Name": productName,
      "Product Type": productType?.split(" ")[1],
      Status: isDeleted ? "Yes" : "No",
      description: productDescription,
      created: moment(createdAt).format("ll"),
      status: isDeleted ? "Inactive" : "Active",
    };
  })
);
provide("search", search);
</script>
