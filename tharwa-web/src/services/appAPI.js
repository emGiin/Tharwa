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

  /**** Inscription requests validation */
  const  getRequestsList= () => {
    return api.get('newRequests')
  }

  const inscriptionAction=(body)=>{
    return api.post('newRequests',body)
  }

  /**** Transfer Validation */
  const  getTransfersList= () => {
    return api.get('transfers')
  }
  const transferAction=(body)=>{
    return api.post('transfers',body)
  }
  return {
    api,
    getRequestsList,
    setAuthToken,
    setPinCode,
    removeAuthToken,
    removePinCode,
    inscriptionAction,
    transferAction,
    getTransfersList
  }
}

export default { create }