<template>
  <div>
    <sdPageHeader
      title="Edit Request service"
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
                    {{ isLoading ? "Processing..." : "Update request" }}
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
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import CurrencyInput from "components/currency/CurrencyInput";

const route = useRoute();
const router = useRouter();
onMounted(() => {
  dispatch("getProducts", query);
  dispatch("getRequestById", route.params.id);
});

const query = reactive({
  pageNumber: 1,
  pageSize: 100000000,
  name: "",
});
const { state, dispatch } = useStore();
const products = computed(() => state.products.data);
const request = computed(() => state.requests.request);
const isLoading = computed(() => state.requests.editloading);
const editsuccess = computed(() => state.requests.editsuccess);
const userData = computed(() => state.auth.userData);
const values = ref(null);

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
  dispatch("addRequest", formState);
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
  cacDocumentUrl: null, // This will hold the CAC file data
  statementUrl: null, // This will hold the account statement file data
  identificationUrl: null, // This will hold the means of identification file data
  utilityBillUrl: null, // This will hold the utility bill file data
  alumniCode: "", // Alumni code
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
    breadcrumbName: "Edit Request service",
  },
];
const handleChange = (file, type) => {
 
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

  // await getBase64(file.originFileObj)

  if (type === "cac") {
    formState.cacDocumentUrl = file;
  }
  if (type === "id") {
    formState.identificationUrl = file;
  }
  if (type === "utility") {
    formState.utilityBillUrl = file;
  }
  if (type === "statement") {
    formState.statementUrl = file;
  }
  return false;
};
watch(editsuccess, () => {
  if (editsuccess.value) {
    message.success("Request update successful!");
    router.push("/services");
  }
});
watch(request, () => {
  formState.productId = request.value.productId;
  formState.facilityAmount = request.value.facilityAmount;
  formState.useOfFunds = request.value.useOfFunds;
  formState.businessName = request.value.businessName;
  formState.businessAddress = request.value.businessAddress;
  formState.residentialAddress = request.value.residentialAddress;
  formState.businessType = request.value.businessType;
  formState.bvn = request.value.bvn;
  formState.cacDocumentUrl = request.value.cacDocumentUrl;
  formState.statementUrl = request.value.statementUrl;
  formState.identificationUrl = request.value.identificationUrl;
  formState.utilityBillUrl = request.value.utilityBillUrl;
  formState.alumniCode = request.value.alumniCode;
});
</script>
