<template>
  <div class="w-full sm:w-[400px]">
    <h1 class="mb-7 text-base font-bold text-center">Assign Request</h1>
    <div class="ninjadash-authentication-content">
      <a-form
        name="register"
        :model="formState"
        @finish="handleSubmit"
        layout="vertical"
      >
        <a-form-item
          name="rmUserId"
          label="Relationship manager"
          :rules="[ { required: true, message: 'Please select a relationship manager!' } ]"
          class="mb-7"
        >
          <a-select class="capitalize" size="large" v-model:value="formState.rmUserId">
            <a-select-option value="">Please Select</a-select-option>
            <a-select-option
              class="capitalize"
              v-for="user in managers"
              :key="user.userId"
              :value="user.userId"
            >
              {{ user.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item>
          <sdButton
            class="btn-create w-full"
            htmlType="submit"
            type="primary"
            size="lg"
            :disabled="isLoading"
          >
            {{ isLoading ? "Loading..." : "Assign" }}
          </sdButton>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import { computed, inject, reactive, defineComponent, watch, onMounted, toRefs } from "vue";
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
    const profile = computed(() => state.auth.userData);
    const isLoading = computed(() => state.users.adssignloading);
    const managers = computed(() => state.users.data.map(user => ({
      userId: user.userId,
      name: user.fullName,
    })));

    const formState = reactive({
      rmUserId: "",
      rmFullName: "",
      assignBy: profile.value.fullName,
      requestId: detail?.value.id,
    });

    const handleSubmit = (value) => {
      const selectedUser = managers.value.find(user => user.userId === value.rmUserId);
      if (selectedUser) {
        formState.rmFullName = selectedUser.name;
        // Uncomment the following line to dispatch the action
        dispatch("assignRequest", formState);
      }
    };

    onMounted(() => {
      dispatch("getUsers", { pageNumber: 1, pageSize: 100000, role: "Relationship manager" });
    });

    watch(() => state.users.assignsuccess, (newVal) => {
      if (newVal) {
        message.success("Request assigned successfully!");
        visible.value = false;
        emit("close");
      }
    });

    return {
      managers,
      handleSubmit,
      formState,
      isLoading,
    };
  },
});
</script>
