<template>
  <UserTableStyleWrapper>
    <TableWrapper class="table-responsive">
      <a-table
        :loading="loading || forgotLoading"
        :dataSource="usersData"
        :columns="customerTableHeader"
        :pagination="{
          defaultPageSize: query.pageSize,
          total: total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page) => {
            fetchRecords(page);
          },
        }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'fullName'">
            <div>
              <span class="block text-sm font-medium">{{ record?.name }}</span>
              <span class="block text-gray-600">{{
                record?.emailAddress
              }}</span>
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <Menu as="div" class="">
              <Float placement="bottom-end" :offset="4" portal>
                <MenuButton
                  class="rounded-md px-1 py-2 text-sm font-medium text-white w-auto ml-auto block"
                >
                  <unicon name="ellipsis-v" width="16"></unicon>
                </MenuButton>
                <MenuItems
                  class="w-[150px] rounded-md bg-white shadow-lg border-gray-50"
                >
                  <div class="px-1 grid gap-y-1">
                    <router-link
                      :to="`/service/request?id=${record?.userId}&regionId=${record?.regionId}`"
                    >
                      <button class="text-sm py-2 px-2">
                        Initiate Request
                      </button>
                    </router-link>
                  </div>
                </MenuItems>
              </Float>
            </Menu>
          </template>
        </template></a-table
      >
    </TableWrapper>
  </UserTableStyleWrapper>
  <Modal :open="visible" @close="visible = false">
    <div class="bg-white rounded-lg">
      <h3 class="text-xl font-bold mb-4">Confirm action</h3>
      <p class="mb-7">Are you sure about this action?</p>
      <div class="flex justify-between">
        <sdButton
          :disabled="deleteloading"
          @click="visible = false"
          size="sm"
          key="1"
          type="light"
        >
          Cancel
        </sdButton>
        <sdButton
          :disabled="deleteloading || forgotLoading"
          class=""
          size="sm"
          key="1"
          type="error"
          @click="handleDelete"
          >{{ deleteloading || forgotLoading ? "Processing..." : "Confirm" }}
        </sdButton>
      </div>
    </div>
  </Modal>
</template>
<script>
import Modal from "components/Modal";
import moment from "moment";
import { useStore } from "vuex";
import { debounce } from "lodash";
import { UserTableStyleWrapper } from "../style";
import { TableWrapper } from "../../../styled";
import {
  computed,
  defineComponent,
  onMounted,
  watch,
  reactive,
  inject,
  ref,
} from "vue";
import { customerTableHeader } from "@/utility/constant";
import { message } from "ant-design-vue";
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import { Float } from "@headlessui-float/vue";

const UserListTable = defineComponent({
  name: "UserListTable",
  components: {
    UserTableStyleWrapper,
    TableWrapper,
    Modal,
    Menu,
    MenuButton,
    MenuItems,
    Float,
  },
  setup() {
    const visible = ref(false);
    const detail = ref("");
    const type = ref("");
    const search = inject("search");
    const query = reactive({
      pageNumber: 1,
      pageSize: 10,
      name: "",
      email: "",
      mobileNo: "",
      role: "customer",
    });
    const { state, dispatch } = useStore();
    onMounted(() => {
      dispatch("getUsers", query);
      dispatch("getRoles");
      dispatch("getRegions", { pageNumber: 1, pageSize: 1000 });
      dispatch("getAllUsers", { ...query, pageSize: 10000 });
    });
    function fetchRecords(page) {
      dispatch("getUsers", { ...query, pageNumber: page });
    }
    const loading = computed(() => state.users.loading);
    const total = computed(() => state.users.total);
    const roles = computed(() => state.users.roles);
    const addsuccess = computed(() => state.users.addsuccess);
    const deleteloading = computed(() => state.users.deleteloading);
    const deletesuccess = computed(() => state.users.deletesuccess);
    const forgotLoading = computed(() => state.auth.loading);
    const forgotSuccess = computed(() => state.auth.forgotsuccess);
    const regionsData = computed(() => state.regions.data);
    const usersData = computed(() =>
      state.users.data.map((user) => {
        const {
          userId,
          fullName,
          emailAddress,
          roleName,
          mobileNo,
          status,
          createdOn,
          lastLogin,
          regionId,
        } = user;

        return {
          key: userId,
          userId: userId,
          region: regionsData.value.find((i) => i.id === regionId)?.name,
          regionId,
          name: fullName,
          fullName: (
            <div class="user-info">
              {/* <figure>
                <img
                  style={{ width: "40px" }}
                  src={require(`@/${img}`)}
                  alt=""
                />
              </figure> */}
              <figcaption>
                <sdHeading class="user-name" as="h6">
                  {fullName}
                </sdHeading>
              </figcaption>
            </div>
          ),
          emailAddress,
          mobileNo,
          role: <span class="capitalize">{roleName}</span>,
          emailValidated: status !== 0 ? "Yes" : "No",
          createdOn: moment(createdOn).format("ll"),
          lastLogin:
            lastLogin && lastLogin !== "n/a"
              ? moment(lastLogin).format("lll")
              : "-",
          statusInt: status,
          status: (
            <span class={`status-text `}>
              {status === 0 && (
                <span class="bg-orange-50 text-orange-500 px-3 py-[2px] rounded-full">
                  {" "}
                  Pending Activation
                </span>
              )}
              {status === 1 && (
                <span class="bg-green-50 text-green-500 px-3 py-[2px] rounded-full">
                  {" "}
                  Active
                </span>
              )}
              {status === 5 && (
                <span class="bg-green-50 text-red-500 px-3 py-[2px] rounded-full">
                  {" "}
                  Inactive
                </span>
              )}
            </span>
          ),
          action: "",
        };
      })
    );
    function openDelete(data, value) {
      type.value = value;
      visible.value = true;
      detail.value = data;
    }

    function handleDelete() {
      if (type.value === "disable") {
        dispatch("disableUser", detail.value.userId);
      }
      if (type.value === "enable") {
        dispatch("enableUser", detail.value.userId);
      }
      if (type.value === "password") {
        dispatch("forgotPassword", { emailAddress: detail.value.emailAddress });
      }
    }
    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getUsers", { ...query, name: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getUsers", query);
    });
    watch(forgotSuccess, () => {
      if (forgotSuccess.value) {
        visible.value = false;
        message.success("Reset link sent!");
      }
    });
    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getUsers", query);
        message.success("User disabled!");
        visible.value = false;
      }
    });

    watch(search, () => {
      debouncedSearch(search.value);
    });

    return {
      handleDelete,
      openDelete,
      visible,
      query,
      total,
      fetchRecords,
      usersData,
      customerTableHeader,
      loading,
      deleteloading,
      forgotLoading,
      roles,
    };
  },
});

export default UserListTable;
</script>
