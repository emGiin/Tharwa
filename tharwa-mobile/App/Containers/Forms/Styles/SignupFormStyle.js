import { StyleSheet } from 'react-native'
import FormStyles from './FormStyle'
import {Colors } from '../../../Themes/'
export default StyleSheet.create({
  ...FormStyles,
  historyTitleContainer: {
    borderBottomColor: Colors.forground,
    
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  historyTitle: {
    color: Colors.forground,
    textAlign: 'center',
    fontSize: 18
  },
  historyList: {
    marginTop: 2,
    marginHorizontal: 10,
    height: "100%"
  },

})
