<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="8" :md="12" :sm="18">
      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">Validate Email</h2>
        </div>
        <div class="ninjadash-authentication-content">
          <a-form @finish="handleSubmit" :model="formState" layout="vertical">
            <p class="forgot-text mb-6">
              Enter the otp code sent your email on registration
            </p>
            <a-form-item
              label="Otp Code"
              name="token"
              :rules="[{ required: true, message: 'Please input your otp!' }]"
            >
              <a-input type="text" v-model:value="formState.token" />
            </a-form-item>
            <a-form-item
              name="password"
              label="Password"
              :rules="[
                { required: true, message: 'Please input your password!' },
              ]"
            >
              <a-input
                type="password"
                v-model:value="formState.password"
                placeholder="Password"
              />
            </a-form-item>
            <p class="return-text text-center mb-2">
              Didn't get an otp?
              <button
                @click="handleRequest"
                :disabled="isLoading || isRequesting"
                class="font-medium disabled:cursor-not-allowed"
              >
                {{
                  isRequesting
                    ? `Requesting in ${requestCountdown}s`
                    : "Request now"
                }}
              </button>
            </p>
            <a-form-item>
              <sdButton
                class="btn-reset w-full"
                htmlType="submit"
                type="primary"
                size="lg"
                :disabled="isLoading"
              >
                {{ isLoading ? "Loading..." : "Submit" }}
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
import {
  computed,
  reactive,
  defineComponent,
  watch,
  onMounted,
  ref,
} from "vue";
import { AuthWrapper } from "./style";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

const ValidateEmail = defineComponent({
  name: "ValidateEmail",
  components: { AuthWrapper },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const emailAddress = route.params.email;
    const { state, dispatch } = useStore();
    const isLoading = computed(() => state.auth.loading);
    const isSuccess = computed(() => state.auth.success);
    const error = computed(() => state.auth.error);
    const handleSubmit = () => {
      console.log(formState);
      // dispatch("validateEmailComplete", { formState });
    };

    const formState = reactive({
      emailAddress,
      token: "",
      password: "",
    });
    watch(isSuccess, () => {
      message.success("Email validation successful");
      router.push("/auth/login");
    });
    onMounted(() => {
      dispatch("validateEmailInitiate", { emailAddress });
    });
    const requestCountdown = ref(0);
    const isRequesting = ref(false);

    function startRequestCountdown() {
      requestCountdown.value = 60; // Set the countdown time in seconds
      isRequesting.value = true;

      const countdownInterval = setInterval(() => {
        requestCountdown.value -= 1;
        if (requestCountdown.value <= 0) {
          clearInterval(countdownInterval);
          isRequesting.value = false;
        }
      }, 1000); // Update countdown every 1 second
    }

    function handleRequest() {
      if (!isRequesting.value) {
        // Only allow requests if not currently requesting
        dispatch("validateEmailInitiate", { emailAddress });
        startRequestCountdown();
      }
    }
    return {
      handleSubmit,
      formState,
      isLoading,
      error,
      requestCountdown,
      isRequesting,
      handleRequest,
    };
  },
});

export default ValidateEmail;
</script>
