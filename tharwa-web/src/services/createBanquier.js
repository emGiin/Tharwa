import apisauce from 'apisauce';
import {URL_CREATE_BANQUIER} from '../config/AppConfig';

const create = (baseURL = URL_CREATE_BANQUIER) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000
  })

  const register_banquier = (nom) => api.post('banquierInfo', {
    nom:nom
  })

  return {
    api,
    register_banquier
  }
}

export default { create }