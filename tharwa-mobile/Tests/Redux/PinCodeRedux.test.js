import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/PinCodeRedux'

describe('Pin Code REDUX', () => {
  it('should dispatch: PIN CODE request', () => {
    const state = reducer(
      INITIAL_STATE,
      Actions.pinCodeRequest()
    )

    expect(state.fetching).toBe(true)
    expect(state.success).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should dispatch: PIN CODE success', () => {
    const state = reducer(INITIAL_STATE, Actions.pinCodeSuccess())

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(true)
    expect(state.error).toBeNull()
  })

  it('should dispatch: PIN CODE failure', () => {
    const error = 'ERROR!'
    const state = reducer(INITIAL_STATE, Actions.pinCodeFailure(error))

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(false)
    expect(state.error).toBe(error)
  })

  it('should dispatch: PIN CODE TOKEN save', () => {
    const pinCodeToken = 'token'
    const state = reducer(INITIAL_STATE, Actions.savePinCodeToken(pinCodeToken))

    expect(state.pinCodeToken).toBe(pinCodeToken)
  })
})