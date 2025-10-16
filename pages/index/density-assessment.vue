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
        <h1 v-scroll-animate="{ type: 'fade-up' }">密度評估</h1>
        <h2 v-scroll-animate="{ type: 'fade-up' }" class="delay-100">讓我們更快速的發現癌症</h2>
        <p v-scroll-animate="{ type: 'fade-up' }" class="delay-200">供清晰度、信心和安心。我們的癌症檢測解決方案經過臨床驗證，可提高乳癌檢測率和放射科醫師的表現</p>
      </div>
    </section>
    <section class="measurement-cont2">
      <div class="text">
        <h1 v-scroll-animate="{ type: 'fade-up' }">檢測的<span style="color: #f077a0;">提升</span>已完成</h1>
        <h2 v-scroll-animate="{ type: 'fade-up' }" class="delay-100">癌症檢測產品採用最新的深度學習卷積神經網路構建，提供高性能、並發讀取、癌症檢測和工作流程解決方案。
        </h2>
      </div>
      <div class="cont-flex">
        <div class="flex-txt">
          <h4 v-scroll-animate="{ type: 'fade-up' }">聯絡我們</h4>
          <h1>深度檢測<span style="color: #f077a0;">V4</span></h1>
          <h5>FDA核准</h5>
          <p class="paragraph">這款新一代人工智慧解決方案採用先進的深度學習卷積神經網路 (CNN) 進行訓練，在癌症檢測和特異性方面取得了顯著進步，與上一代產品相比，受試者工作特徵曲線下面積 (AUC)
            提高了
            6.3%，顯著提高了對難以發現和侵襲性癌症的識別能力，同時降低了假陽性率。第四代產品為臨床醫生提供了一個選項，可以將先前檢查結果納入目前檢查的分析中。</p>
          <h3>可透過檢測發現最令人恐懼的隱藏癌症，同時減少假陽性</h3>
          <div class="menu-items">
            <div class="info-content">
              <h2 class="title"><span class="featured-text">{{ botnum1 }}%</span></h2>
              <h5 class="info-title">改善檢測難以發現的癌症</h5>
            </div>
            <div class="info-content">
              <h2 class="title"><span class="featured-text">{{ botnum2 }}%</span></h2>
              <h5 class="info-title">無痕跡病例的改善</h5>
            </div>
            <div class="info-content">
              <h2 class="title"><span class="featured-text">Priors</span></h2>
              <h5 class="info-title">納入當前的人工智慧分析</h5>
            </div>
          </div>
        </div>
        <div class="flex-img">
          <div class="banner-end">
            <span class="number">V4</span>
            <p class="banner-text">ProFound Detection V4</p>
          </div>
          <div class="right-img">
            <div class="img-b">
              <img src="@/assets/image/index/felx-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="measurement-cont3">
      <div class="cont3">
        <div class="text">
          <h1 v-scroll-animate="{ type: 'fade-up' }">
            <span class="featured-text"><span style="color: #f077a0;">ProFound AI®</span> 用於數位乳房斷層合成和二維乳房 X 光攝影</span>
          </h1>
          <p class="paragraph" v-scroll-animate="{ type: 'fade-up' }">
            經過專業設計，可增強癌症篩檢和診斷，提高放射科醫生的表現並改善患者的生活，它提供並發讀取、癌症檢測和工作流程解決方案，可快速準確地分析每個斷層合成圖像，以無與倫比的精度檢測惡性軟組織密度和鈣化。
          </p>
        </div>
        <div class="cont-img">
          <div class="img-b">
            <img src="@/assets/image/index/flex-2.jpg" alt="" />
          </div>
        </div>
        <hr>
        <div class="text">
          <h1 v-scroll-animate="{ type: 'fade-up' }">
            <span class="featured-text"><span style="color: #f077a0;">SecondLook® </span> 二維X光檢查檢測</span>
          </h1>
          <p class="paragraph" v-scroll-animate="{ type: 'fade-up' }">
            檢測解決方案專為二維乳房 X 光攝影開發，可自動標記可疑病變，識別潛在的癌症和微鈣化。該解決方案為放射科醫生提供“二次篩檢”，幫助比單純的乳房 X 光攝影篩檢更早發現可操作的漏診癌症，從而改善工作流程並提高效率。
          </p>
        </div>
        <div class="cont-img">
          <div class="img-b">
            <img src="@/assets/image/index/flex-3.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
    <section class="measurement-cont4">
      <div class="cont-flex2">
        <div class="cont-item">
          <div class="item-box">
            <h1>更早、更準確、更有效率的<span style="color:#f077a0">發現癌症</span></h1>
            <div class="items">
              <div class="item">
                <img src="@/assets/image/index/item01.png" alt="">
                <div>
                  <h3>臨床信心</h3>
                  <p>
                    提高癌症檢測率儘早發現癌症，獲得更好的治療結果，減少誤報
                  </p>
                </div>
              </div>
              <div class="item">
                <img src="@/assets/image/index/item02.png" alt="">
                <div>
                  <h3>營運效率</h3>
                  <p>
                    減少放射科醫師的閱讀時間，提高 AUC 性能，快速影像處理
                  </p>
                </div>
              </div>
              <div class="item">
                <img src="@/assets/image/index/item03.png" alt="">
                <div>
                  <h3>競爭差異化</h3>
                  <p>
                    市場當前技術，提高病患滿意度，符合品質和認證
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
            <img img src="@/assets/image/index/flex-4.jpg" alt=""></img>
          </div>
        </div>
      </div>
    </section>
    <section class="measurement-cont5">
      <h1>更精確<span style="color: #f077a0;">更智能</span>AI技術</h1>
      <div class="cont-flex3">
        <div class="cont-bf">
          <div class="bf-text">
            <ul>
              <li>
                <h1>既往乳房 X 光檢查納入AI演算法</h1>
                <p>將先前的乳房 X 光照片添加到目前乳房 X 光照片的分析中，以獲得更精確的結果和更少的標記</p>
              </li>
              <li>
                <h1>同側相關性明顯病變可改善結果</h1>
                <p>比較病變的同側（CC-MLO）視圖可根據視圖之間匹配和不匹配觀察的關聯來優化評分</p>
              </li>
              <li>
                <h1>發現更多癌症誤報更少</h1>
                <p>V4 提高了準確度和精確度，尤其適用於棘手的癌症病例</p>
              </li>

            </ul>
          </div>
          <div class="bf-img">
            <div class="img-box">
              <img src="@/assets/image/index/flex-5.jpg" alt=""></img>
            </div>
          </div>
        </div>
        <hr>
        <div class="cont-bf">
          <div class="bf-text">
            <ul>
              <li>
                <h1>局部病變標記和總體病例評分</h1>
                <p>病變標記勾勒出待評估的關注區域（腫塊或鈣化）。每個病變都會根據其與 ProFound Detection 訓練資料庫中已知癌性病變的相似程度獲得相應的評分。</p>
              </li>
              <li>
                <p>此外，整個檢查都會獲得病例評分。這些資訊有助於放射科醫師管理工作量，做出明智的臨床決策，並透過簡化的工作流程避免倦怠。</p>
              </li>
              <li>
                <p>分數代表關注或懷疑的相對程度，並不用於臨床評估癌症的機率。</p>
              </li>

            </ul>
          </div>
          <div class="bf-img">
            <div class="img-box">
              <img src="@/assets/image/index/flex-6.jpg" alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped lang="sass">
.measurement
  background-color: #fff
  color: #060922
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
      font-size: 30px
      font-weight: 700
    h2
      font-size: 18px
      font-weight: 300

.cont-flex
  padding: 0 12px
  width: 1320px
  margin: 0 auto
  max-width: 100%
  display: flex
  .flex-txt
    flex: 1
    padding: 48px 12px 48px 32px
    h1
      font-size: 48px
      font-weight: 700
      margin-bottom: 25px
    h5
      font-size: 20px
      font-weight: 700
      margin-bottom: 25px
    h3
      font-size: 1.25rem
      font-weight: 600
      color: #f077a0
      margin-bottom: 10px
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
  padding: 48px 0 120px
  border-top: 1px solid rgba(6, 9, 34, 0.1)
  .cont3
    padding: 0 12px
    width: 1320px
    margin: 0 auto
    max-width: 100%
    hr
      margin: 48px auto
    .text
      margin: 0 auto
      width: 83.33333333%
      h1
        font-size: 40px
        font-weight: 700
      p
        padding-left: 10px
        text-align: left !important
    .cont-img
      width: 83.33333333%
      margin: 0 auto
      position: relative
      height: 400px

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

  img
    transform: translate3d(0px, 2px, 0px) scale(1.3)
    will-change: transform
    transition: transform 1s cubic-bezier(0, 0, 0, 1)


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
</style>
