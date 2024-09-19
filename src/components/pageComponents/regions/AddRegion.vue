<template>
  <div class="w-full sm:w-[400px]">
    <h1 class="mb-7 text-base font-bold text-center">
      {{ detail?.name ? "Update" : "Add" }} Region
    </h1>
    <div class="ninjadash-authentication-content">
      <a-form
        name="register"
        :model="formState"
        @finish="handleSubmit"
        layout="vertical"
      >
        <div class="md:grid grid-cols12 gap-x-4">
          <a-form-item
            label="Name"
            name="name"
            :rules="[{ required: true, message: 'Please input the name!' }]"
          >
            <a-input v-model:value="formState.name" placeholder="Name" />
          </a-form-item>
          <a-form-item label="Description" name="description">
            <a-textarea
              v-model:value="formState.description"
              placeholder="Description"
            />
          </a-form-item>
        </div>
        <a-form-item
          name="currency"
          label="Currency"
          :rules="[{ required: true, message: 'Please select a currency!' }]"
        >
          <a-input v-model:value="formState.currency" placeholder="Currency" />
        </a-form-item>
        <a-form-item>
          <sdButton
            class="btn-create w-full"
            htmlType="submit"
            type="primary"
            size="lg"
            :disabled="isLoading"
          >
            {{ isLoading ? "Loading..." : "Submit" }}
          </sdButton>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { message } from "ant-design-vue";
import { computed, inject, reactive, defineProps, watch, onMounted } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  detail: {
    type: Object,
    default: () => null,
  },
});

const visible = inject("visible");
const editvisible = inject("editvisible");
const { state, dispatch } = useStore();

const isLoading = computed(() => state.regions.addloading);
const addsuccess = computed(() => state.regions.addsuccess);
const editsuccess = computed(() => state.regions.editsuccess);
const error = computed(() => state.regions.error);

const formState = reactive({
  id: props.detail?.id,
  name: props.detail?.name || "",
  description: props.detail?.description || "",
  currency: props.detail?.currency || "",
  status: props.detail?.statusInt || true,
});

onMounted(() => {
 
});
const handleSubmit = () => {
  dispatch(!props?.detail ? "addRegion" : "editRegion", formState);
};

watch(addsuccess, (success) => {
  if (success) {
    message.success("Region added successfully!");
    visible.value = false;
  }
});
watch(editsuccess, (success) => {
  if (success) {
    message.success("Region updated successfully!");
    editvisible.value = false;
  }
});
watch(error, () => {
  message.error(error.value || "Failed");
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
