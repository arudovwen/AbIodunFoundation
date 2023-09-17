<template>
  <div>
    <div>
      <a-row justify="center">
        <a-col :sm="24">
          <sdCards headless>
            <BasicFormWrapper class="ninjadash-authentication-content">
              <a-form
                name="register"
                :model="formState"
                @finish="handleSubmit"
                layout="vertical"
                class="grid md:grid-cols-2 md:gap-x-8"
              >
                <a-form-item
                  label="Name"
                  name="name"
                  :rules="[{ required: true, message: 'Please input a name!' }]"
                >
                  <a-input
                    v-model:value="formState.amount"
                    placeholder="Name"
                  />
                </a-form-item>

                <a-form-item
                  label="Minimum amount"
                  name="minAmount"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input a minimum amount!',
                    },
                  ]"
                >
                  <CurrencyInput
                    v-model:value="formState.businessAddress"
                    placeholder="Provide a Minimum amount"
                    :options="{ currency: 'ngn' }"
                  />
                </a-form-item>
                <a-form-item
                  label="Maximum amount"
                  name="maxAmount"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input a maximum amount!',
                    },
                  ]"
                >
                  <CurrencyInput
                    v-model:value="formState.businessAddress"
                    placeholder="Provide a Maximum amount"
                    :options="{ currency: 'ngn' }"
                  />
                </a-form-item>
                <a-form-item
                  label="Rate"
                  name="residentialAddress"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input a rate !',
                    },
                  ]"
                >
                  <a-input
                    v-model:value="formState.residentialAddress"
                    placeholder="Enter rate"
                  />
                </a-form-item>
                <a-form-item
                  label="Upfront Fees"
                  name="businessType"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input an upfront fee!',
                    },
                  ]"
                >
                  <CurrencyInput
                    v-model:value="formState.businessAddress"
                    placeholder="Provide an upfront fee"
                    :options="{ currency: 'ngn' }"
                  />
                </a-form-item>
                <a-form-item
                  label="Interest rate"
                  name="bvn"
                  :rules="[
                    { required: true, message: 'Please input your BVN!' },
                  ]"
                >
                  <a-input v-model:value="formState.bvn" placeholder="" />
                </a-form-item>

                <a-form-item label="Due date" name="dueDate">
                  <a-date-picker class="w-full" />
                </a-form-item>

                <a-form-item label="Description" name="description">
                  <a-textarea
                    v-model:value="formState.description"
                    placeholder="Enter a description"
                  />
                </a-form-item>

                <div class="col-span-2 flex justify-center my-4">
                  <sdButton
                    class="btn-create w-full max-w-[250px] mx-auto"
                    htmlType="submit"
                    type="primary"
                    size="lg"
                  >
                    Update Product
                  </sdButton>
                </div>
              </a-form>
            </BasicFormWrapper>
          </sdCards>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { BasicFormWrapper } from "../../styled";
import CurrencyInput from "components/currency/CurrencyInput";
// import { message } from "ant-design-vue";

const values = ref(null);

const handleSubmit = (value) => {
  values.value = value;
};

const formState = reactive({
  first_name: "",
  last_name: "",
  phone: "",
  gender: "",
  email: "",
  password: "",
});

// const handleChange = (info) => {
//   if (info.file.status !== "uploading") {
//     console.log(info.file, info.fileList);
//   }
//   if (info.file.status === "done") {
//     message.success(`${info.file.name} file uploaded successfully`);
//   } else if (info.file.status === "error") {
//     message.error(`${info.file.name} file upload failed.`);
//   }
// };
</script>
