<template>
  <div class="flex justify-between items-center py-6">
    <div class="flex gap-x-4 items-center flex-1">
      <div class="flex gap-x-2">
        <span class="title-counter">8 Banners</span>
        <span class="border-l border h-6" />
        <span class="title-counter text-green-600">4 Active</span>
        <span class="border-l border h-6" />
        <span class="title-counter text-yellow-600">4 Inactive</span>
      </div>
      <input
        class="max-w-[300px] w-full border bordergray-300 rounded-lg px-3 py-2"
        placeholder="Search by title"
      />
    </div>

    <div>
      <sdButton
        @click="visible = true"
        class="btn-add_new"
        size="default"
        key="1"
        type="primary"
      >
        <unicon name="plus" width="14"></unicon> Add banner
      </sdButton>
    </div>
  </div>
  {{ visible ? "true" : "false" }}
  <UserTableStyleWrapper>
    <TableWrapper class="table-responsive">
      <a-table
        :rowSelection="rowSelection"
        :dataSource="usersTableData"
        :columns="bannerTableHeader"
        :pagination="{
          defaultPageSize: 5,
          total: usersTableData.length,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }"
      />
    </TableWrapper>
  </UserTableStyleWrapper>
  <Modal :open="visible" @close="visible = false">
    <AddBanner />
  </Modal>
</template>
<script>
import Modal from "components/Modal";
import { UserTableStyleWrapper } from "../style";
import { TableWrapper } from "../../../styled";
import { useStore } from "vuex";
import users from "@/demoData/usersData.json";
import { computed, defineComponent, ref } from "vue";
import { bannerTableHeader } from "@/utility/constant";
import AddBanner from "components/pageComponents/banners/AddBanner";

const UserListTable = defineComponent({
  name: "UserListTable",
  components: { UserTableStyleWrapper, TableWrapper, AddBanner, Modal },
  setup() {
    const visible = ref(false);
    function handleCancel() {
      visible.value = false;
    }
    const usersTableData = computed(() =>
      users.map((user) => {
        const { id, name, designation, img, status } = user;
        return {
          key: id,
          user: (
            <div class="user-info">
              <figure>
                <img
                  style={{ width: "40px" }}
                  src={require(`@/${img}`)}
                  alt=""
                />
              </figure>
              <figcaption>
                <sdHeading class="user-name" as="h6">
                  {name}
                </sdHeading>
                <span class="user-designation">San Francisco, CA</span>
              </figcaption>
            </div>
          ),
          email: "john@gmail.com",
          company: "Business Development",
          position: designation,
          joinDate: "January 20, 2021",
          status: <span class={`status-text ${status}`}>{status}</span>,
          action: (
            <div class="table-actions">
              <>
                <sdButton class="btn-icon" type="default" to="#" shape="circle">
                  <unicon name="eye" width="16"></unicon>
                </sdButton>
                <sdButton class="btn-icon" type="default" to="#" shape="circle">
                  <unicon name="edit" width="16"></unicon>
                </sdButton>
                <sdButton class="btn-icon" type="default" to="#" shape="circle">
                  <unicon name="trash-alt" width="16"></unicon>
                </sdButton>
              </>
            </div>
          ),
        };
      })
    );
    const { state } = useStore();
    const searchData = computed(() => state.headerSearchData.data);
    const rowSelection = {
      getCheckboxProps: (record) => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name,
      }),
    };

    return {
      handleCancel,
      visible,
      bannerTableHeader,
      usersTableData,
      rowSelection,
      searchData,
      Modal,
    };
  },
});

export default UserListTable;
</script>
