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
                    :placeholder="
                      loading ? 'Loading...' : 'Provide a product name'
                    "
                    :disabled="loading"
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
                    <a-select-option disabled value="">
                      {{
                        loading ? "Loading..." : "Please Select"
                      }}</a-select-option
                    >
                    <a-select-option value="ifc loans">Interest Free Credit</a-select-option>
                    <a-select-option value="af loans">Asset Finance</a-select-option>
                    <a-select-option value="wcf loans">Working Capital Finance</a-select-option>
                    <a-select-option value="savings">Savings</a-select-option>
                  </a-select>
                </a-form-item>

                <a-form-item label="Description" name="productDescription">
                  <a-textarea
                    v-model:value="formState.productDescription"
                    :placeholder="
                      loading ? 'Loading...' : 'Enter a product description'
                    "
                    :disabled="loading"
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
                    {{ isLoading ? "Processing..." : " Update Product" }}
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
import { useRouter, useRoute } from "vue-router";

const { state, dispatch } = useStore();
const isLoading = computed(() => state.products.editloading);
const editsuccess = computed(() => state.products.editsuccess);
const product = computed(() => state.products.productD);
const loading = computed(() => state.products.loading);

const router = useRouter();
const route = useRoute();
const values = ref(null);
const handleSubmit = (value) => {
  values.value = value;
  dispatch("editProduct", formState);
};

const formState = reactive({
  id: "",
  productName: "",
  productType: "",
  productDescription: "",
});

onMounted(() => {
 if(route.params.id){
  dispatch("getProduct", route.params.id);
 }
});
watch(editsuccess, () => {
  if (editsuccess.value) {
    message.success("Product update successful!");
    router.push("/product-management");
  }
});
watch(product, () => {
  if (product.value) {
    formState.id =  product.value.id;
    formState.productName = product.value.productName;
    formState.productType = product.value.productType;
    formState.productDescription = product.value.productDescription;
  }
});
</script>
