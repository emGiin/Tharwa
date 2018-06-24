import { call, put, select } from 'redux-saga/effects'

import FixtureAPI from '../../services/FixtureAPI'
import { confirmPinCode, selectPinCodeToken } from '../PinCodeSaga'
//import AuthActions from '../../redux/AuthRedux'
import PinCodeActions from '../../redux/PinCodeRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

describe('PIN CODE SAGA', () => {
  it('should show pin code confirmation success path', () => {
   /* const authObj = {
      username: 'user@email.com',
      password: 'password',
      confirmation_method: "sms",
      client_id: '1',
      grant_type: 'password',
    }
    const authResponse = FixtureAPI.login(authObj)
    const pinCode = '1234'
    const pinCodeObj = {
      pin: pinCode,
      temporary_token: authResponse.data.temporary_token
    }*/

    //const response = FixtureAPI.confirmPinCode(pinCodeObj)

    //const step = stepper(confirmPinCode(FixtureAPI, { pinCode }))

    // expect(step(pinCodeObj.temporary_token)).toEqual(select(selectPinCodeToken))

    // expect(step(response)).toEqual(call(FixtureAPI.confirmPinCode, {
    //   pin: pinCode,
    //   temporary_token: response
    // }))
    // // Set the auth token on the API
    // expect(step(response)).toEqual(put(PinCodeActions.pinCodeSuccess()))
    // // Store the auth token in redux
    // expect(step(response)).toEqual(put(AuthActions.saveAuthToken(response.data.token_, pinCode)))
  })


  it('should show pin code confirmation failure path', () => {
    const authObj = {
      username: 'user@email.com',
      password: 'password',
      confirmation_method: "sms",
      client_id: '2',
      grant_type: 'password',
    }
    const authResponse = FixtureAPI.login(authObj)
    const pinCode = '1235'
    const pinCodeObj = {
      pin: pinCode,
      temporary_token: authResponse.data.temporary_token
    }

    const response = FixtureAPI.confirmPinCode(pinCodeObj)

    const step = stepper(confirmPinCode(FixtureAPI, { pinCode }))

    expect(step(pinCodeObj.temporary_token)).toEqual(select(selectPinCodeToken))

    expect(step(response)).toEqual(call(FixtureAPI.confirmPinCode, {
      pin: pinCode,
      temporary_token: response
    }))
    // Set the auth token on the API
    expect(step(response)).toEqual(put(PinCodeActions.pinCodeFailure('Le code pin introduit est errorné ou a expiré')))
  })

  it('should select the pin code token', () => {
    const state = { pinCode: { pinCodeToken: 'token' } }
    // Retrieve the API token
    expect(selectPinCodeToken(state)).toEqual('token')
  })
})
