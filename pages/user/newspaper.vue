<script lang="ts" setup>
const store = useSiteStore()
const { queryCampaign } = store
const { locale } = useI18n()
const lang = locale.value
const siteStore = useSiteStore()
const activitiesPerPage = ref(5)
const currentPage = ref(1)
const router = useRouter()
await useAsyncData(async () => {
  await queryCampaign(lang)
})
// const previousPage = () => {
//   if (currentPage.value > 1) currentPage.value--
// }
// const nextPage = () => {
//   if (currentPage.value < totalPages.value) currentPage.value++
// }
// const totalPages = computed(() => {
//   return Math.ceil(store.campaign.total / activitiesPerPage.value)
// })
const displayedActivities = computed(() => {
  const start = (currentPage.value - 1) * activitiesPerPage.value
  console.log(start);
  return store.campaign.result
})

function unescapeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
</script>

<template>
  <div class="pages-user-activity">
    <div class="tag">
      {{ $lang('產業快訊') }}
    </div>
    <div class="pages-user-activity__form">
      <div class="pages">
        <!-- <div class="sec-title">
          <span>{{ $lang('優惠活動') }}</span>
          <i class="fas fa-gift"></i>
        </div> -->
        <!-- <ul class="pagination">
          <li :class="{ disabled: currentPage === 1 }" @click="previousPage">
            <a>« {{ $lang('上一頁') }}</a>
          </li>
          <li :class="{ disabled: currentPage === totalPages }" @click="nextPage">
            <a>{{ $lang('下一頁') }} »</a>
          </li>
        </ul> -->
        <div class="post">
          <div v-for="item in displayedActivities" :key="item.title" class="item"
            @click="navigateTo('/user/newspaper-content?title=' + item.title)">
            <div class="itemContent">
              <div class="html" v-html="unescapeHtml(item.content)"></div>
            </div>
            <div class="image"><img :src="item.image" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.pages-user-activity
  background-color: #edeff4
  box-sizing: border-box
  overflow: hidden
.tag
  padding: 100px 0
  background-image: url('@/assets/image/wruser/bg11.jpg')
  background-size: cover
  background-position: center
  text-align: center
  text-shadow: 2px 2px 2px #000
  color: #f8f8c0
  font-size: 33px
.post
  max-width: 100%
  width: 1140px
  margin: 80px auto 90px
  .item
    padding: 30px 15px
    display: flex
    align-items: center
    background-color: #fff
    transition: all 0.1s ease
    margin: 20px 0 60px
    border: 1px solid #e1e1e1
    .itemContent
      flex: 1
      padding: 0 20px
      .html
        :deep(p)
          display: none !important
        :deep(.explanation)
          color: #5899dd
          margin-top: 10px
          transition: all .5s ease
    .image
      width: 200px
      img
        width: 100%
    &:hover
      box-shadow: 3px 2px 14px  rgba(0,0,0,.1)
      .itemContent
        .html
          :deep(.explanation)
            color: #3d78b4
@media (max-width: 992px)
  .post
    margin: 40px auto
    .item
      display: block
      .itemContent
        padding: 0
      .image
        width: 100%
        margin-top: 10px
</style>
