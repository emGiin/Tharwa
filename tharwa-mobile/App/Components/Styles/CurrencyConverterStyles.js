import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  title: {
    color: Colors.white,
    fontSize: 18,
    marginLeft: 20
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20
  },
  icon: {
    color: Colors.white,
    fontSize: 30,
    marginTop: 10,
    marginHorizontal: 10
  },
  currenciesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20
  },
  separator: {
    width: 30,
    marginTop: 10,
    marginHorizontal: 8
  }
})