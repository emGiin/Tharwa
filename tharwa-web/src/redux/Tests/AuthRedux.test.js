import Actions, { reducer, INITIAL_STATE } from "../AuthRedux";

describe("Authentication REDUX", () => {
  it("should handle authRequest", () => {
    const email = "test@email.com";
    const password = "password";
    const confirmationMethod = 1;

    const state = reducer(
      INITIAL_STATE,
      Actions.authRequest(email, password, confirmationMethod)
    );

    expect(state.fetching).toBe(true);
    expect(state.success).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle authSuccess', () => {
    const pinCodeToken = 'token'
    const state = reducer(INITIAL_STATE, Actions.authSuccess(pinCodeToken))

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(true)
    expect(state.error).toBeNull()
  })

  it('should handle authFailure', () => {
    const error = 'ERROR!'
    const state = reducer(INITIAL_STATE, Actions.authFailure(error))

    expect(state.fetching).toBe(false)
    expect(state.success).toBe(false)
    expect(state.error).toBe(error)
  })

  it('should handle tokenLoad', () => {
    const state = reducer(INITIAL_STATE, Actions.tokenLoad())

    expect(state.loading).toBe(true)
  })

  it('should handle tokenLoadSuccess', () => {
    const state = reducer(INITIAL_STATE, Actions.tokenLoadSuccess())

    expect(state.loading).toBe(false)
  })

  it('should handle tokenSave', () => {
    const authToken = 'token'
    const state = reducer(INITIAL_STATE, Actions.saveAuthToken(authToken))

    expect(state.authToken).toBe(authToken)
  })

  it('should handle logoutRequest', () => {
    const authToken = 'token'
    const loginState = reducer(INITIAL_STATE, Actions.saveAuthToken(authToken))
    const state = reducer(loginState, Actions.logoutRequest())

    expect(state.authToken).toBeNull()
  })

  it('should handle logoutSuccess', () => {
    const state = reducer(INITIAL_STATE, Actions.logoutSuccess())

    expect(state.authToken).toBeNull()
    expect(state.error).toBeNull()
    expect(state.fetching).toBe(false)
    expect(state.loading).toBe(false)
    expect(state.success).toBe(false)
  })


});
