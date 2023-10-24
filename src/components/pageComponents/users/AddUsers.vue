<template>
  <div class="w-full sm:w-[400px]">
    <h1 class="mb-7 text-base font-bold text-center">Register Administrator</h1>
    <div class="ninjadash-authentication-content">
      <a-form
        name="register"
        :model="formState"
        @finish="handleSubmit"
        layout="vertical"
      >
      <div class="md:grid grid-cols-2 gap-x-4">
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
          :rules="[{ required: true, message: 'Please input your Last name!' }]"
        >
          <a-input v-model:value="formState.lastName" placeholder="Last name" />
        </a-form-item></div>
        <a-form-item
          name="emailAddress"
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
            v-model:value="formState.emailAddress"
            placeholder="name@example.com"
          />
        </a-form-item>

        <div class="md:grid grid-cols-2 gap-x-4">
          <a-form-item
            name="userRole"
            label="Role"
            :rules="[{ required: true, message: 'Please select a role!' }]"
          >
            <a-select
              class="capitalize"
              size="large"
              v-model:value="formState.userRole"
            >
              <a-select-option value="">Please Select</a-select-option>
              <a-select-option v-for="role in roles" :value="role" :key="role">
                {{ role }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            name="gender"
            label="Gender"
            :rules="[{ required: true, message: 'Please select your gender!' }]"
          >
            <a-select size="large" v-model:value="formState.gender">
              <a-select-option value="">Please Select</a-select-option>
              <a-select-option value="male">Male</a-select-option>
              <a-select-option value="female">Female</a-select-option>
            </a-select>
          </a-form-item>
        </div>
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
          <a-input-password
            type="password"
            v-model:value="formState.password"
            placeholder="Password"
          />
        </a-form-item>

        <a-form-item>
          <sdButton
            class="btn-create w-full"
            htmlType="submit"
            type="primary"
            size="lg"
            :disabled="isLoading"
          >
            {{ isLoading ? "Loading..." : "Create Account" }}
          </sdButton>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { message } from "ant-design-vue";
import {
  computed,
  inject,
  reactive,
  ref,
  defineComponent,
  watch,
  onMounted,
} from "vue";
import { useStore } from "vuex";

const SignUp = defineComponent({
  name: "SignUp",

  setup() {
    const visible = inject("visible");
    const { state, dispatch } = useStore();
    const isLoading = computed(() => state.users.addloading);
    const addsuccess = computed(() => state.users.addsuccess);
    const error = computed(() => state.users.error);
    const values = ref(null);
    const roles = computed(() => state.users.roles);
    const handleSubmit = (value) => {
      values.value = value;
      dispatch("addUser", formState);
    };
    onMounted(() => {
      dispatch("getRoles");
    });
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
    const formState = reactive({
      firstName: "",
      lastName: "",
      gender: "",
      password: "",
      emailAddress: "",
      phoneNumber: "",
      userRole: "",
    });
    watch(addsuccess, () => {
      if (addsuccess.value) {
        message.success("Admin creation successful!");
        visible.value = false;
      }
    });
    return {
      validatePassword,
      roles,
      handleSubmit,
      formState,
      validatePhoneNumber,
      isLoading,
      error,
    };
  },
});

export default SignUp;
</script>
