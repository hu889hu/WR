<script lang="ts" setup>
import anime from '~/assets/js/anime.es.js'
const botnum1 = ref(0)
const botnum2 = ref(0)
onMounted(() => {
  anime({
    targets: botnum1,
    value: 22,
    duration: 1000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum2,
    value: 18,
    duration: 1000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
})
</script>
<template>
  <main class="measurement">
    <section class="measurement-cont1">
      <div class="slide slide-1"></div>
      <div class="slide slide-2"></div>
      <div class="slide slide-3"></div>
      <div class="text">
        <h1 v-scroll-animate="{ type: 'fade-up' }">血液酒精濃度評估</h1>
        <h2 v-scroll-animate="{ type: 'fade-up' }" class="delay-100">時刻警惕你的心血管健康</h2>
        <p v-scroll-animate="{ type: 'fade-up' }" class="delay-200">通過單次的檢查可查出更多隱藏因子</p>
      </div>
    </section>
    <section class="measurement-cont2">
      <div class="text">
        <h1 v-scroll-animate="{ type: 'fade-up' }"><span style="color: #f077a0;">一次X光檢查</span> 可以知曉更多細節</h1>
        <p class="paragraph">
          臨床研究發現，乳房動脈血管鈣化與身體其他部位的鈣化有相關性，引發了人們對心血管健康問題的擔憂。<br>
          透過我們的BAC評估解決方案，可以識別和測量動脈鈣化的存在和程度與其它隱藏因子。
        </p>
      </div>
    </section>
    <section class="measurement-cont3">
      <div class="cont3">
        <div class="cont-img">
          <div class="img-b">
            <img src="@/assets/image/index/bac1.jpg" alt="" />
          </div>
        </div>
        <div class="text">
          <h1 v-scroll-animate="{ type: 'fade-up' }">
            <span class="featured-text"><span style="color: #f077a0;">VeraLook®</span>結腸息肉檢測</span>
          </h1>
          <h2>自動識別並突出顯示 CTC 影像中的息肉，使解讀醫生能夠更快、更輕鬆地為患者制定個人化的健康計劃。</h2>
          <h1 style="color: #f077a0;">大腸直腸癌</h1>
          <h2>大腸直腸癌是男性和女性中第三大常見癌症，也是第三大癌症死亡原因。</h2>
          <h2>在過去十年中，大腸直腸癌已成為最可預防的常見癌症之一。事實證明，在現有工作流程中添加 AI 驅動的解決方案可以進一步改善治療效果。</h2>
        </div>
      </div>
    </section>
    <div class="cont-bnr-bg" style="background-color: #363636;margin: 0px auto 100px;">
      <div class="box">
        <h2>無縫整合，技術支持</h2>
        <p>使用我們的結腸健康解決方案來識別結腸息肉的醫生發現：
        </p>
        <br>
        <p>
          ●在閱讀過程中更容易檢測 <br>
          ●無縫整合到現有的專業 CTC 讀取環境 <br>
          ●提高檢測準確性和一致性 <br>
          ●透過工作流程效率和簡化的閱讀流程提高生產力
        </p>
      </div>
    </div>
  </main>
</template>
<style scoped lang="sass">
.measurement
  background-color: #fff
  color: #060922
  overflow: hidden
.measurement-cont1
  position: relative
  overflow: hidden
  padding: 120px 0px
  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(6, 9, 34, 0.5)
    z-index: 2
  .text
    position: relative
    z-index: 3
    padding: 64px 12px
    h1,h2,p
      font-weight: 700
      text-align: center
      margin-bottom: 16px
    h1
      font-size: 80px
      color: #fff
    h2
      font-size: 30px
      color: #70c6ff
    p
      font-size: 20px
      color: rgb(255, 202, 158)

  // 背景動畫
  .slide
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    opacity: 0
    background-size: cover
    background-position: center
    animation-duration: 12s  // 每张图片动画时长
    animation-timing-function: ease-in-out
    animation-iteration-count: infinite
    transform: scale(1.6)
  
  // 三张图片，使用animation-delay控制出现时间
  .slide-1
    background-image: url('@/assets/image/index/cancer-4.jfif')
    animation-name: slideAnimation
    animation-delay: 0s
  
  .slide-2
    background-image: url('@/assets/image/index/cancer-5.jfif')
    animation-name: slideAnimation
    animation-delay: 4s  // 第一张开始4秒后第二张出现
  
  .slide-3
    background-image: url('@/assets/image/index/cancer-3.jfif')
    animation-name: slideAnimation
    animation-delay: 8s  // 第二张开始4秒后第三张出现
  @keyframes slideAnimation
    0%
      opacity: 0
      transform: scale(1.6)
      z-index: 2
    10%
      opacity: 0.7
      z-index: 2
    70%
      opacity: 1
      transform: scale(1)
      z-index: 1
    80%
      opacity: 1
      transform: scale(1)
      z-index: 1
    90%
      opacity: 0
      transform: scale(1)
      z-index: 0
    100%
      opacity: 0
      transform: scale(1.5)
      z-index: 0
.measurement-cont2
  padding: 80px 0 0
  .text
    color: #060922
    width: 1320px
    margin: 0 auto 48px
    max-width: 100%
    padding: 0 12px
    h1,h2
      text-align: left
    h1
      font-size: 40px
      font-weight: 700
    h2
      font-size: 25px
      font-weight: 600

.cont-flex
  padding: 0 12px
  width: 1320px
  margin: 0 auto
  max-width: 100%
  display: flex
  .flex-txt
    flex: 1
    padding: 48px 32px
    h1
      font-size: 48px
      font-weight: 700
      margin-bottom: 25px
    h5
      font-size: 24px
      font-weight: 700
      margin-bottom: 10px
      transition: all 0.3s ease-in-out
      &:hover
        color: #f077a0
    h3
      font-size: 1.25rem
      font-weight: 600
      color: #f077a0
      margin-bottom: 10px
    p
      padding-bottom: 15px
    .menu-items
      display: flex
      flex-direction: column
      align-items: flex-start
      .info-content
        // margin-bottom: 20px
        font-weight: 600
        h2.title
          margin-bottom: 8px
          font-size: 60px
          color: #f077a0
          .featured-text
            line-height: 40px
        p.info-title
          margin-bottom: 12px
          font-size: 24px
  .flex-img
    position: relative
    flex: 1
    padding: 48px 32px 48px 12px
    .banner-end
      position: absolute
      top: 0
      right: 0
      min-width: 100px
      min-height: 250px
      z-index: 1
      background: #f077a0
      padding: 1rem
      display: flex
      top: 0
      left: auto
      bottom: auto
      flex-direction: column
      justify-content: center
      align-items: center
      color: #fff
      .number
        font-size: 100px
        font-weight: 700
      .banner-text
        font-size: 1.25rem
        font-weight: 500
        text-transform: capitalize
    .right-img
      position: relative
      height: 100%

.measurement-cont3
  padding: 20px 0 80px
  .cont3
    padding: 0 12px
    width: 1320px
    margin: 0 auto
    max-width: 100%
    hr
      margin: 48px auto
    .text
      margin: 50px auto 0
      text-align: center
      h1
        font-size: 35px
        font-weight: 700
      h2
        font-size: 20px
        
      p
        padding-left: 10px
        text-align: left !important
    .cont-img
      width: 83.33333333%
      margin: 0 auto
      position: relative
      height: 400px
      .img-b
        img
          transform: translate3d(0px, 0px, 0px) scale(1)

.measurement-cont4
  padding: 48px 0
.cont-flex2
  max-width: 100%
  display: flex
  justify-content: center
  background-color: rgba(25, 65, 125)
  .cont-item
    flex: 1
    padding: 0 12px
    color: #fff
    .item-box
      padding: 10rem 4rem
      width: 100%
      @media (min-width: 1920px)
        max-width: 950px
        margin: 0 auto
      h1
        font-size: 48px
        font-weight: bold
      h2
        font-size: 32px
        font-weight: bold
      .items
        display: grid
        grid-template-columns: repeat(2, 1fr)
        grid-gap: 2rem
        margin: 20px 0
        .item
          display: flex
          align-items: flex-start
          img
            vertical-align: middle
            overflow-clip-margin: content-box
            overflow: clip
          h3
            font-size: 24px
            font-weight: 700
            margin-bottom: 10px
          p
            font-size: 16px
            padding-right: 30px
  .cont-img
    flex: 1
    position: relative
    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(25, 65, 125, 0.5)
      z-index: 1

    @media (min-width: 1920px)
      max-width: 950px
      margin: 0 auto
.measurement-cont5
  padding: 80px 0
  &>h1
    font-size: 35px
    font-weight: 700
    text-align: center
    margin-bottom: 48px
  hr
    margin: 24px auto
  .cont-flex3
    width: 1320px
    max-width: 100%
    margin: 0 auto
    padding: 0 12px
    .cont-bf
      display: flex
      align-items: center
      .bf-text
        flex: 1
        padding: 0 12px
        padding: 40px 20px 48px 32px
        ul
          padding: 32px 30px 32px 0
          li
            margin-bottom: 20px
            font-weight: 600
            h1
              font-size: 32px
              color: #f077a0
              margin-bottom: 8px
            p
              font-size: 24px
      .bf-img
        position: relative
        flex: 1
        margin: 25px 12px
        .img-box
          position: absolute
          top: 0
          right: 0
          width: 100%
          height: 100%
          img
            width: 350px
            transform: translateY(-50%)

.img-b
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  overflow: hidden
  text-align: center
  img
    margin: 0  auto
    transform: translate3d(0px, 2px, 0px) scale(1.3)
    will-change: transform
    transition: transform 1s cubic-bezier(0, 0, 0, 1)


.cont-bnr-bg
  width: 1320px
  max-width: 100%
  margin: 0 auto
  background: rgba(9, 87, 139)
  color: #fff
  padding: 20px
  .box
    width: 83.33333333%
    margin: 0 auto
    
    h2
      font-size: 30px
      
    p
      font-size: 18px

.paragraph
  margin-top: 40px
  margin-bottom: 40px
  font-weight: 500
  font-size: 1.1rem
  font-style: italic
  opacity: 0.85
  line-height: 1.7
  margin-bottom: 3rem
  padding: 0.5rem 0
  padding-left: 2rem
  border-left: 4px solid #f077a0

h4
  position: relative
  font-size: 1rem
  font-weight: 600
  font-style: italic
  letter-spacing: 1px
  text-align: left
  text-transform: uppercase
  display: block
  width: max-content
  margin-bottom: 0
  padding-left: 2rem
  padding-right: 2rem
  color: #e4a216
  z-index: 5
  &::after
    left: 0 !important
    right: auto !important
  &::before,&::after
    content: ""
    display: inline-block
    position: absolute
    width: 1.5rem
    height: 2px
    border-radius: 1rem
    top: 50%
    right: 0
    left: auto
    transform: translateY(-50%)
    background-color: #d69714


@media (max-width: 992px)
  .measurement
    .measurement-cont1
      .text
        padding: 20px 20px
        h1
          font-size: 50px
        h2
          font-size: 20px
        p
          font-size: 16px
    .measurement-cont2
      padding: 40px 20px
      .text
        padding: 0 
        h2
          margin-top: 10px
          font-size: 20px
      .cont-flex
        display: block
        padding: 0
        .flex-txt
          padding: 20px 0
        .flex-img
          padding: 0
          .img-b
            position: relative
        .banner-end
          right: -10px
          top: -10px
          min-width: 50px
          min-height: 125px
          .number
            font-size: 40px
          .banner-text
            font-size: .8rem
    .measurement-cont3
      padding: 40px 20px
      .cont3
        padding-inline: 0
        .text
          margin: 0
          width: 100%
        .cont-img
          width: 100%
          height: 100%
          .img-b
            position: relative
    .measurement-cont4
      .cont-flex2
        display: block
        .cont-img
          .img-b
            position: relative
        .cont-item
          .item-box
            padding: 40px 0
            h1
              font-size: 1.8rem
            .items
              display: block
              padding: 30px 0
              .item
                margin-bottom: 20px
    .measurement-cont5
      padding: 20px
      .cont-flex3
        padding: 0
        .cont-bf
          display: block
          .bf-text
            padding: 0
            ul
              padding: 20px 0
          .bf-img
            margin: 0
            .img-box
              position: relative
              img
                transform: translateY(0)
          .bf-text
            ul
              li
                h1
                  font-size: 20px
                p
                  font-size: 18px
  .cont-bnr-bg
    margin: 0 0 40px !important
    .box
      margin: 0
</style>
