import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { TransferFormClientAccount } from '../../Components'
import { TransferForm } from '../Forms'

// Styles
import styles from './Styles/TransferScreenStyle'
import { Colors } from '../../Themes';

class TransferScreen extends Component {
  forms = {
    "myAccount": TransferFormClientAccount,
    "tharwaAccount": TransferForm,
    "externalAccount": TransferForm,
  }

  submit = data => {
    console.warn(data);
  }

  render() {
    const { params = { type: 'tharwaAccount' } } = this.props.navigation.state;
    const fetching = false;
    const Form = this.forms[params.type]

    return (
      <View style={{ height: '100%', flex: 1, backgroundColor: '#c9d0de'}}>
        <TransferFormClientAccount />
     
      </View>
    )
  }
}

const mapStateToProps = ({ transfert: { fetching, error, success } }) => {
  return {
    fetching, error, success
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferScreen)
