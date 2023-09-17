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
              >
                <a-form-item
                  label="Title"
                  name="name"
                  :rules="[{ required: true, message: 'Please input a name!' }]"
                >
                  <a-input
                    v-model:value="formState.amount"
                    placeholder="Name"
                  />
                </a-form-item>

                <a-form-item label="Description" name="description">
                  <a-textarea
                    v-model:value="formState.description"
                    placeholder="Enter a description"
                  />
                </a-form-item>
                <a-form-item label="Cover" name="cover">
                  <a-upload-dragger
                    class="ninjadash-uploader-large"
                    v-model:fileList="fileList"
                    name="file"
                    :multiple="true"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    @change="handleChange"
                  >
                    <p class="ant-upload-text">Drop file here to upload</p>
                  </a-upload-dragger>
                </a-form-item>
               
                  <div class="flex gap-x-2 items-center">
                    <a-switch v-model:checked="checked" :class="checked?'bg-blue-600':' bg-gray-400'"/>
                    <span class="font-medium">Active</span>
                  </div>
               
                <div class="col-span-2 flex justify-center mt-7">
                  <sdButton
                    class="btn-create w-full max-w-[250px] mx-auto"
                    htmlType="submit"
                    type="primary"
                    size="lg"
                  >
                    Create Banner
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
import { reactive, ref } from "vue";
import { BasicFormWrapper } from "../../styled";
import { message } from "ant-design-vue";

const values = ref(null);
const checked = ref(false)
const handleSubmit = (value) => {
  values.value = value;
};

const formState = reactive({
  first_name: "",
  last_name: "",
  phone: "",
  gender: "",
  email: "",
  password: "",
});
const fileList = [];
const handleChange = (info) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};
</script>
