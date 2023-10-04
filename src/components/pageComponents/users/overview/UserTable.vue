<template>
  <UserTableStyleWrapper>
    <TableWrapper class="table-responsive">
      <a-table
        :loading="loading"
        :dataSource="usersData"
        :columns="userTableHeader"
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
          <template v-if="column.key === 'action'">
            <div class="">
              <button
                v-if="record.statusInt !== 5"
                @click="openDelete(record, 'disable')"
                class="text-xs bg-gray-200 rounded-full py-1 px-2"
              >
                Disable
              </button>
              <button
                v-if="record.statusInt === 5"
                @click="openDelete(record, 'enable')"
                class="text-xs bg-gray-600 text-white rounded-full py-1 px-2"
                type="default"
                to="#"
                shape="circle"
              >
                Enable
              </button>
            </div>
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
          :disabled="deleteloading"
          class=""
          size="sm"
          key="1"
          type="error"
          @click="handleDelete"
          >{{ deleteloading ? "Processing..." : "Confirm" }}
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
import { userTableHeader } from "@/utility/constant";
import { message } from "ant-design-vue";

const UserListTable = defineComponent({
  name: "UserListTable",
  components: { UserTableStyleWrapper, TableWrapper, Modal },
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
    });
    const { state, dispatch } = useStore();
    onMounted(() => {
      dispatch("getUsers", query);
    });
    function fetchRecords(page) {
      dispatch("getUsers", { ...query, pageNumber: page });
    }
    const loading = computed(() => state.users.loading);
    const total = computed(() => state.users.total);
    const addsuccess = computed(() => state.users.addsuccess);
    const deleteloading = computed(() => state.users.deleteloading);
    const deletesuccess = computed(() => state.users.deletesuccess);
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
        } = user;

        return {
          key: userId,
          userId: userId,
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
          role: roleName == "admin" ? "Administrator" : "Customer",
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
      } else {
        dispatch("enableUser", detail.value.userId);
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
      userTableHeader,
      loading,
      deleteloading,
    };
  },
});

export default UserListTable;
</script>
