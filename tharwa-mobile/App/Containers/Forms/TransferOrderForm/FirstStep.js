import React, { Component } from 'react'
import { Container, Text, Button, Icon, Content } from 'native-base'
import { View } from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { NextPrevious, InputField, PickerField } from "../../../Components";
import {
  requiredValidator, extenalAccountValidators,
  amountValidators, nameValidators
} from '../../../Helpers/validators'
import styles from './Styles/FirstStepStyle'

export class FirstStep extends Component {
  state = { employees: [{ label: 'Employee N 1', value: 1 }], selectedEmployee: 1 }

  focusOn = (field) => {
    /* istanbul ignore next */
    if (this[field] && this[field].getRenderedComponent)
      this[field].getRenderedComponent().refs[field]._root.focus()
  }

  addNewElement = () => {
    const employeeNumber = this.state.employees.length + 1
    this.setState({
      employees: [...this.state.employees, { label: 'Employee N ' + employeeNumber, value: employeeNumber }],
      selectedEmployee: employeeNumber
    })
  }

  isExternalAccount = () => {
    const { selectedEmployee } = this.state
    let { receivers } = this.props
    receivers = receivers || []
    const employee = receivers[selectedEmployee - 1] || {}
    const validator = extenalAccountValidators(this.props.banks)
    return !validator[1](employee.account) && !validator[2](employee.account)
  }

  render() {
    const { editable, handleSubmit, previousPage } = this.props;
    const { selectedEmployee } = this.state
    const employeeIndex = selectedEmployee - 1
    return (
      <Container style={styles.container}>
        <View style={{ justifyContent: 'flex-start' }}>
          <Text style={{ color: '#fff', marginLeft: 20 }}>Remplissez les champs suivant</Text>
        </View>

        <Content style={{ marginHorizontal: 20 }}>
          <Field
            withRef
            icon={'md-information-circle'}
            ref={/* istanbul ignore next */ref => this.reason = ref}
            refField="reason"
            name={'reason'}
            component={InputField}
            editable={editable}
            validate={[requiredValidator]}
            returnKeyType={'next'}
            placeholder={I18n.t('reason')}
          />
          <Text style={{ marginTop: 10 }}></Text>
          <Field
            name={'currentEmployee'}
            icon={'ios-briefcase'}
            component={PickerField}
            editable={editable}
            placeholder={'Selectionner un employee'}
            options={this.state.employees}
            validate={requiredValidator}
            selectedValue={selectedEmployee}
            onChange={value => { this.setState({ selectedEmployee: value }) }}
          />
          <Field
            name={`receivers[${employeeIndex}].account`}
            withRef
            icon={'md-barcode'}
            refField="accountNumber"
            ref={/* istanbul ignore next */ref => this.accountNumber = ref}
            onEnter={() => this.focusOn('name')}
            component={InputField}
            editable={editable}
            // validate={extenalAccountValidators([])}
            returnKeyType={'next'}
            placeholder={I18n.t('accountNumber')}
          />
          {
            this.isExternalAccount() &&
            <Field
              name={`receivers[${employeeIndex}].name`}
              withRef
              refField="name"
              icon={'md-person'}
              ref={/* istanbul ignore next */ref => this.name = ref}
              onEnter={() => this.focusOn('amount')}
              component={InputField}
              editable={editable}
              // validate={nameValidators}
              returnKeyType={'next'}
              placeholder={I18n.t('name')}
            />
          }
          <Field
            name={`receivers[${employeeIndex}].amount`}
            withRef
            refField="amount"
            icon={'md-cash'}
            onEnter={() => this.focusOn('reason')}
            ref={/* istanbul ignore next */ref => this.amount = ref}
            component={InputField}
            editable={editable}
            // validate={amountValidators}
            returnKeyType={'next'}
            keyboardType={'numeric'}
            placeholder={I18n.t('amount')}
          />
          <Button style={styles.addButtonContainer} transparent iconLeft onPress={() => this.addNewElement()} >
            <Icon style={styles.addButtonContent} name='ios-add' />
            <Text style={styles.addButtonContent}>Ajouter un employee</Text>
          </Button>
        </Content>
        <NextPrevious isFinal onSubmit={handleSubmit} />
      </Container >
    )
  }
}


let StepForm = reduxForm({
  form: 'OrderForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(FirstStep);

StepForm = connect(
  state => {
    const receivers = formValueSelector('OrderForm')(state, 'receivers')
    return { receivers }
  }
)(StepForm)

export default StepForm