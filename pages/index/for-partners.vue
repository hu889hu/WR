<script lang="ts" setup>
import anime from '~/assets/js/anime.es.js'
const botnum1 = ref(0)
const botnum2 = ref(0)
const botnum3 = ref(0)
const botnum4 = ref(0)
onMounted(() => {
  anime({
    targets: botnum1,
    value: 14,
    duration: 1000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum2,
    value: 63,
    duration: 1000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum3,
    value: 33,
    duration: 1000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum4,
    value: 89,
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
        <h1 v-scroll-animate="{ type: 'fade-up' }">關於合作夥伴</h1>
        <h2 v-scroll-animate="{ type: 'fade-up' }" class="delay-100">攜手共創美好</h2>
        <p v-scroll-animate="{ type: 'fade-up' }" class="delay-200">我們正在共同創造一個癌症無法隱藏的世界</p>
      </div>
    </section>
    <section class="join-us">
      <div class="join-cont ">
        <h3 v-scroll-animate="{ type: 'fade-up' }" class="">
          讓我們<span style="color: #f077a0;">一起改變這些可能性</span></h3>
        <div class="join-items  " v-scroll-animate="{ type: 'fade-up' }">
          <div class="item">
            <h2>{{ botnum1 }}秒</h2>
            <h5>全球每14秒就有一名 <br>
              女性診斷出罹患乳癌</h5>
          </div>
          <div class="item">
            <h2>{{ botnum2 }}%</h2>
            <h5>使用傳統模型評估<br>
              風險的準確率僅63%</h5>
          </div>
          <div class="item">
            <h2>{{ botnum3 }}%</h2>
            <h5>33%的女性在兩年內 <br>
              錯過乳房篩檢</h5>
          </div>
          <div class="item">
            <h2>{{ botnum4 }}%</h2>
            <h5>被診斷出罹患乳癌的<br>
              女性沒有家族病史</h5>
          </div>
        </div>
      </div>
    </section>
    <section class="mega-section">
      <div class="section-video-bg">
        <video class="video" autoplay muted loop playsinline>
          <source src="https://upload.comethike.com/uploads/1760274533364.mp4" type="video/mp4">
          </source>
        </video>
        <div class="overlay-color "></div>
      </div>
      <div class="mega-container " v-scroll-animate="{ type: 'fade-up' }" style="text-align: right;padding: 20px;">
        <h1 style="color: #ffffff;padding-right: 20px;">我們的<span style="color: #fda625;">使命</span></h1>
        <p style="color: #ffffff;font-size: 20px;padding: 10px;">
          我們熱衷於我們的使命—<br>
          創造一個癌症無法隱藏的世界<br>
          利用人工智慧(AI)解決方案的力量，<br>
          使供應商和專業人員能夠<br>
          準確、可靠、更快地檢測癌症，<br>
          並幫助所有患者過上更好、<br>
          更長壽的生活
        </p>
        <a class=" btn-outline cta-link" href="my/login.php">了解更多</a>
      </div>
    </section>

    <section class="measurement-cont3">
      <div class="cont3">
        <div class="text">
          <h1 v-scroll-animate="{ type: 'fade-up' }">
            <span class="featured-text">我們的技術整合</span>
          </h1>
          <p class="paragraph" v-scroll-animate="{ type: 'fade-up' }">
            以科學、臨床證據和經過驗證的患者結果為支持；我們的 ProFound 乳房健康解決方案套件 – 檢測、密度和風險 – 聚焦癌症，揭露其隱藏之處。讓您能夠以前所未有的方式進行個人化乳癌篩檢。
          </p>
        </div>
        <div class="cont-img">
          <div class="img-b">
            <img src="@/assets/image/index/bac1.jpg" alt="" />
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
    background-image: url('@/assets/image/index/cancer-7.jfif')
    animation-name: slideAnimation
    animation-delay: 0s
  
  .slide-2
    background-image: url('@/assets/image/index/cancer-8.jfif')
    animation-name: slideAnimation
    animation-delay: 4s  // 第一张开始4秒后第二张出现
  
  .slide-3
    background-image: url('@/assets/image/index/cancer-1.jfif')
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
  padding: 48px 0 100px
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
  padding:  0
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

/* join-us */
.join-us
  position: relative
  background: #0d214d
  color: #FFF
  padding: 5rem 0
  @media screen and (max-width: 768px)
    &::before
      width: 100% !important
  &::before
    content: ""
    background-color: #194c9e
    position: absolute
    left: 0
    top: 0
    width: 0%
    height: 100%
    transition: all 0.3s ease-in-out
  &::after
    content: ""
    background-color: #194c9e
    position: absolute
    left: 0
    z-index: 0
    bottom: 0
    width: 100%
    height: 30%
  .join-cont
    z-index: 1
    width: 1320px
    max-width: 100%
    padding: 0 20px
    margin: 0 auto
    h3
      font-size: 50px
      font-weight: 700
      margin-bottom: 45px
    .two
      .item
        h2
          font-size: 55px !important
          
    .join-items
      background-color: #040827
      display: grid
      grid-template-columns: repeat(4, 1fr)
      flex-wrap: wrap
      
      overflow: hidden
      border-radius: 0.5rem
      .item
        margin: 4rem 0
        text-align: center
        &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(5),&:nth-child(6),&:nth-child(7)
          border-right: 1px dashed rgba(255, 255, 255, 0.5)
        h2
          margin-bottom: 8px
          color: #fda625
          font-size: 45px
          font-weight: 700
        h5
          padding: 10px 12px
          font-size: 20px
        
.mega-section
  position: relative
  padding: 2rem 0
  background-color: #000531
  .section-video-bg
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    .overlay-color
      position: absolute
      background-color: #060922
      opacity: 0.65
      top: 0
      left: 0
      width: 100%
      height: 100%
    video
      width: 100%
      height: 100%
      object-fit: cover
  .mega-container
    width: 1320px
    margin: 0 auto
    max-width: 100%
    padding: 0 20px
    h1
      font-size: 2.5rem
    p
      margin: 10px 0px 10px 0
    .btn-outline
      border: 2px solid
      color: #f077a0
      background: transparent
      border-color: #f077a0
      verflow: hidden
      display: inline-flex
      justify-content: center
      align-items: center
      text-decoration: none !important
      text-align: center
      text-transform: capitalize
      letter-spacing: 1px
      outline: none
      padding: 0.75rem 2.25rem
      font-weight: 800
      box-shadow: 0px 3px 10px -5px rgba(6, 9, 34, 0.15)
      transition: all 0.3s ease-in-out 0s
      cursor: pointer
      border-radius: 28px
      &:hover
        color: white
        background: #f077a0


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
  .join-us
    padding: 2rem 0
    .join-cont 
      h3
        font-size: 32px !important
      .join-items
        grid-template-columns: repeat(2, 1fr)
        .item
          margin:  0 !important
          padding: 15px 0 !important
          &:nth-child(1)
            border-bottom: 1px dashed rgba(255, 255, 255, 0.5) !important
          &:nth-child(2)
            border-bottom: 1px dashed rgba(255, 255, 255, 0.5) !important
            border-right: none !important
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
