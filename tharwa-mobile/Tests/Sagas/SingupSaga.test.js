import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import { signup } from '../../App/Sagas/SignupSaga'
import SignupActions from '../../App/Redux/SignupRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

describe('Signup SAGA', () => {
  it('should show singup success path', () => {
    const user = {
      email: 'user@email.com',
      password: 'password',
      lastName: 'lastName',
      firstName: 'firstName',
      phone: '0666666666',
      address: 'address',
      function: 'student',
      type: '1',
      picture: 'picture'
    }

    const response = FixtureAPI.signup(user)

    const step = stepper(signup(FixtureAPI, { user }))

    expect(step(response)).toEqual(call(FixtureAPI.signup, user))

    expect(step(response)).toEqual(put(SignupActions.signupSuccess()))
  })

  it('should show singup failure path', () => {
    const user = {
      email: 'user@email',
      password: 'password',
      lastName: 'lastName',
      firstName: 'firstName',
      phone: '0666666666',
      address: 'address',
      function: 'student',
      type: '1',
      picture: 'picture'
    }

    const response = FixtureAPI.signup(user)

    const step = stepper(signup(FixtureAPI, { user }))

    expect(step(response)).toEqual(call(FixtureAPI.signup, user))

    expect(step(response)).toEqual(put(SignupActions.signupFailure('Veuillez vérifier les données introduites')))
  })
})
