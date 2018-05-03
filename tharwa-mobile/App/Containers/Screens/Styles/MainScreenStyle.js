import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    height: '100%',
    flex: 1,
    // backgroundColor: Colors.background
  },
  imagePreview: {
    // margin: 10,
    flex: 1,
    width: 30,
    height: 30,
    borderRadius: 200
  },
  pageContainer: {
    backgroundColor: '#ffffffbb',
    height: 100
  },
  account: {
    fontSize: 16
  },
  historyTitleContainer: {
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    marginHorizontal: 20
  },
  historyTitle: {
    color: '#555'
  },
  historyList: {
    marginTop: 20
  }
})
