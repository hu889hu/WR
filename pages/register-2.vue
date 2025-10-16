<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const referrerCodeCookiee = useCookie('referrerCode') as any
const siteStore = useSiteStore()
const focusItem = ref('')
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
  if (!isChecked.value) {
    ElNotification({
      title: `${t('請勾選同意條款')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
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
  <div class="bg-temp">
    <div class="login">
      <div class="login-main">
        <div class="login-top">
          <!-- <h1 style="font-weight: bold;">職員專區</h1> -->
          <h1 style="font-weight: bold;">注冊</h1>
          <!--<img src="../static/picture/logo01.png" alt="" style="width: 200px;padding-bottom: 15px;">-->
          <!-- <h3 style="font-weight: bold;"><span
              style="background-color: #FFF;padding: 0 10px;position: relative;z-index: 3;">注冊</span></h3> -->
          <div class="form">
            <h3 style="font-weight: bold;"><span
                style="background-color: #FFF;padding: 0 10px;position: relative;z-index: 3;">帳號</span></h3>
            <input v-model="signupData.account" v-trim-input type="text" class="input_style" @input="validateAccount"
              @copy.prevent @paste.prevent @contextmenu.prevent placeholder="請輸入帳號" />
            <h3 style="font-weight: bold;"><span
                style="background-color: #FFF;padding: 0 10px;position: relative;z-index: 3;">密碼</span></h3>
            <input v-model="signupData.password" v-trim-input :type="passwordEyes ? 'text' : 'password'"
              class="input_style" @input="checkPasswordRequired" @copy.prevent @paste.prevent @contextmenu.prevent
              placeholder="請輸入密碼" />
            <input ref="passwordSameRef" v-model="verifyPassword" v-trim-input
              :type="passwordEyes ? 'text' : 'password'" class="input_style" @input="checkPasswordSame" @copy.prevent
              @paste.prevent @contextmenu.prevent placeholder="確認密碼" />
            <!-- <br> -->
            <h3 style="font-weight: bold;"><span
                style="background-color: #FFF;padding: 0 10px;position: relative;z-index: 3;">提款密碼</span></h3>
            <input ref="transactionPasswordRef" v-model="signupData.transactionPassword" v-trim-input
              :type="tPasswordEyes ? 'text' : 'password'" class="input_style" @input="checkTransactionPasswordRequired"
              @copy.prevent @paste.prevent @contextmenu.prevent placeholder="提款密碼" />
            <input ref="transactionPasswordSameRef" v-model="verifyTransactionPassword" v-trim-input
              :type="tPasswordEyes ? 'text' : 'password'" class="input_style" @input="checkTransactionPasswordSame"
              @copy.prevent @paste.prevent @contextmenu.prevent placeholder="確認提款密碼" />
            <h3 style="font-weight: bold;"><span
                style="background-color: #FFF;padding: 0 10px;position: relative;z-index: 3;">手機號碼</span></h3>
            <div class="form-input">
              <select v-model="signupData.countryCode" @change="checkPhoneValid">
                <option v-for="item in siteStore.siteData.localsOptions" :key="item">
                  {{ item }}
                </option>
              </select>
              <input v-model="signupData.mobile" v-trim-input :placeholder="t('用於接收簡訊')" type="tel" class="input_style"
                style="width: auto; flex: 1;" @input="checkPhoneValid" />
            </div>

            <!-- 驗證碼圖片 -->
            <recaptcha @check-hepler="checkHepler"
              style="cursor: pointer; width: 152px;  border: 1px solid #ccc;margin: 0 auto 20px;"></recaptcha>
            <input v-model="recaptchaCode" v-trim-input type="text" @keyup.enter="setregister"
              @focus="focusItem = 'recaptcha'" @focusout="focusItem = ''" placeholder="請輸入驗證碼" />
            <input type="submit" value="確認" @click="handleRegisterClick">
            <input type="submit" value="取消" @click="navigateTo('/register')"
              style="margin-top: 24px;background-color: #696969;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.bg-temp
  background: url('@/assets/image/index/login-banner.jpg') no-repeat
  background-size: cover
  padding: 70px 0px 70px 0px
  min-height: 900px
  font-size: 100%
  margin: 0

  .login
    width: 40%
    background: #fff
    margin: 0 auto
    min-height: 400px
    padding: 10px
    @media screen and (max-width: 1440px)
      width: 60%

    @media screen and (max-width: 960px)
      width: 90%
  .login-main
    border: 2px solid #7397D1
    min-height: 400px

  .login-top
    padding: 45px 0px
    text-align: center
    position: relative

  h1
    font-size: 26px
    font-weight: 500
    color: #37588B
    margin: 10px 0px 35px 0px

  h3
    font-size: 19px
    font-weight: 400
    color: #8E8E8E
    margin: 0px 0px 16px 0px
    position: relative
    width: 55%
    margin: 0 auto
    &:before
      width: 135px
      height: 1px
      background: #8e8e8e
      position: absolute
      top: 50%
      left: 0%
      z-index: 1
      content: ''

    &:after
      width: 135px
      height: 1px
      background: #8e8e8e
      position: absolute
      top: 50%
      right: 0%
      z-index: 1
      content: ''

  .form
    margin: 0
    padding: 0
    border: 0
    font-size: 100%
    font: inherit
    vertical-align: baseline

  .login-top input
    &[type="text"]
      font-size: 17px
      font-weight: bold
      color: #000
      padding: 15px 10px 15px 13px
      width: 55%
      display: block
      border: 1px solid #8b8b8b
      outline: none
      margin: 0 auto 20px
      -webkit-appearance: none

    &[type="password"]
      font-size: 17px
      font-weight: bold
      color: #000
      padding: 15px 10px 15px 13px
      width: 55%
      display: block
      border: 1px solid #8b8b8b
      margin: 0 auto 20px 
      outline: none
      -webkit-appearance: none

    &[type="submit"]
      background: #37588B
      color: #FFF
      border: none
      font-size: 23px
      font-weight: 400
      padding: 10px 0px
      width: 62%
      cursor: pointer
      outline: none

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
.form-input
  display: flex
  align-items: center

  width: 55%
  font-size: 17px
  font-weight: bold
  color: #000
  padding: 15px 10px 15px 13px
  width: 55%
  border: 1px solid #8b8b8b
  outline: none
  margin: 30px auto 20px
  -webkit-appearance: none
  select
    outline: none
  input
    margin: 0
    border: none
    outline: none
@media screen and (max-width: 768px)
  .bg-temp .login-top input, .form-input
    width: 80% !important
</style>
