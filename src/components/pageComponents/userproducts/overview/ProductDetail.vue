<template>
  <div>
    <div v-if="product && !loading" class="grid grid-cols-2 gap-6 mb-6">
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Product name</span
        >
        <span class="text-base font-medium capitalize">{{
          product.productName || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Relationship manager</span
        >
        <span class="text-base font-medium capitalize">{{
          product?.relationshipManager || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500">Assigned by</span>
        <span class="text-base font-medium capitalize">{{
          product?.assignedBy || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500">Amount</span>
        <span class="text-base font-medium capitalize">{{
          formatCurrency(product.amount, product?.currency) || "-"
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
          >{{ product.lockInPeriod }} days</span
        >
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500">Interest</span>
        <span class="text-base font-medium capitalize">{{
          formatCurrency(product.interestRate, product?.currency) || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Equity contribution</span
        >
        <span class="text-base font-medium capitalize">{{
          formatCurrency(product.equityContribution, product?.currency)
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500">Upfront Fee</span>
        <span class="text-base font-medium capitalize">{{
          formatCurrency(product.upfrontFee, product?.currency)
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Active Email</span
        >
        <span class="text-base font-medium">{{
          product?.activeEmail || "-"
        }}</span>
      </div>
      <div>
        <span class="block text-sm font-medium text-gray-500"
          >Active phone</span
        >
        <span class="text-base font-medium capitalize">{{
          product?.activePhone || "-"
        }}</span>
      </div>
    </div>
    <hr class="border-gray-100 my-6" />
    <div v-if="productReq">
      <h4 class="col-span-2 text-lg font-bold mb-6">Requirements</h4>
      <div class="grid grid-cols-2 gap-6 mb-6">
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
            formatCurrency(productReq?.facilityAmount, product?.currency) || "-"
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
            <span class="text-base font-medium capitalize text-blue-600"
              >Download</span
            >
          </button>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Business statement</span
          >
          <button @click="handleFileDownload(productReq?.statementUrl)">
            <span class="text-base font-medium capitalize text-blue-600"
              >Download</span
            >
          </button>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Utility Bill</span
          >
          <button @click="handleFileDownload(productReq?.utilityBillUrl)">
            <span class="text-base font-medium capitalize text-blue-600"
              >Download</span
            >
          </button>
        </div>
        <div class="">
          <span class="block text-sm font-medium text-gray-500"
            >Identification Document</span
          >
          <button @click="handleFileDownload(productReq?.identificationUrl)">
            <span class="text-base font-medium capitalize text-blue-600"
              >Download</span
            >
          </button>
        </div>
      </div>
    </div>
    <hr class="border-gray-100 my-6" />
    <div v-if="additional && additional.length">
      <h4 class="col-span-2 text-lg font-bold mb-6">Additional Detail</h4>
      <div class="grid grid-cols-2 gap-6 mb-10">
        <div v-for="(n, id) in additional" :key="id">
          <div>
            <span class="block text-sm font-medium text-gray-500">{{
              n.label
            }}</span>

            <button
              v-if="n.type == 'file'"
              @click="handleFileDownload(n?.value)"
            >
              <span class="text-base font-medium capitalize text-blue-600"
                >Download</span
              >
            </button>

            <span v-else class="text-base font-medium capitalize">{{
              n?.value || "-"
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="loading"
      class="flex items-center justify-center h-[500px] w-full"
    >
      <a-spin size="large" />
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
import { formatCurrency } from "@/utility/formatCurrency";
import { downloadBase64File } from "@/utility/downloadBase64File";

const query = {
  pageNumber: 1,
  pageSize: 100000,
  name: "",
};
const route = useRoute();
const { state, dispatch } = useStore();
const product = computed(() => state.requests.request);
const productReq = computed(() => state.requests.reqData[0]);
const additional = computed(() => state.requests.additionalreqfield);
const loading = computed(() => state.requests.getloading);
// const loadingReq = computed(() => state.requests.getreqloading);
const filesuccess = computed(() => state.file.success);
const filedata = computed(() => state.file.data);

onMounted(() => {
  if (route.params.id) {
    dispatch("getUserProductById", route.params.id);
    dispatch("getAdditionalUserProduct", { id: route.params.id });
    dispatch("getUserProductRequirements", {
      ...query,
      userproductId: route.params.id,
    });
  }
});
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
    }
  }
);
</script>
