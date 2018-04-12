import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  nextBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  button: {
    color: Colors.button
  }
})
