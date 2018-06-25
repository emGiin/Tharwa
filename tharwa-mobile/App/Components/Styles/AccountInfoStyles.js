import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes/';

export default StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '95%',    
    shadowOffset: { width: 5, height: 5 },
    shadowColor: Colors.white,
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: Colors.white, // invisible color
    margin: 1,
    borderRadius: 7,
    alignSelf: 'center'
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    borderRadius: 7
  },
  amountContainer: {
    backgroundColor: "#1A9C8A",
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7
  },
  amount: {
    fontSize: 26,
    margin: 5,
    color: Colors.skySilk,
    textAlign: 'center'
  },
  account: {
    textAlign: 'center',
    paddingVertical: 7,
    fontSize: 18,
    width: '100%',
    backgroundColor: Colors.skySilk,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    color: "#333"
  }
});
