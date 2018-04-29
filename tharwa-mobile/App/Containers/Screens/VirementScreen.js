import React, { Component } from 'react'
import { RefreshControl, TouchableOpacity, View, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Header, Button, Text } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import YourActions from '../Redux/YourRedux'

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
// Styles
import styles from './Styles/VirementScreenStyle'
import { Colors, Images } from '../../Themes'

class VirementScreen extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(VirementScreen)
