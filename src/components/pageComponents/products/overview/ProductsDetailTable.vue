<template>
  <UserTableStyleWrapper>
    <TableWrapper class="table-responsive">
      <a-table
        :loading="loading"
        :dataSource="productsData"
        :columns="productDetailTableHeader"
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
            <!-- <div class="table-actions">
              <router-link
                :to="`/product-management/edit-product-detail/${record.productId}`"
              >
                <sdButton class="btn-icon" type="default" to="#" shape="circle">
                  <unicon name="edit" width="16"></unicon>
                </sdButton>
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
            </div> -->

            <Menu as="div" class="">
              <Float placement="bottom-end" :offset="4" portal>
                <MenuButton
                  class="inline-flex justify-center rounded-md px-1 py-2 text-sm font-medium text-white w-auto"
                >
                  <unicon name="ellipsis-v" width="16"></unicon>
                </MenuButton>
                <MenuItems
                  class="w-[150px] rounded-md bg-white shadow-lg border-gray-50"
                >
                  <div class="px-1 grid gap-y-1">
                    <!-- <MenuItem>
                      <sdButton
                        @click="openDelete(record)"
                        class="btn-icon text-left flex justify-start h-auto py-[4px]"
                        type="default"
                        to="#"
                        shape="circle"
                      >
                        Assign
                      </sdButton>
                    </MenuItem> -->
                    <MenuItem>
                      <router-link
                        :to="`/product-management/edit-product-detail/${Number(record.productId)}`"
                      >
                        <sdButton
                          class="btn-icon h-auto py-[4px]"
                          type="default"
                          to="#"
                          shape="circle"
                        >
                          Edit
                        </sdButton>
                      </router-link>
                    </MenuItem>
                    <MenuItem>
                      <sdButton
                        @click="openDelete(record)"
                        class="btn-icon text-left flex justify-start h-auto py-[4px]"
                        type="default"
                        to="#"
                        shape="circle"
                      >
                        Delete
                      </sdButton>
                    </MenuItem>
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
import { useStore } from "vuex";
import { UserTableStyleWrapper } from "../style";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { TableWrapper } from "../../../styled";
import {
  computed,
  defineComponent,
  onMounted,
  watch,
  reactive,
  ref,
} from "vue";
import { useRoute } from "vue-router";
import { productDetailTableHeader } from "@/utility/constant";
import { formatCurrency } from "@/utility/formatCurrency";
import { message } from "ant-design-vue";
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
    MenuItem,
    Float,
  },
  setup() {
    const route = useRoute();
    const visible = ref(false);
    const detail = ref("");

    const productId = ref(route.params.id);

    const query = reactive({
      pageNumber: 1,
      pageSize: 10,
      name: "",
      productId,
    });
    const { state, dispatch } = useStore();
    onMounted(() => {
      if (productId.value) {
        dispatch("getProductDetails", query);
      }
    });
    function fetchRecords(page) {
      dispatch("getProductDetails", { ...query, pageNumber: page });
    }
    const loading = computed(() => state.products.loading);
    const total = computed(() => state.products.total);
    const addsuccess = computed(() => state.products.addsuccess);
    const deleteloading = computed(() => state.products.deleteloading);
    const deletesuccess = computed(() => state.products.deletesuccess);
    const product = computed(() => state.products.productD);

    const productsData = computed(() =>
      state?.products?.product?.map((user) => {
        const {
          id,
          maxAmount,
          minAmount,
          upfrontFees,
          productId,
          equityContribution,
          lockInPeriod,
          interestRate,
        } = user;

        return {
          key: id,
          id,
          productId,
          interestRate: <span class="capitalize">{interestRate}%</span>,
          maxAmount: (
            <span class="capitalize">
              {formatCurrency(maxAmount, product.value?.currency)}
            </span>
          ),
          minAmount: (
            <span class="capitalize">
              {formatCurrency(minAmount, product.value?.currency)}
            </span>
          ),
          upfrontFees: <span class="capitalize">{upfrontFees}%</span>,
          equityContribution: (
            <span class="capitalize">{equityContribution}%</span>
          ),
          lockInPeriod: <span class="">{lockInPeriod} days</span>,
          // rate: <span class="capitalize">{rate}%</span>,

          action: "",
        };
      })
    );
    function openDelete(data) {
      visible.value = true;
      detail.value = data;
    }

    function handleDelete() {
      dispatch("deleteProductDetail", detail.value.productId);
    }

    watch(addsuccess, () => {
      addsuccess.value && dispatch("getProductDetails", query);
    });

    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getProductDetails", query);
        message.success("Product deleted!");
        visible.value = false;
      }
    });

    return {
      handleDelete,
      openDelete,
      visible,
      query,
      total,
      fetchRecords,
      productsData,
      productDetailTableHeader,
      loading,
      deleteloading,
    };
  },
});

export default UserListTable;
</script>
