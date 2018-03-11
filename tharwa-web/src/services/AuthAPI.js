import apisauce from 'apisauce'
import { AUTH_API_URL } from '../config/AppConfig'

const create = (baseURL = AUTH_API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const login = (user) => api.post('pincode', user)
  const confirmPinCode = (data) => api.post('token', data)

  return {
    login,
    confirmPinCode
  }
}

export default { create }