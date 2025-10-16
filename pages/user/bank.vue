<script lang="ts" setup>
const playerStore = usePlayerStore()
const siteStore = useSiteStore()
const { bankApply } = usePlayerStore()
const pageType = ref('bank')
const bankInfo = ref({
  bankName: siteStore.siteData?.depositOptions.bank[0],
  branch: '',
  account: '',
  accountNo: '',
  image: ['', '', '']
})
await useAsyncData(async () => {
  // 如果綁定銀行卡跳轉錢包
  if (playerStore?.playerInfo?.bankInfo !== null) {
    if (playerStore?.playerInfo?.bankInfo.status === 1) {
      navigateTo('/user/withdraw')
    }
  }
})
// methods
const submitBankApply = async () => {
  console.log(bankInfo)
  if (bankInfo.value.branch === '') {
    return ElMessage.error('請填寫分行')
  }
  if (bankInfo.value.account === '') {
    return ElMessage.error('請填寫戶名')
  }
  if (bankInfo.value.accountNo === '') {
    return ElMessage.error('請填寫帳號')
  }
  // if (bankInfo.value.image[0] === '') {
  //   return ElMessage.error('請上傳身分證正面')
  // }
  // if (bankInfo.value.image[1] === '') {
  //   return ElMessage.error('請上傳身分證反面')
  // }
  if (bankInfo.value.image[2] === '') {
    return ElMessage.error('請上傳檔案')
  }
  const bankApplyRes = await bankApply(bankInfo.value)
  if (bankApplyRes) {
    setTimeout(async () => {
      const res = await playerStore.fetchInfo()
      if (res.success) {
        if (playerStore.playerInfo.bankInfo.status === 1) {
          navigateTo('/user/withdraw')
        }
      }
    }, 1000)
  }
}
const changeType = (type: any) => {
  pageType.value = type
  switch (type) {
    case 'bank':
      bankInfo.value = {
        bankName: siteStore.siteData?.depositOptions.bank[0],
        branch: '',
        account: '',
        accountNo: '',
        image: ['', '', '']
      }
      break
    case 'address':
      bankInfo.value = {
        bankName: siteStore.siteData?.depositOptions.crypto[0],
        branch: '',
        account: '',
        accountNo: '',
        image: []
      }
      break
  }
}
const updateImage = (data: any) => {
  // console.log(data)
  if (data.url[0]) {
    bankInfo.value.image[data.index] = data.url[0].url
  } else {
    bankInfo.value.image[data.index] = ''
    console.log(bankInfo.value.image)
  }
}
</script>

<template>
  <div class="pages">
    <div v-if="Object.keys(playerStore.playerInfo.bankInfo || {}).length === 0" class="tag">
      {{ $lang('財務申請') }}
    </div>
    <div v-else class="tag">
      {{ $lang('已收到申請') }}
    </div>
    <div v-if="Object.keys(playerStore.playerInfo.bankInfo || {}).length === 0" class="inf-bg">
      <h3 class="ul-contact-form-container__title">
        {{ $lang('請新增一筆銀行資訊') }}
      </h3>
      <hr style="border-top: 1px solid #d7d7d7;opacity: 1;">
      <div class="ul-contact-form">
        <div class="">
          <!--  銀行  -->
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('請選擇您的銀行') }}</label>
              <div style="padding: 10px;border: 1px solid #ccc;border-radius: 4px;">
                <select v-model="bankInfo.bankName" name="phoneCode" class="form-control">
                  <option v-for="item in siteStore.siteData?.depositOptions.bank" :key="item">
                    {{ item }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- 分行 -->
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('請輸入分行名稱') }}</label>
              <input v-model="bankInfo.branch" v-trim-input type="text" name="name" class="form-control" />
            </div>
          </div>

          <!-- 帳戶號碼  -->
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('請輸入帳戶號碼') }}</label>
              <input v-model="bankInfo.accountNo" v-trim-input type="text" name="tel" class="form-control" />
            </div>
          </div>
          <!-- 帳戶戶名 -->
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('請輸入帳戶戶名') }}</label>
              <input v-model="bankInfo.account" v-trim-input type="text" name="name" class="form-control" />
            </div>
          </div>
          <!--  上傳照片 -->
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('請上傳存簿照片') }}</label>
              <div class="form-control" style="display: flex; flex-wrap: wrap">
                <pureImgUploader :limit="1" :index="2" @update-image="updateImage">
                </pureImgUploader>
              </div>
            </div>
          </div>
          <button class="update_password" @click="submitBankApply">
            <span>{{
              $lang('確認送出')
            }}</span>
          </button>
        </div>
      </div>
    </div>
    <div v-else style="">
      <div class="inf-bg" style="padding-top: 0px;">
        <div class="input-text text-center">
          <div class="smile">
            <i class="fa-regular fa-face-smile"></i>
          </div>
          <h1 style="font-size: 48px"><span style="color: #3f90dc;">已收到申請</span>等待審核中...</h1>
          <div style="margin: 10px 0 30px;">已收到您申請的資訊，請耐心等候審核。</div>
          <div @click="navigateTo('/user')" class="backbtn">返回首頁</div>
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
  background-image: url('@/assets/image/wruser/bg05.jpg')
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
