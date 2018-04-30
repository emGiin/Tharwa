let trans = require('../fixtures/TransfersList.json');
let req = require('../fixtures/RequestsList.json');
let otherList = require('../fixtures/AccountsList.json');
export default {
  setAuthToken: () => {},
  setPinCode: () => {},

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

  inscriptions: {
    getDataset: () => {
      if (
        true
        //pin === require("../fixtures/realPinCode.json").pinCode &&
        //token === require("../fixtures/token.json").token
      ) {
        return {
          ok: true,
          data: req
        };
      } else {
        return {
          ok: false,
          status: 400,
          data: 'Invalid pin code or token'
        };
      }
    },
    action: ({ id, code }) => {
      const body = { email: id, code };
      req = req.filter(e => e.email !== body.email);
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
    }
  },

  virements: {
    getDataset: () => {
      if (
        true
        //pin === require("../fixtures/realPinCode.json").pinCode &&
        //token === require("../fixtures/token.json").token
      ) {
        return {
          ok: true,
          data: trans //require("../fixtures/TransfersList.json")
        };
      } else {
        return {
          ok: false,
          status: 400,
          data: 'Invalid pin code or token'
        };
      }
    },

    action: ({ id, code }) => {
      const body = { virement_code: id, code };
      trans = trans.filter(e => e.code !== body.virement_code);
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
    }
  },

  accounts: {
    getDataset: () => {
      if (
        true
        //pin === require("../fixtures/realPinCode.json").pinCode &&
        //token === require("../fixtures/token.json").token
      ) {
        return {
          ok: true,
          data: otherList //require("../fixtures/TransfersList.json")
        };
      } else {
        return {
          ok: false,
          status: 400,
          data: 'Invalid pin code or token'
        };
      }
    },

    action: ({ id, code }) => {
      const body = { id, code };
      otherList = otherList.filter(e => e.id !== body.id);
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
    }
  }
};
