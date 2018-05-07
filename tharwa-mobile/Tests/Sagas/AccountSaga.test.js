import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import { getProfile, requestNewAccount } from '../../App/Sagas/AccountSaga'
import AccountActions from '../../App/Redux/AccountRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

describe('Account SAGA', () => {
  it('should show profile request success path', () => {
    const response = FixtureAPI.getProfile()

    const step = stepper(getProfile(FixtureAPI))

    expect(step(response)).toEqual(call(FixtureAPI.getProfile))
    // Set the account token on the API
    expect(step(response)).toEqual(put(AccountActions.accountSuccess(response.data)))
  })


  it('should show new account request success path', () => {
    const requestType = "epargn"
    const response = FixtureAPI.requestNewAccount(requestType)

    const step = stepper(requestNewAccount(FixtureAPI, { requestType }))

    expect(step(response)).toEqual(call(FixtureAPI.requestNewAccount, requestType))
    // Set the account token on the API
    expect(step(response)).toEqual(put(AccountActions.newAccountSuccess(response.data)))
  })
})
