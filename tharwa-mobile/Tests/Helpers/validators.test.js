import { emailValidators, passwordValidators } from '../../App/Helpers/validators'

describe('Validators', () => {
  it('should pass email validation', () => {
    const email = 'user@email.com'
    expect(emailValidators[0](email)).toBeUndefined()
    expect(emailValidators[1](email)).toBeUndefined()
  })

  it('should return email validation errors', () => {
    const email = 'user@email'
    expect(emailValidators[0]()).toBe('Le champ Email est obligatoire')
    expect(emailValidators[1](email)).toBe('Le format d\'email est invalide')
  })

  it('should pass password validation', () => {
    const password = 'password'
    expect(passwordValidators[0](password)).toBeUndefined()
    expect(passwordValidators[1](password)).toBeUndefined()
  })

  it('should return password validation errors', () => {
    const password = 'pass'
    expect(passwordValidators[0]()).toBe('Le champ Mot de passe est obligatoire')
    expect(passwordValidators[1](password)).toBe('Le mot de passe doit comporter au moins 8 caractères')
  })
})