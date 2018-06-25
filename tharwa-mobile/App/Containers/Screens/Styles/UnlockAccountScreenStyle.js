import { StyleSheet } from 'react-native'
import Dimensions from 'Dimensions'
import { Colors } from '../../../Themes'

const size = Dimensions.get('window').width / 1.5

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  detailsText: {
    color: Colors.white,
    marginTop: 50,
    marginBottom: 30,
    paddingHorizontal: 40,
    textAlign: 'center'
  },
  buttonContainer: {
    height: size,
    width: size
  },
  imagePreview: {
    margin: 10,
    flex: 1,
    width: null,
    height: '100%',
    borderRadius: 200
  }
})
