<template>
  <div>
    <div
      class="flex-1 rounded-lg py-1 pr-[14px] pl-2 h-11 text-sm w-full border border-[##EAECF0] placeholder:text-[#B6B7B9] bg-[#F9FAFB] focus:outline-matta-black/20 flex items-center"
    >
      <input
        id="upload"
        ref="fileInputRef"
        type="file"
        class="!hidden"
        @change="
          (e) => {
            handleEvent(e);
          }
        "
        :accept="accept"
      />

      <button
        type="button"
        @click="triggerFileInput"
        class="text-xs text-white border border-[#98A2B3] !h-full bg-[#111620] rounded px-5 py-[6px] active:scale-[.95] leading-normal flex justify-center items-center"
      >
        <div
          v-if="loading"
          class="loader border-t-2 border-white border-solid rounded-full h-3 w-3 animate-spin whitespace-nowrap"
        ></div>
        <span v-else>{{ btnText || "Select file" }}</span>
      </button>

      <span
        class="flex-1 px-4 truncate text-[#999999] inline-block max-w-[300px] xl:max-w-[380px]"
        >{{ title }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, defineEmits, computed, watch } from "vue";

import { message } from "ant-design-vue";
import { useStore } from "vuex";

const props = defineProps({
  label: {
    default: "",
  },
  id: {
    default: "",
  },
  btnText: {
    default: "",
  },
  modelValue: {
    default: "",
  },
  multiple: {
    default: false,
  },
  accept: {
    default: "pdf,jpeg,jpg,png, docx",
  },
  isCumpulsory: {
    default: false,
  },
  placeholder: {
    default: "",
  },
});
const emits = defineEmits(["update:modelValue"]);
const fileInputRef = ref(null);
const title = ref("");
const loading = ref(false);

const { state, dispatch } = useStore();

const fileId = computed(() => state.file.data);
const userData = computed(() => state.auth.userData);
const uploadsuccess = computed(() => state.file.success);
function handleEvent(e) {
  const file = e.target.files[0];

  if (!file) return;

  // Add more allowed extensions if needed
  const fileExtension = file.name.split(".").pop().toLowerCase();
  title.value = file.name;
  if (!props.accept.split(",").includes(fileExtension)) {
    // Show an error message or handle accordingly
    message.error("Invalid file type. Please upload a document.");
    return;
  }

  if (file.size > 800 * 1024) {
    // 800KB = 800 * 1024 bytes
    message.error(`${file.name} exceeds the maximum file size (800KB)`);
    return false; // Prevent the upload
  }

  const formData = new FormData();
  formData.append("file", file);

  dispatch("uploadFile", {
    userId: userData.value.id,
    fileType: "product",
    formData,
  });
  watch(uploadsuccess, () => {
    emits("update:modelValue", fileId.value.toString());
  });
}

function triggerFileInput() {
  fileInputRef.value.click();
}
onMounted(() => {
  // title.value = `${props.label.replaceAll(" ", "_")}`;
});
watch(
  () => [props.modelValue],

  () => {
    // title.value = `${props.label.replaceAll(" ", "_")}`;
  }
);
</script>
