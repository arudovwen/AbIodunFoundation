<template>
  <div class="flex  gap-x-5">
    <div class="w-full max-w-[60%]">
      <div>
        <a-form name="register" :model="forms" layout="vertical" ref="formRef">
          <div class="grid gap-y-6">
            <div
              class="border rounded-lg p-6 bg-white relative"
              v-for="(n, id) in forms.dynamicFields"
              :key="n.key"
            >
              <div class="flex gap-x-8 items-center justify-between">
                <span class="flex-1 flex gap-x-2">
                  <button type="button" @click="handleTab(id)">+</button>
                  <span> {{ n.label }}</span>
                </span>
                <button
                  v-if="forms.dynamicFields.length > 1"
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
                  :name="['dynamicFields', id, 'label']"
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
                    :name="['dynamicFields', id, 'type']"
                    :rules="[{ required: true, message: 'Select input type' }]"
                  >
                    <a-select class="!h-12" v-model:value="n.type">
                      <a-select-option value=""
                        >Please Select type</a-select-option
                      >
                      <a-select-option value="text">Text</a-select-option>
                      <a-select-option value="number">Number</a-select-option>
                      <a-select-option value="email">Email</a-select-option>
                      <a-select-option value="file">File</a-select-option>
                      <a-select-option value="select">Select</a-select-option>
                      <!-- <a-select-option value="select">Radio</a-select-option>
                      <a-select-option value="select">Checkbox</a-select-option> -->
                      <a-select-option value="date">Date</a-select-option>
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
                      :name="['dynamicFields', id, 'options', idx, 'name']"
                      :label="idx === 0 ? 'Option name' : ''"
                      class="flex-1 mb-2"
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
                      :name="['dynamicFields', id, 'options', idx, 'value']"
                      :label="idx === 0 ? 'Option value' : ''"
                      class="flex-1 mb-2"
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
    <div class="flex-1">
      <Preview :forms="forms.dynamicFields" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch, inject } from "vue";
import Preview from "@/components/form/preview";

const formRef = ref({});
const activeTab = ref([]);
// const isLoading = ref(false);
//   const emits =
defineEmits(["handler"]);
const forms = inject("forms");
// const formState = reactive({
//   forms: [
//     {
//       label: "",
//       key: Date.now(),
//       name: "",
//       options: [],
//       type: "",
//       value: null,
//       required: false,
//     },
//   ],
// });

// const handleSubmit = (value) => {
//   console.log("value", value);
//   formRef.value
//     .validate()
//     .then(() => {
//       console.log("values", forms);
//     })
//     .catch((error) => {
//       console.log("error", error);
//     });
// };

const addField = () => {
  forms.dynamicFields.push({
    label: "",
    key: Date.now(),
    name: "",
    options: [],
    type: "",
    value: "",
    required: false,
  });
  activeTab.value = [forms.dynamicFields.length - 1]; // Open the newly added tab
};

const removeField = (id) => {
  forms.dynamicFields.splice(id, 1);
  activeTab.value = activeTab.value.filter((i) => i !== id);
  if (activeTab.value.length === 0 && forms.dynamicFields.length > 0) {
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
  forms.dynamicFields[fieldId].options.push({
    name: "",
    value: "",
  });
};

const removeOption = (fieldId, optionIndex) => {
  forms.dynamicFields[fieldId].options.splice(optionIndex, 1);
};
watch(
  () => [forms],
  () => {
    console.log("🚀 ~ watch ~ form:", forms);
  }
);
</script>
