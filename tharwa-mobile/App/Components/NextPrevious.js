import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text, Button, Icon } from 'native-base'
import I18n from 'react-native-i18n'
import styles from './Styles/NextPreviousStyle'

const NextPrevious = ({ onPrevious, onSubmit, disableSubmit, isFinal }) => {
  return (
    <View style={styles.nextBtnContainer}>
      {
        onPrevious ?
          <Button transparent iconLeft onPress={onPrevious} >
            <Icon style={styles.button} name='ios-arrow-back-outline' />
            <Text style={styles.button} >{I18n.t('previous')}</Text>
          </Button>
          : <Text />
      }
      <Button transparent iconRight onPress={onSubmit} disabled={disableSubmit} >
        <Text style={styles.button} >{I18n.t(isFinal ? 'confirm' : 'next')}</Text>
        <Icon style={styles.button}  name={isFinal ? 'ios-checkmark-circle' : 'ios-arrow-forward-outline'} />
      </Button>
    </View>
  )
}

NextPrevious.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onPrevious: PropTypes.func,
  disableSumit: PropTypes.bool,
  isFinal: PropTypes.bool,
}

export { NextPrevious }