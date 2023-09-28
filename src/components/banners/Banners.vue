<template>
  <BannerCarouselWrap>
    <a-carousel autoplay>
      <div class="banner-signle" v-for="ban in banners" :key="ban.id">
        <div class="banner-single__img">
          <img
            class="h-[200px] object-cover"
            :src="base64ToImage(ban.bannerUrl)"
            alt=""
          />
        </div>
        <div class="banner-single__content">
          <h3>{{ ban.description }}</h3>
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
  status: "",
});
const carouselRef = ref(null);
const { state, dispatch } = useStore();
const banners = computed(() => state.banners.data);
console.log("🚀 ~ file: Banners.vue:52 ~ banners:", banners);
onMounted(() => {
  dispatch("getBanners", query);
  if (carouselRef.value) {
    // You can perform actions on the carousel instance here
    // For example, you can call carouselRef.value.goTo(2) to go to a specific slide
  }
});
</script>
