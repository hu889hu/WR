<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const playerStore = usePlayerStore()
const siteStore = useSiteStore()

const { updatePassword, updateTrasactionPassword } = playerStore
const pwd = ref({
  oPwd: '',
  nPwd: '',
  nPwdConfirm: '',
  showoPwd: false,
  shownPwd: false,
  shownPwdConfirm: false
})
const transactionPwd = ref({
  oPwd: '',
  nPwd: '',
  nPwdConfirm: '',
  showoPwd: false,
  shownPwd: false,
  shownPwdConfirm: false
})
const changePwd = ref(false)
const changenTPwd = ref(false)
// updatePassword()  更新密碼
// updateTrasactionPassword()  更新交易密碼
watch(
  () => pwd.value.nPwdConfirm,
  (val) => {
    if (val) {
      changePwd.value = true
    } else {
      changePwd.value = false
    }
  }
)
watch(
  () => transactionPwd.value.nPwdConfirm,
  (val) => {
    if (val) {
      changenTPwd.value = true
    } else {
      changenTPwd.value = false
    }
  }
)
const sendPasswordChange = async () => {
  console.log('changePwd.value', changePwd.value)
  console.log('changenTPwd.value', changenTPwd.value)
  if (changePwd.value) {
    if (pwd.value.nPwd !== pwd.value.nPwdConfirm) {
      ElNotification({
        title: `${t('密碼不一致')}`,
        type: 'error',
        duration: 1000,
        showClose: false
      })
      return
    }
    const res = await updatePassword({
      password: pwd.value.oPwd,
      newPassword: pwd.value.nPwd
    })
    if (res.success) {
      pwd.value.oPwd = ''
      pwd.value.nPwd = ''
      pwd.value.nPwdConfirm = ''
    }
  }
  if (changenTPwd.value) {
    if (transactionPwd.value.nPwd !== transactionPwd.value.nPwdConfirm) {
      ElNotification({
        title: `${t('交易密碼不一致')}`,
        type: 'error',
        duration: 1000,
        showClose: false
      })
      return
    }
    const res = await updateTrasactionPassword({
      password: transactionPwd.value.oPwd,
      newPassword: transactionPwd.value.nPwd
    })
    if (res.success) {
      transactionPwd.value.oPwd = ''
      transactionPwd.value.nPwd = ''
      transactionPwd.value.nPwdConfirm = ''
    }
  }
}
</script>

<template>
  <div class="pages">
    <div class="tag">
      {{ $lang('個人資訊') }}
    </div>
    <div class="inf-bg">
      <div class="ul-contact-form-container">
        <h3 class="ul-contact-form-container__title">{{ $lang('帳號資訊') }}
        </h3>
        <hr style="border-top: 1px solid #d7d7d7;opacity: 1;">
        <div class="ul-contact-form">
          <div class="grid">

            <!-- 職員編號 (只讀) -->
            <div class="form-group">
              <div class="position-relative">
                <label>{{ $lang('職員編號') }}</label>
                <input type="text" name="acc" :value="playerStore?.playerInfo?.account || ''" readonly
                  class="form-control">

              </div>
            </div>

            <!-- 職員名稱 (只讀) -->
            <div class="form-group">
              <div class="position-relative">
                <label>{{ $lang('職員名稱') }}</label>
                <input type="text" name="name" :value="playerStore?.playerInfo?.username" readonly class="form-control">

              </div>
            </div>

            <!-- 職員電話 (只讀) -->
            <div class="form-group">
              <div class="position-relative">
                <label>{{ $lang('職員電話') }}</label>
                <input type="text" name="tel"
                  :value="playerStore?.playerInfo?.countryCode + ' ' + playerStore?.playerInfo?.mobile" readonly
                  class="form-control">
              </div>
            </div>
            <!-- 電子郵件 (只讀) -->
            <div class="form-group">
              <div class="position-relative">
                <label>{{ $lang('電子郵件') }}</label>
                <input type="text" name="tel" :value="playerStore?.playerInfo?.social.id" readonly class="form-control">
              </div>
            </div>
          </div>
        </div>


      </div>
      <div class="ul-contact-form-container">
        <!-- 更新密碼表單 -->
        <h3 class="ul-contact-form-container__title">{{ $lang('修改登入密碼') }}</h3>
        <hr style="border-top: 1px solid #d7d7d7;opacity: 1;">

        <div class="ul-contact-form">
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('舊密碼') }}</label>
              <input v-model="pwd.oPwd" v-trim-input :type="pwd.showoPwd ? 'text' : 'password'" class="form-control"
                @copy.prevent @paste.prevent @contextmenu.prevent />
              <div v-if="!pwd.showoPwd" class="eyes" @click="pwd.showoPwd = true">
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="pwd.showoPwd = false">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
          </div>
          <div class="form-group" style="padding-top: 10px;">
            <div class="position-relative">
              <label>{{ $lang('新密碼') }}</label>
              <input v-model="pwd.nPwd" v-trim-input :type="pwd.shownPwd ? 'text' : 'password'" class="form-control"
                @copy.prevent @paste.prevent @contextmenu.prevent />
              <div v-if="!pwd.shownPwd" class="eyes" @click="pwd.shownPwd = true">
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="pwd.shownPwd = false">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="position-relative">
              <label>{{ $lang('再次輸入新密碼') }}</label>
              <input v-model="pwd.nPwdConfirm" v-trim-input :type="pwd.shownPwdConfirm ? 'text' : 'password'"
                class="form-control" @copy.prevent @paste.prevent @contextmenu.prevent />
              <div v-if="!pwd.shownPwdConfirm" class="eyes" @click="pwd.shownPwdConfirm = true">
                <i class="fa-regular fa-eye-slash"></i>
              </div>
              <div v-else class="eyes" @click="pwd.shownPwdConfirm = false">
                <i class="fa-regular fa-eye"></i>
              </div>
            </div>
          </div>
          <!-- submit btn -->
          <div class="btn btn-primary update_password" @click="sendPasswordChange"><span>{{ $lang('確認修改登入密碼') }}</span>
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
.tag
  padding: 100px 0
  background-image: url('@/assets/image/wruser/bg04.jpg')
  background-size: cover
  background-position: center
  text-align: center
  text-shadow: 2px 2px 2px #000
  color: #f8f8c0
  font-size: 33px
.inf-bg
  display: flex
  flex-wrap: wrap
  gap: 0px
  margin: 0 auto
  justify-content: center
  align-items: flex-start
  padding: 90px 0
  max-width: 1140px
  @media (max-width: 992px)
    padding: 40px 0
    .ul-contact-form-container 
      width: 100% !important
      margin-bottom: 20px
  .ul-contact-form-container 
    width: 50%
    padding:  0 15px
    border-radius: 14px
    min-width: 320px
  .ul-contact-form input, .ul-contact-form textarea 
    width: 100%
    padding: 10px
    font-size: 14px
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
