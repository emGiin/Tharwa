import { StackNavigator } from 'react-navigation'
import MainScreen from '../Containers/MainScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import PinCodeScreen from '../Containers/PinCodeScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  MainScreen: { screen: MainScreen },
  RegisterScreen: { screen: RegisterScreen },
  PinCodeScreen: { screen: PinCodeScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
