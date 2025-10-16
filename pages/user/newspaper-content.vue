<script lang="ts" setup>
const store = useSiteStore()
const { queryCampaign } = store
const { locale } = useI18n()
const lang = locale.value
const siteStore = useSiteStore()
const activitiesPerPage = ref(5)
const currentPage = ref(1)
const router = useRouter()
const route = useRoute()
await useAsyncData(async () => {
  await queryCampaign(lang)
})

const newstitle = computed(() => {
  return route.query.title
})

const displayedActivities = computed(() => {
  const start = (currentPage.value - 1) * activitiesPerPage.value
  console.log(start);

  return store.campaign.result.filter((activity) => {
    return activity.title.includes(newstitle.value)
  })
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
        <div class="post">
          <div v-for="item in displayedActivities" :key="item.title" class="item">
            <div class="itemContent">
              <div class="html" v-html="unescapeHtml(item.content)"></div>
            </div>
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
  background-image: url('@/assets/image/wruser/bg12.jpg')
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
    padding: 20px 15px
    display: flex
    align-items: center
    background-color: #fff
    transition: all 0.3s ease
    .itemContent
      padding: 0 20px
      .html
        white-space: pre-line
        :deep(img)
          @media (max-width: 992px)
            width: 100%
        :deep(.explanation)
          display: none
        :deep(p)
          margin: 20px 0 !important
</style>
