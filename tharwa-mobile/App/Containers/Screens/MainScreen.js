import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RefreshControl, TouchableOpacity, View, FlatList } from 'react-native'
import { Text } from 'native-base'
import CarouselPager from 'react-native-carousel-pager';
import AccountActions from '../../Redux/AccountRedux'
import { MainHeader, TransferItem } from '../../Components'

// Styles
import styles from './Styles/MainScreenStyle'


AccountInfo = ({ account, type }) => (
  <View style={styles.page}>
    {
      account ?
        (
          <TouchableOpacity>
            <Text style={styles.account}>{type}</Text>
            <Text style={styles.amount}>{account.amount}</Text>
          </TouchableOpacity>
        ) :
        (
          <TouchableOpacity>
            <Text style={styles.newAccount}>{type}</Text>
            <Text style={styles.newAccountRequest}>
              Demander la creation de ce compte
            </Text>
          </TouchableOpacity>
        )
    }
  </View>
)

class MainScreen extends Component {
  state = { refreshing: false }
  pages = [
    { key: 'COUR', type: 'Compte courant' },
    { key: 'EPARGN', type: 'Compte Epargne' },
    { key: 'DVEUR', type: 'Compte devise Euro' },
    { key: 'DVUSD', type: 'Compte devise Dollar' },
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

  render() {
    const { info } = this.props
    return (
      <View style={styles.container}>
        <MainHeader openDrawer={this.openDrawer} />

        <CarouselPager
          ref={ref => this.carousel = ref}
          initialPage={3}
          pageStyle={{
            backgroundColor: '#ffffffbb',
            height: 100
          }}>
          {
            this.pages.map(({ key, type }) => <AccountInfo key={key} account={info[key]} type={type} />)
          }
        </CarouselPager>

        <View style={styles.historyTitleContainer}>
          <Text style={styles.historyTitle}>Action récentes</Text>
        </View>

        <FlatList
          style={styles.historyList}
          data={[
            { key: 1, type: 'Compte courant', date: '27/01/2018', time: '10:45 PM', amount: '-5 000 DA' },
            { key: 2, type: 'Compte epargne', date: '01/02/2018', time: '11:06 AM', amount: '+2 000 DA' },
            { key: 1, type: 'Compte courant', date: '27/01/2018', time: '10:45 PM', amount: '-5 000 DA' },
            { key: 2, type: 'Compte epargne', date: '01/02/2018', time: '11:06 AM', amount: '+2 000 DA' },
            { key: 1, type: 'Compte courant', date: '27/01/2018', time: '10:45 PM', amount: '-5 000 DA' },
            { key: 2, type: 'Compte epargne', date: '01/02/2018', time: '11:06 AM', amount: '+2 000 DA' },
            { key: 1, type: 'Compte courant', date: '27/01/2018', time: '10:45 PM', amount: '-5 000 DA' },
            { key: 2, type: 'Compte epargne', date: '01/02/2018', time: '11:06 AM', amount: '+2 000 DA' },
          ]}
          // TODO: change refresh control style
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
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
