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
        <h1 v-scroll-animate="{ type: 'fade-up' }">風險評估</h1>
        <h2 v-scroll-animate="{ type: 'fade-up' }" class="delay-100">讓我們搶先在癌症來臨之前</h2>
        <p v-scroll-animate="{ type: 'fade-up' }" class="delay-200">風險分析的進步使放射科醫生能夠提供更個人化的篩檢計劃</p>
      </div>
    </section>
    <section class="measurement-cont2">
      <div class="text">
        <h1 v-scroll-animate="{ type: 'fade-up' }">好<span style="color: #f077a0;">還要</span>更好</h1>
        <h2 v-scroll-animate="{ type: 'fade-up' }" class="delay-100">
          ProFound AI Risk 的準確度是傳統模型的 2.4 倍。
        </h2>
      </div>
      <div class="cont-flex">
        <div class="flex-txt">
          <h5>傳統乳房X光檢查</h5>
          <p>
            透過傳統的乳房X光檢查，死亡風險可降低25-40％。
          </p>
          <p>
            然而，這種減少只有在癌症早期發現的情況下才會發生，而40%的癌症在晚期才被發現。在所有癌症中，有10%到15%是在兩次乳房X光檢查之間發現的，而這些檢查要么在之前的乳房X光檢查中被完全遺漏，要么被掩蓋了。
          </p>
        </div>
        <div class="flex-txt">
          <h5>傳統風險評估</h5>
          <p>
            當放射科醫師將傳統模式和臨床指引應用於乳癌終身風險評分為 20% 以上的患者時，他們通常會建議進行 MRI 補充篩檢。
          </p>
          <p>
            然而，由於特異性和敏感性等鑑別能力較低或中等，檢測結果往往存在大量假陽性。患者理應獲得更好的解決方案。
          </p>
        </div>
      </div>
      <div class="cont-bnr-bg">
        <div class="box">
          <h2>ProFound AI Risk 改變了風險評估的遊戲規則</h2>
          <p>ProFound AI Risk 使用新模型來預測年度乳房 X 光檢查期間的乳癌風險。透過評估患者和掃描影像中的多個數據點，它可以計算出更準確的乳癌短期風險評分。</p>
          <br>
          <p>結果如何？對於風險評分較高的女性，它可以識別出即使發現陰性或良性結果，仍可能受益於補充篩檢或個人化篩檢間隔的女性。 ProFound AI Risk
            是放射科醫師的警覺夥伴和值得信賴的盟友，能夠在癌症發生前將其暴露。
          </p>
        </div>
      </div>
    </section>
    <section class="measurement-cont3">
      <div class="cont3">
        <div class="text">
          <h1 v-scroll-animate="{ type: 'fade-up' }">
            <span class="featured-text"><span style="color: #f077a0;">臨床結果認證</span> 新技術的有效率</span>
          </h1>
          <p class="paragraph" v-scroll-animate="{ type: 'fade-up' }">
            與現有模型相比，ProFound AI Risk 提供業界最高的 AUC，可根據 2D 或 3D 篩檢乳房 X 光照片提供一年未來風險評估
          </p>
        </div>
        <div class="cont-img">
          <div class="img-b">
            <img src="@/assets/image/index/risk1.png" alt="" />
          </div>
        </div>
        <h3 style="text-align: center;">傳統風險模型與 ProFound AI Risk 在 2D 和 3D 乳房鉬靶 X 光攝影中的相對 AUC 表現對比。不確定性以 95% 信賴區間的上下限表示。
        </h3>

        <div class="text">
          <h1 v-scroll-animate="{ type: 'fade-up' }">早期檢測的結果?
            <span class="featured-text"><span style="color: #f077a0;">獲得新生</span></span>
          </h1>
          <h2 v-scroll-animate="{ type: 'fade-up' }" class="delay-100">
            當臨床醫生根據患者的風險評分實施更積極主動的篩檢計劃時，他們更有可能發現侵襲性癌症和間期癌症。
          </h2>
        </div>
      </div>
    </section>
    <section class="measurement-cont4">
      <div class="cont-flex2">
        <div class="cont-item">
          <div class="item-box">
            <h1>如何準確的<span style="color:#f077a0">風險評估</span></h1>
            <div class="items">
              <div class="item">
                <img src="@/assets/image/index/item05.png" alt="">
                <div>
                  <h3>臨床結果</h3>
                  <p>
                    臨床結果
                    ProFound AI Risk 提供了易於理解的風險評分，可告知放射科醫師建議更頻繁或補充篩檢，從而幫助避免間歇性癌症。
                  </p>
                </div>
              </div>
              <div class="item">
                <img src="@/assets/image/index/item02.png" alt="">
                <div>
                  <h3>人工智慧</h3>
                  <p>
                    數百萬張來自全球的、經過驗證的影像可以為臨床醫生提供患者乳癌風險評分的資訊。
                  </p>
                </div>
              </div>
              <div class="item">
                <img src="@/assets/image/index/item06.png" alt="">
                <div>
                  <h3>標準且一致</h3>
                  <p>
                    與 BI-RADS 乳房組織密度類別一致，並滿足放射科醫師之間標準化評估的臨床需求。
                  </p>
                </div>
              </div>
              <div class="item">
                <img src="@/assets/image/index/item04.png" alt="">
                <div>
                  <h3>專業技術經驗</h3>
                  <p>
                    各領域專業技術集結於此，提供最有效率的技術
                  </p>
                </div>
              </div>
            </div>
            <h2>我們攜手共進<span style="color:#f077a0">擁抱更好的未來</span></h2>
          </div>
        </div>
        <div class="cont-img">
          <div class="img-b">
            <img img src="@/assets/image/index/risk2.jpg" alt=""></img>
          </div>
        </div>
      </div>
    </section>
    <div class="cont-bnr-bg" style="background-color: #363636;margin: 80px auto;">
      <div class="box">
        <h2>風險因素，重新構想</h2>
        <p>2D 或 3D X 光檢查中的觀察結果:
          <br>
          年齡/密度/乳房特徵，如微鈣化、組織腫塊以及左右乳房不對稱等
        </p>
        <br>
        <p>並將其與以下內容進行比較:
          <br>
          包含全球不同（15 個國家）發病率和死亡率參考表的資料庫，用於與該國一般人口保持一致，遵循臨床相關的全球篩檢指南。
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
    transform: scale(1.1)
  
  // 三张图片，使用animation-delay控制出现时间
  .slide-1
    background-image: url('@/assets/image/index/cancer-1.jfif')
    animation-name: slideAnimation
    animation-delay: 0s
  
  .slide-2
    background-image: url('@/assets/image/index/cancer-2.jfif')
    animation-name: slideAnimation
    animation-delay: 4s  // 第一张开始4秒后第二张出现
  
  .slide-3
    background-image: url('@/assets/image/index/cancer-3.jfif')
    animation-name: slideAnimation
    animation-delay: 8s  // 第二张开始4秒后第三张出现
  @keyframes slideAnimation
    0%
      opacity: 0
      transform: scale(1.1)
      z-index: 1
    10%
      opacity: 0.7
      z-index: 1
    20%
      opacity: 1
      transform: scale(1)
      z-index: 1
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
      transform: scale(1)
      z-index: 0
.measurement-cont2
  padding: 80px 0
  .text
    color: #060922
    margin-bottom: 48px
    h1,h2
      text-align: center
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
  padding: 48px 0 80px
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
        font-size: 40px
        font-weight: 700
      h2
        font-size: 25px
        font-weight: 600
        
      p
        padding-left: 10px
        text-align: left !important
    .cont-img
      width: 83.33333333%
      margin: 0 auto
      position: relative
      height: 500px
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
    font-weight: 600
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
</style>
