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
                    :disabled="loading"
                    v-model:value="formState.minAmount"
                    placeholder="Provide a Minimum amount"
                    :formatter="
                      (value) =>
                        `${productInfo?.currency || 'NGN'} ${value}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ','
                        )
                    "
                    :parser="
                      (value) => parseAmount(value, product?.currency || 'NGN')
                    "
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
                    :disabled="loading"
                    placeholder="Provide a Maximum amount"
                    :formatter="
                      (value) =>
                        `${productInfo?.currency || 'NGN'} ${value}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ','
                        )
                    "
                    :parser="
                      (value) => parseAmount(value, product?.currency || 'NGN')
                    "
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
                    v-model:value="formState.upfrontFees"
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
                    { required: true, message: 'Please select a value!' },
                  ]"
                >
                  <a-select
                    :disabled="loading"
                    size="large"
                    v-model:value="formState.lockInPeriod"
                  >
                    <a-select-option value="">Please Select</a-select-option>
                    <a-select-option
                      v-for="n in TenorOptions"
                      :value="n.value"
                      :key="n.value"
                      >{{ n.label }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
                <div
                  class="mt-10 col-span-2 bg-gray-50 p-6"
                  v-if="formState.dynamicFields?.length"
                >
                  <h3 class="text-sm font-semibold mb-6">Additional Fields</h3>
                  <Builder
                    @handler="
                      {
                      }
                    "
                  />
                </div>

                <div class="col-span-2 flex justify-center my-4">
                  <sdButton
                    class="btn-create w-full max-w-[250px] mx-auto"
                    htmlType="submit"
                    type="primary"
                    size="lg"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? "Processing..." : " Update Product Detail" }}
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
import { computed, reactive, ref, watch, onMounted, provide } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { parseAmount } from "@/utility/parseCurrency";
import Builder from "components/form/builder";
import { TenorOptions } from "@/utility/constant";

const { state, dispatch } = useStore();
const isLoading = computed(() => state.products.editloading);
const editsuccess = computed(() => state.products.editsuccess);
const product = computed(() => state.products.product);
const loading = computed(() => state.products.loading);
const dynamicField = computed(() => state.products.additionaldata);

const router = useRouter();
const route = useRoute();
const values = ref(null);
const handleSubmit = (value) => {
  values.value = value;
  dispatch("editProductDetail", formState);
};

const productInfo = computed(() => state.products.productD);
const formState = reactive({
  productId: route?.params?.id, // Update property to match the "Name" input field
  minAmount: null, // Update property to match the "Minimum amount" input field
  maxAmount: null, // Update property to match the "Maximum amount" input field
  rate: "", // Update property to match the "Rate" input field
  upfrontFees: null, // Update property to match the "Upfront Fees" input field
  interestRate: "", // Update property to match the "Interest rate" input field
  lockInPeriod: null, // Update property to match the "Due date" input field
  equityContribution: "", // Update property to match the "Description" input field
  dynamicFields: [],
});
const query = reactive({
  pageNumber: 1,
  pageSize: 10,
  name: "",
  productId: route.params.id,
});
onMounted(() => {
  dispatch("getProduct", route?.params?.id);
  if (route.params.id) {
    dispatch("getProductDetails", query);
    dispatch("getProductAddionalField", { id: route.params.id });
  }
});

watch(editsuccess, () => {
  if (editsuccess.value) {
    message.success("Product update successful!");
    router.push(`/product-management/product/${route?.params?.id}`);
  }
});
watch(dynamicField, () => {
  formState.dynamicFields = dynamicField.value;
});
watch(product, () => {
  if (product.value.length) {
    formState.id = product.value[0].id;
    formState.minAmount = product.value[0].minAmount;
    formState.maxAmount = product.value[0].maxAmount;
    formState.rate = product.value[0].rate;
    formState.upfrontFees = product.value[0].upfrontFees;
    formState.interestRate = product.value[0].interestRate;
    formState.lockInPeriod = product.value[0].lockInPeriod;
    formState.equityContribution = product.value[0].equityContribution;
  }
});
provide("forms", formState);
</script>
