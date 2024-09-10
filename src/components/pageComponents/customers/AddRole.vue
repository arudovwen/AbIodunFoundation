<template>
  <div class="w-full sm:w-[300px]">
    <h1 class="mb-7 text-lg font-bold text-center">Role Management</h1>
    <div class="border rounded-lg p-5 mb-10">
      <div class="font-medium mb-3">Roles</div>
      <ul class="grid gap-y-1 gap-x-7">
        <li class="flex justify-between items-center text-base">
          Administrator
          <div class="flex gap-x-2">
            <button @click="isEditing = !isEditing">
              <unicon name="edit-alt" class="w-3"></unicon>
            </button>
            <button><unicon name="times" class="text-sm w-4"></unicon></button>
          </div>
        </li>
        <li class="flex justify-between items-center">
          Customers
          <div class="flex gap-x-2">
            <unicon
              name="edit-alt"
              class="w-3"
              @click="isEditing = !isEditing"
            ></unicon>
            <unicon name="times" class="text-sm w-4"></unicon>
          </div>
        </li>
      </ul>
    </div>
    <div class="ninjadash-authentication-content">
      <a-form
        name="register"
        :model="formState"
        @finish="handleSubmit"
        layout="vertical"
      >
        <a-form-item
          name="name"
          :rules="[{ required: true, message: 'Please input a name!' }]"
        >
          <a-input
            v-model:value="formState.name"
            placeholder="Provide a role name"
          />
        </a-form-item>
      </a-form>
      <a-form-item>
        <sdButton
          class="btn-create w-full"
          htmlType="submit"
          type="primary"
          size="lg"
          :disabled="isLoading"
        >
          {{ isLoading ? "Loading..." : isEditing ? "Update" : "Add Role" }}
        </sdButton>
      </a-form-item>
  
    </div>
  </div>
</template>
<script>
import { message } from "ant-design-vue";
import { computed, inject, reactive, ref, defineComponent, watch } from "vue";
import { useStore } from "vuex";

const Roles = defineComponent({
  name: "Roles",

  setup() {
    const isEditing = ref(false);
    const visible = inject("visible");
    const { state, dispatch } = useStore();
    const isLoading = computed(() => state.users.addloading);
    const addsuccess = computed(() => state.users.addsuccess);
    const error = computed(() => state.users.error);
    const values = ref(null);

    const handleSubmit = (value) => {
      values.value = value;
      dispatch("addUser", formState);
    };

    const formState = reactive({
      name: "",
    });
    watch(addsuccess, () => {
      if (addsuccess.value) {
        message.success("Role creation successful!");
        visible.value = false;
      }
    });
    return {
      handleSubmit,
      formState,
      isLoading,
      error,
      isEditing,
    };
  },
});

export default Roles;
</script>
