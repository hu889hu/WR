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
const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const totalPages = computed(() => {
  return Math.ceil(store.campaign.total / activitiesPerPage.value)
})
const displayedActivities = computed(() => {
  const start = (currentPage.value - 1) * activitiesPerPage.value
  return store.campaign.result.slice(start, start + activitiesPerPage.value)
})
</script>

<template>
  <div class="pages">
    <div class="title">
      {{ $lang('優惠活動') }}
    </div>
    <ul class="pagination">
      <li :class="{ disabled: currentPage === 1 }" @click="previousPage">
        <a>« {{ $lang('上一頁') }}</a>
      </li>
      <li :class="{ disabled: currentPage === totalPages }" @click="nextPage">
        <a>{{ $lang('下一頁') }} »</a>
      </li>
    </ul>
    <div class="post">
      <div v-for="item in displayedActivities" :key="item.title" class="Item">
        <input :id="item.title" type="checkbox" />
        <label :for="item.title">
          <div class="itemTitle" style="cursor: pointer">
            <div class="image"><img :src="item.image" /></div>
          </div>
          <div class="itemContent">
            {{ item.title }}
            <br />
            <div class="html" v-html="item.content"></div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.pages
  padding: 0 20px 20px
  @media screen and (max-width: 768px)
    padding: 0 10px 10px
</style>

<style scoped lang="sass">
.pagination
  display: flex
  padding-left: 0
  list-style: none
  border-radius: .25rem
  margin: 20px 0
  li
    margin: 0 5px 0 0
  li.disabled
    opacity: .5
    pointer-events: none
  a
    background-color: #ffffff
    color: rgba(0, 0, 0, .87)
    padding: 3px 10px
    border-radius: 2px
    font-size: 14px
    font-weight: 500
    transition: box-shadow .2s cubic-bezier(.4,0,1,1), background-color .2s cubic-bezier(.4,0,.2,1), color .2s cubic-bezier(.4,0,.2,1)
    outline: 0
    border: 0
</style>

<style scoped lang="sass">
.title
  background-color: #c8a375
  width: 100%
  margin: 0 auto 20px
  border-radius: 50px
  line-height: 40px
  height: 40px
  font-size: 20px
  padding: 0 30px
  font-weight: bold
  color: #fff
  @media screen and (min-width: 768px)
    padding: 0 30px
    line-height: 55px
    height: 55px
    font-size: 24px
    width: calc(100% - 30px)
.post
  margin: 10px 0
  .Item
    position: relative
    background-color: #fff
    margin: 10px 0
    width: 100%
    .itemContent
      display: none
      padding: 10px 5px 20px 5px
    input[type="checkbox"]
      display: none
    label
      width: 100%
    input[type="checkbox"]:checked ~ label .itemContent
      display: block
    .itemTitle
      width: 100%
      .image
        width: 100%
        img
          width: 100%
          max-height: 400px
          object-fit: cover
          border-radius: 5px
          margin: 0 0 10px 0
</style>
