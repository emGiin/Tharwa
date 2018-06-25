import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Dimensions, View,
  FlatList, RefreshControl
} from 'react-native'
import { Text } from 'native-base'
import Carousel from 'react-native-snap-carousel';
import { DialogButton } from 'react-native-popup-dialog'
import {
  MainHeader, TransferItem,
  AccountInfo, TransferLoaderItem, LoadingDialog
} from '../../Components'

// Redux
import AccountActions from '../../Redux/AccountRedux'

// Styles
import styles from './Styles/MainScreenStyle'


class MainScreen extends Component {
  state = { refreshing: false, selectedAccount: 'COUR' }

  pages = [
    { type: 'DVUSD', label: 'Compte devise Dollar', symbol: 'Dollar' },
    { type: 'DVEUR', label: 'Compte devise Euro', symbol: 'Euro' },
    { type: 'EPARN', label: 'Compte Epargne', symbol: 'DZD' },
    { type: 'COUR', label: 'Compte courant', symbol: 'DZD' },
  ]

  componentWillMount() {
    this.props.getProfile()
  }

  onRefresh() {
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

  renderConfirmationDialog = ({ fetching, error, success, reset }, { selectedAccount }) => (
    <LoadingDialog
      init={/* istanbul ignore next */dialog => { this.dialog = dialog }}
      error={error}
      reset={reset}
      success={success}
      fetching={fetching}
      successTitle={"Nouveau Compte"}
      successMessage={"Nouveau Compte crée avec succes"}
      fetchingTitle={"Nouveau Compte"}
      fetchingMessage={"Creation du compte est en cours"}
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
    const { width } = Dimensions.get('window')
    const { info } = this.props
    const selectedAccount = info[this.state.selectedAccount]
    const accountHistory = (selectedAccount && selectedAccount.history) || new Array(3);

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
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={selectedAccount ? TransferItem : TransferLoaderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = ({
  account: { information: info, fetching, error, success }
}) => {
  return { info, fetching, error, success }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(AccountActions.accountRequest()),
    requestNewAccount: (...data) =>
      dispatch(AccountActions.newAccountRequest(...data)),
    reset: () => dispatch(AccountActions.newAccountReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
