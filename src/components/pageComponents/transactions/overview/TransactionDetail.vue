<template>
  <div>
    <div class="flex justify-end mb-6" v-if="profile !== 'customer'">
      <sdButton
        v-if="
          handleDisplay(
            profile.userRole,
            transaction?.transactionStatus?.toLowerCase()
          )
        "
        class=""
        htmlType="button"
        type="primary"
        size="small"
        :disabled="updateloading"
        @click="visible = true"
      >
        Mark as
        {{ handleStatus(transaction?.transactionStatus?.toLowerCase()) }}
      </sdButton>
    </div>
    <div
      v-if="product && !loading && !reqloading"
      class="grid grid-cols-2 gap-6 mb-10"
    >
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Transaction type</span
        >
        <span class="text-base font-medium capitalize">{{
          transaction.transactionType || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Transaction status</span
        >
        <span class="text-base font-medium capitalize">{{
          transaction.transactionStatus || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Product name</span
        >
        <span class="text-base font-medium capitalize">{{
          product?.productName || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500">Amount</span>
        <span class="text-base font-medium capitalize">{{
          formatCurrency(product.amount) || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Request date</span
        >
        <span class="text-base font-medium capitalize">{{
          moment(product.requestDate).format("lll") || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500">Due date</span>
        <span class="text-base font-medium capitalize">{{
          moment(product.dueDate).format("lll") || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Lock-in period</span
        >
        <span class="text-base font-medium capitalize">{{
          product?.lockInPeriod || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Interest rate</span
        >
        <span class="text-base font-medium capitalize">{{
          formatCurrency(product.interestRate) || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Equity contribution</span
        >
        <span class="text-base font-medium capitalize"
          >{{ product?.equityContribution || "-" }}%</span
        >
      </div>
      <div class="col-span-2">
        <span class="block text-sm font-medium text-gray-500">Description</span>
        <span class="text-base font-medium capitalize">{{
          product?.description || "-"
        }}</span>
      </div>
    </div>
    <div>
      <h4 class="col-span-2 text-lg font-bold mb-8">Requirements</h4>
      <div
        v-if="productReq && !loadingReq && !reqloading"
        class="grid grid-cols-2 gap-10 mb-10"
      >
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Business name</span
          >
          <span class="text-base font-medium capitalize">{{
            productReq?.businessName || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Business address</span
          >
          <span class="text-base font-medium capitalize">{{
            productReq?.businessAddress || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Residential address</span
          >
          <span class="text-base font-medium capitalize">{{
            productReq?.residentialAddress || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Use of Funds</span
          >
          <span class="text-base font-medium capitalize">{{
            productReq?.useOfFunds || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Facility amount</span
          >
          <span class="text-base font-medium capitalize">{{
            formatCurrency(productReq?.facilityAmount) || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500"
            >Business type
          </span>
          <span class="text-base font-medium capitalize">{{
            productReq?.businessType || "-"
          }}</span>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-500">BVN</span>
          <span class="text-base font-medium capitalize">{{
            productReq?.bvn || "-"
          }}</span>
        </div>

        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >CAC Document</span
          >
          <span class="text-base font-medium capitalize">{{
            product?.description || "-"
          }}</span>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Business statement</span
          >
          <span class="text-base font-medium capitalize">{{
            product?.description || "-"
          }}</span>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Utility Bill</span
          >
          <span class="text-base font-medium capitalize">{{
            product?.description || "-"
          }}</span>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Identification Document</span
          >
          <span class="text-base font-medium capitalize">{{
            product?.description || "-"
          }}</span>
        </div>
      </div>
    </div>

    <div
      v-if="loading || loadingReq || reqloading"
      class="flex items-center justify-center h-[500px] w-full"
    >
      <a-spin size="large" />
    </div>
  </div>
  <Modal :open="visible" @close="visible = false">
    <div class="bg-white rounded-lg w-[250px]">
      <h3 class="text-xl font-bold mb-6">Confirm this action</h3>
      <p class="mb-8">
        Are you sure about changing the status to
        <span class="uppercase">{{
          handleStatus(transaction?.transactionStatus?.toLowerCase())
        }}</span
        >?
      </p>
      <div class="flex justify-between">
        <sdButton
          :disabled="updateloading"
          @click="visible = false"
          size="sm"
          key="1"
          type="light"
        >
          Cancel
        </sdButton>
        <sdButton
          class=""
          size="sm"
          key="1"
          type="success"
          @click="handleUpdate"
          >{{ updateloading ? "Processing..." : "Confirm" }}
        </sdButton>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import Modal from "components/Modal";
import { useStore } from "vuex";
import { computed, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
import { formatCurrency } from "@/utility/formatCurrency";
import { message } from "ant-design-vue";

function handleStatus(status) {
  if (status === "pending") {
    return "reviewed";
  }
  if (status === "reviewed") {
    return "approved";
  }
  if (status === "approved") {
    return "underwritten";
  }
  return "";
}

const visible = ref(false);
const route = useRoute();
const query = {
  pageNumber: 1,
  pageSize: 100000,
  name: "",
};
const { state, dispatch } = useStore();
const product = computed(() => state.requests.request);
const productReq = computed(() => state.requests.reqData[0]);
const transaction = computed(() => state.transactions.transaction);
const profile = computed(() => state.auth.userData);
const success = computed(() => state.transactions.getsuccess);
const updatesuccess = computed(() => state.transactions.updatesuccess);
const updateloading = computed(() => state.transactions.updateloading);
const loading = computed(() => state.transactions.getloading);
const reqloading = computed(() => state.requests.getloading);
const loadingReq = computed(() => state.requests.getreqloading);

onMounted(() => {
  if (route.params.id) {
    dispatch("getTransactionById", route.params.id);
  }
});
watch(success, () => {
  transaction.value.userProductId &&
    dispatch("getUserProductById", transaction.value.userProductId);
  transaction.value.userProductId &&
    dispatch("getUserProductRequirements", {
      ...query,
      userproductId: transaction.value.userProductId,
    });
});
watch(updatesuccess, () => {
  dispatch("getTransactionById", route.params.id);
  visible.value = false;
  message.success("Status update successful");
});
function handleUpdate() {
  dispatch("updateTransaction", {
    transactionId: parseInt(route.params.id),
    status: handleStatus(transaction?.value?.transactionStatus?.toLowerCase()),
  });
}

function handleDisplay(role, status) {
  if (role?.toLowerCase() === "reviewer" && status === "pending") {
    return true;
  }
  if (role?.toLowerCase() === "approver" && status === "reviewed") {
    return true;
  }
  if (role?.toLowerCase() === "underwritter" && status === "approved") {
    return true;
  }
  return false;
}
</script>
