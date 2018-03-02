import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logoName: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff'
  },
  logo: {
    marginTop: 60,
    height: 125,
    width: 125,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center',
  },
  loginBtn: {
    paddingHorizontal: 70,
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 5,
    height: 40,
    backgroundColor: 'rgb(37, 110, 158)'
  },
  signupBtn: {
    alignSelf: 'center',
    marginTop: 40
  },
  formContainer: {
    marginHorizontal: 10,
    marginTop: 10
  },
  whiteColor: {
    color: '#fff'
  },
  inputTxt: {
    marginTop: 10,
    height: 40,
    backgroundColor: '#00000080',
    borderColor: '#00000070',
    borderRadius: 3
  },
  loginBg: {
    ...ApplicationStyles.screen.backgroundImage,
  },
  inputIcon: {
    color: '#ffffff90',
    fontSize: 20
  },
  inputContainer: {
    paddingHorizontal: 40,
    width: '100%'
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
