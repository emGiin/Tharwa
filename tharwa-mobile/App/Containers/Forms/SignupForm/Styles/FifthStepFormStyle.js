import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'
import { Colors } from '../../../../Themes'

const size = Dimensions.get('window').width / 2

export default StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  imagePreview: {
    marginVertical: 20,
    width: size,
    height: size,
    borderRadius: 100
  },
  employeeText: {
    marginVertical: 20,
    textAlign: 'center',
    paddingHorizontal: 30,
    color: Colors.white
  }
})
