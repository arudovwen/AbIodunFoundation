<script>
import { BannerCarouselWrap } from "./Style";
import { defineComponent } from "vue";

export const BannerCarousel = defineComponent({
  name: "BannerCarousel",
  render() {
    return (
      <BannerCarouselWrap>
        <a-carousel autoplay>
          <div class="banner-signle">
            <div class="banner-single__img">
              <img src={require("../../static/img/banner/8.png")} alt="" />
            </div>
            <div class="banner-single__content">
              <h3>Achievements</h3>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
            </div>
          </div>
          {/* End of /.banner-signle */}
          <div class="banner-signle">
            <div class="banner-single__img">
              <img src={require("../../static/img/banner/8.png")} alt="" />
            </div>
            <div class="banner-single__content">
              <h3>Achievements</h3>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
            </div>
          </div>
          {/* End of /.banner-signle */}
          <div class="banner-signle">
            <div class="banner-single__img">
              <img src={require("../../static/img/banner/8.png")} alt="" />
            </div>
            <div class="banner-single__content">
              <h3>Achievements</h3>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
            </div>
          </div>
          {/* End of /.banner-signle */}
        </a-carousel>
      </BannerCarouselWrap>
    );
  },
});

export default BannerCarousel;
</script>
