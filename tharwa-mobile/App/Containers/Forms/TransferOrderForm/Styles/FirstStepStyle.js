import { StyleSheet } from 'react-native'
import { Colors } from '../../../../Themes'

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  addButtonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: Colors.button,
    paddingHorizontal: 20,
    marginTop: 40
  },
  addButtonContent: {
    color: Colors.button
  }
})
