<template>
  <!-- <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1"
    :uk-slideshow="'animation: fate;ratio:' + ratio"> -->
  <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="animation: fade">
    <ul class="uk-slideshow-items">
      <li v-for="(item, index) in slides" :key="index" class="li-slide">
        <img :src="item.img" alt="" uk-cover />
        <div class="slide-cont">
          <div class="cont-box">
            <h5>
              <span v-html="item.toptitle"></span>
            </h5>
            <h1>
              <span v-html="item.title"></span>
            </h1>
            <h2>
              <span v-html="item.subtitle"></span>
            </h2>
            <div class="go-game hover-target" @click="navigateTo(item.link)">
              系統
            </div>
          </div>
        </div>
      </li>
    </ul>
    <a v-if="slidenav" class="uk-position-center-left uk-position-small uk-hidden-hover" uk-slidenav-previous
      uk-slideshow-item="previous"></a>
    <a v-if="slidenav" class="uk-position-center-right uk-position-small uk-hidden-hover" uk-slidenav-next
      uk-slideshow-item="next"></a>
    <ul class="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin"></ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    default: {}
  },
  ratio: {
    type: String,
    default: '16:9' // 預設比例16:9
  },
  slidenav: {
    type: Boolean,
    default: false
  },
  slides: {
    type: Array,
    default: () => []
  }
})

const slideshowRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (process.client) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'uikit/uikit-icons.min.js'
    document.head.appendChild(link)
  }
  await nextTick()
  initSlideshow()
})

const initSlideshow = () => {
  if (!process.client) return

  const UIkit = window.UIkit
  if (!UIkit || !slideshowRef.value) {
    console.error('UIkit not loaded:', !UIkit)
    console.error('DOM not ready:', !slideshowRef.value)
    return
  }

  // 初始化
  UIkit.slideshow(slideshowRef.value, {
    pauseOnHover: false,
    ...props.options
  })
}
// 監聽 ratio 變化
watch(() => props.ratio, initSlideshow)
</script>
<style scoped lang="sass">

.uk-slideshow
  width: 100%
.uk-slideshow-nav
  position: absolute
  right: 10%
  top: 50%
  transform: translateY(-50%)
  flex-direction: column
  gap: 20px
  @media (max-width: 768px)
    right: 50%
    bottom: 0px
    top: auto
    transform: translateX(50%) translateY(0)
    flex-direction: row
.uk-dotnav>*>*
  border: none
  position: relative
  margin: 0 5px
  width: 26px
  height: 26px  
  border-radius: 50%
  transition: all .3s ease-in-out
  background-color: #ffffff00 !important
  &::before
    content: ''
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 10px
    height: 10px
    border: 1px solid #fff
    border-radius: 50%
    z-index: 1
    transition: all .1s ease-in-out
  &::after
    content: ''
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 10px
    height: 10px
    border-radius: 50%
    background-color: #fff
    z-index: 1
:deep(.uk-dotnav>.uk-active>a::before)
  width: 100%
  height: 100%
:deep(.uk-dotnav>.uk-active>a::after)
  background-color: #d6ce56
:deep(.uk-slideshow-items)
  .uk-active.uk-transition-active
    .slide-cont
      .cont-box
        &>*
          transform: translateX(0)
          opacity: 1
.uk-slideshow-items
  position: relative
  max-height: 70vh
  min-height: 33.95833vh
  li.li-slide
    max-height: 70vh
    min-height: 33.95833vh
    &>img
      height: 100%
      object-fit: cover
    @media (max-width: 768px)
      &::before
        content: ''
        position: absolute
        top: 0
        left: 0
        z-index: 1
        width: 100%
        height: 100%
        background-color: rgba(0, 0, 0, 0.5)
  .slide-cont
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%,-50%)
    z-index: 2
    width: 100%
    .cont-box
      max-width: 1200px
      width: 100%
      padding: 20px
      margin: 0 auto
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.562)
      @media (max-width: 768px)
        h1
          font-size: 36px
        h2
          font-size: 36px
        h5
          font-size: 23px
        .go-game
          margin-top: 20px
          padding: 8px 35px
          min-width: auto
      &>*
        transition: all 0.8s ease
        opacity: 0
        transform: translateX(-40px)
        &:nth-child(1)
          transition-delay: .1s
        &:nth-child(2)
          transition-delay: .2s
        &:nth-child(3)
          transition-delay: .3s
        &:nth-child(4)
          transition-delay: .2s
    h1
      font-size: 60px
      color: #fff
    h2
      font-size: 60px
      color: #d6ce56
    h5
      font-size: 33px
      color: #fff
      font-weight: 500
      max-width: 400px
    .go-game
      text-align: center
      color: #fff
      min-width: 170px
      border: 2px solid #fff
      border-radius: 5px
      display: inline-block
      padding: 14px 32px
      font-size: 14px
      transition: all 0.1s ease
      margin-top: 40px
      &:hover
        background-color: #3f90dc
        border: 2px solid #3f90dc
  
</style>
