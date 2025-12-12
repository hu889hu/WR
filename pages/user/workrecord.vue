<script lang="ts" setup>
const playerStore = usePlayerStore()
const { t } = useI18n()
const { getListenkey } = playerStore
const { queryWorkOrder } = useOrderStore()
const socket: any = ref(null)
const socketConnected = ref(false)
const isFirstGet = ref(false)
const ordertList = ref([])
const isloading = ref(false)
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
                case 'ORDER_UPDATE': {
                    isloading.value = true
                    ordertList.value = data.result.sort((a, b) => {
                        return (
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                        )
                    })
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


onMounted(async () => {
    // await startConnectWebSocket()
    getWorkList()
})
const getWorkList = async () => {
    let res = await queryWorkOrder({ limit: 30 })
    isloading.value = true
    if (res.data.total > 30) {
        res = await queryWorkOrder({ limit: 150 })
    }
    ordertList.value = res.data.result
    console.log(res.data.result, 'res.data.result');

}
onBeforeUnmount(() => {
    reconnected.value = false
    closeWebSocket()
})
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
const mainBalance = computed(() => {
    const mainWallet = playerStore.playerInfo.wallet.find(
        (item: any) => item.type === 13
    )
    return mainWallet ? mainWallet.balance : 0
})
</script>

<template>
    <div class="pages">
        <div class="ul-cart-container">
            <div class="tag">
                工作紀錄
            </div>
            <div class="cart-top">
                <div class="table-responsive">
                    <h3 class="ul-contact-form-container__title">
                        HELLO:{{ playerStore.playerInfo.username }} $ {{ new
                            Intl.NumberFormat('zh-TW').format(mainBalance) }}
                    </h3>
                    <hr style="border-top: 1px solid #d7d7d7;opacity: 1;margin-bottom: 0px;">
                    <div v-if="isloading">
                        <table class="ul-cart-table">
                            <thead>
                                <tr>
                                    <td>{{ $lang('時間') }}</td>
                                    <td>{{ $lang('單號') }}</td>
                                    <td>{{ $lang('内容') }}</td>
                                    <td>{{ $lang('數量') }}</td>
                                    <td>{{ $lang('結果') }}</td>
                                    <td>{{ $lang('種類') }}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in ordertList" :key="index">
                                    <td>{{ formatDate(item.createdAt) }}</td>
                                    <td class="content">{{ item.orderId }}</td>
                                    <td>{{ item.productName }}</td>
                                    <td>{{ item.piece }}</td>
                                    <td>
                                        <div v-if="item.status === 0">{{ $lang('調整中') }}</div>
                                        <div v-if="item.status === 1">{{ $lang('調整完成') }}</div>
                                        <div v-if="item.status === 2">{{ $lang('調整失敗') }}</div>
                                    </td>
                                    <td>
                                        {{ item.action == "buy" ? '採購' : '租售' }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="text">
                        數據加載中...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
.pages
  box-sizing: border-box
  background-color: #edeff4
  @media screen and (max-width: 768px)
    padding: 0 5px 5px
</style>

<style scoped lang="sass">
.text
  text-align: center
  font-size: 20px
  color: #000
  margin-top: 50px
.tag
  padding: 100px 0
  background-image: url('@/assets/image/wruser/bg09.jpg')
  background-size: cover
  background-position: center
  text-align: center
  text-shadow: 2px 2px 2px #000
  color: #f8f8c0
  font-size: 33px

.ul-cart-container
  min-height: 100vh
  .cart-top
    max-width: 100%
    .table-responsive
      width: 1140px
      margin: 20px auto
      .ul-contact-form-container__title
        font-size: 18px
        margin-bottom: 15px
        border-left: 4px solid #007BFF
        padding-left: 14px
        color: #151515
        line-height: 20px
        font-weight: 600  
        margin-top: 80px
    .ul-cart-table
      width: 1140px
      margin: 20px auto
      text-align: -webkit-match-parent
      thead
        font-size: clamp(17px, 1.05vw, 20px)
        padding-bottom: 17px
        // border-bottom: 1px solid #aeb1be
        background-color: #dbf7ff
        // tr
        //   &:last-child
        //     border: none
      tbody
        background-color: #fff
      tr
        border-bottom: 1px solid #e8e9ee
      th
        padding-bottom: 20px
        padding-right: clamp(30px, 4.73vw, 90px)
        word-spacing: normal
        min-width: 150px
        text-align: center
      td
        padding-top: clamp(18px, 1.47vw, 28px)
        padding-bottom: clamp(18px, 1.47vw, 28px)
        padding-right: clamp(30px, 1.47vw, 28px)
        text-align: center
        p
          margin-top: 0
          margin-bottom: 1rem

@media screen and (max-width: 1140px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 30px !important
@media screen and (max-width: 992px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 15px !important
@media screen and (max-width: 768px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 0px !important
    overflow: auto
</style>
