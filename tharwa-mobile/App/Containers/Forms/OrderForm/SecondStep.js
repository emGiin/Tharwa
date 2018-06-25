import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Text } from 'native-base'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import I18n from 'react-native-i18n'
import { InputField, NextPrevious, TransferOrderItem, Header,
    TransferOrderLoaderItem } from "../../../Components";
import {
  nameValidators, extenalAccountValidators,
  requiredValidator, amountValidators
} from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'
import { Colors } from '../../../Themes'

export class SecondStep extends Component {
  focusOn = (field) => {
    /* istanbul ignore next */
    if (this[field] && this[field].getRenderedComponent)
      this[field].getRenderedComponent().refs[field]._root.focus()
  }

  render() {
    const { editable, handleSubmit, previousPage, OrderInfos } = this.props;
    const OrderHistory = OrderInfos.length > 0 ? OrderInfos : new Array(3);
    return (
      <Container style={styles.mainformContainer}>
        <Content style={styles.inputContainer} >
          <Text style={{ color: Colors.white }}>
            {I18n.t('employeInformation')}
          </Text>


        <Field
            withRef
            icon={'md-information-circle'}
            ref={/* istanbul ignore next */ref => this.reason = ref}
            refField="reason"
            name={'reason'}
            component={InputField}
            editable={editable}
            validate={[requiredValidator]}
            returnKeyType={'done'}
            placeholder={I18n.t('reason')}
          /> 
           <View style={styles.historyTitleContainer}>
          <Text style={styles.historyTitle}>Liste des employées </Text>
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
        
        </Content>
        <NextPrevious onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}

let StepForm = reduxForm({
  form: 'OrderForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ReceiverForm);

// connect our component again to get some additional state
StepForm = connect(
  /* istanbul ignore next */
  state => ({
    OrderInfos: formValueSelector('OrderForm')(state, 'OrderInfos')
  })
)(StepForm)

export default StepForm