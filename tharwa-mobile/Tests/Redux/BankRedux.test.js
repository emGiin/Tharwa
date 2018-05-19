import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/BankRedux'

describe('Bank REDUX', () => {
  it('should dispatch: Bank request', () => {
    const state = reducer(
      INITIAL_STATE,
      Actions.bankRequest()
    )

    expect(state.fetching).toBe(true)
    expect(state.success).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should dispatch: Bank success', () => {
    const data = [{}, {}]
    const state = reducer(INITIAL_STATE, Actions.bankSuccess(data))

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(true)
    expect(state.error).toBeNull()
    expect(state.banks).toEqual(data)
  })

  it('should dispatch: Bank request', () => {
    const error = 'ERROR!'
    const state = reducer(INITIAL_STATE, Actions.bankFailure(error))

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(false)
    expect(state.error).toBe(error)
  })
})