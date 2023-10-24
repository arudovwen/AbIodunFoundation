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
              name="token"
              label="Token"
              :rules="[
                { required: true, message: 'Please input your token!' },
              ]"
            >
              <a-input
               
                v-model:value="formState.token"
                placeholder="Enter your Token"
              />
            </a-form-item>
            <a-form-item
              name="password"
              label="Password"
              :rules="[
                { required: true, message: 'Please input your password!' },
              ]"
            >
              <a-input-password
                type="password"
                v-model:value="formState.password"
                placeholder="Password"
              />
            </a-form-item>
            <p class="return-text text-center mb-2">
              Didn't get an otp?
              <button
                @click="handleRequest"
                :disabled="validatebeginloading || isRequesting"
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
                :disabled="validateendloading || validatebeginloading"
              >
                {{ validateendloading ? "Loading..." : "Submit" }}
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
    const { state, dispatch } = useStore();
    const router = useRouter();
    const route = useRoute();
    const emailAddress = route.params.email;


    const validatebeginloading = computed(() => state.auth.validatebeginloading);
    const validateendloading = computed(() => state.auth.validateendloading);
    // const validatebeginsuccess = computed(() => state.auth.validatebeginsuccess);
    const validateendsuccess = computed(() => state.auth.validateendsuccess);
    const token = computed(() => state.auth.token);

    const error = computed(() => state.auth.error);
    const handleSubmit = () => {
      dispatch("validateEmailComplete", formState);
    };

    const formState = reactive({
      emailAddress,
      token: "",
      password: "",
    });

    watch(validateendsuccess, () => {
      if (validateendsuccess.value) {
        message.success("Email validation successful");
        router.push("/auth/login");
      }
    });

    // watch(token, () => {
    //   formState.token = token?.value?.split(":")[1]?.trim();
    // });

    onMounted(() => {
      setTimeout(() => {
        dispatch("validateEmailInitiate", { emailAddress });
      }, 1000);
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
 
      error,
      requestCountdown,
      isRequesting,
      handleRequest,
      token,
      validatebeginloading,
      validateendloading
    };
  },
});

export default ValidateEmail;
</script>
