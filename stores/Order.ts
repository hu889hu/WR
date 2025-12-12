import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
export const useOrderStore = defineStore('order', () => {
  const nuxtapp = useNuxtApp()
  const { t } = nuxtapp.$i18n
  const { api: $API } = useApi()
  const { getAccessToken, setAccessToken } = useAuthStore()
  const orders = ref([])
  const queryOrder = async (params: any) => {
    try {
      const res: any = await $API(`/order/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAccessToken()
        },
        body: JSON.stringify(params)
      })
      if (res.statusCode !== 200) {
        res.statusCode === 400
          ? null
          : ElNotification({
              title: `${t('查詢訂單紀錄')}`,
              showClose: false,
              message: `${t(res.message)}`
            })
        return {
          success: false,
          message: `${t(res.message)}`
        }
      }
      return {
        success: true,
        data: res.data
      }
    } catch (error: any) {
      console.log(`fetch player order error: `, error)
      // ElNotification({
      //   title: `${t('獲取訂單紀錄錯誤')}`,
      //   showClose: false,
      //   message: error.toString()
      // })
      return {
        success: false,
        message: error.toString()
      }
    }
  }
  const queryProduct = async (params: any) => {
    try {
      const res: any = await $API(`/piece/product/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAccessToken()
        },
        body: JSON.stringify(params)
      })
      if (res.statusCode !== 200) {
        res.statusCode === 400
          ? null
          : ElNotification({
              title: `${t('查詢產品列表')}`,
              showClose: false,
              message: `${t(res.message)}`
            })
        return {
          success: false,
          message: `${t(res.message)}`
        }
      }
      return {
        success: true,
        data: res.data
      }
    } catch (error: any) {
      console.log(`fetch player order error: `, error)
      // ElNotification({
      //   title: `${t('獲取訂單紀錄錯誤')}`,
      //   showClose: false,
      //   message: error.toString()
      // })
      return {
        success: false,
        message: error.toString()
      }
    }
  }
  const queryInventory = async (params: any) => {
    try {
      const res: any = await $API(`/piece/inventory/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAccessToken()
        },
        body: JSON.stringify(params)
      })
      if (res.statusCode !== 200) {
        res.statusCode === 400
          ? null
          : ElNotification({
              title: `${t('查詢玩家庫存')}`,
              showClose: false,
              message: `${t(res.message)}`
            })
        return {
          success: false,
          message: `${t(res.message)}`
        }
      }
      return {
        success: true,
        data: res.data
      }
    } catch (error: any) {
      console.log(`fetch player order error: `, error)
      // ElNotification({
      //   title: `${t('獲取訂單紀錄錯誤')}`,
      //   showClose: false,
      //   message: error.toString()
      // })
      return {
        success: false,
        message: error.toString()
      }
    }
  }
  const bet = async (params: any) => {
    try {
      const res: any = await $API(`/power/bet`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAccessToken()
        }
      })
      if (res.statusCode !== 200) {
        let message = ''
        if (res.statusCode === 400) {
          ElNotification({
            title: `${t('下單失敗')}`,
            type: 'error',
            showClose: false,
            message: `${t(res.data.message)}`
          })
          message = `${t(res.data.message)}`
        }
        if (res.statusCode === 401) {
          ElNotification({
            title: `${t('下單失敗')}`,
            type: 'error',
            showClose: false,
            message: res.data.message
          })
          message = res.data.message
        }
        return {
          success: false,
          message: message
        }
      }
      return {
        success: true,
        data: res.data
      }
    } catch (error: any) {
      console.log(`post player bet error: `, error)
      ElNotification({
        title: `${t('下注錯誤')}`,
        showClose: false,
        message: error.toString()
      })
      return {
        success: false,
        message: error.toString()
      }
    }
  }
  const betProduct = async (params: any) => {
    try {
      const res: any = await $API(`/piece/order`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAccessToken()
        }
      })
      if (res.statusCode !== 200) {
        let message = ''
        if (res.statusCode === 400) {
          ElNotification({
            title: `${t('下單失敗')}`,
            type: 'error',
            showClose: false,
            message: `${t(res.data.message)}`
          })
          message = `${t(res.data.message)}`
        }
        console.log(res.statusCode, 66688, res.statusCode === 401)

        if (res.statusCode === 401) {
          console.log(res.statusCode, 66677)

          ElNotification({
            title: `${t('下單失敗')}`,
            type: 'error',
            showClose: false,
            message: res.message
          })
          message = res.message
        }
        return {
          success: false,
          message: message
        }
      }
      return {
        success: true,
        data: res.data
      }
    } catch (error: any) {
      console.log(`dwadawddfff`, error)
      // ElNotification({
      //   title: `${t('下單錯誤')}`,
      //   showClose: false,
      //   message: error.toString()
      // })
      // return {
      //   success: false,
      //   message: error.toString()
      // }
    }
  }
  const queryWorkOrder = async (params: any) => {
    try {
      const res: any = await $API(`/piece/order/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAccessToken()
        },
        body: JSON.stringify(params)
      })
      if (res.statusCode !== 200) {
        res.statusCode === 400
          ? null
          : ElNotification({
              title: `${t('查詢訂單紀錄')}`,
              showClose: false,
              message: `${t(res.message)}`
            })
        return {
          success: false,
          message: `${t(res.message)}`
        }
      }
      return {
        success: true,
        data: res.data
      }
    } catch (error: any) {
      console.log(`fetch player order error: `, error)
      // ElNotification({
      //   title: `${t('獲取訂單紀錄錯誤')}`,
      //   showClose: false,
      //   message: error.toString()
      // })
      return {
        success: false,
        message: error.toString()
      }
    }
  }
  return {
    orders,
    queryProduct,
    queryInventory,
    queryOrder,
    queryWorkOrder,
    bet,
    betProduct
  }
})
