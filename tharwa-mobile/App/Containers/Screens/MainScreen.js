import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Dimensions,
  RefreshControl, TouchableOpacity,
  View, FlatList
} from 'react-native'
import { Text } from 'native-base'
import Carousel from 'react-native-snap-carousel';
import { Circle, Rect } from 'react-native-svg'
import AccountActions from '../../Redux/AccountRedux'
import {
  MainHeader, TransferItem,
  AccountInfo, ContentLoader
} from '../../Components'

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
        <View style={styles.carouselContainer}>
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

        {/* <ContentLoader
          primaryColor="#e8f7ff"
          secondaryColor="#4dadf7"
          height={300}
          duration={1000}>
          <Circle cx="30" cy="30" r="30" />
          <Rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
          <Rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
          <Rect x="0" y="70" rx="5" ry="5" width="400" height="200" />
        </ContentLoader> */}
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
