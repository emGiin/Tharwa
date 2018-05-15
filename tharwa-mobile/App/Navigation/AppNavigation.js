import { StackNavigator } from 'react-navigation'
import {
  PendingScreen,
  RegisterScreen,
  PinCodeScreen,
  LoginScreen,
  LaunchScreen,
  NFCScreen
} from '../Containers/Screens'
import AppDrawer from './DrawerNavigation'
import styles from './Styles/NavigationStyles'

const headerHidden = { navigationOptions: { header: null } }

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    AppDrawer: { screen: AppDrawer },
    NFCScreen: { screen: NFCScreen },
    PendingScreen: { screen: PendingScreen, ...headerHidden },
    RegisterScreen: { screen: RegisterScreen, ...headerHidden },
    PinCodeScreen: { screen: PinCodeScreen, ...headerHidden },
    LoginScreen: { screen: LoginScreen, ...headerHidden },
    LaunchScreen: { screen: LaunchScreen, ...headerHidden },
  }, {
    // Default config for all screens
    initialRouteName: 'NFCScreen',
    // initialRouteName: 'LaunchScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)

export default PrimaryNav
