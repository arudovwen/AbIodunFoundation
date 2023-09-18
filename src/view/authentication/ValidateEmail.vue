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
              <a-form-item label="Otp Code" name="email">
                <a-input
                  type="text"
                  v-model:value="formState.email"
                
                />
              </a-form-item>
              <a-form-item>
                <sdButton
                  class="btn-reset w-full"
                  htmlType="submit"
                  type="primary"
                  size="lg"
                >
                  Submit
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
  import {useRouter} from "vue-router"
  import { message } from "ant-design-vue";
  
  const ForgotPassword = defineComponent({
    name: "ForgotPassword",
    components: { AuthWrapper },
    setup() {
        const router = useRouter()
      const handleSubmit = (values) => {
        console.log(values);
        message.success("Email validation successfully")
        router.push("/auth/login")
      };
  
      const formState = reactive({
        email: "",
      });
  
      return {
        handleSubmit,
        formState,
      };
    },
  });
  
  export default ForgotPassword;
  </script>
  