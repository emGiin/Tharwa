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
          <TouchableOpacity style={{ backgroundColor: '#555' }}>
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
  state = { refreshing: false, shownData: [] }
  pages = [
    { key: 'DVUSD', type: 'Compte devise Dollar' },
    { key: 'DVEUR', type: 'Compte devise Euro' },
    { key: 'EPARGN', type: 'Compte Epargne' },
    { key: 'COUR', type: 'Compte courant' },
  ]

  componentWillReceiveProps() {
    const { info } = this.props

    if (info && this.state.shownData.length === 0) {
      const currentPage = this.pages[3].key
      console.warn(this.props.info, this.props.info[currentPage]);
      this.setState({ shownData: this.props.info[currentPage] })
    }
  }

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
    const currentPage = this.pages[page].key
    if (this.props.info && this.props.info[currentPage]) {
      this.setState({ shownData: this.props.info[currentPage].history })
    } else {
      this.setState({ shownData: [] })
    }
  }

  render() {
    const { info } = this.props
    return (
      <View style={styles.container}>
        <MainHeader openDrawer={this.openDrawer} />

        <CarouselPager
          ref={ref => this.carousel = ref}
          initialPage={3}
          onPageChange={this.setShownData}
          pageStyle={{ backgroundColor: '#ffffffbb', height: 100 }}>
          {
            this.pages.map(({ key, type }) => <AccountInfo key={key} account={info[key]} type={type} />)
          }
        </CarouselPager>

        <View style={styles.historyTitleContainer}>
          <Text style={styles.historyTitle}>Action récentes</Text>
        </View>

        <FlatList
          style={styles.historyList}
          data={this.state.shownData}
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
