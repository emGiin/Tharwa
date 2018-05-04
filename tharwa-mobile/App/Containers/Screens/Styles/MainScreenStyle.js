import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    height: '100%',
    flex: 1,
    // backgroundColor: Colors.background
  },
  carouselContainer: {
    height: 160,
    marginVertical: -10
  },
  historyTitleContainer: {
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    marginHorizontal: 10
  },
  historyTitle: {
    color: '#555'
  },
  historyList: {
    marginTop: 2,
    marginHorizontal: 10
  }
})
