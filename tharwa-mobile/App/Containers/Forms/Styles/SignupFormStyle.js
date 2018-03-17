import { StyleSheet } from 'react-native'
import FormStyles from './FormStyle'

export default StyleSheet.create({
  ...FormStyles,
  nextBtn: {
    borderColor: '#16a085',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    margin: 2
  },
  nextBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 10
  }
})
