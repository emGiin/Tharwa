import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    width: '100%',
    position: 'relative',
    marginBottom: 20
  },
  leftButton: {
    position: 'absolute',
    left: 10,
    top: 13
  },
  rightButton: {
    position: 'absolute',
    right: 10,
    top: 15
  },
  imagePreview: {
    // margin: 10,
    flex: 1,
    width: 30,
    height: 30,
    borderRadius: 200
  }
})
