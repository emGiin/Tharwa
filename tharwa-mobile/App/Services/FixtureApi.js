export default {
  // auth fixtures
  setAuthHeaders: () => { },
  removeAuthHeaders: () => { },
  login: (authObj) => {
    if (
      authObj.username === 'user@email.com' &&
      authObj.password === 'password' &&
      ['sms', 'email'].includes(authObj.confirmation_method)
    ) {
      return {
        ok: true,
        data: require('../Fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  confirmPinCode: (data) => {
    if (
      data.pin_code === '1234' &&
      data.temporary_token === require('../Fixtures/login.json').temporary_token
    ) {
      return {
        ok: true,
        data: require('../Fixtures/pinCode.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid pin code'
      }
    }
  },
  signup: (data) => {
    if (
      data.email === 'user@email.com' &&
      data.password === 'password' &&
      data.lastName === 'lastName' &&
      data.firstName === 'firstName' &&
      data.phone === '0666666666' &&
      data.address === 'address' &&
      data.address === 'address' &&
      data.function === 'student' &&
      data.type === '1' &&
      data.picture === 'picture'
    ) {
      return { ok: true }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'validation error'
      }
    }
  },
  getProfile: data => {
    return {
      ok: true,
      data: require('../Fixtures/profile.json')
    }
  },
  requestNewAccount: type => {
    return {
      ok: true
    }
  },
  tharwaTransfer: data => {
    return {
      ok: true
    }
  },
  getBanks: () => {
    return {
      ok: true,
      data: require('../Fixtures/banks.json')
    }
  },
}
