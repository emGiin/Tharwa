import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/AuthRedux'

test('AUTH request', () => {
  const email = 'test@email.com'
  const password = 'password'
  const confirmationMethod = 'sms'
  const state = reducer(
    INITIAL_STATE,
    Actions.authRequest(email, password, confirmationMethod)
  )

  expect(state.fetching).toBe(true)
  expect(state.success).toBe(false)
  expect(state.error).toBeNull()
})

test('AUTH success', () => {
  const pinCodeToken = 'token'
  const state = reducer(INITIAL_STATE, Actions.authSuccess(pinCodeToken))

  expect(state.fetching).toBe(false)
  expect(state.success).toBe(true)
  expect(state.error).toBeNull()
})

test('AUTH failure', () => {
  const error = 'ERROR!'
  const state = reducer(INITIAL_STATE, Actions.authFailure(error))

  expect(state.fetching).toBe(false)
  expect(state.success).toBe(false)
  expect(state.error).toBe(error)
})

test('TOKEN save', () => {
  const authToken = 'token'
  const state = reducer(INITIAL_STATE, Actions.saveAuthToken(authToken))

  expect(state.authToken).toBe(authToken)
})

test('TOKEN load', () => {
  const state = reducer(INITIAL_STATE, Actions.tokenLoad())

  expect(state.loading).toBe(true)
})

test('TOKEN load success', () => {
  const state = reducer(INITIAL_STATE, Actions.tokenLoadSuccess())

  expect(state.loading).toBe(false)
})


test('LOGOUT success', () => {
  const state = reducer(INITIAL_STATE, Actions.logoutSuccess())

  expect(state.authToken).toBeNull()
  expect(state.error).toBeNull()
  expect(state.fetching).toBe(false)
  expect(state.loading).toBe(false)
  expect(state.success).toBe(false)
})
