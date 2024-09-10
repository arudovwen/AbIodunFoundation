<template>

  <Main>
    <a-row :gutter="15">
      <a-col :md="24">
        <usersListTable>
          <UserListTable />
        </usersListTable>
      </a-col>
    </a-row>
  </Main>
</template>
<script>
import UserListTable from "./overview/UserTable";
import { computed, ref, defineComponent } from "vue";
import { useStore } from "vuex";
import { Main } from "../../styled";
import { usersListTable } from "./style";

const UserList = defineComponent({
  name: "UserList",
  components: { Main, 
    UserListTable, usersListTable
   },
  setup() {
    const { state } = useStore();
    const searchData = computed(() => state.headerSearchData.data);
    const selectedRowKeys = ref(0);
    const selectedRows = ref(0);

    return {
      searchData,
      selectedRowKeys,
      selectedRows,
    };
  },
});

export default UserList;
</script>
