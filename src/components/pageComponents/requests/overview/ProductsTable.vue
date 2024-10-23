<template>
  <UserTableStyleWrapper>
    <TableWrapper class="table-responsive">
      <a-table
        :loading="loading"
        :dataSource="productsData"
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
                  <div class="px-1 grid gap-y-1 py-1">
                    <router-link :to="`/service/${record.id}`">
                      <button type="button" class="text-sm py-1 px-2">
                        View request
                      </button>
                    </router-link>
                    <span>
                      <button
                        type="button"
                        @click="openModal(record, 'add')"
                        class="text-sm py-1 px-2"
                      >
                        Assign request
                      </button>
                    </span>
                    <span>
                      <button
                        type="button"
                        @click="openModal(record, 'request')"
                        class="text-sm py-1 px-2"
                      >
                        Request documents
                      </button>
                    </span>
                    <span>
                      <button
                        type="button"
                        @click="openModal(record, 'delete')"
                        class="text-sm py-1 px-2"
                      >
                        Delete request
                      </button>
                    </span>
                  </div>
                </MenuItems>
              </Float>
            </Menu>
          </template>
        </template>
      </a-table>
    </TableWrapper>
    <Modal
      :open="visible"
      @close="
        visible = false;
        getData();
      "
    >
      <!-- <Detail /> -->
      <div v-if="action === 'delete'" class="bg-white rounded-lg">
        <h3 class="text-xl font-bold mb-4">Confirm delete</h3>
        <p class="mb-10">Are you sure about this action?</p>
        <div class="flex justify-between gap-x-4">
          <sdButton
            :disabled="deleteloading"
            @click="visible = false"
            size="sm"
            type="light"
            class="w-full"
          >
            Cancel
          </sdButton>
          <sdButton
            :disabled="deleteloading"
            size="sm"
            type="error"
            class="w-full"
            @click="handleDelete"
            >{{ deleteloading ? "Deleting..." : "Delete" }}
          </sdButton>
        </div>
      </div>
      <AssignRequest
        v-if="action === 'add'"
        :detail="detail"
        @close="getData"
      />
      <RequestDocument
        v-if="action === 'request'"
        :detail="detail"
        @close="getData"
      />
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
  provide,
} from "vue";
import AssignRequest from "./AssignRequest.vue";
import RequestDocument from "./RequestDocument.vue";
import { userTableHeader } from "@/utility/constant";
import { message } from "ant-design-vue";
import { userProductTableHeader } from "@/utility/constant";
import { formatCurrency } from "@/utility/formatCurrency";
import Modal from "components/Modal";
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
    AssignRequest,
    RequestDocument,
  },
  setup() {
    const detail = ref("");
    const visible = ref(false);

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
      dispatch("getUserProducts", query);
      dispatch("getAllUserProducts", {
        ...query,
        pageSize: Number.MAX_SAFE_INTEGER,
      });
    });
    function getData() {
      dispatch("getUserProducts", query);
    }
    function fetchRecords(page) {
      dispatch("getUserProducts", { ...query, pageNumber: page });
    }
    const loading = computed(() => state.requests.fetchloading);
    const total = computed(() => state.requests.total);
    const addsuccess = computed(() => state.requests.addsuccess);
    const deleteloading = computed(() => state.requests.deleteloading);
    const deletesuccess = computed(() => state.requests.deletesuccess);
    const productsData = computed(() =>
      state.requests.data.map((product) => {
        const {
          id,
          amount,
          equityContribution,
          description,
          dueDate,
          requestDate,
          interestRate,
          lockInPeriod,
          productName,
          createdAt,
          upfrontFee,
          currency,
          relationshipManager,
          userId,
        } = product;

        return {
          key: id,
          id: id,
          userId,
          lockInPeriod: <span>{`${lockInPeriod} days`}</span>,
          productName: (
            <span class="truncate block max-w-[180px]">
              {productName || "-"}
            </span>
          ),
          description: (
            <span class="truncate block max-w-[180px]">{description}</span>
          ),
          amount: (
            <span class="capitalize">{formatCurrency(amount, currency)}</span>
          ),
          upfrontFee: (
            <span class="capitalize">
              {formatCurrency(upfrontFee, currency)}
            </span>
          ),
          relationshipManager: relationshipManager || "-",
          interestRate: (
            <span class="capitalize">
              {formatCurrency(interestRate, currency)}
            </span>
          ),
          equityContribution: (
            <span class="capitalize">
              {formatCurrency(equityContribution, currency)}
            </span>
          ),
          dueDate: moment(dueDate).format("ll"),
          requestDate: moment(requestDate).format("ll"),

          createdAt: moment(createdAt).format("ll"),

          action: "",
        };
      })
    );
    const action = ref(null);
    function openModal(data, act) {
      visible.value = true;
      action.value = act;
      detail.value = data;
    }

    function handleDelete() {
      dispatch("deleteUserProduct", detail.value.id);
    }
    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getUserProducts", { ...query, name: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getUserProducts", query);
    });
    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getUserProducts", query);
        message.success("Service removed!");
        visible.value = false;
      }
    });

    watch(search, () => {
      debouncedSearch(search.value);
    });

    provide("visible", visible);
    return {
      userProductTableHeader,
      handleDelete,
      openModal,
      productsData,
      query,
      total,
      fetchRecords,
      userTableHeader,
      loading,
      deleteloading,
      visible,
      action,
      detail,
      getData,
    };
  },
});

export default UserListTable;
</script>
