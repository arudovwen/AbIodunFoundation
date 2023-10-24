<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="8" :md="12" :sm="18">
      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Forgot Password?</h2>
        </div>
        <div class="ninjadash-authentication-content">
          <a-form @finish="handleSubmit" :model="formState" layout="vertical">
            <p class="forgot-text mb-8">
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </p>
            <a-form-item
              label="Email Address"
              name="emailAddress"
              :rules="[
                {
                  required: true,
                  message: 'Please input your email!',
                  type: 'email',
                },
              ]"
            >
              <a-input
                type="email"
                v-model:value="formState.emailAddress"
                placeholder="name@example.com"
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
                {{ isLoading ? "Loading..." : "Send Reset Instructions" }}
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const ForgotPassword = defineComponent({
  name: "ForgotPassword",
  components: { AuthWrapper },
  setup() {
    // eslint-disable-next-line no-unused-vars
    const router = useRouter();
    const { state, dispatch } = useStore();
    const isLoading = computed(() => state.auth.loading);
    const isSuccess = computed(() => state.auth.forgotsuccess);
    const token = computed(() => state.auth.token);

    const handleSubmit = (values) => {
      dispatch("forgotPassword", values);
    };

    const formState = reactive({
      emailAddress: "",
      token: "",
    });
    watch(token, () => {
      formState.token = token?.value

        ?.replace("Password reset initiated successfully!", "")
        ?.trim();

      router.push(
        `/auth/reset-password?email=${encodeURIComponent(formState.emailAddress)}`
      );
    });
    watch(isSuccess, () => {
      if (isSuccess.value) {
        message.success("Email sent!");
      }
    });
    return {
      handleSubmit,
      formState,
      isLoading,
    };
  },
});

export default ForgotPassword;
</script>
