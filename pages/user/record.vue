<script lang="ts" setup>

const { queryTransaction } = useTransactionStore()
const { queryWithdrawRecord, queryDepositRecords, queryWalletLog } =
  useWalletStore()
const recordList: any = ref([])
const recordType = ref('withdraw')
const siteStore = useSiteStore()
const playerStore = usePlayerStore()
console.log(playerStore.playerInfo)

const { t } = useI18n()
const selectWallet: any = ref({})

const walletTypeName = (type: any) => {
  switch (type) {
    case 1:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('交易錢包')
    case 2:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('電力錢包')
    case 3:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('商城錢包')
    case 4:
      return siteStore.siteData.mainWalletType === type
        ? t('主錢包')
        : t('質押錢包')
    default:
      return t('其他資產')
  }
}

onMounted(async () => {
  const firstWallet = playerStore.playerInfo.wallet.find(
    (item: any) => item.type === 2
  )
  const queryWalletLogRes = await queryWalletLog({
    walletId: firstWallet.id,
    page: 1,
    limit: 1000,
    size: 1000
  })
  const WalletLog = queryWalletLogRes.data.result.filter((item: any) => {
    return item.type === 0 || item.type === 3 || item.type === 4
  })
  const queryWithdrawRecordRes = await queryWithdrawRecord({})
  const withdraw = queryWithdrawRecordRes.data.result
  recordList.value = WalletLog.concat(withdraw)
  recordList.value = recordList.value.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
})

const showSectionType = (type: string) => {
  const bank = siteStore.siteData.depositOptions.bank.find((item) => {
    return item === type
  })
  if (!bank) {
    return true
  } else {
    return false
  }
}

const transactionRecordType = (type: any) => {
  const transactionTypeList = [
    {
      value: 0,
      label: t('儲值')
    },
    {
      value: 1,
      label: t('提領')
    },
    {
      value: 2,
      label: t('轉帳')
    },
    {
      value: 3,
      label: t('贈送')
    },
    {
      value: 4,
      label: t('活動')
    },
    {
      value: 5,
      label: t('結算')
    },
    {
      value: 6,
      label: t('系統')
    },
    {
      value: 7,
      label: t('下注')
    }
  ]
  const data = siteStore.siteData.walletLogType.find(
    (item) => item.type === type
  )
  if (selectWallet.value.type !== 1 && type === 7) {
    return '質押'
  } else {
    return data ? data.label : t('未知')
  }
}
const applyStatus = (status: any) => {
  const statusList = [
    {
      value: 0,
      label: '審核中'
    },
    {
      value: 1,
      label: '審核通過'
    },
    {
      value: 2,
      label: '審核駁回'
    }
  ]
  const data = statusList.find((item) => item.value === status)
  return data ? data.label : t('未知')
}
const applyStatus2 = (status: any) => {
  const statusList = [
    {
      value: 0,
      label: '提領申請'
    },
    {
      value: 1,
      label: '提領成功'
    },
    {
      value: 2,
      label: '提領失敗'
    }
  ]
  const data = statusList.find((item) => item.value === status)
  return data ? data.label : t('未知')
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
const hiddenAccountNo = (value) => {
  if (value) {
    return value.replace(/^.{4}/, '****')
  } else {
    return ''
  }
}
const formatMemo = (value: any) => {
  if (value.includes('[高低單雙]')) {
    const pattern = /(\d{12}).*?「([^」]+)」/
    let str = value.match(pattern)

    // str = '訂單編號：' + str[1] + '\r\n' + str[2].replace('高', '購置').replace('低', '放置')
    str =
      '訂單編號：' +
      str[1] +
      ' ' +
      '\r\n' +
      str[2].replace('高', '購置').replace('低', '放置')
    return str
  } else if (value.includes('[投注成功]')) {
    let str = value
    //   .replace('投注成功', '訂單成功')
    //   .replace('期別', '訂單編號')
    //   .replace('高', '購置')
    //   .replace('低', '放置')
    const pattern =
      /\[投注成功\]\s+投注-(.*?)\s+期別-(\d+)\s+選項-(.*?)\s+金額-\d+/
    str = str.match(pattern)
    // str = '[訂單成功] ' + str[1] + '\r\n' + '訂單編號：' + str[2] + '\r\n' + str[3].replace('高', '購置').replace('低', '放置')
    str =
      '[訂單成功] ' +
      str[1] +
      '\r\n' +
      '訂單編號：' +
      str[2] +
      '\r\n' +
      str[3].replace('高', '選項-購置 ').replace('低', '選項-放置 ')
    return str
  } else {
    return value
  }
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
        財務紀錄
      </div>
      <div class="cart-top">

        <div class="table-responsive">
          <h3 class="ul-contact-form-container__title">
            HELLO:{{ playerStore.playerInfo.username }} $ {{ new Intl.NumberFormat('zh-TW').format(mainBalance) }}
          </h3>
          <hr style="border-top: 1px solid #d7d7d7;opacity: 1;margin-bottom: 0px;">
          <table class="ul-cart-table">
            <thead>
              <tr>
                <td>{{ $lang('產生時間') }}</td>
                <td>{{ $lang('帳號內容') }}</td>
                <td>{{ $lang('申請內容') }}</td>
                <td>{{ $lang('當筆結果') }}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in recordList" :key="index">
                <!-- 時間 -->
                <td>
                  <p>
                    {{ formatDate(item.createdAt) }}
                  </p>
                </td>
                <!-- 內容 -->
                <td>
                  <div v-if="item.bankData">
                    <div>{{ $lang('銀行') }}:{{ item.bankData.bankName }}</div>
                    <div>{{ $lang('分行') }}:{{ item.bankData.branch }}</div>
                    <div>{{ $lang('戶名') }}:{{ item.bankData.account }}</div>
                    <div>{{ $lang('帳號') }}:{{ hiddenAccountNo(item.bankData.accountNo) }}</div>
                    <div>{{ $lang('狀態') }}:{{ applyStatus2(item.status) }}</div>
                    <!-- <div>
                      {{ $lang('手續費') }}: $
                      {{ new Intl.NumberFormat('zh-TW').format(item.fee) }}
                    </div> -->
                  </div>
                  <div v-else>
                    {{ transactionRecordType(item.type) }}
                  </div>
                </td>

                <!-- 金額 -->
                <td>
                  <p>
                    $ {{ new Intl.NumberFormat('zh-TW').format(item.amount) }}</p>
                </td>
                <td>
                  <div v-if="item.bankData">
                    {{ applyStatus(item.status) }}
                  </div>
                  <div v-else>
                    {{ transactionRecordType(item.type) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
      tbody
        background-color: #fff
      thead
        font-size: clamp(17px, 1.05vw, 20px)
        padding-bottom: 17px
        // border-bottom: 1px solid #aeb1be
        background-color: #ffffe4
        // tr
        //   &:last-child
        //     border: none
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
