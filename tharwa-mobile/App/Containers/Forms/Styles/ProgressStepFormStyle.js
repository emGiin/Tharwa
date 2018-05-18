import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'
import { Colors } from '../../../Themes'

const size = Dimensions.get('window').width / 2

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsText: {
    marginTop: 50,
    color: Colors.white,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 40
  },
  amount: {
    color: Colors.white,
    textAlign: 'center',
    paddingHorizontal: 5
  },
  button: {
    width: size,
    height: size,
    borderRadius: size,
    backgroundColor: Colors.button,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
