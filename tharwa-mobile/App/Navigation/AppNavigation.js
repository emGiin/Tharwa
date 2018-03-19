import { StackNavigator } from 'react-navigation'
import {
  MainScreen,
  PendingScreen,
  RegisterScreen,
  PinCodeScreen,
  LoginScreen,
  LaunchScreen
} from '../Containers/Screens'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    PendingScreen: { screen: PendingScreen },
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
  }
)

export default PrimaryNav
