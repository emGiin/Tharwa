import { StackNavigator } from 'react-navigation'
import {
  PendingScreen,
  RegisterScreen,
  PinCodeScreen,
  LoginScreen,
  LaunchScreen,
  NfcPendingScreen,
  NfcTransferScreen,
  UnlockAccountScreen,
  NewTransferOrderScreen
} from '../Containers/Screens'
import AppDrawer from './DrawerNavigation'
import styles from './Styles/NavigationStyles'

const headerHidden = { navigationOptions: { header: null } }

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    AppDrawer: { screen: AppDrawer },
    NfcPendingScreen: { screen: NfcPendingScreen, ...headerHidden },
    NfcTransferScreen: { screen: NfcTransferScreen, ...headerHidden },
    PendingScreen: { screen: PendingScreen, ...headerHidden },
    RegisterScreen: { screen: RegisterScreen, ...headerHidden },
    PinCodeScreen: { screen: PinCodeScreen, ...headerHidden },
    LoginScreen: { screen: LoginScreen, ...headerHidden },
    LaunchScreen: { screen: LaunchScreen, ...headerHidden },
    UnlockAccountScreen: { screen: UnlockAccountScreen, ...headerHidden },
    NewTransferOrderScreen: { screen: NewTransferOrderScreen, ...headerHidden },
  }, {
    // Default config for all screens
    // initialRouteName: 'NfcPendingScreen',
    initialRouteName: 'LoginScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)

export default PrimaryNav
