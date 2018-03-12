import { call, put, select } from "redux-saga/effects";

import FixtureAPI from "../../services/FixtureAPI";
import { login, logout, loadToken, selectAuthToken } from "../AuthSaga";
import AuthActions from "../../redux/AuthRedux";
import PinCodeActions from "../../redux/PinCodeRedux";

const stepper = fn => mock => fn.next(mock).value;

describe("Authentication SAGA", () => {
  it("should show login success path", () => {
    const authObj = {
      username: "user@email.com",
      password: "password",
      confirmation_method: 2,
      client_id: "1",
      grant_type: "password"
    };

    const response = FixtureAPI.login(authObj);

    const step = stepper(
      login(FixtureAPI, {
        email: "user@email.com",
        password: "password",
        confirmationMethod: 2
      })
    );

    expect(step(response)).toEqual(call(FixtureAPI.login, authObj));
    // Set the auth token on the API
    expect(step(response)).toEqual(put(AuthActions.authSuccess()));
    // Store the auth token in redux
    expect(step(response)).toEqual(
      put(PinCodeActions.savePinCodeToken(response.data.temporary_token))
    );
  });

  it('should show login failure path', () => {
    const authObj = {
      username: 'use@email.com',
      password: 'password',
      confirmation_method: 2,
      client_id: '1',
      grant_type: 'password',
    }

    const response = FixtureAPI.login(authObj)

    const step = stepper(login(FixtureAPI, {
      email: 'use@email.com',
      password: 'password',
      confirmationMethod: 2
    }))

    // Attempt to login and fail
    expect(step(response)).toEqual(call(FixtureAPI.login, authObj))
    // Send the error
    expect(step(response)).toEqual(put(AuthActions.authFailure('Email ou mot de passe incorrect!')))
  })

  it('should show login load path with no token', () => {
    const step = stepper(loadToken(FixtureAPI))
    // Attempt to select the token
    expect(step()).toEqual(select(selectAuthToken))
    // No token was found so call success
    expect(step()).toEqual(put(AuthActions.tokenLoadSuccess()))
  })


});
