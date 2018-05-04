import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginVertical: 3,
    padding: 7,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  separator: {
    borderWidth: 1,
    borderColor: '#fff'
  },
  date: {
    color: '#555',
    fontSize: 14
  },
  target: {
    color: '#333',
    fontSize: 18
  },
  amount: {
    fontSize: 15,
    marginRight: 5
  },
  icon: {
    fontSize: 19
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  loaderContainer: {
    backgroundColor: '#ecf0f1',
    marginHorizontal: 10,
    padding: 0
  }
})
