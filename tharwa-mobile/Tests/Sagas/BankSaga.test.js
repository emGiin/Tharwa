import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import { getBanks } from '../../App/Sagas/BankSaga'
import BankActions from '../../App/Redux/BankRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

describe('Bank SAGA', () => {
  it('should show bank request success path', () => {
    const response = FixtureAPI.getBanks()

    const step = stepper(getBanks(FixtureAPI))

    expect(step(response)).toEqual(call(FixtureAPI.getBanks))
    // Set the bank token on the API
    expect(step(response)).toEqual(put(BankActions.bankSuccess(response.data)))
  })
})
