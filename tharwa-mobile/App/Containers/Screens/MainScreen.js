import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Dimensions,
  RefreshControl, TouchableOpacity,
  View, FlatList
} from 'react-native'
import { Header, Button, Text, Fab } from 'native-base'
import Carousel from 'react-native-snap-carousel';
import { DialogButton } from 'react-native-popup-dialog'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';
import AccountActions from '../../Redux/AccountRedux'
import {
  MainHeader, TransferItem,
  AccountInfo, TransferLoaderItem, LoadingDialog
} from '../../Components'

// Styles
import styles from './Styles/MainScreenStyle'
import { Colors } from '../../Themes';


class MainScreen extends Component {
  state = { refreshing: false, selectedAccount: 'COUR' }

  pages = [
    { type: 'DVUSD', label: 'Compte devise Dollar', symbol: 'Dollar' },
    { type: 'DVEUR', label: 'Compte devise Euro', symbol: 'Euro' },
    { type: 'EPARGN', label: 'Compte Epargne', symbol: 'DZD' },
    { type: 'COUR', label: 'Compte courant', symbol: 'DZD' },
  ]

  componentWillMount() {
    this.props.getProfile()
  }

  _onRefresh() {
    this.props.getProfile()
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  }

  openDrawer = () => {
    this.props.navigation.navigate('DrawerToggle');
  }

  setShownData = page => {
    this.setState({ selectedAccount: this.pages[page].type })
  }

  renderConfirmationDialog = ({ fetching, error }, { selectedAccount }) => (
    <LoadingDialog
      init={/* istanbul ignore next */dialog => { this.dialog = dialog }}
      error={error}
      fetching={fetching}
      fetchingTitle={"Nouveau Compte"}
      fetchingMessage={"Creaction du compte est en cours"}
      defaultTitle={"Nouveau Compte"}
      defaultMessage={"Etes vous sur de creer un nouveau compte?"}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <DialogButton disabled={fetching} text={'Confirmer'}
          onPress={() => {
            this.props.requestNewAccount(selectedAccount);
          }} />
        <DialogButton disabled={fetching} text={'Annuler'}
          onPress={() => { this.dialog.dismiss() }} />
      </View>
    </LoadingDialog>
  )

  render() {
    const { width, height } = Dimensions.get('window')
    const { info } = this.props
    const selectedAccount = info[this.state.selectedAccount]
    const accountHistory = selectedAccount && selectedAccount.history || new Array(Math.floor(height / 100));

    return (
      <View style={styles.container}>
        <MainHeader openDrawer={this.openDrawer} />
        {this.renderConfirmationDialog(this.props, this.state)}
        <View style={styles.carouselContainer}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.pages}
            renderItem={
              ({ item }) => <AccountInfo {...item}
                onPress={
                  info[item.type] ?
                    this.showAccountDetails :
                    () => this.dialog.show()
                }
                account={info[item.type]}
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
          renderItem={selectedAccount ? TransferItem : TransferLoaderItem}
        />


        <ActionButton buttonColor={Colors.forground} renderIcon={() => <Icon name="swap-horizontal" style={styles.actionButtonIcon} />} >

          <ActionButton.Item buttonColor='#9b59b6' title="Virement vers mon compte" titleBgColor='#686464' titleColor='white' onPress={() => { this.props.navigation.navigate('VirementScreen') }}>
            <Icon name="swap-horizontal" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Virement vers un autre client tharwa" titleBgColor='#686464' titleColor='white' onPress={() => { this.props.navigation.navigate('VirementScreen') }}>
            <Icon name="account-switch" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Virement à un autre client d'une banque" titleBgColor='#686464' titleColor='white' onPress={() => { this.props.navigation.navigate('VirementScreen') }}>
            <Icon name="account-multiple" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </View>
    )
  }
}

const mapStateToProps = ({ account: { information: info, fetching, error } }) => {

  return { info, fetching, error }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(AccountActions.accountRequest()),
    requestNewAccount: (...data) => dispatch(AccountActions.newAccountRequest(...data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
