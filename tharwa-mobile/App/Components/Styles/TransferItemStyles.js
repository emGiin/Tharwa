import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginVertical: 4,
    // padding: 7,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6
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
  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 7
  },
  leftContainer: {
    flexDirection: 'row',
  },
  rightContainer: {
    margin: 7,
    justifyContent: 'space-between'
  },
  amountContainer: {
    flexDirection: 'row'
  },
  comissionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  comission: {
    marginHorizontal: 2,
    color: 'salmon'
  },
  loaderContainer: {
    backgroundColor: '#ecf0f1',
    // marginHorizontal: 10,
    padding: 0
  },
  typeIcon: {
    padding: 7,
    backgroundColor: Colors.forground,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
  }
});
