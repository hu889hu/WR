<script lang="ts" setup>
const { transfer, queryTransferRecord } = useWalletStore()
const siteStore = useSiteStore()
const PlayerStore = usePlayerStore()
const { isLogin } = useAuthStore()
const playerWalletBalance = computed(() => {
  if (!isLogin()) {
    return 0
  }
  const findWallet = PlayerStore.playerInfo?.wallet.find(
    (wallet: any) => wallet.type === 13
  )
  if (findWallet) {
    return Number(findWallet.balance)
  } else {
    return 0
  }
})

const transferList = ref([])
const uRate = ref()
onMounted(async () => {
  getTransferList()
  rate.value = siteStore.siteData.walletConfig?.exchangeRates.find((item) =>
    item.toWalletType == '2'
  ).rate
  uRate.value = siteStore.siteData.walletConfig?.exchangeRates.find((item) =>
    item.toWalletType == '13'
  ).rate
})
const getTransferList = async () => {
  const queryTransferRecordRes = await queryTransferRecord({})
  transferList.value = queryTransferRecordRes.data.result.filter((item) => {
    return item.fromWallet.walletType === 13
  })
}
const amount = ref()
const toAmount = ref()
const goTransfer = async () => {
  if (amount.value > playerWalletBalance.value) {
    ElNotification({
      title: '轉出錢包餘額不足',
      type: 'warning',
      duration: 1000
    })
    return
  }
  if (amount.value < 100) {
    ElNotification({
      title: '未達交易數量（最低 100 USD）',
      type: 'warning',
      duration: 1000
    })
    return
  }
  const transferRes = await transfer({
    fromWalletId: PlayerStore.playerInfo.wallet[1].id,
    toWalletId: PlayerStore.playerInfo.wallet[0].id,
    amount: JSON.stringify(amount.value),
    memo: `用戶操作 TWD 劃轉至 USD ,數量: ${amount.value}`
  })
  if (transferRes.success) {
    ElNotification({
      title: transferRes.message,
      type: 'success',
      duration: 1000
    })
    getTransferList()
    await PlayerStore.fetchInfo()
    amount.value = ''
    toAmount.value = ''
  }
}
const rate = ref(1)
const conversionCalculation = () => {
  toAmount.value = Math.ceil(rate.value * amount.value)
}
const statusList = [
  {
    label: '申請中',
    value: 0,
  },
  {
    label: '通過',
    value: 1,
  },
  {
    label: '駁回',
    value: 2,
  }
]
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
</script>

<template>
  <div class="pages">
    <div class="tag">
      貨幣轉換-TWD轉USD
    </div>
    <div class="inf-bg">
      <div class="ul-contact-form-container__title">
        <div>您當前可換購數量為 <span style="color: #a34405;"> {{ new Intl.NumberFormat('zh-TW').format(playerWalletBalance)
            }}</span></div>
        <div>可將您持有的TWD轉換為USD</div>
        <div>（系統匯率：{{ uRate }} TWD / 1 USD）</div>
        <div>最低USD數量為100</div>
      </div>

      <hr style="border-top: 1px solid #d7d7d7;margin-bottom: 50px;">

      <div class="ul-contact-form">
        <div class="form-group">
          <div class="position-relative">
            <label>{{ $lang('請輸入台幣（TWD）金額') }}</label>
            <input type="number" name="USD" v-model="amount" class="form-control">
          </div>
        </div>
        <div @click="conversionCalculation" class="update_password update_password2">
          轉換貨幣
        </div>
        <div class="form-group">
          <div class="position-relative">
            <label>{{ $lang('USD') }}</label>
            <input type="number" name="TWD" v-model="toAmount" class="form-control" readonly>
          </div>
        </div>
        <hr class="fancy-hr mt-20">
        <div @click="goTransfer" class="update_password">
          確認轉換
        </div>
      </div>

    </div>
    <div class="cart-top">
      <h3 class="ul-contact-form-container__title" style="line-height: 20px">
        您的貨幣轉換紀錄
      </h3>
      <hr style="border-top: 1px solid #d7d7d7;opacity: 1;margin-bottom: 30px;">
      <div class="table-responsive">
        <table class="ul-cart-table">
          <thead>
            <tr>
              <td>{{ $lang('申請時間') }}</td>
              <td>{{ $lang('申請內容') }}</td>
              <td>{{ $lang('申請金額') }}</td>
              <td>{{ $lang('申請總結') }}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in transferList">
              <!-- 時間 -->
              <td>
                <p>
                  {{ formatDate(item.createdAt) }}
                </p>
              </td>

              <!-- 內容 -->
              <td>
                <div>
                  <span v-if="item.fromWallet.walletType === 2">{{ $lang('交易前 U') }}:{{ new
                    Intl.NumberFormat('zh-TW').format(item.balanceChange.fromBefore) }}</span>
                  <span v-else>{{ $lang('交易前 U') }}:{{ new
                    Intl.NumberFormat('zh-TW').format(item.balanceChange.toBefore) }}</span>
                  / <span v-if="item.fromWallet.walletType === 2">{{ $lang('交易後 U') }}:{{ new
                    Intl.NumberFormat('zh-TW').format(item.balanceChange.fromAfter) }}</span>
                  <span v-else>{{ $lang('交易後 U') }}:{{ new
                    Intl.NumberFormat('zh-TW').format(item.balanceChange.toAfter) }}</span>
                </div>
                <div>
                  <span v-if="item.fromWallet.walletType === 2">{{ $lang('交易前 TWD') }}:{{ new
                    Intl.NumberFormat('zh-TW').format(item.balanceChange.toBefore) }}</span>
                  <span v-else>{{ $lang('交易後 TWD') }}:{{ new
                    Intl.NumberFormat('zh-TW').format(item.balanceChange.fromBefore) }}</span>
                  / <span v-if="item.fromWallet.walletType === 2">{{ $lang('交易後 TWD') }}:{{ new
                    Intl.NumberFormat('zh-TW').format(item.balanceChange.toAfter) }}</span>
                  <span v-else>{{ $lang('交易後 TWD') }}:{{ new
                    Intl.NumberFormat('zh-TW').format(item.balanceChange.fromAfter) }}</span>
                </div>
              </td>
              <!-- 金額 -->
              <td>
                <p class="sqamount">
                  TWD:{{ new Intl.NumberFormat('zh-TW').format(item.fromAmount) }}
                  <svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_89_590)">
                      <path
                        d="M12.3375 3.8374L11.5803 4.59467L14.95 7.96438H0V9.03533H14.95L11.5803 12.405L12.3375 13.1623L17 8.49982L12.3375 3.8374Z"
                        fill="black" />
                    </g>
                    <defs>
                      <clipPath id="clip0_89_590">
                        <rect width="17" height="17" fill="black" />
                      </clipPath>
                    </defs>
                  </svg>
                  USD:{{ new Intl.NumberFormat('zh-TW').format(item.toAmount) }}
                </p>
              </td>
              <td>
                <p>
                  {{ statusList[item.status].label }}/{{ new Intl.NumberFormat('zh-TW').format(item.toAmount) }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
.pages
  box-sizing: border-box
  background-color: #edeff4
  padding-bottom: 10px
  @media screen and (max-width: 768px)
    padding: 0 5px 5px
</style>
<style scoped lang="sass">
.tag
  padding: 100px 0
  background-image: url('@/assets/image/wruser/bg05.jpg')
  background-size: cover
  background-position: center
  text-align: center
  text-shadow: 2px 2px 2px #000
  color: #f8f8c0
  font-size: 33px
.sqamount
  display: flex
  gap: 10px
  justify-content: center
.inf-bg
  max-width: 1200px
  margin: 30px auto
  padding: 40px 32px
  border-radius: 14px
  img
    width: 100%
  .ul-contact-form-container__title
    font-size: 18px
    font-weight: 700
    margin-bottom: 18px
    border-left: 4px solid #007BFF
    padding-left: 14px
    color: #222
  .update_password
    display: block
    margin: 20px 0
    width: 100%
    padding: 10px
    font-size: 18px
    font-weight: 500
    color: #fff
    background-color: #ee700a
    border: none
    border-radius: 4px
    cursor: pointer
    text-align: center
    box-shadow: none
    transition: background-color 0.3s ease, transform 0.15s ease
    text-shadow: 2px 2px 4px rgba(0,0,0,.4)
  .update_password2
    background-color: #0240b4
.ul-contact-form-container__title
    font-size: 18px
    font-weight: 700
    margin-bottom: 18px
    border-left: 4px solid #007BFF
    padding-left: 14px
    color: #222
.ul-contact-form input, .ul-contact-form textarea 
  width: 100%
  padding: 10px
  font-size: 1rem
  font-weight: 600
  border: 1px solid #ccc
  border-radius: 4px
  background-color: #fff
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease
// .form-control:focus 
//   color: #212529
//   background-color: #fff
//   border-color: #86b7fe
//   transform: scale(1.02)
//   outline: 0
//   transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
//   box-shadow: 0 0  .25rem 2px rgba(13, 110, 253, .25)
.form-group
  margin-bottom: clamp(15px, 1.58vw, 30px)
  .position-relative
    position: relative
    label
      font-size: 16px
      font-weight: 600
      color: #4a5568
      display: block
      letter-spacing: 0.5px
      margin-bottom: 8px
    .eyes
      position: absolute
      right: 10px
      bottom: 15px
      cursor: pointer

.cart-top
  max-width: 100%
  width: 1200px
  margin: 80px auto 50px
  .cart-top-title
    text-align: center
    margin-bottom: 40px
    h2
      font-size: 40px
    p
      margin-top: 30px
      font-size: 16px
  .ul-cart-table
    width: 100%
    // text-align: -webkit-match-parent
    tbody
      background-color: #fff
    thead
      font-weight: 700
      font-size: clamp(17px, 1.05vw, 20px)
      // padding-bottom: 17px
      border-bottom: 1px solid #aeb1be
      background-color: #ffffe4
      tr
        &:last-child
          border: none
    tr
      padding-top: 30px
      border-bottom: 1px solid #e8e9ee
      
    th
      padding-bottom: 20px
      padding-right: clamp(30px, 4.73vw, 90px)
      word-spacing: normal
      min-width: 150px
      text-align: center
    td
      padding-top: clamp(18px, 1.47vw, 20px)
      padding-bottom: clamp(18px, 1.47vw, 20px)
      padding-right: clamp(30px, 1.47vw, 28px)
      text-align: center
      color: #29293a
      p
        margin-top: 0
        // margin-bottom: 1rem

@media screen and (max-width: 1140px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 30px !important
@media screen and (max-width: 992px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 15px !important
@media screen and (max-width: 768px)
  .cart-top
    margin: clamp(40px, 4.2vw, 80px) 0px !important
</style>
