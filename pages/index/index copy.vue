<script lang="ts" setup>
const { $swiper } = useNuxtApp()
import slider1 from '@/assets/image/index/slider1-1.jpg'
import slider2 from '@/assets/image/index/slider1-2.jpg'
import slider3 from '@/assets/image/index/slider1-3.jpg'
const imgs = ref([
  {
    feature: '量身訂製解決方案',
    content: ['靈活創新的臨床供應解決方案有助於加速您全球各地的臨床研究'],
    img: slider1
  },
  {
    feature: '靈活創新的臨床供應解決方案有助於加速您全球各地的臨床研究',
    content: ['為I期到III期及以後各種規模和複雜性的臨床研究提供最廣泛的全球開發和臨床供應服務'],
    img: slider2
  },
  {
    feature: '全球對照藥採購',
    content: ['我們的全球藥品網絡', '協助您實現高性價比的商業藥品採購'],
    img: slider3
  }
])
const swiper = ref()
const realIndex = ref(0)
const activeIndex = ref(0)
onMounted(() => {
  swiper.value = new $swiper('.swiper-pc', {
    allowTouchMove: true,
    slidesPerView: 1,
    loop: true,
    autoplay: true,
    centeredSlides: false
  })

  swiper.value.on('realIndexChange', (swiperInstance) => {
    realIndex.value = swiperInstance.realIndex; // 实际索引（0-based）
    activeIndex.value = swiperInstance.activeIndex; // 活动索引（含克隆幻灯片）

    // console.log('真实索引:', realIndex.value);
    // console.log('活动索引:', activeIndex.value);
    // 自定义操作示例：
    // document.querySelector('.current-index').textContent = realIndex + 1;
  });
})
const upTo = () => {
  swiper.value.slidePrev();  // 上一张
  swiper.value.autoplay.start(); // 重启自动轮播
}
const downTo = () => {
  swiper.value.slideNext();  // 下一张
  swiper.value.autoplay.start(); // 重启自动轮播
}
</script>
<template>
  <div>

    <section class="main-slider1">
      <div class="owl-nav">
        <button type="button" class="owl owl-prev" @click="upTo">
          <span class="fal"><i class="fa-solid fa-chevron-right fa-flip-horizontal"></i></span>
        </button>
        <button type="button" class="owl owl-next" @click="downTo">
          <span class="fal"><i class="fa-solid fa-chevron-right"></i></span>
        </button>
      </div>
      <div class="swiper swiper-pc">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in imgs" :key="index">
            <div class="item-slider" :class="'slider' + (index + 1)">
              <div class="container ">
                <div class="bfb">
                  <!-- :class="realIndex == index || activeIndex == imgs.length + 1 ? 'retive-sele' : ''" -->
                  <h1>{{ item.feature }}</h1>
                  <h2 v-for="(txt, index) in item.content" :key="index">{{ txt }}</h2>
                  <div class="more">
                    <div class="menu-btn">
                      <a class="white">
                        了解更多
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
    <section class="team">
      <div class="title">
        <h2>
          我們的服務領域
        </h2>
      </div>
      <div class="team-items">
        <a class="t-item">
          <img src="@/assets/image/index/serve-1.png" alt="">
          <h5>預測和計劃</h5>
        </a>
        <a class="t-item">
          <img src="@/assets/image/index/serve-2.png" alt="">
          <h5>包裝工程</h5>
        </a>

        <a class="t-item">
          <img src="@/assets/image/index/serve-3.png" alt="">
          <h5>對照藥採購</h5>
        </a>
        <a class="t-item">
          <img src="@/assets/image/index/serve-4.png" alt="">
          <h5>分發和物流</h5>
        </a>
      </div>
    </section>
    <section class="join-us">
      <div class="join-cont">
        <h3>加入我們的團隊</h3>
        <p>
          加入全球領先的臨床供應機構，在營運、品質、供應鏈、分發、專案管理、銷售、財務等領域探索全球職涯發展機會。
        </p>
      </div>
    </section>
    <section class="vw-content">
      <div class="vw">
        <div class="row-item">
          <a href="">
            <div class="item-box" style="background-color: rgb(224, 224, 224);">
              <div class="logo-sm">
                <img src="@/assets/image/index/b01.png" alt="">
              </div>
              <div class="t-cont">
                <div>
                  <h4>全球商業化對照藥採購</h4>
                  <p>
                    從以往的經驗我們發現，成功的臨床試驗商業藥品採購，可以說是一個複雜的過程。需要一系列的預先規劃、嚴格執行和持續跟進。選擇具備全球採購、監管、品質和臨床包裝專業知識的合作夥伴，可以幫助申辦方應對這些挑戰。
                  </p>
                </div>
                <span>了解</span>
              </div>
            </div>
          </a>
        </div>
        <div class="row-item">
          <div class="item-box" style="padding: 0;">
            <a href="">
              <img src="@/assets/image/index/item-box-img1.jpg" alt="">
            </a>
          </div>
        </div>
        <div class="row-item">
          <a href="">
            <div class="item-box" style="background-color: #004d95;">
              <div class="logo-sm">
                <img src="@/assets/image/index/c01.png" alt="">
              </div>
              <div class="t-cont" style="color: #FFF;">
                <div>
                  <h4 style="color: #FFF;">按需供應模式</h4>
                  <p>
                    將傳統的臨床供應鏈轉變為以病患需求為驅動的供應鏈。
                    <br />
                    我們的按需供應革新臨床供應模式
                    <br />
                    FastChain™ ，可根據患者的實際需求進行GMP二級包裝，將患者藥盒貼標並分配到臨床試驗中心，而不再依賴大量的靜態庫存。
                  </p>
                </div>
                <span>了解</span>
              </div>
            </div>
          </a>
        </div>
        <div class="row-item">
          <a href="">
            <div class="item-box" style="background-color: #652f6b;">
              <div class="logo-sm">
                <img src="@/assets/image/index/d01.png" alt="">
              </div>
              <div class="t-cont" style="color: #FFF;">
                <div>
                  <h4 style="color: #FFF;">專案&臨床供應管理</h4>
                  <p>
                    我們有充足的經驗來優化您的臨床設計，確保以最大成本效益的精簡方案來服務複雜的研究項目。我們在國際監管環境、需求模擬和預測以及實際運作方面的經驗保障了可靠的供應並且最大程度的減少浪費。
                  </p>
                </div>
                <span>了解</span>
              </div>
            </div>
          </a>
        </div>
        <div class="row-item">
          <a href="">
            <div class="item-box" style="background-color: #9363A1;">
              <div class="logo-sm">
                <img src="@/assets/image/index/e01.png" alt="">
              </div>
              <div class="t-cont" style="color: #FFF;">
                <div>
                  <h4 style="color: #FFF;">專案&臨床供應管理</h4>
                  <p>
                    我們有充足的經驗來優化您的臨床設計，確保以最大成本效益的精簡方案來服務複雜的研究項目。我們在國際監管環境、需求模擬和預測以及實際運作方面的經驗保障了可靠的供應並且最大程度的減少浪費。
                  </p>
                </div>
                <span>了解</span>
              </div>
            </div>
          </a>
        </div>
        <div class="row-item">
          <div class="item-box" style="padding: 0;">
            <a href="">
              <img src="@/assets/image/index/item-box-img2.png" alt="">
            </a>
          </div>
        </div>
        <div class="row-item">
          <a href="">
            <div class="item-box" style="background-color: #bee2e0;">
              <div class="logo-sm" style="color: rgb(5, 3, 139);">
                <h4>全球商業化對照藥採購</h4>
              </div>
              <div class="t-cont" style="color: rgb(5, 3, 139);">
                <div>
                  <p>
                    從以往的經驗我們發現，成功的臨床試驗商業藥品採購，可以說是一個複雜的過程。需要一系列的預先規劃、嚴格執行和持續跟進。選擇具備全球採購、監管、品質和臨床包裝專業知識的合作夥伴，可以幫助申辦方應對這些挑戰。
                  </p>
                </div>
                <span>了解全球所有設施</span>
              </div>
            </div>
          </a>
        </div>
        <div class="row-item">
          <div class="item-box" style="padding: 0;">
            <a href="">
              <img src="@/assets/image/index/item-box-img3.png" alt="">
            </a>
          </div>
        </div>
        <div class="row-item">
          <a href="">
            <div class="item-box" style="background-color: #007E8A;">
              <div class="logo-sm">
                <img src="@/assets/image/index/g01.png" alt="">
              </div>
              <div class="t-cont" style="color: #FFF;">
                <div>
                  <h4 style="color: #FFF;">專案&臨床供應管理</h4>
                  <p>
                    我們有充足的經驗來優化您的臨床設計，確保以最大成本效益的精簡方案來服務複雜的研究項目。我們在國際監管環境、需求模擬和預測以及實際運作方面的經驗保障了可靠的供應並且最大程度的減少浪費。
                  </p>
                </div>
                <span>了解</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>
<style scoped lang="sass">
@import '@/assets/sass/index/index.sass'
</style>
