<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const referrerCodeCookiee = useCookie('referrerCode') as any
const siteStore = useSiteStore()
const signupData = ref({
  account: '',
  password: '',
  transactionPassword: '',
  username: '',
  referrerCode: '',
  countryCode: siteStore.siteData.localsOptions[0],
  mobile: '',
  socialPlatform: '',
  socialId: '',
  additionalInfo: {}
})
const additionalInfo1Value = ref('Line')
const showReferrerInput = ref(false)
const verifyPassword = ref('')
const verifyTransactionPassword = ref('')
const isChecked = ref(true)
const recaptchaCode = ref('')
const recaptchaCheckFunction = ref(null)
const passwordEyes = ref(false)
const tPasswordEyes = ref(false)
const { signup } = useAuthStore()
const validationStatus = reactive({
  accountValid: false,
  passwordValid: false,
  passwordSame: true,
  transactionPasswordValid: false,
  transactionPasswordSameWithPassword: false,
  transactionPasswordSame: true,
  phoneValid: false
})
const passwordSameRef = ref(null)
const transactionPasswordRef = ref(null)
const transactionPasswordSameRef = ref(null)
const usernameRef = ref(null)
const mobileRef = ref(null)
const socialIdRef = ref(null)
const isFormValid = computed(() => {
  console.log('passwordSameRef.value', passwordSameRef.value)
  console.log(
    'transactionPasswordSameRef.value',
    transactionPasswordSameRef.value
  )

  // 如果有額外欄位資訊，則需要添加額外驗證
  let isValid = validationStatus.accountValid && validationStatus.passwordValid

  if (passwordSameRef.value !== null) {
    isValid = isValid && validationStatus.passwordSame
  }

  if (transactionPasswordRef.value !== null) {
    isValid =
      isValid &&
      validationStatus.transactionPasswordValid &&
      !validationStatus.transactionPasswordSameWithPassword
  }
  if (transactionPasswordSameRef.value !== null) {
    isValid =
      isValid &&
      validationStatus.transactionPasswordSame &&
      !validationStatus.transactionPasswordSameWithPassword
  }
  if (usernameRef.value !== null) {
    isValid = isValid && signupData.value.username
  }
  if (mobileRef.value !== null) {
    isValid = isValid && signupData.value.mobile
  }
  if (signupData.value.mobile) {
    isValid = isValid && validationStatus.phoneValid
  }
  if (socialIdRef.value !== null) {
    isValid = isValid && signupData.value.socialId
  }

  console.log('isFormValid:', isValid) // 添加日志
  return isValid
})

const validateAccount = () => {
  const regex = /^[a-zA-Z0-9]{4,20}$/
  validationStatus.accountValid = regex.test(signupData.value.account)
  checkTransactionPasswordSameWithPassword()
}

const checkPasswordRequired = () => {
  const passwordRegex = /^.{3,}$/
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/
  validationStatus.passwordValid =
    passwordRegex.test(signupData.value.password) &&
    signupData.value.password !== signupData.value.account
  if (verifyPassword.value) {
    checkPasswordSame()
  }
  if (signupData.value.transactionPassword) {
    checkTransactionPasswordSameWithPassword()
  }
}

const checkPasswordSame = () => {
  validationStatus.passwordSame =
    signupData.value.password === verifyPassword.value
}

const checkTransactionPasswordRequired = () => {
  const passwordRegex = /^.{3,}$/
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/
  validationStatus.transactionPasswordValid = passwordRegex.test(
    signupData.value.transactionPassword
  )
  checkTransactionPasswordSameWithPassword()
  if (verifyTransactionPassword.value) {
    checkTransactionPasswordSame()
  }
}

const checkTransactionPasswordSameWithPassword = () => {
  validationStatus.transactionPasswordSameWithPassword =
    signupData.value.transactionPassword === signupData.value.password ||
    signupData.value.transactionPassword === signupData.value.account
}

const checkTransactionPasswordSame = () => {
  validationStatus.transactionPasswordSame =
    signupData.value.transactionPassword === verifyTransactionPassword.value
}

const showPhoneValid = computed(() => {
  if (signupData.value.countryCode == '+886') {
    return true
  } else {
    return false
  }
})

const checkPhoneValid = () => {
  const regex = /^09\d{8}$/
  if (signupData.value.countryCode == '+886') {
    validationStatus.phoneValid = regex.test(signupData.value.mobile)
  } else {
    validationStatus.phoneValid = !!signupData.value.mobile
  }
}

const checkHepler = async (data) => {
  recaptchaCheckFunction.value = data
}
// methods
const showPassword = (type: boolean) => {
  passwordEyes.value = type
}
const showTranscationPassword = (type: boolean) => {
  tPasswordEyes.value = type
}

const handleRegisterClick = () => {
  console.log('Button clicked, isFormValid:', isFormValid.value)
  if (isFormValid.value) {
    goRegister()
  }
}

const goRegister = async () => {
  console.log('goRegister')
  // if (!isChecked.value) {
  //   ElNotification({
  //     title: `${t('請勾選同意條款')}`,
  //     type: 'error',
  //     duration: 1000,
  //     showClose: false
  //   })
  //   return
  // }
  const recaptchaCheck = await recaptchaCheckFunction.value.validate(
    recaptchaCode.value
  )
  if (!recaptchaCheck) {
    ElMessage({
      message: `${t('驗證碼錯誤')}`,
      type: 'error',
      showClose: false
    })
  } else {
    const signupRes = await signup(signupData.value)
    console.log('signupRes', signupRes)
    if (signupRes.success) {
      referrerCodeCookiee.value = ''
      navigateTo('/')
    }
  }
}

const { isLogin } = useAuthStore()
await useAsyncData(async () => {
  if (!router.currentRoute.value.name.includes('model')) {
    if (isLogin()) {
      navigateTo('/')
    }
  }
  if (router.currentRoute.value.query.referrer) {
    signupData.value.referrerCode = router.currentRoute.value.query.referrer
  } else if (referrerCodeCookiee.value) {
    signupData.value.referrerCode = referrerCodeCookiee.value
  }
})

await onMounted(() => {
  showReferrerInput.value = !!(
    router.currentRoute.value.query.referrer || referrerCodeCookiee.value
  )
})
</script>

<template>
  <div class="register">
    <!-- <div class="logo">
      <img :src="siteStore?.siteData.logo" />
    </div> -->
    <client-only>
      <div class="login-bnr">
        <div class="overlay">
          <div class="info-form">
            <h4>歡迎您一同共創未來</h4>
            <h1>揭示癌症的藏身之處</h1>
            <p>我們不是只看趨勢，而是看見需求，<br>
              AI設備不只用於診斷，更能累積大量數據，<br>
              未來將成為預測疾病，提前介入抗癌的關鍵</p>
            <div class="login-check">
              <a @click="
                () => {
                  navigateTo('/')
                }
              "><label class="checkbox">返回首頁</label></a>
            </div>
          </div>
        </div>
      </div>
      <div class="register-card">
        <div class="bg-temp">
          <h1 style="font-weight: bold">申請帳戶</h1>
          <br>
          <!--<img src="../static/picture/logo01.png" alt="" style="width: 200px;padding-bottom: 15px;">-->
          <span class="login-p">
            歡迎您的加入…與我們一起揭示癌症的藏身之處。
          </span>
          <br>
          <br>
          <div class="form">
            <div class="form-container">
              <div class="form-left">
                <!-- <div v-if="showReferrerInput" class="form-item">
                  <div class="form-title">
                    {{ $lang('推薦碼') }}
                  </div>
                  <div class="form-main">
                    <div class="form-input">
                      <input v-model="signupData.referrerCode" v-trim-input type="text" class="input_style"
                        :readonly="router.currentRoute.value.query.referrer" />
                    </div>
                  </div>
                </div> -->
                <div class="form-item" :class="{
                  active: focusItem === 'account'
                }">
                  <div class="form-title">
                    {{ $lang('輸入帳號') }}
                  </div>
                  <div class="form-main">
                    <div class="form-input">
                      <input v-model="signupData.account" v-trim-input type="text" class="input_style"
                        @input="validateAccount" @copy.prevent @paste.prevent @contextmenu.prevent />
                    </div>
                    <div class="tips">
                      <div :class="validationStatus.accountValid
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="validationStatus.accountValid">
                          <i class="fas fa-check"></i>
                        </span>
                        <!-- {{ $lang('需使用4-20位英文或數字') }} -->
                        {{ $lang('至少需使用4位以上數字') }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-item" :class="{
                  active: focusItem === 'password'
                }">
                  <div class="form-title">
                    {{ $lang('輸入密碼') }}
                  </div>
                  <div class="form-main">
                    <div class="form-input">
                      <input v-model="signupData.password" v-trim-input :type="passwordEyes ? 'text' : 'password'"
                        class="input_style" @input="checkPasswordRequired" @copy.prevent @paste.prevent
                        @contextmenu.prevent />
                      <span v-if="!passwordEyes" class="eyes" @click="showPassword(true)">
                        <i class="fa-regular fa-eye-slash"></i>
                      </span>
                      <span v-else class="eyes" @click="showPassword(false)">
                        <i class="fa-regular fa-eye"></i>
                      </span>
                    </div>
                    <div class="tips">
                      <div :class="validationStatus.passwordValid
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="validationStatus.passwordValid">
                          <i class="fas fa-check"></i>
                        </span>
                        <!-- {{ $lang('需混合使用 3 個字元以上的大小寫英文或數字') }} -->
                        {{ $lang('需使用3位以上數字') }}
                      </div>
                      <div v-if="signupData.password" :class="signupData.password !== signupData.account
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="signupData.password !== signupData.account">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('登入密碼不可與帳號相同') }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-item" :class="{
                  active: focusItem === 'verifyPassword'
                }">
                  <div class="form-title">
                    {{ $lang('再次輸入密碼') }}
                  </div>
                  <div class="form-main">
                    <div class="form-input">
                      <input ref="passwordSameRef" v-model="verifyPassword" v-trim-input
                        :type="passwordEyes ? 'text' : 'password'" class="input_style" @input="checkPasswordSame"
                        @copy.prevent @paste.prevent @contextmenu.prevent />
                      <span v-if="!passwordEyes" class="eyes" @click="showPassword(true)">
                        <i class="fa-regular fa-eye-slash"></i>
                      </span>
                      <span v-else class="eyes" @click="showPassword(false)">
                        <i class="fa-regular fa-eye"></i>
                      </span>
                    </div>
                    <div class="tips">
                      <div v-if="verifyPassword">
                        <div v-if="validationStatus.passwordSame" class="valid-feedback">
                          <i class="fas fa-check"></i> {{ $lang('確認相同') }}
                        </div>
                        <div v-else class="invalid-feedback">
                          <i class="fas fa-times"></i>
                          {{ $lang('與登入密碼不相同') }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="siteStore.siteData.transactionPasswordRequired" class="form-item">
                  <div class="form-title">
                    {{ $lang('提款密碼') }}
                  </div>
                  <div class="form-main">
                    <div class="form-input">
                      <input ref="transactionPasswordRef" v-model="signupData.transactionPassword" v-trim-input
                        :type="tPasswordEyes ? 'text' : 'password'" class="input_style"
                        @input="checkTransactionPasswordRequired" @copy.prevent @paste.prevent @contextmenu.prevent />
                      <span v-if="!passwordEyes" class="eyes" @click="showPassword(true)">
                        <i class="fa-regular fa-eye-slash"></i>
                      </span>
                      <span v-else class="eyes" @click="showPassword(false)">
                        <i class="fa-regular fa-eye"></i>
                      </span>
                    </div>
                    <div class="tips">
                      <div :class="validationStatus.transactionPasswordValid
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="validationStatus.transactionPasswordValid">
                          <i class="fas fa-check"></i>
                        </span>
                        <!-- {{ $lang('需混合使用 3 個字元以上的大小寫英文或數字') }} -->
                        {{ $lang('需使用3位以上數字') }}
                      </div>
                      <div v-if="signupData.transactionPassword" :class="!validationStatus.transactionPasswordSameWithPassword
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="
                          !validationStatus.transactionPasswordSameWithPassword
                        ">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('交易密碼不可與登入密碼,帳號相同') }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-right">
                <div v-if="siteStore.siteData.transactionPasswordRequired" class="form-item">
                  <div class="form-title">
                    {{ $lang('交易密碼確認') }}
                  </div>
                  <div class="form-main">
                    <div class="form-input">
                      <input ref="transactionPasswordSameRef" v-model="verifyTransactionPassword" v-trim-input
                        :type="tPasswordEyes ? 'text' : 'password'" class="input_style"
                        @input="checkTransactionPasswordSame" @copy.prevent @paste.prevent @contextmenu.prevent />
                      <span v-if="!passwordEyes" class="eyes" @click="showPassword(true)">
                        <i class="fa-regular fa-eye-slash"></i>
                      </span>
                      <span v-else class="eyes" @click="showPassword(false)">
                        <i class="fa-regular fa-eye"></i>
                      </span>
                    </div>
                    <div class="tips">
                      <div v-if="verifyTransactionPassword">
                        <div v-if="validationStatus.transactionPasswordSame" class="valid-feedback">
                          <i class="fas fa-check"></i> {{ $lang('確認相同') }}
                        </div>
                        <div v-else class="invalid-feedback">
                          <i class="fas fa-times"></i>
                          {{ $lang('與交易密碼不相同') }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-item" :class="{
                  active: focusItem === 'username'
                }">
                  <div class="form-title">
                    {{ $lang('輸入姓名') }}
                  </div>
                  <div class="form-main">
                    <div class="form-input">
                      <input v-model="signupData.username" v-trim-input type="text" class="input_style" />
                    </div>
                    <div class="tips">
                      <div ref="usernameRef" :class="signupData.username
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="signupData.username">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('必填') }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-item code" :class="{
                  active: focusItem === 'phoneCode'
                }">
                  <div class="form-title">
                    {{ $lang('輸入電話') }}
                  </div>
                  <div class="form-main">
                    <div class="form-input">
                      <!-- <select v-model="signupData.countryCode" @change="checkPhoneValid">
                        <option v-for="item in siteStore.siteData.localsOptions" :key="item">
                          {{ item }}
                        </option>
                      </select> -->
                      <input v-model="signupData.mobile" v-trim-input type="text" class="input_style"
                        @input="checkPhoneValid" />
                    </div>
                    <div class="tips">
                      <div v-if="showPhoneValid" :class="validationStatus.phoneValid
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="validationStatus.phoneValid">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('手機號碼開頭須為09，共10碼') }}
                      </div>
                      <div ref="mobileRef" :class="signupData.mobile
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="signupData.mobile">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('必填') }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-item code" :class="{
                  active: focusItem === 'socialPlatform'
                }">
                  <div class="form-title">
                    {{ $lang('輸入電子郵件（必填）') }}
                  </div>
                  <div class="form-main">
                    <div class="form-input">
                      <!-- <select v-model="signupData.socialPlatform">
                        <option v-for="item in siteStore.siteData.socialOptions" :key="item">
                          {{ item }}
                        </option>
                      </select> -->
                      <input v-model="signupData.socialId" v-trim-input type="text"
                        @focus="focusItem = 'socialPlatform'" @focusout="focusItem = ''" />
                    </div>
                    <div class="tips">
                      <div ref="socialIdRef" :class="signupData.socialId ? 'valid-feedback' : 'invalid-feedback'
                        ">
                        <span v-if="signupData.socialId">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('必填') }}
                      </div>
                    </div>
                  </div>
                </div>
                <br>
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
                <div class="form-item auth" :class="{
                  active: focusItem === 'recaptcha'
                }">
                  <div class="form-main">
                    <div class="form-input">
                      <input v-model="recaptchaCode" v-trim-input type="text" placeholder="請輸入驗證碼"
                        @keyup.enter="setregister" @focus="focusItem = 'recaptcha'" @focusout="focusItem = ''" />
                    </div>
                  </div>
                </div>
                <div class="form-input">
                  <input type="submit" value="注冊帳戶" @click="handleRegisterClick" :class="{ disabled: !isFormValid }" />
                  <input type="submit" class="submit2" value="已有帳戶" @click="navigateTo('/login')">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<style scoped lang="sass">
.logo
  position: absolute
  top: 5px
  left: 5px
  width: 100px

  @media (min-width: 768px)
    display: none

  img
    width: 100%

.register
  width: 100%
  position: relative
  overflow-y: auto
  display: flex
  @media (max-width: 1080px)
    .login-bnr
      width: 60% !important
    &-card
      width: 40% !important
  @media (max-width: 768px)
    flex-direction: column
    .login-bnr
      width: 100% !important
    &-card
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
  &-card
    width: 30%
    
    // border-radius: 20px
    background-color: rgba(255, 255, 255)
    // , 0.8
    padding: 30px 30px 60px
    .bg-temp
      width: 100%
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


  &-title
    // font-size: 30px
    // color: #c8a375
    // font-weight: bold
    margin-bottom: 35px
    text-align: center
    font-size: 26px
    font-weight: 500
    color: #37588B
    margin: 10px 0px 35px 0px
    @media (min-width: 768px)
      font-size: 42px
      margin-bottom: 55px
</style>

<style scoped lang="sass">
.form
  &-container
    @media (min-width: 768px)
      gap: 35px
      max-width: 100%
      margin: 0 auto
    .submit2
      background: #001b92 !important
      color: #fff
      &:hover
        background: #3082a8 !important

    .form-input input
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
        color: #fff !important
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
  
    &.auth
      .form-input
        position: relative
        input
          padding-left: 120px

        span
          right: none
          left: 15px
          pointer-events: none

    &.code
      .form-input
        input
          padding-left: 120px
        select
          position: absolute
          top: 50%
          left: 15px
          transform: translateY(-50%)
          z-index: 10
          padding: 5px 0
          border: 1px solid #666666
          color: #666666 !important

    @media (min-width: 768px)
      // max-width: 330px
      margin: 0 auto 5px

    &.active
      color: #c8a375
      .form-input
        input
          border-color: #c8a375 !important
        span
          color: #c8a375


  &-title
    font-size: 16px
    transition: all 0.3s

    @media (min-width: 768px)
      font-size: 18px

  &-btns
    display: flex
    justify-content: center
    align-items: center
    gap: 20px
    margin-bottom: 40px

    button
      width: 30%
      background: #37588B
      color: #FFF
      border: none
      font-size: 23px
      font-weight: 400
      padding: 10px 0px
      cursor: pointer
      outline: none
      transition: all 0.3s

      &:hover
        opacity: 0.8

      &.login-btn
        //background-color: #c8a375
        border: solid 1px #fff
      &.register-btn
        background-color: #eee
        color: #666

  &-input
    position: relative

    input
      width: 100%
      font-size: 17px
      font-weight: bold
      color: #000
      padding: 15px 10px 15px 13px
      display: block
      border: 1px solid #8b8b8b
      outline: none
      margin: 0 auto 20px
      outline: 0

      transition: all 0.3s

    span
      position: absolute
      right: 15px
      top: 50%
      transform: translateY(-50%)
      color: #666666
      font-size: 20px
      transition: all 0.3s

    @media (min-width: 768px)
      input
        font-size: 17px
        font-weight: bold
        color: #000
        padding: 15px 10px 15px 13px
        display: block
        border: 1px solid #8b8b8b
        outline: none
        margin: 0 auto 5px
        -webkit-appearance: none

  &-agree
    display: flex
    margin-bottom: 40px
    margin-top: 30px

    .inputCheck
      display: inline
      input
        margin-right: 10px

    .text
      font-size: 14px
      color: #666666

    @media (min-width: 768px)
      width: 85%
      margin: 45px auto

      .text
        font-size: 16px
        text-align: center
</style>
<style scoped lang="sass">
.tips
  width: 100%
  font-size: 12px
  color: red
</style>
<style scoped lang="sass">
.valid-feedback
  width: 100%
  color: green
  text-align: right
  font-size: 12px
  @media screen and (max-width: 768px)
    font-size: 10px

.invalid-feedback
  width: 100%
  color: #cf0000
  text-align: right
  font-size: 12px
  @media screen and (max-width: 768px)
    font-size: 10px
.btn-submit
  background: #37588B
  &.disabled
    background: #37588B
    cursor: not-allowed
    &:hover
      background: #37588B77
</style>
