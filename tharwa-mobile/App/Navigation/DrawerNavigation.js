import React from 'react';
import { DrawerNavigator } from 'react-navigation'
import { MainScreen } from '../Containers/Screens'
import { DrawerIcon } from '../Components'
import AppTabBar from './TabNavigation'
import Drawer from '../Containers/Drawer'

const AppDrawer = DrawerNavigator({
  AppTabBar: {
    screen: AppTabBar,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
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
    initialRouteName: 'AppTabBar',
    contentComponent: Drawer
  }
);

AppDrawer.navigationOptions = {
  // header: <Header icon={'md-arrow-round-back'} text={"Bonjour"} />
  header: null
};

export default AppDrawer