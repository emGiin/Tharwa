import { StyleSheet } from 'react-native'
import { Colors } from '../../../../Themes'

export default StyleSheet.create({
  container: {
    height: 300,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: Colors.forground,
    elevation: 3
  },
  topContainer: {
    paddingTop: 10,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  nfcLogo: {
    height: 50,
    width: 50
  },
  cancelBtn: {
    color: Colors.button,
    fontSize: 16
  },
  detailsText: {
    marginTop: 40,
    color: Colors.white,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 30
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150
  },
  receiverDetailsContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  title: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 'bold'
  },
  detail: {
    color: Colors.white,
    fontSize: 16,
    marginTop: 1
  },
  detailContainer: {
    marginLeft: 20
  }
})

