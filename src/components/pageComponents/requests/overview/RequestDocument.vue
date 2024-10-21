<template>
  <div class="w-full sm:w-[400px]">
    <h1 class="mb-7 text-base font-bold text-center">
      Request Additional Documents
    </h1>
    <div class="ninjadash-authentication-content">
      <a-form
        name="register"
        :model="formState"
        @finish="handleSubmit"
        layout="vertical"
      >
        <a-form-item
          name="request"
          label="Document list (Seperate list with a comma)"
          :rules="[
            {
              required: true,
              message: 'Please list the required documents',
            },
          ]"
          class="mb-7"
        >
          <a-textarea
            class="capitalize"
            size="large"
            v-model:value="formState.request"
            placeholder="Proof of funds, Utility bill ....."
          >
          </a-textarea>
        </a-form-item>

        <a-form-item>
          <sdButton
            class="btn-create w-full"
            htmlType="submit"
            type="primary"
            size="lg"
            :disabled="isLoading"
          >
            {{ isLoading ? "Loading..." : "Send request" }}
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
  defineComponent,
  watch,
  toRefs,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "AssignRequest",
  props: {
    detail: {
      type: Object,
      default: null,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const { detail } = toRefs(props);
    const visible = inject("visible");
    const { state, dispatch } = useStore();

    const isLoading = computed(() => state.users.adssignloading);

    const formState = reactive({
      userId: "",
      request: "",
    });

    const handleSubmit = (value) => {
      formState.userId = detail?.value.userId;
      formState.request = value.request;
      // Uncomment the following line to dispatch the action
      dispatch("requestDocuments", formState);
    };

    watch(
      () => state.users.assignsuccess,
      (newVal) => {
        if (newVal) {
          message.success("Request sent successfully!");
          visible.value = false;
          emit("close");
        }
      }
    );

    return {
      handleSubmit,
      formState,
      isLoading,
    };
  },
});
</script>
