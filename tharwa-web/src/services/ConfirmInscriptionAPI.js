import apisauce from 'apisauce'
import { API_URL } from '../config/AppConfig'

const create = (baseURL = API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000
  })

  const  getRequestsList= (data) => {
    //api.setHeaders({'Authorization': data.token}) todo how to send token and pin code
    api.post('requestsList', data)
  }
  return {
    api,
    getRequestsList
  }
}

export default { create }