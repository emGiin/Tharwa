import React from 'react'
import { View } from 'react-native'
import { Text, Button, Icon } from 'native-base'
import I18n from 'react-native-i18n'
import styles from './Styles/NextPreviousStyle'

const NextPrevious = ({ onPrevious, onSubmit, isFinal }) => {
  return (
    <View style={styles.nextBtnContainer}>
      { 
        onPrevious ? 
        <Button transparent iconLeft onPress={onPrevious} >
          <Icon name='ios-arrow-back-outline' />
          <Text>{I18n.t('previous')}</Text>
        </Button>
        : <Text />
      }
      { 
        onSubmit ?
        <Button transparent iconRight onPress={onSubmit} >
          <Text>{I18n.t(isFinal ? 'confirm' : 'next')}</Text>
          <Icon name={isFinal ? 'ios-checkmark-circle' : 'ios-arrow-forward-outline'}/>
        </Button>
        : <Text />
      }
    </View>
  )
}

export { NextPrevious }