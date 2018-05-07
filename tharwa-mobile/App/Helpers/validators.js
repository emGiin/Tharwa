import I18n from 'react-native-i18n'

// validators
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const nameRegex = /^[a-zA-Z '-.]*$/
const phoneRegex = /^0[5-7]\d{8}$/
const accountRegex = /^\d{6}$/
const amountRegex = /^(\d{1,3}(?: ?\d{3})*(?:\.\d{2})?|\.\d{2})?$/

export const requiredValidator = (val) => val ? undefined : I18n.t('fieldRequiredError')

export const amountValidators = [
  requiredValidator,
  (val) => val && amountRegex.test(val) ? undefined : I18n.t('invalidAmountError')
]

export const accountValidators = [
  requiredValidator,
  (val) => val && accountRegex.test(val) ? undefined : I18n.t('invalidAccountError')
]

export const emailValidators = [
  requiredValidator,
  (val) => val && emailRegex.test(val) ? undefined : I18n.t('invalidEmailError')
]

export const passwordValidators = [
  requiredValidator,
  (val) => val && val.length >= 8 ? undefined : I18n.t('passwordLengthError')
]

export const nameValidators = [
  requiredValidator,
  (val) => val && nameRegex.test(val) ? undefined : I18n.t('invalidNameError')
]

export const phoneValidators = [
  requiredValidator,
  (val) => val && phoneRegex.test(val) ? undefined : I18n.t('invalidPhoneError')
]

export const addressValidators = [
  requiredValidator
]

export const pickerValidators = [
  val => (val !== 'placeholder' || !val) ? undefined : I18n.t('fieldRequiredError'),
]
