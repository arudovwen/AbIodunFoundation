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
            <div class="flex gap-x-4 items-center">
              <router-link :to="`/service/${record.id}`">
                <button class="text-xs bg-gray-200 rounded-full py-1 px-2">
                  View
                </button>
              </router-link>
              <!-- <router-link :to="`/service/request-edit/${record.id}`">
                <button
                  class="text-xs bg-gray-600 text-white rounded-full py-1 px-2"
                  type="default"
                  to="#"
                  shape="circle"
                >
                  Edit
                </button>
              </router-link> -->
              <sdButton
                @click="openModal(record)"
                to="#"
                shape="circle"
                class="h-auto"
              >
                <unicon name="trash-alt" width="16"></unicon>
              </sdButton>
            </div>
          </template>
        </template>
      </a-table>
    </TableWrapper>
    <Modal :open="visible" @close="visible = false">
      <!-- <Detail /> -->
      <div class="bg-white rounded-lg">
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

const UserListTable = defineComponent({
  name: "UserListTable",
  components: { UserTableStyleWrapper, TableWrapper, Modal },
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
    });
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
        } = product;

        return {
          key: id,
          id: id,
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
    function openModal(data) {
      visible.value = true;
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
    };
  },
});

export default UserListTable;
</script>
