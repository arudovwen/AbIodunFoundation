<template>
  <div v-if="isLoading" class="spin">
    <a-spin />
  </div>
  <ThemeProvider
    v-else
    :theme="{
      rtl,
      topMenu,
      darkMode,
      mainContent,
      ...themeColor,
    }"
  >
    <Suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback>
        <div class="spin">
          <a-spin />
        </div>
      </template>
    </Suspense>
  </ThemeProvider>
</template>
<script>
import { ThemeProvider } from "vue3-styled-components";
import { themeColor } from "./config/theme/themeVariables";
import { computed, defineComponent, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { base64ToImage } from "@/utility/base64ToImage";
import "v-calendar/dist/style.css";

export default defineComponent({
  name: "App",
  components: {
    ThemeProvider,
  },
  setup() {
    const { state, dispatch } = useStore();
    const rtl = computed(() => state.themeLayout.rtlData);
    const isLoading = computed(() => state.themeLayout.loading);
    const darkMode = computed(() => state.themeLayout.data);
    const topMenu = computed(() => state.themeLayout.topMenu);
    const mainContent = computed(() => state.themeLayout.main);
    const avatar = computed(() =>
      base64ToImage(
        state?.users?.avatar?.fileBase64,
        state.users?.avatar?.contentType
      )
    );
    const avatarsuccess = computed(() => state?.users?.avatarsuccess);

    onMounted(() => {
      window.addEventListener("load", () => {
        const domHtml = document.getElementsByTagName("html")[0];
        rtl.value
          ? domHtml.setAttribute("dir", "rtl")
          : domHtml.setAttribute("dir", "ltr");
        darkMode.value ? document.body.classList.add("dark-mode") : "";
      });
      if (state?.auth?.userData) {
        dispatch("getUserAvatar", state?.auth?.userData?.id);
        if (!state?.auth?.userData?.regionId) return;
        dispatch("getRegionById", state?.auth?.userData?.regionId);
      }
    });

    watch(avatarsuccess, () => {
      if (avatarsuccess?.value) {
        localStorage.setItem("avatar", avatar?.value);
        dispatch("updateAvatar", avatar?.value);
      }
    });

    return {
      themeColor,
      rtl,
      darkMode,
      topMenu,
      isLoading,
      mainContent,
    };
  },
});
</script>
