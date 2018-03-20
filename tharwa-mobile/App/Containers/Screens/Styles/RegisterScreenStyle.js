import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  formContainer: {
    paddingTop: 0,
    backgroundColor: Colors.background
  },
  signupTxt: {
    color: '#555',
    textAlign: 'center',
    marginVertical: 20
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  sucessContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.background
  },
  sucessText: {
    fontSize: 18,
    paddingHorizontal: 30,
    color: Colors.white,
    textAlign: 'center'
  }
})
