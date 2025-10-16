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
