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
        <a-col class="w-full">
          <sdCards headless>
            <div>
              <a-form
                name="requests"
                :model="formState"
                @finish="handleSubmit"
                @finishFailed="onFinishFailed"
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
                    formState.type &&
                    formState.productId &&
                    !productLoading &&
                    !prodloading
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
                        class="col-span-2"
                        label="Lock-in Period"
                        name="lockInPeriod"
                        :rules="[
                          { required: true, message: 'Please select a value!' },
                        ]"
                      >
                        <!-- <a-select
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
                        </a-select> -->

                        <a-checkbox
                          readonly
                          :checked="formState.lockInPeriod !== null"
                        >
                          {{ productDetail[0]?.lockInPeriod }} month(s)
                        </a-checkbox>
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
                              `${productD?.currency || 'NGN'} ${value}`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ','
                              )
                          "
                          :parser="
                            (value) =>
                              parseAmount(value, productD?.currency || 'NGN')
                          "
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
                              `${productD?.currency || 'NGN'} ${value}`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ','
                              )
                          "
                          :parser="
                            (value) =>
                              parseAmount(value, productD?.currency || 'NGN')
                          "
                        />
                      </a-form-item>
                      <a-form-item
                        v-if="
                          (productDetail?.length &&
                            productDetail[0]?.productName?.toLowerCase() !==
                              'ifc loans') ||
                          formState.type === 'savings'
                        "
                        label="Interest"
                        name="interestRate"
                      >
                        <a-input-number
                          :value="interestRateAmount"
                          :formatter="
                            (value) =>
                              `${productD?.currency || 'NGN'} ${value}`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ','
                              )
                          "
                          :parser="
                            (value) =>
                              parseAmount(value, productD?.currency || 'NGN')
                          "
                        />
                      </a-form-item>

                      <a-form-item
                        v-if="
                          productDetail?.length &&
                          productDetail[0]?.productName?.toLowerCase() ===
                            'af loans'
                        "
                        label="Equity Contribution"
                        name="equityContribution"
                      >
                        <a-input-number
                          :value="formState.amount - equityAmount"
                          :formatter="
                            (value) =>
                              `${productD?.currency || 'NGN'} ${value}`.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ','
                              )
                          "
                          :parser="
                            (value) =>
                              parseAmount(value, productD?.currency || 'NGN')
                          "
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
                          :disabled-date="disabledDate"
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
                    </div>
                  </BasicFormWrapper>
                  <h2 class="font-bold mb-7 col-span-2">Requirements</h2>
                  <div
                    class="mb-8 col-span-2 md:grid grid-cols-1 md:grid-cols-2 md:gap-x-8"
                  >
                    <a-form-item
                      v-if="formState.type.includes('loans')"
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
                      v-if="formState.type.includes('loans')"
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
                      v-if="formState.type.includes('loans')"
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
                      label="Active Phone number"
                      name="activePhone"
                      :rules="[
                        {
                          required: true,
                          message: 'Please provide your an phone number!',
                        },
                      ]"
                    >
                      <a-input
                        v-model:value="formState.activePhone"
                        placeholder=""
                      />
                    </a-form-item>
                    <a-form-item
                      label="Active E-mail"
                      name="activeEmail"
                      :rules="[
                        {
                          required: true,
                          message: 'Please provide an active emal!',
                        },
                      ]"
                    >
                      <a-input
                        v-model:value="formState.activeEmail"
                        placeholder=""
                        type="email"
                      />
                    </a-form-item>
                    <a-form-item
                      v-if="formState.type.includes('loans')"
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
                      v-if="formState.type.includes('loans')"
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
                      v-if="formState.type === 'savings'"
                      label="Occupation"
                      name="occupation"
                      :rules="[
                        {
                          required: true,
                          message: 'Please provide your occupation!',
                        },
                      ]"
                    >
                      <a-input
                        v-model:value="formState.occupation"
                        placeholder="What's your occupation?"
                      />
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
                      <a-input
                        v-model:value="formState.bvn"
                        placeholder="Enter your 11 digit BVN"
                      />
                    </a-form-item>
                  </div>
                  <div class="col-span-2">
                    <h4 class="font-medium mb-3">Document uploads</h4>
                    <div
                      class="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-2"
                    >
                      <a-form-item
                        v-if="formState.type.includes('loans')"
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
                            <upload-outlined
                              v-if="!loading || uploadtype !== 'cac'"
                            ></upload-outlined>
                            <loading-outlined
                              v-if="loading && uploadtype === 'cac'"
                            ></loading-outlined>
                            Upload your CAC Documents
                          </a-button>
                        </a-upload>
                      </a-form-item>

                      <a-form-item
                        v-if="formState.type.includes('loans')"
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
                            <upload-outlined
                              v-if="!loading || uploadtype !== 'statement'"
                            ></upload-outlined>
                            <loading-outlined
                              v-if="loading && uploadtype === 'statement'"
                            ></loading-outlined>
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
                          class="w-full"
                          v-model:file-list="idList"
                          :before-upload="() => false"
                          @change="(e) => handleChange(e, 'id')"
                        >
                          <a-button>
                            <upload-outlined
                              v-if="!loading || uploadtype !== 'id'"
                            ></upload-outlined>
                            <loading-outlined
                              v-if="loading && uploadtype === 'id'"
                            ></loading-outlined>
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
                          class="w-full"
                          :before-upload="() => false"
                          @change="(e) => handleChange(e, 'utility')"
                        >
                          <a-button>
                            <upload-outlined
                              v-if="!loading || uploadtype !== 'utility'"
                            ></upload-outlined>
                            <loading-outlined
                              v-if="loading && uploadtype === 'utility'"
                            ></loading-outlined>
                            Upload Utility Bill
                          </a-button>
                        </a-upload>
                      </a-form-item>
                    </div>
                  </div>

                  <div class="col-span-2">
                    <h4 class="font-medium mb-3">Additional Field</h4>
                    <Preview :formState="formState.dynamicField" />
                  </div>

                  <div class="col-span-2 flex justify-center my-4">
                    <sdButton
                      class="btn-create w-full max-w-[250px] mx-auto"
                      htmlType="submit"
                      type="primary"
                      size="lg"
                      :disabled="isLoading || loading"
                    >
                      {{ isLoading ? "Processing" : "Submit request" }}
                    </sdButton>
                  </div>
                </div>
              </a-form>
              <div
                v-if="productLoading || prodloading"
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
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import { onMounted, computed, reactive, ref, watch, provide } from "vue";
import { useStore } from "vuex";
import { formatCurrency } from "@/utility/formatCurrency";
import { useRouter, useRoute } from "vue-router";
import { BasicFormWrapper } from "../styled";
import dayjs from "dayjs";
import { businessTypesInNigeria } from "@/utility/constant";
import { parseAmount } from "@/utility/parseCurrency";
import Preview from "@/components/form/working";

const { state, dispatch } = useStore();
const regionData = JSON.parse(localStorage.getItem("regionData"));
const productDetail = computed(() => state?.products?.product);
const productD = computed(() => state?.products?.productD);
const productLoading = computed(() => state?.products?.loading);
const prodloading = computed(() => state?.products?.prodloading);
const isLoading = computed(() => state.requests.addloading);
const addsuccess = computed(() => state.requests.addsuccess);
const userData = computed(() => state.auth.userData);
const region = computed(() => state.regions.region);
const uploadsuccess = computed(() => state.file.success);
const loading = computed(() => state.file.loading);
const dynamicField = computed(() => state.products.additionaldata);

const router = useRouter();
const route = useRoute();

const query = reactive({
  pageNumber: 1,
  pageSize: 100000000,
  name: "",
  currency:
    userData?.value?.userRole === "admin"
      ? region.value?.currency
      : regionData?.currency,
});
watch(region, () => {
  if (region.value?.currency) {
    query.currency = region.value?.currency;
    dispatch("getProducts", query);
  }
});
const products = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return state.products.data.filter((i) =>
    i?.productType?.toLowerCase().includes(formState?.type?.toLowerCase())
  );
});
const uploadtype = ref("");
const fileId = computed(() => state.file.data);
const minAmount = ref(1);
const maxAmount = ref(10000);
const upfrontFeePercent = ref(0);
const interestRatePercent = ref(0);
const equityPercent = ref(0);

const upfrontFeesAmount = computed(() => {
  if (!formState.amount || !formState.productId) return 0;
  let calc;
  if (productDetail?.value?.productName?.toLowerCase() === "af loans") {
    calc = equityAmount.value * (upfrontFeePercent.value / 100);
  } else {
    calc = formState.amount * (upfrontFeePercent.value / 100);
  }
  return calc || 0;
});
const interestRateAmount = computed(() => {
  if (!formState.amount || !formState.productId || !formState.lockInPeriod)
    return 0;
  let calc;
  if (productDetail?.value?.productName?.toLowerCase() === "af loans") {
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
  return calc || 0;
});
const equityAmount = computed(() => {
  if (!formState.amount || !formState.productId) return 0;
  const calc = formState.amount * (equityPercent.value / 100);
  const mainAmt = formState.amount - calc;
  return mainAmt || 0;
});
// eslint-disable-next-line no-unused-vars
const equityFee = computed(() => {
  if (productDetail?.value?.productName?.toLowerCase() === "af loans") {
    if (!formState.amount || !formState.productId) return 0;
    const calc = formState.amount * (equityPercent.value / 100);
    return calc || 0;
  }
  return 0;
});

const handleSubmit = (values) => {

  dispatch("addUserProduct", {
    ...formState,
    ...values,
    facilityAmount: formState.amount.toString(),
    interestRate: interestRateAmount?.value?.toString() || 0,
    equityContribution: (formState.amount - equityAmount.value).toString() || 0,
    upfrontFee: upfrontFeesAmount?.value || 0,
    dynamicField:formState?.dynamicField
  });

};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
onMounted(() => {
  if (!route.query.regionId && !route.query.id) {
    dispatch("getProducts", query);
    return;
  }
  if (route.query.regionId && route.query.id) {
    dispatch("getRegionById", route.query.regionId);
  }
});

const utilityList = ref([]);
const cacList = ref([]);
const idList = ref([]);
const statementList = ref([]);
const formState = reactive({
  type: "",
  userId:
    userData?.value?.userRole === "admin" ? route.query.id : userData.value.id,
  productId: "",
  facilityAmount: null,
  useOfFunds: "",
  businessName: "",
  businessAddress: "",
  residentialAddress: "",
  businessType: "",
  bvn: "",
  cacDocumentUrl: "",
  statementUrl: "",
  identificationUrl: "",
  utilityBillUrl: "",
  alumniCode: "",
  alumni: false,
  amount: null,
  requestDate: null,
  equityContribution: null,
  lockInPeriod: null,
  interestRate: null,
  dueDate: null,
  occupation: "",
  description: "",
  upfrontFee: "",
  activePhone: "",
  activeEmail: "",
  dynamicField: [],
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
      `${file.name} is not a valid image file (SVG, JPEG, JPG, PNG,PDF allowed)`
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
const checkAmountRange = async (rule, value) => {
  return new Promise((resolve, reject) => {
    if (value >= minAmount.value && value <= maxAmount.value) {
      resolve(); // Pass validation
    } else {
      reject("Invalid amount range"); // Fail validation
    }
  });
};

// eslint-disable-next-line no-unused-vars
const checkRequestDate = async (rule, value) => {
  return new Promise((resolve, reject) => {
    if (!formState.lockInPeriod) {
      formState.requestDate = null;
      reject("Lock-in Period is required"); // Fail validation
    } else {
      resolve(); // Pass validation
    }
  });
};

watch(dynamicField, () => {
  formState.dynamicField = dynamicField.value;
});
watch(
  () => formState.productId,
  () => {
    if (formState.productId) {
      dispatch("getProductDetails", {
        ...query,
        productId: formState.productId,
      });
      dispatch("getProduct", formState.productId);
      dispatch("getProductAddionalField", { id: formState.productId });
    }
  }
);
watch(productDetail, () => {
  if (productDetail?.value?.length) {
    minAmount.value = productDetail?.value[0]?.minAmount;
    maxAmount.value = productDetail?.value[0]?.maxAmount;
    interestRatePercent.value = productDetail?.value[0]?.interestRate;
    upfrontFeePercent.value = productDetail?.value[0]?.upfrontFees;
    equityPercent.value = productDetail?.value[0]?.equityContribution;
    formState.lockInPeriod = productDetail?.value[0]?.lockInPeriod;
  }
});
watch(addsuccess, () => {
  if (addsuccess.value) {
    message.success("Request creation successful!");

    userData?.value?.userRole === "admin"
      ? router.push("/customer-management")
      : router.push("/services");
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
provide("formState", formState)
</script>

<style>
#requests_dueDate {
  color: #404040 !important;
}
</style>
