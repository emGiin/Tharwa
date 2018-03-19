import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
})
