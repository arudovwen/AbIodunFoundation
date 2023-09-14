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
        <a-col :xxl="6" :xl="12" :md="12" :sm="18">
          <sdCards headless>
            <div class="ninjadash-authentication-content">
              <a-form
                name="register"
                :model="formState"
                @finish="handleSubmit"
                layout="vertical"
              >
                <a-form-item
                  name="gender"
                  label="Choose a product"
                  :rules="[
                    { required: true, message: 'Please select a product!' },
                  ]"
                >
                  <a-select
                    class="h-[49px] leading-[47px]"
                    v-model:value="formState.gender"
                  >
                    <a-select-option value="">Please Select</a-select-option>
                    <a-select-option value="male">Male</a-select-option>
                    <a-select-option value="female">Female</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  label="First Name"
                  name="first_name"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input your First name!',
                    },
                  ]"
                >
                  <a-input
                    v-model:value="formState.name"
                    placeholder="First name"
                  />
                </a-form-item>
                <a-form-item
                  label="Last Name"
                  name="last_name"
                  :rules="[
                    { required: true, message: 'Please input your Last name!' },
                  ]"
                >
                  <a-input
                    v-model:value="formState.name"
                    placeholder="Last name"
                  />
                </a-form-item>

                <!-- <div class="ninjadash-auth-extra-links">
              <a-checkbox @change="onChange">
                Creating an account means you’re okay with our Terms of Service
                and Privacy Policy
              </a-checkbox>
            </div> -->
                <a-form-item>
                  <sdButton
                    class="btn-create w-full"
                    htmlType="submit"
                    type="primary"
                    size="lg"
                  >
                    Submit request
                  </sdButton>
                </a-form-item>
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
// import InlineSvg from "vue-inline-svg";

const values = ref(null);
// const checked = ref(null);
const handleSubmit = (value) => {
  values.value = value;
};

// const onChange = (check) => {
//   checked.value = check;
// };

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
    path: "/product-management/products",
    breadcrumbName: "Products",
  },
  {
    path: "#",
    breadcrumbName: "Add product",
  },
];
</script>
