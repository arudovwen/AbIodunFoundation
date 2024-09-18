<template>
  <UserTableStyleWrapper>
    <TableWrapper class="table-responsive">
      <a-table
        :loading="loading"
        :dataSource="regionsData"
        :columns="regionTableHeader"
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
            <div class="flex gap-x-4 items-center">
              <button class="text-xs" @click="openModal(record, 'edit')">
                Edit
              </button>
              <!-- <button @click="openModal(record, 'delete')" class="text-xs">
                Delete
              </button> -->
            </div>
          </template>
        </template>
      </a-table>
    </TableWrapper>
  </UserTableStyleWrapper>
  <Modal :open="visible" @close="visible = false">
    <div class="bg-white rounded-lg" v-if="type === 'delete'">
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
    <AddRegion :detail="detail" v-if="type === 'edit'" />
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
  provide,
} from "vue";
import { regionTableHeader } from "@/utility/constant";
import { message } from "ant-design-vue";
import AddRegion from "../AddRegion.vue";

const UserListTable = defineComponent({
  name: "UserListTable",
  components: { UserTableStyleWrapper, TableWrapper, Modal, AddRegion },
  setup() {
    const visible = ref(false);
    const detail = ref("");
    const type = ref("");
    const search = inject("search");
    const searchType = inject("searchType");
    const query = reactive({
      pageNumber: 1,
      pageSize: 10,
      name: "",
      email: "",
      mobileNo: "",
    });
    const { state, dispatch } = useStore();
    onMounted(() => {
      dispatch("getRegions", query);
    });
    function fetchRecords(page) {
      dispatch("getRegions", { ...query, pageNumber: page });
    }
    const loading = computed(() => state.regions.loading);
    const total = computed(() => state.regions.total);
    const addsuccess = computed(() => state.regions.addsuccess);
    const deleteloading = computed(() => state.regions.deleteloading);
    const deletesuccess = computed(() => state.regions.deletesuccess);

    const regionsData = computed(() =>
      state.regions.data.map((user) => {
        const { id, name, description, status, currency, createdAt } = user;

        return {
          ...user,
          key: id,
          name,
          description: description || "-",
          currency,
          createdAt: moment(createdAt).format("ll"),
          statusInt: status,
          status: (
            <span class={`status-text `}>
              {status && (
                <span class="bg-green-50 text-green-500 px-3 py-[2px] rounded-full">
                  {" "}
                  Active
                </span>
              )}
              {!status && (
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
    const modaltype = ref("delete");
    function openModal(data, value) {
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
      dispatch("getRegions", {
        ...query,
        name: searchType.value === "Country" ? searchValue : "",
        currency: searchType.value === "Currency" ? searchValue : "",
      });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getRegions", query);
    });

    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getRegions", query);
        message.success("Region disabled!");
        visible.value = false;
      }
    });

    watch(search, () => {
      debouncedSearch(search.value);
    });
    provide("editvisible", visible);
    return {
      handleDelete,
      openModal,
      visible,
      query,
      total,
      fetchRecords,
      regionsData,
      regionTableHeader,
      loading,
      deleteloading,
      modaltype,
      type,
      detail,
    };
  },
});

export default UserListTable;
</script>
