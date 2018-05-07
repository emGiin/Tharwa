import React from 'react';
import { TabNavigator } from 'react-navigation'
import {
  MainScreen,
  MyAccountTransferScreen,
  TharwaTransferScreen,
  ExternalTransferScreen
} from '../Containers/Screens'
import { DrawerIcon as TabIcon } from '../Components'
import TabBar from '../Containers/TabBar'

const screens = {
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      tabBarLabel: 'Acceuil',
      tabBarIcon: props => <TabIcon {...props} icon='home' />
    }
  },
  TransactionScreen: {
    screen: MyAccountTransferScreen,
    navigationOptions: {
      tabBarLabel: 'Compte Virement',
      tabBarIcon: props => <TabIcon {...props} icon='swap-horizontal' unselectedIcon='swap-horizontal' />,
      params: { type: 'myAccount' }
    }
  },
  TharwaTransactionScreen: {
    screen: TharwaTransferScreen,
    navigationOptions: {
      tabBarLabel: 'Virement Tharwa',
      tabBarIcon: props => <TabIcon {...props} icon='transfer' unselectedIcon='transfer' />,
      params: { type: 'tharwaAccount' }
    }
  },
  ExternalTransactionScreen: {
    screen: ExternalTransferScreen,
    navigationOptions: {
      tabBarLabel: 'Virement externe',
      tabBarIcon: props => <TabIcon {...props} icon='bank' unselectedIcon='bank' />,
      params: { type: 'externalAccount' }
    }
  },
  TransactionOrderScreen: {
    screen: MainScreen,
    navigationOptions: {
      tabBarLabel: 'Ordres de virement',
      tabBarIcon: props => <TabIcon {...props} icon='reorder-horizontal' unselectedIcon='reorder-horizontal' />
    }
  },
  ExchangeRateScreen: {
    screen: MainScreen,
    navigationOptions: {
      tabBarLabel: 'Taux de change',
      tabBarIcon: props => <TabIcon {...props} icon='currency-gbp' unselectedIcon='currency-gbp' />
    }
  }
}

const AppTabs = TabNavigator(screens, {
  initialRouteName: 'MainScreen',
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  tabBarComponent: props => <TabBar screens={screens} {...props} />,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
});

AppTabs.navigationOptions = {
  header: null
};

export default AppTabs