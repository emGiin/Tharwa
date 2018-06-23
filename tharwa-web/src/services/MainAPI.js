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

  const accounts = {
    getDataset: () => api.get('account/validations'),
    action: ({ id, code }) =>
      api.post('account/validations', { id, code })
  };

  const getClientsList=()=> api.get('clients');

  const accountAction=({account, motif, code})=> api.post('accounts',{account, motif, code});

  const getCounts= () => api.get('banquier');
  
  const getTransferOrdersList=()=> api.get('ordreVirement/validations')

  const transferOrderAction=({id, code})=> api.post('ordreVirement/validations',{id,code})

  const getDeblockRequestsList=()=> api.get('accounts/deblock')

  const deblockAccountAction=({account,motif, code})=> api.post('accounts',{account,motif,code})

  return {
    api,
    setAuthToken,
    setPinCode,

    removeAuthToken,
    removePinCode,

    inscriptions,

    virements,

    accounts,

    getCounts,

    getClientsList,
    accountAction,

    getTransferOrdersList,
    transferOrderAction,

    getDeblockRequestsList,
    deblockAccountAction
  };
};

export default { create };
