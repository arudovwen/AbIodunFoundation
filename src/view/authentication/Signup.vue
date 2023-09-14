<template>
  <a-row justify="center">
    <a-col :xxl="6" :xl="12" :md="12" :sm="18">
      <AuthWrapper>
        <div class="ninjadash-authentication-top">
          <h2 class="ninjadash-authentication-top__title">
            Sign Up Biodun & Ibikunle Foundation
          </h2>
        </div>
        <div class="ninjadash-authentication-content">
          <a-form
            name="register"
            :model="formState"
            @finish="handleSubmit"
            layout="vertical"
          >
            <a-form-item
              label="First Name"
              name="first_name"
              :rules="[
                { required: true, message: 'Please input your First name!' },
              ]"
            >
              <a-input
                v-model:value="formState.name"
                placeholder="First name"
              />
            </a-form-item>
            <a-form-item
              label="Last Name"
              name="last_name"
              :rules="[
                { required: true, message: 'Please input your Last name!' },
              ]"
            >
              <a-input v-model:value="formState.name" placeholder="Last name" />
            </a-form-item>
            <a-form-item
              name="email"
              label="Email Address"
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
                v-model:value="formState.email"
                placeholder="name@example.com"
              />
            </a-form-item>

            <a-form-item
              name="gender"
              label="Gender"
              :rules="[
                { required: true, message: 'Please select your gender!' },
              ]"
            >
              <a-select
                class="h-[49px] leading-[47px]"
                v-model:value="formState.gender"
              >
              <a-select-option value="">Please Select</a-select-option>
                <a-select-option value="male">Male</a-select-option>
                <a-select-option value="female">Female</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="Phone Number"
              name="phone"
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
                v-model:value="formState.phone"
                placeholder="Phone number"
              />
            </a-form-item>

            <a-form-item
              label="Password"
              name="password"
              :rules="[
                { required: true, message: 'Please input your password!' },
                {
                  validator: validatePassword,
                  message:
                    'Password must be at least 8 characters long and contain both uppercase and lowercase letters as well as numbers.',
                },
              ]"
            >
              <a-input
                type="password"
                v-model:value="formState.password"
                placeholder="Password"
              />
            </a-form-item>
            <div class="ninjadash-auth-extra-links">
              <a-checkbox @change="onChange">
                Creating an account means you’re okay with our Terms of Service
                and Privacy Policy
              </a-checkbox>
            </div>
            <a-form-item>
              <sdButton
                class="btn-create"
                htmlType="submit"
                type="primary"
                size="lg"
              >
                Create Account
              </sdButton>
            </a-form-item>
            <!-- <p class="ninjadash-form-divider">
              <span>Or</span>
            </p>
            <ul class="ninjadash-social-login">
              <li>
                <a class="google-social" href="#">
                  <InlineSvg
                    :src="require('@/static/img/icon/google-plus.svg')"
                  ></InlineSvg>
                </a>
              </li>
              <li>
                <a class="facebook-social" href="#">
                  <unicon name="facebook-f"></unicon>
                </a>
              </li>
              <li>
                <a class="twitter-social" href="#">
                  <unicon name="twitter"></unicon>
                </a>
              </li>
              <li>
                <a class="twitter-social" href="#">
                  <unicon name="github"></unicon>
                </a>
              </li>
            </ul> -->
          </a-form>
        </div>
        <div class="ninjadash-authentication-bottom">
          <p>
            Already have an account?<router-link to="/auth/login"
              >Sign In</router-link
            >
          </p>
        </div>
      </AuthWrapper>
    </a-col>
  </a-row>
</template>
<script>
import { AuthWrapper } from "./style";
import { reactive, ref, defineComponent } from "vue";
// import InlineSvg from "vue-inline-svg";

const SignUp = defineComponent({
  name: "SignUp",
  components: {
    AuthWrapper,
    // ,  InlineSvg
  },
  setup() {
    const values = ref(null);
    const checked = ref(null);
    const handleSubmit = (value) => {
      values.value = value;
    };

    const onChange = (check) => {
      checked.value = check;
    };
    const validatePassword = (rule, value, callback) => {
      // Check if the password is at least 8 characters long
      if (value.length >= 8) {
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

    const validatePhoneNumber = (rule, value, callback) => {
      // Remove any non-numeric characters from the input
      const phoneNumber = value.replace(/\D/g, "");

      // Check if the cleaned phone number has exactly 10 digits
      if (phoneNumber.length === 11) {
        // Valid phone number
        callback();
      } else {
        // Invalid phone number
        callback(new Error("Please enter a valid 11-digit phone number."));
      }
    };
    const formState = reactive({
      first_name: "",
      last_name: "",
      phone: "",
      gender: "",
      email: "",
      password: "",
    });
    return {
      validatePassword,
      onChange,
      handleSubmit,
      formState,
      validatePhoneNumber,
    };
  },
});

export default SignUp;
</script>
