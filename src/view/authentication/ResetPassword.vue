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
            <a-form-item name="password" initialValue="" label="New Password">
              <a-input
                type="password"
                v-model:value="formState.password"
                placeholder="Password"
              />
            </a-form-item>
            <a-form-item
              name="confirmPassword"
              initialValue=""
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
    const isSuccess = computed(() => state.auth.forgotsuccess);
    const handleSubmit = () => {
      dispatch("resetPassword", formState);
    };

    const formState = reactive({
      password: "",
      confirmPassword: "",
      token: route.query.code,
    });
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
    };
  },
});

export default ResetPassword;
</script>
