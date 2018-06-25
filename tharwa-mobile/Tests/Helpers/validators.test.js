import {
  requiredValidator,
  emailValidators,
  passwordValidators,
  nameValidators,
  phoneValidators,
  pickerValidators,
  nfcAmountValidators
} from '../../App/Helpers/validators'
import { formatMoney } from '../../App/Transforms';

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


  describe('NFC amount validators', () => {
    const MAX_AMOUNT = 5000
    let validators = nfcAmountValidators(MAX_AMOUNT)

    it('should pass validation', () => {
      const amount = 2000
      expect(validators[0](amount.toString())).toBeUndefined()
    })

    it('should return required error', () => {
      const amount = ''
      expect(validators[0](amount)).toBe('Ce champ est obligatoire')
    })

    it('should return invalid error', () => {
      const amount = -20
      expect(validators[1](amount.toString())).toBe('Le montant est invalide')
    })

    it('should return max amount error', () => {
      const amount = 50001
      expect(validators[2](amount.toString())).toBe(`Montant max est de ${formatMoney(MAX_AMOUNT)} DZD`)
    })
  })
})