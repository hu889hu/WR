<script setup>
const { locale, t } = useI18n()
const router = useRouter()
const route = useRoute()
const routeName = route.matched[1].path
const siteStore = useSiteStore()

const changeLang = (language) => {
  locale.value = language
  console.log('change lang', locale)
}

const handleRedirect = (path) => {
  navigateTo(path)
}
const isWhite = ref(false)
const isMenu = ref(false)
const active = ref(true)
const handleScroll = () => {
  isWhite.value = window.scrollY >= 100
  // if (window.scrollY >= 100) {
  //   bgnone.value = 'bgnone'
  // }
  // isScrolled.value = window.scrollY > 0
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
const backTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 添加平滑滚动效果
  })
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
</script>

<template>
  <div class="newHeader" :class="isWhite ? 'bgWhite' : ''">
    <div class="header-main-logo">
      <img :src="siteStore?.siteData.logo" />
    </div>
    <div class="menu-toggle borblack" @click="isMenu = !isMenu">
      <svg width="17" height="17" viewBox="0 0 17 17">
        <g
          id="Group_9037"
          data-name="Group 9037"
          transform="translate(-0.208 -0.208)"
        >
          <circle
            id="Ellipse_88"
            data-name="Ellipse 88"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(0.208 0.208)"
            fill="#172050"
          ></circle>
          <circle
            id="Ellipse_93"
            data-name="Ellipse 93"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(0.208 7.208)"
            fill="#172050"
          ></circle>
          <circle
            id="Ellipse_96"
            data-name="Ellipse 96"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(0.208 14.208)"
            fill="#172050"
          ></circle>
          <circle
            id="Ellipse_89"
            data-name="Ellipse 89"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(7.208 0.208)"
            fill="#172050"
          ></circle>
          <circle
            id="Ellipse_91"
            data-name="Ellipse 91"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(7.208 7.208)"
            fill="#172050"
          ></circle>
          <circle
            id="Ellipse_94"
            data-name="Ellipse 94"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(7.208 14.208)"
            fill="#172050"
          ></circle>
          <circle
            id="Ellipse_90"
            data-name="Ellipse 90"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(14.208 0.208)"
            fill="#172050"
          ></circle>
          <circle
            id="Ellipse_92"
            data-name="Ellipse 92"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(14.208 7.208)"
            fill="#172050"
          ></circle>
          <circle
            id="Ellipse_95"
            data-name="Ellipse 95"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(14.208 14.208)"
            fill="#172050"
          ></circle>
        </g>
      </svg>
    </div>

    <div class="menuBox" :class="isMenu ? 'showMenu' : ''">
      <div class="menu-toggle close" @click="isMenu = !isMenu">
        <i class="fa-solid fa-xmark fa-2xl" style="color: #ffffff"></i>
      </div>
      <div v-if="isMenu" class="menu">
        <div style="margin-right: 100px">
          <div class="muneList">
            <div class="title" @click="navigateTo('/'), (isMenu = false)">
              首頁
              <div class="clay">
                <div class="clays"></div>
              </div>
            </div>
          </div>
          <div class="muneList">
            <div
              class="title"
              @click="navigateTo('/about/blurb'), (isMenu = false)"
            >
              關於我們
              <div
                class="clay"
                :class="routeName == '/about' ? 'isAcitve' : ''"
              >
                <div class="clays"></div>
              </div>
            </div>
          </div>
          <div class="muneList">
            <div
              class="title"
              @click="navigateTo('/product/article'), (isMenu = false)"
            >
              產品介紹
              <div
                class="clay"
                :class="routeName == '/product' ? 'isAcitve' : ''"
              >
                <div class="clays"></div>
              </div>
            </div>
          </div>
          <div class="muneList">
            <div class="title" @click="navigateTo('/cdmo'), (isMenu = false)">
              CDMO
              <div class="clay" :class="routeName == '/cdmo' ? 'isAcitve' : ''">
                <div class="clays"></div>
              </div>
            </div>
          </div>
          <div class="muneList">
            <div
              class="title"
              @click="navigateTo('/capability'), (isMenu = false)"
            >
              核心能力
              <div
                class="clay"
                :class="routeName == '/capability' ? 'isAcitve' : ''"
              >
                <div class="clays"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="muneList">
            <div class="title" @click="openChatBox()">
              客服連結
              <div class="clay"><div class="clays"></div></div>
            </div>
          </div>
          <div class="muneList">
            <div class="title" @click="navigateTo('/user'), (isMenu = false)">
              職員專區
              <div class="clay"><div class="clays"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="backTop" @click="backTop">
      <svg width="25.999" height="11" viewBox="0 0 25.999 11">
        <path
          id="i-side-top"
          d="M2,30,9.583,17,2,4H5.416L13,17,5.416,30Z"
          transform="translate(-4.001 13) rotate(-90)"
          fill="#fff"
        ></path>
      </svg>
    </div>
    <!-- <div class="header-main">
      <div class="header-main-logo">
        <img :src="siteStore?.siteData.logo" />
      </div>

      <ul>
        <li
          class="header-main-collapse"
          :class="{
            active: activeMenu === 1
          }"
        >
          <button
            type="button"
            class="header-main-btn"
            @click.self="handleRedirect('/about_1')"
          >
            {{ t('關於我們') }}
          </button>
          <ul>
            <li>
              <button
                type="button"
                class="header-main-btn"
                @click="handleRedirect('/about_1')"
              >
                {{ t('公司簡介') }}
              </button>
            </li>
            <li>
              <button
                type="button"
                class="header-main-btn"
                @click="handleRedirect('/about_2')"
              >
                {{ t('革沿與里程碑') }}
              </button>
            </li>
          </ul>
        </li>
        <li class="header-main-collapse">
          <button
            type="button"
            class="header-main-btn"
            @click.self="handleRedirect('/service_1')"
          >
            {{ t('新藥研發') }}
          </button>
          <ul>
            <li>
              <button
                type="button"
                class="header-main-btn"
                @click="handleRedirect('/service_1')"
              >
                {{ t('可逆轉癌症抗藥性口服新藥AN-845') }}
              </button>
            </li>
            <li>
              <button
                type="button"
                class="header-main-btn"
                @click="handleRedirect('/service_2')"
              >
                {{ t('模組化高效腫瘤標靶奈米藥物載體平台') }}
              </button>
            </li>
            <li>
              <button
                type="button"
                class="header-main-btn"
                @click="handleRedirect('/service_3')"
              >
                {{ t('新藥產品開發') }}
              </button>
            </li>
          </ul>
        </li> -->
    <!--<li>
          <button
            type="button"
            class="header-main-btn"
            @click="handleRedirect('/news_1')"
          >
            {{ t('最新消息') }}
          </button>
        </li>-->
    <!-- <li> -->
    <!-- <button
            type="button"
            class="header-main-btn"
            @click="handleRedirect('/contact_1')"
          >
            {{ t('聯絡我們') }}
          </button> -->
    <!-- <div>
            <a :href="siteStore.chatbox" target="_blank">{{ t('聯絡我們') }}</a>
          </div>
        </li> -->
    <!--<li>
          <button
            type="button"
            class="header-main-btn"
            @click="handleRedirect('/disclaimer')"
          >
            {{ t('免責聲明') }}
          </button>
        </li>-->
    <!-- <li>
          <button
            type="button"
            class="header-main-btn"
            @click="handleRedirect('/user')"
          >
            {{ t('職員專區') }}
          </button>
        </li>
      </ul>
    </div> -->

    <!--<div class="header-sec">
      <ul class="header-sec-social">
        <li class="facebook">
          <button class="btn">
            <i class="fa-brands fa-facebook-f"></i>
          </button>
        </li>
        <li class="twitter">
          <button class="btn">
            <i class="fa-brands fa-twitter"></i>
          </button>
        </li>
        <li class="plurk">
          <button class="btn">
            <i class="fa-solid fa-p"></i>
          </button>
        </li>
      </ul>

      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <span>
            <i class="fa-solid fa-globe"></i>
          </span>
          {{ $lang('Language') }}
          <span>
            <i class="fa-solid fa-angle-down"></i>
          </span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeLang('zh_TW')">
              {{ $lang('繁體中文') }}
            </el-dropdown-item>
            <el-dropdown-item @click="changeLang('en_US')">
              {{ $lang('English') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>-->
  </div>
</template>

<!-- <style lang="sass">
.el-dropdown-link
  border: 1px solid #cbcbcb
  color: #156cb0
  border-radius: 0
  font-size: 15px
  width: 141px
  height: 33px
  display: flex
  justify-content: center
  align-items: center

  span
    display: block
    padding: 0 5px
</style>

<style scoped lang="sass">
@media screen and (min-width: 768px)
  .header
    display: flex
    justify-content: space-between
    align-items: center
    background-color: #fff
    padding: 0 15px
    border-bottom: 4px solid #ddd

    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 10px
      z-index: 99
      top: 0
      display: block
      background: linear-gradient(to right, #00dcfb 0%, #1a509d 100%)

    &-main
      width: 100%
      max-width: 80%
      margin: 0 auto
      &-logo
        width: 301px
        padding: 15px 0
        img
          width: 100%
          height: 80px
          object-fit: contain

      & > ul
        display: flex
        align-items: center

        .header-main-btn
          padding: 16px
          color: #2a2a2a

          &:hover
            color: #0581C2

        & > li:hover
          & > .header-main-btn
            color: #0581C2
          ul
            display: flex

        ul
          display: none
          position: fixed
          left: 0
          top: 175px
          right: 0
          z-index: 99
          padding: 40px 0
          background-color: rgba(255, 255, 255, 0.9)

          li
            width: 16%
            padding: 20px

            .header-main-btn
              padding: 0 0 6px
              width: 100%
              border-bottom: 1px dotted #959586
              text-align: left
              font-weight: bold


    &-sec
      display: flex
      justify-content: center
      align-items: center

      &-social
        display: flex
        justify-content: center
        align-items: center
        margin-right: 20px
        li
          display: flex
          justify-content: center
          align-items: center
          padding: 5px
          width: 30px
          height: 30px
          font-size: 17px
          margin: 0 6px
          border-radius: 5px
          color: #fff
          background: #37BEEC
</style> -->
<style scoped lang="sass">
.newHeader
  position: fixed
  width: 100%
  height: 110px
  padding: 0 40px
  display: flex
  justify-content: space-between
  align-items: center
  background-color: transparent
  transition: background-color .3s ease
  z-index: 999
  @media (max-width: 700px)
    padding: 0 40px
    height: auto
  .header-main-logo
    @media (max-width: 700px)
      width: 70%
.menu-toggle
  border: 1px solid white
  border-radius: 50%
  width: 43px
  height: 43px
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
.borblack
  border: 1px solid #222
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1)


.bgWhite
  background-color: white
.menuBox
  background-color: rgb(124, 185, 215)
  position: fixed
  z-index: 1000
  width: 100vw
  height: 0vh
  top: 0
  left: 0
  opacity: 0
  overflow-y: auto
  transition: opacity .3s ease ,height .3s ease

  .close
    position: absolute
    right: 40px
    top: 40px
  .menu
    margin-left: 15%
    margin-top: 350px
    color: white
    font-size: 51px
    animation: translateUP 1s ease 0s forwards
    display: flex
    @media (max-width: 700px)
      display: block
      font-size: 32px
      margin-top: 200px
      padding-bottom: 100px

    .muneList
      margin-bottom: 20px
      display: block

      .title
        cursor: pointer
        border-bottom: 1px solid rgb(124, 185, 215)
        display: inline-block
        &:hover
          .clay
            width: 115%
            opacity: 1
        .isAcitve
          width: 115% !important
          opacity: 1 !important
        .clay
          width: 0px
          opacity: 0
          height: 1px
          background-color: white
          position: relative
          transition: width .3s ease,opacity .3s ease

          .clays
            width: 20px
            position: absolute
            right: -3px
            top: -7px
            height: 1px
            background-color: white
            transform: rotate(45deg)

@keyframes translateUP
  to
    transform: translateY(0%)
  from
    transform: translateY(10%)
.showMenu
  height: 100vh
  opacity: 1
.backTop
  background: rgba(0, 0, 0, 0.3)
  width: 50px
  height: 50px
  position: fixed
  z-index: 999
  right: 40px
  bottom: 40px
  border-radius: 5px
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
</style>
