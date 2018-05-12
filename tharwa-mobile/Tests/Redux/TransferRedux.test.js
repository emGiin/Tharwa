import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/TransferRedux'

describe('Transfer REDUX', () => {
  it('should dispatch: My Account Transfer request', () => {
    const state = reducer(
      INITIAL_STATE,
      Actions.myAccountTransferRequest({})
    )

    expect(state.fetching).toBe(true)
    expect(state.success).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should dispatch: Tharwa Transfer request', () => {
    const state = reducer(
      INITIAL_STATE,
      Actions.tharwaTransferRequest({})
    )

    expect(state.fetching).toBe(true)
    expect(state.success).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should dispatch: External Transfer request', () => {
    const state = reducer(
      INITIAL_STATE,
      Actions.externalTransferRequest({})
    )

    expect(state.fetching).toBe(true)
    expect(state.success).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should dispatch: Transfer success', () => {
    const commission = 200
    const state = reducer(INITIAL_STATE, Actions.transferSuccess(commission))

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(true)
    expect(state.error).toBeNull()
    expect(state.commission).toEqual(commission)
  })

  it('should dispatch: Transfer request', () => {
    const error = 'ERROR!'
    const state = reducer(INITIAL_STATE, Actions.transferFailure(error))

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(false)
    expect(state.error).toBe(error)
  })

  it('should dispatch: Transfer reset', () => {
    const state = reducer(INITIAL_STATE, Actions.transferReset())
    expect(state).toEqual(INITIAL_STATE)
  })
})