<!-- eslint-disable no-unused-vars -->
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
                  label="Minimum amount"
                  name="minAmount"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input a minimum amount!',
                    },
                  ]"
                  validateTrigger="blur"
                >
                  <a-input-number
                    v-model:value="formState.minAmount"
                    placeholder="Provide a Minimum amount"
                    :formatter="
                      (value) =>
                        `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    "
                    :parser="(value) => value.replace(/\₦\s?|(,*)/g, '')"
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
                  <a-input-number
                    :min="parseFloat(formState.minAmount) + 1"
                    v-model:value="formState.maxAmount"
                    placeholder="Provide a Maximum amount"
                    :formatter="
                      (value) =>
                        `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    "
                    :parser="(value) => value.replace(/\₦\s?|(,*)/g, '')"
                  />
                </a-form-item>

                <a-form-item
                  label="Upfront Fees"
                  name="upfrontFees"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input an upfront fee!',
                    },
                  ]"
                >
                  <a-input-number
                    v-model:value="formState.upfrontFees"
                    placeholder="Provide an upfront fee"
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
                  <a-select size="large" v-model:value="formState.lockInPeriod">
                    <a-select-option value="">Please Select</a-select-option>
                    <a-select-option value="1">1 months</a-select-option>
                    <a-select-option value="2">2 months</a-select-option>
                    <a-select-option value="3">3 months</a-select-option>
                    <a-select-option value="6">6 months</a-select-option>
                    <a-select-option value="12">12 months</a-select-option>
                  </a-select>
                </a-form-item>

                <div class="col-span-2 flex justify-center my-4">
                  <sdButton
                    class="btn-create w-full max-w-[250px] mx-auto"
                    htmlType="submit"
                    type="primary"
                    size="lg"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? "Processing..." : " Add Product Detail" }}
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
import { BasicFormWrapper } from "../../styled";
import { message } from "ant-design-vue";
import { computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const { state, dispatch } = useStore();
const isLoading = computed(() => state.products.addloading);
const addsuccess = computed(() => state.products.addsuccess);
const router = useRouter();
const route = useRoute();
const values = ref(null);
const handleSubmit = (value) => {
  values.value = value;
  dispatch("addProductDetail", { ...formState, rate: formState.interestRate });
};

const formState = reactive({
  productId: route?.params?.id, // Update property to match the "Name" input field
  minAmount: null, // Update property to match the "Minimum amount" input field
  maxAmount: null, // Update property to match the "Maximum amount" input field
  rate: "", // Update property to match the "Rate" input field
  upfrontFees: null, // Update property to match the "Upfront Fees" input field
  interestRate: "", // Update property to match the "Interest rate" input field
  lockInPeriod: null, // Update property to match the "Due date" input field
  equityContribution: "", // Update property to match the "Description" input field
});

watch(addsuccess, () => {
  if (addsuccess.value) {
    message.success("Product detail added!");
    router.push(`/product-management/product/${route?.params?.id}`);
  }
});
</script>
