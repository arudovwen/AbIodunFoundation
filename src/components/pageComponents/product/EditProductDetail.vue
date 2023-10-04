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
                  <CurrencyInput
                    v-model="formState.minAmount"
                    placeholder="Provide a Minimum amount"
                    :options="{ currency: 'ngn' }"
                    :disabled="loading"
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
                    v-model="formState.maxAmount"
                    placeholder="Provide a Maximum amount"
                    :options="{ currency: 'ngn' }"
                    :disabled="loading"
                  />
                </a-form-item>
                <!-- <a-form-item
                  label="Rate"
                  name="rate"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input a rate !',
                    },
                  ]"
                >
                  <a-input-number
                    v-model:value="formState.rate"
                    placeholder="Enter product rate"
                    :disabled="loading"
                  />
                </a-form-item> -->
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
                    v-model.value="formState.upfrontFees"
                    placeholder="Provide an upfront fee"
                    :disabled="loading"
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
                    :disabled="loading"
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
                    :disabled="loading"
                    placeholder=""
                  />
                </a-form-item>

                <a-form-item
                  label="Lock-in Period"
                  name="lockInPeriod"
                  :rules="[
                    { required: true, message: 'Please provide a value!' },
                  ]"
                >
                  <a-input
                    class="w-full"
                    v-model:value="formState.lockInPeriod"
                    :disabled="loading"
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
import CurrencyInput from "components/currency/CurrencyInput";
import { message } from "ant-design-vue";
import { computed, reactive, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const { state, dispatch } = useStore();
const isLoading = computed(() => state.products.editloading);
const editsuccess = computed(() => state.products.editsuccess);
const product = computed(() => state.products.product);
const loading = computed(() => state.products.loading);
const router = useRouter();
const route = useRoute();
const values = ref(null);
const handleSubmit = (value) => {
  values.value = value;
  dispatch("editProductDetail", formState);
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
onMounted(() => {
  if (route.params.id) {
    dispatch("getProductDetail", route.params.id);
  }
});

watch(editsuccess, () => {
  if (editsuccess.value) {
    message.success("Product update successful!");
    router.push(`/product-management/product/${route?.params?.id}`);
  }
});

watch(product, () => {
  if (product.value) {
    formState.id = product.value.id;
    formState.minAmount = product.value.minAmount;
    formState.maxAmount = product.value.maxAmount;
    formState.rate = product.value.rate;
    formState.upfrontFees = product.value.upfrontFees;
    formState.interestRate = product.value.interestRate;
    formState.lockInPeriod = product.value.lockInPeriod;
    formState.equityContribution = product.value.equityContribution;
  }
});
</script>
