<template>
  <div>
    <sdPageHeader
      title="Check-Out our products"
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>
    <Main>
      <a-row justify="center">
        <a-col :sm="24">
          <sdCards headless>
            <div>
              <a-form
                name="requests"
                :model="formState"
                @finish="handleSubmit"
                layout="vertical"
                class="md:grid grid-cols-1 md:grid-cols-2 md:gap-y-0 md:gap-x-8"
              >
                <a-form-item
                  class="mb-10"
                  name="type"
                  label="Choose a type"
                  :rules="[
                    { required: true, message: 'Please select a product!' },
                  ]"
                >
                  <a-select
                    class="capitalize"
                    v-model:value="formState.type"
                    size="large"
                  >
                    <a-select-option value="">Please Select</a-select-option>

                    <a-select-option class="capitalize" value="loans"
                      >Apply for credit</a-select-option
                    >
                    <a-select-option class="capitalize" value="savings"
                      >Save</a-select-option
                    >
                  </a-select>
                </a-form-item>

                <a-form-item
                  class="mb-10"
                  name="productId"
                  label="Choose a product"
                  :rules="[
                    { required: true, message: 'Please select a product!' },
                  ]"
                >
                  <a-select
                    class="capitalize"
                    v-model:value="formState.productId"
                    size="large"
                    :disabled="formState.type === ''"
                  >
                    <a-select-option value=""
                      >Please Select one</a-select-option
                    >

                    <a-select-option
                      class="capitalize"
                      v-for="p in products"
                      :key="p.id"
                      :value="p.id.toString()"
                      >{{ p.productName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>

                <div
                  class="col-span-2"
                  v-if="
                    formState.type && formState.productId && !productLoading
                  "
                >
                  <h2 class="font-bold mb-7">Product detail</h2>
                  <BasicFormWrapper
                    class="ninjadash-authentication-content col-span-2 mb-10"
                  >
                    <div
                      class="col-span-2 md:grid grid-cols-1 md:grid-cols-2 md:gap-x-8 mb-8"
                    >
                      <a-form-item
                        label="Lock-in Period"
                        name="lockInPeriod"
                        :rules="[
                          { required: true, message: 'Please select a value!' },
                        ]"
                      >
                        <a-select
                          size="large"
                          v-model:value="formState.lockInPeriod"
                        >
                          <a-select-option value=""
                            >Please Select</a-select-option
                          >
                          <a-select-option
                            v-for="t in filteredTenure"
                            :key="t.title"
                            :value="t.value"
                            >{{ t.title }}</a-select-option
                          >
                        </a-select>
                      </a-form-item>
                      <a-form-item
                        label="Amount"
                        name="amount"
                        :rules="[
                          {
                            required: true,
                            message: 'Please input an amount!',
                          },

                          {
                            validator: checkAmountRange,
                            message: `Amount range is ${formatCurrency(
                              minAmount
                            )} - ${formatCurrency(maxAmount)}`,
                          },
                        ]"
                      >
                        <a-input-number
                          v-model:value="formState.amount"
                          :formatter="
                            (value) =>
                              `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          "
                          :parser="(value) => value.replace(/\₦\s?|(,*)/g, '')"
                        />
                      </a-form-item>
                      <a-form-item
                        label="Upfront fee"
                        v-if="formState.type !== 'savings'"
                      >
                        <a-input-number
                          :value="upfrontFeesAmount"
                          :formatter="
                            (value) =>
                              `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          "
                          :parser="(value) => value.replace(/\₦\s?|(,*)/g, '')"
                        />
                      </a-form-item>
                      <a-form-item
                        v-if="
                          (productDetail?.length &&
                            productDetail[0]?.productName?.toLowerCase() !==
                              'interest free credit') ||
                          formState.type === 'savings'
                        "
                        label="Interest rate"
                        name="interestRate"
                        :rules="[
                          {
                            required: true,
                            message: 'Please input an Interest rate!',
                          },
                        ]"
                      >
                        <a-input-number
                          :value="interestRateAmount"
                          :formatter="
                            (value) =>
                              `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          "
                          :parser="(value) => value.replace(/\₦\s?|(,*)/g, '')"
                        />
                      </a-form-item>

                      <a-form-item
                        v-if="
                          productDetail?.length &&
                          productDetail[0]?.productName?.toLowerCase() ===
                            'asset finance'
                        "
                        label="Equity Contribution"
                        name="equityContribution"
                        :rules="[
                          {
                            required: true,
                            message: 'Please input a value!',
                          },
                        ]"
                      >
                        <a-input-number
                          :value="formState.amount - equityAmount"
                          :formatter="
                            (value) =>
                              `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          "
                          :parser="(value) => value.replace(/\₦\s?|(,*)/g, '')"
                        />
                      </a-form-item>
                      <a-form-item
                        label="Request date"
                        name="requestDate"
                        class="w-full"
                        :rules="[
                          {
                            required: true,
                            message: 'Please select a date!',
                          },
                          {
                            validator: checkRequestDate,
                            message: 'Lock-in Period is required',
                          },
                        ]"
                      >
                        <a-date-picker
                          inputReadOnly
                          class="w-full"
                          v-model:value="formState.requestDate"
                        />
                      </a-form-item>
                      <a-form-item
                        label="Due date"
                        name="dueDate"
                        :rules="[
                          {
                            required: true,
                            message: 'Please select a date!',
                          },
                        ]"
                      >
                        <a-date-picker
                          :disabled-date="disabledDate"
                          class="w-full !text-[#404040] duedate"
                          v-model:value="formState.dueDate"
                          disabled
                        />
                      </a-form-item>

                      <a-form-item
                        class="col-span-2"
                        label="Description"
                        name="description"
                        :rules="[
                          {
                            required: true,
                            message: 'Please provide a description!',
                          },
                        ]"
                      >
                        <a-textarea v-model:value="formState.description" />
                      </a-form-item>
                    </div>
                  </BasicFormWrapper>
                  <h2 class="font-bold mb-7 col-span-2">Requirements</h2>
                  <div
                    class="mb-8 col-span-2 md:grid grid-cols-1 md:grid-cols-2 md:gap-x-8"
                  >
                    <a-form-item
                      label="Use of funds"
                      name="useOfFunds"
                      :rules="[
                        { required: true, message: 'Please input a value!' },
                      ]"
                    >
                      <a-input
                        v-model:value="formState.useOfFunds"
                        placeholder="Use of funds"
                      />
                    </a-form-item>

                    <a-form-item
                      label="Business Name"
                      name="businessName"
                      :rules="[
                        {
                          required: true,
                          message: 'Please input your business name!',
                        },
                      ]"
                    >
                      <a-input
                        v-model:value="formState.businessName"
                        placeholder="Business name"
                      />
                    </a-form-item>
                    <a-form-item
                      label="Business address"
                      name="businessAddress"
                      :rules="[
                        {
                          required: true,
                          message: 'Please input your business address!',
                        },
                      ]"
                    >
                      <a-input
                        v-model:value="formState.businessAddress"
                        placeholder="Business address"
                      />
                    </a-form-item>
                    <a-form-item
                      label="Residential address"
                      name="residentialAddress"
                      :rules="[
                        {
                          required: true,
                          message: 'Please input your Residential address!',
                        },
                      ]"
                    >
                      <a-input
                        v-model:value="formState.residentialAddress"
                        placeholder="Residential Address"
                      />
                    </a-form-item>
                    <a-form-item
                      label="What type of Business are you into?"
                      name="businessType"
                      :rules="[
                        {
                          required: true,
                          message: 'Please select your buiness type!',
                        },
                      ]"
                    >
                      <a-select
                        size="large"
                        v-model:value="formState.businessType"
                      >
                        <a-select-option value=""
                          >Please Select</a-select-option
                        >
                        <a-select-option
                          v-for="it in businessTypesInNigeria"
                          :key="it"
                          :value="it"
                          >{{ it }}</a-select-option
                        >
                      </a-select>
                    </a-form-item>
                    <a-form-item
                      label="Enter your BVN"
                      name="bvn"
                      :rules="[
                        { required: true, message: 'Please input your BVN!' },
                        { max: 11 },
                        { min: 11 },
                      ]"
                    >
                      <a-input v-model:value="formState.bvn" placeholder="" />
                    </a-form-item>
                  </div>
                  <div class="col-span-2">
                    <h4 class="font-medium mb-3">Document uploads</h4>
                    <div
                      class="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-2"
                    >
                      <a-form-item
                        name="cacDocumentUrl"
                        :rules="[
                          { required: true, message: 'Please upload your Cac' },
                        ]"
                      >
                        <a-upload
                          :max-count="1"
                          v-model:file-list="cacList"
                          name="cacDocumentUrl"
                          :before-upload="() => false"
                          @change="(e) => handleChange(e, 'cac')"
                        >
                          <a-button>
                            <upload-outlined class="mt-0"></upload-outlined>
                            Upload your CAC Documents
                          </a-button>
                        </a-upload>
                      </a-form-item>

                      <a-form-item
                        name="statementUrl"
                        :rules="[
                          {
                            required: true,
                            message:
                              'Please upload your 1-year account statement!',
                          },
                        ]"
                      >
                        <a-upload
                          :max-count="1"
                          v-model:file-list="statementList"
                          name="statementUrl"
                          :before-upload="() => false"
                          @change="(e) => handleChange(e, 'statement')"
                        >
                          <a-button>
                            <upload-outlined></upload-outlined>
                            Upload your 1-year account statement.
                          </a-button>
                        </a-upload>
                      </a-form-item>
                      <a-form-item
                        name="identificationUrl"
                        :rules="[
                          {
                            required: true,
                            message:
                              'Please upload a valid means of identification!',
                          },
                        ]"
                      >
                        <a-upload
                          :max-count="1"
                          name="identificationUrl"
                          v-model:file-list="idList"
                          :before-upload="() => false"
                          @change="(e) => handleChange(e, 'id')"
                        >
                          <a-button>
                            <upload-outlined></upload-outlined>
                            Upload valid means of identification
                          </a-button>
                        </a-upload>
                      </a-form-item>
                      <a-form-item
                        name="utilityBillUrl"
                        :rules="[
                          {
                            required: true,
                            message: 'Please upload your Utility Bill!',
                          },
                        ]"
                      >
                        <a-upload
                          :max-count="1"
                          v-model:file-list="utilityList"
                          name="utilityBillUrl"
                          :before-upload="() => false"
                          @change="(e) => handleChange(e, 'utility')"
                        >
                          <a-button>
                            <upload-outlined></upload-outlined>
                            Upload Utility Bill
                          </a-button>
                        </a-upload>
                      </a-form-item>
                    </div>
                  </div>

                  <div class="col-span-2 flex justify-center my-4">
                    <sdButton
                      class="btn-create w-full max-w-[250px] mx-auto"
                      htmlType="submit"
                      type="primary"
                      size="lg"
                      :disabled="isLoading"
                    >
                      {{ isLoading ? "Processing" : "Submit request" }}
                    </sdButton>
                  </div>
                </div>
              </a-form>
              <div
                v-if="productLoading"
                class="w-full h-[400px] flex items-center justify-center"
              >
                <a-spin size="large" />
              </div>
            </div>
          </sdCards>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>
<script setup>
import { Main } from "../styled";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import { onMounted, computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { formatCurrency } from "@/utility/formatCurrency";
import { useRouter } from "vue-router";
import { BasicFormWrapper } from "../styled";
import dayjs from "dayjs";
import { businessTypesInNigeria } from "@/utility/constant";

const router = useRouter();
onMounted(() => {
  dispatch("getProducts", query);
});

const query = reactive({
  pageNumber: 1,
  pageSize: 100000000,
  name: "",
});
const { state, dispatch } = useStore();
const tenureOptions = [
  {
    title: "3 months",
    value: 3,
  },
  {
    title: "6 months",
    value: 6,
  },
  {
    title: "12 months",
    value: 12,
  },
];
const products = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  formState.productId = "";
  return state.products.data.filter((i) =>
    i?.productType?.toLowerCase().includes(formState?.type?.toLowerCase())
  );
});
const values = ref(null);
const uploadtype = ref("");
const fileId = computed(() => state.file.data);
const minAmount = ref(1);
const maxAmount = ref(10000);
const upfrontFeePercent = ref(0);
const interestRatePercent = ref(0);
const equityPercent = ref(0);
const filteredTenure = computed(() => {
  if (
    productDetail?.value?.productName?.toLowerCase() === "interest free credit"
  ) {
    return tenureOptions.filter((i) => i.value <= 3);
  }
  if (
    productDetail?.value?.productName?.toLowerCase() ===
    "working capital finance"
  ) {
    return tenureOptions.filter((i) => i.value <= 6);
  }
  if (productDetail?.value?.productName?.toLowerCase() === "asset finance") {
    return tenureOptions.filter((i) => i.value <= 6);
  }
  return tenureOptions;
});
const productDetail = computed(() => state?.products?.product);
const productLoading = computed(() => state?.products?.loading);
const isLoading = computed(() => state.requests.addloading);
const addsuccess = computed(() => state.requests.addsuccess);
const userData = computed(() => state.auth.userData);
const uploadsuccess = computed(() => state.file.success);
const upfrontFeesAmount = computed(() => {
  if (!formState.amount || !formState.productId) return 0;
  let calc;
  if (productDetail?.value?.productName?.toLowerCase() === "asset finance") {
    calc = equityAmount.value * (upfrontFeePercent.value / 100);
  } else {
    calc = formState.amount * (upfrontFeePercent.value / 100);
  }
  return calc;
});
const interestRateAmount = computed(() => {
  if (!formState.amount || !formState.productId || !formState.lockInPeriod)
    return 0;
  let calc;
  if (productDetail?.value?.productName?.toLowerCase() === "asset finance") {
    calc =
      equityAmount.value *
      (interestRatePercent.value / 100) *
      formState.lockInPeriod;
  } else {
    calc =
      formState.amount *
      (interestRatePercent.value / 100) *
      formState.lockInPeriod;
  }
  return calc;
});
const equityAmount = computed(() => {
  if (!formState.amount || !formState.productId) return 0;
  const calc = formState.amount * (equityPercent.value / 100);
  const mainAmt = formState.amount - calc;
  return mainAmt;
});

const handleSubmit = (value) => {
  values.value = value;
  dispatch("addUserProduct", {
    ...formState,
    facilityAmount: formState.facilityAmount.toString(),
  });
};

const utilityList = ref([]);
const cacList = ref([]);
const idList = ref([]);
const statementList = ref([]);
const formState = reactive({
  type: "",
  userId: userData.value.id,
  productId: "",
  facilityAmount: null,
  useOfFunds: "",
  businessName: "",
  businessAddress: "",
  residentialAddress: "",
  businessType: "",
  bvn: "",
  cacDocumentUrl: "null",
  statementUrl: "null",
  identificationUrl: "null",
  utilityBillUrl: "null",
  alumniCode: "",
  alumni: false,
  amount: null,
  requestDate: null,
  equityContribution: null,
  lockInPeriod: "",
  interestRate: null,
  dueDate: null,
  description: "",
});

const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "/services",
    breadcrumbName: "Services",
  },
  {
    path: "#",
    breadcrumbName: "Check-Out our products",
  },
];
const handleChange = (data, type) => {
  const file = data?.file;

  const allowedTypes = [
    "image/svg+xml",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  if (!allowedTypes.includes(file.type)) {
    message.error(
      `${file.name} is not a valid image file (SVG, JPEG, JPG, PNG allowed)`
    );
  }
  if (file.size > 800 * 1024) {
    // 800KB = 800 * 1024 bytes
    message.error(`${file.name} exceeds the maximum file size (800KB)`);
    return false; // Prevent the upload
  }

  const formData = new FormData();
  formData.append("file", file);
  uploadtype.value = type;
  dispatch("uploadFile", {
    userId: userData.value.id,
    fileType: "product",
    formData,
  });

  return false;
};
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};
const checkAmountRange = (rule, value, callback) => {
  if (value >= minAmount.value && value <= maxAmount.value) {
    callback(); // Pass validation
  } else {
    callback("Invalid amount range"); // Fail validation
  }
};
const checkRequestDate = (rule, value, callback) => {
  if (!formState.lockInPeriod) {
    formState.requestDate = null;
    callback(new Error("Lock-in Period is required"));
  } else {
    callback(); // Pass validation
  }
};
watch(
  () => formState.productId,
  () => {
    formState.productId &&
      dispatch("getProductDetails", {
        ...query,
        productId: formState.productId,
      });
  }
);
watch(productDetail, () => {
  if (productDetail?.value?.length) {
    minAmount.value = productDetail?.value[0]?.minAmount;
    maxAmount.value = productDetail?.value[0]?.maxAmount;
    interestRatePercent.value = productDetail?.value[0]?.interestRate;
    upfrontFeePercent.value = productDetail?.value[0]?.upfrontFees;
    equityPercent.value = productDetail?.value[0]?.equityContribution;
  }
});
watch(addsuccess, () => {
  if (addsuccess.value) {
    message.success("Request creation successful!");
    router.push("/services");
  }
});
watch(
  () => formState.requestDate,
  () => {
    if (formState.requestDate) {
      const dueDate = moment(formState?.requestDate)
        .add(formState?.lockInPeriod, "months")
        .format("ll");

      formState.dueDate = dayjs(dueDate);
    }
  }
);
watch(uploadsuccess, () => {
  if (uploadtype.value === "cac") {
    formState.cacDocumentUrl = fileId.value.toString();
    return;
  }
  if (uploadtype.value === "id") {
    formState.identificationUrl = fileId.value.toString();
    return;
  }
  if (uploadtype.value === "utility") {
    formState.utilityBillUrl = fileId.value.toString();
    return;
  }
  if (uploadtype.value === "statement") {
    formState.statementUrl = fileId.value.toString();
    return;
  }
});
</script>

<style>
#requests_dueDate {
  color: #404040 !important;
}
</style>
