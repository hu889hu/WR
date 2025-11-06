<script lang="ts" setup>
import documentContent from '@/assets/document/index.js'
const documentContentData = computed(() => {
  return documentContent()
})
const router = useRouter()
const { isLogin } = useAuthStore()

const siteStore = useSiteStore()
const { queryChatbox } = siteStore
const referrerCodeCookiee = useCookie('referrerCode', {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
}) as any
const accessTokenCookie = useCookie('accessToken', {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
}) as any
const mobileNavOpen = ref(false)
const { t } = useI18n()
const headerNavList = ref([
  {
    title: `${t('技術首頁')}`,
    router: '/'
  },
  {
    title: `${t('癌症檢測')}`,
    router: '/cancer-detection'
  },
  {
    title: `${t('密度評估')}`,
    router: '/density-assessment'
  },
  {
    title: `${t('風險評估')}`,
    router: '/risk-evaluation'
  },
  {
    title: `${t('血液酒精濃度評估')}`,
    router: '/bac-assessment'
  },
  {
    title: `${t('探索人工智能檢測')}`,
    router: '/powered-mammograms'
  },
  {
    title: `${t('關於合作夥伴')}`,
    router: '/for-partners'
  },
  {
    title: `${t('關於我們')}`,
    router: '/about'
  },
  {
    title: `${t('人資系統')}`,
    router: '/user'
  }
])
const handleNavigateTo = (path: string) => {
  open.value = false
  if (path === 'customer') {
    openChatBox()
    return
  }
  if (path === 'game') {
    gameWindowOpen()
    return
  }
  navigateTo(path)
}
const openChatBox = () => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  if (urlPattern.test(siteStore.chatbox)) {
    window.open(siteStore.chatbox, '_blank')
  }
}

await onMounted(async () => {
  navigateTo('/user')
  console.log('register page')
  if (router.currentRoute.value.query.referrer) {
    referrerCodeCookiee.value = router.currentRoute.value.query.referrer
  }
  await queryChatbox()
})
const gameWindowOpen = () => {
  if (accessTokenCookie) {
    window.open(`${window.location.origin}/game`, '_blank')
  } else {
    navigateTo('/login')
  }
}
const { locale } = useI18n()
const changeLang = () => {
  locale.value = 'en_US'
  console.log('change lang', locale)
}

const open = ref(false)
const onOpen = () => {
  open.value = true
}
const onClose = () => {
  open.value = false
}

const pageRef = ref()
const isWhite = ref()
const isTop = ref()
const handleScroll = () => {
  console.log(pageRef.value.scrollTop)
  isTop.value = pageRef.value.scrollTop >= 500
  isWhite.value = pageRef.value.scrollTop >= 100
}
onMounted(() => {
  pageRef.value.addEventListener('scroll', handleScroll)
})
const upTo = () => {
  pageRef.value.scrollTop = 0
}
</script>

<template>
  <div ref="pageRef" class="page">
    <client-only>

      <!-- <document :content="documentContentData"></document> -->
      <!-- <index-header /> -->
      <!-- <index-mobile-header /> -->
      <nav :class="{ sticky: isWhite }" class="sticky-mobil">
        <div class="menu-flex">
          <div class="logo">
            <img :src="siteStore?.siteData.logo" alt="" />
          </div>
          <div class="menu-nav">
            <ul>
              <li v-for="item in headerNavList" :key="item.title">
                <a class="nav-sty black a-aim" @click="handleNavigateTo(item.router)">{{ $lang(item.title) }}</a>
              </li>
            </ul>
            <div class="sid" @click="open = !open">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      <div class="page-body">
        <router-view></router-view>
      </div>
      <footer>
        <section class="team2 btm ">
          <div class="team-items">
            <div class="t-item">
              <h4 v-scroll-animate="{ type: 'fade-up' }">聯絡我們</h4>
              <h1 v-scroll-animate="{ type: 'fade-up' }">與我們攜手
                <span style="color:#f077a0;">創造癌整無法隱藏的</span>世界
              </h1>
              <p v-scroll-animate="{ type: 'fade-up' }">
                準備好與我們一起攜手延續生命嗎?
              </p>
              <p v-scroll-animate="{ type: 'fade-up' }">
                領域是流通的，可與各項技術相互交流，使受眾更廣泛
              </p>
              <div class="btn animate-in delay-100" v-scroll-animate data-scroll-animate>
                聯絡我們
              </div>
            </div>
          </div>
        </section>
      </footer>
      <button v-if="isTop" class="scroll-top scroll-to-target open" data-target="html" @click="upTo">
        <i class="fas fa-level-up-alt"></i>
      </button>
      <!-- 彈出 -->
      <div class="wrapper" :class="open ? 'active' : ''" @click="onClose"></div>
      <div class="sidebar" :class="open ? 'active' : ''">
        <!-- <div class="ul-sidebar-header">
          <div class="ul-sidebar-header-logo">
            <img :src="siteStore?.siteData.logo" alt="" />
          </div>
          <button class="ul-sidebar-closer" @click="onClose">
            <i class="fa-solid fa-xmark" style="color: #ffffff;"></i>
          </button>
        </div> -->
        <div class="ul-sidebar-header-nav-wrapper">
          <ul>
            <li v-for="item in headerNavList" :key="item.title" @click="handleNavigateTo(item.router)">
              <a class="nav-sty black a-aim">{{ $lang(item.title) }}</a>
            </li>
          </ul>
        </div>
      </div>
    </client-only>
  </div>
</template>
<style lang="sass">
body
  // background-color: #08001a

  a,
  button
    cursor: pointer
</style>

<style lang="sass">
.only-pc
  display: none

@media screen and (min-width: 768px)
  .only-mobile
    display: none !important

  .only-pc
    display: flex
</style>

<style scoped lang="sass">
@import '@/assets/sass/index/index.sass'
nav
  position: fixed
  top:0
  width: 100%
  z-index: 99
  border-bottom: 1px solid transparent
  animation: 1000ms ease-in-out 0s normal none 1 running fadeInDown
.sticky
  background-color: #f077a0
.sticky-mobil
  @media screen and (max-width: 992px)
    background-color: #f077a0
@keyframes fadeInDown
  0%
    opacity: 0
    -webkit-transform: translate3d(0,-100%,0)
    transform: translate3d(0,-100%,0)
  to
    opacity: 1
    -webkit-transform: translateZ(0)
    transform: translateZ(0)
// sidebar

.sidebar
  position: fixed
  left: 0
  top: 70px
  bottom: 0
  height: calc(100vh - 70px)
  overflow: auto
  background: #f077a0
  z-index: 99
  transform: translateX(-100%)
  transition: 0.4s ease
  padding: 10px 0
  max-width: 100%
  display: flex
  flex-direction: column
  justify-content: space-between
  width: clamp(320px, 40vw, 100%)
  @media screen and (max-width: 991px)
    justify-content: start
.ul-sidebar-closer
  transition: all 1.4s ease
.active
  transform: translateX(0) !important
  .ul-sidebar-closer
    transform: rotateZ(360deg)
.ul-sidebar-header
  display: flex
  align-items: center
  justify-content: space-between
  border-bottom: 1px solid rgb(0 0 0 / 10%)
  padding-bottom: 10px
  padding-inline: 20px
  .ul-sidebar-header-logo
    height: 46px
    img
      height: 100%
.ul-sidebar-header-nav-wrapper
  ul li
    font-weight: bold
    padding: 15px clamp(20px, 1.58vw, 30px)
    position: relative
    display: block
    a
      color: white
      transition: all 0.4s ease
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.562)
    // border-bottom: 1px solid rgb(0 0 0 / 10%)
.wrapper
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  height: 0%
  background-color: rgba(0, 0, 0, .3)
  &.active
    z-index: 5
    height: 100%
.page
  scroll-behavior: smooth
  // background: url('@/assets/image/index/body.jpg') top no-repeat #fff
  position: relative
  width: 100dvw
  height: 100dvh
  overflow-y: auto
  display: flex
  flex-direction: column
.scroll-top
  width: 50px
  height: 50px
  line-height: 50px
  position: fixed
  bottom: 0%
  right: 50px
  font-size: 16px
  z-index: 99
  color: white
  text-align: center
  cursor: pointer
  background-color: #08bce9
  border-radius: 50%
  transition: 1s ease
  border: none
  animation: 500ms ease-in-out forwards fadeInDown2
  &:hover
    background-color: rgba(8, 188, 233, 0.8)
  &::after
    position: absolute
    z-index: -1
    content: ''
    top: 100%
    left: 5%
    height: 10px
    width: 90%
    opacity: 1
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 80%)
@keyframes fadeInDown2
  0%
    opacity: 0
    transform: translateZ(0)
  to
    opacity: 1
    transform: translate3d(0,-100%,0)
</style>
