<script lang="ts" setup>
const { t } = useI18n()
const siteStore = useSiteStore()
const router = useRouter()
const scrollTop = ref(0)
const section1 = ref<HTMLElement | null>(null)
const section2 = ref<HTMLElement | null>(null)
const section3 = ref<HTMLElement | null>(null)
const section4 = ref<HTMLElement | null>(null)
const windowHeight = ref(0)


import swiper1 from '@/assets/image/index/swiper1.jfif'
import swiper2 from '@/assets/image/index/swiper2.jfif'
import swiper3 from '@/assets/image/index/swiper3.jfif'

import slide1 from '@/assets/image/index/slides1.jfif'
import slide2 from '@/assets/image/index/slides2.jfif'
import slide3 from '@/assets/image/index/slides3.jfif'
import slide4 from '@/assets/image/index/slides4.jfif'
import slide5 from '@/assets/image/index/slides5.jfif'

const slides = ref([
  {
    id: '1',
    toptitle: '更快發現更快治療',
    title: '智能檢測系統',
    subtitle: '創造生命的延續',
    img: swiper1,
    link: '/game/warrants'
  },
  {
    id: '2',
    toptitle: '延續生命的力量',
    title: '智能檢測系統',
    subtitle: '攜手共創未來',
    img: swiper2,
    link: '/game/warrants'
  },
  {
    id: '3',
    toptitle: '更快發現更快治療',
    title: '智能檢測系統',
    subtitle: '創造生命的延續',
    img: swiper3,
    link: '/game/warrants'
  }
])
const slides2 = ref([
  {
    id: '1',
    title: '工作紀錄',
    subtitle: '您的工作紀錄',
    img: slide1,
    link: '/game/warrants'
  },
  {
    id: '2',
    title: '個人資訊',
    subtitle: '查閱與修改個人基本資料',
    img: slide2,
    link: '/game/warrants'
  },
  {
    id: '3',
    title: '進入系統',
    subtitle: '進入智能系統選單',
    img: slide3,
    link: '/game/warrants'
  },
  {
    id: '4',
    title: '財務申請',
    subtitle: '申請您的財務資訊',
    img: slide4,
    link: '/game/warrants'
  },
  {
    id: '5',
    title: '財務紀錄',
    subtitle: '您的財務申請紀錄',
    img: slide5,
    link: '/game/warrants'
  },

])
const container = ref(null)
const items = ref([])

const stup = ref(0)
const slideStup = (num) => {
  stup.value += num
  console.log(stup.value);

}

onMounted(async () => {
  document.documentElement.scrollTop = 0
  if (window) {
    console.log('window', window.innerWidth)
    window.addEventListener('scroll', handleScroll)
  }
  windowHeight.value = window.innerHeight
  window.addEventListener('resize', () => {
    windowHeight.value = window.innerHeight
  })
  if (container.value) {
    items.value = container.value.querySelectorAll('.item')
    console.log('找到項目數量:', items.value.length)
  }
})
const handleScroll = () => {
  scrollTop.value = window.scrollY
  let scrollTrue = scrollTop.value + windowHeight.value
  console.log('offsetTop', section1.value?.offsetTop)
  console.log('scrollTop', window.scrollY)
  console.log('scrollTrue', scrollTrue)

  console.log(scrollTrue >= section1.value?.offsetTop - 100)

  if (scrollTrue >= section1.value?.offsetTop - 100) {
    section1.value?.classList.add('section-attain')
  } else {
    section1.value?.classList.remove('section-attain')
  }
  if (scrollTrue >= section2.value?.offsetTop - 100) {
    section2.value?.classList.add('section-scale')
  } else {
    section2.value?.classList.remove('section-scale')
  }
  if (scrollTrue >= section3.value?.offsetTop - 100) {
    section3.value?.classList.add('section-attain')
  } else {
    section3.value?.classList.remove('section-attain')
  }
  if (scrollTrue >= section4.value?.offsetTop - 100) {
    section4.value?.classList.add('section-scale')
  } else {
    section4.value?.classList.remove('section-scale')
  }
}
onUnmounted(() => {
  if (window) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="pages">
    <div class="page-main main1">
      <section class="banner-wrap">
        <client-only>
          <UkSlideshow :options="{ autoplay: false }" :slides="slides" />
        </client-only>
      </section>
      <section class="banner2">
        <client-only>
          <UserSlider :slides="slides2" />
        </client-only>
      </section>
      <div class="section section3" ref="section3">
        <div class="section-card">
          <div class="card-col">
            <div class="about-left">
              <h2>
                <p>
                  技術與專業的AI檢測
                </p>
              </h2>
              <div class="img-l">
                <div class="abt-l-box">
                  <h5>AI檢測系統</h5>
                  <h3>AI設備不只用於診斷，更能累積大量心電圖跟臨床數據</h3>
                  <div class="btn">進入系統</div>
                </div>
                <img src="@/assets/image/index/bt06.jpg" alt=""></img>
              </div>
            </div>
            <div class="card-item">
              <h2>
                <p>
                  智能系統當前偵測方向
                </p>
                <div class="owl-nav" @click.stop="slideStup(-1)">
                  <div class="owl-arrow owl-arrow-prev">
                    <svg t="1760452552418" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="1572" width="25" height="25">
                      <path
                        d="M707.29296875 892.56640625c-15.38085938 15.38085938-40.25390625 15.38085938-55.63476563 0L326.28710937 567.1953125c-30.76171875-30.76171875-30.76171875-80.59570313 1e-8-111.26953125l327.74414062-327.83203125c15.20507813-15.20507813 39.81445313-15.38085938 55.1953125-0.43945313 15.73242188 15.29296875 15.90820313 40.51757813 0.43945313 56.07421875L409.78320312 483.69921875c-15.38085938 15.38085938-15.38085938 40.25390625 1e-8 55.63476563l297.59765624 297.59765624c15.29296875 15.38085938 15.29296875 40.25390625-0.08789062 55.63476563z"
                        p-id="1573"></path>
                    </svg>
                  </div>
                  <div class="owl-arrow owl-arrow-next" @click.stop="slideStup(1)">
                    <svg t="1760452576704" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="1572" width="25" height="25">
                      <path
                        d="M316.70703125 131.43359375c15.38085938-15.38085938 40.25390625-15.38085938 55.63476563-1e-8L697.71289063 456.8046875c30.76171875 30.76171875 30.76171875 80.59570313-1e-8 111.26953125l-327.74414062 327.83203125c-15.20507813 15.20507813-39.81445313 15.38085938-55.1953125 0.43945313-15.73242188-15.29296875-15.90820313-40.51757813-0.43945313-56.07421875L614.21679688 540.30078125c15.38085938-15.38085938 15.38085938-40.25390625-1e-8-55.63476563l-297.59765624-297.59765624c-15.29296875-15.38085938-15.29296875-40.25390625 0.08789062-55.63476563z"
                        p-id="1573"></path>
                    </svg>
                  </div>
                </div>
              </h2>
              <div class="card-item-content" style="min-height: 100%;">
                <UkSlidesList :stup="stup" />
              </div>
            </div>
          </div>
          <div class="card-col1">
            <img src="@/assets/image/game/image.png" alt="">
            <div class="texrt">
              <h3>
                一、AI 醫療介紹
              </h3>
              <p>AI 醫療（Artificial Intelligence Healthcare）結合人工智慧、醫療影像分析、生理監測與大數據運算技術，協助醫師在短時間內判讀大量檢查資料，提升疾病偵測速度與準確度。</p>
              <p>AI 不取代醫師，而是提供更可靠的第二層判讀；讓心臟、乳房、肺部、血糖與視網膜等重要檢查項目，都能在早期就發現異常，建立更全面的預防醫學模式。</p>
              <h3>
                二、五大檢測設備介紹
              </h3>
              <h4>
                1. 心電監測器（ECG Monitor）
              </h4>
              <img src="@/assets/image/game/user2.webp" alt="">

              <p>心電監測器透過多導程電極記錄心臟的電生理訊號，可即時呈現心房與心室的去極化與復極化狀態。
                結合 AI 演算法後，系統能自動分析 P 波、QRS 波群、ST 段及 T 波的細微變化，快速偵測以下異常：
              </p>

              <ul>
                <li>• 心律不整（AF、PVC、VT 等）</li>
                <li>• 早期心肌缺氧或心肌缺血</li>
                <li>• 傳導阻滯與復極異常</li>
                <li>• 心臟負荷過高或電解質失衡之徵兆</li>
              </ul>
              <p>此技術可大幅提升危險心律的早期辨識能力，並提供臨床判讀的重要依據。</p>
              <h4>
                2. 數位乳房攝影儀（Digital Mammography）
              </h4>
              <img src="@/assets/image/game/user3.jpg" alt="">
              <p>數位乳房攝影利用低能量 X 光成像，呈現乳腺、纖維與脂肪組織的細節分布。</p>
              <p>搭載 AI 乳房影像分析模型後，可自動量測腫瘤大小、辨識微鈣化群、偵測結構扭曲與密度異常，尤其在高乳房密度族群中，能有效降低早期乳癌被遮蔽的風險。</p>
              <p>AI 亦能將可疑病灶標記於影像上，提升醫師的偵測敏感度與整體判讀一致性。</p>
              <p>此技術已成為國際乳癌篩檢流程中不可或缺的輔助工具。</p>
              <h4>3. 肺部低劑量斷層掃描儀（LDCT – Low Dose CT）</h4>
              <img src="@/assets/image/game/user1.jpeg" alt="">
              <p>LDCT 以極低輻射劑量進行胸腔螺旋掃描，可獲得高解析度的肺實質影像。</p>
              <p>AI 深度分析模型能自動偵測肺結節、量化其體積、分析邊緣形態、密度與生長速度，並依據結節特徵提供惡性風險分級。</p>
              <p>AI 對毫米級病灶的敏感度特別高，能提前辨識早期肺癌及其他肺部病變，並降低傳統肉眼判讀的變異性。</p>
              <p>此掃描方式特別適用於肺癌高風險族群之年度追蹤。</p>
              <h4>4. 血糖智慧監測裝置（CGM – Continuous Glucose Monitoring）</h4>
              <img src="@/assets/image/game/user4.jpg" alt="">
              <p>CGM 透過皮下葡萄糖感測器連續監測組織間液中的葡萄糖濃度，每數分鐘回傳即時血糖數據。</p>
              <p>AI 模型可依據血糖變化曲線、飲食時序、運動量與生理狀態，建立個人化的血糖預測模型，用於：</p>
              <ul>
                <li>• 預測低血糖或高血糖危險點</li>
                <li>• 分析血糖變異度（GV）</li>
                <li>• 計算目標範圍時間（TIR）</li>
                <li>• 評估治療反應並優化控糖策略</li>
              </ul>
              <p>此技術可協助臨床更精準調整藥物與胰島素劑量，是現代糖尿病管理的核心工具。</p>
              <h4>5. 視網膜 AI 篩檢照相機（AI RIS）</h4>
              <img src="@/assets/image/game/user5.jpg" alt="">
              <p>視網膜攝影以高解析廣角鏡頭拍攝眼底，包含視神經、血管走向、黃斑部與周邊網膜的細部結構。</p>
              <p>AI 分析引擎可針對影像進行病理特徵辨識，包括：</p>
              <ul>
                <li>• 糖尿病視網膜病變（微動脈瘤、出血點、硬性滲出）</li>
                <li>• 黃斑部病變</li>
                <li>• 高血壓性視網膜變化</li>
                <li>• 青光眼視神經凹陷比分析（C/D ratio）</li>
              </ul>
              <p>AI 判讀能在數十秒至一分鐘內完成，可作為第一線快速篩檢工具，大幅提升眼底疾病的早期識別能力。</p>
              <h3>三、AI 醫療相關報導式內容
              </h3>
              <img src="@/assets/image/game/user6.png" alt="">
              <h4>1. 產業觀察</h4>
              <p>近年多場國際醫療科技論壇指出，AI 已成為全球預防醫學的重要核心技術。心電監測、乳房攝影、肺部 LDCT、血糖連續監測與視網膜影像等領域，都因 AI 的導入而提升早期偵測率與整體診斷品質。</p>
              <h4>
                2. 國際研究摘要
              </h4>
              <p>國際醫療期刊研究顯示：</p>
              <ul>
                <li>• AI 能提升乳房攝影中細微腫瘤與鈣化點的辨識能力。</li>
                <li>• 在肺部低劑量斷層掃描中，AI 對結節大小變化的分析比傳統判讀更敏感。</li>
                <li>• AI 能於短時間內完成眼底影像判讀，對糖尿病視網膜病變等症狀具高準確度。</li>
                <li>• 心電圖 AI 分析有助於更早發現心律異常。</li>
              </ul>
              <h4>3. 國際市場趨勢</h4>
              <p>世界進入超高齡社會後，AI 醫療需求快速增加。許多醫療院所、健檢中心與長照機構已導入 AI 判讀、遠距監測與健康風險預測，提升照護品質並強化預防醫學。</p>
              <h4>4. 產業趨勢報告</h4>
              <p>全球醫療科技報告指出，AI 醫療的年複合成長率超過 30%，未來十年最具潛力的領域包括：</p>
              <ul>
                <li>• AI 心電判讀</li>
                <li>• AI 乳房攝影分析</li>
                <li>• AI 肺部 LDCT 偵測</li>
                <li>• AI 血糖風險預測（CGM）</li>
                <li>• AI 眼底影像分析（RIS）</li>
              </ul>
              <h4>
                5. 臨床趨勢
              </h4>
              <p>多位臨床醫師指出，AI 不僅提升影像判讀效率，更能在高工作量下協助維持診斷品質。</p>
              <p>因此，越來越多醫療中心將 AI 納入雙重判讀流程，成為新一代的醫療標準。</p>
              <h3>四、總結</h3>
              <p>透過 AI 技術與五大智慧檢測設備的整合，我們提供更快速、更準確、更全面的健康管理服務。</p>
              <p>AI 醫療不只是科技的進步，更是新世代的預防醫學模式。</p>
              <p>提前掌握健康變化，就是守護未來最重要的一步。</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style></style>

<style scoped lang="sass">
.pages
  display: block
  background-color: #fff
  .section
    .section-card
      max-width: 1200px
      margin: 0 auto
      padding: 0 20px
  .banner2
    padding: 32px 0
    margin: 0 auto
    max-width: 100%
    width: 1700px
  .section2
    background-color: #2a4560
    color: #fff
    .section-card
      .card-col
        display: flex
        flex-wrap: wrap
        .border-right
          border-right: 1px solid  rgba(255, 255, 255, .6)
        .card-item
          width: 25%
          margin: 30px 0
          text-align: center
          h2
            font-size: 40px
            line-height: 2
            font-weight: 700
            display: flex
            align-items: center
            justify-content: space-between
            
          h5
            font-size: 16px
      
  .section3
    padding: 80px 0
    .card-col
      display: flex
      justify-content: center
      flex-wrap: wrap
      h2
        display: flex
        flex-wrap: wrap
        align-items: center
        justify-content: space-between
        border-bottom: 1px solid #eaeaea
        padding-bottom: 15px
        margin-inline: 10px
        p
          font-weight: 500
          letter-spacing: 0.05em
          display: inline-block
          padding-left: 15px
          line-height: 26px
          color: #151515
          font-size: 18px
          position: relative
          &:before
            content: ''
            position: absolute
            top: 3px
            bottom: 3px
            left: 0
            border-left: 4px solid #3f90dc
            pointer-events: auto
        .owl-nav
          display: flex
          align-items: center
          gap:2px
          .owl-arrow
            position: relative
            display: inline-flex
            align-items: center
            justify-content: center
            vertical-align: middle
            width: 26px
            height: 26px
            padding: 1px
            color: #111
            background: transparent
            border: 1px solid #c6c6c6
            border-radius: 3px
            cursor: pointer
            transition: .33s
            .icon
              width: 18px
              height: 18px
            &:hover
              background-color: #3f90dc
              color: #fff
              .icon
                color: #fff
                fill: #fff
      @media (max-width: 768px)
        gap: 15px
        .about-left
          width: 100% !important
          padding: 0 !important
        .card-item
          width: 100% !important
      .about-left
        width: 70%
        height: 500px
        overflow: hidden
        position: relative
        padding: 0 20px
        .img-l
          position: relative
          margin-top: 20px
          overflow: hidden
          height: 100%
          @media (max-width: 768px)
            &::before
              content: ''
              position: absolute
              top: 0
              left: 0
              width: 100%
              height: 100%
              background: rgba(255,255,255,0.70)
              z-index: 1
            .abt-l-box
              max-width: 100% !important
              padding: 0 20px
              h3
                font-size: 1.5rem !important
          &:hover
            img
              transform: scale(1.05)
          .abt-l-box
            position: absolute
            top: 50%
            transform: translateY(-50%)
            right: 40px
            max-width: 260px
            z-index: 2
            h5
              padding: 3px 5px
              background-color: #3f90dc
              font-size: 12px
              display: inline-block
              border-radius: 3px
              color: #fff
            h3
              margin-top: 16px
              font-size: 33px
              font-weight: 700
              line-height: 1.2
            .btn
              color: #151515
              margin-top: 30px
              background-color: #d6ce56
              box-shadow: 0 7px 13px 0 rgba(0, 0, 0, 0.22)
              display: inline-block
              padding: 14px 32px
              font-size: 14px
              line-height: 1.25
              border: 2px solid #d6ce56
              border-radius: 4px
              transition: all 0.3s ease
              &:hover
                background-color: #3f90dc
                border: 2px solid #3f90dc
        img
          width: 100%
          height: 100%
          object-fit: cover
          transition: all 0.2s ease
      .card-item
        width: 30%
        h4
          font-size: 20px
          color: #7497B5
        h1
          font-size: 42px
          color: #242222
          margin-bottom: 16px
        p
          font-size: 16px
        .about-item
          display: flex
          align-items: center
          gap: 10px
          margin-bottom: 16px
          .about-icon
            padding: 10px
            border: 1px solid #7497B5
            img
              width: 30px
              height: 30px
          .about-text
            font-size: 16px
            transition: color .3s ease
            &:hover
              color: #7497B5
        .about-btn
          cursor: pointer
          display: inline-block
          transition: background-color .4s ease
          padding: 12px 35px
          background-color: #7497B5
          border: none
          color: #fff
          margin-top: 36px
          &:hover
            background-color: #6685a1
    .card-col1
        margin-top: 50px
        width: 100%
        img
          width: 100%
          border-radius: 10px
        .texrt
          width: 100%
          max-width: 850px
          h3
            margin-top: 50px
            margin-bottom: 3px
            color: #000000
            font-weight: bold
            font-size: 20px
          h4
            font-size: 18px
            font-weight: bold
            margin: 20px 0
          p
            margin: 16px 0
            line-height: 1.8
            color: #000000
          ul
            margin-left: 30px
  .marquee-wrap
    background-color: #f6f6f6
    border-top: 1px solid #dad7d7
    padding: 40px 0
    overflow: hidden
    .marquee-row 
      display: flex
      align-items: center
      column-gap: 40px
    
    .marquee-row:hover 
        animation-play-state: paused
    
    .marquee-forward 
        animation: marqueeForward 15s linear infinite
    
    @keyframes marqueeForward 
      0% 
        transform: translateX(0)
      100% 
        transform: translateX(-100%)
    .marquee-item 
      font-family: sans-serif
      font-size: 56px
      text-transform: uppercase
      font-weight: 700
      color: transparent
      -webkit-text-stroke: 1px black
      -webkit-text-fill: black
      display: flex
      align-items: center
      transition: 0.5s ease
      position: relative
      &:hover 
        -webkit-text-stroke: 1px #fff
    
      &::before 
        content: attr(data-text)
        position: absolute
        top: 0
        left: 50%
        transform: translateX(-50%)
        width: 100%
        height: 0
        overflow: hidden
        white-space: nowrap
        transition: height .8s cubic-bezier(.22, .61, .36, 1)
        -webkit-text-fill-color: black
        -webkit-text-stroke: transparent
    
    .marquee-item:hover::before 
        height: 100%
    
    .marquee-item::after 
        content: '*'
        line-height: 1
        margin-left: 40px
        vertical-align: middle
        font-size: 70px
        padding-top: 20px
        transition: 0.3s ease
    
    .marquee-item:hover::after 
        -webkit-text-fill-color: black
        -webkit-text-stroke: transparent
    

</style>
