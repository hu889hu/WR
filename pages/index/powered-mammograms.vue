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
        <h1 v-scroll-animate="{ type: 'fade-up' }">探索人工智能檢測</h1>
        <h2 v-scroll-animate="{ type: 'fade-up' }" class="delay-100">了解您的選擇</h2>
        <p v-scroll-animate="{ type: 'fade-up' }" class="delay-200">AI 驅動的癌症檢測，提供個人化的篩檢</p>
      </div>
    </section>
    <section class="measurement-cont2">
      <div class="text">
        <h1 v-scroll-animate="{ type: 'fade-up' }">早期的<span style="color: #f077a0;">發現</span>至關重要</h1>

      </div>
      <div class="cont-flex">
        <div class="flex-txt">
          <h4 v-scroll-animate="{ type: 'fade-up' }">人工智能檢測</h4>
          <h1><span style="color: #f077a0;">提早檢測</span>防範未然</h1>
          <p class="paragraph">根據癌症協會的數據，如果乳癌早期發現且仍處於局部狀態，其 5 年相對存活率為 99%</p>
          <div class="menu-items">
            <div class="info-content">
              <h2 class="title"><span class="featured-text">8分之1</span></h2>
              <h5 class="info-title">女性一生將會罹患乳癌</h5>
            </div>
            <div class="info-content">
              <h2 class="title"><span class="featured-text">20-40%</span></h2>
              <h5 class="info-title">在查看X光檢查影像時，可能會遺漏許多癌症</h5>
            </div>
            <div class="info-content">
              <h2 class="title" style="color: #071385;font-size: 20px;">有了人工智慧，我們可以提早檢測</h2>
              <h5 class="info-title" style="color: #383838;">當使用 ProFound Breast Health Suite 時，放射科醫生可以提前數年發現潛在的癌症。</h5>
            </div>
          </div>
        </div>
        <div class="flex-img">
          <div class="right-img">
            <div class="img-b">
              <img src="@/assets/image/index/power1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="waist-seal">
      <div class="waist">
        <h1>乳房X光檢查是獨一無二的就像你一樣</h1>
        <h3>您可以採取哪些步驟來確保獲得最準確的乳房 X 光檢查讀數？</h3>
      </div>
    </section>
    <section class="measurement-cont3">
      <div class="cont3">
        <div class="text">
          <h1 v-scroll-animate="{ type: 'fade-up' }">
            <span class="featured-text"><span style="color: #0a027a;">2D和3D的X光檢查，它們有何不同？</span></span>
          </h1>
          <br>
          <p v-scroll-animate="{ type: 'fade-up' }">
            自 2011 年 3D 乳房 X 光攝影問世以來，乳房 X光攝影在發現癌症方面的有效性與 2D 乳房 X 光攝影相比提高了 40% 以上，因為典型的 3D 檢查可產生多達 300 張影像，而 2D 篩檢只能產生 4
            張影像。
            <br>
            這為放射科醫生提供了更詳細的影像，並增加了早期發現癌症的幾率！但也帶來了巨大的工作量，因為潛在的問題仍然會被忽略。
          </p>
          <br>
          <br>

        </div>
        <div class="cont-img">
          <div class="img-b">
            <img src="@/assets/image/index/flex-2.jpg" alt="" />
          </div>
        </div>
        <br>
        <div class="text">
          <h1 v-scroll-animate="{ type: 'fade-up' }">
            <span class="featured-text"><span style="color: #0a027a;">當放射科醫生分析您的掃描結果時…</span></span>
          </h1>
          <p v-scroll-animate="{ type: 'fade-up' }">
            這些影像被發送給放射科醫生，放射科醫生讀取掃描結果並根據他們的專業知識和臨床指南提出以下建議之一：
          </p>
          <br>
          <p v-scroll-animate="{ type: 'fade-up' }">
            ●您可以等到下一次定期乳房 X 光檢查後再進行另一次乳房 X 光檢查，因為他們看不到任何相關資訊。<br>
            ●由於您的風險因素，您應該開始更頻繁地進行乳房 X 光檢查，以保持警惕。<br>
            ●您應該考慮補充篩檢、診斷影像或可能的活檢。
          </p>
          <hr>
          <div class="cont-bnr-bg">
            <div class="box">
              <h2 style="font-size: 40px;">放射科醫生與尖端的人工智慧解決方案合作…</h2>
              <br>
              <p style="font-size: 26px;">當放射科醫生使用人工智慧解決方案來幫助他們讀取掃描結果時，這並沒有取代他們的專業知識……而是使他們能夠更有效地識別風險訊號，從而使早期發現癌症的可能性提高
                6%！
              </p>
            </div>
          </div>
          <br>
          <br>
          <div class="cont-bnr-bg2">
            <h1>人工智慧正在改變健康保健</h1>
            <h3>當放射科醫生打開您的3DX光檢查影像時，他們會看到大約300張掃描影像供點擊，以尋找內任何可疑跡象。</h3>
            <div class="flex-cbg">
              <div class="fc-1">
                <div class="fc-td">
                  <h2>即使常規篩檢可能會漏掉一些跡象，也能儘早發現癌症</h2>
                  <p> ProFound 將為放射科醫生提供他們應優先評估的疑似癌症優先區域，幫助他們將有限的時間集中在最需要的地方。</p>
                </div>
                <div class="fc-pd">
                  <h2>使用結果...</h2>
                  <p>放射科醫師正在減輕病患壓力！研究表明，他們減少了7%的不必要的複診。此外，他們能夠更早發現更多癌症，準確率比未使用AI的醫生高出6% 。</p>
                </div>
              </div>
              <div class="fc-1">
                <div>
                  <h2>了解您的個人化風險評估結果</h2>
                  <p>除了突出顯示和評分乳房內的區域以便早期檢測癌症之外，ProFound 還可以根據您的乳房 X 光影像進行密度評估和風險評估。</p>
                </div>
                <div class="fc-pd">
                  <h2>使用結果...</h2>
                  <p>與傳統的終生風險評分方法相比，ProFound AI Risk 在確定未來一兩年內罹患乳癌的風險方面準確率高出 2.4 倍以上。 1,2放射科醫師可以就額外篩檢或個人化檢查計畫提出更明智的建議。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    <section class="measurement-cont5">
      <div class="cont-flex3">
        <div class="cont-bf">
          <div class="bf-text">
            <h1>了解你的密度與<span style="color: #f077a0;">其他風險</span></h1>
            <div class="paragraph">
              乳房緻密是乳癌的一個風險因素，因為它會影響乳房 X 光攝影的準確性
            </div>
            <p>●40歲以上的女性中約有 50% 擁有緻密的乳房組織<br>
              ●乳房密度高會使罹患乳癌的幾率增加 2 倍以上</p>
            <br>
            <p>對於乳房緻密且具有其他風險因素的女性來說，標準的年度乳房 X 光檢查是不夠的！ </p>
          </div>
          <div class="bf-img">
            <div class="img-box">
              <img src="@/assets/image/index/power2.jpg" alt=""></img>
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
    background-image: url('@/assets/image/index/cancer-6.jfif')
    animation-name: slideAnimation
    animation-delay: 0s
  
  .slide-2
    background-image: url('@/assets/image/index/cancer-1.jfif')
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
  padding: 48px 0 20px
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
      width: 88%
      h1
        font-size: 40px
        font-weight: 700
      p
        padding-left: 10px
        text-align: left !important
    .cont-img
      width: 88%
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
  padding: 0 0 80px
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
      width: 88%
      margin: 0 auto
      .bf-text
        flex: 1
        padding: 0 12px
        padding: 40px 20px 48px 32px
        h1
          font-weight: 700
          font-size: 48px
          margin-bottom: 8px
        p
          color: #383838
          font-weight: 600
          font-size: 20px
      .bf-img
        position: relative
        flex: 1
        margin: 25px 0
        .img-box
          position: absolute
          top: 0
          right: 0
          width: 100%
          height: 100%
          img
            width: 100%
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

.waist-seal
  padding: 80px 0
  background-color: #013383
  color: #fff
  .waist
    padding: 0 12px
    width: 1320px
    max-width: 100%
    margin: 0 auto
    h1
      font-size: 40px
    h3
      font-size: 20px
.cont-bnr-bg
  width: 1320px
  max-width: 100%
  margin: 0 auto
  background: #fffcda
  color: #303030
  padding: 20px
  .box
    width: 88%
    margin: 0 auto
    
    h2
      color: #0a027a
      
    p
      font-size: 18px

.cont-bnr-bg2
  background-color: #013281
  color: #fff
  padding: 50px
  h1
    font-size: 40px
  &>h3
    font-size: 25px
  .flex-cbg
    margin-top: 20px
    
    .fc-1
      flex: 1
      padding: 0 12px
      display: grid
      grid-template-columns: repeat(2, 1fr)
      gap: 10px
      margin-bottom: 20px

      h2
        font-size: 25px
        margin-bottom: 10px
      p
        font-size: 16px
      .fc-pd
        
        padding: 12px
        background-color: #0984cc
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
  @media (max-width: 768px)
    padding: 20px 0
    margin: 20px 0

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
        h1
          font-size: 30px
        h2
          margin-top: 10px
          font-size: 20px
      .menu-items
        .info-content
          h2
            font-size: 40px !important
          h5
            font-size: 16px
      .cont-flex
        display: block
        padding: 0
        .flex-txt
          padding: 20px 0
          h1
            font-size: 30px
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
    .waist-seal
      padding: 40px 20px
      .waist
        padding: 0
        h1
          font-size: 2rem
        h3
          font-size: 1rem
    .measurement-cont3
      padding: 40px 20px
      .cont3
        padding-inline: 0
        .text
          margin: 0
          width: 100%
          h1
            font-size: 1.5rem
        .cont-img
          width: 100%
          height: 100%
          .img-b
            position: relative
      .cont-bnr-bg2
        padding: 20px
        h1
          font-size: 1.5rem
        h3
          font-size: .8rem
        .flex-cbg
          .fc-1
            display: block
            padding: 0
            .fc-td
              margin-bottom: 20px
            .fc-pd
              margin-top: 20px
            h2
              font-size: 1.5rem
              margin-bottom: 20px
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
            h1
              font-size: 30px !important
            ul
              li
                h1
                  font-size: 20px !important
                p
                  font-size: 18px
  .cont-bnr-bg
    margin: 0 0 40px !important
    .box
      width: 100%
      margin: 0
      h2
        font-size: 30px !important
      p
        font-size: 18px !important
</style>
