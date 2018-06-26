import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, RefreshControl } from 'react-native'
import { Text, Button, Icon } from 'native-base'
import { TransferOrderItem, Header, TransferOrderLoaderItem } from '../../Components'

// Redux
import TransferOrderActions from '../../Redux/TransferOrderRedux'

// Styles
import styles from './Styles/TransferOrderHistoryScreenStyles'

class TransferOrderHistoryScreen extends Component {
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

  goToNewTransferOrder = () => {
    this.props.navigation.navigate('NewTransferOrderScreen');
  }

  render() {
    const { history } = this.props
    const historyItems = history.length > 0 ? history : new Array(3);

    return (
      <View style={styles.container}>
        <Header text={'Ordre de Virement'} />
        <View style={styles.historyTitleContainer}>
          <Text style={styles.historyTitle}>Récents </Text>
          <Button transparent iconLeft onPress={this.goToNewTransferOrder} >
            <Icon style={styles.addButton} name='ios-add' />
            <Text style={styles.addButton}>Nouveau</Text>
          </Button>
        </View>
        <FlatList
          style={styles.historyList}
          data={historyItems}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={history.length > 0 ? TransferOrderItem : TransferOrderLoaderItem}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ transferOrder: { history, fetching, error, success } }) => {
  return { history, fetching, error, success }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderHistory: () => dispatch(TransferOrderActions.transferOrderRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferOrderHistoryScreen)
