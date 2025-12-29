<script lang="ts" setup>
// import
import anime from '@/assets/js/anime.es.js'
const { t } = useI18n()
const siteStore = useSiteStore()
const PlayerStore = usePlayerStore()
const orderStore = useOrderStore()
const { queryKlines, queryRounds } = useGameStore()
const { queryProduct, queryInventory, betProduct } = useOrderStore()
const { getListenkey } = PlayerStore
const router = useRouter()
const route = useRoute()
const timeoutId = ref(null)
const hourDegrees = ref(0)
const minuteDegrees = ref(0)
const secondDegrees = ref(0)
const { signout } = useAuthStore()
const systemSwitch = ref(false)
const selectedPower = ref('none')
const popupSwitch = ref(false)
const recordList = ref([])
const socket: any = ref(null)
const socketConnected = ref(false)
const isFirstGet = ref(false)
const playerWallet = computed(() => {
  if (PlayerStore.playerInfo?.wallet) {
    const wallet = PlayerStore.playerInfo?.wallet.find((item) => item.type === 2)
    return wallet ? wallet.balance : 0
  } else {
    return 0
  }
})
const productList = ref([])
const ordertList = ref([])
const serverTime = ref({})
const typeLis = ref([])
const typeitem = ref('')
const selectProductOrder = ref({
  productId: '',
  action: '',
  country: '',
  piece: ''
})
const wrtlist = ref([
  {
    name: '心電監測器',
    page: 1,
    validation: 'ECG MONITOR'
  },
  {
    name: '數位乳房攝影儀',
    page: 2,
    validation: 'DM'
  },
  {
    name: '肺部劑量斷層掃描儀',
    page: 3,
    validation: 'LDCT'
  },
  {
    name: '血糖智慧監測裝置',
    page: 4,
    validation: 'CGM'
  },
  {
    name: '視網膜AI篩檢照相機',
    page: 5,
    validation: 'AI RIS'
  },
])
const localdatapro = ref([])
const onType = (item) => {
  typeitem.value = item.validation
  systemName.value = item.name
  pageNum.value = item.page
  systemSwitch.value = false
}

const ckItem = ref('')
const onItem = (item: string) => {
  ckItem.value = item
  selectProductOrder.value.productId = ckItem.value.id
}
const cyItem = ref('')

const onCountryItem = (item: string) => {
  cyItem.value = item
  selectProductOrder.value.country = item
}
const disableBet = ref(false)
const betRoundNo = ref(1)
const isSuccess = ref(true)
const checkBetData = (tpite: string) => {

  // if (betRoundNo.value === serverTime.value.currentRoundId) {
  //   ElNotification({
  //     message: '調整進行中，請勿重複送出',
  //     type: 'error',
  //     showClose: false
  //   })
  //   return
  // }
  selectProductOrder.value.action = tpite
  if (!isSuccess.value) {
    console.log(333);
    return
  }
  isSuccess.value = false
  if (!disableBet.value) {
    disableBet.value = true
    try {
      isSuccess.value = true
      disableBet.value = false
      if (selectProductOrder.value.productId === '') {
        ElNotification({
          message: `${t('請選擇材料')}`,
          type: 'error',
          showClose: false
        })
        return
      }
      if (selectProductOrder.value.piece <= 0) {
        ElNotification({
          message: `${t('請選擇數額')}`,
          type: 'error',
          showClose: false
        })
        return
      }
      if (action.value !== 'buy') {
        if (selectProductOrder.value.country === '') {
          ElNotification({
            message: `${t('請選擇國家')}`,
            type: 'error',
            showClose: false
          })

          return
        }
      }
      setTimeout(async () => {
        console.log('selectProductOrder', selectProductOrder.value)
        selectProductOrder.value.piece =
          selectProductOrder.value.piece.toString()
        const response = await betProduct(selectProductOrder.value)
        if (response.success) {
          // betRoundNo.value = serverTime.value.currentRoundId
          selectProductOrder.value.piece = ''
          ElNotification({
            title: '調整成功',
            type: 'success',
            showClose: false
          })
        } else {
          console.log(response, 'responsesss');

          // ElNotification({
          //   title: response.message,
          //   type: 'error',
          //   showClose: false
          // })
        }
        isSuccess.value = true

        await PlayerStore.fetchInfo()
        getInventory()
      }, 0)
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        disableBet.value = false
      }, 3000)
    }
  }
}
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
    socket.value = new WebSocket(
      `${POWERSOCKETURL}/${getListenkeyRes.data.listenkey}`
    )
    socket.value.onopen = (event) => {
      console.log('Connected to socket', event)
      socketConnected.value = true
      sendMessage({
        op: 'subscribe',
        channel: ['product', 'order', 'round']
      })
    }
    socket.value.onmessage = async (e) => {
      const message = JSON.parse(e.data)
      // console.log('收到來自 socket 的訊息', message)
      const { event, data } = message
      switch (event) {
        case 'SERVER_TIME': {
          serverTime.value = data
          break
        }
        default:
          break
      }
      switch (event) {
        case 'PRODUCT_UPDATE': {
          productList.value = data.result
          const localproduct = JSON.stringify(productList.value)
          localStorage.setItem('productList', localproduct)
          const type2 = route.query.type;
          console.log(route.query.type, 'route.query.type');

          // await onType(type2)
          break
        }
        default:
          break
      }
      switch (event) {
        case 'ORDER_UPDATE': {
          ordertList.value = data.result.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          })
          PlayerStore.fetchInfo()
          break
        }
        default:
          break
      }
    }
    socket.value.onclose = async () => {
      console.log('Disconnected from socket')
      isFirstGet.value = true
      socketConnected.value = false
      if (reconnected) {
        setTimeout(async () => {
          await startConnectWebSocket()
          console.log('reconnected to socket')
        }, 3000)
      }
    }

    socket.value.onerror = (error) => {
      socketConnected.value = false
      console.error('WebSocket error:', error)
    }
  }
}

const dataNumber = ref({
  0: 0,
  1: 0,
  2: 0,
  3: 0
})

const dataList = ref([
  {
    title: t('待組裝材料數量'),
    unit: t(''),
    index: '0'
  },
  {
    title: t('已認購材料總量'),
    unit: t(''),
    index: '1'
  },
  {
    title: t('今日出貨數量'),
    unit: t(''),
    index: '2'
  },
  {
    title: t('有效供應商數'),
    unit: t(''),
    index: '3'
  }
])


const handleDataInView = () => {
  anime({
    easing: 'easeInOutSine',
    targets: dataNumber.value,
    0: getRandomInRange(70000, 99999),
    1: getRandomInRange(30000, 45999),
    2: getRandomInRange(20000, 39999),
    3: getRandomInRange(1000, 1500),
    round: 1,
    duration: 1000
  })
}
const randomTimer = ref()
const systemName = ref()
const action = ref()
await onMounted(async () => {
  // onType(route.query.type)
  systemName.value = route.query.name
  pageNum.value = route.query.page
  action.value = route.query.action
  console.log(systemName, 'systemName');

  handleDataInView()
  randomTimer.value = setInterval(() => {
    handleDataInView()
    bannerIndex.value++
    if (bannerIndex.value > 8) bannerIndex.value = 0
  }, 3000)
  // await startConnectWebSocket()
  getProductList()
  getInventory()
})
const productData = ref([])
const getProductList = async () => {
  const res = await queryProduct({ limit: 25 })
  productData.value = res.data.result
  console.log(productData.value, 'dsadhbsjakdhbi');

}
const inventoryList = ref([])
const getInventory = async () => {
  const res = await queryInventory({})
  inventoryList.value = res.data.result
  console.log(inventoryList.value, 'sssddddd');

}
const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
onBeforeUnmount(() => {
  reconnected.value = false
  closeWebSocket()
  randomTimer.value = null
})

const betFormatNumber = (num) => {
  if (Number(num) >= 1000000) {
    return (Number(num) / 1000000).toFixed(0) + 'M'
  } else if (Number(num) >= 1000) {
    return (Number(num) / 1000).toFixed(0) + 'k'
  } else {
    return Number(num).toString()
  }
}
const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const activitiesPerPage = ref(5)
const currentPage = ref(1)
const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const totalPages = computed(() => {
  return Math.ceil(ordertList.value.length / activitiesPerPage.value)
})
const displayedActivities = computed(() => {
  const start = (currentPage.value - 1) * activitiesPerPage.value
  return ordertList.value.slice(start, start + activitiesPerPage.value)
})



const bannerIndex = ref(0)
const wrt = ref({
  '電極片': 'AgCl Electrodes',
  '類比晶片': 'EX:ADS1292',
  '控制晶片': 'EX:STM32',
  '通訊模組': 'BLE模組',
  '電源': 'Li-Po Battery',

  '探測面板': 'a-Se Flat Panel',
  'X光源模組': 'X-ray',
  '高壓電源模組': 'HVG',
  '壓迫板模組': 'CP',
  '控制與影響處理版': 'IP/FPGAB',

  'X光探測器陣列': 'SDA',
  '旋轉機構模組': 'CT GMA',
  '多層探測晶片': 'M-S DC',
  '高速資料轉換器': 'H-S ADC',
  '鉛防護結構件': 'LPSP',

  '微針感測貼片': 'MSP',
  '酶感測元件': 'GOES',
  '傳輸晶片': 'NFC',
  '控制晶片': 'MCU',
  '醫療膠材': 'M-G AL',

  '近紅外攝影模組': 'NRCM',
  '自動對焦鏡頭模組': 'AOwM',
  'AI運算模組': 'Edge AI',
  '螢幕顯示模組': 'T LCD P',
  '數據上傳模組': 'LTE',
})

const tcolor = ref({
  'ECG MONITOR': {
    color1: '#f5fafc',
    color2: '#d9fcfb'
  },
  'DM': {
    color1: '#f2e8db',
    color2: '#f0f4db'
  },
  'LDCT': {
    color1: '#f7e4ff',
    color2: '#d9f9e0'
  },
  'CGM': {
    color1: '#e8ffe4',
    color2: '#fae5fb'
  },
  'AI RIS': {
    color1: '#defcff',
    color2: '#fbece5'
  },
})
const getQuantity = (id) => {
  let aaa = inventoryList.value.filter(item => item.productId ==
    id)
  if (aaa.length > 0) {
    return aaa[0].quantity
  } else {
    return 0
  }
}
const pageNum = ref()
const getProductData = () => {
  const start = (Number(pageNum.value) - 1) * 5
  return productData.value.slice(start, start + 5)
}
const country = ref(['美國', '日本', '德國', '英國', '中國', '韓國', '以色列', '法國', '新加坡', '泰國', '越南', '台灣'])
</script>

<template>
  <div>
    <div class="page-container">
      <img :class="bannerIndex == 0 ? 'banneractive' : ''" src="@/assets/image/wrgame/01.jpg" alt="">
      <img :class="bannerIndex == 1 ? 'banneractive' : ''" src="@/assets/image/wrgame/02.jpg" alt="">
      <img :class="bannerIndex == 2 ? 'banneractive' : ''" src="@/assets/image/wrgame/03.jpg" alt="">
      <img :class="bannerIndex == 3 ? 'banneractive' : ''" src="@/assets/image/wrgame/04.jpg" alt="">
      <img :class="bannerIndex == 4 ? 'banneractive' : ''" src="@/assets/image/wrgame/05.jpg" alt="">
      <img :class="bannerIndex == 5 ? 'banneractive' : ''" src="@/assets/image/wrgame/06.jpg" alt="">
      <img :class="bannerIndex == 6 ? 'banneractive' : ''" src="@/assets/image/wrgame/07.jpg" alt="">
      <img :class="bannerIndex == 7 ? 'banneractive' : ''" src="@/assets/image/wrgame/08.jpg" alt="">
      <img :class="bannerIndex == 8 ? 'banneractive' : ''" src="@/assets/image/wrgame/09.jpg" alt="">
      <div class="content">
        <div class="nav-container">
          <div class="login-container">
            <div class="right-box">
              <div class="menu" @click="systemSwitch = !systemSwitch">
                選單 ▾
              </div>

              <div class="dropdown-content" :class="systemSwitch ? 'active' : ''">
                <div class="dropdown-item" @click="navigateTo('/game/warrants')">
                  返回首頁
                </div>
                <div class="dropdown-item" :class="item.name" v-for="(item, index) in wrtlist" :key="item"
                  @click.stop="onType(item)">
                  {{ item.name }}系统
                </div>
              </div>
            </div>
            <div class="left-box">
              <div class="top-title">
                <span class="info-on">{{ $lang('Hello,') }} &nbsp </span>
                <span> {{ PlayerStore?.playerInfo?.account }}</span>
              </div>

            </div>
            <div class="bottom-number">
              <span class="info-on">{{ $lang('$') }}: </span>
              <span>
                {{ new Intl.NumberFormat('zh-TW').format(playerWallet) }}</span>
            </div>
          </div>
        </div>
        <div class="game-container">
          <div class="game-items">
            <div class="game-item-title" :style="{ background: (tcolor[typeitem || 'ECG MONITOR'].color1 || '') }">
              <h1 class="title-text">
                {{ $lang(`${systemName || '-'}`) }}
              </h1>
              <!-- <div class="title-number">
                <div class="number-text">
                  {{ $lang('單號') }}: {{ serverTime?.currentRoundId }}
                </div>
              </div>
              <div class="title-quantity">
                <div class="quantity-text">
                  {{ $lang('剩餘時間') }}:{{ serverTime?.currentRoundCountdown || '0' }}s
                  {{ new Intl.NumberFormat('zh-TW').format(playerWallet) }}
                </div>
              </div> -->
            </div>
            <div class="game-data">
              <div v-for="(item, index) in dataList" :key="`data-${index}`" class="game-data-item"
                :style="{ background: (tcolor[typeitem || 'ECG MONITOR'].color2 || '') }">
                <div class="game-data-item-body">
                  <span>{{ new Intl.NumberFormat('zh-TW').format(dataNumber[item.index]) }}</span> {{ item.unit }}
                </div>
                <div class="game-data-item-header">
                  {{ item.title }}
                </div>
              </div>
            </div>
            <div class="sub-box">
              <div class="game-inp">
                <input v-model="selectProductOrder.piece" placeholder="数量" />
              </div>
              <div class="game-item-content">
                <div class="game-item" :class="ckItem === ite ? 'active' : ''" @click="onItem(ite)"
                  v-for="(ite, index) in getProductData()" :key="index" v-if="productData.length > 0">
                  <h1>{{ ite.name }}</h1>
                  <p style="font-size: 15px;margin-top: 5px;">{{ wrt[ite.name] }}</p>
                  <p style="font-size: 15px;margin-top: 5px;">庫存：{{ getQuantity(ite.id)
                  }}</p>
                </div>
              </div>
              <div v-if="action != 'buy'" class="game-item-content">
                <div class="game-item cy-item" :class="cyItem === ite ? 'activec' : ''" @click="onCountryItem(ite)"
                  v-for="(ite, index) in country" :key="index">
                  <h1>{{ ite }}</h1>
                </div>
              </div>
              <div class="game-item-country"></div>
              <div class="btnbox">
                <div v-if="action == 'buy'" class="game-submit buy" @click="checkBetData('buy')">
                  <span>{{ $lang('採購') }}</span>
                </div>
                <div v-if="action == 'sell'" class="game-submit rent" @click="checkBetData('rent')">
                  <span>{{ $lang('租') }}</span>
                </div>
                <div v-if="action == 'sell'" class="game-submit sell" @click="checkBetData('sell')">
                  <span>{{ $lang('售') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="popupSwitch" class="popup" @click.self="popupSwitch = !popupSwitch">
      <div class="card">
        <div class="title">{{ $lang('檢驗紀錄') }}</div>
        <div class="dataBox">
          <div class="col">
            <div v-for="(item, index) in displayedActivities" class="item">
              <div class="date">
                <div class="time">
                  {{ formatDate(item.createdAt) }}
                </div>
                <div v-if="item.status === 0" class="state false">
                  {{ $lang('等待驗證') }}
                </div>
                <div v-else>
                  <div v-if="item.profit > 0" class="state true">
                    {{ $lang('正確') }}
                  </div>
                  <div v-else class="state false">{{ $lang('錯誤') }}</div>
                </div>
              </div>
              <div class="leftBox">
                <div class="name">
                  【{{ $lang('期號') }}】{{ item.roundNo }}
                </div>
                <div class="type">
                  【{{ $lang('轉換技術') }}】{{ item.productName }}
                </div>
                <div class="type">
                  【{{ $lang('確認按鈕') }}】{{ item.option.validation }}
                </div>
              </div>
              <div class="rightBox">
                <div class="inValue">
                  【{{ $lang('光伏(pv)組件') }}】<span>{{
                    item.option.type
                  }}</span>
                </div>
                <div class="amount">
                  【{{ $lang('單位數值') }}】{{ item.amount }}
                </div>
              </div>
            </div>
          </div>
          <ul class="pagination">
            <li :class="currentPage === 1 ? 'disabled' : ''">
              <button type="button" class="btn btn-gold" @click="previousPage">
                « {{ $lang('上一頁') }}
              </button>
            </li>
            <li class="">
              <button type="button" class="btn btn-gold" @click="nextPage">
                {{ $lang('下一頁') }} »
              </button>
            </li>
          </ul>
        </div>
        <div class="closeBtn">
          <button type="button" @click="popupSwitch = !popupSwitch">
            {{ $lang('關閉') }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="sass" scoped>
.game-data
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))
  gap: 30px
  width: 90%
  max-width: 1000px
  margin: 0 auto
  @media (max-width: 992px)
    gap: 15px
    width: 100%
  &-item
    background: rgb(222 255 252 / 91%)
    backdrop-filter: blur(8px)
    border-radius: 8px
    padding: 20px
    text-align: center
    transition: all 0.6s ease
    box-shadow: 0 2px 8px rgba(0,0,0,0.1)
    
    &-header
      font-weight: bold
      font-size: 20px
      font-weight: 800
      color: #004d40
      @media (max-width: 992px)
        font-size: 16px !important
    &-body
      color: #004d40
      margin-bottom: 10px
      font-size: 30px
      font-weight: 500

</style>
<style scoped lang="sass">
$border: 2px solid #354866
$round-14: 14px
$background: rgba(0, 0, 0, 0.6)
.bottom-number
  word-wrap: break-word
  line-height: 24px
  // min-height: 48px
.right-info
  text-align: end
  .info-on
    display: none
.page-container
  position: relative
  background-size: cover
  min-height: 100vh
  background-color: #111
  overflow: hidden
  .banneractive
    opacity: 1 !important
  img
    position: fixed
    top:0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
    opacity: 0
    transition: opacity 1.2s
  // padding: 12px
.content
  height: 100vh
  overflow-y: auto
.nav-container
  position: sticky
  top: 0
  z-index: 99
.login-container
  margin: 0 auto
  display: flex
  align-items: center
  justify-content: center
  max-width: 100%
  // background: rgba(0, 0, 0, 0.6)
  padding: 35px 15px
  gap: 15px
  // max-height: 70px
  color: #fff
  @media (max-width: 992px)
    padding: 10px 10px
    background-color: #6f6f6f
    padding: 10px
    .left-box,.menu,.bottom-number
      margin: 0
  .left-box,.menu,.bottom-number
    background: rgba(255, 255, 255, 0.849)
    backdrop-filter: blur(10px)
    color: #007c91 !important
    text-decoration: none
    padding: 10px 10px !important
    border: 1px solid rgba(255, 255, 255, 0.8)
    border-radius: 6px
    font-weight: 600
    cursor: pointer
    transition: transform 0.2s, background 0.2s
    position: relative
    min-width: 100px
    text-align: center
    white-space: nowrap
    font-size: 16px !important
    &:hover
      transform: translateY(-2px)
  .left-box
    display: flex
    align-items: center
    font-size: 18px
    padding-inline: 20px
    @media (max-width: 992px)
      font-size: 14px
    .logo
      // width: 35px
      height: 35px
      vertical-align: middle
  .right-box
    .menu
      display: flex
      justify-content: center
      color: white
      padding: 10px 14px
      font-size: 16px
      cursor: pointer
      transition: background 0.3s
      border-radius: 4px
      @media (max-width: 992px)
        font-size: 14px
      &:hover
        background: rgba(255,255,255,0.5)
        border-radius: 4px
        position: relative
        cursor: pointer
        // background-color: #007bff
        color: white
        // width: 120px
        user-select: none
        text-align: center
        span
          width: 30px
          height: 30px
          font-size: 28px


  .dropdown-content
    position: absolute
    left: 0
    top: 100%
    border-radius: 6px
    overflow: hidden
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
    background-color: #dbf3f9
    min-width: 200px
    font-size: 1rem
    text-align: left
    display: flex
    flex-direction: column
    justify-content: center
    height: 0 
    // z-index: 10
    transition: all .2s ease-in-out
    transform: translateY(10%)
    opacity: 0
    z-index: -10
    font-weight: 600
    border: 3px solid #90caf0
    &.active
      transform: translateY(0)
      opacity: 1
      z-index: 99
      height: auto !important
    .dropdown-item
      display: block
      padding: 0.6rem 10px
      text-align: center
      white-space: nowrap
      color: #1a80d3
      &:hover
        background-color: rgba(255, 255, 255, 0.1)
      
@keyframes fadeIn
  from 
    opacity: 0
    transform: translateY(20px)
  to 
    opacity: 1
    transform: translateY(0)
.game-container
  // height: 100vh
  overflow-y: auto
  .game-items
    margin: 0 auto
    max-width: 1150px
    animation: fadeIn 1.5s ease-in-out
    display: flex
    flex-direction: column
    align-items: center
    padding: 15px
    padding-top: 5px

  .game-item-title
    background: rgba(255, 255, 255, 0.89)
    border-radius: 15px
    padding: 20px 50px
    max-width: 900px
    margin: 0px auto 40px auto
    display: flex
    flex-direction: column
    align-items: center
    justify-content: flex-start
    text-align: center
    animation: fadeIn 1s ease-out forwards
    opacity: 0
    small
      color: #E07A5F
      display: block
      font-size: 20px
      font-weight: bold
      font-style: italic
      position: relative
      padding-left: 75px
      a
        color: #F2CC8F
      &::before
        content: ""
        background-color: #ffffff
        width: 50px
        height: 2px
        position: absolute
        top: 50%
        left: 35px
        transform: translate(-50%, 0)
        
    .title-text
      color: #007c91
      padding: 10px 15px
      border-radius: 8px
      font-weight: bold
      letter-spacing: 2px
      font-size: 35px
      margin-bottom: 8px
      animation: fadeIn 1s ease-out forwards
      opacity: 0
      @media (max-width: 992px)
        font-size: 32px
    .title-quantity
      .quantity-text
        font-weight: bold
        font-size: 1.25rem
        color: #9c5605
        @media (max-width: 992px)
          font-size: 18px
          margin: 0
    .title-number
      font-size: 22px
      color: #004d40
      font-weight: bold
      @media (max-width: 992px)
        font-size: 22px
  .game-item-content
    padding: 10px 0
    display: flex
    flex-wrap: wrap
    max-width: 900px
    gap: 20px
    justify-content: center
    
    .game-item
      cursor: pointer
      padding: 12px 20px
      border-radius: 8px
      background-color: #6e6f6f
      color: white
      font-weight: 400
      user-select: none
      text-align: center
      box-shadow: 0 3px 6px rgba(78, 168, 255, 0.5)
      transition: all 0.25s ease
      display: inline-block
      white-space: nowrap
      flex-grow: 0
      flex-shrink: 1
      min-width: 120px
      max-width: 100%
      font-size: 25px
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.685)
      @media (max-width: 992px)
        flex: 1 1 calc(50% - 12px)
        text-align: center
        min-width: unset
        max-width: 100%
      &.active
        background-color: #0b3d91
        color: #fff
        transform: scale(1.05)
        border-color: #00BCD4
        box-shadow: 0 6px 12px rgba(11, 61, 145, 0.85)
        &:hover
          background: #0b3d91
          color: #fff
          transform: scale(1.05)
          border-color: #00BCD4
          box-shadow: 0 6px 12px rgba(11, 61, 145, 0.85)
      &:hover
        background-color: #1c6dd0
        box-shadow: 0 6px 12px rgba(28, 109, 208, 0.7)
        transform: translateY(-2px)
      h1
        font-size: 22px
        @media (max-width: 992px)
          font-size: 20px
    .cy-item
      background-color: #5F6F73
    .activec
      background: linear-gradient(135deg, #ff9151, #ff6b08)
  .btnbox
    display: flex
    gap: 30px
    @media (max-width: 992px)
      display: block
      width: 100%
  .sub-box
    border-radius: 8px
    margin: 0px 0 40px
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    @media (max-width: 992px)
      padding: 20px 0
      margin: 0px
  .game-inp
    // margin-top: 40px
    max-width: 320px
    width: 100%
    input
      width: 100%
      padding: 15px 16px
      font-size: 18px
      margin: 20px 0
      border-radius: 8px
      border: none
      outline: none
      background: rgba(255, 255, 255, 0.9)
      color: #000
      font-weight: 400
      border: 2px solid #ddd

  .game-submit
    padding: 14px 28px
    font-size: 25px
    font-weight: 700
    color: #fff
    background: linear-gradient(135deg, #ff9151, #ff6b08)
    border: none
    border-radius: 8px
    box-shadow: 0 4px 12px rgba(231, 153, 50, 0.4)
    cursor: pointer
    transition: all 0.3s ease
    position: relative
    overflow: hidden
    width: 400px
    max-width: 100%
    display: block
    margin: 20px auto
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.63)
    text-align: center
    margin-top: 40px
    span
      z-index: 2
    &:hover
      box-shadow: 0 6px 18px rgba(112, 112, 112, 0.6)
      transform: translateY(-2px)
  .sell
    background: linear-gradient(135deg, #0A3D91, #1E5BFF)
  .rent
    background: linear-gradient(135deg, #27AE60, #2ECC71)

</style>
