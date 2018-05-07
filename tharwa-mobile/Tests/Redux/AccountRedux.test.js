import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/AccountRedux'

describe('Account REDUX', () => {
  it('should dispatch: Account request', () => {
    const state = reducer(
      INITIAL_STATE,
      Actions.accountRequest()
    )

    expect(state.fetching).toBe(true)
    expect(state.success).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should dispatch: Account success', () => {
    const data = { info: {} }
    const state = reducer(INITIAL_STATE, Actions.accountSuccess(data))

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(true)
    expect(state.error).toBeNull()
    expect(state.information).toEqual(data)
  })

  it('should dispatch: Account request', () => {
    const error = 'ERROR!'
    const state = reducer(INITIAL_STATE, Actions.accountFailure(error))

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(false)
    expect(state.error).toBe(error)
  })

  it('should dispatch:  save account type', () => {
    const accountType = 'client'
    const state = reducer(INITIAL_STATE, Actions.saveAccountType(accountType))

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(false)
    expect(state.accountType).toBe(accountType)
  })


  it('should dispatch: New Account request', () => {
    const state = reducer(
      INITIAL_STATE,
      Actions.newAccountRequest()
    )

    expect(state.fetching).toBe(true)
    expect(state.success).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should dispatch: New Account success', () => {
    const state = reducer(INITIAL_STATE, Actions.newAccountSuccess())

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(true)
    expect(state.error).toBeNull()
  })
})