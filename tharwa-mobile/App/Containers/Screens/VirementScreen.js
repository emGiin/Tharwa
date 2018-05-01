import React, { Component } from 'react'
import { RefreshControl, TouchableOpacity, View, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Header, Button, Text } from 'native-base'
import { VirementFormClientCompte } from '../../Components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import YourActions from '../Redux/YourRedux'

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

  render() {
    return (
      <View style={{ height: '100%', flex: 1, backgroundColor: '#f3f3f3' }}>
            
             <VirementFormClientCompte/>
           
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
