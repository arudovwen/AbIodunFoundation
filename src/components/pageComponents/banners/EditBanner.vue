<template>
  <div class="w-[300px] sm:w-[400px]">
    <h1 class="text-center font-bold text-lg">Create banner</h1>
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
              >
                <!-- <a-form-item
                  label="Title"
                  name="name"
                  :rules="[{ required: true, message: 'Please input a name!' }]"
                >
                  <a-input
                    v-model:value="formState.amount"
                    placeholder="Name"
                  />
                </a-form-item> -->

                <a-form-item label="Description" name="description">
                  <a-textarea
                    v-model:value="formState.description"
                    placeholder="Enter a description"
                    :rows="5"
                  />
                </a-form-item>
                <a-form-item label="Cover" name="cover">
                  <a-upload-dragger
                    v-model:file-list="fileList"
                    class="ninjadash-uploader-large"
                    name="file"
                    :customRequest="handleChange"
                    @preview="handlePreview"
                    @drop="handleDrop"
                  >
                    <p class="ant-up load-text">Drop file here to upload</p>
                  </a-upload-dragger>
                </a-form-item>

                <!-- <div class="flex gap-x-2 items-center">
                  <a-switch
                    v-model:checked="checked"
                    :class="checked ? 'bg-blue-600' : ' bg-gray-400'"
                  />
                  <span class="font-medium">Active</span>
                </div> -->

                <div class="col-span-2 flex justify-center mt-7">
                  <sdButton
                    class="btn-create w-full max-w-[250px] mx-auto"
                    htmlType="submit"
                    type="primary"
                    size="lg"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? "Processing..." : "Update Banner" }}
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
import { reactive, ref, watch, computed, onMounted, defineProps } from "vue";
import { BasicFormWrapper } from "../../styled";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

const values = ref(null);
// eslint-disable-next-line no-unused-vars
const { state, dispatch } = useStore();

const props = defineProps(["detail"]);

const isLoading = computed(() => state.banners.editloading);
const editsuccess = computed(() => state.banners.editsuccess);
const filesuccess = computed(() => state.file.success);
const myfile = ref("");
const id = computed(() => state.file.data);
const checked = ref(false);
const fileList = ref([]);
const handleSubmit = (value) => {
  values.value = value;
  formState.status = checked.value.toString();
  const formData = new FormData();
  formData.append("file", myfile.value);

  dispatch("editBanner", formState);
};
const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
const formState = reactive({
  description: "",
  bannerUrl: "",
  // status: "",
});

onMounted(() => {
  formState.description = props.detail.description;
  formState.status = props.detail.stat;
  // checked.value = formState.status === "active" ? true : false;
  formState.bannerUrl = props.detail.bannerUrl;
  formState.id = props.detail.id;
});
const handleChange = (info) => {
  const file = info.file;

  const allowedTypes = [
    "image/svg+xml",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];
  
  // Check if the file type is allowed
  if (!allowedTypes.includes(file.type)) {
    message.error(
      `${file.name} is not a valid image file (SVG, JPEG, JPG, PNG allowed)`
    );
    return false; // Prevent the upload
  }

  // Check if the file size is within the allowed limit (800KB)
  if (file.size > 800 * 1024) { // 800KB = 800 * 1024 bytes
    message.error(`${file.name} exceeds the maximum file size (800KB)`);
    return false; // Prevent the upload
  }

  fileList.value = [file];
  myfile.value = file;

  return false; // Prevent default behavior
};

function handleDrop(e) {
  console.log(e);
}
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value =
    file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
};

watch(editsuccess, () => {
  if (editsuccess.value) {
    message.success("Banner creation successful!");
  }
});
watch(filesuccess, () => {
  if (filesuccess.value) {
    formState.bannerUrl = id.value.toString();
    fileList.value = [myfile.value];
  }
});
</script>
