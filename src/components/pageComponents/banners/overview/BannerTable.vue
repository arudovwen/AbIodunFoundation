<template>
  <div class="flex justify-between items-center py-6">
    <div class="flex gap-x-4 items-center flex-1">
      <div class="flex gap-x-2">
        <span class="title-counter px-4" @click="query.status = ''">All</span>
        <span class="border-l border h-6" />
        <span
          :class="`title-counter text-green-600 px-3`"
          @click="query.status = 'true'"
          >Active</span
        >
        <span class="border-l border h-6" />
        <span
          class="title-counter text-yellow-600 px-3"
          @click="query.status = 'false'"
          >Inactive</span
        >
      </div>
      <input
        class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2"
        placeholder="Search by description"
        v-model="search"
      />
    </div>

    <div>
      <sdButton
        @click="openModal('', 'add')"
        class="btn-add_new"
        size="sm"
        key="1"
        type="primary"
      >
        <unicon name="plus" width="14"></unicon> Add banner
      </sdButton>
    </div>
  </div>

  <UserTableStyleWrapper>
    <div class="font-bold text-lg my-6 capitalize">
      Showing
      {{
        query.status === ""
          ? "All"
          : (query.status === "false" ? "Inactive" : "Active")
      }}
    </div>
    <TableWrapper class="table-responsive">
      <a-table
        :dataSource="bannersData"
        :columns="bannerTableHeader"
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
              <button
                v-if="status.toLowerCase() == 'true'"
                class="text-xs"
                @click="openModal(record, 'disable')"
              >
                Disable
              </button>
              <button
                v-if="status.toLowerCase() == 'false'"
                class="text-xs"
                @click="openModal(record, 'enable')"
              >
                Enable
              </button>
              <button class="text-xs" @click="openModal(record, 'edit')">
                Edit
              </button>
              <button @click="openModal(record, 'delete')" class="text-xs">
                Delete
              </button>
            </div>
          </template>
        </template></a-table
      >
    </TableWrapper>
  </UserTableStyleWrapper>
  <Modal :open="visible" @close="visible = false">
    <AddBanner v-if="type === 'add'" />
    <EditBanner :detail="detail" v-else-if="type === 'edit'" />
    <div class="bg-white rounded-lg" v-else>
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
          @click="handleUpdate"
          >{{ deleteloading ? "Processing..." : "Confirm" }}
        </sdButton>
      </div>
    </div>
  </Modal>
</template>
<script>
import Modal from "components/Modal";
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
  ref,
} from "vue";
import { bannerTableHeader } from "@/utility/constant";
import AddBanner from "components/pageComponents/banners/AddBanner";
import EditBanner from "components/pageComponents/banners/EditBanner";
import { message } from "ant-design-vue";
import { base64ToImage } from "@/utility/base64ToImage";


const UserListTable = defineComponent({
  name: "UserListTable",
  components: {
    EditBanner,
    UserTableStyleWrapper,
    TableWrapper,
    AddBanner,
    Modal,
  },
  setup() {
    const type = ref("");
    const visible = ref(false);
    const detail = ref("");
    const search = ref("");
    const query = reactive({
      pageNumber: 1,
      pageSize: 10,
      description: "",
      status: "",
    });
    const { state, dispatch } = useStore();
    const bannersData = computed(() =>
      state.banners.data.map((user) => {
        const { id, title, description, bannerUrl, status } = user;

        return {
          key: id,
          id,
          title,
          cover: (
            <span>
              <figure>
                <img
                  src={base64ToImage(bannerUrl)}
                  className="bg-gray-100 w-[100px] h-10 rounded-lg object-contain"
                  alt=""
                />
              </figure>
            </span>
          ),
          description,
          stat: status,
          status: (
            <span
              className={`status-text ${
                status?.toLowerCase() == "false"
                  ? "bg-red-50 text-red-500"
                  : "bg-green-50 text-green-500"
              }`}
            >
              {status?.toLowerCase() == "true" ? "Active" : "Inactive"}
            </span>
          ),
          action: "", // You can add action logic here if needed
        };
      })
    );

    onMounted(() => {
      dispatch("getBanners", query);
    });
    function fetchRecords(page) {
      dispatch("getBanners", { ...query, pageNumber: page });
    }
    const bannersuccess = computed(() => state.banners.addsuccess);
    const loading = computed(() => state.banners.loading);
    const total = computed(() => state.banners.total);
    const addsuccess = computed(() => state.banners.addsuccess);
    const deleteloading = computed(() => state.banners.deleteloading);
    const deletesuccess = computed(() => state.banners.deletesuccess);
    // const editloading = computed(() => state.banners.editloading);
    const editsuccess = computed(() => state.banners.editsuccess);
    // const updateloading = computed(() => state.banners.updateloading);
    // const updatesuccess = computed(() => state.banners.updatesuccess);

    function openModal(data, value) {
      type.value = value;
      visible.value = true;
      detail.value = data;
    }

    function handleDelete() {
      dispatch("deleteBanner", detail.value.id);
    }
    function handleStatus() {
      dispatch("statusBanner", detail.value.bannerid);
    }
    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getBanners", { ...query, description: searchValue });
    }, debounceDelay);

    watch(bannersuccess, () => {
      if (bannersuccess.value) {
        visible.value = false;
      }
    });
    watch(addsuccess, () => {
      visible.value = false;
      addsuccess.value && dispatch("getBanners", query);
    });

    watch(editsuccess, () => {
      if (editsuccess.value) {
        visible.value = false;
        dispatch("getBanners", query);
      }
    });

    watch(query, () => {
      dispatch("getBanners", query);
    });

    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getBanners", query);
        message.success("Banner deleted!");
        visible.value = false;
      }
    });

    watch(search, () => {
      debouncedSearch(search.value);
    });

    function handleUpdate() {
      if (type.value === "delete") {
        dispatch("deleteBanner", detail.value.id);
      }
      if (type.value === "enable") {
        dispatch("statusBanner", { id: detail.value.id, status: true });
      }
      if (type.value === "disable") {
        dispatch("statusBanner", { id: detail.value.id, status: false });
      }
    }
    return {
      handleDelete,
      openModal,
      visible,
      query,
      total,
      fetchRecords,
      loading,
      deleteloading,
      bannerTableHeader,
      Modal,
      bannersData,
      search,
      handleUpdate,
      type,
      handleStatus,
      detail,
      status,
    };
  },
});

export default UserListTable;
</script>
