<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const siteStore = useSiteStore()
</script>

<template>
  <footer class="footer">
    <div class="footer-aside">
      <div class="col-7">
        <div class="footer-modern-left">
          <div class="unit-left">
            <div class="group-item">
              <h4 class="letter-spacing-01">智能檢測系統</h4>
              <p class="text-style-4">延續生命的美好</p>
            </div>
          </div>
          <div class="unit-body">
            <p>我們不是只看趨勢，而是看見需求<br class="d-none d-xxl-block"></p>
          </div>
        </div>
      </div>
      <div class="col-5">
        <ul class="footer-modern-right">
          <li>
            <div class="unit-left"><img class="icon-image" src="@/assets/image/index/icon01.png" alt="" width="38"
                height="35">
            </div>
            <div class="unit-body">
              <h6>線上醫療諮詢</h6>
            </div>
          </li>
          <li>
            <div class="unit-left">
              <img class="icon-image" src="@/assets/image/index/icon02.png" alt="" width="34" height="34">
            </div>
            <div class="unit-body">
              <h6>線上客服系統</h6>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="sass">
.footer
  background: #354655
  color: white
  .footer-aside
    margin: 0 auto
    width: 1140px
    max-width: 100%
    padding: 0 .5rem
    display: flex
    justify-content: space-between
    @media (max-width: 768px)
      flex-direction: column
      .col-7
        width: 100%
        padding: 20px 0 !important
        .footer-modern-left
          flex-direction: column
          width: 100%
          .unit-left
            text-align: center
            padding: 0 !important
            border: none !important
      .col-5
        padding: 20px 0 !important
        width: 100%
    .col-7,.col-5
      position: relative
      padding: 50px 0
      display: flex
      align-items: center
    .col-5
      flex: 5
      .footer-modern-right
        display: flex
        align-items: center
        justify-content: space-between
        li
          padding: 0 20px
          display: flex
          align-items: center
          gap: 20px
          font-size: 16px
    .col-7
      flex: 7
      &::before
        content: ''
        position: absolute
        top: 0
        bottom: 0
        width: 101vw
        right: 15px
        left: auto
        background: #2e3c49
        transform: skewX(17.5deg)
        transform-origin: 100% 100%
      .footer-modern-left
        display: flex
        align-items: center
        .unit-body
          padding: 0 0 0 40px
          color: #56697A
          font-size: 14px
        .unit-left
          padding: 0 40px 0 0
          border-right: 1px solid #56697A
        .text-style-4
          color: #56697A
          font-size: 14px
</style>
