import React from 'react';
import I18n from 'react-native-i18n'
import { Icon } from 'native-base'
import { DrawerNavigator } from 'react-navigation'
import { MainScreen } from '../Containers/Screens'
import { Header } from '../Components'
import Drawer from './DrawerComponent'
import DrawerIcon from './DrawerIcon'

const AppDrawer = DrawerNavigator({
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      drawerLabel: 'Comptes',
      drawerIcon: props => <DrawerIcon {...props} icon='account-box' />
    }
  },
  HistoryScreen: {
    screen: MainScreen,
    navigationOptions: {
      drawerLabel: 'Historique',
      drawerIcon: props =>
        <DrawerIcon {...props} icon='timer-sand-full' unselectedIcon='timer-sand-empty' />
    }
  },
  TransactionScreen: {
    screen: MainScreen,
    navigationOptions: {
      drawerLabel: 'Virement',
      drawerIcon: props => <DrawerIcon {...props} icon='swap-horizontal' unselectedIcon='swap-horizontal' />
    }
  },
  MicroTransactionScreen: {
    screen: MainScreen,
    navigationOptions: {
      drawerLabel: 'Micro virement',
      drawerIcon: props => <DrawerIcon {...props} icon='check-all' unselectedIcon='check-all' />
    }
  },
  TransactionOrderScreen: {
    screen: MainScreen,
    navigationOptions: {
      drawerLabel: 'Ordres de virement',
      drawerIcon: props => <DrawerIcon {...props} icon='reorder-horizontal' unselectedIcon='reorder-horizontal' />
    }
  },
  NotificationScreen: {
    screen: MainScreen,
    navigationOptions: {
      drawerLabel: 'Notification',
      drawerIcon: props => <DrawerIcon {...props} icon='bell' />
    }
  },
  ExchangeRateScreen: {
    screen: MainScreen,
    navigationOptions: {
      drawerLabel: 'Taux de change',
      drawerIcon: props => <DrawerIcon {...props} icon='currency-gbp' unselectedIcon='currency-gbp' />
    }
  }
}, {
    initialRouteName: 'MainScreen',
    contentComponent: Drawer
  }
);

AppDrawer.navigationOptions = {
  // header: <Header icon={'md-arrow-round-back'} text={"Bonjour"} />
  header: null
};

export default AppDrawer