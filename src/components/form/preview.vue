<template>
  <div class="rounded-lg p-6 bg-white border" v-if="forms?.[0]?.label">
    <a-form layout="vertical">
      <div class="flex flex-col gap-y-6" v-for="(form, id) in forms" :key="id">
        <a-form-item
          :label="form?.label"
          :name="['forms', id, 'value']"
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
    </a-form>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Upload from "./upload.vue";
defineProps(["forms"]);

const allowedInputs = ["text", "number", "date", "email"];
</script>
