import { StackNavigator } from 'react-navigation'
import {
  PendingScreen,
  RegisterScreen,
  PinCodeScreen,
  LoginScreen,
  LaunchScreen,
  TransferScreen
} from '../Containers/Screens'
import AppDrawer from './DrawerNavigation'
import AppTabBar from './TabNavigation'
import styles from './Styles/NavigationStyles'

const headerHidden = { navigationOptions: { header: null } }

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    AppDrawer: { screen: AppDrawer },
    AppTabBar: { screen: AppTabBar },
    PendingScreen: { screen: PendingScreen, ...headerHidden },
    RegisterScreen: { screen: RegisterScreen, ...headerHidden },
    PinCodeScreen: { screen: PinCodeScreen, ...headerHidden },
    LoginScreen: { screen: LoginScreen, ...headerHidden },
    LaunchScreen: { screen: LaunchScreen, ...headerHidden },
    TransferScreen: { screen: TransferScreen, ...headerHidden },
  }, {
    // Default config for all screens
    initialRouteName: 'AppTabBar',
    // initialRouteName: 'LaunchScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)

export default PrimaryNav
