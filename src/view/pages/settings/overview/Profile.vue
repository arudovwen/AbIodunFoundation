<template>
  <sdCards>
    <template v-slot:title>
      <div class="setting-card-title">
        <sdHeading as="h4">Edit Profile</sdHeading>
        <span>Set Up Your Personal Information</span>
      </div>
    </template>
    <a-row type="flex" justify="center">
      <a-col :xxl="12" :lg="24" :xs="24">
        <BasicFormWrapper>
          <a-form
            :model="formState"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
            layout="vertical"
          >
            <a-form-item
              label="First Name"
              name="firstName"
              :rules="[
                { required: true, message: 'Please input your First name!' },
              ]"
            >
              <a-input
                v-model:value="formState.firstName"
                placeholder="First name"
              />
            </a-form-item>
            <a-form-item
              label="Last Name"
              name="lastName"
              :rules="[
                { required: true, message: 'Please input your Last name!' },
              ]"
            >
              <a-input
                v-model:value="formState.lastName"
                placeholder="Last name"
              />
            </a-form-item>
            <a-form-item name="emailAddress" label="Email Address">
              <a-input
                type="email"
                readonly
                disabled
                class="bg-grey-100"
                :value="formState.emailAddress"
                placeholder="name@example.com"
                ><template #suffix>
                  <unicon name="lock" width="16"></unicon> </template
              ></a-input>
            </a-form-item>

            <a-form-item
              name="gender"
              label="Gender"
              :rules="[
                { required: true, message: 'Please select your gender!' },
              ]"
            >
              <a-select size="large" v-model:value="formState.gender">
                <a-select-option value="">Please Select</a-select-option>
                <a-select-option value="male">Male</a-select-option>
                <a-select-option value="female">Female</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="Phone Number"
              name="phoneNumber"
              :rules="[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
                {
                  validator: validatePhoneNumber,
                  message: 'Please enter a valid 11-digit phone number.',
                },
              ]"
            >
              <a-input
                v-model:value="formState.phoneNumber"
                placeholder="Phone number"
              />
            </a-form-item>

            <div class="setting-form-actions">
              <sdButton
                :loading="editloading"
                size="default"
                htmlType="submit"
                type="primary"
              >
                Update Profile
              </sdButton>
              &nbsp; &nbsp;
              <sdButton size="default" @click="handleCancel" type="light">
                Cancel
              </sdButton>
            </div>
          </a-form>
        </BasicFormWrapper>
      </a-col>
    </a-row>
  </sdCards>
</template>
<script>
import { message } from "ant-design-vue";
import {
  BasicFormWrapper,
  //  TagInput
} from "../../../styled";
import { onMounted, defineComponent, reactive, computed, watch } from "vue";
import { useStore } from "vuex";
const Profile = defineComponent({
  name: "Profile",
  components: {
    BasicFormWrapper,
    // , TagInput
  },

  setup() {
    const { state, dispatch } = useStore();
    const loading = computed(() => state.users.loading);
    const editloading = computed(() => state.users.editloading);
    const profile = computed(() => state.users.profile);
    const success = computed(() => state.users.success);
    const editsuccess = computed(() => state.users.editsuccess);
    const userData = computed(() => state.auth.userData);

    onMounted(() => {
      dispatch("getUserById", userData.value.id);
    });
    const formState = reactive({
      firstName: "",
      lastName: "",
      gender: "",
      password: "",
      emailAddress: "",
      phoneNumber: "",
    });

    const handleFinish = (values) => {

      dispatch("updateUser",{...values, userId:userData.value.id})
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };
    const validatePhoneNumber = (rule, value, callback) => {
      // Remove any non-numeric characters from the input
      const phoneNumber = value?.replace(/\D/g, "");

      // Check if the cleaned phone number has exactly 10 digits
      if (phoneNumber?.length === 11) {
        // Valid phone number
        callback();
      } else {
        // Invalid phone number
        callback(new Error("Please enter a valid 11-digit phone number."));
      }
    };

    watch(profile, () => {
      formState.firstName = profile.value.firstName;
      formState.lastName = profile.value.lastName;
      formState.gender = profile.value.gender;

      formState.emailAddress = profile.value.email;
      formState.phoneNumber = profile.value.phoneNumber;
    });

    watch(editsuccess, () => {
      if (editsuccess.value) {
        message.success("Profile updated")
        dispatch("getUserById", userData.value.id);
      }
    });

    return {
      validatePhoneNumber,
      success,
      loading,
      formState,
      handleFinish,
      handleFinishFailed,
      profile,
      editloading,
    };
  },

  data() {
    return {
      tags: ["UI/UX", "Branding", "Product Design", "Web Design"],
      values: null,
      inputVisible: false,
      inputValue: "",
    };
  },

  methods: {
    handleCancel(e) {
      e.preventDefault();
      //form.resetFields();
    },
    handleClose(removedTag) {
      const tags = this.tags.filter((tag) => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: "",
      });
    },
  },
});

export default Profile;
</script>
