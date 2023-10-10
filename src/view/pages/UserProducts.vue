<template>
  <div>
    <sdPageHeader
      title="Services "
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>

    <Main v-if="profile.userRole === 'customer'">
      <div class="flex justify-between my-6">
        <input
          class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2"
          placeholder="Search description"
          v-model="search"
        />
        <div v-if="profile.userRole === 'customer'">
          <router-link to="/service/request">
            <sdButton
              @click="visible = true"
              class="btn-add_new"
              size="default"
              key="1"
              type="primary"
            >
              Request service
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
import Products from "components/pageComponents/userproducts/overview/ProductsTable";
import { ref, provide, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const { state } = useStore();
const profile = computed(() => state.auth.userData);
const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "services",
    breadcrumbName: "Services",
  },
];
const search = ref("");

onBeforeMount(() => {
  if (profile.value.userRole !== "customer") {
    router.push("/");
  }
});
provide("search", search);
</script>
