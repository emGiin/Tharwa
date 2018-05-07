import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import {
  myAccountTransfer,
  tharwaTransfer,
  externalTransfer
} from '../../App/Sagas/TransferSaga'
import TransferActions from '../../App/Redux/TransferRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

describe('Transfer SAGA', () => {
  it('should show tharwa transfer request success path', () => {
    const data = { amount: 200 }
    const response = FixtureAPI.tharwaTransfer(data)

    const step = stepper(tharwaTransfer(FixtureAPI, { data }))

    expect(step(response)).toEqual(call(FixtureAPI.tharwaTransfer, data))
    // Set the transfer token on the API
    expect(step(response)).toEqual(put(TransferActions.transferSuccess(response.data.commission)))
  })

  it('should show external transfer request success path', () => {
    const data = { amount: 200 }
    const response = FixtureAPI.externalTransfer(data)

    const step = stepper(externalTransfer(FixtureAPI, { data }))

    expect(step(response)).toEqual(call(FixtureAPI.externalTransfer, data))
    // Set the transfer token on the API
    expect(step(response)).toEqual(put(TransferActions.transferSuccess(response.data.commission)))
  })


  it('should show my account transfer request success path', () => {
    const initialData = { amount: 200, from: 'cour', to: 'epar' }
    const data = { amount: 200, method: 'cour_epar' }

    const response = FixtureAPI.myAccountTransfer(data)

    const step = stepper(myAccountTransfer(FixtureAPI, { data: initialData }))

    expect(step(response)).toEqual(call(FixtureAPI.myAccountTransfer, data))
    // Set the transfer token on the API
    expect(step(response)).toEqual(put(TransferActions.transferSuccess(response.data.commission)))
  })
})
