<template>
  <ChangePasswordWrapper>
    <sdCards>
      <template v-slot:title>
        <div class="setting-card-title">
          <sdHeading as="h4">Password Settings</sdHeading>
          <span>Change or reset your account password</span>
        </div>
      </template>
      <a-row type="flex" justify="center">
        <a-col :lg="12" :sm="20" :xs="24">
          <BasicFormWrapper>
            <a-form
              ref="myForm"
              name="password"
              :model="formState"
              @finish="handleFinish"
              layout="vertical"
            >
              <a-form-item
                name="currentPassword"
                label="Current Password"
                :rules="[
                  {
                    required: true,
                    message: 'Please input your current password!',
                  },
                ]"
              >
                <a-input-password
                  type="password"
                  placeholder=""
                  v-model:value="formState.currentPassword"
                />
              </a-form-item>
              <a-form-item
                name="newPassword"
                label="New Password"
                :rules="[
                  { required: true, message: 'Please input your password!' },
                  {
                    validator: validatePassword,
                    message:
                      'Password must be at least 8 characters long and contain both uppercase and lowercase letters as well as numbers.',
                  },
                ]"
              >
                <a-input-password v-model:value="formState.newPassword" />
              </a-form-item>

              <a-form-item>
                <div class="setting-form-actions">
                  <sdButton
                    @click="handleFinish"
                    htmlType="submit"
                    type="primary"
                    class="w-full"
                    :disabled="isLoading"
                  >
                    Change Password
                  </sdButton>
                </div>
              </a-form-item>
            </a-form>
          </BasicFormWrapper>
        </a-col>
      </a-row>
    </sdCards>
  </ChangePasswordWrapper>
</template>

<script>
import { ChangePasswordWrapper } from "./style";
import { BasicFormWrapper } from "../../../styled";
import { computed, ref, reactive, watch } from "vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

export default {
  name: "Password",
  components: { ChangePasswordWrapper, BasicFormWrapper },
  setup() {
    const formState = reactive({
      currentPassword: "",
      newPassword: "",
      userData: "",
    });
    const myForm = ref(null);
    const { state, dispatch } = useStore();
    const isLoading = computed(() => state.users.changeloading);
    const isSuccess = computed(() => state.users.changesuccess);
    const userData = computed(() => state.auth.userData);

    const validatePassword = (rule, value, callback) => {
      // Check if the password is at least 8 characters long
      if (value?.length >= 8) {
        // Check if the password contains at least one uppercase letter
        if (/[A-Z]/.test(value)) {
          // Check if the password contains at least one lowercase letter
          if (/[a-z]/.test(value)) {
            // Check if the password contains at least one digit
            if (/\d/.test(value)) {
              // Valid password
              callback();
            } else {
              // Password does not contain a digit
              callback(new Error("Password must contain at least one digit."));
            }
          } else {
            // Password does not contain a lowercase letter
            callback(
              new Error("Password must contain at least one lowercase letter.")
            );
          }
        } else {
          // Password does not contain an uppercase letter
          callback(
            new Error("Password must contain at least one uppercase letter.")
          );
        }
      } else {
        // Password is less than 8 characters
        callback(new Error("Password must be at least 8 characters long."));
      }
    };

    const handleFinish = () => {
      if (userData.value) {
        dispatch("changePassword", {
          currentPassword: formState.currentPassword,
          newPassword: formState.newPassword,
          userId: userData.value.id,
        });
      }
    };

    watch(isSuccess, () => {
      if (isSuccess.value) {
        myForm.value.resetFields();
        message.success("Password changed");
      }
    });
    return {
      formState,
      handleFinish,
      validatePassword,
      isLoading,
      myForm
    };
  },
};
</script>
