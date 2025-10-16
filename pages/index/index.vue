<script lang="ts" setup>
const { $swiper } = useNuxtApp()
import anime from '~/assets/js/anime.es.js'
import slider1 from '@/assets/image/index/swp1.jfif'
import slider2 from '@/assets/image/index/swp2.jfif'
import slider3 from '@/assets/image/index/swp3.jfif'

const slides = [{
  src: slider1,
  title: '癌症檢測',
  text: '技術系統使我們更早、更準確、更有效率地發現癌症，減少召回並改善工作流程',
  path: '/cancer-detection'
}, {
  src: slider2,
  title: '密度評估',
  text: '乳房密度可使乳癌風險增加 4 倍，因此，密度評分會影響並指導個人化治療方案',
  path: '/density-assessment'
}, {
  src: slider3,
  title: '風險評估',
  text: '世界上第一個基於圖像的風險模型比傳統模型準確率高 2.4 倍。',
  path: '/risk-evaluation'
}]
const swiper = ref()
const botnum1 = ref(0)
const botnum2 = ref(0)
const botnum3 = ref(0)
const botnum4 = ref(0)
const botnum5 = ref(0)
const botnum6 = ref(0)
const botnum7 = ref(0)
const botnum8 = ref(0)
const botnum9 = ref(0)
const botnum10 = ref(0)
const botnum11 = ref(0)
onMounted(() => {
  anime({
    targets: botnum1,
    value: 63,
    duration: 3000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum2,
    value: 33,
    duration: 3000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum3,
    value: 50,
    duration: 3000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum4,
    value: 89,
    duration: 3000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum5,
    value: 25,
    duration: 1000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum6,
    value: 50,
    duration: 1000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum7,
    value: 45,
    duration: 1000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum8,
    value: 51,
    duration: 2000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum9,
    value: 130,
    duration: 2000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum10,
    value: 200,
    duration: 2000, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
  anime({
    targets: botnum11,
    value: 4,
    duration: 500, // 动画持续时间 2 秒
    easing: 'linear', // 缓动函数
    round: 1
  })
})

</script>
<template>
  <div class="index-page">
    <img src="@/assets/image/index/home1.jfif" alt="" class="topfix-img">
    <section class="team">
      <img src="@/assets/image/index/home-wrp-bg.png" class="home-opcity-bg">
      <div class="team-items">
        <div class="t-item">
          <h4 v-scroll-animate="{ type: 'fade-up' }" class=" ">創造一個癌症無法隱藏的世界</h4>
          <h1 v-scroll-animate="{ type: 'fade-up' }" class=" ">癌症若無法及時發現
            <br>
            <span style="color:#f077a0;">便是生命最大的威脅之一</span>
          </h1>
          <p v-scroll-animate="{ type: 'fade-up' }" class=" ">
            我們若能及早發現癌症，即可透過提早預防並治療，讓癌症無法隱藏，為我們提供我們更良好的醫療時間!
          </p>
          <div class="cta-links  " v-scroll-animate="{ type: 'fade-up' }">
            <a class=" btn-solid">了解如何查找癌症</a>
            <a class="btn-outline">聯絡我們</a>
          </div>
        </div>
        <div class="dark-bg " v-scroll-animate="{ type: 'fade-up' }">
          <div class="title">
            提早發現 <span style="color: #f077a0;">癌症</span>
          </div>
          <p>
            我們的解決方案透過: 檢測、密度和風險測試以科學與臨床證據和經過驗證的患者療效為後盾，聚焦癌症，揭示其隱匿之處。這些經臨床驗證的人工智慧解決方案提供確定性和安心，改善患者療效，挽救更多生命。
            隱匿的癌症潛伏在潛伏期，難以察覺，是生命最大的威脅之一。癌症一旦得逞，我們所有人都會遭受損失。但如果癌症無法隱藏呢？如果有辦法揭露它的藏身之處以及何時發動攻擊呢？這就是我們努力探討並提出有效的解決方法的原因。
          </p>
        </div>
      </div>
    </section>
    <section class="join-us">
      <div class="join-cont ">
        <h3 v-scroll-animate="{ type: 'fade-up' }" class="">我們為甚麼<span style="color: #f077a0;">致力於研究</span></h3>
        <div class="join-items  " v-scroll-animate="{ type: 'fade-up' }">
          <div class="item">
            <h2>{{ botnum1 }}%</h2>
            <h4>使用傳統模型評估癌症風險的準確率僅63%</h4>
          </div>
          <div class="item">
            <h2>{{ botnum2 }}%</h2>
            <h4>33% 的女性在兩年內錯過乳房篩檢</h4>
          </div>
          <div class="item">
            <h2>{{ botnum3 }}%</h2>
            <h4>在乳房組織緻密的女性中，高達 50% 的乳癌會被漏診</h4>
          </div>
          <div class="item">
            <h2>{{ botnum4 }}%</h2>
            <h4>89% 被診斷出罹患乳癌的女性沒有家族病史</h4>
          </div>
        </div>
      </div>
    </section>
    <section class="vw-content">
      <div class="vw">
        <h1 v-scroll-animate="{ type: 'fade-up' }" class="">了解癌症可能隱藏在哪裡以及解決方式</h1>
        <div class="vw-items">
          <div class="row-item  " v-scroll-animate="{ type: 'fade-up' }">
            <div class="item-box" style="padding: 0;">
              <img src="@/assets/image/index/item1.jpg" alt="">
            </div>
            <h3>關於患者與預防</h3>
            <p>
              若癌症及早發現，將提高治癒比例高達99%
            </p>
            <p class="cta-nav">
              <a>學習更多</a>
              <svg width="17" height="17" viewBox="0 0 17 17" class="arrow-icon" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_89_590)">
                  <path
                    d="M12.3375 3.8374L11.5803 4.59467L14.95 7.96438H0V9.03533H14.95L11.5803 12.405L12.3375 13.1623L17 8.49982L12.3375 3.8374Z" />
                </g>
                <defs>
                  <clipPath id="clip0_89_590">
                    <rect width="17" height="17" />
                  </clipPath>
                </defs>
              </svg>
            </p>
          </div>
          <div class="row-item  " v-scroll-animate="{ type: 'fade-up' }">
            <div class="item-box" style="padding: 0;">
              <img src="@/assets/image/index/item2.jpg" alt="">
            </div>
            <h3>關於檢測與流程</h3>
            <p>
              我透過專業的檢測與流程，可以大幅縮減您的時間
            </p>
            <p class="cta-nav">
              <a>學習更多</a>
              <svg width="17" height="17" viewBox="0 0 17 17" class="arrow-icon" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_89_590)">
                  <path
                    d="M12.3375 3.8374L11.5803 4.59467L14.95 7.96438H0V9.03533H14.95L11.5803 12.405L12.3375 13.1623L17 8.49982L12.3375 3.8374Z" />
                </g>
                <defs>
                  <clipPath id="clip0_89_590">
                    <rect width="17" height="17" />
                  </clipPath>
                </defs>
              </svg>

            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="team2">
      <div class="team-items">
        <div class="t-item " v-scroll-animate="{ type: 'fade-up' }">
          <h4>我們的平台</h4>
          <h1>技術與專業的
            <span style="color:#f077a0;">癌症檢查系統</span>
          </h1>
          <p>
            我們的解決方案透過: 檢測、密度和風險測試以科學與臨床證據和經過驗證的患者療效為後盾，聚焦癌症，揭示其隱匿之處。這些經臨床驗證的人工智慧解決方案提供確定性和安心，改善患者療效，挽救更多生命。
          </p>
          <p>
            隱匿的癌症潛伏在潛伏期，難以察覺，是生命最大的威脅之一。癌症一旦得逞，我們所有人都會遭受損失。但如果癌症無法隱藏呢？如果有辦法揭露它的藏身之處以及何時發動攻擊呢？這就是我們努力探討並提出有效的解決方法的原因。
          </p>
        </div>
      </div>
    </section>
    <div class="swp-items" v-if="slides.length > 0">
      <div class="items " v-scroll-animate="{ type: 'fade-up' }">
        <h4>癌症檢測與風險</h4>
        <IndexSlider :slides="slides" />
      </div>
    </div>
    <section class="mega-section">
      <div class="section-video-bg">
        <video class="video" autoplay muted loop playsinline>
          <source src="https://upload.comethike.com/uploads/1760274533364.mp4" type="video/mp4">
          </source>
        </video>
        <div class="overlay-color "></div>
      </div>
      <div class="mega-container " v-scroll-animate="{ type: 'fade-up' }" style="text-align: right;padding: 20px;">
        <h1 style="color: #ffffff;padding-right: 20px;">關於<span style="color: #fda625;">我們</span></h1>
        <p style="color: #ffffff;font-size: 20px;padding: 10px;">
          隱匿的癌症潛伏在潛伏期，<br>難以察覺，<br>是生命最大的威脅之一。<br>癌症一旦得逞，<br>我們所有人都會遭受損失。<br>但如果癌症無法隱藏呢？<br>如果有辦法揭露它的<br>藏身之處以及何時發動攻擊呢？
        </p>
        <a class=" btn-outline cta-link" href="my/login.php">了解更多</a>
      </div>
    </section>
    <section class="join-us">
      <div class="join-cont">
        <h3 style="text-align: center !important;">
          <span style="font-size: 30px;text-align: center;">更精確<span style="color: #f077a0;">更精準</span>技術的提煉
          </span>
        </h3>
        <div class="join-items two " v-scroll-animate="{ type: 'fade-up' }">
          <div class="item">
            <h2>{{ botnum5 }}</h2>
            <h4>多年的經驗</h4>
          </div>
          <div class="item">
            <h2>{{ botnum6 }}</h2>
            <h4>多國家可使用</h4>
          </div>
          <div class="item">
            <h2>{{ botnum7 }}</h2>
            <h4>已授權專利</h4>
          </div>
          <div class="item">
            <h2>{{ botnum8 }}</h2>
            <h4>臨床研究</h4>
          </div>
          <div class="item">
            <h2>{{ botnum9 }}</h2>
            <h4>臨床站點為演算法
              <br>
              多樣性尋找影像
            </h4>
          </div>
          <div class="item">
            <h2>{{ botnum10 }}
              <span style="font-size: 18px;">萬以上</span>
            </h2>
            <h4>百萬個圖像訓練演算法</h4>
          </div>
          <div class="item">
            <h2>{{ botnum11 }}
              <span style="font-size: 18px;">天</span>
            </h2>
            <h4>生成AI演算法</h4>
          </div>
          <div class="item">
            <h2>√</h2>
            <h4>已獲FDA批准</h4>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<style scoped lang="sass">
@import '@/assets/sass/index/index.sass'
.topfix-img
  position: fixed
  top: 0
  left: 0
  z-index: -1
  width: 100dvw
  height: 100dvh
  object-fit: cover

@media (max-width: 992px)
  .team-items
    display: block
    padding-inline: 20px
    padding-top: 100px
    height: auto
    padding-bottom: 40px
    .t-item
      width: 100%
      padding: 0
      h1
        font-size: 36px
      p
        margin-top: 10px
        font-size: 16px
        padding-right: 0
      .cta-links
        margin-top: 20px
        .btn-solid,.btn-outline
          padding: 8px 16px
          font-size: 14px
    .dark-bg
      width: 100%
      margin-top: 30px
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
          &:nth-child(5)
            border-top: 1px dashed rgba(255, 255, 255, 0.5) !important
          &:nth-child(6)
            border-top: 1px dashed rgba(255, 255, 255, 0.5) !important
            border-right: none !important
          &:nth-child(7)
            border-top: 1px dashed rgba(255, 255, 255, 0.5) !important
          &:nth-child(8)
            border-top: 1px dashed rgba(255, 255, 255, 0.5) !important
            border-right: none !important
  .vw-content
    padding: 40px 20px
    .vw
      h1
        font-size:26px !important
      .vw-items
        display: block
        .row-item
          width: 100%
      .item-box
        min-height: auto
        max-height: 100% !important
        margin-top: 20px
  .team2
    .team-items
      padding: 40px 20px
  .swp-items
    padding: 40px 20px
</style>
