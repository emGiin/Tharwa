import apisauce from 'apisauce'
import { AUTH_API_URL } from '../Config/AppConfig'

const create = (baseURL = AUTH_API_URL) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 30000
  })

  const login = (user) => api.post('pincode', user)
  const confirmPinCode = (data) => api.post('token', data)

  return {
    api,
    login,
    confirmPinCode
  }
}

export default { create }
