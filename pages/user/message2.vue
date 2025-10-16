<script lang="ts" setup>
const { t } = useI18n()
const store = useTicketStore()
const router = useRouter()
const route = useRoute()
const PlayerStore = usePlayerStore()
const { queryTicket, createTicket, read, reply } = store
// methods
const sendMessage = ref({
  title: '',
  content: ''
})
const sendReply = ref('')
const pageType = ref('message')
const isMessageContentFolded = ref(true)

await useAsyncData(async () => {

})
const sendTicket = async () => {
  sendMessage.value.title = '線上客服系統'
  if (!sendMessage.value.content) {
    ElNotification({
      title: `${t('請輸入内容后送出')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  const res = await createTicket({
    title: sendMessage.value.title,
    content: sendMessage.value.content
  })
  if (res) {
    ElNotification({
      title: `${t('訊息已送出')}`,
      type: 'success',
      duration: 1000
    })
    sendMessage.value.title = ''
    sendMessage.value.content = ''
    await queryTicket()
    pageType.value = 'message'
  }
}

const sendReplyTicket = async (id: number) => {

  console.log(sendReply.value)
  if (!sendReply.value) {
    ElNotification({
      title: `${t('請填寫回覆內容')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  const res = await reply({
    id: store.tickets.filter((item) => { return item.title == '線上客服系統' })[0].id,
    content: sendReply.value
  })
  if (res) {
    ElNotification({
      title: `${t('回覆已送出')}`,
      type: 'success',
      duration: 1000
    })
    await queryTicket()
    sendReply.value = ''
  }
}

const sandRead = async (item: any) => {
  if (
    item.thread.find((message) => message.role !== 0 && message.read === null)
  ) {
    await read({ id: item.id })
    await queryTicket()
  }
}
const checkNewMessage = (item: any) => {
  return item.thread.find(
    (message) => message.role !== 0 && message.read === null
  )
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

onMounted(async () => {
  await queryTicket()
  console.log('queryTicket', store.tickets)
  console.log(store.tickets.filter((item) => { return item.title == '線上客服系統' })[0]);

})
</script>

<template>
  <div class="page">
    <div class="tag">
      {{ $lang('線上客服') }}
    </div>
    <div class="pages-user-message">
      <div class="message">
        <div class="msg-tit">
          <p>線上客服系統: {{ PlayerStore?.playerInfo?.username }}您好</p>

        </div>
        <div class="msg-box">
          <div class="box-item bot">
            <div class="msg">
              <h5>
                {{
                  '系統'
                }}
                /-
              </h5>
              <p>{{ '您好,請問有什麼需要協助?' }}</p>
            </div>
          </div>
          <div class="box-item" v-if="store.tickets.length > 0" :class="item.role === 0 ? 'user' : 'bot'"
            v-for="(item, indexOfItem) in store.tickets.filter((item) => { return item.title == '線上客服系統' })[0]?.thread"
            :key="indexOfItem">
            <div class="msg">
              <h5>
                {{
                  item.role === 0 ? PlayerStore?.playerInfo?.username : $lang('系統')
                }}
                {{ formatDate(item.createdAt) }}
              </h5>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>

      </div>
      <div class="msg-btn" v-if="store.tickets.filter((item) => { return item.title == '線上客服系統' }) == 0">
        <input type="text" v-model="sendMessage.content">
        <button class="btn" @click="sendTicket">
          {{ $lang('送出') }}
        </button>
      </div>
      <div class="msg-btn" v-else>
        <input type="text" v-model="sendReply">
        <button class="btn" @click="sendReplyTicket">
          {{ $lang('送出') }}
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped lang="sass">
.page
  background-color: #edeff4
.tag
  padding: 100px 0
  background-image: url('@/assets/image/wruser/bg09.jpg')
  background-size: cover
  background-position: center
  text-align: center
  text-shadow: 2px 2px 2px #000
  color: #f8f8c0
  font-size: 33px
.pages-user-message
  padding: 70px 0  0
  @media (max-width: 768px)
    padding: 50px 0 0
  .message
    margin: 0 auto
    width: 1000px
    max-width: 100%
    padding: 0 20px
    .msg-tit
      padding-block-end: 10px
      border-block-end: 1px solid #ccc
      p
        padding-left: 10px
        font-size: 18px
        font-weight: 600
        border-inline-start: 5px solid #3f90dc
    .msg-box
      min-height: 300px
      // max-height: 500px
      overflow-y: auto
      padding: 20px
      .box-item
        padding: 10px 0
        display: flex
        .msg
          font-size: 18px
          padding: 10px 15px
          font-size: 16px
          background-color: #fff
          border-radius: 15px
          h5
            color: #707070
            font-size: 15px
      .bot
        .msg
          background-color: #e0e0e0
      .user
        justify-content: flex-end
        .msg
          background-color: #dcf8c6
  .msg-btn
    padding: 15px
    background-color: #fff
    display: flex
    align-items: center
    input
      width: 100%
      height: 50px
      border: 1px solid #e0e0e0
      border-radius: 5px
      padding: 0 15px
    .btn
      margin-left: 10px
      padding: 10px 16px
      font-size: 16px
      white-space: nowrap
      background-color: #4caf50
      color: white
      border: none
      border-radius: 5px
      cursor: pointer
      &:hover
        background-color: #45a049
</style>
