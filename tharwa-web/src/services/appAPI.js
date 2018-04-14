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

  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const setPinCode= (pin) => api.setHeader('code_pin',pin)
  const removeAuthToken = () => api.setHeader('Authorization', '')
  const removePinCode=() => api.setHeader('code_pin','')

  const  getRequestsList= () => {
    return api.get('newRequests')
  }

  const inscriptionAction=(body)=>{
    return api.post('newRequests',body)
  }
  return {
    api,
    getRequestsList,
    setAuthToken,
    setPinCode,
    removeAuthToken,
    removePinCode,
    inscriptionAction
  }
}

export default { create }