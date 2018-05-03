import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Dimensions,
  RefreshControl, TouchableOpacity,
  View, FlatList
} from 'react-native'
import { Text } from 'native-base'
import Carousel from 'react-native-snap-carousel';
import AccountActions from '../../Redux/AccountRedux'
import { MainHeader, TransferItem, AccountInfo } from '../../Components'

// Styles
import styles from './Styles/MainScreenStyle'
import { Colors } from '../../Themes';


class MainScreen extends Component {
  state = { refreshing: false, selectedAccount: 'COUR' }

  pages = [
    { key: 'DVUSD', type: 'Compte devise Dollar', symbol: 'Dollar' },
    { key: 'DVEUR', type: 'Compte devise Euro', symbol: 'Euro' },
    { key: 'EPARGN', type: 'Compte Epargne', symbol: 'DZD' },
    { key: 'COUR', type: 'Compte courant', symbol: 'DZD' },
  ]

  componentWillMount() {
    this.props.getProfile()
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  }

  openDrawer = () => {
    this.props.navigation.navigate('DrawerToggle');
  }

  setShownData = page => {
    this.setState({ selectedAccount: this.pages[page].key })
  }

  render() {
    const { width } = Dimensions.get('window')
    const { info } = this.props
    const selectedAccount = info[this.state.selectedAccount]
    const accountHistory = selectedAccount && selectedAccount.history || []

    return (
      <View style={styles.container}>
        <MainHeader openDrawer={this.openDrawer} />
        <View style={{ height: 160 }}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.pages}
            renderItem={
              ({ item }) => <AccountInfo {...item}
                account={info[item.key]}
              />
            }
            sliderWidth={width}
            firstItem={3}
            parallax={true}
            contentContainerCustomStyle={{ height: 150, padding: 0 }}
            containerCustomStyle={{ height: 250 }}
            itemWidth={width - 50}
            onSnapToItem={this.setShownData}
          />
        </View>

        <View style={styles.historyTitleContainer}>
          <Text style={styles.historyTitle}>Action récentes </Text>
        </View>

        <FlatList
          style={styles.historyList}
          data={accountHistory}
          // TODO: change refresh control style
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          keyExtractor={(item, index) => index}
          renderItem={TransferItem}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ account: { information: info } }) => {
  return { info }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(AccountActions.accountRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
