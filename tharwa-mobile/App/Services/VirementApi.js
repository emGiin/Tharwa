import apisauce from 'apisauce'
import { VIREMENT_API_URL } from '../Config/AppConfig'

const create = (baseURL = VIREMENT_API_URL) => {
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

const virement = (method,amount) => api.post('virement',method,amount)

  return {
    api,
    virement   
  }
}

export default { create }
