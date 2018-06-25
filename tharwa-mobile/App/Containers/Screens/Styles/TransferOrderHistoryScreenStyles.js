import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    height: '100%',
    flex: 1,
  },
  historyTitleContainer: {
    borderBottomColor: Colors.forground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -10
  },
  historyTitle: {
    color: Colors.forground,
    textAlign: 'center',
    fontSize: 20,
    marginLeft: 10
  },
  historyList: {
    marginTop: 2,
    marginHorizontal: 10,
    height: "100%"
  },
  addButton: {
    color: Colors.button
  }
})
