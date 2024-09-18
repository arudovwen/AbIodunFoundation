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
                class="max-w-sm mx-auto"
              >
                <a-form-item
                  label="Product Name"
                  name="productName"
                  :rules="[
                    { required: true, message: 'Please input a product name!' },
                  ]"
                >
                  <a-input
                    v-model:value="formState.productName"
                    placeholder="Provide a product name"
                  />
                </a-form-item>
                <a-form-item
                  name="productType"
                  label="Product type"
                  :rules="[
                    { required: true, message: 'Please select a type!' },
                  ]"
                >
                  <a-select size="large" v-model:value="formState.productType">
                    <a-select-option disabled value=""
                      >Please Select</a-select-option
                    >
                    <a-select-option value="ifc loans"
                      >Interest Free Credit</a-select-option
                    >
                    <a-select-option value="af loans"
                      >Asset Finance</a-select-option
                    >
                    <a-select-option value="wcf loans"
                      >Working Capital Finance</a-select-option
                    >
                    <a-select-option value="savings">Savings</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  name="currency"
                  label="Currency"
                  :rules="[
                    { required: true, message: 'Please select a currency!' },
                  ]"
                >
                  <a-select size="large" v-model:value="formState.currency">
                    <a-select-option disabled value=""
                      >Please Select</a-select-option
                    >
                    <a-select-option
                      :value="n.currency"
                      v-for="n in regionsData"
                      :key="n.id"
                      >{{ `${n.name} - ${n.currency}` }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
                <a-form-item label="Description" name="productDescription">
                  <a-textarea
                    v-model:value="formState.productDescription"
                    placeholder="Enter a product description"
                  />
                </a-form-item>

                <div class="col-span-2 flex justify-center my-4">
                  <sdButton
                    class="btn-create w-full mx-auto"
                    htmlType="submit"
                    type="primary"
                    size="lg"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? "Processing..." : " Create Product" }}
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
import { computed, reactive, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const { state, dispatch } = useStore();
const isLoading = computed(() => state.products.addloading);
const addsuccess = computed(() => state.products.addsuccess);
const router = useRouter();
const values = ref(null);
const handleSubmit = (value) => {
  values.value = value;
  dispatch("addProduct", value);
};

const formState = reactive({
  productName: "",
  productType: "",
  productDescription: "",
  currency: "",
});
const regionsData = computed(() =>
  state.regions.data.map((user) => {
    const { id, name, currency } = user;

    return {
      ...user,
      key: id,
      name,
      currency,
    };
  })
);
watch(addsuccess, () => {
  if (addsuccess.value) {
    message.success("Product creation successful!");
    router.push("/product-management");
  }
});
onMounted(() => {
  dispatch("getRegions", { pageNumber: 1, pageSize: 1000 });
});
</script>
