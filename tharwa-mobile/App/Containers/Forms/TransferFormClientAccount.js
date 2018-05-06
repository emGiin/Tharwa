
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

const items = []
const itemsAll = [
  { label: 'Courant', value: 'cour' },
  /*{ label: 'Epargne', key: 'epar' },
  { label: 'Devise USD', key: 'devi_usd' },
  { label: 'Devise EUR', key: 'devi_eur' }*/

]
var BUTTONS = [
  { label: 'Courant', value: 'cour' },
];

class TransferFormClientAccount extends Component {



  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      selected3: undefined
    };

  }

  componentWillReceiveProps({ info }) {
    if (info) {
     this.setAccountType(info)
    }
  }

  setAccountType(info) {
    if (info['EPARGN']) {
      const epargne = { label: 'Epargne', value: 'epar' }
      items.push(epargne)
      itemsAll.push(epargne)
    }
    if (info['DVUSD']) {
      const deviseusd = { label: 'Devise USD', value: 'devi_usd' }
      items.push(deviseusd)
      itemsAll.push(deviseusd)
    }
    if (info['DVEUR']) {
      const devisereur = { label: 'Devise EUR', value: 'devi_eur' }
      items.push(devisereur)
      itemsAll.push(devisereur)
    }

  }


  focusOn = (field) => {
    /* istanbul ignore next */
    if (this[field] && this[field].getRenderedComponent)
      this[field].getRenderedComponent().refs[field]._root.focus()
  }
  getItems() {
    if (this.state.selected2 === 'cour') {
      return items;
    }
    else {
      return BUTTONS;
    }
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  onValueChange3(value) {
    this.setState({
      selected3: value
    });
  }
  render() {
    const { editable, handleSubmit } = this.props
    const { info }= this.props

    return (
      <Container>
        <Header
          text={'Virement'}
        />
        <Content style={{
          marginLeft: 20, marginTop: 10, marginBottom: 50, marginRight: 20, shadowOffset: { width: 5, height: 5 },
          shadowColor: Colors.white,
          shadowOpacity: 1,
          elevation: 5,
          backgroundColor: Colors.background
        }}>
          <Content >

            <Text style={{ marginBottom: 10, fontSize: 18, color: Colors.white, textAlign: 'center' }}> Choisir le compte </Text>
            <Field
              name={'from'}
              icon={'ios-briefcase'}
              component={PickerField}
              editable={editable}
              placeholder={I18n.t('functionSelection')}
              options={itemsAll}
              onChange= {(value) => {this.onValueChange2(value)}}
             
            />


          </Content>
          <Content>
            <Text style={{ marginBottom: 10, fontSize: 18, color: Colors.white, textAlign: 'center' }}> Virer Vers </Text>
            <Field
              name={'to'}
              icon={'ios-briefcase'}
              component={PickerField}
              editable={editable}
              placeholder={I18n.t('functionSelection')}
              options={this.getItems()}
            
            />
          </Content>
          <Content>

            <Form style={{ marginTop: 30 }}>
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
                placeholder={I18n.t('amount')}
              />
            </Form>

          </Content>
          <Button style={{
            alignSelf: 'center',
            height: 40,

            marginTop: 70,
            borderColor: Colors.button,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: Colors.button
          }}
            onSubmit={handleSubmit}>
            <Text style={{ color: '#c9d0de', textAlign: 'center' }}>Envoyer</Text>
          </Button>
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