<template>
 
  <div>
    <h1 class="mb-7 text-base font-bold text-center">Register Administrator</h1>
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
          <a-input v-model:value="formState.name" placeholder="First name" />
        </a-form-item>
        <a-form-item
          label="Last Name"
          name="last_name"
          :rules="[{ required: true, message: 'Please input your Last name!' }]"
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
          <a-input v-model:value="formState.phone" placeholder="Phone number" />
        </a-form-item>

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
      </a-form>
    </div>
  </div>
</template>
<script>
import { reactive, ref, defineComponent } from "vue";
// import InlineSvg from "vue-inline-svg";

const SignUp = defineComponent({
  name: "SignUp",
  components: {
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
