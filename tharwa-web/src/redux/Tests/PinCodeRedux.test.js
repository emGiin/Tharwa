import Actions, { reducer, INITIAL_STATE } from '../PinCodeRedux'

describe('Pin Code REDUX', () => {
  it('should handle pinCodeRequest', () => {
    const state = reducer(
      INITIAL_STATE,
      Actions.pinCodeRequest()
    )

    expect(state.fetching).toBe(true)
    expect(state.success).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should handle pinCodeSuccess', () => {
    const state = reducer(INITIAL_STATE, Actions.pinCodeSuccess())

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(true)
    expect(state.error).toBeNull()
  })

})