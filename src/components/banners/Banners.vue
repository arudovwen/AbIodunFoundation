<template>
  <BannerCarouselWrap>
    <a-carousel autoplay>
      <div class="banner-signle">
        <div class="banner-single__img">
          <img :src="require('../../static/img/banner/8.png')" alt="" />
        </div>
        <div class="banner-single__content">
          <h3>Achievements</h3>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
        </div>
      </div>
      <!-- End of /.banner-signle -->
      <div class="banner-signle">
        <div class="banner-single__img">
          <img :src="require('../../static/img/banner/8.png')" alt="" />
        </div>
        <div class="banner-single__content">
          <h3>Achievements</h3>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
        </div>
      </div>
      <!-- End of /.banner-signle -->
      <div class="banner-signle">
        <div class="banner-single__img">
          <img :src="require('../../static/img/banner/8.png')" alt="" />
        </div>
        <div class="banner-single__content">
          <h3>Achievements</h3>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
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

const query = reactive({
  pageNumber: 1,
  pageSize: 10,
  description: "",
  status: "true",
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
