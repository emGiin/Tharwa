let trans = require('../fixtures/TransfersList.json');
let req = require('../fixtures/RequestsList.json');
let otherList = require('../fixtures/AccountsList.json');

let pinCode, authToken;

let counts=require('../fixtures/counts.json');

export const getDatasetTemplate = data => {
  if (
    true
    //pin === require("../fixtures/realPinCode.json").pinCode &&
    //token === require("../fixtures/token.json").token
  ) {
    return {
      ok: true,
      data: data
    };
  } else {
    return {
      ok: false,
      status: 400,
      data: 'Invalid pin code or token'
    };
  }
};

export const actionTemplate = () => {
  if (
    true
    //data.pin === require("../fixtures/realPinCode.json").pinCode &&
    //data.token === require("../fixtures/token.json").token
  ) {
    return {
      ok: true
    };
  } else {
    return {
      ok: false,
      status: 400,
      data: 'Invalid pin code or token'
    };
  }
};

export default {
  setAuthToken: (token) => {authToken = token},
  setPinCode: (pin) => {pinCode = pin},

  getAuthToken: ()=>authToken,
  getPinCode: ()=>pinCode,

  removeAuthToken: () => {},
  removePinCode: () => {},

  login: authObj => {
    if (
      authObj.username === 'user@email.com' &&
      authObj.password === 'password' &&
      ['email', 'sms'].includes(authObj.confirmation_method)
    ) {
      return {
        ok: true,
        data: require('../fixtures/login.json')
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      };
    }
  },

  confirmPinCode: data => {
    if (
      data.pin === '1234' &&
      data.temporary_token === require('../fixtures/login.json').temporary_token
    ) {
      return {
        ok: true,
        data: require('../fixtures/pinCode.json')
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid pin code'
      };
    }
  },
  getCounts: ()=>{
    return {
      ok: true,
      data: counts
    };
  }
  
  ,

  inscriptions: {
    getDataset: () => getDatasetTemplate(req),
    action: ({ id, code }) => {
      req = req.filter(e => e.email !== id);
      return actionTemplate();
    }
  },

  virements: {
    getDataset: () => getDatasetTemplate(trans),
    action: ({ id, code }) => {
      trans = trans.filter(e => e.code !== id);
      return actionTemplate();
    }
  },

  accounts: {
    getDataset: () => getDatasetTemplate(otherList),
    action: ({ id, code }) => {
      otherList = otherList.filter(e => e.id !== id);
      return actionTemplate();
    }
  },
  
  register_banquier :(data)=>{
    return {
      ok: true,
      status: 200,
      data: "testt ok"
    };
  }
};
