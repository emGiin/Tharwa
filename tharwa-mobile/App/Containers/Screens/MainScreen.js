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

  renderHeader = () => (
    <Header
      style={styles.container}
      backgroundColor={Colors.forground}
      androidStatusBarColor={Colors.forground}
    >
      <TouchableOpacity
        style={styles.leftButton}
        onPress={this.openDrawer}>
        <Icon size={32} color={Colors.white} name="menu" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rightButton}
        onPress={this.openDrawer}>
        {/* TODO: change it to notification */}
        <Image style={styles.imagePreview} source={Images.avatar} />
      </TouchableOpacity>
    </Header>
  )

  render() {
    return (
      <View style={{ height: '100%', flex: 1, backgroundColor: '#f3f3f3' }}>
        {this.renderHeader()}

        <CarouselPager
          ref={ref => this.carousel = ref}
          initialPage={3}
          pageStyle={{ backgroundColor: '#ffffffbb', height: 100 }}>
          <View key={'page0'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#555', borderRadius: 5 }}></View>
          <View key={'page1'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#555', borderRadius: 5 }}></View>
          <View key={'page2'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#555', borderRadius: 5 }}></View>
          <View key={'page3'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#555', borderRadius: 5 }}>
            <Text style={{ fontSize: 16 }}>SOLDE COURANT</Text>
            <Text style={{ fontSize: 26, margin: 5 }}>80 570,64 DA</Text>
          </View>
        </CarouselPager>

        <View style={{ marginTop: -250, borderBottomColor: '#555', borderBottomWidth: 1, marginHorizontal: 20 }}>
          <Text style={{ color: '#555' }}>Action récentes</Text>
        </View>

        <FlatList
          style={{ marginTop: 20 }}
          data={[
            { key: 'Devin' },
            { key: 'Jackson' },
            { key: 'James' },
            { key: 'Joel' },
            { key: 'John' },
            { key: 'Jillian' },
            { key: 'Jimmy' },
            { key: 'Julie' },
          ]}
          // TODO: change refresh control style
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          renderItem={({ item }) => (
            <View key={item.key}>
              <View style={{ borderWidth: 1, borderColor: '#fff' }} />
              <View
                style={{
                  paddingLeft: 10, marginVertical: 5, marginHorizontal: 10, borderLeftWidth: 7, borderLeftColor: '#999', flexDirection: 'row', justifyContent: 'space-between'
                }}>
                <View>
                  <Text>Compte courant</Text>
                  <Text>-5 000 DA</Text>
                </View>
                <View>
                  <Text>27/01/2018</Text>
                  <Text>10:45 PM</Text>
                </View>
              </View>
            </View>
          )}
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
