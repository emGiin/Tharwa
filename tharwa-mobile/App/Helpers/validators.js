import I18n from 'react-native-i18n'

// validators
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const emailValidators = [
  (val) => val ? undefined : I18n.t('fieldRequiredError'),
  (val) => val && emailRegex.test(val) ? undefined : I18n.t('invalidEmailError')
]

export const passwordValidators = [
  (val) => val ? undefined : I18n.t('fieldRequiredError'),
  (val) => val && val.length >= 8 ? undefined : I18n.t('passwordLengthError')
]