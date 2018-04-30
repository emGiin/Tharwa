import apisauce from 'apisauce';
import {API_URL} from '../config/AppConfig';

const create = (baseURL = API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000
  })

  const register_banquier = (body) => api.post('banquier', body)

  return {
    api,
    register_banquier
  }
}

export default { create }