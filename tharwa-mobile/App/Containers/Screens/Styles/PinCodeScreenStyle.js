import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainText: {
    color: '#2c3e50',
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50
  },
  noCodeText: {
    color: '#7f8c8d',
    paddingHorizontal: 40,
    textAlign: 'center',
    fontSize: 16
  },
  resendButton: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 50,
    padding: 0,
    borderColor: '#e67e22',
    borderWidth: 1,
    borderRadius: 5
  },
  resendButtonText: {
    color: '#e67e22',
    fontSize: 12
  },
  dialogContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContent: {
    textAlign: 'center',
    color: '#555',
    fontSize: 20
  }
})
