// validators
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const emailValidators = [
  (val) => val ? undefined : 'Le champ Email est obligatoire',
  (val) => val && emailRegex.test(val) ? undefined : 'Le format d\'email est invalide'
]

export const passwordValidators = [
  (val) => val ? undefined : 'Le champ Mot de passe est obligatoire',
  (val) => val && val.length >= 8 ? undefined : 'Le mot de passe doit comporter au moins 8 caractères'
]