import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: Colors.white,
    shadowOpacity: 1,
    elevation: 3,
    zIndex: 999,
    // background color must be set
    backgroundColor: Colors.white, // invisible color
    margin: 3
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    shadowOffset: { width: 10, height: 10, },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 1,
  },
  amountContainer: {
    backgroundColor: Colors.button,
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  amount: {
    fontSize: 26,
    margin: 5,
    color: Colors.white,
    textAlign: 'center',
  },
  account: {
    textAlign: 'center',
    paddingVertical: 7,
    fontSize: 18,
    width: '100%',
    backgroundColor: Colors.white
  }
})
