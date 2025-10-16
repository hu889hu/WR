<script lang="ts" setup>
const route = useRoute()
interface Props {
  bannervideo: string
  title: string
  text: string
  menulist: Array<any>
}
const isShowMenu = ref(false)
const props = withDefaults(defineProps<Props>(), {})
const isFixed = ref(false)
const handleScroll = () => {
  isFixed.value = window.scrollY >= 550
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
const routerTo = (path) => {
  if (path) {
    navigateTo(path)
  }
}
</script>
<template>
  <div class="bannerBox">
    <video muted autoplay loop :src="props.bannervideo"></video>
    <div class="title">
      <div class="bannerTitle">{{ props.title }}</div>
      <div class="bannerText">{{ props.text }}</div>
    </div>
    <div class="menu" :class="isFixed ? 'fixedtop' : ''">
      <div class="menulist">
        <div
          v-for="(item, index) in props.menulist"
          :key="index"
          class="menuitem"
          :class="item.path == route.path ? 'menuaction' : ''"
          @click="routerTo(item.path)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <div
      class="mobileMenu"
      :class="isShowMenu ? 'rotate' : ''"
      @click="isShowMenu = !isShowMenu"
    >
      <div>總覽</div>
      <svg width="20" height="13" viewBox="0 0 20 13" class="~.3s">
        <path
          d="M191.6,17.244l8,8,8-8"
          transform="translate(-189.599 -15.244)"
          fill="none"
          stroke="black"
          stroke-width="3"
        ></path>
      </svg>
      <div v-if="isShowMenu" class="mobileMenulist">
        <div
          v-for="(item, index) in props.menulist"
          :key="index"
          class="mobileMenuitem"
          :class="item.path == route.path ? 'menuaction' : ''"
          @click="routerTo(item.path)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
.bannerBox
    width: 100vw
    height: 660px
    position: relative
    video
        position: absolute
        width: 100vw
        height: 100%
        left: 50%
        top: 50%
        transform: translate(-50%,-50%)
        object-fit: cover
    .title
        position: absolute
        bottom: 220px
        width: 100%
        font-size: 72px
        left: 120px
        .bannerTitle
            color: white
            font-size: 72px
            text-align: left
        .bannerText
            color: white
            font-size: 1.125rem

    .menu
        position: absolute
        width: 100vw
        background-color: rgba(2, 59, 112, 0.45)
        bottom: 0
        height: 70px

        .menulist
            width: 1000px
            margin: 0 auto
            display: flex
            .menuitem
                margin-right: 4rem
                font-size: 1.07rem
                color: white
                display: flex
                align-items: center
                height: 70px
                cursor: pointer
            .menuaction
                color: rgb(110, 178, 211)
    .mobileMenu
      display: none
      .mobileMenulist
        position: absolute
        top: 62px
        width: 100%
        left: 0
        color: #222222
        z-index: 10
        box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.1875rem 0.375rem

        .mobileMenuitem
          font-size: 1.07rem
          background-color: rgb(245, 245, 245)
          border-bottom: 0.0625rem solid rgb(255, 255, 255)
          cursor: pointer
          padding: 1rem
        .menuaction
          color: rgb(110, 178, 211)
    .fixedtop
        background-color: rgb(37, 87, 132)
        position: fixed
        top: 110px
        z-index: 9999
@media (max-width: 1000px)
  .bannerTitle
    font-size: 30px
    padding: 0 40px
  .menu
    display: none
  .mobileMenu
    display: flex !important
    align-items: center
    width: 100%
    position: absolute
    bottom: 0px
    padding: 20px 40px
    background-color: rgb(240, 248, 251)
    cursor: pointer
    justify-content: space-between
    box-shadow: rgba(0, 0, 0, 0.1) 0rem 0.1875rem 0.375rem
    z-index: 10
    svg
      transition: transform .3s ease
  .rotate
    svg
      transform: rotate(180deg)
</style>
