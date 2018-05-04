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
  const setPinCode= (pin) => api.setHeader('Pin',pin)
  const removeAuthToken = () => api.setHeader('Authorization', '')
  const removePinCode=() => api.setHeader('Pin','')

  /**** Inscription requests validation */
  const  getRequestsList= () => {
    return api.get('clientRequests')
  }

  const inscriptionAction=(body)=>{
    return api.post('clientRequests',body)
  }

  /**** Transfer Validation */
  const  getTransfersList= () => {
    return api.get('virement/validations')
  }
  const transferAction=(body)=>{
    return api.post('virement/validations',body)
  }


  /****** STATS */
  const getNbVirement=()=>{
    return api.get('nbV')
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
    getTransfersList,
    getNbVirement
  }
}

export default { create }