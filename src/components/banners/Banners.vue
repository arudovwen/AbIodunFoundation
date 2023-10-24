<template>
  <BannerCarouselWrap>
    <a-carousel autoplay>
      <div class="banner-signle" v-for="ban in banners" :key="ban.id">
        <div class="banner-single__img w-full h-[300px]">
          <img
            class="h-full w-full object-cover object-top"
            :src="ban.bannerUrl"
            alt=""
          />
        </div>
        <div
          v-if="ban.description"
          class="banner-single__content text-left px-6"
        >
          <h3 class="text-left">{{ ban.description }}</h3>
        </div>
      </div>
      <!-- End of /.banner-signle -->
    </a-carousel>
  </BannerCarouselWrap>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import { BannerCarouselWrap } from "./Style";
import { base64ToImage } from "@/utility/base64ToImage";

const query = reactive({
  pageNumber: 1,
  pageSize: 10,
  description: "",
  status: "true",
});
const carouselRef = ref(null);
const { state, dispatch } = useStore();
const banners = computed(() =>
  state.banners.data.map((ban) => ({
    ...ban,
    bannerUrl: base64ToImage(ban.bannerUrl),
  }))
);

onMounted(() => {
  dispatch("getBanners", query);
  if (carouselRef.value) {
    // You can perform actions on the carousel instance here
    // For example, you can call carouselRef.value.goTo(2) to go to a specific slide
  }
});
</script>
