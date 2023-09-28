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
                    class="ninjadash-uploader-large"
                    name="file"
                    @change="handleChange"
                  >
                    <p class="ant-upload-text">Drop file here to upload</p>
                  </a-upload-dragger>
                </a-form-item>

                <div class="flex gap-x-2 items-center">
                  <a-switch
                    v-model:checked="checked"
                    :class="checked ? 'bg-blue-600' : ' bg-gray-400'"
                  />
                  <span class="font-medium">Active</span>
                </div>

                <div class="col-span-2 flex justify-center mt-7">
                  <sdButton
                    class="btn-create w-full max-w-[250px] mx-auto"
                    htmlType="submit"
                    type="primary"
                    size="lg"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? "Processing..." : "Create Banner" }}
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
import { reactive, ref, watch, computed } from "vue";
import { BasicFormWrapper } from "../../styled";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

const values = ref(null);
// eslint-disable-next-line no-unused-vars
const { state, dispatch } = useStore();
const isLoading = computed(() => state.banners.addloading);
const addsuccess = computed(() => state.banners.addsuccess);
const checked = ref(false);
const handleSubmit = (value) => {
  values.value = value;
  formState.status = checked.value;
 
dispatch("addBanner", formState);
};

const formState = reactive({
  description: "",
  bannerUrl: "string",
  status: "",
});

const handleChange = (info) => {
  const file = info.file;
  console.log("🚀 ~ file: AddBanner.vue:101 ~ handleChange ~ file:", file);
  const allowedTypes = [
    "image/svg+xml",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];
  if (!allowedTypes.includes(file.type)) {
    message.error(
      `${file.name} is not a valid image file (SVG, JPEG, JPG, PNG allowed)`
    );
    return false; // Prevent the upload
  }

  const formData = new FormData();
  formData.append("file", file);

  dispatch("uploadFile", {
    userId: this.userData.id,
    fileType: "avatar",
    formData,
  });

  return false; // Prevent default behavior
};

watch(addsuccess, () => {
  if (addsuccess.value) {
    message.success("Banner creation successful!");
  }
});
</script>
