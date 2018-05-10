import { StyleSheet } from 'react-native'
import { Colors } from '../../../Themes'

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    height: '100%',
  },
  title: {
    marginTop: 20,
    color: Colors.white,
    fontSize: 18,
    marginLeft: 20
  },
  currenciesList: {
    marginTop: 5,
    marginHorizontal: 20
  }
})
