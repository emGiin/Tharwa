import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    flex: 1,
    height: '100%',
    width: '100%'
  },
  imagePreview: {
    margin: 10,
    flex: 1,
    width: null,
    height: '100%'
  },
  buttonsContainer: {
    marginVertical: 15,
    marginHorizontal: 30,
    alignItems: 'center'
  }
})
