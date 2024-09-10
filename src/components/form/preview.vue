<template>
  <a-form layout="vertical">
    <div class="flex flex-col" v-for="(form, id) in forms" :key="id">
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
        />

        <a-select
          v-if="form.type === 'select'"
          class="!h-12"
          size="small"
          v-model:value="form.value"
        >
          <a-select-option value="">Please Select</a-select-option>
          <a-select-option
            :value="option.label"
            v-for="option in form.options"
            :key="option.label"
            >{{ option.name }}</a-select-option
          >
        </a-select>
        <Upload :label="form?.label" v-if="form.type === 'file'" v-model="form.value" />
      </a-form-item>
    </div>
  </a-form>
</template>

<script setup>
import { defineProps } from "vue";
import Upload from "./upload.vue";
defineProps(["forms"]);

const allowedInputs = ["text", "number", "date", "email"];
</script>
