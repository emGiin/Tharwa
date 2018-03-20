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

  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.setHeader('Authorization', '')
  const signup = (user) => api.post('client/signup', user)
  const changePassword = (newPassword) => api.post('change-password')

  const getBankAccount = (bankAccountId) => api.get('client/bank-accounts/' + bankAccountId)
  const getBankAccounts = (options) => api.get('client/bank-accounts', options)

  return {
    getBankAccounts,
    getBankAccount,
    setAuthToken,
    removeAuthToken,
    signup,
    changePassword
  }
}

export default { create }
