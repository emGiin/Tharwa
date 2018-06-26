import apisauce from 'apisauce'
import { API_URL } from '../Config/AppConfig'

const create = (baseURL = API_URL) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  //#region Authorization
  const setAuthHeaders = (token, pin) => {
    api.setHeader('Authorization', `Bearer ${token}`)
    api.setHeader('Pin', pin)
  }
  const removeAuthHeaders = () => {
    api.setHeader('Authorization', '')
    api.setHeader('Pin', '')
  }
  //#endregion

  const signup = user => api.post('client', user)
  const getProfile = () => api.get('client')
  const getOrderHistory = () => api.get('ordrevirement')
  const requestNewAccount = type => api.post('account', { type })
  const unlockAccount = data => api.post('account/deblocage', data)

  // banks
  const getBanks = () => api.get(`bank`)

  // transfert
  const transferURL = 'virement'
  const myAccountTransfert = data => api.post(`${transferURL}/myaccount`, data)
  const tharwaTransfer = data => api.post(`${transferURL}/intern`, data)
  const externalTransfer = data => api.post(`${transferURL}/extern`, data)
  const sendTransferOrder = data => api.post(`ordrevirement`, data)
  const nfcTransfer = data => api.post(`${transferURL}/micro`, data)
  const getMicroTransferList = () => api.get(`${transferURL}/micro`)

  // exchange rates
  const getExchangeRates = () => api.get(`exchangerate`)


  return {
    api,
    setAuthHeaders,
    removeAuthHeaders,
    signup,
    getProfile,
    getOrderHistory,
    requestNewAccount,
    myAccountTransfert,
    tharwaTransfer,
    getBanks,
    externalTransfer,
    getExchangeRates,
    sendTransferOrder,
    nfcTransfer,
    getMicroTransferList,
    unlockAccount
  }
}

export default { create }
