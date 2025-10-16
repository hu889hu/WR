<template>
  <div style="width: 100%;" class="swiper-container">
    <swiper v-if="isMounted && slides.length" :modules="modules" class="mySwiper" :speed="1000"
      :slides-per-view="'auto'" :centeredSlides="true" :space-between="25" :pagination="{ clickable: true }"
      :loop="true" @swiper="onSwiper" @slide-change="(e) => {
        realIndex = e.realIndex
      }" :autoplay="true">
      <swiper-slide v-for="(item, index) in slides" :key="index" :class="`slide${index + 1}`">
        <div class="infoItem">
          <img class="swiperimg" :src="item.img" alt="">
          <div class="info" :class="{ active: realIndex === index }">
            <div class="item-info">
              <div class="pre-title">{{ item.title }}</div>
              <p style="font-size: 18px;color: #9de8ff;">
                {{ item.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-navigation">
      <div class="nav-container">
        <button class="nav-button prev-button hover-target" @click="slidePrev">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"
            style="transform: rotate(180deg);" class="nav-icon">
            <g clip-path="url(#clip0_89_590)">
              <path
                d="M12.3375 3.8374L11.5803 4.59467L14.95 7.96438H0V9.03533H14.95L11.5803 12.405L12.3375 13.1623L17 8.49982L12.3375 3.8374Z" />
            </g>
            <defs>
              <clipPath id="clip0_89_590">
                <rect width="17" height="17" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button class="nav-button next-button hover-target" @click="slideNext">
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="nav-icon">
            <g clip-path="url(#clip0_89_590)">
              <path
                d="M12.3375 3.8374L11.5803 4.59467L14.95 7.96438H0V9.03533H14.95L11.5803 12.405L12.3375 13.1623L17 8.49982L12.3375 3.8374Z" />
            </g>
            <defs>
              <clipPath id="clip0_89_590">
                <rect width="17" height="17" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

import { Scrollbar, Autoplay, Mousewheel } from 'swiper/modules'

export default {
  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      realIndex: 0,
      swiper: null,
      isMounted: false,
      mousewheeldata: {
        enabled: true,
        forceToAxis: true,
        releaseOnEdges: true,
        eventsTarget: 'container'
      }
    }
  },
  mounted() {
    this.isMounted = true;
  },
  beforeUnmount() {
    this.isMounted = false;
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  },
  setup() {
    return {
      modules: [Autoplay, Mousewheel],
      activeIndex: 0
    }
  },
  methods: {
    handleWheel(event) {
      // console.log(event.deltaY, 'event.deltaY');
      if (event.deltaY > 0) {
        this.slideNext()
      } else {
        this.slidePrev()
      }
    },
    onSwiper(swiper) {
      this.swiper = swiper
    },
    slideNext() {
      if (this.swiper) {
        this.swiper.slideNext()
      }
    },
    slidePrev() {
      if (this.swiper) {
        this.swiper.slidePrev()
      }
    }
  }
}

</script>

<style scoped lang="sass">
.swiper-container
  padding: 0 80px
  position: relative
  @media (max-width: 768px)
    padding: 0 0px
  
.swiper
  width: 100%
  // height: 100%

.swiper-slide 
  width: 648px
  text-align: center
  font-size: 18px
  // background: #fff
  display: flex
  justify-content: center
  align-items: center
  @media (max-width: 768px)
    width: 100%
    padding: 0 2%
  .infoItem
    // width: 300px
    width: 100%
    overflow: hidden
    &::before
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      content: ''
      background: rgba(43, 62, 79, 0.5)
      height: 410px
      pointer-events: none
      z-index: 1
    &:hover
      img
        transform: scale(1.05)
    img
      transition: all 0.5s ease-in-out
      display: block 
      width: 100%
      min-width: 100%
      object-fit: cover
      height: 350px
    @media (max-width: 768px)
      width: 100%
    .active
      // background: rgba(6, 9, 34, 0.5) !important
      .item-info
        
    .info
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      display: flex
      justify-content: flex-end
      align-items: flex-start
      flex-direction: column
      transition: all .4s ease
      z-index: 1
      .item-info
        padding: 0 0 20px 20px 
        .pre-title
          text-align: left
          position: relative
          margin-bottom: 10px
          font-size: 28px
          font-weight: 600
          text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.562)
          color: #ffffff
          transition: all .4s ease
.swiper-navigation
  position: absolute
  z-index: 1
  width: 100%
  left: 0
  top: 50%
  transform: translateY(-50%)
  .nav-container
    display: flex
    justify-content: space-between
    .nav-button
      position: absolute
      top: 50%
      transform: translateY(-50%)
      width: 60px
      height: 50px
      cursor: pointer
      z-index: 10
      display: flex
      align-items: center
      justify-content: center
      transition: all .4s ease 0s
      @media (max-width: 768px)
        width: 60px
        height: 60px
        padding: 0px !important
        border: none
        background-color: rgba(21, 21, 21, 0.4)
        .nav-icon
          fill: #ffffff !important
      .nav-icon
        min-width: 20px
        fill: #8a8a8a
        transition: all .4s ease 0s
      
.prev-button
  left: 10px
  padding-right: 6px 
  border-right: 9px solid #e1e1e1
  &:hover
    .nav-icon
      margin-right: 10px

.next-button
  right: 10px
  padding-left: 6px 
  border-left: 9px solid #e1e1e1
  &:hover
    .nav-icon
      margin-left: 10px

.arrow-left,
.arrow-right
  border: solid white
  border-width: 0 2px 2px 0
  display: inline-block
  padding: 5px

.arrow-left
  transform: rotate(135deg)
  -webkit-transform: rotate(135deg)

.arrow-right
  transform: rotate(-45deg)
  -webkit-transform: rotate(-45deg)
</style>
