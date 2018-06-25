import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Text} from 'native-base'
import { Dimensions, View,  FlatList, RefreshControl} from 'react-native'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import I18n from 'react-native-i18n'
import { InputField, NextPrevious, TransferOrderItem, Header,
     TransferOrderLoaderItem} from "../../../Components";
import {
  nameValidators, extenalAccountValidators,
  requiredValidator, amountValidators
} from '../../../Helpers/validators'
import styles from '../Styles/SignupFormStyle'
import { Colors } from '../../../Themes'
export class FirstStep extends Component {
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
        
      
        <NextPrevious onPrevious={previousPage} onSubmit={handleSubmit} />
      </Container>
    )
  }
}

let StepForm = reduxForm({
  form: 'OrderForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(FirstStep);

// connect our component again to get some additional state
StepForm = connect(
  /* istanbul ignore next */
  state => ({
    OrderInfos: formValueSelector('OrderForm')(state, 'OrderInfos')
  })
)(StepForm)

export default StepForm
