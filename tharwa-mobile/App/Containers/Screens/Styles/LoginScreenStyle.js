import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logoName: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff'
  },
  logo: {
    marginTop: 60,
    height: 140,
    width: 140,
    resizeMode: 'contain'
  },
  loginBg: {
    ...ApplicationStyles.screen.backgroundImage,
  },
  dialogContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContent: {
    textAlign: 'center',
    color: '#555',
    fontSize: 20
  }
})
