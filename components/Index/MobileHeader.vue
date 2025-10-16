<script setup>
const { t } = useI18n()
const router = useRouter()

const siteStore = useSiteStore()
const isMenuOpen = ref(false)
const activeMenu = ref(1)

const handleRedirect = (path) => {
  navigateTo(path)
  isMenuOpen.value = false
}
</script>

<template>
  <div class="header only-mobile">
    <ul class="header-item">
      <li @click="isMenuOpen = !isMenuOpen">
        <i class="fa-solid fa-bars"></i>
      </li>
      <li>
        <div>
          <a :href="siteStore.chatbox" target="_blank"
            ><i class="fa-regular fa-envelope"></i
          ></a>
        </div>
      </li>
      <li>
        <div @click="navigateTo('/about_1')">
          <i class="fa-solid fa-earth-americas"></i>
        </div>
      </li>
      <li>
        <div @click="navigateTo('/')"><i class="fa-solid fa-house"></i></div>
      </li>
    </ul>

    <div class="header-logo">
      <img :src="siteStore?.siteData.logo" />
    </div>

    <div
      class="overlay"
      :class="{
        active: isMenuOpen
      }"
    ></div>
    <div
      class="header-menu"
      :class="{
        active: isMenuOpen
      }"
    >
      <div class="header-menu-header">
        <button type="button" @click="isMenuOpen = false">
          <i class="fa-regular fa-rectangle-xmark"></i>
        </button>
      </div>

      <div class="header-menu-body">
        <ul>
          <li
            class="header-menu-body-collapse"
            :class="{
              active: activeMenu === 1
            }"
          >
            <button type="button" @click="activeMenu = 1">
              {{ t('關於我們') }}
            </button>
            <ul>
              <li>
                <button type="button" @click="handleRedirect('/about_1')">
                  {{ t('公司簡介') }}
                </button>
              </li>
              <li>
                <button type="button" @click="handleRedirect('/about_2')">
                  {{ t('革沿與里程碑') }}
                </button>
              </li>
            </ul>
          </li>
          <li
            class="header-menu-body-collapse"
            :class="{
              active: activeMenu === 2
            }"
          >
            <button type="button" @click="activeMenu = 2">
              {{ t('新藥研發') }}
            </button>
            <ul>
              <li>
                <button type="button" @click="handleRedirect('/service_1')">
                  {{ t('可逆轉癌症抗藥性口服新藥AN-845') }}
                </button>
              </li>
              <li>
                <button type="button" @click="handleRedirect('/service_2')">
                  {{ t('模組化高效腫瘤標靶奈米藥物載體平台') }}
                </button>
              </li>
              <li>
                <button type="button" @click="handleRedirect('/service_3')">
                  {{ t('新藥產品開發') }}
                </button>
              </li>
            </ul>
          </li>

          <li>
            <!-- <button type="button" @click="handleRedirect('/contact_1')">
              {{ t('聯絡我們') }}
            </button> -->
            <a :href="siteStore.chatbox" target="_blank">{{ t('聯絡我們') }}</a>
          </li>
          <!--<li>
            <button type="button" @click="handleRedirect('/disclaimer')">
              {{ t('免責聲明') }}
            </button>
          </li> -->
          <li>
            <button type="button" @click="handleRedirect('/user')">
              {{ t('職員專區') }}
            </button>
          </li>
        </ul>
      </div>

      <!--<ul class="header-menu-footer">
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
      </ul>-->
    </div>
  </div>
</template>

<style scoped lang="sass">
.header
  &-logo
    padding: 20px
    display: flex
    justify-content: center
    align-items: center
    background-color: #fff
    img
      width: 300px

  &-item
    display: flex
    height: 40px
    color: #fff
    border-radius: 6px 6px 0 0
    border-bottom: 1px solid #3bc4de

    li
      flex: 1
      display: flex
      justify-content: center
      align-items: center
      height: 100%
      font-size: 18px
      background-color: #0061ae
      // border: 1px solid #FF0000
      cursor: pointer
    li + li
      border-left: 1px solid rgba(255,255,255,0.5)
</style>

<style scoped lang="sass">
.overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0,0,0,0.5)
  z-index: 998
  opacity: 0
  visibility: hidden
  transition: opacity 0.3s
  &.active
    opacity: 1
    visibility: visible

.header-menu
  position: fixed
  z-index: 999
  width: 300px
  top: 0
  bottom: 0
  line-height: 1.6
  background: #fff
  transition: all .3s ease
  transform: translateX(-100%)

  &.active
    transform: translateX(0)

  &-header
    height: 40px
    background-color: #0061ae
    display: flex
    justify-content: flex-end
    align-items: center
    padding: 0 5px
    button
      font-size: 28px
      color: #fff

  &-body
    & > ul
      li
        button, a
          color: #7f7f7f
          padding: 10px 45px 10px 30px
          border-bottom: 1px dashed #959586
          font-size: 14px
          display: block
          width: 100%
          text-align: left
          text-decoration: none

    &-collapse
      position: relative

      &::after
        content: '+'
        position: absolute
        right: 0
        top: 0
        text-align: center
        font-size: 18px
        font-weight: bold
        height: 43px
        width: 43px
        display: flex
        justify-content: center
        align-items: center
        color: #bbb
        pointer-events: none

      ul
        max-height: 0
        overflow: hidden
        transition: all 300ms

        li
          button
            padding: 10px 45px 10px 45px
            color: #000

      &.active
        & > button
          color: #0061ae
          font-weight: bold

        &::after
          content: '-'

        ul
          max-height: 100vh

  &-footer
    position: absolute
    bottom: 5px
    left: 0
    right: 0
    display: flex
    justify-content: center
    align-items: center

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
</style>
