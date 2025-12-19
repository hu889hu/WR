<script lang="ts" setup>
import { ref, watch } from 'vue'
const { t } = useI18n()
const router = useRouter()
const playerStore = usePlayerStore()
const siteStore = useSiteStore()
const { withdraw, transfer, donate } = useWalletStore()
const withdrawAmount = ref(0)
const tPwd = ref('')
const withdrawFee = computed(() => withdrawFeeCount())
const selectType = ref('withdraw')
const showSectionType = ref(true)
await useAsyncData(async () => {
  if (siteStore.siteData.smsVerify === 3) {
    if (!playerStore.playerInfo.smsVerify) {
      navigateTo('/user/smsVerify')
    }
  }
  if (!playerStore.playerInfo?.bankInfo) {
    navigateTo('/user/bank')
  }

  if (playerStore.playerInfo.bankInfo.status !== 1) {
    navigateTo('/user/bank')
  }
})
// methods
const goWithdraw = async () => {
  console.log(withdrawAmount.value, siteStore.siteData.minWithdrawAmount,
    siteStore.siteData.maxWithdrawAmount, '321');

  if (
    withdrawAmount.value < siteStore.siteData.minWithdrawAmount ||
    withdrawAmount.value > siteStore.siteData.maxWithdrawAmount
  ) {
    ElNotification({
      title: `${t('提款金額不符合規定')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  if (siteStore.siteData.transactionPasswordRequired) {
    if (!tPwd.value) {
      ElNotification({
        title: `${t('請輸入交易密碼')}`,
        type: 'error',
        duration: 1000,
        showClose: false
      })
      return
    }
  }
  console.log('withdrawAmount.value', withdrawAmount.value)
  console.log('Number(mainBalance.value)', Number(mainBalance.value))
  if (withdrawAmount.value > Number(mainBalance.value)) {
    ElNotification({
      title: `${t('可提領餘額不足')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  const withdrawRes = await withdraw(
    siteStore.siteData.transactionPasswordRequired
      ? {
        amount: JSON.stringify(withdrawAmount.value),
        password: tPwd.value,
        walletType: 13
      }
      : {
        amount: JSON.stringify(withdrawAmount.value),
        walletType: 13
      }
  )
  if (withdrawRes.success) {
    ElNotification({
      title: `${t('提款成功')}`,
      type: 'success',
      duration: 1000
    })
    withdrawAmount.value = 0
    tPwd.value = ''
    await playerStore.fetchInfo()
  }
}
const goDonate = async () => {

  // if (siteStore.siteData.transactionPasswordRequired) {
  //   if (!tPwd.value) {
  //     ElNotification({
  //       title: `${t('請輸入交易密碼')}`,
  //       type: 'error',
  //       duration: 1000,
  //       showClose: false
  //     })
  //     return
  //   }
  // }
  if (!amountInfo.value.amount) {
    ElNotification({
      title: `${t('请输入捐赠金额')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  if (amountInfo.value.amount > Number(mainBalance.value)) {
    ElNotification({
      title: `${t('餘額不足')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  const donateRes = await donate(
    siteStore.siteData.transactionPasswordRequired
      ? {
        amount: JSON.stringify(amountInfo.value.amount),
        password: tPwd.value,
        walletType: 13
      }
      : {
        amount: JSON.stringify(amountInfo.value.amount),
        walletType: 13
      }
  )
  if (donateRes.success) {
    ElNotification({
      title: `${t('捐赠成功')}`,
      type: 'success',
      duration: 1000
    })
    amountInfo.value.amount = 0
    tPwd.value = ''
    await playerStore.fetchInfo()
  }
}
const withdrawFeeCount = () => {
  const fee =
    withdrawAmount.value * siteStore.siteData.withdrawFeeRatio +
    siteStore.siteData.withdrawFeeFixed
  return fee < 1 ? 0 : new Intl.NumberFormat().format(fee)
}
const hiddenAccountNo = (value) => {
  if (value) {
    return value.replace(/^.{4}/, '****')
  } else {
    return ''
  }
}
onMounted(() => {
  if (playerStore.playerInfo.bankInfo !== null) {
    const bank = siteStore.siteData.depositOptions.bank.find((item) => {
      return item === playerStore.playerInfo.bankInfo.bankName
    })
    if (!bank) {
      showSectionType.value = false
    } else {
      showSectionType.value = true
    }
  }
})

const walletTypeName = (item: any) => {
  const type = item.type
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

const transferWalletData = ref({
  from: '',
  to: '',
  amount: ''
})

const transferBtn = ref(false)

const goTransfer = async () => {
  transferBtn.value = false
  const fromData = playerStore.playerInfo.wallet.find(
    (item: any) => item.id === transferWalletData.value.from
  )
  const toData = playerStore.playerInfo.wallet.find(
    (item: any) => item.id === transferWalletData.value.to
  )
  if (!fromData) {
    ElNotification({
      title: `${t('請選擇轉出錢包')}`,
      type: 'error',
      duration: 1000
    })
    return
  }
  if (!toData) {
    ElNotification({
      title: `${t('請選擇轉入錢包')}`,
      type: 'error',
      duration: 1000
    })
    return
  }
  const transferRes = await transfer({
    fromWalletId: transferWalletData.value.from,
    toWalletId: transferWalletData.value.to,
    amount: JSON.stringify(transferWalletData.value.amount),
    memo: `用戶操作 ${walletTypeName(fromData)} 劃轉至 ${walletTypeName(toData)} ,數量: ${transferWalletData.value.amount}`
  })
  if (transferRes.success) {
    ElNotification({
      title: `${t('轉帳成功')}`,
      type: 'success',
      duration: 1000
    })
    await playerStore.fetchInfo()
    transferWalletData.value.amount = 0
  }
}

const mainBalance = computed(() => {
  const mainWallet = playerStore.playerInfo.wallet.find(
    (item: any) => item.type === 13
  )
  return mainWallet ? mainWallet.balance : 0
})

watch(
  () => transferWalletData.value.from,
  (newValue) => {
    console.log('transferWalletData.value', transferWalletData.value.from)
    const toWalletList = playerStore.playerInfo.wallet.filter(
      (item: any) => item.id !== transferWalletData.value.from
    )
    transferWalletData.value.to = toWalletList[0].id
  },
  { deep: true }
)
watch(
  () => transferWalletData.value.amount,
  (newValue) => {
    if (newValue > 0) {
      transferBtn.value = true
    } else {
      transferBtn.value = false
    }
  },
  { deep: true }
)

const amountInfo = ref({
  amount: ''
})
const tabActive = ref('1')
const onActive = (item) => {
  tabActive.value = item
}
</script>

<template>
  <div class="pages">
    <div class="tag">
      財務申請
    </div>
    <div class="inf-bg">
      <h3 class="ul-contact-form-container__title">
        HELLO:{{ playerStore.playerInfo.username }} $ {{ new Intl.NumberFormat('zh-TW').format(mainBalance) }}
      </h3>
      <hr style="border-top: 1px solid #d7d7d7;opacity: 1;margin-bottom: 50px;">
      <div class="btns">
        <div class="btn" :class="tabActive == '1' ? 'active' : ''" @click="onActive('1')">
          財務申請
        </div>
        <div class="btn" :class="tabActive == '2' ? 'active' : ''" @click="onActive('2')">
          愛心公益箱
        </div>
      </div>
      <div v-if="playerStore.playerInfo.bankInfo !== null" class="formSection">
        <div class="formContent" v-if="tabActive == '1'">
          <form action="" class="ul-contact-form">
            <!--  銀行  -->
            <div class="form-group">
              <div class="position-relative">
                <label>您的銀行</label>
                <input type="text" name="acc" v-trim-input :value="playerStore.playerInfo.bankInfo.bankName"
                  class="form-control" readonly>
              </div>
            </div>
            <!-- 戶名 -->
            <div class="form-group">
              <div class="position-relative">
                <label>您的分行名稱</label>
                <input type="text" name="name" v-trim-input :value="playerStore.playerInfo.bankInfo.branch"
                  class="form-control" readonly>
              </div>
            </div>
            <!-- 我的資產 -->
            <!-- <div class="form-group">
              <div class="position-relative">
                <label>我的資產(主錢包)</label>
                <input type="text" name="name" :value="new Intl.NumberFormat('zh-TW').format(mainBalance)"
                  class="form-control" readonly>
              </div>
            </div> -->
            <!-- 帳號 -->
            <div class="form-group">
              <div class="position-relative">
                <label>您的帳戶號碼</label>
                <input type="text" name="name" v-trim-input v-model="playerStore.playerInfo.bankInfo.accountNo"
                  class="form-control" readonly>
              </div>
            </div>
            <!-- 戶名 -->
            <div class="form-group">
              <div class="position-relative">
                <label>您的帳戶戶名</label>
                <input type="text" name="name" v-trim-input v-model="playerStore.playerInfo.bankInfo.account"
                  class="form-control" readonly>
              </div>
            </div>
            <!-- 金額 -->
            <div class="form-group">
              <div class="position-relative">
                <label>請輸入您申請的金額 <span style="font-size: 14px;padding-left: 10px;color: #8a8a8a;">(申請金額單筆最低{{
                  new Intl.NumberFormat('zh-TW').format(
                    siteStore.siteData.minWithdrawAmount
                  )
                }})</span></label>
                <input type="number" v-model="withdrawAmount" class="form-control">
              </div>
              <div style="font-size: 14px;color: #5178f8;font-weight: 600;margin-top: 20px;">
                <!-- <span>（{{ $lang('申請金額單筆最低')
                }}：{{
                    new Intl.NumberFormat('zh-TW').format(
                      siteStore.siteData.minWithdrawAmount
                    )
                  }}）</span> -->
                <!-- ~
                  {{
                    new Intl.NumberFormat('zh-TW').format(
                      siteStore.siteData.maxWithdrawAmount
                    )
                  }}</span>&nbsp
                <span style="font-size: 12px;color: rgb(47, 169, 88);">{{ $lang('手續費') }}：{{
                  withdrawAmount > 0 ? withdrawFee : 0
                }}</span> -->
              </div>
            </div>
            <div class="form-group" style="padding-top: 10px;" v-if="siteStore.siteData.transactionPasswordRequired">
              <div class="position-relative">
                <label>交易密碼</label>
                <input type="password" v-model="tPwd" v-trim-input name="new_password" autocomplete="off"
                  class="form-control">
              </div>
            </div>
            <button type="button" class="update_password" @click="goWithdraw">
              {{ $lang('確認送出') }}
            </button>
          </form>
        </div>
        <div class="formContent" v-if="tabActive == '2'">
          <form action="" class="ul-contact-form">
            <!-- 金額 -->
            <div class="form-group">
              <div class="position-relative">
                <label>請輸入您的捐赠金額</label>
                <input type="number" v-model="amountInfo.amount" class="form-control">
              </div>
            </div>
            <!-- <div class="form-group" style="padding-top: 10px;" v-if="siteStore.siteData.transactionPasswordRequired">
              <div class="position-relative">
                <label>交易密碼</label>
                <input type="password" v-model="tPwd" v-trim-input name="new_password" autocomplete="off"
                  class="form-control">
              </div>
            </div> -->
            <button type="button" class="update_password" @click="goDonate">
              {{ $lang('確認捐赠') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.pages
  box-sizing: border-box
  background-color: #edeff4
.tag
  padding: 100px 0
  background-image: url('@/assets/image/wruser/bg06.jpg')
  background-size: cover
  background-position: center
  text-align: center
  text-shadow: 2px 2px 2px #000
  color: #f8f8c0
  font-size: 33px
.inf-bg
  margin: auto
  justify-content: center
  align-items: flex-start
  padding: 90px 15px
  width: 1140px
  @media screen and (max-width: 768px)
    width: 100%
  .btns
    display: flex
    gap: 10px
    margin-bottom: 10px
    .btn
      min-width: 120px
      text-align: center
      padding: 8px 15px
      border: 1px solid #007bff
      color: #007bff
      border-radius: 5px
    .active
      background-color: #007bff !important
      color: #fff !important
  .smile
    font-size: 200px
    color: rgb(100, 166, 252)
  .backbtn
    width: 160px
    color: #fff
    background-color: #3f90dc
    font-weight: 600
    padding: 17px 0
    border-radius: 4px
    margin: 0 auto
    text-align: center
    font-size: 14px
    cursor: pointer
    transition: all .3s
    &:hover
      background-color: #d6ce56
      color: #151515
  .ul-contact-form input, .ul-contact-form textarea , .ul-contact-form select 
    width: 100%
    padding: 10px
    font-size: 16px
    border: 1px solid #ccc
    border-radius: 4px
    color: #000
    background-color: #fff
    transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease
  .form-control:focus
  //   color: #212529
  //   background-color: #fff
    border-color: #86b7fe
  //   transform: scale(1.02)
    outline: none !important
  //   transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
  //   box-shadow: 0 0  .25rem 2px rgba(13, 110, 253, .25)
  .form-group
    margin-bottom: clamp(15px, 1.58vw, 30px)
    .position-relative
      position: relative
      label
        display: block
        letter-spacing: 0.5px
        margin-bottom: 8px
        font-weight: 600
        color: #444
      .eyes
        position: absolute
        right: 10px
        bottom: 15px
        cursor: pointer
  .ul-contact-form-container__title
    font-size: 18px
    margin-bottom: 15px
    border-left: 4px solid #007BFF
    padding-left: 14px
    color: #151515
    line-height: 20px
    font-weight: 600
  .ul-contact-form .update_password 
    margin-top: 0px
    width: 100%
    padding: 10px
    font-size: 16px
    font-weight: 500
    color: #fff
    background-color: #4CAF50
    border: none
    border-radius: 4px
    cursor: pointer
    text-align: center
    box-shadow: none
    transition: background-color 0.3s ease, transform 0.15s ease
    &:hover 
      background-color: #218838
</style>