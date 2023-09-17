<template>
  <div>
    <sdPageHeader
      title="Request Product"
      class="ninjadash-page-header-main"
      :routes="breadcrumbs"
    >
    </sdPageHeader>
    <Main>
      <a-row justify="center">
        <a-col  :sm="24">
          <sdCards headless>
            <div class="ninjadash-authentication-content">
              <a-form
                name="register"
                :model="formState"
                @finish="handleSubmit"
                layout="vertical"
                class="grid md:grid-cols-2 md:gap-x-8"
              >
                <a-form-item
                  name="gender"
                  label="Choose a product"
                  :rules="[
                    { required: true, message: 'Please select a product!' },
                  ]"
                >
                  <a-select
                    class=""
                    v-model:value="formState.gender"
                    size="large"
                  >
                    <a-select-option value="">Please Select</a-select-option>
                    <a-select-option value="male">Male</a-select-option>
                    <a-select-option value="female">Female</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item
                  label="Facility amount"
                  name="facilityAmount"
                  :rules="[
                    { required: true, message: 'Please input an amount!' },
                  ]"
                >
                  <a-input
                    v-model:value="formState.amount"
                    placeholder="Facility amount"
                  />
                </a-form-item>
                <a-form-item
                  label="Use of funds"
                  name="use_of_funds"
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
                  ]"
                >
                  <a-input v-model:value="formState.bvn" placeholder="" />
                </a-form-item>

                <div class="col-span-2">
                  <h4 class="font-medium mb-3">Document uploads</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-2">
                    <a-form-item
                      name="CAC"
                      :rules="[
                        { required: true, message: 'Please upload your Cac' },
                      ]"
                    >
                      <a-upload
                        v-model:file-list="fileList"
                        name="file"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChange"
                      >
                        <a-button>
                          <upload-outlined class="mt-0"></upload-outlined>
                          Upload your CAC Documents
                        </a-button>
                      </a-upload>
                    </a-form-item>

                    <a-form-item
                      name="last_name"
                      :rules="[
                        {
                          required: true,
                          message:
                            'Please upload your 1-year account statement!',
                        },
                      ]"
                    >
                      <a-upload
                        v-model:file-list="fileList"
                        name="file"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChange"
                      >
                        <a-button>
                          <upload-outlined></upload-outlined>
                          Upload your 1-year account statement.
                        </a-button>
                      </a-upload>
                    </a-form-item>
                    <a-form-item
                      name="last_name"
                      :rules="[
                        {
                          required: true,
                          message:
                            'Please upload a valid means of identification!',
                        },
                      ]"
                    >
                      <a-upload
                        v-model:file-list="fileList"
                        name="file"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChange"
                      >
                        <a-button>
                          <upload-outlined></upload-outlined>
                          Upload valid means of identification
                        </a-button>
                      </a-upload>
                    </a-form-item>
                    <a-form-item
                      name="last_name"
                      :rules="[
                        {
                          required: true,
                          message: 'Please upload your Utility Bill!',
                        },
                      ]"
                    >
                      <a-upload
                        v-model:file-list="fileList"
                        name="file"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChange"
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
                  v-if="checked"
                  label="If yes, enter your alumni code."
                  name="code"
                >
                  <a-input
                    :disabled="!checked"
                    v-model:value="formState.code"
                    placeholder="Alumni code"
                  />
                </a-form-item>

                <div class="col-span-2 flex justify-center my-4">
                  <sdButton
                    class="btn-create w-full max-w-[250px] mx-auto"
                    htmlType="submit"
                    type="primary"
                    size="lg"
                  >
                    Submit request
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
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";

const values = ref(null);
const checked = ref(null);
const handleSubmit = (value) => {
  values.value = value;
};

const onChange = (e) => {
  console.log(
    "🚀 ~ file: RequestProduct.vue:223 ~ onChange ~ check:",
    e.target.checked
  );
  checked.value = e.target.checked;
};

const formState = reactive({
  first_name: "",
  last_name: "",
  phone: "",
  gender: "",
  email: "",
  password: "",
});

const breadcrumbs = [
  {
    path: "/dashboard",
    breadcrumbName: "Dashboard",
  },
  {
    path: "/products",
    breadcrumbName: "Products",
  },
  {
    path: "#",
    breadcrumbName: "Request product",
  },
];
const handleChange = (info) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};
</script>
