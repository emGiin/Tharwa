import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logoName: {
    fontSize: 30,
    marginTop: 30,
    textAlign: 'center'
  },
  logo: {
    marginTop: 10,
    height: 150,
    width: 150,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center',
  },
  loginBtn: {
    paddingHorizontal: 50,
    marginTop: 20,
    alignSelf: 'center'
  },
  signupBtn: {
    alignSelf: 'center',
    marginTop: 50,
  },
  formContainer: {
    marginHorizontal: 10,
    marginTop: 10
  }
})
