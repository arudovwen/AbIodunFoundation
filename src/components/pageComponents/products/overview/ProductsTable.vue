<template>
  <UserTableStyleWrapper>
    <TableWrapper class="table-responsive">
      <a-table
        :loading="loading"
        :dataSource="productsData"
        :columns="productTableHeader"
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
            <div class="flex gap-x-3 items-center justify-end">
              <router-link
                :to="`product-management/product/${record.productid}`"
              >
                <button class="text-xs bg-gray-200 rounded-full py-1 px-2">
                  View
                </button>
              </router-link>
              <router-link
                :to="`product-management/edit-product/${record.productid}`"
              >
                <button
                  class="text-xs bg-gray-600 text-white rounded-full py-1 px-2"
                  type="default"
                  to="#"
                  shape="circle"
                >
                  Edit
                </button>
              </router-link>
              <sdButton
                @click="openDelete(record)"
                class="btn-icon"
                type="default"
                to="#"
                shape="circle"
              >
                <unicon name="trash-alt" width="16"></unicon>
              </sdButton>
            </div>
          </template> </template
      ></a-table>
    </TableWrapper>
  </UserTableStyleWrapper>
  <Modal :open="visible" @close="visible = false">
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
          @click="handleDelete"
          class="w-full"
          >{{ deleteloading ? "Deleting..." : "Delete" }}
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
import { productTableHeader } from "@/utility/constant";
import { message } from "ant-design-vue";

const UserListTable = defineComponent({
  name: "UserListTable",
  components: { UserTableStyleWrapper, TableWrapper, Modal },
  setup() {
    const visible = ref(false);
    const detail = ref("");
    const search = inject("search");
    const query = reactive({
      pageNumber: 1,
      pageSize: 10,
      name: "",
    });
    const { state, dispatch } = useStore();
    onMounted(() => {
      dispatch("getProducts", query);
    });
    function fetchRecords(page) {
      dispatch("getProducts", { ...query, pageNumber: page });
    }
    const loading = computed(() => state.products.loading);
    const total = computed(() => state.products.total);
    const addsuccess = computed(() => state.products.addsuccess);
    const deleteloading = computed(() => state.products.deleteloading);
    const deletesuccess = computed(() => state.products.deletesuccess);
    const productsData = computed(() =>
      state.products.data.map((user) => {
        const {
          createdAt,
          id,
          isDeleted,
          productDescription,
          productName,
          productType,
          currency,
        } = user;

        return {
          key: id,
          productid: id,
          productName,
          productType: (
            <span class="capitalize">{productType?.split(" ")[1]}</span>
          ),
          isDeleted: isDeleted ? "Yes" : "No",
          currency,
          description: (
            <span class="block truncate max-w-[160px]">
              {productDescription}
            </span>
          ),
          createdOn: moment(createdAt).format("ll"),
          status: (
            <span
              class={`status-text  ${
                isDeleted
                  ? "bg-red-50 text-red-500"
                  : "bg-green-50 text-green-500"
              }`}
            >
              {isDeleted ? "Inactive" : "Active"}
            </span>
          ),
          action: "",
        };
      })
    );
    function openDelete(data) {
      visible.value = true;
      detail.value = data;
    }

    function handleDelete() {
      dispatch("deleteProduct", detail.value.productid);
    }
    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getProducts", { ...query, name: searchValue });
    }, debounceDelay);

    watch(addsuccess, () => {
      addsuccess.value && dispatch("getProducts", query);
    });

    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getProducts", query);
        message.success("Product deleted!");
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
      productsData,
      productTableHeader,
      loading,
      deleteloading,
    };
  },
});

export default UserListTable;
</script>
