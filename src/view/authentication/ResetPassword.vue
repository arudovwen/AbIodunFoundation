<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="8" :md="12" :sm="18">
      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Reset Password?</h2>
        </div>
        <div class="ninjadash-authentication-content">
          <a-form @finish="handleSubmit" :model="formState" layout="vertical">
            <p class="forgot-text">
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </p>
            <a-form-item
              name="new-password"
              initialValue="123456"
              label="New Password"
            >
              <a-input
                type="password"
                v-model:value="formState.password"
                placeholder="Password"
              />
            </a-form-item>
            <a-form-item
              name="confirm-password"
              initialValue="123456"
              label="Confirm Password"
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
              >
                Send Reset Instructions
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
import { reactive, defineComponent } from "vue";
import { AuthWrapper } from "./style";

const ResetPassword = defineComponent({
  name: "ResetPassword",
  components: { AuthWrapper },
  setup() {
    const handleSubmit = (values) => {
      console.log(values);
    };

    const formState = reactive({
      password: "",
      confirmPassword: "",
    });

    return {
      handleSubmit,
      formState,
    };
  },
});

export default ResetPassword;
</script>
