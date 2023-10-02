<template>
  <div>
    <sdPageHeader
      title="Request service"
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
                  class="col-span-2 mb-10"
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
                  >
                    <a-select-option value="">Please Select</a-select-option>

                    <a-select-option
                      class="capitalize"
                      v-for="p in products"
                      :key="p.id"
                      :value="p.id.toString()"
                      >{{ p.productName }} -
                      {{ p.productType }}</a-select-option
                    >
                  </a-select>
                </a-form-item>

                <h2 class="font-bold mb-7">Product detail</h2>
                <BasicFormWrapper
                  class="ninjadash-authentication-content col-span-2 mb-10"
                >
                  <div class="col-span-2 grid md:grid-cols-2 md:gap-x-8 mb-8">
                    <a-form-item
                      label="Amount"
                      name="amount"
                      :rules="[
                        { required: true, message: 'Please input an amount!' },
                      ]"
                    >
                      <CurrencyInput
                        v-model="formState.amount"
                        placeholder="Provide an amount"
                        :options="{ currency: 'ngn' }"
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
                      ]"
                    >
                      <a-date-picker
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
                        class="w-full"
                        v-model:value="formState.dueDate"
                      />
                    </a-form-item>
                    <a-form-item
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
                        v-model:value="formState.interestRate"
                        placeholder=""
                      />
                    </a-form-item>
                    <a-form-item
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
                        v-model:value="formState.equityContribution"
                        placeholder=""
                      />
                    </a-form-item>

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
                        <a-select-option value="6 months"
                          >6 months</a-select-option
                        >
                        <a-select-option value="12 months"
                          >12 months</a-select-option
                        >
                      </a-select>
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
                <h2 class="font-bold mb-7 col-span-2">Product Requirements</h2>

                <a-form-item
                  label="Facility amount"
                  name="facilityAmount"
                  :rules="[
                    { required: true, message: 'Please input an amount!' },
                  ]"
                >
                  <CurrencyInput
                    v-model="formState.facilityAmount"
                    placeholder="Provide Facility amount"
                    :options="{ currency: 'ngn' }"
                  />
                </a-form-item>
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
                      message: 'Please input your buiness type!',
                    },
                  ]"
                >
                  <a-input
                    v-model:value="formState.businessType"
                    placeholder="Business Type"
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
                  <a-input v-model:value="formState.bvn" placeholder="" />
                </a-form-item>

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
                        :before-upload="(e) => handleChange(e, 'cac')"
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
                        :before-upload="(e) => handleChange(e, 'statement')"
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
                        :before-upload="(e) => handleChange(e, 'id')"
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
                        :before-upload="(e) => handleChange(e, 'utility')"
                      >
                        <a-button>
                          <upload-outlined></upload-outlined>
                          Upload Utility Bill
                        </a-button>
                      </a-upload>
                    </a-form-item>
                  </div>
                </div>

                <div class="my-4 col-span-2">
                  <a-checkbox @change="onChange">
                    Are you a Biodun and Ibikunle Foundation alumni?
                  </a-checkbox>
                </div>
                <a-form-item
                  v-if="formState.alumni"
                  label="If yes, enter your alumni code."
                  name="alumniCode"
                  :rules="[
                    {
                      required: formState.alumni,
                      message: 'Please ente your alumni code!',
                    },
                    { max: 6 },
                    { min: 6 },
                  ]"
                >
                  <a-input
                    :disabled="!formState.alumni"
                    v-model:value="formState.alumniCode"
                    placeholder="Alumni code"
                  />
                </a-form-item>

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
              </a-form>
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
import { onMounted, computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import CurrencyInput from "components/currency/CurrencyInput";
import { useRouter } from "vue-router";
import { BasicFormWrapper } from "../styled";
import dayjs from "dayjs";

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
const products = computed(() => state.products.data);
const isLoading = computed(() => state.requests.addloading);
const addsuccess = computed(() => state.requests.addsuccess);
const userData = computed(() => state.auth.userData);
const uploadsuccess = computed(() => state.file.success);
const values = ref(null);
const uploadtype = ref("");
const fileId = computed(() => state.file.data);

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }

const handleSubmit = (value) => {
  values.value = value;
  dispatch("addUserProduct", {
    ...formState,
    facilityAmount: formState.facilityAmount.toString(),
  });
};
const onChange = (e) => {
  formState.alumni = e.target.checked;
};
const utilityList = ref([]);
const cacList = ref([]);
const idList = ref([]);
const statementList = ref([]);
const formState = reactive({
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
    breadcrumbName: "Request service",
  },
];
const handleChange = (file, type) => {
  console.log("🚀 ~ file: RequestProduct.vue:352 ~ handleChange ~ file:", file);
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
watch(addsuccess, () => {
  if (addsuccess.value) {
    message.success("Request creation successful!");
    router.push("/services");
  }
});
watch(uploadsuccess, () => {
  if (uploadtype.value === "cac") {
    formState.cacDocumentUrl = fileId.value.toString();
  }
  if (uploadtype.value === "id") {
    formState.identificationUrl = fileId.value.toString();
  }
  if (uploadtype.value === "utility") {
    formState.utilityBillUrl = fileId.value.toString();
  }
  if (uploadtype.value === "statement") {
    formState.statementUrl = fileId.value.toString();
  }
});
</script>
