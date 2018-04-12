import {
  requiredValidator,
  emailValidators,
  passwordValidators,
  nameValidators,
  phoneValidators,
  pickerValidators
} from '../../App/Helpers/validators'

describe('Validators', () => {

  describe('required validator', () => {
    it('should show required error', () => {
      expect(requiredValidator()).toBe('Ce champ est obligatoire')
    })

    it('should pass required error', () => {
      const input = 'random'
      expect(requiredValidator(input)).toBeUndefined()
    })
  })

  describe('email validator', () => {
    it('should pass validation', () => {
      const email = 'user@email.com'
      expect(emailValidators[1](email)).toBeUndefined()
    })

    it('should return validation errors', () => {
      const email = 'user@email'
      expect(emailValidators[1](email)).toBe('Le format d\'email est invalide')
    })
  })

  describe('Password validators', () => {
    it('should pass validation', () => {
      const password = 'password'
      expect(passwordValidators[1](password)).toBeUndefined()
    })

    it('should return validation errors', () => {
      const password = 'pass'
      expect(passwordValidators[1](password)).toBe('Le mot de passe doit comporter au moins 8 caractères')
    })
  })

  describe('name validators', () => {
    it('should pass validation', () => {
      const name = 'random name'
      expect(nameValidators[1](name)).toBeUndefined()
    })

    it('should return validation errors', () => {
      const name = 'random;name'
      expect(nameValidators[1](name)).toBe('Le format de ce champ est invalide')
    })
  })

  describe('phone validators', () => {
    it('should pass validation', () => {
      const phone = '0659874542'
      expect(phoneValidators[1](phone)).toBeUndefined()
    })

    it('should return validation errors', () => {
      const phone = '04298745428'
      expect(phoneValidators[1](phone)).toBe('Ce numéro de téléphone est invalide')
    })
  })

  describe('picker validators', () => {
    it('should pass validation', () => {
      const picker = 'random'
      expect(pickerValidators[0](picker)).toBeUndefined()
    })

    it('should return validation errors', () => {
      const picker = 'placeholder'
      expect(pickerValidators[0](picker)).toBe('Ce champ est obligatoire')
    })
  })
})