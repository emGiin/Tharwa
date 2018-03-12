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
});
