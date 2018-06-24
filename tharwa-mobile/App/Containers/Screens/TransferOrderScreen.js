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
  MainHeader, TransferOrderItem, Header,
  AccountInfo, TransferOrderLoaderItem, LoadingDialog
} from '../../Components'

// Redux
import TransferOrderActions from '../../Redux/TransferOrderRedux'

// Styles
import styles from './Styles/TransferOrderScreenStyles'


class TransfertOrderScreen extends Component {
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
