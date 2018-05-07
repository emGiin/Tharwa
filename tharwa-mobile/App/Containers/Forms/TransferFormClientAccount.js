
import React, { Component } from 'react'
import { Container, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, Text, Item, Input, Label } from "native-base";
import PropTypes from 'prop-types'
import { Colors, Images } from '../../Themes'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { InputField, Header, PickerField } from "../../Components"
import {
  nameValidators, accountValidators,
  requiredValidator, amountValidators
} from '../../Helpers/validators'
import { connect } from 'react-redux'

import I18n from 'react-native-i18n'


class TransferFormClientAccount extends Component {




  constructor(props) {
    super(props);
    this.state = {
      ItemAccountTypeSelected: undefined,

    };

  }

  componentWillReceiveProps({ info }) {
    if (info) {
      this.props.info = info
    }
  }

  setAccountType(info) {
    if (info['EPARGN']) {
      const epargne = { label: 'Epargne', value: 'epar' }
      itemsAccountTypeFrom.push(epargne)
      itemsAccountTypeClient.push(epargne)
    }
    if (info['DVUSD']) {
      const deviseusd = { label: 'Devise USD', value: 'devi_usd' }
      itemsAccountTypeFrom.push(deviseusd)
      itemsAccountTypeClient.push(deviseusd)
    }
    if (info['DVEUR']) {
      const devisereur = { label: 'Devise EUR', value: 'devi_eur' }
      itemsAccountTypeFrom.push(devisereur)
      itemsAccountTypeClient.push(devisereur)
    }

  }


  focusOn = (field) => {
    /* istanbul ignore next */
    if (this[field] && this[field].getRenderedComponent)
      this[field].getRenderedComponent().refs[field]._root.focus()
  }
  getItems() {
    if (this.state.ItemAccountTypeSelected === 'cour') {
      return itemsAccountTypeFrom;
    }
    else {
      return itemsAccountTypeTo;
    }
  }
  onValueChange(value) {
    this.setState({
      ItemAccountTypeSelected: value
    });
  }

  render() {
    const { editable, handleSubmit } = this.props
    const { info } = this.props
    itemsAccountTypeFrom = []
    itemsAccountTypeClient = [
      { label: 'Courant', value: 'cour' },
    ]
    itemsAccountTypeTo = [
      { label: 'Courant', value: 'cour' },
    ];
    this.setAccountType(info)
    return (
      <Container>
        <Header
          text={'Virement'}
        />
        <Content style={{ marginTop: -20,
          backgroundColor: Colors.background
        }}>
        <Content style={{
          marginLeft: 40, marginTop: 70, marginRight: 40,
          backgroundColor: Colors.background
        }}>
          <Content >

            {/* <Text style={{ marginBottom: 10, fontSize: 18, color: Colors.white, textAlign: 'center' }}> Choisir le compte </Text>*/}
            <Field
              name={'from'}
              icon={'ios-briefcase'}
              component={PickerField}
              editable={editable}
              placeholder={I18n.t('accountFromSelection')}
              options={itemsAccountTypeClient}
              onChange={(value) => { this.onValueChange(value) }}

            />


          </Content>
          <Content>
            {/*<Text style={{ marginBottom: 10,marginTop: 10, fontSize: 18, color: Colors.white, textAlign: 'center' }}> Virer Vers </Text>*/}
            <Field
              name={'to'}
              icon={'ios-briefcase'}
              component={PickerField}
              editable={editable}
              placeholder={I18n.t('accountToSelection')}
              options={this.getItems()}

            />
          </Content>
          <Content>
            {/*<Text style={{ marginBottom: 10,marginTop: 10, fontSize: 18, color: Colors.white, textAlign: 'center' }}> Introduire le montant </Text>*/}
            <Form>
              <Field
                name={'amount'}
                withRef
                refField="amount"
                icon={'md-cash'}
                onEnter={() => this.focusOn('reason')}
                ref={ref => this.amount = ref}
                component={InputField}
                editable={editable}
                validate={amountValidators}
                keyboardType={'numeric'}
                placeholder={I18n.t('transfertamount')}
              />
            </Form>

          </Content>
          <Button style={{
            alignSelf: 'center',
            height: 40,
            marginTop: 100,
            borderColor: Colors.button,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: Colors.button
          }}
            onSubmit={handleSubmit}>
            <Text style={{ color: '#c9d0de', textAlign: 'center' }}>Envoyer</Text>
          </Button>
        </Content>
        </Content>
      </Container>
    );
  }
}

TransferFormClientAccount = reduxForm({
  form: 'myAccountTransfer',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(TransferFormClientAccount)
// connect our component again to get some additional state
export default connect(
  /* istanbul ignore next */
  state => ({
    amount: formValueSelector('myAccountTransfer')(state, 'amount'),
    info: state.account.information
  })
)(TransferFormClientAccount)
