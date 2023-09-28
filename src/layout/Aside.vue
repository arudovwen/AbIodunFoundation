<template>
  <a-menu
    :open-keys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :mode="mode"
    :theme="darkMode ? 'dark' : 'light'"
    class="scroll-menu"
    @openChange="onOpenChange"
    @click="onClick"
  >
    <NavTitle class="ninjadash-sidebar-nav-title">Menu</NavTitle>

    <a-menu-item
      v-for="menu in filteredMenu"
      @click="toggleCollapsed"
      :key="menu.title"
      :disabled="menu.disable"
    >
      <template #icon>
        <unicon :name="menu.icon"></unicon>
      </template>
      <router-link :to="menu.url" class="capitalize">
        {{ menu.title }}
      </router-link>
    </a-menu-item>
    <a-menu-item>
      <template #icon>
        <unicon name="receipt"></unicon>
      </template>
      <a
        target="_blank"
        href="https://biodunandibikunle.org/application-form/"
        class="capitalize"
      >
        Apply for grant
      </a>
    </a-menu-item>

    <a-sub-menu key="settings">
      <template #icon>
        <unicon name="setting"></unicon>
      </template>
      <template #title>Settings</template>

      <a-menu-item @click="toggleCollapsed" key="set-profile">
        <router-link to="/page/profile-settings/profile"> Profile </router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="set-account">
        <router-link to="/page/profile-settings/account"> Account </router-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="set-password">
        <router-link to="/page/profile-settings/password">
          Password
        </router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script>
import {
  computed,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
  defineComponent,
} from "vue";
import VueTypes from "vue-types";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { NavTitle } from "./style";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "AsideItems",
  props: {
    toggleCollapsed: VueTypes.func,
    events: VueTypes.object,
  },
  components: {
    NavTitle,
  },
  setup(props) {
    const { t } = useI18n();
    const store = useStore();
    const darkMode = computed(() => store.state.themeLayout.data);
    const mode = ref("inline");
    const { events } = toRefs(props);
    const {
      onRtlChange,
      onLtrChange,
      modeChangeDark,
      modeChangeLight,
      modeChangeTopNav,
      modeChangeSideNav,
    } = events.value;

    const router = computed(() => useRoute());
    const menus = [
      {
        title: "dashboard",
        url: "/dashboard",
        icon: "home",
        disable: false,
        role: "all",
      },
      {
        title: "services",
        url: "/services",
        icon: "archive",
        disable: false,
        role: "all",
      },

      {
        title: "transactions",
        url: "/transactions",
        icon: "transaction",
        disable: false,
        role: "all",
      },
      {
        title: "airtime & data",
        url: "/airtime-and-data",
        icon: "sim-card",
        disable: true,
        role: "all",
      },
      {
        title: "transfers",
        url: "/transfers",
        icon: "exchange",
        disable: true,
        role: "all",
      },

      {
        title: "user management",
        url: "/user-management",
        icon: "users-alt",
        disable: false,
        role: "admin",
      },
      {
        title: "Product Management",
        url: "/product-management",
        icon: "box",
        disable: false,
        role: "admin",
      },
      {
        title: "banner management",
        url: "/banner-management",
        icon: "browser",
        disable: false,
        role: "admin",
      },
    ];
    const state = reactive({
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      selectedKeys: ["home"],
      openKeys: ["dashboard"],
      preOpenKeys: ["dashboard"],
    });

    const onOpenChange = (keys) => {
      state.openKeys =
        keys[keys.length - 1] !== "recharts"
          ? [keys.length && keys[keys.length - 1]]
          : keys;
    };

    const onClick = (item) => {
      if (item.keyPath.length === 1) state.openKeys = [];
    };

    watchEffect(() => {
      if (router.value.matched.length) {
        if (router.value.matched.length > 2) {
          state.selectedKeys = [router.value.matched[2].name];
          state.openKeys = [router.value.matched[1].name];
          state.preOpenKeys = [router.value.matched[1].name];
        } else if (router.value.matched.length > 3) {
          state.selectedKeys = [router.value.matched[3].name];
          state.openKeys = [router.value.matched[1].name];
          state.preOpenKeys = [router.value.matched[1].name];
        } else {
          state.selectedKeys = [router.value.matched[1].name];
          state.openKeys = [router.value.matched[1].name];
          state.preOpenKeys = [router.value.matched[1].name];
        }
      }
    });

    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    const filteredMenu = computed(() => {
      return store.state.auth.userData.userRole.toLowerCase() !== "admin"
        ? menus.filter((i) => i.role !== "admin")
        : menus;
    });

    return {
      mode,
      ...toRefs(state),
      darkMode,
      onRtlChange,
      onLtrChange,
      modeChangeDark,
      modeChangeLight,
      modeChangeTopNav,
      modeChangeSideNav,
      onOpenChange,
      onClick,
      t,
      menus,
      filteredMenu,
    };
  },
});
</script>
