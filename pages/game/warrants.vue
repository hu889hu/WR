<script lang="ts" setup>
import img1 from "@/assets/image/wrgame/o01.jpg"
import img2 from "@/assets/image/wrgame/o02.jpg"
import img3 from "@/assets/image/wrgame/o03.jpg"
import img4 from "@/assets/image/wrgame/o04.jpg"
import img5 from "@/assets/image/wrgame/o05.jpg"
const PlayerStore = usePlayerStore()
const { getListenkey } = PlayerStore
const socket: any = ref(null)
const socketConnected = ref(false)
const productList = ref([])
const isFirstGet = ref(false)

const wrt = ref({
  'ECG MONITOR': {
    img: img1,
    text: '電極片、類比晶片、控制晶片、通訊模組、電源'
  },
  'DM': {
    img: img2,
    text: '探測面板、X光源模組、高壓電源模組、壓迫板、影響處理版'
  },
  'LDCT': {
    img: img3,
    text: 'X光探測器、旋轉機構模組、探測晶片、高速資料轉換、鉛防護'
  },
  'CGM': {
    img: img4,
    text: '微針感測貼片、酶感測元件、傳輸晶片、控制晶片、醫療膠材'
  },
  'AI RIS': {
    img: img5,
    text: '近紅外攝影、自動對焦鏡頭、AI運算、螢幕顯示、數據上傳模組'
  },
})

const wrtlist = ref([
  {
    name: '心電監測器',
    validation: 'ECG MONITOR',
    img: img1,
    page: 1,
    text: '電極片、類比晶片、控制晶片、通訊模組、電源'
  },
  {
    name: '數位乳房攝影儀',
    validation: 'DM',
    img: img2,
    page: 2,
    text: '探測面板、X光源模組、高壓電源模組、壓迫板、影響處理版'
  },
  {
    name: '肺部劑量斷層掃描儀',
    validation: 'LDCT',
    img: img3,
    page: 3,
    text: 'X光探測器、旋轉機構模組、探測晶片、高速資料轉換、鉛防護'
  },
  {
    name: '血糖智慧監測裝置',
    validation: 'CGM',
    img: img4,
    page: 4,
    text: '微針感測貼片、酶感測元件、傳輸晶片、控制晶片、醫療膠材'
  },
  {
    name: '視網膜AI篩檢照相機',
    validation: 'AI RIS',
    img: img5,
    page: 5,
    text: '近紅外攝影、自動對焦鏡頭、AI運算、螢幕顯示、數據上傳模組'
  },
])

// game socket
const reconnected = ref(true)
const closeWebSocket = async () => {
  if (socket.value) {
    socket.value.close()
  }
}
const sendMessage = (msg: any) => {
  // send message to server
  socket.value.send(JSON.stringify(msg))
}
// 連接 socket
const startConnectWebSocket = async () => {
  const getListenkeyRes = await getListenkey()
  console.log('getListenkeyRes', getListenkeyRes)
  if (getListenkeyRes.success) {
    const runtimeConfig = useRuntimeConfig()
    const { POWERSOCKETURL } = runtimeConfig.public

    // 检查 POWERSOCKETURL 是否存在
    if (!POWERSOCKETURL) {
      console.error('POWERSOCKETURL is undefined or null')
      return
    }

    // 检查 listenkey 是否存在
    const listenkey = getListenkeyRes.data?.listenkey || getListenkeyRes?.listenkey
    if (!listenkey) {
      console.error('listenkey is undefined or null')
      return
    }

    // 添加重试机制
    const connectWithRetry = (url: string, retries: number = 3) => {
      const ws = new WebSocket(url)
      ws.onopen = (event) => {
        console.log('Connected to socket', event)
        socket.value = ws
        socketConnected.value = true
        sendMessage({
          op: 'subscribe',
          channel: ['product', 'order', 'round']
        })
      }
      ws.onmessage = async (e) => {
        const message = JSON.parse(e.data)
        // console.log('收到來自 socket 的訊息', message)
        const { event, data } = message

        switch (event) {
          case 'PRODUCT_UPDATE': {
            productList.value = data.result

            break
          }
          default:
            break
        }
      }
      ws.onclose = async () => {
        console.log('Disconnected from socket')
        isFirstGet.value = true
        socketConnected.value = false
        if (reconnected.value && retries > 0) {
          setTimeout(async () => {
            console.log(`Retrying connection... ${retries} attempts left`)
            connectWithRetry(url, retries - 1)
          }, 3000)
        }
      }
      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        ws.close()
      }
    }

    connectWithRetry(`${POWERSOCKETURL}/${listenkey}`)
  } else {
    console.error('Failed to get listenkey', getListenkeyRes)
  }
}

const handleScroll = () => {
  scrollTop.value = window.scrollY
}
onMounted(async () => {
  if (window) {
    console.log('window', window.innerWidth)
    window.addEventListener('scroll', handleScroll)
  }
  await startConnectWebSocket()
})
onBeforeUnmount(() => {
  reconnected.value = false
  console.log('closeWebSocket', reconnected.value)
  closeWebSocket()
})

const onPush = (item: string) => {
  if (item.validation === '/') return navigateTo(item)
  let pathStr = '/game?type=' + item.validation + '&name=' + item.name + '&page=' + item.page
  navigateTo(pathStr)
}
const scrollTop = ref(0)
</script>
<template>
  <div class="page">
    <headerTop :absolute="scrollTop > 130" />
    <!-- <div class="section1">
      <div v-if="productList.length > 0" class="wallet-list">
        <div class="item" @click="onPush(item.validation)" v-for="(item, index) in productList" :key="index">
          <h3>{{ item.name || '-' }}</h3>
          <h2>進入系統</h2>
          <h5>{{ item.validation[0] }}</h5>
        </div>
        <div class="item" @click="navigateTo('/user')">
          <h3>技術系統</h3>
          <h2>返回首頁</h2>
          <h5>返回技術系統頁面</h5>
        </div>
      </div>
      <div v-else class="load">數據加載中...</div>
    </div> -->
    <div class="tag">
      {{ $lang('智能系統') }}
    </div>
    <div class="page-main">
      <div class="ino-pg">
        <h3 class="ul-contact-form-container__title" style="line-height: 20px">
          多元化智能檢測系統
        </h3>
        <hr style="border-top: 1px solid #d7d7d7;opacity: 1;margin-bottom: 50px;">
        <div class="gameitem">
          <div class="item" @click="onPush(item)" v-for="(item, index) in wrtlist" :key="index">
            <div class="imgbox">
              <img :src="item.img" alt="">

            </div>
            <div class="content">
              <div class="mtext">
                <div>{{ item.name || '-' }}</div>
                <div style="opacity: 0.65;font-size: 14px;font-weight: 600;">{{ item.validation }}</div>
              </div>
              <div class="down">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <IndexFooter />
  </div>
</template>
<style scoped lang="sass">
.page
  position: relative
  width: 100%
  height: 100vh
  overflow-y: auto
  .tag
    padding: 100px 0
    background-image: url('@/assets/image/wruser/bg13.jpg')
    background-size: cover
    background-position: center
    text-align: center
    text-shadow: 2px 2px 2px #000
    color: #f8f8c0
    font-size: 33px
  .page-main
    width: 100%
    padding: 100px
    background: #edeff4
    @media (max-width: 992px)
      padding: 50px 0
      .gameitem
        grid-template-columns: repeat(1, 1fr) !important
    .ino-pg
      max-width: 1200px
      margin: 0 auto
      padding: 0 20px
      .ul-contact-form-container__title
        font-size: 18px
        margin-bottom: 15px
        border-left: 4px solid #007BFF
        padding-left: 14px
        color: #151515
        line-height: 20px
        font-weight: 600
      .gameitem 
        display: grid
        flex-wrap: wrap
        grid-template-columns: repeat(3, 1fr)
        grid-gap: 2rem
        margin: 20px 0
        .item
          cursor: pointer
          &:hover
            img
              transform: scale(1.1)
            .mtext
              transform: translateY(-100%)
              opacity: 0
          .imgbox
            height: 288px
            overflow: hidden
            img
              width: 100%
              height: 100%
              object-fit: cover
              transition: all .3s
              
          .content
            background-color: #3f90dc
            color: #fff
            position: relative
            overflow: hidden
            min-height: 95px
            .mtext
              background-color: #3f90dc
              width: 100%
              padding: 25px
              font-size: 18px
              position: absolute
              top: 0
              left: 0
              z-index: 3
              transition: all .3s
            .down
              padding: 25px
              max-width: 70%
              font-size: 14px
</style>
