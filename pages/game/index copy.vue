<script lang="ts" setup>
import '@/assets/sass/TempPage.min.css'
import anime from '@/assets/js/anime.es.js'
// import
const siteStore = useSiteStore()
const PlayerStore = usePlayerStore()
const orderStore = useOrderStore()
const { queryKlines, queryRounds } = useGameStore()
const { getListenkey } = PlayerStore
const { locale, t } = useI18n()
const lang = locale.value
const { queryInstruction, queryNews } = useSiteStore()
const router = useRouter()
const timeoutId = ref(null)
const isMenuVisible = ref(false)
const currentBehavior = ref(0)

const handleBehaviorClick = (num) => {
  if (num === currentBehavior.value) {
    currentBehavior.value = 0
    return
  }
  currentBehavior.value = num
}

const dataList = ref([
  {
    title: t('待進貨數量'),
    unit: t('劑'),
    index: '0'
  },
  {
    title: t('待出貨數量'),
    unit: t('劑'),
    index: '1'
  },
  {
    title: t('目前庫存量'),
    unit: t('劑'),
    index: '2'
  },
  {
    title: t('待出貨廠商'),
    unit: t(''),
    index: '3'
  }
])

const dataNumber = ref({
  0: 0,
  1: 0,
  2: 0,
  3: 0
})

const handleDataInView = () => {
  anime({
    easing: 'easeInOutSine',
    targets: dataNumber.value,
    0: 67218,
    1: 21168,
    2: 149006,
    3: 28,
    round: 1,
    duration: 2000
  })
}

function getRandomInRange() {
  return Math.random() * 0.2 + 0.9
}
const triggerDataRandom = () => {
  anime({
    easing: 'easeInOutSine',
    targets: dataNumber.value,
    0: 67218 * getRandomInRange(),
    1: 21168 * getRandomInRange(),
    2: 149006 * getRandomInRange(),
    3: 28 * getRandomInRange(),
    round: 1,
    duration: 2000
  })
}
const randomTimer = ref(null)

// data
const coinBoxChecked = ref(false)
const record = ref({
  title: '當前委託',
  type: 'currentOrder',
  search: true
})
const search = ref({
  pair: '',
  roundId: '',
  dateRangeStart: '',
  dateRangeEnd: ''
})
const showToolPopup = ref(false)
const symbol = ref(
  Object.keys(PlayerStore.playerInfo.availablePairs).find(
    (key) => PlayerStore.playerInfo.availablePairs[key].isOpen
  )
)
const availableCurrency = ref([])
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const socket = ref(null)
const socketConnected = ref(false)
const betData = ref({
  symbol: '',
  option: [],
  amount: '',
  roundId: ''
})
const recordList = ref([])
const historyRecordList = ref([])
// 圖表數據值
const nowTimestamp = ref(null)
const socketNewPrice = ref(null)
const isFirstGet = ref(true)
const createChartData = ref(null)
const socketCurrentRoundCountdown = ref(0)
const news = ref(null)
const rule = ref(null)

const selectSymbol = () => {
  closeWebSocket()
  document.getElementById('coinBox').checked = false
}
// method
const goPopup = async (title: string) => {
  console.log('recordList', recordList)
  record.value.title = title
  showToolPopup.value = true
  search.value.pair = symbol.value
  if (title === '當前委託') {
    record.value.type = 'currentOrder'
    record.value.search = true
    return
  }
  if (title === '歷史委託') {
    record.value.type = 'historyOrder'
    record.value.search = true
    return
  }
  if (title === '歷史盤口') {
    const response = await queryRounds({
      pair: symbol.value
    })
    record.value.type = 'historyRecord'
    historyRecordList.value = response.data.result
    record.value.search = true
    return
  }
  if (title === '網站公告') {
    record.value.type = 'announcement'
    record.value.search = false
    return
  }
  if (title === '規則說明') {
    record.value.type = 'rule'
    record.value.search = false
  }
}
const closePopup = () => {
  showToolPopup.value = false
}
const connectRecordList = (title: String) => {
  switch (title) {
    case 'currentOrder':
      return recordList.value.filter((item) => !item.closeAt)
    case 'historyOrder':
      return recordList.value.filter((item) => item.closeAt)
  }
}
const addBetGameType = (type: string) => {
  // if (betData.value.option.includes(type)) {
  //   betData.value.option = betData.value.option.filter((item) => item !== type)
  // } else {
  //   betData.value.option.push(type)
  // }
  betData.value.option.length = 0
  betData.value.option.push(type)
}
const checkBetData = () => {
  betData.value.symbol = symbol.value
  betData.value.amount =
    siteStore.siteData.betAmounts[
      siteStore.siteData.betAmounts.length - 1
    ].toString()
  console.log(betData.value)
  const pairData = PlayerStore.playerInfo.availablePairs[symbol.value]
  // console.log("pairData", pairData);
  // banned action
  if (pairData.banned) {
    ElNotification({
      message: pairData.message,
      type: 'error',
      showClose: false
    })
    return
  }
  if (betData.value.amount === '') {
    ElNotification({
      message: '請輸入下單金額',
      type: 'error',
      showClose: false
    })
    return
  }
  if (betData.value.option.length === 0) {
    ElNotification({
      message: '請選擇購置或放置',
      type: 'error',
      showClose: false
    })
    return
  }
  if (parseFloat(betData.value.amount) < siteStore.siteData.minBetAmount) {
    ElNotification({
      message: `最低下注金額為 $ ${siteStore.siteData.minBetAmount}`,
      type: 'error',
      showClose: false
    })
    return
  }
  if (parseFloat(betData.value.amount) > siteStore.siteData.maxBetAmount) {
    ElNotification({
      message: `最高下注金額為 $ ${siteStore.siteData.maxBetAmount}`,
      type: 'error',
      showClose: false
    })
    return
  }
  setTimeout(
    async () => {
      betData.value.amount = betData.value.amount.toString()
      const response = await orderStore.bet(betData.value)
      if (response.success) {
        ElMessageBox.alert(
          `
            <p style="margin:0 0 8px 0"> 工單編號: ${response.data.roundId} </p>
            <p style="margin:0 0 8px 0"> 工單類別: ${gameOptionNameList(
            response.data.option
          )} </p>
            <p style="margin:0 0 8px 0"> 時間: ${formatDate(
            response.data.openAt
          )} </p>
          `,
          '下單成功',
          {
            confirmButtonText: '確認',
            center: true,
            dangerouslyUseHTMLString: true
          }
        )
      } else {
        ElNotification({
          message: response.data.message,
          type: 'error'
        })
      }
      clearBetData()
      await PlayerStore.fetchInfo()
      const queryOrderRes = await orderStore.queryOrder({
        pair: symbol.value
      })
      recordList.value = queryOrderRes.data.result
    },
    (pairData.delay + 1) * 1000
  )
}
const gameOptionOdd = (type: number) => {
  switch (type) {
    case 0:
      return PlayerStore.playerInfo.gameOptions[0].odds * 100 + '%'
    case 1:
      return PlayerStore.playerInfo.gameOptions[1].odds * 100 + '%'
    case 2:
      return PlayerStore.playerInfo.gameOptions[2].odds * 100 + '%'
    case 3:
      return PlayerStore.playerInfo.gameOptions[3].odds * 100 + '%'
    case 4:
      return PlayerStore.playerInfo.gameOptions[4].odds * 100 + '%'
    case 5:
      return PlayerStore.playerInfo.gameOptions[5].odds * 100 + '%'
    case 6:
      return PlayerStore.playerInfo.gameOptions[6].odds * 100 + '%'
    default:
      return ''
  }
}

const showOption = (type: number) => {
  switch (type) {
    case 0:
      return PlayerStore.playerInfo.gameOptions[0].isOpen
    case 1:
      return PlayerStore.playerInfo.gameOptions[1].isOpen
    case 2:
      return PlayerStore.playerInfo.gameOptions[2].isOpen
    case 3:
      return PlayerStore.playerInfo.gameOptions[3].isOpen
    case 4:
      return PlayerStore.playerInfo.gameOptions[4].isOpen
    case 5:
      return PlayerStore.playerInfo.gameOptions[5].isOpen
    case 6:
      return PlayerStore.playerInfo.gameOptions[6].isOpen
    default:
      return ''
  }
}

const gameOptionNameList = (list: Array) => {
  const result = []
  list.forEach((item) => {
    result.push(gameOptionName(item))
  })
  return result.join(', ')
}

const gameOptionName = (type: Number) => {
  switch (type) {
    case 0:
      return `${t('高')}`
    case 1:
      return `${t('低')}`
    case 2:
      return `${t('單')}`
    case 3:
      return `${t('雙')}`
    case 4:
      return `${t('購置')}`
    case 5:
      return `${t('放置')}`
    case 6:
      return `${t('反指標')}`
    default:
      return ''
  }
}
const gameResultName = (type: Number) => {
  // 0 : 高、1 : 低、2 : 單、3 : 雙、4 : 漲、5 : 跌 6 : 合
  switch (type) {
    case 0:
      return `${t('高')}`
    case 1:
      return `${t('反指標')}`
    case 2:
      return `${t('單')}`
    case 3:
      return `${t('雙')}`
    case 4:
      return `${t('購置')}`
    case 5:
      return `${t('放置')}`
    case 6:
      return `${t('和')}`
    default:
      return `${t('未知')}`
  }
}

const clearBetData = () => {
  betData.value = {
    symbol: '',
    option: [],
    amount: '',
    roundId: ''
  }
  // document.getElementById('game-1').checked = false
  // document.getElementById('game-2').checked = false
  // document.getElementById('game-3').checked = false
  // document.getElementById('game-4').checked = false
  // document.getElementById('game-5').checked = false
  // document.getElementById('game-6').checked = false
  // document.getElementById('game-7').checked = false
}

const initMilliseconds = (timestamp: any) => {
  const newDate = new Date(timestamp)
  newDate.setMilliseconds(0)
  return newDate.getTime()
}

const randomVolume = () => {
  return parseFloat((Math.random() * 100 + 1).toFixed(2))
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

const getChartData = async (timestamp: any) => {
  // 取得遠端資料
  // 取 3 分鐘的資料
  const now = new Date(nowTimestamp.value)
  now.setSeconds(0, 0)
  now.setMinutes(now.getMinutes() - 3)
  const startTime = now.getTime()
  const endTime = timestamp
  const data = {
    symbol: symbol.value,
    interval: '1',
    startTime,
    endTime
  }
  const klineData = await queryKlines(data)
  if (klineData.success) {
    isFirstGet.value = false // 第一次獲取開關關閉
    const { klines } = klineData.data
    const newKLines = Object.entries(klines).map(([timestamp, value]) => {
      const volume = randomVolume()
      const turnover = Number(value.close) * volume
      return {
        timestamp: Number(timestamp) * 1000,
        open: Number(value.open),
        close: Number(value.close),
        high: Number(value.high),
        low: Number(value.low),
        volume,
        turnover
      }
    })
    createChartData.value = { newKLines, time: timestamp }
  }
}

const searchOrder = async () => {
  const startDate = new Date(search.value.dateRangeStart)
  search.value.dateRangeStart = startDate.getTime()
  const endDate = new Date(search.value.dateRangeEnd)
  search.value.dateRangeEnd = endDate.getTime()
  console.log('searchOrder', search.value)
  if (!search.value.dateRangeStart) {
    delete search.value.dateRangeStart
  }
  if (!search.value.dateRangeEnd) {
    delete search.value.dateRangeEnd
  }
  if (record.value.type !== 'historyRecord') {
    const response = await orderStore.queryOrder(search.value)
    if (response.success) {
      recordList.value = response.data.result
    } else {
      ElNotification({
        message: response.message,
        type: 'error'
      })
    }
  } else {
    // 搜尋盤口
    const response = await queryRounds(search.value)
    if (response.success) {
      historyRecordList.value = response.data.result
    } else {
      ElNotification({
        message: response.message,
        type: 'error'
      })
    }
  }
  search.value.dateRangeStart = ''
  search.value.dateRangeEnd = ''
  search.value.roundId = ''
}
// ctyptoData

const reconnected = ref(true)
const closeWebSocket = async () => {
  if (socket.value) {
    socket.value.close()
  }
}
// 連接 socket
const startConnectWebSocket = async () => {
  const getListenkeyRes = await getListenkey()
  console.log('getListenkeyRes', getListenkeyRes)
  const runtimeConfig = useRuntimeConfig()
  const { SOCKETBASE } = runtimeConfig.public
  socket.value = new WebSocket(
    `${SOCKETBASE}/${getListenkeyRes.data.listenkey}`
  )
  socket.value.onopen = (event) => {
    console.log('Connected to socket', event)
    socketConnected.value = true
  }
  socket.value.onmessage = async (e) => {
    const message = JSON.parse(e.data)
    // console.log('收到來自 socket 的訊息', message);
    const { event, data } = message
    switch (event) {
      case 'KLINE_UPDATE': {
        // 右側列表數據
        data.forEach((item) => {
          if (availableCurrency.value.length === 0) {
            if (
              PlayerStore.playerInfo.availablePairs[item.symbol] &&
              PlayerStore.playerInfo.availablePairs[item.symbol].isOpen
            ) {
              availableCurrency.value.push({
                symbol: item.symbol,
                price: [
                  {
                    open: parseFloat(item.price.open),
                    close: parseFloat(item.price.close)
                  }
                ],
                symbolData: PlayerStore.playerInfo.availablePairs[item.symbol]
              })
            }
          } else if (
            PlayerStore.playerInfo.availablePairs[item.symbol] &&
            PlayerStore.playerInfo.availablePairs[item.symbol].isOpen
          ) {
            const currency = availableCurrency.value.find(
              (currency) => currency.symbol === item.symbol
            )
            if (currency) {
              currency.price.push({
                open: parseFloat(
                  currency.price[currency.price.length - 1].close
                ),
                close: parseFloat(item.price.close)
              })
            } else {
              availableCurrency.value.push({
                symbol: item.symbol,
                price: [
                  {
                    open: parseFloat(item.price.open),
                    close: parseFloat(item.price.close)
                  }
                ],
                symbolData: PlayerStore.playerInfo.availablePairs[item.symbol]
              })
            }
          }
        })

        // 圖表列表數據
        const { timestamp: correctTimestamp } = message
        const timestamp = initMilliseconds(correctTimestamp)
        nowTimestamp.value = timestamp
        const symbolData = data.find((item) => item.symbol === symbol.value)

        // 已選擇數據整理
        if (symbolData) {
          const { price } = symbolData
          // 數據整理
          let newPrice = Object.entries(price).reduce((acc, [key, value]) => {
            acc[key] = parseFloat(value)
            return acc
          }, {})
          const volume = randomVolume()
          const turnover = newPrice.close * volume
          newPrice = {
            timestamp,
            ...newPrice,
            turnover,
            volume
          }
          socketNewPrice.value = newPrice

          // 第一次取得所有數據 & 產生空資料
          if (isFirstGet.value) getChartData(timestamp)
        }
        break
      }
      case 'SERVER_TIME': {
        const { allowBetRoundId, currentRoundCountdown } = data
        betData.value.roundId = allowBetRoundId
        socketCurrentRoundCountdown.value = currentRoundCountdown
        // console.log(data);
        if (currentRoundCountdown === 59) {
          await PlayerStore.fetchInfo()
          const queryOrderRes = await orderStore.queryOrder({
            pair: symbol.value
          })
          recordList.value = queryOrderRes.data.result
        }
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
      await startConnectWebSocket()
      console.log('reconnected to socket')
    }
  }

  socket.value.onerror = (error) => {
    socketConnected.value = false
    console.error('WebSocket error:', error)
  }
}
const symbolChange = (symbol: string) => {
  // switch (symbol) {
  //   case 'BTCUSDT':
  //     return '太陽能'
  //   case 'WFEURUSD':
  //     return '風能'
  //   case 'WFGBPUSD':
  //     return '地熱能'
  //   case 'WFUSDTWD':
  //     return '海洋能'
  //   default:
  return (
    PlayerStore.playerInfo.availablePairs[symbol]?.label ||
    PlayerStore.playerInfo.availablePairs[symbol]?.name ||
    PlayerStore.playerInfo.availablePairs[symbol]?.symbol
  )
  // }
}
onMounted(async () => {
  handleDataInView()
  randomTimer.value = setInterval(() => {
    triggerDataRandom()
  }, 5000)
  await startConnectWebSocket()
  const pair = symbol.value
  const type = 'game'
  const path = 'game'
  /** await Promise then  */
  // 開始加載數據（此處沒有使用 await，因此主線程不會被阻塞）
  const queryOrderPromise = orderStore.queryOrder({ pair })
  const queryInstructionPromise = queryInstruction(lang, type)
  const queryNewsPromise = queryNews(lang, path)
  // 使用 .then() 方法處理異步任務結果
  queryOrderPromise
    .then((queryOrderRes) => {
      // 處理響應結果
      recordList.value = queryOrderRes.data.result
    })
    .catch((error) => {
      console.error('Error loading order data:', error)
    })

  queryInstructionPromise
    .then((queryInstructionRes) => {
      // 處理響應結果
      rule.value = queryInstructionRes.data
    })
    .catch((error) => {
      console.error('Error loading instruction data:', error)
    })

  queryNewsPromise
    .then((queryNewsRes) => {
      // 處理響應結果
      news.value = queryNewsRes.data
    })
    .catch((error) => {
      console.error('Error loading news data:', error)
    })
  /** await Promise then  */

  const resetTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId.value)
    }
    timeoutId.value = setTimeout(
      () => {
        navigateTo('/user')
      },
      siteStore.siteData?.gameCenterOutInterval
        ? siteStore.siteData?.gameCenterOutInterval * 60 * 1000
        : 5 * 60 * 1000
    ) // 5 分钟
  }
  window.onload = resetTimer
  window.onmousemove = resetTimer
  window.onmousedown = resetTimer
  window.ontouchstart = resetTimer
  window.onclick = resetTimer
  window.onscroll = resetTimer
  window.onkeypress = resetTimer
})

onBeforeUnmount(() => {
  if (randomTimer.value) {
    clearInterval(randomTimer.value)
  }
  reconnected.value = false
  console.log('closeWebSocket', reconnected.value)
  closeWebSocket()
})
</script>

<template>
  <div id="Base_Member">
    <div class="game-header">
      <div class="game-header-main">
        <div class="game-header-logo">
          <img :src="siteStore?.siteData.logo" />
        </div>
        <div class="game-header-info">
          <div class="game-header-info-item">
            <span>
              <i class="fa-solid fa-user"></i>
            </span>
            {{ PlayerStore?.playerInfo?.username }}
          </div>
          <div class="game-header-info-item">
            <span>
              <i class="fa-solid fa-dollar-sign"></i>
            </span>
            {{ PlayerStore?.playerInfo?.balance }}
          </div>
          <div class="game-header-info-item">
            <span> {{ $lang('Now Time') }}： </span>
            16:52:00
          </div>
        </div>
      </div>

      <button type="button" class="game-header-ham" @click="isMenuVisible = !isMenuVisible">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
    <div class="game">
      <div class="game-container">
        <div class="game-hero">
          <div class="card">
            <div class="card-header">
              <span>
                {{ $lang('工單') }}
              </span>
              <span>{{ betData.roundId }}</span>
            </div>

            <div class="card-body">
              <div class="card-body-info">
                <img src="@/assets/image/member/pill.jpg" />
                <span>{{
                  PlayerStore.playerInfo.availablePairs[symbol].label
                }}</span>
              </div>
              <div class="card-body-time">
                {{ $lang('剩餘時間') }} <br />
                <span>{{ socketCurrentRoundCountdown }}s</span>
              </div>
            </div>
          </div>
        </div>

        <div class="game-data">
          <div v-for="(item, index) in dataList" :key="`data-${index}`" class="game-data-item">
            <div class="game-data-item-header">
              <div class="game-data-item-header-icon">
                <i class="fa-solid fa-vial"></i>
              </div>
              {{ item.title }}
            </div>
            <div class="game-data-item-body">
              <span>{{ dataNumber[item.index] }}</span> {{ item.unit }}
            </div>
          </div>
        </div>

        <div class="game-tools">
          <div class="game-tools-time">
            <h6>{{ $lang('最後購買時間') }}</h6>
            {{ socketCurrentRoundCountdown }} s
          </div>

          <div class="game-tools-main">
            <div class="game-tools-buysell">
              <button type="button" class="game-tools-buy" :class="{
                active: betData.option.includes(0)
              }" @click="addBetGameType(0)">
                {{ $lang('購置') }}
              </button>
              <button type="button" class="game-tools-sell" :class="{
                active: betData.option.includes(1)
              }" @click="addBetGameType(1)">
                {{ $lang('放置') }}
              </button>
            </div>
            <button type="button" class="game-tools-submit" @click="checkBetData()">
              {{ $lang('確定') }}
            </button>
          </div>
        </div>
      </div>
      <ul class="game-list">
        <li class="game-list-item" @click="goPopup('歷史委託')">
          <span><i class="fa-solid fa-clock-rotate-left"></i></span>
          {{ $lang('歷史委託') }}
        </li>
      </ul>
    </div>

    <div class="menu" :class="{
      active: isMenuVisible
    }">
      <div class="menu-container">
        <div class="menu-header">
          <button type="button" class="menu-header-close" @click="isMenuVisible = false">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div class="menu-header-time">
            <span> {{ $lang('Now Time') }}： </span>
            {{ PlayerStore?.playerInfo?.balance }}
          </div>
          <div class="menu-header-info">
            <div class="menu-header-info-item">
              <span>
                <i class="fa-solid fa-user"></i>
              </span>
              {{ PlayerStore?.playerInfo?.account }}
            </div>
            <div class="menu-header-info-item">
              <span>
                <i class="fa-solid fa-dollar-sign"></i>
              </span>
              {{ PlayerStore?.playerInfo?.balance }}
            </div>
          </div>
        </div>
        <ul class="menu-list">
          <li class="menu-list-item" @click="goPopup('歷史委託')">
            <span><i class="fa-solid fa-clock-rotate-left"></i></span>
            {{ $lang('歷史委託') }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="showToolPopup" class="popup">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ record.title }}</h2>
          <button type="button" data-dismiss="modal" @click="closePopup">
            {{ $lang('關閉') }}
          </button>
        </div>
        <div class="modal-body modal-body-sp">
          <div data-type="1" class="log">
            <div v-if="record.type !== 'announcement' && record.type !== 'rule'" class="searchRow">
              <div class="coinSelect">
                <select v-model="search.pair" name="coin" @change="searchOrder">
                  <option v-for="item in availableCurrency" :key="item.symbol" :value="item.symbol">
                    {{
                      item.symbolData.label ||
                      item.symbolData.name ||
                      item.symbolData.symbol
                    }}
                  </option>
                </select>
              </div>
              <label for="inputSearch" class="inputDate"><i class="fas fa-search"></i>
                <input id="inputSearch" v-model="search.roundId" type="text" name="number"
                  :placeholder="`${$lang('請輸入期號')}`" /></label>
              <label for="dateStart" class="inputDate"><i class="fas fa-calendar-alt"></i>
                <el-date-picker v-model="search.dateRangeStart" type="datetime" :placeholder="`${$lang('起始時間')}`"
                  :default-time="defaultTime" :disabled-date="disabledDate">
                </el-date-picker>
              </label>
              <label for="dateEnd" class="inputDate"><i class="fas fa-calendar-alt"></i>
                <el-date-picker v-model="search.dateRangeEnd" type="datetime" :placeholder="`${$lang('結束時間')}`"
                  :default-time="defaultTime" :disabled-date="disabledDate">
                </el-date-picker>
              </label>
              <button type="button" class="searchBtn" @click="searchOrder">
                {{ $lang('搜尋') }}
              </button>
            </div>
            <div class="dataBlock">
              <!-- currentOrder -->
              <div v-if="record.type === 'currentOrder'" class="modal-1">
                <table>
                  <thead>
                    <tr>
                      <th>{{ $lang('交易時間/交易類別') }}</th>
                      <th>{{ $lang('交易明細') }}</th>
                      <th>{{ $lang('交易金額') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in connectRecordList('currentOrder')" :key="index">
                      <td>
                        <div>{{ formatDate(item.openAt) }}</div>
                        <div>{{ symbolChange(item.symbol) }}</div>
                      </td>
                      <td>
                        <div>
                          {{ $lang('期號') }}: <span>{{ item.roundId }}</span>
                        </div>
                        <div>
                          {{ $lang('賠率') }}:
                          <span>{{ item.odds }}</span>
                        </div>
                        <div v-if="item.option.length > 0">
                          {{ $lang('內容') }}:
                          <span v-for="optionItem in item.option" :key="optionItem" class="gameOptionSpan">{{
                            gameOptionName(optionItem) }}</span>
                        </div>
                        <div v-else>
                          {{ $lang('內容') }}:
                          <span class="gameOptionSpan">
                            {{ gameOptionName(item.option) }}</span>
                        </div>
                        <div>
                          {{ $lang('匯率') }}:
                          <span>{{
                            new Intl.NumberFormat('zh-TW', {
                              minimumFractionDigits: 4,
                              maximumFractionDigits: 6
                            }).format(item.openPrice)
                          }}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          {{ $lang('金額') }}:
                          <span>
                            {{
                              new Intl.NumberFormat('zh-TW').format(item.amount)
                            }}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- historyOrder -->
              <div v-if="record.type === 'historyOrder'" class="modal-1">
                <table>
                  <thead>
                    <tr>
                      <th>{{ $lang('訂單類別/時間') }}</th>
                      <th>{{ $lang('訂單內容') }}</th>
                      <!-- <th>{{ $lang('交易金額') }}</th>
                      <th style="text-align: center">{{ $lang('盈虧額') }}</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in connectRecordList('historyOrder')" :key="index">
                      <td>
                        <div>{{ formatDate(item.openAt) }}</div>
                        <div>{{ item.symbol }}</div>
                      </td>
                      <td>
                        <div>
                          {{ $lang('工單') }}: <span>{{ item.roundId }}</span>
                        </div>
                        <!-- <div>
                          {{ $lang('賠率') }}:
                          <span>{{ item.odds }}</span>
                        </div> -->
                        <div v-if="item.option.length > 0">
                          {{ $lang('內容') }}:
                          <span v-for="optionItem in item.option" :key="optionItem" class="gameOptionSpan">{{
                            gameOptionName(optionItem) }}</span>
                        </div>
                        <div v-else>
                          {{ $lang('內容') }}:
                          <span class="gameOptionSpan">
                            {{ gameOptionName(item.option) }}</span>
                        </div>
                        <!-- <div>
                          {{ $lang('匯率') }}:
                          <span>{{
                            new Intl.NumberFormat('zh-TW', {
                              minimumFractionDigits: 4,
                              maximumFractionDigits: 6
                            }).format(item.openPrice)
                          }}</span>
                        </div> -->
                        <!-- <div>
                          {{ $lang('結束') }}:
                          <span>{{
                            new Intl.NumberFormat('zh-TW', {
                              minimumFractionDigits: 4,
                              maximumFractionDigits: 6
                            }).format(item.closePrice)
                          }}</span>
                        </div> -->
                      </td>
                      <!-- <td>
                        <div>
                          <span>
                            {{
                              new Intl.NumberFormat('zh-TW').format(item.amount)
                            }}</span
                          >
                        </div>
                      </td>
                      <td>
                        <div style="text-align: center">
                          <span>{{ item.profit }}</span>
                        </div>
                      </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="record.type === 'historyRecord'" class="modal-1">
                <table>
                  <thead>
                    <tr>
                      <th>{{ $lang('交易期號/交易類別') }}</th>
                      <th>{{ $lang('點位') }}</th>
                      <th>{{ $lang('結果') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in historyRecordList" :key="index">
                      <td>
                        <div>{{ item.roundId }}</div>
                        <div>{{ symbolChange(item.pair) }}</div>
                      </td>
                      <td>
                        <div>
                          {{
                            new Intl.NumberFormat('zh-TW', {
                              minimumFractionDigits: 4,
                              maximumFractionDigits: 6
                            }).format(item.closePirce)
                          }}
                        </div>
                      </td>
                      <td class="gameResultName">
                        <div v-for="resultItem in item.result" :key="resultItem" class="gameResultNameItem">
                          {{ gameResultName(resultItem) }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="record.type === 'announcement'" class="modal-3">
                <label v-for="(item, index) in news.result" :key="index" class="bulItem">
                  <input :id="item.title" type="checkbox" />
                  <div class="title">
                    <span class="titleBox">{{ item.title }}</span>
                  </div>
                  <div class="content" v-html="item.content"></div>
                </label>
              </div>
              <div v-if="record.type === 'rule'" class="modal-4">
                <div v-for="(item, index) in rule.result" :key="index">
                  <div v-html="item.content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.game
  background: #efefef
  width: 100dvw
  @media screen and (min-width: 768px)
    display: flex

  &-container
    display: flex
    flex-direction: column
    height: calc(100dvh - 50px)
    overflow-y: auto
    overflow-x: hidden
    @media screen and (min-width: 768px)
      flex: 1
      height: calc(100dvh - 64px)

  &-list
    display: none
    @media screen and (min-width: 768px)
      display: block
      width: 85px
      background: #fff
      li
        background-image: linear-gradient(to bottom, #ffffff 50%, #E9E9E9 100%)
        font-size: 14px
        font-weight: bold
        color: #2e3076
        padding: 1.2rem 0
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        width: 100%
        border-top: 1px solid #d8ddd8
        border-bottom: 1px solid #d8ddd8
        cursor: pointer
        transition: all ease .2s
        span
          font-size: 26px
        &:hover
          opacity: .8
          filter: brightness(0.8)

  &-header
    position: sticky
    top: 0
    left: 0
    width: 100%
    padding-left: 10px
    padding-right: 10px
    height: 50px
    background-image: linear-gradient(to left, #3d53c9 0%, #3d5bc9 100%)
    display: flex
    justify-content: space-between
    align-items: center
    color: #fff

    &-info,
    &-main
      display: flex
      align-items: center
      font-size: 15px

    &-info
      &-item
        margin-right: 15px
        display: flex
        align-items: center
        span
          display: block
          margin-right: 5px
        @media screen and (min-width: 768px)
          margin: 0
          &:not(:last-child)
            position: relative
            &::before
              content: ""
              display: block
              position: absolute
              top: 50%
              right: 0
              width: 2px
              height: 90%
              background: #d7d7d7
              transform: translateY(-50%)
      &-item:last-child
        display: none
        @media screen and (min-width: 768px)
          display: flex

    &-ham
      font-size: 26px
      @media screen and (min-width: 768px)
        display: none

    &-logo
      width: 50px
      margin-right: 15px
      img
        width: 100%

    @media screen and (min-width: 768px)
      height: 64px
      &-logo
        width: 87px
      &-info
        &-item
          padding: 0 32px
</style>

<style lang="sass" scoped>
.game
  &-hero
    display: flex
    justify-content: center
    align-items: center
    flex: 1
    background-image: linear-gradient(to right,rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.2)),url('@/assets/image/game/fy_game_background.jpg')
    background-size: cover
    background-position: center
    padding: 15px

    .card
      max-width: 400px
      width: 100%
      border-radius: 5px
      box-shadow: 0 2px 5px rgba(0, 0, 0, .5)
      background-color: #fff

      &-header
        display: flex
        align-items: center
        justify-content: space-between
        padding: 10px
        border-bottom: 1px solid #eee
        font-size: 15px
        span:last-child
          font-weight: bold

      &-body
        padding: 10px
        display: flex
        justify-content: space-between
        align-items: center

        &-info
          display: flex
          align-items: center
          img
            width: 60px
            height: 60px
            border-radius: 50%
            margin-right: 10px
          span
            font-size: 14px

        &-time
          padding: 10px
</style>

<style lang="sass" scoped>
.game-data
  display: flex
  flex-wrap: wrap
  @media screen and (min-width: 768px)
    flex-wrap: nowrap
  &-item
    padding: .25rem
    width: calc(50% - 1rem)
    margin: .5rem
    &:nth-child(1),
    &:nth-child(2)
      &::before
        top: 100%
        right: 5%
        width: 90%
        height: 2px
        transform: none
        content: ""
        display: block
        position: absolute
        background: #d7d7d7
        @media screen and (min-width: 768px)
          display: none

    @media screen and (min-width: 768px)
      padding: 4px
      margin: 8px

      &:not(:last-child)
        &::before
          content: ""
          display: block
          position: absolute
          top: 50%
          right: 0
          width: 2px
          height: 90%
          background: #d7d7d7
          transform: translateY(-50%)
    &-header
      display: flex
      align-items: center
      font-weight: bold
      margin-bottom: 8px
      font-size: 14px
      &-icon
        width: 42px
        height: 42px
        display: flex
        justify-content: center
        align-items: center
        font-size: 20px
        border-radius: 5px
        margin-right: .5rem
        background: #d7d7d7
      @media screen and (min-width: 768px)
        font-size: 18px
    &-body
      font-weight: bold
      font-size: 14px
      text-align: center
      span
        font-size: 32px
      @media screen and (min-width: 768px)
        font-size: 20px
        span
          font-size: 42px
</style>

<style lang="sass" scoped>
.game-tools
  height: 90px
  box-shadow: 0 -1px 3px 0px #ddd
  width: 100%
  background-color: #fff
  padding: 5px
  @media screen and (min-width: 768px)
    height: 120px
    background: #efefef
    box-shadow: none
  &-time
    width: 100%
    display: flex
    justify-content: flex-end
    align-items: center
    border-radius: 6px
    padding: 5px
    color: #f77
    font-weight: bold
    font-size: 12px
    width: 100%
    text-align: right
    @media screen and (min-width: 768px)
      font-size: 14px
    h6
      font-weight: normal
      margin-right: 5px
      color: #333
      @media screen and (min-width: 768px)
        font-size: 16px

  &-main
    display: flex
    justify-content: center
    align-items: center
    @media screen and (min-width: 768px)
      height: 68px

  &-buysell
    width: 80%
    display: flex
    margin-right: 5px
    gap: 5px
    @media screen and (min-width: 768px)
      height: 100%
      width: 90%
      padding-top: 5px
      margin-right: 10px

    button
      flex: 1
      height: 45px
      display: flex
      justify-content: center
      align-items: center
      color: #fff
      font-size: 15px
      border-radius: 6px
      position: relative
      transition: all ease .2s
      @media screen and (min-width: 768px)
        height: 100%

      &::before
        content: ""
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 50%
        border-radius: 6px
        background-image: linear-gradient(to top, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 80%)

      &.game-tools-buy
        filter: brightness(1)
        background-image: linear-gradient(to bottom, #39D627 0%, #11A100 100%)
        &.active
          filter: brightness(0.6)

      &.game-tools-sell
        background-image: linear-gradient(to bottom, #FF5858 0%, #D10000 100%)
        filter: brightness(1)
        &.active
          filter: brightness(0.6)

  &-submit
    width: calc(20% - 5px)
    font-size: 18px
    display: flex
    align-items: center
    justify-content: center
    border-radius: 6px
    height: 45px
    background-image: linear-gradient(to bottom, #FFD433 0%, #F68C00 100%)
    border: 1px solid #e57b01
    font-size: 20px
    color: #0c0c0c
    @media screen and (min-width: 768px)
      width: calc(10% - 10px)
      height: 100%
</style>

<style lang="sass" scoped>
.menu
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  z-index: 99
  background-color: rgba(0, 0, 0, 0.5)
  transform: translateX(-100%)
  transition: transform 0.3s

  @media screen and (min-width: 768px)
    display: none

  &.active
    transform: translateX(0)

  &-container
    background-color: #fff
    width: 270px
    height: 100%

  &-header
    position: relative
    display: flex
    flex-flow: row wrap
    align-items: center
    justify-content: flex-start
    width: 100%
    padding: 20px 15px 15px
    position: relative
    z-index: 0
    color: #fff
    background-image: linear-gradient(to left, #95c93d 0%, #95c93d 100%)

    &::before
      content: ""
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      background-image: url('@/assets/image/member/mobile-bg.png')
      background-size: cover
      background-position: center
      opacity: .43
      z-index: 1
      pointer-events: none

    &-time
      border-bottom: 1px solid #fff
      padding-bottom: 15px
      color: #fff
      width: 100%
      font-size: 15px
      font-weight: bold

    &-info
      padding: 15px 0
      color: #fff
      width: 100%
      font-size: 15px
      font-weight: bold
      display: flex
      justify-content: space-between

    &-close
      position: absolute
      top: 8px
      right: 15px
      font-size: 28px
      z-index: 99

  &-list
    &-item
      font-size: 16px
      justify-content: flex-start
      align-items: center
      padding: 1rem 0
      padding-left: 15px
      font-weight: bold
      color: #2e3076
      display: flex
      border-top: 1px solid #d8ddd8
      border-bottom: 1px solid #d8ddd8
      cursor: pointer
      background-image: linear-gradient(to bottom, #ffffff 50%, #E9E9E9 100%)

      span
        display: block
        margin-right: 12px
        font-size: 24px
</style>

<style scoped>
.popup {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.15s linear;
  padding: 0 40px;
}

.dataBody {
  padding: 10px 0;
}

.gameOptionSpan {
  padding: 0 5px;
}

.inputDate>>>.el-input__prefix {
  display: none;
}

.inputDate input {
  padding: 5px;
  margin: 0 1px;
}

.inputDate svg {
  margin: 0 5px 0 0;
  color: #fff;
}

.bulItem input[type='checkbox'] {
  display: none;
}

.bulItem .content {
  display: none;
}

.bulItem input[type='checkbox']:checked~.content {
  display: block;
}

.gameResultName {
  display: flex;
}

.gameResultNameItem {
  padding: 0 5px;
  font-size: 16px;
}

@media screen and (max-width: 768px) {
  .popup {
    padding: 0 10px;
    height: 100%;
  }
}

input {
  margin: 0;
}

.searchRow svg {
  color: #363c4e;
}
</style>

<style>
.el-input__wrapper {
  background-color: #00000000;
  border: 1px solid #00000000;
  box-shadow: none;
}
</style>
