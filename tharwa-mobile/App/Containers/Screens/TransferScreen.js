import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { TransferFormClientAccount } from '../../Components'

// Styles
import styles from './Styles/TransferScreenStyle'

class TransferScreen extends Component {
  render() {
    return (
      <View style={{ height: '100%', flex: 1, backgroundColor: '#f3f3f3' }}>
        <TransferFormClientAccount />
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

export default connect(mapStateToProps, mapDispatchToProps)(TransferScreen)
