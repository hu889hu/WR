<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const { signin } = useAuthStore()
const passwordEyes = ref(false)
const recaptchaCode = ref('')
const recaptchaCheckFunction = ref(null)
const focusItem = ref('')
const siteStore = useSiteStore()

const fetchSigninApi = ref({
  account: '',
  password: ''
})
const showPassword = (type: boolean) => {
  passwordEyes.value = type
}

const setLogin = async () => {
  // return navigateTo('/user')
  if (!fetchSigninApi.value.account) {
    ElMessage({
      message: '請輸入帳號',
      type: 'error',
      showClose: false
    })
    return
  }
  if (!fetchSigninApi.value.password) {
    ElMessage({
      message: '請輸入密碼',
      type: 'error',
      showClose: false
    })
    return
  }
  const recaptchaCheck = await recaptchaCheckFunction.value.validate(
    recaptchaCode.value
  )
  if (!recaptchaCheck) {
    ElMessage({
      message: '驗證碼錯誤',
      type: 'error',
      showClose: false
    })
  } else {
    const res = await signin(fetchSigninApi.value)
    if (res.success) {
      navigateTo('/user')
    }
  }
}
const checkHepler = async (data) => {
  recaptchaCheckFunction.value = data
}

const openChatBox = () => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  if (urlPattern.test(siteStore.chatbox)) {
    window.open(siteStore.chatbox, '_blank')
  }
}
</script>

<template>
  <div class="bg-temp">
    <client-only>
      <div class="login-bnr">
        <div class="overlay">
          <div class="info-form">
            <h4>歡迎您一同共創未來</h4>
            <h1>揭示癌症的藏身之處</h1>
            <p>我們不是只看趨勢，而是看見需求，<br>
              AI設備不只用於診斷，更能累積大量數據，<br>
              未來將成為預測疾病，提前介入抗癌的關鍵</p>
            <!-- <div class="login-check">
              <a @click="
                () => {
                  navigateTo('/')
                }
              "><label class="checkbox">返回首頁</label></a>
            </div> -->
          </div>
        </div>
      </div>
      <div class="login">
        <div class="login-main">
          <div class="login-top">
            <h1 style="font-weight: bold">登入系統</h1>
            <br>
            <!--<img src="../static/picture/logo01.png" alt="" style="width: 200px;padding-bottom: 15px;">-->
            <span class="login-p">
              歡迎使用系統…若尚未持有帳戶，請點選申請帳戶。
            </span>
            <br>
            <br>
            <div class="form">
              <h5>您的帳號</h5>
              <input v-model="fetchSigninApi.account" v-trim-input type="text" placeholder="請輸入帳號"
                @focus="focusItem = 'account'" @focusout="focusItem = ''" />
              <br>
              <br>
              <h5>您的密碼</h5>
              <input v-model="fetchSigninApi.password" v-trim-input :type="passwordEyes ? 'text' : 'password'"
                placeholder="請輸入密碼" @keyup.enter="setLogin" @focus="focusItem = 'password'"
                @focusout="focusItem = ''" />
              <br />
              <br />

              <!-- 驗證碼圖片 -->
              <div style="font-size: 20px;color:#0e800a;text-align: center;font-weight: bold;margin-bottom: 10px;">
                驗證碼
              </div>

              <recaptcha style="
                  cursor: pointer;
                  width: 152px;
                  border: 1px solid #ccc;
                  margin: 0 auto;
                " @check-hepler="checkHepler"></recaptcha>
              <br />
              <input v-model="recaptchaCode" v-trim-input type="text" placeholder="請輸入驗證碼" @keyup.enter="setLogin"
                @focus="focusItem = 'recaptcha'" @focusout="focusItem = ''" />
              <input type="submit" value="登入帳戶" @click="setLogin" />
              <input type="submit" class="submit2" value="申請帳戶" @click="() => { navigateTo('/register') }">
            </div>

            <h3 style="font-weight: bold; margin-top: 30px;text-align: center;">AI 驅動的癌症檢測，提供個人化篩檢</h3>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<style scoped lang="sass">
.bg-temp
  background-size: cover
  min-height: 100dvh
  font-size: 100%
  display: flex
  justify-content: center
  @media screen and (max-width: 1080px)
    .login-bnr
      width: 60%
    .login
      width: 40%
  @media screen and (max-width: 768px)
    flex-direction: column
    .login-bnr
      width: 100% !important
    .login
      width: 100% !important
  .login-bnr
    position: relative
    min-height: 40vh
    width: 70%
    background: url('@/assets/image/index/login-bg.jfif') no-repeat center / cover
    .overlay
      position: absolute
      background: rgb(16 89 97 / 44%)
      top: 0
      left: 0
      width: 100%
      height: 100%
      display: flex
      justify-content: center
      align-items: center
      .info-form
        text-align: center
        color: #fff
        margin-top: 15px
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.562)
        h1
          color: #fff
        p
          margin-top: 25px
          font-weight: normal
        .login-check
          padding: 8px 40px
          color: #fff
          display: inline-block
          font-size: 18px
          font-weight: 400
          display: inline-block
          background: #1385d9
          border: 2px solid transparent
          text-transform: uppercase
          text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.562)
          text-align: center
          margin-bottom: 70px
          margin-top: 40px
          border-radius: 4px
          transition: all 0.3s ease-in-out
          &:hover
            background: transparent
            border: 2px solid #fff
  .login
    width: 30%
    background: #fff
    padding: 30px 30px 60px
    @media screen and (max-width: 1440px)
      width: 60%
    @media screen and (max-width: 960px)
      width: 90%
  .login-main
    // border: 2px solid #7397D1
    min-height: 400px

  .login-top
    padding: 45px 0px
    position: relative

  h1
    font-size: 48px
    font-weight: 600
    color: #202020
    text-align: center

  .login-p
    font-weight: 400
    text-align: left
    color: #8E8E8E
    margin: 0px 0px 16px 0px
    font-size: 18px
    font-weight: 500
    color: #012d8b
    background-color: #c7dfffb4
    line-height: 24px
    display: inline

  .form
    margin: 0
    padding: 0
    border: 0
    font-size: 100%
    font: inherit
    vertical-align: baseline
    text-align: left
  .login-top input
    background: #fff
    outline: none
    width: 100%
    font-size: 17px
    padding: 10px 15px
    color: #090e0d
    border: 2px solid #BECED0
    border-radius: 4px
    &:focus
       
      border: 2px solid #52a494
    &[type="submit"]
      background: #222
      color: #fff
      text-decoration: none
      padding: 0px 30px
      text-align: center
      font-size: 16px
      display: inline-block
      width: 100%
      height: 50px
      line-height: 45px
      margin-top: 30px
      border: none
      transition: all 0.3s ease-in-out
      &:hover
        background: #52A494
  .submit2
    background: #001b92 !important
    color: #fff
    &:hover
      background: #3082a8 !important
  .login-bottom
    width: 60%
    margin: 25px auto
    display: flex
    align-items: center
    justify-content: space-between

  .login-top .checkbox
    font-size: 17px
    font-weight: bold
    color: #696969
    cursor: pointer
    position: relative
    display: block

  a
    text-decoration: none

  .login-top p a
    font-size: 17px
    font-weight: bold
    color: #8e8e8e

@media screen and (max-width: 1140px)

@media screen and (max-width: 992px)



</style>
