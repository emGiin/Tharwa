import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/SignupRedux'

describe('Signup REDUX', () => {
  it('should dispatch: Singup request', () => {
    const state = reducer(
      INITIAL_STATE,
      Actions.signupRequest()
    )

    expect(state.fetching).toBe(true)
    expect(state.success).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should dispatch: Singup success', () => {
    const state = reducer(INITIAL_STATE, Actions.signupSuccess())

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(true)
    expect(state.error).toBeNull()
  })

  it('should dispatch: Signup failure', () => {
    const error = 'ERROR!'
    const state = reducer(INITIAL_STATE, Actions.signupFailure(error))

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(false)
    expect(state.error).toBe(error)
  })
})