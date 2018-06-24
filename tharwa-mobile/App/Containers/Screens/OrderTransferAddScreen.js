import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Dimensions, View,
  FlatList, RefreshControl
} from 'react-native'
import { Text} from 'native-base'
import Carousel from 'react-native-snap-carousel';
import { DialogButton } from 'react-native-popup-dialog'
import {
  MainHeader, TransferOrderItem, Header,
  AccountInfo, TransferOrderLoaderItem, LoadingDialog
} from '../../Components'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
// Redux
import OrderTransferAddActions from '../../Redux/TransferOrderRedux'

// Styles
import styles from './Styles/TransferOrderScreenStyles'


class OrderTransferAddScreen extends Component {
  state = { refreshing: false }

  componentWillMount() {
    this.props.getOrderHistory()
  }

  onRefresh() {
    this.props.getOrderHistory()
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  }



  render() {
    const { width } = Dimensions.get('window')
    const { OrderInfos } = this.props

    const OrderHistory = OrderInfos.length > 0 ? OrderInfos : new Array(3);

    return (
      <View style={styles.container}>
        <Header
          text={'Ordre de Virement'}
        />



        <View style={styles.historyTitleContainer}>
          <Text style={styles.historyTitle}>Ordres de Virement récents </Text>
        </View>

        <FlatList
          style={styles.historyList}
          data={OrderHistory}
          // TODO: change refresh control style
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          keyExtractor={(item, index) => index}
          renderItem={OrderInfos.length > 0 ? TransferOrderItem : TransferOrderLoaderItem}
        />
        <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
      </View>
    
    )
  }
}

const mapStateToProps = ({
  transferOrder: { information: { OrderInfos }, fetching, error, success }
}) => {
  return { OrderInfos, fetching, error, success }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderHistory: () => dispatch(TransferOrderActions.transferOrderRequest())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransfertOrderScreen)