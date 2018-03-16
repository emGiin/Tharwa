import { StyleSheet } from 'react-native'
import FormStyles from './FormStyle'

export default StyleSheet.create({
  ...FormStyles,
  loginBtn: {
    paddingHorizontal: 70,
    marginTop: 30,
    alignSelf: 'center',
    height: 40,
    borderColor: '#16a085',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'transparent'
  },
  signupBtn: {
    alignSelf: 'center',
    marginTop: 40
  }
})
