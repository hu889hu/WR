<script lang="ts" setup>
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group'

const router = useRouter()
const siteStore = useSiteStore()
const { isLogin, signout } = useAuthStore()
const PlayerStore = usePlayerStore()
const emit = defineEmits(['onPopupState'])
const props = defineProps({
  opaque: { type: Boolean, default: false },
  absolute: { type: Boolean, default: false },
  top: { type: Boolean, default: false },
  header: { type: Boolean, default: false }
  // menu: { type: Boolean, default: false }
})
const playerWalletBalance = computed(() => {
  if (!isLogin()) {
    return 0
  }
  console.log(PlayerStore.playerInfo, 'PlayerStore.playerInfo')

  const findWallet = PlayerStore.playerInfo?.wallet.find(
    (wallet: any) => wallet.type === 13
  )
  if (findWallet) {
    return Number(findWallet.balance)
  } else {
    return 0
  }
})
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

const isCont = ref(false)
const isShw = ref(false)

const onPopup = () => {
  openSwiftness.value = false
  isShw.value = !isShw.value
  setTimeout(() => {
    isCont.value = !isCont.value
  }, 100)
}
const onClose = () => {
  isCont.value = !isCont.value
  setTimeout(() => {
    isShw.value = !isShw.value
  }, 300)
}
watch(
  () => isCont.value,
  (newVal) => {
    console.log('isCont.value', newVal)
    emit('onPopupState', newVal)
  }
)
const openGamePopup = ref(false)
const openSwiftness = ref(false)
</script>
<template>
  <div>
    <header :class="{ opaque: props.opaque, top: top }">
      <div class="fixed-height"></div>
      <div class="goback absoluteTop2">
        <ul class="is-pc" :class="openSwiftness ? 'swiftness' : ''">
          <li class="hover-target">
            <a @click="navigateTo('/user')">職員首頁</a>
          </li>
          <li class="hover-target">
            <a @click="navigateTo('/user/info')"> 個人資訊 </a>
          </li>
          <li class="hover-target">
            <a @click="navigateTo('/user/withdraw')">財務申請</a>
          </li>
          <li class="hover-target">
            <a @click="navigateTo('/user/record')"> 財務記錄 </a>
          </li>
          <li class="hover-target">
            <a @click="navigateTo('/user/workrecord')"> 工作記錄 </a>
          </li>
          <li class="hover-target">
            <a @click="navigateTo('/user/newspaper')"> 產業快訊 </a>
          </li>
        </ul>
        <div class="is-mobile" @click="onPopup">
          <svg t="1760536148927" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2713" width="32" height="32">
            <path
              d="M0.5632 180.4288c0-35.6352 28.8768-64.512 64.512-64.512h892.416a64.512 64.512 0 1 1 0 129.024H65.0752a64.512 64.512 0 0 1-64.512-64.512z m0 331.4688c0-35.6352 28.8768-64.512 64.512-64.512h892.416a64.512 64.512 0 1 1 0 129.024H65.0752a64.512 64.512 0 0 1-64.512-64.512z m0 331.4176c0-35.6352 28.8768-64.512 64.512-64.512h892.416a64.512 64.512 0 1 1 0 129.024H65.0752a64.512 64.512 0 0 1-64.512-64.512z"
              p-id="2714" fill="#b7b7b7"></path>
          </svg>
        </div>
        <div class="game-right">
          <div class="game-item">
            <div class="nav-hover" @click.stop="openGamePopup = !openGamePopup, openSwiftness = false"
              style="display: flex; align-items: center; gap:5px">
              <img src="@/assets/image/index/icon03.png" alt="" width="23px" height="23px">
              <span class="is-pc">進入系統</span>
            </div>
            <div class="game-popup" :class="openGamePopup ? 'game-popup-active' : ''">
              <div class="game-popup-content">
                <div class="game-popup-title">
                  <div class="game-popup-title-text">
                    智能檢測系統
                  </div>
                  <div class="game-popup-cont">
                    <div class="game-popup-cont-item">
                      <div class="item-img">
                        <img src="@/assets/image/list-icon/tp01.png" />
                      </div>
                      <div class="item-text">
                        心電監測器系統
                      </div>
                    </div>
                    <div class="game-popup-cont-item">
                      <div class="item-img">
                        <img src="@/assets/image/list-icon/tp02.png" />
                      </div>
                      <div class="item-text">
                        數位乳房攝影儀系統
                      </div>
                    </div>
                    <div class="game-popup-cont-item">
                      <div class="item-img">
                        <img src="@/assets/image/list-icon/tp03.png" />
                      </div>
                      <div class="item-text">
                        肺部劑量斷層掃描儀系統
                      </div>
                    </div>
                    <div class="game-popup-cont-item">
                      <div class="item-img">
                        <img src="@/assets/image/list-icon/tp04.png" />
                      </div>
                      <div class="item-text">
                        血糖智慧監測裝置系統
                      </div>
                    </div>
                    <div class="game-popup-cont-item">
                      <div class="item-img">
                        <img src="@/assets/image/list-icon/tp05.png" />
                      </div>
                      <div class="item-text">
                        視網膜AI篩檢照相機系統
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="nav-hover" @click="signout()" style="display: flex; align-items: center; gap:5px">
              <img src="@/assets/image/index/icon04.png" alt="" width="23px" height="23px">
              <span class="is-pc">登出帳戶</span>
            </div>
          </div>
          <svg t="1760536558932" class="icon is-mobile" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="5533" width="28" height="28"
            @click="openSwiftness = !openSwiftness, openGamePopup = false"
            :style="{ transform: openSwiftness ? 'scale(.8)' : 'scale(1)' }">
            <path
              d="M512 864.17391289m0-97.82608711a4.39453125 4.39453125 0 1 0 0 195.65217421 4.39453125 4.39453125 0 1 0 0-195.65217421Z"
              fill="#b7b7b7" p-id="5534"></path>
            <path
              d="M512 512m0-97.82608711a4.39453125 4.39453125 0 1 0 0 195.65217422 4.39453125 4.39453125 0 1 0 0-195.65217422Z"
              fill="#b7b7b7" p-id="5535"></path>
            <path
              d="M512 159.82608711m0-97.8260871a4.39453125 4.39453125 0 1 0 0 195.65217421 4.39453125 4.39453125 0 1 0 0-195.65217421Z"
              fill="#b7b7b7" p-id="5536"></path>
          </svg>
        </div>
      </div>
      <div class="header is-pc" style="border-bottom: 1px solid rgba(255, 255, 255, .2)  ">
        <div class="header-cont">
          <!-- <div class="header-el-text">
            <div class="header-el-subtitle">
              Hello!&nbsp;
              <span style="color: rgb(255, 142, 36);">
                {{ PlayerStore?.playerInfo?.username }}
              </span>
            </div>
            <div class="header-el-subtitle">
              <span v-if="isLogin()">
                <i class="fa-solid fa-dollar-sign"></i>
                {{
                  new Intl.NumberFormat('zh-TW').format(playerWalletBalance)
                }}</span>
            </div>
          </div> -->
          <div class="menu-btn2 is-pc">
            <div class="header-el-item hover-target" @click="navigateTo('/user/message1')">
              <span class="header-el-image">
                <img src="@/assets/image/index/icon01.png" alt="Phone">
              </span>
              <div class="header-el-text">
                <div class="header-el-title">線上醫療諮詢</div>
              </div>
            </div>
            <div style="height: 35px; width: 1px; background-color: #ffffff55;"></div>
            <div class="header-el-item hover-target" @click="navigateTo('/user/message2')">
              <span class="header-el-image">
                <img src="@/assets/image/index/icon02.png" alt="Phone">
              </span>
              <div class="header-el-text">
                <div class="header-el-title">線上客服系統</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div :style="{ height: props.absolute ? '74px' : '0' }"></div>
      <div class="header is-pc" :class="{ absoluteTop: props.absolute }">
        <div class="header-cont">
          <ul class="menu">
            <li class="hover-target">
              <a @click="navigateTo('/user')" style="background-color: #3f90dc">職員中心</a>
            </li>
            <li @click="navigateTo('/game/warrants')">
              <a style="color: rgb(255, 254, 195);">進入系統</a>
            </li>
            <li class="hover-target">
              <a @click="navigateTo('/user/info')"> 個人資訊 </a>
            </li>
            <li class="hover-target">
              <a @click="navigateTo('/user/withdraw')">財務申請</a>
            </li>
            <li class="hover-target">
              <a @click="navigateTo('/user/record')">
                <span>相關記錄</span>
                <span class="arrow"><i class="fa-solid fa-angle-down fa-2xs"></i></span>
              </a>
              <ul class="submenu">
                <li class="hover-target">
                  <span class="arrow2"> <i class="fa-solid fa-caret-right fa-xs"></i></span>
                  <a @click="navigateTo('/user/record')"> 財務記錄 </a>
                </li>
                <li class="hover-target">
                  <span class="arrow2"><i class="fa-solid fa-caret-right fa-xs"></i></span>
                  <a @click="navigateTo('/user/workrecord')"> 工作記錄 </a>
                </li>
              </ul>
            </li>
            <li class="hover-target">
              <a> <span>貨幣轉換 </span>
                <span class="arrow"><i class="fa-solid fa-angle-down fa-2xs"></i></span>
              </a>
              <ul class="submenu">
                <li class="hover-target">
                  <span class="arrow2"> <i class="fa-solid fa-caret-right fa-xs"></i></span>
                  <a @click="navigateTo('/user/conversion')"> USDT轉TWD </a>
                </li>
                <li class="hover-target">
                  <span class="arrow2"><i class="fa-solid fa-caret-right fa-xs"></i></span>
                  <a @click="navigateTo('/user/conversiont')"> TWD轉USDT </a>
                </li>
              </ul>
            </li>
            <li class="hover-target">
              <a @click="navigateTo('/user/newspaper')"> 產業快訊 </a>
            </li>
            <li>
              <a @click="signout()"> 登出 </a>
            </li>
          </ul>

        </div>
      </div>
    </header>

    <!-- popup -->
    <div v-show="isShw" class="popup-wrapper" @click.self="onClose">
      <div class="popup-content" :class="{ 'cont-left': isCont }" @click.stop="">
        <div class="popup-menus">
          <div class="menu-btn2">
            <div class="header-el-item hover-target" @click="navigateTo('/user/message1')">
              <span class="header-el-image">
                <img src="@/assets/image/index/icon01.png" alt="Phone">
              </span>
              <div class="header-el-text">
                <div class="header-el-title">線上醫療諮詢</div>
              </div>
            </div>
            <div class="header-el-item hover-target" @click="navigateTo('/user/message2')">
              <span class="header-el-image">
                <img src="@/assets/image/index/icon02.png" alt="Phone">
              </span>
              <div class="header-el-text">
                <div class="header-el-title">線上客服系統</div>
              </div>
            </div>
          </div>
          <ul class="menu">
            <li class="hover-target" style="background-color: #3f90dc;color: #fff">
              <a @click="navigateTo('/')">職員中心</a>
            </li>
            <li @click="navigateTo('/game/warrants')">
              <a style="color: rgb(255, 254, 195);">進入系統</a>
            </li>
            <li class="hover-target">
              <a @click="navigateTo('/user/info')"> 個人資訊 </a>
            </li>
            <li class="hover-target">
              <a @click="navigateTo('/user/withdraw')">財務申請</a>
            </li>
            <li class="hover-target">
              <a>
                <span>相關記錄</span>
                <span class="arrow"><i class="fa-solid fa-angle-down fa-2xs"></i></span>
              </a>
              <ul class="submenu">
                <li class="hover-target">
                  <span class="arrow2"> <i class="fa-solid fa-caret-right fa-xs"></i></span>
                  <a @click="navigateTo('/user/record')"> 財務記錄 </a>
                </li>
                <li class="hover-target">
                  <span class="arrow2"><i class="fa-solid fa-caret-right fa-xs"></i></span>
                  <a @click="navigateTo('/user/workrecord')"> 工作記錄 </a>
                </li>
              </ul>
            </li>
            <li class="hover-target">
              <a> <span>貨幣轉換 </span>
                <span class="arrow"><i class="fa-solid fa-angle-down fa-2xs"></i></span>
              </a>
              <ul class="submenu">
                <li class="hover-target">
                  <span class="arrow2"> <i class="fa-solid fa-caret-right fa-xs"></i></span>
                  <a @click="navigateTo('/user/conversion')"> USDT轉TWD </a>
                </li>
                <li class="hover-target">
                  <span class="arrow2"><i class="fa-solid fa-caret-right fa-xs"></i></span>
                  <a @click="navigateTo('/user/conversiont')"> TWD轉USDT </a>
                </li>
              </ul>
            </li>
            <li class="hover-target">
              <a @click="navigateTo('/user/newspaper')"> 產業快訊 </a>
            </li>
            <li>
              <a @click="signout()"> 登出 </a>
            </li>
          </ul>
        </div>
        <div class="popup-btn"></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
.absoluteTop
  top: 0
  left: 0
  width: 100%
  position: fixed

header
  position: relative
  z-index: 66
  color: #fff
  background-color: #2b3e4f
  top: 0
  left: 0
  right: 0
  width: 100%
  font-size: .9rem
  transition: all 0.3s ease-in-out
  // game-popup
  .game-item
    position: relative
  .game-popup
    opacity: 0
    visibility: hidden
    transition: .22s
    transform: translate3d(20px, -10px, 0)
    position: absolute
    top: 100%
    right: 0
    background-color: #fff
    z-index: 5
    margin-top: 17px
    min-width: 320px
    max-width: 100%
    &.game-popup-active
      opacity: 1
      visibility: visible
      transform: translate3d(20px, 0, 0)
    .game-popup-content
      position: relative
      &::before
        content: ''
        position: absolute
        top: -10px
        right: 20px
        width: 0
        height: 0
        border-style: solid
        border-width: 0 10px 10px 10px
        border-color: transparent transparent #fff transparent
        z-index: 1
      .game-popup-title-text
        padding: 25px 20px 10px
        font-size: 18px
        font-weight: 500
        color: #151515
        border-block-end: 1px solid #ebebeb
      .game-popup-cont
        padding: 0 20px 20px
        .game-popup-cont-item
          display: flex
          align-items: center
          gap: 15px
          margin-top: 20px
          .item-img
            position: relative
            display: flex
            align-items: center
            justify-content: center
            width: 90px
            min-width: 90px
            height: 83px
            background-image: linear-gradient(to bottom, #eef1f4 0%, #d5deeb 100%)
            img
              z-index: 3
              width: 45px
              height: 45px
            &::after
              content: ''
              position: absolute
              top: 0
              right: 0
              bottom: 0
              left: 0
              pointer-events: none
              opacity: 0
              visibility: hidden
              transform-origin: 50% 100%
              transform: scale3d(1, 0.3, 1)
              transition: .4s
              background-image: linear-gradient(to bottom, #eef1f4 0%, #bdcbdf 100%)
            &:hover
              &::after
                opacity: 1
                visibility: visible
                transform: scale3d(1, 1, 1)
          .item-text
            font-size: 17px
            line-height: 1.5
            color: #151515
            font-weight: 500
            transition: .2s
            &:hover
              color: #3f90dc
  .fixed-height
    @media (max-width: 992px)
      height: 52px
  .goback
    width: 100%
    color: #a0a0a0
    background-color: #2a3743
    display: flex
    align-items: center
    justify-content: center
    gap: 15px
    @media (max-width: 992px)
      padding: 10px 10px
      justify-content: space-between
      &.absoluteTop2
        top: 0
        left: 0
        width: 100%
        position: fixed !important
      @keyframes swiftness
        from
          transform: rotateX(90deg)
          height: 0
        to
          transform: rotateX(0)
          height: 86.5px
      .swiftness
        position: absolute
        background-color: #2b3e4f
        top: 100%
        display: flex !important
        height: 0
        left: 0
        width: 100%
        flex-wrap: wrap
        gap: 5px
        justify-content: flex-start
        padding: 15px 20px
        animation: swiftness .4s normal forwards
        li
          padding: 2px 10px
          a
            background-color: #ffffff00 !important
    .game-right
      display: flex
      align-items: center
      gap: 15px
    
    
    ul
      display: flex
      justify-content: center
      gap: 20px
      li
        position: relative
        padding: 17px 20px 17px 0
        cursor: pointer
      .nav-hover
        color: #fff !important
        transition: all 0.3s ease-in-out
        &:hover
          color: #3d87cd !important
  .header
    width: 100%
    background-color: #2b3e4f
    padding: 17px 0
    .header-cont
      max-width: 1200px
      margin: 0 auto
      display: flex
      align-items: center
      justify-content: center
      @media (max-width: 1280px)
        width: 100%
        padding: 0 2rem
      .header-el-text
        font-size: 16px
        font-weight: 700
        padding: 0 17px
      ul.menu
        list-style: none
        padding: 0
        margin: 0
        display: flex
        gap: 47px
        &>li
          position: relative
          display: flex
          &>a
            cursor: pointer
            font-size: 18px
            font-weight: 500
            position: relative
            display: flex
            transition: .25s
            padding: 6px 11px
            border-radius: 3px
            gap: 8px
            color: #fff
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.562)
            .arrow
              transition: .25s
            &:hover
              background: #3f90dc              
              .arrow
                transform: rotateZ(180deg)
          &:hover
            .submenu
              visibility: visible
              opacity: 1
              transform: translate3d(0, 0, 0)

          .submenu
            visibility: hidden
            opacity: 0
            transform: translate3d(0, 30px, 0)
            position: absolute
            top: 100%
            margin-top: 17px
            position: absolute
            left: 0
            width: 215px
            background: #fff
            border: 1px solid #e1e1e1
            z-index: 5
            color: #333
            transition: all .3s ease-in-out
            &>li
              font-weight: 600
              font-size: 18px
              line-height: 2
              padding: 12px 39px 12px 25px
              cursor: pointer
              display: flex
              align-items: flex-start
              .arrow2
                max-width: 0
                overflow: hidden
                transition: all .1s ease-in-out
              &:first-child
                border-block-end: 1px solid #e1e1e1
              &:hover
                color: #3f90de
                .arrow2
                  max-width: 10px
                  margin-inline-end: 8px
      .menu-btn
        display: block
        height: 100%
        background-color: #7497B5
        line-height: 52px
        padding: 10px 25px
        text-transform: uppercase
        font-size: 20px
        font-weight: 500
        transition: 0.5s ease
        font-weight: bold
        text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3)
        &:hover
          background-color: #6685a1
.menu-btn2
  display: flex
  flex-wrap: wrap
  justify-content: left
  gap: 12px
  .header-el-item
    display: flex
    align-items: stretch
    align-items: center
    column-gap: 18px
    margin-inline: 20px
    .header-el-image
      display: flex
      justify-content: center
      align-items: center
      position: relative
      overflow: hidden
      z-index: 0
      height: 100%
      img
        width: 34px
        min-width: 34px
        max-width: 34px
        height: 34px
  .header-el-text
    padding: 0
    cursor: pointer
    .header-el-title
      font-size: 18px


.popup-wrapper
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.2)
  z-index: 100
  display: flex
  justify-content: center
  align-items: center
  @media (min-width: 992px)
    display: none
  .popup-content
    overflow-y: scroll
    position: absolute
    left: 0
    background-color: #2b3e4f
    width: 75%
    top: 52px
    height: calc( 100dvh - 52px )
    transform: translateX(-100%)
    transition: all 0.3s ease-in-out
    padding: 20px 0

    .popup-menus
      .menu-btn2
        flex-direction: column
        align-items: center
        color: #fff
        padding: 0 0 20px
      .menu
        border-block-start: 1px solid rgba(255, 255, 255, 0.1)
        padding: 0
        margin-block-end: 1.5625rem
        &>li
          position: relative
          cursor: pointer
          color: #ccc
          min-height: 55px
          overflow: hidden
          transition:16px
          font-weight: 700
          &>a
            padding-inline: 15px
            display: flex
            justify-content: space-between
            align-items: center
            text-decoration: none
            height: 55px
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.562)
            .icon
              width: 1.5rem
              height: 1.5rem
              transition: all 0.2s ease-in-out
          &:hover
            &>a
              background-color:  #3f90dc
              color: white
            .submenu
              max-height: 200px
          .submenu
            max-height: 0
            overflow: hidden
            position: relative
            transition: all 0.2s ease-in-out
            border-block-end: 1px solid rgba(0, 0, 0, 0.1)
            &>li
              height: 46px
              line-height: 46px
              padding-inline: 15px
              &:hover
                color: #333333
        .logout
          width: 100%
          border: 1px solid #ccc
          height: 46px
          line-height: 46px
          border-radius: 2.5rem
          margin-block: .8rem
          color: #0267db99
          text-align: center
          justify-content: center
          font-size: 1.2rem
          transition: all 0.2s ease-in-out
          &:hover
            border: 1px solid #0267db99
            background: #0267db
            color: #fff
        .has-dropdown:hover
          max-height: 999px
          a .icon
            transform: rotate(180deg) !important
  .cont-left
    transform: translateX(0%)
.is-mobile
  display: none
  transition: all 0.1s ease-in-out
@media (max-width: 992px)
  .is-pc
    display: none  !important
  .is-mobile
    display: block !important
</style>
