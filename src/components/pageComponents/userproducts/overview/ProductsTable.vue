<template>
  <UserTableStyleWrapper>
    <TableWrapper class="table-responsive">
      <a-table
        :loading="loading"
        :dataSource="usersData"
        :columns="userProductTableHeader"
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
            <div class="flex gap-x-4">
              <button
                @click="openModal(record)"
                class="text-xs bg-gray-200 rounded-full py-1 px-2"
              >
                View
              </button>
              <router-link :to="`/service/request-edit/${record.id}`">
                <button
                  class="text-xs bg-gray-600 text-white rounded-full py-1 px-2"
                  type="default"
                  to="#"
                  shape="circle"
                >
                  Edit
                </button>
              </router-link>
            </div>
          </template>
        </template></a-table
      >
    </TableWrapper>
    <Modal :open="visible" @close="visible = false">
      <Detail />
    </Modal>
  </UserTableStyleWrapper>
</template>
<script>
import { UserTableStyleWrapper } from "../style";
import { TableWrapper } from "../../../styled";
import moment from "moment";
import { useStore } from "vuex";
import { debounce } from "lodash";
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
import { userProductTableHeader } from "@/utility/constant";
import { formatCurrency } from "@/utility/formatCurrency";
import Modal from "components/Modal";
import Detail from "../Detail";

const UserListTable = defineComponent({
  name: "UserListTable",
  components: { UserTableStyleWrapper, TableWrapper, Modal, Detail },
  setup() {
    const detail = ref("");
    const visible = ref(false);
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
      dispatch("getRequests", query);
    });
    function fetchRecords(page) {
      dispatch("getRequests", { ...query, pageNumber: page });
    }
    const loading = computed(() => state.requests.loading);
    const total = computed(() => state.requests.total);
    const addsuccess = computed(() => state.requests.addsuccess);
    const deleteloading = computed(() => state.requests.deleteloading);
    const deletesuccess = computed(() => state.requests.deletesuccess);
    const usersData = computed(() =>
      state.requests.data.map((user) => {
        const {
          id,
          facilityAmount,
          useOfFunds,
          businessAddress,
          businessName,
          residentialAddress,
          businessType,
          bvn,
          alumni,
          createdAt,
        } = user;

        return {
          key: id,
          id: id,
          businessName: (
            <div class="user-info">
              <figcaption>
                <sdHeading class="user-name" as="h6">
                  {businessName}
                </sdHeading>
              </figcaption>
            </div>
          ),
          amount: (
            <span class="capitalize">{formatCurrency(facilityAmount)}</span>
          ),
          useOfFunds,
          businessAddress,
          residentialAddress,
          businessType,
          bvn,
          alumni: alumni ? "Yes" : "No",
          createdAt: moment(createdAt).format("ll"),

          action: "",
        };
      })
    );
    function openModal(data) {
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
      dispatch("getRequests", { ...query, name: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getRequests", query);
    });
    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getRequests", query);
        message.success("User disabled!");
      }
    });

    watch(search, () => {
      debouncedSearch(search.value);
    });
    return {
      userProductTableHeader,
      handleDelete,
      openModal,
      usersData,
      query,
      total,
      fetchRecords,
      userTableHeader,
      loading,
      deleteloading,
      visible
    };
  },
});

export default UserListTable;
</script>
