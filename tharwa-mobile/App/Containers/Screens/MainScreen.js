import React, { Component } from 'react'
import { RefreshControl, TouchableOpacity, View, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Header, Button, Text } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CarouselPager from 'react-native-carousel-pager';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MainScreenStyle'
import { Colors, Images } from '../../Themes'

MainHeader = ({ openDrawer }) => (
  <Header
    style={styles.container}
    backgroundColor={Colors.forground}
    androidStatusBarColor={Colors.forground}
  >
    <TouchableOpacity
      style={styles.leftButton}
      onPress={openDrawer}>
      <Icon size={32} color={Colors.white} name="menu" />
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.rightButton}
      onPress={openDrawer}>
      <Icon size={32} color={Colors.white} name="bell" />
      <View
        style={{ height: 15, width: 15, borderRadius: 20, backgroundColor: "#c0392b", alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 2, right: 0 }}>
        <Text style={{ fontSize: 10, color: '#fff' }}>2</Text>
      </View>
    </TouchableOpacity>
  </Header>
)

HistoryItem = ({ item }) => (
  <View key={item.key}>
    <View style={{ borderWidth: 1, borderColor: '#fff' }} />
    <View
      style={{
        paddingLeft: 10, marginVertical: 5, marginHorizontal: 10, borderLeftWidth: 7, borderLeftColor: '#999', flexDirection: 'row', justifyContent: 'space-between'
      }}>
      <View>
        <Text>{item.type}</Text>
        <Text>{item.amount}</Text>
      </View>
      <View>
        <Text>{item.date}</Text>
        <Text>{item.time}</Text>
      </View>
    </View>
  </View>
)

class MainScreen extends Component {
  state = { refreshing: false }

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
    return (
      <View style={{ height: '100%', flex: 1, backgroundColor: '#f3f3f3' }}>
        <MainHeader openDrawer={this.openDrawer} />

        <CarouselPager
          ref={ref => this.carousel = ref}
          initialPage={3}
          pageStyle={styles.pageContainer}>
          <View key={'page0'} style={styles.page}>
            <Text style={styles.account}>COMPTE DEVISE EURO</Text>
            <Text style={styles.amount}>4 705 EURO</Text>
          </View>
          <View key={'page1'} style={styles.page}>
            <TouchableOpacity>
              <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 5, }}>COMPTE DEVISE DOLLAR</Text>
              <Text style={{ color: '#fff', fontSize: 26, marginBottom: 5, textAlign: 'center' }}>Demander la creation de ce compte</Text>
            </TouchableOpacity>
          </View>
          <View key={'page2'} style={styles.page}>
            <Text style={styles.account}>COMPTE EPARGNE</Text>
            <Text style={styles.amount}>41 205 DA</Text>
          </View>
          <View key={'page3'} style={styles.page}>
            <Text style={styles.account}>COMPTE COURANT</Text>
            <Text style={styles.amount}>80 570,64 DA</Text>
          </View>
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
          renderItem={HistoryItem}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
