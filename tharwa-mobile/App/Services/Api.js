import apisauce from 'apisauce'
import config from 'react-native-config'

const create = (baseURL = config.API_URL) => {
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
  const login = (user) => api.post('oath/pincode', user)
  const confirmPinCode = (data) => api.post('oath/token', data)
  const register = (user) => api.post('api/client/register', user)
  const changePassword = (newPassword) => api.post('api/change-password')

  const getBankAccount = (bankAccountId) => api.get('api/client/bank-accounts/' + bankAccountId)
  const getBankAccounts = (options) => api.get('api/client/bank-accounts', options)

  return {
    getBankAccounts,
    getBankAccount,
    setAuthToken,
    removeAuthToken,
    login,
    confirmPinCode,
    register,
    changePassword
  }
}

export default { create }
