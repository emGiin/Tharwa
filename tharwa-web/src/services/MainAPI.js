import apisauce from 'apisauce';
import { API_URL } from '../config/AppConfig';

const create = (baseURL = API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  });

  const setAuthToken = userAuth =>
    api.setHeader('Authorization', 'Bearer ' + userAuth);
  const setPinCode = pin => api.setHeader('Pin', pin);

  const removeAuthToken = () => api.setHeader('Authorization', '');
  const removePinCode = () => api.setHeader('Pin', '');

  const inscriptions = {
    getDataset: () => api.get('clientRequests'),
    action: ({ id, code }) => api.post('clientRequests', { email: id, code })
  };

  const virements = {
    getDataset: () => api.get('virement/validations'),
    action: ({ id, code }) =>
      api.post('virement/validations', { virement_code: id, code })
  };

  return {
    api,
    setAuthToken,
    setPinCode,

    removeAuthToken,
    removePinCode,

    inscriptions,

    virements
  };
};

export default { create };
