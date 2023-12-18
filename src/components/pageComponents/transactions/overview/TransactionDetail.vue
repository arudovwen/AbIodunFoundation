<template>
  <div>
    <div class="flex justify-end mb-6 gap-x-4" v-if="profile !== 'customer'">
      <sdButton
        v-if="
          handleDisplay(
            profile.userRole,
            transaction?.transactionStatus?.toLowerCase()
          )
        "
        class="capitalize"
        htmlType="button"
        type="danger"
        size="sm"
        :disabled="updateloading"
        @click="
          visible = true;
          type = 'reject';
        "
      >
        Reject
      </sdButton>
      <sdButton
        v-if="
          handleDisplay(
            profile.userRole,
            transaction?.transactionStatus?.toLowerCase()
          )
        "
        class="capitalize"
        htmlType="button"
        type="success"
        size="sm"
        :disabled="updateloading"
        @click="
          visible = true;
          type = 'approve';
        "
      >
        Approve
      </sdButton>
    </div>
    <div
      v-if="product && transaction && !loading && !reqloading"
      class="grid grid-cols-2 gap-6 mb-10"
    >
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Transaction type</span
        >
        <span
          :class="`text-base font-medium capitalize `"
          >{{ transaction?.transactionType || "-" }}</span
        >
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Transaction status</span
        >
        <span  :class="`text-base font-medium capitalize ${
            transaction?.transactionStatus === 'rejected'
              ? 'text-red-600'
              : transaction?.transactionStatus === 'pending'
              ? 'text-gray-600'
              : 'text-green-600'
          }`">{{
          transaction.transactionStatus || "-"
        }}</span>
      </div>
      <div
        v-if="
          transaction.reason &&
          transaction?.transactionStatus.toLowerCase() === 'rejected'
        "
      >
        <span class="block text-sm font-medium text-gray-500"
          >Reason for rejection</span
        >
        <span class="text-base font-medium capitalize">{{
          transaction.reason || "-"
        }}</span>
      </div>
      <div
        v-if="
          transaction.rejectedDate &&
          transaction?.transactionStatus.toLowerCase() === 'rejected'
        "
      >
        <span class="block text-sm font-medium text-gray-500"
          >Rejection date</span
        >
        <span class="text-base font-medium capitalize">{{
          moment(product.rejectedDate).format("ll") || "-"
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
          moment(product.requestDate).format("ll") || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500">Due date</span>
        <span class="text-base font-medium capitalize">{{
          moment(product.dueDate).format("ll") || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Lock-in period</span
        >
        <span class="text-base font-medium capitalize"
          >{{ product?.lockInPeriod }} months</span
        >
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Interest rate</span
        >
        <span class="text-base font-medium capitalize">{{
          formatCurrency(product.interestRate)
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500">Upfront Fee</span>
        <span class="text-base font-medium capitalize">{{
          formatCurrency(product.upfrontFee)
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Equity contribution</span
        >
        <span class="text-base font-medium capitalize">{{
          formatCurrency(product?.equityContribution)
        }}</span>
      </div>
      <!-- <div class="col-span-2">
        <span class="block text-sm font-medium text-gray-500">Description</span>
        <span class="text-base font-medium capitalize">{{
          product?.description || "-"
        }}</span>
      </div> -->
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
          <span class="block text-sm font-medium text-gray-500">Amount</span>
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
          <button @click="handleFileDownload(productReq?.cacDocumentUrl)">
            <span class="text-base font-medium capitalize">Download</span>
          </button>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Business statement</span
          >
          <button @click="handleFileDownload(productReq?.statementUrl)">
            <span class="text-base font-medium capitalize">Download</span>
          </button>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Utility Bill</span
          >
          <button @click="handleFileDownload(productReq?.utilityBillUrl)">
            <span class="text-base font-medium capitalize">Download</span>
          </button>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Identification Document</span
          >
          <button @click="handleFileDownload(productReq?.identificationUrl)">
            <span class="text-base font-medium capitalize">Download</span>
          </button>
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
      <p class="mb-6">Are you sure you want to {{ type }} this transaction?</p>
      <a-form-item
        v-if="type === 'reject'"
        name="reason"
        label="Provide your reason"
      >
        <a-textarea
          :rows="5"
          placeholder="Please input your reason for this rejection!"
          v-model:value="reject"
        />
      </a-form-item>
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
import { downloadBase64File } from "@/utility/downloadBase64File";

const reject = ref("");
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
const type = ref("");
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
const filesuccess = computed(() => state.file.success);
const filedata = computed(() => state.file.data);

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
    status:
      type.value === "approve"
        ? handleStatus(transaction?.value?.transactionStatus?.toLowerCase())
        : "rejected",
    reason: reject.value,
  });
}

function handleDisplay(role, status) {
  
  if (role?.toLowerCase() === "reviewer" && status === "pending") {
    return true;
  }
  if (role?.toLowerCase() === "approver" && status === "reviewed") {
    return true;
  }
  if (role?.toLowerCase() === "underwriter" && status === "approved") {
    return true;
  }
  return false;
}
function handleFileDownload(id) {
  dispatch("getFileId", id);
}

watch(
  () => filesuccess.value,
  () => {
    if (filesuccess.value) {
      downloadBase64File(
        filedata.value.fileBase64,
        "file",
        filedata.value.contentType
      );

      message.success("Download successful");
    }
  }
);
</script>
