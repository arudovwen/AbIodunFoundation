<template>
  <div class="grid grid-cols-2 gap-x-5">
    <div class="w-full">
      <div>
        <a-form
          name="register"
          :model="formState"
          layout="vertical"
          ref="formRef"
        >
          <div class="grid gap-y-6">
            <div
              class="border rounded-lg p-6 bg-white relative"
              v-for="(n, id) in formState.forms"
              :key="n.key"
            >
              <div class="flex gap-x-8 items-center justify-between">
                <span class="flex-1 flex gap-x-2">
                  <button type="button" @click="handleTab(id)">+</button>
                  <span> {{ n.label }}</span>
                </span>
                <button
                  @click="removeField(id)"
                  class="text-red-500 text-sm"
                  type="button"
                >
                  Remove field
                </button>
              </div>
              <div v-if="activeTab.includes(id)" class="mt-6">
                <a-form-item
                  label="Input Label"
                  :name="['forms', id, 'label']"
                  :rules="[
                    {
                      required: true,
                      message: 'Label is required',
                      trigger: 'change',
                    },
                  ]"
                >
                  <a-input
                    v-model:value="n.label"
                    placeholder="Enter a label"
                  />
                </a-form-item>
                <div class="grid grid-cols-2 gap-x-6">
                  <a-form-item
                    label="Input Type"
                    :name="['forms', id, 'type']"
                    :rules="[{ required: true, message: 'Select input type' }]"
                  >
                    <a-select class="!h-12" size="small" v-model:value="n.type">
                      <a-select-option value=""
                        >Please Select type</a-select-option
                      >
                      <a-select-option value="text">Text</a-select-option>
                      <a-select-option value="number">Number</a-select-option>
                      <a-select-option value="email">Email</a-select-option>
                      <a-select-option value="file">File</a-select-option>
                      <a-select-option value="select">Select</a-select-option>
                      <a-select-option value="select">Radio</a-select-option>
                      <a-select-option value="select">Checkbox</a-select-option>
                      <a-select-option value="select">Date</a-select-option>
                    </a-select>
                  </a-form-item>

                  <div class="mb-6">
                    <label class="flex items-center gap-x-3">
                      <input type="checkbox" v-model="n.required" />
                      <span>Required</span></label
                    >
                  </div>
                </div>

                <div v-if="n.type === 'select'">
                  <div
                    class="flex items-center gap-x-6"
                    v-for="(option, idx) in n.options"
                    :key="idx"
                  >
                    <a-form-item
                      :name="['forms', id, 'options', idx, 'name']"
                      label="Option name"
                      class="flex-1"
                      :rules="[
                        { required: true, message: 'Value is required!' },
                      ]"
                    >
                      <a-input
                        type="text"
                        v-model:value="option.name"
                        placeholder=""
                      />
                    </a-form-item>
                    <a-form-item
                      :name="['forms', id, 'options', idx, 'value']"
                      label="Option value"
                      class="flex-1"
                      :rules="[
                        { required: true, message: 'Value is required!' },
                      ]"
                    >
                      <a-input
                        type="text"
                        v-model:value="option.value"
                        placeholder=""
                      />
                    </a-form-item>
                    <div class="flex gap-x-3 items-center text-sm">
                      <button
                        class="text-sm text-red-500"
                        type="button"
                        @click="removeOption(id, idx)"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div class="flex justify-start">
                    <button
                      class="text-sm text-blue-500"
                      type="button"
                      @click="addOption(id)"
                    >
                      + Add option
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end py-5">
            <button
              @click="addField"
              type="button"
              class="text-sm text-gray-600 w-full text-center border border-dashed border-gray-200 px-10px py-[10px]"
            >
              + Add field
            </button>
          </div>
          <!-- <a-form-item class="mt-8 w-full">
            <sdButton
              class="btn-create w-full"
              htmlType="submit"
              @click="handleSubmit"
              type="primary"
              size="lg"
              :disabled="isLoading"
            >
              {{ isLoading ? "Loading..." : "Submit" }}
            </sdButton>
          </a-form-item> -->
        </a-form>
      </div>
    </div>
    <div>
      <Preview :forms="formState.forms" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits, watch } from "vue";
import Preview from "@/components/form/preview";

const formRef = ref({});
const activeTab = ref([]);
// const isLoading = ref(false);
//   const emits =
defineEmits(["handler"]);
const formState = reactive({
  forms: [
    {
      label: "",
      key: Date.now(),
      name: "",
      options: [],
      type: "",
      value: null,
      required: false,
    },
  ],
});

// const handleSubmit = (value) => {
//   console.log("value", value);
//   formRef.value
//     .validate()
//     .then(() => {
//       console.log("values", formState.forms);
//     })
//     .catch((error) => {
//       console.log("error", error);
//     });
// };

const addField = () => {
  formState.forms.push({
    label: "",
    key: Date.now(),
    name: "",
    options: [],
    type: "",
    value: "",
    required: false,
  });
  activeTab.value = [formState.forms.length - 1]; // Open the newly added tab
};

const removeField = (id) => {
  formState.forms.splice(id, 1);
  activeTab.value = activeTab.value.filter((i) => i !== id);
  if (activeTab.value.length === 0 && formState.forms.length > 0) {
    activeTab.value = [0]; // Ensure at least one tab is active
  }
};

const handleTab = (id) => {
  if (activeTab.value.includes(id)) {
    activeTab.value = activeTab.value.filter((i) => i !== id);
  } else {
    activeTab.value.push(id);
  }
};

const addOption = (fieldId) => {
  formState.forms[fieldId].options.push({
    name: "",
    value: "",
  });
};

const removeOption = (fieldId, optionIndex) => {
  formState.forms[fieldId].options.splice(optionIndex, 1);
};
watch(
  () => [formState.form],
  () => {
    console.log("🚀 ~ watch ~ formState.form:", formState.form);
  }
);
</script>
