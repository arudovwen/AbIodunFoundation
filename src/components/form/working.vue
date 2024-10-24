<template>
  <div
    class="rounded-lg p-6 bg-white border grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4"
    v-if="formState?.dynamicField?.[0]?.label"
  >
    <div
      class="gap-6"
      v-for="(form, id) in formState?.dynamicField"
      :key="id"
    >
      <a-form-item
        :label="form?.label"
        :name="['dynamicField', id, 'value']"
        :rules="[
          {
            required: form.required,
            message: 'Value is required',
            trigger: 'change',
          },
        ]"
      >
        <a-input
          v-if="allowedInputs.includes(form?.type)"
          v-model:value="form.value"
          placeholder="Enter a label"
          :type="form.type"
        />

        <a-select
          v-if="form.type === 'select'"
          class="!h-12"
          size="small"
          v-model:value="form.value"
        >
          <a-select-option value="">Please Select</a-select-option>
          <a-select-option
            :value="option.value"
            v-for="option in form.options"
            :key="option.name"
            >{{ option.name }}</a-select-option
          >
        </a-select>
        <Upload
          :label="form?.label"
          v-if="form.type === 'file'"
          v-model="form.value"
        />
      </a-form-item>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import Upload from "./upload.vue";
const formState = inject("formState");
const allowedInputs = ["text", "number", "date", "email"];
</script>
