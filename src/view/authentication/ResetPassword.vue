<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="8" :md="12" :sm="18">
      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Reset Password?</h2>
        </div>
        <div class="ninjadash-authentication-content">
          <a-form @finish="handleSubmit" :model="formState" layout="vertical">
            <p class="forgot-text mb-8">
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </p>
            <a-form-item
              :rules="[
                { required: true, message: 'Please input a password!' },
                {
                  validator: validatePassword,
                  message:
                    'Password must be at least 8 characters long and contain both uppercase and lowercase letters as well as numbers.',
                },
              ]"
              name="newPassword"
              initialValue=""
              label="New Password"
            >
              <a-input
                type="password"
                v-model:value="formState.newPassword"
                placeholder="Password"
              />
            </a-form-item>
            <a-form-item
              name="confirmPassword"
              initialValue=""
              label="Confirm Password"
              :rules="confirmPasswordRules"
            >
              <a-input
                type="password"
                v-model:value="formState.confirmPassword"
                placeholder="Password"
              />
            </a-form-item>
            <a-form-item>
              <sdButton
                class="btn-reset w-full"
                htmlType="submit"
                type="primary"
                size="lg"
                :disabled="isLoading"
              >
                {{ isLoading ? "Loading" : "Submit" }}
              </sdButton>
            </a-form-item>
            <p class="return-text text-center">
              Return to <router-link to="/auth/login">Sign In</router-link>
            </p>
          </a-form>
        </div>
      </AuthWrapper>
    </a-col>
  </a-row>
</template>
<script>
import { reactive, defineComponent, computed, watch } from "vue";
import { AuthWrapper } from "./style";
import { message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const ResetPassword = defineComponent({
  name: "ResetPassword",
  components: { AuthWrapper },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { state, dispatch } = useStore();
    const isLoading = computed(() => state.auth.loading);
    const isSuccess = computed(() => state.auth.resetsuccess);
    const handleSubmit = () => {
      dispatch("resetPassword", formState);
    };

    const formState = reactive({
      newPassword: "",
      confirmPassword: "",
      token: route.query.code,
      userName: route.query.email,
    });
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

    const confirmPasswordRules = [
      {
        required: true,
        message: "Please confirm your password",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("newPassword") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("The two passwords do not match"));
        },
      }),
    ];
    watch(isSuccess, () => {
      if (isSuccess.value) {
        message.success("Email reset successful!");
        router.push(`/auth/login`);
      }
    });

    return {
      handleSubmit,
      formState,
      isLoading,
      confirmPasswordRules,
      validatePassword,
    };
  },
});

export default ResetPassword;
</script>
