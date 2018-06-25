import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Header, NextPrevious } from '../../Components'

// Redux
import TransferOrderActions from '../../Redux/TransferOrderRedux'

// Styles
import styles from './Styles/NewTransferOrderScreenStyle'

class TransferOrderHistoryScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Header text={'Ajouter Ordre de Virement'} />
        <View style={styles.container}>

        </View>
        <NextPrevious isFinal onSubmit={() => { }} />
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
